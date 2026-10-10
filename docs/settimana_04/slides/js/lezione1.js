/* Lezione 1: coppie e hash (riprese dal parcheggio S3), mappa esiti → valori, PMF, media, baricentro, dado. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', C = '#c084fc', G = '#38ef7d', RED = '#ff6b6b', MUTED = '#a0aec0';

  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's04-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
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
  // Il gatto degli esercizi entra con un rimbalzo.
  function cat(tl, img) {
    gsap.set(img, { scale: .2, rotation: -12, autoAlpha: 0 });
    return tl.to(img, { scale: 1, rotation: 0, autoAlpha: 1, duration: .7, ease: 'back.out(1.6)' });
  }
  // Una faccia di dado con i suoi puntini.
  var PIPS = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
  function die(parent, x, y, s, n, color) {
    var g = svg('g', {}, parent);
    svg('rect', { x: x, y: y, width: s, height: s, rx: s * .16, fill: '#ffffff10', stroke: color || '#edf2f7', 'stroke-width': 2.5 }, g);
    PIPS[n].forEach(function (p) {
      svg('circle', { cx: x + s * (.25 + .25 * p[0]), cy: y + s * (.25 + .25 * p[1]), r: s * .085, fill: color || '#edf2f7' }, g);
    });
    return g;
  }

  // L1-01 · 23 persone su un cerchio: 22 corde dalla prima, poi tutte le 253.
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
      return svg('circle', { cx: p[0], cy: p[1], r: i === 0 ? 11 : 8, fill: i === 0 ? A : '#edf2f7' }, root);
    });
    var one = label(root, pts[0][0], pts[0][1] - 20, '1', 's04-small', { style: 'fill:' + A });
    var count = label(root, 260, 455, '', 's04-label');
    var st = { k: 0 };
    function render() {
      var k = Math.round(st.k);
      chords.forEach(function (c, i) { c.setAttribute('opacity', i < k ? (i < 22 ? 1 : .55) : 0); });
      count.textContent = k ? k + (k === 1 ? ' coppia' : ' coppie') : '';
      count.setAttribute('class', 's04-label' + (k === 253 ? ' s04-green' : ''));
    }
    render();
    gsap.set(steps, { opacity: .25 });
    gsap.set([dots, one, q.one('.scene-def'), q.one('.keep-note')], { opacity: 0 });
    tl.to(dots, { opacity: 1, duration: .25, stagger: .03 }).to(one, { opacity: 1, duration: .3 }).addLabel('s0');
    tl.to(steps[0], { opacity: 1, duration: .3 })
      .to(st, { k: 22, duration: 1.2, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(steps[1], { opacity: 1, duration: .3 })
      .to(st, { k: 253, duration: 2.6, ease: 'power1.in', onUpdate: render }).addLabel('s2');
    tl.to(steps[2], { opacity: 1, duration: .3 })
      .to(q.one('.scene-def'), { opacity: 1, duration: .5 })
      .to(q.one('.keep-note'), { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-02 · quattro chiavi, la funzione h, cinque caselle: ada ed eva collidono.
  PSI.scene('hash', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var head = arrowMarker(root, 'hs-arrow', MUTED);
    label(root, 130, 24, 'chiavi', 's04-small');
    label(root, 560, 24, 'funzione hash', 's04-small');
    label(root, 975, 24, 'm = 5 caselle', 's04-small');
    var KEYS = [['bob', B, 0], ['ada', A, 2], ['leo', C, 4], ['eva', G, 2]];
    var SY = function (s) { return 60 + s * 58; };
    var slots = [];
    for (var s = 0; s < 5; s++) {
      slots.push(svg('rect', { x: 900, y: SY(s) - 24, width: 150, height: 48, rx: 8, fill: '#ffffff07', stroke: '#ffffff45', 'stroke-width': 2 }, root));
      label(root, 1072, SY(s) + 7, String(s), 's04-small', { 'text-anchor': 'start' });
    }
    svg('rect', { x: 490, y: 120, width: 140, height: 110, rx: 14, fill: '#c084fc1a', stroke: C, 'stroke-width': 3 }, root);
    label(root, 560, 192, 'h', 's04-big', { style: 'font-style:italic;fill:' + C });
    var paths = [], chips = [];
    KEYS.forEach(function (k, i) {
      var ky = 90 + i * 56, sl = k[2];
      svg('rect', { x: 80, y: ky - 22, width: 100, height: 44, rx: 8, fill: k[1] + '30', stroke: k[1], 'stroke-width': 2 }, root);
      label(root, 130, ky + 8, k[0], 's04-tag', { style: 'fill:' + k[1] });
      var x1 = 186, x2 = 486, y2 = 175, x3 = 634, x4 = 892, y4 = SY(sl);
      var p = svg('path', { d: 'M ' + x1 + ' ' + ky + ' L ' + x2 + ' ' + y2 + ' M ' + x3 + ' ' + y2 + ' L ' + x4 + ' ' + y4,
        fill: 'none', stroke: k[1], 'stroke-width': 2.5, 'marker-end': head, opacity: 0 }, root);
      p.len = Math.hypot(x2 - x1, y2 - ky) + Math.hypot(x4 - x3, y4 - y2);
      paths.push(p);
      var cx = k[0] === 'ada' ? 945 : k[0] === 'eva' ? 1005 : 975;
      chips.push(label(root, cx, SY(sl) + 8, k[0], 's04-tag', { style: 'fill:' + k[1], opacity: 0 }));
    });
    var boom = label(root, 790, SY(2) + 46, 'collisione!', 's04-label s04-red halo', { opacity: 0 });
    var cards = q.all('.hs-card');
    gsap.set(cards, { opacity: 0, y: 20 });
    tl.addLabel('s0');
    paths.forEach(function (p, i) {
      if (i) tl.to(paths[i - 1], { opacity: .25, duration: .2 });
      tl.set(p, { opacity: 1 });
      PSI.draw(tl, p, p.len, { duration: .6 });
      tl.to(chips[i], { opacity: 1, duration: .2 });
    });
    tl.to(slots[2], { attr: { fill: '#fbbf2440', stroke: B }, duration: .3 }).to(boom, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(cards, { opacity: 1, y: 0, duration: .5, stagger: .3 }).addLabel('s2');
  });

  // L1-03 · la mappa: TT → 2, CC → 0, poi TC e CT confluiscono in 1.
  PSI.scene('mappa', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var head = arrowMarker(root, 'mp-arrow', '#edf2f7');
    label(root, 200, 26, 'esiti  Ω', 's04-small');
    label(root, 700, 26, 'valori di X', 's04-small');
    var OUT = [['TT', 75, 2], ['TC', 140, 1], ['CT', 205, 1], ['CC', 270, 0]];
    var VY = { 2: 75, 1: 172, 0: 270 };
    OUT.forEach(function (o) {
      svg('rect', { x: 150, y: o[1] - 26, width: 100, height: 52, rx: 10, fill: '#ffffff0a', stroke: '#ffffff40', 'stroke-width': 2 }, root);
      label(root, 200, o[1] + 11, o[0], 's04-mono');
    });
    var vals = {};
    [2, 1, 0].forEach(function (v) {
      vals[v] = svg('circle', { cx: 700, cy: VY[v], r: 30, fill: '#38bdf833', stroke: A, 'stroke-width': 3 }, root);
      label(root, 700, VY[v] + 12, String(v), 's04-big', { style: 'fill:' + A + ';font-size:34px' });
    });
    var arrows = OUT.map(function (o) {
      var y2 = VY[o[2]];
      var p = svg('path', { d: 'M 262 ' + o[1] + ' L 660 ' + y2, fill: 'none', stroke: '#edf2f7', 'stroke-width': 3, 'marker-end': head, opacity: 0 }, root);
      p.len = Math.hypot(398, y2 - o[1]);
      return p;
    });
    var merge = label(root, 745, 180, 'stesso valore', 's04-small s04-green', { 'text-anchor': 'start', opacity: 0 });
    var def = q.one('.mp-def');
    gsap.set(def, { opacity: 0 });
    tl.addLabel('s0');
    [0, 3].forEach(function (i) { tl.set(arrows[i], { opacity: 1 }); PSI.draw(tl, arrows[i], arrows[i].len, { duration: .7 }, '<'); });
    tl.addLabel('s1');
    [1, 2].forEach(function (i) {
      tl.set(arrows[i], { opacity: 1, attr: { stroke: G } });
      PSI.draw(tl, arrows[i], arrows[i].len, { duration: .8 }, '<');
    });
    tl.to(vals[1], { attr: { fill: '#38ef7d33', stroke: G }, duration: .3 }).to(merge, { opacity: 1, duration: .3 }).addLabel('s2');
    tl.to(def, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L1-05 · i quattro esiti (peso 1/4) cadono sui valori: TC e CT si impilano su 1.
  PSI.scene('pesi', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var W = 130, H = 64, BASE = 340, VX = { 0: 300, 1: 500, 2: 700 };
    line(root, 200, BASE, 800, BASE, '#8292a8', 2);
    [0, 1, 2].forEach(function (v) { label(root, VX[v], BASE + 32, 'x = ' + v, 's04-label'); });
    label(root, 870, BASE + 32, 'valori', 's04-small');
    var OUT = [['TT', 2, 0], ['TC', 1, 0], ['CT', 1, 1], ['CC', 0, 0]];
    var tiles = OUT.map(function (o, i) {
      var g = svg('g', {}, root), x0 = 175 + i * 170, y0 = 20;
      g.box = svg('rect', { x: x0, y: y0, width: W, height: H, rx: 8, fill: '#38bdf826', stroke: A, 'stroke-width': 2 }, g);
      label(g, x0 + W / 2, y0 + 30, o[0], 's04-tag', { style: 'fill:#edf2f7' });
      label(g, x0 + W / 2, y0 + 54, '1/4', 's04-small');
      g.dx = VX[o[1]] - W / 2 - x0;
      g.dy = BASE - (o[2] + 1) * H - y0;
      return g;
    });
    var brace = svg('rect', { x: 333, y: 10, width: 324, height: 84, rx: 14, fill: 'none', stroke: G, 'stroke-width': 3, 'stroke-dasharray': '8 6', opacity: 0 }, root);
    var ev = label(root, 495, 130, 'X = 1  ↔  {TC, CT}', 's04-label s04-green', { opacity: 0 });
    var w = [
      label(root, VX[0], BASE - H - 14, '1/4', 's04-label s04-b', { opacity: 0 }),
      label(root, VX[1], BASE - 2 * H - 14, '1/4 + 1/4 = 1/2', 's04-label s04-green', { opacity: 0 }),
      label(root, VX[2], BASE - H - 14, '1/4', 's04-label s04-b', { opacity: 0 })
    ];
    var boxes = q.all('.pm-box');
    gsap.set(boxes, { opacity: 0 });
    tl.addLabel('s0');
    tl.to([tiles[1].box, tiles[2].box], { attr: { stroke: G, fill: '#38ef7d26' }, duration: .4 })
      .to(brace, { opacity: 1, duration: .3 }).to(ev, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to([brace, ev], { opacity: 0, duration: .3 });
    tiles.forEach(function (g, i) { tl.to(g, { x: g.dx, y: g.dy, duration: .7, ease: 'power2.inOut' }, i ? '<.15' : '>'); });
    tl.to(w, { opacity: 1, duration: .4, stagger: .15 }).addLabel('s2');
    tl.to(boxes[0], { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to([tiles[0].box, tiles[1].box, tiles[2].box], { attr: { stroke: C, fill: '#c084fc33' }, duration: .4 })
      .to(boxes[1], { opacity: 1, duration: .5 }, '<').addLabel('s4');
  });

  // L1-07 · Esercizio 1: il gatto, poi esiti/valori su due righe, poi la PMF.
  PSI.scene('esercizio-1', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    var rows = svg('g', {}, root);
    label(rows, 70, 90, 'esito', 's04-small', { 'text-anchor': 'start' });
    label(rows, 70, 160, 'X', 's04-small', { 'text-anchor': 'start' });
    ['TT', 'TC', 'CT', 'CC'].forEach(function (o, i) {
      var x = 210 + i * 100, v = [2, 1, 1, 0][i];
      label(rows, x, 90, o, 's04-mono');
      label(rows, x, 162, String(v), 's04-big', { style: 'font-size:38px;fill:' + (v === 1 ? G : A) });
    });
    label(rows, 300, 210, 'X = 1: due esiti, TC e CT', 's04-small s04-green');
    var pmf = svg('g', {}, root);
    var BASE = 440, X0 = 190;
    line(pmf, 120, BASE, 520, BASE, '#8292a8', 2);
    [[0, .25], [1, .5], [2, .25]].forEach(function (d) {
      var x = X0 + d[0] * 110, h = d[1] * 360;
      svg('rect', { x: x - 34, y: BASE - h, width: 68, height: h, rx: 4, fill: d[0] === 1 ? G : A }, pmf);
      label(pmf, x, BASE - h - 10, d[1] === .5 ? '1/2' : '1/4', 's04-label');
      label(pmf, x, BASE + 26, String(d[0]), 's04-small');
    });
    label(pmf, 525, 330, 'non 1/3', 's04-label s04-red');
    label(pmf, 525, 360, 'ciascuno', 's04-small s04-red');
    gsap.set([rows, pmf], { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 }).to(rows, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(pmf, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L1-09 · media semplice barrata, lista ideale 0 0 0 8, raccolta dei pesi, definizione.
  PSI.scene('media', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var c1 = svg('g', {}, root);
    label(c1, 180, 40, 'media semplice', 's04-small');
    label(c1, 180, 150, '(0 + 8) / 2 = 4', 's04-math');
    var strike = line(c1, 70, 140, 290, 140, RED, 4);
    label(c1, 180, 210, '0 e 8 non pesano uguale', 's04-small s04-red');
    var c2 = svg('g', {}, root);
    label(c2, 550, 40, 'lista ideale: 4 biglietti', 's04-small');
    [0, 0, 0, 8].forEach(function (v, i) {
      var x = 430 + i * 64;
      svg('rect', { x: x, y: 70, width: 52, height: 72, rx: 8, fill: v ? '#fbbf2433' : '#38bdf826', stroke: v ? B : A, 'stroke-width': 2 }, c2);
      label(c2, x + 26, 118, String(v), 's04-big', { style: 'font-size:32px;fill:' + (v ? B : A) });
    });
    label(c2, 550, 190, '(0 + 0 + 0 + 8) / 4 = 2', 's04-math');
    var c3 = svg('g', {}, root);
    label(c3, 920, 40, 'raccogli gli zeri', 's04-small');
    label(c3, 920, 130, '0 · 3/4 + 8 · 1/4', 's04-math');
    label(c3, 920, 190, '= 2 euro', 's04-big s04-green', { style: 'font-size:40px' });
    label(c3, 920, 240, 'valore × peso', 's04-small');
    var def = q.one('.md-def'), coin = q.one('.md-coin');
    gsap.set([c1, c2, c3, def, coin], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(c1, { opacity: 1, duration: .4 });
    PSI.draw(tl, strike, 220, { duration: .5 });
    tl.addLabel('s1');
    tl.to(c2, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(c3, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(def, { opacity: 1, duration: .5 }).to(coin, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // L1-11 · widget del baricentro: massa 1 − p in 0, massa p sul premio, fulcro nella media.
  (function () {
    var box = document.getElementById('bc-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out');
    var inputs = {}, st = {};
    box.querySelectorAll('input').forEach(function (i) { inputs[i.dataset.k] = i; });
    var X0 = 100, U = 75, BEAM = 210;
    function X(v) { return X0 + v * U; }
    line(root, X(0) - 20, BEAM, X(12) + 20, BEAM, '#edf2f7', 5);
    for (var v = 0; v <= 12; v++) {
      line(root, X(v), BEAM + 6, X(v), BEAM + 16, '#8292a8', 2);
      label(root, X(v), BEAM + 42, String(v), 's04-small');
    }
    label(root, X(12) + 10, BEAM + 72, 'euro', 's04-tiny', { 'text-anchor': 'end' });
    var m0 = svg('circle', { cx: X(0), r: 10, fill: A }, root);
    var m1 = svg('circle', { r: 10, fill: B }, root);
    var t0 = label(root, X(0), 0, '', 's04-label', { style: 'font-weight:700' });
    var t1 = label(root, 0, 0, '', 's04-label', { style: 'font-weight:700' });
    var fulcrum = svg('path', { fill: G }, root);
    var ft = label(root, 0, BEAM + 104, '', 's04-label s04-green');
    function render() {
      var p = st.p, w = st.w, e = p * w;
      box.querySelector('[data-v="p"]').textContent = p.toFixed(2);
      box.querySelector('[data-v="w"]').textContent = w + ' €';
      var r0 = 8 + 62 * Math.sqrt(1 - p), r1 = 8 + 62 * Math.sqrt(p);
      m0.setAttribute('r', r0); m0.setAttribute('cy', BEAM - 3 - r0);
      m1.setAttribute('r', r1); m1.setAttribute('cx', X(w)); m1.setAttribute('cy', BEAM - 3 - r1);
      t0.setAttribute('y', BEAM - 14 - 2 * r0); t0.textContent = (1 - p).toFixed(2);
      t1.setAttribute('x', X(w)); t1.setAttribute('y', BEAM - 14 - 2 * r1); t1.textContent = p.toFixed(2);
      var fx = X(e);
      fulcrum.setAttribute('d', 'M ' + fx + ' ' + (BEAM + 4) + ' L ' + (fx - 20) + ' ' + (BEAM + 34) + ' L ' + (fx + 20) + ' ' + (BEAM + 34) + ' Z');
      ft.setAttribute('x', fx); ft.textContent = 'E[X] = ' + e.toFixed(2);
      out.innerHTML = 'E[X] = 0 · ' + (1 - p).toFixed(2) + ' + ' + w + ' · ' + p.toFixed(2) + ' = <b>' + e.toFixed(2) + ' euro</b>';
    }
    function set(p, w) { st.p = p; st.w = w; inputs.p.value = p; inputs.w.value = w; render(); }
    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', function () { st[k] = +this.value; render(); });
    });
    box.querySelectorAll('[data-p]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.p, +b.dataset.w); this.blur(); });
    });
    set(.25, 8);
  })();

  // L1-12 · Esercizio 2: il gatto, la media 3,5, i sei guadagni netti.
  PSI.scene('esercizio-2', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    var S = 70, X0 = 25, DX = 95;
    for (var n = 1; n <= 6; n++) {
      die(root, X0 + (n - 1) * DX, 30, S, n);
      label(root, X0 + (n - 1) * DX + S / 2, 135, n + ' €', 's04-small');
    }
    var mean = svg('g', {}, root);
    label(mean, 300, 200, '(1 + 2 + 3 + 4 + 5 + 6) / 6 = 3,5 €', 's04-math');
    label(mean, 300, 240, 'nessuna faccia mostra 3,5', 's04-small s04-b');
    var gain = svg('g', {}, root);
    label(gain, 300, 300, 'guadagno netto = pagamento − 4', 's04-small');
    for (n = 1; n <= 6; n++) {
      var g = n - 4;
      label(gain, X0 + (n - 1) * DX + S / 2, 350, (g > 0 ? '+' : g < 0 ? '−' : '') + Math.abs(g), 's04-big',
        { style: 'font-size:34px;fill:' + (g < 0 ? RED : g > 0 ? G : '#edf2f7') });
    }
    label(gain, 300, 410, '(−3 − 2 − 1 + 0 + 1 + 2) / 6', 's04-math');
    label(gain, 300, 458, '= −0,5 € per partita', 's04-label s04-red', { style: 'font-weight:700' });
    gsap.set([mean, gain], { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 }).to(mean, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(gain, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L1-13 · uscita: sei facce con lo stesso peso, il fulcro a 3,5 dove non c'è nessuna faccia.
  PSI.scene('uscita-1', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X0 = 100, U = 160, BEAM = 150, S = 64;
    function X(v) { return X0 + (v - 1) * U; }
    line(root, X(1) - 50, BEAM, X(6) + 50, BEAM, '#edf2f7', 5);
    for (var n = 1; n <= 6; n++) {
      die(root, X(n) - S / 2, BEAM - S - 8, S, n, A);
      label(root, X(n), BEAM + 36, '1/6', 's04-small');
    }
    var fx = X(3.5);
    var fulcrum = svg('path', { d: 'M ' + fx + ' ' + (BEAM + 4) + ' L ' + (fx - 22) + ' ' + (BEAM + 40) + ' L ' + (fx + 22) + ' ' + (BEAM + 40) + ' Z', fill: G }, root);
    var ft = label(root, fx, BEAM + 82, '3,5 — su quale faccia?', 's04-label s04-green', { style: 'font-weight:700' });
    gsap.set([fulcrum, ft], { opacity: 0 });
    tl.addLabel('s0');
    tl.fromTo(fulcrum, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5 }).to(ft, { opacity: 1, duration: .4 }).addLabel('s1');
  });
})();
