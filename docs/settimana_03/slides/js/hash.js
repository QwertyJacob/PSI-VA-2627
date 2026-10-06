/* Lezione 2, Atto V: la tabella quasi vuota, la tabella hash come tavolo da compleanni, il birthday attack. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', C = '#c084fc', G = '#38ef7d', RED = '#ff6b6b';
  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's03-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  function line(root, x1, y1, x2, y2, color, width, extra) {
    return svg('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, 'stroke-width': width || 3 }, extra), root);
  }
  function badge(g, x, y, value) {
    svg('circle', { cx: x, cy: y, r: 15, fill: '#c084fc33', stroke: C, 'stroke-width': 2 }, g);
    label(g, x, y + 6, value, 's03-small', { style: 'fill:' + C });
  }
  function cat(tl, img) {
    gsap.set(img, { scale: .2, rotation: -12, autoAlpha: 0 });
    return tl.to(img, { scale: 1, rotation: 0, autoAlpha: 1, duration: .7, ease: 'back.out(1.6)' });
  }
  function white() { return { style: 'fill:#edf2f7' }; }

  // Esercizio 2: un milione di slot come quadrato 1000 × 1000, mille chiavi come puntini.
  PSI.scene('l2-esercizio-2', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    var S = 420, X0 = 20, Y0 = 10, rnd = PSI.random(2026);
    svg('rect', { x: X0, y: Y0, width: S, height: S, rx: 4, fill: '#ffffff06', stroke: '#ffffff45', 'stroke-width': 2 }, root);
    for (var i = 0; i < 1000; i++) {
      var slot = Math.floor(rnd() * 1e6);
      svg('circle', { cx: X0 + (slot % 1000 + .5) * S / 1000, cy: Y0 + (Math.floor(slot / 1000) + .5) * S / 1000, r: 2, fill: A }, root);
    }
    label(root, X0 + S / 2, 462, '10⁶ slot (1000 × 1000) · 1000 chiavi', 's03-small');
    var tasks = q.one('.e2-tasks'), sols = q.all('.tr-sol'), right = q.one('.e2-right');
    gsap.set([tasks, sols], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(tasks, { opacity: 1, duration: .4 });
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 }).to(sols[0], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(sols[1], { opacity: 1, duration: .4 })
      .to(right, { backgroundColor: '#38ef7d33', borderColor: G, color: G, duration: .5 }).addLabel('s3');
    tl.to(sols[2], { opacity: 1, duration: .4 }).addLabel('s4');
  });

  // Quattro chiavi, la funzione h, cinque slot: ada ed eva nello stesso slot.
  PSI.scene('hash-compleanni', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var defs = svg('defs', {}, root), marker = svg('marker', { id: 'hc-arrow', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs);
    svg('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#a0aec0' }, marker);
    label(root, 130, 28, 'chiavi', 's03-small');
    label(root, 560, 28, 'funzione hash', 's03-small');
    label(root, 975, 28, 'array di m = 5 slot', 's03-small');
    var KEYS = { ada: [A, 110, 2], bob: [B, 165, 0], eva: [G, 220, 2], leo: [C, 275, 4] };
    var SY = function (s) { return 70 + s * 56; };
    var slots = [];
    for (var s = 0; s < 5; s++) {
      slots.push(svg('rect', { x: 900, y: SY(s) - 23, width: 150, height: 46, rx: 8, fill: '#ffffff07', stroke: '#ffffff45', 'stroke-width': 2 }, root));
      label(root, 1072, SY(s) + 7, String(s), 's03-small', { 'text-anchor': 'start' });
    }
    svg('rect', { x: 490, y: 130, width: 140, height: 110, rx: 14, fill: '#c084fc1a', stroke: C, 'stroke-width': 3 }, root);
    label(root, 560, 202, 'h', 's03-big', { style: 'font-style:italic;fill:' + C });
    var moves = {}, chips = {};
    Object.keys(KEYS).forEach(function (k) {
      var col = KEYS[k][0], ky = KEYS[k][1], sl = KEYS[k][2], g = svg('g', {}, root);
      svg('rect', { x: 80, y: ky - 22, width: 100, height: 44, rx: 8, fill: col + '30', stroke: col, 'stroke-width': 2 }, g);
      label(g, 130, ky + 8, k, 's03-tag', { style: 'fill:' + col });
      var x1 = 186, y1 = ky, x2 = 486, y2 = 185, x3 = 634, x4 = 892, y4 = SY(sl);
      var p = svg('path', { d: 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' M ' + x3 + ' ' + y2 + ' L ' + x4 + ' ' + y4,
        fill: 'none', stroke: col, 'stroke-width': 2.5, 'marker-end': 'url(#hc-arrow)' }, root);
      p.len = Math.hypot(x2 - x1, y2 - y1) + Math.hypot(x4 - x3, y4 - y2);
      moves[k] = p;
      var cx = k === 'ada' ? 945 : k === 'eva' ? 1005 : 975;
      chips[k] = label(root, cx, SY(sl) + 8, k, 's03-tag', { style: 'fill:' + col });
    });
    var boom = label(root, 790, SY(2) + 44, 'collisione!', 's03-label s03-red halo');
    var steps = ['bob', 'ada', 'leo', 'eva'];
    var map = q.one('.hc-map'), formula = q.one('.hc-formula');
    gsap.set([chips.ada, chips.bob, chips.eva, chips.leo, boom, map, formula], { opacity: 0 });
    Object.keys(moves).forEach(function (k) { gsap.set(moves[k], { opacity: 0 }); });
    tl.addLabel('s0');
    steps.forEach(function (k, i) {
      // La freccia della chiave precedente si attenua.
      if (i) tl.to(moves[steps[i - 1]], { opacity: .25, duration: .3 });
      tl.to(moves[k], { opacity: 1, duration: .01 });
      PSI.draw(tl, moves[k], moves[k].len, { duration: .9 });
      tl.to(chips[k], { opacity: 1, duration: .3 });
      if (k === 'eva') tl.to(slots[2], { attr: { fill: '#fbbf2440', stroke: B }, duration: .3 }).to(boom, { opacity: 1, duration: .3 });
      tl.addLabel('s' + (i + 1));
    });
    tl.to(map, { opacity: 1, duration: .5 }).addLabel('s5');
    tl.to(formula, { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // Widget dal vivo: si inseriscono chiavi casuali e si registra la prima collisione di ogni prova.
  (function () {
    var box = document.getElementById('wh-box');
    if (!box) return;
    var slider = box.querySelector('input'), grid = box.querySelector('.wh-grid');
    var out = box.querySelector('.wh-out'), logEl = box.querySelector('.wh-log');
    var counts, n, first, last, log = [];
    function reset() { counts = new Array(+slider.value).fill(0); n = 0; first = null; last = -1; render(); }
    function add(k) {
      for (var j = 0; j < k; j++) {
        var s = Math.floor(Math.random() * counts.length);
        if (counts[s] > 0 && first === null) { first = n + 1; log.push(first); }
        counts[s]++; n++; last = s;
      }
      render();
    }
    function render() {
      var m = counts.length, occ = 0, html = '', q = 1;
      box.querySelector('[data-v="m"]').textContent = m;
      counts.forEach(function (c, i) {
        if (c > 0) occ++;
        html += '<i class="wh-cell' + (c === 1 ? ' c1' : c > 1 ? ' c2' : '') + (i === last ? ' last' : '') + '">' + (c > 1 ? c : '') + '</i>';
      });
      grid.innerHTML = html;
      for (var i = 0; i < n; i++) q *= Math.max(m - i, 0) / m;
      out.innerHTML = 'Chiavi: <b>' + n + '</b> · slot occupati: <b>' + occ + '</b> · prima collisione: <b class="' + (first ? 'b' : '') + '">' +
        (first === null ? 'non ancora' : 'alla chiave n. ' + first) + '</b> · P(almeno una) con ' + n + ' chiavi: <b>' + (100 * (1 - q)).toFixed(1) + '%</b>';
      logEl.innerHTML = 'Prime collisioni: <b>' + (log.length ? log.join(' · ') : '—') + '</b> &emsp;·&emsp; regola 1.18·√m ≈ <b class="highlight">' + (1.1774 * Math.sqrt(m)).toFixed(1) + '</b>';
    }
    slider.addEventListener('input', function () { log = []; reset(); });
    box.querySelectorAll('[data-add]').forEach(function (b) { b.addEventListener('click', function () { add(+b.dataset.add); this.blur(); }); });
    box.querySelector('[data-reset]').addEventListener('click', function () { reset(); this.blur(); });
    reset();
  })();

  // Birthday attack: i costi in bit, valore dato (2^b) contro coppia qualunque (2^(b/2)).
  PSI.scene('birthday-attack', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var K = 3.1, X0 = 170, ROWS = [[32, '7.7·10⁴'], [64, '5.1·10⁹'], [128, '2.2·10¹⁹'], [256, '4.0·10³⁸']];
    var legend = svg('g', {}, root);
    svg('rect', { x: 170, y: 4, width: 26, height: 14, rx: 3, fill: B }, legend);
    label(legend, 204, 17, 'valore dato: 2^b', 's03-tiny', { 'text-anchor': 'start' });
    svg('rect', { x: 420, y: 4, width: 26, height: 14, rx: 3, fill: A }, legend);
    label(legend, 454, 17, 'coppia qualunque: 2^(b/2) · messaggi per il 50%', 's03-tiny', { 'text-anchor': 'start' });
    var rows = ROWS.map(function (r, i) {
      var g = svg('g', {}, root), y = 40 + i * 48, b = r[0];
      label(g, X0 - 14, y + 26, 'b = ' + b, 's03-small', { 'text-anchor': 'end', style: 'fill:#edf2f7' });
      g.target = svg('rect', { x: X0, y: y, width: 0, height: 18, rx: 3, fill: B }, g);
      g.pair = svg('rect', { x: X0, y: y + 22, width: 0, height: 18, rx: 3, fill: A }, g);
      g.wt = b * K; g.wp = b / 2 * K;
      g.t1 = label(g, X0 + g.wt + 10, y + 15, '2^' + b, 's03-small', { 'text-anchor': 'start', style: 'fill:' + B });
      g.t2 = label(g, X0 + g.wp + 10, y + 38, '2^' + b / 2 + ' · ' + r[1], 's03-small', { 'text-anchor': 'start', style: 'fill:' + A });
      return g;
    });
    var cards = q.all('.ba-card'), rule = q.one('.ba-rule');
    gsap.set([cards, rule, legend], { opacity: 0 });
    rows.forEach(function (g) { gsap.set([g.t1, g.t2], { opacity: 0 }); gsap.set(g, { opacity: 0 }); });
    tl.addLabel('s0');
    tl.to(cards, { opacity: 1, duration: .5, stagger: .4 }).addLabel('s1');
    tl.to(legend, { opacity: 1, duration: .3 });
    rows.forEach(function (g) {
      tl.to(g, { opacity: 1, duration: .2 })
        .to(g.target, { attr: { width: g.wt }, duration: .5 })
        .to(g.pair, { attr: { width: g.wp }, duration: .4 }, '<.1')
        .to([g.t1, g.t2], { opacity: 1, duration: .3 });
    });
    tl.addLabel('s2');
    tl.to(rule, { opacity: 1, duration: .6 }).addLabel('s3');
  });

  // Esercizio 3: il gatto, poi una soluzione per quadrante.
  PSI.scene('l2-esercizio-3', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    var sa = svg('g', {}, root);
    badge(sa, 18, 24, 'a');
    label(sa, 150, 64, '1.18 · √(2²⁴) = 1.18 · 2¹²', 's03-small', white());
    label(sa, 150, 106, '≈ 4823 richieste', 's03-label s03-green');
    label(sa, 150, 146, 'non N/2 ≈ 8 milioni', 's03-small s03-red');
    var sb = svg('g', {}, root);
    badge(sb, 318, 24, 'b');
    label(sb, 455, 64, 'C(1000, 2) = 499 500 coppie', 's03-small', white());
    label(sb, 455, 98, '499 500 / N ≈ 0.0298', 's03-small', white());
    label(sb, 455, 140, '1 − e^(−0.0298) ≈ 2.93%', 's03-label s03-green');
    var sc = svg('g', {}, root);
    badge(sc, 18, 264, 'c');
    label(sc, 150, 300, '0.006% = 1000 / N', 's03-label s03-red');
    label(sc, 150, 334, 'una richiesta data', 's03-small');
    label(sc, 150, 358, 'contro un’altra data', 's03-small');
    label(sc, 150, 396, 'ma le coppie sono 499 500', 's03-small', white());
    label(sc, 150, 438, '→ quasi il 3%', 's03-label s03-green');
    var sd = svg('g', {}, root);
    badge(sd, 318, 264, 'd');
    label(sd, 455, 300, '499 500 / 2ᵇ ≤ 10⁻⁶', 's03-small', white());
    label(sd, 455, 336, '2ᵇ ≥ 5·10¹¹ → b ≥ 38.9', 's03-small', white());
    label(sd, 455, 392, '39 bit', 's03-big s03-green');
    label(sd, 455, 438, 'P ≈ 9.1·10⁻⁷', 's03-small');
    var parts = [sa, sb, sc, sd];
    gsap.set(parts, { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 });
    parts.forEach(function (p, i) { tl.to(p, { opacity: 1, duration: .5 }).addLabel('s' + (i + 2)); });
  });

  // Takeaway: un punto per click.
  PSI.scene('takeaway-l2', function (el, tl) {
    var cards = PSI.q(el).all('.tk-card');
    gsap.set(cards, { opacity: 0, y: 20 });
    tl.addLabel('s0');
    cards.forEach(function (c, i) { tl.to(c, { opacity: 1, y: 0, duration: .5 }).addLabel('s' + (i + 1)); });
  });
})();
