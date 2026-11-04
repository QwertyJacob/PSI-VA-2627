#!/usr/bin/env python3
"""
One Colab notebook per week, generated from the runnable scripts of the handouts.

Every `<div class="psi-exec">` block of docs/settimana_NN/index.md becomes a code
cell of notebooks/settimana_NN.ipynb, in the same order and with the same text.
Each code cell is preceded by a short Markdown cell with the title of the handout
section the script belongs to, and a link back to it. Students open the notebook
straight from GitHub (branch `main`) with the «Apri in Colab» button that
scripts/notebook_hook.py puts next to «Esegui»; the button scrolls the notebook
to the matching script (`#scrollTo=script-K`).

Regenerate the notebooks whenever a script in a handout changes; the MkDocs hook
warns (and `mkdocs build --strict` fails) when a notebook is out of date.

    python scripts/build_notebooks.py           # rewrite every notebook
    python scripts/build_notebooks.py --check   # exit 1 if any is out of date

Standard library only, so the MkDocs hook can import it without extra packages.
"""
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = REPO_ROOT / "docs"
NOTEBOOKS_DIR = REPO_ROOT / "notebooks"

# Colab reads the notebooks from this branch of the GitHub repository.
NOTEBOOK_BRANCH = "main"

WEEK_PAGE_RE = re.compile(r"settimana_(\d{2})/index\.md")

_FENCE_RE = re.compile(r"^(\s*)(`{3,}|~{3,})\s*([\w-]*)")
_HEADING_RE = re.compile(r"^\s*(#{1,6})\s+(.+?)\s*$")
_ADMONITION_RE = re.compile(r'^(\s*)(?:\?\?\?\+?|!!!)\s+[\w-]+.*?"(.+)"\s*$')
_EXEC_DIV_RE = re.compile(r'^(\s*)<div\s+class="psi-exec"')
_ATTR_LIST_RE = re.compile(r"\s*\{:?([^}]*)\}\s*$")


@dataclass
class Script:
    title: str        # handout section (or admonition) the script sits in
    anchor: str       # explicit `{: #id }` of that section, "" if none
    code: str         # source, dedented, without the trailing newline
    div_line: int     # 0-based line of the `<div class="psi-exec"` marker


def _split_heading(text):
    """'Titolo {: #lab-x .psi-facoltativo }' -> ('Titolo', 'lab-x')."""
    anchor = ""
    m = _ATTR_LIST_RE.search(text)
    if m:
        ids = [tok[1:] for tok in m.group(1).split() if tok.startswith("#")]
        anchor = ids[0] if ids else ""
        text = text[: m.start()]
    return text.strip(), anchor


def extract_scripts(markdown):
    """The runnable scripts of a handout page, in page order.

    A script is titled after the nearest heading of level 1-3 above it (deeper
    headings such as «Passo 3 — ...» are steps inside a lab, not sections), or
    after the enclosing collapsible block when the script sits inside one.
    """
    lines = markdown.split("\n")
    scripts = []
    section = ("", "")             # (title, anchor) of the nearest heading <= 3
    admonition = None              # (title, indent) of the latest admonition
    fence = None                   # (indent, marker) of the open code fence
    pending_div = None             # line of a psi-exec div awaiting its fence
    capture = None                 # (title, anchor, div_line, indent, lines)

    for i, line in enumerate(lines):
        if fence is not None:
            m = _FENCE_RE.match(line)
            if (m and m.group(2)[0] == fence[1][0]
                    and len(m.group(2)) >= len(fence[1]) and not m.group(3)):
                fence = None
                if capture is not None:
                    title, anchor, div_line, indent, body = capture
                    pad = " " * indent
                    code = "\n".join(l[indent:] if l.startswith(pad) else l.lstrip()
                                     for l in body)
                    scripts.append(Script(title, anchor, code.rstrip("\n"), div_line))
                    capture = None
            elif capture is not None:
                capture[4].append(line)
            continue

        m = _FENCE_RE.match(line)
        if m:
            fence = (m.group(1), m.group(2))
            if pending_div is not None and m.group(3) == "python":
                indent = len(m.group(1))
                if admonition and indent > admonition[1]:
                    title, anchor = admonition[0], section[1]
                else:
                    title, anchor = section
                capture = (title, anchor, pending_div, indent, [])
            pending_div = None
            continue

        if _EXEC_DIV_RE.match(line):
            pending_div = i
            continue

        m = _HEADING_RE.match(line)
        if m and len(m.group(1)) <= 3:
            section = _split_heading(m.group(2))
            admonition = None
            continue

        m = _ADMONITION_RE.match(line)
        if m:
            admonition = (m.group(2).strip(), len(m.group(1)))

    return scripts


def page_title(markdown):
    for line in markdown.split("\n"):
        if line.startswith("# "):
            return _split_heading(line[2:])[0]
    return ""


def notebook_path(week):
    return NOTEBOOKS_DIR / f"settimana_{week}.ipynb"


def colab_url(repo_url, week, script_index):
    """Colab link to the notebook of `week`, scrolled to script number `script_index` (1-based)."""
    repo = repo_url.rstrip("/").removeprefix("https://github.com/")
    return (f"https://colab.research.google.com/github/{repo}/blob/{NOTEBOOK_BRANCH}/"
            f"notebooks/settimana_{week}.ipynb#scrollTo=script-{script_index}")


def _source_lines(text):
    lines = text.split("\n")
    return [l + "\n" for l in lines[:-1]] + [lines[-1]]


def _cell(cell_type, cell_id, text):
    cell = {"cell_type": cell_type, "id": cell_id, "metadata": {"id": cell_id},
            "source": _source_lines(text)}
    if cell_type == "code":
        cell["execution_count"] = None
        cell["outputs"] = []
    return cell


def render_notebook(week, markdown, site_url):
    """The notebook text for a week page (deterministic, so --check can diff it)."""
    number = int(week)
    page_url = f"{site_url.rstrip('/')}/settimana_{week}/"
    title = page_title(markdown) or f"Settimana {number}"
    scripts = extract_scripts(markdown)

    intro = (
        f"# {title}\n"
        "\n"
        f"Questo è il notebook della Settimana {number} del corso di Probabilità e Statistica. "
        f"Contiene gli script Python della [dispensa della settimana]({page_url}), "
        "nello stesso ordine in cui compaiono: ogni script è una cella di codice, "
        "preceduta dal titolo della sezione in cui si trova. Le spiegazioni restano nella dispensa.\n"
        "\n"
        "Per eseguire una cella, premi il pulsante ▶ alla sua sinistra. Gli script sono "
        "indipendenti l'uno dall'altro, quindi puoi eseguirli in qualsiasi ordine e modificarli "
        "liberamente. Colab non salva le modifiche nel notebook originale: se vuoi conservarle, "
        "scegli *File → Salva una copia in Drive*."
    )
    cells = [_cell("markdown", "intro", intro)]
    for k, script in enumerate(scripts, start=1):
        link = page_url + (f"#{script.anchor}" if script.anchor else "")
        cells.append(_cell("markdown", f"script-{k}",
                           f"## {script.title}\n\n[Leggi la spiegazione nella dispensa]({link})"))
        cells.append(_cell("code", f"script-{k}-codice", script.code))

    notebook = {
        "nbformat": 4,
        "nbformat_minor": 5,
        "metadata": {
            "colab": {"name": f"settimana_{week}.ipynb", "provenance": []},
            "kernelspec": {"name": "python3", "display_name": "Python 3"},
            "language_info": {"name": "python"},
        },
        "cells": cells,
    }
    return json.dumps(notebook, ensure_ascii=False, indent=1) + "\n"


def notebook_code_cells(path):
    """Code cell sources of an existing notebook, to compare with a page's scripts."""
    nb = json.loads(path.read_text(encoding="utf-8"))
    return ["".join(c["source"]) for c in nb["cells"] if c["cell_type"] == "code"]


def _site_url():
    m = re.search(r"^site_url:\s*(\S+)", (REPO_ROOT / "mkdocs.yml").read_text(encoding="utf-8"), re.M)
    if not m:
        sys.exit("site_url non trovato in mkdocs.yml")
    return m.group(1)


def main():
    check = "--check" in sys.argv[1:]
    site_url = _site_url()
    NOTEBOOKS_DIR.mkdir(exist_ok=True)
    stale = []
    for page in sorted(DOCS_DIR.glob("settimana_*/index.md")):
        week = WEEK_PAGE_RE.search(page.as_posix()).group(1)
        markdown = page.read_text(encoding="utf-8")
        if not extract_scripts(markdown):
            continue
        text = render_notebook(week, markdown, site_url)
        target = notebook_path(week)
        current = target.read_text(encoding="utf-8") if target.exists() else None
        if current == text:
            print(f"ok          {target.relative_to(REPO_ROOT)}")
        elif check:
            stale.append(target)
            print(f"da rigenerare {target.relative_to(REPO_ROOT)}")
        else:
            target.write_text(text, encoding="utf-8")
            print(f"scritto     {target.relative_to(REPO_ROOT)} ({len(extract_scripts(markdown))} script)")
    if stale:
        print("\nEsegui: python scripts/build_notebooks.py")
        sys.exit(1)


if __name__ == "__main__":
    main()
