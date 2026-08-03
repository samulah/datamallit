# Full SEO Audit — datamalli.fi

**Audit date:** 2026-07-04
**Audited host:** https://www.datamalli.fi/ (apex `datamalli.fi` 301→ `www`)
**Pages analysed:** 15 indexable (sitemap) + 11 in-progress (noindex) verified
**Method:** Live crawl (curl/HTTP), source cross-check, JSON-LD validation, lab performance
**Score trajectory:** 75 (2026-06-16) → 85 (2026-06-17) → 93 (2026-06-21) → **91 (2026-07-04)**
**Tooling note:** No Google Search Console / CrUX / DataForSEO credentials — no field CWV, SERP-position, or backlink data. Playwright screenshots unavailable in this environment (missing system libraries). Performance figures are lab/transfer-based.

---

## Executive Summary

**SEO Health Score: 91 / 100 — Excellent (↓2 from 93)**

The site remains technically exemplary, but two things pulled the score down since 2026-06-21:

1. **A genuine performance regression:** the newly published `avaimet-ja-relaatiot.html` (and `litistaminen.html`) load **mermaid.min.js from cdn.jsdelivr.net synchronously in `<head>` — 929 KB on the wire, render-blocking**. Every other script on the site is `defer`. This is the single biggest issue found and the only High-severity item.
2. **llms.txt has drifted further out of sync:** the `arkkitehtuurivalinta.html` inconsistency flagged as M1 on 2026-06-21 is **still unfixed**, and the newly published `avaimet-ja-relaatiot.html` is **missing** from llms.txt.

**Business type:** Niche knowledge / publisher (single-author expert content). Unchanged.

### Category scores

| Category | Weight | Score | Δ vs 06-21 | Notes |
|----------|:------:|:-----:|:----------:|-------|
| Technical SEO | 22% | 96 | −1 | Still near-perfect; unpublish of tahtimalli-esimerkit used noindex, not 301 |
| Content Quality | 23% | 87 | −1 | Strong new page; thin pages from L2 still unaddressed |
| On-Page SEO | 20% | 94 | +1 | Only 1 over-length title left; per-page OG images progressing |
| Schema / Structured Data | 10% | 95 | ±0 | New page got full schema treatment; SearchAction still missing |
| Performance (CWV, lab) | 10% | 78 | −14 | 929 KB render-blocking mermaid in head on 2 pages; fonts uncached |
| AI Search Readiness | 10% | 88 | −6 | llms.txt stale in both directions |
| Images | 5% | 96 | ±0 | 100% alt coverage; 2 pages now have custom OG images |
| **Weighted total** | | **91** | **−2** | |

### Top issues
1. **(High)** Render-blocking 929 KB mermaid.min.js in `<head>` of `avaimet-ja-relaatiot.html` and `litistaminen.html`.
2. **(Medium, carried over)** `arkkitehtuurivalinta.html` still listed in llms.txt while noindex + absent from sitemap — second audit in a row.
3. **(Medium)** `avaimet-ja-relaatiot.html` missing from llms.txt despite being published and in the sitemap.
4. **(Medium)** Sitemap `lastmod` for avaimet-ja-relaatiot is `2026-06-26` but the page's JSON-LD `dateModified` is `2026-07-04`.
5. **(Medium)** `fontit/*.woff2` served with **no Cache-Control header** (every other asset gets 7-day cache); body font still not preloaded.

### Top quick wins
1. Add `defer` to the mermaid `<script>` (and wrap `mermaid.initialize` in `DOMContentLoaded`) — or pre-render the diagrams to SVG at build time. — *~15 min, biggest single gain*
2. Sync llms.txt: remove arkkitehtuurivalinta, add avaimet-ja-relaatiot. — *5 min*
3. Bump avaimet-ja-relaatiot `<lastmod>` to 2026-07-04. — *1 min*
4. Add Cache-Control for `/fontit/` + preload the body font. — *10 min*
5. Decide the fate of `tahtimalli-esimerkit.html` (was indexable on 06-21, now noindex): 301 it to tahtimalli.html or republish; remove it from search-index.js meanwhile. — *10 min*

---

## Technical SEO — 96/100

**Crawlability & indexability — all verified clean**
- Apex→www and http→https: single 301 hops. `/index.html` returns 200 but canonicalises to `/` (fine). Uppercase paths and unknown URLs return true 404s. ✔
- Canonicals: all 15 indexable pages self-canonicalise correctly to the exact `www` URL. ✔
- noindex hygiene: 11/11 in-progress pages (`arkkitehtuurivalinta`, `data-contract`, `data-governance`, `data-vault`, `etl-elt`, `header-detail`, `medallion`, `sivupohja`, `surrogaattiavaimet`, `tahtimalli-esimerkit`, `useampi-fakta`) verified `noindex(,nofollow)` and absent from sitemap. ✔
- **Internal links do not depend on JavaScript.** Every page carries 9–13 real `<a href>` links in the static markup (header topic nav + in-content links); navigation.js and kortit.js only enhance. Verified with scripts stripped. ✔ *(New check this run — passes.)*
- `<html lang="fi">`, viewport meta, single H1 on all pages. ✔

**Security & delivery — unchanged, production-grade**
- HSTS `max-age=31536000; includeSubDomains; preload`, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all present. HTTP/2 + h3/QUIC. Brotli on HTML/CSS/JS. LiteSpeed. ✔

**Findings**
- **tahtimalli-esimerkit.html was indexable on 2026-06-21 (2,139 words) and is now `noindex,nofollow`.** It still returns 200 and is still listed in `search-index.js`, so on-site search leads visitors to an unpublished page. If its content was superseded by the expanded tahtimalli.html, a 301 would preserve any equity the URL earned while indexed; if it returns later, this is fine as a temporary state — but clean up search-index.js either way. *(Medium)*
- Third-party runtime dependency added: cdn.jsdelivr.net (mermaid). CSP already allows it; availability of two published pages' diagrams now depends on an external CDN. *(Low — see Performance)*

---

## Content Quality — 87/100

**E-E-A-T: unchanged, very strong** — visible byline ("Kirjoittanut Samu Lahdenperä · Julkaistu · Päivitetty") on every article, author page with credential schema, sameAs to LinkedIn/dataneuvos.fi, original practitioner content in an underserved Finnish niche.

**Word counts (visible text in raw HTML, scripts/JSON-LD excluded — NOT comparable to the 06-21 table, which used a different method)**

| Page | Words | |
|------|------:|---|
| termisto.html | 4,931 | Glossary, 139 terms — exceptional |
| faktataulu.html | 1,359 | |
| apuohjelmat.html | 1,338 | |
| **avaimet-ja-relaatiot.html** | **1,329** | **New page — substantial, well-structured** |
| dimensiot.html | 1,313 | |
| ai-valmis-metadata.html | 849 | |
| tahtimalli.html | 830 | Expanded since 06-21 (new Q&A-form h2 sections) |
| kirjallisuus-suositukset.html | 656 | |
| nimeamiskaytannot.html | 535 | |
| index.html | 524 | Hub page — fine |
| litistaminen.html | 468 | |
| lumihiutalemalli.html | 363 | Thin for a topic page *(L2 open)* |
| tietoa.html | 286 | About — fine |
| tietosuoja.html | 192 | Privacy — fine |
| kehittamisen-filosofia.html | 121 | Card-format principles; thinnest indexable page *(L2 open)* |

- **New page quality:** avaimet-ja-relaatiot.html is a proper article — full TechArticle schema, breadcrumbs, diagrams, 11 in-content internal links. Good publish.
- **Thin content (carried over):** `kehittamisen-filosofia.html` and `lumihiutalemalli.html` were flagged 06-21 (L2) and remain the two thinnest topic pages. The filosofia page is intentionally card-formatted — consider a short prose intro per principle to give crawlers/AI something citable. *(Low)*
- No duplication or cannibalisation observed; tahtimalli.html's new question-form h2s ("Miten tähtimalli rakentuu ja toimii?" etc.) are good for AI-citation and People-Also-Ask-style matching.

---

## On-Page SEO — 94/100

- **Titles:** all present, unique, brand-suffixed, 32–68 chars. Only `termisto.html` (68) still exceeds ~60. The 06-21 offender tahtimalli-esimerkit is now noindex (moot). *(Low)*
- **Meta descriptions:** all 15 present, 137–154 chars — optimal. ✔
- **Headings:** exactly one h1 per page; logical h2 structure; question-form h2s on updated pages. ✔
- **Open Graph:** complete everywhere; `apuohjelmat` and `termisto` now have **custom OG images** (L5 progressing); remaining articles share og-datamalli.png. ✔
- **Internal linking:** index.html links to 13 pages; every article carries the static topic nav + in-content links; "Katso myös" cards (kortit.js) add related-content paths client-side. Hub-and-spoke intact.

---

## Schema / Structured Data — 95/100

All JSON-LD on all 15 indexable pages parses and validates. Entity graph (`#organization`, `#samu-lahdenpera`, `#website`) resolves correctly from every author/publisher reference.

- **avaimet-ja-relaatiot.html got the full treatment:** TechArticle + BreadcrumbList, `datePublished`/`dateModified` = 2026-07-04, correct author/publisher `@id` refs. Publish checklist followed. ✔
- DefinedTermSet on termisto.html: 139 terms, valid. ✔
- No future dates, no parse errors anywhere. Draft pages without schema are all noindex (correct). `sivupohja.html` template placeholders (`VVVV-KK-PP`) are noindex — harmless. ✔

**Open items**
- `WebSite` node still lacks `potentialAction`/`SearchAction` despite on-site search *(L3 from 06-21, open — Low)*.
- `ai-valmis-metadata.html`: schema `headline` ("AI-valmis metadata") differs from h1 ("Mitä AI-valmis metadata tarkoittaa?") — align for consistency *(Info)*.
- index.html WebSite/Organization carry no `dateModified`, so the homepage sitemap lastmod can't be cross-validated *(Info)*.

---

## Performance (Core Web Vitals — lab/transfer) — 78/100 (↓14)

| Metric | Value |
|--------|-------|
| TTFB (median of 3) | ~97 ms (index), ~100 ms (avaimet-ja-relaatiot) |
| HTML wire size | 21.9 KB (index), 26.1 KB (avaimet) |
| style.css / navigation.js / kortit.js wire | 3.7 / 5.9 / 2.1 KB (Brotli) ✔ |
| search-index.js wire | 11.8 KB (defer) ✔ |
| **mermaid.min.js wire** | **929 KB — synchronous, in `<head>`, no defer/async** ✖ |
| Body font (source-serif-4 woff2) | 122 KB, **no Cache-Control header**, not preloaded ✖ |
| Protocol / compression | HTTP/2 (+h3 advertised) / Brotli ✔ |
| Static asset caching | 7-day `max-age` on css/js/images ✔ (fonts excluded ✖) |

**The regression:** `avaimet-ja-relaatiot.html` and `litistaminen.html` load mermaid@11 from jsdelivr in `<head>` with no `defer`/`async`, immediately followed by an inline `mermaid.initialize({...})`. The browser must download and parse ~929 KB (multi-MB uncompressed) of third-party JS before first render. On fast connections this is masked; on mobile/3G it will directly damage LCP on exactly the page published to attract new visitors. *(High)*

**Fix options (pick one):**
1. *Minimal:* `defer` the CDN script and move `mermaid.initialize(...)` into a `DOMContentLoaded` handler (or a second deferred script — defer preserves order). Diagrams pop in after paint; text renders immediately.
2. *Better for a static site:* pre-render the diagrams to SVG at build time (`mmdc` / mermaid-cli) and drop the runtime entirely — also removes the jsdelivr dependency and makes diagrams visible to non-JS crawlers.

**Other findings**
- `/fontit/*.woff2` responses carry **no Cache-Control** — repeat visitors re-fetch/revalidate 122 KB+. Add the same 7-day (or longer, immutable) policy the other assets have. *(Medium)*
- Body font still not preloaded (L4 from 06-21, open). One `<link rel="preload" as="font" ...>` for the serif face. *(Low)*
- JS-injected nav/cards: no meaningful CLS risk observed in source (cards append below content; nav enhances existing markup). Field data would confirm — still no CrUX access.

---

## Images — 96/100

- Alt coverage: 9/9 images on indexable pages have non-empty alt — 100%. ✔
- OG images: valid 1200×630; `og-apuohjelmat.png` and `og-termisto.png` now page-specific (L5 progressing); articles otherwise share `og-datamalli.png`. Remaining opportunity: custom OG for the top articles (tahtimalli, avaimet-ja-relaatiot). *(Low)*
- All images same-origin, CSP-constrained. ✔

---

## AI Search Readiness (GEO) — 88/100 (↓6)

- AI crawler access verified live: GPTBot, ClaudeBot, PerplexityBot user-agents all receive 200 (no UA-level blocks; robots.txt allows all). ✔
- Primary content is fully present in raw HTML — headings, definitions, tables, and the static topic nav all render without JS. Mermaid diagram *source text* is present in `div.mermaid` (readable as text). ✔
- Strong citability: question-form h2s, definition-first paragraphs, 139-term DefinedTermSet, named expert author with consistent entity graph, CC BY 4.0. ✔

**llms.txt has drifted — this is now the pattern to fix, not the instance** *(Medium)*
- `arkkitehtuurivalinta.html` still listed as a content page while noindex + outside the sitemap — **flagged 2026-06-21 (M1), still open.**
- `avaimet-ja-relaatiot.html` published 2026-06-26/07-04 but **absent from llms.txt** — AI crawlers following llms.txt won't discover the newest content.
- Recommendation: add llms.txt to the publish checklist (the same one that covers noindex removal + sitemap + TechArticle), so it can't drift again.

---

## What I could not assess (unchanged gaps)

- **Field Core Web Vitals** (CrUX), **indexation status** (GSC), **backlinks**, **live SERP positions** — no credentials/API access.
- **Rendered screenshots** — Playwright present but Chromium cannot launch (missing `libnspr4`/`libnss3` system libraries, no sudo). Visual findings are source-based.

Connecting Search Console + PageSpeed Insights (free) remains the highest-value tooling upgrade, and would show whether the mermaid regression is visible in real-user LCP.

---

*Companion file: `ACTION-PLAN.md` (prioritised).*
