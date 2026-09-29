/*
 * Scene del Prologo e dell'Atto I: la barra verticale, il tavolo di Bayes,
 * il sole di Price e Laplace, il quiz di Harvard.
 * I testi stanno nelle <section> di index.html; motore e utilità: scene.js,
 * comuni.js.
 */
(function () {
  'use strict';

  var svg = PSI.svg, text = PSI.text, C = S2.C;

  // ── La barra: P(allarme | attacco) e P(attacco | allarme) ──
  PSI.scene('barra', function (el, tl) {
    var root = PSI.q(el).one('svg');
    var Y1 = 150, Y2 = 330;
    // Posizioni fisse: le due parole hanno la stessa lunghezza e si scambiano il posto.
    var SLOT = { open: 305, left: 415, bar: 550, right: 685, close: 795, val: 835 };

    function row(y, first, second, value, valueCls) {
      return {
        open: text(root, SLOT.open, y, 'P(', 'br-tok', { 'text-anchor': 'end' }),
        w1: text(root, SLOT.left, y, first[0], 'br-tok br-word ' + first[1], { 'text-anchor': 'middle' }),
        bar: text(root, SLOT.bar, y, '|', 'br-tok', { 'text-anchor': 'middle' }),
        w2: text(root, SLOT.right, y, second[0], 'br-tok br-word ' + second[1], { 'text-anchor': 'middle' }),
        close: text(root, SLOT.close, y, ')', 'br-tok'),
        val: text(root, SLOT.val, y, value, 'br-tok ' + (valueCls || ''))
      };
    }
    var ALL = ['allarme', 'br-e'], ATT = ['attacco', 'br-h'];
    var r1 = row(Y1, ALL, ATT, '= 0.99');
    // La seconda riga nasce dalla prima: le parole partono dalla posizione opposta.
    var r2 = row(Y2, ATT, ALL, '= ?', 'br-ask');
    var cap1 = text(root, 550, Y1 + 62, 'in avanti: causa → effetto · lo sa il produttore', 'br-cap', { 'text-anchor': 'middle' });
    var cap2 = text(root, 550, Y2 + 62, 'all’indietro: effetto → causa · lo chiedi tu', 'br-cap', { 'text-anchor': 'middle' });
    var neq = text(root, 1000, 252, '≠', 'br-neq', { 'text-anchor': 'middle' });

    var row1 = [r1.open, r1.w1, r1.bar, r1.w2, r1.close, r1.val];
    var row2 = [r2.open, r2.w1, r2.bar, r2.w2, r2.close, r2.val];
    gsap.set(row1.concat(row2, [cap1, cap2, neq]), { opacity: 0 });
    // Stato di partenza della seconda riga: sovrapposta alla prima, parole invertite.
    gsap.set([r2.open, r2.bar, r2.close], { attr: { y: Y1 } });
    gsap.set(r2.w1, { attr: { x: SLOT.right, y: Y1 } });
    gsap.set(r2.w2, { attr: { x: SLOT.left, y: Y1 } });

    tl.to(row1, { opacity: 1, duration: 0.5, stagger: 0.08 })
      .to(cap1, { opacity: 1, duration: 0.5 })
      .addLabel('s0');

    // 1. Le due parole si scambiano di posto scendendo nella seconda riga.
    tl.set([r2.open, r2.bar, r2.close, r2.w1, r2.w2], { opacity: 1 })
      .to([r2.open, r2.bar, r2.close], { attr: { y: Y2 }, duration: 1.1, ease: 'power2.inOut' })
      .to(r2.w1, { attr: { x: SLOT.left }, duration: 1.1, ease: 'power2.in' }, '<')
      .to(r2.w1, { attr: { y: Y2 }, duration: 1.1, ease: 'power2.out' }, '<')
      .to(r2.w2, { attr: { x: SLOT.right }, duration: 1.1, ease: 'power2.out' }, '<')
      .to(r2.w2, { attr: { y: Y2 }, duration: 1.1, ease: 'power2.in' }, '<')
      .to(r2.val, { opacity: 1, duration: 0.4 })
      .to(cap2, { opacity: 1, duration: 0.5 }, '<0.2')
      .addLabel('s1');

    // 2. Due numeri diversi.
    tl.to(neq, { opacity: 1, duration: 0.5 })
      .fromTo(neq, { scale: 0.4 }, { scale: 1, svgOrigin: '1000 240', duration: 0.6, ease: 'back.out(3)' }, '<')
      .addLabel('s2');
  });

  // ── Il tavolo di Bayes ──
  //
  // La palla W si ferma in x (frazione della larghezza) e resta nascosta.
  // Ogni palla O cade a sinistra della linea di W con probabilità x.
  // Sotto il tavolo, sullo stesso asse, la credenza sulla striscia che
  // contiene la linea di W (week_02_extended §2.5 C): prior uniforme (il
  // postulato di Bayes), poi posterior ∝ x_j^p (1−x_j)^q, con 10 o 100 strisce.
  PSI.scene('tavolo', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X0 = 40, W = 620, Y0 = 14, H = 222, BASE = 452, PH = 160, K = 180, MAX = 2000;
    var at = function (x) { return X0 + x * W; };

    svg('rect', { x: X0, y: Y0, width: W, height: H, rx: 10, 'class': 'tv-felt' }, root);
    var stripLines = svg('g', {}, root);
    var balls = svg('g', {}, root);
    var hidden = text(root, X0 + W / 2, Y0 + H / 2 + 26, '?', 'tv-hidden', { 'text-anchor': 'middle' });
    var wLine = svg('line', { y1: Y0, y2: Y0 + H, 'class': 'tv-wline' }, root);
    var wDown = svg('line', { y1: Y0 + H, y2: BASE, 'class': 'tv-wline tv-wdown' }, root);
    var wBall = svg('circle', { r: 11, 'class': 'tv-wball' }, root);
    var wLbl = text(root, 0, Y0 + H + 22, 'W', 'tv-wlbl', { 'text-anchor': 'middle' });

    // Grafico della credenza, allineato al tavolo.
    var hist = svg('g', {}, root), bars = [], strips = 0;
    function makeStrips(n) {
      strips = n;
      while (hist.firstChild) hist.removeChild(hist.firstChild);
      while (stripLines.firstChild) stripLines.removeChild(stripLines.firstChild);
      bars = [];
      for (var j = 0; j < n; j++) {
        bars.push(svg('rect', { x: at(j / n) + (n > 20 ? 0.3 : 2), width: W / n - (n > 20 ? 0.6 : 4), 'class': 'tv-bar' }, hist));
        if (j) svg('line', { x1: at(j / n), y1: Y0 + 3, x2: at(j / n), y2: Y0 + H - 3, 'class': 'tv-strip' }, stripLines);
      }
      stripLines.style.opacity = n > 20 ? 0.35 : 1;
    }
    makeStrips(10);
    svg('line', { x1: X0, y1: BASE, x2: X0 + W, y2: BASE, 'class': 'tv-axis' }, root);
    [[0, '0'], [0.5, '½'], [1, '1']].forEach(function (t) {
      svg('line', { x1: at(t[0]), y1: BASE, x2: at(t[0]), y2: BASE + 6, 'class': 'tv-axis' }, root);
    });
    var plotLbl = text(root, X0 + 6, BASE - PH - 8, 'credenza: in quale striscia è W?', 'tv-plotlbl');

    var pOut = q.one('.tv-p'), qOut = q.one('.tv-q'), wOut = q.one('.tv-panel .tv-row b');
    var circles = [];
    for (var i = 0; i < MAX; i++) {
      circles.push(svg('circle', { r: 5.5 }, balls));
      circles[i].style.display = 'none';
    }

    var data = { w: 0.5, throws: [] };
    function generate(seed) {
      var rnd = PSI.random(seed);
      data.w = 0.12 + 0.76 * rnd();
      data.wy = Y0 + 40 + (H - 80) * rnd();
      data.throws = [];
      for (var i = 0; i < MAX; i++) {
        var x = rnd(), y = rnd();
        data.throws.push({ left: x < data.w });
        circles[i].setAttribute('cx', (at(0.01 + 0.98 * x)).toFixed(1));
        circles[i].setAttribute('cy', (Y0 + 8 + (H - 16) * y).toFixed(1));
        circles[i].setAttribute('class', x < data.w ? 'tv-o tv-o-l' : 'tv-o tv-o-r');
      }
    }

    var st = { n: 0, roll: 0, line: 0, hide: 0, curve: 0, reveal: 0 }, extra = 0, shown = 0;
    function render() {
      var n = Math.min(MAX, Math.round(st.n) + extra), p = 0;
      while (shown < n) circles[shown++].style.display = '';
      while (shown > n) circles[--shown].style.display = 'none';
      for (var i = 0; i < n; i++) if (data.throws[i].left) p++;
      var qq = n - p;
      pOut.textContent = p;
      qOut.textContent = qq;

      // W rotola dall'angolo in basso a sinistra fino al suo punto.
      var e = 1 - Math.pow(1 - st.roll, 3);
      var wx = at(data.w);
      wBall.setAttribute('cx', S2.lerp(X0 + 14, wx, e));
      wBall.setAttribute('cy', S2.lerp(Y0 + H - 14, data.wy, e) - 26 * Math.sin(Math.PI * e) * (1 - e));
      [wLine, wDown].forEach(function (l) { l.setAttribute('x1', wx); l.setAttribute('x2', wx); });
      wLbl.setAttribute('x', wx);
      var seen = Math.max(1 - st.hide, st.reveal);
      wBall.style.opacity = st.roll > 0 ? seen : 0;
      wLine.style.opacity = st.line * seen;
      wLine.style.strokeDasharray = H;
      wLine.style.strokeDashoffset = H * (1 - st.line);
      wDown.style.opacity = st.reveal;
      wLbl.style.opacity = st.reveal;
      hidden.style.opacity = st.hide * (1 - st.reveal);
      wOut.textContent = st.reveal > 0.5 ? 'x = ' + data.w.toFixed(2) : 'dove?';

      // Credenza ∝ x_j^p (1−x_j)^q sulle strisce, in scala relativa al massimo.
      var logs = [], best = -Infinity;
      for (var k = 0; k < strips; k++) {
        var x = (k + 0.5) / strips;
        var lg = p * Math.log(x) + qq * Math.log(1 - x);
        logs.push(lg);
        if (lg > best) best = lg;
      }
      var hitJ = Math.min(strips - 1, Math.floor(data.w * strips));
      logs.forEach(function (lg, k) {
        var h = 0.96 * PH * Math.exp(lg - best);
        bars[k].setAttribute('y', BASE - h);
        bars[k].setAttribute('height', h);
        bars[k].setAttribute('class', 'tv-bar' + (st.reveal > 0.5 && k === hitJ ? ' hit' : ''));
      });
      hist.style.opacity = st.curve;
      plotLbl.style.opacity = st.curve;
    }
    generate(1763);
    render();

    var note = q.one('.tv-note');
    gsap.set(note, { opacity: 0 });
    tl.addLabel('s0');
    // 1. W rotola, traccia la sua linea e sparisce; prior piatto.
    tl.to(st, { roll: 1, duration: 1.3, ease: 'none', onUpdate: render })
      .to(st, { line: 1, duration: 0.6, ease: 'power1.inOut', onUpdate: render })
      .to(st, { hide: 1, duration: 0.7, onUpdate: render }, '+=0.4')
      .to(st, { curve: 1, duration: 0.6, onUpdate: render })
      .addLabel('s1');
    // 2–5. Lanci di O: 1, 5, 20, 100.
    [[1, 0.4], [5, 1], [20, 1.6], [100, 2.6]].forEach(function (s, k) {
      tl.to(st, { n: s[0], duration: s[1], ease: k === 3 ? 'power1.in' : 'none', onUpdate: render });
      if (k === 0) tl.to(note, { opacity: 1, duration: 0.4 }, '<');
      tl.addLabel('s' + (k + 2));
    });
    // 6. W si mostra: il picco della credenza le sta sotto.
    tl.to(st, { reveal: 1, duration: 0.8, onUpdate: render })
      .addLabel('s6');

    q.one('.tv-one').addEventListener('click', function () { this.blur(); extra += 1; render(); });
    q.one('.tv-ten').addEventListener('click', function () { this.blur(); extra += 10; render(); });
    q.one('.tv-show').addEventListener('click', function () {
      this.blur();
      st.reveal = st.reveal > 0.5 ? 0 : 1;
      render();
    });
    q.one('.tv-strips').addEventListener('click', function () {
      this.blur();
      makeStrips(strips === 10 ? 100 : 10);
      this.textContent = strips + ' strisce';
      render();
    });
    q.one('.tv-new').addEventListener('click', function () {
      this.blur();
      extra = 0;
      generate(Date.now() % 1e9);
      var step = Math.max(1, el.querySelectorAll('.psi-step.visible').length);
      PSI.replay(el, 's0', 's' + step);
    });
  });

  // ── Il sole di Price e la regola di successione di Laplace ──
  //
  // Dopo n albe (prior uniforme) la credenza su x è (n+1) x^n.
  // L'area a destra di ½ è 1 − (½)^(n+1): scommessa 2^(n+1) − 1 contro 1.
  PSI.scene('alba', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var X0 = 60, W = 520, BASE = 390, PH = 330, K = 200;
    var at = function (x) { return X0 + x * W; };

    var left = svg('path', { 'class': 'ab-left' }, root);
    var right = svg('path', { 'class': 'ab-right' }, root);
    var curve = svg('path', { 'class': 'tv-curve' }, root);
    svg('line', { x1: X0, y1: BASE, x2: X0 + W, y2: BASE, 'class': 'tv-axis' }, root);
    svg('line', { x1: at(0.5), y1: BASE, x2: at(0.5), y2: BASE - PH, 'class': 'ab-mid' }, root);
    [[0, '0'], [0.5, '½'], [1, '1']].forEach(function (t) {
      text(root, at(t[0]), BASE + 30, t[1], 'ab-tick', { 'text-anchor': 'middle' });
    });
    var lblL = text(root, at(0.25), BASE - 24, '', 'ab-area', { 'text-anchor': 'middle' });
    var lblR = text(root, at(0.75), BASE - 24, '', 'ab-area ab-area-r', { 'text-anchor': 'middle' });
    text(root, X0 + W + 16, BASE + 8, 'x', 'ab-x it');
    var price = text(root, at(0.75), 60, 'Price, 1763', 'ab-price', { 'text-anchor': 'middle' });

    var countOut = q.one('.ab-count'), oddsOut = q.one('.ab-o'), slider = q.one('.ab-slider input');
    var st = { n: 0 };
    function render() {
      var n = st.n, top = Math.max(2, n + 1) * 1.04, d = '', dl, dr;
      var pts = [];
      for (var k = 0; k <= K; k++) {
        var x = k / K, f = (n + 1) * Math.pow(x, n);
        pts.push([at(x), BASE - PH * f / top]);
      }
      d = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L');
      curve.setAttribute('d', d);
      var half = K / 2;
      dl = 'M' + at(0) + ',' + BASE + 'L' + pts.slice(0, half + 1).map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L') + 'L' + at(0.5) + ',' + BASE + 'Z';
      dr = 'M' + at(0.5) + ',' + BASE + 'L' + pts.slice(half).map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L') + 'L' + at(1) + ',' + BASE + 'Z';
      left.setAttribute('d', dl);
      right.setAttribute('d', dr);
      var pl = Math.pow(0.5, n + 1);
      lblL.textContent = S2.pct(pl, pl < 0.01 ? 2 : 0);
      lblR.textContent = S2.pct(1 - pl, 1 - pl > 0.99 ? 2 : 0);
      var odds = Math.pow(2, n + 1) - 1, ni = Math.round(n);
      countOut.textContent = ni;
      oddsOut.textContent = (Math.abs(n - ni) < 0.02 ? S2.count(odds) : S2.count(Math.round(odds))) + ' : 1';
      slider.value = ni;
    }
    render();

    gsap.set([q.one('.ab-rule'), q.one('.ab-laplace'), q.one('.ab-slider'), price], { opacity: 0 });
    tl.addLabel('s0');
    // 1. Un'alba: 3 contro 1, il numero di Price.
    tl.to(st, { n: 1, duration: 1.2, ease: 'power1.inOut', onUpdate: render })
      .to(price, { opacity: 1, duration: 0.4 })
      .addLabel('s1');
    // 2–3. Altre albe: la credenza si schiaccia verso 1.
    tl.to(price, { opacity: 0, duration: 0.3 })
      .to(st, { n: 2, duration: 0.8, ease: 'power1.inOut', onUpdate: render })
      .addLabel('s2');
    tl.to(st, { n: 10, duration: 2, ease: 'power1.inOut', onUpdate: render })
      .addLabel('s3');
    // 4. La regola di successione e il conto di Laplace.
    tl.to(q.one('.ab-rule'), { opacity: 1, duration: 0.5 })
      .to(q.one('.ab-laplace'), { opacity: 1, duration: 0.5 }, '+=0.3')
      .to(q.one('.ab-slider'), { opacity: 1, duration: 0.4 })
      .addLabel('s4');

    slider.addEventListener('input', function () { st.n = +this.value; render(); });
  });

  // ── Harvard 1978: le risposte di 60 persone ──
  PSI.scene('harvard', function (el, tl) {
    var q = PSI.q(el), root = q.one('svg');
    var people = [];
    for (var r = 0; r < 5; r++) {
      for (var c = 0; c < 12; c++) {
        var cx = 40 + c * 49, cy = 52 + r * 74;
        var g = svg('g', { 'class': 'hv-person' }, root);
        svg('circle', { cx: cx, cy: cy - 14, r: 10 }, g);
        svg('path', { d: 'M' + (cx - 16) + ',' + (cy + 22) + 'Q' + (cx - 16) + ',' + cy + ' ' + cx + ',' + cy + 'Q' + (cx + 16) + ',' + cy + ' ' + (cx + 16) + ',' + (cy + 22) + 'Z' }, g);
        people.push(g);
      }
    }
    // 27 risposte «95%», 11 risposte corrette, le altre 22 diverse: posti mescolati.
    var order = S2.shuffle(people.slice(), PSI.random(1978));
    var bad = order.slice(0, 27), good = order.slice(27, 38);

    var res = q.all('.hv-res');
    gsap.set(people, { opacity: 0 });
    gsap.set([res, q.one('.hv-q')], { opacity: 0 });
    tl.to(people, { opacity: 1, duration: 0.3, stagger: 0.012 })
      .to(q.one('.hv-q'), { opacity: 1, duration: 0.4 })
      .addLabel('s0');
    tl.to(bad, { fill: C.h, duration: 0.25, stagger: 0.03 })
      .to(res[0], { opacity: 1, duration: 0.4 })
      .addLabel('s1');
    tl.to(good, { fill: C.sel, duration: 0.25, stagger: 0.05 })
      .to(res[1], { opacity: 1, duration: 0.4 })
      .addLabel('s2');
  });
})();
