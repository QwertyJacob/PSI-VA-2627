/*
 * Settimana 6: variabili aleatorie continue e distribuzione normale.
 * Utilità comuni alle due lezioni: testi SVG, curve, aree, Φ, la densità
 * dell'autobus, i timer degli esercizi. Le scene stanno in lezione1.js
 * e lezione2.js, nell'ordine delle slide.
 */
window.S06 = (function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  // Azzurro = dati e aree, arancio = modello, verde = valore cercato, viola = terza fascia, rosso = errore.
  var C = { data: '#38bdf8', model: '#fb923c', ok: '#38ef7d', third: '#c084fc', red: '#ff6b6b',
    text: '#edf2f7', muted: '#a0aec0', axis: '#8292a8', dark: '#191919' };

  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's06-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
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
  // Numeri all'italiana: virgola decimale.
  function it(x, digits) {
    return x.toFixed(digits).replace('.', ',').replace('-', '−');
  }

  // Un sistema di assi: valori [v0, v1] → pixel [X0, X1]; altezze con scala ky sopra la base Y.
  function frame(v0, v1, X0, X1, Y, ky) {
    var k = (X1 - X0) / (v1 - v0);
    return {
      X: function (v) { return X0 + (v - v0) * k; },
      Y: function (h) { return Y - h * ky; },
      base: Y, k: k
    };
  }
  // Punti di una curva fn tra a e b.
  function points(fn, a, b, n, F) {
    var pts = [];
    for (var i = 0; i <= n; i++) {
      var v = a + (b - a) * i / n;
      pts.push([F.X(v), F.Y(fn(v))]);
    }
    return pts;
  }
  function pathOf(pts) {
    return pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  }
  function lengthOf(pts) {
    var s = 0;
    for (var i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return s;
  }
  function curve(fn, a, b, n, F) { return pathOf(points(fn, a, b, n, F)); }
  // Area sotto fn tra a e b, chiusa sulla base.
  function area(fn, a, b, n, F) {
    if (b <= a) return 'M0 0';
    var pts = points(fn, a, b, n, F);
    return 'M' + F.X(a).toFixed(1) + ' ' + F.base + ' ' + pathOf(pts).replace(/^M/, 'L') + ' L' + F.X(b).toFixed(1) + ' ' + F.base + ' Z';
  }
  // Una curva che si disegna: path + lunghezza calcolata a mano (vale anche nelle slide nascoste).
  function drawnCurve(root, fn, a, b, n, F, attrs) {
    var pts = points(fn, a, b, n, F);
    var p = svg('path', Object.assign({ d: pathOf(pts), fill: 'none' }, attrs), root);
    p.len = lengthOf(pts);
    return p;
  }

  // Normale: erf di Abramowitz e Stegun (7.1.26), errore < 1,5e-7.
  function erf(x) {
    var s = x < 0 ? -1 : 1, a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function npdf(x, mu, sigma) {
    var z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
  }
  function expo(lam) { return function (t) { return t < 0 ? 0 : lam * Math.exp(-lam * t); }; }
  // L'autobus della Lezione 1: minuti dopo le 14:00, Beta(2, 4) riscalata su [0, 30]
  // (la stessa densità delle figure della dispensa). fbus in probabilità per minuto.
  function fbus(t) { var u = t / 30; return u < 0 || u > 1 ? 0 : 20 * u * Math.pow(1 - u, 3) / 30; }
  function Fbus(t) { var u = Math.min(Math.max(t / 30, 0), 1); return 1 - Math.pow(1 - u, 5) - 5 * u * Math.pow(1 - u, 4); }

  // Assi orizzontali con tacche ed etichette: ticks = [[valore, testo], ...].
  function xAxis(root, F, v0, v1, ticks, unit, opts) {
    opts = opts || {};
    var g = svg('g', {}, root), y = F.base;
    line(g, F.X(v0) - 10, y, F.X(v1) + 14, y, opts.color || C.axis, 2);
    ticks.forEach(function (t) {
      line(g, F.X(t[0]), y, F.X(t[0]), y + 7, opts.color || C.axis, 2);
      label(g, F.X(t[0]), y + 30, t[1], opts.cls || 's06-small');
    });
    if (unit) label(g, F.X(v1) + 14, y + 30, unit, 's06-small', { 'text-anchor': 'end', dy: opts.unitDy != null ? opts.unitDy : 24 });
    return g;
  }
  function yAxis(root, F, x, h1, ticks) {
    var g = svg('g', {}, root);
    line(g, x, F.base, x, F.Y(h1), C.axis, 2);
    ticks.forEach(function (t) {
      line(g, x - 6, F.Y(t[0]), x, F.Y(t[0]), C.axis, 2);
      label(g, x - 12, F.Y(t[0]) + 6, t[1], 's06-small', { 'text-anchor': 'end' });
    });
    return g;
  }

  // Timer degli esercizi: <div class="ex-timer" data-min="8">. Clic: avvia/pausa;
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

  return { C: C, label: label, line: line, arrowMarker: arrowMarker, it: it, frame: frame, points: points,
    pathOf: pathOf, lengthOf: lengthOf, curve: curve, area: area, drawnCurve: drawnCurve,
    Phi: Phi, npdf: npdf, expo: expo, fbus: fbus, Fbus: Fbus, xAxis: xAxis, yAxis: yAxis, timers: timers };
})();
