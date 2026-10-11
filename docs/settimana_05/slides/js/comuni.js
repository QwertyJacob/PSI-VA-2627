/* Settimana 5: utilità comuni alle due lezioni (testi SVG, pallina del Lotto, fila di prove, barra a pezzetti, timer degli esercizi). */
window.S05 = (function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  // Azzurro = dati, arancio = modello, verde = successo, rosso = errore.
  var C = { data: '#38bdf8', model: '#fb923c', ok: '#38ef7d', red: '#ff6b6b', text: '#edf2f7', muted: '#a0aec0', axis: '#8292a8' };

  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's05-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
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
    return x.toFixed(digits).replace('.', ',');
  }

  // Una pallina del Lotto: bianca, bordo rosso, numero scuro.
  function ball(root, cx, cy, r, n, id) {
    var g = svg('g', {}, root);
    var gid = 's05-ball-' + id;
    var defs = svg('defs', {}, g);
    var grad = svg('radialGradient', { id: gid, cx: '38%', cy: '32%', r: '70%' }, defs);
    svg('stop', { offset: '0%', 'stop-color': '#ffffff' }, grad);
    svg('stop', { offset: '75%', 'stop-color': '#e2e8f0' }, grad);
    svg('stop', { offset: '100%', 'stop-color': '#a0aec0' }, grad);
    svg('circle', { cx: cx, cy: cy, r: r, fill: 'url(#' + gid + ')' }, g);
    svg('circle', { cx: cx, cy: cy, r: r * .62, fill: 'none', stroke: '#e53e3e', 'stroke-width': r * .07 }, g);
    text(g, cx, cy + r * .24, String(n), '', { 'text-anchor': 'middle', style: 'font:800 ' + Math.round(r * .68) + 'px Inter, sans-serif;fill:#1a202c' });
    return g;
  }

  // Una casella della fila: «fallisce» neutra o «riesce» verde, con il fattore sotto.
  function trial(root, x, y, w, h, ok, title, sub, factor) {
    var g = svg('g', {}, root);
    svg('rect', { x: x, y: y, width: w, height: h, rx: 10, fill: ok ? C.ok : '#ffffff0a', stroke: ok ? C.ok : '#ffffff70', 'stroke-width': 2.5 }, g);
    var fill = ok ? '#0f172a' : C.text;
    if (title) text(g, x + w / 2, y + h * .42, title, 's05-small', { 'text-anchor': 'middle', style: 'fill:' + fill + (ok ? ';font-weight:700' : '') });
    if (sub) text(g, x + w / 2, y + h * .78, sub, 's05-label', { 'text-anchor': 'middle', style: 'font-weight:700;fill:' + fill });
    if (factor) text(g, x + w / 2, y + h + 38, factor, 's05-math', { 'text-anchor': 'middle', style: 'fill:' + (ok ? C.ok : C.text) });
    return g;
  }

  // Una barra «intervallo» divisa in n pezzetti; events = indici dei pezzetti pieni.
  function pieces(root, x, y, w, h, n, events, color) {
    var g = svg('g', {}, root);
    svg('rect', { x: x, y: y, width: w, height: h, rx: 4, fill: '#ffffff08', stroke: '#ffffffa0', 'stroke-width': 2 }, g);
    for (var i = 1; i < n; i++) line(g, x + w * i / n, y, x + w * i / n, y + h, '#ffffff70', n > 40 ? .8 : 2);
    (events || []).forEach(function (e) {
      svg('circle', { cx: x + w * (e + .5) / n, cy: y + h / 2, r: Math.min(h * .28, w / n * .32), fill: color || C.model }, g);
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

  return { C: C, label: label, line: line, arrowMarker: arrowMarker, it: it, ball: ball, trial: trial, pieces: pieces, timers: timers };
})();
