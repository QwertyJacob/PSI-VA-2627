#!/usr/bin/env python3
"""
Mechanical, structure-preserving ipynb -> Markdown extraction for the PSI handouts.

This is deliberately NOT trying to produce a polished final page. It produces a
faithful scaffolded draft (original Italian prose/math/code preserved verbatim)
with images/data copied into place and manim/widget spots flagged, so that the
code-expansion and prose/didactics agents enhance a real starting point instead
of writing a handout from memory.

Run from the repo root: .venv/bin/python scripts/extract_notebooks.py
"""
import json
import re
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = REPO_ROOT / "colab_handouts_PSI"
DOCS_DIR = REPO_ROOT / "docs"

# (source notebook, output .md path relative to docs/, asset subdir key)
MANIFEST = [
    ("0_incertezza.ipynb", "0-incertezza.md", "0-incertezza"),
    ("1_intro_probabilita.ipynb", "1-probabilita/index.md", "1-probabilita"),
    ("1.2_assiomi_probabilita.ipynb", "1-probabilita/1.2-assiomi.md", "1-probabilita"),
    ("1.2BONUS_venn.ipynb", "1-probabilita/1.2-bonus-venn.md", "1-probabilita"),
    ("1.3_def_classica.ipynb", "1-probabilita/1.3-definizione-classica.md", "1-probabilita"),
    ("2_intro_conteggio.ipynb", "2-conteggio/index.md", "2-conteggio"),
    ("2.1_disposizioni_combinazioni.ipynb", "2-conteggio/2.1-disposizioni-combinazioni.md", "2-conteggio"),
    ("2.3BONUS_ancoraconteggio.ipynb", "2-conteggio/2.3-bonus-ancora-conteggio.md", "2-conteggio"),
    ("2.4_probcond.ipynb", "2-conteggio/2.4-probabilita-condizionata.md", "2-conteggio"),
    ("2.4BONUS_alberi_prob.ipynb", "2-conteggio/2.4-bonus-alberi.md", "2-conteggio"),
    ("compleanni.ipynb", "2-conteggio/esempi-compleanni.md", "2-conteggio"),
    ("3_random_vars.ipynb", "3-variabili-discrete/index.md", "3-variabili-discrete"),
    ("3.3.3BONUS_Geometric_Pascal.ipynb", "3-variabili-discrete/3.3-bonus-geometrica-pascal.md", "3-variabili-discrete"),
    ("3.3.5_Poisson.ipynb", "3-variabili-discrete/3.3-poisson.md", "3-variabili-discrete"),
    ("3.4BONUSusing_random_vars.ipynb", "3-variabili-discrete/3.4-bonus-uso-variabili.md", "3-variabili-discrete"),
    ("4_Continuous_random_vars.ipynb", "4-variabili-continue/index.md", "4-variabili-continue"),
    ("4.2.3_Gaussian.ipynb", "4-variabili-continue/4.2-gaussiana.md", "4-variabili-continue"),
    ("4.2.4_Inequalities.ipynb", "4-variabili-continue/4.2-disuguaglianze.md", "4-variabili-continue"),
    ("4.3_Distribuzioni_Congiunte.ipynb", "4-variabili-continue/4.3-distribuzioni-congiunte.md", "4-variabili-continue"),
    ("4.4_CLT.ipynb", "4-variabili-continue/4.4-teorema-limite-centrale.md", "4-variabili-continue"),
    ("4.5_Campionamento.ipynb", "4-variabili-continue/4.5-campionamento.md", "4-variabili-continue"),
    ("BONUS_C14_testing.ipynb", "4-variabili-continue/bonus-carbonio14.md", "4-variabili-continue"),
]

# Notebook -> manim scenes it defines (verified by direct inspection, not grep:
# 3.3.5_Poisson.ipynb and 4.2.4_Inequalities.ipynb only matched on a leftover
# "manimvenv" kernelspec name, not real manim code).
MANIM_SCENES = {
    "1.2_assiomi_probabilita.ipynb": ["VennUnion", "VennThree", "CircuitReliabilityClaude", "CircuitReliabilityChatGPT"],
    "1.2BONUS_venn.ipynb": ["VennDiagram"],
    "compleanni.ipynb": ["VennDiagram"],
}

COLAB_BADGE_RE = re.compile(r"colab\.research\.google\.com", re.IGNORECASE)
IMG_REF_RE = re.compile(r"(figs/([\w.\-]+\.(?:png|jpg|jpeg|svg|gif)))")


def load_notebook(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def cell_source(cell: dict) -> str:
    src = cell.get("source", "")
    return "".join(src) if isinstance(src, list) else src


def build_source_box(notebook_name: str) -> str:
    colab_url = f"https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/{notebook_name}"
    github_url = f"https://github.com/QwertyJacob/colab_handouts_PSI/blob/main/{notebook_name}"
    return (
        '<div class="psi-source-links" markdown>\n'
        f"[Apri in Colab]({colab_url}){{ .md-button }} "
        f"[Proponi una modifica]({github_url}){{ .md-button }}\n"
        "</div>\n"
    )


def emit_markdown_cell(source: str, asset_key: str, copied_images: set, path_prefix: str) -> str:
    def repl(m):
        rel_path, filename = m.group(1), m.group(2)
        src_file = SRC_DIR / "figs" / filename
        if src_file.exists():
            dest_dir = DOCS_DIR / "assets" / "img" / asset_key
            dest_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_file, dest_dir / filename)
            copied_images.add(filename)
            return f"{path_prefix}assets/img/{asset_key}/{filename}"
        return rel_path

    return IMG_REF_RE.sub(repl, source)


MANIM_IMPORT_RE = re.compile(r"^\s*(?:import manim\b|from manim\b)", re.MULTILINE)


def is_manim_source(stripped: str, scenes: list) -> bool:
    return bool(re.search(r"%%?manim", stripped)) or bool(MANIM_IMPORT_RE.search(stripped)) or any(s in stripped for s in scenes)


def emit_code_cell(source: str, notebook_name: str, cell_index: int, scenes: list) -> str:
    stripped = source.strip()
    is_manim = is_manim_source(stripped, scenes)
    provenance = f"<!-- source: {notebook_name} cell {cell_index} (code) -->\n"
    if is_manim:
        scene_match = re.search(r"-qm\s+(\w+)", stripped)
        matched_known_scene = next((s for s in scenes if s in stripped), None)
        scene_name = scene_match.group(1) if scene_match else (matched_known_scene or "setup")
        video_key = f"{Path(notebook_name).stem}__{scene_name}"
        indented_source = "\n".join("    " + line if line else "" for line in source.rstrip().split("\n"))
        # Fallback (approved): no local manim/LaTeX toolchain available to re-render
        # this scene right now (needs libcairo2-dev/libpango1.0-dev via sudo). Keep the
        # source visible and runnable on Colab instead of a broken/missing video embed.
        # If a real video ever lands at assets/video/{video_key}.mp4, swap this whole
        # block for a plain <video controls src="..."> tag.
        return (
            provenance
            + f'??? note "Animazione (Manim): {scene_name} — al momento eseguibile solo su Colab"\n'
            + f"    <!-- CODE_AGENT_TODO: sostituisci questa riga con una didascalia che descriva cosa mostra l'animazione '{scene_name}'. -->\n"
            + "    Questo codice genera un'animazione con la libreria [Manim](https://www.manim.community/). "
              "Non è (ancora) disponibile come video pre-renderizzato su questa pagina: apri il notebook "
              "originale in Colab (link in cima alla pagina) per eseguirlo e vederlo.\n\n"
            + "    ```python\n" + indented_source + "\n    ```\n"
        )
    fence = f'```python\n{source.rstrip()}\n```\n'
    return provenance + '<!-- WIDGET_CANDIDATE: consider turning this into a PSIWidget or psi-exec block -->\n' + fence


def extract_one(notebook_name: str, out_rel_path: str, asset_key: str) -> dict:
    nb_path = SRC_DIR / notebook_name
    nb = load_notebook(nb_path)
    scenes = MANIM_SCENES.get(notebook_name, [])
    copied_images = set()
    path_prefix = "../" * out_rel_path.count("/")

    parts = [build_source_box(notebook_name), ""]

    for i, cell in enumerate(nb["cells"]):
        src = cell_source(cell)
        if not src.strip():
            continue
        if cell["cell_type"] == "markdown":
            if COLAB_BADGE_RE.search(src) and "colab-badge" in src:
                continue  # replaced by build_source_box above
            parts.append(emit_markdown_cell(src, asset_key, copied_images, path_prefix))
            parts.append("")
        elif cell["cell_type"] == "code":
            parts.append(emit_code_cell(src, notebook_name, i, scenes))
            parts.append("")

    out_path = DOCS_DIR / out_rel_path
    out_path.parent.mkdir(parents=True, exist_ok=True)
    text = "\n".join(parts).rstrip() + "\n"
    # Source notebooks are inconsistent about whether their opening cell uses
    # a level-1 heading (some start at ## or ###) — promote whichever heading
    # comes first to H1 so every page has exactly one real title, matching its
    # nav entry. Every other heading in the page is left untouched.
    text = re.sub(r"^#{1,6}(\s+)", r"#\1", text, count=1, flags=re.MULTILINE)
    out_path.write_text(text, encoding="utf-8")
    return {"notebook": notebook_name, "out": out_rel_path, "images": sorted(copied_images), "manim_scenes": scenes}


def main():
    report = []
    for notebook_name, out_rel_path, asset_key in MANIFEST:
        report.append(extract_one(notebook_name, out_rel_path, asset_key))

    # historical_c14.json is referenced in BONUS_C14_testing's prose; copy it
    # unconditionally so it's available if the code-agent wires it into a psi-exec block.
    data_src = SRC_DIR / "data" / "historical_c14.json"
    if data_src.exists():
        dest = DOCS_DIR / "assets" / "data" / "historical_c14.json"
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(data_src, dest)

    print(json.dumps(report, indent=2, ensure_ascii=False))
    print(f"\nExtracted {len(report)} notebooks.")


if __name__ == "__main__":
    main()
