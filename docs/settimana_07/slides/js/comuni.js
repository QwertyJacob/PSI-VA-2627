/*
 * Settimana 7: distribuzioni congiunte, covarianza e correlazione.
 * Utilità comuni alle due lezioni: testi SVG, numeri all'italiana, la tabella
 * di Galton (1886) e la sua nuvola di punti, nuvole con correlazione data,
 * le tabelle HTML evidenziabili, i timer degli esercizi. Le scene stanno in
 * lezione1.js e lezione2.js, nell'ordine delle slide.
 */
window.S07 = (function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  // Azzurro = dati e prodotti positivi, arancio = modello e prodotti negativi,
  // verde = valore cercato, viola = terza variabile, rosso = errore.
  var C = { data: '#38bdf8', model: '#fb923c', ok: '#38ef7d', third: '#c084fc', red: '#ff6b6b',
    text: '#edf2f7', muted: '#a0aec0', axis: '#8292a8', grid: '#ffffff22', dark: '#191919' };

  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's07-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  function line(root, x1, y1, x2, y2, color, width, extra) {
    return svg('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, 'stroke-width': width || 3 }, extra), root);
  }
  function arrowMarker(root, id, color) {
    var defs = svg('defs', {}, root);
    var m = svg('marker', { id: id, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs);
    svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m);
    return 'url(#' + id + ')';
  }
  // Numeri all'italiana: virgola decimale, meno tipografico.
  function it(x, digits) {
    return x.toFixed(digits).replace('.', ',').replace('-', '−');
  }

  // Valori [v0, v1] → pixel [P0, P1] (anche decrescente, per gli assi verticali).
  function scale(v0, v1, P0, P1) {
    return function (v) { return P0 + (v - v0) * (P1 - P0) / (v1 - v0); };
  }

  // ── La tabella di Galton (1886), altezze in pollici, versione HistData ──
  // Righe: genitore medio (classi estreme aperte); colonne: figlio adulto.
  var GALTON = {
    gen: [64.0, 64.5, 65.5, 66.5, 67.5, 68.5, 69.5, 70.5, 71.5, 72.5, 73.0],
    fig: [61.7, 62.2, 63.2, 64.2, 65.2, 66.2, 67.2, 68.2, 69.2, 70.2, 71.2, 72.2, 73.2, 73.7],
    N: [
      [1, 0, 2, 4, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 4, 4, 1, 5, 5, 0, 2, 0, 0, 0, 0, 0],
      [1, 0, 9, 5, 7, 11, 11, 7, 7, 5, 2, 1, 0, 0],
      [0, 3, 3, 5, 2, 17, 17, 14, 13, 4, 0, 0, 0, 0],
      [0, 3, 5, 14, 15, 36, 38, 28, 38, 19, 11, 4, 0, 0],
      [1, 0, 7, 11, 16, 25, 31, 34, 48, 21, 18, 4, 3, 0],
      [0, 0, 1, 16, 4, 17, 27, 20, 33, 25, 20, 11, 4, 5],
      [1, 0, 1, 0, 1, 1, 3, 12, 18, 14, 7, 4, 3, 3],
      [0, 0, 0, 0, 1, 3, 4, 3, 5, 10, 4, 9, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 7, 2, 4],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0]]
  };
  var CM = 2.54;
  // Un punto per figlio, in centimetri, spostato a caso di mezzo pollice al
  // massimo dentro la sua classe (seme fisso), come nella figura della dispensa.
  function galtonPoints(seed) {
    var r = PSI.random(seed || 1886), out = [];
    GALTON.N.forEach(function (row, i) {
      row.forEach(function (n, j) {
        for (var k = 0; k < n; k++) {
          out.push([CM * (GALTON.gen[i] + r() - .5), CM * (GALTON.fig[j] + r() - .5)]);
        }
      });
    });
    return out;
  }
  // Altezza media dei figli (cm) per ogni classe di genitori.
  function galtonRowMeans() {
    return GALTON.N.map(function (row, i) {
      var n = 0, s = 0;
      row.forEach(function (c, j) { n += c; s += c * GALTON.fig[j]; });
      return { gen: CM * GALTON.gen[i], fig: CM * s / n, n: n };
    });
  }

  // Coppie normali standard con correlazione rho (Box-Muller, seme fisso).
  function normals(seed, n) {
    var r = PSI.random(seed), out = [];
    for (var i = 0; i < n; i++) {
      var u = Math.max(r(), 1e-12), v = r(), m = Math.sqrt(-2 * Math.log(u));
      out.push([m * Math.cos(2 * Math.PI * v), m * Math.sin(2 * Math.PI * v)]);
    }
    return out;
  }
  function correlated(base, rho) {
    var s = Math.sqrt(Math.max(0, 1 - rho * rho));
    return base.map(function (z) { return [z[0], rho * z[0] + s * z[1]]; });
  }
  // Medie, deviazioni standard, covarianza e correlazione di una nuvola.
  function stats(pts) {
    var n = pts.length, mx = 0, my = 0, sxx = 0, syy = 0, sxy = 0;
    pts.forEach(function (p) { mx += p[0]; my += p[1]; });
    mx /= n; my /= n;
    pts.forEach(function (p) {
      var dx = p[0] - mx, dy = p[1] - my;
      sxx += dx * dx; syy += dy * dy; sxy += dx * dy;
    });
    return { mx: mx, my: my, sx: Math.sqrt(sxx / n), sy: Math.sqrt(syy / n), cov: sxy / n, r: sxy / Math.sqrt(sxx * syy) };
  }

  // Una nuvola dentro un riquadro: punti colorati secondo il segno del
  // prodotto degli scarti (azzurro positivo, arancio negativo).
  function cloud(root, pts, box, opts) {
    opts = opts || {};
    var st = stats(pts), g = svg('g', {}, root);
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    var x0 = opts.x0 != null ? opts.x0 : Math.min.apply(null, xs), x1 = opts.x1 != null ? opts.x1 : Math.max.apply(null, xs);
    var y0 = opts.y0 != null ? opts.y0 : Math.min.apply(null, ys), y1 = opts.y1 != null ? opts.y1 : Math.max.apply(null, ys);
    var X = scale(x0, x1, box.x + 10, box.x + box.w - 10), Y = scale(y0, y1, box.y + box.h - 10, box.y + 10);
    svg('rect', { x: box.x, y: box.y, width: box.w, height: box.h, rx: 10, fill: '#ffffff06', stroke: C.grid, 'stroke-width': 1.5 }, g);
    pts.forEach(function (p) {
      var pos = (p[0] - st.mx) * (p[1] - st.my) > 0;
      svg('circle', { cx: X(p[0]).toFixed(1), cy: Y(p[1]).toFixed(1), r: opts.r || 4,
        fill: opts.mono ? C.muted : (pos ? C.data : C.model), opacity: .8 }, g);
    });
    g.stats = st;
    return g;
  }

  // ── Tabelle HTML con caselle evidenziabili (tabella-studenti e simili) ──
  // data-r / data-c sulle <td>: S07.cells(section, '[data-c="1"]') le trova.
  function cells(section, sel) {
    return Array.prototype.slice.call(section.querySelectorAll('td' + sel));
  }

  // Timer degli esercizi: <div class="ex-timer" data-min="4">. Clic: avvia/pausa;
  // doppio clic: azzera. Un frammento .ex-go nella stessa slide lo azzera e lo avvia;
  // tornando indietro oltre quel frammento il timer si azzera.
  function timers(deck) {
    var all = [];
    document.querySelectorAll('.reveal .ex-timer').forEach(function (el) {
      var t = { el: el, total: +el.dataset.min * 60, left: 0, id: null };
      function show() {
        var s = Math.max(0, Math.ceil(t.left));
        el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
        el.classList.toggle('done', t.left <= 0);
      }
      t.stop = function () { clearInterval(t.id); t.id = null; el.classList.remove('running'); };
      t.reset = function () { t.stop(); t.left = t.total; show(); };
      t.start = function () {
        if (t.id || t.left <= 0) return;
        var last = Date.now();
        el.classList.add('running');
        t.id = setInterval(function () {
          var now = Date.now();
          t.left -= (now - last) / 1000;
          last = now;
          show();
          if (t.left <= 0) t.stop();
        }, 250);
      };
      el.addEventListener('click', function () { if (t.id) t.stop(); else t.start(); });
      el.addEventListener('dblclick', function () { t.reset(); });
      t.reset();
      t.section = el.closest('section');
      all.push(t);
    });
    function find(fragment) {
      if (!fragment || !fragment.classList.contains('ex-go')) return null;
      var section = fragment.closest('section');
      return all.filter(function (t) { return t.section === section; })[0] || null;
    }
    deck.on('fragmentshown', function (e) { var t = find(e.fragment); if (t) { t.reset(); t.start(); } });
    deck.on('fragmenthidden', function (e) { var t = find(e.fragment); if (t) t.reset(); });
  }

  return { C: C, label: label, line: line, arrowMarker: arrowMarker, it: it, scale: scale,
    GALTON: GALTON, CM: CM, galtonPoints: galtonPoints, galtonRowMeans: galtonRowMeans,
    normals: normals, correlated: correlated, stats: stats, cloud: cloud, cells: cells, timers: timers };
})();
