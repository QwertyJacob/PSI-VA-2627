/*
 * Settimana 9, Lezione 2: Laplace e le due strade verso la campana, la
 * distribuzione binomiale (notebook 4.4, celle 13 e 16–18), l'urna di
 * Bernoulli, il controesempio X + X (pacco «12. TLC», p. 19), quanto deve
 * essere grande n, Cauchy e le code pesanti, i dati contro le medie, il widget.
 * Utilità in comuni.js.
 */
window.S09L2 = (function () {
  'use strict';
  var svg = PSI.svg, S = S09, C = S.C, label = S.label, line = S.line, it = S.it;

  function show(tl, node) { tl.to(node, { opacity: 1, duration: .4 }); }
  function curve(fn, a, b, X, Y, n) {
    var pts = [];
    for (var t = 0; t <= (n || 160); t++) { var x = a + (b - a) * t / (n || 160); pts.push([X(x), Y(fn(x))]); }
    return pts;
  }

  // L2-01 · lavagna del riepilogo: la ricetta in quattro passi.
  PSI.scene('riepilogo-l1', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var g = svg('g', {}, root);
    ['1  evento con Sₙ o X̄ₙ', '2  nμ e σ√n', '3  z = (s − nμ)/(σ√n)', '4  Φ(z) nella tabella'].forEach(function (s, i) {
      label(g, 30, 50 + i * 50, s, 's09-label', { 'text-anchor': 'start' });
    });
    gsap.set(g, { opacity: 0 });
    tl.to(g, { opacity: 1, duration: .6 }).addLabel('s0');
  });

  // L2-02 · due strade verso la campana che si uniscono nel 1810.
  PSI.scene('laplace', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var r1 = svg('g', { opacity: 0 }, root), r2 = svg('g', { opacity: 0 }, root), r3 = svg('g', { opacity: 0 }, root), r4 = svg('g', { opacity: 0 }, root);
    svg('path', { d: 'M40 110 C300 110 420 160 640 235', fill: 'none', stroke: C.data, 'stroke-width': 8, 'stroke-linecap': 'round' }, r1);
    label(r1, 40, 70, '1733 · De Moivre', 's09-label s09-data', { 'text-anchor': 'start', 'font-weight': 800 });
    label(r1, 40, 155, 'somme di lanci di moneta', 's09-small', { 'text-anchor': 'start' });
    svg('path', { d: 'M40 360 C300 360 420 310 640 235', fill: 'none', stroke: C.model, 'stroke-width': 8, 'stroke-linecap': 'round' }, r2);
    label(r2, 40, 320, '1809 · Gauss', 's09-label s09-model', { 'text-anchor': 'start', 'font-weight': 800 });
    label(r2, 40, 405, 'errori di misura, «la media è il valore più probabile»', 's09-small', { 'text-anchor': 'start' });
    line(r3, 640, 235, 790, 235, C.ok, 8, { 'stroke-linecap': 'round' });
    var X = S.scale(-3.2, 3.2, 800, 1150), Y = S.scale(0, .42, 300, 120);
    S.area(r3, [[X(-3.2), 300]].concat(curve(S.npdf, -3.2, 3.2, X, Y, 100)).concat([[X(3.2), 300]]), C.ok, .3);
    S.poly(r3, curve(S.npdf, -3.2, 3.2, X, Y, 100), C.ok, 4);
    label(r3, 975, 90, '1810 · Laplace', 's09-label s09-ok', { 'font-weight': 800 });
    label(r3, 975, 340, 'somma di errori qualsiasi', 's09-small');
    label(r3, 975, 372, '→ campana', 's09-small');
    label(r4, 1150, 448, '1920 · Pólya: «zentraler Grenzwertsatz»', 's09-label', { 'font-weight': 700, 'text-anchor': 'end' });
    tl.addLabel('s0');
    tl.to(r1, { opacity: 1, duration: .6 }).addLabel('s1');
    tl.to(r2, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(r3, { opacity: 1, duration: .6 }).addLabel('s3');
    tl.to(r4, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // L2-05 · le PMF della distribuzione binomiale con p = 1/2 (notebook, cella 18).
  PSI.scene('binomiale', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X = S.scale(0, 80, 60, 790), Y = S.scale(0, .19, 380, 30);
    S.axes(root, { x: 60, y: 30, w: 730, h: 350 }, [0, 10, 20, 30, 40, 50, 60, 70, 80].map(function (v) { return [X(v), String(v)]; }),
      [[Y(0), '0'], [Y(.1), '0,1']]);
    label(root, 425, 432, 'numero di successi', 's09-small');
    var cols = { 20: C.third, 60: C.model, 100: C.data };
    var groups = [20, 60, 100].map(function (n) {
      var g = svg('g', { opacity: 0 }, root), pts = [];
      for (var k = 0; k <= Math.min(n, 80); k++) pts.push([X(k), Y(S.binom(k, n, .5))]);
      S.poly(g, pts, cols[n], 3.5);
      svg('g', {}, g);
      label(g, X(n / 2), Y(S.binom(n / 2, n, .5)) - 16, 'n = ' + n, 's09-small', { fill: cols[n], 'font-weight': 800 });
      return g;
    });
    var gn = svg('g', { opacity: 0 }, root);
    S.poly(gn, curve(function (x) { return S.ndens(x, 50, 5); }, 30, 70, X, Y), C.text, 3, { 'stroke-dasharray': '8 6' });
    var bs = q.one('.bn-s'), bt = q.one('.bn-t');
    tl.addLabel('s0');
    groups.forEach(function (g, i) { tl.to(g, { opacity: 1, duration: .5 }).addLabel('s' + (i + 1)); });
    tl.to(gn, { opacity: 1, duration: .5 }); show(tl, bs); tl.addLabel('s4');
    show(tl, bt); tl.addLabel('s5');
  });

  // L2-06 (S) · l'urna di Bernoulli: 25 550, 600 600, 6500 su scala logaritmica.
  PSI.scene('urna-tlc', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X = function (v) { return 330 + (Math.log(v) / Math.LN10 - 3) / 3 * 800; };
    S.axes(root, { x: 330, y: 20, w: 800, h: 260 }, [[X(1000), '1000'], [X(10000), '10 000'], [X(100000), '100 000'], [X(1e6), '1 000 000']], []);
    var rows = [['Bernoulli, 1713', 25550, C.third], ['Čebyšëv', 600600, C.model], ['teorema del limite centrale', 6500, C.ok]];
    var gs = rows.map(function (r, i) {
      var g = svg('g', { opacity: 0 }, root), y = 45 + i * 78;
      svg('rect', { x: 330, y: y, width: X(r[1]) - 330, height: 50, rx: 6, fill: r[2], 'fill-opacity': .75 }, g);
      label(g, 315, y + 34, r[0], 's09-label', { 'text-anchor': 'end' });
      label(g, X(r[1]) + 12, y + 34, S.migliaia(r[1]).replace(/\./g, ' '), 's09-label', { 'text-anchor': 'start', 'font-weight': 800, fill: r[2] });
      return g;
    });
    tl.addLabel('s0');
    gs.forEach(function (g, i) { tl.to(g, { opacity: 1, duration: .5 }).addLabel('s' + (i + 1)); });
  });

  // L2-14 · X + X: 10 copie della stessa esponenziale contro 10 esponenziali indipendenti.
  PSI.scene('controesempio', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), no = q.one('.ce-no'), si = q.one('.ce-si');
    var specs = [
      ['10X: la stessa X, dieci volte', function (x) { return x < 0 ? 0 : Math.exp(-x / 10) / 10; }, C.red],
      ['X₁ + … + X₁₀ indipendenti', function (x) { return S.gammaPdf(x, 10); }, C.ok]];
    var gs = specs.map(function (sp, i) {
      var g = svg('g', { opacity: 0 }, root), x0 = 40 + i * 590, W = 520;
      var X = S.scale(0, 40, x0, x0 + W), Y = S.scale(0, .14, 270, 40);
      var pts = curve(sp[1], .001, 40, X, Y);
      S.area(g, [[X(0), 270]].concat(pts).concat([[X(40), 270]]), sp[2], .25);
      S.poly(g, pts, sp[2], 4);
      line(g, x0, 270, x0 + W, 270, C.axis, 2);
      [0, 10, 20, 30, 40].forEach(function (v) { line(g, X(v), 270, X(v), 277, C.axis, 2); label(g, X(v), 302, String(v), 's09-tick'); });
      label(g, x0 + W / 2, 28, sp[0], 's09-label', { 'font-weight': 700 });
      return g;
    });
    gsap.set([no, si], { opacity: 0 });
    tl.addLabel('s0');
    show(tl, no); tl.addLabel('s1');
    show(tl, si); tl.addLabel('s2');
    tl.to(gs[0], { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(gs[1], { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // L2-15 · somme standardizzate di esponenziali, n = 1, 5, 30 (figura F5).
  PSI.scene('quanto-grande', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X = S.scale(-3, 4, 40, 740), Y = S.scale(0, 1.05, 360, 20);
    S.axes(root, { x: 40, y: 20, w: 700, h: 340 }, [-3, -2, -1, 0, 1, 2, 3, 4].map(function (v) { return [X(v), String(v).replace('-', '−')]; }), []);
    label(root, 390, 412, 'z = (Sₙ − nμ)/(σ√n)', 's09-small');
    S.poly(root, curve(S.npdf, -3, 4, X, Y), C.text, 3, { 'stroke-dasharray': '8 6' });
    var spec = [[1, C.third, X(-.6), Y(.92)], [5, C.model, X(-1.05), Y(.47)], [30, C.data, X(.55), Y(.45)]];
    var gs = spec.map(function (c) {
      var n = c[0], g = svg('g', { opacity: 0 }, root), rn = Math.sqrt(n);
      var pts = curve(function (z) { return S.gammaPdf(n + z * rn, n) * rn; }, Math.max(-3, -rn + 1e-6), 4, X, Y, 200);
      if (n === 1) pts.unshift([X(-1), Y(0)]);
      S.poly(g, pts.map(function (p) { return [p[0], Math.max(20, p[1])]; }), c[1], 4);
      label(g, c[2], c[3], 'n = ' + n, 's09-label', { fill: c[1], 'font-weight': 800, 'text-anchor': n === 5 ? 'end' : 'start' });
      return g;
    });
    var rows = ['.qg-1', '.qg-2', '.qg-3', '.qg-4'].map(function (s) { return q.one(s); }), note = q.one('.qg-note');
    gsap.set(rows, { opacity: .15 }); gsap.set(note, { opacity: 0 });
    tl.addLabel('s0');
    tl.to([gs[0], rows[0]], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to([gs[1], rows[1]], { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to([gs[2], rows[2], rows[3]], { opacity: 1, duration: .5 }).addLabel('s3');
    show(tl, note); tl.addLabel('s4');
  });

  // L2-16 (S) · binomiale con n = 100 e p = 0,01 contro la normale.
  PSI.scene('bernoulli-rara', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X = S.scale(-2.5, 7.5, 50, 780), Y = S.scale(0, .42, 340, 30), bw = (X(1) - X(0)) * .6;
    for (var k = 0; k <= 7; k++) {
      var p = S.binom(k, 100, .01);
      svg('rect', { x: X(k) - bw / 2, y: Y(p), width: bw, height: 340 - Y(p), fill: C.data, 'fill-opacity': .7 }, root);
    }
    S.axes(root, { x: 50, y: 30, w: 730, h: 310 }, [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map(function (v) { return [X(v), String(v).replace('-', '−')]; }), []);
    label(root, 415, 395, 'numero di successi in 100 prove', 's09-small');
    var gn = svg('g', { opacity: 0 }, root), sd = Math.sqrt(.99);
    var pts = curve(function (x) { return S.ndens(x, 1, sd); }, -2.5, 7.5, X, Y);
    S.area(gn, [[X(-2.5), 340]].concat(pts.filter(function (pp) { return pp[0] <= X(-.5); })).concat([[X(-.5), 340]]), C.red, .35);
    S.poly(gn, pts, C.model, 3.5);
    tl.addLabel('s0');
    tl.to(gn, { opacity: 1, duration: .5 }); show(tl, q.one('.br-s')); tl.addLabel('s1');
    show(tl, q.one('.br-t')); tl.addLabel('s2');
  });

  // L2-18 · la densità normale e quella di Cauchy (figura F6).
  PSI.scene('cauchy', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X = S.scale(-6, 6, 40, 780), Y = S.scale(0, .42, 360, 30);
    S.axes(root, { x: 40, y: 30, w: 740, h: 330 }, [-6, -3, 0, 3, 6].map(function (v) { return [X(v), String(v).replace('-', '−')]; }), []);
    var gn = svg('g', {}, root), gc = svg('g', { opacity: 0 }, root), gt = svg('g', { opacity: 0 }, root);
    S.poly(gn, curve(S.npdf, -6, 6, X, Y, 200), C.data, 4);
    label(gn, X(.9), Y(.39), 'normale', 's09-label s09-data', { 'text-anchor': 'start', 'font-weight': 800 });
    S.poly(gc, curve(S.cauchyPdf, -6, 6, X, Y, 200), C.model, 4);
    label(gc, X(1.4), Y(.2), 'Cauchy', 's09-label s09-model', { 'text-anchor': 'start', 'font-weight': 800 });
    [[-6, -3], [3, 6]].forEach(function (ab) {
      var pts = curve(S.cauchyPdf, ab[0], ab[1], X, Y, 40);
      S.area(gt, [[X(ab[0]), 360]].concat(pts).concat([[X(ab[1]), 360]]), C.red, .45);
    });
    label(gt, X(-4.5), Y(.12), '10,2%', 's09-label', { fill: C.red, 'font-weight': 800 });
    label(gt, X(4.5), Y(.12), '10,2%', 's09-label', { fill: C.red, 'font-weight': 800 });
    gsap.set(gn, { opacity: 0 });
    tl.to(gn, { opacity: 1, duration: .5 }).addLabel('s0');
    tl.to(gc, { opacity: 1, duration: .5 }); show(tl, q.one('.ca-s')); tl.addLabel('s1');
    tl.to(gt, { opacity: 1, duration: .5 }); show(tl, q.one('.ca-t')); tl.addLabel('s2');
    show(tl, q.one('.ca-u')); tl.addLabel('s3');
  });

  // L2-20 · medie progressive: esponenziale contro Cauchy.
  PSI.scene('cauchy-media', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), N = 10000, M = 6;
    var spec = [['esponenziale, media 1', function (u) { return -Math.log(1 - u); }, 0, 2.5, 1, 31],
                ['Cauchy, centro 0', function (u) { return Math.tan(Math.PI * (u - .5)); }, -4, 4, 0, 53]];
    var cols = [C.data, C.model, C.ok, C.third, C.red, '#7dd3fc'];
    var ks = [];
    for (var t = 0; t <= 200; t++) { var k = Math.round(Math.pow(N, t / 200)); if (ks[ks.length - 1] !== k) ks.push(k); }
    var gs = spec.map(function (sp, i) {
      var g = svg('g', { opacity: 0 }, root), x0 = 90 + i * 575, W = 500, r = PSI.random(sp[5]);
      var X = function (k) { return x0 + Math.log(k) / Math.LN10 / 4 * W; }, Y = S.scale(sp[2], sp[3], 340, 50);
      var clip = function (v) { return Math.max(sp[2], Math.min(sp[3], v)); };
      line(g, x0, Y(sp[4]), x0 + W, Y(sp[4]), C.ok, 2.5, { 'stroke-dasharray': '8 6' });
      for (var j = 0; j < M; j++) {
        var s = 0, cum = new Float64Array(N + 1);
        for (var n = 1; n <= N; n++) { s += sp[1](r()); cum[n] = s / n; }
        S.poly(g, ks.map(function (k) { return [X(k), Y(clip(cum[k]))]; }), cols[j], 2.2, { 'stroke-opacity': .85 });
      }
      S.axes(g, { x: x0, y: 50, w: W, h: 290 }, [1, 10, 100, 1000, 10000].map(function (k) { return [X(k), S.migliaia(k)]; }),
        [[Y(sp[2]), it(sp[2], 0)], [Y(sp[4]), it(sp[4], 0)], [Y(sp[3]), it(sp[3], sp[3] % 1 ? 1 : 0)]]);
      label(g, x0 + W / 2, 30, sp[0], 's09-label', { 'font-weight': 700 });
      return g;
    });
    label(root, 590, 410, 'numero di osservazioni (scala logaritmica)', 's09-small');
    var note = q.one('.cm-n');
    gsap.set(note, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(gs[0], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(gs[1], { opacity: 1, duration: .5 }).addLabel('s2');
    show(tl, note); tl.addLabel('s3');
  });

  // L2-23 · i tempi restano storti, le medie diventano campane; il p99 si misura.
  PSI.scene('non-i-dati', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), r = PSI.random(2013);
    function gauss() { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function tempo() { return 100 + Math.exp(3 + gauss()); }
    var T = [], means = [];
    for (var i = 0; i < 10000; i++) T.push(tempo());
    for (var j = 0; j < 2000; j++) { var s = 0; for (var k = 0; k < 50; k++) s += tempo(); means.push(s / 50); }
    var sorted = T.slice().sort(function (a, b) { return a - b; }), p99 = sorted[Math.floor(.99 * T.length)];
    function hist(g, data, lo, hi, B, x0, W, col, ymaxFix) {
      var w = (hi - lo) / B, cnt = new Array(B).fill(0);
      data.forEach(function (v) { var b = Math.floor((v - lo) / w); if (b >= 0 && b < B) cnt[b]++; });
      var ymax = ymaxFix || Math.max.apply(null, cnt) * 1.1;
      var X = S.scale(lo, hi, x0, x0 + W), Y = S.scale(0, ymax, 320, 50);
      cnt.forEach(function (c, b) { svg('rect', { x: X(lo + b * w) + 1, y: Y(c), width: X(lo + w) - X(lo) - 2, height: 320 - Y(c), fill: col, 'fill-opacity': .65 }, g); });
      line(g, x0, 320, x0 + W, 320, C.axis, 2);
      return X;
    }
    var gl = svg('g', { opacity: 0 }, root), gr = svg('g', { opacity: 0 }, root);
    var XL = hist(gl, T, 100, 420, 40, 40, 520, C.data);
    [100, 200, 300, 400].forEach(function (v) { line(gl, XL(v), 320, XL(v), 327, C.axis, 2); label(gl, XL(v), 352, String(v), 's09-tick'); });
    line(gl, XL(p99), 60, XL(p99), 320, C.red, 3, { 'stroke-dasharray': '8 6' });
    label(gl, XL(p99) + 8, 90, 'p99 ≈ ' + Math.round(p99) + ' ms', 's09-small', { fill: C.red, 'text-anchor': 'start', 'font-weight': 700 });
    label(gl, 300, 30, '10 000 tempi di risposta (ms)', 's09-label', { 'font-weight': 700 });
    var XR = hist(gr, means, 120, 150, 30, 640, 500, C.ok);
    [120, 130, 140, 150].forEach(function (v) { line(gr, XR(v), 320, XR(v), 327, C.axis, 2); label(gr, XR(v), 352, String(v), 's09-tick'); });
    label(gr, 890, 30, 'medie di gruppi di 50 tempi', 's09-label', { 'font-weight': 700 });
    var nd = q.one('.nd-n');
    gsap.set(nd, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(gl, { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(gr, { opacity: 1, duration: .5 }).addLabel('s2');
    show(tl, nd); tl.addLabel('s3');
  });

  // L2-22 (S) · widget: la media che non si ferma (stesso modello della dispensa).
  function widget() {
    var box = document.getElementById('wm-box');
    if (!box) return;
    var NMAX = 10000, MMAX = 50, seed = 1853, cum = null;
    var se = box.querySelector('select'), ins = box.querySelectorAll('input'), sm = ins[0], sn = ins[1];
    var root = box.querySelector('svg'), out = box.querySelector('.wc-out');
    var D = {
      esp: { c: 1, e: .1, lo: 0, hi: 2.5, tk: [0, .5, 1, 1.5, 2, 2.5], g: function (u) { return -Math.log(1 - u); } },
      pareto: { c: 3, e: .3, lo: 1, hi: 7, tk: [1, 3, 5, 7], g: function (u) { return Math.pow(1 - u, -1 / 1.5); } },
      cauchy: { c: 0, e: 1, lo: -4, hi: 4, tk: [-4, -2, 0, 2, 4], g: function (u) { return Math.tan(Math.PI * (u - .5)); } }
    };
    function simula() {
      var d = D[se.value], r = PSI.random(seed);
      cum = [];
      for (var j = 0; j < MMAX; j++) {
        var c = new Float64Array(NMAX + 1), s = 0;
        for (var i = 1; i <= NMAX; i++) { s += d.g(r()); c[i] = s; }
        cum.push(c);
      }
    }
    function render() {
      var d = D[se.value], M = +sm.value, n = Math.round(Math.pow(10, +sn.value));
      box.querySelector('[data-v="m"]').textContent = M;
      box.querySelector('[data-v="n"]').textContent = S.migliaia(n);
      while (root.firstChild) root.removeChild(root.firstChild);
      var X = function (k) { return 100 + Math.log(k) / Math.LN10 / 4 * 980; }, Y = S.scale(d.lo, d.hi, 360, 20);
      var clip = function (v) { return Math.max(d.lo, Math.min(d.hi, v)); };
      S.area(root, [[X(1), Y(d.c + d.e)], [X(NMAX), Y(d.c + d.e)], [X(NMAX), Y(d.c - d.e)], [X(1), Y(d.c - d.e)]], C.ok, .18);
      S.axes(root, { x: 100, y: 20, w: 980, h: 340 }, [1, 10, 100, 1000, 10000].map(function (k) { return [X(k), S.migliaia(k)]; }),
        d.tk.map(function (v) { return [Y(v), it(v, v % 1 ? 1 : 0)]; }));
      line(root, X(1), Y(d.c), X(NMAX), Y(d.c), C.model, 2.5, { 'stroke-dasharray': '8 6' });
      var ks = [];
      for (var t = 0; t <= 260; t++) { var k = Math.round(Math.pow(10, 4 * t / 260)); if (k <= n && ks[ks.length - 1] !== k) ks.push(k); }
      if (ks[ks.length - 1] !== n) ks.push(n);
      var fuori = 0;
      for (var j = 0; j < M; j++) {
        var c = cum[j], f = Math.abs(c[n] / n - d.c) > d.e;
        if (f) fuori++;
        S.poly(root, ks.map(function (k) { return [X(k), Y(clip(c[k] / k))]; }), f ? C.red : C.data, 2, { 'stroke-opacity': .75 });
      }
      line(root, X(n), 20, X(n), 360, C.ok, 3, { 'stroke-dasharray': '8 6' });
      out.innerHTML = 'Dopo ' + S.migliaia(n) + ' osservazioni: <b class="vera">' + fuori + ' sequenze su ' + M + '</b> fuori dalla banda ' +
        it(d.c, 0) + ' ± ' + it(d.e, d.e < 1 ? 1 : 0) + (se.value === 'cauchy' ? ' · per Cauchy circa metà, per ogni n' : '');
    }
    se.addEventListener('change', function () { simula(); render(); });
    [sm, sn].forEach(function (s) { s.addEventListener('input', render); });
    box.querySelector('[data-new]').addEventListener('click', function () { seed = Math.floor(Math.random() * 1e9); simula(); render(); this.blur(); });
    simula();
    render();
  }

  return { widget: widget };
})();
