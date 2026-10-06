/* Widget dei futuri di Fermat: si sceglie quanto manca ad A e a B, si contano i 2^n futuri. */
(function () {
  'use strict';
  var box = document.getElementById('wf-box');
  if (!box) return;
  var st = { a: 3, b: 3 }, MAX = 5, POSTA = 64;

  function binom(n, k) {
    var r = 1;
    for (var i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }

  function render() {
    var a = st.a, b = st.b, n = a + b - 1, tot = Math.pow(2, n), all = [], win = 0;
    box.querySelector('[data-v="a"]').textContent = a;
    box.querySelector('[data-v="b"]').textContent = b;
    for (var m = 0; m < tot; m++) {
      var w = '', k = 0;
      for (var i = n - 1; i >= 0; i--) { var bit = (m >> i) & 1; w += bit ? 'A' : 'B'; k += bit; }
      all.push({ w: w, k: k });
      if (k >= a) win++;
    }
    // Raggruppati per numero di vittorie di A: le righe del triangolo si vedono a colpo d'occhio.
    all.sort(function (x, y) { return y.k - x.k; });
    var chips = box.querySelector('.wf-chips');
    chips.className = 'wf-chips ' + (n <= 5 ? 'big' : n === 6 ? 'mid' : n === 7 ? 'small' : 'dots');
    chips.innerHTML = all.map(function (f) {
      return '<span class="wf-chip ' + (f.k >= a ? 'a' : 'b') + '" title="' + f.w + '">' + (n <= 7 ? f.w : '') + '</span>';
    }).join('');
    var ks = [];
    for (var k2 = n; k2 >= 0; k2--) {
      ks.push('<span class="wf-k ' + (k2 >= a ? 'a' : 'b') + '"><small>k = ' + k2 + '</small>' + binom(n, k2) + '</span>');
    }
    box.querySelector('.wf-ks').innerHTML = ks.join('');
    var pa = win / tot;
    box.querySelector('.wf-out').innerHTML =
      '<b>n = ' + a + ' + ' + b + ' − 1 = ' + n + '</b> manche · <b>' + tot + '</b> futuri equiprobabili · ' +
      '<span class="a">A</span> vince in <b>' + win + '</b> → P(A vince) = ' + win + '/' + tot + ' ≈ <b>' + pa.toFixed(4) + '</b>' +
      ' · posta 64: <span class="a">' + +(POSTA * pa).toFixed(2) + '</span> / <span class="b">' + +(POSTA * (1 - pa)).toFixed(2) + '</span>';
  }

  box.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-k]');
    if (!btn) return;
    st[btn.dataset.k] = Math.min(MAX, Math.max(1, st[btn.dataset.k] + Number(btn.dataset.d)));
    render();
  });
  render();
})();
