/* Lezione 1: il 53 di Venezia, l'urna, la fila, la media 1/p, l'assenza di memoria, il widget geometrico. */
(function () {
  'use strict';
  var svg = PSI.svg, C = S05.C, label = S05.label, line = S05.line, it = S05.it;

  // L1-02 · la pallina del 53 e il contatore delle assenze, da 0 a 182.
  PSI.scene('contatore-53', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var b = S05.ball(root, 300, 230, 165, 53, 'grande');
    label(root, 300, 455, 'ruota di Venezia, 2003–2005', 's05-label', { style: 'fill:' + C.muted });
    label(root, 800, 120, 'assenze consecutive', 's05-label', { style: 'fill:' + C.muted });
    svg('rect', { x: 620, y: 145, width: 360, height: 170, rx: 22, fill: '#ffffff08', stroke: '#ffffff30', 'stroke-width': 2 }, root);
    var count = label(root, 800, 275, '0', 's05-huge', { style: 'font-size:130px;fill:' + C.data });
    var fact = label(root, 800, 375, '182 estrazioni senza il 53', 's05-label', { style: 'font-weight:700;fill:' + C.data, opacity: 0 });
    var ask = label(root, 800, 455, 'Era «in ritardo»?', 's05-big', { opacity: 0 });
    var st = { n: 0 };
    function render() { count.textContent = String(Math.round(st.n)); }
    render();
    gsap.set(b, { opacity: 0, scale: .6, svgOrigin: '300 230' });
    tl.to(b, { opacity: 1, scale: 1, duration: .6, ease: 'back.out(1.6)' }).addLabel('s0');
    tl.to(st, { n: 182, duration: 3, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(fact, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(ask, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-03 · 90 palline: si mescolano e le prime 5 della fila diventano gli estratti.
  PSI.scene('urna-90', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var X0 = 55, Y0 = 150, DX = 50, DY = 37, R = 16;
    function pos(i) { return [X0 + (i % 10) * DX, Y0 + Math.floor(i / 10) * DY]; }
    label(root, 280, 26, 'estratti', 's05-small');
    var SX = function (s) { return 70 + s * 88; };
    for (var s = 0; s < 5; s++) {
      svg('rect', { x: SX(s) - 32, y: 40, width: 64, height: 64, rx: 12, fill: '#38ef7d12', stroke: C.ok, 'stroke-width': 2.5 }, root);
    }
    // Permutazione con seme; il 53 non è tra i primi 5 (non esce, come nel 2003–2005).
    var perm, seed = 5;
    do {
      var rnd = PSI.random(seed++);
      perm = [];
      for (var i = 0; i < 90; i++) perm.push(i);
      for (i = 89; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    } while (perm[52] < 5);
    var balls = [];
    for (i = 0; i < 90; i++) {
      var p = pos(i), g = svg('g', {}, root), is53 = i === 52;
      svg('circle', { cx: p[0], cy: p[1], r: R, fill: '#e2e8f0', stroke: is53 ? C.model : 'none', 'stroke-width': 4 }, g);
      PSI.text(g, p[0], p[1] + 6, String(i + 1), '', { 'text-anchor': 'middle', style: 'font:700 18px Inter, sans-serif;fill:#1a202c' });
      g.home = p;
      balls.push(g);
    }
    var formula = q.one('.ur-formula'), again = q.one('.ur-again');
    gsap.set([formula, again], { opacity: 0 });
    tl.addLabel('s0');
    // Mescola: ogni pallina va nella posizione perm[i] della fila…
    balls.forEach(function (g, i) {
      var to = pos(perm[i]);
      tl.to(g, { x: to[0] - g.home[0], y: to[1] - g.home[1], duration: .9, ease: 'power2.inOut' }, i ? '<' + (.004).toFixed(3) : '>');
    });
    // …e le prime 5 della fila salgono nelle caselle.
    var first = true;
    balls.forEach(function (g, i) {
      if (perm[i] >= 5) return;
      tl.to(g, { x: SX(perm[i]) - g.home[0], y: 72 - g.home[1], duration: .6, ease: 'back.out(1.4)' }, first ? '>.2' : '<.12')
        .to(g.firstChild, { attr: { r: 24 }, duration: .3 }, '<.3');
      first = false;
    });
    tl.addLabel('s1');
    tl.to(formula, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(again, { opacity: 1, duration: .4 }).addLabel('s3');
  });

  // L1-05 · tre righe di monete: T → 1, C T → 2, C C T → 3; poi «senza tetto».
  PSI.scene('prima-testa', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var head = S05.arrowMarker(root, 'pt-arrow', C.muted);
    var rows = [['T'], ['C', 'T'], ['C', 'C', 'T']].map(function (seq, r) {
      var y = 60 + r * 100, g = svg('g', {}, root), coins = [];
      seq.forEach(function (c, i) {
        var cg = svg('g', {}, g), x = 150 + i * 100, ok = c === 'T';
        svg('circle', { cx: x, cy: y, r: 38, fill: ok ? C.ok : '#ffffff14', stroke: ok ? C.ok : '#ffffff90', 'stroke-width': 3 }, cg);
        label(cg, x, y + 13, c, 's05-big', { style: 'font-size:38px;fill:' + (ok ? '#0f172a' : C.text) });
        cg.c = [x, y];
        coins.push(cg);
      });
      var arr = line(g, 500, y, 590, y, C.muted, 3, { 'marker-end': head });
      svg('circle', { cx: 680, cy: y, r: 40, fill: '#38bdf826', stroke: C.data, 'stroke-width': 3 }, g);
      var v = label(g, 680, y + 12, 'X = ' + (r + 1), 's05-label', { style: 'font-weight:700;fill:' + C.data });
      gsap.set(g, { opacity: 0 });
      return { g: g, coins: coins, tail: [arr, v] };
    });
    var more = label(root, 450, 375, '1, 2, 3, …  senza tetto', 's05-big', { style: 'font-size:40px;fill:' + C.ok, opacity: 0 });
    tl.addLabel('s0');
    rows.forEach(function (row, r) {
      tl.set(row.g, { opacity: 1 });
      row.coins.forEach(function (cg) {
        tl.fromTo(cg, { opacity: 0, scale: .3, svgOrigin: cg.c[0] + ' ' + cg.c[1] }, { opacity: 1, scale: 1, duration: .35, ease: 'back.out(2)' });
      });
      tl.fromTo(row.tail, { opacity: 0 }, { opacity: 1, duration: .3 }).addLabel('s' + (r + 1));
    });
    tl.to(more, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // L1-06 · la fila: tre fallimenti, poi il successo; il prodotto; la formula.
  PSI.scene('fila', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var boxes = [0, 1, 2, 3].map(function (i) {
      var ok = i === 3;
      return S05.trial(root, 40 + i * 215, 10, 180, 84, ok, 'prova ' + (i + 1), ok ? 'riesce' : 'fallisce', ok ? 'p' : '1 − p');
    });
    var head = S05.arrowMarker(root, 'fl-arrow', C.muted);
    line(root, 40, 178, 860, 178, C.muted, 2, { 'marker-end': head });
    label(root, 880, 168, 'tempo', 's05-small', { 'text-anchor': 'end' });
    var prod = q.one('.fl-prod'), formula = q.one('.fl-formula'), note = q.one('.fl-note');
    gsap.set(boxes, { opacity: 0, y: 14 });
    gsap.set([prod, formula, note], { opacity: 0 });
    tl.addLabel('s0');
    boxes.forEach(function (b, i) { tl.to(b, { opacity: 1, y: 0, duration: .4 }).addLabel('s' + (i + 1)); });
    tl.to(prod, { opacity: 1, duration: .5 }).addLabel('s5');
    tl.to(formula, { opacity: 1, duration: .5 }).addLabel('s6');
    tl.to(note, { opacity: 1, duration: .4 }).addLabel('s7');
  });

  // L1-07 · barre di P(X = k) con p = 1/18: la prima è la più alta.
  PSI.scene('primo-probabile', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var X0 = 90, DX = 32.5, W = 24, BASE = 380, U = 5200, p = 1 / 18;
    line(root, X0 - 25, BASE, X0 + 29 * DX + 25, BASE, C.axis, 2);
    var rects = [];
    for (var k = 1; k <= 30; k++) {
      var v = Math.pow(1 - p, k - 1) * p, h = v * U, x = X0 + (k - 1) * DX;
      rects.push(svg('rect', { x: x - W / 2, y: BASE - h, width: W, height: h, rx: 3, fill: C.model, opacity: .85 }, root));
      if (k === 1 || k % 5 === 0) label(root, x, BASE + 28, String(k), 's05-small');
    }
    label(root, X0 + 29 * DX + 25, BASE + 54, 'k = estrazione del primo 53', 's05-tiny', { 'text-anchor': 'end' });
    var v1 = label(root, X0, BASE - p * U - 62, '0,056', 's05-label', { style: 'font-weight:700;fill:' + C.ok, opacity: 0 });
    var v23 = [2, 3].map(function (k) {
      var v = Math.pow(1 - p, k - 1) * p;
      return label(root, X0 + (k - 1) * DX, BASE - v * U - 14 - (3 - k) * 24, it(v, 3), 's05-small', { opacity: 0 });
    });
    var rule = label(root, 620, 70, 'ogni barra = la precedente × 17/18', 's05-label', { style: 'font-weight:700;fill:' + C.model, opacity: 0 });
    tl.addLabel('s0');
    tl.to(rects[0], { attr: { fill: C.ok }, opacity: 1, duration: .4 }).to(v1, { opacity: 1, duration: .3 }).addLabel('s1');
    tl.to(v23, { opacity: 1, duration: .3, stagger: .15 }).to(rule, { opacity: 1, duration: .4 }).addLabel('s2');
  });

  // L1-10 · l'albero della prima prova; dentro «di nuovo da capo» lo stesso albero, rimpicciolito.
  PSI.scene('ricomincia', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    function tree(g, depth) {
      var parts = {};
      svg('rect', { x: 0, y: 180, width: 140, height: 60, rx: 12, fill: '#ffffff10', stroke: '#ffffffa0', 'stroke-width': 2.5 }, g);
      label(g, 70, 218, 'prima prova', 's05-small', { style: 'fill:' + C.text });
      parts.up = svg('g', {}, g);
      parts.upLine = line(parts.up, 140, 200, 305, 95, C.ok, 3.5);
      label(parts.up, 200, 128, 'riesce · p', 's05-small', { style: 'font-weight:700;fill:' + C.ok, 'text-anchor': 'end' });
      svg('rect', { x: 310, y: 65, width: 160, height: 60, rx: 12, fill: '#38ef7d1a', stroke: C.ok, 'stroke-width': 2.5 }, parts.up);
      label(parts.up, 390, 104, '1 prova', 's05-label', { style: 'font-weight:700;fill:' + C.ok });
      parts.down = svg('g', {}, g);
      parts.downLine = line(parts.down, 140, 220, 305, 320, C.model, 3.5);
      label(parts.down, 198, 312, 'fallisce · 1 − p', 's05-small', { style: 'font-weight:700;fill:' + C.model, 'text-anchor': 'end' });
      label(parts.down, 336, 342, '1 +', 's05-big', { style: 'font-size:38px;fill:' + C.model });
      svg('rect', { x: 372, y: 235, width: 260, height: 190, rx: 16, fill: '#fb923c0d', stroke: C.model, 'stroke-width': 2.5, 'stroke-dasharray': '9 6' }, parts.down);
      label(parts.down, 502, 262, 'di nuovo da capo', 's05-small', { style: 'fill:' + C.model });
      parts.nest = svg('g', {}, g);
      if (depth < 1) tree(parts.nest, depth + 1);
      else label(parts.nest, 502, 340, '…', 's05-big', { style: 'fill:' + C.model });
      return parts;
    }
    var t = tree(svg('g', {}, root), 0);
    var st = { z: 0 };
    function render() {
      var s = .05 + .31 * st.z;
      t.nest.setAttribute('transform', 'translate(502 340) scale(' + s + ') translate(-316 -245)');
      t.nest.setAttribute('opacity', .6 * st.z);
    }
    render();
    var eqs = ['.rc-e1', '.rc-e2', '.rc-e3', '.rc-e4'].map(function (s) { return q.one(s); });
    gsap.set([t.up, t.down], { opacity: 0 });
    gsap.set(eqs, { opacity: 0 });
    tl.addLabel('s0');
    tl.set(t.up, { opacity: 1 });
    PSI.draw(tl, t.upLine, 200, { duration: .6 });
    tl.addLabel('s1');
    tl.set(t.down, { opacity: 1 });
    PSI.draw(tl, t.downLine, 195, { duration: .6 });
    tl.addLabel('s2');
    tl.to(st, { z: 1, duration: 1.1, ease: 'power2.out', onUpdate: render }).addLabel('s3');
    eqs.forEach(function (e, i) { tl.to(e, { opacity: 1, duration: .45 }).addLabel('s' + (i + 4)); });
  });

  // L1-13 · widget: barre della Geometrica per k = 1..30, baricentro in 1/p, Lotto tratteggiato.
  (function () {
    var box = document.getElementById('geo-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out'), input = box.querySelector('input');
    var X0 = 70, DX = 33, W = 24, BASE = 290, YMAX = .6, H = 260;
    function X(k) { return X0 + (k - 1) * DX; }
    function Y(v) { return BASE - v / YMAX * H; }
    function geo(k, p) { return Math.pow(1 - p, k - 1) * p; }
    line(root, X0 - 25, BASE, X(30) + 25, BASE, C.axis, 2);
    var rects = [], vals = [], valueGuides = [];
    for (var k = 1; k <= 30; k++) {
      rects.push(svg('rect', { x: X(k) - W / 2, y: BASE, width: W, height: 0, rx: 3, fill: C.model }, root));
      valueGuides.push(line(root, X(k), BASE, X(k), BASE, C.muted, 1, { opacity: 0 }));
      vals.push(label(root, X(k), BASE, '', 's05-tiny'));
      if (k === 1 || k % 5 === 0) label(root, X(k), BASE + 26, String(k), 's05-small');
    }
    label(root, X(30) + 25, 30, 'k (prova del primo successo)', 's05-tiny', { 'text-anchor': 'end' });
    var ref = [];
    for (k = 1; k <= 30; k++) ref.push((X(k) - W / 2) + ',' + Y(geo(k, 1 / 18)) + ' ' + (X(k) + W / 2) + ',' + Y(geo(k, 1 / 18)));
    svg('polyline', { points: ref.join(' '), fill: 'none', stroke: C.text, 'stroke-width': 2, 'stroke-dasharray': '5 4', opacity: .7 }, root);
    label(root, X(30) + 25, Y(geo(30, 1 / 18)) - 14, 'Lotto, p = 1/18', 's05-tiny', { 'text-anchor': 'end', style: 'fill:' + C.text });
    var fc = svg('path', { fill: C.ok }, root);
    var fl = label(root, 0, BASE + 60, '', 's05-label s05-ok', { style: 'font-weight:700' });
    function render(p) {
      box.querySelector('[data-v="p"]').textContent = it(p, 3);
      rects.forEach(function (r, i) {
        var v = geo(i + 1, p), h = Math.min(v, YMAX) / YMAX * H;
        r.setAttribute('y', BASE - h); r.setAttribute('height', h);
        vals[i].setAttribute('y', BASE - h - 6);
        vals[i].textContent = i < 5 && v >= .01 ? it(v, 2) : '';
      });
      // I valori in corpo 22 px hanno bisogno di spazio sopra le barre vicine.
      var nextY = Infinity;
      for (var i = 4; i >= 0; i--) {
        var guide = valueGuides[i], naturalY = +vals[i].getAttribute('y');
        if (!vals[i].textContent) { guide.setAttribute('opacity', 0); continue; }
        var labelY = Math.min(naturalY, nextY - 28);
        vals[i].setAttribute('y', labelY);
        guide.setAttribute('y1', labelY + 5);
        guide.setAttribute('y2', naturalY + 3);
        guide.setAttribute('opacity', naturalY - labelY > 8 ? .6 : 0);
        nextY = labelY;
      }
      var mu = 1 / p, fx = X(Math.min(mu, 30.4));
      fc.setAttribute('d', 'M ' + fx + ' ' + (BASE + 32) + ' L ' + (fx - 13) + ' ' + (BASE + 52) + ' L ' + (fx + 13) + ' ' + (BASE + 52) + ' Z');
      fl.setAttribute('x', fx + (mu > 27 ? -22 : 22));
      fl.setAttribute('text-anchor', mu > 27 ? 'end' : 'start');
      fl.textContent = '1/p = ' + it(mu, 1) + (mu > 30.4 ? ' →' : '');
      out.innerHTML = 'E[X] = 1/p = <b>' + it(mu, 2) + '</b><span class="sep">·</span>P(X &gt; 10) = (1 − p)<sup>10</sup> = <b>' + it(Math.pow(1 - p, 10), 3) + '</b>';
    }
    function set(p) { input.value = p; render(p); }
    input.addEventListener('input', function () { render(+this.value); });
    box.querySelectorAll('[data-p]').forEach(function (b) {
      b.addEventListener('click', function () { set(b.dataset.p === '0.0556' ? 1 / 18 : +b.dataset.p); this.blur(); });
    });
    set(.2);
  })();

  // L1-15 · due righe di prove future, uguali con o senza un passato di fallimenti; poi la catena.
  PSI.scene('memoria', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    function future(g, y) {
      for (var i = 0; i < 3; i++) {
        svg('rect', { x: 640 + i * 90, y: y, width: 80, height: 50, rx: 8, fill: C.data }, g);
        label(g, 680 + i * 90, y + 35, '?', 's05-big', { style: 'font-size:32px;fill:#0f172a' });
      }
    }
    var r1 = svg('g', {}, root);
    PSI.text(r1, 20, 55, 'Da subito', 's05-label s05-bold', { 'text-anchor': 'start' });
    future(r1, 20);
    var r2 = svg('g', {}, root);
    PSI.text(r2, 20, 155, 'Dopo 5 fallimenti', 's05-label s05-bold', { 'text-anchor': 'start' });
    for (var i = 0; i < 5; i++) {
      svg('rect', { x: 250 + i * 72, y: 120, width: 62, height: 50, rx: 8, fill: 'none', stroke: C.muted, 'stroke-width': 2, 'stroke-dasharray': '5 4' }, r2);
      label(r2, 281 + i * 72, 152, 'no', 's05-small');
    }
    future(r2, 120);
    label(r2, 425, 202, 'già visti: non cambiano il futuro', 's05-small');
    var both = svg('g', {}, root);
    label(both, 1010, 88, '(1 − p)³', 's05-math', { style: 'fill:' + C.ok + ';font-weight:700' });
    label(both, 1010, 120, 'in entrambe', 's05-small', { style: 'fill:' + C.ok });
    var s4 = q.one('.mm-s4'), s5 = q.one('.mm-s5'), s6 = q.one('.mm-s6'), s6b = q.one('.mm-s6b'), s7 = q.one('.mm-s7');
    var cuts = q.all('.mm-cut > i');
    gsap.set([r1, r2, both, s4, s5, s6, s6b, s7], { opacity: 0 });
    gsap.set(cuts, { scaleX: 0, rotation: -14, transformOrigin: '0% 50%' });
    tl.addLabel('s0');
    tl.to(r1, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(r2, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(both, { opacity: 1, duration: .4 }).addLabel('s3');
    tl.to(s4, { opacity: 1, duration: .4 }).addLabel('s4');
    tl.to(s5, { opacity: 1, duration: .4 }).addLabel('s5');
    tl.to(s6, { opacity: 1, duration: .4 })
      .to(cuts, { scaleX: 1, duration: .4, stagger: .25, ease: 'power2.out' })
      .to(s6b, { opacity: 1, duration: .4 }).addLabel('s6');
    tl.to(s7, { opacity: 1, duration: .4 }).addLabel('s7');
  });

  // L1-19 · uscita: il 53 fermo a 182 assenze; poi 1/18.
  PSI.scene('uscita-1', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    S05.ball(root, 260, 150, 120, 53, 'uscita');
    label(root, 600, 85, 'assenze', 's05-small');
    label(root, 600, 195, '182', 's05-huge', { style: 'font-size:110px;fill:' + C.data });
    var ans = svg('g', {}, root);
    label(ans, 860, 195, '1/18', 's05-huge', { style: 'font-size:100px;fill:' + C.ok });
    label(ans, 860, 245, 'alla prossima, come sempre', 's05-small', { style: 'fill:' + C.ok });
    gsap.set(ans, { opacity: 0 });
    tl.addLabel('s0');
    tl.fromTo(ans, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5 }).addLabel('s1');
  });
})();
