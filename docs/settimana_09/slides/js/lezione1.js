/*
 * Settimana 9, Lezione 1: De Moivre e i 3600 lanci (The Doctrine of Chances,
 * 1756, pp. 242–248), la forma della somma (pacco «12. TLC», pp. 9–13 e 20–21;
 * notebook 4.4, celle 7–9), la somma standardizzata e l'enunciato (pp. 14–16),
 * le lampadine (pp. 17–18), i dieci dadi (pp. 22–23) e il widget.
 * Utilità in comuni.js.
 */
window.S09L1 = (function () {
  'use strict';
  var svg = PSI.svg, S = S09, C = S.C, label = S.label, line = S.line, it = S.it;

  function side(el, sel) { var n = PSI.q(el).one(sel); return n; }
  function show(tl, node) { tl.to(node, { opacity: 1, duration: .4 }); }

  // L1-01 · lavagna del riepilogo: somma e media, media e varianza.
  PSI.scene('riepilogo-s8', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var g = svg('g', {}, root);
    label(g, 85, 40, '', 's09-label');
    label(g, 190, 40, 'somma', 's09-label s09-data', { 'font-weight': 700 });
    label(g, 300, 40, 'media', 's09-label s09-ok', { 'font-weight': 700 });
    [['E', 'nμ', 'μ'], ['Var', 'nσ²', 'σ²/n'], ['dev.', 'σ√n', 'σ/√n']].forEach(function (r, i) {
      var y = 100 + i * 52;
      label(g, 60, y, r[0], 's09-label');
      label(g, 190, y, r[1], 's09-label s09-data');
      label(g, 300, y, r[2], 's09-label s09-ok');
    });
    line(g, 20, 58, 350, 58, C.axis, 2);
    gsap.set(g, { opacity: 0 });
    tl.to(g, { opacity: 1, duration: .6 }).addLabel('s0');
  });

  // L1-03 · i 3600 lanci di De Moivre (figura F1 della dispensa).
  PSI.scene('de-moivre-3600', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X = S.scale(1700, 1900, 50, 800), Y = S.scale(0, .0146, 400, 40), w = (X(1900) - X(1700)) / 200;
    var gb = svg('g', { fill: C.data, 'fill-opacity': .55 }, root);
    var g1 = svg('g', { fill: C.ok, opacity: 0 }, root), g2 = svg('g', { fill: C.ok, 'fill-opacity': .55, opacity: 0 }, root);
    for (var k = 1700; k <= 1900; k++) {
      var p = S.binom(k, 3600, .5), r = { x: X(k) - w * .42, y: Y(p), width: w * .84, height: 400 - Y(p) };
      svg('rect', r, gb);
      if (k >= 1770 && k <= 1830) svg('rect', r, g1);
      else if (k >= 1740 && k <= 1860) svg('rect', r, g2);
    }
    S.axes(root, { x: 50, y: 40, w: 750, h: 360 }, [1710, 1740, 1770, 1800, 1830, 1860, 1890].map(function (v) { return [X(v), String(v)]; }), []);
    label(root, 425, 462, 'numero di teste in 3600 lanci', 's09-small');
    var pts = [];
    for (var t = 0; t <= 200; t++) { var x = 1700 + t; pts.push([X(x), Y(S.ndens(x, 1800, 30))]); }
    var curve = S.poly(root, pts, C.model, 4, { opacity: 0 });
    var l1 = label(root, X(1800), 26, '68,3%', 's09-label s09-ok', { 'font-weight': 800, opacity: 0 });
    var l2 = label(root, X(1866), 330, '95,4%', 's09-label s09-ok', { 'font-weight': 800, opacity: 0 });
    var arr = svg('g', { opacity: 0 }, root);
    line(arr, X(1800), 150, X(1830), 150, C.text, 3);
    line(arr, X(1800), 140, X(1800), 160, C.text, 3);
    line(arr, X(1830), 140, X(1830), 160, C.text, 3);
    label(arr, X(1815), 136, '30', 's09-label');
    var steps = ['.dm-s1', '.dm-s2', '.dm-s3', '.dm-s4', '.dm-s5'].map(function (s) { return q.one(s); });
    gsap.set(gb, { opacity: 0 });
    tl.to(gb, { opacity: 1, duration: .6 }).addLabel('s0');
    tl.to(curve, { opacity: 1, duration: .5 }); show(tl, steps[0]); tl.addLabel('s1');
    tl.to([g1, l1], { opacity: 1, duration: .5 }); show(tl, steps[1]); tl.addLabel('s2');
    tl.to([g2, l2], { opacity: 1, duration: .5 }); show(tl, steps[2]); tl.addLabel('s3');
    tl.to(arr, { opacity: 1, duration: .4 }); show(tl, steps[3]); tl.addLabel('s4');
    show(tl, steps[4]); tl.addLabel('s5');
  });

  // L1-06 · tre lenti sulla stessa passeggiata aleatoria (figura F2).
  PSI.scene('tre-lenti', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), f = q.one('.tl-f');
    var N = 1000, M = 8, r = PSI.random(1733), walks = [];
    for (var j = 0; j < M; j++) {
      var s = 0, w = new Float64Array(N + 1);
      for (var i = 1; i <= N; i++) { s += r() < .5 ? 1 : -1; w[i] = s; }
      walks.push(w);
    }
    var cols = [C.data, C.model, C.ok, C.third, C.red, C.data, C.model, C.ok];
    var panels = [
      ['la somma Sₙ', function (k, v) { return v; }, 80, function (k) { return 2 * Math.sqrt(k); }, '±2√n', 'si allarga', C.red],
      ['la media Sₙ / n', function (k, v) { return v / k; }, 1, function (k) { return 2 / Math.sqrt(k); }, '±2/√n', 'si stringe', C.red],
      ['Sₙ / √n', function (k, v) { return v / Math.sqrt(k); }, 3.5, function () { return 2; }, '±2', 'resta uguale', C.ok]];
    var ks = [];
    for (var t = 0; t <= 110; t++) { var k = Math.max(1, Math.round(Math.pow(N, t / 110))); if (ks[ks.length - 1] !== k) ks.push(k); }
    for (k = 10; k <= N; k += 12) if (ks.indexOf(k) < 0) ks.push(k);
    ks.sort(function (a, b) { return a - b; });
    var groups = panels.map(function (p, i) {
      var g = svg('g', { opacity: 0 }, root), x0 = 30 + i * 385, W = 345;
      var X = function (k) { return x0 + k / N * W; }, Y = S.scale(-p[2], p[2], 360, 70);
      var clip = function (v) { return Math.max(-p[2], Math.min(p[2], v)); };
      line(g, x0, Y(0), x0 + W, Y(0), C.axis, 2);
      line(g, x0, 70, x0, 360, C.axis, 2);
      walks.forEach(function (wk, j) {
        S.poly(g, ks.map(function (k) { return [X(k), Y(clip(p[1](k, wk[k])))]; }), cols[j], 2, { 'stroke-opacity': .85 });
      });
      [1, -1].forEach(function (sg) {
        var e = [];
        for (var k = 4; k <= N; k += 12) e.push([X(k), Y(clip(sg * p[3](k)))]);
        S.poly(g, e, C.text, 2.5, { 'stroke-dasharray': '8 6' });
      });
      label(g, x0 + W / 2, 40, p[0], 's09-label', { 'font-weight': 700 });
      label(g, x0 + W - 4, 352, p[4], 's09-small', { 'text-anchor': 'end' });
      label(g, x0 + W / 2, 400, 'n da 1 a 1000', 's09-tick');
      label(g, x0 + W / 2, 432, p[5], 's09-label', { fill: p[6], 'font-weight': 800 });
      return g;
    });
    gsap.set(f, { opacity: 0 });
    tl.addLabel('s0');
    groups.forEach(function (g, i) { tl.to(g, { opacity: 1, duration: .5 }).addLabel('s' + (i + 1)); });
    tl.to(f, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // L1-07 · somme di n uniformi contro la normale (pacco 12, pp. 11–13; figura F3).
  PSI.scene('uniformi', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var vals = { 1: null, 2: ['0,2222', '0,2071'], 5: ['0,1017', '0,0984'], 10: ['0,0337', '0,0339'] };
    var groups = [1, 2, 5, 10].map(function (n, i) {
      var g = svg('g', { opacity: 0 }, root), x0 = 25 + i * 292, W = 262, base = 340, top = 70;
      var mu = n / 2, sd = Math.sqrt(n / 12);
      var lo = n === 1 ? -.3 : n === 2 ? -.2 : mu - 3.8 * sd, hi = n === 1 ? 1.3 : n === 2 ? 2.2 : mu + 3.8 * sd;
      var X = S.scale(lo, hi, x0, x0 + W), ymax = n === 1 ? 1.25 : Math.max(S.ihPdf(mu, n), S.ndens(mu, mu, sd)) * 1.15;
      var Y = S.scale(0, ymax, base, top), thr = n / 3, ex = [], nm = [], sh = [[X(Math.max(lo, 0)), base]];
      for (var t = 0; t <= 160; t++) {
        var x = lo + (hi - lo) * t / 160, f = S.ihPdf(x, n);
        ex.push([X(x), Y(f)]); nm.push([X(x), Y(S.ndens(x, mu, sd))]);
        if (x >= 0 && x <= thr) sh.push([X(x), Y(f)]);
      }
      sh.push([X(thr), Y(S.ihPdf(thr, n))], [X(thr), base]);
      S.area(g, sh, C.ok, .35);
      S.poly(g, ex, C.data, 4);
      S.poly(g, nm, C.model, 3, { 'stroke-dasharray': '9 6' });
      line(g, x0, base, x0 + W, base, C.axis, 2);
      var ticks = n === 1 ? [0, 1] : n === 2 ? [0, 1, 2] : n === 5 ? [1, 2.5, 4] : [3, 5, 7];
      ticks.forEach(function (v) { line(g, X(v), base, X(v), base + 7, C.axis, 2); label(g, X(v), base + 30, it(v, v % 1 ? 1 : 0), 's09-tick'); });
      label(g, x0 + W / 2, 42, 'n = ' + n, 's09-label', { 'font-weight': 800 });
      if (vals[n]) {
        label(g, x0 + W / 2, 412, 'esatta ' + vals[n][0], 's09-small', { fill: C.data, 'font-weight': 700 });
        label(g, x0 + W / 2, 444, 'normale ' + vals[n][1], 's09-small', { fill: C.model, 'font-weight': 700 });
      } else {
        label(g, x0 + W / 2, 412, 'P(S₁ < 1/3) = 1/3', 's09-small', { fill: C.ok });
      }
      return g;
    });
    tl.addLabel('s0');
    groups.forEach(function (g, i) { tl.to(g, { opacity: 1, duration: .5 }).addLabel('s' + (i + 1)); });
  });

  // L1-08 (S) · la distribuzione a due gobbe e la media di 15 valori (pacco 12, pp. 20–21).
  PSI.scene('due-gobbe', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var gl = svg('g', {}, root), gr = svg('g', { opacity: 0 }, root);
    var X = S.scale(-.5, 10.5, 40, 540), Y = S.scale(0, .36, 340, 70);
    S.area(gl, [[X(0), 340], [X(0), Y(.3)], [X(2), Y(.3)], [X(2), 340]], C.third, .55);
    S.area(gl, [[X(8), 340], [X(8), Y(.2)], [X(10), Y(.2)], [X(10), 340]], C.third, .55);
    line(gl, 40, 340, 540, 340, C.axis, 2);
    [0, 2, 4.2, 8, 10].forEach(function (v) { line(gl, X(v), 340, X(v), 347, C.axis, 2); label(gl, X(v), 372, it(v, v % 1 ? 1 : 0), 's09-tick'); });
    label(gl, 290, 40, 'un valore: due gobbe', 's09-label', { 'font-weight': 700 });
    label(gl, X(4.2), 300, 'μ = 4,2', 's09-small');
    var r = PSI.random(15), M = 10000, means = [];
    for (var j = 0; j < M; j++) {
      var s = 0;
      for (var i = 0; i < 15; i++) s += r() < .6 ? 2 * r() : 8 + 2 * r();
      means.push(s / 15);
    }
    var sd = Math.sqrt((0.6 * 4 / 3 + 0.4 * (1 / 3 + 81) - 4.2 * 4.2) / 15);
    var lo = 1, hi = 7.4, B = 40, wb = (hi - lo) / B, cnt = new Array(B).fill(0);
    means.forEach(function (m) { var k = Math.floor((m - lo) / wb); if (k >= 0 && k < B) cnt[k]++; });
    var X2 = S.scale(lo, hi, 640, 1150), Y2 = S.scale(0, .46, 340, 70);
    cnt.forEach(function (c, k) {
      var h = c / (M * wb);
      svg('rect', { x: X2(lo + k * wb) + 1, y: Y2(h), width: X2(lo + wb) - X2(lo) - 2, height: 340 - Y2(h), fill: C.data, 'fill-opacity': .6 }, gr);
    });
    var pts = [];
    for (var t = 0; t <= 120; t++) { var x = lo + (hi - lo) * t / 120; pts.push([X2(x), Y2(S.ndens(x, 4.2, sd))]); }
    S.poly(gr, pts, C.model, 3.5);
    line(gr, 640, 340, 1150, 340, C.axis, 2);
    [2, 3, 4.2, 5.4, 6.4].forEach(function (v) { line(gr, X2(v), 340, X2(v), 347, C.axis, 2); label(gr, X2(v), 372, it(v, v % 1 ? 1 : 0), 's09-tick'); });
    label(gr, 895, 40, 'la media di 15 valori, 10 000 volte', 's09-label', { 'font-weight': 700 });
    label(gr, 895, 420, 'normale con media 4,2 e varianza σ²/15', 's09-small', { fill: C.model });
    gsap.set(gl, { opacity: 0 });
    tl.to(gl, { opacity: 1, duration: .5 }).addLabel('s0');
    tl.to(gr, { opacity: 1, duration: .6 }).addLabel('s1');
  });

  // L1-15 · dove va e come oscilla: la media di n dadi e la sua versione standardizzata.
  PSI.scene('due-convergenze', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), dl = q.one('.dc-l'), dr = q.one('.dc-r');
    var sig = Math.sqrt(35 / 12);
    var XL = S.scale(.5, 6.5, 40, 560), YL = S.scale(0, 1.05, 360, 50);
    var XR = S.scale(-3.6, 3.6, 640, 1150), YR = S.scale(0, .5, 360, 50);
    line(root, 40, 360, 560, 360, C.axis, 2); line(root, 640, 360, 1150, 360, C.axis, 2);
    for (var v = 1; v <= 6; v++) { line(root, XL(v), 360, XL(v), 367, C.axis, 2); label(root, XL(v), 392, String(v), 's09-tick'); }
    [-3, -2, -1, 0, 1, 2, 3].forEach(function (z) { line(root, XR(z), 360, XR(z), 367, C.axis, 2); label(root, XR(z), 392, String(z).replace('-', '−'), 's09-tick'); });
    label(root, 300, 30, 'media di n dadi', 's09-label', { 'font-weight': 700 });
    var ttlR = label(root, 895, 30, 'la stessa media, standardizzata', 's09-label', { 'font-weight': 700, opacity: 0 });
    var gn = svg('g', { opacity: 0 }, root), pts = [];
    for (var t = 0; t <= 120; t++) { var z = -3.6 + 7.2 * t / 120; pts.push([XR(z), YR(S.npdf(z))]); }
    S.poly(gn, pts, C.text, 3, { 'stroke-dasharray': '8 6' });
    label(gn, XR(2.1), YR(.25), 'N(0, 1)', 's09-small', { 'text-anchor': 'start' });
    var spec = [[1, C.third], [4, C.model], [16, C.data]];
    var left = [], right = svg('g', { opacity: 0 }, root);
    spec.forEach(function (c, i) {
      var n = c[0], pmf = S.dadi(n), ss = Object.keys(pmf).map(Number).sort(function (a, b) { return a - b; });
      var pl = [], pr = [], hz = sig * Math.sqrt(n), dz = 1 / hz;
      ss.forEach(function (s) {
        var m = s / n, h = pmf[s] * n, z = (s - 3.5 * n) / (sig * Math.sqrt(n));
        pl.push([XL(m - .5 / n), YL(h)], [XL(m + .5 / n), YL(h)]);
        pr.push([XR(z - dz / 2), YR(pmf[s] * hz)], [XR(z + dz / 2), YR(pmf[s] * hz)]);
      });
      pl.unshift([pl[0][0], YL(0)]); pl.push([pl[pl.length - 1][0], YL(0)]);
      pr.unshift([pr[0][0], YR(0)]); pr.push([pr[pr.length - 1][0], YR(0)]);
      var g = svg('g', { opacity: 0 }, root);
      S.poly(g, pl, c[1], 3.5);
      label(g, i === 0 ? XL(1.1) : XL(4.55), i === 0 ? YL(.17) - 14 : i === 1 ? YL(.55) : YL(.98), 'n = ' + n, 's09-small', { 'text-anchor': 'start', fill: c[1], 'font-weight': 700 });
      left.push(g);
      S.poly(right, pr, c[1], 3, { 'stroke-opacity': .9 });
    });
    gsap.set([dl, dr], { opacity: 0 });
    tl.addLabel('s0');
    tl.to([left[0], dl], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(left[1], { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(left[2], { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to([right, gn, ttlR, dr], { opacity: 1, duration: .6 }).addLabel('s4');
  });

  // L1-18 · tre anni simulati di lampadine (seme 19: 410, 311 e 425 giorni).
  PSI.scene('lampadine', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X = S.scale(0, 520, 60, 1140), r = PSI.random(19), rows = [];
    S.axes(root, { x: 60, y: 20, w: 1080, h: 270 }, [0, 100, 200, 300, 365, 400, 500].map(function (v) { return [X(v), String(v)]; }), []);
    label(root, 600, 350, 'giorni coperti da 40 lampadine, una dopo l\'altra', 's09-small');
    line(root, X(365), 20, X(365), 290, C.ok, 3, { 'stroke-dasharray': '8 6' });
    label(root, X(365), 14, 'un anno', 's09-small s09-ok');
    for (var j = 0; j < 3; j++) {
      var g = svg('g', { opacity: 0 }, root), y = 55 + j * 80, s = 0;
      for (var i = 0; i < 40; i++) {
        var d = -10 * Math.log(1 - r());
        svg('rect', { x: X(s), y: y, width: Math.max(.5, X(s + d) - X(s) - .6), height: 40, fill: i % 2 ? C.data : '#7dd3fc', 'fill-opacity': .85 }, g);
        s += d;
      }
      var ok = s >= 365;
      label(g, Math.min(X(s) + 12, 1130), y + 30, Math.round(s) + (ok ? ' ✓' : ' ✗'), 's09-label', { 'text-anchor': X(s) + 12 > 1060 ? 'end' : 'start', fill: ok ? C.ok : C.red, 'font-weight': 800 });
      rows.push(g);
    }
    tl.addLabel('s0');
    rows.forEach(function (g, i) { tl.to(g, { opacity: 1, duration: .6 }).addLabel('s' + (i + 1)); });
  });

  // L1-19 · la soluzione: i passi e la campana di S₄₀ con l'area oltre 365.
  PSI.scene('lampadine-sol', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), steps = q.all('.ls-step');
    var sd = Math.sqrt(4000), X = S.scale(200, 600, 20, 390), Y = S.scale(0, S.ndens(400, 400, sd) * 1.15, 270, 30);
    var pts = [], sh = [[X(365), 270]];
    for (var t = 0; t <= 120; t++) {
      var x = 200 + 400 * t / 120, yv = Y(S.ndens(x, 400, sd));
      pts.push([X(x), yv]); if (x >= 365) sh.push([X(x), yv]);
    }
    sh.splice(1, 0, [X(365), Y(S.ndens(365, 400, sd))]); sh.push([X(600), 270]);
    var area = S.area(root, sh, C.ok, .4);
    S.poly(root, pts, C.model, 3.5);
    line(root, 20, 270, 390, 270, C.axis, 2);
    [300, 365, 500].forEach(function (v) { line(root, X(v), 270, X(v), 277, C.axis, 2); label(root, X(v), 302, String(v), 's09-tick'); });
    label(root, X(400), 22, 'μ = 400', 's09-small');
    var pct = label(root, X(450), 150, '0,71', 's09-big s09-ok', { opacity: 0 });
    gsap.set(steps, { opacity: 0 }); gsap.set(area, { opacity: 0 });
    tl.addLabel('s0');
    Array.prototype.forEach.call(steps, function (s, i) {
      tl.to(s, { opacity: 1, duration: .4 });
      if (i === 3) tl.to([area, pct], { opacity: 1, duration: .5 });
      tl.addLabel('s' + (i + 1));
    });
  });

  // L1-22 · dieci dadi: barre vere, campana, mezza barra e correzione di continuità.
  PSI.scene('dieci-dadi-sol', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var pmf = S.dadi(10), sd = Math.sqrt(10 * 35 / 12);
    var X = S.scale(13.5, 56.5, 40, 790), Y = S.scale(0, .085, 380, 30), bw = (X(1) - X(0)) * .82;
    var gb = svg('g', {}, root), gt = svg('g', { opacity: 0 }, root);
    for (var s = 14; s <= 56; s++) {
      var p = pmf[s] || 0, r = { x: X(s) - bw / 2, y: Y(p), width: bw, height: 380 - Y(p) };
      svg('rect', Object.assign({ fill: C.data, 'fill-opacity': .55 }, r), gb);
      if (s <= 25 || s >= 45) svg('rect', Object.assign({ fill: C.red, 'fill-opacity': .85 }, r), gt);
    }
    var pts = [];
    for (var t = 0; t <= 160; t++) { var x = 13.5 + 43 * t / 160; pts.push([X(x), Y(S.ndens(x, 35, sd))]); }
    S.poly(root, pts, C.model, 3.5);
    S.axes(root, { x: 40, y: 30, w: 750, h: 350 }, [15, 25, 35, 45, 55].map(function (v) { return [X(v), String(v)]; }), []);
    var cut = svg('g', { opacity: 0 }, root);
    line(cut, X(25), 60, X(25), 380, C.text, 3, { 'stroke-dasharray': '7 5' });
    line(cut, X(45), 60, X(45), 380, C.text, 3, { 'stroke-dasharray': '7 5' });
    label(cut, X(25), 52, '25', 's09-small');
    label(cut, X(45), 52, '45', 's09-small');
    var cc = svg('g', { opacity: 0 }, root);
    line(cc, X(25.5), 60, X(25.5), 380, C.ok, 3.5);
    line(cc, X(44.5), 60, X(44.5), 380, C.ok, 3.5);
    label(cc, X(25.5) + 8, 100, '25,5', 's09-small s09-ok', { 'text-anchor': 'start' });
    label(cc, X(44.5) - 8, 100, '44,5', 's09-small s09-ok', { 'text-anchor': 'end' });
    var st = ['.dd-s1', '.dd-s2', '.dd-s3', '.dd-s4'].map(function (s) { return q.one(s); });
    tl.addLabel('s0');
    tl.to(gt, { opacity: 1, duration: .5 }); show(tl, st[0]); tl.addLabel('s1');
    tl.to(cut, { opacity: 1, duration: .4 }); show(tl, st[1]); tl.addLabel('s2');
    tl.to(cut, { opacity: .25, duration: .3 }); tl.to(cc, { opacity: 1, duration: .4 }); show(tl, st[2]); tl.addLabel('s3');
    show(tl, st[3]); tl.addLabel('s4');
  });

  // L1-09 (S) · widget: la campana delle somme (stesso modello del widget della dispensa).
  function widget() {
    var box = document.getElementById('ws-box');
    if (!box) return;
    var M = 20000, seed = 1733, somme = null;
    var sd = box.querySelector('select'), sn = box.querySelector('input');
    var root = box.querySelector('svg'), out = box.querySelector('.wc-out');
    var D = {
      unif: { mu: .5, v: 1 / 12, disc: false, a: 0, b: 1, g: function (r) { return r(); } },
      dado: { mu: 3.5, v: 35 / 12, disc: true, a: 1, b: 6, g: function (r) { return 1 + Math.floor(r() * 6); } },
      esp: { mu: 1, v: 1, disc: false, a: 0, b: Infinity, g: function (r) { return -Math.log(1 - r()); } },
      gobbe: { mu: 4.2, v: .6 * 4 / 3 + .4 * (1 / 3 + 81) - 4.2 * 4.2, disc: false, a: 0, b: 10, g: function (r) { return r() < .6 ? 2 * r() : 8 + 2 * r(); } },
      bern: { mu: .1, v: .09, disc: true, a: 0, b: 1, g: function (r) { return r() < .1 ? 1 : 0; } }
    };
    function simula() {
      var d = D[sd.value], n = +sn.value, r = PSI.random(seed + n * 7919);
      somme = new Float64Array(M);
      for (var j = 0; j < M; j++) { var s = 0; for (var i = 0; i < n; i++) s += d.g(r); somme[j] = s; }
    }
    function render() {
      var d = D[sd.value], n = +sn.value, m = n * d.mu, s = Math.sqrt(n * d.v);
      box.querySelector('[data-v="n"]').textContent = n;
      var lo = Math.max(n * d.a, m - 4 * s), hi = Math.min(n * d.b, m + 4 * s);
      if (d.disc) { lo = Math.floor(lo) - .5; hi = Math.ceil(hi) + .5; }
      var blo = lo, bhi = hi, pad = .04 * (hi - lo); lo -= pad; hi += pad;
      while (root.firstChild) root.removeChild(root.firstChild);
      var X = S.scale(lo, hi, 40, 1080), bins = [], w, k;
      if (d.disc) {
        w = 1; var kmin = Math.ceil(blo);
        for (k = kmin; k <= Math.floor(bhi); k++) bins.push({ c: k, n: 0 });
        for (var j = 0; j < M; j++) { k = Math.round(somme[j]) - kmin; if (k >= 0 && k < bins.length) bins[k].n++; }
      } else {
        var B = 40; w = (bhi - blo) / B;
        for (k = 0; k < B; k++) bins.push({ c: blo + (k + .5) * w, n: 0 });
        for (var q = 0; q < M; q++) { k = Math.floor((somme[q] - blo) / w); if (k >= 0 && k < B) bins[k].n++; }
      }
      var peak = 1 / (s * Math.sqrt(2 * Math.PI)), ymax = peak;
      bins.forEach(function (b) { b.h = b.n / (M * w); if (b.h > ymax) ymax = b.h; });
      var Y = S.scale(0, ymax * 1.1, 320, 20), bw = (X(lo + w) - X(lo)) * .88;
      bins.forEach(function (b) {
        if (b.h > 0) svg('rect', { x: X(b.c) - bw / 2, y: Y(b.h), width: bw, height: 320 - Y(b.h), fill: C.data, 'fill-opacity': .55 }, root);
      });
      var pts = [];
      for (var t = 0; t <= 200; t++) { var x = lo + (hi - lo) * t / 200; pts.push([X(x), Y(S.ndens(x, m, s))]); }
      S.poly(root, pts, C.model, 4);
      [-2, 2].forEach(function (c) { var xc = m + c * s; if (xc > lo && xc < hi) line(root, X(xc), 320, X(xc), 40, C.red, 3, { 'stroke-dasharray': '8 6' }); });
      line(root, 40, 320, 1080, 320, C.axis, 2);
      var dec = s * 2 < 3 ? 1 : 0;
      [-3, -2, -1, 0, 1, 2, 3].forEach(function (c) {
        var xc = m + c * s; if (xc < lo || xc > hi) return;
        line(root, X(xc), 320, X(xc), 327, C.axis, 2); label(root, X(xc), 354, it(xc, dec), 's09-tick');
      });
      var sopra = 0, sotto = 0;
      for (var p = 0; p < M; p++) { if (somme[p] > m + 2 * s + 1e-9) sopra++; if (somme[p] < m - 2 * s - 1e-9) sotto++; }
      out.innerHTML = 'nμ = ' + it(m, 2) + ', σ√n = ' + it(s, 2) + ' · oltre nμ + 2σ√n: <b class="vera">' + it(100 * sopra / M, 2) +
        '%</b> · sotto nμ − 2σ√n: <b class="vera">' + it(100 * sotto / M, 2) + '%</b> · normale: <b class="mod">2,28%</b> e <b class="mod">2,28%</b>';
    }
    sd.addEventListener('change', function () { simula(); render(); });
    sn.addEventListener('input', function () { simula(); render(); });
    box.querySelector('[data-new]').addEventListener('click', function () { seed = Math.floor(Math.random() * 1e9); simula(); render(); this.blur(); });
    simula();
    render();
  }

  return { widget: widget, side: side };
})();
