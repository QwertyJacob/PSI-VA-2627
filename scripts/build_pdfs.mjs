/**
 * Renders one PDF per chapter from the built site, using headless Chromium so
 * that MathJax formulas and Chart.js widgets come out exactly as on screen.
 *
 *   .venv/bin/mkdocs build --strict     # writes site/pdf/manifest.json (scripts/pdf_hook.py)
 *   node scripts/build_pdfs.mjs         # writes site/pdf/<chapter>.pdf
 *
 * Options:
 *   --site <dir>            built site directory            (default: site)
 *   --only <substring>      only chapters whose PDF path contains it (debugging)
 *   --max-code-lines <n>    code blocks longer than this are replaced by a note
 *                           pointing at the online version (default: 30)
 *   --concurrency <n>       parallel browser tabs            (default: 3)
 *
 * For each chapter the page is loaded in a real browser (screen media, so the
 * widgets mount and take their print snapshots), then, once MathJax, fonts,
 * images and widget snapshots have settled, collapsed proofs are opened, long
 * code blocks are swapped for a placeholder, print media is switched on and
 * the page is exported as A4 with a running header and page numbers.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { promises as fs, createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_CODE_LINES_DEFAULT = 30;

// ---------------------------------------------------------------- arguments
const args = process.argv.slice(2);
function opt(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
}
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_DIR = path.resolve(ROOT, opt('--site', 'site'));
const ONLY = opt('--only', null);
const MAX_CODE_LINES = Number(opt('--max-code-lines', MAX_CODE_LINES_DEFAULT));
const CONCURRENCY = Number(opt('--concurrency', 3));

// ------------------------------------------------------- tiny static server
// Serves site/ exactly like GitHub Pages would (directory URLs -> index.html),
// so the pages fetch their own CSS/JS with the same relative paths as in prod.
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain',
};
function startServer(rootDir) {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let filePath = path.join(rootDir, urlPath);
      if (!filePath.startsWith(rootDir)) { res.writeHead(403); return res.end(); }
      let stat = await fs.stat(filePath).catch(() => null);
      if (stat && stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        stat = await fs.stat(filePath).catch(() => null);
      }
      if (!stat) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Content-Length': stat.size,
      });
      createReadStream(filePath).pipe(res);
    } catch (e) {
      res.writeHead(500); res.end(String(e));
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

// ------------------------------------------------------- in-page preparation
// Runs inside the browser right before switching to print media.
function preparePageForPdf({ maxCodeLines, onlineUrl }) {
  // Collapsed blocks ("??? note" proofs, Manim sources) are unreachable on
  // paper, so open them all.
  document.querySelectorAll('details').forEach((d) => { d.open = true; });

  // Replace code blocks longer than the threshold with a short note. Short
  // blocks (the didactic ones) stay in the PDF untouched.
  let omitted = 0;
  document.querySelectorAll('.md-typeset pre > code').forEach((code) => {
    const lines = code.textContent.replace(/\n$/, '').split('\n').length;
    if (lines <= maxCodeLines) return;
    const wrapper = code.closest('.highlight') || code.closest('pre');
    const runnable = !!code.closest('.psi-exec');
    const note = document.createElement('div');
    note.className = 'psi-print-omitted';
    const link = document.createElement('a');
    link.href = onlineUrl;
    link.textContent = 'versione online del capitolo';
    note.append(
      `Blocco di codice di ${lines} righe omesso dalla versione PDF: lo trovi` +
      (runnable ? ', e puoi eseguirlo direttamente nel browser, ' : ' ') + 'nella ',
      link, '.',
    );
    wrapper.replaceWith(note);
    omitted++;
  });

  // Formulas MathJax did not render would print as raw TeX: count them so the
  // build log shows it.
  let unrenderedMath = 0;
  document.querySelectorAll('.arithmatex').forEach((el) => {
    if (el.textContent.trim() && !el.querySelector('mjx-container')) unrenderedMath++;
  });
  return { omitted, unrenderedMath };
}

// ------------------------------------------------------------ PDF rendering
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const HF_STYLE = 'font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 8px; color: #777; ' +
                 'width: 100%; padding: 0 15mm; display: flex; justify-content: space-between;';

async function renderChapter(context, baseUrl, siteName, entry) {
  const page = await context.newPage();
  const problems = [];
  page.on('pageerror', (err) => {
    const msg = err.message || String(err);
    if (!msg.includes('api.github.com')) problems.push('JS: ' + msg.slice(0, 120));
  });
  try {
    await page.goto(baseUrl + entry.url, { waitUntil: 'load', timeout: 60000 });

    // MathJax: startup + the extra typeset pass mathjax-config.js triggers.
    await page.waitForFunction(() => window.MathJax && MathJax.startup && MathJax.startup.promise, null, { timeout: 45000 });
    await page.evaluate(() => MathJax.startup.promise);
    await page.evaluate(() => MathJax.typesetPromise());

    // Widgets: every one must have produced its print snapshot.
    await page.waitForFunction(() => {
      const widgets = Array.from(document.querySelectorAll('.psi-widget'));
      return widgets.every((w) => {
        const img = w.querySelector('.psi-print-snapshot');
        return img && img.src.startsWith('data:');
      });
    }, null, { timeout: 30000 });

    // Fonts and images.
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }));
    await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 30000 });

    const stats = await page.evaluate(preparePageForPdf, { maxCodeLines: MAX_CODE_LINES, onlineUrl: entry.public_url });
    if (stats.unrenderedMath) problems.push(`${stats.unrenderedMath} formule non renderizzate`);

    await page.emulateMedia({ media: 'print' });
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

    const outPath = path.join(SITE_DIR, entry.pdf);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    const buffer = await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', bottom: '18mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: `<div style="${HF_STYLE}"><span>${esc(siteName)}</span><span>${esc(entry.title)}</span></div>`,
      footerTemplate: `<div style="${HF_STYLE}"><span>${esc(entry.public_url)}</span>` +
                      `<span>Pagina <span class="pageNumber"></span> di <span class="totalPages"></span></span></div>`,
    });
    const pdfPages = (buffer.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    return { entry, ok: true, pdfPages, bytes: buffer.length, omitted: stats.omitted, problems };
  } catch (e) {
    problems.push(e.message.split('\n')[0].slice(0, 160));
    return { entry, ok: false, pdfPages: 0, bytes: 0, omitted: 0, problems };
  } finally {
    await page.close();
  }
}

// -------------------------------------------------------------------- main
(async () => {
  const manifestPath = path.join(SITE_DIR, 'pdf', 'manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8').catch(() => {
    console.error(`Manifest non trovato: ${manifestPath}\nEsegui prima: .venv/bin/mkdocs build --strict`);
    process.exit(2);
  }));
  let entries = manifest.pages;
  if (ONLY) entries = entries.filter((e) => e.pdf.includes(ONLY));
  if (entries.length === 0) { console.error('Nessun capitolo da renderizzare.'); process.exit(2); }

  const { server, port } = await startServer(SITE_DIR);
  const baseUrl = `http://127.0.0.1:${port}/`;
  const browser = await chromium.launch({ headless: true });
  // 2x device pixels: the widget snapshots are bitmaps, this keeps them crisp.
  const context = await browser.newContext({ deviceScaleFactor: 2, colorScheme: 'light', viewport: { width: 1280, height: 900 } });

  console.log(`Rendering ${entries.length} capitoli in PDF (max ${MAX_CODE_LINES} righe per blocco di codice)…\n`);
  const results = [];
  const queue = entries.slice();
  const worker = async () => {
    while (queue.length) {
      const entry = queue.shift();
      const r = await renderChapter(context, baseUrl, manifest.site_name, entry);
      results.push(r);
      const status = r.ok ? 'OK  ' : 'FAIL';
      const kb = (r.bytes / 1024).toFixed(0).padStart(5);
      console.log(`${status} ${r.entry.pdf.padEnd(58)} ${String(r.pdfPages).padStart(3)} pag. ${kb} KB  codice omesso: ${r.omitted}` +
                  (r.problems.length ? `\n     ! ${r.problems.join(' | ')}` : ''));
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, entries.length) }, worker));

  await context.close();
  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  const totalPages = results.reduce((s, r) => s + r.pdfPages, 0);
  console.log(`\n${results.length - failed.length}/${results.length} PDF generati, ${totalPages} pagine in totale.`);
  if (failed.length) {
    console.log('FALLITI: ' + failed.map((r) => r.entry.pdf).join(', '));
    process.exit(1);
  }
})();
