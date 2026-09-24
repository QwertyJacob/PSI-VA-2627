/*
 * Motore delle scene animate delle slide.
 *
 * Una scena è una timeline GSAP in pausa legata a una <section> tramite il
 * suo id. La timeline è divisa in step dalle etichette s0, s1, ..., sN:
 *   - dall'inizio a s0 c'è l'eventuale animazione d'ingresso;
 *   - ogni etichetta sK segna lo stato della scena dopo K avanzamenti.
 *
 * Per ogni step la scena riceve un frammento invisibile (.psi-step), così
 * reveal.js gestisce gli avanzamenti come fa con i frammenti normali: frecce e
 * telecomando muovono la timeline avanti e indietro, un link diretto a uno
 * step (#/n/k) o un ingresso a ritroso nella slide mostrano subito lo stato
 * giusto, e l'export PDF (?print-pdf) mostra lo stato finale.
 *
 * Uso:
 *   PSI.scene('id-della-section', function (section, tl) {
 *     ... tl.to(...) ...; tl.addLabel('s0');
 *     ... tl.to(...) ...; tl.addLabel('s1');
 *   });
 */
window.PSI = (function () {
  'use strict';

  var builders = [];
  var scenes = new Map(); // <section> -> { tl, steps, tween }

  function scene(id, build) {
    builders.push({ id: id, build: build });
  }

  // Costruisce le timeline e aggiunge i frammenti invisibili.
  // Va chiamata prima di Reveal.initialize().
  function buildScenes() {
    builders.forEach(function (b) {
      var section = document.getElementById(b.id);
      if (!section) {
        console.warn('PSI: nessuna slide con id "' + b.id + '"');
        return;
      }
      var tl = gsap.timeline({ paused: true });
      b.build(section, tl);
      var steps = 0;
      while (tl.labels['s' + (steps + 1)] !== undefined) steps++;
      for (var i = 0; i < steps; i++) {
        var f = document.createElement('span');
        f.className = 'fragment psi-step';
        f.setAttribute('aria-hidden', 'true');
        section.appendChild(f);
      }
      scenes.set(section, { tl: tl, steps: steps, tween: null });
    });
  }

  function stepOf(section) {
    return section.querySelectorAll('.psi-step.visible').length;
  }

  function goTo(s, step, animate) {
    if (s.tween) s.tween.kill();
    var time = s.tl.labels['s' + step];
    if (time === undefined) time = step === 0 ? 0 : s.tl.duration();
    if (animate) {
      s.tween = s.tl.tweenTo(time);
    } else {
      // false: anche i salti eseguono gli onUpdate (contatori, simulazioni).
      s.tween = null;
      s.tl.pause().seek(time, false);
    }
  }

  // Aggancia le scene agli eventi di reveal.js. Va chiamata dopo initialize().
  function bindScenes(deck) {
    if (deck.isPrintView()) {
      scenes.forEach(function (s) { goTo(s, s.steps, false); });
      return;
    }

    function onSlide(section) {
      var s = scenes.get(section);
      if (!s) return;
      var step = stepOf(section);
      if (step === 0) {
        s.tl.pause().seek(0, false);
        goTo(s, 0, true); // ingresso in avanti: animazione iniziale
      } else {
        goTo(s, step, false); // ingresso a ritroso o link diretto
      }
    }

    function onFragment(event) {
      var fragment = event.fragment;
      if (!fragment || !fragment.classList.contains('psi-step')) return;
      var section = fragment.parentNode;
      var s = scenes.get(section);
      if (s) goTo(s, stepOf(section), true);
    }

    deck.on('slidechanged', function (event) { onSlide(event.currentSlide); });
    deck.on('fragmentshown', onFragment);
    deck.on('fragmenthidden', onFragment);
    onSlide(deck.getCurrentSlide());
  }

  // Rigioca un tratto della timeline di una scena, per esempio dopo che un
  // pulsante ha rigenerato i dati di una simulazione.
  function replay(section, from, to) {
    var s = scenes.get(section);
    if (!s) return;
    if (s.tween) s.tween.kill();
    s.tl.pause().seek(from, false);
    s.tween = s.tl.tweenTo(to);
  }

  // Disegna un tratto come la Create di Manim: la linea si traccia da zero.
  // `length` è la lunghezza del tratto (2πr per un cerchio).
  function draw(tl, target, length, vars, position) {
    gsap.set(target, { strokeDasharray: length, strokeDashoffset: length });
    return tl.to(target, Object.assign({ strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, vars), position);
  }

  // ── Utilità per costruire le scene ──

  // Cerca elementi dentro una slide.
  function q(el) {
    return {
      one: function (sel) { return el.querySelector(sel); },
      all: function (sel) { return el.querySelectorAll(sel); }
    };
  }

  // Generatore pseudocasuale con seme (mulberry32): le simulazioni sono
  // ripetibili, quindi avanti, indietro e nel PDF mostrano lo stesso stato.
  function random(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Crea un elemento SVG con i suoi attributi e, se c'è, lo appende a parent.
  function svg(tag, attrs, parent) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var name in attrs) {
      if (attrs[name] !== null && attrs[name] !== undefined) node.setAttribute(name, attrs[name]);
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function text(parent, x, y, content, cls, attrs) {
    var node = svg('text', Object.assign({ x: x, y: y, 'class': cls }, attrs || {}), parent);
    node.textContent = content;
    return node;
  }

  // Geometria dei cerchi, per diagrammi con aree proporzionali alle probabilità.
  var geo = {
    radius: function (area) {
      return Math.sqrt(area / Math.PI);
    },
    // Area dell'intersezione tra due cerchi di raggi r1, r2 a distanza d.
    lens: function (r1, r2, d) {
      if (d >= r1 + r2) return 0;
      if (d <= Math.abs(r1 - r2)) return Math.PI * Math.pow(Math.min(r1, r2), 2);
      var a1 = Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1));
      var a2 = Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
      var k = Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
      return r1 * r1 * a1 + r2 * r2 * a2 - k / 2;
    },
    // Distanza tra i centri che dà un'intersezione di area `area`.
    distanceForLens: function (r1, r2, area) {
      var lo = Math.abs(r1 - r2), hi = r1 + r2;
      for (var i = 0; i < 60; i++) {
        var mid = (lo + hi) / 2;
        if (geo.lens(r1, r2, mid) > area) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
  };

  return {
    scene: scene,
    buildScenes: buildScenes,
    bindScenes: bindScenes,
    replay: replay,
    draw: draw,
    q: q,
    random: random,
    svg: svg,
    text: text,
    geo: geo
  };
})();
