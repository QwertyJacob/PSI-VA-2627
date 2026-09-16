/*
 * Runnable/editable Python code blocks, backed by Pyodide (real CPython compiled to
 * WebAssembly, runs entirely in the student's browser — no server, works on GitHub Pages).
 *
 * Convention for content pages: wrap a fenced python code block in a marker div and
 * list the extra Pyodide packages it needs (numpy/matplotlib are preloaded lazily on
 * first run for every block; list anything beyond that, e.g. scipy):
 *
 *   <div class="psi-exec" data-packages="scipy" markdown="1">
 *   ```python
 *   import numpy as np
 *   ...
 *   ```
 *   </div>
 *
 * Pyodide itself (~7MB) plus requested packages are ONLY downloaded the first time a
 * student presses "Esegui" on the page — nothing is fetched on normal page load, so this
 * never slows down reading or printing.
 */
(function () {
  'use strict';

  var PYODIDE_VERSION = '0.26.4';
  var PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v' + PYODIDE_VERSION + '/full/';

  var pyodidePromise = null;
  function getPyodide(onStatus) {
    if (pyodidePromise) return pyodidePromise;
    pyodidePromise = new Promise(function (resolve, reject) {
      if (window.loadPyodide) return resolve();
      onStatus('Scaricamento dell\'ambiente Python (~7 MB, solo la prima volta)…');
      var script = document.createElement('script');
      script.src = PYODIDE_CDN + 'pyodide.js';
      script.onload = resolve;
      script.onerror = function () { reject(new Error('Impossibile caricare Pyodide da ' + PYODIDE_CDN)); };
      document.head.appendChild(script);
    }).then(function () {
      onStatus('Avvio dell\'interprete Python…');
      return window.loadPyodide({ indexURL: PYODIDE_CDN });
    });
    return pyodidePromise;
  }

  var loadedPackages = {};
  function ensurePackages(pyodide, names, onStatus) {
    var missing = names.filter(function (n) { return !loadedPackages[n]; });
    if (missing.length === 0) return Promise.resolve();
    onStatus('Installazione di ' + missing.join(', ') + '…');
    return pyodide.loadPackage(missing).then(function () {
      missing.forEach(function (n) { loadedPackages[n] = true; });
    });
  }

  // Runs student code with stdout captured and matplotlib figures collected as
  // PNGs, entirely inside Pyodide. Exceptions become a normal Python traceback
  // string rather than aborting the JS call, so partial stdout is never lost.
  var HARNESS = [
    'import matplotlib',
    'matplotlib.use("AGG")',
    'import matplotlib.pyplot as _psi_plt, io as _psi_io, base64 as _psi_b64, contextlib as _psi_ctxlib, traceback as _psi_tb',
    '_psi_plt.close("all")',
    '_psi_stdout = _psi_io.StringIO()',
    '_psi_error = None',
    'try:',
    '    with _psi_ctxlib.redirect_stdout(_psi_stdout):',
    '        exec(__psi_code, {})',
    'except Exception:',
    '    _psi_error = _psi_tb.format_exc()',
    '_psi_images = []',
    'for _psi_fig_num in _psi_plt.get_fignums():',
    '    _psi_buf = _psi_io.BytesIO()',
    '    _psi_plt.figure(_psi_fig_num).savefig(_psi_buf, format="png", bbox_inches="tight", dpi=110)',
    '    _psi_images.append(_psi_b64.b64encode(_psi_buf.getvalue()).decode("ascii"))',
    '{"stdout": _psi_stdout.getvalue(), "images": _psi_images, "error": _psi_error}'
  ].join('\n');

  function buildUI(block) {
    var source = block.querySelector('pre > code');
    var sourceText = source ? source.textContent.replace(/\n$/, '') : '';
    var packages = (block.getAttribute('data-packages') || '')
      .split(',').map(function (s) { return s.trim(); }).filter(Boolean);

    var runBtn = document.createElement('button');
    runBtn.type = 'button';
    runBtn.className = 'psi-exec-run-btn';
    runBtn.textContent = '▶ Esegui';

    var status = document.createElement('span');
    status.className = 'psi-exec-status';

    var toolbar = document.createElement('div');
    toolbar.className = 'psi-exec-toolbar';
    toolbar.appendChild(runBtn);
    toolbar.appendChild(status);
    block.appendChild(toolbar);

    var editor = null;
    var output = document.createElement('div');
    output.className = 'psi-exec-output';
    output.hidden = true;
    block.appendChild(output);

    var started = false;

    runBtn.addEventListener('click', function () {
      if (!started) {
        started = true;
        // Swap the static, non-editable block for an editable textarea seeded
        // with the original source, so students can tweak parameters and re-run.
        editor = document.createElement('textarea');
        editor.className = 'psi-exec-editor';
        editor.spellcheck = false;
        editor.value = sourceText;
        var rows = sourceText.split('\n').length;
        editor.rows = Math.min(Math.max(rows + 1, 4), 30);
        block.insertBefore(editor, toolbar);
        // Material for MkDocs sets its own `display` on <pre> (for the
        // copy-button feature) with enough specificity to beat the bare
        // `hidden` attribute, so hide the whole `.highlight` wrapper (the
        // container Material generates around pre+code+copy-button) and
        // force it via inline style too, which always wins the cascade.
        var codeWrapper = source && (source.closest('.highlight') || source.closest('pre'));
        if (codeWrapper) {
          codeWrapper.hidden = true;
          codeWrapper.style.display = 'none';
        }
        runBtn.textContent = '▶ Esegui di nuovo';
      }

      runBtn.disabled = true;
      status.textContent = '';
      output.hidden = false;

      getPyodide(function (msg) { status.textContent = msg; })
        .then(function (pyodide) {
          return ensurePackages(pyodide, ['numpy', 'matplotlib'].concat(packages), function (msg) {
            status.textContent = msg;
          }).then(function () { return pyodide; });
        })
        .then(function (pyodide) {
          status.textContent = 'Esecuzione…';
          pyodide.globals.set('__psi_code', editor.value);
          var resultProxy = pyodide.runPython(HARNESS);
          var result = resultProxy.toJs({ dict_converter: Object.fromEntries });
          resultProxy.destroy();
          status.textContent = '';
          renderOutput(output, result);
        })
        .catch(function (err) {
          // JS-level failure only (e.g. Pyodide/network failed to load at all).
          // Student-code exceptions are caught inside HARNESS and shown as a traceback instead.
          status.textContent = '';
          renderOutput(output, { stdout: '', images: [], error: String(err) });
        })
        .finally(function () { runBtn.disabled = false; });
    });
  }

  function renderOutput(output, result) {
    output.innerHTML = '';
    if (result.stdout) {
      var stdoutPre = document.createElement('pre');
      stdoutPre.className = 'psi-exec-stdout';
      stdoutPre.textContent = result.stdout;
      output.appendChild(stdoutPre);
    }
    (result.images || []).forEach(function (b64) {
      var img = document.createElement('img');
      img.className = 'psi-exec-figure';
      img.src = 'data:image/png;base64,' + b64;
      output.appendChild(img);
    });
    if (result.error) {
      var errPre = document.createElement('pre');
      errPre.className = 'psi-exec-error';
      errPre.textContent = result.error;
      output.appendChild(errPre);
    } else if (!result.stdout && (!result.images || result.images.length === 0)) {
      var note = document.createElement('p');
      note.className = 'psi-exec-note';
      note.textContent = '(eseguito senza errori — nessun output)';
      output.appendChild(note);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.psi-exec').forEach(buildUI);
  });
})();
