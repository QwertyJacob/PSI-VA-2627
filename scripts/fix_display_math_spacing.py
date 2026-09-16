#!/usr/bin/env python3
"""
Ensure every display-math block ($$ ... $$) is separated from surrounding prose
by a blank line.

Why this is needed: the notebooks frequently write

    ...essa è data da
    $$ F(x) = P(X \\leq x) $$

with no blank line between. Python-Markdown then treats the $$...$$ as part of
the *same paragraph*, so Arithmatex's block processor never sees it and the
inline processor handles it instead — which renders the inner formula but leaves
a stray literal "$" on each side, visible to students as  $F(x)=P(X≤x)$ .

Inserting a blank line makes it a real display block. Idempotent: running it
twice changes nothing.

Usage:  .venv/bin/python scripts/fix_display_math_spacing.py [--check]
"""
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"

FENCE_RE = re.compile(r"^\s*(```|~~~)")
# A line that opens or closes a $$ display block (either both on one line, or one delimiter alone)
BOTH_RE = re.compile(r"^\s*\$\$.*\$\$\s*$")
OPEN_RE = re.compile(r"^\s*\$\$\s*$")


def fix_lines(lines: list[str]) -> list[str]:
    # First pass: normalize lines so opening/closing $$ of multiline blocks are on their own lines
    normalized: list[str] = []
    in_fence = False
    for line in lines:
        if FENCE_RE.match(line):
            in_fence = not in_fence
            normalized.append(line)
            continue
        if in_fence:
            normalized.append(line)
            continue
        s = line.strip()
        if s.startswith(">"):
            # Blockquote lines are left alone: splitting the closing $$ of
            # "> $$ ... $$" onto its own (un-quoted) line would push it outside
            # the quote and break the formula.
            normalized.append(line)
            continue
        if s.startswith("$$") and s.endswith("$$") and len(s) > 2:
            normalized.append(line)
        elif s.startswith("$$") and not s.endswith("$$"):
            indent = line[:len(line) - len(line.lstrip())]
            normalized.append(indent + "$$")
            rest = s[2:].strip()
            if rest:
                normalized.append(indent + rest)
        elif not s.startswith("$$") and s.endswith("$$") and len(s) > 2:
            indent = line[:len(line) - len(line.lstrip())]
            rest = s[:-2].strip()
            if rest:
                normalized.append(indent + rest)
            normalized.append(indent + "$$")
        else:
            normalized.append(line)

    out: list[str] = []
    in_fence = False
    in_display_math = False
    i = 0
    while i < len(normalized):
        line = normalized[i]
        if FENCE_RE.match(line):
            in_fence = not in_fence
            out.append(line)
            i += 1
            continue
        if in_fence:
            out.append(line)
            i += 1
            continue
        s = line.strip()
        if BOTH_RE.match(line):
            if out and out[-1].strip() != "":
                out.append("")
            out.append(line)
            if i + 1 < len(normalized) and normalized[i + 1].strip() != "":
                out.append("")
            i += 1
            continue
        if OPEN_RE.match(line):
            if not in_display_math:
                if out and out[-1].strip() != "":
                    out.append("")
                out.append(line)
                in_display_math = True
            else:
                while out and out[-1].strip() == "":
                    out.pop()
                out.append(line)
                in_display_math = False
                if i + 1 < len(normalized) and normalized[i + 1].strip() != "":
                    out.append("")
            i += 1
            continue
        if in_display_math and s == "":
            i += 1
            continue
        out.append(line)
        i += 1
    return out


def main() -> int:
    check_only = "--check" in sys.argv
    changed = []
    for path in sorted(DOCS.rglob("*.md")):
        original = path.read_text(encoding="utf-8").split("\n")
        fixed = fix_lines(original)
        if fixed != original:
            changed.append((path, sum(1 for a, b in zip(original, fixed) if a != b)))
            if not check_only:
                path.write_text("\n".join(fixed), encoding="utf-8")

    for path, _ in changed:
        print(("would fix " if check_only else "fixed     ") + str(path.relative_to(DOCS.parent)))
    print(f"\n{len(changed)} file(s) {'need fixing' if check_only else 'fixed'}.")
    return 1 if (check_only and changed) else 0


if __name__ == "__main__":
    raise SystemExit(main())
