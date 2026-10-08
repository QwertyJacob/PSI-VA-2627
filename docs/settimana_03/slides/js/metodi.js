/* Dopo l'albero grande: contare le foglie, il metodo di Pascal, l'esercizio, il metodo di Fermat. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', C = '#c084fc', G = '#38ef7d', RED = '#ff6b6b', PINK = '#f472b6';
  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's03-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  // Tutte le parole di n manche con esattamente k vittorie di A (prima quelle che iniziano con A).
  function words(n, k) {
    if (n === 0) return k === 0 ? [''] : [];
    var out = [];
    if (k > 0) words(n - 1, k - 1).forEach(function (w) { out.push('A' + w); });
    if (n > k) words(n - 1, k).forEach(function (w) { out.push('B' + w); });
    return out;
  }
  // Una sequenza di manche, una lettera colorata per manche; `last` incornicia l'ultima.
  function seq(root, x, y, w, size, last) {
    var g = svg('g', {}, root), step = size * .8, x0 = x - step * (w.length - 1) / 2;
    if (last) svg('rect', { x: x0 + step * (w.length - 1) - step * .55, y: y - size * .9, width: step * 1.1, height: size * 1.2, rx: 4, fill: '#38bdf833' }, g);
    w.split('').forEach(function (c, i) {
      text(g, x0 + i * step, y, c, 's03-seq ' + (c === 'A' ? 's03-a' : 's03-b'), { 'text-anchor': 'middle', style: 'font-size:' + size + 'px' });
    });
    return g;
  }
  // Nodo-stato (a, b): quante manche mancano ad A e a B.
  function state(root, x, y, value, w) {
    var g = svg('g', {}, root);
    w = w || 92;
    var box = svg('rect', { x: x - w / 2, y: y - 18, width: w, height: 36, rx: 9, 'class': 's03-node' }, g);
    label(g, x, y + 8, value, 's03-state');
    g.box = box;
    return g;
  }
  function arrowHeads(root, prefix) {
    var defs = svg('defs', {}, root);
    [[prefix + '-a', A], [prefix + '-b', B]].forEach(function (m) {
      var marker = svg('marker', { id: m[0], viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs);
      svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: m[1] }, marker);
    });
  }
  // Tabella degli stati: righe a = 0..maxA, colonne b = 0..maxB.
  function grid(root, ox, oy, w, h, maxA, maxB) {
    var cells = {};
    for (var b = 0; b <= maxB; b++) label(root, ox + (b + .5) * w, oy - 12, 'b = ' + b, 's03-small');
    for (var a = 0; a <= maxA; a++) {
      label(root, ox - 40, oy + (a + .5) * h + 7, 'a = ' + a, 's03-small');
      for (b = 0; b <= maxB; b++) {
        var rect = svg('rect', { x: ox + b * w + 3, y: oy + a * h + 3, width: w - 6, height: h - 6, rx: 6, fill: '#ffffff07', stroke: '#ffffff30' }, root);
        cells[a + ',' + b] = { rect: rect, x: ox + (b + .5) * w, y: oy + (a + .5) * h };
      }
    }
    return cells;
  }
  function put(root, cell, value, cls) {
    return label(root, cell.x, cell.y + 9, value, cls || 's03-label');
  }
  // Casi noti: V(0, b) = 1 sulla prima riga, V(a, 0) = 0 sulla prima colonna.
  function boundary(root, cells, maxA, maxB) {
    var out = [];
    for (var b = 1; b <= maxB; b++) {
      out.push(put(root, cells['0,' + b], '1', 's03-label s03-green'));
      out.push(cells['0,' + b].rect);
    }
    for (var a = 1; a <= maxA; a++) {
      out.push(put(root, cells[a + ',0'], '0', 's03-label s03-red'));
      out.push(cells[a + ',0'].rect);
    }
    out.push(put(root, cells['0,0'], '—', 's03-small'));
    return out;
  }

  // Le 35 foglie con A vincente, una colonna per numero di manche.
  PSI.scene('sequenze', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg'), cols = [], counts = [];
    [3, 4, 5, 6, 7].forEach(function (d, j) {
      var x = 120 + j * 235, list = words(d - 1, 2);
      var head = svg('g', {}, root), chips = [];
      label(head, x, 26, d + ' manche', 's03-label');
      list.forEach(function (w, i) {
        var g = svg('g', {}, root), y = 46 + i * 24;
        svg('rect', { x: x - 82, y: y, width: 164, height: 21, rx: 5, fill: '#ffffff08', stroke: '#ffffff22' }, g);
        seq(g, x, y + 16.5, w + 'A', 17, true);
        g.setAttribute('data-sequence', w + 'A');
        chips.push(g);
      });
      cols.push({ head: head, chips: chips });
      counts.push(label(root, x, 458, String(list.length), 's03-big s03-green'));
    });
    var sum = q.one('.sq-sum'), other = q.one('.sq-b');
    cols.forEach(function (c) { gsap.set([c.head, c.chips], { opacity: 0 }); });
    gsap.set([counts, sum, other], { opacity: 0 });
    tl.addLabel('s0');
    cols.forEach(function (c, j) {
      tl.to(c.head, { opacity: 1, duration: .3 })
        .to(c.chips, { opacity: 1, duration: .25, stagger: Math.min(.15, 1.4 / c.chips.length) })
        .addLabel('s' + (j + 1));
    });
    tl.to(counts, { opacity: 1, duration: .4, stagger: .1 }).to(sum, { opacity: 1, duration: .5 }).addLabel('s6');
    tl.to(other, { opacity: 1, duration: .5 }).addLabel('s7');
  });

  // Tabella delle foglie: una colonna per click, poi la somma.
  PSI.scene('tabella-foglie', function (el, tl) {
    var q = PSI.q(el);
    var col = [1, 2, 3].map(function (i) { return q.all('.lv-c' + i); });
    var sum = q.one('.lv-sum'), wrong = q.one('.lv-wrong');
    gsap.set([col, sum, wrong], { opacity: 0 });
    tl.addLabel('s0');
    col.forEach(function (c, i) { tl.to(c, { opacity: 1, duration: .35, stagger: .12 }).addLabel('s' + (i + 1)); });
    tl.to(sum, { opacity: 1, duration: .6 }).addLabel('s4');
    tl.to(wrong, { opacity: 1, duration: .6 }).addLabel('s5');
  });

  // Pascal, passi 1–2: V è una tabella; i casi noti.
  PSI.scene('pascal-1', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var axes = [
      label(root, 495, 16, 'manche che mancano a B →', 's03-small'),
      label(root, 30, 180, '← manche che mancano ad A', 's03-small', { transform: 'rotate(-90 30 180)' })
    ];
    var table = svg('g', {}, root);
    var cells = grid(table, 150, 52, 115, 62, 3, 5);
    var known = svg('g', {}, root);
    [['1,2', '3/4', 'a 3 · sul 2–1'], ['3,5', '99/128', 'a 5 · sul 2–0']].forEach(function (v) {
      var c = cells[v[0]];
      svg('rect', { x: c.x - 54, y: c.y - 28, width: 108, height: 56, rx: 6, fill: '#c084fc22', stroke: C, 'stroke-width': 3 }, known);
      label(known, c.x, c.y + 2, v[1], 's03-label');
      label(known, c.x, c.y + 22, v[2], 's03-tiny');
    });
    var edge = boundary(root, cells, 3, 5);
    var def = q.one('.p1-def'), cases = q.one('.p1-cases');
    gsap.set([table, axes, known, def, cases], { opacity: 0 });
    gsap.set(edge, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(def, { opacity: 1, duration: .6 }).addLabel('s1');
    tl.to([table, axes], { opacity: 1, duration: .5 }).to(known, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(edge, { opacity: 1, duration: .4, stagger: .06 })
      .to(cases, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // Pascal, passi 3–4: una manche dal 2–1, poi il ramo B è la partita (1,1).
  PSI.scene('pascal-2', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var P = { r: [80, 190], A: [330, 80], B: [330, 290], BA: [610, 232], BB: [610, 345] };
    function edge(g, from, to, who) {
      svg('line', { x1: P[from][0] + 46, y1: P[from][1], x2: P[to][0] - 46, y2: P[to][1], stroke: who === 'A' ? A : B, 'stroke-width': 3 }, g);
      label(g, (P[from][0] + P[to][0]) / 2, (P[from][1] + P[to][1]) / 2 - 12, who + ' · ½', 's03-small halo');
    }
    var first = svg('g', {}, root), sub = svg('g', {}, root);
    edge(first, 'r', 'A', 'A'); edge(first, 'r', 'B', 'B');
    edge(sub, 'B', 'BA', 'A'); edge(sub, 'B', 'BB', 'B');
    state(root, P.r[0], P.r[1], '(1, 2)');
    state(first, P.A[0], P.A[1], '(0, 2)');
    label(first, P.A[0] + 64, P.A[1] + 8, 'A ha vinto', 's03-label s03-a', { 'text-anchor': 'start' });
    state(first, P.B[0], P.B[1], '(1, 1)');
    state(sub, P.BA[0], P.BA[1], '(0, 1)');
    label(sub, P.BA[0] + 64, P.BA[1] + 8, 'A vince', 's03-label s03-a', { 'text-anchor': 'start' });
    state(sub, P.BB[0], P.BB[1], '(1, 0)');
    label(sub, P.BB[0] + 64, P.BB[1] + 8, 'B vince', 's03-label s03-b', { 'text-anchor': 'start' });
    var frame = svg('rect', { x: 270, y: 205, width: 600, height: 172, rx: 16, fill: '#c084fc10', stroke: C, 'stroke-width': 3, 'stroke-dasharray': '10 7' }, root);
    var frameLabel = label(root, 570, 190, 'una partita nuova, da (1, 1)', 's03-label', { style: 'fill:' + C });
    var value = label(root, 288, 362, 'vale V(1, 1) = ½', 's03-label s03-green', { 'text-anchor': 'start' });
    var ind = q.one('.p2-ind'), formula = q.one('.p2-formula');
    gsap.set([first, sub, frame, frameLabel, value, ind, formula], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(first, { opacity: 1, duration: .6 }).addLabel('s1');
    tl.to(sub, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to([frame, frameLabel], { opacity: 1, duration: .6 }).addLabel('s3');
    tl.to([ind, value], { opacity: 1, duration: .6 }).addLabel('s4');
    tl.to(formula, { opacity: 1, duration: .6 }).addLabel('s5');
  });

  // Pascal, passo 5: la regola generale e l'ordine in cui si riempie la tabella.
  PSI.scene('pascal-3', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    arrowHeads(root, 'p3');
    var cells = grid(root, 190, 40, 130, 70, 3, 3);
    boundary(root, cells, 3, 3);
    var c = cells['2,2'], up = cells['1,2'], left = cells['2,1'];
    var focus = svg('g', {}, root);
    svg('rect', { x: c.x - 61, y: c.y - 31, width: 122, height: 62, rx: 6, fill: '#38ef7d1c', stroke: G, 'stroke-width': 3 }, focus);
    label(focus, c.x, c.y + 8, 'V(a, b)', 's03-label');
    var moves = svg('g', {}, root);
    svg('line', { x1: up.x + 22, y1: up.y + 24, x2: c.x + 22, y2: c.y - 31, stroke: A, 'stroke-width': 4, 'marker-end': 'url(#p3-a)' }, moves);
    label(moves, c.x + 30, c.y - 40, 'A · ½', 's03-small halo', { 'text-anchor': 'start', style: 'fill:' + A });
    svg('line', { x1: left.x + 36, y1: left.y + 14, x2: c.x - 61, y2: c.y + 14, stroke: B, 'stroke-width': 4, 'marker-end': 'url(#p3-b)' }, moves);
    label(moves, (c.x + left.x) / 2 + 6, c.y + 2, 'B · ½', 's03-small halo', { style: 'fill:' + B });
    label(moves, up.x, up.y - 2, 'V(a−1, b)', 's03-small');
    label(moves, left.x, left.y - 4, 'V(a, b−1)', 's03-small');
    var order = [];
    for (var a = 1; a <= 3; a++) for (var b = 1; b <= 3; b++) {
      var cell = cells[a + ',' + b];
      order.push(put(root, cell, '?', 's03-label s03-c'));
    }
    var formula = q.one('.p3-formula'), note = q.one('.p3-note');
    gsap.set([focus, moves, formula, note], { opacity: 0 });
    gsap.set(order, { opacity: 0 });
    tl.addLabel('s0');
    tl.to([focus, moves], { opacity: 1, duration: .6 }).addLabel('s1');
    tl.to(formula, { opacity: 1, duration: .6 }).addLabel('s2');
    tl.to([focus, moves], { opacity: 0, duration: .3 })
      .to(order, { opacity: 1, duration: .25, stagger: .18 })
      .to(note, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // Esercizio 1: la tabella vuota, poi l'immagine sopra.
  PSI.scene('esercizio-1', function (el, tl) {
    var img = PSI.q(el).one('.ex-cat');
    gsap.set(img, { scale: .2, rotation: -12, autoAlpha: 0 });
    tl.addLabel('s0');
    tl.to(img, { scale: 1, rotation: 0, autoAlpha: 1, duration: .7, ease: 'back.out(1.6)' }).addLabel('s1');
  });

  // Albero contro tabella: gli stati ripetuti si calcolano una volta sola.
  PSI.scene('pascal-risparmio', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var tint = { '2,4': C, '1,4': G, '2,3': PINK };
    var X = [70, 225, 380, 535], leaves = 0, tree = svg('g', {}, root), dupes = [];
    function grow(a, b, depth) {
      var node = { a: a, b: b, depth: depth };
      if (depth < 3 && a > 0) {
        node.kids = [grow(a - 1, b, depth + 1), grow(a, b - 1, depth + 1)];
        node.y = (node.kids[0].y + node.kids[1].y) / 2;
      } else node.y = 52 + leaves++ * 46;
      return node;
    }
    function draw(node) {
      (node.kids || []).forEach(function (kid, i) {
        svg('line', { x1: X[node.depth] + 40, y1: node.y, x2: X[kid.depth] - 40, y2: kid.y, stroke: i ? B : A, 'stroke-width': 2.2 }, tree);
        draw(kid);
      });
      var s = state(tree, X[node.depth], node.y, node.a + ',' + node.b, 80), key = node.a + ',' + node.b;
      if (node.a === 0) gsap.set(s.box, { attr: { fill: '#38bdf840', stroke: A } });
      if (tint[key]) dupes.push({ box: s.box, color: tint[key] });
    }
    draw(grow(3, 5, 0));
    label(root, 300, 20, 'Albero: ogni cammino', 's03-label');
    var arrow = label(root, 640, 215, '⇒', 's03-big');
    var lattice = svg('g', {}, root), edges = svg('g', {}, lattice), nodes = svg('g', {}, lattice);
    label(lattice, 930, 20, 'Tabella: ogni stato una volta', 's03-label');
    function at(k, j) { return [730 + k * 128, 212 + (j - k / 2) * 84]; }
    for (var k = 0; k <= 3; k++) for (var j = 0; j <= k; j++) {
      var a = 3 - (k - j), b = 5 - j, p = at(k, j);
      if (k < 3 && a > 0) {
        [[at(k + 1, j), A], [at(k + 1, j + 1), B]].forEach(function (t) {
          svg('line', { x1: p[0] + 40, y1: p[1], x2: t[0][0] - 40, y2: t[0][1], stroke: t[1], 'stroke-width': 2.2 }, edges);
        });
      }
      var s = state(nodes, p[0], p[1], a + ',' + b, 80), color = tint[a + ',' + b];
      if (a === 0) gsap.set(s.box, { attr: { fill: '#38bdf840', stroke: A } });
      if (color) gsap.set(s.box, { attr: { fill: color + '30', stroke: color }, strokeWidth: 3 });
    }
    var counts = q.one('.rs-counts'), words = q.all('.rs-word');
    gsap.set([arrow, lattice, counts, words], { opacity: 0 });
    tl.addLabel('s0');
    dupes.forEach(function (d, i) {
      tl.to(d.box, { attr: { fill: d.color + '30', stroke: d.color }, strokeWidth: 3, duration: .4 }, i ? '<.08' : '>');
    });
    tl.addLabel('s1');
    tl.to(arrow, { opacity: 1, duration: .4 }).to(lattice, { opacity: 1, duration: .7 }).addLabel('s2');
    tl.to(counts, { opacity: 1, duration: .6 }).addLabel('s3');
    tl.to(words, { opacity: 1, duration: .6, stagger: .5 }).addLabel('s4');
  });

  // Perché n = a + b − 1: il caso più lungo, poi la manche che decide per forza.
  PSI.scene('fermat-n', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var slots = [], x0 = 170, dx = 96;
    label(root, 70, 66, 'manche', 's03-small');
    for (var i = 0; i < 7; i++) {
      var g = svg('g', {}, root);
      svg('rect', { x: x0 + i * dx, y: 32, width: 80, height: 56, rx: 8, fill: '#ffffff07', stroke: '#ffffff40' }, g);
      label(g, x0 + i * dx + 40, 108, String(i + 1), 's03-tiny');
      slots.push(g);
    }
    function bar(y, n, color, name) {
      label(root, 70, y + 29, name, 's03-label', { style: 'fill:' + color });
      var cells = [];
      for (var i = 0; i < n; i++) {
        cells.push(svg('rect', { x: x0 + i * dx, y: y, width: 80, height: 40, rx: 6, fill: color, 'fill-opacity': 0, stroke: color, 'stroke-width': 2 }, root));
      }
      return cells;
    }
    var barA = bar(150, 3, A, 'A: 3'), barB = bar(215, 5, B, 'B: 5');
    var history = 'ABBABB', letters = [];
    history.split('').forEach(function (c, i) {
      letters.push(label(slots[i], x0 + i * dx + 40, 72, c, 's03-math ' + (c === 'A' ? 's03-a' : 's03-b')));
    });
    var fills = [], ka = 0, kb = 0;
    history.split('').forEach(function (c) { fills.push(c === 'A' ? barA[ka++] : barB[kb++]); });
    var undecided = label(root, 440, 300, 'Dopo 6 manche: A ne ha 2, B ne ha 4. Ancora nessuno ha vinto.', 's03-label');
    var last = label(slots[6], x0 + 6 * dx + 40, 74, '?', 's03-math s03-green');
    var ends = [barA[2], barB[4]];
    var decides = label(root, 440, 300, 'La 7ª decide per forza: A arriva a 3 oppure B arriva a 5.', 's03-label s03-green');
    var formula = q.one('.fn-formula');
    gsap.set([letters, undecided, last, decides, formula], { opacity: 0 });
    tl.addLabel('s0');
    letters.forEach(function (l, i) {
      tl.to(l, { opacity: 1, duration: .25 }).to(fills[i], { attr: { 'fill-opacity': .85 }, duration: .25 }, '<');
    });
    tl.to(undecided, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(undecided, { opacity: 0, duration: .3 })
      .to([last, decides], { opacity: 1, duration: .4 })
      .to(ends, { attr: { 'fill-opacity': .4, 'stroke-width': 5 }, duration: .35, repeat: 4, yoyo: true }, '<').addLabel('s2');
    tl.to(formula, { opacity: 1, duration: .6 }).addLabel('s3');
  });

  // Il 2–1 con le manche fittizie: tutte le foglie pesano ¼, basta contare.
  PSI.scene('albero-fittizio', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var N = { r: [220, 200], A: [480, 100], B: [480, 300], AA: [790, 40], AB: [790, 150], BA: [790, 250], BB: [790, 360] };
    function branch(g, from, to, dashed) {
      var who = to.slice(-1);
      svg('line', { x1: N[from][0], y1: N[from][1], x2: N[to][0], y2: N[to][1], stroke: who === 'A' ? A : B, 'stroke-width': 3, 'stroke-dasharray': dashed ? '9 7' : null }, g);
      label(g, (N[from][0] + N[to][0]) / 2, (N[from][1] + N[to][1]) / 2 - 12, who + ' · ½', 's03-small halo');
      svg('circle', { cx: N[to][0], cy: N[to][1], r: 7, 'class': 's03-node' }, g);
    }
    function leaf(g, key, weight, width) {
      var p = N[key], out = svg('g', {}, g), win = key !== 'BB';
      label(out, p[0] + 24, p[1] - 8, key, 's03-math ' + (win ? 's03-a' : 's03-b'), { 'text-anchor': 'start' });
      label(out, p[0] + 110, p[1] - 8, '[' + weight + ']', 's03-math', { 'text-anchor': 'start' });
      svg('rect', { x: p[0] + 24, y: p[1] + 6, width: width, height: 12, rx: 3, fill: win ? A : B }, out);
      return out;
    }
    var real = svg('g', {}, root), fake = svg('g', {}, root);
    svg('circle', { cx: N.r[0], cy: N.r[1], r: 7, 'class': 's03-node' }, root);
    label(root, N.r[0], N.r[1] - 22, '2–1', 's03-math');
    ['A', 'B'].forEach(function (k) { branch(real, 'r', k); });
    ['BA', 'BB'].forEach(function (k) { branch(real, 'B', k); });
    var leafA = leaf(real, 'A', '½', 200);
    leaf(real, 'BA', '¼', 100); leaf(real, 'BB', '¼', 100);
    ['AA', 'AB'].forEach(function (k) { branch(fake, 'A', k, true); leaf(fake, k, '¼', 100); });
    var tag = label(fake, 620, 205, 'manche fittizia', 's03-small', { style: 'fill:' + C });
    var rings = svg('g', {}, root);
    ['AA', 'AB', 'BA'].forEach(function (k, i) {
      var p = N[k];
      svg('circle', { cx: p[0], cy: p[1], r: 17, fill: 'none', stroke: G, 'stroke-width': 3 }, rings);
      label(rings, p[0] + 230, p[1] + 2, String(i + 1), 's03-big s03-green', { 'text-anchor': 'start', style: 'font-size:34px' });
    });
    var equal = q.one('.af-equal'), formula = q.one('.af-formula');
    gsap.set([fake, rings, equal, formula], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(leafA, { opacity: 0, duration: .4 })
      .to(fake, { opacity: 1, duration: .7 }).addLabel('s1');
    tl.to(equal, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(rings, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(formula, { opacity: 1, duration: .6 }).to(tag, { opacity: .5, duration: .3 }, '<').addLabel('s4');
  });

  // Opzionale: gioco a 3 sull'1–0, i 16 futuri raggruppati per vittorie di A.
  PSI.scene('fermat-1-0', function (el, tl) {
    var q = PSI.q(el), rows = Array.prototype.slice.call(q.all('.f10-table tbody tr'));
    rows.forEach(function (row, k) {
      var cell = row.querySelector('.f10-w');
      cell.innerHTML = words(4, k).map(function (w) {
        return '<span class="sq-chip">' + w.split('').map(function (c) { return '<i class="' + c.toLowerCase() + '">' + c + '</i>'; }).join('') + '</span>';
      }).join('');
      row.querySelector('.f10-n').textContent = words(4, k).length;
    });
    var parts = rows.map(function (row) { return [row.querySelectorAll('.sq-chip'), row.querySelector('.f10-n')]; });
    var result = q.one('.f10-result');
    gsap.set(parts, { opacity: 0 });
    gsap.set(result, { opacity: 0 });
    tl.addLabel('s0');
    parts.forEach(function (p, k) {
      tl.to(p[0], { opacity: 1, duration: .2, stagger: .08 }).to(p[1], { opacity: 1, duration: .3 }).addLabel('s' + (k + 1));
    });
    tl.to(rows.slice(2), { backgroundColor: '#38bdf826', duration: .5 })
      .to(rows.slice(0, 2), { backgroundColor: '#fbbf241a', duration: .5 }, '<')
      .to(result, { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // Il caso a 5 sul 2–0: 128 futuri raggruppati per k.
  PSI.scene('fermat-5', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var C7 = [1, 7, 21, 35, 35, 21, 7, 1], base = 285, scale = 6;
    var bars = [], nums = [];
    C7.forEach(function (c, k) {
      var x = 205 + k * 105;
      bars.push(svg('rect', { x: x, y: base - c * scale, width: 70, height: c * scale, rx: 4, fill: '#8292a8' }, root));
      nums.push(label(root, x + 35, base - c * scale - 12, String(c), 's03-label'));
      label(root, x + 35, base + 32, String(k), 's03-label');
    });
    svg('line', { x1: 180, y1: base, x2: 1060, y2: base, stroke: '#ffffff50' }, root);
    label(root, 620, base + 66, 'k = manche vinte da A sulle 7', 's03-small');
    var cut = svg('g', {}, root), cx = 205 + 3 * 105 - 17;
    svg('line', { x1: cx, y1: 30, x2: cx, y2: base + 8, stroke: G, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, cut);
    label(cut, cx + 14, 22, 'A vince se k ≥ 3', 's03-label s03-green', { 'text-anchor': 'start' });
    var sum = q.one('.f5-sum'), check = q.one('.f5-check');
    gsap.set(bars, { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set([nums, cut, sum, check], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(bars, { scaleY: 1, duration: .5, stagger: .08 }).to(nums, { opacity: 1, duration: .3, stagger: .05 }, '<.2').addLabel('s1');
    tl.to(cut, { opacity: 1, duration: .4 });
    bars.forEach(function (b, k) { tl.to(b, { attr: { fill: k >= 3 ? A : B }, duration: .3 }, k ? '<.04' : '>'); });
    tl.addLabel('s2');
    tl.to(sum, { opacity: 1, duration: .6 }).addLabel('s3');
    tl.to(check, { opacity: 1, duration: .6 }).addLabel('s4');
  });
})();
