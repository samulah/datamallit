# Full SEO Audit — datamalli.fi

**Audit date:** 2026-08-03
**Scope:** 29 live HTML pages (all reachable, all HTTP 200), robots.txt, sitemap.xml, llms.txt, static assets
**Method:** live crawl of every page in the repo + static analysis of the source repo. Repo and live site are byte-identical (md5 match on all 29 files) — no deployment drift.

---

## Executive Summary

### SEO Health Score: **83 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 82 | 18.0 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 80 | 16.0 |
| Schema / Structured Data | 10% | 95 | 9.5 |
| Performance (CWV, lab) | 10% | 88 | 8.8 |
| AI Search Readiness | 10% | 85 | 8.5 |
| Images | 5% | 85 | 4.3 |
| **Total** | | | **83.0** |

**Business type detected:** Niche technical publisher / expertise site (Finnish-language, single-author, data modelling & Power BI education). Not e-commerce, not local service — so no GBP, NAP, product schema or map-pack analysis applies. No local-SEO or e-commerce subagent scope was triggered.

This is a well-built site. The technical foundation is genuinely above average: correct canonicals on every published page, complete and valid structured data, brotli compression, sub-100 ms TTFB, a full security header set, and an `llms.txt` that most sites don't bother with. The weaknesses are concentrated in two places — a handful of published pages that are too thin to compete, and an internal link structure that spends its authority on the wrong pages.

### Top 5 critical / high-priority issues

0. **The entire source repository is deployed to the web server and publicly readable.** Not just HTML — build scripts, planning documents, Word sources and previous SEO audits are all served at HTTP 200. See "Repository exposure" below. This is the root cause of issue 1 as well.
1. **`sivupohja.html` (the page template) is live, crawlable, and canonicals to a 404.** Its `<link rel="canonical">` points at `https://www.datamalli.fi/SIVU.html`, which returns 404. It carries placeholder content (`OTSIKKO`, 31 words, a 6-character meta description). It is `noindex`, which limits the damage, but a self-referencing canonical to a non-existent URL is a genuine crawl-quality signal problem.
2. **`kehittamisen-filosofia.html` is indexed with 98 words of body copy** and zero h2/h3 headings — yet it sits in the main navigation on all 29 pages and in the sitemap. It is the thinnest published page on the site and the most internally linked.
3. **Internal linking is inverted.** The nav promotes 10 pages sitewide; the deepest content is not among them. `surrogaattiavaimet.html` (2,225 words) has 3 inbound links, `medallion.html` (1,593 words) has 2, `apuohjelmat.html` (1,315 words) has 2 — while the 98-word philosophy page has 27.
4. **Four published pages have meta descriptions over 160 characters** and will be truncated in SERPs (`arkkitehtuurivalinta` 188 — noindex so moot, `surrogaattiavaimet` 185, `tietomalli` 178, `tietosuoja` 174). One title exceeds 60 characters (`sekasikiomalli-vs-tahtimalli`, 72).
5. **Two published pages are missing from `llms.txt`** (`medallion.html`, `surrogaattiavaimet.html`) — the two newest and among the strongest pages on the site. AI crawlers using llms.txt as a manifest will not see them.

### Top 5 quick wins

1. Add `Disallow: /sivupohja.html` to robots.txt, or stop deploying the template. *(5 min)*
2. Add `medallion.html` and `surrogaattiavaimet.html` to `llms.txt`. *(5 min)*
3. Trim the four over-length meta descriptions to ≤155 characters. *(15 min)*
4. Shorten the `sekasikiomalli-vs-tahtimalli` title to ≤60 characters. *(5 min)*
5. Fix the `h1 → h3` heading skip in `kirjallisuus-suositukset.html`. *(5 min)*

---

## Technical SEO — 88/100

### Crawlability

| Check | Result |
|---|---|
| robots.txt | Present, valid, `Allow: /`, sitemap declared |
| Sitemap reachable | Yes — `https://www.datamalli.fi/sitemap.xml`, 20 URLs |
| Sitemap accuracy | All 20 URLs are published, indexable pages. No noindex pages leaked in. |
| Crawl blocks | None |
| Redirect chains | Apex → www, single 301 hop. No chains. |
| Pages returning non-200 | None (29/29 = 200) |
| Orphan pages | `paivitykset.html` and `index.html` have no static inbound links from content pages (paivitykset is linked from the nav bar's "Päivitetty" text, which is JS-injected by `navigation.js`) |

The robots.txt comment explaining *why* everything is allowed (so Google can read page-level `noindex`) is correct reasoning and worth keeping.

### Indexability

- 20 pages published, 8 intentionally `noindex` (drafts: `arkkitehtuurivalinta`, `data-contract`, `data-governance`, `data-vault`, `etl-elt`, `header-detail`, `intentiovelka`, `useampi-fakta`), 1 `noindex` template (`sivupohja`).
- **All 8 drafts are publicly reachable at HTTP 200.** They are correctly `noindex,nofollow`, so they will not be indexed — but they are readable by anyone, and by AI crawlers, which do not universally honour `noindex`. Several are visibly unfinished: `etl-elt.html` has **63 words**, `data-vault.html` has 280, `header-detail.html` has 277.
- Canonicals: correct and self-referencing on all 20 published pages. Homepage canonicals to `https://www.datamalli.fi/` (not `/index.html`) — correct.
- Draft pages have **no canonical tag at all** (`data-contract`, `data-governance`, `data-vault`, `etl-elt`, `header-detail`, `useampi-fakta`). Low impact while noindex, but inconsistent with the rest of the site.
- `lang="fi"` on every page. No hreflang — correct for a single-language site.

### Security

Excellent. Every header you'd want is present on both apex and www:

```
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: SAMEORIGIN
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
content-security-policy: default-src 'self'; ...
```

### Repository exposure — the most significant finding

**The whole repo is deployed, not just the site.** Everything in the working tree is served at HTTP 200:

| Path | Status | What it is |
|---|---|---|
| `/CLAUDE.md` | 200 | Internal authoring instructions and workflow rules |
| `/README.md` | 200 | Repo readme |
| `/julkaisusuunnitelma.md` | 200 | Publication schedule — reveals unpublished pages and timing |
| `/ACTION-PLAN.md`, `/FULL-AUDIT-REPORT.md` | 200 | **Previous SEO audits, including the site's own weaknesses** |
| `/seo-korjaussuunnitelma.md` | 200 | Earlier remediation plan (score 64/100 baseline) |
| `/julkaisusuositukset.md`, `/surrogaattiavaimet-analyysi.md` | 200 | Internal editorial analysis |
| `/generate_og.py`, `/_apply_tags.py`, `/tyokalut/rakenna.py` | 200 | Build scripts (source readable) |
| `/words/` | 200 | **Directory autoindex enabled** — full browsable listing of Word sources |

`/words/` returns a LiteSpeed autoindex page ("Index of /words/") with a sortable file table, so the Word source documents for every page — published and unpublished — can be enumerated and downloaded by anyone.

None of this is a credential leak: `.gitignore` correctly excludes `secrets.env`, `.env*`, `.htaccess`, `gsc tutkimus/` and `kirjoitukset/`, so secrets are not in the repo and therefore not on the server. The exposure is of internal working material, not access.

Still, three concrete consequences:

1. **Competitive/reputational.** Your own SEO audits — listing every weakness of the site — are publicly downloadable. So is the publication schedule for content that hasn't shipped.
2. **It explains `sivupohja.html`.** The template isn't live because of a mistake in the template; it's live because *everything* is live. Fixing the deployment boundary fixes that class of problem permanently rather than one file at a time.
3. **`robots.txt` says `Allow: /`**, so all of it is crawlable. The `.md` files are served as `application/octet-stream`, which means search engines are unlikely to index them as pages — but they are fetchable by anyone, including AI crawlers, which is exactly the audience that reads plain text well.

**Recommended fix:** define a deployment boundary rather than syncing the working tree. Either publish from a `public/` (or `dist/`) directory containing only site files, or add explicit server-side denies for `*.md`, `*.py`, `/words/`, `/tyokalut/`, `/raportit/` and `sivupohja.html`, and disable autoindex. The `.htaccess` file is already gitignored, so server config is being managed separately — that is the natural place for the denies.

### CSP

Two observations:
- `script-src` still allows `https://cdn.jsdelivr.net`, but Mermaid was removed from the browser in commit `907a661`. No page loads anything from jsdelivr any more — the allowance can be dropped.
- `script-src` includes `'unsafe-eval'`, which nothing on the site appears to need now that Mermaid is gone.

### Other

- **404 page is the LiteSpeed default** — unbranded, no navigation, no search. Users who hit a bad link have no path back into the site.
- **HTML responses carry no `Cache-Control` header** (CSS/JS do: `public, max-age=604800`). Browsers fall back to heuristic caching. Setting an explicit short max-age with revalidation would be cleaner.
- Asset versioning via query strings (`style.css?v=7`, `navigation.js?v=12`) is in place — good cache-busting discipline.

---

## Content Quality — 78/100

### E-E-A-T: strong

This is the site's biggest asset and it is handled unusually well.

- Named author on every article byline with published + modified dates.
- `Person` schema on `tietoa.html` with `jobTitle`, `worksFor` (Datamalli Tiimi Oy), `alumniOf` (LUT-yliopisto), `knowsAbout` (7 topics), `hasCredential` (Microsoft certifications), and `sameAs` pointing to LinkedIn and dataneuvos.fi.
- Content cites named sources with page numbers (e.g. "Ferrari ja Russo (2017, s.223)") — a real expertise signal, and exactly the kind of thing LLMs pick up as authority.
- A dedicated `kirjallisuus-suositukset.html` with `ItemList` schema.
- A public changelog (`paivitykset.html`) — a freshness and transparency signal most sites lack.

### Thin content — the main weakness

Published pages under 600 words:

| Page | Words | h2/h3 | Assessment |
|---|---:|---:|---|
| `kehittamisen-filosofia.html` | 98 | 0 | **Critical.** Six one-line principles, no prose, no subheadings. In the sitemap and in the sitewide nav. |
| `tietoa.html` | 268 | 5 | Acceptable — an about page is expected to be short. |
| `lumihiutalemalli.html` | 339 | 1 | **Thin for a core topic.** "Lumihiutalemalli" is a primary keyword and this page is a third the length of its star-schema counterpart. |
| `tietosuoja.html` | 481 | 8 | Fine — legal page. |
| `litistaminen.html` | 484 | 3 | Thin, but focused and structured. |
| `nimeamiskaytannot.html` | 516 | 1 | Under-structured — one subheading for 516 words. |

By contrast the site's strongest pages are substantial and well-structured: `termisto.html` (6,086 words, 157 terms), `surrogaattiavaimet.html` (2,225 words, 8 tables), `sekasikiomalli-vs-tahtimalli.html` (1,958), `medallion.html` (1,593, 8 lists), `faktataulu.html` (1,387).

The gap between the best and worst published pages is wide enough that the thin ones dilute the site's overall quality signal.

### Duplicate content

None detected. Titles and meta descriptions are unique across all 29 pages. No near-duplicate body content.

### Readability

Finnish technical prose, direct and opinionated, consistent with the documented "Dataneuvos" voice. Sentence length is moderate; terminology is linked to `termisto.html` throughout, which is good practice for a specialist audience.

---

## On-Page SEO — 80/100

### Titles

All 29 pages have a unique title. One exceeds the ~60-character SERP display limit:

| Page | Len | Title |
|---|---:|---|
| `sekasikiomalli-vs-tahtimalli.html` | 72 | Sekasikiömalli vs. tähtimalli: viisi Power BI -esimerkkiä \| Datamalli.fi |
| `tietomalli.html` | 61 | Tietomalli: mitä se on ja miten se rakennetaan \| Datamalli.fi |
| `index.html` | 60 | (at the limit) |

### Meta descriptions

All 29 pages have one. Length distribution is mostly healthy (130–160). Outliers:

| Page | Len | Issue |
|---|---:|---|
| `arkkitehtuurivalinta.html` | 188 | Truncated (noindex draft — fix before publishing) |
| `surrogaattiavaimet.html` | 185 | **Truncated, published** |
| `tietomalli.html` | 178 | **Truncated, published** |
| `tietosuoja.html` | 174 | Truncated, published (low value page) |
| `sivupohja.html` | 6 | Template placeholder |
| `paivitykset.html` | 83 | Short — leaves SERP real estate unused |

### Headings

- **Every page has exactly one `<h1>`.** No missing, no duplicates. This is rare and worth noting.
- One hierarchy skip: `kirjallisuus-suositukset.html` goes `h1 → h3` ("Analyzing Data with Microsoft Power BI and Power P…"). Every other page is clean.
- Two published pages are structurally flat: `kehittamisen-filosofia.html` (0 subheadings) and `nimeamiskaytannot.html` / `lumihiutalemalli.html` (1 each).

### Internal linking

This is the clearest structural problem on the site. Static inbound internal links per published page:

| Page | Inbound | Words | In nav? |
|---|---:|---:|---|
| `tietomalli.html` | 28 | 920 | Yes |
| `tahtimalli.html` | 28 | 827 | Yes |
| `dimensiot.html` | 28 | 1,295 | Yes |
| `litistaminen.html` | 28 | 490 | Yes |
| `termisto.html` | 28 | 6,086 | Yes |
| `tietoa.html` | 28 | 268 | Yes |
| **`kehittamisen-filosofia.html`** | **27** | **98** | **Yes** |
| `lumihiutalemalli.html` | 27 | 346 | Yes |
| `nimeamiskaytannot.html` | 27 | 516 | Yes |
| `ai-valmis-metadata.html` | 27 | 834 | Yes |
| `kirjallisuus-suositukset.html` | 7 | 637 | No |
| `faktataulu.html` | 6 | 1,387 | No |
| `avaimet-ja-relaatiot.html` | 4 | 1,301 | No |
| `sekasikiomalli-vs-tahtimalli.html` | 4 | 1,958 | No |
| **`surrogaattiavaimet.html`** | **3** | **2,225** | **No** |
| **`medallion.html`** | **2** | **1,593** | **No** |
| **`apuohjelmat.html`** | **2** | **1,315** | **No** |

The ten nav pages receive 27–28 links each; everything else receives 2–7. The correlation between link equity and content depth is *negative*. The 98-word page gets 27 links; the 2,225-word page gets 3.

Note that "Katso myös" cards are rendered client-side by `kortit.js` from `sivut.js`. Google renders JavaScript, so these links are discoverable, but JS-injected links are processed on a delay and are generally weighted less confidently than links in the served HTML. The homepage cards *are* static HTML (generated between the `KORTIT:alku`/`KORTIT:loppu` markers) — those count fully.

---

## Schema & Structured Data — 95/100

The strongest category. Every JSON-LD block on the site parses cleanly and no required properties are missing.

| Type | Pages | Notes |
|---|---|---|
| `TechArticle` | 17 | All have `headline`, `description`, `url`, `datePublished`, `dateModified`, `author`, `publisher`, `inLanguage`, `image` |
| `BreadcrumbList` | 23 | Every page except the drafts without schema |
| `FAQPage` | 4 | `tahtimalli`, `faktataulu`, `dimensiot`, `tietomalli` |
| `DefinedTermSet` | 1 | `termisto.html` — correct type for a glossary |
| `Organization` + `WebSite` | 1 | Homepage |
| `Person` + `AboutPage` | 1 | `tietoa.html` — rich, with credentials and sameAs |
| `ItemList` | 1 | `kirjallisuus-suositukset.html` |
| `WebPage` | 1 | `tietosuoja.html` |

**Validation errors: none.** Zero parse failures, zero missing required properties across 23 pages carrying structured data.

### Opportunities

- **`FAQPage` on only 4 of 20 published pages.** Google has largely retired FAQ rich results for non-authoritative sites, but FAQ blocks remain one of the most reliably extracted formats for AI Overviews and ChatGPT. `medallion`, `surrogaattiavaimet`, `avaimet-ja-relaatiot` and `sekasikiomalli-vs-tahtimalli` are long enough to support them.
- **`HowTo` schema** would suit `litistaminen.html` (an ETL procedure) and the six-step process in `tietomalli.html`.
- **`tietoa.html` has no `dateModified`** on its published schema (flagged by `rakenna.py --raportti`).
- **`intentiovelka.html` has no tags** in its metadata (also flagged) — worth fixing before its scheduled publication.

---

## Performance — 88/100 (lab measurements only)

No Google API credentials are configured, so there is **no CrUX field data and no Search Console indexation data** in this audit. The numbers below are server-side measurements, not real-user metrics.

### Measured

| Page | TTFB | Total | Transferred (br) |
|---|---:|---:|---:|
| `/` | 79 ms | 79 ms | 795 B |
| `tahtimalli.html` | 85 ms | 85 ms | 6.7 KB |
| `surrogaattiavaimet.html` | 67 ms | 68 ms | 9.3 KB |
| `sekasikiomalli-vs-tahtimalli.html` | 116 ms | 116 ms | 12.4 KB |
| `termisto.html` | 107 ms | 137 ms | 47.8 KB |

TTFB is excellent across the board (67–116 ms). Brotli is enabled with correct `Vary: Accept-Encoding`.

### Asset budget

| Asset | Size | Note |
|---|---:|---|
| `fontit/source-serif-4-normal-latin.woff2` | **122 KB** | Preloaded — on the critical path |
| `fontit/dm-sans-normal-latin.woff2` | **63 KB** | Preloaded — on the critical path |
| `style.css` | 18 KB | Render-blocking, but small |
| `search-index.js` | 38 KB | Deferred |
| `navigation.js` | 21 KB | Deferred |
| `sivut.js` | 8 KB | Deferred |
| `kortit.js` | 3 KB | Deferred |
| `favicon.ico` | 37 KB | Oversized for an .ico |
| `kuvat/og-datamalli.png` | 74 KB | Social only, not on critical path |

**185 KB of preloaded fonts is the single largest cost on the critical path** — roughly 10× the CSS and larger than all the JavaScript combined. A 122 KB "latin" subset suggests a variable font shipping its full weight axis. Subsetting to the glyphs actually used (Finnish Latin + the small punctuation set) and to the weights actually rendered would typically cut this to 30–50 KB total.

All JavaScript is `defer`red — correct. `termisto.html` at 248 KB uncompressed (48 KB brotli) is heavy but it is a 157-term glossary, so the weight is justified; it's the only page over 62 KB raw.

**CLS risk:** the "Katso myös" card sections are injected client-side into empty `<section class="katso-myos">` placeholders. Unless those placeholders reserve height in CSS, cards appearing after hydration will shift content below them.

---

## Images — 85/100

- **Total `<img>` elements across all 29 pages: 11.** Seven of them are on `kirjallisuus-suositukset.html` (book covers); the rest are single diagrams on `lumihiutalemalli`, `tietoa`, `data-vault` and `header-detail`.
- **Missing alt text: zero.** Every image on the site has an `alt` attribute.
- OG image is correctly sized (1200×630) with `og:image:width`, `og:image:height` and `og:image:alt` declared. It is a 74 KB PNG; WebP would cut that substantially, though it is not on the render path.
- `favicon.ico` at 37 KB is unusually large.

The score reflects execution, not ambition: what's there is done correctly. But a site about *data modelling* running almost entirely without diagrams is leaving a lot on the table. Much of the visual explanation appears to be done with CSS/HTML constructs rather than images — which is great for performance and accessibility, but means the site is effectively invisible in Google Images and has nothing for AI systems to cite visually. Several pages (`tahtimalli`, `medallion`, `surrogaattiavaimet`, `avaimet-ja-relaatiot`) describe structures that would benefit from a real diagram with a descriptive filename and alt text.

---

## AI Search Readiness (GEO) — 85/100

### Crawler access: open

`robots.txt` uses `User-agent: * / Allow: /` with no AI-crawler exclusions. GPTBot, ClaudeBot, PerplexityBot, CCBot and Google-Extended all have full access. Given the site's goal (being the Finnish reference on data modelling), this is the right call.

### llms.txt: present and well-built

The file is genuinely good — it follows the spec, has a descriptive summary block, a CC BY 4.0 licence declaration, author attribution, and one-line descriptions per page grouped into `## Sisältösivut` and `## Tietoa`.

**Gap: `medallion.html` and `surrogaattiavaimet.html` are in the sitemap but missing from llms.txt.** These are the two most recently published pages and among the deepest (1,593 and 2,225 words). Every other published page is listed.

**No `llms-full.txt`** (returns 404). For a site this size — 20 pages, ~25,000 words — a concatenated full-text version is feasible and is increasingly what AI crawlers reach for.

Also note: because `llms.txt` is maintained by hand while `sitemap.xml` is generated by `tyokalut/rakenna.py`, this gap will keep recurring. It's a generator candidate.

### Citability

Strong foundations:
- Clear definitional openings on most pages.
- Heavy use of tables (8 on `surrogaattiavaimet`, 2 on `tahtimalli` and `medallion`) and lists (8 on `medallion`) — the formats LLMs extract most reliably.
- A 157-term glossary with `DefinedTermSet` schema — an ideal citation target.
- Named author with verifiable credentials, and citations to named books with page numbers.

Weaknesses:
- `FAQPage` on only 4 of 20 pages.
- The thin pages (`kehittamisen-filosofia` at 98 words, `lumihiutalemalli` at 339) offer little extractable substance on topics that are otherwise core to the site.
- No explicit "key takeaways" or summary blocks that AI systems can lift wholesale.

### Brand mention signals

`Organization` and `WebSite` schema on the homepage, consistent `Datamalli.fi` / `Datamalli Tiimi Oy` / `Dataneuvos` naming, `sameAs` links to LinkedIn and dataneuvos.fi. Off-site mention volume cannot be assessed without backlink API credentials (none configured — no Moz, Bing Webmaster or DataForSEO keys detected).

---

## Data not available in this audit

| Source | Status | Impact |
|---|---|---|
| Google Search Console | Not configured | No indexation status, impressions, clicks, CTR or average position |
| CrUX field data | Not configured | Core Web Vitals are lab estimates only; no real LCP/INP/CLS |
| GA4 | Not configured | No organic traffic trends |
| Backlink APIs (Moz / Bing / DataForSEO) | Not configured | No referring domains, anchor text or link gap analysis |
| Playwright screenshots | Not run | Known blocker: chromium fails on WSL (`libnspr4`) |

Connecting Search Console alone would meaningfully sharpen the next audit — particularly for confirming whether the thin pages are actually failing to rank, which is currently an inference rather than an observation.
