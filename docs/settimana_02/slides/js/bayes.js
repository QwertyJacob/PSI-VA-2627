/*
 * Scene degli Atti IV e V: probabilità totale e Bayes sul mosaico (moduli
 * software), la forma a odds su una scala di log-odds, il controllo qualità
 * letto all'indietro, i compiti non firmati.
 * Motore e utilità: scene.js, comuni.js.
 */
(function () {
  'use strict';

  var svg = PSI.svg, text = PSI.text, C = S2.C;

  // Pezzi di evidenza che volano dal mosaico a una barra e poi si normalizzano.
  // pieces: [{ from: [x, y, w, h], to: [x, w], full: [x, w], fill }]
  function flyers(root, pieces) {
    return pieces.map(function (p) {
      return svg('rect', { x: p.from[0], y: p.from[1], width: p.from[2], height: p.from[3], fill: p.fill, 'class': 'md-fly' }, root);
    });
  }

  // ── Moduli software (Baron 2.35): prior, verosimiglianza, somma, divisione ──
  PSI.scene('moduli', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X0 = 40, W = 620, Y0 = 44, H = 270, BY = 372, BH = 40;
    var HYP = [
      { name: 'solo I', prior: 0.12, lik: 0.5, col: C.a },
      { name: 'solo II', prior: 0.32, lik: 0.8, col: C.c },
      { name: 'I e II', prior: 0.08, lik: 0.9, col: '#f472b6' },
      { name: 'nessuno', prior: 0.48, lik: 0, col: '#64748b' }
    ];
    var PC = 0.388, x = X0;
    HYP.forEach(function (h) { h.x = x; h.w = h.prior * W; x += h.w; });

    var omega = svg('rect', { x: X0, y: Y0, width: W, height: H, rx: 4, 'class': 'omega' }, root);
    var cols = [], names = [], priors = [], crash = [], liks = [];
    HYP.forEach(function (h) {
      cols.push(svg('rect', { x: h.x, y: Y0, width: h.w, height: H, fill: h.col, 'class': 'md-col' }, root));
      names.push(text(root, h.x + h.w / 2, Y0 - 12, h.name, 'md-name', { 'text-anchor': 'middle', style: 'fill:' + h.col }));
      priors.push(text(root, h.x + h.w / 2, Y0 + 30, h.prior.toFixed(2), 'md-prior', { 'text-anchor': 'middle' }));
      crash.push(svg('rect', { x: h.x, y: Y0 + H, width: h.w, height: 0, fill: h.col, 'class': 'md-crash' }, root));
      liks.push(text(root, h.x + h.w / 2, Y0 + H - h.lik * H - 8, h.lik ? String(h.lik) : '0', 'md-lik halo', { 'text-anchor': 'middle' }));
    });
    HYP.slice(1).forEach(function (h) { svg('line', { x1: h.x, y1: Y0, x2: h.x, y2: Y0 + H, 'class': 'md-sep' }, root); });
    var cLbl = text(root, X0 + W + 12, Y0 + H - 10, 'C', 'md-c it');

    // Barra della probabilità totale e, dopo, dei posterior.
    var bx = X0, pieces = [];
    HYP.forEach(function (h) {
      var a = h.prior * h.lik;
      pieces.push({ from: [h.x, Y0 + H - h.lik * H, h.w, h.lik * H], to: [bx, a * W], full: [X0 + (bx - X0) / PC, a * W / PC], fill: h.col, post: a / PC });
      bx += a * W;
    });
    var fl = flyers(root, pieces);
    var total = text(root, X0 + PC * W + 12, BY + BH / 2 + 7, 'P(C) = 0.388', 'md-total');
    var postLbl = pieces.map(function (p) {
      return text(root, p.full[0] + p.full[1] / 2, BY + BH / 2 + 7, p.post ? S2.pct(p.post) : '', 'md-post', { 'text-anchor': 'middle' });
    });
    var winner = svg('rect', { x: pieces[1].full[0], y: BY - 4, width: pieces[1].full[1], height: BH + 8, rx: 4, 'class': 'md-win' }, root);
    var one = text(root, X0 + W, BY + BH + 26, '= 1', 'md-one', { 'text-anchor': 'end' });

    var steps = q.all('.scene-steps li'), f1 = q.one('.md-f1'), f2 = q.one('.md-f2');
    gsap.set([cols, names, priors, liks, fl, total, postLbl, winner, one, cLbl, f1, f2], { opacity: 0 });
    gsap.set(steps, { opacity: 0.25 });
    gsap.set(omega, { opacity: 0 });
    tl.to(omega, { opacity: 1, duration: 0.4 }).addLabel('s0');

    // 1. Partizione: le colonne hanno larghezza = prior.
    tl.to(steps[0], { opacity: 1, duration: 0.3 })
      .to(cols, { opacity: 1, duration: 0.4, stagger: 0.12 }, '<')
      .to([names, priors], { opacity: 1, duration: 0.4 }, '<0.2')
      .addLabel('s1');

    // 2. Verosimiglianza: in ogni colonna sale la parte con crash.
    tl.to(steps[1], { opacity: 1, duration: 0.3 })
      .to(cLbl, { opacity: 1, duration: 0.3 }, '<');
    HYP.forEach(function (h, i) {
      tl.to(crash[i], { attr: { y: Y0 + H - h.lik * H, height: h.lik * H }, duration: 0.7, ease: 'power2.out' }, i ? '<0.15' : '>');
    });
    tl.to(liks, { opacity: 1, duration: 0.4 })
      .addLabel('s2');

    // 3. Somma: i pezzi con crash scendono in fila nella barra.
    tl.to(steps[2], { opacity: 1, duration: 0.3 })
      .to(f1, { opacity: 1, duration: 0.4 }, '<')
      .set(fl, { opacity: 0.9 });
    pieces.forEach(function (p, i) {
      tl.to(fl[i], { attr: { x: p.to[0], y: BY, width: p.to[1], height: BH }, duration: 0.9, ease: 'power2.inOut' }, i ? '<0.2' : '>');
    });
    tl.to(total, { opacity: 1, duration: 0.4 })
      .addLabel('s3');

    // 4. Divisione: la barra si allarga fino a 1, i pezzi diventano posterior.
    tl.to(steps[3], { opacity: 1, duration: 0.3 })
      .to(total, { opacity: 0, duration: 0.3 }, '<')
      .to(f2, { opacity: 1, duration: 0.4 }, '<');
    pieces.forEach(function (p, i) {
      tl.to(fl[i], { attr: { x: p.full[0], width: p.full[1] }, duration: 1, ease: 'power2.inOut' }, i ? '<' : '>');
    });
    tl.to([postLbl, one], { opacity: 1, duration: 0.4 })
      .to(winner, { opacity: 1, duration: 0.4 })
      .addLabel('s4');
  });

  // ── Odds: la credenza su una scala di log-odds ──
  //
  // Ogni evidenza sposta la credenza di log10(Λ): l'allarme di rete +2,
  // quello del server +1.28, una copia dei log di rete 0.
  PSI.scene('odds', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X0 = 70, X1 = 1090, AY = 232, LMIN = -4, LMAX = 4;
    var sx = function (l) { return X0 + (S2.clamp(l, LMIN, LMAX) - LMIN) / (LMAX - LMIN) * (X1 - X0); };
    var logit = function (p) { return Math.log10(p / (1 - p)); };

    svg('line', { x1: X0, y1: AY, x2: X1, y2: AY, 'class': 'od-axis' }, root);
    [[0.0001, '0.01%'], [0.001, '0.1%'], [0.01, '1%'], [0.1, '10%'], [0.5, '50%'], [0.9, '90%'], [0.99, '99%'], [0.999, '99.9%'], [0.9999, '99.99%']].forEach(function (t) {
      var x = sx(logit(t[0]));
      svg('line', { x1: x, y1: AY - 8, x2: x, y2: AY + 8, 'class': 'od-axis' }, root);
      text(root, x, AY + 34, t[1], 'od-tick', { 'text-anchor': 'middle' });
    });
    text(root, X0 - 4, AY + 64, 'meno probabile', 'od-end');
    text(root, X1 + 4, AY + 64, 'più probabile', 'od-end', { 'text-anchor': 'end' });
    var arrows = svg('g', {}, root);
    var marker = svg('path', { 'class': 'od-marker' }, root);
    var mLbl = text(root, 0, AY - 26, '', 'od-mlbl halo', { 'text-anchor': 'middle' });
    var warn = text(root, (X0 + X1) / 2, 26, 'copia degli stessi log: stessa evidenza, Λ = 1', 'od-warn', { 'text-anchor': 'middle' });

    var PRIOR = logit(0.01);
    var script = [{ lr: 99, name: 'allarme rete ×99' }, { lr: 19, name: 'allarme server ×19' }, { lr: 1, name: 'copia ×1' }];
    var extras = [], st = { k: 0, warn: 0 };
    function render() {
      while (arrows.firstChild) arrows.removeChild(arrows.firstChild);
      var items = [], full = Math.floor(st.k), part = st.k - full;
      for (var i = 0; i < Math.min(full, script.length); i++) items.push({ e: script[i], f: 1 });
      if (full < script.length && part > 0) items.push({ e: script[full], f: part });
      if (full >= script.length) extras.forEach(function (e) { items.push({ e: e, f: 1 }); });
      var l = PRIOR;
      items.forEach(function (it, k) {
        var d = Math.log10(it.e.lr) * it.f, y = 176 - (k % 4) * 34;
        var x0 = sx(l), x1 = sx(l + d), cls = it.e.lr > 1 ? 'od-up' : it.e.lr < 1 ? 'od-down' : 'od-zero';
        svg('line', { x1: x0, y1: y, x2: x1, y2: y, 'class': 'od-arrow ' + cls }, arrows);
        if (Math.abs(x1 - x0) > 4) {
          var dir = x1 > x0 ? 1 : -1;
          svg('path', { d: 'M' + x1 + ',' + y + 'l' + (-12 * dir) + ',-7v14z', 'class': 'od-head ' + cls }, arrows);
        } else {
          svg('circle', { cx: x0, cy: y, r: 6, 'class': 'od-head ' + cls }, arrows);
        }
        text(arrows, (x0 + x1) / 2 + (Math.abs(x1 - x0) < 60 ? 70 : 0), y - 9, it.e.name, 'od-alab halo ' + cls, { 'text-anchor': 'middle' });
        l += d;
      });
      var x = sx(l);
      marker.setAttribute('d', 'M' + x + ',' + (AY - 4) + 'l-11,-18h22z');
      var p = 1 / (1 + Math.pow(10, -l)), o = Math.pow(10, l);
      var odds = o >= 1 ? S2.count(o) + ' : 1' : '1 : ' + S2.count(1 / o);
      mLbl.setAttribute('x', S2.clamp(x, X0 + 60, X1 - 60));
      mLbl.textContent = S2.pct(p, p < 0.01 || p > 0.99 ? 2 : 0) + '  ·  ' + odds;
      warn.style.opacity = st.warn;
    }
    render();

    tl.addLabel('s0');
    tl.to(st, { k: 1, duration: 1, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    tl.to(st, { k: 2, duration: 1, ease: 'power1.inOut', onUpdate: render }).addLabel('s2');
    tl.to(st, { k: 3, duration: 0.6, onUpdate: render })
      .to(st, { warn: 1, duration: 0.5, onUpdate: render })
      .addLabel('s3');

    q.all('.od-buttons [data-lr]').forEach(function (b) {
      b.addEventListener('click', function () {
        this.blur();
        var lr = +this.dataset.lr;
        extras.push({ lr: lr, name: lr === 1 ? 'copia ×1' : lr < 1 ? 'nessun allarme ×1/99' : lr === 99 ? 'rete ×99' : 'server ×19' });
        render();
      });
    });
    q.one('.od-reset').addEventListener('click', function () { this.blur(); extras = []; render(); });
  });

  // ── Controllo qualità: l'albero a tre livelli letto all'indietro ──
  PSI.scene('qualita', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var LX = [26, 150, 290, 420], LY = [];
    for (var i = 0; i < 8; i++) LY.push(32 + i * 55);
    var ys = [LY];
    for (var l = 0; l < 3; l++) {
      var prev = ys[0], next = [];
      for (var k = 0; k < prev.length; k += 2) next.push((prev[k] + prev[k + 1]) / 2);
      ys.unshift(next);
    }
    // Probabilità dei rami, livello per livello (sì, no).
    var P = [[[0.9, 0.1]], [[0.8, 0.2], [0.4, 0.6]], [[0.95, 0.05], [0.6, 0.4], [0.6, 0.4], [0.3, 0.7]]];
    var NAMES = [['M', 'Mᶜ'], ['D', 'Dᶜ'], ['T', 'Tᶜ']];
    var levels = [[], [], []], path = [];
    for (l = 0; l < 3; l++) {
      ys[l].forEach(function (y, k) {
        [0, 1].forEach(function (c) {
          var a = [LX[l], y], b = [LX[l + 1], ys[l + 1][2 * k + c]];
          var ln = svg('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], 'class': 'tr-branch' }, root);
          var t = text(root, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (c ? 20 : -8), NAMES[l][c] + ' ' + P[l][k][c], 'ql-lbl halo', { 'text-anchor': 'middle' });
          levels[l].push(ln, t);
          if (k === 0 && c === 0) path.push(ln, t);
        });
      });
    }
    var VALS = [0.684, 0.036, 0.108, 0.072, 0.024, 0.016, 0.018, 0.042];
    var leafTxt = VALS.map(function (v, i) {
      return text(root, LX[3] + 12, LY[i] + 6, (i % 2 ? 'Tᶜ ' : 'T ') + v.toFixed(3), 'ql-leaf' + (i % 2 ? ' ql-fail' : ''));
    });
    var fails = leafTxt.filter(function (t, i) { return i % 2; });
    var oks = leafTxt.filter(function (t, i) { return !(i % 2); });
    var bars = [], barLbl = [];
    [1, 3, 5, 7].forEach(function (i) {
      var post = VALS[i] / 0.166, w = post * 240;
      bars.push(svg('rect', { x: 548, y: LY[i] - 13, width: w, height: 26, rx: 4, 'class': 'ql-bar' + (i === 3 ? ' ql-best' : '') }, root));
      barLbl.push(text(root, 554 + w, LY[i] + 7, S2.pct(post), 'ql-post' + (i === 3 ? ' ql-best-t' : '')));
    });

    var lines = q.all('.ql-q');
    gsap.set(levels[0].concat(levels[1], levels[2], leafTxt, bars, barLbl), { opacity: 0 });
    gsap.set(lines, { opacity: 0 });
    tl.addLabel('s0');
    levels.forEach(function (lv) { tl.to(lv, { opacity: 1, duration: 0.4 }); });
    tl.to(leafTxt, { opacity: 1, duration: 0.3, stagger: 0.05 }).addLabel('s1');
    tl.to(path.filter(function (n) { return n.tagName === 'line'; }), { stroke: C.sel, strokeWidth: 5, duration: 0.4 })
      .to(leafTxt[0], { fill: C.sel, duration: 0.4 }, '<')
      .to(lines[0], { opacity: 1, duration: 0.4 })
      .addLabel('s2');
    tl.to(path.filter(function (n) { return n.tagName === 'line'; }), { stroke: 'rgba(203, 213, 224, 0.6)', strokeWidth: 3, duration: 0.3 })
      .to(oks, { opacity: 0.25, duration: 0.4 }, '<')
      .to(fails, { fill: C.h, duration: 0.4 }, '<')
      .to(lines[0], { opacity: 0.35, duration: 0.3 }, '<')
      .to(lines[1], { opacity: 1, duration: 0.4 })
      .addLabel('s3');
    tl.to(bars, { opacity: 1, duration: 0.4, stagger: 0.1 })
      .from(bars, { attr: { width: 0 }, duration: 0.8, stagger: 0.1 }, '<')
      .to(barLbl, { opacity: 1, duration: 0.3 })
      .to([lines[2], lines[3]], { opacity: 1, duration: 0.4, stagger: 0.3 })
      .addLabel('s4');
  });

  // ── Esercizio: i compiti non firmati (Baron 2.33) ──
  PSI.scene('compiti', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X0 = 60, W = 610, SY = 40, SH = 110, BY = 320, BH = 44;
    var PG = [0.8, 0.7, 0.5], WHO = ['X', 'Y', 'Z'], COL = [C.a, C.c, '#f472b6'];
    var combos = [];
    for (var m = 0; m < 8; m++) {
      var good = [!(m & 4), !(m & 2), !(m & 1)], p = 1;
      good.forEach(function (g, s) { p *= g ? PG[s] : 1 - PG[s]; });
      var bad = good.indexOf(false), nBad = good.filter(function (g) { return !g; }).length;
      combos.push({ good: good, p: p, who: nBad === 1 ? bad : -1 });
    }
    var x = X0, blocks = [], table = [];
    WHO.forEach(function (w, s) { text(root, X0 - 16, SY + SH + 34 + s * 24, w, 'cp-who', { 'text-anchor': 'end', style: 'fill:' + COL[s] }); });
    combos.forEach(function (c) {
      c.x = x; c.w = c.p * W;
      blocks.push(svg('rect', { x: x + 1, y: SY, width: c.w - 2, height: SH, rx: 3, 'class': 'cp-block' }, root));
      var col = svg('g', {}, root);
      c.good.forEach(function (g, s) {
        text(col, x + c.w / 2, SY + SH + 34 + s * 24, g ? '✓' : '✗', g ? 'cp-ok' : 'cp-ko', { 'text-anchor': 'middle' });
      });
      table.push(col);
      x += c.w;
    });
    var omegaLbl = text(root, X0 + W + 8, SY + 24, 'Ω', 'math-lbl small');
    var keep = combos.filter(function (c) { return c.who >= 0; }).sort(function (a, b) { return b.p - a.p; });
    var probLbl = keep.map(function (c) { return text(root, c.x + c.w / 2, SY + SH / 2 + 8, c.p.toFixed(2), 'cp-p', { 'text-anchor': 'middle' }); });
    var drop = combos.filter(function (c) { return c.who < 0; }).map(function (c) { return blocks[combos.indexOf(c)]; });
    var keepBlocks = keep.map(function (c) { return blocks[combos.indexOf(c)]; });

    // Barra: prima P(GGB) = 0.47, poi normalizzata a 1.
    var PGGB = 0.47, bx = X0, fl = [], post = [];
    keep.forEach(function (c) {
      var r = svg('rect', { x: c.x + 1, y: SY, width: c.w - 2, height: SH, fill: COL[c.who], 'class': 'md-fly' }, root);
      c.bx = bx; c.bw = c.p * W; c.fx = X0 + (bx - X0) / PGGB; c.fw = c.p * W / PGGB;
      bx += c.bw;
      fl.push(r);
      post.push(text(root, c.fx + c.fw / 2, BY + BH / 2 + 8, WHO[c.who] + '  ' + S2.pct(c.p / PGGB), 'md-post', { 'text-anchor': 'middle' }));
    });
    var total = text(root, X0 + PGGB * W + 12, BY + BH / 2 + 7, 'P(GGB) = 0.47', 'md-total');
    var ggb = text(root, X0 + W / 2, SY - 14, 'evidenza: esattamente un ✗', 'cp-ev', { 'text-anchor': 'middle' });

    gsap.set([blocks, table, omegaLbl, probLbl, fl, post, total, ggb, q.one('.cp-res')], { opacity: 0 });
    tl.addLabel('s0');
    // 1. Gli 8 esiti come strisce di Ω, larghe quanto la loro probabilità.
    tl.to(blocks, { opacity: 1, duration: 0.4, stagger: 0.06 })
      .to([table, omegaLbl], { opacity: 1, duration: 0.4 }, '<0.2')
      .addLabel('s1');
    // 2. Evidenza: restano solo gli esiti con un compito insufficiente.
    tl.to(drop, { opacity: 0.12, duration: 0.5 })
      .to(ggb, { opacity: 1, duration: 0.4 }, '<')
      .to(fl, { opacity: 1, duration: 0.4 })
      .to(probLbl, { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s2');
    // 3. Somma: P(GGB).
    tl.to(probLbl, { opacity: 0, duration: 0.2 });
    keep.forEach(function (c, i) {
      tl.to(fl[i], { attr: { x: c.bx, y: BY, width: c.bw, height: BH }, duration: 0.9, ease: 'power2.inOut' }, i ? '<0.15' : '>');
    });
    tl.to(total, { opacity: 1, duration: 0.4 }).addLabel('s3');
    // 4. Divisione: posterior.
    tl.to(total, { opacity: 0, duration: 0.3 });
    keep.forEach(function (c, i) {
      tl.to(fl[i], { attr: { x: c.fx, width: c.fw }, duration: 1, ease: 'power2.inOut' }, i ? '<' : '>');
    });
    tl.to(post, { opacity: 1, duration: 0.4 })
      .to(q.one('.cp-res'), { opacity: 1, duration: 0.4 })
      .addLabel('s4');
  });
})();
