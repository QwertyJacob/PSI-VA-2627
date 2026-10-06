/* Lezione 2, prima parte: le 253 coppie, la somma di de Méré, l'Esercizio 1 (il complementare). */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', C = '#c084fc', G = '#38ef7d', RED = '#ff6b6b';
  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's03-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  function line(root, x1, y1, x2, y2, color, width, extra) {
    return svg('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, 'stroke-width': width || 3 }, extra), root);
  }
  function badge(g, x, y, value) {
    svg('circle', { cx: x, cy: y, r: 15, fill: '#c084fc33', stroke: C, 'stroke-width': 2 }, g);
    label(g, x, y + 6, value, 's03-small', { style: 'fill:' + C });
  }
  function cat(tl, img) {
    gsap.set(img, { scale: .2, rotation: -12, autoAlpha: 0 });
    return tl.to(img, { scale: 1, rotation: 0, autoAlpha: 1, duration: .7, ease: 'back.out(1.6)' });
  }

  // 23 persone su un cerchio, una corda per coppia: prima le 22 della persona 1, poi tutte.
  PSI.scene('coppie-253', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), steps = q.all('.scene-steps li');
    var n = 23, cx = 260, cy = 210, R = 185, pts = [];
    for (var i = 0; i < n; i++) {
      var t = -Math.PI / 2 + 2 * Math.PI * i / n;
      pts.push([cx + R * Math.cos(t), cy + R * Math.sin(t)]);
    }
    var chords = [], cg = svg('g', {}, root);
    for (var a = 0; a < n; a++) {
      for (var b = a + 1; b < n; b++) {
        chords.push(line(cg, pts[a][0], pts[a][1], pts[b][0], pts[b][1], a === 0 ? A : C, a === 0 ? 2.2 : 1.1, { opacity: 0 }));
      }
    }
    var dots = pts.map(function (p, i) {
      var g = svg('g', {}, root);
      svg('circle', { cx: p[0], cy: p[1], r: i === 0 ? 11 : 8, fill: i === 0 ? A : '#edf2f7' }, g);
      return g;
    });
    var one = label(root, pts[0][0], pts[0][1] - 20, '1', 's03-small', { style: 'fill:' + A });
    var count = label(root, 260, 455, '', 's03-label');
    var st = { k: 0 };
    function render() {
      var k = Math.round(st.k);
      chords.forEach(function (c, i) { c.setAttribute('opacity', i < k ? (i < 22 ? 1 : .55) : 0); });
      count.textContent = k ? k + (k === 1 ? ' coppia' : ' coppie') : '';
      count.setAttribute('class', 's03-label' + (k === 253 ? ' s03-green' : ''));
    }
    render();
    gsap.set(steps, { opacity: .25 });
    gsap.set([dots, one, q.one('.scene-def'), q.one('.c2-keep')], { opacity: 0 });
    tl.to(dots, { opacity: 1, duration: .25, stagger: .03 }).to(one, { opacity: 1, duration: .3 }).addLabel('s0');
    tl.to(steps[0], { opacity: 1, duration: .3 })
      .to(st, { k: 22, duration: 1.2, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(steps[1], { opacity: 1, duration: .3 })
      .to(st, { k: 253, duration: 2.6, ease: 'power1.in', onUpdate: render }).addLabel('s2');
    tl.to(steps[2], { opacity: 1, duration: .3 })
      .to(q.one('.scene-def'), { opacity: 1, duration: .5 })
      .to(q.one('.c2-keep'), { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // De Méré somma n · p: con 6 lanci la «certezza», con 7 più di 1.
  PSI.scene('de-mere-somma', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var left = svg('g', {}, root);
    label(left, 200, 96, 'un dado, 4 lanci', 's03-small');
    label(left, 200, 138, '4 · 1/6 = 2/3', 's03-math');
    label(left, 200, 196, 'due dadi, 24 lanci', 's03-small');
    label(left, 200, 238, '24 · 1/36 = 2/3', 's03-math');
    var same = label(left, 200, 292, '⇒ stessa probabilità', 's03-label');
    var strike = line(root, 85, 285, 315, 285, RED, 4);
    var why = [label(root, 200, 336, 'Un 6 al 1° lancio e un 6 al 2°', 's03-small s03-red'),
      label(root, 200, 362, 'possono capitare insieme: contati due volte', 's03-small s03-red')];
    // Il grafico: la stessa somma con n lanci, n · 1/6.
    var base = 350, unit = 240, X0 = 480, DX = 86, W = 60;
    var chart = svg('g', {}, root);
    label(chart, 740, 24, 'stessa regola con n lanci di un dado: n · 1/6', 's03-small');
    line(chart, 450, base, 1080, base, '#8292a8', 2);
    var top = line(root, 450, base - unit, 1080, base - unit, G, 2, { 'stroke-dasharray': '8 6' });
    var topLbl = label(root, 440, base - unit + 6, 'P = 1', 's03-small s03-green', { 'text-anchor': 'end' });
    var bars = [], vals = [];
    for (var n = 1; n <= 7; n++) {
      var x = X0 + (n - 1) * DX, h = unit * n / 6, bad = n === 7;
      bars.push(svg('rect', { x: x - W / 2, y: base, width: W, height: 0, rx: 4, fill: bad ? RED : n === 4 ? B : A }, root));
      vals.push(label(root, x, base - h - 12, n + '/6', 's03-label' + (bad ? ' s03-red' : ''), { opacity: 0 }));
      label(chart, x, base + 28, 'n = ' + n, 's03-tiny');
    }
    var six = label(root, X0 + 5 * DX - 40, base - unit - 14, '6 lanci: un 6 sicuro?', 's03-small', { 'text-anchor': 'end', opacity: 0 });
    var seven = svg('g', { opacity: 0 }, root);
    label(seven, X0 + 6 * DX + 42, base - unit + 40, '7/6 > 1:', 's03-label s03-red', { 'text-anchor': 'start' });
    label(seven, X0 + 6 * DX + 42, base - unit + 72, 'impossibile', 's03-label s03-red', { 'text-anchor': 'start' });
    gsap.set([chart, top, topLbl, same, strike, why, q.one('.l2-trick')], { opacity: 0 });
    gsap.set(left, { opacity: 0 });
    tl.to(left, { opacity: 1, duration: .5 }).to(same, { opacity: 1, duration: .4 }).addLabel('s0');
    tl.to([chart, top, topLbl], { opacity: 1, duration: .4 });
    bars.slice(0, 6).forEach(function (r, i) {
      var h = unit * (i + 1) / 6;
      tl.to(r, { attr: { y: base - h, height: h }, duration: .35 }, i ? '<.15' : '>').to(vals[i], { opacity: 1, duration: .2 }, '<.2');
    });
    tl.to(six, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(bars[6], { attr: { y: base - unit * 7 / 6, height: unit * 7 / 6 }, duration: .6 })
      .to([vals[6], seven], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(strike, { opacity: 1, duration: .3 }).to(same, { opacity: .3, duration: .3 }, '<')
      .to(why, { opacity: 1, duration: .4, stagger: .2 }).addLabel('s3');
    tl.to(q.one('.l2-trick'), { opacity: 1, duration: .6 }).addLabel('s4');
  });

  // Esercizio 1: il gatto, poi (a) e (b) col complementare, (c) n·p contro la curva vera, (d) 25 lanci.
  PSI.scene('l2-esercizio-1', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    var sa = svg('g', {}, root);
    badge(sa, 18, 24, 'a');
    label(sa, 150, 62, '1 − (5/6)⁴', 's03-label');
    label(sa, 150, 100, '= 1 − 625/1296 = 671/1296', 's03-small', { style: 'fill:#edf2f7' });
    label(sa, 150, 140, '≈ 0.518 > ½', 's03-label s03-green');
    var sb = svg('g', {}, root);
    badge(sb, 318, 24, 'b');
    label(sb, 455, 62, '1 − (35/36)²⁴', 's03-label');
    label(sb, 455, 100, 'nessun (6,6) in 24 lanci', 's03-small');
    label(sb, 455, 140, '≈ 0.491 < ½', 's03-label s03-b');
    // (c) il grafico per due dadi: n · 1/36 contro 1 − (35/36)^n.
    var sc = svg('g', {}, root);
    var X = function (n) { return 60 + n * 12.5; }, Y = function (v) { return 440 - 240 * v; };
    badge(sc, 18, 178, 'c');
    line(sc, X(0), Y(0), X(40), Y(0), '#8292a8', 2);
    line(sc, X(0), Y(0), X(0), Y(1.12), '#8292a8', 2);
    [0, 12, 24, 36].forEach(function (n) { label(sc, X(n), 464, String(n), 's03-tiny'); });
    label(sc, X(40), 464, 'lanci', 's03-tiny', { 'text-anchor': 'end' });
    line(sc, X(0), Y(.5), X(40), Y(.5), '#a0aec0', 1.5, { 'stroke-dasharray': '6 5' });
    label(sc, X(0) - 10, Y(.5) + 6, '½', 's03-small', { 'text-anchor': 'end' });
    line(sc, X(0), Y(1), X(40), Y(1), '#a0aec0', 1, { 'stroke-dasharray': '3 6' });
    label(sc, X(0) - 10, Y(1) + 6, '1', 's03-small', { 'text-anchor': 'end' });
    line(sc, X(0), Y(0), X(40), Y(40 / 36), RED, 3, { 'stroke-dasharray': '10 6' });
    var d = '';
    for (var n = 0; n <= 40; n++) d += (n ? ' L ' : 'M ') + X(n).toFixed(1) + ' ' + Y(1 - Math.pow(35 / 36, n)).toFixed(1);
    svg('path', { d: d, fill: 'none', stroke: G, 'stroke-width': 3.5 }, sc);
    label(sc, 78, 184, 'n · 1/36: oltre 1 dopo 36 lanci', 's03-small s03-red', { 'text-anchor': 'start' });
    label(sc, X(40), Y(.68) + 30, '1 − (35/36)ⁿ', 's03-small s03-green', { 'text-anchor': 'end' });
    // (d) la soglia: 24 lanci sotto ½, 25 sopra.
    var sd = svg('g', {}, root);
    line(sd, X(25), Y(1 - Math.pow(35 / 36, 25)), X(25), Y(0), G, 2, { 'stroke-dasharray': '4 4' });
    svg('circle', { cx: X(24), cy: Y(1 - Math.pow(35 / 36, 24)), r: 6, fill: B }, sd);
    svg('circle', { cx: X(25), cy: Y(1 - Math.pow(35 / 36, 25)), r: 6, fill: G }, sd);
    badge(sd, 400, 400, 'd');
    label(sd, 424, 407, '25 lanci → 0.506', 's03-small s03-green', { 'text-anchor': 'start' });
    var parts = [sa, sb, sc, sd];
    gsap.set(parts, { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 });
    parts.forEach(function (p, i) { tl.to(p, { opacity: 1, duration: .5 }).addLabel('s' + (i + 2)); });
  });
})();
