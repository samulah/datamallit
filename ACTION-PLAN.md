# SEO Action Plan — datamalli.fi

**Generated:** 2026-07-04
**Overall score:** 91/100 (↓ from 93 on 2026-06-21; trajectory 75 → 85 → 93 → 91)

The dip is caused by one real performance regression (mermaid) and llms.txt drift. Both are quick to fix; fixing H1 + M1–M3 should put the site above its previous peak.

---

## 🔴 Critical — none

## 🟠 High (fix this week)

### H1. Stop mermaid.min.js from blocking render
- **Problem:** `avaimet-ja-relaatiot.html` and `litistaminen.html` load `https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js` **synchronously in `<head>`** (929 KB wire, multi-MB parsed), followed by an inline `mermaid.initialize({...})`. First render waits for the whole download+parse — direct LCP damage on mobile, on the newest published page. All other site JS is correctly `defer`.
- **Fix (minimal, ~15 min):** add `defer` to the CDN script and move the `mermaid.initialize` call into a deferred script or `DOMContentLoaded` handler (defer preserves execution order, so a second deferred inline-file works).
- **Fix (better, static site):** pre-render diagrams to inline SVG with mermaid-cli (`mmdc`) at build time and remove the runtime + jsdelivr dependency entirely. Diagrams then also render for non-JS crawlers.
- **Effort:** 15 min (defer) / ~1 h (pre-render).

---

## 🟡 Medium (within ~1 month)

### M1. Sync llms.txt with the published set — and add it to the publish checklist
- **Problem (both directions):**
  - `arkkitehtuurivalinta.html` still listed while noindex + not in sitemap — **carried over unfixed from the 2026-06-21 plan.**
  - `avaimet-ja-relaatiot.html` published but missing from llms.txt — AI crawlers won't find the newest page.
- **Fix:** remove the arkkitehtuurivalinta line, add an avaimet-ja-relaatiot line under Sisältösivut. Then add "päivitä llms.txt" to the standing publish checklist (noindex pois + sitemap + TechArticle + **llms.txt**) so this can't drift a third time.
- **Effort:** 5 min.

### M2. Correct the avaimet-ja-relaatiot `<lastmod>`
- **Problem:** sitemap.xml says `2026-06-26`; the page's JSON-LD `dateModified` says `2026-07-04`.
- **Fix:** set `<lastmod>2026-07-04</lastmod>` in sitemap.xml.
- **Effort:** 1 min.

### M3. Cache and preload the fonts
- **Problem:** `/fontit/*.woff2` responses have **no Cache-Control header** (all other static assets get `public, max-age=604800`); repeat visitors re-fetch 122 KB+. Body font also still not preloaded (old L4).
- **Fix:** add the fonts directory to the server cache config (fonts are immutable — `max-age=31536000, immutable` is safe), and add `<link rel="preload" as="font" type="font/woff2" href="/fontit/source-serif-4-normal-latin.woff2" crossorigin>` to `<head>`.
- **Effort:** 10 min.

### M4. Decide the fate of tahtimalli-esimerkit.html
- **Problem:** it was indexable on 2026-06-21 (2,139 words, likely in Google's index), now `noindex,nofollow` but still 200 and **still listed in search-index.js**, so on-site search sends visitors to an unpublished page.
- **Fix:** if its content is superseded by the expanded tahtimalli.html → 301 it there (preserves indexed-era equity). If it's coming back → leave noindex, but remove it from `search-index.js` until republish.
- **Effort:** 10 min.

---

## 🟢 Low (backlog)

### L1. Trim the last over-length title
- `termisto.html` title is 68 chars. E.g. `Datan termistö – data-alan termit suomeksi | Datamalli.fi` (58).

### L2. Expand the two thinnest topic pages *(carried over)*
- `kehittamisen-filosofia.html` (121 visible words; card format) — a 1–2 sentence prose elaboration per principle would make the principles citable by AI/SERP snippets without changing the card design.
- `lumihiutalemalli.html` (363 visible words) — add a worked example or comparison table vs tähtimalli.

### L3. Add `SearchAction` to the WebSite schema *(carried over)*
- On-site search exists; `potentialAction` still absent from the WebSite node.

### L4. Custom OG images for the top articles
- `apuohjelmat` and `termisto` now have their own (good). Next candidates: `tahtimalli.html`, `avaimet-ja-relaatiot.html`. Scaffolding exists (`generate_og*.py`).

### L5. Align ai-valmis-metadata schema headline with its h1
- Schema `headline` "AI-valmis metadata" vs h1 "Mitä AI-valmis metadata tarkoittaa?".

---

## Recommended free data hookups (unchanged)
- **Google Search Console** — indexation status, impressions/clicks/CTR/position; would show whether the mermaid regression affects real-user LCP.
- **PageSpeed Insights / CrUX** — field Core Web Vitals.

---

## Verified clean this run (no action needed)
- Apex→www + http→https single 301s; true 404s (incl. case-sensitive paths); `/index.html` canonicalises to `/`.
- All 15 canonicals exact; 11/11 drafts noindex + out of sitemap; single h1 everywhere; descriptions all 137–154 chars.
- **Internal linking works without JavaScript** — 9–13 static `<a href>` links per page (new check, passes).
- Full security-header set (HSTS preload, CSP, XFO, XCTO, Referrer-Policy, Permissions-Policy); HTTP/2+h3; Brotli; 7-day cache on css/js/images.
- All JSON-LD valid; entity graph resolves; new page got full TechArticle+Breadcrumb treatment with correct dates; DefinedTermSet 139 terms.
- 100% image alt coverage; AI crawler UAs (GPTBot/ClaudeBot/PerplexityBot) all served 200.

## Resolved since 2026-06-21
- ✅ Old M2 (stale sitemap lastmod) — 13/15 lastmod values now match JSON-LD `dateModified` exactly (only the new page drifted → M2 above).
- ✅ Old L1 (tahtimalli-esimerkit 76-char title) — moot, page unpublished (see M4).
- ✅ Old L5 partially — per-page OG images shipped for apuohjelmat + termisto.
