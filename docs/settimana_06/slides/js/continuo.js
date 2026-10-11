/*
 * Settimana 6: il continuo, l'Esponenziale e la Normale.
 * Utilità comuni (testi SVG, curve, aree, Φ, timer degli esercizi), poi le
 * scene della Lezione 1 e della Lezione 2 nell'ordine delle slide.
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
    Phi: Phi, npdf: npdf, expo: expo, xAxis: xAxis, yAxis: yAxis, timers: timers };
})();

/* ═════════════════════════════ LEZIONE 1 ═════════════════════════════ */
(function () {
  'use strict';
  var svg = PSI.svg, S = S06, C = S.C, label = S.label, line = S.line, it = S.it;
  var f3 = S.expo(3);

  // L1-02 · un cerchio, il triangolo inscritto, una corda «a caso», la domanda.
  PSI.scene('corda', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var cx = 350, cy = 250, R = 210;
    function P(deg) { var a = deg * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; }
    var circle = svg('circle', { cx: cx, cy: cy, r: R, fill: '#ffffff06', stroke: C.text, 'stroke-width': 3 }, root);
    var v = [P(-90), P(30), P(150)];
    var tri = svg('polygon', { points: v.map(function (p) { return p.join(','); }).join(' '), fill: 'none', stroke: C.muted,
      'stroke-width': 2.5, 'stroke-dasharray': '10 8' }, root);
    var side = line(root, v[1][0], v[1][1], v[2][0], v[2][1], C.model, 7, { 'stroke-linecap': 'round' });
    var sideLen = Math.hypot(v[1][0] - v[2][0], v[1][1] - v[2][1]);
    var e1 = P(197), e2 = P(332);
    var chord = line(root, e1[0], e1[1], e2[0], e2[1], C.data, 6, { 'stroke-linecap': 'round' });
    var dots = [e1, e2].map(function (p) { return svg('circle', { cx: p[0], cy: p[1], r: 8, fill: C.data }, root); });
    var q = label(root, cx, 525, 'Più lunga del lato?', 's06-big');
    gsap.set([tri, chord, dots, q, side], { opacity: 0 });
    PSI.draw(tl, circle, 2 * Math.PI * R, { duration: .9 });
    tl.to(tri, { opacity: 1, duration: .4 }).addLabel('s0');
    tl.set(chord, { opacity: 1 }).to(dots, { opacity: 1, duration: .15 });
    PSI.draw(tl, chord, Math.hypot(e2[0] - e1[0], e2[1] - e1[1]), { duration: .6 }, '<');
    tl.addLabel('s1');
    tl.fromTo(q, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5 }).addLabel('s2');
    tl.set(side, { opacity: 1 });
    PSI.draw(tl, side, sideLen, { duration: .6 });
    tl.addLabel('s3');
  });

  // L1-04 · tre metodi, tre costruzioni, tre nuvole di 300 corde (semi fissi), frequenze.
  PSI.scene('corde', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var R = 150, cy = 195, CX = [200, 590, 980], N = 300;
    var TITLES = ['1 · estremi a caso', '2 · distanza dal centro a caso', '3 · punto medio a caso'];
    var THEORY = ['1/3', '1/2', '1/4'], TVAL = [1 / 3, 1 / 2, 1 / 4];
    var SEEDS = [17, 1017, 2017];
    var clouds = [], cons = [], theory = [], freq = [];

    // Le corde: d = distanza dal centro in unità di raggio; lunga se d < 1/2.
    function generate(m, seed) {
      var r = PSI.random(seed), out = [];
      for (var i = 0; i < N; i++) {
        var p, q, d;
        if (m === 0) {
          var a = r() * 2 * Math.PI, b = r() * 2 * Math.PI;
          p = [Math.cos(a), Math.sin(a)]; q = [Math.cos(b), Math.sin(b)];
          d = Math.abs(Math.cos((a - b) / 2));
        } else {
          var th, x, y;
          if (m === 1) { th = r() * 2 * Math.PI; d = r(); }
          else { do { x = 2 * r() - 1; y = 2 * r() - 1; } while (x * x + y * y > 1); d = Math.sqrt(x * x + y * y); th = Math.atan2(y, x); }
          var mx = d * Math.cos(th), my = d * Math.sin(th), h = Math.sqrt(1 - d * d);
          p = [mx - h * Math.sin(th), my + h * Math.cos(th)];
          q = [mx + h * Math.sin(th), my - h * Math.cos(th)];
        }
        out.push({ p: p, q: q, long: d < .5 });
      }
      return out;
    }

    CX.forEach(function (cx, m) {
      var g = svg('g', {}, root);
      clouds.push(svg('g', {}, g));
      svg('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: C.text, 'stroke-width': 2.5 }, g);
      var tv = [-90, 30, 150].map(function (deg) { var a = deg * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
      svg('polygon', { points: tv.map(function (p) { return p.join(','); }).join(' '), fill: 'none', stroke: C.muted, 'stroke-width': 1.8, 'stroke-dasharray': '7 6', opacity: .8 }, g);
      label(g, cx, cy + R + 48, TITLES[m], 's06-label');
      theory.push(label(g, cx, cy + R + 92, THEORY[m], 's06-big s06-model', { style: 'font-size:38px', opacity: 0 }));
      freq.push(label(g, cx, cy + R + 130, '', 's06-label', { opacity: 0, style: 'font-size:21px' }));

      var k = svg('g', { opacity: 0 }, g);
      if (m === 0) {
        var A = tv[0], B = tv[2], Cc = tv[1];
        svg('path', { d: 'M' + A + ' L' + B + ' A' + R + ' ' + R + ' 0 0 0 ' + Cc + ' Z', fill: C.data, opacity: .28 }, k);
        svg('path', { d: 'M' + B + ' A' + R + ' ' + R + ' 0 0 0 ' + Cc, fill: 'none', stroke: C.data, 'stroke-width': 7 }, k);
        var e = [cx + R * Math.cos(1.85), cy + R * Math.sin(1.85)];
        line(k, A[0], A[1], e[0], e[1], C.data, 3.5);
        svg('circle', { cx: A[0], cy: A[1], r: 7, fill: C.text }, k);
        label(k, A[0], A[1] - 16, '60° su 180°', 's06-small halo');
      } else if (m === 1) {
        line(k, cx, cy, cx, cy + R, C.text, 2);
        line(k, cx, cy, cx, cy + R / 2, C.data, 9, { opacity: .8 });
        var y = cy + .3 * R, h = R * Math.sqrt(1 - .09);
        line(k, cx - h, y, cx + h, y, C.data, 3.5);
        svg('circle', { cx: cx, cy: cy, r: 5, fill: C.text }, k);
        label(k, cx + 18, cy + R / 4 + 6, 'metà raggio', 's06-small halo', { 'text-anchor': 'start' });
      } else {
        svg('circle', { cx: cx, cy: cy, r: R / 2, fill: C.data, opacity: .28 }, k);
        svg('circle', { cx: cx, cy: cy, r: R / 2, fill: 'none', stroke: C.data, 'stroke-width': 2.5 }, k);
        var mx = .2, my = -.15, dd = Math.hypot(mx, my), th = Math.atan2(my, mx), hh = Math.sqrt(1 - dd * dd);
        line(k, cx + R * (mx - hh * Math.sin(th)), cy + R * (my + hh * Math.cos(th)),
          cx + R * (mx + hh * Math.sin(th)), cy + R * (my - hh * Math.cos(th)), C.data, 3.5);
        svg('circle', { cx: cx + R * mx, cy: cy + R * my, r: 6, fill: C.model }, k);
        label(k, cx, cy + R / 2 + 22, 'area 1/4', 's06-small halo');
      }
      cons.push(k);

      var chords = generate(m, SEEDS[m]);
      var long = 0;
      chords.forEach(function (c) {
        if (c.long) long++;
        c.el = line(clouds[m], cx + R * c.p[0], cy + R * c.p[1], cx + R * c.q[0], cy + R * c.q[1],
          c.long ? C.data : C.muted, 1.3, { opacity: 0 });
      });
      clouds[m].chords = chords;
      freq[m].textContent = '300 corde: ' + it(long / N, 3) + '  ·  teoria ' + it(TVAL[m], 3);
    });

    var st = { n: 0 };
    function render() {
      var n = Math.round(st.n);
      clouds.forEach(function (g) {
        g.chords.forEach(function (c, i) { c.el.setAttribute('opacity', i < n ? .3 : 0); });
      });
    }
    render();
    tl.addLabel('s0');
    for (var m = 0; m < 3; m++) {
      tl.to(cons[m], { opacity: 1, duration: .5 }).fromTo(theory[m], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4 }).addLabel('s' + (m + 1));
    }
    tl.to(cons, { opacity: .35, duration: .4 })
      .to(st, { n: N, duration: 3, ease: 'none', onUpdate: render }).addLabel('s4');
    tl.to(freq, { opacity: 1, duration: .5, stagger: .15 }).addLabel('s5');
  });

  // L1-06 (S) · uniforme sul numero (1/2) o sul quadrato (3/4).
  PSI.scene('quadrato', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X1 = function (v) { return 100 + 9 * v; }, X2 = function (u) { return 100 + .09 * u; };
    function ruler(y, X, ticks, labels, from, to, frac, name) {
      var g = svg('g', {}, root);
      svg('rect', { x: X(from), y: y - 34, width: X(to) - X(from), height: 34, fill: C.data, opacity: .45 }, g);
      line(g, X(0), y, X(to), y, C.text, 3);
      ticks.forEach(function (t) { line(g, X(t), y, X(t), y + 10, C.axis, 2); });
      labels.forEach(function (l) { label(g, X(l[0]), y + 38, l[1], 's06-small', l[2] ? { style: 'fill:' + C.ok + ';font-weight:700' } : {}); });
      label(g, (X(from) + X(to)) / 2, y - 48, frac, 's06-big s06-data', { style: 'font-size:38px' });
      label(g, X(0) - 20, y + 8, name, 's06-label', { 'text-anchor': 'end' });
      return g;
    }
    var t1 = [], t2 = [];
    for (var i = 0; i <= 100; i += 10) t1.push(i);
    for (i = 0; i <= 10000; i += 1000) t2.push(i);
    var r1 = ruler(120, X1, t1, [[0, '0'], [50, '50', 1], [100, '100']], 50, 100, '1/2', 'x');
    var links = svg('g', {}, root);
    [10, 20, 30, 40, 60, 70, 80, 90].forEach(function (v) {
      line(links, X1(v), 168, X2(v * v), 262, C.muted, 1.2, { opacity: .55 });
    });
    line(links, X1(50), 168, X2(2500), 262, C.ok, 3);
    var r2 = ruler(320, X2, t2, [[0, '0'], [2500, '2.500', 1], [10000, '10.000']], 2500, 10000, '3/4', 'x²');
    var quote = q.one('.nq-quote');
    gsap.set([r1, links, r2, quote], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(r1, { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(links, { opacity: 1, duration: .5 }).to(r2, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(quote, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L1-07 · il cronometro aggiunge cifre: 1/10, 1/100, 1/10⁶, … → 0.
  PSI.scene('cifre', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    svg('rect', { x: 290, y: 52, width: 100, height: 26, rx: 8, fill: '#ffffff18', stroke: '#ffffff50', 'stroke-width': 2 }, root);
    svg('rect', { x: 30, y: 78, width: 660, height: 200, rx: 36, fill: '#0b1220', stroke: '#ffffff60', 'stroke-width': 3 }, root);
    label(root, 360, 316, 'tempo di risposta T, in secondi', 's06-small');
    var disp = label(root, 360, 202, '0,3', 's06-mono s06-ok', { style: 'font-size:60px' });
    label(root, 850, 70, 'caselle', 's06-small');
    label(root, 1010, 70, 'P(«0,3…»)', 's06-small');
    line(root, 760, 84, 1090, 84, '#ffffff30', 2);
    var ROWS = [['10', '1/10'], ['100', '1/100'], ['10⁶', '1/10⁶'], ['∞', '0']];
    var rows = ROWS.map(function (r, i) {
      var g = svg('g', { opacity: 0 }, root), y = 130 + i * 62;
      label(g, 850, y, r[0], 's06-big', { style: 'font-size:36px' });
      label(g, 1010, y, r[1], 's06-big', { style: 'font-size:36px' + (i === 3 ? ';fill:' + C.ok : '') });
      return g;
    });
    var punch = q.one('.cf-punch');
    var st = { d: 1 };
    function render() {
      var d = Math.round(st.d);
      disp.textContent = '0,3' + '0'.repeat(Math.max(0, d - 1)) + (d > 6 ? '…' : '');
    }
    render();
    gsap.set(punch, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(rows[0], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(st, { d: 2, duration: .01, onUpdate: render }).to(rows[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(st, { d: 6, duration: .6, ease: 'none', onUpdate: render }).to(rows[2], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(st, { d: 12, duration: 1.6, ease: 'none', onUpdate: render }).to(rows[3], { opacity: 1, duration: .5 }).addLabel('s4');
    tl.to(punch, { opacity: 1, duration: .5 }).addLabel('s5');
  });

  // L1-08 · barre da 0,4 a 0,05 s: prima la frazione (sparisce), poi frazione ÷ larghezza (resta).
  PSI.scene('istogrammi', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(0, 1.2, 130, 1030, 455, 112);
    var W = [0.4, 0.2, 0.1, 0.05], PER = [8, 4, 2, 1], NF = 24, FW = F.k * .05;
    S.yAxis(root, F, 130, 3.3, [[1, '1'], [2, '2'], [3, '3']]);
    S.xAxis(root, F, 0, 1.2, [[0, '0'], [.4, '0,4'], [.8, '0,8'], [1.2, '1,2']], 't (secondi)');
    var yl1 = label(root, 130, 50, 'frazione della barra', 's06-small', { 'text-anchor': 'start' });
    var yl2 = label(root, 130, 50, 'frazione ÷ larghezza', 's06-small s06-ok', { 'text-anchor': 'start', opacity: 0 });
    var rule = label(root, 1150, 60, 'altezza = probabilità ÷ larghezza', 's06-label s06-ok', { 'text-anchor': 'end', opacity: 0 });
    var widthTxt = label(root, 1150, 110, '', 's06-label', { 'text-anchor': 'end' });
    var gone = label(root, 600, 330, 'così spariscono', 's06-big s06-red', { opacity: 0 });
    var bars = [], seps = [];
    for (var i = 0; i < NF; i++) bars.push(svg('rect', { x: F.X(i * .05), width: FW + .6, fill: C.data, opacity: .6 }, root));
    for (i = 1; i < NF; i++) seps.push(line(root, F.X(i * .05), F.base, F.X(i * .05), F.base, '#191919', 2.5));
    var outline = svg('path', { fill: 'none', stroke: C.data, 'stroke-width': 2.5 }, root);
    var fcurve = S.drawnCurve(root, f3, 0, 1.2, 160, F, { stroke: C.model, 'stroke-width': 4.5, opacity: 0 });
    var fname = label(root, F.X(.2), F.Y(f3(.2)) - 52, 'densità f(t) = 3e^(−3t)', 's06-label s06-model s06-bold', { 'text-anchor': 'start', opacity: 0 });

    function h(L, i, dens) {
      var w = W[L], j = Math.floor(i * .05 / w + 1e-9);
      var p = Math.exp(-3 * j * w) - Math.exp(-3 * (j + 1) * w);
      return p * (1 - dens) + p / w * dens;
    }
    var st = { L: 0, dens: 0 };
    function render() {
      var L0 = Math.floor(st.L), L1 = Math.min(3, L0 + 1), u = st.L - L0, hs = [];
      for (var i = 0; i < NF; i++) {
        var v = h(L0, i, st.dens) * (1 - u) + h(L1, i, st.dens) * u;
        hs.push(v);
        bars[i].setAttribute('y', F.Y(v));
        bars[i].setAttribute('height', Math.max(0, v * 112));
      }
      var d = 'M' + F.X(0) + ' ' + F.base;
      hs.forEach(function (v, i) { d += ' L' + F.X(i * .05) + ' ' + F.Y(v) + ' L' + F.X((i + 1) * .05) + ' ' + F.Y(v); });
      outline.setAttribute('d', d + ' L' + F.X(1.2) + ' ' + F.base);
      seps.forEach(function (s, k) {
        var kk = k + 1, o = (kk % PER[L0] === 0 ? 1 - u : 0) + (kk % PER[L1] === 0 ? u : 0);
        s.setAttribute('y2', F.Y(Math.max(hs[k], hs[kk])));
        s.setAttribute('opacity', o);
      });
      widthTxt.textContent = 'barre larghe ' + it(W[Math.round(st.L)], Math.round(st.L) === 3 ? 2 : 1) + ' s';
      yl1.setAttribute('opacity', 1 - st.dens);
      yl2.setAttribute('opacity', st.dens);
    }
    render();
    tl.addLabel('s0');
    tl.to(st, { L: 1, duration: 1, ease: 'power1.inOut', onUpdate: render }).to(gone, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(gone, { opacity: 0, duration: .3 })
      .to(st, { L: 0, duration: .6, ease: 'power1.inOut', onUpdate: render })
      .to(rule, { opacity: 1, duration: .4 })
      .to(st, { dens: 1, duration: 1.2, ease: 'power1.inOut', onUpdate: render }).addLabel('s2');
    tl.to(st, { L: 1, duration: 1, ease: 'power1.inOut', onUpdate: render }).addLabel('s3');
    tl.to(st, { L: 2, duration: 1, ease: 'power1.inOut', onUpdate: render }).addLabel('s4');
    tl.to(st, { L: 3, duration: 1, ease: 'power1.inOut', onUpdate: render }).addLabel('s5');
    tl.set(fcurve, { opacity: 1 });
    PSI.draw(tl, fcurve, fcurve.len, { duration: 1.2 });
    tl.addLabel('s6');
    tl.to(fname, { opacity: 1, duration: .5 }).addLabel('s7');
  });

  // Asse e curva 3e^(−3t) comuni a «area», «densita-3», «uscita-1».
  function expPlot(root, F, ticks) {
    S.yAxis(root, F, F.X(0), 3.25, [[1, '1'], [2, '2'], [3, '3']]);
    S.xAxis(root, F, 0, 1.2, ticks || [[0, '0'], [.5, '0,5'], [1, '1']], 't (s)');
    var c = svg('path', { d: S.curve(f3, 0, 1.2, 160, F), fill: 'none', stroke: C.model, 'stroke-width': 4 }, root);
    return c;
  }

  // L1-09 · l'area tra 0,1 e 0,5; gli estremi si avvicinano; l'area totale.
  PSI.scene('area', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var F = S.frame(0, 1.2, 140, 1040, 350, 92);
    var total = svg('path', { d: S.area(f3, 0, 1.2, 160, F), fill: C.data, opacity: 0 }, root);
    var fill = svg('path', { fill: C.data, opacity: .55 }, root);
    expPlot(root, F, [[0, '0'], [.1, '0,1'], [.3, '0,3'], [.5, '0,5'], [1, '1']]);
    function handle() {
      var g = svg('g', {}, root);
      g.ln = line(g, 0, F.base, 0, 40, C.text, 2.5, { 'stroke-dasharray': '6 5' });
      g.dot = svg('circle', { r: 9, fill: C.text, cy: 40 }, g);
      return g;
    }
    var ha = handle(), hb = handle();
    var num = label(root, 0, 0, '', 's06-big s06-data halo', { opacity: 0, 'text-anchor': 'start' });
    var point = label(root, F.X(.3) + 30, 110, 'un punto: area 0', 's06-label s06-ok s06-bold halo', { 'text-anchor': 'start', opacity: 0 });
    var one = label(root, F.X(.62), 190, 'area totale = 1', 's06-big s06-data halo', { opacity: 0 });
    var box = q.one('.ar-formula');
    var st = { a: .1, b: .5, fill: 0 };
    function render() {
      var b = st.a + (st.b - st.a) * st.fill;
      fill.setAttribute('d', S.area(f3, st.a, b, 60, F));
      ha.ln.setAttribute('x1', F.X(st.a)); ha.ln.setAttribute('x2', F.X(st.a)); ha.dot.setAttribute('cx', F.X(st.a));
      hb.ln.setAttribute('x1', F.X(st.b)); hb.ln.setAttribute('x2', F.X(st.b)); hb.dot.setAttribute('cx', F.X(st.b));
      var v = Math.exp(-3 * st.a) - Math.exp(-3 * b), mid = (st.a + st.b) / 2;
      num.textContent = 'area ≈ ' + it(Math.max(0, v), 3);
      num.setAttribute('x', F.X(st.b) + 24);
      num.setAttribute('y', F.Y(f3(st.b)) - 40);
    }
    render();
    gsap.set(box, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { fill: 1, duration: 1, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(num, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(box, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(st, { a: .3, b: .3, duration: 2, ease: 'power2.inOut', onUpdate: render }).to(point, { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to([ha, hb, point, num, fill], { opacity: 0, duration: .4 })
      .to(total, { opacity: .45, duration: .8 }).to(one, { opacity: 1, duration: .4 }).addLabel('s5');
  });

  // L1-10 · f(0) = 3: una probabilità? Il rettangolino 3 × 0,01; la CDF.
  PSI.scene('densita-3', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(0, 1.2, 140, 1040, 470, 118);
    var rect = svg('rect', { x: F.X(0), y: F.Y(3), width: F.k * .01, height: 3 * 118, fill: C.ok, opacity: 0 }, root);
    expPlot(root, F);
    svg('circle', { cx: F.X(0), cy: F.Y(3), r: 17, fill: 'none', stroke: C.red, 'stroke-width': 4 }, root);
    label(root, 760, 100, 'Una probabilità vale 3?', 's06-huge', { style: 'font-size:60px' });
    var calc = svg('g', { opacity: 0 }, root);
    line(calc, F.X(.01) + 8, F.Y(2.4), 630, 185, C.ok, 2, { 'stroke-dasharray': '4 4' });
    label(calc, 640, 175, 'larghezza 0,01 s', 's06-label s06-ok', { 'text-anchor': 'start' });
    label(calc, 640, 228, '3 × 0,01 = 0,03', 's06-big s06-ok', { 'text-anchor': 'start' });
    label(calc, 640, 264, 'f è una probabilità per secondo', 's06-small', { 'text-anchor': 'start' });
    var cdf = svg('g', { opacity: 0 }, root);
    svg('rect', { x: 630, y: 296, width: 470, height: 100, rx: 10, fill: '#ffffff08', stroke: C.model, 'stroke-width': 2 }, cdf);
    label(cdf, 652, 336, 'F(x) = area a sinistra di x', 's06-label', { 'text-anchor': 'start' });
    label(cdf, 652, 376, 'P(a < X ≤ b) = F(b) − F(a)', 's06-label', { 'text-anchor': 'start' });
    tl.addLabel('s0');
    tl.to(rect, { opacity: .85, duration: .5 }).to(calc, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(cdf, { opacity: 1, duration: .5 }).addLabel('s2');
  });

  // L1-12 · Esercizio 1: la densità a gradini (statica).
  (function () {
    var root = document.querySelector('#esercizio-1 .scene-svg');
    if (!root) return;
    var F = S.frame(0, 2.4, 80, 520, 350, 300);
    svg('rect', { x: F.X(0), y: F.Y(.75), width: F.X(1) - F.X(0), height: .75 * 300, fill: C.data, opacity: .75 }, root);
    svg('rect', { x: F.X(1), y: F.Y(.25), width: F.X(2) - F.X(1), height: .25 * 300, fill: C.data, opacity: .3, stroke: C.data, 'stroke-width': 2 }, root);
    line(root, F.X(0), F.Y(.75), F.X(1), F.Y(.75), C.data, 3);
    S.yAxis(root, F, F.X(0), 1, [[.25, '0,25'], [.5, '0,5'], [.75, '0,75'], [1, '1']]);
    S.xAxis(root, F, 0, 2.4, [[0, '0'], [1, '1'], [2, '2']], 't (s)');
    label(root, F.X(0) + 8, 40, 'f(t)', 's06-label', { 'text-anchor': 'start' });
  })();

  // L1-13 · gli arrivi scorrono; la striscia vuota [0; 0,5]; poi [0; t].
  PSI.scene('attesa', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var Y = 130, F = S.frame(0, 3.4, 70, 1150, Y, 1);
    var r = PSI.random(143), t = 0, arr = [];
    while (true) { t += -Math.log(1 - r()) / 3; if (t > 3.4) break; arr.push(t); }
    var strip = svg('rect', { x: F.X(0), y: Y - 34, height: 68, width: 0, fill: C.ok, opacity: .2 }, root);
    var head = S.arrowMarker(root, 'at-arrow', C.axis);
    line(root, F.X(0) - 10, Y, F.X(3.4) + 20, Y, C.axis, 2.5, { 'marker-end': head });
    [0, 1, 2, 3].forEach(function (v) {
      line(root, F.X(v), Y - 8, F.X(v), Y + 8, C.axis, 2);
      label(root, F.X(v), Y + 70, it(v, 0) + ' s', 's06-small');
    });
    label(root, F.X(0), 40, 'adesso', 's06-small');
    var endTick = line(root, F.X(.5), Y - 40, F.X(.5), Y + 40, C.ok, 3, { 'stroke-dasharray': '6 4', opacity: 0 });
    var endLbl = label(root, F.X(.5), Y + 70, '0,5', 's06-label s06-ok s06-bold', { opacity: 0 });
    var empty = label(root, F.X(.25), Y - 46, 'nessun arrivo', 's06-small s06-ok', { opacity: 0 });
    var cursor = line(root, F.X(0), Y - 50, F.X(0), Y + 40, C.text, 2, { opacity: 0 });
    var dots = arr.map(function (a) { return svg('circle', { cx: F.X(a), cy: Y, r: 10, fill: C.model, opacity: 0 }, root); });
    var first = svg('g', { opacity: 0 }, root);
    line(first, F.X(0), Y + 30, F.X(arr[0]), Y + 30, C.data, 4);
    line(first, F.X(0), Y + 22, F.X(0), Y + 38, C.data, 3);
    line(first, F.X(arr[0]), Y + 22, F.X(arr[0]), Y + 38, C.data, 3);
    label(first, F.X(arr[0]) + 16, Y + 38, 'T = primo arrivo', 's06-label s06-data s06-bold', { 'text-anchor': 'start' });
    var lines = q.all('.at-lines p'), box = q.one('.at-box');
    var st = { now: 0, strip: 0 };
    function render() {
      cursor.setAttribute('x1', F.X(st.now)); cursor.setAttribute('x2', F.X(st.now));
      dots.forEach(function (d, i) { d.setAttribute('opacity', arr[i] <= st.now ? 1 : 0); });
      strip.setAttribute('width', F.X(st.strip) - F.X(0));
      endTick.setAttribute('x1', F.X(st.strip)); endTick.setAttribute('x2', F.X(st.strip));
      endLbl.setAttribute('x', F.X(st.strip));
      endLbl.textContent = st.strip > .55 ? 't' : '0,5';
      empty.setAttribute('x', F.X(st.strip / 2));
    }
    render();
    gsap.set([lines, box], { opacity: 0 });
    tl.addLabel('s0');
    tl.set(cursor, { opacity: .8 }).to(st, { now: 3.4, duration: 3, ease: 'none', onUpdate: render }).to(cursor, { opacity: 0, duration: .3 }).addLabel('s1');
    tl.to(st, { strip: .5, duration: .6, onUpdate: render })
      .to([endTick, endLbl, empty], { opacity: 1, duration: .3 }, '<')
      .to(dots[0], { attr: { r: 14 }, duration: .3 }).to(first, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(lines[0], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(lines[1], { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to(lines[2], { opacity: 1, duration: .4 }).addLabel('s5');
    tl.to(st, { strip: .64, duration: .6, onUpdate: render })
      .to(box, { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // L1-14 · la fila di pezzetti (statica, appare come frammento).
  (function () {
    var root = document.querySelector('#coda-media .scene-svg');
    if (!root) return;
    for (var i = 0; i < 9; i++) {
      var x = 13 + i * 66, ok = i === 8;
      svg('rect', { x: x, y: 18, width: 58, height: 56, rx: 8, fill: ok ? '#38ef7d30' : '#ffffff0a', stroke: ok ? C.ok : '#ffffff70', 'stroke-width': 2.5 }, root);
      if (ok) svg('circle', { cx: x + 29, cy: 46, r: 11, fill: C.model }, root);
    }
    label(root, 42, 102, '1/n s', 's06-small');
    label(root, 607, 102, 'primo arrivo', 's06-small s06-ok', { 'text-anchor': 'end' });
  })();

  // L1-17 · widget: la densità λe^(−λt), la media, P(T > 0,5), P(T > E[T]).
  (function () {
    var box = document.getElementById('ex-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out'), input = box.querySelector('input');
    var F = S.frame(0, 2, 90, 1050, 315, 35);
    S.yAxis(root, F, 90, 8.2, [[2, '2'], [4, '4'], [6, '6'], [8, '8']]);
    S.xAxis(root, F, 0, 2, [[0, '0'], [.5, '0,5'], [1, '1'], [1.5, '1,5'], [2, '2']], 't (s)');
    var fillA = svg('path', { fill: C.data, opacity: .18 }, root);
    svg('path', { d: S.curve(S.expo(3), 0, 2, 200, F), fill: 'none', stroke: C.muted, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' }, root);
    label(root, F.X(.06), F.Y(3) - 6, 'server: λ = 3', 's06-small', { 'text-anchor': 'start' });
    var live = svg('path', { fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    var mean = line(root, 0, F.base, 0, 40, C.ok, 3, { 'stroke-dasharray': '6 4' });
    var meanTxt = label(root, 0, 34, 'E[T]', 's06-label s06-ok s06-bold');
    var st = { lam: 3 };
    function render() {
      var lam = st.lam, fn = S.expo(lam), m = 1 / lam;
      box.querySelector('[data-v="lam"]').textContent = it(lam, 1);
      fillA.setAttribute('d', S.area(fn, 0, 2, 200, F));
      live.setAttribute('d', S.curve(fn, 0, 2, 200, F));
      mean.setAttribute('x1', F.X(m)); mean.setAttribute('x2', F.X(m));
      meanTxt.setAttribute('x', F.X(m));
      out.innerHTML = 'E[T] = 1/λ = <b>' + it(m, 3) + ' s</b><span class="sep">|</span>P(T &gt; 0,5) = <b>' + it(Math.exp(-.5 * lam), 3) +
        '</b><span class="sep">|</span>P(T &gt; E[T]) = <b>' + it(Math.exp(-1), 3) + '</b>';
    }
    function set(lam) { st.lam = lam; input.value = lam; render(); }
    input.addEventListener('input', function () { st.lam = +this.value; render(); });
    box.querySelectorAll('[data-lam]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.lam); this.blur(); });
    });
    set(3);
  })();

  // L1-18 · Esercizio 2: due secondi di silenzio e mezzo secondo davanti (statica).
  (function () {
    var root = document.querySelector('#esercizio-2 .scene-svg');
    if (!root) return;
    var Y = 150, F = S.frame(0, 3, 40, 520, Y, 1);
    svg('rect', { x: F.X(0), y: Y - 30, width: F.X(2) - F.X(0), height: 60, fill: '#ffffff20' }, root);
    svg('rect', { x: F.X(2), y: Y - 30, width: F.X(2.5) - F.X(2), height: 60, fill: 'none', stroke: C.ok, 'stroke-width': 3, 'stroke-dasharray': '8 5' }, root);
    var head = S.arrowMarker(root, 'e2-arrow', C.axis);
    line(root, F.X(0), Y, F.X(3) + 10, Y, C.axis, 2.5, { 'marker-end': head });
    [[0, '0'], [1, '1'], [2, '2'], [2.5, '2,5']].forEach(function (v) {
      line(root, F.X(v[0]), Y + 30, F.X(v[0]), Y + 40, C.axis, 2);
      label(root, F.X(v[0]), Y + 66, v[1] + ' s', 's06-small');
    });
    label(root, F.X(1), Y - 46, '2 s di silenzio', 's06-label');
    label(root, F.X(2.25), Y - 46, '+0,5 s?', 's06-label s06-ok s06-bold');
    label(root, F.X(2), Y + 112, '↑ adesso', 's06-label');
  })();

  // L1-21 · uscita: f(0) = 3, che cosa vuol dire? E una campana per mercoledì.
  PSI.scene('uscita-1', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(0, 1.2, 110, 470, 290, 75);
    expPlot(root, F);
    svg('circle', { cx: F.X(0), cy: F.Y(3), r: 15, fill: 'none', stroke: C.red, 'stroke-width': 4 }, root);
    label(root, 540, 120, 'f(0) = 3:', 's06-big', { 'text-anchor': 'start' });
    label(root, 540, 180, 'che cosa vuol dire,', 's06-big', { 'text-anchor': 'start' });
    label(root, 540, 238, 'se non è una probabilità?', 's06-big', { 'text-anchor': 'start' });
    var ans = label(root, 540, 300, '→ probabilità per secondo', 's06-big s06-ok', { 'text-anchor': 'start', opacity: 0 });
    var B = S.frame(-3.4, 3.4, 150, 590, 410, 160);
    var bell = svg('g', { opacity: .45 }, root);
    svg('path', { d: S.area(function (x) { return S.npdf(x, 0, 1); }, -3.4, 3.4, 100, B), fill: C.muted, opacity: .35 }, bell);
    label(root, 630, 400, 'mercoledì: un asteroide perduto', 's06-label', { 'text-anchor': 'start', style: 'fill:#a0aec0;font-style:italic' });
    tl.addLabel('s0');
    tl.fromTo(ans, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: .5 }).addLabel('s1');
  });
})();

/* ═════════════════════════════ LEZIONE 2 ═════════════════════════════ */
(function () {
  'use strict';
  var svg = PSI.svg, S = S06, C = S.C, label = S.label, line = S.line, it = S.it;
  function bellFn(mu, sigma) { return function (x) { return S.npdf(x, mu, sigma); }; }
  var std = bellFn(0, 1);

  // L2-01 · riepilogo: la curva esponenziale con un'area colorata (statica).
  (function () {
    var root = document.querySelector('#riepilogo-l1 .scene-svg');
    if (!root) return;
    var F = S.frame(0, 1.2, 30, 320, 160, 45), f3 = S.expo(3);
    svg('path', { d: S.area(f3, .1, .5, 60, F), fill: C.data, opacity: .55 }, root);
    svg('path', { d: S.curve(f3, 0, 1.2, 120, F), fill: 'none', stroke: C.model, 'stroke-width': 3.5 }, root);
    line(root, 24, 160, 326, 160, C.axis, 2);
    line(root, 30, 160, 30, 15, C.axis, 2);
    label(root, F.X(.1), 184, '0,1', 's06-tiny');
    label(root, F.X(.5), 184, '0,5', 's06-tiny');
  })();

  // L2-02 · Cerere: un puntino tra le stelle per 41 notti, poi il bagliore del Sole.
  PSI.scene('cerere', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var defs = svg('defs', {}, root);
    var g1 = svg('radialGradient', { id: 's06-sun' }, defs);
    svg('stop', { offset: '0%', 'stop-color': '#fffbe6' }, g1);
    svg('stop', { offset: '35%', 'stop-color': '#fde68a' }, g1);
    svg('stop', { offset: '70%', 'stop-color': '#f59e0b', 'stop-opacity': .55 }, g1);
    svg('stop', { offset: '100%', 'stop-color': '#f59e0b', 'stop-opacity': 0 }, g1);
    svg('rect', { x: 0, y: 0, width: 880, height: 560, rx: 16, fill: '#070b16' }, root);
    var r = PSI.random(1801);
    for (var i = 0; i < 170; i++) {
      svg('circle', { cx: r() * 880, cy: r() * 560, r: .6 + r() * r() * 2.4, fill: '#e2e8f0', opacity: .35 + r() * .6 }, root);
    }
    label(root, 440, 56, '1 gennaio – 11 febbraio 1801', 's06-label s06-bold');
    label(root, 24, 540, 'schema, non una mappa del cielo', 's06-tiny', { 'text-anchor': 'start' });
    // Arco: Bézier quadratica da P0 a P2.
    var P0 = [150, 360], P1 = [330, 230], P2 = [560, 260];
    function B(t) { var u = 1 - t; return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]]; }
    var marks = [];
    for (i = 0; i <= 40; i++) { var p = B(i / 40); marks.push(svg('circle', { cx: p[0], cy: p[1], r: 2.6, fill: C.data, opacity: 0 }, root)); }
    var dot = svg('circle', { cx: P0[0], cy: P0[1], r: 9, fill: '#fde68a' }, root);
    var halo = svg('circle', { cx: P0[0], cy: P0[1], r: 18, fill: '#fde68a', opacity: .25 }, root);
    var tag = label(root, 340, 340, '41 giorni, 3 gradi', 's06-big s06-data', { opacity: 0 });
    var sun = svg('g', {}, root);
    svg('circle', { cx: 0, cy: 0, r: 330, fill: 'url(#s06-sun)' }, sun);
    svg('circle', { cx: 0, cy: 0, r: 90, fill: '#fff7d6' }, sun);
    gsap.set(sun, { x: 1320, y: 250 });
    var st = { k: 0 };
    function render() {
      var k = st.k, p = B(k / 40);
      dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]);
      halo.setAttribute('cx', p[0]); halo.setAttribute('cy', p[1]);
      marks.forEach(function (m, i) { m.setAttribute('opacity', i <= k ? .9 : 0); });
    }
    render();
    tl.addLabel('s0');
    tl.to(st, { k: 40, duration: 3, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(tag, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(sun, { x: 790, duration: 2, ease: 'power2.out' })
      .to([dot, halo], { opacity: 0, duration: 1.2 }, '-=1.2').addLabel('s3');
  });

  // L2-04 · la campana arancione di Gauss (statica, appare come frammento).
  (function () {
    var root = document.querySelector('#gauss .scene-svg');
    if (!root) return;
    var F = S.frame(-3.4, 3.4, 30, 460, 160, 340);
    svg('path', { d: S.area(std, -3.4, 3.4, 120, F), fill: C.model, opacity: .2 }, root);
    svg('path', { d: S.curve(std, -3.4, 3.4, 120, F), fill: 'none', stroke: C.model, 'stroke-width': 4 }, root);
    line(root, 24, 160, 466, 160, C.axis, 2);
    label(root, F.X(0), 184, '0', 's06-small');
    label(root, 470, 184, 'errore x', 's06-small', { 'text-anchor': 'end' });
    label(root, 470, 60, '∝ e^(−h²x²)', 's06-label s06-model s06-bold', { 'text-anchor': 'start' });
  })();

  // L2-05 · lo script 3 in JavaScript: 20 000 errori, ognuno somma di 50 uniformi su [−0,1; 0,1].
  PSI.scene('sondaggio-3-rivela', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var r = PSI.random(1801), N = 20000, K = 50, xs = new Float64Array(N), sum = 0, sq = 0;
    for (var i = 0; i < N; i++) {
      var s = 0;
      for (var j = 0; j < K; j++) s += r() * .2 - .1;
      xs[i] = s; sum += s; sq += s * s;
    }
    var mu = sum / N, sd = Math.sqrt(sq / N - mu * mu);
    var LO = -1.6, HI = 1.6, BW = .08, NB = Math.round((HI - LO) / BW), cnt = new Array(NB).fill(0);
    for (i = 0; i < N; i++) { var b = Math.floor((xs[i] - LO) / BW); if (b >= 0 && b < NB) cnt[b]++; }
    var F = S.frame(LO, HI, 20, 420, 250, 215);
    var g = svg('g', {}, root);
    var bars = cnt.map(function (c, k) {
      var h = c / N / BW;
      return svg('rect', { x: F.X(LO + k * BW) + .5, y: F.Y(h), width: F.k * BW - 1, height: h * 215, fill: C.data, opacity: .7 }, g);
    });
    var bell = S.drawnCurve(g, bellFn(mu, sd), LO, HI, 120, F, { stroke: C.model, 'stroke-width': 3.5 });
    S.xAxis(g, F, LO, HI, [[-1, '−1'], [0, '0'], [1, '1']], '');
    label(g, 220, 296, '20.000 misure · ognuna = 50 piccoli errori', 's06-tiny');
    label(g, 418, 24, 'σ ≈ ' + it(sd, 3), 's06-small', { 'text-anchor': 'end' });
    gsap.set(g, { opacity: 0 });
    gsap.set(bars, { scaleY: 0, svgOrigin: '0 250' });
    tl.addLabel('s0');
    tl.set(g, { opacity: 1 }).to(bars, { scaleY: 1, duration: .6, stagger: .015, ease: 'power2.out' });
    PSI.draw(tl, bell, bell.len, { duration: .8 });
    tl.addLabel('s1');
  });

  // L2-06 · la formula, un pezzo alla volta; sotto, una campana che reagisce.
  PSI.scene('formula', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var vers = q.all('.fp-stack > div'), caps = q.all('.fp-cap > p');
    var mu = 450, sg = 90, Y = 200, H = 160;
    var F = { X: function (z) { return mu + z * sg; }, Y: function (h) { return Y - h / .3989 * H; }, base: Y, k: sg };
    var shade = svg('path', { d: S.area(std, -4.5, 4.5, 140, F), fill: C.muted, opacity: 0 }, root);
    line(root, 30, Y, 870, Y, C.axis, 2);
    svg('path', { d: S.curve(std, -4.6, 4.6, 140, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    line(root, mu, Y, mu, Y + 8, C.axis, 2);
    label(root, mu, Y + 30, 'μ', 's06-label');
    var z0 = 1.6;
    function pointAt(z, color) {
      var g = svg('g', { opacity: 0 }, root);
      line(g, F.X(z), Y, F.X(z), F.Y(std(z)), color, 2.5, { 'stroke-dasharray': '5 4' });
      svg('circle', { cx: F.X(z), cy: F.Y(std(z)), r: 8, fill: color }, g);
      line(g, mu, Y + 14, F.X(z), Y + 14, color, 5);
      label(g, (mu + F.X(z)) / 2, Y + 36, z > 0 ? 'x − μ' : 'stessa distanza', 's06-small s06-ok s06-bold');
      return g;
    }
    var p1 = pointAt(z0, C.ok), p2 = pointAt(-z0, C.ok);
    var lvl = line(root, F.X(-z0), F.Y(std(z0)), F.X(z0), F.Y(std(z0)), C.ok, 2, { 'stroke-dasharray': '3 6', opacity: 0 });
    var head = S.arrowMarker(root, 'fp-arrow', C.ok);
    var arrows = svg('g', { opacity: 0 }, root);
    [[.45, 1.9], [-.45, -1.9]].forEach(function (a) {
      svg('path', { d: 'M' + F.X(a[0]) + ' ' + (F.Y(std(a[0])) - 16) + ' Q' + F.X(a[1] * .9) + ' ' + (F.Y(std(a[1] * .6)) - 30) + ' ' + F.X(a[1]) + ' ' + (F.Y(std(a[1])) - 18),
        fill: 'none', stroke: C.ok, 'stroke-width': 4, 'marker-end': head }, arrows);
    });
    label(arrows, F.X(2.5), F.Y(std(1.2)), 'più piccolo', 's06-label s06-ok s06-bold', { 'text-anchor': 'start' });
    var sig = svg('g', { opacity: 0 }, root);
    [-1, 1].forEach(function (z) {
      line(sig, F.X(z), Y, F.X(z), F.Y(std(z)) - 10, C.model, 3, { 'stroke-dasharray': '6 4' });
      label(sig, F.X(z), Y + 30, z < 0 ? 'μ − σ' : 'μ + σ', 's06-label s06-model');
    });
    line(sig, mu, F.Y(std(1)) - 26, F.X(1), F.Y(std(1)) - 26, C.model, 4);
    label(sig, F.X(.5), F.Y(std(1)) - 36, 'σ', 's06-label s06-model s06-bold');
    var one = label(root, mu, Y - 50, 'area 1', 's06-big', { opacity: 0, style: 'font-size:34px;fill:#cbd5e0' });
    gsap.set(vers, { opacity: 0 }); gsap.set(vers[0], { opacity: 1 });
    gsap.set(caps, { opacity: 0 }); gsap.set(caps[0], { opacity: 1 });
    function swap(k) {
      tl.to([vers[k - 1], caps[k - 1]], { opacity: 0, duration: .3 }).to([vers[k], caps[k]], { opacity: 1, duration: .3 }, '<');
    }
    tl.addLabel('s0');
    swap(1); tl.to(p1, { opacity: 1, duration: .4 }).addLabel('s1');
    swap(2); tl.to(p2, { opacity: 1, duration: .4 }).to(lvl, { opacity: 1, duration: .3 }).addLabel('s2');
    swap(3); tl.to([p1, p2, lvl], { opacity: 0, duration: .3 }, '<').to(arrows, { opacity: 1, duration: .4 }).addLabel('s3');
    swap(4); tl.to(arrows, { opacity: 0, duration: .3 }, '<').to(sig, { opacity: 1, duration: .4 }).addLabel('s4');
    swap(5); tl.to(sig, { opacity: 0, duration: .3 }, '<').to(shade, { opacity: .35, duration: .5 }).to(one, { opacity: 1, duration: .3 }).addLabel('s5');
  });

  // L2-07 · widget: μ trasla, σ allarga e abbassa; asse y fisso.
  (function () {
    var box = document.getElementById('nm-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out'), inputs = {};
    box.querySelectorAll('input').forEach(function (i) { inputs[i.dataset.k] = i; });
    var F = S.frame(100, 300, 90, 1060, 285, 250 / .045);
    var xt = [];
    for (var v = 100; v <= 300; v += 20) xt.push([v, v % 40 === 20 ? String(v) : '']);
    S.xAxis(root, F, 100, 300, xt, 'ms');
    S.yAxis(root, F, 90, .046, [[.01, '0,01'], [.02, '0,02'], [.03, '0,03'], [.04, '0,04']]);
    var band = svg('path', { fill: C.data, opacity: .28 }, root);
    svg('path', { d: S.curve(bellFn(200, 20), 100, 300, 200, F), fill: 'none', stroke: C.muted, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' }, root);
    line(root, F.X(240), F.base, F.X(240), 20, C.ok, 2.5, { 'stroke-dasharray': '4 5' });
    label(root, F.X(240) + 8, 30, '240', 's06-small s06-ok', { 'text-anchor': 'start' });
    var live = svg('path', { fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    var e1 = line(root, 0, F.base, 0, 0, C.model, 2, { 'stroke-dasharray': '5 5' });
    var e2 = line(root, 0, F.base, 0, 0, C.model, 2, { 'stroke-dasharray': '5 5' });
    var st = {};
    function render() {
      var mu = st.mu, s = st.sigma, fn = bellFn(mu, s);
      box.querySelector('[data-v="mu"]').textContent = mu;
      box.querySelector('[data-v="sigma"]').textContent = s;
      live.setAttribute('d', S.curve(fn, 100, 300, 240, F));
      band.setAttribute('d', S.area(fn, Math.max(100, mu - s), Math.min(300, mu + s), 80, F));
      [[e1, mu - s], [e2, mu + s]].forEach(function (e) {
        e[0].setAttribute('x1', F.X(e[1])); e[0].setAttribute('x2', F.X(e[1])); e[0].setAttribute('y2', F.Y(fn(e[1])));
      });
      var peak = 1 / (s * Math.sqrt(2 * Math.PI));
      out.innerHTML = 'picco <b>' + it(peak, 4) + '</b><span class="sep">|</span>P(μ − σ &lt; X &lt; μ + σ) = <b>' + it(S.Phi(1) - S.Phi(-1), 3) +
        '</b><span class="sep">|</span>P(X ≤ 240) = <b>' + it(S.Phi((240 - mu) / s), 3) + '</b>';
    }
    function set(mu, s) { st.mu = mu; st.sigma = s; inputs.mu.value = mu; inputs.sigma.value = s; render(); }
    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', function () { st[k] = +this.value; render(); });
    });
    box.querySelectorAll('[data-mu]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.mu, +b.dataset.sigma); this.blur(); });
    });
    set(200, 20);
  })();

  // L2-09 (S) · Binomiale(n, 1/2) standardizzata per n = 10, 50, 200; poi la campana.
  PSI.scene('monete', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(-3.5, 3.5, 110, 990, 380, 700);
    S.xAxis(root, F, -3.5, 3.5, [[-3, '−3'], [-2, '−2'], [-1, '−1'], [0, '0'], [1, '1'], [2, '2'], [3, '3']], '');
    label(root, 550, 434, 'teste, standardizzate: (k − n/2) / √(n/4)', 's06-small');
    function logC(n, k) { var s = 0; for (var i = 1; i <= k; i++) s += Math.log(n - k + i) - Math.log(i); return s; }
    var groups = [10, 50, 200].map(function (n) {
      var g = svg('g', { opacity: 0 }, root), sd = Math.sqrt(n / 4), w = F.k / sd;
      for (var k = 0; k <= n; k++) {
        var z = (k - n / 2) / sd;
        if (Math.abs(z) > 3.6) continue;
        var h = Math.exp(logC(n, k) - n * Math.LN2) * sd;
        svg('rect', { x: F.X(z) - w / 2 + .5, y: F.Y(h), width: Math.max(1, w - 1), height: h * 700, fill: C.data, opacity: .7 }, g);
      }
      label(g, 990, 60, 'n = ' + n + ' lanci', 's06-big', { 'text-anchor': 'end', style: 'font-size:38px' });
      return g;
    });
    var bell = S.drawnCurve(root, std, -3.5, 3.5, 160, F, { stroke: C.model, 'stroke-width': 4.5, opacity: 0 });
    tl.addLabel('s0');
    tl.to(groups[0], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(groups[0], { opacity: 0, duration: .3 }).to(groups[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(groups[1], { opacity: 0, duration: .3 }).to(groups[2], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.set(bell, { opacity: 1 });
    PSI.draw(tl, bell, bell.len, { duration: 1 });
    tl.addLabel('s4');
  });

  // L2-10 · Esercizio 3: due campane, stessa forma, scale diverse (statica).
  (function () {
    var root = document.querySelector('#esercizio-3 .scene-svg');
    if (!root) return;
    [[200, 20, 150, 'A: μ = 200 ms, σ = 20 ms', [160, 200, 240]], [50, 5, 345, 'B: μ = 50 ms, σ = 5 ms', [40, 50, 60]]].forEach(function (p) {
      var mu = p[0], s = p[1], Y = p[2];
      var F = S.frame(mu - 3.6 * s, mu + 3.6 * s, 30, 510, Y, 105 * s / .3989);
      svg('path', { d: S.area(bellFn(mu, s), mu - 3.6 * s, mu + 3.6 * s, 100, F), fill: C.data, opacity: .2 }, root);
      svg('path', { d: S.curve(bellFn(mu, s), mu - 3.6 * s, mu + 3.6 * s, 100, F), fill: 'none', stroke: C.model, 'stroke-width': 3.5 }, root);
      S.xAxis(root, F, mu - 3.6 * s, mu + 3.6 * s, p[4].map(function (v) { return [v, String(v)]; }), 'ms', { unitDy: 0 });
      label(root, 30, Y - 118, p[3], 's06-label s06-bold', { 'text-anchor': 'start' });
    });
  })();

  // L2-11 · due righelli: − μ, ÷ σ, poi ms e z allineati; 240 ↔ 2.
  PSI.scene('righelli', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var cx = 590, sp = 120, Y = 250;
    var F = { X: function (z) { return cx + z * sp; }, Y: function (h) { return Y - h / .3989 * 200; }, base: Y, k: sp };
    var shade = svg('path', { d: S.area(std, -3.8, 2, 120, F), fill: C.data, opacity: 0 }, root);
    svg('path', { d: S.curve(std, -3.8, 3.8, 160, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    var MS = [140, 160, 180, 200, 220, 240, 260];
    function ruler(y, color) {
      var g = svg('g', {}, root);
      line(g, F.X(-3.6), y, F.X(3.6), y, color, 2.5);
      g.lbls = MS.map(function (v) {
        line(g, F.X((v - 200) / 20), y, F.X((v - 200) / 20), y + 9, color, 2.5);
        return label(g, F.X((v - 200) / 20), y + 36, String(v), 's06-label', { style: 'fill:' + color });
      });
      g.unit = label(g, F.X(3.6) + 16, y + 36, 'ms', 's06-label', { 'text-anchor': 'start', style: 'fill:' + color });
      return g;
    }
    var top = ruler(Y, C.text);
    var moving = ruler(Y, C.text);
    var ops = svg('g', {}, root);
    var minus = label(ops, 110, Y + 36, '− μ', 's06-big s06-ok', { opacity: 0, style: 'font-size:36px' });
    var div = label(ops, 110, Y + 36, '÷ σ', 's06-big s06-model', { opacity: 0, style: 'font-size:36px' });
    var mark = svg('g', { opacity: 0 }, root);
    line(mark, F.X(2), 60, F.X(2), Y + 100, C.ok, 3, { 'stroke-dasharray': '6 4' });
    label(mark, F.X(2) + 12, 72, '240 ms ↔ z = 2', 's06-label s06-ok s06-bold', { 'text-anchor': 'start' });
    var areaTxt = label(root, F.X(-.2), F.Y(.13), 'area ≈ 0,977', 's06-label s06-data s06-bold halo', { opacity: 0 });
    var box = q.one('.rh-formula');
    var st = { sub: 0, div: 0 };
    function render() {
      moving.lbls.forEach(function (t, i) {
        var v = (MS[i] - 200 * st.sub) / (1 + 19 * st.div);
        t.textContent = it(Math.round(v), 0);
      });
      moving.unit.textContent = st.div > .5 ? 'z' : st.sub > .5 ? 'x − 200' : 'ms';
      var col = st.div > .5 ? C.model : C.text;
      moving.lbls.forEach(function (t) { t.style.fill = col; });
      moving.unit.style.fill = col;
    }
    render();
    gsap.set(top, { opacity: 0 });
    gsap.set(box, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(minus, { opacity: 1, duration: .3 }).to(st, { sub: 1, duration: 1.2, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(minus, { opacity: 0, duration: .2 }).to(div, { opacity: 1, duration: .3 })
      .to(st, { div: 1, duration: 1.2, ease: 'power1.inOut', onUpdate: render }).addLabel('s2');
    tl.to(div, { opacity: 0, duration: .2 }).to(moving, { y: 76, duration: .6, ease: 'power2.inOut' })
      .to(top, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(mark, { opacity: 1, duration: .4 }).to(shade, { opacity: .4, duration: .5 }).to(areaTxt, { opacity: 1, duration: .3 }).addLabel('s4');
    tl.to(box, { opacity: 1, duration: .5 }).addLabel('s5');
  });

  // L2-12 · Φ: la colonna della tabella si accende insieme all'area.
  PSI.scene('phi', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var F = S.frame(-3.6, 3.6, 46, 1054, 280, 600);
    var a1 = svg('path', { d: S.area(std, -3.6, 2, 120, F), fill: C.data, opacity: 0 }, root);
    var t1 = svg('path', { d: S.area(std, -3.6, -1, 80, F), fill: C.red, opacity: 0 }, root);
    var t2 = svg('path', { d: S.area(std, 1, 3.6, 80, F), fill: C.red, opacity: 0 }, root);
    var a3 = svg('path', { d: S.area(std, -1, 1.5, 100, F), fill: C.ok, opacity: 0 }, root);
    svg('path', { d: S.curve(std, -3.6, 3.6, 160, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    S.xAxis(root, F, -3.6, 3.6, [[-3, '−3'], [-2, '−2'], [-1, '−1'], [0, '0'], [1, '1'], [1.5, '1,5'], [2, '2'], [3, '3']], 'z');
    var rows = el.querySelectorAll('.ph-table tr');
    function col(k) { return [rows[0].children[k], rows[1].children[k]]; }
    var c2 = col(7), c1 = col(3), c15 = col(4);
    var OFF = { backgroundColor: 'rgba(56,239,125,0)', color: '#edf2f7' }, ON = { backgroundColor: 'rgba(56,239,125,0.22)', color: C.ok };
    gsap.set(c2.concat(c1, c15), Object.assign({}, OFF));
    var cards = q.all('.ph-cards > p'), code = q.one('.ph-code');
    gsap.set(cards, { opacity: 0 }); gsap.set(cards[0], { opacity: 1 });
    gsap.set(code, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(cards[0], { opacity: 0, duration: .3 }).to(cards[1], { opacity: 1, duration: .3 }, '<')
      .to(a1, { opacity: .45, duration: .6 }, '<').to(c2, Object.assign({ duration: .3 }, ON), '<').addLabel('s1');
    tl.to(cards[1], { opacity: 0, duration: .3 }).to(cards[2], { opacity: 1, duration: .3 }, '<')
      .to(a1, { opacity: 0, duration: .4 }, '<').to(c2, Object.assign({ duration: .3 }, OFF), '<')
      .to([t1, t2], { opacity: .45, duration: .5 }).to(c1, Object.assign({ duration: .3 }, ON), '<').addLabel('s2');
    tl.to(cards[2], { opacity: 0, duration: .3 }).to(cards[3], { opacity: 1, duration: .3 }, '<')
      .to([t1, t2], { opacity: 0, duration: .4 }, '<')
      .to(a3, { opacity: .45, duration: .6 }).to(c15, Object.assign({ duration: .3 }, ON), '<').addLabel('s3');
    tl.to(code, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // L2-14 · Esercizio 4: la campana standard con le tacche (statica).
  (function () {
    var root = document.querySelector('#esercizio-4 .scene-svg');
    if (!root) return;
    var F = S.frame(-3.6, 3.6, 10, 530, 200, 420);
    svg('path', { d: S.area(std, -3.6, 3.6, 120, F), fill: C.data, opacity: .15 }, root);
    svg('path', { d: S.curve(std, -3.6, 3.6, 120, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    S.xAxis(root, F, -3.6, 3.6, [[-3, '−3'], [-2, '−2'], [-1, '−1'], [0, '0'], [1, '1'], [2, '2'], [3, '3']], '');
  })();

  // L2-15 · le tre fasce, poi il righello del servizio.
  PSI.scene('regola', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(-3.7, 3.7, 32, 1068, 290, 620);
    var b3 = svg('path', { d: S.area(std, -3, 3, 140, F), fill: C.third, opacity: 0 }, root);
    var b2 = svg('path', { d: S.area(std, -2, 2, 120, F), fill: C.model, opacity: 0 }, root);
    var b1 = svg('path', { d: S.area(std, -1, 1, 80, F), fill: C.data, opacity: 0 }, root);
    svg('path', { d: S.curve(std, -3.7, 3.7, 160, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    var NAMES = ['μ − 3σ', 'μ − 2σ', 'μ − σ', 'μ', 'μ + σ', 'μ + 2σ', 'μ + 3σ'];
    S.xAxis(root, F, -3.7, 3.7, [-3, -2, -1, 0, 1, 2, 3].map(function (z, i) { return [z, NAMES[i]]; }), '');
    var l1 = label(root, F.X(0), F.Y(.2), '68%', 's06-big', { opacity: 0, style: 'font-size:46px' });
    function bracket(z, y, color, txt) {
      var g = svg('g', { opacity: 0 }, root);
      line(g, F.X(-z), y, F.X(z), y, color, 4);
      line(g, F.X(-z), y - 9, F.X(-z), y + 9, color, 4);
      line(g, F.X(z), y - 9, F.X(z), y + 9, color, 4);
      label(g, F.X(z) + 14, y + 10, txt, 's06-label s06-bold', { 'text-anchor': 'start', style: 'fill:' + color });
      return g;
    }
    var l2 = bracket(2, 352, C.model, '95%'), l3 = bracket(3, 384, C.third, '99,7%');
    var ms = svg('g', { opacity: 0 }, root);
    [140, 160, 180, 200, 220, 240, 260].forEach(function (v, i) { label(ms, F.X(i - 3), 426, String(v), 's06-label s06-white'); });
    label(ms, F.X(3) + 50, 426, 'ms', 's06-small', { 'text-anchor': 'start' });
    var rng = svg('text', { x: 550, y: 470, 'text-anchor': 'middle', 'class': 's06-label s06-bold' }, ms);
    [['180–220', C.data], ['   ·   ', C.muted], ['160–240', C.model], ['   ·   ', C.muted], ['140–260 ms', C.third]].forEach(function (p) {
      svg('tspan', { style: 'fill:' + p[1] + ';white-space:pre' }, rng).textContent = p[0];
    });
    tl.addLabel('s0');
    tl.to(b1, { opacity: .6, duration: .5 }).to(l1, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(b2, { opacity: .35, duration: .5 }).to(l2, { opacity: 1, duration: .3 }).addLabel('s2');
    tl.to(b3, { opacity: .3, duration: .5 }).to(l3, { opacity: 1, duration: .3 }).addLabel('s3');
    tl.to(ms, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // Campana del servizio (μ = 200, σ = 20) per le slide delle latenze.
  var serv = bellFn(200, 20);

  // L2-16 · sondaggio s06-4: un pallino rosso a 300 ms (statica).
  (function () {
    var root = document.querySelector('#sondaggio-4 .scene-svg');
    if (!root) return;
    var F = S.frame(120, 320, 60, 940, 112, 92 / .01995);
    svg('path', { d: S.area(serv, 140, 260, 100, F), fill: C.third, opacity: .22 }, root);
    svg('path', { d: S.curve(serv, 120, 320, 200, F), fill: 'none', stroke: C.text, 'stroke-width': 3 }, root);
    S.xAxis(root, F, 120, 320, [[140, '140'], [200, '200'], [260, '260'], [300, '300']], 'ms', { unitDy: 0 });
    svg('circle', { cx: F.X(300), cy: F.base - 12, r: 10, fill: C.red }, root);
    label(root, F.X(300), F.base - 34, '300 ms', 's06-label s06-red s06-bold');
  })();

  // L2-17 · z = 5; una curva illustrativa a coda pesante; la lente × 50 sulla coda.
  PSI.scene('sondaggio-4-rivela', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    function heavy(x) {
      var s = .3, m = Math.log(260), ln = x > 0 ? Math.exp(-Math.pow(Math.log(x) - m, 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI)) : 0;
      return .95 * serv(x) + .05 * ln;
    }
    var F = S.frame(120, 420, 40, 640, 180, 7000);
    var Z = S.frame(250, 420, 730, 1150, 180, 7000 * 50);
    svg('rect', { x: 715, y: 14, width: 450, height: 200, rx: 12, fill: '#ffffff06', stroke: '#ffffff40', 'stroke-width': 2, 'stroke-dasharray': '6 5' }, root);
    label(root, 1150, 40, 'lente sulla coda · altezze × 50', 's06-small', { 'text-anchor': 'end' });
    svg('rect', { x: F.X(250), y: 20, width: F.X(420) - F.X(250), height: 160, fill: 'none', stroke: '#ffffff30', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, root);
    var clip = svg('clipPath', { id: 's06-lente' }, svg('defs', {}, root));
    svg('rect', { x: 715, y: 14, width: 450, height: 200 }, clip);
    var hv = svg('g', { opacity: 0 }, root);
    svg('path', { d: S.curve(heavy, 120, 420, 240, F), fill: 'none', stroke: C.model, 'stroke-width': 3.5 }, hv);
    svg('path', { d: S.curve(heavy, 250, 420, 200, Z), fill: 'none', stroke: C.model, 'stroke-width': 3.5, 'clip-path': 'url(#s06-lente)' }, hv);
    [282, 305, 330, 352, 385].forEach(function (x) {
      svg('circle', { cx: Z.X(x), cy: Z.Y(heavy(x) * .45), r: 7, fill: C.red }, hv);
    });
    label(hv, Z.X(395), Z.Y(heavy(395)) - 16, 'latenze lente', 's06-small s06-red', { 'text-anchor': 'middle' });
    svg('path', { d: S.curve(serv, 120, 420, 240, F), fill: 'none', stroke: C.text, 'stroke-width': 2.5 }, root);
    svg('path', { d: S.curve(serv, 250, 420, 200, Z), fill: 'none', stroke: C.text, 'stroke-width': 2.5, 'clip-path': 'url(#s06-lente)' }, root);
    S.xAxis(root, F, 120, 420, [[140, '140'], [200, '200'], [260, '260'], [300, '300'], [360, '360']], 'ms', { unitDy: 0 });
    S.xAxis(root, Z, 250, 420, [[260, '260'], [300, '300'], [360, '360'], [400, '400']], '');
    label(hv, F.X(330), 70, 'coda pesante (illustrativa)', 's06-small s06-model', { 'text-anchor': 'middle' });
    var l1 = q.one('.ht-1'), l3 = q.one('.ht-3');
    gsap.set([l1, l3], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(l1, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(hv, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(l3, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L2-19 · la soglia scorre da 280 a 246,5 ms finché l'area a destra è l'1%.
  PSI.scene('p99', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var F = S.frame(120, 300, 80, 1040, 320, 250 / .01995);
    var right = svg('path', { fill: C.ok, opacity: .5 }, root);
    svg('path', { d: S.curve(serv, 120, 300, 200, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    var xt = [];
    for (var v = 120; v <= 300; v += 20) xt.push([v, String(v)]);
    S.xAxis(root, F, 120, 300, xt, 'ms');
    var bar = line(root, 0, F.base + 10, 0, 50, C.ok, 4);
    var xl = label(root, 0, 40, '', 's06-label s06-ok s06-bold');
    var cnt = label(root, 100, 110, '', 's06-big s06-ok', { 'text-anchor': 'start' });
    label(root, 100, 148, 'area a destra della soglia', 's06-small', { 'text-anchor': 'start' });
    var X99 = 200 + 20 * 2.3263;
    var st = { x: 280 };
    function render() {
      right.setAttribute('d', S.area(serv, st.x, 300, 80, F));
      bar.setAttribute('x1', F.X(st.x)); bar.setAttribute('x2', F.X(st.x));
      xl.setAttribute('x', F.X(st.x)); xl.textContent = it(st.x, 1) + ' ms';
      cnt.textContent = it(100 * (1 - S.Phi((st.x - 200) / 20)), 1) + ' %';
    }
    render();
    var l2 = q.one('.pq-2'), l3 = q.one('.pq-3');
    gsap.set([l2, l3], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { x: X99, duration: 3, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(l2, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(l3, { opacity: 1, duration: .4 }).addLabel('s3');
  });
})();
