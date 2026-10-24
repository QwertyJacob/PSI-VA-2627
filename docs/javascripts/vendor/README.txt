three.js r186.1 — MIT (see three.LICENSE)
==========================================

Vendored so the site works without a third-party CDN and does not depend on
network availability at runtime.

Files
-----
- three.module.min.js — official jsDelivr minified ES module build.
- three.core.min.js  — its core chunk.
- three.LICENSE      — upstream MIT license.

Patch applied to three.module.min.js
------------------------------------
The official .min.js build imports "./three.core.js" (the unminified chunk).
Both import statements were rewritten to "./three.core.min.js" so that the
minified build stays self-contained inside this folder. Keep this in mind when
updating three.js: download both minified files, re-apply the rewrite, and bump
the version in this note.
