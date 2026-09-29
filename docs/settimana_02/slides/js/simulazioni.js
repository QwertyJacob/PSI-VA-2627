/*
 * Simulazioni e takeaway: il Monte Carlo dell'IDS con un secondo
 * rilevatore (indipendente oppure copia del primo) e la matrice di
 * confusione. Motore e utilità: scene.js, comuni.js.
 */
(function () {
  'use strict';

  var svg = PSI.svg, text = PSI.text, C = S2.C;

  // ── Monte Carlo: la frequenza di attacchi veri tra gli allarmi ──
  //
  // Ogni connessione è un attacco con probabilità 0.01. Il rilevatore di
  // rete suona con 0.99 / 0.01, quello del server con 0.95 / 0.05,
  // indipendentemente dal primo una volta noto se c'è un attacco.
  // La «copia» suona esattamente quando suona il primo.
  PSI.scene('sim-ids', function (el, tl) {
    var q = PSI.q(el), cv = S2.canvas(q.one('canvas')), ctx = cv.ctx;
    var N = 200000, X0 = 64, X1 = 680, Y0 = 18, Y1 = 386, LMIN = 2, LMAX = Math.log10(N), S = 320;
    var sx = function (ln) { return X0 + (ln - LMIN) / (LMAX - LMIN) * (X1 - X0); };
    var sy = function (p) { return Y1 - p * (Y1 - Y0); };
    var ns = [], est1 = [], est2 = [];
    for (var j = 0; j < S; j++) ns.push(Math.round(Math.pow(10, LMIN + (LMAX - LMIN) * j / (S - 1))));

    function generate(seed) {
      var rnd = PSI.random(seed), a1 = 0, v1 = 0, a12 = 0, v12 = 0, k = 0;
      est1 = []; est2 = [];
      for (var i = 1; i <= N; i++) {
        var h = rnd() < 0.01, e1 = rnd() < (h ? 0.99 : 0.01), e2 = rnd() < (h ? 0.95 : 0.05);
        if (e1) { a1++; if (h) v1++; if (e2) { a12++; if (h) v12++; } }
        while (k < S && ns[k] === i) {
          est1.push(a1 ? v1 / a1 : NaN);
          est2.push(a12 ? v12 / a12 : NaN);
          k++;
        }
      }
    }

    function polyline(est, upto, color, dash, width) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.beginPath();
      var started = false;
      for (var j = 0; j < S && ns[j] <= upto; j++) {
        if (isNaN(est[j])) continue;
        var x = sx(Math.log10(ns[j])), y = sy(est[j]);
        if (started) ctx.lineTo(x, y); else { ctx.moveTo(x, y); started = true; }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    var st = { ln: LMIN, l2: 0, l3: 0 };
    var out = { n: q.one('.sim-count'), v1: q.one('.sim-v1'), v2: q.one('.sim-v2'), v3: q.one('.sim-v3') };
    function last(est, upto) {
      for (var j = S - 1; j >= 0; j--) if (ns[j] <= upto && !isNaN(est[j])) return est[j];
      return NaN;
    }
    function render() {
      cv.clear();
      ctx.font = '13px Inter, sans-serif';
      ctx.fillStyle = C.muted;
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      [0, 0.25, 0.5, 0.75, 1].forEach(function (p) {
        ctx.beginPath(); ctx.moveTo(X0, sy(p)); ctx.lineTo(X1, sy(p)); ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText(S2.pct(p), X0 - 8, sy(p) + 4);
      });
      ctx.textAlign = 'center';
      [2, 3, 4, 5].forEach(function (e) { ctx.fillText(S2.count(Math.pow(10, e)), sx(e), Y1 + 20); });
      ctx.fillText('connessioni simulate (scala logaritmica)', (X0 + X1) / 2, Y1 + 42);
      // Valori di Bayes.
      [[0.5, C.e], [0.95, C.sel]].forEach(function (t, i) {
        if (i === 1 && st.l2 === 0) return;
        ctx.globalAlpha = i ? st.l2 : 1;
        ctx.strokeStyle = t[1];
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath(); ctx.moveTo(X0, sy(t[0])); ctx.lineTo(X1, sy(t[0])); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = t[1];
        ctx.textAlign = 'left';
        ctx.fillText('Bayes ' + t[0], X0 + 6, sy(t[0]) - 7);
        ctx.globalAlpha = 1;
      });
      var upto = Math.round(Math.pow(10, st.ln));
      if (st.ln > LMIN) {
        polyline(est1, upto, C.e, [], 2.4);
        if (st.l2 > 0) { ctx.globalAlpha = st.l2; polyline(est2, upto, C.sel, [], 2.4); ctx.globalAlpha = 1; }
        if (st.l3 > 0) { ctx.globalAlpha = st.l3; polyline(est1, upto, '#f472b6', [3, 7], 3); ctx.globalAlpha = 1; }
      }
      out.n.textContent = S2.count(st.ln > LMIN ? upto : 0);
      var f = function (v) { return isNaN(v) ? '—' : v.toFixed(3); };
      out.v1.textContent = st.ln > LMIN ? f(last(est1, upto)) : '—';
      out.v2.textContent = st.ln > LMIN ? f(last(est2, upto)) : '—';
      out.v3.textContent = st.ln > LMIN ? f(last(est1, upto)) : '—';
    }
    generate(2627);
    render();

    var lines = q.all('.sim-line'), note = q.one('.sim-note');
    gsap.set([lines[1], lines[2], note], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(st, { ln: LMAX, duration: 6, ease: 'none', onUpdate: render }).addLabel('s1');
    tl.to(st, { l2: 1, duration: 0.8, onUpdate: render })
      .to(lines[1], { opacity: 1, duration: 0.4 }, '<')
      .addLabel('s2');
    tl.to(st, { l3: 1, duration: 0.8, onUpdate: render })
      .to(lines[2], { opacity: 1, duration: 0.4 }, '<')
      .to(note, { opacity: 1, duration: 0.4 })
      .addLabel('s3');

    q.one('.sim-rerun').addEventListener('click', function () {
      this.blur();
      generate(Date.now() % 1e9);
      var step = Math.max(1, el.querySelectorAll('.psi-step.visible').length);
      PSI.replay(el, 's0', 's' + step);
    });
  });

  // ── La matrice di confusione dell'IDS su 10.000 connessioni ──
  PSI.scene('confusione', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var CX = [190, 405], CW = 205, RY = [70, 230], RH = 150;
    text(root, CX[0] + CW / 2, 50, 'allarme', 'cf-head cf-e', { 'text-anchor': 'middle' });
    text(root, CX[1] + CW / 2, 50, 'nessun allarme', 'cf-head', { 'text-anchor': 'middle' });
    text(root, CX[0] - 16, RY[0] + RH / 2 + 8, 'attacco', 'cf-head cf-h', { 'text-anchor': 'end' });
    text(root, CX[0] - 16, RY[1] + RH / 2 + 8, 'legittima', 'cf-head', { 'text-anchor': 'end' });
    var NAME = [['TP', 'FN'], ['FP', 'TN']], nums = [[], []];
    [0, 1].forEach(function (r) {
      [0, 1].forEach(function (c) {
        svg('rect', { x: CX[c] + 3, y: RY[r] + 3, width: CW - 6, height: RH - 6, rx: 10, 'class': 'cf-cell' }, root);
        nums[r][c] = text(root, CX[c] + CW / 2, RY[r] + RH / 2 + 8, '', 'cf-num', { 'text-anchor': 'middle' });
        text(root, CX[c] + CW / 2, RY[r] + RH / 2 + 40, NAME[r][c], 'cf-name', { 'text-anchor': 'middle' });
      });
    });
    var rowHl = svg('rect', { x: CX[0], y: RY[0], width: 2 * CW, height: RH, rx: 12, 'class': 'cf-hl' }, root);
    var colHl = svg('rect', { x: CX[0], y: RY[0], width: CW, height: 2 * RH, rx: 12, 'class': 'cf-hl cf-hl-e' }, root);
    var diag = [svg('rect', { x: CX[0], y: RY[0], width: CW, height: RH, rx: 12, 'class': 'cf-hl cf-hl-d' }, root),
      svg('rect', { x: CX[1], y: RY[1], width: CW, height: RH, rx: 12, 'class': 'cf-hl cf-hl-d' }, root)];

    // «lazy» è un'opzione riservata di GSAP: la proprietà animata si chiama k.
    var st = { k: 0 }, rec = q.one('.cf-rec b'), prec = q.one('.cf-prec b');
    function render() {
      var tp = Math.round(99 * (1 - st.k)), fn = 100 - tp, fp = Math.round(99 * (1 - st.k)), tn = 9900 - fp;
      nums[0][0].textContent = S2.count(tp); nums[0][1].textContent = S2.count(fn);
      nums[1][0].textContent = S2.count(fp); nums[1][1].textContent = S2.count(tn);
      rec.textContent = S2.pct(tp / 100);
      prec.textContent = tp + fp ? S2.pct(tp / (tp + fp)) : '—';
    }
    render();

    var m = q.all('.cf-m'), lazy = q.one('.cf-lazy');
    gsap.set([rowHl, colHl, diag, m, lazy], { opacity: 0 });
    tl.addLabel('s0');
    tl.to(rowHl, { opacity: 1, duration: 0.4 }).to(m[0], { opacity: 1, duration: 0.4 }, '<').addLabel('s1');
    tl.to(rowHl, { opacity: 0, duration: 0.3 }).to(colHl, { opacity: 1, duration: 0.4 })
      .to(m[1], { opacity: 1, duration: 0.4 }, '<').addLabel('s2');
    tl.to(colHl, { opacity: 0, duration: 0.3 }).to(diag, { opacity: 1, duration: 0.4 })
      .to(m[2], { opacity: 1, duration: 0.4 }, '<').addLabel('s3');
    tl.to(st, { k: 1, duration: 1.2, onUpdate: render })
      .to(lazy, { opacity: 1, duration: 0.4 })
      .addLabel('s4');
  });
})();
