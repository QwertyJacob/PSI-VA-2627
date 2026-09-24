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
 * Carica reveal.js, KaTeX e GSAP dalla copia locale in assets/vendor
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
    'gsap@3.15.0/dist/gsap.min.js'
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
        // Nell'export PDF ogni scena animata è una pagina sola, nello stato finale.
        pdfSeparateFragments: false
      }, options.reveal));
      Reveal.on('ready', function () {
        PSI.bindScenes(Reveal);
        if (options.onReady) options.onReady(Reveal);
      });
    });
  }

  window.PSIDeck = { start: start };
})();
