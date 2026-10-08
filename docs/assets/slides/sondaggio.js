/*
 * Sondaggi dal vivo nelle slide: gli studenti votano dal telefono, in forma
 * anonima, senza account né app.
 *
 *   <section class="sondaggio" data-poll="s03-1">
 *     ... domanda ...
 *     <ol class="sondaggio-opts"><li><span>1</span>64</li> ... </ol>
 *     <div class="sondaggio-join"></div>      qui vanno QR e contatore
 *   </section>
 *
 *   <script src="../../assets/sondaggi.js"></script>
 *   <script src="../../assets/slides/sondaggio.js"></script>
 *   PSIDeck.start({ onReady: function (deck) { PSISondaggio.bind(deck); } });
 *
 * Il QR (disegnato in locale con QRious, quindi anche senza rete) apre la
 * pagina vota/ del sito con l'id del sondaggio e i testi delle opzioni: le
 * opzioni si scrivono una volta sola, qui nella slide. Per ripetere un
 * sondaggio da zero basta cambiare data-poll (es. s03-1b).
 *
 * Mentre la slide è aperta si vede solo quanti hanno votato; la distribuzione
 * compare sulle opzioni stesse quando il docente preme V, e sparisce con V.
 */
(function () {
  'use strict';

  var CFG = window.PSI_SONDAGGI;
  var EVERY = 2000;
  var timer = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function optionText(li) {
    var copy = li.cloneNode(true);
    copy.querySelectorAll('span').forEach(function (s) { s.remove(); });
    return copy.textContent.trim();
  }

  function build(section) {
    var items = Array.from(section.querySelectorAll('.sondaggio-opts li'));
    var url = CFG.vota + '?p=' + encodeURIComponent(section.dataset.poll) +
      '&o=' + items.map(function (li) { return encodeURIComponent(optionText(li)); }).join('~');
    section.dataset.url = url;

    items.forEach(function (li) {
      li.appendChild(el('i', 'sondaggio-bar'));
      li.appendChild(el('b', 'sondaggio-n', '0'));
    });

    var join = section.querySelector('.sondaggio-join');
    var card = el('a', 'sondaggio-qr');
    card.href = url;
    card.target = '_blank';
    var canvas = el('canvas');
    new QRious({ element: canvas, value: url, size: 560, level: 'M', padding: 0 });
    card.appendChild(canvas);
    join.appendChild(card);
    join.appendChild(el('p', 'sondaggio-count', '0 voti'));
  }

  function render(section, rows) {
    var items = section.querySelectorAll('.sondaggio-opts li');
    var counts = Array.from(items, function () { return 0; });
    rows.forEach(function (r) { if (r.choice >= 1 && r.choice <= counts.length) counts[r.choice - 1] = r.n; });
    var total = counts.reduce(function (a, b) { return a + b; }, 0);
    var max = Math.max.apply(null, counts.concat(1));
    items.forEach(function (li, i) {
      li.querySelector('.sondaggio-n').textContent = counts[i];
      li.querySelector('.sondaggio-bar').style.width = (100 * counts[i] / max) + '%';
    });
    var c = section.querySelector('.sondaggio-count');
    c.textContent = total === 1 ? '1 voto' : total + ' voti';
    c.classList.remove('off');
  }

  function refresh(section) {
    fetch(CFG.api + '/rest/v1/rpc/poll_counts', {
      method: 'POST',
      headers: { apikey: CFG.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p: section.dataset.poll }),
      signal: AbortSignal.timeout(EVERY * 2)
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (rows) { render(section, rows); })
      .catch(function () {
        // Senza rete sul portatile i telefoni votano lo stesso: si vedranno dopo.
        var c = section.querySelector('.sondaggio-count');
        c.textContent = 'conteggio non raggiungibile';
        c.classList.add('off');
      });
  }

  function watch(slide) {
    clearInterval(timer);
    timer = null;
    if (!slide || !slide.classList.contains('sondaggio')) return;
    refresh(slide);
    timer = setInterval(function () { refresh(slide); }, EVERY);
  }

  function bind(deck) {
    var sections = document.querySelectorAll('.reveal section.sondaggio');
    if (!sections.length) return;
    sections.forEach(build);
    deck.addKeyBinding({ keyCode: 86, key: 'V', description: 'Mostra/nascondi i risultati del sondaggio' }, function () {
      var s = deck.getCurrentSlide();
      if (!deck.isOverview() && s.classList.contains('sondaggio')) s.classList.toggle('svelato');
    });
    deck.on('slidechanged', function (e) {
      // Uscendo dalla slide i risultati si richiudono.
      if (e.previousSlide) e.previousSlide.classList.remove('svelato');
      watch(e.currentSlide);
    });
    watch(deck.getCurrentSlide());
  }

  window.PSISondaggio = { bind: bind };
})();
