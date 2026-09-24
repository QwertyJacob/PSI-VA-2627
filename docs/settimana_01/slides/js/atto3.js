/*
 * Scene animate dell'Atto III (il regno epistemico).
 * Il markup SVG sta nella <section> in index.html; motore: scene.js.
 */
(function () {
  'use strict';

  var TAU = 2 * Math.PI;

  // ── Il paradosso di Bertrand: tre modi di tracciare una corda «a caso» ──
  // Una corda è più lunga del lato ℓ = R√3 del triangolo inscritto se e solo
  // se la sua distanza dal centro è minore di R/2.
  PSI.scene('bertrand', function (el, tl) {
    var C = 150, R = 125, N = 400;

    // Corda a distanza r dal centro, con la normale nella direzione theta.
    function chordAt(r, theta) {
      var half = Math.sqrt(R * R - r * r);
      var mx = C + r * Math.cos(theta), my = C + r * Math.sin(theta);
      var dx = -Math.sin(theta) * half, dy = Math.cos(theta) * half;
      return { x1: mx - dx, y1: my - dy, x2: mx + dx, y2: my + dy, long: r < R / 2 };
    }

    var methods = [
      // 1. Estremi casuali: uno fisso sul vertice in alto, l'altro uniforme
      //    sulla circonferenza. Più lunga se l'arco tra i due supera 120°.
      function (rnd) {
        var fixed = -Math.PI / 2, arc = TAU * rnd(), other = fixed + arc;
        return {
          x1: C + R * Math.cos(fixed), y1: C + R * Math.sin(fixed),
          x2: C + R * Math.cos(other), y2: C + R * Math.sin(other),
          long: arc > TAU / 3 && arc < 2 * TAU / 3
        };
      },
      // 2. Raggio casuale: direzione a caso, punto medio uniforme lungo il raggio.
      function (rnd) {
        var theta = TAU * rnd();
        return chordAt(R * rnd(), theta);
      },
      // 3. Punto medio uniforme nel disco.
      function (rnd) {
        var theta = TAU * rnd();
        return chordAt(R * Math.sqrt(rnd()), theta);
      }
    ];

    var panels = el.querySelectorAll('.bt-panel');
    var sims = [];
    panels.forEach(function (panel, m) {
      var rnd = PSI.random(1889 + m);
      var group = panel.querySelector('.bt-chords');
      var lines = [], hits = [0];
      for (var i = 0; i < N; i++) {
        var c = methods[m](rnd);
        var line = PSI.svg('line', {});
        line.setAttribute('x1', c.x1.toFixed(1));
        line.setAttribute('y1', c.y1.toFixed(1));
        line.setAttribute('x2', c.x2.toFixed(1));
        line.setAttribute('y2', c.y2.toFixed(1));
        line.setAttribute('class', c.long ? 'long' : 'short');
        line.style.display = 'none';
        group.appendChild(line);
        lines.push(line);
        hits.push(hits[i] + (c.long ? 1 : 0));
      }
      var num = panel.querySelector('.bt-num');
      var count = panel.querySelector('.bt-count');
      var shown = 0;
      var state = { n: 0 };
      sims.push({
        panel: panel,
        state: state,
        update: function () {
          var n = Math.round(state.n);
          while (shown < n) lines[shown++].style.display = '';
          while (shown > n) lines[--shown].style.display = 'none';
          num.textContent = n ? (hits[n] / n).toFixed(3) : '—';
          count.textContent = n === 1 ? '1 corda' : n + ' corde';
        }
      });
    });

    function all(sel) { return el.querySelectorAll(sel); }
    gsap.set([all('.bt-circle'), all('.bt-tri'), all('.bt-hint'), all('.bt-freq'),
      all('.bt-count'), all('.bt-theory'), el.querySelector('.bt-verdict')], { opacity: 0 });
    gsap.set([all('.bt-panel h3'), all('.bt-how')], { opacity: 0.3 });
    gsap.set(el.querySelector('.bt-verdict'), { y: 12 });

    // Ingresso: i tre cerchi con il triangolo inscritto.
    tl.to(all('.bt-circle'), { opacity: 1, duration: 0.5, stagger: 0.12 })
      .to(all('.bt-tri'), { opacity: 1, duration: 0.5, stagger: 0.12 }, '-=0.3')
      .addLabel('s0');

    // Un metodo per step: la regione favorevole, poi la pioggia di corde.
    sims.forEach(function (s, m) {
      var p = s.panel, t = tl.duration();
      tl.to([p.querySelector('h3'), p.querySelector('.bt-how')], { opacity: 1, duration: 0.4 }, t)
        .to(p.querySelector('.bt-hint'), { opacity: 1, duration: 0.5 }, t)
        .to([p.querySelector('.bt-freq'), p.querySelector('.bt-count')], { opacity: 1, duration: 0.4 }, t + 0.3)
        .to(s.state, { n: N, duration: 4.5, ease: 'power2.in', onUpdate: s.update }, t + 0.6)
        .to(p.querySelector('.bt-theory'), { opacity: 1, duration: 0.5 })
        .addLabel('s' + (m + 1));
    });

    tl.to(el.querySelector('.bt-verdict'), { opacity: 1, y: 0, duration: 0.6 })
      .addLabel('s4');
  });
})();
