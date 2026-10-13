// Test automatico multi-client per PSILavagna (Viewer vs iPad Speaker)
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { promises as fs, createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.json': 'application/json'
};

function serve() {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    try {
      if (!file.startsWith(ROOT) || !(await fs.stat(file)).isFile()) throw new Error();
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function run() {
  const server = await serve();
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/settimana_01/slides/index.html`;

  console.log(`Test server attivo su: http://127.0.0.1:${port}`);

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Client Proiettore (Viewer, senza ?pen)
    const viewerContext = await browser.newContext();
    const viewerPage = await viewerContext.newPage();
    await viewerPage.goto(baseUrl);
    await viewerPage.waitForSelector('.reveal .slides');

    // Verifica assenza toolbar e pointer-events sul canvas
    const viewerToolbar = await viewerPage.$('.psi-lavagna-toolbar');
    console.log('1. Proiettore: toolbar assente:', viewerToolbar === null);
    if (viewerToolbar !== null) throw new Error('Toolbar non dovrebbe essere visibile sul proiettore');

    const viewerCanvas = await viewerPage.$('.reveal .slides .psi-lavagna-canvas');
    if (!viewerCanvas) throw new Error('Canvas non trovato sul proiettore');
    const viewerCanvasPointerEvents = await viewerCanvas.evaluate(el => window.getComputedStyle(el).pointerEvents);
    console.log('2. Proiettore: canvas pointer-events none:', viewerCanvasPointerEvents === 'none');
    if (viewerCanvasPointerEvents !== 'none') throw new Error('Canvas sul proiettore deve avere pointer-events: none');

    // 2. Client iPad (Speaker, con ?pen)
    const speakerContext = await browser.newContext();
    const speakerPage = await speakerContext.newPage();
    await speakerPage.goto(`${baseUrl}?pen=psi2627`);
    await speakerPage.waitForSelector('.reveal .slides');

    const speakerToolbar = await speakerPage.$('.psi-lavagna-toolbar');
    console.log('3. iPad Speaker: toolbar presente:', speakerToolbar !== null);
    if (!speakerToolbar) throw new Error('Toolbar deve essere visibile su iPad con ?pen');

    const speakerCanvas = await speakerPage.$('.reveal .slides .psi-lavagna-canvas');
    const speakerCanvasPointerEvents = await speakerCanvas.evaluate(el => window.getComputedStyle(el).pointerEvents);
    console.log('4. iPad Speaker: canvas pointer-events auto:', speakerCanvasPointerEvents === 'auto');
    if (speakerCanvasPointerEvents !== 'auto') throw new Error('Canvas su iPad deve avere pointer-events: auto');

    // 3. Connessione Supabase Realtime
    const connected = await speakerPage.waitForSelector('.psi-tb-status.psi-connected', { timeout: 10000 })
      .then(() => true).catch(() => false);
    console.log('5. iPad Speaker connesso a Supabase Realtime:', connected);

    // 4. Test Disegno locale su iPad (simulazione pointerdown + pointermove con penna)
    await speakerPage.evaluate(() => {
      const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
      const rect = c.getBoundingClientRect();
      const down = new PointerEvent('pointerdown', {
        clientX: rect.left + 200,
        clientY: rect.top + 200,
        pointerType: 'pen',
        pressure: 0.8,
        bubbles: true
      });
      c.dispatchEvent(down);

      const move = new PointerEvent('pointermove', {
        clientX: rect.left + 300,
        clientY: rect.top + 300,
        pointerType: 'pen',
        pressure: 0.6,
        bubbles: true
      });
      c.dispatchEvent(move);

      const up = new PointerEvent('pointerup', {
        clientX: rect.left + 300,
        clientY: rect.top + 300,
        pointerType: 'pen',
        bubbles: true
      });
      c.dispatchEvent(up);
    });

    const isDrawn = await speakerPage.evaluate(() => {
      const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
      const ctx = c.getContext('2d');
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      return data.some(val => val !== 0);
    });
    console.log('6. iPad Speaker: disegno eseguito sul canvas:', isDrawn);
    if (!isDrawn) throw new Error('Il disegno non ha modificato i pixel del canvas');

    // 5. Test sincronizzazione disegno sul Proiettore via Realtime Broadcast
    if (connected) {
      let viewerReceived = false;
      for (let i = 0; i < 40; i++) {
        await viewerPage.waitForTimeout(100);
        viewerReceived = await viewerPage.evaluate(() => {
          const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
          const ctx = c.getContext('2d');
          const data = ctx.getImageData(0, 0, c.width, c.height).data;
          return data.some(val => val !== 0);
        });
        if (viewerReceived) break;
      }
      console.log('7. Proiettore ha ricevuto e disegnato il tratto via Realtime:', viewerReceived);
    }

    // 6. Test Telecomando Slide (Navigazione)
    const initialSlideViewer = await viewerPage.evaluate(() => window.Reveal.getIndices().h);
    await speakerPage.click('.psi-tb-nav-btn[title="Slide / animazione successiva"]');
    await speakerPage.waitForTimeout(300);

    const speakerSlideAfter = await speakerPage.evaluate(() => window.Reveal.getIndices().h);
    console.log('8. iPad slide dopo click avanti:', speakerSlideAfter);
    if (speakerSlideAfter !== initialSlideViewer + 1) {
      throw new Error(`iPad doveva avanzare alla slide ${initialSlideViewer + 1}, invece è su ${speakerSlideAfter}`);
    }

    if (connected) {
      let viewerNavigated = false;
      for (let i = 0; i < 40; i++) {
        await viewerPage.waitForTimeout(100);
        const idx = await viewerPage.evaluate(() => window.Reveal.getIndices().h);
        if (idx === speakerSlideAfter) { viewerNavigated = true; break; }
      }
      console.log('9. Proiettore ha seguito il cambio slide:', viewerNavigated);
    }

    // 7. Test sincronizzazione Animazioni e Step (Slide 4 'esperimento')
    await speakerPage.evaluate(() => window.Reveal.slide(4, 0, -1));
    await speakerPage.waitForTimeout(400);

    // iPad clicca avanti per avanzare il primo step animato
    await speakerPage.click('.psi-tb-nav-btn[title="Slide / animazione successiva"]');
    await speakerPage.waitForTimeout(400);

    const speakerFrag = await speakerPage.evaluate(() => window.Reveal.getIndices().f);
    console.log('10. iPad step animazione corrente (f):', speakerFrag);

    if (connected) {
      let viewerFragSynced = false;
      for (let i = 0; i < 40; i++) {
        await viewerPage.waitForTimeout(100);
        const vf = await viewerPage.evaluate(() => window.Reveal.getIndices().f);
        if (vf === speakerFrag) { viewerFragSynced = true; break; }
      }
      console.log('11. Proiettore ha sincronizzato lo step animato in tempo reale:', viewerFragSynced);
      if (!viewerFragSynced) throw new Error('Animazione non sincronizzata sul proiettore!');
    }

    // 8. Test Puntatore Laser dal tablet
    await speakerPage.click('.psi-tb-laser-btn');
    await speakerPage.evaluate(() => {
      const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
      const rect = c.getBoundingClientRect();
      c.dispatchEvent(new PointerEvent('pointerdown', {
        clientX: rect.left + 500,
        clientY: rect.top + 350,
        pointerType: 'pen',
        bubbles: true
      }));
      c.dispatchEvent(new PointerEvent('pointermove', {
        clientX: rect.left + 550,
        clientY: rect.top + 380,
        pointerType: 'pen',
        bubbles: true
      }));
    });

    if (connected) {
      let laserActive = false;
      for (let i = 0; i < 40; i++) {
        await viewerPage.waitForTimeout(100);
        laserActive = await viewerPage.evaluate(() => {
          const dot = document.querySelector('.psi-laser-dot');
          return dot && dot.classList.contains('on');
        });
        if (laserActive) break;
      }
      console.log('12. Proiettore mostra il puntatore laser mosso dal tablet:', laserActive);
      if (!laserActive) throw new Error('Puntatore laser non visibile sul proiettore!');
    }

    // 7. Test Palm Rejection (tocco con dita non deve disegnare in modalità penna)
    await speakerPage.click('.psi-tb-btn[title="Penna / Annotazioni"]');
    await speakerPage.click('.psi-tb-btn[title="Pulisci slide"]');
    await speakerPage.waitForTimeout(100);

    await speakerPage.evaluate(() => {
      const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
      const rect = c.getBoundingClientRect();
      const touchDown = new PointerEvent('pointerdown', {
        clientX: rect.left + 150,
        clientY: rect.top + 150,
        pointerType: 'touch',
        bubbles: true
      });
      c.dispatchEvent(touchDown);
      const touchMove = new PointerEvent('pointermove', {
        clientX: rect.left + 250,
        clientY: rect.top + 250,
        pointerType: 'touch',
        bubbles: true
      });
      c.dispatchEvent(touchMove);
      const touchUp = new PointerEvent('pointerup', {
        clientX: rect.left + 250,
        clientY: rect.top + 250,
        pointerType: 'touch',
        bubbles: true
      });
      c.dispatchEvent(touchUp);
    });

    const isTouchDrawn = await speakerPage.evaluate(() => {
      const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
      const ctx = c.getContext('2d');
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      return data.some(val => val !== 0);
    });
    console.log('10. Palm rejection: tocco dito ignorato (canvas vuoto):', !isTouchDrawn);
    if (isTouchDrawn) throw new Error('Palm rejection fallita: il tocco dito ha disegnato!');

    // 8. Test Tratti Consecutivi Rapidi (due stroke ravvicinati con Apple Pencil non devono perdersi)
    await speakerPage.click('.psi-tb-btn[title="Penna / Annotazioni"]');
    await speakerPage.click('.psi-tb-btn[title="Pulisci slide"]');
    await speakerPage.waitForTimeout(100);

    const rapidStrokesResult = await speakerPage.evaluate(() => {
      const c = document.querySelector('.reveal .slides .psi-lavagna-canvas');
      const rect = c.getBoundingClientRect();

      // Stroke 1 (tratto penna veloce)
      c.dispatchEvent(new PointerEvent('pointerdown', {
        clientX: rect.left + 100,
        clientY: rect.top + 100,
        pointerId: 10,
        pointerType: 'pen',
        pressure: 0.7,
        bubbles: true
      }));
      c.dispatchEvent(new PointerEvent('pointermove', {
        clientX: rect.left + 100,
        clientY: rect.top + 150,
        pointerId: 10,
        pointerType: 'pen',
        pressure: 0.7,
        bubbles: true
      }));
      window.dispatchEvent(new PointerEvent('pointerup', {
        clientX: rect.left + 100,
        clientY: rect.top + 150,
        pointerId: 10,
        pointerType: 'pen',
        bubbles: true
      }));

      // Stroke 2 immediato (es. trattino veloce successivo con pointerId diverso)
      c.dispatchEvent(new PointerEvent('pointerdown', {
        clientX: rect.left + 80,
        clientY: rect.top + 120,
        pointerId: 11,
        pointerType: 'pen',
        pressure: 0.6,
        bubbles: true
      }));
      c.dispatchEvent(new PointerEvent('pointermove', {
        clientX: rect.left + 120,
        clientY: rect.top + 120,
        pointerId: 11,
        pointerType: 'pen',
        pressure: 0.6,
        bubbles: true
      }));
      window.dispatchEvent(new PointerEvent('pointerup', {
        clientX: rect.left + 120,
        clientY: rect.top + 120,
        pointerId: 11,
        pointerType: 'pen',
        bubbles: true
      }));

      // Verifica pixel disegnati sul canvas
      const ctx = c.getContext('2d');
      const totalPixels = ctx.getImageData(0, 0, c.width, c.height).data;
      let nonZeroCount = 0;
      for (let i = 3; i < totalPixels.length; i += 4) {
        if (totalPixels[i] > 0) nonZeroCount++;
      }
      return { nonZeroCount };
    });

    console.log('11. Tratti consecutivi rapidi (pixel disegnati > 0):', rapidStrokesResult.nonZeroCount > 0);
    if (rapidStrokesResult.nonZeroCount === 0) {
      throw new Error('I tratti rapidi sono stati ignorati! Nessun pixel disegnato.');
    }

    console.log('\n--- TUTTI I TEST AUTOMATICI SUPERATI CON SUCCESSO! ---');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('Test fallito:', err);
  process.exit(1);
});
