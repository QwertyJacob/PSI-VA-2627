/* Lezione 2, spiegazione del docente: la varianza (pacco «7. Variabili aleatorie», PSI 25/26). I tre revisori e tre PMF con lo stesso valore atteso. */
(function () {
  'use strict';
  var svg = PSI.svg, C = S05.C, label = S05.label, line = S05.line, it = S05.it;
  var bar = S05.bar, fulcrum = S05.fulcrum, grow = S05.grow;

  // L2-V02 · i tre revisori con il testo del pacco a fianco: voti da 18 a 30, voto meritato 24.
  PSI.scene('dv-revisori', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var BASE = 290, U = 360, DX = 14, TRUE = 24;
    // Le stesse PMF della V-02: A triangolare su 18–30, B stretta su 24, C stretta su 21.
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

  // L2-V03 · tre PMF su 1–5 con valore atteso 3, nel formato dei grafici del pacco: riquadro e griglia da 0 a 0,6.
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
