// Verifica di un mazzo di slide nel browser, senza rete (il CDN è bloccato).
//
//   npm run slides:check -- settimana_01 [opzioni]
//
//   --scenes id1,id2   solo queste scene (predefinito: tutte quelle animate)
//   --out DIR          dove salvare gli screenshot (predefinito: cartella temporanea)
//   --wait MS          attesa dopo ogni avanzamento (predefinito: 3500)
//   --sheet            anche il foglio provini di tutte le slide, nello stato finale
//   --print            anche la vista di stampa (?print-pdf) e il PDF
//
// Per ogni scena: entra con un salto, scatta ogni step, torna indietro di uno,
// esce e rientra da destra; poi compone una griglia <scena>-grid.png.
// Esce con codice 1 se trova errori in console, richieste fallite o scene mancanti.
// Se il Chromium di Playwright non è quello installato: PSI_CHROMIUM=/percorso/chrome
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { promises as fs, createReadStream } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf('--' + name);
  return i < 0 ? fallback : args[i + 1];
};
const flag = (name) => args.includes('--' + name);
const deck = args.find((a) => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--')) || 'settimana_01';
const out = path.resolve(opt('out', path.join(os.tmpdir(), 'psi-slides', deck)));
const wait = Number(opt('wait', 3500));

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.json': 'application/json' };

function serve() {
  const server = createServer(async (req, res) => {
    const file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
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

async function grid(browser, files, target, cols = 3) {
  const imgs = await Promise.all(files.map(async (f) => ({
    name: path.basename(f, '.png').split('-').pop(),
    data: (await fs.readFile(f)).toString('base64')
  })));
  const page = await browser.newPage({ viewport: { width: cols * 646, height: 400 } });
  await page.setContent(`<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(${cols},640px);gap:6px">` +
    imgs.map((i) => `<div style="position:relative"><img src="data:image/png;base64,${i.data}" style="width:640px;display:block">` +
      `<span style="position:absolute;top:0;left:0;background:#000;color:#ff0;font:14px monospace;padding:3px 8px">${i.name}</span></div>`).join('') +
    '</body>');
  await page.screenshot({ path: target, fullPage: true });
  await page.close();
}

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}/${deck}/slides/index.html`;
const browser = await chromium.launch(process.env.PSI_CHROMIUM ? { executablePath: process.env.PSI_CHROMIUM } : {});
const problems = [];
await fs.mkdir(out, { recursive: true });

async function open(url) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push(`console.${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => { if (!/cdn\.jsdelivr\.net/.test(r.url())) problems.push(`requestfailed: ${r.url()}`); });
  await page.route(/cdn\.jsdelivr\.net/, (r) => r.abort());
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.Reveal && Reveal.isReady(), null, { timeout: 30000 });
  await page.evaluate(() => Reveal.configure({ transition: 'none' }));
  return page;
}

try {
  const page = await open(base);
  const all = await page.evaluate(() => Array.from(document.querySelectorAll('section[id]'))
    .filter((s) => s.querySelector(':scope > .psi-step')).map((s) => s.id));
  const ids = opt('scenes', 'all') === 'all' ? all : opt('scenes').split(',');

  for (const id of ids) {
    const idx = await page.evaluate((id) => {
      const s = document.getElementById(id);
      return s ? Reveal.getIndices(s) : null;
    }, id);
    if (!idx) { problems.push('scena mancante: ' + id); continue; }
    await page.evaluate(() => Reveal.slide(0, 0));
    await page.waitForTimeout(200);
    await page.evaluate((i) => Reveal.slide(i.h, i.v || 0, -1), idx);
    await page.waitForTimeout(wait);
    const steps = await page.evaluate((id) => document.getElementById(id).querySelectorAll('.psi-step').length, id);
    const shots = [];
    const shot = async (name) => {
      const f = path.join(out, `${id}-${name}.png`);
      await page.screenshot({ path: f });
      shots.push(f);
    };
    await shot('s0');
    for (let k = 1; k <= steps; k++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(wait);
      await shot('s' + k);
    }
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(wait);
    await shot('indietro');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(wait);
    await page.evaluate(() => Reveal.next());
    await page.waitForTimeout(400);
    await page.evaluate(() => Reveal.prev());
    await page.waitForTimeout(700);
    await shot('rientro');
    await grid(browser, shots, path.join(out, `${id}-grid.png`));
    console.log(`${id}: slide ${idx.h}${idx.v ? '.' + idx.v : ''}, ${steps} step`);
  }

  if (flag('sheet')) {
    const slides = await page.evaluate(() => Reveal.getSlides().map((s) => Reveal.getIndices(s)));
    const shots = [];
    for (const [n, i] of slides.entries()) {
      await page.evaluate((i) => Reveal.slide(i.h, i.v || 0, 999), i);
      await page.waitForTimeout(900);
      const f = path.join(out, `slide-${String(n).padStart(2, '0')}.png`);
      await page.screenshot({ path: f });
      shots.push(f);
    }
    await grid(browser, shots, path.join(out, 'foglio-provini.png'), 4);
    console.log(`foglio provini: ${slides.length} slide`);
  }

  if (flag('print')) {
    const p = await open(base + '?print-pdf');
    await p.waitForTimeout(2000);
    await p.emulateMedia({ media: 'print' });
    await p.pdf({ path: path.join(out, 'stampa.pdf'), width: '1280px', height: '720px', printBackground: true });
    console.log('pagine di stampa:', await p.evaluate(() => document.querySelectorAll('.pdf-page').length));
  }
} finally {
  await browser.close();
  server.close();
}

console.log('screenshot in', out);
if (problems.length) {
  console.log('PROBLEMI\n' + problems.join('\n'));
  process.exit(1);
}
console.log('nessun errore');
