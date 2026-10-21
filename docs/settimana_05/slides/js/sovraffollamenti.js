/* Lezione 2, spiegazione del docente: i sovraffollamenti da McDonald's, dalla distribuzione binomiale alla distribuzione di Poisson (n → ∞). */
(function () {
  'use strict';
  var svg = PSI.svg, C = S05.C, label = S05.label;

  // La giornata occupa sempre la stessa fascia: 24 ore su 980 px.
  var BX = 60, BW = 980;
  function hourX(h) { return BX + BW * h / 24; }

  // Una casella oraria in rosso con più sovraffollamenti dentro.
  function crowded(root, h, y, height, offsets) {
    var g = svg('g', {}, root);
    svg('rect', { x: hourX(h) + 2, y: y + 2, width: BW / 24 - 4, height: height - 4, rx: 4, fill: '#ff6b6b22', stroke: C.red, 'stroke-width': 3 }, g);
    offsets.forEach(function (d) { svg('circle', { cx: hourX(h + .5) + d[0], cy: y + height / 2 + d[1], r: 7, fill: C.red }, g); });
    return g;
  }

  // L2-01b · un giorno in 24 ore; in 6 ore un sovraffollamento; due nella stessa ora non sono previsti.
  PSI.scene('mc-locale', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    S05.pieces(root, BX, 16, BW, 56, 24, []);
    [0, 6, 12, 18, 24].forEach(function (h) { label(root, hourX(h), 102, h + ':00', 's05-tiny'); });
    var dots = [2, 8, 12, 13, 19, 20].map(function (h) {
      return svg('circle', { cx: hourX(h + .5), cy: 44, r: 12, fill: C.model }, root);
    });
    var cap = label(root, 550, 140, 'un giorno possibile: 6 ore su 24 con un sovraffollamento', 's05-small');
    var two = crowded(root, 16, 16, 56, [[-9, 0], [9, 0]]);
    label(two, hourX(16.5), 180, 'due nella stessa ora? il modello non lo prevede', 's05-small', { style: 'font-weight:700;fill:' + C.red });
    var s1 = q.one('.mc-s1'), s2 = q.one('.mc-s2'), s3 = q.one('.mc-s3'), warn = q.one('.mc-warn');
    gsap.set(dots, { opacity: 0 });
    gsap.set([cap, two, s1, s2, s3, warn], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(dots, { opacity: 1, duration: .25, stagger: .15 }).to(cap, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(s1, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(s2, { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(s3, { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to([two, warn], { opacity: 1, duration: .4 }).addLabel('s5');
  });

  // L2-01c · la provincia: in un'ora più locali in crisi; l'ora si divide in 30 pezzetti da 2 minuti.
  PSI.scene('mc-provincia', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), H = 13;
    var zoom = svg('g', {}, root);
    svg('path', { d: 'M ' + hourX(H) + ' 82 L ' + hourX(H + 1) + ' 82 L ' + (BX + BW) + ' 160 L ' + BX + ' 160 Z', fill: '#fb923c12', stroke: '#fb923c60', 'stroke-width': 1.5 }, zoom);
    S05.pieces(zoom, BX, 160, BW, 52, 30, [1, 4, 9, 10, 17, 23, 27]);
    label(zoom, BX, 240, '13:00', 's05-tiny', { 'text-anchor': 'start' });
    label(zoom, BX + BW, 240, '14:00', 's05-tiny', { 'text-anchor': 'end' });
    label(zoom, 550, 240, 'un’ora = 30 pezzetti da 2 minuti', 's05-small', { style: 'font-weight:700;fill:' + C.model });
    S05.pieces(root, BX, 36, BW, 46, 24, []);
    [0, 6, 12, 18, 24].forEach(function (h) { label(root, hourX(h), 24, h + ':00', 's05-tiny'); });
    var crowd = crowded(root, H, 36, 46, [[-8, -8], [8, -8], [-8, 8], [8, 8]]);
    var crowdLab = label(root, hourX(H + .5), 126, 'nella stessa ora vanno in crisi più locali', 's05-small', { style: 'font-weight:700;fill:' + C.red });
    var s3 = q.one('.mc-s3'), s4 = q.one('.mc-s4');
    gsap.set([zoom, crowd, crowdLab, s3, s4], { opacity: 0 });
    tl.addLabel('s0');
    tl.to([crowd, crowdLab], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(crowdLab, { opacity: 0, duration: .3 }).to(zoom, { opacity: 1, duration: .5 }, '<').addLabel('s2');
    tl.to(s3, { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(s4, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // L2-01d · tutta Italia: la giornata in 24, 720, 10 000 pezzetti, poi n → ∞; p = λ/n scende, np resta λ.
  PSI.scene('mc-italia', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X0 = 210, W = 830, Y0 = 14, H = 56;
    var STEPS = [
      { n: 24, nl: 'n = 24', piece: 'pezzetti da 1 ora · un locale', p: 'p = λ / 24' },
      { n: 720, nl: 'n = 720', piece: 'pezzetti da 2 minuti · una provincia', p: 'p = λ / 720' },
      { n: 10000, nl: 'n = 10 000', piece: 'pezzetti da 8,6 secondi', p: 'p = λ / 10 000' },
      { n: Infinity, nl: 'n → ∞', piece: 'pezzetti infinitesimali', p: 'p = λ / n → 0,  ma  np = λ  resta fisso' }
    ];
    // Oltre mille pezzetti le righe non si distinguono più: una tinta piena.
    var bars = STEPS.map(function (s) {
      var g;
      if (s.n <= 1000) g = S05.pieces(root, X0, Y0, W, H, s.n, []);
      else {
        g = svg('g', {}, root);
        svg('rect', { x: X0, y: Y0, width: W, height: H, rx: 4, fill: s.n === Infinity ? '#ffffff70' : '#ffffff48', stroke: '#ffffffa0', 'stroke-width': 2 }, g);
      }
      g.setAttribute('opacity', 0);
      return g;
    });
    var nLab = PSI.text(root, X0 - 18, Y0 + H / 2 + 9, '', 's05-label', { 'text-anchor': 'end', style: 'font-weight:700;fill:' + C.model });
    var pieceLab = label(root, X0 + W / 2, Y0 + H + 38, '', 's05-small');
    var pLab = label(root, X0 + W / 2, Y0 + H + 82, '', 's05-label', { style: 'font-weight:700;fill:' + C.model });
    var st = { s: 0 };
    function render() {
      var s = Math.round(st.s), cur = STEPS[s - 1];
      bars.forEach(function (b, i) { b.setAttribute('opacity', i === s - 1 ? 1 : 0); });
      nLab.textContent = cur ? cur.nl : '';
      pieceLab.textContent = cur ? cur.piece : '';
      pLab.textContent = cur ? cur.p : '';
    }
    render();
    var lim = q.one('.mc-lim');
    gsap.set(lim, { opacity: 0 });
    tl.addLabel('s0');
    for (var i = 1; i <= STEPS.length; i++) tl.to(st, { s: i, duration: .5, ease: 'none', onUpdate: render }).addLabel('s' + i);
    tl.to(lim, { opacity: 1, duration: .5 }).addLabel('s' + (STEPS.length + 1));
  });
})();
