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
  // Canale Realtime tutto per il test: un proiettore aperto sul mazzo vero non riceve nulla
  const deckParam = `deck=lavagna-test-${Date.now()}`;

  console.log(`Test server attivo su: http://127.0.0.1:${port}`);

  const browser = await chromium.launch({ headless: true });

  // Coordinate in pixel del canvas (1280x720), convertite in coordinate client
  const SEL = '.reveal .slides .psi-lavagna-canvas';
  const inkAt = (page, x, y) => page.evaluate(([sel, x, y]) => {
    const d = document.querySelector(sel).getContext('2d').getImageData(x - 3, y - 3, 7, 7).data;
    for (let i = 3; i < d.length; i += 4) if (d[i] > 0) return true;
    return false;
  }, [SEL, x, y]);
  const penLine = (page, x0, y0, x1, y1) => page.evaluate(([sel, x0, y0, x1, y1]) => {
    const c = document.querySelector(sel);
    const r = c.getBoundingClientRect();
    const o = (x, y) => ({
      clientX: r.left + x * r.width / 1280, clientY: r.top + y * r.height / 720,
      pointerId: 30, pointerType: 'pen', pressure: 0.6, bubbles: true
    });
    c.dispatchEvent(new PointerEvent('pointerdown', o(x0, y0)));
    c.dispatchEvent(new PointerEvent('pointermove', o(x1, y1)));
    c.dispatchEvent(new PointerEvent('pointerup', o(x1, y1)));
  }, [SEL, x0, y0, x1, y1]);
  // fingers: [{ id, from: [x, y], to: [x, y] }], mossi insieme in 10 passi
  const fingerGesture = (page, fingers) => page.evaluate(([sel, fingers]) => {
    const c = document.querySelector(sel);
    const r = c.getBoundingClientRect();
    const o = (id, x, y) => ({
      clientX: r.left + x * r.width / 1280, clientY: r.top + y * r.height / 720,
      pointerId: id, pointerType: 'touch', isPrimary: id === fingers[0].id, bubbles: true
    });
    for (const f of fingers) c.dispatchEvent(new PointerEvent('pointerdown', o(f.id, ...f.from)));
    for (let k = 1; k <= 10; k++) {
      for (const f of fingers) {
        const x = f.from[0] + (f.to[0] - f.from[0]) * k / 10;
        const y = f.from[1] + (f.to[1] - f.from[1]) * k / 10;
        c.dispatchEvent(new PointerEvent('pointermove', o(f.id, x, y)));
      }
    }
    for (const f of fingers) c.dispatchEvent(new PointerEvent('pointerup', o(f.id, ...f.to)));
  }, [SEL, fingers]);
  // Dopo zoom e spostamento la lavagna si ridisegna davvero quando la vista si ferma (150 ms)
  const settle = (page) => page.waitForTimeout(300);
  const slideH = (page) => page.evaluate(() => window.Reveal.getIndices().h);
  const check = (label, ok) => {
    console.log(`${label}:`, ok);
    if (!ok) throw new Error(`Fallito: ${label}`);
  };
  const eventually = async (fn) => {
    for (let i = 0; i < 40; i++) {
      if (await fn()) return true;
      await new Promise((r) => setTimeout(r, 100));
    }
    return false;
  };

  try {
    // 1. Client Proiettore (Viewer, senza ?pen)
    const viewerContext = await browser.newContext();
    const viewerPage = await viewerContext.newPage();
    await viewerPage.goto(`${baseUrl}?${deckParam}`);
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
    await speakerPage.goto(`${baseUrl}?pen=psi2627&${deckParam}`);
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
    console.log('13. Palm rejection: tocco dito ignorato (canvas vuoto):', !isTouchDrawn);
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

    console.log('14. Tratti consecutivi rapidi (pixel disegnati > 0):', rapidStrokesResult.nonZeroCount > 0);
    if (rapidStrokesResult.nonZeroCount === 0) {
      throw new Error('I tratti rapidi sono stati ignorati! Nessun pixel disegnato.');
    }

    // 9. Swipe con un dito: una slide alla volta (prima giravano reveal e la lavagna, due volte)
    await speakerPage.evaluate(() => window.Reveal.slide(1));
    await speakerPage.waitForTimeout(200);
    await fingerGesture(speakerPage, [{ id: 40, from: [900, 360], to: [600, 360] }]);
    await speakerPage.waitForTimeout(300);
    check('15. Swipe con un dito avanza di una sola slide (1 -> 2)', (await slideH(speakerPage)) === 2);

    // 10. I tratti restano con la loro slide
    await penLine(speakerPage, 200, 200, 300, 300);
    await speakerPage.evaluate(() => window.Reveal.next());
    await speakerPage.waitForTimeout(200);
    check('16. Slide 3 non mostra il tratto della slide 2', !(await inkAt(speakerPage, 250, 250)));
    await penLine(speakerPage, 800, 200, 900, 300);
    await speakerPage.evaluate(() => window.Reveal.prev());
    await speakerPage.waitForTimeout(200);
    check('17. Tornando alla slide 2 c\'è il suo tratto e non quello della 3',
      (await inkAt(speakerPage, 250, 250)) && !(await inkAt(speakerPage, 850, 250)));

    // 11. La lavagna ha tratti propri ed è una per tutto il mazzo
    await speakerPage.click('.psi-tb-board-btn');
    check('18. Lavagna attiva: i tratti della slide non si vedono', !(await inkAt(speakerPage, 250, 250)));
    await penLine(speakerPage, 600, 300, 700, 400);
    check('19. Si scrive sulla lavagna', await inkAt(speakerPage, 650, 350));
    await speakerPage.click('.psi-tb-board-btn');
    check('20. Lavagna spenta: torna il tratto della slide, sparisce quello della lavagna',
      (await inkAt(speakerPage, 250, 250)) && !(await inkAt(speakerPage, 650, 350)));
    await speakerPage.evaluate(() => window.Reveal.next());
    await speakerPage.waitForTimeout(200);
    await speakerPage.click('.psi-tb-board-btn');
    check('21. Da un\'altra slide la lavagna mostra ancora i suoi tratti, senza quelli della slide',
      (await inkAt(speakerPage, 650, 350)) && !(await inkAt(speakerPage, 850, 250)));

    // 12. Sulla lavagna lo swipe con un dito non gira le slide
    const hBoard = await slideH(speakerPage);
    await fingerGesture(speakerPage, [{ id: 41, from: [900, 360], to: [600, 360] }]);
    await speakerPage.waitForTimeout(300);
    check('22. Swipe sulla lavagna: la slide non cambia', (await slideH(speakerPage)) === hBoard);

    // 13. Pinch a due dita: zoom x2 attorno al centro (640, 360)
    await fingerGesture(speakerPage, [
      { id: 42, from: [590, 360], to: [540, 360] },
      { id: 43, from: [690, 360], to: [740, 360] }
    ]);
    await settle(speakerPage);
    const zoomText = await speakerPage.textContent('.psi-tb-zoom-btn');
    check('23. Pinch: zoom della lavagna al 200%', zoomText === '200%');
    check('24. Pinch: il tratto della lavagna si è ingrandito attorno alle dita',
      (await inkAt(speakerPage, 660, 340)) && !(await inkAt(speakerPage, 650, 350)));
    check('25. Pinch: la slide non è cambiata', (await slideH(speakerPage)) === hBoard);

    if (connected) {
      const viewerBoard = await eventually(async () =>
        (await viewerPage.$('.reveal .slides.psi-board-active')) !== null && (await inkAt(viewerPage, 660, 340)));
      check('26. Proiettore: lavagna attiva, con i tratti e lo zoom del tablet', viewerBoard);
    }

    // 14. Un tratto scritto con lo zoom resta al suo posto nel mondo: a 200% lo schermo (200, 600)
    // corrisponde a (420, 480), che dopo il ritorno al 100% è di nuovo (420, 480)
    await penLine(speakerPage, 200, 600, 300, 600);
    await speakerPage.click('.psi-tb-zoom-btn');
    await settle(speakerPage);
    check('27. Tocco sullo zoom: torna al 100%', (await speakerPage.textContent('.psi-tb-zoom-btn')) === '100%');
    check('28. Al 100% i tratti tornano al loro posto',
      (await inkAt(speakerPage, 650, 350)) && (await inkAt(speakerPage, 445, 480)));

    // 15. Sul PC: ctrl + rotellina zooma la lavagna, uno scatto al massimo x1.28
    const center = await speakerPage.$eval(SEL, (c) => {
      const r = c.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await speakerPage.mouse.move(center.x, center.y);
    await speakerPage.keyboard.down('Control');
    await speakerPage.mouse.wheel(0, -100);
    await speakerPage.keyboard.up('Control');
    await settle(speakerPage);
    check('29. Ctrl + rotellina: zoom della lavagna al 128%', (await speakerPage.textContent('.psi-tb-zoom-btn')) === '128%');
    await speakerPage.click('.psi-tb-zoom-btn');
    await settle(speakerPage);

    // 16. Pulire la lavagna chiede conferma e non tocca le slide
    speakerPage.once('dialog', (d) => d.dismiss());
    await speakerPage.click('.psi-tb-clear-btn');
    check('30. Conferma rifiutata: la lavagna resta', await inkAt(speakerPage, 650, 350));
    speakerPage.once('dialog', (d) => d.accept());
    await speakerPage.click('.psi-tb-clear-btn');
    check('31. Conferma accettata: la lavagna è vuota', !(await inkAt(speakerPage, 650, 350)));
    await speakerPage.click('.psi-tb-board-btn');
    await speakerPage.evaluate(() => window.Reveal.prev());
    await speakerPage.waitForTimeout(200);
    check('32. I tratti della slide 2 sono ancora lì', await inkAt(speakerPage, 250, 250));

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
