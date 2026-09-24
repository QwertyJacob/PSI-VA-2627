---
name: slide-animate
description: Costruire o aggiornare le slide animate di una settimana del corso PSI (reveal.js + GSAP + SVG, niente Manim/Python), con diagrammi e animazioni legati agli step di reveal e verifica automatica nel browser. Usala quando si chiede di fare, estendere o sistemare le slide di docs/settimana_NN/slides, di aggiungere animazioni, diagrammi di Venn, simulazioni o formule alle slide, o di allinearle alla dispensa della settimana.
---

# Slide animate del corso PSI

Le slide di ogni settimana stanno in `docs/settimana_NN/slides/index.html` (reveal.js 5, tema scuro, testi in italiano). Le animazioni sono **JavaScript: timeline GSAP su SVG scritto a mano**. Non usare Manim, Python o video renderizzati.

## Struttura

| File | Ruolo |
|---|---|
| `docs/assets/slides/deck.js` | Avvio comune: carica reveal.js, KaTeX e GSAP dalla copia locale, con ripiego sul CDN. Rende le formule, costruisce le scene, avvia reveal. **Le versioni delle librerie stanno solo qui.** |
| `docs/assets/slides/scene.js` | Motore delle scene (`PSI.*`) e utilità. |
| `docs/assets/slides/scenes.css` | Stile comune: palette, impaginazione, pannelli, elementi SVG di base, pulsanti. |
| `docs/settimana_NN/slides/js/*.js` | Scene della settimana (una `PSI.scene` per slide animata), divise per tema. |
| `docs/settimana_NN/slides/css/settimana.css` | Regole delle singole scene della settimana. |
| `scripts/check_slides.mjs` | Verifica nel browser (`npm run slides:check`). |
| `scripts/fetch_slides_vendor.sh` | `npm run vendor`: scarica le librerie in `docs/assets/vendor/`, che è in .gitignore. |

Scheletro di un mazzo nuovo (prendi `settimana_01/slides/index.html` come modello):

```html
<head>
  <script src="../../assets/slides/deck.js"></script>
  <link rel="stylesheet" href="css/settimana.css">
  <style>/* stili del mazzo */</style>
</head>
<body>
  <div class="reveal"><div class="slides"> ... </div></div>
  <script src="../../assets/slides/scene.js"></script>
  <script src="js/tema.js"></script>
  <script>PSIDeck.start({ onReady: function (deck) { /* codice extra */ } });</script>
</body>
```

La rete in aula non è affidabile: niente `<script>` o `<link>` verso CDN scritti a mano. Una libreria nuova va aggiunta alle liste di `deck.js` nella forma `nome@x.y.z/dist/...`, poi si lancia `npm run vendor`.

## Il motore delle scene

```js
PSI.scene('id-della-section', function (el, tl) {
  var q = PSI.q(el);                       // q.one(sel), q.all(sel)
  gsap.set([...], { opacity: 0 });         // stato iniziale
  tl.to(...).addLabel('s0');               // animazione d'ingresso, fino a s0
  tl.to(...).addLabel('s1');               // uno step per ogni avanzamento
});
```

- La timeline è in pausa; le etichette `s0 … sN` sono gli step. Il motore aggiunge N frammenti invisibili alla `<section>`, così frecce e telecomando vanno avanti e indietro.
- Entrando in avanti parte l'ingresso. Entrando a ritroso o con un link diretto (`#/h/v/f`, frammenti contati da 0) la scena salta subito allo stato giusto. Nella vista di stampa (`?print-pdf`) ogni scena è nello stato finale.
- Utilità: `PSI.svg(tag, attrs, parent)`, `PSI.text(parent, x, y, testo, classe, attrs)`, `PSI.draw(tl, el, lunghezza)` (tratto che si disegna), `PSI.random(seme)`, `PSI.geo.radius/lens/distanceForLens` (cerchi ad area esatta), `PSI.replay(el, da, a)` (rigioca un tratto, per esempio da un pulsante).
- Slide verticali (approfondimenti facoltativi): `<section><section id="a">…</section><section id="b">…</section></section>`.

## Schemi collaudati

- **Probabilità = area.** Ω è un rettangolo di area 1; negli esempi numerici le aree sono esatte (bande piene, strisce, cerchi con `PSI.geo`). Scrivi nelle regioni i valori veri: devono sommare a 1.
- **Palette fissa** (variabili in `scenes.css`): A `--psi-a` azzurro, B `--psi-b` ambra, C `--psi-c` viola, selezione `--psi-sel` verde, impossibile `--psi-void`. Riprendila nelle formule con `\color{#38ef7d}`.
- **Scene a stato**, per contatori, simulazioni e diagrammi che cambiano: la timeline anima un oggetto (`tl.to(st, { n: N, onUpdate: render })`) e `render()` ridisegna tutto da `st`. Avanti, indietro, salti e stampa restano coerenti. Per i cambi discreti usa tween da 0.01 s verso l'intero successivo.
- **Simulazioni con seme fisso** (`PSI.random`), scelto perché il risultato finale sia vicino alla teoria ma non esatto. Un pulsante «rilancia» può usare un seme casuale più `PSI.replay`.
- **Impaginazione:** `h2.scene-title`; `div.scene-grid` con l'SVG a sinistra e `div.scene-panel` a destra (`.scene-grid.wide` per SVG da 700 px); nel pannello `ol.scene-steps` (voci da opache a piene, una per step), `.scene-def` per la formula chiave, `.scene-note`, `.scene-cards/.scene-card` per testi che si alternano.
- **Testo sopra linee o punti:** classe `halo`.
- **Interattività:** pulsanti `.psi-btn` (chiamare `this.blur()` nel click); trascinamento con pointer events e `getScreenCTM().inverse()`.

## Trappole già incontrate

- `gsap.set(target, obj)` **modifica `obj`** (gli aggiunge `duration: 0`). Mai riusare lo stesso oggetto in `set` e poi nei tween: passa una copia (`Object.assign({}, obj)`).
- Le regole CSS sul testo SVG vanno scritte come `.reveal .scene-svg .classe`, altrimenti vince `.reveal .scene-svg text`. Il foglio comune viene caricato prima di `settimana.css`: a parità di specificità vince la settimana.
- Mai stilizzare `span` generici attorno alle formule: KaTeX è fatto di span annidati. Usa `> span`.
- Mai dare `fill` in CSS ai `<circle>` in `<defs>` usati da `<use>`: il colore va sul `<use>`.
- `transformOrigin` in percentuale sugli SVG dipende dal layout: usa `svgOrigin: 'x y'` in coordinate SVG.
- Le misure non valgono nelle slide nascoste (`getBBox`, `getTotalLength`): calcola le lunghezze a mano.
- Una deformazione di forma: percorsi con lo stesso numero di punti, poi `tl.to(path, { attr: { d: finale } })`.
- Le formule inline nei pannelli non vanno a capo (`white-space: nowrap` è già nel foglio comune): tienile corte.

## Verifica (obbligatoria prima di consegnare)

```bash
npm run vendor                      # una volta, per lavorare senza rete
npm run slides:check -- settimana_NN --out <cartella> [--scenes id1,id2] [--sheet] [--print] [--wait 4500]
```

- Lo script serve `docs/`, blocca il CDN e passa ogni scena: ingresso, ogni step, uno indietro, uscita e rientro. Per ogni scena scrive `<id>-grid.png`: **guarda le griglie**, non solo l'esito. Esce con codice 1 se ci sono errori in console, richieste fallite o scene mancanti.
- `--sheet` produce `foglio-provini.png` con tutte le slide nello stato finale, utile per controllare gli sforamenti. `--print` controlla la vista di stampa.
- Se la versione di Playwright chiede un Chromium non installato: `PSI_CHROMIUM=~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell`.
- Aumenta `--wait` per le scene con step lunghi, altrimenti gli screenshot catturano metà animazione.
- Alla fine: `mkdocs build --strict`.
