/*
 * Scene degli Atti II e III: l'albero come tagli del quadrato Ω, l'esercizio
 * delle tre monete, il ribaltamento dell'albero attacco → allarme.
 * I testi stanno nelle <section> di index.html; motore e utilità: scene.js,
 * comuni.js.
 */
(function () {
  'use strict';

  var svg = PSI.svg, text = PSI.text, C = S2.C;

  function line(root, a, b, cls) {
    return svg('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], 'class': cls || 'tr-branch' }, root);
  }
  function len(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }
  // Etichetta di un ramo: a metà, spostata sopra (dy < 0) o sotto la linea.
  function branchLabel(root, a, b, s, dy, cls) {
    return text(root, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + dy, s, cls || 'tr-p halo', { 'text-anchor': 'middle' });
  }

  // ── L'albero è un rettangolo tagliato ──
  //
  // Albero: P(A) = 0.4, P(B|A) = 0.7, P(B|Aᶜ) = 0.3. A destra lo stesso
  // albero come tagli del quadrato Ω (area 1): colonne = primo livello,
  // tagli orizzontali = secondo livello, rettangoli = foglie.
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

  // ── Esercizio: il test medico con il solo albero ──
  PSI.scene('albero-medico', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var N = { r: [36, 210], h: [240, 105], nh: [240, 315] };
    var LY = [48, 160, 262, 372], LX = 440;
    var E = [['r', 'h', '0.01', -12], ['r', 'nh', '0.99', 28]];
    var br = [], lb = [];
    E.forEach(function (e) {
      br.push(line(root, N[e[0]], N[e[1]]));
      lb.push(branchLabel(root, N[e[0]], N[e[1]], e[2], e[3]));
    });
    var LEAF = [['h', 'H∩E', '0.95', '0.0095', 1], ['h', 'H∩Eᶜ', '0.05', '0.0005', 0],
      ['nh', 'Hᶜ∩E', '0.10', '0.0990', 1], ['nh', 'Hᶜ∩Eᶜ', '0.90', '0.8910', 0]];
    var boxes = [], leafE = [];
    LEAF.forEach(function (l, i) {
      var end = [LX, LY[i]];
      br.push(line(root, N[l[0]], end));
      lb.push(branchLabel(root, N[l[0]], end, l[2], i % 2 ? 24 : -10));
      var box = svg('rect', { x: LX + 6, y: LY[i] - 24, width: 206, height: 46, rx: 9, 'class': 'am-box' }, root);
      var t = text(root, LX + 18, LY[i] + 8, '', 'tm-leafname');
      var s1 = svg('tspan', { 'class': l[4] ? 'am-e' : '' }, t); s1.textContent = l[1] + '  ';
      var s2 = svg('tspan', { 'class': 'tm-leafval' }, t); s2.textContent = '[' + l[3] + ']';
      boxes.push(box, t);
      if (l[4]) leafE.push(box);
    });
    [N.r, N.h, N.nh].forEach(function (p) { svg('circle', { cx: p[0], cy: p[1], r: 7, 'class': 'tr-node' }, root); });
    text(root, N.h[0], N.h[1] - 18, 'H', 'rb-name rb-h it', { 'text-anchor': 'middle' });
    text(root, N.nh[0], N.nh[1] + 38, 'Hᶜ', 'rb-name it', { 'text-anchor': 'middle' });

    var lines = q.all('.am-l');
    gsap.set([br, lb, boxes], { opacity: 0 });
    gsap.set(lines, { opacity: 0 });
    tl.to([br.slice(0, 2), lb.slice(0, 2)], { opacity: 1, duration: 0.5 })
      .to([br.slice(2), lb.slice(2)], { opacity: 1, duration: 0.5 })
      .to(boxes, { opacity: 1, duration: 0.4, stagger: 0.05 })
      .addLabel('s0');
    // 1. Positivo: contano solo le foglie con E.
    tl.to(leafE, { stroke: C.e, strokeWidth: 3, fill: 'rgba(251, 191, 36, 0.14)', duration: 0.5 })
      .addLabel('s1');
    // 2. Somma delle foglie con E.
    tl.to(lines[0], { opacity: 1, duration: 0.5 }).addLabel('s2');
    // 3. La parte che viene da H.
    tl.to(leafE[0], { stroke: C.sel, duration: 0.4 })
      .to(lines[1], { opacity: 1, duration: 0.5 }, '<')
      .to(lines[2], { opacity: 1, duration: 0.5 })
      .addLabel('s3');
  });

  // ── Esercizio: tre lanci di moneta ──
  PSI.scene('monete', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var XS = [30, 170, 310, 450], LY = [];
    for (var i = 0; i < 8; i++) LY.push(30 + i * 54);
    // Nodi per livello: y del livello 3 = foglie, poi medie a coppie.
    var ys = [LY];
    for (var l = 0; l < 3; l++) {
      var prev = ys[0], next = [];
      for (var k = 0; k < prev.length; k += 2) next.push((prev[k] + prev[k + 1]) / 2);
      ys.unshift(next);
    }
    var levels = [[], [], []], leaves = [];
    for (l = 0; l < 3; l++) {
      ys[l].forEach(function (y, k) {
        [0, 1].forEach(function (c) {
          var a = [XS[l], y], b = [XS[l + 1], ys[l + 1][2 * k + c]];
          var b1 = line(root, a, b, 'tr-branch ' + (c ? 'mn-c' : 'mn-t'));
          var sub = '₁₂₃'[l];
          var t = text(root, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (c ? 22 : -9), (c ? 'C' : 'T') + sub + ' ½', 'mn-lbl halo', { 'text-anchor': 'middle' });
          levels[l].push(b1, t);
        });
      });
    }
    svg('circle', { cx: XS[0], cy: ys[0][0], r: 6, 'class': 'tr-node' }, root);
    // Foglie: stringa degli esiti e ⅛.
    var outcomes = [];
    for (i = 0; i < 8; i++) {
      var s = ((i & 4) ? 'C' : 'T') + ((i & 2) ? 'C' : 'T') + ((i & 1) ? 'C' : 'T');
      outcomes.push(s);
      var g = svg('g', {}, root);
      var bg = svg('rect', { x: XS[3] + 8, y: LY[i] - 20, width: 190, height: 40, rx: 8, 'class': 'mn-bg' }, g);
      text(root, XS[3] + 18, LY[i] + 8, s.split('').map(function (ch, k) { return ch + '₁₂₃'[k]; }).join('∩'), 'mn-leaf');
      text(root, XS[3] + 170, LY[i] + 8, '⅛', 'mn-eighth', { 'text-anchor': 'middle' });
      leaves.push(bg);
    }
    var two = leaves.filter(function (b, i) { return (outcomes[i].match(/T/g) || []).length === 2; });
    var none = leaves[7], some = leaves.slice(0, 7);

    var q1 = [q.one('.mn-q1')], a1 = q.one('.mn-a1'), q2 = q.one('.mn-q2'), a2 = q.one('.mn-a2');
    gsap.set(levels[0].concat(levels[1], levels[2]), { opacity: 0 });
    gsap.set([q1, a1, q2, a2, q.one('.mn-note')], { opacity: 0 });
    levels.forEach(function (lv) { tl.to(lv, { opacity: 1, duration: 0.35 }); });
    tl.to(q.one('.mn-note'), { opacity: 1, duration: 0.4 })
      .addLabel('s0');
    tl.to(q1, { opacity: 1, duration: 0.4 }).addLabel('s1');
    tl.to(two, { fill: C.sel, opacity: 0.35, duration: 0.4, stagger: 0.12 })
      .to(a1, { opacity: 1, duration: 0.4 })
      .addLabel('s2');
    tl.to(two, { opacity: 0, duration: 0.3 })
      .to([q1, a1], { opacity: 0.35, duration: 0.3 }, '<')
      .to(q2, { opacity: 1, duration: 0.4 })
      .addLabel('s3');
    tl.to(none, { fill: C.h, opacity: 0.4, duration: 0.4 })
      .to(some, { fill: C.sel, opacity: 0.25, duration: 0.4 }, '+=0.3')
      .to(a2, { opacity: 1, duration: 0.4 })
      .addLabel('s4');
  });

  // ── Ribaltare l'albero ──
  //
  // Quattro stati: 0 albero causale (prima H, poi E) con le foglie disegnate
  // come quadrati di area proporzionale alla probabilità; 1 i rami verso Eᶜ
  // si spengono e le foglie con E si accendono; 2 le foglie scivolano a destra
  // riordinate per E / Eᶜ, con colore e area invariati, e nasce il nodo E con
  // la somma; 3 compaiono i rami ribaltati con i posterior.
  // Tutto è ridisegnato da render() a partire da st: cursori, scala delle
  // aree e pulsante «Ribalta» restano coerenti con gli step.
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
