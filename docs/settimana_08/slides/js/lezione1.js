/*
 * Settimana 8, Lezione 1: San Pietroburgo (il meccanismo di Čebyšëv), la
 * distribuzione nota (pacco «14. Disuguaglianze», pp. 2–8), Markov con
 * l'indicatrice (pp. 10–11 e notebook 4.2.4), Čebyšëv (pp. 12–16), il prezzo
 * dell'universalità e il widget. Utilità in comuni.js.
 */
window.S08L1 = (function () {
  'use strict';
  var svg = PSI.svg, S = S08, C = S.C, label = S.label, line = S.line, it = S.it;

  // L1-01 · lavagna del riepilogo: i quattro quadranti con i segni dei prodotti.
  PSI.scene('riepilogo-s7', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var g = svg('g', {}, root);
    svg('rect', { x: 40, y: 20, width: 140, height: 95, fill: C.model, opacity: .16 }, g);
    svg('rect', { x: 180, y: 20, width: 140, height: 95, fill: C.data, opacity: .16 }, g);
    svg('rect', { x: 40, y: 115, width: 140, height: 95, fill: C.data, opacity: .16 }, g);
    svg('rect', { x: 180, y: 115, width: 140, height: 95, fill: C.model, opacity: .16 }, g);
    line(g, 40, 115, 320, 115, C.axis, 2, { 'stroke-dasharray': '6 5' });
    line(g, 180, 20, 180, 210, C.axis, 2, { 'stroke-dasharray': '6 5' });
    label(g, 250, 78, '+', 's08-big s08-data');
    label(g, 110, 175, '+', 's08-big s08-data');
    label(g, 110, 78, '−', 's08-big s08-model');
    label(g, 250, 175, '−', 's08-big s08-model');
    var r = PSI.random(7);
    for (var i = 0; i < 40; i++) {
      var x = r() * 2 - 1, y = .7 * x + .5 * (r() * 2 - 1);
      svg('circle', { cx: 180 + 120 * x, cy: 115 - 80 * y, r: 4, fill: C.text, opacity: .75 }, g);
    }
    gsap.set(g, { opacity: 0 });
    tl.to(g, { opacity: 1, duration: .6 }).addLabel('s0');
  });

  // L1-02 · San Pietroburgo: il meccanismo lambda di Čebyšëv.
  // Manovella AB = 1, telaio AD = 2, bilanciere DC = 2,5, biella BC = 2,5
  // prolungata fino a P (CP = 2,5): P percorre un tratto quasi rettilineo.
  PSI.scene('pietroburgo', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), items = q.all('.pb-time li');
    var X = function (x) { return 100 + 80 * x; }, Y = function (y) { return 420 - 80 * y; };
    function pos(th) {
      var B = [Math.cos(th), Math.sin(th)], D = [2, 0];
      var dx = D[0] - B[0], dy = D[1] - B[1], d = Math.hypot(dx, dy), a = d / 2, h = Math.sqrt(2.5 * 2.5 - a * a);
      var mx = B[0] + dx / 2, my = B[1] + dy / 2;
      var c1 = [mx - h * dy / d, my + h * dx / d], c2 = [mx + h * dy / d, my - h * dx / d];
      var Cc = c1[1] > c2[1] ? c1 : c2;
      return { B: B, C: Cc, P: [2 * Cc[0] - B[0], 2 * Cc[1] - B[1]] };
    }
    var g = svg('g', {}, root);
    // Il tratto quasi rettilineo (da θ = 60° a 300°), evidenziato all'ultimo passo.
    var straight = line(g, X(-0.35), Y(4), X(4.35), Y(4), C.ok, 10, { opacity: 0, 'stroke-linecap': 'round' });
    var trace = svg('polyline', { points: '', fill: 'none', stroke: C.ok, 'stroke-width': 3 }, g);
    // Telaio: due perni fissi.
    [[0, 0], [2, 0]].forEach(function (p) {
      svg('path', { d: 'M' + X(p[0]) + ' ' + Y(p[1]) + ' l-16 26 l32 0 z', fill: 'none', stroke: C.muted, 'stroke-width': 3 }, g);
      line(g, X(p[0]) - 26, Y(p[1]) + 27, X(p[0]) + 26, Y(p[1]) + 27, C.muted, 3);
    });
    var crank = line(g, 0, 0, 0, 0, C.model, 8, { 'stroke-linecap': 'round' });
    var rocker = line(g, 0, 0, 0, 0, C.data, 8, { 'stroke-linecap': 'round' });
    var coupler = line(g, 0, 0, 0, 0, C.text, 8, { 'stroke-linecap': 'round' });
    var jB = svg('circle', { r: 8, fill: C.dark, stroke: C.model, 'stroke-width': 3 }, g);
    var jC = svg('circle', { r: 8, fill: C.dark, stroke: C.data, 'stroke-width': 3 }, g);
    var jP = svg('circle', { r: 11, fill: C.ok }, g);
    [[0, 0], [2, 0]].forEach(function (p) { svg('circle', { cx: X(p[0]), cy: Y(p[1]), r: 7, fill: C.muted }, g); });
    var lab = label(g, X(2), Y(4) + 36, 'quasi una retta', 's08-label s08-ok', { opacity: 0 });
    var st = { th: 90 };
    function render() {
      var t = st.th * Math.PI / 180, p = pos(t);
      crank.setAttribute('x1', X(0)); crank.setAttribute('y1', Y(0)); crank.setAttribute('x2', X(p.B[0])); crank.setAttribute('y2', Y(p.B[1]));
      rocker.setAttribute('x1', X(2)); rocker.setAttribute('y1', Y(0)); rocker.setAttribute('x2', X(p.C[0])); rocker.setAttribute('y2', Y(p.C[1]));
      coupler.setAttribute('x1', X(p.B[0])); coupler.setAttribute('y1', Y(p.B[1])); coupler.setAttribute('x2', X(p.P[0])); coupler.setAttribute('y2', Y(p.P[1]));
      jB.setAttribute('cx', X(p.B[0])); jB.setAttribute('cy', Y(p.B[1]));
      jC.setAttribute('cx', X(p.C[0])); jC.setAttribute('cy', Y(p.C[1]));
      jP.setAttribute('cx', X(p.P[0])); jP.setAttribute('cy', Y(p.P[1]));
      var pts = [];
      for (var a = 90; a <= st.th + 1e-9; a += 3) { var pp = pos(a * Math.PI / 180).P; pts.push(X(pp[0]).toFixed(1) + ',' + Y(pp[1]).toFixed(1)); }
      trace.setAttribute('points', pts.join(' '));
    }
    render();
    gsap.set(g, { opacity: 0 });
    gsap.set(items, { opacity: .15 });
    tl.to(g, { opacity: 1, duration: .6 }).addLabel('s0');
    tl.to(st, { th: 450, duration: 3.2, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(straight, { opacity: .45, duration: .5 }).to(lab, { opacity: 1, duration: .4 }, '<').addLabel('s2');
    for (var i = 0; i < items.length; i++) tl.to(items[i], { opacity: 1, duration: .4 }).addLabel('s' + (3 + i));
  });

  // L1-06 · la regola 68–95–99,7 (pacco 14, p. 5), con i valori esatti.
  PSI.scene('regola-68', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X = S.scale(-3.6, 3.6, 60, 1040), BASE = 420, H = 255;
    function Y(z) { return BASE - H * S.npdf(z) / S.npdf(0); }
    var bands = [[3, '99,73%', C.third, 45], [2, '95,45%', C.model, 90], [1, '68,27%', C.data, 135]].map(function (b) {
      var pts = [[X(-b[0]), BASE]];
      for (var z = -b[0]; z <= b[0] + 1e-9; z += .05) pts.push([X(z), Y(z)]);
      pts.push([X(b[0]), BASE]);
      var g = svg('g', { opacity: 0 }, root);
      S.area(g, pts, b[2], .32);
      line(g, X(-b[0]), b[3], X(b[0]), b[3], b[2], 3);
      line(g, X(-b[0]), b[3] - 10, X(-b[0]), b[3] + 10, b[2], 3);
      line(g, X(b[0]), b[3] - 10, X(b[0]), b[3] + 10, b[2], 3);
      label(g, X(0), b[3] - 10, b[1], 's08-label', { fill: b[2], 'font-weight': 700 });
      return g;
    });
    var pts = [];
    for (var z = -3.6; z <= 3.6 + 1e-9; z += .05) pts.push([X(z), Y(z)]);
    var curve = S.poly(root, pts, C.text, 4);
    line(root, X(-3.6), BASE, X(3.6), BASE, C.axis, 2);
    [[-3, 'μ−3σ'], [-2, 'μ−2σ'], [-1, 'μ−σ'], [0, 'μ'], [1, 'μ+σ'], [2, 'μ+2σ'], [3, 'μ+3σ']].forEach(function (t) {
      line(root, X(t[0]), BASE, X(t[0]), BASE + 8, C.axis, 2);
      label(root, X(t[0]), BASE + 34, t[1], 's08-small');
    });
    PSI.draw(tl, curve, 1400, { duration: .8 });
    tl.addLabel('s0');
    tl.to(bands[2], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(bands[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(bands[0], { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-07 · l'uniforme su [α, β] e l'intervallo μ ± σ (disegno senza passi).
  PSI.scene('nota-uniforme', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X = S.scale(0, 1, 70, 480), BASE = 250, TOP = 70, s = 1 / Math.sqrt(12);
    line(root, 30, BASE, 520, BASE, C.axis, 2);
    S.area(root, [[X(.5 - s), BASE], [X(.5 - s), TOP], [X(.5 + s), TOP], [X(.5 + s), BASE]], C.ok, .3);
    S.poly(root, [[30, BASE], [X(0), BASE], [X(0), TOP], [X(1), TOP], [X(1), BASE], [520, BASE]], C.data, 4);
    [[0, 'α'], [.5 - s, 'μ−σ'], [.5, 'μ'], [.5 + s, 'μ+σ'], [1, 'β']].forEach(function (t) {
      line(root, X(t[0]), BASE, X(t[0]), BASE + 8, C.axis, 2);
      label(root, X(t[0]), BASE + 34, t[1], 's08-small');
    });
    label(root, X(.5), TOP + 90, '2σ', 's08-label s08-ok', { 'font-weight': 700 });
    label(root, X(.5), TOP - 14, 'altezza 1/(β − α)', 's08-small');
    tl.addLabel('s0');
  });

  // L1-08 · tre distribuzioni, stessa domanda (figura F1 della dispensa).
  PSI.scene('tre-risposte', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), ask = q.one('.tr-ask');
    var panels = [['normale', '68,3%', function (z) { return S.npdf(z); }, -3, 3, .42],
      ['uniforme', '57,7%', function (z) { return Math.abs(z) <= Math.sqrt(3) ? 1 / (2 * Math.sqrt(3)) : 0; }, -3, 3, .42],
      ['esponenziale', '86,5%', function (z) { return z >= -1 ? Math.exp(-(z + 1)) : 0; }, -1.4, 4, 1.05]];
    var groups = panels.map(function (p, i) {
      var g = svg('g', { opacity: 0 }, root), X0 = 30 + i * 375, W = 330, BASE = 300, TOP = 70;
      var X = S.scale(p[3], p[4], X0, X0 + W);
      function Y(v) { return BASE - v / p[5] * (BASE - TOP); }
      var zs = [];
      for (var k = 0; k <= 240; k++) zs.push(p[3] + (p[4] - p[3]) * k / 240);
      if (i === 1) zs = zs.concat([-Math.sqrt(3) - 1e-6, -Math.sqrt(3), Math.sqrt(3), Math.sqrt(3) + 1e-6]).sort(function (a, b) { return a - b; });
      if (i === 2) zs = zs.concat([-1 - 1e-6, -1]).sort(function (a, b) { return a - b; });
      var inside = [[X(-1), BASE]];
      zs.forEach(function (z) { if (z >= -1 && z <= 1) inside.push([X(z), Y(p[2](z))]); });
      inside.push([X(1), Y(p[2](1))], [X(1), BASE]);
      S.area(g, inside, C.ok, .32);
      S.poly(g, zs.map(function (z) { return [X(z), Y(p[2](z))]; }), C.data, 3.5);
      line(g, X0, BASE, X0 + W, BASE, C.axis, 2);
      [[-1, 'μ−σ'], [0, 'μ'], [1, 'μ+σ']].forEach(function (t) {
        line(g, X(t[0]), BASE, X(t[0]), BASE + 7, C.axis, 2);
        label(g, X(t[0]), BASE + 30, t[1], 's08-tick');
      });
      label(g, X0 + W / 2, 40, p[0], 's08-label', { 'font-weight': 700 });
      label(g, X0 + W / 2, BASE + 72, p[1], 's08-big s08-ok');
      return g;
    });
    gsap.set(ask, { opacity: 0 });
    tl.to([groups[0], groups[1]], { opacity: 1, duration: .5 }).addLabel('s0');
    tl.to(groups[2], { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(ask, { opacity: 1, duration: .4 }).addLabel('s2');
  });

  // L1-11 · i redditi (notebook 4.2.4): dieci persone, media 1000 €.
  PSI.scene('redditi', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), notes = q.all('.rd-note');
    var vari = [800, 1500, 600, 1200, 900, 2000, 700, 1100, 500, 700], estremo = [10000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var BASE = 330, TOP = 40, X0 = 260;
    function Y(v) { return BASE - v / 10000 * (BASE - TOP); }
    line(root, X0 - 20, BASE, 1080, BASE, C.axis, 2);
    line(root, X0 - 20, Y(10000), 1080, Y(10000), C.red, 2, { 'stroke-dasharray': '8 6' });
    line(root, X0 - 20, Y(1000), 1080, Y(1000), C.model, 2, { 'stroke-dasharray': '8 6' });
    label(root, X0 - 30, Y(10000) + 8, '10 000 €', 's08-small s08-red', { 'text-anchor': 'end' });
    label(root, X0 - 30, Y(1000) + 8, 'media 1000 €', 's08-small s08-model', { 'text-anchor': 'end' });
    var bars = vari.map(function (v, i) {
      return svg('rect', { x: X0 + 10 + i * 80, width: 60, y: Y(v), height: BASE - Y(v), fill: C.data }, root);
    });
    var st = { t: 0 };
    function render() {
      bars.forEach(function (b, i) {
        var v = vari[i] + (estremo[i] - vari[i]) * st.t;
        b.setAttribute('y', Y(v)); b.setAttribute('height', BASE - Y(v));
        b.setAttribute('fill', i === 0 && st.t > .5 ? C.red : C.data);
      });
    }
    render();
    gsap.set(notes, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { t: 1, duration: 1.2, ease: 'power2.inOut', onUpdate: render }).to(notes[0], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(notes[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(notes[2], { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-13 · la dimostrazione di Markov (pacco 14, p. 11): X ≥ a · I.
  PSI.scene('markov-dim', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), steps = q.all('.s08-steps p');
    var X = S.scale(0, 10, 70, 500), Y = S.scale(0, 10, 400, 40), a = 4;
    S.axes(root, { x: 70, y: 40, w: 430, h: 360 }, [[X(0), '0'], [X(a), 'a'], [X(10), '']], [[Y(a), 'a'], [Y(0), '0']]);
    label(root, X(10), 385, 'valori di X', 's08-small', { 'text-anchor': 'end' });
    var diag = S.poly(root, [[X(0), Y(0)], [X(10), Y(10)]], C.data, 4);
    label(root, X(9.2), Y(9.2) - 18, 'X', 's08-label s08-data', { 'font-weight': 700 });
    var step = svg('g', { opacity: 0 }, root);
    S.poly(step, [[X(0), Y(0)], [X(a), Y(0)]], C.model, 7);
    S.poly(step, [[X(a), Y(a)], [X(10), Y(a)]], C.model, 7);
    svg('circle', { cx: X(a), cy: Y(a), r: 8, fill: C.model }, step);
    svg('circle', { cx: X(a), cy: Y(0), r: 8, fill: C.dark, stroke: C.model, 'stroke-width': 3 }, step);
    label(step, X(7.6), Y(a) + 36, 'a · I', 's08-label s08-model', { 'font-weight': 700 });
    var waste = svg('g', { opacity: 0 }, root);
    S.area(waste, [[X(0), Y(0)], [X(a), Y(a)], [X(a), Y(0)]], C.data, .15);
    S.area(waste, [[X(a), Y(a)], [X(10), Y(10)], [X(10), Y(a)]], C.data, .15);
    gsap.set(steps, { opacity: .15 });
    PSI.draw(tl, diag, 560, { duration: .6 });
    tl.addLabel('s0');
    tl.to(steps[0], { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(steps[1], { opacity: 1, duration: .3 }).to(step, { opacity: 1, duration: .4 }, '<').addLabel('s2');
    tl.to(steps[2], { opacity: 1, duration: .3 }).to(waste, { opacity: 1, duration: .4 }, '<').addLabel('s3');
    tl.to(steps[3], { opacity: 1, duration: .3 }).addLabel('s4');
    tl.to(steps[4], { opacity: 1, duration: .3 }).addLabel('s5');
  });

  // L1-26 (S) · widget: il limite di Čebyšëv contro le code vere.
  function widget() {
    var box = document.getElementById('wc-box');
    if (!box) return;
    var sd = box.querySelector('select'), sk = box.querySelector('input'), kv = box.querySelector('[data-v="k"]');
    var root = box.querySelector('svg'), out = box.querySelector('.wc-out');
    function coda(d, k, k0) {
      if (d === 'normale') return 2 * (1 - S.Phi(k));
      if (d === 'uniforme') return Math.max(0, 1 - k / Math.sqrt(3));
      if (d === 'esponenziale') return Math.exp(-(1 + k));
      return k <= k0 + 1e-9 ? 1 / (k0 * k0) : 0;
    }
    function pc(v) { return v === 0 ? '0%' : it(v * 100, v >= .1 ? 1 : (v >= .001 ? 2 : 4)) + '%'; }
    function render() {
      var d = sd.value, k = +sk.value;
      kv.textContent = it(k, 2);
      while (root.firstChild) root.removeChild(root.firstChild);
      var X = S.scale(1, 5, 90, 1080), Y = S.scale(0, 1, 360, 30);
      [0, .25, .5, .75, 1].forEach(function (p) { line(root, 90, Y(p), 1080, Y(p), C.grid, 1.5); });
      S.axes(root, { x: 90, y: 30, w: 990, h: 330 }, [1, 2, 3, 4, 5].map(function (v) { return [X(v), String(v)]; }),
        [0, .25, .5, .75, 1].map(function (p) { return [Y(p), (p * 100) + '%']; }));
      label(root, 585, 418, 'k = distanza dalla media, in deviazioni standard', 's08-small');
      var pb = [], pd = [];
      for (var i = 0; i <= 300; i++) { var v = 1 + 4 * i / 300; pb.push([X(v), Y(1 / (v * v))]); pd.push([X(v), Y(coda(d, v, k))]); }
      S.poly(root, pb, C.model, 5);
      S.poly(root, pd, C.data, 4);
      line(root, X(k), Y(0), X(k), Y(1), C.ok, 3, { 'stroke-dasharray': '8 6' });
      svg('circle', { cx: X(k), cy: Y(1 / (k * k)), r: 9, fill: C.model }, root);
      svg('circle', { cx: X(k), cy: Y(coda(d, k, k)), r: 9, fill: C.data }, root);
      label(root, 1075, 70, 'limite di Čebyšëv: 1/k²', 's08-label s08-model', { 'text-anchor': 'end', 'font-weight': 700 });
      label(root, 1075, 104, 'probabilità vera fuori da μ ± kσ', 's08-label s08-data', { 'text-anchor': 'end', 'font-weight': 700 });
      var b = 1 / (k * k), c = coda(d, k, k);
      out.innerHTML = 'Fuori da μ ± kσ: Čebyšëv garantisce <b class="lim">al più ' + pc(b) + '</b>; per questa distribuzione la probabilità vera è <b class="vera">' + pc(c) + '</b>.' +
        (d === 'tre' ? ' La distribuzione a tre punti per questo k tocca esattamente il limite.' : '');
    }
    sd.addEventListener('change', render);
    sk.addEventListener('input', render);
    box.querySelectorAll('[data-try]').forEach(function (bt) {
      bt.addEventListener('click', function () {
        var t = bt.dataset.try.split(':'); sd.value = t[0]; sk.value = t[1]; render(); this.blur();
      });
    });
    render();
  }

  return { widget: widget };
})();
