/*
 * Avvio comune dei mazzi di slide (docs/settimana_NN/slides/index.html).
 *
 *   <head>   <script src="../../assets/slides/deck.js"></script>
 *            <link rel="stylesheet" href="css/settimana.css">   (dopo deck.js)
 *   <body>   ... slide ...
 *            <script src="../../assets/slides/scene.js"></script>
 *            <script src="js/...scene della settimana..."></script>
 *            <script>PSIDeck.start({ onReady: function (deck) { ... } });</script>
 *
 * Carica reveal.js, KaTeX, GSAP e QRious (i QR dei sondaggi) dalla copia locale in assets/vendor
 * (npm run vendor, esclusa da git), così le slide funzionano senza rete;
 * dove la copia manca, come sul sito pubblicato, ogni file ripiega sulla
 * stessa versione dal CDN. Le versioni stanno solo qui: lo script
 * scripts/fetch_slides_vendor.sh le legge da questo file.
 */
(function () {
  'use strict';

  var me = document.currentScript;
  var ASSETS = new URL('../', me.src).href; // .../docs/assets/
  var VENDOR = ASSETS + 'vendor/';
  var CDN = 'https://cdn.jsdelivr.net/npm/';
  var CSS = [
    'reveal.js@5.1.0/dist/reveal.css',
    'reveal.js@5.1.0/dist/theme/black.css',
    'katex@0.18.9/dist/katex.min.css'
  ];
  var JS = [
    'reveal.js@5.1.0/dist/reveal.js',
    'katex@0.18.9/dist/katex.min.js',
    'katex@0.18.9/dist/contrib/auto-render.min.js',
    'gsap@3.15.0/dist/gsap.min.js',
    'qrious@4.0.2/dist/qrious.min.js',
    'reveal.js@5.1.0/plugin/notes/notes.js' // vista del relatore: tasto S
  ];

  // I fogli di stile vanno subito dopo questo script, prima degli stili della
  // pagina: così css/settimana.css e gli <style> del mazzo restano più forti.
  var last = me;
  function sheet(href, fallback) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (fallback) link.onerror = function () { link.onerror = null; link.href = fallback; };
    last.after(link);
    last = link;
  }
  CSS.forEach(function (path) { sheet(VENDOR + path, CDN + path); });
  sheet(ASSETS + 'slides/scenes.css');

  function script(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { s.remove(); reject(new Error(src)); };
      document.head.appendChild(s);
    });
  }

  function load(paths) {
    return paths.reduce(function (chain, path) {
      return chain.then(function () {
        return script(VENDOR + path).catch(function () { return script(CDN + path); });
      });
    }, Promise.resolve());
  }

  // Puntatore laser: un punto rosso luminoso segue il mouse al posto della
  // freccia e sparisce dopo un paio di secondi di immobilità. Tasto L: on/off.
  function laser() {
    if (/print-pdf/.test(location.search)) return;
    var style = document.createElement('style');
    style.textContent =
      'html.psi-laser, html.psi-laser * { cursor: none !important; }' +
      '.psi-laser-dot { position: fixed; left: 0; top: 0; z-index: 2147483647;' +
      ' width: 24px; height: 24px; margin: -12px 0 0 -12px; border-radius: 50%;' +
      ' pointer-events: none; opacity: 0; transition: opacity .3s;' +
      ' background: radial-gradient(circle, #fff 0 15%, #ff3030 35%, #e00000 70%);' +
      ' box-shadow: 0 0 8px 4px rgba(255,40,40,.9), 0 0 28px 14px rgba(255,0,0,.45); }' +
      '.psi-laser-dot.on { opacity: 1; transition: opacity .05s; }';
    document.head.appendChild(style);
    var dot = document.createElement('div');
    dot.className = 'psi-laser-dot';
    document.body.appendChild(dot);

    var enabled = true, timer;
    document.documentElement.classList.add('psi-laser');
    document.addEventListener('mousemove', function (e) {
      if (!enabled) return;
      dot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      dot.classList.add('on');
      clearTimeout(timer);
      timer = setTimeout(function () { dot.classList.remove('on'); }, 2000);
    });
    document.documentElement.addEventListener('mouseleave', function () { dot.classList.remove('on'); });
    return function toggle() {
      enabled = !enabled;
      document.documentElement.classList.toggle('psi-laser', enabled);
      if (!enabled) dot.classList.remove('on');
    };
  }

  // Carica le librerie, rende le formule, costruisce le scene e avvia reveal.js.
  // options.reveal: opzioni aggiuntive per Reveal.initialize;
  // options.onReady(deck): codice del mazzo da eseguire quando reveal è pronto.
  function start(options) {
    options = options || {};
    return load(JS).then(function () {
      renderMathInElement(document.querySelector('.reveal .slides'), {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
      PSI.buildScenes();
      Reveal.initialize(Object.assign({
        width: 1280,
        height: 720,
        margin: 0.04,
        controls: true,
        progress: true,
        center: true,
        hash: true,
        plugins: window.RevealNotes ? [RevealNotes] : [],
        // Nell'export PDF ogni scena animata è una pagina sola, nello stato finale.
        pdfSeparateFragments: false
      }, options.reveal));
      Reveal.on('ready', function () {
        PSI.bindScenes(Reveal);
        // Come Esc, ma anche con R: panoramica e salto con un clic sulla slide.
        Reveal.addKeyBinding({ keyCode: 82, key: 'R', description: 'Apri/chiudi la panoramica delle slide' }, function () {
          Reveal.toggleOverview();
        });
        var toggleLaser = laser();
        if (toggleLaser) {
          Reveal.addKeyBinding({ keyCode: 76, key: 'L', description: 'Attiva/disattiva il puntatore laser' }, toggleLaser);
        }
        if (options.onReady) options.onReady(Reveal);
      });
    });
  }

  window.PSIDeck = { start: start };
})();
