#!/usr/bin/env python3
"""
Actually EXECUTE every non-manim code cell from every source notebook, in order,
within a shared per-notebook namespace (mirroring real notebook semantics: later
cells depend on names defined by earlier ones). This is what catches real bugs in
the source content (e.g. a stray `np.choice` instead of `np.random.choice`) before
any code-expansion agent builds new material on top of a cell that never actually ran.

Manim cells are intentionally skipped (no manim toolchain available locally right
now — see extract_notebooks.py's fallback handling) rather than reported as failures.

Run from the repo root: .venv/bin/python scripts/smoke_test_code_cells.py
"""
import contextlib
import io
import json
import re
import sys
import traceback
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from extract_notebooks import MANIFEST, MANIM_SCENES, SRC_DIR, cell_source, is_manim_source  # noqa: E402

MAGIC_LINE_RE = re.compile(r"^\s*[%!]")


def strip_magics(source: str) -> str:
    return "\n".join(line for line in source.split("\n") if not MAGIC_LINE_RE.match(line))


def run_notebook(notebook_name: str) -> list:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    nb = json.loads((SRC_DIR / notebook_name).read_text(encoding="utf-8"))
    scenes = MANIM_SCENES.get(notebook_name, [])
    namespace = {}
    failures = []

    for i, cell in enumerate(nb["cells"]):
        if cell["cell_type"] != "code":
            continue
        src = cell_source(cell)
        if not src.strip() or is_manim_source(src.strip(), scenes):
            continue
        cleaned = strip_magics(src)
        if not cleaned.strip():
            continue
        buf = io.StringIO()
        try:
            with contextlib.redirect_stdout(buf):
                exec(compile(cleaned, f"{notebook_name}:cell{i}", "exec"), namespace)
        except Exception:
            failures.append({
                "cell": i,
                "error": traceback.format_exc(limit=3),
                "source_preview": cleaned.strip().splitlines()[0][:100] if cleaned.strip() else "",
            })
    plt.close("all")
    return failures


def main():
    import os
    os.chdir(SRC_DIR)  # so relative paths like 'data/historical_c14.json' resolve as they would on Colab

    all_clean = True
    for notebook_name, _, _ in MANIFEST:
        failures = run_notebook(notebook_name)
        if failures:
            all_clean = False
            print(f"\n=== {notebook_name}: {len(failures)} cell(s) FAILED ===")
            for f in failures:
                print(f"  cell {f['cell']}: {f['source_preview']!r}")
                print("  " + f["error"].replace("\n", "\n  "))
        else:
            print(f"OK   {notebook_name}")

    print("\n" + ("All notebooks executed cleanly." if all_clean else "Some cells failed — see above."))
    sys.exit(0 if all_clean else 1)


if __name__ == "__main__":
    main()
