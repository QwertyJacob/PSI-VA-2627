/* Partita interrotta: ipotesi, albero arrestato, voto e crescita dell'albero. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24';
  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's03-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }

  PSI.scene('partis', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var histories = svg('g', {}, root);
    label(histories, 260, 49, 'A A B', 's03-math');
    label(histories, 260, 117, 'A B A', 's03-math');
    svg('path', { d: 'M 325 40 L 450 75 M 325 109 L 450 75 L 760 75', 'class': 's03-line' }, histories);
    svg('rect', { x: 450, y: 37, width: 170, height: 77, rx: 12, fill: '#172332', stroke: '#c084fc', 'stroke-width': 2 }, histories);
    label(histories, 535, 88, '2–1', 's03-big');
    label(histories, 918, 84, 'stesso futuro', 's03-label');
    var captions = [q.one('.model-fair'), q.one('.model-independent'), histories, q.one('.markov small')];
    gsap.set(captions, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(captions[0], { opacity: 1, duration: .55 }).addLabel('s1');
    tl.to(captions[1], { opacity: 1, duration: .55 }).addLabel('s2');
    tl.to(histories, { opacity: 1, duration: .6 }).addLabel('s3');
    tl.to(q.one('.markov-word'), { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'none' })
      .to(captions[3], { opacity: 1, duration: .5 }, '<.7').addLabel('s4');
  });

  PSI.scene('albero-reale', function (el, tl) {
    var q = PSI.q(el), root = q.one('.tree-layer svg');
    var N = { r: [62, 190], A: [320, 55], B: [320, 235], BA: [620, 175], BB: [620, 335] };
    var pairs = [['r', 'A'], ['r', 'B'], ['B', 'BA'], ['B', 'BB']];
    var groups = [svg('g', {}, root), svg('g', {}, root)];
    var weights = [], bars = [];
    label(root, 62, 159, '2–1', 's03-math');
    svg('circle', { cx: 62, cy: 190, r: 7, 'class': 's03-node' }, root);
    pairs.forEach(function (p, i) {
      var parent = N[p[0]], child = N[p[1]], g = groups[Math.floor(i / 2)];
      var color = p[1].endsWith('A') ? A : B;
      svg('line', { x1: parent[0], y1: parent[1], x2: child[0], y2: child[1], stroke: color, 'stroke-width': 3 }, g);
      label(g, (parent[0] + child[0]) / 2, (parent[1] + child[1]) / 2 - 12, p[1].slice(-1) + ' · ½', 's03-label halo');
      svg('circle', { cx: child[0], cy: child[1], r: 7, 'class': 's03-node' }, g);
    });
    [['A', 0, '½', .5], ['BA', 1, '¼', .25], ['BB', 1, '¼', .25]].forEach(function (v) {
      var point = N[v[0]], g = groups[v[1]], winner = v[0].endsWith('A'), color = winner ? A : B;
      var leaf = svg('g', { 'data-outcome': v[0], 'data-probability': v[3] }, g);
      label(leaf, point[0] + 24, point[1] - 10, v[0], 's03-math ' + (winner ? 's03-a' : 's03-b'), { 'text-anchor': 'start' });
      var weight = label(leaf, point[0] + 122, point[1] - 10, '[' + v[2] + ']', 's03-math', { 'text-anchor': 'start' });
      var bar = svg('rect', { x: point[0] + 24, y: point[1] + 6, width: v[3] * 330, height: 13, rx: 3, fill: color }, leaf);
      weights.push(weight); bars.push(bar);
    });
    var model = label(root, 920, 26, 'Ogni ramo: ½', 's03-small');
    var layers = [q.one('.tree-layer'), q.one('.result-layer'), q.one('.dalembert-return')];
    var calc = q.one('.real-calc'), money = q.one('.real-money'), warning = q.one('.real-warning');
    gsap.set([groups, bars, calc, money, warning], { opacity: 0 });
    gsap.set(layers.slice(1), { autoAlpha: 0 });
    var crossed = q.one('.crossed-portrait path');
    gsap.set(crossed, { strokeDasharray: 600, strokeDashoffset: 600 });
    // Stato legato alla timeline: anche link diretti, ritorni e stampa
    // aggiornano l'accessibilità dei pannelli sovrapposti.
    var st = { panel: 0, portrait: 0 };
    function accessibility() {
      layers[1].setAttribute('aria-hidden', st.panel < .5 ? 'true' : 'false');
      layers[2].setAttribute('aria-hidden', st.portrait < .5 ? 'true' : 'false');
    }
    tl.addLabel('s0');
    groups.forEach(function (g, i) { tl.to(g, { opacity: 1, duration: .7 }).addLabel('s' + (i + 1)); });
    tl.to(calc, { opacity: 1, duration: .6 }).addLabel('s3');
    tl.to(money, { opacity: 1, duration: .6 }).addLabel('s4');
    // Un solo click dopo le 48 pistole rivela i voti di s03-1.
    tl.to(layers[0], { autoAlpha: 0, duration: .3 })
      .to(layers[1], { autoAlpha: 1, duration: .5 })
      .to(st, { panel: 1, duration: .01, onUpdate: accessibility }).addLabel('s5');
    tl.to(layers[1], { autoAlpha: 0, duration: .3 })
      .to(st, { panel: 0, duration: .01, onUpdate: accessibility })
      .to(layers[0], { autoAlpha: 1, duration: .4 })
      .to(bars, { opacity: 1, duration: .5, stagger: .12 })
      .to(weights, { fill: '#fbbf24', duration: .4 }, '<')
      .to(warning, { opacity: 1, duration: .5 }).addLabel('s6');
    tl.to(model, { opacity: 0, duration: .2 })
      .to(layers[2], { autoAlpha: 1, duration: .4 })
      .to(st, { portrait: 1, duration: .01, onUpdate: accessibility })
      .to(crossed, { strokeDashoffset: 0, duration: .7 }).addLabel('s7');
  });

  // Ogni nodo è un punteggio reale; ci si ferma appena un giocatore arriva a 5.
  function realTree(a, b, seq, nodes, leaves) {
    var node = { a: a, b: b, seq: seq, depth: seq.length, probability: Math.pow(.5, seq.length) };
    nodes.push(node);
    if (a === 5 || b === 5) {
      node.winner = a === 5 ? 'A' : 'B';
      node.x = 32 + leaves.length * 20;
      leaves.push(node);
    } else {
      node.children = [realTree(a + 1, b, seq + 'A', nodes, leaves), realTree(a, b + 1, seq + 'B', nodes, leaves)];
      node.x = (node.children[0].x + node.children[1].x) / 2;
    }
    node.y = 38 + node.depth * 47;
    return node;
  }

  PSI.scene('albero-grande', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg'), nodes = [], leaves = [];
    var tree = realTree(2, 0, '', nodes, leaves);
    var levels = Array.from({ length: 8 }, function () { return svg('g', {}, root); });
    var scoreLabels = [], terminalLabels = [];
    for (var d = 1; d <= 7; d++) {
      svg('line', { x1: 20, y1: 38 + d * 47, x2: 1160, y2: 38 + d * 47, stroke: '#ffffff0c' }, root);
      label(root, 1170, 44 + d * 47, d, 'big-step');
    }
    nodes.forEach(function (node) {
      if (node.children) node.children.forEach(function (child, i) {
        svg('line', { x1: node.x, y1: node.y, x2: child.x, y2: child.y, stroke: i === 0 ? A : B, 'class': 'big-edge' }, levels[child.depth]);
      });
      var dot = svg('circle', {
        cx: node.x, cy: node.y, r: node.winner ? 4.5 : 3,
        fill: node.winner === 'A' ? A : node.winner === 'B' ? B : '#203044',
        stroke: node.winner ? 'none' : '#cbd5e0', 'class': 'big-node',
        'data-sequence': node.seq, 'data-score': node.a + '-' + node.b,
        'data-depth': node.depth, 'data-winner': node.winner || '',
        'data-probability': node.probability
      }, levels[node.depth]);
      svg('title', {}, dot).textContent = (node.seq || 'Partenza') + ': ' + node.a + '–' + node.b + ' · P = 1/' + Math.pow(2, node.depth);
      if (node.depth <= 2) scoreLabels.push(label(levels[node.depth], node.x, node.y - 13, node.a + '–' + node.b, 'big-step halo'));
      if (node.seq === 'AAA') terminalLabels.push(label(levels[3], node.x + 5, node.y + 25, 'AAA · ⅛', 'big-focus halo', { 'text-anchor': 'start' }));
    });
    label(root, 160, 24, 'Ogni ramo: ½', 's03-small');
    var maxNote = label(root, 640, 411, 'Minimo 3 manche · massimo 7', 's03-small');
    var state = { depth: 0 };
    function render() { q.one('.big-depth b').textContent = Math.round(state.depth); }
    gsap.set(levels.slice(1), { opacity: 0 });
    gsap.set([q.one('.big-summary'), q.one('.big-question'), maxNote], { opacity: 0 });
    tl.addLabel('s0');
    for (var i = 1; i <= 7; i++) {
      tl.to(levels[i], { opacity: 1, duration: .8 })
        .to(state, { depth: i, duration: .01, onUpdate: render });
      if (i === 3) tl.to(scoreLabels.slice(1), { opacity: .2, duration: .3 }, '<');
      tl.addLabel('s' + i);
    }
    tl.to([q.one('.big-summary'), maxNote], { opacity: 1, duration: .6 })
      .to(q.one('.big-question'), { opacity: 1, duration: .5 }).addLabel('s8');
  });
})();
