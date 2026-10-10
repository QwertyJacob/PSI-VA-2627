/* Lezione 2: linearità con X+Y=1, indicatrici, tre chiavi, conteggio binomiale, widget, guasto comune. */
(function () {
  'use strict';
  var svg = PSI.svg, text = PSI.text;
  var A = '#38bdf8', B = '#fbbf24', C = '#c084fc', G = '#38ef7d', RED = '#ff6b6b';

  function label(root, x, y, value, cls, attrs) {
    return text(root, x, y, value, cls || 's04-label', Object.assign({ 'text-anchor': 'middle' }, attrs));
  }
  function line(root, x1, y1, x2, y2, color, width, extra) {
    return svg('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, 'stroke-width': width || 3 }, extra), root);
  }
  function cat(tl, img) {
    gsap.set(img, { scale: .2, rotation: -12, autoAlpha: 0 });
    return tl.to(img, { scale: 1, rotation: 0, autoAlpha: 1, duration: .7, ease: 'back.out(1.6)' });
  }
  function fulcrum(root, x, y, size, color) {
    return svg('path', { d: 'M ' + x + ' ' + y + ' L ' + (x - size) + ' ' + (y + 1.6 * size) + ' L ' + (x + size) + ' ' + (y + 1.6 * size) + ' Z', fill: color || G }, root);
  }
  // PMF della Binomiale(n, p), con i bordi p = 0 e p = 1 letti dal modello.
  function binom(n, p) {
    var out = [];
    for (var k = 0; k <= n; k++) {
      if (p === 0) { out.push(k === 0 ? 1 : 0); continue; }
      if (p === 1) { out.push(k === n ? 1 : 0); continue; }
      var c = 1;
      for (var j = 1; j <= k; j++) c *= (n - j + 1) / j;
      out.push(c * Math.pow(p, k) * Math.pow(1 - p, n - k));
    }
    return out;
  }
  // Un piccolo grafico a barre con asse e fulcro (per l'uscita).
  function bars(root, x0, base, dx, w, hmax, pmf, color) {
    var g = svg('g', {}, root);
    line(g, x0 - dx / 2, base, x0 + dx * (pmf.length - .5), base, '#8292a8', 2);
    pmf.forEach(function (v, k) {
      var h = v * hmax, x = x0 + k * dx;
      if (h > 0) svg('rect', { x: x - w / 2, y: base - h, width: w, height: h, rx: 3, fill: color }, g);
      label(g, x, base + 26, String(k), 's04-small');
      if (v > 0) label(g, x, base - h - 8, v.toFixed(v >= .1 ? 2 : 3).replace('.', ','), 's04-tiny');
    });
    return g;
  }

  // L2-03 · colonne X e Y, poi X+Y e le medie, poi il perché, poi il teorema.
  PSI.scene('somma', function (el, tl) {
    var q = PSI.q(el);
    var xy = q.all('.sm-x, .sm-y'), s = q.all('.sm-s'), mean = q.one('.sm-mean'), dep = q.one('.sm-dep');
    var proof = q.one('.sm-proof'), thm = q.one('.sm-thm');
    gsap.set([xy, s, mean, dep, proof, thm], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(xy, { opacity: 1, duration: .4, stagger: .08 }).addLabel('s1');
    tl.to(s, { opacity: 1, duration: .4, stagger: .1 }).to(mean, { opacity: 1, duration: .4 }).to(dep, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(proof, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(thm, { opacity: 1, duration: .5 }).addLabel('s4');
  });

  // L2-05 · l'interruttore che scatta, le due barre della Bernoulli, la media del bit.
  PSI.scene('bit', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    label(root, 270, 34, 'A = «la richiesta fallisce»', 's04-label');
    svg('rect', { x: 170, y: 64, width: 200, height: 84, rx: 42, fill: '#ffffff10', stroke: '#ffffff50', 'stroke-width': 3 }, root);
    var track = svg('rect', { x: 170, y: 64, width: 200, height: 84, rx: 42, fill: G, opacity: 0 }, root);
    var knob = svg('circle', { cx: 212, cy: 106, r: 34, fill: '#edf2f7' }, root);
    var v0 = label(root, 120, 120, '0', 's04-huge', { style: 'font-size:52px' });
    var v1 = label(root, 420, 120, '1', 's04-huge', { style: 'font-size:52px;fill:#4a5568' });
    label(root, 120, 172, 'non accade', 's04-tiny');
    label(root, 420, 172, 'accade', 's04-tiny');
    var chart = svg('g', {}, root);
    var BASE = 390, p = .3, H = 170;
    line(chart, 90, BASE, 450, BASE, '#8292a8', 2);
    var r0 = svg('rect', { x: 140, y: BASE, width: 80, height: 0, rx: 4, fill: A }, chart);
    var r1 = svg('rect', { x: 320, y: BASE, width: 80, height: 0, rx: 4, fill: B }, chart);
    label(chart, 180, BASE + 30, '0', 's04-label');
    label(chart, 360, BASE + 30, '1', 's04-label');
    var l0 = label(chart, 180, BASE - (1 - p) * H - 12, '1 − p', 's04-label', { opacity: 0 });
    var l1 = label(chart, 360, BASE - p * H - 12, 'p', 's04-label s04-b', { opacity: 0 });
    var panels = q.all('.bt-panel > div');
    gsap.set(panels, { opacity: 0 });
    gsap.set(chart, { opacity: 0 });
    tl.addLabel('s0');
    tl.to(knob, { attr: { cx: 328 }, duration: .5, ease: 'back.out(2)' })
      .to(track, { opacity: .35, duration: .3 }, '<')
      .to(v1, { fill: G, duration: .3 }, '<')
      .to(v0, { opacity: .35, duration: .3 }, '<')
      .to(panels[0], { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(chart, { opacity: 1, duration: .3 })
      .to(r0, { attr: { y: BASE - (1 - p) * H, height: (1 - p) * H }, duration: .5 })
      .to(r1, { attr: { y: BASE - p * H, height: p * H }, duration: .5 }, '<.1')
      .to([l0, l1], { opacity: 1, duration: .3 })
      .to(panels[1], { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(r0, { opacity: .3, duration: .3 }).to(l0, { opacity: .3, duration: .3 }, '<')
      .to(r1, { attr: { fill: G }, duration: .3 }, '<')
      .to(panels[2], { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L2-07 · Esercizio 3: due caselle vuote, il gatto, la media 1,5, le otto assegnazioni.
  PSI.scene('esercizio-3', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    var empty = svg('g', {}, root);
    [0, 1].forEach(function (s) {
      svg('rect', { x: 110 + s * 210, y: 120, width: 170, height: 150, rx: 12, fill: '#ffffff07', stroke: '#ffffff55', 'stroke-width': 3 }, empty);
      label(empty, 195 + s * 210, 300, 'casella ' + s, 's04-small');
    });
    label(empty, 300, 80, 'a   b   c', 's04-mono', { style: 'fill:' + A });
    var mean = svg('g', {}, root);
    label(mean, 300, 410, 'E[C] = 1/2 + 1/2 + 1/2 = 1,5 coppie', 's04-math', { style: 'font-size:28px' });
    label(mean, 300, 450, 'un numero di coppie, non una probabilità', 's04-small s04-b');
    var grid = svg('g', {}, root);
    for (var m = 0; m < 8; m++) {
      var col = m % 4, row = Math.floor(m / 4), x = 10 + col * 148, y = 10 + row * 172;
      var keys = [['a', m & 1], ['b', (m >> 1) & 1], ['c', (m >> 2) & 1]];
      var all = m === 0 || m === 7;
      [0, 1].forEach(function (s) {
        svg('rect', { x: x + s * 66, y: y, width: 60, height: 100, rx: 6, fill: '#ffffff07', stroke: all ? B : '#ffffff40', 'stroke-width': 2 }, grid);
        var inside = keys.filter(function (k) { return k[1] === s; });
        inside.forEach(function (k, i) { label(grid, x + s * 66 + 30, y + 30 + i * 28, k[0], 's04-tag', { style: 'fill:' + A }); });
      });
      label(grid, x + 63, y + 136, 'C = ' + (all ? 3 : 1), 's04-label', { style: 'font-weight:700;fill:' + (all ? B : '#edf2f7') });
    }
    label(grid, 300, 368, 'C vale 1 oppure 3, mai 2', 's04-label s04-red', { style: 'font-weight:700' });
    gsap.set([mean, grid], { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 }).to(mean, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(empty, { opacity: 0, duration: .3 }).to(grid, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L2-08 · quattro operazioni, i loro bit, la somma.
  PSI.scene('conteggio', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var bitsVal = [0, 1, 0, 0], cells = [];
    for (var i = 0; i < 4; i++) {
      var x = 120 + i * 190;
      label(root, x + 50, 28, 'operazione ' + (i + 1), 's04-small');
      svg('rect', { x: x, y: 44, width: 100, height: 90, rx: 12, fill: '#ffffff08', stroke: '#ffffff50', 'stroke-width': 2 }, root);
      label(root, x + 50, 168, 'I' + (i + 1), 's04-label', { style: 'font-style:italic' });
      cells.push(label(root, x + 50, 108, String(bitsVal[i]), 's04-huge', { style: 'font-size:56px;fill:' + (bitsVal[i] ? B : '#718096'), opacity: 0 }));
      if (i < 3) label(root, x + 145, 104, '+', 's04-big', { style: 'fill:#718096' });
    }
    var sum = label(root, 990, 108, '= 1', 's04-big', { style: 'fill:' + G, opacity: 0 });
    label(root, 990, 168, 'X', 's04-label', { style: 'font-style:italic;fill:' + G });
    var hyp = q.one('.bn-hyp'), chain = q.one('.bn-chain'), where = q.one('.bn-where');
    gsap.set([hyp, chain, where], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(cells, { opacity: 1, duration: .3, stagger: .15 }).to(sum, { opacity: 1, duration: .4 })
      .to(hyp, { opacity: 1, duration: .5 }).addLabel('s1');
    tl.to(chain, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(where, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L2-10 · widget Binomiale: barre della PMF per k = 0..20 e fulcro in np.
  (function () {
    var box = document.getElementById('bn-box');
    if (!box) return;
    var root = box.querySelector('svg'), out = box.querySelector('.wd-out');
    var inputs = {}, st = {};
    box.querySelectorAll('input').forEach(function (i) { inputs[i.dataset.k] = i; });
    var X0 = 70, DX = 47, BASE = 262, H = 230, W = 34;
    line(root, X0 - 30, BASE, X0 + 20 * DX + 30, BASE, '#8292a8', 2);
    var rects = [], vals = [];
    for (var k = 0; k <= 20; k++) {
      rects.push(svg('rect', { x: X0 + k * DX - W / 2, y: BASE, width: W, height: 0, rx: 3, fill: A }, root));
      vals.push(label(root, X0 + k * DX, BASE, '', 's04-tiny'));
      label(root, X0 + k * DX, BASE + 26, String(k), 's04-small');
    }
    label(root, X0 + 20 * DX + 30, BASE + 56, 'k (successi)', 's04-tiny', { 'text-anchor': 'end' });
    var fc = fulcrum(root, 0, BASE + 32, 14);
    var fl = label(root, 0, BASE + 74, '', 's04-label s04-green', { style: 'font-weight:700' });
    function render() {
      var n = Math.round(st.n), p = st.p, pmf = binom(n, p), mu = n * p;
      box.querySelector('[data-v="n"]').textContent = n;
      box.querySelector('[data-v="p"]').textContent = p.toFixed(2);
      rects.forEach(function (r, k) {
        var v = k <= n ? pmf[k] : 0, h = v * H;
        r.setAttribute('y', BASE - h); r.setAttribute('height', h);
        vals[k].setAttribute('y', BASE - h - 6);
        vals[k].textContent = v >= .005 ? v.toFixed(2) : '';
      });
      var fx = X0 + mu * DX;
      fc.setAttribute('d', 'M ' + fx + ' ' + (BASE + 32) + ' L ' + (fx - 14) + ' ' + (BASE + 54) + ' L ' + (fx + 14) + ' ' + (BASE + 54) + ' Z');
      fl.setAttribute('x', fx); fl.setAttribute('y', BASE + 80);
      fl.textContent = 'np = ' + mu.toFixed(2);
      out.innerHTML = 'E[X] = n · p = ' + n + ' · ' + p.toFixed(2) + ' = <b>' + mu.toFixed(2) + '</b>';
    }
    function set(n, p) { st.n = n; st.p = p; inputs.n.value = n; inputs.p.value = p; render(); }
    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', function () { st[k] = +this.value; render(); });
    });
    box.querySelectorAll('[data-n]').forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.n, +b.dataset.p); this.blur(); });
    });
    set(4, .2);
  })();

  // L2-11 · Esercizio 4: bit separati contro bit legati a un guasto comune.
  PSI.scene('esercizio-4', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), img = q.one('.ex-cat');
    label(root, 150, 30, 'indipendenti', 's04-label', { style: 'font-weight:700;fill:' + A });
    label(root, 450, 30, 'guasto comune', 's04-label', { style: 'font-weight:700;fill:' + C });
    line(root, 300, 10, 300, 300, '#ffffff25', 2);
    for (var i = 0; i < 4; i++) {
      var y = 70 + i * 56;
      // Sinistra: ogni bit ha la sua moneta truccata da 0,2.
      svg('circle', { cx: 80, cy: y + 20, r: 18, fill: '#38bdf826', stroke: A, 'stroke-width': 2 }, root);
      label(root, 80, y + 26, '0,2', 's04-tiny', { style: 'fill:' + A });
      line(root, 100, y + 20, 160, y + 20, A, 2);
      svg('rect', { x: 162, y: y + 2, width: 70, height: 36, rx: 6, fill: '#ffffff08', stroke: '#ffffff50', 'stroke-width': 2 }, root);
      label(root, 197, y + 27, 'I' + (i + 1), 's04-small', { style: 'font-style:italic;fill:#edf2f7' });
      // Destra: tutti i bit attaccati alla stessa sorgente.
      line(root, 386, 182, 470, y + 20, C, 2);
      svg('rect', { x: 472, y: y + 2, width: 70, height: 36, rx: 6, fill: '#ffffff08', stroke: '#ffffff50', 'stroke-width': 2 }, root);
      label(root, 507, y + 27, 'I' + (i + 1), 's04-small', { style: 'font-style:italic;fill:#edf2f7' });
    }
    svg('circle', { cx: 360, cy: 182, r: 28, fill: '#c084fc33', stroke: C, 'stroke-width': 3 }, root);
    label(root, 360, 189, '0,2', 's04-small', { style: 'fill:' + C });
    var mean = svg('g', {}, root);
    label(mean, 150, 350, 'E[X] = 4 · 0,2 = 0,8', 's04-label s04-green');
    label(mean, 450, 350, 'E[X] = 4 · 0,2 = 0,8', 's04-label s04-green');
    var vals = svg('g', {}, root);
    label(vals, 150, 410, 'X ∈ {0, 1, 2, 3, 4}', 's04-label');
    label(vals, 450, 410, 'X ∈ {0, 4}', 's04-label s04-b');
    label(vals, 300, 460, 'stessa media, distribuzioni diverse', 's04-label s04-red', { style: 'font-weight:700' });
    gsap.set([mean, vals], { opacity: 0 });
    tl.addLabel('s0');
    cat(tl, img).addLabel('s1');
    tl.to(img, { autoAlpha: 0, duration: .4 }).to(mean, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(vals, { opacity: 1, duration: .5 }).addLabel('s3');
  });

  // L2-12 · uscita: stesso baricentro 0,8, barre diverse.
  PSI.scene('uscita-2', function (el, tl) {
    var root = PSI.q(el).one('.scene-svg');
    var BASE = 230, H = 190, DX = 80, W = 50;
    label(root, 270, 26, 'indipendenti · Binomiale(4; 0,2)', 's04-label', { style: 'fill:' + A });
    label(root, 830, 26, 'guasto comune', 's04-label', { style: 'fill:' + C });
    bars(root, 110, BASE, DX, W, H, binom(4, .2), A);
    bars(root, 670, BASE, DX, W, H, [.8, 0, 0, 0, .2], C);
    var f1 = fulcrum(root, 110 + .8 * DX, BASE + 34, 14), f2 = fulcrum(root, 670 + .8 * DX, BASE + 34, 14);
    var t1 = label(root, 110 + .8 * DX, BASE + 78, 'media 0,8', 's04-label s04-green', { style: 'font-weight:700' });
    var t2 = label(root, 670 + .8 * DX, BASE + 78, 'media 0,8', 's04-label s04-green', { style: 'font-weight:700' });
    gsap.set([f1, f2, t1, t2], { opacity: 0 });
    tl.addLabel('s0');
    tl.fromTo([f1, f2], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .5 }).to([t1, t2], { opacity: 1, duration: .4 }).addLabel('s1');
  });
})();
