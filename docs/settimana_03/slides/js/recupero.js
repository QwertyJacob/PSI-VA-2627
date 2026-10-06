/* Recupero dalle settimane 1 e 2: stessi diagrammi e timeline.
 * Origini: atto1-assiomi.js (assiomi/complementare),
 * atto1-condizionata.js (prodotto/trabocchetto), alberi.js (albero/ribalta).
 * Copiate solo le scene presenti nel mazzo, con le loro utilità.
 */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var C = { h: '#f87171', hc: '#94a3b8', dim: '#334155', e: '#fbbf24',
    a: '#38bdf8', c: '#c084fc', sel: '#38ef7d', text: '#edf2f7', muted: '#a0aec0' };
  var S2 = { clamp: function (x,a,b) { return Math.max(a,Math.min(b,x)); },
    lerp: function (a,b,t) { return a+(b-a)*t; } };
  function mathText(parent, x, y, source, cls, attrs) {
    var node = text(parent, x, y, '', cls, attrs);
    var COLORS = { A: 'lbl-a', B: 'lbl-b', C: 'lbl-c' };
    var shift = 0, colored = !!(attrs && attrs.colored);
    if (colored) node.removeAttribute('colored');
    function span(content, css, dy) {
      var t = svg('tspan', { 'class': css || null, dy: dy || null }, node);
      t.textContent = content;
    }
    for (var i = 0; i < source.length; i++) {
      var ch = source[i];
      if ((ch === '_' || ch === '^') && i + 1 < source.length) {
        var d = ch === '_' ? 5 : -8;
        span(source[++i], 'mt-small', d - shift);
        shift = d;
      } else {
        var css = /[ABC]/.test(ch) ? 'it' + (colored ? ' ' + COLORS[ch] : '') : null;
        span(ch, css, shift ? -shift : null);
        shift = 0;
      }
    }
    return node;
  }

  function line(root, a, b, cls) {
    return svg('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], 'class': cls || 'tr-branch' }, root);
  }
  function len(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }
  // Etichetta di un ramo: a metà, spostata sopra (dy < 0) o sotto la linea.
  function branchLabel(root, a, b, s, dy, cls) {
    return text(root, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + dy, s, cls || 'tr-p halo', { 'text-anchor': 'middle' });
  }

  PSI.scene('assiomi', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');
    var X = 90, Y = 10, S = 420;

    var fill = svg('rect', { x: X, y: Y, width: S, height: S, rx: 4, 'class': 'as-fill' }, root);
    var pieces = svg('g', {}, root);
    svg('rect', { x: X, y: Y, width: S, height: S, rx: 4, 'class': 'omega' }, root);
    text(root, X + 14, Y + 38, 'Ω', 'math-lbl');

    // 1. Non negatività: un'area può ridursi a zero, mai sotto.
    var blob = svg('circle', { cx: 250, cy: 200, r: 78, 'class': 'as-blob' }, root);
    var blobLbl = text(root, 250, 196, 'A', 'math-lbl it lbl-a', { 'text-anchor': 'middle' });
    var blobNote = text(root, 250, 232, 'area ≥ 0', 'as-note', { 'text-anchor': 'middle' });

    // 2. Normalizzazione: tutto Ω ha area 1.
    var one = text(root, X + S / 2, Y + S / 2 + 16, 'P(Ω) = 1', 'as-big', { 'text-anchor': 'middle' });

    // 3. σ-additività: Ω riempito da pezzi disgiunti di area 1/2, 1/4, 1/8, …
    var COLORS = ['#38bdf8', '#fbbf24', '#c084fc', '#38ef7d', '#f472b6', '#fb923c'];
    var rect = { x: X, y: Y, w: S, h: S }, parts = [], labels = [];
    for (var i = 0; i < 12; i++) {
      var p;
      if (i % 2 === 0) {
        p = { x: rect.x, y: rect.y, w: rect.w / 2, h: rect.h };
        rect = { x: rect.x + rect.w / 2, y: rect.y, w: rect.w / 2, h: rect.h };
      } else {
        p = { x: rect.x, y: rect.y, w: rect.w, h: rect.h / 2 };
        rect = { x: rect.x, y: rect.y + rect.h / 2, w: rect.w, h: rect.h / 2 };
      }
      parts.push(svg('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: COLORS[i % COLORS.length], 'class': 'as-piece' }, pieces));
      if (i < 4) {
        labels.push(text(pieces, p.x + p.w / 2, p.y + p.h / 2 + [14, 12, 10, 8][i], ['1/2', '1/4', '1/8', '1/16'][i],
          'as-frac', { 'text-anchor': 'middle', 'font-size': [44, 36, 28, 20][i] }));
      }
    }

    gsap.set([fill, blob, blobLbl, blobNote, one, parts, labels, q.one('.as-sum'), q.one('.as-triple')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });
    tl.addLabel('s0');

    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to([blob, blobLbl, blobNote], { opacity: 1, duration: 0.4 }, '<')
      .to(blob, { attr: { r: 3 }, duration: 0.9, ease: 'power2.inOut' }, '+=0.3')
      .to(blobLbl, { opacity: 0, duration: 0.3 }, '<')
      .to(blob, { attr: { r: 78 }, duration: 0.9, ease: 'power2.inOut' }, '+=0.4')
      .to(blobLbl, { opacity: 1, duration: 0.3 }, '-=0.3')
      .addLabel('s1');

    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to([blob, blobLbl, blobNote], { opacity: 0, duration: 0.3 }, '<')
      .to(fill, { opacity: 1, duration: 0.6 }, '<0.2')
      .to(one, { opacity: 1, duration: 0.5 }, '<0.3')
      .addLabel('s2');

    var t = tl.duration();
    tl.to(steps[2], { opacity: 1, duration: 0.4 }, t)
      .to([one, fill], { opacity: 0, duration: 0.4 }, t)
      .to(q.one('.as-sum'), { opacity: 1, duration: 0.5 }, t + 0.3);
    parts.forEach(function (part, i) {
      var at = t + 0.4 + 2.8 * (1 - Math.pow(0.78, i));
      tl.to(part, { opacity: 0.6, duration: 0.35 }, at);
      if (labels[i]) tl.to(labels[i], { opacity: 1, duration: 0.3 }, at + 0.1);
    });
    tl.addLabel('s3');

    tl.to(q.one('.as-triple'), { opacity: 1, duration: 0.5 })
      .addLabel('s4');
  });
  PSI.scene('complementare', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');
    var X = 90, Y = 10, S = 420;
    var st = { p: 0.70 };

    var rA = svg('rect', { x: X, y: Y, height: S, 'class': 'cp-a' }, root);
    var rC = svg('rect', { y: Y, height: S, 'class': 'cp-c' }, root);
    var edge = svg('line', { y1: Y, y2: Y + S, 'class': 'cp-edge' }, root);
    svg('rect', { x: X, y: Y, width: S, height: S, rx: 4, 'class': 'omega' }, root);
    text(root, X + 14, Y + 38, 'Ω', 'math-lbl');
    var lblA = text(root, 0, 150, 'A', 'math-lbl it lbl-a', { 'text-anchor': 'middle' });
    var lblC = svg('text', { y: 150, 'class': 'math-lbl lbl-b', 'text-anchor': 'middle' }, root);
    svg('tspan', { 'class': 'it' }, lblC).textContent = 'A';
    svg('tspan', { 'class': 'sup', dy: -14 }, lblC).textContent = 'c';
    var numA = text(root, 0, 215, '', 'cp-num', { 'text-anchor': 'middle' });
    var numC = text(root, 0, 215, '', 'cp-num', { 'text-anchor': 'middle' });
    var names = [
      [text(root, 0, 250, 'protetto', 'cp-name', { 'text-anchor': 'middle' }), text(root, 0, 250, 'vulnerabile', 'cp-name', { 'text-anchor': 'middle' })],
      [text(root, 0, 250, 'nessun bug', 'cp-name', { 'text-anchor': 'middle' }), text(root, 0, 250, 'almeno un bug', 'cp-name', { 'text-anchor': 'middle' })]
    ];
    var facts = text(root, X + S / 2, Y + S - 22, 'A ∩ Aᶜ = ∅     A ∪ Aᶜ = Ω', 'cp-facts', { 'text-anchor': 'middle' });

    function render() {
      var w = S * st.p, xa = X + w / 2, xc = X + w + (S - w) / 2;
      rA.setAttribute('width', w);
      rC.setAttribute('x', X + w);
      rC.setAttribute('width', S - w);
      edge.setAttribute('x1', X + w);
      edge.setAttribute('x2', X + w);
      [lblA, numA, names[0][0], names[1][0]].forEach(function (n) { n.setAttribute('x', xa); });
      [lblC, numC, names[0][1], names[1][1]].forEach(function (n) { n.setAttribute('x', xc); });
      numA.textContent = st.p.toFixed(2);
      numC.textContent = (1 - st.p).toFixed(2);
    }
    render();

    gsap.set([numA, numC, names, facts, q.one('.scene-def')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });
    tl.addLabel('s0');

    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to(edge, { opacity: 0.2, duration: 0.25, repeat: 3, yoyo: true }, '<')
      .to(facts, { opacity: 1, duration: 0.4 }, '<0.3')
      .addLabel('s1');

    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to(q.one('.scene-def'), { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s2');

    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .to([numA, numC, names[0]], { opacity: 1, duration: 0.4 }, '<0.2')
      .addLabel('s3');

    tl.to(steps[3], { opacity: 1, duration: 0.4 })
      .to(names[0], { opacity: 0, duration: 0.3 }, '<')
      .to(st, { p: 0.45, duration: 1.1, ease: 'power2.inOut', onUpdate: render }, '<0.2')
      .to(names[1], { opacity: 1, duration: 0.4 })
      .addLabel('s4');
  });
  PSI.scene('prodotto', function (el, tl) {
    var q = PSI.q(el), tree = q.one('svg');
    var steps = q.all('.scene-steps li'), calc = q.all('.pr-line');
    var NODE = { r: [46, 220], a: [250, 120], na: [250, 320], aa: [520, 58], ana: [520, 182], naa: [520, 258], nana: [520, 382] };
    // Rami: da, a, etichetta, posizione dell'etichetta.
    var EDGE = [
      ['r', 'a', 'P(A_1) = 4/52', 128, 146], ['r', 'na', 'P(A_1^c) = 48/52', 128, 306],
      ['a', 'aa', 'P(A_2 | A_1) = 3/51', 382, 74], ['a', 'ana', 'P(A_2^c | A_1) = 48/51', 392, 184],
      ['na', 'naa', 'P(A_2 | A_1^c) = 4/51', 382, 274], ['na', 'nana', 'P(A_2^c | A_1^c) = 47/51', 392, 384]
    ];
    // Zone del condizionamento: dentro A₁ (e dentro A₁ᶜ) il mazzo è cambiato.
    var zoneA = svg('rect', { x: 226, y: 22, width: 404, height: 196, rx: 16, 'class': 'pr-zone' }, tree);
    var zoneNA = svg('rect', { x: 226, y: 222, width: 404, height: 196, rx: 16, 'class': 'pr-zone' }, tree);
    var zoneLbl = [
      text(tree, 616, 44, 'dentro A₁: restano 51 carte, 3 assi', 'pr-zone-lbl', { 'text-anchor': 'end' }),
      text(tree, 616, 410, 'dentro A₁ᶜ: restano 51 carte, 4 assi', 'pr-zone-lbl', { 'text-anchor': 'end' })
    ];
    var branch = {}, labels = {};
    EDGE.forEach(function (e) {
      branch[e[1]] = svg('line', { x1: NODE[e[0]][0], y1: NODE[e[0]][1], x2: NODE[e[1]][0], y2: NODE[e[1]][1], 'class': 'tr-branch' }, tree);
      labels[e[1]] = mathText(tree, e[3], e[4], e[2], 'tr-p', { 'text-anchor': 'middle' });
    });
    var dot = {};
    Object.keys(NODE).forEach(function (k) { dot[k] = svg('circle', { cx: NODE[k][0], cy: NODE[k][1], r: 7, 'class': 'tr-node' }, tree); });
    var leaves = [['aa', '1/221'], ['ana', '16/221'], ['naa', '16/221'], ['nana', '188/221']].map(function (l) {
      return text(tree, NODE[l[0]][0] + 16, NODE[l[0]][1] + 6, l[1], 'tr-leaf');
    });

    var first = [branch.a, branch.na, labels.a, labels.na, dot.a, dot.na];
    var second = [branch.aa, branch.ana, branch.naa, branch.nana, labels.aa, labels.ana, labels.naa, labels.nana,
      dot.aa, dot.ana, dot.naa, dot.nana];
    gsap.set([first, second, zoneA, zoneNA, zoneLbl, leaves, calc, q.one('.scene-note')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });
    tl.addLabel('s0');

    // 1. Primo livello: probabilità semplici.
    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to(first, { opacity: 1, duration: 0.5, stagger: 0.05 }, '<0.2')
      .addLabel('s1');

    // 2. Secondo livello: su ogni ramo una probabilità condizionata.
    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to([zoneA, zoneLbl[0]], { opacity: 1, duration: 0.5 }, '<0.2')
      .to([branch.aa, branch.ana, labels.aa, labels.ana, dot.aa, dot.ana], { opacity: 1, duration: 0.5 })
      .to([zoneNA, zoneLbl[1]], { opacity: 1, duration: 0.5 }, '+=0.4')
      .to([branch.naa, branch.nana, labels.naa, labels.nana, dot.naa, dot.nana], { opacity: 1, duration: 0.5 })
      .addLabel('s2');

    // 3. Lungo il percorso «asso, asso» le probabilità si moltiplicano.
    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .to([zoneA, zoneNA, zoneLbl], { opacity: 0.35, duration: 0.4 }, '<')
      .to([branch.a, branch.aa, dot.r, dot.a, dot.aa], { stroke: '#38ef7d', duration: 0.5 }, '<')
      .to([branch.a, branch.aa], { strokeWidth: 5, duration: 0.5 }, '<')
      .to([dot.r, dot.a, dot.aa], { fill: '#38ef7d', duration: 0.5 }, '<')
      .to([labels.a, labels.aa], { fill: '#38ef7d', duration: 0.5 }, '<');
    calc.forEach(function (line) { tl.to(line, { opacity: 1, duration: 0.45 }, '+=0.35'); });
    tl.to(leaves[0], { opacity: 1, duration: 0.4 })
      .addLabel('s3');

    // 4. Le quattro foglie sono una partizione: sommano a 1.
    tl.to(steps[3], { opacity: 1, duration: 0.4 })
      .to(leaves.slice(1), { opacity: 1, duration: 0.4, stagger: 0.2 }, '<0.2')
      .to(q.one('.scene-note'), { opacity: 1, duration: 0.5 })
      .addLabel('s4');
  });
  PSI.scene('trabocchetto', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var geo = PSI.geo;
    var OM = { x: 20, y: 20, w: 580, h: 400 }, area = OM.w * OM.h;
    var pA = 0.25, pB = 0.20;
    var rA = geo.radius(pA * area), rB = geo.radius(pB * area);
    var dInd = geo.distanceForLens(rA, rB, pA * pB * area);
    var A = { x: 175, y: 220 };
    var st = { bx: A.x + dInd, by: A.y };
    var farX = A.x + rA + rB + 30;

    var defs = svg('defs', {}, root);
    svg('circle', { id: 'tb-a', cx: A.x, cy: A.y, r: rA }, defs);
    var circleB = svg('circle', { id: 'tb-b', r: rB }, defs);
    svg('use', { href: '#tb-a' }, svg('clipPath', { id: 'tb-in-a' }, defs));
    svg('rect', { x: OM.x, y: OM.y, width: OM.w, height: OM.h, rx: 16, 'class': 'omega' }, root);
    text(root, OM.x + 18, OM.y + 38, 'Ω', 'math-lbl');
    svg('use', { href: '#tb-b', 'clip-path': 'url(#tb-in-a)', 'class': 'region tb-lens' }, root);
    svg('use', { href: '#tb-a', 'class': 'set set-a' }, root);
    var handle = svg('use', { href: '#tb-b', 'class': 'set set-b tb-handle' }, root);
    text(root, A.x - rA * 0.72, A.y - rA * 0.78, 'A', 'math-lbl it lbl-a', { 'text-anchor': 'middle' });
    var lblB = text(root, 0, 0, 'B', 'math-lbl it lbl-b', { 'text-anchor': 'middle' });

    var bars = { ab: q.one('.tb-ab'), prod: q.one('.tb-prod'), cond: q.one('.tb-cond'), pb: q.one('.tb-pb') };
    var vab = q.one('.tb-vab'), vcond = q.one('.tb-vcond'), badge = q.one('.tb-badge');
    function render() {
      circleB.setAttribute('cx', st.bx);
      circleB.setAttribute('cy', st.by);
      lblB.setAttribute('x', st.bx + rB * 0.72);
      lblB.setAttribute('y', st.by - rB * 0.78);
      var lens = geo.lens(rA, rB, Math.hypot(st.bx - A.x, st.by - A.y)) / area;
      bars.ab.style.width = (lens / 0.2 * 100) + '%';
      bars.prod.style.width = (pA * pB / 0.2 * 100) + '%';
      bars.cond.style.width = (lens / pA * 100) + '%';
      bars.pb.style.width = (pB * 100) + '%';
      vab.textContent = lens.toFixed(3);
      vcond.textContent = (lens / pA).toFixed(3);
      var state = Math.abs(lens - pA * pB) < 0.0015 ? 'ind' : lens < 1e-6 ? 'dis' : 'dip';
      badge.textContent = { ind: 'indipendenti', dis: 'disgiunti: massima dipendenza', dip: 'dipendenti' }[state];
      badge.className = 'tb-badge ' + state;
    }
    render();

    // Trascinamento di B con il mouse (o con il dito).
    var dragging = false;
    function toSvg(e) {
      var pt = root.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      return pt.matrixTransform(root.getScreenCTM().inverse());
    }
    handle.addEventListener('pointerdown', function (e) {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var p = toSvg(e);
      st.bx = Math.max(OM.x + rB, Math.min(OM.x + OM.w - rB, p.x));
      st.by = Math.max(OM.y + rB, Math.min(OM.y + OM.h - rB, p.y));
      render();
    });
    handle.addEventListener('pointerup', function () { dragging = false; });

    gsap.set(q.one('.scene-note'), { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { bx: farX, duration: 2.2, ease: 'power1.inOut', onUpdate: render })
      .addLabel('s1');
    tl.to(q.one('.scene-note'), { opacity: 1, duration: 0.5 })
      .addLabel('s2');
  });
  PSI.scene('albero', function (el, tl) {
    var root = PSI.q(el).one('svg');
    var N = { r: [46, 225], a: [270, 110], na: [270, 340], ab: [520, 50], anb: [520, 170], nab: [520, 280], nanb: [520, 400] };
    var X = 740, Y = 10, S = 396, pA = 0.4, pBA = 0.7, pBnA = 0.3;

    // Il quadrato.
    var sq = svg('rect', { x: X, y: Y, width: S, height: S, rx: 4, 'class': 'omega' }, root);
    var colA = svg('rect', { x: X, y: Y, width: pA * S, height: S, 'class': 'tm-col-a' }, root);
    var colNA = svg('rect', { x: X + pA * S, y: Y, width: (1 - pA) * S, height: S, 'class': 'tm-col-na' }, root);
    var bA = svg('rect', { x: X, y: Y, width: pA * S, height: pBA * S, 'class': 'tm-b' }, root);
    var bNA = svg('rect', { x: X + pA * S, y: Y, width: (1 - pA) * S, height: pBnA * S, 'class': 'tm-b' }, root);
    var cut1 = line(root, [X + pA * S, Y], [X + pA * S, Y + S], 'tm-cut');
    var cut2 = line(root, [X, Y + pBA * S], [X + pA * S, Y + pBA * S], 'tm-cut');
    var cut3 = line(root, [X + pA * S, Y + pBnA * S], [X + S, Y + pBnA * S], 'tm-cut');
    var omegaLbl = text(root, X + S + 12, Y + 32, 'Ω', 'math-lbl');
    var colLbl = [
      text(root, X + pA * S / 2, Y + S + 30, 'A', 'tm-coll lbl-a it', { 'text-anchor': 'middle' }),
      text(root, X + pA * S + (1 - pA) * S / 2, Y + S + 30, 'Aᶜ', 'tm-coll it', { 'text-anchor': 'middle' })
    ];
    // Foglie nel quadrato: [x, y, w, h, valore].
    var LEAF = [
      [X, Y, pA * S, pBA * S, '0.28'], [X, Y + pBA * S, pA * S, (1 - pBA) * S, '0.12'],
      [X + pA * S, Y, (1 - pA) * S, pBnA * S, '0.18'], [X + pA * S, Y + pBnA * S, (1 - pA) * S, (1 - pBnA) * S, '0.42']
    ];
    var leafRect = LEAF.map(function (l) { return svg('rect', { x: l[0], y: l[1], width: l[2], height: l[3], 'class': 'tm-leaf' }, root); });
    var leafVal = LEAF.map(function (l) { return text(root, l[0] + l[2] / 2, l[1] + l[3] / 2 + 10, l[4], 'tm-val', { 'text-anchor': 'middle' }); });

    // L'albero.
    var E = [['r', 'a', '0.4', -12], ['r', 'na', '0.6', 26], ['a', 'ab', '0.7', -12], ['a', 'anb', '0.3', 26],
      ['na', 'nab', '0.3', -12], ['na', 'nanb', '0.7', 26]];
    var br = {}, lbl = {};
    E.forEach(function (e) {
      br[e[1]] = line(root, N[e[0]], N[e[1]]);
      lbl[e[1]] = branchLabel(root, N[e[0]], N[e[1]], e[2], e[3]);
    });
    var dot = {};
    Object.keys(N).forEach(function (k) { dot[k] = svg('circle', { cx: N[k][0], cy: N[k][1], r: 7, 'class': 'tr-node' }, root); });
    var name = {
      a: text(root, N.a[0] - 4, N.a[1] - 18, 'A', 'tm-name lbl-a it', { 'text-anchor': 'middle' }),
      na: text(root, N.na[0] - 4, N.na[1] + 36, 'Aᶜ', 'tm-name it', { 'text-anchor': 'middle' })
    };
    var LEAFN = [['ab', 'A∩B', '0.28'], ['anb', 'A∩Bᶜ', '0.12'], ['nab', 'Aᶜ∩B', '0.18'], ['nanb', 'Aᶜ∩Bᶜ', '0.42']];
    var leafTxt = LEAFN.map(function (l) {
      var t = text(root, N[l[0]][0] + 16, N[l[0]][1] + 7, '', 'tm-leafname');
      var s1 = svg('tspan', {}, t); s1.textContent = l[1] + '  ';
      var s2 = svg('tspan', { 'class': 'tm-leafval' }, t); s2.textContent = l[2];
      return t;
    });
    var joint = [text(root, N.a[0] + 22, N.a[1] + 6, '[0.4]', 'tm-joint'), text(root, N.na[0] + 22, N.na[1] + 6, '[0.6]', 'tm-joint')];
    var prod = text(root, 300, 22, '0.4 × 0.7 = 0.28', 'tm-prod', { 'text-anchor': 'middle' });
    var omegaTxt = text(root, 300, 22, '0.4 = P(A | Ω) = P(A ∩ Ω) / P(Ω) = P(A)', 'tm-prod tm-omega', { 'text-anchor': 'middle' });
    var sum = text(root, 300, 446, '0.28 + 0.12 + 0.18 + 0.42 = 1', 'tm-prod', { 'text-anchor': 'middle' });

    var lvl1 = [br.a, br.na], lvl2 = [br.ab, br.anb, br.nab, br.nanb];
    gsap.set([lbl.a, lbl.na, lbl.ab, lbl.anb, lbl.nab, lbl.nanb, dot.a, dot.na, dot.ab, dot.anb, dot.nab, dot.nanb,
      name.a, name.na, leafTxt, joint, omegaTxt, colA, colNA, bA, bNA, colLbl, leafRect, leafVal, prod, sum, cut1, cut2, cut3], { opacity: 0 });
    gsap.set(lvl1.concat(lvl2), { opacity: 0 });
    gsap.set([sq, omegaLbl, dot.r], { opacity: 0 });
    tl.to([sq, omegaLbl, dot.r], { opacity: 1, duration: 0.5 })
      .addLabel('s0');

    // 1. Primo livello: due rami, due colonne.
    lvl1.forEach(function (b, i) {
      var e = E[i];
      tl.set(b, { opacity: 1 }, i ? '<' : '>');
      PSI.draw(tl, b, len(N[e[0]], N[e[1]]), { duration: 0.6 }, '<');
    });
    tl.to([dot.a, dot.na, lbl.a, lbl.na, name.a, name.na], { opacity: 1, duration: 0.4 })
      .set(cut1, { opacity: 1 }, '<');
    PSI.draw(tl, cut1, S, { duration: 0.6 }, '<');
    tl.to([colA, colNA, colLbl, joint], { opacity: 1, duration: 0.5 })
      .addLabel('s1');

    // 2. Secondo livello: ogni colonna si taglia secondo la sua condizionata.
    lvl2.forEach(function (b, i) {
      var e = E[i + 2];
      tl.set(b, { opacity: 1 }, i ? '<' : '>');
      PSI.draw(tl, b, len(N[e[0]], N[e[1]]), { duration: 0.6 }, '<');
    });
    tl.to([dot.ab, dot.anb, dot.nab, dot.nanb, lbl.ab, lbl.anb, lbl.nab, lbl.nanb], { opacity: 1, duration: 0.4 })
      .set([cut2, cut3], { opacity: 1 }, '<');
    PSI.draw(tl, cut2, pA * S, { duration: 0.5 }, '<');
    PSI.draw(tl, cut3, (1 - pA) * S, { duration: 0.5 }, '<');
    tl.to([bA, bNA], { opacity: 1, duration: 0.5 })
      .to(leafTxt, { opacity: 1, duration: 0.4, stagger: 0.1 })
      .to(leafVal, { opacity: 1, duration: 0.4, stagger: 0.1 }, '<')
      .addLabel('s2');

    // 3. Regola del cammino: 0.4 × 0.7 è l'area del rettangolo A∩B.
    tl.to([br.a, br.ab], { stroke: C.sel, strokeWidth: 5, duration: 0.5 })
      .to([dot.r, dot.a, dot.ab], { fill: C.sel, duration: 0.5 }, '<')
      .to([lbl.a, lbl.ab], { fill: C.sel, duration: 0.5 }, '<')
      .to(leafRect[0], { opacity: 1, duration: 0.5 }, '<')
      .to(prod, { opacity: 1, duration: 0.5 })
      .addLabel('s3');

    // 4. Le foglie coprono tutto Ω: sommano a 1.
    tl.to(leafRect.slice(1), { opacity: 1, duration: 0.4, stagger: 0.15 })
      .to(sum, { opacity: 1, duration: 0.5 })
      .addLabel('s4');

    // 5. Anche il primo ramo è una condizionata: condizionata a Ω.
    tl.to(prod, { opacity: 0, duration: 0.3 })
      .to(br.a, { stroke: C.e, duration: 0.3 }, '<')
      .to(lbl.a, { fill: C.e, duration: 0.3 }, '<')
      .to(omegaTxt, { opacity: 1, duration: 0.5 })
      .addLabel('s5');
  });
  PSI.scene('ribalta', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var SLOT = [62, 162, 272, 372], CX = 468, FX = 724, MAXS = 86;
    var L = { r: [40, 217], h: [236, 112], nh: [236, 322] };
    var R = { r: [1140, 217], e: [950, 112], ne: [950, 322] };
    // Foglie in ordine causale; FLIP[i] = posto della foglia i nell'albero ribaltato.
    var NAME = ['H∩E', 'H∩Eᶜ', 'Hᶜ∩E', 'Hᶜ∩Eᶜ'], ISH = [1, 1, 0, 0], ISE = [1, 0, 1, 0], FLIP = [0, 2, 1, 3];

    function fmt(v) { return v > 0 && v < 1e-6 ? v.toExponential(1) : String(Number(v.toPrecision(4))); }
    function ln(parent, cls) { return svg('line', { 'class': cls || 'tr-branch' }, parent); }
    function setLine(l, a, b) { l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]); }
    function setMid(t, a, b, dy) { t.setAttribute('x', (a[0] + b[0]) / 2); t.setAttribute('y', (a[1] + b[1]) / 2 + dy); }

    // Albero causale.
    var left = svg('g', {}, root);
    var lb = [0, 1, 2, 3, 4, 5].map(function () { return ln(left); });
    var ll = [0, 1, 2, 3, 4, 5].map(function () { return text(left, 0, 0, '', 'tr-p halo', { 'text-anchor': 'middle' }); });
    [L.r, L.h, L.nh].forEach(function (p) { svg('circle', { cx: p[0], cy: p[1], r: 7, 'class': 'tr-node' }, left); });
    text(left, L.h[0], L.h[1] - 18, 'H', 'rb-name rb-h it', { 'text-anchor': 'middle' });
    text(left, L.nh[0], L.nh[1] + 38, 'Hᶜ', 'rb-name it', { 'text-anchor': 'middle' });
    text(left, L.r[0], L.r[1] - 16, 'Ω', 'rb-name', { 'text-anchor': 'middle' });
    text(left, 20, 424, 'ordine causale: il produttore', 'rb-cap');

    // Albero ribaltato.
    var right = svg('g', {}, root);
    var rb = [0, 1, 2, 3, 4, 5].map(function () { return ln(right); });
    var rl = [0, 1, 2, 3, 4, 5].map(function (i) { return text(right, 0, 0, '', 'tr-p halo' + (i === 2 ? ' rb-div' : ''), { 'text-anchor': 'middle' }); });
    var rnodes = svg('g', {}, root);
    [R.r, R.e, R.ne].forEach(function (p) { svg('circle', { cx: p[0], cy: p[1], r: 7, 'class': 'tr-node' }, rnodes); });
    text(rnodes, R.e[0], R.e[1] - 18, 'E', 'rb-name rb-e it', { 'text-anchor': 'middle' });
    text(rnodes, R.ne[0], R.ne[1] + 38, 'Eᶜ', 'rb-name it', { 'text-anchor': 'middle' });
    text(rnodes, R.r[0], R.r[1] - 16, 'Ω', 'rb-name', { 'text-anchor': 'middle' });
    text(rnodes, 1160, 424, 'ordine della domanda: tu', 'rb-cap', { 'text-anchor': 'end' });
    var pE = text(rnodes, R.e[0] + 94, R.e[1] + 58, '', 'tr-p halo rb-sum', { 'text-anchor': 'middle' });
    var pNE = text(rnodes, R.ne[0] + 94, R.ne[1] - 40, '', 'tr-p halo', { 'text-anchor': 'middle' });

    // Foglie: quadrato + nome e valore.
    var leaves = NAME.map(function (n, i) {
      var g = svg('g', {}, root);
      var sq = svg('rect', { 'class': 'rb-sq' + (ISH[i] ? ' rb-sq-h' : '') }, g);
      var t = text(g, 0, 0, '', 'rb-leaf');
      var t1 = svg('tspan', { 'class': 'rb-leafname' }, t); t1.textContent = n + '  ';
      var t2 = svg('tspan', { 'class': 'rb-leafval' }, t);
      return { g: g, sq: sq, t: t, val: t2 };
    });
    var sumTxt = text(root, 590, 24, '', 'rb-formula rb-e-txt', { 'text-anchor': 'middle' });
    var divTxt = text(root, 590, 24, '', 'rb-formula rb-sel-txt', { 'text-anchor': 'middle' });

    var st = { lp: -2, sens: 0.99, spec: 0.99, log: true, show: 0, fade: 0, slide: 0, flip: 0 };
    var inputs = {}, outs = {};
    q.all('input[data-k]').forEach(function (i) { inputs[i.dataset.k] = i; });
    q.all('[data-v]').forEach(function (b) { outs[b.dataset.v] = b; });

    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function side(v) {
      if (st.log) return v > 0 ? MAXS * Math.sqrt(S2.clamp((Math.log10(v) + 5) / 5, 0.03, 1)) : 0;
      return MAXS * Math.sqrt(v);
    }
    function render() {
      var p = Math.pow(10, st.lp), s = st.sens, f = 1 - st.spec;
      var val = [p * s, p * (1 - s), (1 - p) * f, (1 - p) * (1 - f)];
      var e = val[0] + val[2], ne = val[1] + val[3];
      var sl = ease(st.slide);

      // Foglie: dalla colonna causale a quella ribaltata.
      var pos = val.map(function (v, i) {
        var d = side(v);
        var x = S2.lerp(CX, FX, sl), y = S2.lerp(SLOT[i], SLOT[FLIP[i]], sl);
        return { x: x, y: y, d: d };
      });
      leaves.forEach(function (lf, i) {
        var P = pos[i];
        lf.sq.setAttribute('x', P.x - P.d / 2); lf.sq.setAttribute('y', P.y - P.d / 2);
        lf.sq.setAttribute('width', Math.max(P.d, 1)); lf.sq.setAttribute('height', Math.max(P.d, 1));
        var onRight = sl < 0.5;
        lf.t.setAttribute('x', onRight ? P.x + MAXS / 2 + 12 : P.x - MAXS / 2 - 12);
        lf.t.setAttribute('y', P.y + 7);
        lf.t.setAttribute('text-anchor', onRight ? 'start' : 'end');
        lf.val.textContent = fmt(val[i]);
        // Stato 1: le foglie con E si accendono, le altre si spengono (poi tornano a metà).
        var dimE = ISE[i] ? 1 : 1 - 0.6 * st.fade + 0.25 * st.fade * sl;
        lf.g.style.opacity = st.show * dimE;
        lf.sq.style.strokeWidth = ISE[i] ? 1 + 3 * st.fade : 1;
        lf.sq.style.stroke = ISE[i] && st.fade > 0 ? C.e : '';
      });

      // Albero causale: rami verso le foglie nella loro posizione iniziale.
      var cEnd = function (i) { return [CX - side(val[i]) / 2 - 4, SLOT[i]]; };
      var EDGE = [[L.r, L.h], [L.r, L.nh], [L.h, cEnd(0)], [L.h, cEnd(1)], [L.nh, cEnd(2)], [L.nh, cEnd(3)]];
      var LAB = [p, 1 - p, s, 1 - s, f, 1 - f], DY = [-12, 28, -10, 24, -10, 24];
      EDGE.forEach(function (ed, k) {
        setLine(lb[k], ed[0], ed[1]);
        setMid(ll[k], ed[0], ed[1], DY[k]);
        ll[k].textContent = fmt(LAB[k]);
        var toNotE = k === 3 || k === 5;
        lb[k].style.opacity = ll[k].style.opacity = toNotE ? 1 - 0.85 * st.fade : 1;
      });
      left.style.opacity = st.show * (1 - 0.82 * sl);

      // Albero ribaltato: nodo E con la somma, poi i rami con i posterior.
      var fEnd = function (i) { return [FX + side(val[i]) / 2 + 4, SLOT[FLIP[i]]]; };
      var REDGE = [[R.r, R.e], [R.r, R.ne], [R.e, fEnd(0)], [R.e, fEnd(2)], [R.ne, fEnd(1)], [R.ne, fEnd(3)]];
      var RLAB = [e, ne, val[0] / e, val[2] / e, val[1] / ne, val[3] / ne], RDY = [-12, 28, -10, 24, -10, 24];
      REDGE.forEach(function (ed, k) {
        setLine(rb[k], ed[0], ed[1]);
        setMid(rl[k], ed[0], ed[1], RDY[k]);
        rl[k].textContent = fmt(RLAB[k]);
        var o = k < 2 ? S2.clamp(sl * 2 - 1, 0, 1) : st.flip;
        rb[k].style.opacity = o;
        rl[k].style.opacity = k < 2 ? 0 : st.flip;
      });
      rb[2].style.stroke = st.flip > 0.5 ? C.sel : '';
      rb[2].style.strokeWidth = st.flip > 0.5 ? 5 : '';
      rnodes.style.opacity = S2.clamp(sl * 2 - 1, 0, 1);
      pE.textContent = fmt(e);
      pNE.textContent = fmt(ne);
      sumTxt.textContent = 'P(E) = ' + fmt(val[0]) + ' + ' + fmt(val[2]) + ' = ' + fmt(e);
      divTxt.textContent = 'P(H | E) = ' + fmt(val[0]) + ' / ' + fmt(e) + ' = ' + fmt(val[0] / e);
      sumTxt.style.opacity = S2.clamp(sl * 2 - 1, 0, 1) * (1 - st.flip);
      divTxt.style.opacity = st.flip;

      inputs.lp.value = st.lp; inputs.sens.value = st.sens; inputs.spec.value = st.spec;
      outs.lp.textContent = fmt(p);
      outs.sens.textContent = fmt(st.sens);
      outs.spec.textContent = fmt(st.spec);
    }
    render();

    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', function () { st[k] = +this.value; render(); });
    });
    q.one('.rb-scale').addEventListener('click', function () {
      this.blur();
      st.log = !st.log;
      this.textContent = st.log ? 'aree: log' : 'aree: lineari';
      render();
    });
    q.one('.rb-flip').addEventListener('click', function () { this.blur(); PSI.replay(el, 's0', 's3'); });

    tl.to(st, { show: 1, duration: 0.8, onUpdate: render }).addLabel('s0');
    tl.to(st, { fade: 1, duration: 0.8, onUpdate: render }).addLabel('s1');
    tl.to(st, { slide: 1, duration: 1.6, onUpdate: render }).addLabel('s2');
    tl.to(st, { flip: 1, duration: 0.8, onUpdate: render }).addLabel('s3');
  });
})();
