#!/usr/bin/env bash
# ==============================================================================
# publish_pages.sh
# 
# Unisce i cambiamenti dal branch 'dev' a 'main', effettua il push su GitHub
# per innescare il deploy automatico di GitHub Pages e riporta il repository
# sul branch 'dev'. Monitora opzionalmente l'esecuzione del workflow con gh CLI.
# ==============================================================================

set -euo pipefail

WATCH=true

# Parsing argomenti da riga di comando
for arg in "$@"; do
    case "$arg" in
        -n|--no-watch|--skip-watch)
            WATCH=false
            shift
            ;;
        -h|--help)
            echo "Uso: $(basename "$0") [OPZIONI]"
            echo ""
            echo "Opzioni:"
            echo "  -n, --no-watch    Non attendere il completamento del workflow GitHub Actions"
            echo "  -h, --help        Mostra questo messaggio di aiuto"
            exit 0
            ;;
        *)
            ;;
    esac
done

# Risoluzione directory radice del repository del submodule
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

echo "📂 Repository: $REPO_ROOT"

# 1. Verifica pulizia working directory
if ! git diff-index --quiet HEAD --; then
    echo "❌ Errore: Hai modifiche non committate nel working tree." >&2
    echo "   Fai commit o stash delle tue modifiche prima di procedere con la pubblicazione." >&2
    git status -s >&2
    exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "dev" ]; then
    echo "⚠️  Attenzione: Attualmente sei sul branch '$CURRENT_BRANCH' (previsto: 'dev')."
    read -rp "Vuoi procedere comunque mergiando '$CURRENT_BRANCH' su 'main'? [y/N] " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Operazione annullata."
        exit 0
    fi
fi

# 2. Push del branch sorgente su origin se ci sono commit non sincronizzati
echo ""
echo "==> [1/5] Verifica sincronizzazione di '$CURRENT_BRANCH' con origin..."
if git rev-parse --verify "origin/$CURRENT_BRANCH" >/dev/null 2>&1; then
    AHEAD_SRC=$(git rev-list --count "origin/$CURRENT_BRANCH..$CURRENT_BRANCH" 2>/dev/null || echo 0)
    if [ "$AHEAD_SRC" -gt 0 ]; then
        echo "    Push di $AHEAD_SRC commit da '$CURRENT_BRANCH' verso 'origin/$CURRENT_BRANCH'..."
        git push origin "$CURRENT_BRANCH"
    else
        echo "    Branch '$CURRENT_BRANCH' già allineato con origin."
    fi
fi

# 3. Fetch da origin
echo ""
echo "==> [2/5] Fetch da origin..."
git fetch origin

# 4. Checkout di main e merge
echo ""
echo "==> [3/5] Switch su 'main' e merge di '$CURRENT_BRANCH'..."
git checkout main
git pull --ff-only origin main || true

if git merge --ff-only "$CURRENT_BRANCH"; then
    echo "    Fast-forward merge completato con successo."
else
    echo "    Fast-forward non possibile, eseguo standard merge..."
    git merge -m "Merge branch '$CURRENT_BRANCH' into main [deploy pages]" "$CURRENT_BRANCH"
fi

# 5. Push su origin/main
echo ""
echo "==> [4/5] Push su origin/main..."
git push origin main

# 6. Ritorno al branch iniziale
echo ""
echo "==> [5/5] Ritorno al branch '$CURRENT_BRANCH'..."
git checkout "$CURRENT_BRANCH"

echo ""
echo "✨ Merge e push completati con successo!"

# 7. Monitoraggio GitHub Actions (se gh CLI è installata e WATCH è attivo)
if [ "$WATCH" = true ] && command -v gh >/dev/null 2>&1; then
    echo ""
    echo "📡 Rilevamento workflow GitHub Actions in corso..."
    sleep 4
    
    RUN_ID=$(gh run list --branch main --workflow "Deploy PSI handouts to GitHub Pages" --limit 1 --json databaseId -q '.[0].databaseId' 2>/dev/null || true)
    
    if [ -n "$RUN_ID" ]; then
        echo "⏳ Workflow avviato (Run ID: $RUN_ID). Monitoraggio in tempo reale..."
        if gh run watch "$RUN_ID" --exit-status; then
            echo ""
            echo "🎉 Deploy completato con successo su GitHub Pages!"
        else
            echo "❌ Il workflow ha riscontrato un errore. Per i dettagli esegui:"
            echo "   gh run view $RUN_ID --log-failed"
            exit 1
        fi
    else
        echo "ℹ️  Impossibile agganciare l'ID della run. Controlla lo stato su GitHub:"
        gh browse --actions 2>/dev/null || true
    fi
elif [ "$WATCH" = false ]; then
    echo "ℹ️  Opzione --no-watch attiva: deploy avviato in background su GitHub."
fi
