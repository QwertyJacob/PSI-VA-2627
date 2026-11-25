/*
 * Settimana 9: il teorema del limite centrale.
 * Utilità comuni alle due lezioni (base: Settimana 8): testi SVG, numeri
 * all'italiana, assi, la funzione Φ e la densità normale, le distribuzioni
 * esatte usate dalle scene (somma di n dadi, somma di n uniformi, gamma per
 * le somme di esponenziali, binomiale, Cauchy), i timer degli esercizi.
 * Le scene stanno in lezione1.js e lezione2.js, nell'ordine delle slide.
 */
window.S09 = (function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  // Azzurro = valori veri e dati, arancio = limiti e modello,
  // verde = valore cercato, rosso = fuori dal margine, viola = terzo caso.
  var C = { data: '#38bdf8', model: '#fb923c', ok: '#38ef7d', third: '#c084fc', red: '#ff6b6b',
    text: '#edf2f7', muted: '#a0aec0', axis: '#8292a8', grid: '#ffffff22', dark: '#191919' };

  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's09-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  function line(root, x1, y1, x2, y2, color, width, extra) {
    return svg('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, 'stroke-width': width || 3 }, extra), root);
  }
  function poly(root, pts, color, width, extra) {
    return svg('polyline', Object.assign({ points: pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '),
      fill: 'none', stroke: color, 'stroke-width': width || 3, 'stroke-linejoin': 'round' }, extra), root);
  }
  function area(root, pts, color, opacity) {
    return svg('polygon', { points: pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '),
      fill: color, 'fill-opacity': opacity == null ? .3 : opacity }, root);
  }
  // Numeri all'italiana: virgola decimale, meno tipografico.
  function it(x, digits) {
    return x.toFixed(digits).replace('.', ',').replace('-', '−');
  }
  function migliaia(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  // Valori [v0, v1] → pixel [P0, P1] (anche decrescente, per gli assi verticali).
  function scale(v0, v1, P0, P1) {
    return function (v) { return P0 + (v - v0) * (P1 - P0) / (v1 - v0); };
  }

  // Φ della normale standard (Abramowitz–Stegun 7.1.26, errore < 1,5·10⁻⁷).
  function erf(x) {
    var s = x < 0 ? -1 : 1; x = Math.abs(x);
    var t = 1 / (1 + 0.3275911 * x);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function npdf(z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); }


  // Densità normale con media m e deviazione standard s.
  function ndens(x, m, s) { var z = (x - m) / s; return Math.exp(-z * z / 2) / (s * Math.sqrt(2 * Math.PI)); }

  // Densità della somma di n uniformi tra 0 e 1 (Irwin–Hall).
  var fact = [1];
  for (var f = 1; f <= 170; f++) fact[f] = fact[f - 1] * f;
  function comb(n, k) { return fact[n] / (fact[k] * fact[n - k]); }
  function ihPdf(x, n) {
    if (x < 0 || x > n) return 0;
    if (n === 1) return 1;
    var s = 0;
    for (var k = 0; k <= Math.floor(x); k++) s += (k % 2 ? -1 : 1) * comb(n, k) * Math.pow(x - k, n - 1);
    return s / fact[n - 1];
  }

  // Densità gamma con forma intera n e scala 1: somma di n esponenziali con media 1.
  function gammaPdf(x, n) {
    if (x <= 0) return n === 1 && x === 0 ? 1 : 0;
    var lg = 0;
    for (var k = 2; k < n; k++) lg += Math.log(k);
    return Math.exp((n - 1) * Math.log(x) - x - lg);
  }

  // Densità di Cauchy standard.
  function cauchyPdf(x) { return 1 / (Math.PI * (1 + x * x)); }

  // PMF binomiale con i logaritmi dei fattoriali (va bene anche per n = 3600).
  var lf = [0];
  function logFact(n) { for (var k = lf.length; k <= n; k++) lf[k] = lf[k - 1] + Math.log(k); return lf[n]; }
  function binom(k, n, p) {
    if (k < 0 || k > n) return 0;
    return Math.exp(logFact(n) - logFact(k) - logFact(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
  }

  // Distribuzione della somma di n dadi: { somma: probabilità }.
  function dadi(n) {
    var pmf = { 0: 1 };
    for (var k = 0; k < n; k++) {
      var nuova = {};
      Object.keys(pmf).forEach(function (s) {
        for (var f = 1; f <= 6; f++) nuova[+s + f] = (nuova[+s + f] || 0) + pmf[s] / 6;
      });
      pmf = nuova;
    }
    return pmf;
  }

  // Assi semplici: rettangolo di riferimento con tacche.
  function axes(root, box, xt, yt) {
    var g = svg('g', {}, root);
    line(g, box.x, box.y + box.h, box.x + box.w, box.y + box.h, C.axis, 2);
    line(g, box.x, box.y, box.x, box.y + box.h, C.axis, 2);
    (xt || []).forEach(function (t) {
      line(g, t[0], box.y + box.h, t[0], box.y + box.h + 7, C.axis, 2);
      label(g, t[0], box.y + box.h + 30, t[1], 's09-tick');
    });
    (yt || []).forEach(function (t) {
      line(g, box.x - 7, t[0], box.x, t[0], C.axis, 2);
      label(g, box.x - 12, t[0] + 8, t[1], 's09-tick', { 'text-anchor': 'end' });
    });
    return g;
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

  return { C: C, label: label, line: line, poly: poly, area: area, it: it, migliaia: migliaia, scale: scale,
    Phi: Phi, npdf: npdf, ndens: ndens, ihPdf: ihPdf, gammaPdf: gammaPdf, cauchyPdf: cauchyPdf, binom: binom,
    dadi: dadi, axes: axes, timers: timers };
})();
