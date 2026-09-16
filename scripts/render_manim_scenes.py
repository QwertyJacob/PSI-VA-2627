#!/usr/bin/env python3
"""
One-time re-render of the manim animations referenced by the source notebooks
(their rendered videos were never committed to colab_handouts_PSI — media/ is
gitignored there — so this reconstructs them from the notebooks' own source).

NOT YET RUNNABLE on this machine: manim needs `pycairo`/`PyGObject`-style native
deps (cairo, pango *development* headers, not just the runtime libraries), and
installing `libcairo2-dev libpango1.0-dev` requires sudo, which this session
can't do non-interactively. Once you've run that apt command yourself:

    sudo apt-get install -y libcairo2-dev libpango1.0-dev pkg-config
    uv pip install --python .venv-manim manim==0.19.0

...this script should work as-is. Until then, the site ships with the approved
fallback: each animation's source stays visible in a collapsed note with a
Colab link, instead of a video (see extract_notebooks.py's manim handling).

Usage: .venv-manim/bin/python scripts/render_manim_scenes.py
"""
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from extract_notebooks import MANIM_SCENES, SRC_DIR, REPO_ROOT, cell_source, load_notebook  # noqa: E402

VIDEO_DIR = REPO_ROOT / "docs" / "assets" / "video"
MAGIC_LINE_RE = re.compile(r"^\s*[%!]")


def strip_magics(source: str) -> str:
    return "\n".join(line for line in source.split("\n") if not MAGIC_LINE_RE.match(line))


def build_combined_script(notebook_name: str) -> str:
    """Concatenate all code cells in order (imports/setup + scene classes),
    mirroring real notebook execution — some scenes reference module-level
    variables defined in earlier cells (e.g. shared Ellipse/Circle objects)."""
    nb = load_notebook(SRC_DIR / notebook_name)
    chunks = []
    for cell in nb["cells"]:
        if cell["cell_type"] != "code":
            continue
        src = strip_magics(cell_source(cell)).strip()
        if src:
            chunks.append(src)
    return "\n\n".join(chunks)


def render_scene(script_path: Path, scene_name: str, media_dir: Path) -> Path | None:
    result = subprocess.run(
        ["manim", "-qm", "--media_dir", str(media_dir), str(script_path), scene_name],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(f"    FAILED: {result.stderr[-2000:]}")
        return None
    matches = list(media_dir.rglob(f"{scene_name}.mp4"))
    return matches[0] if matches else None


def main():
    if shutil.which("manim") is None:
        print("manim not found on PATH — install it first (see module docstring). Aborting.")
        sys.exit(1)

    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    failures = []

    for notebook_name, scenes in MANIM_SCENES.items():
        print(f"=== {notebook_name} ({len(scenes)} scene(s)) ===")
        combined = build_combined_script(notebook_name)
        with tempfile.TemporaryDirectory() as tmp:
            script_path = Path(tmp) / "scene.py"
            script_path.write_text(combined, encoding="utf-8")
            media_dir = Path(tmp) / "media"

            for scene_name in scenes:
                video_key = f"{Path(notebook_name).stem}__{scene_name}"
                dest = VIDEO_DIR / f"{video_key}.mp4"
                print(f"  rendering {scene_name} -> {dest.relative_to(REPO_ROOT)}")
                raw = render_scene(script_path, scene_name, media_dir)
                if raw is None:
                    failures.append(video_key)
                    continue
                # Remux (no re-encode) so the video starts playing before fully
                # downloaded (moov atom at the front) — safe, lossless, fast.
                subprocess.run(
                    ["ffmpeg", "-y", "-i", str(raw), "-c", "copy", "-movflags", "+faststart", str(dest)],
                    capture_output=True, check=True,
                )

    if failures:
        print(f"\n{len(failures)} scene(s) failed to render: {failures}")
        print("These keep the collapsed-source-plus-Colab-link fallback already in the pages.")
        sys.exit(1)
    print(f"\nAll {sum(len(s) for s in MANIM_SCENES.values())} scenes rendered to {VIDEO_DIR}.")
    print("Next step: in the corresponding .md pages, replace each '??? note (Manim: ...)' "
          "fallback block with a <video controls src=\"...\"> tag pointing at the new file.")


if __name__ == "__main__":
    main()
