/*
 * Frequenze naturali: popolazioni di puntini su canvas (l'IDS su 10.000
 * connessioni e gli esempi svolti), più il grafico interattivo della
 * prevalenza. Motore e utilità: scene.js, comuni.js.
 */
(function () {
  'use strict';

  var svg = PSI.svg, text = PSI.text, C = S2.C;

  // ── Una popolazione: malati (H), positivi veri e falsi (E), poi il raduno ──
  //
  // cfg: N (persone), cols (colonne della griglia), sick (con H),
  // tp (con H e positivi), fp (senza H ma positivi), seed.
  // Step: 1 si colorano gli H, 2 si cerchiano i positivi veri, 3 i falsi,
  // 4 i positivi si radunano in un blocco (il denominatore di Bayes),
  // 5 (se c'è .pop-extra) la nota finale.
  function popScene(id, cfg) {
    PSI.scene(id, function (el, tl) {
      var q = PSI.q(el), cv = S2.canvas(q.one('canvas')), ctx = cv.ctx;
      var cols = cfg.cols, rows = Math.ceil(cfg.N / cols);
      var sp = Math.min((cv.w - 20) / cols, (cv.h - 20) / rows), r = sp * 0.36;
      var ox = (cv.w - sp * (cols - 1)) / 2, oy = (cv.h - sp * (rows - 1)) / 2;

      // Chi è H e chi è positivo: permutazione con seme.
      var idx = [];
      for (var i = 0; i < cfg.N; i++) idx.push(i);
      S2.shuffle(idx, PSI.random(cfg.seed));
      var dots = [];
      for (i = 0; i < cfg.N; i++) {
        dots.push({ x: ox + (i % cols) * sp, y: oy + Math.floor(i / cols) * sp, h: false, e: false });
      }
      idx.slice(0, cfg.sick).forEach(function (k, j) { dots[k].h = true; dots[k].e = j < cfg.tp; });
      idx.slice(cfg.sick, cfg.sick + cfg.fp).forEach(function (k) { dots[k].e = true; });

      // Blocco dei positivi: prima i veri, poi i falsi, riga per riga.
      var flagged = dots.filter(function (d) { return d.e && d.h; }).concat(dots.filter(function (d) { return d.e && !d.h; }));
      var F = flagged.length, bc = Math.ceil(Math.sqrt(F * 1.8)), br = Math.ceil(F / bc);
      var bs = Math.min(19, (cv.w - 40) / bc, (cv.h - 40) / br);
      var bx = (cv.w - bs * (bc - 1)) / 2, by = (cv.h - bs * (br - 1)) / 2;
      flagged.forEach(function (d, j) { d.bx = bx + (j % bc) * bs; d.by = by + Math.floor(j / bc) * bs; });
      var rb = Math.max(r, bs * 0.36);

      var st = { show: 0, red: 0, tp: 0, fp: 0, g: 0 };
      function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
      function render() {
        cv.clear();
        var g = ease(st.g), grow = 1 + (r < 3 ? 0.9 * st.red : 0);
        ctx.globalAlpha = st.show * (1 - 0.82 * g);
        dots.forEach(function (d) {
          if (d.e) return;
          ctx.fillStyle = d.h && st.red > 0.5 ? C.h : '#475569';
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.h ? r * grow : r, 0, 2 * Math.PI);
          ctx.fill();
        });
        flagged.forEach(function (d) {
          var ring = d.h ? st.tp : st.fp;
          var x = S2.lerp(d.x, d.bx, g), y = S2.lerp(d.y, d.by, g), rr = S2.lerp(r, rb, g);
          ctx.globalAlpha = st.show;
          ctx.fillStyle = d.h ? (st.red > 0.5 ? C.h : '#475569') : (ring > 0.5 ? C.hc : '#475569');
          ctx.beginPath();
          ctx.arc(x, y, rr * (d.h ? S2.lerp(grow, 1, g) : 1) * (1 + 0.5 * ring * (1 - g)), 0, 2 * Math.PI);
          ctx.fill();
          if (ring > 0) {
            ctx.globalAlpha = st.show * ring;
            ctx.strokeStyle = C.e;
            ctx.lineWidth = Math.max(1.4, rr * 0.35);
            ctx.beginPath();
            ctx.arc(x, y, rr * (1 + 0.5 * (1 - g)) + Math.max(1.5, rr * 0.45), 0, 2 * Math.PI);
            ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      }
      render();

      var rowsP = q.all('.pop-row'), res = q.one('.pop-res'), extra = q.one('.pop-extra');
      gsap.set([rowsP, res, extra].filter(Boolean), { opacity: 0 });
      tl.to(st, { show: 1, duration: 0.8, onUpdate: render }).addLabel('s0');
      tl.to(st, { red: 1, duration: 0.01, onUpdate: render })
        .to(rowsP[0], { opacity: 1, duration: 0.4 }, '<')
        .addLabel('s1');
      tl.to(st, { tp: 1, duration: 0.6, onUpdate: render })
        .to(rowsP[1], { opacity: 1, duration: 0.4 }, '<')
        .addLabel('s2');
      tl.to(st, { fp: 1, duration: 0.6, onUpdate: render })
        .to(rowsP[2], { opacity: 1, duration: 0.4 }, '<')
        .addLabel('s3');
      tl.to(st, { g: 1, duration: 1.6, onUpdate: render })
        .to(res, { opacity: 1, duration: 0.5 })
        .addLabel('s4');
      if (extra) tl.to(extra, { opacity: 1, duration: 0.5 }).addLabel('s5');
    });
  }

  popScene('popolazione', { N: 10000, cols: 125, sick: 100, tp: 99, fp: 99, seed: 10000 });
  popScene('es-medico', { N: 2000, cols: 50, sick: 20, tp: 19, fp: 198, seed: 95 });
  popScene('es-virus', { N: 2000, cols: 50, sick: 80, tp: 76, fp: 19, seed: 234 });
  popScene('es-harvard', { N: 1000, cols: 40, sick: 1, tp: 1, fp: 50, seed: 1978 });

  // ── Quanto conta la rarità: P(H | E) al variare della prevalenza ──
  PSI.scene('prevalenza', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X0 = 76, X1 = 616, Y0 = 20, Y1 = 380;
    var sx = function (lp) { return X0 + (lp + 4) / 4 * (X1 - X0); };
    var sy = function (p) { return Y1 - p * (Y1 - Y0); };
    function post(prev, sens, spec) {
      var num = sens * prev, den = num + (1 - spec) * (1 - prev);
      return den > 0 ? num / den : 0;
    }

    [0, 0.25, 0.5, 0.75, 1].forEach(function (p) {
      svg('line', { x1: X0, y1: sy(p), x2: X1, y2: sy(p), 'class': 'pv-grid' }, root);
      text(root, X0 - 10, sy(p) + 6, S2.pct(p), 'pv-tick', { 'text-anchor': 'end' });
    });
    ['0.01%', '0.1%', '1%', '10%', '100%'].forEach(function (s, k) {
      svg('line', { x1: sx(k - 4), y1: Y1, x2: sx(k - 4), y2: Y1 + 6, 'class': 'tv-axis' }, root);
      text(root, sx(k - 4), Y1 + 28, s, 'pv-tick', { 'text-anchor': 'middle' });
    });
    svg('line', { x1: X0, y1: Y1, x2: X1, y2: Y1, 'class': 'tv-axis' }, root);
    text(root, (X0 + X1) / 2, Y1 + 56, 'prevalenza P(H), scala logaritmica', 'pv-axis', { 'text-anchor': 'middle' });

    function curvePath(sens, spec) {
      var d = '';
      for (var k = 0; k <= 200; k++) {
        var lp = -4 + 4 * k / 200;
        d += (k ? 'L' : 'M') + sx(lp).toFixed(1) + ',' + sy(post(Math.pow(10, lp), sens, spec)).toFixed(1);
      }
      return d;
    }
    svg('path', { d: curvePath(0.99, 0.99), 'class': 'pv-ref' }, root);
    text(root, sx(-0.55), sy(post(Math.pow(10, -0.55), 0.99, 0.99)) + 30, '99% / 99%', 'pv-reflbl', { 'text-anchor': 'middle' });
    var live = svg('path', { 'class': 'pv-live' }, root);
    var drop = svg('line', { 'class': 'pv-drop' }, root);
    var mark = svg('circle', { r: 9, 'class': 'pv-mark' }, root);
    var markLbl = text(root, 0, 0, '', 'pv-marklbl halo', { 'text-anchor': 'start' });

    var st = { lp: -2, sens: 0.99, spec: 0.99 };
    var inputs = {}, outs = {};
    q.all('input[data-k]').forEach(function (inp) { inputs[inp.dataset.k] = inp; });
    q.all('[data-v]').forEach(function (b) { outs[b.dataset.v] = b; });
    var postOut = q.one('.pv-post'), tpOut = q.one('.pv-tp'), fpOut = q.one('.pv-fp');

    function fmtPrev(p) { return (p * 100 >= 1 ? (p * 100).toFixed(p * 100 >= 10 ? 0 : 1) : (p * 100).toPrecision(1)) + '%'; }
    function render() {
      var prev = Math.pow(10, st.lp), p = post(prev, st.sens, st.spec);
      live.setAttribute('d', curvePath(st.sens, st.spec));
      var x = sx(st.lp), y = sy(p);
      mark.setAttribute('cx', x);
      mark.setAttribute('cy', y);
      drop.setAttribute('x1', x); drop.setAttribute('x2', x);
      drop.setAttribute('y1', y); drop.setAttribute('y2', Y1);
      markLbl.textContent = S2.pct(p, p < 0.1 ? 1 : 0);
      markLbl.setAttribute('x', x + (st.lp > -0.9 ? -80 : 16));
      markLbl.setAttribute('y', y - 14);
      postOut.textContent = S2.pct(p, p < 0.1 ? 1 : 0);
      tpOut.textContent = S2.count(p * 10000);
      fpOut.textContent = S2.count((1 - p) * 10000);
      inputs.lp.value = st.lp; inputs.sens.value = st.sens; inputs.spec.value = st.spec;
      outs.lp.textContent = fmtPrev(prev);
      outs.sens.textContent = (st.sens * 100).toFixed(1) + '%';
      outs.spec.textContent = (st.spec * 100).toFixed(2) + '%';
    }
    render();
    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', function () { st[k] = +this.value; render(); });
    });

    var note = q.one('.pv-note');
    gsap.set(note, { opacity: 0 });
    tl.addLabel('s0');
    // 1. Attacchi 100 volte più rari: il posterior crolla.
    tl.to(st, { lp: -4, duration: 1.8, ease: 'power1.inOut', onUpdate: render }).addLabel('s1');
    // 2. Sensibilità perfetta: quasi nulla cambia.
    tl.to(st, { sens: 1, duration: 1.2, onUpdate: render }).addLabel('s2');
    // 3. Falsi allarmi 100 volte più rari: la curva scivola a sinistra.
    tl.to(st, { spec: 0.9999, duration: 1.8, ease: 'power1.inOut', onUpdate: render })
      .to(note, { opacity: 1, duration: 0.4 })
      .addLabel('s3');
  });
})();
