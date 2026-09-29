/*
 * Utilità comuni alle scene della Settimana 2 (oggetto globale S2).
 * Palette: ipotesi H (attacco, malattia) in rosso, evidenza E (allarme,
 * test positivo) in ambra, posterior e risposte in verde, come nelle formule.
 */
window.S2 = (function () {
  'use strict';

  var C = {
    h: '#f87171',       // ipotesi H: attacco, malato, errore
    hc: '#94a3b8',      // H^c: traffico legittimo, sano
    dim: '#334155',     // popolazione di sfondo
    e: '#fbbf24',       // evidenza E: allarme, positivo
    a: '#38bdf8',
    c: '#c084fc',
    sel: '#38ef7d',
    text: '#edf2f7',
    muted: '#a0aec0'
  };

  // Numeri all'italiana per i conteggi (10.000), punto decimale per le probabilità.
  function count(n) { return Math.round(n).toLocaleString('it-IT'); }
  function pct(x, d) { return (100 * x).toFixed(d === undefined ? 0 : d) + '%'; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // Canvas ad alta risoluzione: le coordinate di disegno sono quelle CSS.
  function canvas(el) {
    var ctx = el.getContext('2d');
    var k = el.width / parseFloat(el.style.width);
    return { ctx: ctx, w: el.width / k, h: el.height / k, clear: function () {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.setTransform(k, 0, 0, k, 0, 0);
    } };
  }

  // Mescola un array in modo ripetibile (Fisher–Yates con seme).
  function shuffle(arr, rnd) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1)), t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  // ── Sondaggio del Prologo: i voti restano nel browser del docente ──
  var KEY = 'psi-s02-sondaggio';
  var poll = { a: 0, b: 0, c: 0, d: 0 };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) Object.keys(poll).forEach(function (k) { poll[k] = saved[k] | 0; });
  } catch (e) { /* storage non disponibile: si parte da zero */ }

  function drawPoll(box, mark) {
    var max = Math.max(1, poll.a, poll.b, poll.c, poll.d);
    box.querySelectorAll('.poll-opt').forEach(function (b) {
      var k = b.dataset.k;
      b.querySelector('.poll-bar').style.width = (100 * poll[k] / max) + '%';
      b.querySelector('.poll-n').textContent = poll[k];
      b.classList.toggle('right', !!mark && k === 'c');
    });
  }

  function setupPoll() {
    var box = document.querySelector('#allarme .poll');
    var mirror = document.querySelector('#risposta .poll-mirror');
    if (!box) return;
    if (mirror) mirror.innerHTML = box.innerHTML;
    function redraw() {
      drawPoll(box);
      if (mirror) drawPoll(mirror, true);
    }
    box.querySelectorAll('.poll-opt').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        this.blur();
        var k = this.dataset.k;
        poll[k] = Math.max(0, poll[k] + (ev.shiftKey ? -1 : 1));
        try { localStorage.setItem(KEY, JSON.stringify(poll)); } catch (e) { /* ignora */ }
        redraw();
      });
    });
    redraw();
  }

  var ready = [];
  function onReady(deck) {
    setupPoll();
    ready.forEach(function (fn) { fn(deck); });
  }

  return {
    C: C, count: count, pct: pct, clamp: clamp, lerp: lerp,
    canvas: canvas, shuffle: shuffle,
    onReady: onReady,
    // Codice da eseguire quando reveal è pronto (per esempio eventi di slide).
    whenReady: function (fn) { ready.push(fn); }
  };
})();
