/* Atto III: le tre idee di conteggio, il triangolo di Pascal, i futuri di Fermat come coefficienti binomiali. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', C = '#c084fc', G = '#38ef7d', RED = '#ff6b6b', PINK = '#f472b6';
  var SERVER = { A: A, B: B, C: C, D: PINK };
  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's03-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  function binom(n, k) {
    var r = 1;
    for (var i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }
  function len(line) {
    return Math.hypot(line.getAttribute('x2') - line.getAttribute('x1'), line.getAttribute('y2') - line.getAttribute('y1'));
  }
  function line(root, x1, y1, x2, y2, color, width) {
    return svg('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, 'stroke-width': width || 3 }, root);
  }
  // Riquadro colorato con testo scuro: un server, una foglia.
  function tag(root, x, y, value, color, w, h) {
    var g = svg('g', {}, root);
    w = w || 64; h = h || 40;
    g.box = svg('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 8, fill: color }, g);
    label(g, x, y + 8, value, 's03-tag');
    return g;
  }
  // Una parola di server, ogni lettera col suo colore.
  function word(root, x, y, w, size) {
    var g = svg('g', {}, root), step = size * .72, x0 = x - step * (w.length - 1) / 2;
    g.letters = w.split('').map(function (c, i) {
      return text(g, x0 + i * step, y, c, 's03-seq', { 'text-anchor': 'middle', style: 'font-size:' + size + 'px;fill:' + (SERVER[c] || '#edf2f7') });
    });
    return g;
  }
  // Un gruppo da spostare con gsap (x, y) e un rettangolo con una parola al centro.
  function chip(root, w, h, value, size) {
    var g = svg('g', {}, root);
    g.box = svg('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 7, fill: '#ffffff0a', stroke: '#ffffff30', 'stroke-width': 2 }, g);
    g.word = word(g, 0, size * .36, value, size);
    return g;
  }
  function arrowHead(root, id, color) {
    var defs = svg('defs', {}, root);
    var marker = svg('marker', { id: id, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs);
    svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, marker);
  }
  function cat(tl, img) {
    gsap.set(img, { scale: .2, rotation: -12, autoAlpha: 0 });
    return tl.to(img, { scale: 1, rotation: 0, autoAlpha: 1, duration: .7, ease: 'back.out(1.6)' });
  }

  // Prima idea: l'albero 2 × 3 della pagina, poi il controesempio 3 + 2.
  PSI.scene('moltiplicazione', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var R = [90, 230], L1 = { A: [330, 130], B: [330, 330] }, Y2 = { A: [70, 130, 190], B: [270, 330, 390] };
    var head1 = label(root, 330, 26, '1ª scelta: n₁ = 2', 's03-label');
    var head2 = label(root, 640, 26, '2ª scelta: n₂ = 3 da ogni nodo', 's03-label');
    var lines1 = [], nodes1 = [], lines2 = {}, leaves = {}, three = {};
    ['A', 'B'].forEach(function (k) {
      lines1.push(line(root, R[0] + 8, R[1], L1[k][0] - 22, L1[k][1], SERVER[k]));
      lines2[k] = []; leaves[k] = [];
      Y2[k].forEach(function (y, i) {
        lines2[k].push(line(root, L1[k][0] + 22, L1[k][1], 604, y, SERVER[k], 2.5));
        leaves[k].push(tag(root, 640, y, k + (i + 1), SERVER[k], 72, 40));
      });
      var node = svg('g', {}, root);
      svg('circle', { cx: L1[k][0], cy: L1[k][1], r: 22, fill: SERVER[k] }, node);
      label(node, L1[k][0], L1[k][1] + 8, k, 's03-tag');
      nodes1.push(node);
      three[k] = label(root, 700, L1[k][1] + 8, '← 3 foglie', 's03-small', { 'text-anchor': 'start' });
    });
    svg('circle', { cx: R[0], cy: R[1], r: 8, 'class': 's03-node' }, root);
    var count = label(root, 990, 225, '2 · 3 = 6', 's03-big s03-green');
    var countNote = label(root, 990, 265, 'foglie = cammini completi', 's03-small');
    var cross = svg('path', { d: 'M 612 372 L 668 408 M 668 372 L 612 408', 'class': 's03-cross', style: 'stroke-width:6' }, root);
    var two = label(root, 700, 338, '← 2 foglie', 's03-small', { 'text-anchor': 'start' });
    var alt = label(root, 990, 225, '3 + 2 = 5', 's03-big s03-red');
    var altNote = label(root, 990, 265, 'rami diversi per cammino: si somma', 's03-small');
    var rule = q.one('.ml-rule');
    gsap.set([head1, head2, nodes1, leaves.A, leaves.B, three.A, three.B, count, countNote, cross, two, alt, altNote, rule], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(head1, { opacity: 1, duration: .3 });
    lines1.forEach(function (l, i) { PSI.draw(tl, l, len(l), { duration: .6 }, i ? '<' : '>'); });
    tl.to(nodes1, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(head2, { opacity: 1, duration: .3 });
    ['A', 'B'].forEach(function (k) {
      lines2[k].forEach(function (l, i) { PSI.draw(tl, l, len(l), { duration: .45 }, i ? '<.1' : '>'); });
      tl.to(leaves[k], { opacity: 1, duration: .3, stagger: .1 }).to(three[k], { opacity: 1, duration: .3 });
    });
    tl.addLabel('s2');
    tl.to([count, countNote], { opacity: 1, duration: .5 }).to(rule, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to([lines2.B[2], leaves.B[2]], { opacity: .2, duration: .4 })
      .to(cross, { opacity: 1, duration: .3 }, '<')
      .to([three.B, count, countNote], { opacity: 0, duration: .3 }, '<')
      .to([two, alt, altNote], { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // n^k: una password di 8 caratteri, 62 simboli per posto.
  PSI.scene('password', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var ALPH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', FINAL = 'k3Rv9QzT';
    var rnd = PSI.random(62), w = 110, gap = 22, x0 = (1180 - 8 * w - 7 * gap) / 2;
    var chars = [], nums = [], dots = [];
    for (var i = 0; i < 8; i++) {
      var x = x0 + i * (w + gap);
      svg('rect', { x: x, y: 10, width: w, height: 120, rx: 10, fill: '#ffffff07', stroke: '#ffffff45', 'stroke-width': 2 }, root);
      chars.push(label(root, x + w / 2, 94, '', 's03-pw'));
      nums.push(label(root, x + w / 2, 180, '62', 's03-label s03-green'));
      if (i) dots.push(label(root, x - gap / 2, 180, '·', 's03-label'));
    }
    var note = label(root, 590, 235, '26 minuscole + 26 maiuscole + 10 cifre = 62 simboli, per ogni posto', 's03-small');
    var eq = q.one('.pw-eq'), rule = q.one('.pw-rule');
    gsap.set([nums, dots, note, eq, rule], { opacity: 0 });
    tl.addLabel('s0');
    chars.forEach(function (node, i) {
      var o = { p: 0 };
      tl.to(o, {
        p: 1, duration: .5, ease: 'none',
        onUpdate: function () { node.textContent = o.p === 0 ? '' : o.p < 1 ? ALPH[Math.floor(rnd() * 62)] : FINAL[i]; }
      }, i ? '<.12' : '>');
      tl.to(nums[i], { opacity: 1, duration: .2 }, '<');
      if (i) tl.to(dots[i - 1], { opacity: 1, duration: .2 }, '<');
    });
    tl.to(note, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(eq, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(rule, { opacity: 1, duration: .6 }).addLabel('s3');
  });

  // L'albero dei server senza reinserimento: 3 scelte, poi 2 da ogni nodo.
  function serverTree(root) {
    var R = [300, 217], L1 = { A: [540, 87], B: [540, 217], C: [540, 347] };
    var L2 = { AB: 60, AC: 115, BA: 190, BC: 245, CA: 320, CB: 375 }, X2 = 800;
    var t = { lines1: {}, nodes1: {}, lines2: {}, dots: {}, words: {}, pool: {}, used: {} };
    t.poolHead = label(root, 110, 70, 'server liberi', 's03-small');
    t.poolGroup = svg('g', {}, root);
    t.poolGroup.appendChild(t.poolHead);
    ['A', 'B', 'C'].forEach(function (k, i) {
      var y = 120 + i * 97;
      t.pool[k] = tag(t.poolGroup, 110, y, k, SERVER[k], 110, 56);
      t.used[k] = label(t.poolGroup, 110, y + 46, 'occupato', 's03-tiny s03-red');
    });
    t.head1 = label(root, L1.A[0], 24, '1° compito', 's03-label');
    t.head2 = label(root, X2, 24, '2° compito', 's03-label');
    ['A', 'B', 'C'].forEach(function (k) {
      t.lines1[k] = line(root, R[0] + 8, R[1], L1[k][0] - 22, L1[k][1], SERVER[k]);
    });
    Object.keys(L2).forEach(function (w) {
      var from = L1[w[0]], y = L2[w];
      t.lines2[w] = line(root, from[0] + 22, from[1], X2 - 8, y, SERVER[w[1]], 2.5);
      t.dots[w] = svg('circle', { cx: X2, cy: y, r: 8, fill: SERVER[w[1]] }, root);
      t.words[w] = word(root, X2 + 52, y + 10, w, 30);
    });
    ['A', 'B', 'C'].forEach(function (k) {
      var g = svg('g', {}, root);
      svg('circle', { cx: L1[k][0], cy: L1[k][1], r: 22, fill: SERVER[k] }, g);
      label(g, L1[k][0], L1[k][1] + 8, k, 's03-tag');
      t.nodes1[k] = g;
    });
    svg('circle', { cx: R[0], cy: R[1], r: 8, 'class': 's03-node' }, root);
    t.cap1 = label(root, L1.A[0], 415, '3 scelte', 's03-small');
    t.cap2 = label(root, X2, 415, '2 da ogni nodo', 's03-small');
    t.count = label(root, 1060, 230, '3 · 2 = 6', 's03-big s03-green');
    return t;
  }

  PSI.scene('server-albero', function (el, tl) {
    var root = PSI.q(el).one('svg'), t = serverTree(root);
    var nodes = ['A', 'B', 'C'].map(function (k) { return t.nodes1[k]; });
    var used = ['A', 'B', 'C'].map(function (k) { return t.used[k]; });
    var dots = Object.keys(t.dots).map(function (w) { return t.dots[w]; });
    var words = Object.keys(t.words).map(function (w) { return t.words[w]; });
    gsap.set([t.head1, t.head2, nodes, used, dots, words, t.cap1, t.cap2, t.count], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(t.head1, { opacity: 1, duration: .3 });
    ['A', 'B', 'C'].forEach(function (k, i) { PSI.draw(tl, t.lines1[k], len(t.lines1[k]), { duration: .6 }, i ? '<' : '>'); });
    tl.to(nodes, { opacity: 1, duration: .3 }).to(t.cap1, { opacity: 1, duration: .3 }, '<').addLabel('s1');
    ['A', 'B', 'C'].forEach(function (k, j) {
      var kids = Object.keys(t.lines2).filter(function (w) { return w[0] === k; });
      if (j === 0) tl.to(t.head2, { opacity: 1, duration: .3 });
      tl.to(t.pool[k], { opacity: .25, duration: .3 }).to(t.used[k], { opacity: 1, duration: .3 }, '<');
      kids.forEach(function (w, i) { PSI.draw(tl, t.lines2[w], len(t.lines2[w]), { duration: .5 }, i ? '<.1' : '>'); });
      tl.to(kids.map(function (w) { return t.dots[w]; }), { opacity: 1, duration: .3 });
      if (j === 0) tl.to(t.cap2, { opacity: 1, duration: .3 }, '<');
      if (j === 0) tl.addLabel('s2');
      // A resta occupato fino al click successivo; B e C si liberano subito.
      tl.to(t.pool[k], { opacity: 1, duration: .3, delay: j ? .3 : 0 }).to(t.used[k], { opacity: 0, duration: .3 }, '<');
    });
    tl.addLabel('s3');
    tl.to(words, { opacity: 1, duration: .3, stagger: .1 }).to(t.count, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // Lo stesso albero: AB e BA sono due cammini, quindi due foglie.
  PSI.scene('ordine-conta', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg'), t = serverTree(root);
    gsap.set([t.poolGroup, t.cap1, t.cap2], { opacity: 0 });
    var pairs = [['AB', 'BA', G, 975], ['AC', 'CA', PINK, 1010], ['BC', 'CB', '#94a3b8', 1045]];
    var Y = { AB: 60, AC: 115, BA: 190, BC: 245, CA: 320, CB: 375 };
    var arcs = pairs.map(function (p) {
      var y1 = Y[p[0]], y2 = Y[p[1]];
      return svg('path', { d: 'M 905 ' + y1 + ' C ' + p[3] + ' ' + y1 + ', ' + p[3] + ' ' + y2 + ', 905 ' + y2, fill: 'none', stroke: p[2], 'stroke-width': 4 }, root);
    });
    var others = [];
    ['C'].forEach(function (k) { others.push(t.lines1[k], t.nodes1[k]); });
    ['AC', 'BC', 'CA', 'CB'].forEach(function (w) { others.push(t.lines2[w], t.dots[w], t.words[w]); });
    var same = label(root, 1060, 130, 'stessi server', 's03-small');
    var diff = label(root, 1060, 156, 'cammini diversi', 's03-small');
    var note = q.one('.oc-note');
    gsap.set([arcs, same, diff, t.count, note], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(others, { opacity: .15, duration: .5 })
      .to(arcs[0], { opacity: 1, duration: .4 })
      .to([same, diff], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(others, { opacity: 1, duration: .4 }).to([same, diff], { opacity: 0, duration: .3 }, '<')
      .to(arcs.slice(1), { opacity: 1, duration: .4, stagger: .3 }).addLabel('s2');
    tl.to(note, { opacity: 1, duration: .6 }).addLabel('s3');
  });

  // Fattori decrescenti su k posti: n, n−1, …; poi il caso k = n.
  function slots(root, x0, y, w, h, gap, count) {
    var out = [];
    for (var i = 0; i < count; i++) {
      out.push({ x: x0 + i * (w + gap) + w / 2, rect: svg('rect', { x: x0 + i * (w + gap), y: y, width: w, height: h, rx: 10, fill: '#ffffff07', stroke: '#ffffff45', 'stroke-width': 2 }, root) });
    }
    return out;
  }
  PSI.scene('disposizioni', function (el, tl) {
    var q = PSI.q(el), top = q.one('.dp-top'), perm = q.one('.dp-perm');
    var s = slots(top, 330, 36, 150, 92, 50, 3), factors = [], caps = [], times = [];
    ['1° compito', '2° compito', '3° compito'].forEach(function (c, i) { label(top, s[i].x, 24, c, 's03-small'); });
    [['10', '10 liberi'], ['9', 'ne restano 9'], ['8', 'ne restano 8']].forEach(function (f, i) {
      factors.push(label(top, s[i].x, 100, f[0], 's03-big'));
      caps.push(label(top, s[i].x, 160, f[1], 's03-tiny'));
      if (i) times.push(label(top, s[i].x - 100, 98, '·', 's03-big'));
    });
    label(top, 310, 98, 'D(10, 3) =', 's03-label', { 'text-anchor': 'end' });
    var res = label(top, 880, 100, '= 720', 's03-big s03-green', { 'text-anchor': 'start' });
    var p = slots(perm, 330, 14, 110, 70, 30, 3), pf = [], pt = [];
    label(perm, 310, 58, '3 server, 3 posti:', 's03-label', { 'text-anchor': 'end' });
    ['3', '2', '1'].forEach(function (f, i) {
      pf.push(label(perm, p[i].x, 64, f, 's03-big'));
      if (i) pt.push(label(perm, p[i].x - 70, 62, '·', 's03-big'));
    });
    var pres = label(perm, 740, 62, '= 3! = 6', 's03-big s03-green', { 'text-anchor': 'start' });
    var list = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA'].map(function (w, i) { return word(perm, 225 + i * 150, 132, w, 28); });
    var formula = q.one('.dp-formula'), box = q.one('.dp-box');
    gsap.set([factors, caps, times, res, perm, formula, box], { opacity: 0 });
    gsap.set([pf, pt, pres, list], { opacity: 0 });
    tl.addLabel('s0');
    factors.forEach(function (f, i) {
      if (i) tl.to(times[i - 1], { opacity: 1, duration: .2 });
      tl.to([f, caps[i]], { opacity: 1, duration: .4 });
    });
    tl.to(res, { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(formula, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to(perm, { opacity: 1, duration: .4 });
    pf.forEach(function (f, i) {
      if (i) tl.to(pt[i - 1], { opacity: 1, duration: .2 });
      tl.to(f, { opacity: 1, duration: .35 });
    });
    tl.to(pres, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(list, { opacity: 1, duration: .3, stagger: .1 }).to(box, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // 24 disposizioni di 3 server su 4: raggruppate per terna, ogni terna 3! volte.
  PSI.scene('combinazioni', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var SETS = ['ABC', 'ABD', 'ACD', 'BCD'], TINT = [A, B, C, PINK], seqs = [];
    'ABCD'.split('').forEach(function (x) {
      'ABCD'.split('').forEach(function (y) {
        'ABCD'.split('').forEach(function (z) { if (x !== y && y !== z && x !== z) seqs.push(x + y + z); });
      });
    });
    var used = [0, 0, 0, 0], chips = seqs.map(function (w, i) {
      var c = chip(root, 120, 44, w, 28);
      c.set = SETS.indexOf(w.split('').sort().join(''));
      c.row = used[c.set]++;
      gsap.set(c, { x: 140 + (i % 6) * 180, y: 50 + Math.floor(i / 6) * 62 });
      return c;
    });
    var heads = SETS.map(function (s, j) { return label(root, 185 + j * 270, 30, '{' + s.split('').join(', ') + '}', 's03-label', { style: 'fill:' + TINT[j] }); });
    var groups = SETS.map(function (s, j) {
      var g = svg('g', {}, root), x = 185 + j * 270;
      svg('rect', { x: x - 95, y: 155, width: 190, height: 60, rx: 10, fill: TINT[j] + '30', stroke: TINT[j], 'stroke-width': 3 }, g);
      label(g, x, 195, '{' + s.split('').join(', ') + '}', 's03-label');
      return g;
    });
    var cap1 = label(root, 590, 300, 'D(4, 3) = 4 · 3 · 2 = 24 sequenze', 's03-label');
    var cap2 = label(root, 590, 330, 'ogni terna compare in 3! = 6 ordini', 's03-label');
    var cap3 = label(root, 590, 290, '24 ÷ 6 = 4 gruppi', 's03-label s03-green');
    var eq = q.one('.cb-eq'), gen = q.one('.cb-gen');
    gsap.set([chips, heads, groups, cap1, cap2, cap3, eq, gen], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(chips, { opacity: 1, duration: .25, stagger: .03 }).to(cap1, { opacity: 1, duration: .4 }).addLabel('s1');
    chips.forEach(function (c, i) {
      tl.to(c.box, { attr: { fill: TINT[c.set] + '30', stroke: TINT[c.set] }, duration: .4 }, i ? '<.02' : '>');
    });
    tl.addLabel('s2');
    tl.to(cap1, { opacity: 0, duration: .3 });
    chips.forEach(function (c, i) {
      tl.to(c, { x: 185 + c.set * 270, y: 64 + c.row * 44, duration: .8, ease: 'power2.inOut' }, i ? '<' : '>');
    });
    tl.to(heads, { opacity: 1, duration: .4 }).to(cap2, { opacity: 1, duration: .4 }, '<').addLabel('s3');
    tl.to(chips, { y: 185, opacity: 0, duration: .6, ease: 'power2.in' })
      .to(cap2, { opacity: 0, duration: .3 }, '<')
      .to(groups, { opacity: 1, duration: .4, stagger: .1 })
      .to(cap3, { opacity: 1, duration: .4 })
      .to(eq, { opacity: 1, duration: .5 }).addLabel('s4');
    tl.to(gen, { opacity: 1, duration: .6 }).addLabel('s5');
  });

  // Dentro o fuori: le 6 coppie di 4 server, con A e senza A.
  PSI.scene('dentro-fuori', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var PAIRS = ['AB', 'AC', 'AD', 'BC', 'BD', 'CD'];
    var boxes = svg('g', {}, root);
    svg('rect', { x: 110, y: 110, width: 420, height: 190, rx: 16, fill: '#38bdf80f', stroke: A, 'stroke-width': 2.5 }, boxes);
    svg('rect', { x: 650, y: 110, width: 420, height: 190, rx: 16, fill: '#ffffff06', stroke: '#a0aec0', 'stroke-width': 2.5, 'stroke-dasharray': '10 7' }, boxes);
    var hA = [label(root, 320, 150, 'con A', 's03-label s03-a'), label(root, 860, 150, 'senza A', 's03-label')];
    var hX = [label(root, 320, 150, 'contengono x', 's03-label s03-a'), label(root, 860, 150, 'non contengono x', 's03-label')];
    var ci = 0, cj = 0, chips = PAIRS.map(function (w, i) {
      var c = chip(root, 100, 46, w, 30), withA = w[0] === 'A';
      c.dest = withA ? [190 + 130 * ci++, 225] : [730 + 130 * cj++, 225];
      c.withA = withA;
      gsap.set(c, { x: 240 + i * 140, y: 45 });
      return c;
    });
    var fix = label(root, 590, 100, 'fissiamo il server A', 's03-small');
    var nums = q.all('.df-eqs .df-num, .df-total .df-num'), gens = q.all('.df-eqs .df-gen, .df-total .df-gen');
    var eqs = q.all('.df-eqs .df-swap'), total = q.one('.df-total');
    gsap.set([chips, boxes, hA, hX, fix, eqs, total, gens], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(chips, { opacity: 1, duration: .3, stagger: .1 }).addLabel('s1');
    tl.to(fix, { opacity: 1, duration: .3 });
    chips.forEach(function (c, i) {
      if (c.withA) tl.to(c.box, { attr: { stroke: A, fill: '#38bdf826' }, strokeWidth: 4, duration: .3 }, i ? '<.1' : '>');
    });
    tl.addLabel('s2');
    tl.to(fix, { opacity: 0, duration: .3 }).to([boxes, hA], { opacity: 1, duration: .4 }, '<');
    chips.forEach(function (c, i) { tl.to(c, { x: c.dest[0], y: c.dest[1], duration: .8, ease: 'power2.inOut' }, i ? '<.06' : '>'); });
    tl.addLabel('s3');
    tl.to(eqs, { opacity: 1, duration: .5, stagger: .3 }).addLabel('s4');
    tl.to(total, { opacity: 1, duration: .5 }).addLabel('s5');
    tl.to(hA, { opacity: 0, duration: .3 }).to(hX, { opacity: 1, duration: .4 })
      .to(chips, { opacity: .35, duration: .4 }, '<')
      .to(nums, { opacity: 0, duration: .3 }, '<')
      .to(gens, { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // Il triangolo: righe 0–3 insieme, poi l'esercizio, poi le soluzioni e V(2,3).
  PSI.scene('triangolo', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    arrowHead(root, 'tr-arrow', B);
    var cells = {}, W = 96, H = 58, DX = 108;
    function at(n, k) { return [340 + (k - n / 2) * DX, 40 + n * 80]; }
    for (var n = 0; n <= 5; n++) {
      for (var k = 0; k <= n; k++) {
        var p = at(n, k);
        cells[n + ',' + k] = {
          rect: svg('rect', { x: p[0] - W / 2, y: p[1] - H / 2, width: W, height: H, rx: 7, fill: '#ffffff07', stroke: '#ffffff45', 'stroke-width': 2 }, root),
          name: label(root, p[0], p[1] - 9, 'C(' + n + ',' + k + ')', 's03-tiny'),
          value: label(root, p[0], p[1] + 21, String(binom(n, k)), 's03-tv'),
          x: p[0], y: p[1]
        };
      }
    }
    var sums = [];
    for (n = 0; n <= 5; n++) sums.push(label(root, 700, at(n, 0)[1] + 8, 'Σ = ' + Math.pow(2, n), 's03-small s03-green'));
    function values(rows, filter) {
      var out = [];
      rows.forEach(function (n) { for (var k = 0; k <= n; k++) if (!filter || filter(n, k)) out.push(cells[n + ',' + k].value); });
      return out;
    }
    // Le due caselle sopra in blu, frecce, la casella sotto in arancio, poi il valore.
    function sum(n, k, note) {
      var up = [cells[(n - 1) + ',' + (k - 1)], cells[(n - 1) + ',' + k]], c = cells[n + ',' + k];
      var arrows = up.map(function (u) {
        var dx = c.x - u.x;
        return line(root, u.x + dx * .3, u.y + H / 2 - 4, c.x - dx * .3, c.y - H / 2 + 2, B, 2.5);
      });
      arrows.forEach(function (a) { a.setAttribute('marker-end', 'url(#tr-arrow)'); });
      gsap.set(arrows, { opacity: 0 });
      var tip = note ? label(root, c.x + 54, c.y + 40, note, 's03-small', { 'text-anchor': 'start', style: 'fill:' + B }) : null;
      if (tip) gsap.set(tip, { opacity: 0 });
      tl.to(up.map(function (u) { return u.rect; }), { attr: { fill: '#38bdf840', stroke: A }, duration: .25 })
        .to(arrows, { opacity: 1, duration: .25 })
        .to(c.rect, { attr: { fill: '#fbbf2440', stroke: B }, duration: .25 })
        .to(c.value, { opacity: 1, duration: .25 });
      if (tip) tl.to(tip, { opacity: 1, duration: .3 });
      tl.to(up.map(function (u) { return u.rect; }).concat(c.rect), { attr: { fill: '#ffffff07', stroke: '#ffffff45' }, duration: .25, delay: note ? .6 : .15 })
        .to(arrows, { opacity: 0, duration: .3 }, '<');
      return tip;
    }
    var big = [label(root, 560, 32, '6 + 4 + 1 = 11', 's03-label s03-green'), label(root, 560, 78, 'V(2,3) = 11/16', 's03-tv', { style: 'font-size:34px;fill:' + G })];
    var panel = q.one('.tr-panel'), img = q.one('.ex-cat'), sols = q.all('.tr-sol:not(.tr-sol-c)'), solC = q.one('.tr-sol-c');
    gsap.set([values([0, 1, 2, 3, 4, 5]), sums, big, panel, sols, solC], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(values([0, 1, 2], function (n, k) { return k === 0 || k === n; }), { opacity: 1, duration: .3, stagger: .1 });
    sum(2, 1);
    tl.addLabel('s1');
    tl.to(values([3], function (n, k) { return k === 0 || k === n; }), { opacity: 1, duration: .3 });
    sum(3, 1); sum(3, 2);
    tl.addLabel('s2');
    tl.to(panel, { opacity: 1, duration: .4 });
    cat(tl, img).addLabel('s3');
    tl.to(img, { autoAlpha: 0, duration: .4 })
      .to(values([4, 5], function (n, k) { return k === 0 || k === n; }), { opacity: 1, duration: .3 });
    tl.to([cells['4,1'].value, cells['4,3'].value], { opacity: 1, duration: .3 });
    var tip = sum(4, 2, '← 3 + 3 = 6');
    tl.to(tip, { opacity: 0, duration: .3 })
      .to(values([5], function (n, k) { return k > 0 && k < n; }), { opacity: 1, duration: .3, stagger: .1 })
      .to(sums, { opacity: 1, duration: .3, stagger: .08 })
      .to(sols, { opacity: 1, duration: .4 }).addLabel('s4');
    var win = [2, 3, 4].map(function (k) { return cells['4,' + k].rect; });
    tl.to(win, { attr: { fill: '#38ef7d33', stroke: G }, strokeWidth: 4, duration: .4 })
      .to(win, { attr: { fill: '#38ef7d66' }, duration: .3, repeat: 3, yoyo: true })
      .to(big, { opacity: 1, duration: .5, stagger: .3 }, '<')
      .to(solC, { opacity: 1, duration: .4 }).addLabel('s5');
  });

  // Futuri raggruppati per numero di A; i puntini abbreviano le righe lunghe.
  ['futuri-binomiali', 'futuri-binomiali-4', 'futuri-binomiali-7'].forEach(function (id) {
    PSI.scene(id, function (el, tl) {
      var q = PSI.q(el), n = Number(el.dataset.n), a = Number(el.dataset.a);
      var rows = q.all('.bf-row'), boxes = [], colors = [];
      rows.forEach(function (row) {
        var k = Number(row.dataset.k), root = row.querySelector('svg');
        var sequences = [];
        for (var mask = 0; mask < Math.pow(2, n); mask++) {
          var sequence = '';
          for (var bit = n - 1; bit >= 0; bit--) sequence += mask & (1 << bit) ? 'A' : 'B';
          if (sequence.split('A').length - 1 === k) sequences.push(sequence);
        }
        var dense = n === 7, pitch = dense ? 122 : n === 4 ? 100 : 160;
        var w = dense ? 110 : n === 4 ? 86 : 140, h = dense ? 40 : 54;
        var omitted = sequences.length > 7 ? sequences.length - 6 : 0;
        var shown = omitted ? sequences.slice(0, 3).concat([null], sequences.slice(-3)) : sequences;
        shown.forEach(function (sequence, i) {
          var x = 2 + i * pitch;
          if (sequence === null) {
            var gap = svg('g', { 'data-omitted': omitted }, root);
            label(gap, x + w / 2, 21, '⋯', 's03-label');
            label(gap, x + w / 2, 39, omitted + ' omessi', 's03-tiny');
            return;
          }
          var tile = svg('g', { 'data-sequence': sequence }, root);
          var box = svg('rect', { x: x, y: 2, width: w, height: h, rx: dense ? 3 : 7,
            fill: '#ffffff0a', stroke: '#ffffff40', 'stroke-width': 1.5 }, tile);
          var lines = [sequence];
          lines.forEach(function (value, j) {
            label(tile, x + w / 2, dense ? 28 : 36, value, 'bf-sequence',
              { style: 'font-size:' + (dense ? 17 : 22) + 'px' });
          });
          boxes.push(box); colors.push(k < a ? B : A);
        });
      });
      var counts = q.all('.bf-count'), legend = q.one('.bf-legend'), result = q.one('.bf-result');
      gsap.set([counts, legend, result], { opacity: 0 });
      tl.addLabel('s0');
      tl.to(counts, { opacity: 1, duration: .35, stagger: .08 }).addLabel('s1');
      boxes.forEach(function (box, i) {
        tl.to(box, { attr: { fill: colors[i] + '44', stroke: colors[i] }, duration: .4 }, 'colors');
      });
      tl.to(legend, { opacity: 1, duration: .3 }).addLabel('s2');
      tl.to(result, { opacity: 1, duration: .4 }).addLabel('s3');
    });
  });

  // BABA = scegliere le manche 2 e 4; dal conteggio alla formula.
  PSI.scene('futuri-binomiali-formula', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var map = svg('g', {}, root), rings = svg('g', {}, root), x0 = 210;
    label(map, 370, 26, 'perché? un futuro con k = 2, n = 4', 's03-small');
    'BABA'.split('').forEach(function (c, i) {
      var x = x0 + i * 107;
      svg('rect', { x: x - 38, y: 50, width: 76, height: 76, rx: 10, fill: (c === 'A' ? A : B) + '22', stroke: c === 'A' ? A : B, 'stroke-width': 2 }, map);
      label(map, x, 103, c, 's03-seq ' + (c === 'A' ? 's03-a' : 's03-b'), { style: 'font-size:44px' });
      label(map, x, 152, 'manche ' + (i + 1), 's03-tiny');
      if (c === 'A') svg('rect', { x: x - 46, y: 42, width: 92, height: 92, rx: 14, fill: 'none', stroke: G, 'stroke-width': 4 }, rings);
    });
    var pick = [label(root, 880, 110, 'A vince le manche {2, 4}', 's03-label'),
      label(root, 880, 165, 'scegliere quali 2 manche tra 4', 's03-small'),
      label(root, 880, 225, '→ C(4, 2) = 6 futuri', 's03-label s03-green')];
    var rule = q.one('.bf-rule'), formula = q.one('.bf-formula'), check = q.one('.bf-check');
    gsap.set([rings, pick, rule, formula, check], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(rings, { opacity: 1, duration: .4 }).to(pick, { opacity: 1, duration: .4, stagger: .2 }).addLabel('s1');
    tl.to(rule, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(formula, { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(check, { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // Esercizio 3: il gatto, poi una soluzione per click nei quattro quadranti.
  PSI.scene('esercizio-3', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg'), img = q.one('.ex-cat');
    function strike(g, x, y, value) {
      var t = label(g, x, y, value, 's03-label s03-red');
      svg('line', { x1: x - 34, y1: y - 8, x2: x + 34, y2: y - 8, stroke: RED, 'stroke-width': 3 }, g);
      return t;
    }
    function badge(g, x, y, value) {
      svg('circle', { cx: x, cy: y, r: 15, fill: '#c084fc33', stroke: C, 'stroke-width': 2 }, g);
      label(g, x, y + 6, value, 's03-small', { style: 'fill:' + C });
    }
    // (a) 36 coppie ordinate, 6 con somma 7.
    var sa = svg('g', {}, root);
    badge(sa, 18, 24, 'a');
    for (var i = 1; i <= 6; i++) {
      for (var j = 1; j <= 6; j++) {
        var seven = i + j === 7;
        svg('rect', { x: 20 + j * 21, y: 30 + i * 21, width: 18, height: 18, rx: 3, fill: seven ? G : '#ffffff12' }, sa);
      }
    }
    label(sa, 232, 90, '6/36 = 1/6', 's03-label s03-green');
    strike(sa, 232, 140, '1/11');
    label(sa, 232, 180, '11 somme,', 's03-tiny');
    label(sa, 232, 200, 'non equiprobabili', 's03-tiny');
    // (b) 8 sequenze di tre monete, 3 con due teste.
    var sb = svg('g', {}, root);
    badge(sb, 318, 24, 'b');
    ['TTT', 'TTC', 'TCT', 'TCC', 'CTT', 'CTC', 'CCT', 'CCC'].forEach(function (w, n) {
      var two = w.split('T').length - 1 === 2, x = 330 + (n % 2) * 82, y = 44 + Math.floor(n / 2) * 42;
      svg('rect', { x: x, y: y, width: 70, height: 32, rx: 6, fill: two ? '#38ef7d33' : '#ffffff0a', stroke: two ? G : '#ffffff30', 'stroke-width': 2 }, sb);
      label(sb, x + 35, y + 23, w, 's03-seq s03-label', { style: 'font-size:20px' });
    });
    label(sb, 545, 90, '3/8', 's03-label s03-green');
    strike(sb, 545, 140, '1/4');
    // (c) gioco a 4 punti sull'1–0: a = 3, b = 4, n = 6, riga 6 del triangolo.
    var sc = svg('g', {}, root);
    badge(sc, 18, 264, 'c');
    label(sc, 160, 270, 'a = 3, b = 4 → n = 6', 's03-small');
    [1, 6, 15, 20, 15, 6, 1].forEach(function (v, k) {
      var x = 34 + k * 40, win = k >= 3;
      svg('rect', { x: x - 18, y: 296, width: 36, height: 36, rx: 5, fill: (win ? A : B) + '33', stroke: win ? A : B, 'stroke-width': 2 }, sc);
      label(sc, x, 320, String(v), 's03-small', { style: 'fill:#edf2f7' });
      label(sc, x, 352, String(k), 's03-tiny');
    });
    label(sc, 150, 395, '20 + 15 + 6 + 1 = 42', 's03-small', { style: 'fill:#edf2f7' });
    label(sc, 150, 438, '42/64 = 21/32 ≈ 0.656', 's03-label s03-green');
    // (d) la condizione.
    var sd = svg('g', {}, root);
    badge(sd, 318, 264, 'd');
    label(sd, 455, 300, 'solo se i casi sono', 's03-small');
    label(sd, 455, 340, 'equiprobabili', 's03-label s03-green');
    label(sd, 455, 385, 'coppie ordinate, sequenze,', 's03-tiny');
    label(sd, 455, 405, 'futuri di Fermat', 's03-tiny');
    label(sd, 455, 445, 'hash: slot equiprobabili →', 's03-small', { style: 'fill:' + C });
    var parts = [sa, sb, sc, sd];
    gsap.set(parts, { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 });
    parts.forEach(function (p, i) { tl.to(p, { opacity: 1, duration: .5 }).addLabel('s' + (i + 2)); });
  });
})();
