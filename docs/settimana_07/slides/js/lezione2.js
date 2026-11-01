/*
 * Settimana 7, Lezione 2: Galton a Naworth Castle, covarianza e correlazione
 * (nuove quest'anno, da Baron § 3.3 e Piech), incorrelate ma dipendenti,
 * correlazione e causa. Segue la dispensa, Atti V–IX. Utilità in comuni.js.
 */
window.S07L2 = (function () {
  'use strict';
  var svg = PSI.svg, S = S07, C = S.C, label = S.label, line = S.line, it = S.it;

  // L2-01 · lavagna del riepilogo: una tabella 2 × 2 con i margini.
  PSI.scene('riepilogo-l1', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var V = [['0,25', '0,25', '0,50'], ['0,25', '0,25', '0,50'], ['0,50', '0,50', '1']];
    var g = svg('g', {}, root);
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      var mg = i === 2 || j === 2;
      svg('rect', { x: 50 + j * 90, y: 20 + i * 62, width: 86, height: 58, rx: 6, fill: mg ? '#fbbf2422' : '#ffffff0a', stroke: C.grid }, g);
      label(g, 93 + j * 90, 58 + i * 62, V[i][j], 's07-cell', { fill: mg ? '#fbbf24' : C.text });
    }
    tl.from(g, { opacity: 0, duration: .5 }).addLabel('s0');
  });

  // L2-02 · i dati di Galton come bolle, la diagonale, la media, le medie per classe.
  PSI.scene('naworth-dati', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg'), G = S.GALTON, CM = S.CM;
    var X = S.scale(160, 188, 120, 1110), Y = S.scale(154, 191, 500, 30);
    var ax = svg('g', {}, root);
    line(ax, 110, 500, 1120, 500, C.axis, 2);
    line(ax, 110, 500, 110, 24, C.axis, 2);
    [160, 165, 170, 175, 180, 185].forEach(function (v) {
      line(ax, X(v), 500, X(v), 507, C.axis, 2);
      label(ax, X(v), 532, String(v), 's07-tick');
    });
    [155, 160, 165, 170, 175, 180, 185, 190].forEach(function (v) {
      line(ax, 103, Y(v), 110, Y(v), C.axis, 2);
      label(ax, 96, Y(v) + 8, String(v), 's07-tick', { 'text-anchor': 'end' });
    });
    label(ax, 1110, 470, 'genitore medio (cm)', 's07-small', { 'text-anchor': 'end' });
    label(ax, 125, 48, 'figlio (cm)', 's07-small', { 'text-anchor': 'start' });
    var bub = svg('g', {}, root);
    G.N.forEach(function (row, i) {
      row.forEach(function (n, j) {
        if (n) svg('circle', { cx: X(CM * G.gen[i]), cy: Y(CM * G.fig[j]), r: 3.4 * Math.sqrt(n), fill: C.data, opacity: .5 }, bub);
      });
    });
    var diag = svg('g', { opacity: 0 }, root);
    line(diag, X(160), Y(160), X(188), Y(188), C.text, 3, { 'stroke-dasharray': '10 8' });
    label(diag, X(186.5), Y(188) + 4, 'figlio = genitore', 's07-small', { 'text-anchor': 'end' });
    var my = 172.9;
    var flat = svg('g', { opacity: 0 }, root);
    line(flat, X(160), Y(my), X(188), Y(my), C.ok, 3);
    label(flat, X(187.5), Y(my) + 32, 'media di tutti i figli', 's07-small s07-ok', { 'text-anchor': 'end' });
    var means = S.galtonRowMeans();
    var mpath = means.map(function (m, i) { return (i ? 'L' : 'M') + X(m.gen).toFixed(1) + ' ' + Y(m.fig).toFixed(1); }).join(' ');
    var orange = svg('g', { opacity: 0 }, root);
    svg('path', { d: mpath, fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, orange);
    means.forEach(function (m) { svg('circle', { cx: X(m.gen), cy: Y(m.fig), r: 6, fill: C.model }, orange); });
    label(orange, X(160.5), Y(185), 'arancio: media dei figli, classe per classe', 's07-small s07-model', { 'text-anchor': 'start' });
    var nums = svg('g', { opacity: 0 }, root);
    label(nums, X(187.5), Y(160), 'genitori dai 179 cm: 180,8 → figli 178,3', 's07-label s07-model', { 'text-anchor': 'end' });
    label(nums, X(160.5), Y(187.6), 'genitori fino ai 166 cm: 165,3 → figli 168,2', 's07-label s07-model', { 'text-anchor': 'start' });
    tl.from(bub, { opacity: 0, duration: .6 }).addLabel('s0');
    tl.to(diag, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(flat, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(orange, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(nums, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // L2-04 · la nuvola di Galton e i quattro quadranti.
  PSI.scene('cv-quadranti', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), lis = q.all('.scene-steps li'), share = q.one('.cq-share');
    var pts = S.galtonPoints(1886), st = S.stats(pts);
    var X = S.scale(159, 189, 70, 670), Y = S.scale(152, 192, 480, 20);
    line(root, 60, 480, 670, 480, C.axis, 2);
    line(root, 60, 480, 60, 14, C.axis, 2);
    [160, 170, 180].forEach(function (v) { label(root, X(v), 508, String(v), 's07-tick'); line(root, X(v), 480, X(v), 487, C.axis, 2); });
    [160, 170, 180, 190].forEach(function (v) { label(root, 52, Y(v) + 8, String(v), 's07-tick', { 'text-anchor': 'end' }); line(root, 53, Y(v), 60, Y(v), C.axis, 2); });
    label(root, 670, 536, 'genitore medio (cm)', 's07-small', { 'text-anchor': 'end' });
    label(root, 72, 36, 'figlio (cm)', 's07-small', { 'text-anchor': 'start' });
    var pos = [], neg = [], g = svg('g', {}, root);
    pts.forEach(function (p) {
      var c = svg('circle', { cx: X(p[0]).toFixed(1), cy: Y(p[1]).toFixed(1), r: 3.4, fill: C.muted, opacity: .7 }, g);
      ((p[0] - st.mx) * (p[1] - st.my) > 0 ? pos : neg).push(c);
    });
    var means = svg('g', { opacity: 0 }, root);
    line(means, X(st.mx), 20, X(st.mx), 480, C.text, 2.5, { 'stroke-dasharray': '9 7' });
    line(means, 60, Y(st.my), 670, Y(st.my), C.text, 2.5, { 'stroke-dasharray': '9 7' });
    label(means, X(st.mx) + 10, 470, 'μX', 's07-small', { 'text-anchor': 'start' });
    label(means, 662, Y(st.my) - 10, 'μY', 's07-small', { 'text-anchor': 'end' });
    var signs = svg('g', { opacity: 0 }, root);
    label(signs, X(186), Y(186), '+', 's07-huge s07-data');
    label(signs, X(163), Y(155.5), '+', 's07-huge s07-data');
    label(signs, X(163), Y(186), '−', 's07-huge s07-model');
    label(signs, X(186), Y(155.5), '−', 's07-huge s07-model');
    var frac = pos.length / pts.length;
    share.innerHTML = 'Azzurri: <b class="data">' + Math.round(100 * frac) + '%</b>, quasi 2 punti su 3.';
    gsap.set(lis, { opacity: .2 });
    tl.from(g, { opacity: 0, duration: .6 }).addLabel('s0');
    tl.to(means, { opacity: 1, duration: .4 }).to(lis[0], { opacity: 1, duration: .3 }, '<').addLabel('s1');
    tl.to(pos, { attr: { fill: C.data }, duration: .5 }).to(lis[1], { opacity: 1, duration: .3 }, '<').addLabel('s2');
    tl.to(neg, { attr: { fill: C.model }, duration: .5 }).to(lis[2], { opacity: 1, duration: .3 }, '<').addLabel('s3');
    tl.to(signs, { opacity: 1, duration: .4 }).to(lis[3], { opacity: 1, duration: .3 }, '<').addLabel('s4');
  });

  // L2-15 · quattro nuvole con ρ diversi (semi fissi).
  PSI.scene('co-nuvole', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var RHO = [.9, .5, 0, -.7], boxes = [];
    RHO.forEach(function (rho, k) {
      var pts = S.correlated(S.normals(100 + k, 200), rho);
      var g = S.cloud(root, pts, { x: 10 + k * 295, y: 4, w: 275, h: 236 }, { x0: -3.2, x1: 3.2, y0: -3.2, y1: 3.2, r: 3.5, mono: true });
      label(g, 147 + k * 295, 274, 'ρ = ' + it(rho, rho ? 1 : 0), 's07-label', { 'font-weight': 700 });
      boxes.push(g);
    });
    tl.from(boxes, { opacity: 0, duration: .4, stagger: .15 }).addLabel('s0');
  });

  // L2-21 · Y = X²: la tabella, i tre punti, i contributi che si annullano.
  PSI.scene('ic-x2', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var s1 = q.one('.x2-s1'), s3 = q.one('.x2-s3'), cell = q.one('.x2-cell');
    var X = S.scale(-1.5, 1.5, 70, 460), Y = S.scale(-.35, 1.35, 400, 30);
    line(root, 50, Y(0), 470, Y(0), C.axis, 2);
    line(root, X(0), 410, X(0), 20, C.axis, 1.5, { opacity: .5 });
    [-1, 0, 1].forEach(function (v) { label(root, X(v), 432, String(v).replace('-', '−'), 's07-tick'); });
    label(root, 466, Y(0) - 12, 'X', 's07-small', { 'text-anchor': 'end' });
    label(root, 50, Y(1) + 8, '1', 's07-tick', { 'text-anchor': 'end' });
    var my = 2 / 3;
    var means = svg('g', { opacity: 0 }, root);
    line(means, 50, Y(my), 470, Y(my), C.text, 2.5, { 'stroke-dasharray': '9 7' });
    label(means, 466, Y(my) - 12, 'μY = 2/3', 's07-small', { 'text-anchor': 'end' });
    label(means, X(0) + 10, 400, 'μX = 0', 's07-small', { 'text-anchor': 'start' });
    var contrib = svg('g', { opacity: 0 }, root);
    svg('rect', { x: X(0), y: Y(1), width: X(1) - X(0), height: Y(my) - Y(1), fill: C.data, opacity: .4 }, contrib);
    svg('rect', { x: X(-1), y: Y(1), width: X(0) - X(-1), height: Y(my) - Y(1), fill: C.model, opacity: .4 }, contrib);
    label(contrib, X(.5), Y(1) - 14, '+1/3', 's07-label s07-data');
    label(contrib, X(-.5), Y(1) - 14, '−1/3', 's07-label s07-model');
    label(contrib, X(0) + 30, Y(0) + 34, '0', 's07-label', { 'text-anchor': 'start' });
    var dots = svg('g', { opacity: 0 }, root);
    [[-1, 1], [0, 0], [1, 1]].forEach(function (p) { svg('circle', { cx: X(p[0]), cy: Y(p[1]), r: 11, fill: C.text }, dots); });
    var sum = label(root, X(.72), 262, 'somma: 0', 's07-big s07-ok', { opacity: 0 });
    gsap.set([s1, s3], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(s1, { opacity: 1, duration: .4 }).to(cell, { backgroundColor: 'rgba(255,107,107,.25)', color: C.red, duration: .4 }, '<').addLabel('s1');
    tl.to(dots, { opacity: 1, duration: .4 }).to(means, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(contrib, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(sum, { opacity: 1, duration: .3 }).to(s3, { opacity: 1, duration: .4 }, '<').addLabel('s4');
  });

  // L2-23 · una U e una campana: legami forti, correlazione circa zero.
  PSI.scene('ic-forme', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var r = PSI.random(2027), base = S.normals(77, 200), U = [], B = [];
    base.forEach(function (z) {
      var x = 2 * r() - 1;
      U.push([x, x * x + .05 * z[0]]);
      B.push([x, Math.exp(-6 * x * x) + .05 * z[1]]);
    });
    var gU = S.cloud(root, U, { x: 20, y: 6, w: 550, h: 300 }, { r: 4.5 });
    var gB = S.cloud(root, B, { x: 610, y: 6, w: 550, h: 300 }, { r: 4.5 });
    label(gU, 295, 346, 'forma a U · r = ' + it(gU.stats.r, 2), 's07-label', { 'font-weight': 700 });
    label(gB, 885, 346, 'forma a campana · r = ' + it(gB.stats.r, 2), 's07-label', { 'font-weight': 700 });
    tl.from([gU, gB], { opacity: 0, duration: .5, stagger: .2 }).addLabel('s0');
  });

  // L2-24 · lo schema del confondente.
  PSI.scene('ca-todo', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var arrow = S.arrowMarker(root, 'ct-arrow', C.third);
    function node(x, y, w, t1, t2, color) {
      var g = svg('g', {}, root);
      svg('rect', { x: x - w / 2, y: y - 40, width: w, height: 80, rx: 14, fill: '#ffffff08', stroke: color, 'stroke-width': 3 }, g);
      label(g, x, y - 6, t1, 's07-label', { fill: color, 'font-weight': 700 });
      label(g, x, y + 24, t2, 's07-small');
      return g;
    }
    var z = node(250, 56, 330, 'Z', 'dimensione del modulo', C.third);
    var x = node(100, 280, 190, 'X', 'commenti TODO', C.data);
    var y = node(400, 280, 190, 'Y', 'bug segnalati', C.model);
    var a1 = line(root, 210, 98, 130, 234, C.third, 4, { 'marker-end': arrow });
    var a2 = line(root, 290, 98, 370, 234, C.third, 4, { 'marker-end': arrow });
    var corr = svg('g', {}, root);
    line(corr, 196, 280, 304, 280, C.red, 4, { 'stroke-dasharray': '10 8' });
    label(corr, 250, 330, 'r ≈ 0,6', 's07-label s07-red');
    tl.from([z, x, y], { opacity: 0, duration: .4, stagger: .1 }).from([a1, a2, corr], { opacity: 0, duration: .4 }).addLabel('s0');
  });

  // L2-16 · widget: la nuvola e il suo ρ.
  function widget() {
    var box = document.getElementById('wn-box');
    if (!box) return;
    var root = box.querySelector('.scene-svg'), out = box.querySelector('.wd-out');
    var rho = box.querySelector('[data-k="rho"]'), k = box.querySelector('[data-k="k"]'), u = box.querySelector('[data-k="u"]');
    var base = S.normals(2024, 200);
    var W = 1000, H = 400, PADL = 80, PADB = 40;
    function render() {
      var r = +rho.value, kk = +k.value, pts;
      box.querySelector('[data-v="rho"]').textContent = it(r, 2);
      if (u.checked) pts = base.map(function (z) { var x = Math.max(-2.6, Math.min(2.6, z[0])); return [x, x * x - 1 + .3 * z[1]]; });
      else pts = S.correlated(base, r);
      rho.disabled = u.checked;
      var st = S.stats(pts), sc = pts.map(function (p) { return [p[0], p[1] * kk]; }), stk = S.stats(sc);
      while (root.firstChild) root.removeChild(root.firstChild);
      var ys = pts.map(function (p) { return p[1]; });
      var y0 = Math.min.apply(null, ys) - .3, y1 = Math.max.apply(null, ys) + .3;
      var X = S.scale(-3.2, 3.2, PADL, W - 20), Y = S.scale(y0, y1, H - PADB, 10);
      line(root, PADL, H - PADB, W - 20, H - PADB, C.axis, 2);
      line(root, PADL, H - PADB, PADL, 10, C.axis, 2);
      [-2, 0, 2].forEach(function (v) { label(root, X(v), H - 10, String(v).replace('-', '−'), 's07-tick'); });
      // Tacche intere sui valori della nuvola; le etichette mostrano l'unità scelta.
      var step = y1 - y0 > 7 ? 2 : 1;
      for (var v = Math.ceil(y0 / step) * step; v <= y1; v += step) {
        line(root, PADL - 6, Y(v), PADL, Y(v), C.axis, 2);
        label(root, PADL - 10, Y(v) + 8, String(v * kk).replace('-', '−'), 's07-tick', { 'text-anchor': 'end' });
      }
      line(root, X(st.mx), 10, X(st.mx), H - PADB, C.text, 2, { 'stroke-dasharray': '8 6', opacity: .7 });
      line(root, PADL, Y(st.my), W - 20, Y(st.my), C.text, 2, { 'stroke-dasharray': '8 6', opacity: .7 });
      var blue = 0;
      pts.forEach(function (p) {
        var pos = (p[0] - st.mx) * (p[1] - st.my) > 0;
        if (pos) blue++;
        svg('circle', { cx: X(p[0]).toFixed(1), cy: Y(p[1]).toFixed(1), r: 5, fill: pos ? C.data : C.model, opacity: .85 }, root);
      });
      out.innerHTML = 'r dei punti = <b>' + it(st.r, 2) + '</b><span class="sep">·</span>Cov = <b>' + it(stk.cov, kk === 1 ? 2 : (kk === 10 ? 1 : 0)) +
        '</b><span class="sep">·</span>azzurri: <b>' + Math.round(100 * blue / pts.length) + '%</b>';
    }
    [rho, k, u].forEach(function (e) { e.addEventListener('input', render); e.addEventListener('change', render); });
    render();
  }

  return { widget: widget };
})();
