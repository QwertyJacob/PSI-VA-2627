/* Lezione 2: la varianza. I tre revisori, i due pagamenti (scarti e quadrati), tre PMF con la stessa media;
   revisori e tre PMF anche nella forma del pacco «7. Variabili aleatorie» (PSI 25/26). */
(function () {
  'use strict';
  var svg = PSI.svg, C = S05.C, label = S05.label, line = S05.line, it = S05.it;
  var bar = S05.bar, fulcrum = S05.fulcrum, grow = S05.grow;

  // V-02 · i tre revisori con il testo del pacco a fianco: voti da 18 a 30, voto meritato 24.
  PSI.scene('dv-revisori', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var BASE = 290, U = 360, DX = 14, TRUE = 24;
    // A triangolare su 18–30, B stretta su 24, C stretta su 21.
    var A = {}, k;
    for (k = 18; k <= 30; k++) A[k] = (7 - Math.abs(k - 24)) / 49;
    var revs = [
      { name: 'A', pmf: A, mean: 24 },
      { name: 'B', pmf: { 23: .2, 24: .6, 25: .2 }, mean: 24 },
      { name: 'C', pmf: { 20: .2, 21: .6, 22: .2 }, mean: 21 }
    ];
    var frame = svg('g', {}, root), bars = [], means = [];
    revs.forEach(function (r, i) {
      var px = 10 + i * 220, X = function (v) { return px + 22 + (v - 18) * DX; };
      line(frame, px, BASE, px + 212, BASE, C.axis, 2);
      [18, 24, 30].forEach(function (v) { label(frame, X(v), BASE + 52, String(v), 's05-tiny'); });
      label(frame, X(TRUE), 36, r.name, 's05-big');
      line(frame, X(TRUE), 52, X(TRUE), BASE, C.red, 3, { 'stroke-dasharray': '8 6' });
      if (!i) label(frame, X(TRUE) + 8, 76, 'voto meritato', 's05-tiny', { 'text-anchor': 'start', style: 'fill:' + C.red });
      var own = [];
      for (var v in r.pmf) own.push(bar(root, X(+v), BASE, r.pmf[v] * U, 10, C.data));
      bars.push(own);
      means.push([fulcrum(root, X(r.mean), BASE + 2),
        label(root, X(r.mean), BASE + 92, 'media ' + r.mean, 's05-small', { style: 'font-weight:700;fill:' + C.ok })]);
    });
    var txt = ['.dv-rv-q', '.dv-rv-c', '.dv-rv-a', '.dv-rv-b', '.dv-rv-end'].map(function (s) { return q.one(s); });
    gsap.set(txt.concat(means.flat()), { opacity: 0 });
    tl.from(frame, { opacity: 0, duration: .4 });
    bars.forEach(function (b) { grow(tl, b, BASE, '>'); });
    tl.addLabel('s0');
    tl.to(txt[0], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to([txt[1]].concat(means[2]), { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(txt[2], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to([txt[3]].concat(means[0], means[1]), { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to(txt[4], { opacity: 1, duration: .4 }).addLabel('s5');
  });

  // V-04 · pagamento certo A (sempre 5 €) e incerto B (0 o 10 €): media, scarti, quadrati.
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

  // V-05 · le tre PMF della V-08 senza numeri: prima della definizione, solo l'ordine della dispersione.
  PSI.scene('tre-pmf-ordine', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var BASE = 300, U = 360, DX = 52;
    var pmfs = [[.2, .2, .2, .2, .2], [.1, .2, .4, .2, .1], [0, .2, .6, .2, 0]];
    var words = ['più dispersa', 'intermedia', 'meno dispersa'], parts = [];
    pmfs.forEach(function (pm, i) {
      var px = 40 + i * 360, X = function (v) { return px + 36 + (v - 1) * DX; };
      var g = svg('g', {}, root);
      line(g, px, BASE, px + 280, BASE, C.axis, 2);
      var bars = [];
      pm.forEach(function (p, j) {
        label(g, X(j + 1), BASE + 56, String(j + 1), 's05-small');
        if (p) {
          bars.push(bar(root, X(j + 1), BASE, p * U, 30, C.data));
          label(g, X(j + 1), BASE - p * U - 10, it(p, 1), 's05-tiny');
        }
      });
      var f = fulcrum(root, X(3), BASE + 2);
      var w = label(root, X(3), BASE + 104, words[i], 's05-label', { style: 'font-weight:700;fill:' + C.model });
      parts.push({ g: g, bars: bars, f: f, w: w });
    });
    var all = function (k) { return parts.map(function (p) { return p[k]; }); };
    var gt = [360, 720].map(function (x) { return label(root, x, BASE + 108, '>', 's05-big', { style: 'fill:' + C.model }); });
    var moral = label(root, 550, BASE + 146, 'più massa lontano dal centro, più dispersione', 's05-small');
    gsap.set(all('f').concat(all('w'), gt, moral), { opacity: 0 });
    tl.from(all('g'), { opacity: 0, duration: .4 });
    parts.forEach(function (p, i) { grow(tl, p.bars, BASE, i ? '<.1' : '>'); });
    tl.addLabel('s0');
    tl.to(all('f'), { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to([parts[0].w, gt[0], parts[1].w, gt[1], parts[2].w], { opacity: 1, duration: .3, stagger: .2 }).addLabel('s2');
    tl.to(moral, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // V-08 · tre PMF su 1–5 con la stessa media 3: la varianza le ordina.
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

  // V-11 · tre PMF su 1–5 con valore atteso 3, nel formato dei grafici del pacco: riquadro e griglia da 0 a 0,6.
  PSI.scene('dv-tre-pmf', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var BASE = 262, U = 360, DX = 46;
    var pmfs = [[1 / 5, 1 / 5, 1 / 5, 1 / 5, 1 / 5], [1 / 9, 2 / 9, 3 / 9, 2 / 9, 1 / 9], [0, 2 / 9, 5 / 9, 2 / 9, 0]];
    var frames = [], bars = [], means = [];
    pmfs.forEach(function (pm, i) {
      var px = 30 + i * 360, X = function (v) { return px + 92 + (v - 1) * DX; };
      var g = svg('g', {}, root);
      svg('rect', { x: px, y: 8, width: 320, height: 322, rx: 6, fill: '#ffffff06', stroke: '#ffffff30', 'stroke-width': 2 }, g);
      [0, .2, .4, .6].forEach(function (t) {
        var y = BASE - t * U;
        line(g, px + 62, y, px + 300, y, t ? '#ffffff22' : C.axis, t ? 1.5 : 2);
        label(g, px + 52, y + 8, t ? it(t, 1) : '0', 's05-tiny', { 'text-anchor': 'end' });
      });
      pm.forEach(function (p, j) {
        label(g, X(j + 1), BASE + 52, String(j + 1), 's05-small');
        if (p) bars.push(bar(root, X(j + 1), BASE, p * U, 30, C.data));
      });
      means.push(fulcrum(root, X(3), BASE + 2), label(root, X(3) + 22, BASE + 26, 'μ = 3', 's05-small', { 'text-anchor': 'start', style: 'font-weight:700;fill:' + C.ok }));
      frames.push(g);
    });
    var txt = ['.dv-tp-1', '.dv-tp-2', '.dv-tp-3'].map(function (s) { return q.one(s); });
    gsap.set(txt.concat(means), { opacity: 0 });
    tl.from(frames, { opacity: 0, duration: .4 });
    grow(tl, bars, BASE, '>');
    tl.addLabel('s0');
    tl.to([txt[0]].concat(means), { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(txt[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(txt[2], { opacity: 1, duration: .4 }).addLabel('s3');
  });
})();
