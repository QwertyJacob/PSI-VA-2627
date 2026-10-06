/* Lezione 2, Atto IV: il paradosso dei compleanni, l'approssimazione esponenziale, la regola della radice. */
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
  // P(almeno una coincidenza) con n persone e N giorni: 1 − ∏(1 − i/N).
  function pColl(n, N) {
    var q = 1;
    for (var i = 0; i < n; i++) q *= (N - i) / N;
    return 1 - Math.max(q, 0);
  }
  function pct(p) { return (100 * p).toFixed(1) + '%'; }
  function path(pts) {
    return pts.map(function (p, i) { return (i ? 'L ' : 'M ') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  }
  function polyLength(pts) {
    var s = 0;
    for (var i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return s;
  }
  function circle(root, cx, cy, R, n) {
    var pts = [];
    for (var i = 0; i < n; i++) {
      var t = -Math.PI / 2 + 2 * Math.PI * i / n;
      pts.push([cx + R * Math.cos(t), cy + R * Math.sin(t)]);
    }
    return pts;
  }

  // Il calendario: ogni nuova persona deve evitare i giorni già presi.
  PSI.scene('compleanni-modello', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), steps = q.all('.scene-steps li');
    var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], MONTHS = 'GFMAMGLASOND';
    var cells = [], cal = svg('g', {}, root);
    DAYS.forEach(function (d, m) {
      var x = 34 + m * 46;
      label(cal, x + 20, 22, MONTHS[m], 's03-tiny');
      for (var g = 0; g < d; g++) {
        cells.push(svg('rect', { x: x, y: 34 + g * 12, width: 40, height: 10, rx: 2, fill: '#ffffff14' }, cal));
      }
    });
    // Dieci compleanni tutti diversi, scelti con un seme fisso.
    var rnd = PSI.random(1654), picks = [];
    while (picks.length < 10) {
      var day = Math.floor(rnd() * 365);
      if (picks.indexOf(day) < 0) picks.push(day);
    }
    var info = label(root, 300, 425, '', 's03-small', { style: 'fill:#edf2f7' });
    var st = { k: 0 };
    function render() {
      var k = Math.round(st.k), p = 1;
      cells.forEach(function (c) { c.setAttribute('fill', '#ffffff14'); });
      picks.slice(0, k).forEach(function (d, i) { cells[d].setAttribute('fill', i === k - 1 ? G : A); });
      for (var i = 0; i < k; i++) p *= (365 - i) / 365;
      info.textContent = k ? k + (k === 1 ? ' persona' : ' persone') + ' · giorni liberi: ' + (365 - k) + ' · P(tutti diversi) = ' + p.toFixed(4) : '365 giorni liberi';
    }
    render();
    gsap.set(steps, { opacity: .25 });
    gsap.set([cal, info, q.one('.scene-def'), q.one('.scene-note')], { opacity: 0 });
    tl.to([cal, info], { opacity: 1, duration: .5 }).addLabel('s0');
    [1, 2, 3].forEach(function (k) {
      tl.to(steps[k - 1], { opacity: 1, duration: .3 }).to(st, { k: k, duration: .01, onUpdate: render }).addLabel('s' + k);
    });
    tl.to(steps[3], { opacity: 1, duration: .3 });
    for (var k = 4; k <= 10; k++) tl.to(st, { k: k, duration: .01, onUpdate: render, delay: .25 });
    tl.addLabel('s4');
    tl.to(q.one('.scene-def'), { opacity: 1, duration: .5 }).addLabel('s5');
    tl.to(q.one('.scene-note'), { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // La curva fino a 70 persone; a 23 si passa il 50%; poi il voto del Sondaggio 2.
  PSI.scene('compleanni-curva', function (el, tl) {
    var q = PSI.q(el), root = q.one('.cc-layer svg');
    var X = function (n) { return 100 + n * 14.6; }, Y = function (p) { return 375 - p * 330; };
    var axes = svg('g', {}, root);
    line(axes, X(0), Y(0), X(70), Y(0), '#8292a8', 2);
    line(axes, X(0), Y(0), X(0), Y(1.02), '#8292a8', 2);
    for (var t = 0; t <= 70; t += 10) label(axes, X(t), 405, String(t), 's03-tiny');
    label(axes, X(70), 428, 'persone n', 's03-tiny', { 'text-anchor': 'end' });
    [0, .5, 1].forEach(function (p) { label(axes, X(0) - 12, Y(p) + 6, p === .5 ? '50%' : (100 * p) + '%', 's03-tiny', { 'text-anchor': 'end' }); });
    line(axes, X(0), Y(.5), X(70), Y(.5), '#a0aec0', 1.5, { 'stroke-dasharray': '7 6' });
    line(axes, X(0), Y(1), X(70), Y(1), '#ffffff22', 1);
    var curve = svg('path', { fill: 'none', stroke: G, 'stroke-width': 4 }, root);
    var dot = svg('circle', { r: 8, fill: G }, root);
    var now = label(root, 0, 0, '', 's03-label halo', { 'text-anchor': 'start' });
    var mark23 = svg('g', {}, root);
    line(mark23, X(23), Y(0), X(23), Y(.507), B, 3, { 'stroke-dasharray': '6 5' });
    label(mark23, X(23), Y(0) - 14, '23', 's03-big s03-b halo');
    var table = svg('g', {}, root);
    [10, 30, 40, 50, 70].forEach(function (n) {
      var p = pColl(n, 365), low = n >= 30;
      svg('circle', { cx: X(n), cy: Y(p), r: 6, fill: '#edf2f7' }, table);
      label(table, X(n) + (low ? 0 : -14), Y(p) + (low ? 34 : -14), pct(p), 's03-small', { 'text-anchor': low ? 'middle' : 'end', style: 'fill:#edf2f7' });
    });
    var st = { n: 0, panel: 0 };
    function render() {
      var n = Math.round(st.n), pts = [];
      for (var i = 0; i <= n; i++) pts.push([X(i), Y(pColl(i, 365))]);
      curve.setAttribute('d', path(pts));
      var p = pColl(n, 365), last = pts[pts.length - 1];
      dot.setAttribute('cx', last[0]);
      dot.setAttribute('cy', last[1]);
      now.setAttribute('x', last[0] + (n > 55 ? -250 : 16));
      now.setAttribute('y', last[1] - 16);
      now.textContent = n ? 'n = ' + n + ': ' + pct(p) : '';
      now.setAttribute('class', 's03-label halo' + (n === 23 ? ' s03-green' : ''));
    }
    render();
    var layers = [q.one('.cc-layer'), q.one('.result-layer')];
    function accessibility() { layers[1].setAttribute('aria-hidden', st.panel < .5 ? 'true' : 'false'); }
    gsap.set([mark23, table, q.one('.cc-check')], { opacity: 0 });
    gsap.set(layers[1], { autoAlpha: 0 });
    tl.addLabel('s0');
    tl.to(st, { n: 22, duration: 2, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(st, { n: 23, duration: .01, onUpdate: render }).to(mark23, { opacity: 1, duration: .5 }).addLabel('s2');
    tl.to(st, { n: 70, duration: 2, ease: 'none', onUpdate: render }).to(table, { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(layers[0], { autoAlpha: 0, duration: .3 })
      .to(layers[1], { autoAlpha: 1, duration: .5 })
      .to(st, { panel: 1, duration: .01, onUpdate: accessibility }).addLabel('s4');
    tl.to(layers[1], { autoAlpha: 0, duration: .3 })
      .to(st, { panel: 0, duration: .01, onUpdate: accessibility })
      .to(layers[0], { autoAlpha: 1, duration: .4 })
      .to(q.one('.cc-check'), { opacity: 1, duration: .5 }).addLabel('s5');
  });

  // Il mio compleanno (22 coppie) contro una coppia qualunque (253 coppie).
  PSI.scene('mio-compleanno', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg');
    var L = circle(root, 300, 190, 160, 23), R = circle(root, 880, 190, 160, 23);
    var mine = [], all = [], gl = svg('g', {}, root), gr = svg('g', {}, root);
    for (var j = 1; j < 23; j++) mine.push(line(gl, L[0][0], L[0][1], L[j][0], L[j][1], B, 2));
    for (var a = 0; a < 23; a++) {
      for (var b = a + 1; b < 23; b++) all.push(line(gr, R[a][0], R[a][1], R[b][0], R[b][1], A, 1.1, { 'stroke-opacity': .6 }));
    }
    var dots = svg('g', {}, root);
    L.forEach(function (p, i) { svg('circle', { cx: p[0], cy: p[1], r: i ? 7 : 12, fill: i ? '#edf2f7' : B }, dots); });
    R.forEach(function (p) { svg('circle', { cx: p[0], cy: p[1], r: 7, fill: '#edf2f7' }, dots); });
    label(dots, L[0][0] + 34, L[0][1] + 6, 'io', 's03-small', { style: 'fill:' + B });
    var capL = [label(root, 300, 385, 'il mio: 22 coppie', 's03-label s03-b'), label(root, 300, 414, '1 − (364/365)²² ≈ 5.9%', 's03-small', { style: 'fill:#edf2f7' })];
    var capR = [label(root, 880, 385, 'una qualunque: 253 coppie', 's03-label s03-a'), label(root, 880, 414, '≈ 50.7%', 's03-small', { style: 'fill:#edf2f7' })];
    var foot = [q.one('.mc-pairs'), q.one('.mc-q'), q.one('.mc-a')];
    gsap.set([mine, all, capL, capR, foot], { opacity: 0 });
    gsap.set(dots, { opacity: 0 });
    tl.to(dots, { opacity: 1, duration: .5 }).addLabel('s0');
    tl.to(mine, { opacity: 1, duration: .2, stagger: .04 }).to(capL, { opacity: 1, duration: .4 }).addLabel('s1');
    tl.to(all, { opacity: 1, duration: .15, stagger: .007 }).to(capR, { opacity: 1, duration: .4 }).addLabel('s2');
    tl.to(foot[0], { opacity: 1, duration: .5 }).addLabel('s3');
    tl.to(foot[1], { opacity: 1, duration: .5 }).addLabel('s4');
    tl.to(foot[2], { opacity: 1, duration: .5 }).addLabel('s5');
  });

  // 1 − x è la tangente in 0 di e^(−x) e le sta sotto; poi i passi del pannello.
  PSI.scene('approssimazione', function (el, tl) {
    var q = PSI.q(el), root = q.one('.scene-svg'), steps = q.all('.scene-steps li');
    var X = function (x) { return 70 + (x + .4) * 240; }, Y = function (y) { return 400 - (y + .6) * 162; };
    var axes = svg('g', {}, root);
    line(axes, X(-.4), Y(0), X(1.6), Y(0), '#8292a8', 2);
    line(axes, X(0), Y(-.6), X(0), Y(1.5), '#8292a8', 2);
    [.5, 1, 1.5].forEach(function (x) { label(axes, X(x), Y(0) + 24, String(x), 's03-tiny'); });
    label(axes, X(0) - 10, Y(1) + 6, '1', 's03-tiny', { 'text-anchor': 'end' });
    var ePts = [], tPts = [];
    for (var i = 0; i <= 80; i++) {
      var x = -.4 + 2 * i / 80;
      ePts.push([X(x), Y(Math.exp(-x))]);
    }
    tPts.push([X(-.4), Y(1.4)], [X(1.6), Y(-.6)]);
    var ex = svg('path', { d: path(ePts), fill: 'none', stroke: G, 'stroke-width': 4 }, root);
    var tg = svg('path', { d: path(tPts), fill: 'none', stroke: B, 'stroke-width': 3 }, root);
    var lbls = [label(root, X(-.3) + 8, Y(1.5) + 18, 'e^(−x)', 's03-label s03-green', { 'text-anchor': 'start' }),
      label(root, X(1.25), Y(-.25) + 34, '1 − x', 's03-label s03-b', { 'text-anchor': 'start' })];
    var touch = svg('circle', { cx: X(0), cy: Y(1), r: 7, fill: '#edf2f7' }, root);
    // Tre valori di x: lo scarto si vede solo quando x è grande.
    var gaps = svg('g', {}, root), tab = svg('g', {}, root);
    [.1, .5].forEach(function (x) { line(gaps, X(x), Y(1 - x), X(x), Y(Math.exp(-x)), C, 3); });
    label(tab, 320, 50, 'x', 's03-tiny', { 'text-anchor': 'start' });
    label(tab, 395, 50, '1 − x', 's03-tiny', { 'text-anchor': 'start' });
    label(tab, 545, 50, 'e^(−x)', 's03-tiny', { 'text-anchor': 'end' });
    [[.01, '0.99', '0.9900'], [.1, '0.90', '0.9048'], [.5, '0.50', '0.6065']].forEach(function (r, i) {
      label(tab, 320, 78 + i * 26, String(r[0]), 's03-small', { 'text-anchor': 'start', style: 'fill:#edf2f7' });
      label(tab, 395, 78 + i * 26, r[1], 's03-small', { 'text-anchor': 'start', style: 'fill:' + B });
      label(tab, 545, 78 + i * 26, r[2], 's03-small', { 'text-anchor': 'end', style: 'fill:' + G });
    });
    gsap.set(steps, { opacity: .25 });
    gsap.set([lbls, touch, gaps, tab, q.one('.scene-def'), q.one('.scene-note')], { opacity: 0 });
    gsap.set([ex, tg], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(steps[0], { opacity: 1, duration: .3 }).to([ex, tg], { opacity: 1, duration: .01 });
    PSI.draw(tl, ex, polyLength(ePts), { duration: 1 });
    PSI.draw(tl, tg, polyLength(tPts), { duration: 1 }, '<');
    tl.to([lbls, touch], { opacity: 1, duration: .4 }).to([gaps, tab], { opacity: 1, duration: .5 }).addLabel('s1');
    [1, 2, 3].forEach(function (k) { tl.to(steps[k], { opacity: 1, duration: .4 }).addLabel('s' + (k + 1)); });
    tl.to(q.one('.scene-def'), { opacity: 1, duration: .5 }).addLabel('s5');
    tl.to(q.one('.scene-note'), { opacity: 1, duration: .5 }).addLabel('s6');
  });

  // La soglia del 50%: l'equazione, una riga per click, la regola.
  PSI.scene('regola-radice', function (el, tl) {
    var q = PSI.q(el), rows = q.all('.rr-table tbody tr');
    gsap.set([q.one('.rr-chain'), rows, q.one('.rr-punch')], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(q.one('.rr-chain'), { opacity: 1, duration: .6 }).addLabel('s1');
    rows.forEach(function (r, i) { tl.to(r, { opacity: 1, duration: .4 }).addLabel('s' + (i + 2)); });
    tl.to(q.one('.rr-punch'), { opacity: 1, duration: .6 }).addLabel('s5');
  });

  // Widget: la probabilità esatta in funzione di x = n/√N, per N da 10 a 10 milioni.
  (function () {
    var box = document.getElementById('cu-box');
    if (!box) return;
    var root = box.querySelector('.scene-svg'), slider = box.querySelector('input'), out = box.querySelector('.cu-out');
    var X = function (x) { return 80 + x * 293; }, Y = function (p) { return 340 - p * 290; };
    line(root, X(0), Y(0), X(3), Y(0), '#8292a8', 2);
    line(root, X(0), Y(0), X(0), Y(1.03), '#8292a8', 2);
    [0, .5, 1, 1.5, 2, 2.5, 3].forEach(function (x) { label(root, X(x), 366, String(x), 's03-tiny'); });
    label(root, X(3), 340 - 12, 'x = n / √N', 's03-tiny', { 'text-anchor': 'end' });
    [0, .5, 1].forEach(function (p) { label(root, X(0) - 12, Y(p) + 6, (100 * p) + '%', 's03-tiny', { 'text-anchor': 'end' }); });
    line(root, X(0), Y(.5), X(3), Y(.5), '#a0aec0', 1.5, { 'stroke-dasharray': '7 6' });
    line(root, X(1.1774), Y(0), X(1.1774), Y(.5), '#a0aec0', 1.5, { 'stroke-dasharray': '7 6' });
    label(root, X(1.1774) + 8, Y(0) - 10, '1.18', 's03-small', { 'text-anchor': 'start' });
    var lim = [];
    for (var i = 0; i <= 120; i++) { var x = 3 * i / 120; lim.push([X(x), Y(1 - Math.exp(-x * x / 2))]); }
    svg('path', { d: path(lim), fill: 'none', stroke: '#edf2f7', 'stroke-width': 2.5, 'stroke-dasharray': '9 7' }, root);
    label(root, X(2.95), Y(.97) + 34, 'limite 1 − e^(−x²/2)', 's03-small', { 'text-anchor': 'end' });
    var exact = svg('path', { fill: 'none', stroke: G, 'stroke-width': 4 }, root);
    function render() {
      var N = Math.round(Math.pow(10, +slider.value)), s = Math.sqrt(N), pts = [], q = 1, n = 0, n50 = null;
      for (var i = 0; i <= 120; i++) {
        var target = Math.round(3 * i / 120 * s);
        while (n < target) { q *= Math.max(N - n, 0) / N; n++; if (n50 === null && 1 - q >= .5) n50 = n; }
        pts.push([X(n / s), Y(1 - q)]);
      }
      // Se la soglia cade oltre x = 3 (non succede con N ≥ 10), si continua a contare.
      while (n50 === null) { q *= Math.max(N - n, 0) / N; n++; if (1 - q >= .5) n50 = n; }
      exact.setAttribute('d', path(pts));
      out.innerHTML = '<b>N = ' + N.toLocaleString('it-IT') + '</b> · √N ≈ ' + s.toFixed(1) +
        ' · primo n con P ≥ 50%: <b class="highlight">' + n50.toLocaleString('it-IT') + '</b>' +
        ' · regola 1.18·√N ≈ <b>' + (1.1774 * s).toFixed(1) + '</b>';
    }
    slider.addEventListener('input', render);
    box.querySelectorAll('[data-n]').forEach(function (btn) {
      btn.addEventListener('click', function () { slider.value = Math.log10(+btn.dataset.n); render(); this.blur(); });
    });
    render();
  })();
})();
