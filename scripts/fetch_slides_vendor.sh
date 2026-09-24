#!/usr/bin/env bash
# Scarica in docs/assets/vendor/ le librerie usate dalle slide (reveal.js,
# KaTeX, GSAP...), così le lezioni funzionano anche senza rete in aula.
#
# Le versioni non sono scritte qui: lo script cerca nelle slide i riferimenti
# della forma "nome@x.y.z/dist/" e scarica dal registry npm ogni pacchetto
# citato. La cartella è esclusa da git; dove manca (per esempio sul sito
# pubblicato) le slide ripiegano sul CDN jsdelivr con le stesse versioni.
#
# Uso:  npm run vendor      (oppure: bash scripts/fetch_slides_vendor.sh)
set -euo pipefail

cd "$(dirname "$0")/.."
DEST=docs/assets/vendor

specs=$(grep -rhoE '[a-z][a-z0-9.-]*@[0-9]+\.[0-9]+\.[0-9]+/dist/' \
          --include='*.html' --include='*.js' docs/*/slides \
        | sed 's|/dist/$||' | sort -u)

if [[ -z "$specs" ]]; then
  echo "Nessuna libreria citata nelle slide." >&2
  exit 1
fi

for spec in $specs; do
  name=${spec%@*}
  version=${spec##*@}
  out="$DEST/$spec"
  if [[ -d "$out/dist" ]]; then
    echo "ok   $spec (già presente)"
    continue
  fi
  echo "get  $spec"
  mkdir -p "$out"
  if ! curl -fsSL "https://registry.npmjs.org/$name/-/$name-$version.tgz" \
       | tar -xz -C "$out" --strip-components=1 package/dist; then
    rm -rf "$out"
    echo "Download di $spec fallito." >&2
    exit 1
  fi
done

# MkDocs tratterebbe i .md dei pacchetti come pagine della dispensa
# (e `mkdocs build --strict` fallirebbe sui loro link interni).
find "$DEST" -name '*.md' -delete
