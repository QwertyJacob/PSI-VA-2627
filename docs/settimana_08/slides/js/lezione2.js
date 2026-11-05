/*
 * Settimana 8, Lezione 2: l'urna di Jacob Bernoulli (Ars Conjectandi, 1713),
 * la varianza di somme e medie di variabili indipendenti (notebook 4.4 e pacco
 * «12. TLC», p. 6), i cento dadi e la legge dei grandi numeri (pacco 12,
 * pp. 3–8), la diluizione e il widget. Utilità in comuni.js.
 */
window.S08L2 = (function () {
  'use strict';
  var svg = PSI.svg, S = S08, C = S.C, label = S.label, line = S.line, it = S.it;

  // L2-01 · lavagna del riepilogo: il limite 1/k² accanto alla regola della normale.
  PSI.scene('riepilogo-l1', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var g = svg('g', {}, root);
    label(g, 70, 40, 'k', 's08-label', { 'font-weight': 700 });
    label(g, 180, 40, '1/k²', 's08-label s08-model', { 'font-weight': 700 });
    label(g, 295, 40, 'normale', 's08-label s08-data', { 'font-weight': 700 });
    [['1', '100%', '31,7%'], ['2', '25%', '4,6%'], ['3', '11,1%', '0,27%']].forEach(function (r, i) {
      var y = 95 + i * 50;
      label(g, 70, y, r[0], 's08-label');
      label(g, 180, y, r[1], 's08-label s08-model');
      label(g, 295, y, r[2], 's08-label s08-data');
    });
    line(g, 20, 55, 350, 55, C.axis, 2);
    gsap.set(g, { opacity: 0 });
    tl.to(g, { opacity: 1, duration: .6 }).addLabel('s0');
  });

  // L2-02 · l'urna di Bernoulli: 3000 bianchi e 2000 neri, estrazioni con
  // reinserimento; la frazione di bianchi dopo 10, 100, 1000 e 25 550 estrazioni.
  PSI.scene('urna', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var N = 25550, r = PSI.random(3), cum = new Float64Array(N + 1), w = 0;
    for (var i = 1; i <= N; i++) { w += r() < 0.6 ? 1 : 0; cum[i] = w; }
    // L'urna: cinquanta sassolini, uno ogni cento (30 bianchi, 20 neri).
    svg('path', { d: 'M70 70 L270 70 L250 110 C330 160 330 380 250 410 L90 410 C10 380 10 160 90 110 Z',
      fill: '#ffffff08', stroke: C.muted, 'stroke-width': 4 }, root);
    var rs = PSI.random(11), cols = [];
    for (i = 0; i < 50; i++) cols.push(i < 30);
    for (i = 49; i > 0; i--) { var j = Math.floor(rs() * (i + 1)), t = cols[i]; cols[i] = cols[j]; cols[j] = t; }
    cols.forEach(function (bianco, k) {
      var row = Math.floor(k / 10), col = k % 10;
      svg('circle', { cx: 62 + col * 23 + (row % 2) * 10 + rs() * 4, cy: 205 + row * 34 + rs() * 4, r: 10,
        fill: bianco ? C.text : '#2d3748', stroke: bianco ? 'none' : C.muted, 'stroke-width': 2 }, root);
    });
    label(root, 170, 450, '3000 bianchi · 2000 neri', 's08-small');
    // Il grafico della frazione di bianchi, con l'asse delle estrazioni in scala logaritmica.
    var X = function (n) { return 420 + Math.log(n) / Math.LN10 / Math.log10(N) * 640; };
    var Y = S.scale(0, 1, 400, 60);
    S.area(root, [[X(1), Y(.62)], [X(N), Y(.62)], [X(N), Y(.58)], [X(1), Y(.58)]], C.ok, .2);
    line(root, X(1), Y(.6), X(N), Y(.6), C.model, 2.5, { 'stroke-dasharray': '8 6' });
    S.axes(root, { x: 420, y: 60, w: 640, h: 340 }, [[X(1), '1'], [X(10), '10'], [X(100), '100'], [X(1000), '1000'], [X(N), '25 550']],
      [[Y(0), '0'], [Y(.6), '0,6'], [Y(1), '1']]);
    label(root, 1060, Y(.6) - 14, '3/5', 's08-small s08-model', { 'text-anchor': 'end' });
    var band = label(root, 1060, Y(.62) - 40, 'tra 29/50 e 31/50', 's08-small s08-ok', { 'text-anchor': 'end', opacity: 0 });
    var trace = svg('polyline', { points: '', fill: 'none', stroke: C.data, 'stroke-width': 3 }, root);
    var counter = label(root, 740, 30, '', 's08-label');
    var st = { e: 0 };
    function render() {
      var n = Math.max(1, Math.round(Math.pow(10, st.e))), pts = [];
      for (var t = 0; t <= 300; t++) {
        var k = Math.max(1, Math.round(Math.pow(10, st.e * t / 300)));
        pts.push(X(k).toFixed(1) + ',' + Y(cum[k] / k).toFixed(1));
      }
      trace.setAttribute('points', st.e > 0 ? pts.join(' ') : '');
      counter.textContent = st.e > 0 ? 'estrazioni: ' + S.migliaia(n) + ' · frazione di bianchi: ' + it(cum[n] / n, 3) : 'quante estrazioni servono?';
    }
    render();
    tl.addLabel('s0');
    [1, 2, 3, Math.log10(N)].forEach(function (e, k) {
      tl.to(st, { e: e, duration: .9, ease: 'power1.inOut', onUpdate: render });
      if (k === 3) tl.to(band, { opacity: 1, duration: .4 });
      tl.addLabel('s' + (k + 1));
    });
  });

  // L2-05 · un dado, due dadi indipendenti, lo stesso dado contato due volte.
  PSI.scene('somma-dadi', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var panels = [
      ['un dado X', function () { var o = {}; for (var k = 1; k <= 6; k++) o[k] = 1 / 6; return o; }(), C.third, 'Var = 35/12 ≈ 2,92', 1, 6],
      ['X + Y, indipendenti', function () { var o = {}; for (var s = 2; s <= 12; s++) o[s] = (6 - Math.abs(s - 7)) / 36; return o; }(), C.data, 'Var = 35/6 ≈ 5,83 = 2 · 2,92', 2, 12],
      ['X + X = 2X', function () { var o = {}; for (var s = 2; s <= 12; s += 2) o[s] = 1 / 6; return o; }(), C.model, 'Var = 35/3 ≈ 11,67 = 4 · 2,92', 2, 12]];
    var groups = panels.map(function (p, i) {
      var g = svg('g', { opacity: 0 }, root), X0 = 20 + i * 375, W = 340, BASE = 300, TOP = 80;
      var X = S.scale(p[4] - .5, p[5] + .5, X0, X0 + W), Y = S.scale(0, .2, BASE, TOP), bw = Math.min(40, W / (p[5] - p[4] + 1) - 6);
      Object.keys(p[1]).forEach(function (v) {
        svg('rect', { x: X(+v) - bw / 2, y: Y(p[1][v]), width: bw, height: BASE - Y(p[1][v]), fill: p[2] }, g);
      });
      line(g, X0, BASE, X0 + W, BASE, C.axis, 2);
      for (var v = p[4]; v <= p[5]; v += (p[5] - p[4] > 6 ? 2 : 1)) label(g, X(v), BASE + 28, String(v), 's08-tick');
      label(g, X0 + W / 2, 40, p[0], 's08-label', { 'font-weight': 700 });
      label(g, X0 + W / 2, BASE + 68, p[3], 's08-small', { fill: p[2], 'font-weight': 700 });
      return g;
    });
    tl.to(groups[0], { opacity: 1, duration: .5 }).addLabel('s0');
    tl.to(groups[1], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(groups[2], { opacity: 1, duration: .5 }).addLabel('s2');
  });

  // L2-13 · la media di n dadi si stringe (figura F7 della dispensa).
  PSI.scene('media-n', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), rule = q.one('.mn-rule');
    var X = S.scale(.5, 6.5, 60, 1060), Y = S.scale(0, 1, 330, 40);
    line(root, 60, 330, 1060, 330, C.axis, 2);
    for (var v = 1; v <= 6; v++) { line(root, X(v), 330, X(v), 338, C.axis, 2); label(root, X(v), 366, String(v), 's08-tick'); }
    line(root, X(3.5), 40, X(3.5), 330, C.axis, 2, { 'stroke-dasharray': '6 6' });
    var groups = [[1, C.third, X(.7), Y(.17) - 14], [4, C.model, X(4.75), Y(.5)], [16, C.data, X(4.2), Y(.92)]].map(function (c) {
      var n = c[0], pmf = S.dadi(n), pts = [];
      Object.keys(pmf).map(Number).sort(function (a, b) { return a - b; }).forEach(function (s) {
        var m = s / n, h = pmf[s] * n;
        pts.push([X(m - .5 / n), Y(h)], [X(m + .5 / n), Y(h)]);
      });
      pts.unshift([pts[0][0], Y(0)]); pts.push([pts[pts.length - 1][0], Y(0)]);
      var g = svg('g', { opacity: 0 }, root);
      S.poly(g, pts, c[1], 4);
      label(g, c[2], c[3], 'n = ' + n + ': σ/√n = ' + it(Math.sqrt(35 / 12 / n), 2), 's08-label', { 'text-anchor': 'start', fill: c[1], 'font-weight': 700 });
      return g;
    });
    gsap.set(rule, { opacity: 0 });
    tl.to(groups[0], { opacity: 1, duration: .4 }).addLabel('s0');
    tl.to(groups[1], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(groups[2], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(rule, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L2-14 · cento lanci, poi mille (pacco 12, pp. 3–5): la media progressiva.
  PSI.scene('cento-dadi', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var cum = S.cumulate(69, 1000, true);
    var X = S.scale(1, 1000, 80, 600), Y = S.scale(1, 6, 380, 50);
    S.axes(root, { x: 80, y: 50, w: 520, h: 330 }, [[X(1), '1'], [X(250), '250'], [X(500), '500'], [X(750), '750'], [X(1000), '1000']],
      [1, 2, 3, 4, 5, 6].map(function (v) { return [Y(v), String(v)]; }));
    line(root, X(1), Y(3.5), X(1000), Y(3.5), C.model, 3, { 'stroke-dasharray': '8 6' });
    label(root, 598, Y(3.5) + 32, 'media teorica 3,5', 's08-small s08-model', { 'text-anchor': 'end' });
    var trace = svg('polyline', { points: '', fill: 'none', stroke: C.data, 'stroke-width': 3 }, root);
    var counter = label(root, 340, 30, '', 's08-label');
    var st = { n: 1 };
    function render() {
      var n = Math.round(st.n), pts = [];
      for (var k = 1; k <= n; k += (k < 50 ? 1 : 3)) pts.push(X(k).toFixed(1) + ',' + Y(cum[k] / k).toFixed(1));
      pts.push(X(n).toFixed(1) + ',' + Y(cum[n] / n).toFixed(1));
      trace.setAttribute('points', pts.join(' '));
      counter.textContent = 'dopo ' + n + ' lanci: media ' + it(cum[n] / n, n >= 1000 ? 3 : 2);
    }
    render();
    tl.addLabel('s0');
    [10, 100, 1000].forEach(function (n, k) {
      tl.to(st, { n: n, duration: k === 2 ? 1.6 : .8, ease: 'none', onUpdate: render }).addLabel('s' + (k + 1));
    });
  });

  // L2-21 · diluizione: la differenza teste − n/2 vaga, la frazione si ferma.
  PSI.scene('diluizione', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var N = 10000, cum = S.cumulate(66, N, false);
    var X = function (n) { return 110 + Math.log(n) / Math.LN10 / 4 * 920; };
    var Ya = S.scale(-150, 150, 200, 30), Yb = S.scale(.3, .7, 410, 250);
    line(root, X(1), Ya(0), X(N), Ya(0), C.model, 2.5, { 'stroke-dasharray': '8 6' });
    line(root, X(1), Yb(.5), X(N), Yb(.5), C.model, 2.5, { 'stroke-dasharray': '8 6' });
    line(root, 110, 30, 110, 200, C.axis, 2); line(root, 110, 250, 110, 410, C.axis, 2); line(root, 110, 410, 1030, 410, C.axis, 2);
    [[Ya(150), '+150'], [Ya(0), '0'], [Ya(-150), '−150']].forEach(function (t) { label(root, 100, t[0] + 8, t[1], 's08-tick', { 'text-anchor': 'end' }); });
    [[Yb(.7), '0,7'], [Yb(.5), '0,5'], [Yb(.3), '0,3']].forEach(function (t) { label(root, 100, t[0] + 8, t[1], 's08-tick', { 'text-anchor': 'end' }); });
    [1, 10, 100, 1000, 10000].forEach(function (n) { line(root, X(n), 410, X(n), 418, C.axis, 2); label(root, X(n), 444, S.migliaia(n), 's08-tick'); });
    label(root, 125, 52, 'teste − n/2', 's08-label s08-data', { 'text-anchor': 'start', 'font-weight': 700 });
    label(root, 125, 272, 'frazione di teste', 's08-label s08-data', { 'text-anchor': 'start', 'font-weight': 700 });
    var ta = svg('polyline', { points: '', fill: 'none', stroke: C.data, 'stroke-width': 3 }, root);
    var tb = svg('polyline', { points: '', fill: 'none', stroke: C.data, 'stroke-width': 3 }, root);
    var ca = label(root, 1030, 190, '', 's08-label', { 'text-anchor': 'end' });
    var cb = label(root, 1030, 400, '', 's08-label', { 'text-anchor': 'end' });
    var st = { e: 0 };
    function render() {
      var pa = [], pb = [], n = Math.round(Math.pow(10, st.e));
      for (var t = 0; t <= 400; t++) {
        var k = Math.max(1, Math.round(Math.pow(10, st.e * t / 400)));
        pa.push(X(k).toFixed(1) + ',' + Ya(Math.max(-150, Math.min(150, cum[k] - k / 2))).toFixed(1));
        pb.push(X(k).toFixed(1) + ',' + Yb(Math.max(.3, Math.min(.7, cum[k] / k))).toFixed(1));
      }
      ta.setAttribute('points', st.e > 0 ? pa.join(' ') : '');
      tb.setAttribute('points', st.e > 0 ? pb.join(' ') : '');
      ca.textContent = st.e > 0 ? 'n = ' + S.migliaia(n) + ': ' + it(cum[n] - n / 2, 0) : '';
      cb.textContent = st.e > 0 ? it(cum[n] / n, 3) : '';
    }
    render();
    tl.addLabel('s0');
    [2, 3, 4].forEach(function (e, k) { tl.to(st, { e: e, duration: 1, ease: 'none', onUpdate: render }).addLabel('s' + (k + 1)); });
  });

  // L2-24 (S) · widget: la media che si stabilizza.
  function widget() {
    var box = document.getElementById('wl-box');
    if (!box) return;
    var NMAX = 10000, MMAX = 50, seed = 1713, cum = null;
    var se = box.querySelector('select'), ins = box.querySelectorAll('input'), sm = ins[0], sn = ins[1], seps = ins[2];
    var root = box.querySelector('svg'), out = box.querySelector('.wc-out');
    function simula() {
      cum = [];
      for (var j = 0; j < MMAX; j++) cum.push(S.cumulate(seed + 101 * j, NMAX, se.value === 'dado'));
    }
    function render() {
      var dado = se.value === 'dado', mu = dado ? 3.5 : 0.5, v = dado ? 35 / 12 : 0.25;
      var M = +sm.value, n = Math.round(Math.pow(10, +sn.value)), eps = +seps.value;
      box.querySelector('[data-v="m"]').textContent = M;
      box.querySelector('[data-v="n"]').textContent = S.migliaia(n);
      box.querySelector('[data-v="e"]').textContent = it(eps, 2);
      while (root.firstChild) root.removeChild(root.firstChild);
      var lo = dado ? 1 : 0, hi = dado ? 6 : 1;
      var X = function (k) { return 100 + Math.log(k) / Math.LN10 / 4 * 980; }, Y = S.scale(lo, hi, 360, 20);
      S.area(root, [[X(1), Y(Math.min(hi, mu + eps))], [X(NMAX), Y(Math.min(hi, mu + eps))], [X(NMAX), Y(Math.max(lo, mu - eps))], [X(1), Y(Math.max(lo, mu - eps))]], C.ok, .18);
      S.axes(root, { x: 100, y: 20, w: 980, h: 340 }, [1, 10, 100, 1000, 10000].map(function (k) { return [X(k), S.migliaia(k)]; }),
        (dado ? [1, 2, 3, 4, 5, 6] : [0, .25, .5, .75, 1]).map(function (m) { return [Y(m), it(m, dado ? 0 : 2)]; }));
      line(root, X(1), Y(mu), X(NMAX), Y(mu), C.model, 2.5, { 'stroke-dasharray': '8 6' });
      var ks = [];
      for (var t = 0; t <= 260; t++) { var k = Math.round(Math.pow(10, 4 * t / 260)); if (k <= n && ks[ks.length - 1] !== k) ks.push(k); }
      if (ks[ks.length - 1] !== n) ks.push(n);
      var fuori = 0;
      for (var j = 0; j < M; j++) {
        var c = cum[j], f = Math.abs(c[n] / n - mu) >= eps - 1e-12;
        if (f) fuori++;
        S.poly(root, ks.map(function (k) { return [X(k), Y(c[k] / k)]; }), f ? C.red : C.data, 2, { 'stroke-opacity': .75 });
      }
      line(root, X(n), 20, X(n), 360, C.ok, 3, { 'stroke-dasharray': '8 6' });
      var lim = v / (n * eps * eps);
      out.innerHTML = 'Dopo ' + S.migliaia(n) + ' lanci: <b class="vera">' + fuori + ' sequenze su ' + M + '</b> fuori dalla banda ' + it(mu, 1) + ' ± ' + it(eps, 2) +
        '. Čebyšëv: al più <b class="lim">' + (lim >= 1 ? '1 (nessuna informazione)' : it(100 * lim, 1) + '%') + '</b>.';
    }
    se.addEventListener('change', function () { simula(); render(); });
    [sm, sn, seps].forEach(function (s) { s.addEventListener('input', render); });
    box.querySelector('[data-new]').addEventListener('click', function () { seed = Math.floor(Math.random() * 1e9); simula(); render(); this.blur(); });
    simula();
    render();
  }

  return { widget: widget };
})();
