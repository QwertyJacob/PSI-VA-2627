/* Date, ritratti e ragionamenti storici: ogni passaggio è uno step Reveal. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', RED = '#ff6b6b';
  function label(root, x, y, value, cls) {
    return text(root, x, y, value, cls || 's03-label', { 'text-anchor': 'middle' });
  }
  function coin(root, x, y, value, color) {
    var g = svg('g', {}, root);
    svg('circle', { cx: x, cy: y, r: 34, fill: color + '20', stroke: color, 'stroke-width': 3 }, g);
    label(g, x, y + 10, value, 's03-math');
    return g;
  }
  function dice(root, x, y, size) {
    var g = svg('g', {}, root);
    svg('rect', { x: x, y: y, width: size, height: size, rx: size * .15, fill: '#edf2f7' }, g);
    [0.27, 0.73].forEach(function (dx) {
      [.24, .5, .76].forEach(function (dy) {
        svg('circle', { cx: x + dx * size, cy: y + dy * size, r: size * .075, fill: '#142030' }, g);
      });
    });
    return g;
  }

  PSI.scene('dalembert', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var cards = [], seq = ['T', 'CT', 'CC'];
    label(root, 440, 37, 'Ci si ferma alla prima testa.', 's03-small');
    seq.forEach(function (s, i) {
      var g = svg('g', {}, root), x = 40 + i * 280;
      svg('rect', { x: x, y: 78, width: 245, height: 230, rx: 16, fill: '#ffffff06', stroke: '#ffffff30' }, g);
      if (s.length === 1) coin(g, x + 122, 150, 'T', A);
      else { coin(g, x + 76, 150, s[0], B); coin(g, x + 165, 150, s[1], s[1] === 'T' ? A : B); }
      label(g, x + 122, 237, s, 's03-big');
      label(g, x + 122, 282, i < 2 ? 'almeno una T' : 'nessuna T', 's03-small');
      cards.push(g);
    });
    gsap.set([cards, q.one('.da-claim'), q.one('.da-question')], { opacity: 0 });
    tl.to(cards[0], { opacity: 1, duration: .5 }).addLabel('s0');
    tl.to(cards.slice(1), { opacity: 1, duration: .5, stagger: .25 }).addLabel('s1');
    tl.to(q.one('.da-claim'), { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(q.one('.da-question'), { opacity: 1, duration: .6 }).addLabel('s3');
  });

  function field(root, score) {
    svg('rect', { x: 60, y: 58, width: 760, height: 175, rx: 10, fill: '#38ef7d08', stroke: '#38ef7d65', 'stroke-width': 2 }, root);
    svg('line', { x1: 440, y1: 58, x2: 440, y2: 233, stroke: '#38ef7d50' }, root);
    svg('circle', { cx: 440, cy: 145, r: 45, fill: 'none', stroke: '#38ef7d50' }, root);
    svg('rect', { x: 60, y: 106, width: 36, height: 75, fill: 'none', stroke: '#38ef7d65' }, root);
    svg('rect', { x: 784, y: 106, width: 36, height: 75, fill: 'none', stroke: '#38ef7d65' }, root);
    label(root, 280, 33, 'A', 's03-label s03-a');
    label(root, 600, 33, 'B', 's03-label s03-b');
    var scores = svg('g', {}, root);
    label(scores, 280, 172, score[0], 's03-score s03-a');
    label(scores, 600, 172, score[1], 's03-score s03-b');
    label(root, 440, 272, 'Traguardo: 60 punti · ogni goal vale 10', 's03-label');
    return scores;
  }

  PSI.scene('pacioli', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var scores = field(root, [50, 20]);
    var pot = svg('g', {}, root);
    svg('rect', { x: 90, y: 300, width: 500, height: 28, rx: 3, fill: A }, pot);
    svg('rect', { x: 590, y: 300, width: 200, height: 28, rx: 3, fill: B }, pot);
    label(pot, 440, 321, '10 ducati', 's03-small s03-pot');
    gsap.set([scores, pot, q.one('.pa-rule'), q.one('.pa-share')], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(scores, { opacity: 1, duration: .6 }).addLabel('s1');
    tl.to(q.one('.pa-rule'), { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to([pot, q.one('.pa-share')], { opacity: 1, duration: .6 }).addLabel('s3');
  });

  PSI.scene('tartaglia', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    field(root, [10, 0]);
    var pot = svg('g', {}, root);
    svg('rect', { x: 100, y: 300, width: 680, height: 32, rx: 4, fill: A }, pot);
    label(pot, 440, 324, '100% ad A · 0% a B', 's03-label s03-pot');
    var cross = svg('path', { d: 'M 92 293 L 788 339 M 788 293 L 92 339', 'class': 's03-cross' }, root);
    gsap.set([pot, q.one('.ta-rule'), q.one('.ta-objection')], { opacity: 0 });
    gsap.set(cross, { strokeDasharray: 1400, strokeDashoffset: 1400 });
    tl.addLabel('s0');
    tl.to([pot, q.one('.ta-rule')], { opacity: 1, duration: .6 }).addLabel('s1');
    tl.to(cross, { strokeDashoffset: 0, duration: .7 })
      .to(q.one('.ta-objection'), { opacity: 1, duration: .5 }, '<.3').addLabel('s2');
  });

  PSI.scene('de-mere', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var left = svg('g', {}, root), right = svg('g', {}, root);
    svg('rect', { x: 15, y: 5, width: 400, height: 255, rx: 16, fill: '#ffffff06', stroke: '#ffffff25' }, left);
    svg('rect', { x: 455, y: 5, width: 400, height: 255, rx: 16, fill: '#ffffff06', stroke: '#ffffff25' }, right);
    dice(left, 185, 26, 58);
    dice(right, 586, 26, 58); dice(right, 665, 26, 58);
    label(left, 215, 123, 'Almeno un sei', 's03-label');
    label(left, 215, 174, '4 lanci', 's03-big');
    label(left, 215, 217, '6 esiti per lancio', 's03-small');
    label(right, 655, 123, 'Almeno un doppio sei', 's03-label');
    label(right, 655, 174, '24 lanci', 's03-big');
    label(right, 655, 217, '36 esiti per lancio', 's03-small');
    var ratio = label(root, 440, 296, '4 / 6 = 24 / 36', 's03-math');
    var falseBlock = svg('g', {}, root);
    label(falseBlock, 440, 350, '⇒ stessa probabilità di vincere', 's03-math');
    label(falseBlock, 440, 393, 'P = 2/3 in entrambi i giochi', 's03-label');
    var strike = svg('path', { d: 'M 120 322 L 760 404 M 760 322 L 120 404', 'class': 's03-cross' }, root);
    var verdict = svg('g', {}, root);
    svg('rect', { x: 263, y: 321, width: 354, height: 87, rx: 8, fill: '#131a25', stroke: RED, 'stroke-width': 3 }, verdict);
    label(verdict, 440, 385, 'FALSO', 's03-stamp');
    var foot = label(root, 440, 428, 'I successi in lanci diversi possono sovrapporsi.', 's03-small s03-red');
    gsap.set([right, ratio, falseBlock, verdict, foot], { opacity: 0 });
    gsap.set(strike, { strokeDasharray: 1300, strokeDashoffset: 1300 });
    tl.addLabel('s0');
    tl.to(right, { opacity: 1, duration: .7 }).addLabel('s1');
    tl.to(ratio, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(falseBlock, { opacity: 1, duration: .7 }).addLabel('s3');
    tl.to(strike, { strokeDashoffset: 0, duration: .6 })
      .to(falseBlock, { opacity: .22, duration: .3 }, '<')
      .to(verdict, { opacity: 1, duration: .35 })
      .to(foot, { opacity: 1, duration: .35 }).addLabel('s4');
  });
})();
