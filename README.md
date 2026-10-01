# PSI — Dispense interattive di Probabilità e Statistica

Sito delle dispense del corso di **Probabilità e Statistica (PSI)**, Corso di Laurea in Informatica, Università degli Studi dell'Insubria — Varese.

**Sito pubblicato:** <https://qwertyjacob.github.io/PSI-VA-2627/>

Questo repository pubblico ospita i sorgenti in Markdown (nella cartella `docs/`) delle dispense e la pipeline per la generazione del sito web interattivo tramite MkDocs e GitHub Pages. Il materiale è pensato per essere liberamente consultabile, studiabile, stampabile e forkabile dagli studenti.

---

## Caratteristiche del sito

- **Widget interattivi** — controlli grafici e cursori in tempo reale (sviluppati con Chart.js).
- **Blocchi di codice eseguibili** — codice Python eseguito direttamente nel browser tramite [Pyodide](https://pyodide.org), modificabile ed eseguibile senza installare nulla.
- **PDF per capitolo** — ogni pagina dispone del pulsante *"Scarica il PDF"*, che genera la versione stampabile del capitolo con formule MathJax e grafici dei widget ad alta risoluzione.
- **Stampa dell'intero corso** — funzionalità integrata per la stampa unificata tramite plugin dedicato.

---

## Struttura del repository

```text
docs/                      sorgenti Markdown delle dispense
  index.md                 homepage del corso
  0-senso.md               Capitolo 0: "Che senso ha essere qui?"
  javascripts/             runtime per widget, Chart.js, Pyodide e MathJax
  stylesheets/extra.css    stili personalizzati per widget, codice e stampa
overrides/main.html        override del tema (pulsante per download PDF)
scripts/
  pdf_hook.py              hook MkDocs per il binding e manifest dei PDF
  build_pdfs.mjs           generatore dei PDF tramite Chromium headless (Playwright)
mkdocs.yml                 configurazione di MkDocs e navigazione
requirements-docs.txt      dipendenze Python per la build
package.json               dipendenze Node.js per Playwright
```

> **Stato dei contenuti:** Attualmente è pubblicato il capitolo introduttivo (*0. Che senso ha essere qui?*). I 4 moduli tematici del corso (12 settimane, 24 lezioni complessive) verranno integrati e pubblicati progressivamente durante il semestre secondo la nuova struttura didattica ed epistemologica.

---

## Sviluppo in locale

### 1. Prerequisiti Python (MkDocs)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-docs.txt

# Avvia il server di sviluppo con live-reload
mkdocs serve
# Il sito sarà accessibile all'indirizzo http://127.0.0.1:8000
```

Per verificare che non vi siano link rotti o errori di sintassi:
```bash
mkdocs build --strict
```

### 2. Generazione PDF (opzionale)

I PDF dei singoli capitoli vengono generati con Node.js e Playwright a partire dal sito compilato:

```bash
npm ci
npx playwright install --with-deps chromium
npm run pdf
```

---

## Pubblicazione automatica

A ogni commit/push sul branch `main`, il workflow GitHub Actions [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) esegue la compilazione del sito (`mkdocs build --strict`), la generazione dei PDF per ciascun capitolo e pubblica automaticamente il bundle su GitHub Pages.

---

## Come contribuire e fare Fork (per gli studenti) 🎓

Il materiale delle dispense è aperto e in continua evoluzione: il contributo di voi studenti è fondamentale per correggere refusi, migliorare la chiarezza delle spiegazioni, proporre nuovi esempi pratici o ottimizzare widget e codice interattivo!

> ⭐ **Supporta il progetto:** Se trovi utile questo repository o il sito delle dispense per il tuo studio, **lascia una stella (Star)** in alto a destra su GitHub! Aiuta a dare visibilità al materiale didattico aperto.

### Come inviare una modifica (Pull Request)

1. **Fai un Fork del repository**  
   Clicca sul pulsante **Fork** in alto a destra su questa pagina GitHub per creare una copia del repository sul tuo account personale.

2. **Clona il tuo fork in locale**  
   ```bash
   git clone https://github.com/<TUO-USERNAME>/PSI-VA-2627.git
   cd PSI-VA-2627
   ```

3. **Crea un branch tematico**  
   Evita di lavorare direttamente sul branch `main`. Crea un branch dedicato con un nome descrittivo:
   ```bash
   git checkout -b fix/refuso-settimana-01
   ```

4. **Apporta le modifiche e testale in locale**  
   Modifica i file Markdown o i sorgenti sotto `docs/`. Prima di procedere, verifica in locale che la build non segnali errori o link interrotti:
   ```bash
   # Attiva l'ambiente virtuale
   source .venv/bin/activate
   # Verifica l'integrità del sito
   mkdocs build --strict
   ```

5. **Esegui commit e push**  
   Scrivi un messaggio di commit chiaro e sintetico:
   ```bash
   git add docs/
   git commit -m "docs: correggi refuso nella definizione di probabilità condizionata"
   git push origin fix/refuso-settimana-01
   ```

6. **Apri una Pull Request (PR)**  
   Torna sulla pagina GitHub del repository originale ([qwertyjacob/PSI-VA-2627](https://github.com/qwertyjacob/PSI-VA-2627)): troverai in evidenza il pulsante **Compare & pull request**.  
   Descrivi brevemente cosa hai corretto o aggiunto: la modifica verrà revisionata e, se approvata, integrata nel sito ufficiale!

