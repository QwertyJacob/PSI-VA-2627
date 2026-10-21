/*
 * Settimana 6, Lezione 2: Cerere, la distribuzione normale, la standardizzazione,
 * la regola 68–95–99,7 e i quantili. Utilità in comuni.js.
 */
/* ═════════════════════════════ LEZIONE 2 ═════════════════════════════ */
(function () {
  'use strict';
  var svg = PSI.svg, S = S06, C = S.C, label = S.label, line = S.line, it = S.it;
  function bellFn(mu, sigma) { return function (x) { return S.npdf(x, mu, sigma); }; }
  var std = bellFn(0, 1);

  // L2-01 · riepilogo: la curva esponenziale con un'area colorata (statica).
  (function () {
    var root = document.querySelector('#riepilogo-l1 .scene-svg');
    if (!root) return;
    var F = S.frame(0, 1.2, 30, 320, 160, 45), f3 = S.expo(3);
    svg('path', { d: S.area(f3, .1, .5, 60, F), fill: C.data, opacity: .55 }, root);
    svg('path', { d: S.curve(f3, 0, 1.2, 120, F), fill: 'none', stroke: C.model, 'stroke-width': 3.5 }, root);
    line(root, 24, 160, 326, 160, C.axis, 2);
    line(root, 30, 160, 30, 15, C.axis, 2);
    label(root, F.X(.1), 184, '0,1', 's06-tiny');
    label(root, F.X(.5), 184, '0,5', 's06-tiny');
  })();

  // L2-02 · Cerere: un puntino tra le stelle per 41 notti, poi il bagliore del Sole.
  PSI.scene('cerere', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var defs = svg('defs', {}, root);
    var g1 = svg('radialGradient', { id: 's06-sun' }, defs);
    svg('stop', { offset: '0%', 'stop-color': '#fffbe6' }, g1);
    svg('stop', { offset: '35%', 'stop-color': '#fde68a' }, g1);
    svg('stop', { offset: '70%', 'stop-color': '#f59e0b', 'stop-opacity': .55 }, g1);
    svg('stop', { offset: '100%', 'stop-color': '#f59e0b', 'stop-opacity': 0 }, g1);
    svg('rect', { x: 0, y: 0, width: 880, height: 560, rx: 16, fill: '#070b16' }, root);
    var r = PSI.random(1801);
    for (var i = 0; i < 170; i++) {
      svg('circle', { cx: r() * 880, cy: r() * 560, r: .6 + r() * r() * 2.4, fill: '#e2e8f0', opacity: .35 + r() * .6 }, root);
    }
    label(root, 440, 56, '1 gennaio – 11 febbraio 1801', 's06-label s06-bold');
    label(root, 24, 540, 'schema, non una mappa del cielo', 's06-tiny', { 'text-anchor': 'start' });
    // Arco: Bézier quadratica da P0 a P2.
    var P0 = [150, 360], P1 = [330, 230], P2 = [560, 260];
    function B(t) { var u = 1 - t; return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]]; }
    var marks = [];
    for (i = 0; i <= 40; i++) { var p = B(i / 40); marks.push(svg('circle', { cx: p[0], cy: p[1], r: 2.6, fill: C.data, opacity: 0 }, root)); }
    var dot = svg('circle', { cx: P0[0], cy: P0[1], r: 9, fill: '#fde68a' }, root);
    var halo = svg('circle', { cx: P0[0], cy: P0[1], r: 18, fill: '#fde68a', opacity: .25 }, root);
    var tag = label(root, 340, 340, '41 giorni, 3 gradi', 's06-big s06-data', { opacity: 0 });
    var sun = svg('g', {}, root);
    svg('circle', { cx: 0, cy: 0, r: 330, fill: 'url(#s06-sun)' }, sun);
    svg('circle', { cx: 0, cy: 0, r: 90, fill: '#fff7d6' }, sun);
    gsap.set(sun, { x: 1320, y: 250 });
    var st = { k: 0 };
    function render() {
      var k = st.k, p = B(k / 40);
      dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]);
      halo.setAttribute('cx', p[0]); halo.setAttribute('cy', p[1]);
      marks.forEach(function (m, i) { m.setAttribute('opacity', i <= k ? .9 : 0); });
    }
    render();
    tl.addLabel('s0');
    tl.to(st, { k: 40, duration: 3, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(tag, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(sun, { x: 790, duration: 2, ease: 'power2.out' })
      .to([dot, halo], { opacity: 0, duration: 1.2 }, '-=1.2').addLabel('s3');
  });

  // L2-04 · la campana arancione di Gauss (statica, appare come frammento).
  (function () {
    var root = document.querySelector('#gauss .scene-svg');
    if (!root) return;
    var F = S.frame(-3.4, 3.4, 30, 460, 160, 340);
    svg('path', { d: S.area(std, -3.4, 3.4, 120, F), fill: C.model, opacity: .2 }, root);
    svg('path', { d: S.curve(std, -3.4, 3.4, 120, F), fill: 'none', stroke: C.model, 'stroke-width': 4 }, root);
    line(root, 24, 160, 466, 160, C.axis, 2);
    label(root, F.X(0), 184, '0', 's06-small');
    label(root, 470, 184, 'errore x', 's06-small', { 'text-anchor': 'end' });
    label(root, 470, 60, '∝ e^(−h²x²)', 's06-label s06-model s06-bold', { 'text-anchor': 'start' });
  })();

  // L2-05 · lo script 3 in JavaScript: 20 000 errori, ognuno somma di 50 uniformi su [−0,1; 0,1].
  PSI.scene('sondaggio-3-rivela', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var r = PSI.random(1801), N = 20000, K = 50, xs = new Float64Array(N), sum = 0, sq = 0;
    for (var i = 0; i < N; i++) {
      var s = 0;
      for (var j = 0; j < K; j++) s += r() * .2 - .1;
      xs[i] = s; sum += s; sq += s * s;
    }
    var mu = sum / N, sd = Math.sqrt(sq / N - mu * mu);
    var LO = -1.6, HI = 1.6, BW = .08, NB = Math.round((HI - LO) / BW), cnt = new Array(NB).fill(0);
    for (i = 0; i < N; i++) { var b = Math.floor((xs[i] - LO) / BW); if (b >= 0 && b < NB) cnt[b]++; }
    var F = S.frame(LO, HI, 20, 420, 250, 215);
    var g = svg('g', {}, root);
    var bars = cnt.map(function (c, k) {
      var h = c / N / BW;
      return svg('rect', { x: F.X(LO + k * BW) + .5, y: F.Y(h), width: F.k * BW - 1, height: h * 215, fill: C.data, opacity: .7 }, g);
    });
    var bell = S.drawnCurve(g, bellFn(mu, sd), LO, HI, 120, F, { stroke: C.model, 'stroke-width': 3.5 });
    S.xAxis(g, F, LO, HI, [[-1, '−1'], [0, '0'], [1, '1']], '');
    label(g, 220, 296, '20.000 misure · ognuna = 50 piccoli errori', 's06-tiny');
    label(g, 418, 24, 'σ ≈ ' + it(sd, 3), 's06-small', { 'text-anchor': 'end' });
    gsap.set(g, { opacity: 0 });
    gsap.set(bars, { scaleY: 0, svgOrigin: '0 250' });
    tl.addLabel('s0');
    tl.set(g, { opacity: 1 }).to(bars, { scaleY: 1, duration: .6, stagger: .015, ease: 'power2.out' });
    PSI.draw(tl, bell, bell.len, { duration: .8 });
    tl.addLabel('s1');
  });

  // L2-06 · la formula, un pezzo alla volta; sotto, una campana che reagisce.
  PSI.scene('formula', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var vers = q.all('.fp-stack > div'), caps = q.all('.fp-cap > p');
    var mu = 450, sg = 90, Y = 200, H = 160;
    var F = { X: function (z) { return mu + z * sg; }, Y: function (h) { return Y - h / .3989 * H; }, base: Y, k: sg };
    var shade = svg('path', { d: S.area(std, -4.5, 4.5, 140, F), fill: C.muted, opacity: 0 }, root);
    line(root, 30, Y, 870, Y, C.axis, 2);
    svg('path', { d: S.curve(std, -4.6, 4.6, 140, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    line(root, mu, Y, mu, Y + 8, C.axis, 2);
    label(root, mu, Y + 30, 'μ', 's06-label');
    var z0 = 1.6;
    function pointAt(z, color) {
      var g = svg('g', { opacity: 0 }, root);
      line(g, F.X(z), Y, F.X(z), F.Y(std(z)), color, 2.5, { 'stroke-dasharray': '5 4' });
      svg('circle', { cx: F.X(z), cy: F.Y(std(z)), r: 8, fill: color }, g);
      line(g, mu, Y + 14, F.X(z), Y + 14, color, 5);
      label(g, (mu + F.X(z)) / 2, Y + 36, z > 0 ? 'x − μ' : 'stessa distanza', 's06-small s06-ok s06-bold');
      return g;
    }
    var p1 = pointAt(z0, C.ok), p2 = pointAt(-z0, C.ok);
    var lvl = line(root, F.X(-z0), F.Y(std(z0)), F.X(z0), F.Y(std(z0)), C.ok, 2, { 'stroke-dasharray': '3 6', opacity: 0 });
    var head = S.arrowMarker(root, 'fp-arrow', C.ok);
    var arrows = svg('g', { opacity: 0 }, root);
    [[.45, 1.9], [-.45, -1.9]].forEach(function (a) {
      svg('path', { d: 'M' + F.X(a[0]) + ' ' + (F.Y(std(a[0])) - 16) + ' Q' + F.X(a[1] * .9) + ' ' + (F.Y(std(a[1] * .6)) - 30) + ' ' + F.X(a[1]) + ' ' + (F.Y(std(a[1])) - 18),
        fill: 'none', stroke: C.ok, 'stroke-width': 4, 'marker-end': head }, arrows);
    });
    label(arrows, F.X(2.5), F.Y(std(1.2)), 'più piccolo', 's06-label s06-ok s06-bold', { 'text-anchor': 'start' });
    var sig = svg('g', { opacity: 0 }, root);
    [-1, 1].forEach(function (z) {
      line(sig, F.X(z), Y, F.X(z), F.Y(std(z)) - 10, C.model, 3, { 'stroke-dasharray': '6 4' });
      label(sig, F.X(z), Y + 30, z < 0 ? 'μ − σ' : 'μ + σ', 's06-label s06-model');
    });
    line(sig, mu, F.Y(std(1)) - 26, F.X(1), F.Y(std(1)) - 26, C.model, 4);
    label(sig, F.X(.5), F.Y(std(1)) - 36, 'σ', 's06-label s06-model s06-bold');
    var one = label(root, mu, Y - 50, 'area 1', 's06-big', { opacity: 0, style: 'font-size:34px;fill:#cbd5e0' });
    gsap.set(vers, { opacity: 0 }); gsap.set(vers[0], { opacity: 1 });
    gsap.set(caps, { opacity: 0 }); gsap.set(caps[0], { opacity: 1 });
    function swap(k) {
      tl.to([vers[k - 1], caps[k - 1]], { opacity: 0, duration: .3 }).to([vers[k], caps[k]], { opacity: 1, duration: .3 }, '<');
    }
    tl.addLabel('s0');
    swap(1); tl.to(p1, { opacity: 1, duration: .4 }).addLabel('s1');
    swap(2); tl.to(p2, { opacity: 1, duration: .4 }).to(lvl, { opacity: 1, duration: .3 }).addLabel('s2');
    swap(3); tl.to([p1, p2, lvl], { opacity: 0, duration: .3 }, '<').to(arrows, { opacity: 1, duration: .4 }).addLabel('s3');
    swap(4); tl.to(arrows, { opacity: 0, duration: .3 }, '<').to(sig, { opacity: 1, duration: .4 }).addLabel('s4');
    swap(5); tl.to(sig, { opacity: 0, duration: .3 }, '<').to(shade, { opacity: .35, duration: .5 }).to(one, { opacity: 1, duration: .3 }).addLabel('s5');
  });

  // L2-10 · widget sulle altezze: μ trasla, σ allarga e abbassa; asse y fisso.
  (function () {
    var box = document.getElementById('nm-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out'), inputs = {};
    box.querySelectorAll('input').forEach(function (i) { inputs[i.dataset.k] = i; });
    var F = S.frame(120, 220, 90, 1060, 285, 250 / .085);
    var xt = [];
    for (var v = 120; v <= 220; v += 10) xt.push([v, v % 20 === 0 ? String(v) : '']);
    S.xAxis(root, F, 120, 220, xt, 'cm');
    S.yAxis(root, F, 90, .085, [[.02, '0,02'], [.04, '0,04'], [.06, '0,06'], [.08, '0,08']]);
    var band = svg('path', { fill: C.data, opacity: .28 }, root);
    svg('path', { d: S.curve(bellFn(170, 10), 120, 220, 200, F), fill: 'none', stroke: C.muted, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' }, root);
    line(root, F.X(180), F.base, F.X(180), 20, C.ok, 2.5, { 'stroke-dasharray': '4 5' });
    label(root, F.X(180) + 8, 30, '180', 's06-small s06-ok', { 'text-anchor': 'start' });
    var live = svg('path', { fill: 'none', stroke: C.model, 'stroke-width': 4.5 }, root);
    var e1 = line(root, 0, F.base, 0, 0, C.model, 2, { 'stroke-dasharray': '5 5' });
    var e2 = line(root, 0, F.base, 0, 0, C.model, 2, { 'stroke-dasharray': '5 5' });
    var st = {};
    function render() {
      var mu = st.mu, s = st.sigma, fn = bellFn(mu, s);
      box.querySelector('[data-v="mu"]').textContent = mu;
      box.querySelector('[data-v="sigma"]').textContent = it(s, s % 1 ? 1 : 0);
      live.setAttribute('d', S.curve(fn, 120, 220, 240, F));
      band.setAttribute('d', S.area(fn, Math.max(120, mu - s), Math.min(220, mu + s), 80, F));
      [[e1, mu - s], [e2, mu + s]].forEach(function (e) {
        e[0].setAttribute('x1', F.X(e[1])); e[0].setAttribute('x2', F.X(e[1])); e[0].setAttribute('y2', F.Y(fn(e[1])));
      });
      var peak = 1 / (s * Math.sqrt(2 * Math.PI));
      out.innerHTML = 'picco <b>' + it(peak, 4) + '</b><span class="sep">|</span>P(μ − σ &lt; X &lt; μ + σ) = <b>' + it(S.Phi(1) - S.Phi(-1), 3) +
        '</b><span class="sep">|</span>P(X &gt; 180) = <b>' + it(1 - S.Phi((180 - mu) / s), 3) + '</b>';
    }
    function set(mu, s) { st.mu = mu; st.sigma = s; inputs.mu.value = mu; inputs.sigma.value = s; render(); }
    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', function () { st[k] = +this.value; render(); });
    });
    box.querySelectorAll('[data-mu]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.mu, +b.dataset.sigma); this.blur(); });
    });
    set(170, 10);
  })();

  // L2-12 (S) · distribuzione binomiale (n, 1/2) standardizzata per n = 10, 50, 200; poi la campana.
  PSI.scene('monete', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(-3.5, 3.5, 110, 990, 380, 700);
    S.xAxis(root, F, -3.5, 3.5, [[-3, '−3'], [-2, '−2'], [-1, '−1'], [0, '0'], [1, '1'], [2, '2'], [3, '3']], '');
    label(root, 550, 434, 'teste, standardizzate: (k − n/2) / √(n/4)', 's06-small');
    function logC(n, k) { var s = 0; for (var i = 1; i <= k; i++) s += Math.log(n - k + i) - Math.log(i); return s; }
    var groups = [10, 50, 200].map(function (n) {
      var g = svg('g', { opacity: 0 }, root), sd = Math.sqrt(n / 4), w = F.k / sd;
      for (var k = 0; k <= n; k++) {
        var z = (k - n / 2) / sd;
        if (Math.abs(z) > 3.6) continue;
        var h = Math.exp(logC(n, k) - n * Math.LN2) * sd;
        svg('rect', { x: F.X(z) - w / 2 + .5, y: F.Y(h), width: Math.max(1, w - 1), height: h * 700, fill: C.data, opacity: .7 }, g);
      }
      label(g, 990, 60, 'n = ' + n + ' lanci', 's06-big', { 'text-anchor': 'end', style: 'font-size:38px' });
      return g;
    });
    var bell = S.drawnCurve(root, std, -3.5, 3.5, 160, F, { stroke: C.model, 'stroke-width': 4.5, opacity: 0 });
    tl.addLabel('s0');
    tl.to(groups[0], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(groups[0], { opacity: 0, duration: .3 }).to(groups[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(groups[1], { opacity: 0, duration: .3 }).to(groups[2], { opacity: 1, duration: .4 }).addLabel('s3');
    tl.set(bell, { opacity: 1 });
    PSI.draw(tl, bell, bell.len, { duration: 1 });
    tl.addLabel('s4');
  });

  // L2-18 · due righelli: − μ, ÷ σ, poi cm e z allineati; 180 ↔ 1, area a destra 1 − Φ(1).
  PSI.scene('righelli', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var cx = 590, sp = 120, Y = 250;
    var F = { X: function (z) { return cx + z * sp; }, Y: function (h) { return Y - h / .3989 * 200; }, base: Y, k: sp };
    var shade = svg('path', { d: S.area(std, 1, 3.8, 120, F), fill: C.ok, opacity: 0 }, root);
    svg('path', { d: S.curve(std, -3.8, 3.8, 160, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    var MS = [140, 150, 160, 170, 180, 190, 200];
    function ruler(y, color) {
      var g = svg('g', {}, root);
      line(g, F.X(-3.6), y, F.X(3.6), y, color, 2.5);
      g.lbls = MS.map(function (v) {
        line(g, F.X((v - 170) / 10), y, F.X((v - 170) / 10), y + 9, color, 2.5);
        return label(g, F.X((v - 170) / 10), y + 36, String(v), 's06-label', { style: 'fill:' + color });
      });
      g.unit = label(g, F.X(3.6) + 16, y + 36, 'cm', 's06-label', { 'text-anchor': 'start', style: 'fill:' + color });
      return g;
    }
    var top = ruler(Y, C.text);
    var moving = ruler(Y, C.text);
    var ops = svg('g', {}, root);
    var minus = label(ops, 110, Y + 36, '− μ', 's06-big s06-ok', { opacity: 0, style: 'font-size:36px' });
    var div = label(ops, 110, Y + 36, '÷ σ', 's06-big s06-model', { opacity: 0, style: 'font-size:36px' });
    var mark = svg('g', { opacity: 0 }, root);
    line(mark, F.X(1), 60, F.X(1), Y + 100, C.ok, 3, { 'stroke-dasharray': '6 4' });
    label(mark, F.X(1) + 12, 72, '180 cm ↔ z = 1', 's06-label s06-ok s06-bold', { 'text-anchor': 'start' });
    var areaTxt = label(root, F.X(2.4), F.Y(.12), 'area ≈ 0,1587', 's06-label s06-ok s06-bold halo', { opacity: 0 });
    var box = q.one('.rh-formula');
    var st = { sub: 0, div: 0 };
    function render() {
      moving.lbls.forEach(function (t, i) {
        var v = (MS[i] - 170 * st.sub) / (1 + 9 * st.div);
        t.textContent = it(Math.round(v), 0);
      });
      moving.unit.textContent = st.div > .5 ? 'z' : st.sub > .5 ? 'x − 170' : 'cm';
      var col = st.div > .5 ? C.model : C.text;
      moving.lbls.forEach(function (t) { t.style.fill = col; });
      moving.unit.style.fill = col;
    }
    render();
    gsap.set(top, { opacity: 0 });
    gsap.set(box, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(minus, { opacity: 1, duration: .3 }).to(st, { sub: 1, duration: 1.2, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(minus, { opacity: 0, duration: .2 }).to(div, { opacity: 1, duration: .3 })
      .to(st, { div: 1, duration: 1.2, ease: 'power1.inOut', onUpdate: render }).addLabel('s2');
    tl.to(div, { opacity: 0, duration: .2 }).to(moving, { y: 76, duration: .6, ease: 'power2.inOut' })
      .to(top, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(mark, { opacity: 1, duration: .4 }).to(shade, { opacity: .4, duration: .5 }).to(areaTxt, { opacity: 1, duration: .3 }).addLabel('s4');
    tl.to(box, { opacity: 1, duration: .5 }).addLabel('s5');
  });

  // L2-23 · le tre fasce, poi il righello delle altezze.
  PSI.scene('regola', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var F = S.frame(-3.7, 3.7, 32, 1068, 290, 620);
    var b3 = svg('path', { d: S.area(std, -3, 3, 140, F), fill: C.third, opacity: 0 }, root);
    var b2 = svg('path', { d: S.area(std, -2, 2, 120, F), fill: C.model, opacity: 0 }, root);
    var b1 = svg('path', { d: S.area(std, -1, 1, 80, F), fill: C.data, opacity: 0 }, root);
    svg('path', { d: S.curve(std, -3.7, 3.7, 160, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    var NAMES = ['μ − 3σ', 'μ − 2σ', 'μ − σ', 'μ', 'μ + σ', 'μ + 2σ', 'μ + 3σ'];
    S.xAxis(root, F, -3.7, 3.7, [-3, -2, -1, 0, 1, 2, 3].map(function (z, i) { return [z, NAMES[i]]; }), '');
    var l1 = label(root, F.X(0), F.Y(.2), '68%', 's06-big', { opacity: 0, style: 'font-size:46px' });
    function bracket(z, y, color, txt) {
      var g = svg('g', { opacity: 0 }, root);
      line(g, F.X(-z), y, F.X(z), y, color, 4);
      line(g, F.X(-z), y - 9, F.X(-z), y + 9, color, 4);
      line(g, F.X(z), y - 9, F.X(z), y + 9, color, 4);
      label(g, F.X(z) + 14, y + 10, txt, 's06-label s06-bold', { 'text-anchor': 'start', style: 'fill:' + color });
      return g;
    }
    var l2 = bracket(2, 352, C.model, '95%'), l3 = bracket(3, 384, C.third, '99,7%');
    var ms = svg('g', { opacity: 0 }, root);
    [140, 150, 160, 170, 180, 190, 200].forEach(function (v, i) { label(ms, F.X(i - 3), 426, String(v), 's06-label s06-white'); });
    label(ms, F.X(3) + 50, 426, 'cm', 's06-small', { 'text-anchor': 'start' });
    var rng = svg('text', { x: 550, y: 470, 'text-anchor': 'middle', 'class': 's06-label s06-bold' }, ms);
    [['160–180', C.data], ['   ·   ', C.muted], ['150–190', C.model], ['   ·   ', C.muted], ['140–200 cm', C.third]].forEach(function (p) {
      svg('tspan', { style: 'fill:' + p[1] + ';white-space:pre' }, rng).textContent = p[0];
    });
    tl.addLabel('s0');
    tl.to(b1, { opacity: .6, duration: .5 }).to(l1, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(b2, { opacity: .35, duration: .5 }).to(l2, { opacity: 1, duration: .3 }).addLabel('s2');
    tl.to(b3, { opacity: .3, duration: .5 }).to(l3, { opacity: 1, duration: .3 }).addLabel('s3');
    tl.to(ms, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // Campana del servizio (μ = 200, σ = 20) per le slide delle latenze.
  var serv = bellFn(200, 20);

  // L2-27 (S) · sondaggio s06-4: un pallino rosso a 300 ms (statica).
  (function () {
    var root = document.querySelector('#sondaggio-4 .scene-svg');
    if (!root) return;
    var F = S.frame(120, 320, 60, 940, 112, 92 / .01995);
    svg('path', { d: S.area(serv, 140, 260, 100, F), fill: C.third, opacity: .22 }, root);
    svg('path', { d: S.curve(serv, 120, 320, 200, F), fill: 'none', stroke: C.text, 'stroke-width': 3 }, root);
    S.xAxis(root, F, 120, 320, [[140, '140'], [200, '200'], [260, '260'], [300, '300']], 'ms', { unitDy: 0 });
    svg('circle', { cx: F.X(300), cy: F.base - 12, r: 10, fill: C.red }, root);
    label(root, F.X(300), F.base - 34, '300 ms', 's06-label s06-red s06-bold');
  })();

  // L2-28 (S) · z = 5; una curva illustrativa a coda pesante; la lente × 50 sulla coda.
  PSI.scene('sondaggio-4-rivela', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    function heavy(x) {
      var s = .3, m = Math.log(260), ln = x > 0 ? Math.exp(-Math.pow(Math.log(x) - m, 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI)) : 0;
      return .95 * serv(x) + .05 * ln;
    }
    var F = S.frame(120, 420, 40, 640, 180, 7000);
    var Z = S.frame(250, 420, 730, 1150, 180, 7000 * 50);
    svg('rect', { x: 715, y: 14, width: 450, height: 200, rx: 12, fill: '#ffffff06', stroke: '#ffffff40', 'stroke-width': 2, 'stroke-dasharray': '6 5' }, root);
    label(root, 1150, 40, 'lente sulla coda · altezze × 50', 's06-small', { 'text-anchor': 'end' });
    svg('rect', { x: F.X(250), y: 20, width: F.X(420) - F.X(250), height: 160, fill: 'none', stroke: '#ffffff30', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, root);
    var clip = svg('clipPath', { id: 's06-lente' }, svg('defs', {}, root));
    svg('rect', { x: 715, y: 14, width: 450, height: 200 }, clip);
    var hv = svg('g', { opacity: 0 }, root);
    svg('path', { d: S.curve(heavy, 120, 420, 240, F), fill: 'none', stroke: C.model, 'stroke-width': 3.5 }, hv);
    svg('path', { d: S.curve(heavy, 250, 420, 200, Z), fill: 'none', stroke: C.model, 'stroke-width': 3.5, 'clip-path': 'url(#s06-lente)' }, hv);
    [282, 305, 330, 352, 385].forEach(function (x) {
      svg('circle', { cx: Z.X(x), cy: Z.Y(heavy(x) * .45), r: 7, fill: C.red }, hv);
    });
    label(hv, Z.X(395), Z.Y(heavy(395)) - 16, 'latenze lente', 's06-small s06-red', { 'text-anchor': 'middle' });
    svg('path', { d: S.curve(serv, 120, 420, 240, F), fill: 'none', stroke: C.text, 'stroke-width': 2.5 }, root);
    svg('path', { d: S.curve(serv, 250, 420, 200, Z), fill: 'none', stroke: C.text, 'stroke-width': 2.5, 'clip-path': 'url(#s06-lente)' }, root);
    S.xAxis(root, F, 120, 420, [[140, '140'], [200, '200'], [260, '260'], [300, '300'], [360, '360']], 'ms', { unitDy: 0 });
    S.xAxis(root, Z, 250, 420, [[260, '260'], [300, '300'], [360, '360'], [400, '400']], '');
    label(hv, F.X(330), 70, 'coda pesante (illustrativa)', 's06-small s06-model', { 'text-anchor': 'middle' });
    var l1 = q.one('.ht-1'), l3 = q.one('.ht-3');
    gsap.set([l1, l3], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(l1, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(hv, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(l3, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L2-06 · una campana simmetrica attorno al valore corretto (statica).
  (function () {
    var root = document.querySelector('#gn-normale .scene-svg');
    if (!root) return;
    var F = S.frame(-4, 4, 20, 440, 300, 240 / .4);
    svg('path', { d: S.area(std, -4, 4, 160, F), fill: C.model, opacity: .18 }, root);
    svg('path', { d: S.curve(std, -4, 4, 160, F), fill: 'none', stroke: C.model, 'stroke-width': 5 }, root);
    line(root, F.X(-4), F.base, F.X(4), F.base, C.axis, 2);
    line(root, F.X(0), F.base, F.X(0), F.Y(.4) - 10, C.muted, 2, { 'stroke-dasharray': '6 5' });
    label(root, F.X(0), F.base + 34, 'valore corretto', 's06-small');
    label(root, F.X(-2.6), F.base + 34, '← errori in difetto', 's06-tiny');
    label(root, F.X(2.6), F.base + 34, 'errori in eccesso →', 's06-tiny');
  })();

  // L2-08 · le quattro normali del pacco (densità e ripartizione), poi μ che trasla, poi σ che allarga.
  PSI.scene('gn-curve', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var SETS = [[0, .2, '#38bdf8'], [0, 1, '#ff6b6b'], [0, 5, '#fbbf24'], [-2, .5, '#38ef7d']];
    var gA = svg('g', {}, root), gB = svg('g', { opacity: 0 }, root), gC = svg('g', { opacity: 0 }, root);
    var L = S.frame(-5, 5, 60, 560, 370, 300 / .95), R = S.frame(-5, 5, 650, 1150, 370, 300);
    [L, R].forEach(function (F, k) {
      S.xAxis(gA, F, -5, 5, [-4, -2, 0, 2, 4].map(function (v) { return [v, it(v, 0)]; }));
      line(gA, F.X(-5), F.base, F.X(-5), 50, C.axis, 2);
      label(gA, (F.X(-5) + F.X(5)) / 2, 40, k ? 'funzione di ripartizione Φ(x)' : 'densità φ(x)', 's06-small');
    });
    SETS.forEach(function (st, i) {
      var s = Math.sqrt(st[1]);
      svg('path', { d: S.curve(bellFn(st[0], s), -5, 5, 200, L), fill: 'none', stroke: st[2], 'stroke-width': 4 }, gA);
      svg('path', { d: S.curve(function (x) { return S.Phi((x - st[0]) / s); }, -5, 5, 200, R), fill: 'none', stroke: st[2], 'stroke-width': 4 }, gA);
      label(gA, L.X(1.6), 90 + 30 * i, 'μ = ' + it(st[0], 0) + ', σ² = ' + it(st[1], st[1] % 1 ? 1 : 0), 's06-small s06-bold', { 'text-anchor': 'start', style: 'fill:' + st[2] });
    });
    var M = S.frame(-6, 6, 110, 1070, 370, 300 / .42);
    S.xAxis(gB, M, -6, 6, [[-2.5, 'μ₁'], [0, 'μ₂'], [2.5, 'μ₃']]);
    [-2.5, 0, 2.5].forEach(function (mu) {
      svg('path', { d: S.curve(bellFn(mu, 1), -6, 6, 200, M), fill: 'none', stroke: C.data, 'stroke-width': 4 }, gB);
      line(gB, M.X(mu), M.base, M.X(mu), M.Y(S.npdf(0, 0, 1)), C.muted, 2, { 'stroke-dasharray': '5 5' });
    });
    var W = S.frame(-6, 6, 110, 1070, 370, 300 / .7);
    S.xAxis(gC, W, -6, 6, [[0, 'μ']]);
    [[.6, '#fb923c', 'σ₁'], [1, '#c084fc', 'σ₂'], [2, '#38bdf8', 'σ₃']].forEach(function (c) {
      svg('path', { d: S.curve(bellFn(0, c[0]), -6, 6, 200, W), fill: 'none', stroke: c[1], 'stroke-width': 4 }, gC);
      label(gC, W.X(c[0] + .15), W.Y(S.npdf(c[0], 0, c[0])) - 8, c[2], 's06-label s06-bold', { 'text-anchor': 'start', style: 'fill:' + c[1] });
      svg('circle', { cx: W.X(c[0]), cy: W.Y(S.npdf(c[0], 0, c[0])), r: 6, fill: c[1] }, gC);
    });
    var cards = q.all('.scene-card');
    gsap.set([cards[1], cards[2]], { opacity: 0 });
    tl.addLabel('s0');
    tl.to([gA, cards[0]], { opacity: 0, duration: .3 }).to([gB, cards[1]], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to([gB, cards[1]], { opacity: 0, duration: .3 }).to([gC, cards[2]], { opacity: 1, duration: .4 }).addLabel('s2');
  });

  // L2-13 · la normale standard, con il 68,3% tra −1 e 1 (statica).
  (function () {
    var root = document.querySelector('#gn-standard .scene-svg');
    if (!root) return;
    var F = S.frame(-4, 4, 70, 580, 330, 270 / .42);
    svg('path', { d: S.area(std, -1, 1, 80, F), fill: '#fbbf24', opacity: .55 }, root);
    svg('path', { d: S.curve(std, -4, 4, 160, F), fill: 'none', stroke: C.data, 'stroke-width': 4.5 }, root);
    S.xAxis(root, F, -4, 4, [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(function (v) { return [v, it(v, 0)]; }));
    S.yAxis(root, F, F.X(-4), .42, [[.1, '0,1'], [.2, '0,2'], [.3, '0,3'], [.4, '0,4']]);
    label(root, F.X(0), F.Y(.17), '68,3%', 's06-big', { style: 'font-size:34px;fill:#1a202c' });
    label(root, F.X(0) + 8, F.Y(.4) - 10, 'μ = 0', 's06-small', { 'text-anchor': 'start' });
    label(root, F.X(1) + 10, F.Y(S.npdf(1, 0, 1)), 'σ = 1', 's06-small', { 'text-anchor': 'start' });
  })();

  // L2-15 · la simmetria: le due code uguali (statica, appare come frammento).
  (function () {
    var root = document.querySelector('#gn-tabella .scene-svg');
    if (!root) return;
    var F = S.frame(-3.6, 3.6, 20, 540, 130, 110 / .4), z = 1.31;
    svg('path', { d: S.area(std, -3.6, -z, 60, F), fill: C.ok, opacity: .6 }, root);
    svg('path', { d: S.area(std, z, 3.6, 60, F), fill: C.ok, opacity: .6 }, root);
    svg('path', { d: S.curve(std, -3.6, 3.6, 160, F), fill: 'none', stroke: C.text, 'stroke-width': 3 }, root);
    line(root, F.X(-3.6), F.base, F.X(3.6), F.base, C.axis, 2);
    label(root, F.X(-z), F.base + 26, '−z', 's06-small');
    label(root, F.X(z), F.base + 26, 'z', 's06-small');
    label(root, F.X(-2.5), F.Y(.12), 'Φ(−z)', 's06-small s06-ok s06-bold');
    label(root, F.X(2.6), F.Y(.12), '1 − Φ(z)', 's06-small s06-ok s06-bold');
  })();

  // L2-26 · il problema inverso: la soglia scorre finché a sinistra resta il 3% (redditi, μ = 900, σ = 200).
  PSI.scene('quantili', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var inc = bellFn(900, 200);
    var F = S.frame(200, 1600, 80, 1040, 260, 200 / .002);
    var left = svg('path', { fill: C.ok, opacity: .5 }, root);
    svg('path', { d: S.curve(inc, 200, 1600, 200, F), fill: 'none', stroke: C.text, 'stroke-width': 3.5 }, root);
    var xt = [];
    for (var v = 300; v <= 1500; v += 200) xt.push([v, String(v)]);
    S.xAxis(root, F, 200, 1600, xt, 'monete');
    var bar = line(root, 0, F.base + 10, 0, 40, C.ok, 4);
    var xl = label(root, 0, 30, '', 's06-label s06-ok s06-bold');
    var cnt = label(root, 1040, 90, '', 's06-big s06-ok', { 'text-anchor': 'end' });
    label(root, 1040, 126, 'area a sinistra della soglia', 's06-small', { 'text-anchor': 'end' });
    var X03 = 900 + 200 * -1.8808;
    var st = { x: 900 };
    function render() {
      left.setAttribute('d', S.area(inc, 200, st.x, 80, F));
      bar.setAttribute('x1', F.X(st.x)); bar.setAttribute('x2', F.X(st.x));
      xl.setAttribute('x', F.X(st.x)); xl.textContent = it(st.x, 0);
      cnt.textContent = it(100 * S.Phi((st.x - 900) / 200), 1) + ' %';
    }
    render();
    var l2 = q.one('.pq-2'), l3 = q.one('.pq-3');
    gsap.set([l2, l3], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { x: X03, duration: 3, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(l2, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(l3, { opacity: 1, duration: .4 }).addLabel('s3');
  });
})();
