/*
 * Scene animate dell'Atto I, parte centrale: gli assiomi di Kolmogorov e le
 * prime conseguenze (complementare, unione, inclusione-esclusione), più la
 * verifica Monte Carlo della regola dell'unione.
 * I testi stanno nelle <section> di index.html; qui ci sono i disegni e le
 * timeline. Motore e utilità: scene.js.
 */
(function () {
  'use strict';

  var TAU = 2 * Math.PI;
  var svg = PSI.svg, text = PSI.text;

  // ── Gli assiomi: la probabilità come area nel quadrato Ω ──
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

  // ── La regola del complementare ──
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

  // ── La regola dell'unione: le bande di L e M finiscono sul righello ──
  // Ω è largo 500 px = probabilità 1; L = [0, 0.70], M = [0.35, 0.85].
  PSI.scene('unione', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var steps = q.all('.scene-steps li');
    var X = 40, W = 500, Y = 44, H = 230;
    var at = function (p) { return X + p * W; };
    var BAR_Y = 330, BAR_H = 32;

    var bandL = svg('rect', { x: at(0), y: Y, width: 0.70 * W, height: H, 'class': 'band-l' }, root);
    var bandM = svg('rect', { x: at(0.35), y: Y, width: 0.50 * W, height: H, 'class': 'band-m' }, root);
    var overlap = svg('rect', { x: at(0.35), y: Y, width: 0.35 * W, height: H, 'class': 'band-hl' }, root);
    svg('rect', { x: X, y: Y, width: W, height: H, rx: 6, 'class': 'omega' }, root);
    // Sopra le bande i totali; dentro, il valore di ogni regione (sommano a 1).
    text(root, at(0), Y - 12, 'L · lunedì  0.70', 'band-lbl lbl-a');
    text(root, at(0.85), Y - 12, 'M · martedì  0.50', 'band-lbl lbl-b', { 'text-anchor': 'end' });
    text(root, at(0.175), Y + H / 2 + 8, '0.35', 'band-num', { 'text-anchor': 'middle' });
    text(root, at(0.525), Y + H / 2 - 14, 'L ∩ M', 'band-lbl', { 'text-anchor': 'middle' });
    text(root, at(0.525), Y + H / 2 + 18, '0.35', 'band-num', { 'text-anchor': 'middle' });
    text(root, at(0.775), Y + H / 2 + 8, '0.15', 'band-num', { 'text-anchor': 'middle' });
    text(root, at(0.925), Y + H / 2 + 8, '0.15', 'band-num dim', { 'text-anchor': 'middle' });

    // Righello delle probabilità, da 0 a 1.2.
    var redZone = svg('rect', { x: at(1), y: BAR_Y - 14, width: 0.28 * W, height: BAR_H + 28, 'class': 'red-zone' }, root);
    svg('line', { x1: at(0), y1: BAR_Y + BAR_H + 8, x2: at(1.24), y2: BAR_Y + BAR_H + 8, 'class': 'ruler' }, root);
    [0, 0.5, 1, 1.2].forEach(function (v) {
      svg('line', { x1: at(v), y1: BAR_Y + BAR_H + 2, x2: at(v), y2: BAR_Y + BAR_H + 16, 'class': 'ruler' + (v === 1 ? ' one' : '') }, root);
      text(root, at(v), BAR_Y + BAR_H + 36, String(v), 'ruler-lbl', { 'text-anchor': 'middle' });
    });
    // Le copie delle bande partono sopra le bande e scendono sul righello.
    var barL = svg('rect', { x: at(0), y: Y, width: 0.70 * W, height: H, 'class': 'bar-l' }, root);
    var barMo = svg('rect', { x: at(0.35), y: Y, width: 0.35 * W, height: H, 'class': 'bar-m' }, root);
    var barMr = svg('rect', { x: at(0.70), y: Y, width: 0.15 * W, height: H, 'class': 'bar-m' }, root);
    var hlL = svg('rect', { x: at(0.35), y: BAR_Y, width: 0.35 * W, height: BAR_H, 'class': 'bar-hl' }, root);
    var hlM = svg('rect', { x: at(0.70), y: BAR_Y, width: 0.35 * W, height: BAR_H, 'class': 'bar-hl' }, root);
    var twice = text(root, at(0.70), BAR_Y - 22, 'L ∩ M contata due volte', 'band-lbl good', { 'text-anchor': 'middle' });
    var bad = text(root, at(1.2) + 8, BAR_Y + 23, '1.20', 'total bad');
    var good = text(root, at(0.85) + 10, BAR_Y + 23, '0.85 ✓', 'total good');

    gsap.set([barL, barMo, barMr, redZone, overlap, hlL, hlM, twice, bad, good, q.one('.scene-def'), q.one('.scene-note')], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });
    tl.addLabel('s0');

    // 1. Somma ingenua: le due bande in fila sul righello superano 1.
    var drop = { duration: 1.1, ease: 'power2.inOut' };
    tl.to(steps[0], { opacity: 1, duration: 0.4 })
      .to([barL, barMo, barMr], { opacity: 1, duration: 0.2 }, '<')
      .to(barL, Object.assign({ attr: { y: BAR_Y, height: BAR_H } }, drop), '<')
      .to(barMo, Object.assign({ attr: { x: at(0.70), y: BAR_Y, height: BAR_H } }, drop), '<0.3')
      .to(barMr, Object.assign({ attr: { x: at(1.05), y: BAR_Y, height: BAR_H } }, drop), '<')
      .to(redZone, { opacity: 1, duration: 0.4 })
      .to(bad, { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s1');

    // 2. La sovrapposizione compare due volte sul righello.
    tl.to(steps[1], { opacity: 1, duration: 0.4 })
      .to(overlap, { opacity: 0.55, duration: 0.3, repeat: 3, yoyo: true }, '<')
      .to([hlL, hlM], { opacity: 1, duration: 0.4 }, '<0.4')
      .to(twice, { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s2');

    // 3. Si toglie il doppione: il totale torna a 0.85.
    tl.to(steps[2], { opacity: 1, duration: 0.4 })
      .to([hlM, barMo], { attr: { y: BAR_Y + 70 }, opacity: 0, duration: 0.7, ease: 'power2.in' }, '<')
      .to([hlL, twice, bad, redZone], { opacity: 0, duration: 0.4 }, '<')
      .to(barMr, { attr: { x: at(0.70) }, duration: 0.8, ease: 'power2.inOut' })
      .to(good, { opacity: 1, duration: 0.4 })
      .addLabel('s3');

    tl.to(q.one('.scene-def'), { opacity: 1, duration: 0.5 })
      .to(q.one('.scene-note'), { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s4');
  });

  // ── Inclusione-esclusione a tre eventi: quante volte è contata ogni regione ──
  PSI.scene('inclusione', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var R = 120, C = { A: [310, 150], B: [240, 271], C: [380, 271] };
    var defs = svg('defs', {}, root);
    ['A', 'B', 'C'].forEach(function (k) {
      svg('circle', { id: 'ie-' + k, cx: C[k][0], cy: C[k][1], r: R }, defs);
      svg('use', { href: '#ie-' + k }, svg('clipPath', { id: 'ie-in-' + k }, defs));
    });
    svg('rect', { x: 20, y: 10, width: 580, height: 420, rx: 16, 'class': 'omega' }, root);
    text(root, 40, 50, 'Ω', 'math-lbl');

    // Forme che lampeggiano: i tre cerchi, le tre intersezioni doppie, la tripla.
    var flash = {
      A: svg('use', { href: '#ie-A', 'class': 'ie-flash' }, root),
      B: svg('use', { href: '#ie-B', 'class': 'ie-flash' }, root),
      C: svg('use', { href: '#ie-C', 'class': 'ie-flash' }, root),
      AB: svg('use', { href: '#ie-B', 'clip-path': 'url(#ie-in-A)', 'class': 'ie-flash' }, root),
      AC: svg('use', { href: '#ie-C', 'clip-path': 'url(#ie-in-A)', 'class': 'ie-flash' }, root),
      BC: svg('use', { href: '#ie-C', 'clip-path': 'url(#ie-in-B)', 'class': 'ie-flash' }, root)
    };
    var triple = svg('g', { 'clip-path': 'url(#ie-in-C)' }, root);
    flash.ABC = svg('use', { href: '#ie-B', 'clip-path': 'url(#ie-in-A)', 'class': 'ie-flash' }, triple);
    var outlines = [
      svg('use', { href: '#ie-A', 'class': 'set set-a' }, root),
      svg('use', { href: '#ie-B', 'class': 'set set-b' }, root),
      svg('use', { href: '#ie-C', 'class': 'set set-c' }, root)
    ];
    text(root, 440, 72, 'A', 'math-lbl it lbl-a');
    text(root, 70, 380, 'B', 'math-lbl it lbl-b');
    text(root, 530, 380, 'C', 'math-lbl it lbl-c');

    // Contatori per regione e sequenza degli eventi della formula.
    var SPOT = { A: [310, 92], B: [190, 300], C: [430, 300], AB: [233, 188], AC: [387, 188], BC: [310, 322], ABC: [310, 233] };
    var count = {};
    Object.keys(SPOT).forEach(function (k) {
      count[k] = text(root, SPOT[k][0], SPOT[k][1] + 12, '0', 'ie-count', { 'text-anchor': 'middle' });
    });
    var gone = text(root, 310, 264, 'sparita!', 'ie-gone', { 'text-anchor': 'middle' });
    var EVENTS = [['A', 1], ['B', 1], ['C', 1], ['AB', -1], ['AC', -1], ['BC', -1], ['ABC', 1]];
    var COLOR = { 0: '#fc8181', 1: '#38ef7d', 2: '#fbbf24', 3: '#fc8181' };
    var st = { j: 0 };
    function render() {
      var j = Math.floor(st.j + 1e-6);
      Object.keys(count).forEach(function (region) {
        var c = 0;
        for (var e = 0; e < j; e++) {
          var covers = EVENTS[e][0].split('').every(function (s) { return region.indexOf(s) >= 0; });
          if (covers) c += EVENTS[e][1];
        }
        count[region].textContent = c;
        count[region].style.fill = COLOR[c];
      });
    }
    render();

    var lines = q.all('.ie-line'), cards = q.all('.scene-card');
    gsap.set([Object.keys(flash).map(function (k) { return flash[k]; }), gone], { opacity: 0 });
    gsap.set(Object.keys(count).map(function (k) { return count[k]; }), { opacity: 0 });
    gsap.set([lines, cards], { opacity: 0 });
    gsap.set(cards, { y: 10 });

    PSI.draw(tl, outlines, TAU * R);
    tl.addLabel('s0');

    function events(from, to, t) {
      for (var e = from; e < to; e++) {
        var at = t + (e - from) * 0.9, shape = flash[EVENTS[e][0]];
        tl.to(shape, { opacity: 0.45, duration: 0.3 }, at)
          .to(st, { j: e + 1, duration: 0.01, onUpdate: render }, at + 0.25)
          .to(shape, { opacity: 0, duration: 0.5 }, at + 0.35);
      }
    }
    function card(k, t) {
      if (k > 0) tl.to(cards[k - 1], { opacity: 0, y: -10, duration: 0.3 }, t);
      tl.to(cards[k], { opacity: 1, y: 0, duration: 0.4 }, t + 0.2);
    }

    // 1. + P(A) + P(B) + P(C)
    var t = tl.duration();
    tl.to(Object.keys(count).map(function (k) { return count[k]; }), { opacity: 1, duration: 0.3 }, t)
      .to(lines[0], { opacity: 1, duration: 0.4 }, t);
    card(0, t);
    events(0, 3, t + 0.4);
    tl.addLabel('s1');

    // 2. − le tre intersezioni doppie: il centro scende a zero.
    t = tl.duration();
    tl.to(lines[1], { opacity: 1, duration: 0.4 }, t);
    card(1, t);
    events(3, 6, t + 0.4);
    tl.to(gone, { opacity: 1, duration: 0.3 })
      .addLabel('s2');

    // 3. + la tripla: ogni regione conta una volta.
    t = tl.duration();
    tl.to(lines[2], { opacity: 1, duration: 0.4 }, t)
      .to(gone, { opacity: 0, duration: 0.3 }, t);
    card(2, t);
    events(6, 7, t + 0.4);
    tl.addLabel('s3');
  });

  // ── Esperimento live: la regola dell'unione verificata contando ──
  PSI.scene('montecarlo', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X = 40, Y = 20, W = 520, H = 380, N = 2500;
    var at = function (p) { return X + p * W; };

    svg('rect', { x: at(0), y: Y, width: 0.70 * W, height: H, 'class': 'band-l soft' }, root);
    svg('rect', { x: at(0.35), y: Y, width: 0.50 * W, height: H, 'class': 'band-m soft' }, root);
    var dots = svg('g', {}, root);
    svg('rect', { x: X, y: Y, width: W, height: H, rx: 6, 'class': 'omega' }, root);
    svg('line', { x1: at(0.70), y1: Y, x2: at(0.70), y2: Y + H, 'class': 'band-edge edge-a' }, root);
    svg('line', { x1: at(0.35), y1: Y, x2: at(0.35), y2: Y + H, 'class': 'band-edge edge-b' }, root);
    svg('line', { x1: at(0.85), y1: Y, x2: at(0.85), y2: Y + H, 'class': 'band-edge edge-b' }, root);
    text(root, at(0.02), Y + 30, 'L', 'math-lbl it lbl-a halo');
    text(root, at(0.83), Y + 30, 'M', 'math-lbl it lbl-b halo', { 'text-anchor': 'end' });

    var cells = {};
    q.all('[data-k]').forEach(function (td) { cells[td.dataset.k] = td; });
    var counter = q.one('.mc-count');
    var points = [], kind = [], prefix = { L: [0], M: [0], LM: [0], LuM: [0] };
    for (var i = 0; i < N; i++) {
      points.push(svg('circle', { r: 3.2 }, dots));
      points[i].style.display = 'none';
    }

    // Genera le settimane: la x decide l'evento, la y serve solo a disegnare.
    function generate(seed) {
      var rnd = PSI.random(seed);
      ['L', 'M', 'LM', 'LuM'].forEach(function (k) { prefix[k] = [0]; });
      for (var i = 0; i < N; i++) {
        var u = rnd(), v = rnd();
        var l = u < 0.70, m = u >= 0.35 && u < 0.85;
        points[i].setAttribute('cx', (at(u)).toFixed(1));
        points[i].setAttribute('cy', (Y + 4 + v * (H - 8)).toFixed(1));
        points[i].setAttribute('class', l && m ? 'pt-both' : l ? 'pt-l' : m ? 'pt-m' : 'pt-none');
        prefix.L.push(prefix.L[i] + (l ? 1 : 0));
        prefix.M.push(prefix.M[i] + (m ? 1 : 0));
        prefix.LM.push(prefix.LM[i] + (l && m ? 1 : 0));
        prefix.LuM.push(prefix.LuM[i] + (l || m ? 1 : 0));
      }
    }

    var st = { n: 0 }, shown = 0;
    function render() {
      var n = Math.round(st.n);
      while (shown < n) points[shown++].style.display = '';
      while (shown > n) points[--shown].style.display = 'none';
      Object.keys(cells).forEach(function (k) {
        cells[k].textContent = n ? (prefix[k][n] / n).toFixed(3) : '—';
      });
      counter.textContent = n.toLocaleString('it-IT');
    }
    generate(2026);
    render();

    gsap.set(q.one('.scene-note'), { opacity: 0 });
    tl.addLabel('s0');
    tl.addLabel('rain')
      .to(st, { n: N, duration: 5, ease: 'power2.in', onUpdate: render })
      .addLabel('s1');
    tl.to(q.one('.scene-note'), { opacity: 1, duration: 0.5 })
      .addLabel('s2');

    // Nuove settimane: un altro seme, poi si rigioca la pioggia.
    q.one('.mc-rerun').addEventListener('click', function () {
      this.blur();
      generate(Date.now() % 1e9);
      PSI.replay(el, 'rain', 's1');
    });
  });
})();
