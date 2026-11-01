/*
 * Settimana 7, Lezione 1: Galton (la tavola di chiodi, le altezze che non
 * esplodono, la tabella del 1886), la distribuzione congiunta e le marginali
 * dal pacco «11. Inferenza Bayesiana» (pp. 23–44), l'indipendenza dal
 * notebook 4.3. Utilità in comuni.js.
 */
window.S07L1 = (function () {
  'use strict';
  var svg = PSI.svg, S = S07, C = S.C, label = S.label, line = S.line, it = S.it;

  // L1-01 · lavagna del riepilogo: la campana delle altezze e i due righelli.
  PSI.scene('riepilogo-s6', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X = S.scale(135, 205, 20, 340);
    function f(x) { var z = (x - 170) / 10; return 140 - 110 * Math.exp(-z * z / 2); }
    var d = '', a = 'M' + X(160) + ' 140';
    for (var x = 135; x <= 205; x += 1) d += (x === 135 ? 'M' : 'L') + X(x).toFixed(1) + ' ' + f(x).toFixed(1);
    for (x = 160; x <= 180; x += 1) a += ' L' + X(x).toFixed(1) + ' ' + f(x).toFixed(1);
    a += ' L' + X(180) + ' 140 Z';
    var area = svg('path', { d: a, fill: C.data, opacity: .3 }, root);
    var curve = svg('path', { d: d, fill: 'none', stroke: C.model, 'stroke-width': 3.5 }, root);
    var rul = svg('g', {}, root);
    line(rul, 20, 140, 340, 140, C.axis, 2);
    [[150, '150'], [160, '160'], [170, '170'], [180, '180'], [190, '190']].forEach(function (t) {
      line(rul, X(t[0]), 140, X(t[0]), 147, C.axis, 2);
      label(rul, X(t[0]), 168, t[1], 's07-tick');
    });
    line(rul, 20, 186, 340, 186, C.ok, 2);
    [[150, '−2'], [160, '−1'], [170, '0'], [180, '1'], [190, '2']].forEach(function (t) {
      line(rul, X(t[0]), 186, X(t[0]), 193, C.ok, 2);
      label(rul, X(t[0]), 214, t[1], 's07-tick s07-ok');
    });
    gsap.set([area, rul], { opacity: 0 });
    PSI.draw(tl, curve, 420, { duration: .8 });
    tl.to(area, { opacity: .3, duration: .4 }).to(rul, { opacity: 1, duration: .4 }, '<').addLabel('s0');
  });

  // L1-02 · la tavola di Galton: un pallino, poi 512, poi la campana.
  PSI.scene('quincunx', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), quote = q.one('.qx-quote');
    var CX = 410, DX = 56, TOP = 70, DY = 28, ROWS = 8, BASE = 425, BIN = 300, NB = 512;
    function pegX(r, k) { return CX + (k - r / 2) * DX; }
    function binX(k) { return CX + (k - 4) * DX; }
    // Imbuto.
    var funnel = svg('path', { d: 'M' + (CX - 120) + ' 8 L' + (CX - 14) + ' 44 L' + (CX + 14) + ' 44 L' + (CX + 120) + ' 8',
      fill: 'none', stroke: C.muted, 'stroke-width': 3 }, root);
    var pegs = svg('g', {}, root);
    for (var r = 0; r < ROWS; r++) for (var k = 0; k <= r; k++) {
      svg('circle', { cx: pegX(r, k), cy: TOP + r * DY, r: 5.5, fill: C.text }, pegs);
    }
    var bins = svg('g', {}, root);
    for (k = 0; k <= 9; k++) line(bins, CX + (k - 4.5) * DX, BIN, CX + (k - 4.5) * DX, BASE, C.axis, 2);
    line(bins, CX - 4.5 * DX, BASE, CX + 4.5 * DX, BASE, C.axis, 2.5);
    var bars = [];
    for (k = 0; k <= 8; k++) bars.push(svg('rect', { x: binX(k) - DX / 2 + 5, y: BASE, width: DX - 10, height: 0, fill: C.data, opacity: .85 }, root));

    // 512 pallini con seme fisso: per ognuno il numero di rimbalzi a destra.
    var rnd = PSI.random(1889), falls = [];
    for (var b = 0; b < NB; b++) { var s = 0; for (r = 0; r < ROWS; r++) if (rnd() < .5) s++; falls.push(s); }
    var KY = 0.85;
    var st = { n: 0 };
    function render() {
      var cnt = [0, 0, 0, 0, 0, 0, 0, 0, 0], n = Math.round(st.n);
      for (var i = 0; i < n; i++) cnt[falls[i]]++;
      bars.forEach(function (bar, j) { bar.setAttribute('y', BASE - cnt[j] * KY); bar.setAttribute('height', cnt[j] * KY); });
      counter.textContent = n ? n + ' pallini' : '';
    }
    var counter = label(root, 815, 40, '', 's07-label', { 'text-anchor': 'end' });

    // Un pallino: la sua strada tra i chiodi (seme fisso).
    var path = [[CX, 30]], rr = PSI.random(7), right = 0;
    for (r = 0; r < ROWS; r++) {
      path.push([pegX(r, right), TOP + r * DY - 12]);
      if (rr() < .5) right++;
    }
    path.push([binX(right), BASE - 12]);
    var trail = svg('path', { d: path.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' '),
      fill: 'none', stroke: C.model, 'stroke-width': 3, 'stroke-dasharray': '6 6', opacity: 0 }, root);
    var ball = svg('circle', { cx: CX, cy: 30, r: 9, fill: C.model, opacity: 0 }, root);

    // La campana: 512 · densità di N(4, 2), un'unità per colonna.
    var bell = '';
    for (var t = -0.4; t <= 8.4; t += 0.1) {
      var y = NB * Math.exp(-(t - 4) * (t - 4) / 4) / Math.sqrt(4 * Math.PI);
      bell += (bell ? 'L' : 'M') + (CX + (t - 4) * DX).toFixed(1) + ' ' + (BASE - y * KY).toFixed(1);
    }
    var bellPath = svg('path', { d: bell, fill: 'none', stroke: C.model, 'stroke-width': 4, 'stroke-dasharray': '10 7', opacity: 0 }, root);
    var bl = svg('g', { opacity: 0 }, root);
    label(bl, 815, 300, 'distribuzione', 's07-small s07-model', { 'text-anchor': 'end' });
    label(bl, 815, 328, 'binomiale', 's07-small s07-model', { 'text-anchor': 'end' });
    label(bl, 815, 356, 'n = 8, p = 1/2', 's07-small s07-model', { 'text-anchor': 'end' });

    gsap.set([pegs, bins, quote], { opacity: 0 });
    tl.to(pegs, { opacity: 1, duration: .5 }).to(bins, { opacity: 1, duration: .4 }, '<.2');
    PSI.draw(tl, funnel, 300, { duration: .6 }, '<');
    tl.addLabel('s0');
    tl.to([ball, trail], { opacity: 1, duration: .2 });
    path.forEach(function (p, i) { if (i) tl.to(ball, { attr: { cx: p[0], cy: p[1] }, duration: .22, ease: 'power1.in' }); });
    tl.addLabel('s1');
    tl.to([ball, trail], { opacity: 0, duration: .3 });
    tl.to(st, { n: NB, duration: 2.6, ease: 'power1.inOut', onUpdate: render });
    tl.addLabel('s2');
    tl.to(bellPath, { opacity: 1, duration: .5 }).to(bl, { opacity: 1, duration: .4 }, '<');
    tl.addLabel('s3');
    tl.to(quote, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // L1-03 · le altezze che non esplodono (curve illustrative).
  PSI.scene('generazioni', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), quote = q.one('.gn-quote');
    var X = S.scale(120, 220, 60, 1120), BASE = 270;
    function bell(sigma) {
      var d = '';
      for (var x = 120; x <= 220; x += .5) {
        var z = (x - 170) / sigma;
        d += (d ? 'L' : 'M') + X(x).toFixed(1) + ' ' + (BASE - 210 * (7 / sigma) * Math.exp(-z * z / 2)).toFixed(1);
      }
      return d;
    }
    line(root, 50, BASE, 1130, BASE, C.axis, 2);
    [140, 150, 160, 170, 180, 190, 200].forEach(function (v) {
      line(root, X(v), BASE, X(v), BASE + 7, C.axis, 2);
      label(root, X(v), BASE + 32, v + ' cm', 's07-tick');
    });
    var g1 = svg('path', { d: bell(7), fill: 'none', stroke: C.data, 'stroke-width': 4.5 }, root);
    var l1 = label(root, X(170), BASE - 222, 'oggi', 's07-label s07-data');
    var g2 = svg('path', { d: bell(10), fill: 'none', stroke: C.model, 'stroke-width': 3.5, 'stroke-dasharray': '10 7', opacity: 0 }, root);
    var g3 = svg('path', { d: bell(14), fill: 'none', stroke: C.model, 'stroke-width': 3.5, 'stroke-dasharray': '10 7', opacity: 0 }, root);
    var hyp = svg('g', { opacity: 0 }, root);
    label(hyp, X(170), BASE - 248, 'se i figli ripetessero i genitori, più piccole variazioni…', 's07-label s07-model');
    label(hyp, X(206), BASE - 80, 'più giganti', 's07-small s07-model');
    label(hyp, X(134), BASE - 80, 'più persone minuscole', 's07-small s07-model');
    label(hyp, X(184), BASE - 128, '2ª gen.', 's07-tick s07-model');
    label(hyp, X(193), BASE - 66, '3ª gen.', 's07-tick s07-model');
    var real = svg('g', { opacity: 0 }, root);
    label(real, X(170), BASE - 248, 'i dati: la campana resta la stessa', 's07-label s07-ok', { 'font-weight': 700 });
    gsap.set(quote, { opacity: 0 });
    PSI.draw(tl, g1, 1200, { duration: .9 });
    tl.from(l1, { opacity: 0, duration: .3 }).addLabel('s0');
    tl.to(l1, { opacity: 0, duration: .2 }).to(hyp, { opacity: 1, duration: .4 })
      .to(g2, { opacity: 1, duration: .5 }).to(g3, { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to([g2, g3], { opacity: .15, duration: .5 }).to(hyp, { opacity: 0, duration: .3 }, '<')
      .to(real, { opacity: 1, duration: .4 }).to(g1, { attr: { 'stroke-width': 7 }, duration: .3, yoyo: true, repeat: 1 }).addLabel('s2');
    tl.to(quote, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L1-05 · la tabella di Galton: conteggi, la casella più piena, alti e bassi.
  PSI.scene('tabella-galton', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg'), G = S.GALTON;
    var X0 = 170, CW = 69, Y0 = 72, RH = 36, NR = G.gen.length, NC = G.fig.length;
    var ROWLAB = ['< 163', '164', '166', '169', '171', '174', '177', '179', '182', '184', '> 185'];
    var COLLAB = ['≤157', '158', '161', '163', '166', '168', '171', '173', '176', '178', '181', '183', '186', '≥187'];
    function ry(i) { return Y0 + (NR - 1 - i) * RH; }   // i genitori alti in alto
    label(root, X0 + NC * CW / 2, 22, 'figlio adulto (cm)', 's07-small');
    COLLAB.forEach(function (t, j) { label(root, X0 + j * CW + CW / 2, 60, t, 's07-tick'); });
    label(root, 10, 22, 'genitore medio (cm)', 's07-small', { 'text-anchor': 'start' });
    var rows = [];
    G.N.forEach(function (row, i) {
      var g = svg('g', {}, root);
      label(g, X0 - 14, ry(i) + 25, ROWLAB[i], 's07-tick', { 'text-anchor': 'end' });
      row.forEach(function (n, j) {
        svg('rect', { x: X0 + j * CW + 1, y: ry(i) + 1, width: CW - 2, height: RH - 2, rx: 4,
          fill: n ? C.data : '#ffffff', opacity: n ? .12 + .7 * n / 48 : .03 }, g);
        if (n) label(g, X0 + j * CW + CW / 2, ry(i) + 26, String(n), 's07-cell');
      });
      rows.push(g);
    });
    var bottom = ry(0) + RH;
    // La casella più piena: genitore 68,5 pollici, figlio 69,2 pollici.
    var best = svg('rect', { x: X0 + 8 * CW, y: ry(5), width: CW, height: RH, fill: 'none', stroke: C.ok, 'stroke-width': 4, rx: 4, opacity: 0 }, root);
    var bestL = label(root, X0 + NC * CW / 2, bottom + 40, '48 figli: genitore medio 174 cm, figlio 176 cm', 's07-label s07-ok', { opacity: 0 });
    // Righe dei genitori alti (dai 179 cm: 70,5 pollici in su) e bassi (fino a 166 cm).
    function box(i0, i1, color) {
      return svg('rect', { x: X0 - 4, y: ry(i1) - 2, width: NC * CW + 8, height: (i1 - i0 + 1) * RH + 4,
        fill: 'none', stroke: color, 'stroke-width': 4, rx: 8, opacity: 0 }, root);
    }
    var tallBox = box(7, 10, C.model), shortBox = box(0, 2, C.third);
    var tallL = label(root, X0 + NC * CW / 2, bottom + 40, 'genitori dai 179 cm in su: media 180,8 cm  →  figli: media 178,3 cm', 's07-label s07-model', { opacity: 0 });
    var shortL = label(root, X0 + NC * CW / 2, bottom + 80, 'genitori fino ai 166 cm: media 165,3 cm  →  figli: media 168,2 cm', 's07-label s07-third', { opacity: 0 });
    tl.from(rows, { opacity: 0, duration: .25, stagger: .07 }).addLabel('s0');
    tl.to([best, bestL], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to([best, bestL], { opacity: 0, duration: .3 }).to([tallBox, tallL], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to([shortBox, shortL], { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-09 · due dadi: la tabella 6 × 6.
  PSI.scene('cg-dadi', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var s1 = q.one('.dd-s1'), s2 = q.one('.dd-s2'), s3 = q.one('.dd-s3');
    var X0 = 86, CW = 86, Y0 = 76, RH = 70;
    label(root, X0 + 3 * CW, 24, 'X', 's07-big s07-data', { style: 'font-size:34px' });
    label(root, 22, Y0 + 3 * RH + 12, 'Y', 's07-big s07-model', { style: 'font-size:34px' });
    var grid = svg('g', {}, root), cells = [];
    for (var j = 0; j < 6; j++) label(grid, X0 + j * CW + CW / 2, 62, String(j + 1), 's07-label s07-data');
    for (var i = 0; i < 6; i++) label(grid, 62, Y0 + i * RH + RH / 2 + 9, String(i + 1), 's07-label s07-model');
    for (i = 0; i < 6; i++) for (j = 0; j < 6; j++) {
      svg('rect', { x: X0 + j * CW + 1, y: Y0 + i * RH + 1, width: CW - 2, height: RH - 2, rx: 5, fill: '#ffffff08', stroke: C.grid }, grid);
      cells.push(label(grid, X0 + j * CW + CW / 2, Y0 + i * RH + RH / 2 + 9, '1/36', 's07-cell', { opacity: 0 }));
    }
    var hl = svg('rect', { x: X0 + 3 * CW, y: Y0 + 2 * RH, width: CW, height: RH, rx: 6, fill: '#38ef7d30', stroke: C.ok, 'stroke-width': 4, opacity: 0 }, root);
    gsap.set([s1, s2, s3], { opacity: 0 });
    tl.from(grid, { opacity: 0, duration: .5 }).addLabel('s0');
    tl.to(cells, { opacity: 1, duration: .15, stagger: .025 }).to(s1, { opacity: 1, duration: .4 }, '<').addLabel('s1');
    tl.to(hl, { opacity: 1, duration: .4 }).to(s2, { opacity: 1, duration: .4 }, '<').addLabel('s2');
    tl.to(s3, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-12 · la colonna «in una relazione» attraversa la partizione degli anni.
  PSI.scene('mg-colonna', function (el) {
    var root = PSI.q(el).one('.scene-svg');
    var cuts = [10, 112, 212, 312, 412, 510], V = ['0,00', '0,06', '0,21', '0,11', '0,02'], Y = ['1°', '2°', '3°', '4°', 'oltre'];
    svg('rect', { x: 10, y: 36, width: 500, height: 124, rx: 10, fill: '#ffffff06', stroke: C.muted, 'stroke-width': 2 }, root);
    svg('path', { d: 'M24 98 C 60 64, 180 70, 260 76 S 460 64, 496 96 C 470 132, 330 126, 260 122 S 60 136, 24 98 Z',
      fill: C.data, opacity: .3, stroke: C.data, 'stroke-width': 2.5 }, root);
    for (var k = 1; k < 5; k++) line(root, cuts[k] - 8, 160, cuts[k] + 8, 36, C.text, 2.5);
    for (k = 0; k < 5; k++) {
      var cx = (cuts[k] + cuts[k + 1]) / 2;
      label(root, cx, 106, V[k], 's07-cell');
      label(root, cx, 190, Y[k], 's07-tick');
    }
    label(root, 260, 26, 'in una relazione', 's07-small s07-data');
  });

  // L1-25 (S) · il totale degli errori: diagonali e distribuzione di Z.
  PSI.scene('in-somma', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var P = [[.20, .20, .05, .05], [.20, .10, .10, .10]], PZ = [.20, .40, .15, .15, .10];
    var COL = ['#94a3b8', C.data, C.ok, C.third, C.model];
    var X0 = 130, CW = 110, Y0 = 110, RH = 100;
    label(root, X0 + 2 * CW, 40, 'errori nel secondo modulo', 's07-small');
    for (var j = 0; j < 4; j++) label(root, X0 + j * CW + CW / 2, 88, 'y = ' + j, 's07-label');
    for (var i = 0; i < 2; i++) label(root, X0 - 18, Y0 + i * RH + RH / 2 + 9, 'x = ' + i, 's07-label', { 'text-anchor': 'end' });
    var fills = [];
    for (i = 0; i < 2; i++) for (j = 0; j < 4; j++) {
      fills.push(svg('rect', { x: X0 + j * CW + 2, y: Y0 + i * RH + 2, width: CW - 4, height: RH - 4, rx: 8,
        fill: COL[i + j], opacity: 0 }, root));
      svg('rect', { x: X0 + j * CW + 2, y: Y0 + i * RH + 2, width: CW - 4, height: RH - 4, rx: 8, fill: 'none', stroke: C.grid }, root);
      label(root, X0 + j * CW + CW / 2, Y0 + i * RH + RH / 2 + 9, it(P[i][j], 2), 's07-label');
    }
    var zl = label(root, X0 + 2 * CW, Y0 + 2 * RH + 50, 'stesso colore = stesso totale x + y', 's07-small', { opacity: 0 });
    var BX = 690, BW = 80, BASE = 380, KY = 600;
    var bars = [], vals = [];
    line(root, BX - 20, BASE, BX + 5 * BW + 10, BASE, C.axis, 2);
    PZ.forEach(function (p, z) {
      bars.push(svg('rect', { x: BX + z * BW + 10, y: BASE, width: BW - 20, height: 0, fill: COL[z] }, root));
      label(root, BX + z * BW + BW / 2, BASE + 32, 'z = ' + z, 's07-tick');
      vals.push(label(root, BX + z * BW + BW / 2, BASE - p * KY - 12, it(p, 2), 's07-cell', { opacity: 0 }));
    });
    var title = label(root, BX + 2.5 * BW, 40, 'P(Z = z)', 's07-label', { opacity: 0 });
    var mean = svg('g', { opacity: 0 }, root);
    var mx = BX + 1.55 * BW + BW / 2;
    svg('path', { d: 'M' + mx + ' ' + (BASE + 4) + ' l-12 22 l24 0 z', fill: C.text }, mean);
    label(mean, mx + 80, 120, 'E[Z] = 1,55', 's07-label', { 'font-weight': 700 });
    line(mean, mx, BASE, mx, 130, C.text, 2, { 'stroke-dasharray': '6 6' });
    tl.addLabel('s0');
    tl.to(fills, { opacity: .45, duration: .5 }).to(zl, { opacity: 1, duration: .3 }, '<').addLabel('s1');
    tl.to(title, { opacity: 1, duration: .3 });
    PZ.forEach(function (p, z) { tl.to(bars[z], { attr: { y: BASE - p * KY, height: p * KY }, duration: .35 }, '<.1').to(vals[z], { opacity: 1, duration: .2 }, '<'); });
    tl.addLabel('s2');
    tl.to(mean, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-29 (S) · widget: stesse marginali, tabelle diverse.
  function widget() {
    var box = document.getElementById('wt-box');
    if (!box) return;
    var inp = {}, out = box.querySelector('.wt-out');
    box.querySelectorAll('input[data-k]').forEach(function (i) { inp[i.dataset.k] = i; });
    function cell(k, v) { box.querySelector('[data-cell="' + k + '"]').textContent = it(v, 2); }
    function render() {
      var p = +inp.p.value, q = +inp.q.value;
      var lo = Math.max(0, p + q - 1), hi = Math.min(p, q);
      inp.a.min = lo.toFixed(2); inp.a.max = hi.toFixed(2);
      var a = Math.min(Math.max(+inp.a.value, lo), hi);
      inp.a.value = a;
      box.querySelector('[data-v="p"]').textContent = it(p, 2);
      box.querySelector('[data-v="q"]').textContent = it(q, 2);
      box.querySelector('[data-v="a"]').textContent = it(a, 2);
      cell('00', 1 - p - q + a); cell('01', q - a); cell('10', p - a); cell('11', a);
      cell('x0', 1 - p); cell('x1', p); cell('y0', 1 - q); cell('y1', q);
      var d = a - p * q, verdict;
      if (Math.abs(d) < .005) verdict = '<b class="highlight">indipendenti</b>';
      else if (d > 0) verdict = 'tendono a valere 1 <b class="data">insieme</b>';
      else verdict = 'tendono a <b class="model">escludersi</b>';
      out.innerHTML = '<p>p·q = ' + it(p * q, 4) + '</p><p>a − p·q = <b>' + it(d, 4) + '</b></p><p>' + verdict + '</p>';
    }
    Object.keys(inp).forEach(function (k) { inp[k].addEventListener('input', render); });
    box.querySelectorAll('button[data-a]').forEach(function (btn) {
      btn.addEventListener('click', function () { inp.p.value = .4; inp.q.value = .5; inp.a.value = btn.dataset.a; render(); this.blur(); });
    });
    render();
  }

  return { widget: widget };
})();
