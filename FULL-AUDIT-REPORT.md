# SEO Audit Report: datamalli.fi
**Audit date:** 2026-06-17
**Audited URL:** https://datamalli.fi/ → https://www.datamalli.fi/ (301)
**Server:** LiteSpeed (HTTP/2 + HTTP/3)
**Language:** Finnish (fi)
**Business type:** Educational / Content Publisher — Finnish-language data-modelling guide (BI & data-warehouse niche)
**Method:** Local source review (static HTML repo) + live header/redirect verification via curl. CWV field data not available (no GSC/GA4).

---

## Overall SEO Health Score: 85/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 90/100 | 19.8 |
| Content Quality | 23% | 80/100 | 18.4 |
| On-Page SEO | 20% | 85/100 | 17.0 |
| Schema / Structured Data | 10% | 92/100 | 9.2 |
| Performance (CWV) | 10% | 85/100 | 8.5 |
| AI Search Readiness | 10% | 84/100 | 8.4 |
| Images | 5% | 70/100 | 3.5 |
| **Total** | **100%** | | **84.8 → 85** |

**Change since 2026-06-16 audit: 75 → 85 (+10).** The previous critical issue (all HTTP security headers missing) and the GDPR Google-Fonts dependency have both been resolved (see "Fixed since last audit" below).

---

## Executive Summary

Datamalli.fi is a well-built, niche Finnish educational site on data modelling (star/snowflake schema, dimensions, fact tables, naming conventions, AI-ready metadata, Power BI tooling). On-page SEO and structured data are genuinely excellent: every indexable page has a correct title, meta description, self-referencing canonical, OG tags, a single H1, and a rich JSON-LD `@graph` (TechArticle + BreadcrumbList, with author/publisher resolved by `@id`). Author E-E-A-T is strong — a dedicated `Person` entity with job title, employer, certifications, `alumniOf`, `knowsAbout`, and `sameAs` links.

Technically the site is now in very good shape: apex → www is a clean **301**, HSTS is set with `includeSubDomains; preload`, and the standard security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are present. Fonts are self-hosted (woff2). The draft/publishing strategy is sound: unfinished pages are `noindex,nofollow`, kept out of the sitemap, and crawlable so Google can read the noindex.

The single most impactful remaining issue is an **indexing/architecture inconsistency on `faktataulu.html`**: it is a finished, 1,300-word page with full TechArticle schema and is linked from both the main navigation and the homepage as a live card — yet it is `noindex,nofollow` and absent from the sitemap and llms.txt. It is either a complete page that was never finished being published, or a draft that shouldn't yet be in the primary nav. Secondary items are a very thin philosophy page, a missing CSP header, and a handful of schema/image enhancements.

### Top 5 Issues
1. **`faktataulu.html`: finished + prominently linked, but `noindex` and not in sitemap/llms.txt** (HIGH). A complete content asset earns zero organic visibility while occupying a main-nav slot.
2. **`kehittamisen-filosofia.html`: ~90–120 words** (MEDIUM). Indexed, in sitemap and main nav, but by far the thinnest page — thin-content risk.
3. **Content-Security-Policy header missing** (MEDIUM). 5 of 6 standard security headers are now present; CSP is the last one.
4. **`arkkitehtuurivalinta.html` missing from `llms.txt`** (LOW/MEDIUM). Published 2026-06-14, in sitemap and indexable, but not listed for AI crawlers.
5. **Borderline-thin topic pages** (LOW): `lumihiutalemalli.html` (~320 w) and `litistaminen.html` (~360 w).

### Top 5 Quick Wins
1. Decide `faktataulu.html`: publish it (remove noindex → add to sitemap + llms.txt) **or** pull it from main nav/homepage until ready. (15–30 min)
2. Add `arkkitehtuurivalinta.html` to `llms.txt` under `## Sisältösivut`. (5 min)
3. Add a report-only CSP header, then enforce once clean. (30–60 min)
4. Expand `kehittamisen-filosofia.html` to 600+ words. (2–3 h)
5. Add FAQPage schema to the question-based H2 pages (tahtimalli, dimensiot, faktataulu). (1–2 h)

---

## Fixed since last audit (2026-06-16 → 2026-06-17)

Verified against live headers and current source:

- ✅ **Security headers deployed** — live response now includes `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. (Was the previous CRITICAL.)
- ✅ **Google Fonts removed / self-hosted** — DM Sans + Source Serif 4 served from `/fontit/` via `@font-face`; no production page references `fonts.googleapis.com` (only the unused demo file `esimerkkityyli.css` still does). GDPR exposure resolved.
- ✅ **apex → www 301 confirmed live** — `https://datamalli.fi/` returns `HTTP/2 301` to `https://www.datamalli.fi/`.
- ✅ **`faktataulu.html` now `noindex,nofollow`** (was noindex-only) — though see HIGH finding below: the deeper question is whether it should be noindex at all.
- ✅ **`arkkitehtuurivalinta.html` deployed** — returns 200, indexable, and added to the sitemap (was 404 yesterday).

---

## Technical SEO — 90/100

### Live verification (curl, 2026-06-17)

| Check | Result |
|-------|--------|
| apex → www redirect | `HTTP/2 301` → `https://www.datamalli.fi/` ✅ |
| HSTS | `max-age=31536000; includeSubDomains; preload` ✅ |
| X-Frame-Options | `SAMEORIGIN` ✅ |
| X-Content-Type-Options | `nosniff` ✅ |
| Referrer-Policy | `strict-origin-when-cross-origin` ✅ |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` ✅ |
| Content-Security-Policy | ❌ Missing (only gap) |
| HTTP/2 | ✅ |
| HTTP/3 (QUIC) | ✅ advertised via `alt-svc` |

### robots.txt & sitemap
- `robots.txt`: `Allow: /` with sitemap reference. Deliberate strategy — crawling is allowed so Googlebot can read per-page `noindex` on drafts (a `Disallow` would hide the noindex). ✅
- `sitemap.xml`: 15 URLs, all `www.datamalli.fi`, all with `lastmod`, only production-ready pages. ✅ Now includes `arkkitehtuurivalinta.html`.

### Canonical & host strategy
- Every indexable page has a self-referencing canonical on `www.datamalli.fi`. Canonical host, sitemap, robots, OG URLs, and the 301 all agree on `www`. ✅

### Draft / noindex strategy
`noindex,nofollow` and excluded from the sitemap: `data-contract`, `data-governance`, `data-vault`, `etl-elt`, `header-detail`, `medallion`, `useampi-fakta`, `surrogaattiavaimet` (draft, published 06-15), plus the template `sivupohja.html`. These are not linked from the homepage as live cards (shown as "🚧 Tulossa") — correct gating. ✅

### Remaining gap
- **CSP missing.** Start in `Content-Security-Policy-Report-Only` mode given inline `<style>`/`<script>` blocks; tighten, then enforce. Self-hosted fonts mean no Google CDN needs allow-listing.

---

## Content Quality — 80/100

### Word counts (declared `wordCount` in schema; indexable pages)

| Page | Words | Status |
|------|-------|--------|
| arkkitehtuurivalinta.html | 2,200 | ✅ Excellent |
| tahtimalli-esimerkit.html | 1,330 | ✅ Strong |
| apuohjelmat.html | 1,280 | ✅ Strong |
| dimensiot.html | 1,150 | ✅ Strong |
| ai-valmis-metadata.html | 770 | ✅ Good |
| tahtimalli.html | 720 | ✅ Good |
| kirjallisuus-suositukset.html | 649 | ✅ Good |
| nimeamiskaytannot.html | 500 | ⚠ Acceptable |
| litistaminen.html | 360 | ⚠ Borderline |
| lumihiutalemalli.html | 320 | ⚠ Thin |
| kehittamisen-filosofia.html | 90 | ❌ Very thin |
| termisto.html | 130+ defined terms | ✅ Excellent (glossary) |
| tietoa.html | About + rich Person schema | ✅ (E-E-A-T anchor) |
| tietosuoja.html | privacy notice | ✅ (expected length) |
| faktataulu.html | 1,300 | ✅ Strong — but `noindex` (see HIGH) |

### E-E-A-T — strong
- **Author identity:** every TechArticle resolves `author` to `#samu-lahdenpera`; `tietoa.html` carries a full `Person` entity — `jobTitle`, `worksFor` (Datamalli Tiimi Oy / Dataneuvos), `sameAs` (LinkedIn, dataneuvos.fi), `image`, `alumniOf` (LUT), `knowsAbout`, and four `hasCredential` Microsoft certifications.
- **Trust:** privacy policy present; footer has email + phone; real company; CC BY 4.0 licence (open-knowledge signal).
- **Opportunity:** `tietoa.html` could be expanded to maximise author authority; consider an author photo/byline visible on content pages (schema has `image`, content does not surface it).

### Thin content
- **`kehittamisen-filosofia.html` (~90–120 words)** — six principles presented as cards with little prose. Genuine thin-content risk; expand each principle with rationale + a concrete BI example.
- **`lumihiutalemalli.html` (~320)** and **`litistaminen.html` (~360)** — focused topic pages; acceptable but would rank more robustly with a comparison table and worked example.

---

## On-Page SEO — 85/100

- **Titles:** present on every page, well within display limits; sentence-case and descriptive. `tahtimalli-esimerkit.html`'s title is on the long side (~77 chars) and may truncate in SERPs.
- **Meta descriptions:** present on every page, ~137–155 chars, keyword-relevant. ✅
- **Headings:** exactly one H1 per page (verified across all 25 HTML files); H2s are question-based ("Miten tähtimalli rakentuu?") — good for snippets and AI extraction. ✅
- **Internal linking:** strong — content pages cross-link (tahtimalli ↔ dimensiot ↔ litistaminen ↔ lumihiutale), use in-text term tooltips linking to `termisto.html#anchor`, and carry BreadcrumbList. A consistent main nav + footer is injected via `navigation.js`.

### Architecture inconsistency (HIGH)
**`faktataulu.html` is in the primary navigation (`navigation.js`) and on the homepage as a live `.kortti` card with a reading-time badge, yet it is `noindex,nofollow` and not in the sitemap or llms.txt.** It is a complete 1,300-word page with full TechArticle + BreadcrumbList schema and OG tags. This is contradictory: users are routed to it as published content, but search engines and AI crawlers are told to ignore it. Resolve one way or the other — recommended: publish it (it looks finished), per the project's three-step checklist (remove noindex → sitemap → schema; schema is already done).

---

## Schema & Structured Data — 92/100

Excellent coverage. Observed types:

| Page(s) | Schema |
|---------|--------|
| index.html | Organization (with `sameAs`) + WebSite, `@graph` |
| All TechArticle pages | TechArticle + BreadcrumbList; author/publisher by `@id`; `datePublished` + `dateModified`; `wordCount`; `inLanguage: fi` |
| termisto.html | DefinedTermSet |
| tietoa.html | AboutPage + Person (credentials, sameAs, knowsAbout, alumniOf) |
| kirjallisuus-suositukset.html | TechArticle + ItemList of 7 `Book` entities |
| tietosuoja.html | WebPage |

### Remaining opportunities
1. **FAQPage** — the question-based H2s on tahtimalli/dimensiot/faktataulu/lumihiutale are ready-made `Question`/`Answer` pairs; adding FAQPage can earn FAQ rich results and helps AI extraction.
2. **DefinedTerm** — individual terms inside `termisto.html`'s DefinedTermSet could each be a `DefinedTerm` item for finer-grained entity understanding.
3. **SearchAction** — homepage WebSite has an on-site search; an (optional) `potentialAction` SearchAction is a minor enhancement.

---

## Performance (CWV) — 85/100
*Lab/heuristic only — no CrUX field data (no GSC/GA4 access).*

- **TTFB:** excellent on LiteSpeed (prior measured 80–110 ms); HTTP/2 + HTTP/3. ✅
- **Fonts:** now self-hosted woff2 with `font-display: swap` and `unicode-range` splits (latin / latin-ext) — removes a third-party connection and improves CLS/LCP risk vs. the old Google CDN.
- **Render path:** single `style.css`; JS (`navigation.js`, `search*.js`) loaded `defer`. ✅
- **Page weight:** HTML mostly 5–33 KB; `termisto.html` ~197 KB (justified by volume). Largest assets are book-cover JPGs (~140–193 KB).
- **Watch:** the first-visit splash animation in `navigation.js` (1.9 s, once per session) renders before main content — verify it isn't delaying LCP on first session view. Consider `rel="preload"` for the above-the-fold woff2 files.

---

## Images — 70/100

- **Alt text:** all 8 `<img>` tags across the site have descriptive Finnish alt text; none missing. ✅
- **No oversized images:** largest is 193 KB (book cover). All reasonable. ✅
- **OG images:** per-key-page OG images exist and are referenced correctly (`og-datamalli`, `og-termisto`, `og-apuohjelmat`, `og-sekasikio`), 1200×630 with `og:image:alt`. ✅
- **Gaps:**
  - Format: all raster assets are JPG/PNG — converting diagrams/covers to **WebP/AVIF** would cut bytes ~25–50%.
  - Coverage: most indexed content pages are text/table-only. Topic diagrams (e.g. star-vs-snowflake on dimensiot/lumihiutale, an SCD diagram, a metadata diagram) would aid comprehension, dwell time, and image-search visibility.
  - Housekeeping: `kuvat/og-self-service.png` is orphaned (referenced by no page).

---

## AI Search Readiness (GEO) — 84/100

- **llms.txt:** present, CC BY 4.0, with a clear site summary and a curated `## Sisältösivut` list. Covers 11 content pages + Tietoa. **Missing only `arkkitehtuurivalinta.html`** (published 06-14). `faktataulu.html` is correctly absent while noindex.
- **Citability:** factual, well-structured, with specific quotable claims ("jopa 3× nopeampi"); a 130+ term glossary is a strong Finnish-language citation target; low competition in this language/niche.
- **Machine-readability:** TechArticle + `inLanguage: fi` + author `@id` graph make passages easy to attribute. Adding FAQPage (above) would further help AI answer extraction.
- **Brand/entity signals:** Organization `sameAs` (dataneuvos.fi + LinkedIn) and Person credentials give AI engines corroborating identity signals.

---

## Crawlability Summary

| Check | Status |
|-------|--------|
| robots.txt accessible & sane | ✅ |
| Sitemap valid, www-consistent, lastmod present | ✅ |
| Canonicals self-referencing & consistent | ✅ |
| apex → www 301 (verified live) | ✅ |
| Draft pages noindex + excluded from sitemap | ✅ |
| Security headers (5/6) | ✅ (CSP missing) |
| HSTS preload | ✅ |
| HTTP/2 + HTTP/3 | ✅ |
| Self-hosted fonts | ✅ |
| `faktataulu.html` published consistently | ❌ in nav/homepage but noindex + not in sitemap |
| `arkkitehtuurivalinta.html` in llms.txt | ❌ missing |

---

*Generated by /seo-audit. Live checks performed 2026-06-17 via curl; content checks from local static source (`/home/samu/data mallit`). For field-level CWV and indexation status, connect GSC/GA4 and re-run with the seo-google integration.*
