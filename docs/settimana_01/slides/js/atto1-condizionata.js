/*
 * Scene animate dell'Atto I, seconda parte: la probabilità condizionata e
 * ciò che ne discende (prodotto, indipendenza, affidabilità).
 * I testi stanno nelle <section> di index.html; qui ci sono i disegni e le
 * timeline. Motore e utilità: scene.js.
 */
(function () {
  'use strict';

  var TAU = 2 * Math.PI;

  // ── Probabilità condizionata: lo zoom sull'evento B ──
  //
  // Ω è un rettangolo di area 1: le aree dei cerchi sono esattamente
  // P(A) = 0.30, P(B) = 0.10 e P(A∩B) = 0.06, quindi P(A|B) = 0.60.
  // Dopo lo zoom il disco B si deforma nel rettangolo che era Ω, portandosi
  // dietro le sue regioni: alla fine A∩B occupa il 60% del nuovo Ω.

  // Mappa ellittica di Fong: disco unitario → quadrato [-1, 1]², liscia
  // all'interno e con la circonferenza che finisce sul bordo del quadrato.
  function discToSquare(u, v) {
    var t = 2 * Math.SQRT2, uu = u * u, vv = v * v;
    return [
      0.5 * Math.sqrt(Math.max(0, 2 + uu - vv + t * u)) - 0.5 * Math.sqrt(Math.max(0, 2 + uu - vv - t * u)),
      0.5 * Math.sqrt(Math.max(0, 2 - uu + vv + t * v)) - 0.5 * Math.sqrt(Math.max(0, 2 - uu + vv - t * v))
    ];
  }

  // Angoli da t0 a t1, più fitti vicino alle diagonali (che diventano gli angoli del rettangolo).
  function arcAngles(t0, t1) {
    var out = [t0], t = t0;
    while (t < t1) {
      var nearCorner = Math.abs(((t % (Math.PI / 2)) + Math.PI / 2) % (Math.PI / 2) - Math.PI / 4) < 0.09;
      t = Math.min(t1, t + (nearCorner ? 0.0035 : 0.0175));
      out.push(t);
    }
    return out;
  }

  function polygonArea(pts) {
    var s = 0;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) s += pts[j].x * pts[i].y - pts[i].x * pts[j].y;
    return s / 2;
  }

  function polygonCentroid(pts) {
    var a = polygonArea(pts), cx = 0, cy = 0;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var f = pts[j].x * pts[i].y - pts[i].x * pts[j].y;
      cx += (pts[j].x + pts[i].x) * f;
      cy += (pts[j].y + pts[i].y) * f;
    }
    return { x: cx / (6 * a), y: cy / (6 * a), area: Math.abs(a) };
  }

  function pathD(pts, close) {
    return 'M' + pts.map(function (p) { return p.x.toFixed(2) + ',' + p.y.toFixed(2); }).join('L') + (close ? 'Z' : '');
  }

  PSI.scene('zoom', function (el, tl) {
    var q = PSI.q(el);
    var geo = PSI.geo;
    var OMEGA = { x: 20, y: 20, w: 660, h: 420, r: 16 }; // il rettangolo Ω nel viewBox
    var area = OMEGA.w * OMEGA.h;
    var pA = 0.30, pB = 0.10, pAB = 0.06;
    var rA = geo.radius(pA * area);
    var rB = geo.radius(pB * area);
    var d = geo.distanceForLens(rA, rB, pAB * area);
    var angle = -20 * Math.PI / 180;
    var A = { x: 270, y: 240 };
    var B = { x: A.x + d * Math.cos(angle), y: A.y + d * Math.sin(angle) };

    // Dopo lo zoom B è al centro della cornice e ne occupa l'altezza.
    var center = { x: 350, y: 228 };
    var k = 400 / (2 * rB);
    function zoomed(p) {
      return { x: center.x + k * (p.x - B.x), y: center.y + k * (p.y - B.y) };
    }
    function unzoomed(p) {
      return { x: B.x + (p.x - center.x) / k, y: B.y + (p.y - center.y) / k };
    }
    function onB(u) { // punto del piano dato in unità del disco B (centro B, raggio 1)
      return { x: B.x + rB * u[0], y: B.y + rB * u[1] };
    }

    // Bordo della lente A∩B: arco di B dentro A e arco di A dentro B,
    // in unità del disco B.
    var a = [(A.x - B.x) / rB, (A.y - B.y) / rB], ra = rA / rB;
    var D = Math.hypot(a[0], a[1]);
    var along = (1 - ra * ra + D * D) / (2 * D), h = Math.sqrt(1 - along * along);
    var e = [a[0] / D, a[1] / D];
    var P = [
      [along * e[0] - h * e[1], along * e[1] + h * e[0]],
      [along * e[0] + h * e[1], along * e[1] - h * e[0]]
    ];
    function near(t, ref) {
      while (t < ref - Math.PI) t += TAU;
      while (t > ref + Math.PI) t -= TAU;
      return t;
    }
    var towardA = Math.atan2(a[1], a[0]);
    var tB = P.map(function (p) { return near(Math.atan2(p[1], p[0]), towardA); });
    var lo = Math.min(tB[0], tB[1]), hi = Math.max(tB[0], tB[1]);
    var bArc = arcAngles(lo, hi).map(function (t) { return [Math.cos(t), Math.sin(t)]; });
    var pHi = [Math.cos(hi), Math.sin(hi)], pLo = [Math.cos(lo), Math.sin(lo)];
    var towardB = Math.atan2(-a[1], -a[0]);
    var s0 = near(Math.atan2(pHi[1] - a[1], pHi[0] - a[0]), towardB);
    var s1 = near(Math.atan2(pLo[1] - a[1], pLo[0] - a[0]), towardB);
    var aArc = [];
    for (var i = 0; i <= 160; i++) {
      var s = s0 + (s1 - s0) * i / 160;
      aArc.push([a[0] + ra * Math.cos(s), a[1] + ra * Math.sin(s)]);
    }
    var circle = arcAngles(0, TAU).slice(0, -1).map(function (t) { return [Math.cos(t), Math.sin(t)]; });

    // Destinazione della deformazione, nelle coordinate della cornice:
    // il quadrato va sul rettangolo Ω, e i punti del bordo seguono gli angoli arrotondati.
    function toOmega(u) {
      var sq = discToSquare(u[0], u[1]);
      return { x: OMEGA.x + (sq[0] + 1) / 2 * OMEGA.w, y: OMEGA.y + (sq[1] + 1) / 2 * OMEGA.h };
    }
    function roundCorner(p) {
      var r = OMEGA.r;
      var cx = p.x < OMEGA.x + r ? OMEGA.x + r : p.x > OMEGA.x + OMEGA.w - r ? OMEGA.x + OMEGA.w - r : null;
      var cy = p.y < OMEGA.y + r ? OMEGA.y + r : p.y > OMEGA.y + OMEGA.h - r ? OMEGA.y + OMEGA.h - r : null;
      if (cx === null || cy === null) return p;
      var len = Math.hypot(p.x - cx, p.y - cy);
      return { x: cx + (p.x - cx) / len * r, y: cy + (p.y - cy) / len * r };
    }
    function boundary(u) { return roundCorner(toOmega(u)); }

    // La mappa ellittica non conserva esattamente le aree: la lente arriva a
    // circa il 58%. L'arco di A va dal bordo superiore a quello inferiore di Ω,
    // quindi spostarlo in orizzontale di δ cambia l'area di δ·altezza, e basta
    // un δ di pochi pixel per avere esattamente P(A|B) = 60%.
    var omegaArea = area - (4 - Math.PI) * OMEGA.r * OMEGA.r;
    var lensRaw = bArc.map(boundary).concat(aArc.map(toOmega));
    var shift = (pAB / pB * omegaArea - Math.abs(polygonArea(lensRaw))) / OMEGA.h;
    var aArcEnd = aArc.map(function (u) { var p = toOmega(u); return { x: p.x + shift, y: p.y }; });
    var lensEnd = bArc.map(boundary).concat(aArcEnd);
    var green = polygonCentroid(lensEnd);
    var restX = (omegaArea * 350 - green.area * green.x) / (omegaArea - green.area);
    var restY = (omegaArea * 230 - green.area * green.y) / (omegaArea - green.area);

    // Percorsi (nel sistema del gruppo che fa lo zoom): stato iniziale e finale.
    function inWorld(pts) { return pts.map(unzoomed); }
    var dB0 = pathD(circle.map(onB), true);
    var dB1 = pathD(inWorld(circle.map(boundary)), true);
    var dLens0 = pathD(bArc.concat(aArc).map(onB), true);
    var dLens1 = pathD(inWorld(lensEnd), true);
    var dArc0 = pathD(aArc.map(onB), false);
    var dArc1 = pathD(inWorld(aArcEnd), false);

    var world = q.one('.zm-world');
    var bFill = q.one('.zm-b-fill'), bLine = q.one('.zm-b-line');
    var lens = q.one('.zm-lens'), arcEl = q.one('.zm-arc');
    var lblLens = q.one('.zm-lbl-lens'), lblB = q.one('.zm-lbl-b');
    var shapes = q.all('.zm-world .omega, .zm-world .set-a, .zm-b-line');
    var steps = q.all('.scene-steps li');

    gsap.set(q.one('#zm-a'), { attr: { cx: A.x, cy: A.y, r: rA } });
    gsap.set(q.one('#zm-b'), { attr: { cx: B.x, cy: B.y, r: rB } });
    gsap.set([bFill, bLine], { attr: { d: dB0 } });
    gsap.set(lens, { attr: { d: dLens0 } });
    gsap.set(arcEl, { attr: { d: dArc0 }, strokeWidth: 3.5 / k });
    var labelB = { x: B.x + 0.78 * rB, y: B.y - 0.82 * rB };
    // Centro della lente sull'asse dei centri: va da D − ra (arco di A) a 1 (bordo di B).
    var tMid = (D - ra + 1) / 2;
    var lensMid = zoomed(onB([tMid * e[0], tMid * e[1]]));
    gsap.set(q.one('.zm-lbl-a'), { attr: { x: A.x - 0.74 * rA, y: A.y - 0.74 * rA } });
    gsap.set(lblB, { attr: labelB });
    gsap.set(lblLens, { attr: { x: lensMid.x, y: lensMid.y } });
    gsap.set(q.one('.zm-lbl-rest'), { attr: { x: restX, y: restY - 18 } });
    gsap.set(q.one('.zm-pct-lens'), { attr: { x: green.x, y: green.y + 24 } });
    gsap.set(q.one('.zm-pct-rest'), { attr: { x: restX, y: restY + 24 } });
    gsap.set(world, { svgOrigin: B.x + ' ' + B.y });

    var ending = [q.one('.zm-lbl-new'), q.one('.zm-lbl-rest'), q.one('.zm-pct-lens'), q.one('.zm-pct-rest')];
    gsap.set([q.one('.omega'), q.all('.math-lbl'), ending, bFill, lens, arcEl,
      q.one('.zm-void'), q.one('.zm-void-lbl'), q.one('.scene-legend'),
      q.one('.scene-def'), q.one('.scene-note')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.2 });
    gsap.set([q.one('.scene-def'), q.one('.scene-note')], { y: 12 });

    function length(dPts) {
      var L = 0;
      for (var i = 1; i < dPts.length; i++) L += Math.hypot(dPts[i].x - dPts[i - 1].x, dPts[i].y - dPts[i - 1].y);
      return L + Math.hypot(dPts[0].x - dPts[dPts.length - 1].x, dPts[0].y - dPts[dPts.length - 1].y);
    }

    // Ingresso: Ω con A e B, e i dati.
    tl.to(q.one('.omega'), { opacity: 1, duration: 0.4 });
    PSI.draw(tl, q.one('.set-a'), TAU * rA, {}, '-=0.1');
    PSI.draw(tl, bLine, length(circle.map(onB)), {}, '<0.3');
    tl.to(bFill, { opacity: 1, duration: 0.6 }, '<')
      .to([q.one('.zm-lbl-omega'), q.one('.zm-lbl-a'), lblB], { opacity: 1, duration: 0.4 }, '-=0.3')
      .to(q.one('.scene-legend'), { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s0');

    // 1. Fuori da B tutto diventa impossibile.
    tl.to(q.one('.zm-void'), { opacity: 0.86, duration: 0.8 })
      .to(q.one('.zm-void-lbl'), { opacity: 1, duration: 0.4 }, '<0.4')
      .to(steps[0], { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s1');

    // 2. Zoom su B.
    var zoom = { duration: 1.6, ease: 'power2.inOut' };
    var labelBz = zoomed(labelB);
    tl.to([q.one('.zm-lbl-omega'), q.one('.zm-lbl-a'), q.one('.zm-void-lbl')], { opacity: 0, duration: 0.3 })
      .to(world, Object.assign({ scale: k, x: center.x - B.x, y: center.y - B.y }, zoom), '<')
      .to(shapes, Object.assign({ strokeWidth: function (i, target) {
        return parseFloat(getComputedStyle(target).strokeWidth) / k;
      } }, zoom), '<')
      .to(lblB, Object.assign({ attr: { x: labelBz.x, y: labelBz.y } }, zoom), '<')
      .to(steps[1], { opacity: 1, duration: 0.4 }, '-=0.4')
      .addLabel('s2');

    // 3. Dentro B, A sopravvive solo come A∩B.
    tl.to([lens, arcEl], { opacity: function (i) { return i ? 1 : 0.6; }, duration: 0.6 })
      .to(lblLens, { opacity: 1, duration: 0.4 }, '<0.2')
      .to(steps[2], { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s3');

    // 4. Il vecchio Ω sparisce e B si deforma nel rettangolo: è il nuovo Ω.
    var t4 = tl.duration();
    var morph = { duration: 1.9, ease: 'power2.inOut' };
    tl.to([q.one('.zm-world .omega'), q.one('.zm-world .set-a'), q.one('.zm-void')], { opacity: 0, duration: 0.6 }, t4)
      .to(lblB, { opacity: 0, duration: 0.3 }, t4)
      .to(steps[3], { opacity: 1, duration: 0.4 }, t4)
      .set(bLine, { strokeDasharray: 'none' }, t4)
      .to(bLine, Object.assign({ attr: { d: dB1 }, stroke: 'rgba(203, 213, 224, 0.55)', strokeWidth: 2 / k }, morph), t4 + 0.4)
      .to(bFill, Object.assign({ attr: { d: dB1 }, fill: 'rgba(251, 191, 36, 0.24)' }, morph), t4 + 0.4)
      .to(lens, Object.assign({ attr: { d: dLens1 }, opacity: 0.72 }, morph), t4 + 0.4)
      .to(arcEl, Object.assign({ attr: { d: dArc1 } }, morph), t4 + 0.4)
      .to(lblLens, Object.assign({ attr: { x: green.x, y: green.y - 18 } }, morph), t4 + 0.4)
      .to(ending, { opacity: 1, duration: 0.5, stagger: 0.12 }, t4 + 2.1)
      .addLabel('s4');

    // 5. La formula: dividere per P(B).
    tl.to(q.one('.scene-def'), { opacity: 1, y: 0, duration: 0.5 })
      .to(q.one('.scene-note'), { opacity: 1, y: 0, duration: 0.5 }, '-=0.1')
      .addLabel('s5');
  });

  var svg = PSI.svg, text = PSI.text;

  // ── Zoom nel discreto: il mazzo da 52 ──
  PSI.scene('mazzo', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');
    var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    var SUITS = [['♥', true], ['♦', true], ['♣', false], ['♠', false]];
    var CW = 48, CH = 70, GAP = 6, X0 = 30, Y0 = 44, ROW = CH + 14;
    var cards = [];
    var rows = SUITS.map(function (suit, r) {
      var g = svg('g', {}, root);
      RANKS.forEach(function (rank, c) {
        var x = X0 + c * (CW + GAP), y = Y0 + r * ROW;
        var card = svg('g', { 'class': 'deck-card' + (suit[1] ? ' red' : '') }, g);
        svg('rect', { x: x, y: y, width: CW, height: CH, rx: 6 }, card);
        text(card, x + 6, y + 19, rank, 'deck-rank');
        text(card, x + CW / 2, y + 54, suit[0], 'deck-suit', { 'text-anchor': 'middle' });
        cards.push(card);
      });
      return g;
    });
    var width = 13 * (CW + GAP) - GAP;
    var aces = svg('rect', { x: X0 - 5, y: Y0 - 6, width: CW + 10, height: 3 * ROW + CH + 12, rx: 10, 'class': 'deck-sel-a' }, root);
    var acesLbl = text(root, X0 + CW / 2, Y0 - 14, 'A', 'math-lbl it lbl-a small', { 'text-anchor': 'middle' });
    // Contorno e etichetta di B stanno nel gruppo dei cuori, così seguono lo zoom.
    var hearts = svg('rect', { x: X0 - 6, y: Y0 - 6, width: width + 12, height: CH + 12, rx: 10, 'class': 'deck-sel-b' }, rows[0]);
    var heartsLbl = text(rows[0], 13, Y0 + CH / 2 + 10, 'B', 'math-lbl it lbl-b small', { 'text-anchor': 'middle' });
    var aceOfHearts = cards[0].querySelector('rect');
    var result = text(root, X0 + width / 2, 330, '1 asso su 13 carte di cuori:  P(A | B) = 1/13', 'verdict good', { 'text-anchor': 'middle' });

    gsap.set([cards, aces, acesLbl, hearts, heartsLbl, result, q.one('.scene-note')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });

    tl.to(cards, { opacity: 1, duration: 0.25, stagger: { each: 0.008, grid: [4, 13], from: 'start', axis: 'x' } })
      .addLabel('s0');

    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to([aces, acesLbl], { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s1');

    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to([rows[1], rows[2], rows[3]], { opacity: 0.12, duration: 0.6 }, '<')
      .to([hearts, heartsLbl], { opacity: 1, duration: 0.5 }, '<0.3')
      .addLabel('s2');

    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .to([rows[1], rows[2], rows[3], aces, acesLbl], { opacity: 0, duration: 0.5 }, '<')
      .to(rows[0], { y: 150, duration: 1.2, ease: 'power2.inOut' }, '<0.2')
      .to(aceOfHearts, { fill: 'rgba(56, 239, 125, 0.3)', stroke: '#38ef7d', strokeWidth: 3, duration: 0.5 })
      .to(result, { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s3');

    tl.to(steps[3], { opacity: 1, duration: 0.4 })
      .to(q.one('.scene-note'), { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s4');
  });

  // ── Classica e frequentista: due strade verso la stessa definizione ──
  PSI.scene('frequentista', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var COLS = 26, N = 520, T = 18, G = 3, X0 = 7, Y0 = 10;
    var rnd = PSI.random(1933);
    var tiles = [], nB = [0], nAB = [0];
    for (var i = 0; i < N; i++) {
      var card = Math.floor(rnd() * 52);
      var heart = card < 13, ace = card % 13 === 0;
      var x = X0 + (i % COLS) * (T + G), y = Y0 + Math.floor(i / COLS) * (T + G);
      var g = svg('g', { 'class': 'fq-tile' + (heart ? (ace ? ' hit' : ' heart') : '') }, root);
      svg('rect', { x: x, y: y, width: T, height: T, rx: 3 }, g);
      if (ace) text(g, x + T / 2, y + 13.5, 'A', 'fq-ace', { 'text-anchor': 'middle' });
      g.style.display = 'none';
      tiles.push(g);
      nB.push(nB[i] + (heart ? 1 : 0));
      nAB.push(nAB[i] + (heart && ace ? 1 : 0));
    }
    var outB = q.one('.fq-b'), outAB = q.one('.fq-ab'), outR = q.one('.fq-r'), outN = q.one('.fq-n');
    var st = { n: 0 }, shown = 0;
    function render() {
      var n = Math.round(st.n);
      while (shown < n) tiles[shown++].style.display = '';
      while (shown > n) tiles[--shown].style.display = 'none';
      outN.textContent = n;
      outB.textContent = nB[n];
      outAB.textContent = nAB[n];
      outR.textContent = nB[n] ? (nAB[n] / nB[n]).toFixed(3) : '—';
    }
    render();

    gsap.set([q.one('.fq-freq'), q.one('.fq-live'), q.one('.fq-def')], { opacity: 0 });
    tl.addLabel('s0');
    tl.to([q.one('.fq-freq'), q.one('.fq-live')], { opacity: 1, duration: 0.4 })
      .to(st, { n: N, duration: 5, ease: 'power2.in', onUpdate: render })
      .addLabel('s1');
    tl.to(q.one('.fq-def'), { opacity: 1, duration: 0.5 })
      .addLabel('s2');
  });

  // ── La regola del prodotto: albero delle estrazioni e pipeline a catena ──
  PSI.scene('prodotto', function (el, tl) {
    var q = PSI.q(el), boards = q.all('svg'), tree = boards[0], pipe = boards[1];

    // Albero delle due estrazioni senza reimmissione.
    var NODE = { r: [40, 185], a: [230, 95], na: [230, 275], aa: [410, 50], ana: [410, 140], naa: [410, 230], nana: [410, 320] };
    var EDGE = [['r', 'a', '4/52', 118, 128], ['r', 'na', '48/52', 118, 258], ['a', 'aa', '3/51', 304, 58],
      ['a', 'ana', '48/51', 312, 144], ['na', 'naa', '4/51', 304, 238], ['na', 'nana', '47/51', 312, 322]];
    var branch = {}, probs = [];
    EDGE.forEach(function (e) {
      branch[e[1]] = svg('line', { x1: NODE[e[0]][0], y1: NODE[e[0]][1], x2: NODE[e[1]][0], y2: NODE[e[1]][1], 'class': 'tr-branch' }, tree);
      probs.push(text(tree, e[3], e[4], e[2], 'tr-p', { 'text-anchor': 'middle' }));
    });
    var dot = {};
    Object.keys(NODE).forEach(function (k) { dot[k] = svg('circle', { cx: NODE[k][0], cy: NODE[k][1], r: 7, 'class': 'tr-node' }, tree); });
    var names = [
      text(tree, 220, 78, 'asso', 'tr-name', { 'text-anchor': 'end' }),
      text(tree, 220, 302, 'non asso', 'tr-name', { 'text-anchor': 'end' }),
      text(tree, 422, 56, 'asso', 'tr-name'), text(tree, 422, 146, 'non asso', 'tr-name'),
      text(tree, 422, 236, 'asso', 'tr-name'), text(tree, 422, 326, 'non asso', 'tr-name')
    ];
    var product = text(tree, 300, 22, '1/13 · 1/17 = 1/221 ≈ 0.0045', 'tr-prod', { 'text-anchor': 'middle' });

    // Pipeline: ogni fase tiene una frazione di ciò che resta, come zoom successivi.
    var P = { x: 30, y: 40, w: 500, h: 300 };
    svg('rect', { x: P.x, y: P.y, width: P.w, height: P.h, 'class': 'pp-base' }, pipe);
    var cuts = [
      svg('rect', { x: P.x + 0.90 * P.w, y: P.y, width: 0.10 * P.w, height: P.h, 'class': 'pp-cut' }, pipe),
      svg('rect', { x: P.x, y: P.y + 0.80 * P.h, width: 0.90 * P.w, height: 0.20 * P.h, 'class': 'pp-cut' }, pipe),
      svg('rect', { x: P.x + 0.90 * 0.95 * P.w, y: P.y, width: 0.90 * 0.05 * P.w, height: 0.80 * P.h, 'class': 'pp-cut' }, pipe)
    ];
    var keep = svg('rect', { x: P.x, y: P.y, width: 0.855 * P.w, height: 0.80 * P.h, 'class': 'pp-keep' }, pipe);
    svg('rect', { x: P.x, y: P.y, width: P.w, height: P.h, 'class': 'omega' }, pipe);
    var cutLbl = [
      text(pipe, P.x + P.w, P.y + P.h + 22, 'M ✗ 10%', 'pp-lbl', { 'text-anchor': 'end' }),
      text(pipe, P.x + 0.45 * P.w, P.y + 0.90 * P.h + 7, 'D ✗ 20%', 'pp-lbl', { 'text-anchor': 'middle' }),
      text(pipe, P.x + 0.8775 * P.w, P.y - 10, 'T ✗ 5%', 'pp-lbl', { 'text-anchor': 'middle' })
    ];
    var count = text(pipe, P.x + 0.4275 * P.w, P.y + 0.40 * P.h + 14, '1000', 'pp-count', { 'text-anchor': 'middle' });
    var countLbl = text(pipe, P.x + 0.4275 * P.w, P.y + 0.40 * P.h + 44, 'release', 'pp-lbl', { 'text-anchor': 'middle' });
    var formula = text(pipe, 280, 365, '0.90 × 0.80 × 0.95 = 0.684', 'pp-formula', { 'text-anchor': 'middle' });
    var VALUES = [1000, 900, 720, 684];
    var st = { k: 0 };
    function render() { count.textContent = VALUES[Math.floor(st.k + 1e-6)]; }
    render();

    var path = [branch.a, branch.aa, dot.r, dot.a, dot.aa];
    gsap.set([Object.keys(branch).map(function (k) { return branch[k]; }), probs, names, product,
      ['a', 'na', 'aa', 'ana', 'naa', 'nana'].map(function (k) { return dot[k]; }),
      cuts, keep, cutLbl, formula, q.one('.pr-chain')], { opacity: 0 });
    tl.addLabel('s0');

    // 1. L'albero cresce.
    tl.to([branch.a, branch.na, probs[0], probs[1]], { opacity: 1, duration: 0.5 })
      .to([dot.a, dot.na, names[0], names[1]], { opacity: 1, duration: 0.4 }, '<0.3')
      .to([branch.aa, branch.ana, branch.naa, branch.nana, probs.slice(2)], { opacity: 1, duration: 0.5 })
      .to([dot.aa, dot.ana, dot.naa, dot.nana, names.slice(2)], { opacity: 1, duration: 0.4 }, '<0.3')
      .addLabel('s1');

    // 2. Il percorso «asso, asso»: le probabilità lungo il ramo si moltiplicano.
    tl.to(path, { stroke: '#38ef7d', duration: 0.5 })
      .to([branch.a, branch.aa], { strokeWidth: 5, duration: 0.5 }, '<')
      .to([dot.r, dot.a, dot.aa], { fill: '#38ef7d', duration: 0.5 }, '<')
      .to(product, { opacity: 1, duration: 0.5 })
      .addLabel('s2');

    // 3. La pipeline: 1000 release, poi 900, 720, 684.
    var t = tl.duration();
    cuts.forEach(function (cut, i) {
      var at = t + i * 1.1;
      tl.to([cut, cutLbl[i]], { opacity: 1, duration: 0.5 }, at)
        .to(st, { k: i + 1, duration: 0.01, onUpdate: render }, at + 0.3);
    });
    tl.to(keep, { opacity: 1, duration: 0.5 })
      .to(formula, { opacity: 1, duration: 0.5 }, '<')
      .addLabel('s3');

    tl.to(q.one('.pr-chain'), { opacity: 1, duration: 0.5 })
      .addLabel('s4');
  });

  // ── Indipendenza: sapere B non cambia la frazione di A ──
  PSI.scene('indipendenza', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');
    var X = 90, Y = 10, S = 420;
    var defs = svg('defs', {}, root);
    svg('rect', { x: X, y: Y, width: S, height: S }, svg('clipPath', { id: 'ind-frame' }, defs));

    // Prima parte: A striscia verticale (0.40), B striscia orizzontale (0.50).
    var part1 = svg('g', { 'clip-path': 'url(#ind-frame)' }, root);
    var stretch = svg('g', {}, part1);
    var stripA = svg('rect', { x: X, y: Y, width: 0.40 * S, height: S, 'class': 'band-l' }, stretch);
    var stripB = svg('rect', { x: X, y: Y + 0.50 * S, width: S, height: 0.50 * S, 'class': 'band-m' }, stretch);
    var both = svg('rect', { x: X, y: Y + 0.50 * S, width: 0.40 * S, height: 0.50 * S, 'class': 'band-hl' }, stretch);
    var outside = svg('rect', { x: X, y: Y, width: S, height: 0.50 * S, 'class': 'zm-void' }, stretch);
    var lblA = text(root, X + 0.20 * S, Y + 44, 'A', 'math-lbl it lbl-a halo', { 'text-anchor': 'middle' });
    var lblB = text(root, X + S - 16, Y + 0.50 * S + 44, 'B', 'math-lbl it lbl-b halo', { 'text-anchor': 'end' });
    var lblBoth = text(root, X + 0.20 * S, Y + 0.75 * S + 10, '0.20', 'band-num halo', { 'text-anchor': 'middle' });
    var lblNew = text(root, X + S - 16, Y + 44, 'B = nuovo Ω', 'zm-lbl-new halo', { 'text-anchor': 'end' });
    var lblFrac = text(root, X + 0.20 * S, Y + S / 2 + 10, '40% di B', 'band-num halo', { 'text-anchor': 'middle' });

    // Seconda parte: i voli. D striscia (0.90); A ha un gradino sul bordo di D.
    var part2 = svg('g', {}, root);
    var hA = 0.75 / 0.90, hOut = 0.05 / 0.10; // frazione di A dentro D e fuori da D
    svg('rect', { x: X, y: Y, width: 0.90 * S, height: S, 'class': 'band-m' }, part2);
    svg('path', { d: 'M' + X + ',' + (Y + (1 - hA) * S) + ' H' + (X + 0.90 * S) + ' V' + (Y + (1 - hOut) * S) +
      ' H' + (X + S) + ' V' + (Y + S) + ' H' + X + ' Z', 'class': 'band-l' }, part2);
    svg('line', { x1: X, y1: Y + 0.20 * S, x2: X + S, y2: Y + 0.20 * S, 'class': 'ind-ref' }, part2);
    text(part2, X + 16, Y + 40, 'D', 'math-lbl it lbl-b halo');
    text(part2, X + 16, Y + S - 20, 'A', 'math-lbl it lbl-a halo');
    text(part2, X + 0.45 * S, Y + 0.20 * S + 30, 'confine di A se fosse indipendente (0.80)', 'ind-ref-lbl halo', { 'text-anchor': 'middle' });
    text(part2, X + 0.45 * S, Y + 0.62 * S, 'A ∩ D = 0.75', 'band-num halo', { 'text-anchor': 'middle' });
    text(part2, X + 0.45 * S, Y + 0.62 * S + 30, 'invece di 0.72', 'ind-ref-lbl halo', { 'text-anchor': 'middle' });

    svg('rect', { x: X, y: Y, width: S, height: S, rx: 4, 'class': 'omega' }, root);

    gsap.set([stripA, stripB, both, outside, lblA, lblB, lblBoth, lblNew, lblFrac, part2,
      q.one('.scene-def'), q.one('.scene-note')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });
    gsap.set(stretch, { svgOrigin: (X + S / 2) + ' ' + (Y + S) });
    tl.addLabel('s0');

    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to([stripA, lblA], { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s1');

    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to([stripB, lblB], { opacity: 1, duration: 0.5 }, '<0.2')
      .to([both, lblBoth], { opacity: function (i) { return i ? 1 : 0.6; }, duration: 0.5 })
      .addLabel('s2');

    // 3. Zoom su B: dentro B, A occupa ancora il 40%.
    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .to(outside, { opacity: 0.86, duration: 0.6 }, '<')
      .to([lblB, lblBoth], { opacity: 0, duration: 0.3 })
      .to(stretch, { scaleY: 2, duration: 1.4, ease: 'power2.inOut' })
      .to([lblNew, lblFrac], { opacity: 1, duration: 0.5 }, '-=0.3')
      .to(q.one('.scene-def'), { opacity: 1, duration: 0.5 }, '<')
      .addLabel('s3');

    // 4. I voli: il bordo di A ha un gradino, quindi A e D sono dipendenti.
    tl.to(steps[3], { opacity: 1, duration: 0.4 })
      .to([part1, lblA, lblNew, lblFrac], { opacity: 0, duration: 0.5 }, '<')
      .to(part2, { opacity: 1, duration: 0.6 })
      .to(q.one('.scene-note'), { opacity: 1, duration: 0.5 }, '<0.3')
      .addLabel('s4');
  });

  // ── Il trabocchetto: disgiunti non vuol dire indipendenti (B si può trascinare) ──
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

  // ── Affidabilità: parallelo e serie, con componenti che si guastano ──
  PSI.scene('affidabilita', function (el, tl) {
    var q = PSI.q(el), boards = q.all('.rl-svg');
    var Q_SERIE = [0.01, 0.02, 0.02, 0.015, 0.02, 0.01];
    var cfg = { backup: 2, moduli: 3 };
    var st = { guastiPar: 0, guastoSer: 0 };

    function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
    function ends(root, ok) {
      svg('circle', { cx: 32, cy: 150, r: 14, 'class': 'rl-end' }, root);
      text(root, 32, 185, 'IN', 'rl-end-lbl', { 'text-anchor': 'middle' });
      svg('circle', { cx: 528, cy: 150, r: 14, 'class': 'rl-end ' + (ok ? 'ok' : 'ko') }, root);
      text(root, 528, 185, ok ? 'OUT' : 'guasto', 'rl-end-lbl' + (ok ? '' : ' bad'), { 'text-anchor': 'middle' });
    }
    function wire(root, d, live) { svg('path', { d: d, 'class': 'wire' + (live ? ' live' : '') }, root); }

    function drawParallel() {
      var root = boards[0], n = 1 + cfg.backup, failed = Math.min(n, Math.floor(st.guastiPar + 1e-6));
      clear(root);
      var ok = failed < n;
      wire(root, 'M46,150 H170', ok);
      wire(root, 'M390,150 H514', ok);
      for (var k = 0; k < n; k++) {
        var y = 150 + (k - (n - 1) / 2) * 52, up = k >= failed;
        wire(root, 'M170,150 V' + y + ' H210', up);
        wire(root, 'M350,' + y + ' H390 V150', up);
        svg('rect', { x: 210, y: y - 19, width: 140, height: 38, rx: 8, 'class': 'comp' + (up ? '' : ' down') }, root);
        text(root, 280, y + 6, (k === 0 ? 'disco' : 'backup ' + k) + (up ? '' : '  ✗'), 'comp-lbl', { 'text-anchor': 'middle' });
      }
      ends(root, ok);
    }

    function drawSeries() {
      var root = boards[1], n = cfg.moduli, broken = st.guastoSer >= 0.5 ? Math.min(1, n - 1) : -1;
      clear(root);
      var slot = 420 / n, w = Math.min(86, slot - 18), prev = 46, live = true;
      for (var k = 0; k < n; k++) {
        var x = 70 + k * slot + (slot - w) / 2, up = k !== broken;
        wire(root, 'M' + prev + ',150 H' + x, live);
        svg('rect', { x: x, y: 131, width: w, height: 38, rx: 8, 'class': 'comp' + (up ? '' : ' down') }, root);
        text(root, x + w / 2, 156, 'M' + (k + 1) + (up ? '' : ' ✗'), 'comp-lbl', { 'text-anchor': 'middle' });
        text(root, x + w / 2, 196, 'q = ' + Q_SERIE[k], 'comp-q', { 'text-anchor': 'middle' });
        if (!up) live = false;
        prev = x + w;
      }
      wire(root, 'M' + prev + ',150 H514', live);
      ends(root, live);
    }

    function sci(x) {
      if (x >= 1e-3) return String(+x.toFixed(4));
      var e = Math.floor(Math.log10(x)), m = +(x / Math.pow(10, e)).toFixed(2);
      return m + ' \\times 10^{' + e + '}';
    }
    function percent(p) {
      var k = Math.max(0, Math.ceil(-Math.log10(100 * (1 - p))) + 1);
      return String(+(100 * p).toFixed(k));
    }
    function formulas() {
      var loss = 0.01 * Math.pow(0.02, cfg.backup);
      var tex = 'P(\\text{perdita}) = 0.01' + (cfg.backup ? ' \\cdot 0.02' + (cfg.backup > 1 ? '^{' + cfg.backup + '}' : '') : '') + ' = ' + sci(loss);
      katex.render(tex, q.one('.rl-par-f'), { throwOnError: false });
      q.one('.rl-par-r').textContent = 'affidabilità ' + percent(1 - loss) + '%';
      var keep = Q_SERIE.slice(0, cfg.moduli).map(function (x) { return 1 - x; });
      var ok = keep.reduce(function (p, x) { return p * x; }, 1);
      katex.render('P(\\text{funziona}) = ' + keep.map(function (x) { return +x.toFixed(3); }).join(' \\cdot ') + ' = ' + ok.toFixed(4),
        q.one('.rl-ser-f'), { throwOnError: false });
      q.one('.rl-ser-r').textContent = 'rischio di disservizio ' + (100 * (1 - ok)).toFixed(2) + '%';
      q.one('.rl-n-par').textContent = cfg.backup;
      q.one('.rl-n-ser').textContent = cfg.moduli;
    }
    function render() { drawParallel(); drawSeries(); }
    render();
    formulas();

    // Pulsanti: aggiungere o togliere backup e moduli.
    q.all('.rl-ctrl button').forEach(function (b) {
      b.addEventListener('click', function () {
        this.blur();
        var key = b.dataset.sys, step = +b.dataset.step;
        var limits = { backup: [0, 4], moduli: [1, 6] }[key];
        cfg[key] = Math.max(limits[0], Math.min(limits[1], cfg[key] + step));
        render();
        formulas();
      });
    });

    gsap.set([q.one('.rl-par-out'), q.one('.rl-ser-out'), q.all('.rl-ctrl'), q.one('.scene-note')], { opacity: 0 });
    tl.addLabel('s0');

    // 1. Parallelo: si guastano uno dopo l'altro; il sistema cade solo alla fine.
    var t = tl.duration();
    [1, 2, 3].forEach(function (k, i) {
      tl.to(st, { guastiPar: k, duration: 0.01, onUpdate: render }, t + 0.6 + i * 1.1);
    });
    tl.to(q.one('.rl-par-out'), { opacity: 1, duration: 0.5 }, t + 3.2)
      .addLabel('s1');

    // 2. Serie: basta un modulo guasto per fermare tutto.
    t = tl.duration();
    tl.to(st, { guastiPar: 0, duration: 0.01, onUpdate: render }, t)
      .to(st, { guastoSer: 1, duration: 0.01, onUpdate: render }, t + 1.0)
      .to(q.one('.rl-ser-out'), { opacity: 1, duration: 0.5 }, t + 1.6)
      .addLabel('s2');

    // 3. Tutto riparato: ora si può giocare con il numero di componenti.
    t = tl.duration();
    tl.to(st, { guastoSer: 0, duration: 0.01, onUpdate: render }, t)
      .to([q.all('.rl-ctrl'), q.one('.scene-note')], { opacity: 1, duration: 0.5 }, t + 0.2)
      .addLabel('s3');
  });

  // ── La rivelazione: un contenitore sintattico perfetto, semanticamente vuoto ──
  PSI.scene('rivelazione', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var defs = svg('defs', {}, root);
    [['rv-head-e', '#38ef7d'], ['rv-head-o', '#4299e1']].forEach(function (m) {
      var marker = svg('marker', { id: m[0], viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto' }, defs);
      svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: m[1] }, marker);
    });
    var box = svg('g', {}, root);
    svg('rect', { x: 70, y: 96, width: 320, height: 250, rx: 22, 'class': 'rv-box' }, box);
    svg('rect', { x: 56, y: 80, width: 348, height: 24, rx: 10, 'class': 'rv-lid' }, box);
    text(box, 230, 60, 'la grammatica: gli assiomi', 'cap-lbl', { 'text-anchor': 'middle' });
    var axioms = [
      text(box, 230, 160, 'P(A) ≥ 0', 'rv-axiom', { 'text-anchor': 'middle' }),
      text(box, 230, 222, 'P(Ω) = 1', 'rv-axiom', { 'text-anchor': 'middle' }),
      text(box, 230, 284, 'P(⋃ Aᵢ) = Σ P(Aᵢ)', 'rv-axiom', { 'text-anchor': 'middle' })
    ];
    var ask = text(root, 230, 262, '?', 'rv-ask', { 'text-anchor': 'middle' });
    var rain = [
      text(root, 230, 392, '«Domani a Varese: pioggia al 70%»', 'rv-q', { 'text-anchor': 'middle' }),
      text(root, 230, 424, 'Che cos\'è Ω? Che cosa misura 0.70?', 'rv-q dim', { 'text-anchor': 'middle' })
    ];
    var poles = [
      svg('path', { d: 'M396,196 C462,196 470,118 522,118', 'class': 'rv-arrow e', 'marker-end': 'url(#rv-head-e)' }, root),
      text(root, 604, 112, 'polo epistemico', 'rv-pole e', { 'text-anchor': 'middle' }),
      text(root, 604, 138, 'nella mente', 'rv-pole-sub', { 'text-anchor': 'middle' }),
      svg('path', { d: 'M396,246 C462,246 470,324 522,324', 'class': 'rv-arrow o', 'marker-end': 'url(#rv-head-o)' }, root),
      text(root, 604, 318, 'polo ontico', 'rv-pole o', { 'text-anchor': 'middle' }),
      text(root, 604, 344, 'nella materia', 'rv-pole-sub', { 'text-anchor': 'middle' }),
      text(root, 604, 222, 'come riempirlo?', 'rv-pole-sub', { 'text-anchor': 'middle' })
    ];

    gsap.set([box, ask, rain, poles, q.one('.rv-photo'), q.one('.rv-quote'), q.one('.scene-note')], { opacity: 0 });
    tl.to(box, { opacity: 1, duration: 0.6 })
      .addLabel('s0');

    tl.to(axioms, { opacity: 0.3, duration: 0.5 })
      .to(ask, { opacity: 1, duration: 0.5 }, '<0.2')
      .to(rain, { opacity: 1, duration: 0.5, stagger: 0.3 })
      .addLabel('s1');

    tl.to([q.one('.rv-photo'), q.one('.rv-quote')], { opacity: 1, duration: 0.6 })
      .to(q.one('.scene-note'), { opacity: 1, duration: 0.5 }, '<0.3')
      .addLabel('s2');

    tl.to(poles, { opacity: 1, duration: 0.5, stagger: 0.15 })
      .addLabel('s3');
  });
})();
