# Full SEO Audit — datamalli.fi

**Audit date:** 2026-06-21
**Audited host:** https://www.datamalli.fi/ (apex `datamalli.fi` 301→ `www`)
**Pages analysed:** 15 indexable (sitemap) + 11 in-progress (noindex) verified
**Method:** Live crawl (curl/HTTP), source cross-check, schema validation, lab performance
**Score trajectory:** 75 (2026-06-16) → 85 (2026-06-17) → **93 (2026-06-21)**
**Tooling note:** No Google Search Console / CrUX / DataForSEO credentials present — no field CWV, SERP-position, or backlink data in this run. Performance figures are lab/transfer-based.

---

## Executive Summary

**SEO Health Score: 93 / 100 — Excellent**

datamalli.fi is a technically exemplary, well-structured niche content site (Finnish-language data-modelling guide). It is one of the cleanest small sites I have audited: indexation hygiene, security headers, structured data, and performance are all near-textbook. The findings below are refinements, not repairs — there are **no critical or high-severity issues**.

**Business type:** Niche knowledge / publisher (single-author expert content). Not e-commerce, not local — so no GBP/product/marketplace analysis applies.

### Category scores

| Category | Weight | Score | Notes |
|----------|:------:|:-----:|-------|
| Technical SEO | 22% | 97 | HSTS preload, CSP, clean robots/sitemap, perfect noindex hygiene |
| Content Quality | 23% | 88 | Strong E-E-A-T; a few thin pages |
| On-Page SEO | 20% | 93 | All meta complete; 2 long titles |
| Schema / Structured Data | 10% | 95 | Valid entity graph, DefinedTermSet, TechArticle |
| Performance (CWV, lab) | 10% | 92 | ~95ms TTFB, Brotli, HTTP/2+h3, deferred JS |
| AI Search Readiness | 10% | 94 | llms.txt + semantic schema |
| Images | 5% | 96 | 100% alt coverage, proper OG images |
| **Weighted total** | | **93** | |

### Top strengths
1. **Indexation hygiene is exemplary.** Every in-progress page is `noindex,nofollow` *and* excluded from the sitemap; every sitemap URL is 200 + indexable. Clean separation, exactly as documented in the project's publishing convention.
2. **Security headers are production-grade.** HSTS with `preload`, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy — all present.
3. **Structured data is rich and correct.** Proper `@id` entity graph (Organization → founder → Person; TechArticle → author/publisher refs), `DefinedTermSet` glossary, `sameAs` to LinkedIn/dataneuvos.fi. All 15 pages' JSON-LD parses cleanly.
4. **Fast and lean.** ~95 ms TTFB, Brotli, HTTP/2 (+h3/QUIC), 7-day cache headers, all JS `defer`-loaded, self-hosted fonts with `font-display: swap`.
5. **AI/GEO-ready.** Detailed `llms.txt` (CC BY 4.0), citable structure, glossary terms.

### Top quick wins
1. Resolve the `arkkitehtuurivalinta.html` inconsistency (in llms.txt but `noindex` + not in sitemap). — *Medium*
2. Refresh `<lastmod>` dates in sitemap.xml (currently stale vs. actual edits). — *Medium*
3. Trim 2 over-length titles (`termisto` 68, `tahtimalli-esimerkit` 76 chars). — *Low*
4. Expand the 2 thinnest topic pages (`kehittamisen-filosofia` 393 w, `lumihiutalemalli` 459 w). — *Low*
5. Preload the primary body font for a marginal LCP gain. — *Low*

---

## Technical SEO — 97/100

**Crawlability & indexability**
- `robots.txt`: clean, `Allow: /`, sitemap referenced (correctly with `www` host). Comment explains the deliberate "crawl-allowed + per-page noindex" strategy. ✔
- Apex → www: `https://datamalli.fi/` issues a single `301` to `https://www.datamalli.fi/`. Canonical host is consistent everywhere. ✔
- Canonicals: all 15 indexable pages self-canonicalise to the `www` host — no host/protocol mismatch. ✔
- `noindex` hygiene: 11/11 in-progress pages (`arkkitehtuurivalinta`, `avaimet-ja-relaatiot`, `data-contract`, `data-governance`, `data-vault`, `etl-elt`, `medallion`, `surrogaattiavaimet`, `useampi-fakta`, `header-detail`) verified `noindex,nofollow` and absent from the sitemap. ✔
- 404 handling: unknown URLs return a true `404` (no soft-200). ✔
- `<html lang="fi">`, `<meta viewport>` present on all pages. ✔

**Security**
- HSTS: `max-age=31536000; includeSubDomains; preload` ✔
- CSP present and reasonably tight (`object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`, `upgrade-insecure-requests`). ✔
- X-Frame-Options `SAMEORIGIN`, X-Content-Type-Options `nosniff`, Referrer-Policy `strict-origin-when-cross-origin`, Permissions-Policy locking camera/mic/geolocation. ✔

**Delivery**
- HTTP/2 served, h3/QUIC advertised via `alt-svc`. ✔
- Brotli compression active (style.css 14,235 B → 3,106 B). ✔
- Static assets `Cache-Control: public, max-age=604800`. ✔
- Server: LiteSpeed.

**Minor**
- `sitemap.xml` `<lastmod>` values are stale: homepage shows `2026-06-07` but its `Last-Modified` header is `2026-06-20`; most pages were edited more recently than their listed `lastmod`. Stale lastmod undersells content freshness. *(Medium)*

---

## Content Quality — 88/100

**E-E-A-T: very strong for a single-author site**
- Named, credentialed author (Samu Lahdenperä, "Dataneuvos") with a dedicated `tietoa.html` author page carrying `AboutPage` + `Person` + `EducationalOccupationalCredential` + `CollegeOrUniversity` schema.
- Author `sameAs` LinkedIn (personal + company) and dataneuvos.fi — external identity validation.
- TechArticle author/publisher entity links on every topic page.
- Original, practitioner-focused Finnish content in an underserved niche (Power BI / SSAS data modelling in Finnish).

**Word counts (live, visible text)**

| Page | Words | |
|------|------:|---|
| termisto.html | 11,743 | Glossary — exceptional depth |
| tahtimalli-esimerkit.html | 2,139 | |
| apuohjelmat.html | 1,627 | |
| faktataulu.html | 1,490 | |
| dimensiot.html | 1,459 | |
| kirjallisuus-suositukset.html | 1,306 | |
| index.html | 1,280 | |
| ai-valmis-metadata.html | 944 | |
| tahtimalli.html | 898 | |
| nimeamiskaytannot.html | 626 | |
| litistaminen.html | 563 | |
| tietoa.html | 537 | About page — fine |
| lumihiutalemalli.html | 459 | A little thin for a topic page |
| kehittamisen-filosofia.html | 393 | Thinnest topic page |
| tietosuoja.html | 247 | Privacy policy — fine |

- **Thin content:** `kehittamisen-filosofia.html` (393 w) and `lumihiutalemalli.html` (459 w) are the only topic pages that read thin. Both are well-targeted but would benefit from a worked example, comparison table, or FAQ block. `tietosuoja`/`tietoa` short counts are expected for their page types. *(Low)*
- No duplicate-content or cannibalisation issues observed — each page targets a distinct concept.

---

## On-Page SEO — 93/100

- **Titles:** all 15 present, unique, brand-suffixed (`… | Datamalli.fi`). Lengths 32–76 chars.
  - Over ~60 chars (SERP truncation risk): `termisto.html` (68) and `tahtimalli-esimerkit.html` (76). *(Low)*
- **Meta descriptions:** all 15 present, 137–154 chars — squarely in the optimal range. ✔
- **Open Graph:** complete on every page (`og:type/title/description/url/image` + `og:image:width/height/alt`, `og:locale=fi_FI`, `og:site_name`). ✔
- **Twitter:** `summary_large_image` card present; no explicit `twitter:image` (falls back to `og:image` — acceptable, no action needed).
- **Headings:** exactly one `<h1>` per page; logical `<h2>` structure. ✔
- **Internal linking:** homepage links to all 15 indexable pages (hub-and-spoke); shared nav via `navigation.js`. Good for a site this size.

> Note: meta description and og:description tags are authored across two source lines (attribute on the following line). This is valid HTML and crawlers parse it fine — no action needed (flagged only because it can fool line-based tooling).

---

## Schema / Structured Data — 95/100

All JSON-LD validates (parses without error) across all 15 pages. Implementation quality is high:

| Page type | Types present |
|-----------|---------------|
| Home | `Organization` + `WebSite` + `Person` + `ImageObject` (`@graph`, fully `@id`-linked) |
| Topic articles | `TechArticle` + `BreadcrumbList` + `Person` (author) |
| Glossary | `DefinedTermSet` + `DefinedTerm` (+ Org/Person) |
| Author page | `AboutPage` + `Person` + `CollegeOrUniversity` + `EducationalOccupationalCredential` |
| Book list | `Book` + `ItemList` + `TechArticle` |
| Privacy | `WebPage` |

- TechArticle carries `headline`, `datePublished`, `dateModified`, `author` (Person `@id` + author-page URL), `publisher` (Org `@id`), `image`, `inLanguage`, `mainEntityOfPage`. ✔
- Entity reuse via `@id` (e.g. `#organization`, `#samu-lahdenpera`) is correct and consistent. ✔

**Opportunities**
- `WebSite` has no `potentialAction` / `SearchAction` despite on-site search existing. Adding it enables sitelinks-searchbox eligibility. *(Low)*
- Consider `FAQPage` on pages that already pose/answer questions (e.g. tähtimalli, dimensiot) for additional SERP real estate. *(Low)*

---

## Performance (Core Web Vitals — lab/transfer) — 92/100

| Metric | Value |
|--------|-------|
| TTFB (warm) | ~93–96 ms |
| Total homepage transfer | 23.4 KB HTML |
| Critical-path weight (HTML+CSS+JS+2 fonts) | ~270 KB (185 KB = fonts) |
| HTML+CSS+JS only | ~92 KB uncompressed (Brotli on the wire) |
| Protocol | HTTP/2 (+ h3/QUIC advertised) |
| Compression | Brotli ✔ |
| Render-blocking | 1 stylesheet (14 KB); all JS `defer` ✔ |
| Fonts | self-hosted woff2, `font-display: swap` (no CLS) ✔ |

- Lab signals point to strong LCP/CLS/INP: tiny HTML, fast TTFB, no blocking JS, swap fonts, no third-party scripts (CSP forbids them beyond jsdelivr).
- **No field (CrUX) data available** this run — connect Search Console / PageSpeed Insights to confirm real-user CWV.

**Opportunities**
- Preload the primary body font (`source-serif-4-normal-latin.woff2`, 122 KB) to shave first-paint of body text. *(Low)*
- `search-index.js` is 32 KB — fine while `defer`-loaded; revisit only if it grows.

---

## Images — 96/100

- **Alt coverage: 100%.** Across every indexable page, 0 images missing alt and 0 empty alt (incl. the 7-image `kirjallisuus-suositukset` page). ✔
- OG image present and valid: `kuvat/og-datamalli.png`, 1200×630, 74 KB, returns 200. ✔
- Images served from same origin (CSP `img-src 'self' data:`).
- Minor: consider per-page OG images (currently one shared `og-datamalli.png` across articles) for stronger social/SERP differentiation. *(Low)*

---

## AI Search Readiness (GEO) — 94/100

- `llms.txt` present (200, text/plain, 2,973 B), CC BY 4.0 licensed, with a curated, described content index — strong signal for ChatGPT/Perplexity/AI Overviews. ✔
- Highly citable structure: clear H1/H2 hierarchy, definitional content, `DefinedTermSet` glossary (130+ terms), named expert author. ✔
- No third-party JS / paywall / cloaking — content is fully accessible to AI crawlers. ✔

**Inconsistency to fix**
- `llms.txt` lists **`arkkitehtuurivalinta.html`** as a content page, but that page is `noindex,nofollow` and is **not** in the sitemap. AI crawlers are being pointed to a page the site otherwise treats as unpublished. Either finish publishing it (remove noindex → add to sitemap → confirm TechArticle schema) or remove it from `llms.txt` until ready. *(Medium)*

---

## What I could not assess (data/credential gaps)

- **Field Core Web Vitals** (CrUX) and **indexation status** (GSC) — no Google API credentials.
- **Backlink profile / referring domains** — no Moz/Bing/DataForSEO access.
- **Live SERP positions / keyword volumes** — no DataForSEO.
- **Rendered visual / mobile screenshots** — Playwright not invoked this run.

Connecting Search Console + PageSpeed Insights (free) would upgrade the Performance and Indexation sections from lab/inference to field data.

---

*Companion file: `ACTION-PLAN.md` (prioritised).*
