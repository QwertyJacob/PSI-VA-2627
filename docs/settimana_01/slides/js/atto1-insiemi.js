/*
 * Scene animate dell'Atto I, prima parte: esperimento ed esito, spazio
 * campionario, eventi, operazioni tra insiemi e σ-algebra.
 * I testi stanno nelle <section> di index.html; qui ci sono i disegni e le
 * timeline. Motore e utilità: scene.js.
 */
(function () {
  'use strict';

  var TAU = 2 * Math.PI;
  var svg = PSI.svg, text = PSI.text;

  // Fa comparire un elemento SVG con un piccolo rimbalzo attorno a (x, y).
  function pop(tl, target, x, y, position) {
    gsap.set(target, { svgOrigin: x + ' ' + y, scale: 0.3, opacity: 0 });
    return tl.to(target, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, position);
  }

  // ── Esperimento ed esito: le due nozioni primitive ──
  PSI.scene('esperimento', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');

    var defs = svg('defs', {}, root);
    [['ex-head-a', '#38bdf8'], ['ex-head-b', '#fbbf24']].forEach(function (m) {
      var marker = svg('marker', { id: m[0], viewBox: '0 0 10 10', refX: 7, refY: 5,
        markerWidth: 5, markerHeight: 5, orient: 'auto' }, defs);
      svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: m[1] }, marker);
    });

    // Il ciclo: l'esperimento genera l'esito, l'esito definisce l'esperimento.
    var nodeE = svg('g', {}, root);
    svg('rect', { x: 30, y: 70, width: 200, height: 90, rx: 16, 'class': 'node' }, nodeE);
    text(nodeE, 130, 123, 'esperimento', 'node-lbl', { 'text-anchor': 'middle' });
    var nodeO = svg('g', {}, root);
    svg('circle', { cx: 520, cy: 115, r: 62, 'class': 'node' }, nodeO);
    text(nodeO, 520, 106, 'esito', 'node-lbl', { 'text-anchor': 'middle' });
    text(nodeO, 520, 143, 'ω', 'math-lbl it', { 'text-anchor': 'middle' });
    var arcTop = [
      svg('path', { d: 'M232,92 C315,22 395,22 462,72', 'class': 'flow flow-a', 'marker-end': 'url(#ex-head-a)' }, root),
      text(root, 347, 22, 'genera', 'flow-lbl', { 'text-anchor': 'middle' })
    ];
    var arcBottom = [
      svg('path', { d: 'M462,160 C395,212 315,212 232,142', 'class': 'flow flow-b', 'marker-end': 'url(#ex-head-b)' }, root),
      text(root, 347, 226, 'definisce', 'flow-lbl', { 'text-anchor': 'middle' })
    ];

    // 1. Idealizzare: si fissano gli esiti possibili, le contingenze restano fuori.
    var capIdeal = text(root, 40, 272, 'esiti possibili della moneta', 'cap-lbl');
    var chips = ['T', 'C'].map(function (s, i) {
      var g = svg('g', {}, root);
      svg('circle', { cx: 70 + i * 76, cy: 316, r: 27, 'class': 'chip' }, g);
      text(g, 70 + i * 76, 325, s, 'chip-lbl', { 'text-anchor': 'middle' });
      return g;
    });
    var junk = ['in piedi sul bordo', 'sparita in una fessura', 'colpo di vento anomalo'].map(function (s, i) {
      return text(root, 236, 300 + i * 26, '✗  ' + s, 'junk-lbl');
    });

    // 2. Uno e uno solo: ogni prova produce esattamente un esito.
    var capRuns = text(root, 40, 386, 'cinque prove', 'cap-lbl');
    var tokens = ['T', 'C', 'C', 'T', 'C'].map(function (s, i) {
      var g = svg('g', {}, root);
      svg('circle', { cx: 60 + i * 50, cy: 416, r: 18, 'class': 'token' }, g);
      text(g, 60 + i * 50, 423, s, 'token-lbl', { 'text-anchor': 'middle' });
      return g;
    });
    var never = [
      text(root, 336, 405, '✗  T e C insieme', 'junk-lbl bad'),
      text(root, 336, 430, '✗  nessun esito', 'junk-lbl bad')
    ];

    gsap.set([nodeE, nodeO, arcTop, arcBottom, capIdeal, junk, capRuns, never], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });

    tl.to(nodeE, { opacity: 1, duration: 0.4 })
      .to(nodeO, { opacity: 1, duration: 0.4 }, '<0.2')
      .to(arcTop, { opacity: 1, duration: 0.5 })
      .to(arcBottom, { opacity: 1, duration: 0.5 }, '<0.3')
      .addLabel('s0');

    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to(capIdeal, { opacity: 1, duration: 0.4 }, '<');
    chips.forEach(function (c, i) { pop(tl, c, 70 + i * 76, 316, i ? '<0.15' : '>'); });
    tl.to(junk, { opacity: 1, duration: 0.3, stagger: 0.2 })
      .to(junk, { opacity: 0.45, fill: '#fc8181', duration: 0.4 }, '+=0.2')
      .addLabel('s1');

    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to(capRuns, { opacity: 1, duration: 0.4 }, '<');
    tokens.forEach(function (tk, i) { pop(tl, tk, 60 + i * 50, 416, i ? '+=0.1' : '>'); });
    tl.to(never, { opacity: 1, duration: 0.4, stagger: 0.25 })
      .addLabel('s2');

    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .addLabel('s3');
  });

  // ── Lo spazio campionario Ω nei quattro regimi di cardinalità ──
  PSI.scene('omega', function (el, tl) {
    var q = PSI.q(el);
    var panels = q.all('.om-panel');
    var art = q.all('.om-svg');

    // 1. Finito: si pesca una carta tra Q, K, J.
    var cards = ['Q', 'K', 'J'].map(function (s, i) {
      var x = 50 + i * 62, g = svg('g', {}, art[0]);
      svg('rect', { x: x, y: 52, width: 50, height: 74, rx: 8, 'class': 'card-rect' }, g);
      text(g, x + 25, 100, s, 'card-letter', { 'text-anchor': 'middle' });
      gsap.set(g, { svgOrigin: (x + 25) + ' 89', scaleX: 0 });
      return g;
    });

    // 2. Prodotto cartesiano: due carte con reimmissione.
    var L = ['Q', 'K', 'J'], x0 = 86, y0 = 44, cw = 52, ch = 40;
    var heads = [], cells = [];
    L.forEach(function (s, i) {
      heads.push(text(art[1], x0 + i * cw + cw / 2, y0 - 10, s, 'hdr', { 'text-anchor': 'middle' }));
      heads.push(text(art[1], x0 - 18, y0 + i * ch + ch / 2 + 7, s, 'hdr', { 'text-anchor': 'middle' }));
    });
    L.forEach(function (first, i) {
      L.forEach(function (second, j) {
        var g = svg('g', {}, art[1]);
        svg('rect', { x: x0 + j * cw + 2, y: y0 + i * ch + 2, width: cw - 4, height: ch - 4, rx: 6, 'class': 'cell' }, g);
        text(g, x0 + j * cw + cw / 2, y0 + i * ch + ch / 2 + 7, first + second, 'cell-lbl', { 'text-anchor': 'middle' });
        cells.push(g);
      });
    });

    // 3. Infinito numerabile: stringhe che finiscono con GB, senza altri GB prima.
    var rows = [['GB'], ['BGB', 'GGB'], ['BBGB', 'BGGB', 'GGGB'], ['BBBGB', 'BBGGB', 'BGGGB', 'GGGGB']];
    var charW = 10.2, gap = 14;
    var lines = rows.map(function (row, i) {
      var width = row.reduce(function (sum, w) { return sum + w.length * charW; }, 0) + (row.length - 1) * gap;
      var x = 135 - width / 2, g = svg('g', {}, art[2]);
      row.forEach(function (word) {
        var t = svg('text', { x: x.toFixed(1), y: 38 + i * 36, 'class': 'seq' }, g);
        for (var c = 0; c < word.length; c++) {
          var span = svg('tspan', { 'class': (word[c] === 'G' ? 'seq-g' : 'seq-b') + (c >= word.length - 2 ? ' seq-end' : '') }, t);
          span.textContent = word[c];
        }
        x += word.length * charW + gap;
      });
      return g;
    });
    var dots = text(art[2], 135, 190, '⋮', 'seq-dots', { 'text-anchor': 'middle' });

    // 4. Continuo: l'angolo a cui si ferma la ruota della fortuna.
    var cx = 135, cy = 102, R = 70, theta = 245 * Math.PI / 180;
    var wheel = svg('g', {}, art[3]);
    svg('circle', { cx: cx, cy: cy, r: R, 'class': 'wheel' }, wheel);
    for (var k = 0; k < 24; k++) {
      var a = k * TAU / 24, r1 = k % 2 ? R - 6 : R - 11;
      svg('line', { x1: cx + r1 * Math.cos(a), y1: cy + r1 * Math.sin(a),
        x2: cx + R * Math.cos(a), y2: cy + R * Math.sin(a), 'class': 'tick' }, wheel);
    }
    text(wheel, cx + R + 12, cy + 6, '0', 'hdr small');
    var arcLength = R * theta;
    var arc = svg('path', { d: 'M' + (cx + R) + ',' + cy + ' A' + R + ',' + R + ' 0 1 1 ' +
      (cx + R * Math.cos(theta)).toFixed(2) + ',' + (cy + R * Math.sin(theta)).toFixed(2), 'class': 'wheel-arc' }, art[3]);
    var needle = svg('g', {}, art[3]);
    svg('line', { x1: cx, y1: cy, x2: cx + R - 14, y2: cy, 'class': 'needle' }, needle);
    svg('circle', { cx: cx + R - 14, cy: cy, r: 4, 'class': 'needle-tip' }, needle);
    svg('circle', { cx: cx, cy: cy, r: 6, 'class': 'hub' }, needle);
    var thetaLbl = text(art[3], cx + (R + 18) * Math.cos(theta), cy + (R + 18) * Math.sin(theta) + 8,
      'θ', 'math-lbl it small', { 'text-anchor': 'middle' });

    var head = [], math = [];
    panels.forEach(function (p) {
      head.push([p.querySelector('h3'), p.querySelector('.om-desc')]);
      math.push([p.querySelector('.om-formula'), p.querySelector('.om-card')]);
    });
    gsap.set(head, { opacity: 0 });
    gsap.set([math, heads, cells, lines, dots, wheel, arc, needle, thetaLbl], { opacity: 0 });
    gsap.set(arc, { strokeDasharray: arcLength, strokeDashoffset: arcLength });
    gsap.set(needle, { svgOrigin: cx + ' ' + cy, rotation: 0 });

    tl.to(head, { opacity: 0.35, duration: 0.5, stagger: 0.12 })
      .addLabel('s0');

    var t = tl.duration();
    tl.to(head[0], { opacity: 1, duration: 0.4 }, t);
    cards.forEach(function (c, i) { tl.to(c, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, t + 0.2 + i * 0.2); });
    tl.to(math[0], { opacity: 1, duration: 0.4, stagger: 0.2 }, t + 1.0)
      .addLabel('s1');

    t = tl.duration();
    tl.to(head[1], { opacity: 1, duration: 0.4 }, t)
      .to(heads, { opacity: 1, duration: 0.4 }, t + 0.2)
      .to(cells, { opacity: 1, duration: 0.25, stagger: 0.08 }, t + 0.5)
      .to(math[1], { opacity: 1, duration: 0.4, stagger: 0.2 })
      .addLabel('s2');

    t = tl.duration();
    tl.to(head[2], { opacity: 1, duration: 0.4 }, t)
      .to(lines, { opacity: 1, duration: 0.35, stagger: 0.35 }, t + 0.2)
      .to(dots, { opacity: 1, duration: 0.3 })
      .to(dots, { opacity: 0.35, duration: 0.3, repeat: 3, yoyo: true })
      .to(math[2], { opacity: 1, duration: 0.4, stagger: 0.2 }, '<')
      .addLabel('s3');

    t = tl.duration();
    tl.to(head[3], { opacity: 1, duration: 0.4 }, t)
      .to([wheel, needle], { opacity: 1, duration: 0.4 }, t)
      .to(needle, { rotation: 720 + 245, duration: 2.2, ease: 'power3.out' }, t + 0.3)
      .to(arc, { opacity: 1, duration: 0.01 })
      .to(arc, { strokeDashoffset: 0, duration: 0.6, ease: 'power1.inOut' })
      .to(thetaLbl, { opacity: 1, duration: 0.3 }, '<0.3')
      .to(math[3], { opacity: 1, duration: 0.4, stagger: 0.2 })
      .addLabel('s4');
  });

  // ── Gli eventi sono sottoinsiemi: il lancio di un dado ──
  PSI.scene('eventi', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');
    var S = 76;
    var place = { 1: [110, 76], 3: [282, 76], 5: [454, 76], 2: [110, 234], 4: [282, 234], 6: [454, 234] };
    var PIPS = { 1: ['c'], 2: ['tl', 'br'], 3: ['tl', 'c', 'br'], 4: ['tl', 'tr', 'bl', 'br'],
      5: ['tl', 'tr', 'c', 'bl', 'br'], 6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'] };
    var POS = { tl: [0.27, 0.27], tr: [0.73, 0.27], ml: [0.27, 0.5], mr: [0.73, 0.5],
      bl: [0.27, 0.73], br: [0.73, 0.73], c: [0.5, 0.5] };
    function center(n) { return [place[n][0] + S / 2, place[n][1] + S / 2]; }

    var omega = svg('rect', { x: 20, y: 20, width: 600, height: 400, rx: 16, 'class': 'omega' }, root);
    var omegaLbl = text(root, 38, 60, 'Ω', 'math-lbl');
    var lasso = svg('rect', { x: 88, y: 214, width: 464, height: 116, rx: 44, 'class': 'lasso' }, root);
    var lassoLbl = text(root, 572, 262, 'A', 'math-lbl it lbl-sel');
    var faces = {};
    Object.keys(place).forEach(function (n) {
      var p = place[n], g = svg('g', {}, root);
      svg('rect', { x: p[0], y: p[1], width: S, height: S, rx: 12, 'class': 'die' }, g);
      PIPS[n].forEach(function (k) {
        svg('circle', { cx: p[0] + POS[k][0] * S, cy: p[1] + POS[k][1] * S, r: 6.5, 'class': 'pip' }, g);
      });
      faces[n] = g;
    });
    var ring = svg('circle', { cx: center(4)[0], cy: center(4)[1], r: 70, 'class': 'omega-ring' }, root);
    var ringLbl = text(root, center(4)[0], center(4)[1] - 60, 'ω', 'math-lbl it', { 'text-anchor': 'middle' });
    var yes = text(root, 320, 385, 'ω = 4 ∈ A:  A si verifica', 'verdict good', { 'text-anchor': 'middle' });
    var no = text(root, 320, 385, 'ω = 3 ∉ A:  A non si verifica', 'verdict bad', { 'text-anchor': 'middle' });
    var certain = text(root, 66, 60, '= evento certo', 'caption good');
    var impossible = text(root, 604, 60, '∅ = evento impossibile', 'caption bad', { 'text-anchor': 'end' });
    var badges = [1, 2, 3, 4, 5, 6].map(function (n) {
      var g = svg('g', {}, root), x = place[n][0] + S - 4, y = place[n][1] + 4;
      svg('circle', { cx: x, cy: y, r: 15, 'class': 'badge' }, g);
      text(g, x, y + 5, '×2', 'badge-lbl', { 'text-anchor': 'middle' });
      return g;
    });
    var count = text(root, 320, 385, '2 · 2 · 2 · 2 · 2 · 2  =  2⁶  =  64 eventi', 'verdict', { 'text-anchor': 'middle' });

    gsap.set([omega, omegaLbl, lasso, lassoLbl, ring, ringLbl, yes, no, certain, impossible, badges, count], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });

    tl.to([omega, omegaLbl], { opacity: 1, duration: 0.4 });
    [1, 3, 5, 2, 4, 6].forEach(function (n, i) { pop(tl, faces[n], center(n)[0], center(n)[1], i ? '<0.08' : '>'); });
    tl.addLabel('s0');

    // 1. L'evento «esce pari» è il sottoinsieme {2, 4, 6}.
    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to(lasso, { opacity: 1, duration: 0.01 }, '<');
    PSI.draw(tl, lasso, 1085, { duration: 1 }, '<');
    tl.to(lasso, { fill: 'rgba(56, 239, 125, 0.12)', duration: 0.4 })
      .to(lassoLbl, { opacity: 1, duration: 0.3 }, '<')
      .addLabel('s1');

    // 2. Due prove: A si verifica se l'esito prodotto gli appartiene.
    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to([ring, ringLbl], { opacity: 1, duration: 0.3 }, '<')
      .to(ring, { attr: { r: 52 }, duration: 0.5, ease: 'back.out(2)' }, '<')
      .to(yes, { opacity: 1, duration: 0.4 })
      .to(yes, { opacity: 0, duration: 0.3 }, '+=1.2')
      .to(ring, { attr: { cy: center(3)[1] }, duration: 0.6, ease: 'power2.inOut' }, '<')
      .to(ringLbl, { attr: { y: center(3)[1] - 60 }, duration: 0.6, ease: 'power2.inOut' }, '<')
      .to(no, { opacity: 1, duration: 0.4 })
      .addLabel('s2');

    // 3. Evento certo ed evento impossibile.
    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .to([ring, ringLbl, no], { opacity: 0, duration: 0.3 }, '<')
      .to(omega, { stroke: '#38ef7d', strokeWidth: 4, duration: 0.4 }, '<')
      .to(certain, { opacity: 1, duration: 0.4 }, '<0.2')
      .to(omega, { stroke: 'rgba(203, 213, 224, 0.55)', strokeWidth: 2, duration: 0.6 }, '+=0.6')
      .to(impossible, { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s3');

    // 4. Quanti eventi? Ogni esito può stare dentro o fuori.
    tl.to(steps[3], { opacity: 1, duration: 0.4 })
      .to(badges, { opacity: 1, duration: 0.25, stagger: 0.2 }, '<0.2')
      .to(count, { opacity: 1, duration: 0.5 })
      .addLabel('s4');
  });

  // ── Operazioni tra eventi: un solo diagramma, cambia la regione evidenziata ──
  PSI.scene('venn-ops', function (el, tl) {
    var q = PSI.q(el);
    var R = 130; // raggio dei cerchi A e B
    var ON = 0.55; // opacità di una regione evidenziata
    var regions = {};
    q.all('.region').forEach(function (r) { regions[r.dataset.region] = r; });
    var cards = q.all('.op-card');
    var chips = q.all('.op-chip');
    var labels = q.all('.math-lbl:not(.lbl-empty)');

    gsap.set([q.one('.omega'), labels, q.one('.lbl-empty'), cards, q.all('.region')], { opacity: 0 });
    gsap.set(cards, { y: 14 });
    gsap.set(chips, { opacity: 0.3 });

    // Ingresso: Ω, poi i due cerchi tracciati.
    tl.to(q.one('.omega'), { opacity: 1, duration: 0.4 });
    PSI.draw(tl, q.one('.set-a'), TAU * R, {}, '-=0.1');
    PSI.draw(tl, q.one('.set-b'), TAU * R, {}, '<0.25');
    tl.to(labels, { opacity: 1, duration: 0.4 }, '-=0.3')
      .to(cards[0], { opacity: 1, y: 0, duration: 0.4 }, '<')
      .addLabel('s0');

    function showCard(k, t) {
      tl.to(cards[k - 1], { opacity: 0, y: -12, duration: 0.3 }, t)
        .to(cards[k], { opacity: 1, y: 0, duration: 0.4 }, t + 0.2);
      if (k > 1) tl.to(chips[k - 2], { opacity: 0.3, scale: 1, duration: 0.3 }, t);
      tl.to(chips[k - 1], { opacity: 1, scale: 1.12, duration: 0.3 }, t);
    }

    function highlight(on, t) {
      Object.keys(regions).forEach(function (name) {
        var target = on.indexOf(name) >= 0 ? ON : 0;
        tl.to(regions[name], { opacity: target, duration: 0.6, ease: 'power1.inOut' }, t);
      });
    }

    // Regioni: a = solo A, ab = A∩B, b = solo B, none = fuori da entrambi,
    // notA = tutto Ω tranne A (una forma sola: senza B non devono vedersi giunture).
    var ops = [
      ['a', 'ab', 'b'], // unione
      ['ab'], // intersezione
      ['notA'], // complemento di A
      ['a'] // differenza A \ B
    ];
    var setB = [q.one('.set-b'), q.one('.lbl-b')];
    ops.forEach(function (on, i) {
      var t = tl.duration();
      // Le tinte di A e B spariscono, così la regione evidenziata ha un colore solo.
      if (i === 0) {
        tl.to(q.one('.set-a'), { fill: 'rgba(56, 189, 248, 0)', duration: 0.6 }, t)
          .to(q.one('.set-b'), { fill: 'rgba(251, 191, 36, 0)', duration: 0.6 }, t);
      }
      // Il complemento di A non riguarda B: B sparisce e torna con la differenza.
      if (i === 2) tl.to(setB, { opacity: 0, duration: 0.5 }, t);
      if (i === 3) tl.to(setB, { opacity: 1, duration: 0.5 }, t);
      highlight(on, t);
      showCard(i + 1, t);
      tl.addLabel('s' + (i + 1));
    });

    // Eventi disgiunti: i cerchi si separano e l'intersezione sparisce.
    var t = tl.duration();
    var move = { duration: 1.1, ease: 'power2.inOut' };
    highlight([], t);
    showCard(5, t);
    tl.to(q.one('#vo-a'), Object.assign({ attr: { cx: 165 } }, move), t)
      .to(q.one('#vo-b'), Object.assign({ attr: { cx: 455 } }, move), t)
      .to(q.one('.lbl-a'), Object.assign({ attr: { x: 65 } }, move), t)
      .to(q.one('.lbl-b'), Object.assign({ attr: { x: 555 } }, move), t)
      .to(q.one('.set-a'), { fill: 'rgba(56, 189, 248, 0.28)', duration: 0.6 }, t + 0.5)
      .to(q.one('.set-b'), { fill: 'rgba(251, 191, 36, 0.28)', duration: 0.6 }, t + 0.5)
      .to(q.one('.lbl-empty'), { opacity: 1, duration: 0.4 }, t + 0.9)
      .addLabel('s5');
  });

  // Diagramma di Venn a due insiemi, con tutte le regioni che servono alle
  // leggi di De Morgan. `id` rende unici i riferimenti nelle <defs>.
  function venn2(root, defs, id, ox, oy) {
    var W = 520, H = 300, r = 100, A = [205, 150], B = [315, 150];
    var ref = function (name) { return '#' + id + '-' + name; };
    svg('circle', { id: id + '-a', cx: A[0], cy: A[1], r: r }, defs);
    svg('circle', { id: id + '-b', cx: B[0], cy: B[1], r: r }, defs);
    svg('use', { href: ref('a') }, svg('clipPath', { id: id + '-in-a' }, defs));
    function mask(name, holes) {
      var m = svg('mask', { id: id + '-' + name, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: H }, defs);
      svg('rect', { width: W, height: H, fill: '#fff' }, m);
      holes.forEach(function (h) { svg('use', { href: ref(h), fill: '#000' }, m); });
      return 'url(#' + id + '-' + name + ')';
    }
    var box = { x: 0, y: 0, width: W, height: H, rx: 16 };
    var outA = mask('out-a', ['a']), outB = mask('out-b', ['b']), outAB = mask('out-ab', ['a', 'b']);
    // Maschera «tutto tranne A∩B»: il buco è B ritagliato su A.
    var mLens = svg('mask', { id: id + '-out-lens', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: H }, defs);
    svg('rect', { width: W, height: H, fill: '#fff' }, mLens);
    svg('use', { href: ref('b'), fill: '#000', 'clip-path': 'url(#' + id + '-in-a)' }, mLens);

    var g = svg('g', { transform: 'translate(' + ox + ',' + oy + ')' }, root);
    var d = {};
    d.omega = svg('rect', Object.assign({ 'class': 'omega' }, box), g);
    d.union = svg('g', {}, g);
    svg('use', { href: ref('a'), 'class': 'light' }, d.union);
    svg('use', { href: ref('b'), 'class': 'light' }, d.union);
    d.lens = svg('use', { href: ref('b'), 'clip-path': 'url(#' + id + '-in-a)', 'class': 'light' }, g);
    d.hatchA = svg('rect', Object.assign({ fill: 'url(#dm-hatch-a)', mask: outA }, box), g);
    d.hatchB = svg('rect', Object.assign({ fill: 'url(#dm-hatch-b)', mask: outB }, box), g);
    d.none = svg('rect', Object.assign({ 'class': 'region', mask: outAB }, box), g);
    d.notLens = svg('rect', Object.assign({ 'class': 'region', mask: 'url(#' + id + '-out-lens)' }, box), g);
    d.outA = svg('use', { href: ref('a'), 'class': 'set set-a' }, g);
    d.outB = svg('use', { href: ref('b'), 'class': 'set set-b' }, g);
    text(g, 22, 42, 'Ω', 'math-lbl');
    text(g, A[0] - 96, 56, 'A', 'math-lbl it lbl-a');
    text(g, B[0] + 76, 56, 'B', 'math-lbl it lbl-b');
    return d;
  }

  function hatches(defs) {
    var a = svg('pattern', { id: 'dm-hatch-a', width: 10, height: 10, patternUnits: 'userSpaceOnUse' }, defs);
    svg('line', { x1: 3, y1: 0, x2: 3, y2: 10, 'class': 'hatch-a' }, a);
    var b = svg('pattern', { id: 'dm-hatch-b', width: 10, height: 10, patternUnits: 'userSpaceOnUse' }, defs);
    svg('line', { x1: 0, y1: 3, x2: 10, y2: 3, 'class': 'hatch-b' }, b);
  }

  // ── Le leggi di De Morgan: i due membri costruiti separatamente, poi confrontati ──
  PSI.scene('demorgan', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var defs = svg('defs', {}, root);
    hatches(defs);
    var L = venn2(root, defs, 'dmL', 20, 10);
    var R = venn2(root, defs, 'dmR', 620, 10);
    var eq = text(root, 580, 178, '=', 'dm-eq', { 'text-anchor': 'middle' });
    var LIGHT = 0.28, ON = 0.55;

    gsap.set([L.union, L.lens, L.none, L.notLens, R.hatchA, R.hatchB, R.none, R.notLens,
      L.hatchA, L.hatchB, R.union, R.lens, eq, q.all('.dm-h1, .dm-h2, .dm-c1, .dm-c2'), q.one('.dm-prob')], { opacity: 0 });

    PSI.draw(tl, [L.outA, L.outB], TAU * 100);
    PSI.draw(tl, [R.outA, R.outB], TAU * 100, {}, '<0.2');
    tl.to(q.all('.dm-h1'), { opacity: 1, duration: 0.4 }, '-=0.3')
      .addLabel('s0');

    // 1. Primo membro: si evidenzia A∪B, poi il suo complemento.
    tl.to(L.union, { opacity: LIGHT, duration: 0.5 })
      .to(L.union, { opacity: 0, duration: 0.5 }, '+=0.5')
      .to(L.none, { opacity: ON, duration: 0.6 }, '<')
      .addLabel('s1');

    // 2. Secondo membro: Aᶜ a righe verticali, Bᶜ a righe orizzontali.
    tl.to(R.hatchA, { opacity: 1, duration: 0.5 })
      .to(R.hatchB, { opacity: 1, duration: 0.5 }, '+=0.2')
      .addLabel('s2');

    // 3. La quadrettatura (Aᶜ ∩ Bᶜ) coincide con il primo membro.
    tl.to(R.none, { opacity: ON, duration: 0.6 })
      .to(eq, { opacity: 1, duration: 0.4 }, '+=0.1')
      .to(q.one('.dm-c1'), { opacity: 1, duration: 0.4 }, '<0.1')
      .addLabel('s3');

    // 4. Seconda legge: (A∩B)ᶜ = Aᶜ ∪ Bᶜ.
    tl.to([q.all('.dm-h1'), q.one('.dm-c1'), L.none, R.none, eq], { opacity: 0, duration: 0.4 })
      .to(q.all('.dm-h2'), { opacity: 1, duration: 0.4 })
      .to(L.lens, { opacity: LIGHT, duration: 0.5 })
      .to(L.lens, { opacity: 0, duration: 0.5 }, '+=0.5')
      .to(L.notLens, { opacity: ON, duration: 0.6 }, '<')
      .to(R.notLens, { opacity: ON, duration: 0.6 }, '+=0.2')
      .to(eq, { opacity: 1, duration: 0.4 })
      .to(q.one('.dm-c2'), { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s4');

    // 5. A cosa serve: «almeno uno» si calcola passando da «nessuno».
    tl.to(q.one('.dm-prob'), { opacity: 1, duration: 0.5 })
      .addLabel('s5');
  });

  // Diagramma di Venn a tre insiemi per la proprietà distributiva.
  function venn3(root, defs, id, ox, oy) {
    var W = 520, H = 310, r = 88, A = [260, 112], B = [205, 206], C = [315, 206];
    var ref = function (name) { return '#' + id + '-' + name; };
    svg('circle', { id: id + '-a', cx: A[0], cy: A[1], r: r }, defs);
    svg('circle', { id: id + '-b', cx: B[0], cy: B[1], r: r }, defs);
    svg('circle', { id: id + '-c', cx: C[0], cy: C[1], r: r }, defs);
    svg('use', { href: ref('a') }, svg('clipPath', { id: id + '-in-a' }, defs));

    var g = svg('g', { transform: 'translate(' + ox + ',' + oy + ')' }, root);
    var d = {};
    svg('rect', { x: 0, y: 0, width: W, height: H, rx: 16, 'class': 'omega' }, g);
    d.bc = svg('g', {}, g);
    svg('use', { href: ref('b'), 'class': 'light' }, d.bc);
    svg('use', { href: ref('c'), 'class': 'light' }, d.bc);
    d.res = svg('g', {}, g);
    d.ab = svg('use', { href: ref('b'), 'clip-path': 'url(#' + id + '-in-a)', 'class': 'region' }, d.res);
    d.ac = svg('use', { href: ref('c'), 'clip-path': 'url(#' + id + '-in-a)', 'class': 'region' }, d.res);
    d.out = [
      svg('use', { href: ref('a'), 'class': 'set set-a' }, g),
      svg('use', { href: ref('b'), 'class': 'set set-b' }, g),
      svg('use', { href: ref('c'), 'class': 'set set-c' }, g)
    ];
    text(g, 22, 42, 'Ω', 'math-lbl');
    text(g, A[0] + 84, 52, 'A', 'math-lbl it lbl-a');
    text(g, B[0] - 118, 262, 'B', 'math-lbl it lbl-b');
    text(g, C[0] + 94, 262, 'C', 'math-lbl it lbl-c');
    return d;
  }

  // ── Proprietà distributiva ──
  PSI.scene('distributiva', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var defs = svg('defs', {}, root);
    var L = venn3(root, defs, 'dsL', 20, 10);
    var R = venn3(root, defs, 'dsR', 620, 10);
    var eq = text(root, 580, 178, '=', 'dm-eq', { 'text-anchor': 'middle' });

    gsap.set([L.bc, L.res, R.bc, R.res, eq, q.one('.ds-foot')], { opacity: 0 });
    gsap.set([R.ab, R.ac], { opacity: 0 });

    PSI.draw(tl, L.out, TAU * 88);
    PSI.draw(tl, R.out, TAU * 88, {}, '<0.2');
    tl.addLabel('s0');

    // 1. Primo membro: B∪C, poi la parte che sta anche in A.
    tl.to(L.bc, { opacity: 0.28, duration: 0.5 })
      .to(L.res, { opacity: 0.6, duration: 0.6 }, '+=0.4')
      .to(L.bc, { opacity: 0.1, duration: 0.6 }, '<')
      .addLabel('s1');

    // 2. Secondo membro: A∩B, poi A∩C, uniti.
    tl.to(R.res, { opacity: 0.6, duration: 0.01 })
      .to(R.ab, { opacity: 1, duration: 0.5 })
      .to(R.ac, { opacity: 1, duration: 0.5 }, '+=0.3')
      .addLabel('s2');

    tl.to(eq, { opacity: 1, duration: 0.4 })
      .to(q.one('.ds-foot'), { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s3');
  });

  // ── La σ-algebra: le famiglie di eventi su Ω = {Q, K, J} ──
  PSI.scene('sigma', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var P = { e: [310, 392], Q: [130, 290], K: [310, 290], J: [490, 290],
      QK: [130, 160], QJ: [310, 160], KJ: [490, 160], O: [310, 56] };
    var NAME = { e: '∅', Q: '{Q}', K: '{K}', J: '{J}', QK: '{Q, K}', QJ: '{Q, J}', KJ: '{K, J}', O: 'Ω' };
    var EDGES = [['e', 'Q'], ['e', 'K'], ['e', 'J'], ['Q', 'QK'], ['Q', 'QJ'], ['K', 'QK'], ['K', 'KJ'],
      ['J', 'QJ'], ['J', 'KJ'], ['QK', 'O'], ['QJ', 'O'], ['KJ', 'O']];
    var DIM = { fill: 'rgba(255, 255, 255, 0.04)', stroke: 'rgba(203, 213, 224, 0.45)' };
    var ON = { fill: 'rgba(56, 239, 125, 0.22)', stroke: '#38ef7d' };
    var GEN = { fill: 'rgba(251, 191, 36, 0.24)', stroke: '#fbbf24' };

    var lattice = svg('g', {}, root);
    var edges = EDGES.map(function (e) {
      return svg('line', { x1: P[e[0]][0], y1: P[e[0]][1], x2: P[e[1]][0], y2: P[e[1]][1], 'class': 'hedge' }, lattice);
    });
    var box = {}, node = {};
    Object.keys(P).forEach(function (k) {
      node[k] = svg('g', {}, lattice);
      box[k] = svg('rect', { x: P[k][0] - 58, y: P[k][1] - 22, width: 116, height: 44, rx: 22, 'class': 'hnode' }, node[k]);
      text(node[k], P[k][0], P[k][1] + 8, NAME[k], 'hnode-lbl', { 'text-anchor': 'middle' });
    });
    var defs = svg('defs', {}, root);
    var marker = svg('marker', { id: 'sg-head', viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto' }, defs);
    svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#fbbf24' }, marker);
    var arrow = svg('path', { d: 'M190,276 Q300,212 428,172', 'class': 'sg-arrow', 'marker-end': 'url(#sg-head)' }, root);
    var arrowLbl = text(root, 296, 214, 'complemento', 'sg-arrow-lbl', { 'text-anchor': 'middle' });

    // Banach–Tarski: una sfera scomposta e riassemblata in due sfere identiche.
    var grad = svg('radialGradient', { id: 'sg-ball', cx: '35%', cy: '35%', r: '65%' }, defs);
    svg('stop', { offset: '0%', 'stop-color': '#e2e8f0' }, grad);
    svg('stop', { offset: '100%', 'stop-color': '#4a5568' }, grad);
    var balls = [0, 1].map(function () { return svg('circle', { cx: 310, cy: 215, r: 42, fill: 'url(#sg-ball)' }, root); });
    var ballLbl = text(root, 310, 300, 'una sfera → due sfere identiche?!', 'sg-arrow-lbl', { 'text-anchor': 'middle' });

    var rules = q.all('.sg-rules li');
    var cards = q.all('.scene-card');
    function paint(keys, look, t) {
      keys.forEach(function (k) { tl.to(box[k], Object.assign({ duration: 0.4 }, look), t); });
    }
    function card(k, t) {
      if (k > 0) tl.to(cards[k - 1], { opacity: 0, y: -10, duration: 0.3 }, t);
      tl.to(cards[k], { opacity: 1, y: 0, duration: 0.4 }, t + 0.2);
    }
    function rulesOn(which, t) {
      rules.forEach(function (li, i) { tl.to(li, { opacity: which.indexOf(i) >= 0 ? 1 : 0.4, duration: 0.3 }, t); });
    }

    var keys = Object.keys(P);
    // Una copia: gsap.set modifica l'oggetto che riceve (gli aggiunge duration: 0).
    gsap.set(keys.map(function (k) { return box[k]; }), Object.assign({}, DIM));
    gsap.set([edges, keys.map(function (k) { return node[k]; }), arrow, arrowLbl, balls, ballLbl, cards], { opacity: 0 });
    gsap.set(cards, { y: 10 });
    gsap.set(rules, { opacity: 0.4 });

    tl.to(edges, { opacity: 1, duration: 0.4, stagger: 0.03 });
    ['e', 'Q', 'K', 'J', 'QK', 'QJ', 'KJ', 'O'].forEach(function (k, i) {
      pop(tl, node[k], P[k][0], P[k][1], i ? '<0.06' : '>');
    });
    tl.addLabel('s0');

    // 1. La più piccola: {∅, Ω}.
    var t = tl.duration();
    paint(['e', 'O'], ON, t);
    rulesOn([0, 1], t);
    card(0, t);
    tl.addLabel('s1');

    // 2. Generata da {Q}: il complemento porta {K, J}, le unioni danno Ω e ∅.
    t = tl.duration();
    paint(['e', 'O'], DIM, t);
    paint(['Q'], GEN, t + 0.3);
    rulesOn([1, 2], t);
    card(1, t);
    tl.to(arrow, { opacity: 1, duration: 0.4 }, t + 0.8)
      .to(arrowLbl, { opacity: 1, duration: 0.4 }, t + 0.8);
    paint(['KJ'], ON, t + 1.3);
    paint(['e', 'O'], ON, t + 1.9);
    paint(['Q'], ON, t + 1.9);
    tl.addLabel('s2');

    // 3. La più grande: tutti gli 8 sottoinsiemi.
    t = tl.duration();
    tl.to([arrow, arrowLbl], { opacity: 0, duration: 0.3 }, t);
    paint(['K', 'J', 'QK', 'QJ'], ON, t + 0.2);
    rulesOn([0, 1, 2], t);
    card(2, t);
    tl.addLabel('s3');

    // 4. Nel continuo non si possono prendere tutti i sottoinsiemi.
    t = tl.duration();
    rulesOn([], t);
    card(3, t);
    tl.to(lattice, { opacity: 0.15, duration: 0.5 }, t)
      .to(balls, { opacity: 1, duration: 0.4 }, t + 0.3)
      .to(balls[0], { attr: { cx: 236 }, duration: 0.9, ease: 'power2.inOut' }, t + 0.9)
      .to(balls[1], { attr: { cx: 384 }, duration: 0.9, ease: 'power2.inOut' }, t + 0.9)
      .to(ballLbl, { opacity: 1, duration: 0.4 }, t + 1.5)
      .addLabel('s4');
  });
})();
