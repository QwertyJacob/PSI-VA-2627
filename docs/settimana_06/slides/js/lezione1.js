/*
 * Settimana 6, Lezione 1: Bertrand, la densità (l'autobus delle due), la
 * distribuzione uniforme, la funzione di ripartizione, la distribuzione
 * esponenziale e l'assenza di memoria. Il blocco dopo Bertrand segue il pacco
 * «9. VA continue» (PSI 25/26) e gli esercizi sull'esponenziale del pacco
 * «10. Gaussian». Utilità in comuni.js.
 */
(function () {
  'use strict';
  var svg = PSI.svg, S = S06, C = S.C, label = S.label, line = S.line, it = S.it;
  var fb = S.fbus, Fb = S.Fbus;
  var GEO = ['#fb923c', '#c084fc', '#7dd3fc'];   // tre parametri: arancio, viola, azzurro chiaro

  // L1-01 · un cerchio, il triangolo inscritto, una corda «a caso», la domanda.
  PSI.scene('corda', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var cx = 350, cy = 250, R = 210;
    function P(deg) { var a = deg * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; }
    var circle = svg('circle', { cx: cx, cy: cy, r: R, fill: '#ffffff06', stroke: C.text, 'stroke-width': 3 }, root);
    var v = [P(-90), P(30), P(150)];
    var tri = svg('polygon', { points: v.map(function (p) { return p.join(','); }).join(' '), fill: 'none', stroke: C.muted,
      'stroke-width': 2.5, 'stroke-dasharray': '10 8' }, root);
    var side = line(root, v[1][0], v[1][1], v[2][0], v[2][1], C.model, 7, { 'stroke-linecap': 'round' });
    var sideLen = Math.hypot(v[1][0] - v[2][0], v[1][1] - v[2][1]);
    var e1 = P(197), e2 = P(332);
    var chord = line(root, e1[0], e1[1], e2[0], e2[1], C.data, 6, { 'stroke-linecap': 'round' });
    var dots = [e1, e2].map(function (p) { return svg('circle', { cx: p[0], cy: p[1], r: 8, fill: C.data }, root); });
    var q = label(root, cx, 525, 'Più lunga del lato?', 's06-big');
    gsap.set([tri, chord, dots, q, side], { opacity: 0 });
    PSI.draw(tl, circle, 2 * Math.PI * R, { duration: .9 });
    tl.to(tri, { opacity: 1, duration: .4 }).addLabel('s0');
    tl.set(chord, { opacity: 1 }).to(dots, { opacity: 1, duration: .15 });
    PSI.draw(tl, chord, Math.hypot(e2[0] - e1[0], e2[1] - e1[1]), { duration: .6 }, '<');
    tl.addLabel('s1');
    tl.fromTo(q, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5 }).addLabel('s2');
    tl.set(side, { opacity: 1 });
    PSI.draw(tl, side, sideLen, { duration: .6 });
    tl.addLabel('s3');
  });

  // L1-03 · tre metodi, tre costruzioni, tre nuvole di 300 corde (semi fissi), frequenze.
  PSI.scene('corde', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var R = 150, cy = 195, CX = [200, 590, 980], N = 300;
    var TITLES = ['1 · estremi a caso', '2 · distanza dal centro a caso', '3 · punto medio a caso'];
    var THEORY = ['1/3', '1/2', '1/4'], TVAL = [1 / 3, 1 / 2, 1 / 4];
    var SEEDS = [17, 1017, 2017];
    var clouds = [], cons = [], theory = [], freq = [];

    // Le corde: d = distanza dal centro in unità di raggio; lunga se d < 1/2.
    function generate(m, seed) {
      var r = PSI.random(seed), out = [];
      for (var i = 0; i < N; i++) {
        var p, q, d;
        if (m === 0) {
          var a = r() * 2 * Math.PI, b = r() * 2 * Math.PI;
          p = [Math.cos(a), Math.sin(a)]; q = [Math.cos(b), Math.sin(b)];
          d = Math.abs(Math.cos((a - b) / 2));
        } else {
          var th, x, y;
          if (m === 1) { th = r() * 2 * Math.PI; d = r(); }
          else { do { x = 2 * r() - 1; y = 2 * r() - 1; } while (x * x + y * y > 1); d = Math.sqrt(x * x + y * y); th = Math.atan2(y, x); }
          var mx = d * Math.cos(th), my = d * Math.sin(th), h = Math.sqrt(1 - d * d);
          p = [mx - h * Math.sin(th), my + h * Math.cos(th)];
          q = [mx + h * Math.sin(th), my - h * Math.cos(th)];
        }
        out.push({ p: p, q: q, long: d < .5 });
      }
      return out;
    }

    CX.forEach(function (cx, m) {
      var g = svg('g', {}, root);
      clouds.push(svg('g', {}, g));
      svg('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: C.text, 'stroke-width': 2.5 }, g);
      var tv = [-90, 30, 150].map(function (deg) { var a = deg * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
      svg('polygon', { points: tv.map(function (p) { return p.join(','); }).join(' '), fill: 'none', stroke: C.muted, 'stroke-width': 1.8, 'stroke-dasharray': '7 6', opacity: .8 }, g);
      label(g, cx, cy + R + 48, TITLES[m], 's06-label');
      theory.push(label(g, cx, cy + R + 92, THEORY[m], 's06-big s06-model', { style: 'font-size:38px', opacity: 0 }));
      freq.push(label(g, cx, cy + R + 130, '', 's06-label', { opacity: 0, style: 'font-size:21px' }));

      var k = svg('g', { opacity: 0 }, g);
      if (m === 0) {
        var A = tv[0], B = tv[2], Cc = tv[1];
        svg('path', { d: 'M' + A + ' L' + B + ' A' + R + ' ' + R + ' 0 0 0 ' + Cc + ' Z', fill: C.data, opacity: .28 }, k);
        svg('path', { d: 'M' + B + ' A' + R + ' ' + R + ' 0 0 0 ' + Cc, fill: 'none', stroke: C.data, 'stroke-width': 7 }, k);
        var e = [cx + R * Math.cos(1.85), cy + R * Math.sin(1.85)];
        line(k, A[0], A[1], e[0], e[1], C.data, 3.5);
        svg('circle', { cx: A[0], cy: A[1], r: 7, fill: C.text }, k);
        label(k, A[0], A[1] - 16, '60° su 180°', 's06-small halo');
      } else if (m === 1) {
        line(k, cx, cy, cx, cy + R, C.text, 2);
        line(k, cx, cy, cx, cy + R / 2, C.data, 9, { opacity: .8 });
        var y = cy + .3 * R, h = R * Math.sqrt(1 - .09);
        line(k, cx - h, y, cx + h, y, C.data, 3.5);
        svg('circle', { cx: cx, cy: cy, r: 5, fill: C.text }, k);
        label(k, cx + 18, cy + R / 4 + 6, 'metà raggio', 's06-small halo', { 'text-anchor': 'start' });
      } else {
        svg('circle', { cx: cx, cy: cy, r: R / 2, fill: C.data, opacity: .28 }, k);
        svg('circle', { cx: cx, cy: cy, r: R / 2, fill: 'none', stroke: C.data, 'stroke-width': 2.5 }, k);
        var mx = .2, my = -.15, dd = Math.hypot(mx, my), th = Math.atan2(my, mx), hh = Math.sqrt(1 - dd * dd);
        line(k, cx + R * (mx - hh * Math.sin(th)), cy + R * (my + hh * Math.cos(th)),
          cx + R * (mx + hh * Math.sin(th)), cy + R * (my - hh * Math.cos(th)), C.data, 3.5);
        svg('circle', { cx: cx + R * mx, cy: cy + R * my, r: 6, fill: C.model }, k);
        label(k, cx, cy + R / 2 + 22, 'area 1/4', 's06-small halo');
      }
      cons.push(k);

      var chords = generate(m, SEEDS[m]);
      var long = 0;
      chords.forEach(function (c) {
        if (c.long) long++;
        c.el = line(clouds[m], cx + R * c.p[0], cy + R * c.p[1], cx + R * c.q[0], cy + R * c.q[1],
          c.long ? C.data : C.muted, 1.3, { opacity: 0 });
      });
      clouds[m].chords = chords;
      freq[m].textContent = '300 corde: ' + it(long / N, 3) + '  ·  teoria ' + it(TVAL[m], 3);
    });

    var st = { n: 0 };
    function render() {
      var n = Math.round(st.n);
      clouds.forEach(function (g) {
        g.chords.forEach(function (c, i) { c.el.setAttribute('opacity', i < n ? .3 : 0); });
      });
    }
    render();
    tl.addLabel('s0');
    for (var m = 0; m < 3; m++) {
      tl.to(cons[m], { opacity: 1, duration: .5 }).fromTo(theory[m], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4 }).addLabel('s' + (m + 1));
    }
    tl.to(cons, { opacity: .35, duration: .4 })
      .to(st, { n: N, duration: 3, ease: 'none', onUpdate: render }).addLabel('s4');
    tl.to(freq, { opacity: 1, duration: .5, stagger: .15 }).addLabel('s5');
  });

  // Assi dell'autobus: minuti dopo le 14:00.
  function busAxis(root, F, ticks) {
    return S.xAxis(root, F, 0, 30, (ticks || [0, 5, 10, 15, 20, 25, 30]).map(function (v) {
      return [v, v === 0 ? '14:00' : v === 30 ? '14:30' : String(v)];
    }));
  }

  // L1-05 · l'autobus: barre da 5 e 2,5 minuti (probabilità), poi altezza = probabilità ÷ larghezza,
  // barre da 1 e da 0,5 minuti, la curva della densità e l'area verde tra 15 e 20.
  PSI.scene('vc-autobus', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var F = S.frame(0, 30, 110, 1080, 340, 1), KP = 280 / .36, KD = 5 * KP;
    var W = [5, 2.5, 1, .5];
    var bars = svg('g', {}, root);
    var fill = svg('path', { d: S.area(fb, 15, 20, 60, S.frame(0, 30, 110, 1080, 340, KD)), fill: C.ok, opacity: 0 }, root);
    var cur = S.drawnCurve(root, fb, 0, 30, 200, S.frame(0, 30, 110, 1080, 340, KD), { stroke: C.model, 'stroke-width': 5, opacity: 0 });
    line(root, F.X(0), F.base, F.X(0), 30, C.axis, 2);
    busAxis(root, F);
    var yl = label(root, F.X(0) + 12, 40, 'probabilità della barra', 's06-small', { 'text-anchor': 'start' });
    var br = svg('g', {}, root);
    line(br, F.X(15), 70, F.X(20), 70, C.ok, 3);
    line(br, F.X(15), 70, F.X(15), 82, C.ok, 3);
    line(br, F.X(20), 70, F.X(20), 82, C.ok, 3);
    label(br, F.X(17.5), 58, 'tra le 14:15 e le 14:20', 's06-small s06-ok s06-bold');
    var fl = label(root, F.X(21.5), 150, 'f(t): la densità', 's06-label s06-model s06-bold', { 'text-anchor': 'start', opacity: 0 });
    var cards = q.all('.scene-card');
    var st = { lev: 0, dens: 0, op: .75, grow: 0 };
    function render() {
      while (bars.firstChild) bars.removeChild(bars.firstChild);
      var w = W[Math.round(st.lev)], n = Math.round(30 / w);
      for (var i = 0; i < n; i++) {
        var a = i * w, b = a + w, p = Fb(b) - Fb(a);
        var h = st.grow * ((1 - st.dens) * p * KP + st.dens * p / w * KD);
        var sel = a >= 15 - 1e-9 && b <= 20 + 1e-9;
        svg('rect', { x: F.X(a) + .5, y: F.base - h, width: F.X(b) - F.X(a) - 1, height: h, fill: sel ? C.ok : C.data,
          opacity: st.op * (sel ? 1 : .7) }, bars);
      }
      yl.textContent = st.dens > .5 ? 'probabilità per minuto' : 'probabilità della barra';
    }
    render();
    gsap.set(cards, { opacity: 0 });
    tl.to(st, { grow: 1, duration: .8, onUpdate: render }).to(cards[0], { opacity: 1, duration: .3 }).addLabel('s0');
    tl.to(cards[0], { opacity: 0, duration: .2 }).to(st, { lev: 1, duration: .01, onUpdate: render })
      .to(cards[1], { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(cards[1], { opacity: 0, duration: .2 }).to(cards[2], { opacity: 1, duration: .3 }).addLabel('s2');
    tl.to(cards[2], { opacity: 0, duration: .2 }).to(st, { dens: 1, duration: .8, onUpdate: render })
      .to(cards[3], { opacity: 1, duration: .3 }).addLabel('s3');
    tl.to(st, { lev: 2, duration: .01, onUpdate: render }).to({}, { duration: .4 })
      .to(st, { lev: 3, duration: .01, onUpdate: render }).addLabel('s4');
    tl.to(cards[3], { opacity: 0, duration: .2 }).set(cur, { opacity: 1 });
    PSI.draw(tl, cur, cur.len, { duration: .9 });
    tl.to(st, { op: .18, duration: .4, onUpdate: render }, '<.3').to(fill, { opacity: .6, duration: .4 })
      .to([fl, cards[4]], { opacity: 1, duration: .3 }).addLabel('s5');
  });

  // Densità dell'autobus, statica, con l'area 15–20 (L1-06) o senza.
  function busPlot(root, F, opts) {
    opts = opts || {};
    if (opts.fill !== false) svg('path', { d: S.area(fb, 15, 20, 60, F), fill: C.ok, opacity: .55 }, root);
    svg('path', { d: S.curve(fb, 0, 30, 200, F), fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    line(root, F.X(0), F.base, F.X(0), F.Y(.08), C.axis, 2);
    busAxis(root, F, opts.ticks);
  }

  // L1-06 · la densità: f minuscola, nel riquadro come nel pacco.
  (function () {
    var root = document.querySelector('#vc-densita .scene-svg');
    if (!root) return;
    var F = S.frame(0, 30, 120, 560, 330, 3300);
    busPlot(root, F, { ticks: [0, 15, 20, 30] });
    svg('rect', { x: 18, y: 120, width: 86, height: 150, rx: 14, fill: 'none', stroke: C.ok, 'stroke-width': 3 }, root);
    label(root, 61, 195, 'f(t)', 's06-big', { style: 'font-size:40px;font-style:italic', 'text-anchor': 'middle' });
    label(root, 340, 40, 'funzione di densità di probabilità', 's06-label s06-model s06-bold');
  })();

  // L1-07 · le 14:18:30 «esatte»: più cifre, probabilità sempre più piccola.
  PSI.scene('vc-punto', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    svg('rect', { x: 20, y: 70, width: 560, height: 170, rx: 30, fill: '#0b1220', stroke: '#ffffff60', 'stroke-width': 3 }, root);
    label(root, 300, 276, 'arrivo dell\'autobus', 's06-small');
    var disp = label(root, 300, 172, '14:18:30', 's06-mono s06-ok', { style: 'font-size:54px' });
    var sub = label(root, 300, 216, '', 's06-small', { style: 'font-size:20px' });
    label(root, 800, 44, 'precisione', 's06-small');
    label(root, 1040, 44, 'probabilità', 's06-small');
    line(root, 650, 58, 1150, 58, '#ffffff30', 2);
    // Il terzo campo è l'esponente: un tspan rialzato, perché il font non ha tutti gli apici Unicode.
    var ROWS = [['1 secondo', '≈ 0,0004'], ['1 millisecondo', '≈ 0,0000004'], ['1 microsecondo', '≈ 4 · 10', '−10'],
      ['1 femtosecondo', '≈ 4 · 10', '−19'], ['istante esatto', '0']];
    var rows = ROWS.map(function (r, i) {
      var g = svg('g', { opacity: 0 }, root), y = 102 + i * 50, last = i === ROWS.length - 1;
      label(g, 800, y, r[0], 's06-label' + (last ? ' s06-bold' : ''));
      var p = label(g, 1040, y, r[1], 's06-label s06-bold', { style: last ? 'fill:' + C.ok + ';font-size:32px' : '' });
      if (r[2]) svg('tspan', { dy: -11, style: 'font-size:16px' }, p).textContent = r[2];
      return g;
    });
    var DIG = ['14:18:30', '14:18:30,000', '14:18:30,000 000', '14:18:30,000 000 000 000 000', '14:18:30,000…'];
    var SUB = ['dalle 14:18:30 alle 14:18:31', 'un millesimo di secondo', 'un milionesimo di secondo', 'un milionesimo di miliardesimo', 'nessuna larghezza'];
    var punch = q.all('.pt-punch > *');
    var st = { d: 0 };
    function render() {
      var d = Math.round(st.d);
      disp.textContent = DIG[d];
      disp.setAttribute('style', 'font-size:' + (d >= 3 ? 30 : 54) + 'px');
      sub.textContent = SUB[d];
    }
    render();
    gsap.set(punch, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(rows[0], { opacity: 1, duration: .4 }).addLabel('s1');
    for (var i = 1; i < ROWS.length; i++) {
      tl.to(st, { d: i, duration: .01, onUpdate: render }).to(rows[i], { opacity: 1, duration: .4 }).addLabel('s' + (i + 1));
    }
    tl.to(punch[0], { opacity: 1, duration: .5 }).addLabel('s6');
    tl.to(punch[1], { opacity: 1, duration: .5 }).addLabel('s7');
  });

  // L1-08 · la probabilità è un'area: 15–20 (≈ 0,14), un punto (area 0), l'area totale (1).
  PSI.scene('vc-integrale', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var F = S.frame(0, 30, 70, 700, 340, 3900);
    var tot = svg('path', { d: S.area(fb, 0, 30, 200, F), fill: C.data, opacity: 0 }, root);
    var fill = svg('path', { fill: C.ok, opacity: .6 }, root);
    svg('path', { d: S.curve(fb, 0, 30, 200, F), fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    line(root, F.X(0), F.base, F.X(0), F.Y(.08), C.axis, 2);
    busAxis(root, F, [0, 10, 15, 20, 30]);
    var val = label(root, F.X(24), 160, 'area ≈ 0,14', 's06-label s06-ok s06-bold', { opacity: 0 });
    var pt = label(root, F.X(24), 160, 'un punto: area 0', 's06-label s06-ok s06-bold', { opacity: 0 });
    var one = label(root, F.X(17), 230, 'area totale = 1', 's06-big s06-data halo', { opacity: 0, style: 'font-size:34px' });
    var side = q.all('.ig-side > *');
    var st = { a: 15, b: 15 };
    function render() { fill.setAttribute('d', S.area(fb, st.a, st.b, 60, F)); }
    render();
    gsap.set(side, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { b: 20, duration: .7, onUpdate: render }).to(val, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(side[0], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(val, { opacity: 0, duration: .2 }).to(st, { a: 18.5, b: 18.5, duration: 1.2, onUpdate: render })
      .to(pt, { opacity: 1, duration: .3 }).to(side[1], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(pt, { opacity: 0, duration: .2 }).to(tot, { opacity: .4, duration: .6 }).to(one, { opacity: 1, duration: .3 }).addLabel('s4');
  });

  // L1-11 (S) · dove la densità è alta, un intervallo della stessa larghezza contiene più probabilità.
  (function () {
    var root = document.querySelector('#vc-zone .scene-svg');
    if (!root) return;
    var up = function (x) { return .05 + .9 * x * x; }, down = function (x) { return .95 - .9 * Math.pow(x, .6); };
    [[up, 40], [down, 640]].forEach(function (c, i) {
      var F = S.frame(0, 1, c[1] + 30, c[1] + 520, 330, 260);
      var hi = i === 0 ? [.8, .95] : [.05, .2], lo = i === 0 ? [.05, .2] : [.8, .95];
      svg('path', { d: S.area(c[0], hi[0], hi[1], 30, F), fill: C.ok, opacity: .6 }, root);
      svg('path', { d: S.area(c[0], lo[0], lo[1], 30, F), fill: C.third, opacity: .5 }, root);
      svg('path', { d: S.curve(c[0], 0, 1, 100, F), fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
      line(root, F.X(0), F.base, F.X(1) + 10, F.base, C.axis, 2);
      line(root, F.X(0), F.base, F.X(0), 50, C.axis, 2);
      label(root, F.X((hi[0] + hi[1]) / 2), F.Y(c[0]((hi[0] + hi[1]) / 2)) - 18, 'più probabile', 's06-small s06-ok s06-bold');
      label(root, F.X((lo[0] + lo[1]) / 2), F.Y(c[0]((lo[0] + lo[1]) / 2)) - 18, 'meno probabile', 's06-small s06-third s06-bold');
    });
  })();

  // L1-12 · la distribuzione uniforme: il rettangolo, poi l'area tra c e d.
  PSI.scene('un-def', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X = function (v) { return 112 + 42 * v; }, base = 330, top = 130;   // a = 2, b = 10
    var rect = svg('rect', { x: X(4), y: top, width: X(7) - X(4), height: base - top, fill: C.ok, opacity: 0 }, root);
    svg('polyline', { points: [[X(0), base], [X(2), base], [X(2), top], [X(10), top], [X(10), base], [X(11.4), base]].map(function (p) { return p.join(','); }).join(' '),
      fill: 'none', stroke: C.model, 'stroke-width': 5 }, root);
    line(root, X(0), base, X(11.4), base, C.axis, 2);
    line(root, X(0), base, X(0), 70, C.axis, 2);
    line(root, X(0), top, X(2), top, C.muted, 2, { 'stroke-dasharray': '5 5' });
    label(root, X(0) - 10, top + 10, '1/(b − a)', 's06-label', { 'text-anchor': 'end' });
    label(root, X(0) + 10, 76, 'f(x)', 's06-label', { 'text-anchor': 'start', style: 'font-style:italic' });
    [[2, 'a'], [4, 'c'], [7, 'd'], [10, 'b']].forEach(function (t, i) {
      var g = (i === 1 || i === 2) ? svg('g', { class: 'un-cd', opacity: 0 }, root) : root;
      line(g, X(t[0]), base, X(t[0]), base + 8, C.axis, 2);
      label(g, X(t[0]), base + 40, t[1], 's06-big', { style: 'font-size:34px;font-style:italic' });
    });
    var cd = PSI.q(el).all('.un-cd'), texts = PSI.q(el).all('.un-f');
    var ar = label(root, X(5.5), 240, 'area', 's06-label s06-bold', { opacity: 0, style: 'fill:#0b1220' });
    gsap.set(texts, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(cd, { opacity: 1, duration: .3 }).to(rect, { opacity: .65, duration: .5 }).to(ar, { opacity: 1, duration: .3 })
      .to(texts[0], { opacity: 1, duration: .4 }, '<').addLabel('s1');
    for (var i = 1; i < 4; i++) tl.to(texts[i], { opacity: 1, duration: .4 }).addLabel('s' + (i + 1));
  });

  // L1-13 · l'autobus uniforme tra le 14:00 e le 14:30.
  (function () {
    var root = document.querySelector('#un-autobus .scene-svg');
    if (!root) return;
    var F = S.frame(0, 30, 50, 560, 300, 1), top = 150;
    svg('rect', { x: F.X(15), y: top, width: F.X(20) - F.X(15), height: F.base - top, fill: C.ok, opacity: .6 }, root);
    svg('polyline', { points: [[F.X(-2), F.base], [F.X(0), F.base], [F.X(0), top], [F.X(30), top], [F.X(30), F.base], [F.X(31.5), F.base]].map(function (p) { return p.join(','); }).join(' '),
      fill: 'none', stroke: C.model, 'stroke-width': 5 }, root);
    line(root, F.X(0), F.base, F.X(0), 70, C.axis, 2);
    busAxis(root, F, [0, 15, 20, 30]);
    label(root, F.X(0) + 10, 82, 'f(t) = 1/30', 's06-label', { 'text-anchor': 'start' });
    line(root, F.X(15), 120, F.X(20), 120, C.ok, 3);
    line(root, F.X(15), 120, F.X(15), 132, C.ok, 3);
    line(root, F.X(20), 120, F.X(20), 132, C.ok, 3);
    label(root, F.X(17.5), 108, '5 minuti', 's06-small s06-ok s06-bold');
  })();

  // L1-16 · funzioni di ripartizione discrete: distribuzione geometrica, poi distribuzione di Poisson.
  PSI.scene('fr-discrete', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    function fact(k) { var f = 1; for (var i = 2; i <= k; i++) f *= i; return f; }
    var SETS = [
      { pmf: function (k, p) { return k < 1 ? 0 : Math.pow(1 - p, k - 1) * p; }, pars: [.2, .5, .8], name: 'p', k0: 1, k1: 10, ymax: .85,
        lab: ['p = 0,2', 'p = 0,5', 'p = 0,8'] },
      { pmf: function (k, l) { return Math.exp(-l) * Math.pow(l, k) / fact(k); }, pars: [1, 4, 10], name: 'λ', k0: 0, k1: 20, ymax: .4,
        lab: ['λ = 1', 'λ = 4', 'λ = 10'] }
    ];
    var groups = SETS.map(function (set, si) {
      var g = svg('g', { opacity: si ? 0 : 1 }, root);
      var L = S.frame(set.k0 - .5, set.k1 + .5, 70, 560, 360, 290 / set.ymax), R = S.frame(set.k0 - .5, set.k1 + .5, 670, 1160, 360, 290);
      [L, R].forEach(function (F, j) {
        line(g, F.X(set.k0 - .5), F.base, F.X(set.k1 + .5), F.base, C.axis, 2);
        line(g, F.X(set.k0 - .5), F.base, F.X(set.k0 - .5), 50, C.axis, 2);
        var ticks = si ? [0, 5, 10, 15, 20] : [1, 2, 4, 6, 8, 10];
        ticks.forEach(function (t) { line(g, F.X(t), F.base, F.X(t), F.base + 6, C.axis, 2); label(g, F.X(t), F.base + 28, String(t), 's06-small'); });
        var yt = j ? [[.5, '0,5'], [1, '1']] : (si ? [[.2, '0,2'], [.4, '0,4']] : [[.4, '0,4'], [.8, '0,8']]);
        yt.forEach(function (t) { line(g, F.X(set.k0 - .5) - 6, F.Y(t[0]), F.X(set.k0 - .5), F.Y(t[0]), C.axis, 2); label(g, F.X(set.k0 - .5) - 12, F.Y(t[0]) + 6, t[1], 's06-small', { 'text-anchor': 'end' }); });
      });
      label(g, 315, 36, si ? 'PMF della distribuzione di Poisson' : 'PMF della distribuzione geometrica', 's06-label');
      label(g, 915, 36, 'funzione di ripartizione', 's06-label');
      set.pars.forEach(function (par, pi) {
        var col = GEO[pi], cum = 0, prev = null;
        for (var k = set.k0; k <= set.k1; k++) {
          var p = set.pmf(k, par);
          var x = L.X(k), y = L.Y(p);
          if (prev) line(g, prev[0], prev[1], x, y, col, 1.5, { opacity: .6 });
          svg('circle', { cx: x, cy: y, r: 6, fill: col }, g);
          prev = [x, y];
          cum += p;
          var x1 = R.X(k), x2 = R.X(Math.min(k + 1, set.k1 + .5));
          line(g, x1, R.Y(cum), x2, R.Y(cum), col, 3);
          svg('circle', { cx: x1, cy: R.Y(cum), r: 5, fill: col }, g);
        }
        label(g, 520, 90 + 34 * pi, set.lab[pi], 's06-label s06-bold', { style: 'fill:' + col, 'text-anchor': 'end' });
      });
      return g;
    });
    var cards = q.all('.scene-card');
    gsap.set(cards[1], { opacity: 0 });
    tl.addLabel('s0');
    tl.to([groups[0], cards[0]], { opacity: 0, duration: .3 }).to([groups[1], cards[1]], { opacity: 1, duration: .4 }).addLabel('s1');
  });

  // L1-17 · densità e funzione di ripartizione legate: x scorre, l'area a sinistra diventa l'altezza di F.
  PSI.scene('fr-continua', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var T = S.frame(0, 30, 110, 1100, 190, 2000), B = S.frame(0, 30, 110, 1100, 480, 200);
    var fill = svg('path', { fill: C.data, opacity: .45 }, root);
    svg('path', { d: S.curve(fb, 0, 30, 200, T), fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    line(root, T.X(0), T.base, T.X(0), 30, C.axis, 2);
    busAxis(root, T, [0, 10, 20, 30]);
    label(root, T.X(0) + 12, 44, 'densità f(t)', 's06-small', { 'text-anchor': 'start' });
    var Fl = S.drawnCurve(root, Fb, 0, 30, 200, B, { stroke: C.data, 'stroke-width': 5 });
    line(root, B.X(0), B.base, B.X(0), B.Y(1.08), C.axis, 2);
    busAxis(root, B, [0, 10, 20, 30]);
    [[.5, '0,5'], [1, '1']].forEach(function (t) {
      line(root, B.X(0) - 6, B.Y(t[0]), B.X(30), B.Y(t[0]), '#ffffff22', 2, { 'stroke-dasharray': '4 6' });
      label(root, B.X(0) - 12, B.Y(t[0]) + 6, t[1], 's06-small', { 'text-anchor': 'end' });
    });
    label(root, B.X(0) + 12, B.Y(1.08) + 4, 'funzione di ripartizione F(t)', 's06-small', { 'text-anchor': 'start' });
    var guide = line(root, 0, T.base, 0, B.base, C.data, 2.5, { 'stroke-dasharray': '6 5' });
    var dot = svg('circle', { r: 9, fill: C.data }, root);
    var val = label(root, 0, 0, '', 's06-label s06-data s06-bold', { 'text-anchor': 'start' });
    var st = { x: .01 };
    function render() {
      var x = st.x;
      fill.setAttribute('d', S.area(fb, 0, x, 80, T));
      guide.setAttribute('x1', T.X(x)); guide.setAttribute('x2', T.X(x));
      dot.setAttribute('cx', B.X(x)); dot.setAttribute('cy', B.Y(Fb(x)));
      var right = x > 22;
      val.setAttribute('x', B.X(x) + (right ? -16 : 16)); val.setAttribute('y', B.Y(Fb(x)) + 30);
      val.setAttribute('text-anchor', right ? 'end' : 'start');
      val.setAttribute('opacity', x < .5 ? 0 : 1);
      val.textContent = 'F(' + it(x, 0) + ') ≈ ' + it(Fb(x), 2);
    }
    render();
    tl.addLabel('s0');
    tl.to(st, { x: 30, duration: 3, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(st, { x: 10, duration: 1, onUpdate: render }).addLabel('s2');
  });

  // L1-18 · come si usa: F(a), F(b) − F(a), 1 − F(b); poi i numeri dell'autobus.
  PSI.scene('fr-uso', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var F = S.frame(0, 30, 60, 680, 360, 4000), a = 10, b = 20;
    var A = [[0, a, '#a0aec0'], [a, b, C.red], [b, 30, C.ok]].map(function (r) {
      return svg('path', { d: S.area(fb, r[0], r[1], 80, F), fill: r[2], opacity: 0 }, root);
    });
    svg('path', { d: S.curve(fb, 0, 30, 200, F), fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    line(root, F.X(0), F.base, F.X(30) + 10, F.base, C.axis, 2);
    line(root, F.X(0), F.base, F.X(0), 40, C.axis, 2);
    [[a, 'a'], [b, 'b']].forEach(function (t) {
      line(root, F.X(t[0]), F.base, F.X(t[0]), F.base + 8, C.axis, 2);
      label(root, F.X(t[0]), F.base + 40, t[1], 's06-big', { style: 'font-size:34px;font-style:italic' });
    });
    var rows = q.all('.fu-row'), nums = q.all('.fu-num');
    gsap.set([rows, nums], { opacity: 0 });
    tl.addLabel('s0');
    for (var i = 0; i < 3; i++) {
      tl.to(A[i], { opacity: .7, duration: .5 }).to(rows[i], { opacity: 1, duration: .4 }, '<').addLabel('s' + (i + 1));
    }
    tl.to(nums, { opacity: 1, duration: .4, stagger: .15 }).addLabel('s4');
  });

  // L1-21 · zero lavori fino a t = attesa più lunga di t (stampante, 3 lavori all'ora).
  PSI.scene('attesa', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var Y = 130, F = S.frame(0, 3.4, 70, 1150, Y, 1);
    var r = PSI.random(143), t = 0, arr = [];
    while (true) { t += -Math.log(1 - r()) / 3; if (t > 3.4) break; arr.push(t); }
    var strip = svg('rect', { x: F.X(0), y: Y - 34, height: 68, width: 0, fill: C.ok, opacity: .2 }, root);
    var head = S.arrowMarker(root, 'at-arrow', C.axis);
    line(root, F.X(0) - 10, Y, F.X(3.4) + 20, Y, C.axis, 2.5, { 'marker-end': head });
    [0, 1, 2, 3].forEach(function (v) {
      line(root, F.X(v), Y - 8, F.X(v), Y + 8, C.axis, 2);
      label(root, F.X(v), Y + 70, it(v, 0) + ' h', 's06-small');
    });
    label(root, F.X(0), 40, 'adesso', 's06-small');
    var endTick = line(root, F.X(.5), Y - 40, F.X(.5), Y + 40, C.ok, 3, { 'stroke-dasharray': '6 4', opacity: 0 });
    var endLbl = label(root, F.X(.5), Y + 70, '0,5', 's06-label s06-ok s06-bold', { opacity: 0 });
    var empty = label(root, F.X(.25), Y - 46, 'nessun lavoro', 's06-small s06-ok', { opacity: 0 });
    var cursor = line(root, F.X(0), Y - 50, F.X(0), Y + 40, C.text, 2, { opacity: 0 });
    var dots = arr.map(function (a) { return svg('circle', { cx: F.X(a), cy: Y, r: 10, fill: C.model, opacity: 0 }, root); });
    var first = svg('g', { opacity: 0 }, root);
    line(first, F.X(0), Y + 30, F.X(arr[0]), Y + 30, C.data, 4);
    line(first, F.X(0), Y + 22, F.X(0), Y + 38, C.data, 3);
    line(first, F.X(arr[0]), Y + 22, F.X(arr[0]), Y + 38, C.data, 3);
    label(first, F.X(arr[0]) + 16, Y + 38, 'T = prossimo lavoro', 's06-label s06-data s06-bold', { 'text-anchor': 'start' });
    var lines = q.all('.at-lines p'), box = q.one('.at-box');
    var st = { now: 0, strip: 0 };
    function render() {
      cursor.setAttribute('x1', F.X(st.now)); cursor.setAttribute('x2', F.X(st.now));
      dots.forEach(function (d, i) { d.setAttribute('opacity', arr[i] <= st.now ? 1 : 0); });
      strip.setAttribute('width', F.X(st.strip) - F.X(0));
      endTick.setAttribute('x1', F.X(st.strip)); endTick.setAttribute('x2', F.X(st.strip));
      endLbl.setAttribute('x', F.X(st.strip));
      endLbl.textContent = st.strip > .55 ? 't' : '0,5';
      empty.setAttribute('x', F.X(st.strip / 2));
    }
    render();
    gsap.set([lines, box], { opacity: 0 });
    tl.addLabel('s0');
    tl.set(cursor, { opacity: .8 }).to(st, { now: 3.4, duration: 3, ease: 'none', onUpdate: render }).to(cursor, { opacity: 0, duration: .3 }).addLabel('s1');
    tl.to(st, { strip: .5, duration: .6, onUpdate: render })
      .to([endTick, endLbl, empty], { opacity: 1, duration: .3 }, '<')
      .to(dots[0], { attr: { r: 14 }, duration: .3 }).to(first, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(lines[0], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(lines[1], { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to(lines[2], { opacity: 1, duration: .4 }).addLabel('s5');
    tl.to(st, { strip: .64, duration: .6, onUpdate: render })
      .to(box, { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // L1-23 · densità e funzione di ripartizione per λ = 0,5, 1, 1,5 (come nel pacco).
  PSI.scene('ex-def', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var L = S.frame(0, 5, 60, 300, 250, 140), R = S.frame(0, 5, 360, 600, 250, 200);
    var LAM = [.5, 1, 1.5], curves = [];
    [L, R].forEach(function (F, j) {
      line(root, F.X(0), F.base, F.X(5) + 8, F.base, C.axis, 2);
      line(root, F.X(0), F.base, F.X(0), j ? F.Y(1.1) : F.Y(1.6), C.axis, 2);
      [0, 1, 2, 3, 4, 5].forEach(function (v) { line(root, F.X(v), F.base, F.X(v), F.base + 6, C.axis, 2); label(root, F.X(v), F.base + 26, String(v), 's06-tiny'); });
      (j ? [[.5, '0,5'], [1, '1']] : [[.5, '0,5'], [1, '1'], [1.5, '1,5']]).forEach(function (t) {
        line(root, F.X(0) - 5, F.Y(t[0]), F.X(0), F.Y(t[0]), C.axis, 2);
        label(root, F.X(0) - 9, F.Y(t[0]) + 5, t[1], 's06-tiny', { 'text-anchor': 'end' });
      });
      var t = label(root, F.X(2.5), 18, j ? 'F(x) = 1 − e' : 'f(x) = λe', 's06-small');
      svg('tspan', { dy: -8, style: 'font-size:14px' }, t).textContent = '−λx';
      LAM.forEach(function (lam, i) {
        var fn = j ? function (x) { return 1 - Math.exp(-lam * x); } : S.expo(lam);
        curves.push(S.drawnCurve(root, fn, 0, 5, 120, F, { stroke: GEO[i], 'stroke-width': 4 }));
      });
    });
    LAM.forEach(function (lam, i) { label(root, L.X(3.2), 70 + 28 * i, 'λ = ' + it(lam, 1), 's06-small s06-bold', { style: 'fill:' + GEO[i], 'text-anchor': 'start' }); });
    curves.forEach(function (c) { PSI.draw(tl, c, c.len, { duration: .8 }, 0); });
    tl.addLabel('s0');
  });

  // L1-24 (S) · widget: la densità λe^(−λt) della stampante, in ore.
  (function () {
    var box = document.getElementById('ex-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out'), input = box.querySelector('input');
    var F = S.frame(0, 2, 90, 1050, 315, 35);
    S.yAxis(root, F, 90, 8.2, [[2, '2'], [4, '4'], [6, '6'], [8, '8']]);
    S.xAxis(root, F, 0, 2, [[0, '0'], [.5, '0,5'], [1, '1'], [1.5, '1,5'], [2, '2']], 't (ore)');
    var fillA = svg('path', { fill: C.data, opacity: .18 }, root);
    svg('path', { d: S.curve(S.expo(3), 0, 2, 200, F), fill: 'none', stroke: C.muted, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' }, root);
    label(root, F.X(.06), F.Y(3) - 6, 'stampante: λ = 3', 's06-small', { 'text-anchor': 'start' });
    var live = svg('path', { fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    var mean = line(root, 0, F.base, 0, 40, C.ok, 3, { 'stroke-dasharray': '6 4' });
    var meanTxt = label(root, 0, 34, 'E[T]', 's06-label s06-ok s06-bold');
    var st = { lam: 3 };
    function render() {
      var lam = st.lam, fn = S.expo(lam), m = 1 / lam;
      box.querySelector('[data-v="lam"]').textContent = it(lam, 1);
      fillA.setAttribute('d', S.area(fn, 0, 2, 200, F));
      live.setAttribute('d', S.curve(fn, 0, 2, 200, F));
      mean.setAttribute('x1', F.X(m)); mean.setAttribute('x2', F.X(m));
      meanTxt.setAttribute('x', F.X(m));
      out.innerHTML = 'E[T] = 1/λ = <b>' + it(60 * m, 1) + ' min</b><span class="sep">|</span>P(T ≤ 5 min) = <b>' + it(1 - Math.exp(-lam / 12), 3) +
        '</b><span class="sep">|</span>P(T &gt; E[T]) = <b>' + it(Math.exp(-1), 3) + '</b>';
    }
    function set(lam) { st.lam = lam; input.value = lam; render(); }
    input.addEventListener('input', function () { st.lam = +this.value; render(); });
    box.querySelectorAll('[data-lam]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.lam); this.blur(); });
    });
    set(3);
  })();
})();
