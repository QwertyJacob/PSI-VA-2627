"""
MkDocs hook: per-chapter PDF wiring.

Every content page (except the homepage) gets a stable PDF filename, exposed to
the theme as `page.meta.pdf_file` so `overrides/main.html` can render the
"Scarica il PDF" button. After the build, the full list is written to
`site/pdf/manifest.json`, which `scripts/build_pdfs.mjs` consumes to actually
render the PDFs with headless Chromium. Keeping the filename logic here means
the button and the generated file can never disagree.

Naming: `1-probabilita/1.2-assiomi.md` -> `pdf/1-probabilita-1.2-assiomi.pdf`,
        `1-probabilita/index.md`       -> `pdf/1-probabilita.pdf`
"""
import json
import os

# Pages that never get a PDF (source paths relative to docs/).
EXCLUDED_SRC = {"index.md"}

_manifest = []


def _pdf_slug(src_uri: str) -> str:
    stem = src_uri[:-3] if src_uri.endswith(".md") else src_uri
    if stem.endswith("/index"):
        stem = stem[: -len("/index")]
    return stem.replace("/", "-")


def on_page_context(context, page, config, nav):
    src = page.file.src_uri
    if src in EXCLUDED_SRC or not src.endswith(".md"):
        return context
    pdf_file = f"pdf/{_pdf_slug(src)}.pdf"
    page.meta["pdf_file"] = pdf_file
    # Running-header title: "1. Probabilità — 1.2 Assiomi della probabilità"
    # rather than the bare nav label (an intro page is just "Introduzione").
    title = page.title
    if page.parent is not None and page.parent.title:
        title = f"{page.parent.title} — {title}"
    _manifest.append(
        {
            "src": src,
            "url": page.url,
            "public_url": (config.get("site_url") or "") + page.url,
            "title": title,
            "pdf": pdf_file,
        }
    )
    return context


def on_post_build(config):
    out_dir = os.path.join(config["site_dir"], "pdf")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(
            {"site_name": config["site_name"], "pages": _manifest},
            fh, ensure_ascii=False, indent=2,
        )
    _manifest.clear()
