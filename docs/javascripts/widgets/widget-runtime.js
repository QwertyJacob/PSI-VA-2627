/*
 * PSIWidget — small parametric-curve widget engine for the PSI handouts.
 *
 * Usage (drop this into any Markdown page as a raw HTML block):
 *
 *   <div class="psi-widget" id="gaussian-widget-1"></div>
 *   <script>
 *   document.addEventListener('DOMContentLoaded', function () {
 *     PSIWidget.mount('gaussian-widget-1', {
 *       type: 'line',
 *       xLabel: 'x', yLabel: 'densità',
 *       xDomain: [-5, 5], xSamples: 300,
 *       fn: function (x, p) {
 *         return (1 / (p.sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - p.mu) / p.sigma, 2));
 *       },
 *       params: [
 *         { key: 'mu', label: 'μ (media)', min: -4, max: 4, step: 0.1, value: 0 },
 *         { key: 'sigma', label: 'σ (deviazione standard)', min: 0.2, max: 3, step: 0.1, value: 1 }
 *       ],
 *       reference: { label: 'esempio del testo: μ=0, σ=1', params: { mu: 0, sigma: 1 } },
 *       caption: 'Sposta i cursori per vedere come μ e σ deformano la curva.'
 *     });
 *   });
 *   </script>
 *
 * Notes for content agents replicating this pattern:
 * - `type: 'line'`  -> continuous curve, sampled xSamples times across xDomain.
 * - `type: 'bar'`   -> discrete pmf, xDomain is an INCLUSIVE integer range [min, max], one bar per integer.
 * - `reference`     -> optional, draws a fixed dashed curve at the textbook's original example
 *                      parameter values, so the "before" case is never lost when a student drags sliders.
 * - `stats`         -> optional function(params) returning an array of {label, value} rows rendered
 *                      as a small live readout under the chart (e.g. a computed probability or bound).
 * - This widget is for pure, fast, deterministic f(x; params) curves only. Simulation-based visuals
 *   (histograms built by resampling, CLT convergence, bootstrap) belong in a psi-exec runnable code
 *   block instead (see pyodide/code-runner.js) — do not force a simulation into this contract.
 */
(function (global) {
  'use strict';

  var instances = {};

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function formatNumber(n) {
    if (Math.abs(n) < 1e-9) n = 0;
    return (Math.round(n * 1000) / 1000).toString();
  }

  function linspace(min, max, samples) {
    var out = new Array(samples);
    var step = (max - min) / (samples - 1);
    for (var i = 0; i < samples; i++) out[i] = min + i * step;
    return out;
  }

  function intRange(min, max) {
    var out = [];
    for (var i = min; i <= max; i++) out.push(i);
    return out;
  }

  function currentParams(config) {
    var p = {};
    config.params.forEach(function (spec) { p[spec.key] = spec.value; });
    return p;
  }

  function buildDatasets(config, params) {
    var xs = config.type === 'bar'
      ? intRange(config.xDomain[0], config.xDomain[1])
      : linspace(config.xDomain[0], config.xDomain[1], config.xSamples || 300);

    var live = {
      label: config.liveLabel || 'valori correnti',
      data: xs.map(function (x) { return config.fn(x, params); }),
      borderColor: '#4051b5',
      backgroundColor: config.type === 'bar' ? 'rgba(64, 81, 181, 0.6)' : 'rgba(64, 81, 181, 0.15)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0,
      fill: config.type === 'line' ? 'origin' : false
    };

    var datasets = [live];

    if (config.reference) {
      var refParams = config.reference.params;
      datasets.push({
        label: config.reference.label || 'riferimento',
        data: xs.map(function (x) { return config.fn(x, refParams); }),
        borderColor: '#999',
        borderDash: [6, 4],
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: false
      });
    }

    return { labels: xs.map(function (x) { return config.type === 'bar' ? String(x) : formatNumber(x); }), datasets: datasets };
  }

  function renderStats(container, config, params) {
    if (!config.stats) return;
    container.innerHTML = '';
    config.stats(params).forEach(function (row) {
      container.appendChild(el('span', { class: 'psi-stat' }, [
        el('span', { class: 'psi-stat-label', text: row.label + ': ' }),
        el('span', { class: 'psi-stat-value', text: row.value })
      ]));
    });
  }

  function mount(containerId, config) {
    var host = document.getElementById(containerId);
    if (!host) return;
    if (!global.Chart) {
      host.textContent = 'Impossibile caricare il widget interattivo (Chart.js non disponibile).';
      return;
    }

    host.classList.add('psi-widget-host');
    var canvasWrap = el('div', { class: 'psi-widget-canvas' });
    var canvas = el('canvas');
    canvasWrap.appendChild(canvas);

    // A <canvas> does not reliably survive printing, so we keep a plain <img>
    // snapshot of the current curve permanently in the DOM: hidden on screen,
    // shown instead of the canvas in print. It is refreshed (debounced) after
    // every redraw, so whatever the student last explored is what prints.
    // Deliberately NOT dependent on the `beforeprint` event, which several
    // print paths (Chromium's print-to-PDF among them) never fire at all.
    var printImg = el('img', { class: 'psi-print-snapshot', alt: 'Istantanea del grafico interattivo' });
    canvasWrap.appendChild(printImg);

    var controls = el('div', { class: 'psi-controls' });
    var statsRow = el('div', { class: 'psi-stats' });

    config.params.forEach(function (spec) {
      var valueLabel = el('span', { class: 'psi-control-value', text: formatNumber(spec.value) });
      var input = el('input', {
        type: 'range', min: spec.min, max: spec.max, step: spec.step, value: spec.value,
        class: 'psi-slider', 'aria-label': spec.label
      });
      input.addEventListener('input', function () {
        spec.value = parseFloat(input.value);
        valueLabel.textContent = formatNumber(spec.value);
        redraw();
      });
      controls.appendChild(el('div', { class: 'psi-control-row' }, [
        el('label', { class: 'psi-control-label', text: spec.label }),
        input,
        valueLabel
      ]));
    });

    var resetBtn = el('button', { type: 'button', class: 'psi-reset-btn', text: '↺ Ripristina valori iniziali' });
    controls.appendChild(resetBtn);

    var caption = config.caption ? el('p', { class: 'psi-caption', text: config.caption }) : null;

    host.appendChild(canvasWrap);
    if (caption) host.appendChild(caption);
    host.appendChild(controls);
    if (config.stats) host.appendChild(statsRow);

    var initialValues = config.params.map(function (s) { return s.value; });

    var chart = new global.Chart(canvas.getContext('2d'), {
      type: config.type === 'bar' ? 'bar' : 'line',
      data: buildDatasets(config, currentParams(config)),
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { title: { display: !!config.xLabel, text: config.xLabel } },
          y: {
            title: { display: !!config.yLabel, text: config.yLabel },
            min: Array.isArray(config.yDomain) ? config.yDomain[0] : undefined,
            max: Array.isArray(config.yDomain) ? config.yDomain[1] : undefined
          }
        },
        plugins: { legend: { display: !!config.reference } }
      }
    });

    var snapshotTimer = null;
    function updateSnapshot() {
      try {
        printImg.src = chart.toBase64Image();
      } catch (e) { /* snapshot is best-effort; screen rendering is unaffected */ }
    }
    function scheduleSnapshot() {
      // Debounced: regenerating a PNG on every slider tick would make dragging
      // feel sluggish, so we only refresh once the student pauses.
      if (snapshotTimer) clearTimeout(snapshotTimer);
      snapshotTimer = setTimeout(updateSnapshot, 350);
    }

    function redraw() {
      var params = currentParams(config);
      var fresh = buildDatasets(config, params);
      chart.data.labels = fresh.labels;
      chart.data.datasets.forEach(function (ds, i) { ds.data = fresh.datasets[i].data; });
      chart.update('none');
      renderStats(statsRow, config, params);
      scheduleSnapshot();
    }

    resetBtn.addEventListener('click', function () {
      config.params.forEach(function (spec, i) { spec.value = initialValues[i]; });
      controls.querySelectorAll('.psi-slider').forEach(function (input, i) {
        input.value = initialValues[i];
        input.previousSibling && null;
      });
      controls.querySelectorAll('.psi-control-value').forEach(function (v, i) {
        v.textContent = formatNumber(initialValues[i]);
      });
      redraw();
    });

    renderStats(statsRow, config, currentParams(config));
    // Chart.js needs a paint tick before toBase64Image() returns the real curve.
    setTimeout(updateSnapshot, 120);
    instances[containerId] = { chart: chart, canvas: canvas, updateSnapshot: updateSnapshot };
  }

  // Each widget already keeps an up-to-date <img> snapshot in the DOM (see
  // mount), so printing works even when this event never fires. When the
  // browser *does* fire it, take the chance to flush any pending debounced
  // refresh so the printout matches the very latest slider position.
  global.addEventListener('beforeprint', function () {
    Object.keys(instances).forEach(function (id) {
      try { instances[id].updateSnapshot(); } catch (e) { /* best-effort */ }
    });
  });

  global.PSIWidget = { mount: mount };
})(window);
