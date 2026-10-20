/* Lezione 2: il registro di Bortkiewicz, n e p ignoti, i pezzetti e il numero e, la PMF di Poisson, il widget, l'uscita. */
(function () {
  'use strict';
  var svg = PSI.svg, C = S05.C, label = S05.label, line = S05.line, it = S05.it;

  // Bortkiewicz (1898), p. 24: morti per calcio di cavallo nei 10 corpi d'armata
  // comparabili, 1875–1894. Trascrizione del dataset «prussian» del pacchetto R pscl;
  // riproduce la tabella riassuntiva 109/65/22/3/1 e i 122 morti.
  var CORPI = ['II', 'III', 'IV', 'V', 'VII', 'VIII', 'IX', 'X', 'XIV', 'XV'];
  var MORTI = [
    [0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 0, 0, 2, 1, 1, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 1, 1, 2, 0, 2, 0, 0, 0, 1, 0, 1, 2, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 2, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 2, 0, 0, 2, 1, 0, 2, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 2, 1, 1, 0, 1, 2, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 2, 0, 2, 0, 0, 0, 0, 2, 1, 3, 0, 1, 1],
    [1, 1, 2, 1, 1, 3, 0, 4, 0, 1, 0, 3, 2, 1, 0, 2, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0]
  ];

  function poisson(k, lam) {
    var v = Math.exp(-lam);
    for (var j = 1; j <= k; j++) v *= lam / j;
    return v;
  }

  // L2-01 · la fila in miniatura, senza fattori: la scrive uno studente.
  (function () {
    var root = document.querySelector('#riepilogo-l1 .rq-fila');
    if (!root) return;
    [0, 1, 2].forEach(function (i) { S05.trial(root, 4 + i * 112, 4, 100, 58, i === 2, '', i === 2 ? 'sì' : 'no'); });
  })();

  // L2-02 · il registro: 10 corpi × 20 anni, riempito casella per casella; un puntino = un morto.
  PSI.scene('registro', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X0 = 62, Y0 = 44, CW = 38, CH = 32;
    [0, 5, 10, 15, 19].forEach(function (c) { label(root, X0 + c * CW + CW / 2, 28, String(1875 + c), 's05-tiny'); });
    var cells = [];
    CORPI.forEach(function (name, r) {
      PSI.text(root, X0 - 10, Y0 + r * CH + 22, name, 's05-tiny', { 'text-anchor': 'end' });
      MORTI[r].forEach(function (k, c) {
        var x = X0 + c * CW, y = Y0 + r * CH, g = svg('g', {}, root);
        g.box = svg('rect', { x: x + 1, y: y + 1, width: CW - 2, height: CH - 2, rx: 4, fill: '#ffffff05', stroke: '#ffffff1c', 'stroke-width': 1 }, g);
        g.dots = svg('g', { opacity: 0 }, g);
        for (var d = 0; d < k; d++) {
          svg('circle', { cx: x + CW / 2 + (d - (k - 1) / 2) * 8.5, cy: y + CH / 2, r: 3.6, fill: C.model }, g.dots);
        }
        g.k = k;
        cells.push(g);
      });
    });
    var count = label(root, X0 + 10 * CW, Y0 + 10 * CH + 22, '', 's05-small', { style: 'fill:' + C.text });
    var st = { n: 0 };
    function render() {
      var n = Math.round(st.n), m = 0;
      cells.forEach(function (g, i) {
        var on = i < n;
        g.box.setAttribute('fill', on ? (g.k ? '#fb923c1f' : '#38bdf814') : '#ffffff05');
        g.dots.setAttribute('opacity', on ? 1 : 0);
        if (on) m += g.k;
      });
      count.textContent = n ? n + ' corpi-anno · ' + m + ' morti' : '';
    }
    render();
    var book = q.one('.rg-book'), tot = q.one('.rg-tot'), mean = q.one('.rg-mean');
    gsap.set([book, tot, mean], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(book, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(st, { n: 200, duration: 3, ease: 'none', onUpdate: render }).addLabel('s2');
    tl.to(tot, { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(mean, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // L2-04 · Binomiale(n, p): n e p ignoti, noto solo np = 0,61.
  PSI.scene('np-ignoti', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var Y = 140, BIG = 'font:64px KaTeX_Main, serif;fill:' + C.text, IT = 'font:italic 64px KaTeX_Math, serif;fill:' + C.text;
    PSI.text(root, 455, Y, 'Binomiale(', '', { 'text-anchor': 'end', style: BIG });
    var nT = PSI.text(root, 490, Y, 'n', '', { 'text-anchor': 'middle', style: IT });
    PSI.text(root, 524, Y, ',', '', { 'text-anchor': 'middle', style: BIG });
    var pT = PSI.text(root, 570, Y, 'p', '', { 'text-anchor': 'middle', style: IT });
    PSI.text(root, 606, Y, ')', '', { 'text-anchor': 'middle', style: BIG });
    var a1 = svg('g', {}, root);
    line(a1, 485, 165, 330, 245, C.muted, 2);
    label(a1, 300, 280, 'migliaia di occasioni', 's05-label', { style: 'font-weight:700' });
    label(a1, 300, 312, 'quante? nessuno lo sa', 's05-small');
    var a2 = svg('g', {}, root);
    line(a2, 575, 165, 720, 245, C.muted, 2);
    label(a2, 760, 280, 'ognuna quasi impossibile', 's05-label', { style: 'font-weight:700' });
    label(a2, 760, 312, 'quanto vale? nessuno lo sa', 's05-small');
    var covers = [[490, nT], [570, pT]].map(function (c) {
      var g = svg('g', {}, root);
      svg('circle', { cx: c[0], cy: Y - 22, r: 36, fill: '#1c1c1c', stroke: C.model, 'stroke-width': 3 }, g);
      label(g, c[0], Y - 6, '?', 's05-big', { style: 'font-size:46px;fill:' + C.model });
      g.c = c[0];
      return g;
    });
    var np = svg('g', {}, root);
    svg('rect', { x: 760, y: 75, width: 290, height: 100, rx: 16, fill: '#fb923c14', stroke: C.model, 'stroke-width': 3 }, np);
    PSI.text(np, 905, Y, 'np = 0,61', '', { 'text-anchor': 'middle', style: 'font:italic 700 54px KaTeX_Main, serif;fill:' + C.model });
    var foot = q.one('.np-foot');
    gsap.set([a1, a2, np, foot], { opacity: 0 });
    gsap.set(covers, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(a1, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(a2, { opacity: 1, duration: .4 }).addLabel('s2');
    covers.forEach(function (g, i) {
      tl.fromTo(g, { opacity: 0, scale: .3, svgOrigin: g.c + ' ' + (Y - 22) }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, i ? '<.15' : '>');
    });
    tl.addLabel('s3');
    tl.to(np, { opacity: 1, duration: .5 }).addLabel('s4');
    tl.to(foot, { opacity: 1, duration: .4 }).addLabel('s5');
  });

  // L2-05 · la figura dei 10 pezzetti (statica).
  (function () {
    var root = document.querySelector('#esercizio-3 .scene-svg');
    if (!root) return;
    S05.pieces(root, 100, 14, 800, 60, 10, []);
    for (var i = 0; i < 10; i++) label(root, 140 + i * 80, 100, String(i + 1), 's05-tiny');
    label(root, 500, 138, 'un corpo-anno in n pezzetti · in ciascuno un morto con probabilità 0,61/n, oppure niente', 's05-small');
  })();

  // L2-06 · la barra si divide in 1, 2, 10, 100, 365 pezzetti; i punti salgono verso e^(−0,61).
  PSI.scene('pezzetti', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var NS = [1, 2, 10, 100, 365], BX = 140, BW = 860;
    function X(n) { return BX + BW * Math.log10(n) / 3; }
    function Y(v) { return 390 - (v - .36) / .22 * 280; }
    var bars = NS.map(function (n) {
      var g = S05.pieces(root, BX, 8, BW, 46, n, []);
      g.setAttribute('opacity', 0);
      return g;
    });
    var nLab = PSI.text(root, BX - 14, 40, '', 's05-label', { 'text-anchor': 'end', style: 'font-weight:700;fill:' + C.model });
    line(root, BX, 390, BX + BW, 390, C.axis, 2);
    line(root, BX, 390, BX, 100, C.axis, 2);
    [1, 2, 10, 100, 365, 1000].forEach(function (n) {
      line(root, X(n), 390, X(n), 398, C.axis, 2);
      label(root, X(n), 420, String(n), 's05-small');
    });
    [.4, .45, .5, .55].forEach(function (v) {
      line(root, BX - 8, Y(v), BX, Y(v), C.axis, 2);
      PSI.text(root, BX - 14, Y(v) + 6, it(v, 2), 's05-tiny', { 'text-anchor': 'end' });
    });
    PSI.text(root, BX + 12, 98, 'P(0 morti) = (1 − 0,61/n)ⁿ', 's05-small', { 'text-anchor': 'start' });
    PSI.text(root, BX + BW, 372, 'n pezzetti (scala logaritmica)', 's05-tiny', { 'text-anchor': 'end' });
    var lim = svg('g', {}, root), yl = Y(Math.exp(-.61));
    line(lim, BX, yl, BX + BW, yl, C.ok, 2.5, { 'stroke-dasharray': '10 7' });
    PSI.text(lim, BX + BW, yl - 22, 'e^(−0,61) ≈ 0,5434', 's05-label', { 'text-anchor': 'end', style: 'font-weight:700;fill:' + C.ok });
    var pts = NS.map(function (n) {
      var v = Math.pow(1 - .61 / n, n), g = svg('g', { opacity: 0 }, root);
      svg('circle', { cx: X(n), cy: Y(v), r: 9, fill: C.model }, g);
      label(g, X(n) + (n === 365 ? -8 : 0), Y(v) + 34, it(v, 4), 's05-small', { style: 'font-weight:700;fill:' + C.text });
      return g;
    });
    var formula = q.one('.pz-formula');
    gsap.set([lim, formula], { opacity: 0 });
    var st = { s: 0 };
    function render() {
      var s = Math.round(st.s);
      bars.forEach(function (b, i) { b.setAttribute('opacity', i === s - 1 ? 1 : 0); });
      pts.forEach(function (p, i) { p.setAttribute('opacity', i < s ? 1 : 0); });
      nLab.textContent = s ? 'n = ' + NS[s - 1] : '';
    }
    render();
    tl.addLabel('s0');
    for (var i = 1; i <= 5; i++) tl.to(st, { s: i, duration: .5, ease: 'none', onUpdate: render }).addLabel('s' + i);
    tl.to(lim, { opacity: 1, duration: .5 }).addLabel('s6');
    tl.to(formula, { opacity: 1, duration: .5 }).addLabel('s7');
  });

  // L2-11 · un solo pezzetto pieno scorre nelle 10 posizioni; poi la formula, la PMF e la scala ×λ/k.
  PSI.scene('un-evento', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var BX = 60, BW = 760, N = 10;
    S05.pieces(root, BX, 14, BW, 60, N, []);
    var trail = [];
    for (var i = 0; i < N; i++) trail.push(svg('circle', { cx: BX + BW * (i + .5) / N, cy: 44, r: 15, fill: C.model, opacity: 0 }, root));
    var dot = svg('circle', { cx: BX + BW * .5 / N, cy: 44, r: 17, fill: C.model }, root);
    var ways = PSI.text(root, BX + BW + 24, 54, 'n = 10 modi', '', { 'text-anchor': 'start', style: 'font:700 26px Inter, sans-serif;fill:' + C.model, opacity: 0 });
    label(root, BX + BW / 2, 108, 'un pezzetto pieno, gli altri n − 1 vuoti', 's05-small');
    var st = { pos: 0 };
    function render() {
      var p = Math.min(N - 1, Math.floor(st.pos));
      dot.setAttribute('cx', BX + BW * (p + .5) / N);
      trail.forEach(function (t, i) { t.setAttribute('opacity', i < p ? .28 : 0); });
    }
    render();
    var s2 = q.one('.ue-s2'), s3 = q.one('.ue-s3'), s4 = q.one('.ue-s4'), pmf = q.one('.ue-pmf');
    var tags = q.all('.ue-part > i'), ladder = q.all('.ue-ladder > span');
    gsap.set([s2, s3, s4, pmf], { opacity: 0 });
    gsap.set(tags, { opacity: 0 });
    gsap.set(ladder, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { pos: N - .001, duration: 2.6, ease: 'none', onUpdate: render }).to(ways, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(s2, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(s3, { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(s4, { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to(pmf, { opacity: 1, duration: .5 }).addLabel('s5');
    tl.to(tags, { opacity: 1, duration: .3, stagger: .2 }).addLabel('s6');
    tl.to(ladder, { opacity: 1, duration: .25, stagger: .18 }).addLabel('s7');
  });

  // L2-14 · widget: barre della Poisson per k = 0..15, baricentro in λ, Bortkiewicz tratteggiato.
  (function () {
    var box = document.getElementById('poi-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out'), input = box.querySelector('input');
    var X0 = 80, DX = 62, W = 40, BASE = 280, H = 260;
    function X(k) { return X0 + k * DX; }
    function Y(v) { return BASE - v * H; }
    line(root, X0 - 35, BASE, X(15) + 35, BASE, C.axis, 2);
    var rects = [], vals = [];
    for (var k = 0; k <= 15; k++) {
      rects.push(svg('rect', { x: X(k) - W / 2, y: BASE, width: W, height: 0, rx: 3, fill: C.model }, root));
      vals.push(label(root, X(k), BASE, '', 's05-tiny'));
      label(root, X(k), BASE + 26, String(k), 's05-small');
    }
    label(root, X(15) + 35, BASE + 72, 'k (numero di eventi)', 's05-tiny', { 'text-anchor': 'end' });
    var ref = [];
    for (k = 0; k <= 15; k++) ref.push((X(k) - W / 2) + ',' + Y(poisson(k, .61)) + ' ' + (X(k) + W / 2) + ',' + Y(poisson(k, .61)));
    svg('polyline', { points: ref.join(' '), fill: 'none', stroke: C.text, 'stroke-width': 2, 'stroke-dasharray': '5 4', opacity: .7 }, root);
    PSI.text(root, X(1) + W / 2 + 10, Y(poisson(1, .61)) - 8, 'Bortkiewicz, λ = 0,61', 's05-tiny', { 'text-anchor': 'start', style: 'fill:' + C.text });
    var fc = svg('path', { fill: C.ok }, root);
    var fl = label(root, 0, BASE + 60, '', 's05-label s05-ok', { 'text-anchor': 'start', style: 'font-weight:700' });
    function render(lam) {
      box.querySelector('[data-v="lam"]').textContent = it(lam, 2);
      rects.forEach(function (r, k) {
        var v = poisson(k, lam), h = v * H;
        r.setAttribute('y', BASE - h); r.setAttribute('height', h);
        vals[k].setAttribute('y', BASE - h - 6);
        vals[k].textContent = v >= .01 ? it(v, 2) : '';
      });
      var fx = X(Math.min(lam, 15));
      fc.setAttribute('d', 'M ' + fx + ' ' + (BASE + 32) + ' L ' + (fx - 13) + ' ' + (BASE + 52) + ' L ' + (fx + 13) + ' ' + (BASE + 52) + ' Z');
      fl.setAttribute('x', fx + 22);
      fl.textContent = 'λ = ' + it(lam, 2);
      var p0 = Math.exp(-lam);
      out.innerHTML = 'E[X] = Var(X) = <b>' + it(lam, 2) + '</b><span class="sep">·</span>P(X = 0) = e<sup>−λ</sup> = <b>' + it(p0, 4) +
        '</b><span class="sep">·</span>attesi con 0 su 200: <b>' + it(200 * p0, 1) + '</b>';
    }
    function set(lam) { input.value = lam; render(lam); }
    input.addEventListener('input', function () { render(+this.value); });
    box.querySelectorAll('[data-lam]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.lam); this.blur(); });
    });
    set(.61);
  })();

  // L2-16 · uscita: la fila della L1 e l'intervallo a pezzetti, affiancati.
  (function () {
    var root = document.querySelector('#uscita-2 .scene-svg');
    if (!root) return;
    label(root, 270, 34, 'Quanto aspetto il primo successo?', 's05-label', { style: 'font-weight:700' });
    [0, 1, 2, 3].forEach(function (i) { S05.trial(root, 40 + i * 118, 70, 104, 70, i === 3, 'prova ' + (i + 1), i === 3 ? 'riesce' : 'no'); });
    var head = S05.arrowMarker(root, 'ux-arrow', C.muted);
    line(root, 40, 175, 500, 175, C.muted, 2, { 'marker-end': head });
    label(root, 270, 205, 'si conta fino al primo successo', 's05-small');
    line(root, 550, 20, 550, 230, '#ffffff25', 2);
    label(root, 830, 34, 'Quanti eventi in un intervallo?', 's05-label', { style: 'font-weight:700' });
    S05.pieces(root, 600, 70, 460, 70, 10, [2, 7]);
    label(root, 830, 175, '2 eventi in questo intervallo', 's05-small', { style: 'fill:' + C.model });
    label(root, 830, 205, 'si conta in un intervallo fissato', 's05-small');
  })();
})();
