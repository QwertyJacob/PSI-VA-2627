/* Lezione 1, prologo: la varianza. I tre revisori, i due pagamenti (scarti e quadrati), tre PMF con la stessa media. */
(function () {
  'use strict';
  var svg = PSI.svg, C = S05.C, label = S05.label, line = S05.line, it = S05.it;

  // Il fulcro: un triangolo con la punta sulla media, sotto l'asse.
  function fulcrum(root, x, y, color) {
    return svg('path', { d: 'M' + x + ' ' + y + ' l-15 25 h30 z', fill: color || C.ok }, root);
  }
  // Barre che crescono dalla base.
  function grow(tl, bars, base, pos) {
    bars.forEach(function (b, i) {
      tl.fromTo(b, { scaleY: 0, svgOrigin: b.cx + ' ' + base }, { scaleY: 1, duration: .45, ease: 'power2.out' }, i ? '<.03' : pos);
    });
  }
  function bar(root, cx, base, h, w, color) {
    var r = svg('rect', { x: cx - w / 2, y: base - h, width: w, height: h, rx: 3, fill: color }, root);
    r.cx = cx;
    return r;
  }

  // V-02 · tre revisori, voti da 18 a 30; A e B hanno la stessa media, C no.
  PSI.scene('revisori', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var BASE = 330, U = 330, DX = 22, TRUE = 24;
    // A: triangolare su 18–30 (pesi 1…7…1 su 49); B: stretto su 24; C: stretto su 21.
    var A = {}, k;
    for (k = 18; k <= 30; k++) A[k] = (7 - Math.abs(k - 24)) / 49;
    var revs = [
      { name: 'A', pmf: A, mean: 24 },
      { name: 'B', pmf: { 23: .2, 24: .6, 25: .2 }, mean: 24 },
      { name: 'C', pmf: { 20: .2, 21: .6, 22: .2 }, mean: 21 }
    ];
    var frame = svg('g', {}, root), parts = [];
    revs.forEach(function (r, i) {
      var px = 30 + i * 365, X = function (v) { return px + 26 + (v - 18) * DX; };
      line(frame, px, BASE, px + 318, BASE, C.axis, 2);
      [18, 24, 30].forEach(function (v) { label(frame, X(v), BASE + 58, String(v), 's05-small'); });
      label(frame, px + 159, 45, r.name, 's05-big');
      line(frame, X(TRUE), 75, X(TRUE), BASE, C.red, 3, { 'stroke-dasharray': '8 6' });
      if (!i) label(frame, X(TRUE) + 10, 95, 'voto meritato', 's05-small', { 'text-anchor': 'start', style: 'fill:' + C.red });
      var bars = [];
      for (var v in r.pmf) bars.push(bar(root, X(+v), BASE, r.pmf[v] * U, 16, C.data));
      var f = fulcrum(root, X(r.mean), BASE + 2);
      var m = label(root, X(r.mean), BASE + 100, 'media ' + r.mean, 's05-label', { style: 'font-weight:700;fill:' + C.ok });
      parts.push({ bars: bars, mean: [f, m] });
    });
    var cap = q.one('.rv-cap');
    gsap.set(parts.map(function (p) { return p.mean; }).flat(), { opacity: 0 });
    gsap.set(cap, { opacity: 0 });
    tl.from(frame, { opacity: 0, duration: .5 }).addLabel('s0');
    parts.forEach(function (p, i) { grow(tl, p.bars, BASE, '>'); tl.addLabel('s' + (i + 1)); });
    tl.to(parts.map(function (p) { return p.mean; }).flat(), { opacity: 1, duration: .5 }).addLabel('s4');
    tl.to(cap, { opacity: 1, duration: .4 }).addLabel('s5');
  });

  // V-03 · pagamento certo A (sempre 5 €) e incerto B (0 o 10 €): media, scarti, quadrati.
  PSI.scene('pagamenti', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), steps = q.all('.scene-steps li');
    var X = function (e) { return 85 + e * 50; }, YA = 125, YB = 400, H = 80;
    var head = S05.arrowMarker(root, 'pg-arrow', C.model);
    // Riga A
    var rowA = svg('g', {}, root);
    line(rowA, X(-.6), YA, X(10.6), YA, C.axis, 2);
    label(rowA, 30, YA - 20, 'A', 's05-big', { style: 'font-size:40px' });
    var barA = bar(rowA, X(5), YA, H, 26, C.data);
    label(rowA, X(5), YA - H - 10, '5 € sempre', 's05-small', { style: 'fill:' + C.data });
    var fA = fulcrum(root, X(5), YA + 2);
    // Riga B
    var rowB = svg('g', {}, root);
    line(rowB, X(-.6), YB, X(10.6), YB, C.axis, 2);
    label(rowB, 30, YB - 20, 'B', 's05-big', { style: 'font-size:40px' });
    var barsB = [bar(rowB, X(0), YB, H / 2, 26, C.data), bar(rowB, X(10), YB, H / 2, 26, C.data)];
    label(rowB, X(0), YB + 34, '0 €', 's05-small');
    label(rowB, X(10), YB + 34, '10 €', 's05-small');
    label(rowB, X(0) - 20, YB - 12, '½', 's05-small', { 'text-anchor': 'end' });
    label(rowB, X(10) + 20, YB - 12, '½', 's05-small', { 'text-anchor': 'start' });
    var fB = fulcrum(root, X(5), YB + 2);
    var mu = [label(root, X(5) + 26, YA + 28, 'μ = 5', 's05-label', { 'text-anchor': 'start', style: 'fill:' + C.ok }),
      label(root, X(5) + 26, YB + 28, 'μ = 5', 's05-label', { 'text-anchor': 'start', style: 'fill:' + C.ok })];
    // Scarti di B: frecce dalla media ai due valori.
    var YS = YB - 70;
    var arrows = [line(root, X(5), YS, X(0) + 6, YS, C.model, 4, { 'marker-end': head }), line(root, X(5), YS, X(10) - 6, YS, C.model, 4, { 'marker-end': head })];
    var dev = [label(root, X(2.5), YS - 14, '−5', 's05-label', { style: 'font-weight:700;fill:' + C.model }), label(root, X(7.5), YS - 14, '+5', 's05-label', { style: 'font-weight:700;fill:' + C.model })];
    var zero = label(root, X(5), 232, '(−5)·½ + (+5)·½ = 0', 's05-label', { style: 'font-weight:700;fill:' + C.red });
    // Quadrati di lato 5 € costruiti sugli scarti: area 25 ciascuno.
    var squares = [0, 5].map(function (e) {
      var g = svg('g', {}, root);
      svg('rect', { x: X(e), y: YS - 250, width: 250, height: 250, fill: '#fb923c1f', stroke: C.model, 'stroke-width': 3 }, g);
      label(g, X(e + 2.5), YS - 110, '25', 's05-huge', { style: 'font-size:84px;fill:' + C.model });
      label(g, X(e + 2.5), YS - 60, e ? '(+5)²' : '(−5)²', 's05-label', { style: 'fill:' + C.model });
      return g;
    });
    var result = label(root, X(5), 55, '25·½ + 25·½ = 25', 's05-label', { style: 'font-weight:700;font-size:30px;fill:' + C.ok });

    gsap.set([fA, fB].concat(mu, arrows, dev, zero, squares, result), { opacity: 0 });
    gsap.set(steps, { opacity: .2 });
    tl.from([rowA, rowB], { opacity: 0, y: 12, duration: .5, stagger: .2 }).addLabel('s0');
    tl.to([fA, fB].concat(mu), { opacity: 1, duration: .5 }).to(steps[0], { opacity: 1, duration: .3 }, '<').addLabel('s1');
    tl.to(arrows, { opacity: 1, duration: .1 });
    arrows.forEach(function (a, i) { PSI.draw(tl, a, 244, {}, i ? '<' : '>'); });
    tl.to(dev, { opacity: 1, duration: .3 }).to(steps[1], { opacity: 1, duration: .3 }, '<').addLabel('s2');
    tl.to(zero, { opacity: 1, duration: .4 })
      .to(dev[0], { x: 125, duration: .6, ease: 'power2.in' }, '<.2')
      .to(dev[1], { x: -125, duration: .6, ease: 'power2.in' }, '<')
      .to(dev, { opacity: 0, duration: .2 })
      .to(arrows, { opacity: .35, duration: .3 }, '<')
      .to(steps[2], { opacity: 1, duration: .3 }, '<').addLabel('s3');
    // I quadrati: la riga A e la cancellazione lasciano spazio.
    tl.to([rowA, fA, mu[0], zero], { opacity: 0, duration: .4 })
      .set(dev, { x: 0 })
      .to(arrows, { opacity: 1, duration: .2 })
      .to(dev, { opacity: 1, duration: .3 }, '<')
      .fromTo(squares, { opacity: 0, scale: 0, svgOrigin: X(5) + ' ' + YS }, { opacity: 1, scale: 1, duration: .7, ease: 'back.out(1.2)', stagger: .15 })
      .to(steps[3], { opacity: 1, duration: .3 }, '<').addLabel('s4');
    tl.to(result, { opacity: 1, duration: .5 }).to(steps[4], { opacity: 1, duration: .3 }, '<').addLabel('s5');
  });

  // V-06 · tre PMF su 1–5 con la stessa media 3: la varianza le ordina.
  PSI.scene('tre-pmf', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var BASE = 300, U = 360, DX = 52;
    var pmfs = [[.2, .2, .2, .2, .2], [.1, .2, .4, .2, .1], [0, .2, .6, .2, 0]];
    var cols = [C.data, C.data, C.data], parts = [];
    pmfs.forEach(function (pm, i) {
      var px = 40 + i * 360, X = function (v) { return px + 36 + (v - 1) * DX; };
      var g = svg('g', {}, root);
      line(g, px, BASE, px + 280, BASE, C.axis, 2);
      var bars = [];
      pm.forEach(function (p, j) {
        label(g, X(j + 1), BASE + 56, String(j + 1), 's05-small');
        if (p) {
          bars.push(bar(root, X(j + 1), BASE, p * U, 30, cols[i]));
          label(g, X(j + 1), BASE - p * U - 10, it(p, 1), 's05-tiny');
        }
      });
      var v = 0;
      pm.forEach(function (p, j) { v += Math.pow(j + 1 - 3, 2) * p; });
      var f = fulcrum(root, X(3), BASE + 2);
      var vr = label(root, X(3), BASE + 104, 'Var = ' + it(v, 1).replace(',0', ''), 's05-label', { style: 'font-weight:700;fill:' + C.model });
      var sd = label(root, X(3), BASE + 138, 'σ ≈ ' + it(Math.sqrt(v), 2), 's05-small');
      parts.push({ g: g, bars: bars, f: f, vr: vr, sd: sd });
    });
    var all = function (k) { return parts.map(function (p) { return p[k]; }); };
    gsap.set(all('f').concat(all('vr'), all('sd')), { opacity: 0 });
    tl.from(all('g'), { opacity: 0, duration: .4 });
    parts.forEach(function (p, i) { grow(tl, p.bars, BASE, i ? '<.1' : '>'); });
    tl.addLabel('s0');
    tl.to(all('f'), { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(all('vr'), { opacity: 1, duration: .4, stagger: .25 }).addLabel('s2');
    tl.to(all('sd'), { opacity: 1, duration: .4 }).addLabel('s3');
  });
})();
