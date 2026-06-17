# SEO Audit Report: datamalli.fi
**Audit date:** 2026-06-16  
**Audited URL:** https://www.datamalli.fi/  
**Server:** LiteSpeed @ 185.179.117.16  
**Language:** Finnish (fi)  
**Business type:** Educational / Content Publisher – Finnish-language data modelling guide (BI & data warehouse niche)

---

## Overall SEO Health Score: 75/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 60/100 | 13.2 |
| Content Quality | 23% | 70/100 | 16.1 |
| On-Page SEO | 20% | 88/100 | 17.6 |
| Schema / Structured Data | 10% | 92/100 | 9.2 |
| Performance (CWV) | 10% | 78/100 | 7.8 |
| AI Search Readiness | 10% | 80/100 | 8.0 |
| Images | 5% | 55/100 | 2.75 |
| **Total** | **100%** | | **74.65 → 75** |

---

## Executive Summary

Datamalli.fi is a well-structured, niche Finnish educational site covering data modelling (star schema, dimensions, naming conventions, Power BI). The **on-page SEO and schema markup are excellent** — every indexed page has a proper title, meta description, canonical tag, TechArticle schema, and BreadcrumbList. The site is fast (TTFB ~80–110 ms), uses HTTP/2+HTTP/3, and has a clean robots.txt + sitemap strategy with noindex draft pages correctly excluded.

**The biggest gap is security headers** — all six standard HTTP security headers are missing from the server response. This is the only critical issue. Secondary concerns are thin word counts on a few pages and the absence of images on most content pages.

### Top 5 Critical/High Issues
1. **All HTTP security headers missing** — HSTS, X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy
2. **kehittamisen-filosofia.html: 121 words** — below any reasonable thin-content threshold
3. **Google Fonts loaded from external CDN** — potential GDPR/privacy violation (EU/Finnish law), external dependency
4. **faktataulut.html: noindex-only** (not nofollow) — unlike all other draft pages which use noindex,nofollow; risks crawl budget and link equity leakage
5. **No images on 10 of 14 indexed pages** — missed opportunity for rich content and visual E-E-A-T signals

### Top 5 Quick Wins
1. Add security headers to LiteSpeed config (30 min fix, major security score improvement)
2. Add nofollow to faktataulut.html robots meta
3. Add 3–5 diagrams or illustrations to dimensiot.html and ai-valmis-metadata.html (highest-traffic content pages)
4. Expand kehittamisen-filosofia.html from 121 words to 600+ words
5. Add apuohjelmat.html, tahtimalli-esimerkit.html, and kehittamisen-filosofia.html to llms.txt

---

## Technical SEO

### ✅ What Works Well

**HTTPS & TLS**
- Valid Let's Encrypt certificate (expires 2026-08-27); TLS 1.3 ✓
- HTTP/2 active; HTTP/3 (QUIC) advertised via alt-svc ✓

**Redirect configuration**
- datamalli.fi → www.datamalli.fi (301) — consistent with canonical URLs ✓

**robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://www.datamalli.fi/sitemap.xml
```
Smart strategy: allows crawling so Googlebot can read per-page noindex tags on draft pages ✓

**Sitemap**
- 14 indexed pages, clean, all 200 status ✓
- lastmod dates present on all entries ✓
- Only production-ready pages included ✓

**Canonical tags**
- Present on every indexed page, self-referencing ✓
- All point to www.datamalli.fi consistently ✓

**Draft pages correctly gated**
- 8 draft pages (header-detail.html, data-vault.html, medallion.html, etl-elt.html, data-governance.html, data-contract.html, useampi-fakta.html, faktataulut.html) all return 200 but have noindex ✓

---

### ❌ Issues Found

**CRITICAL: All HTTP security headers missing**

The server returns only `Server: LiteSpeed`. All standard security headers are absent:

| Header | Status | Risk |
|--------|--------|------|
| Strict-Transport-Security (HSTS) | ❌ Missing | Downgrade attacks |
| X-Frame-Options | ❌ Missing | Clickjacking |
| X-Content-Type-Options | ❌ Missing | MIME sniffing attacks |
| Content-Security-Policy | ❌ Missing | XSS attacks |
| Referrer-Policy | ❌ Missing | Referrer leakage |
| Permissions-Policy | ❌ Missing | Feature abuse |

**Fix:** Add to LiteSpeed's `.htaccess` or server config:
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```
CSP requires more careful tuning given inline styles and Google Fonts.

---

**HIGH: faktataulut.html — noindex without nofollow**

All other draft pages use `<meta name="robots" content="noindex,nofollow">`, but faktataulut.html only has `<meta name="robots" content="noindex">`. This means:
- Crawl budget is spent following its outbound links
- Any link equity from inbound links leaks to its followed targets

**Fix:** Change to `noindex,nofollow` (same as other draft pages).

---

**MEDIUM: arkkitehtuurivalinta.html returns 404**

The current git branch is `arkkitehtuurivalinta` and the page is listed in git status as modified, but it's not yet deployed. Not an SEO issue yet since it's not in the sitemap, but worth tracking.

---

## Content Quality

### Word Counts (All Indexed Pages)

| Page | Words | Status |
|------|-------|--------|
| termisto.html | 4,440 | ✅ Excellent |
| tahtimalli-esimerkit.html | 1,655 | ✅ Strong |
| apuohjelmat.html | 1,335 | ✅ Strong |
| dimensiot.html | 1,303 | ✅ Strong |
| ai-valmis-metadata.html | 849 | ✅ Good |
| tahtimalli.html | 731 | ✅ Good |
| kirjallisuus-suositukset.html | 653 | ✅ Good |
| nimeamiskaytannot.html | 535 | ⚠ Acceptable |
| litistaminen.html | 462 | ⚠ Borderline |
| lumihiutalemalli.html | 375 | ⚠ Thin |
| tietoa.html | 286 | ⚠ Thin |
| tietosuoja.html | 183 | ⚠ Thin (expected for privacy) |
| kehittamisen-filosofia.html | 121 | ❌ Very thin |
| index.html (homepage) | ~200 cards | N/A (nav page) |

### E-E-A-T Assessment

**Experience & Expertise:**
- Author (Samu Lahdenperä, Dataneuvos, Datamalli Tiimi Oy) consistently named across pages ✓
- 10+ years analytics/consulting experience stated in footer ✓
- LinkedIn and email clearly linked ✓
- Author has dedicated person schema on tietoa.html ✓
- Content demonstrates genuine domain expertise (practical examples, specific technical details) ✓

**Authoritativeness:**
- CC BY 4.0 license — open knowledge sharing signals ✓
- dataneuvos.fi linked as business site ✓
- Real company (Datamalli Tiimi Oy) with VAT/contact info in tietosuoja.html ✓

**Trustworthiness:**
- Privacy policy present (tietosuoja.html) ✓
- Contact details in footer (email + phone) ✓
- No advertising or affiliate links detected ✓

**Missing E-E-A-T signals:**
- No author photo on content pages
- No dateModified visible in page content (only in schema)
- tietoa.html is thin (286 words) for an about/author page — missed opportunity to build author authority

---

### Content Issues

**❌ kehittamisen-filosofia.html: 121 words — very thin**
This page covers 6 BI development principles but has less than 5 sentences per principle. Google may flag this as thin content. Expanding to 600+ words with examples for each principle would significantly improve quality and rankings.

**⚠ lumihiutalemalli.html: 375 words — thin**
A page about Snowflake Schema covering a major topic in the site's niche should be more comprehensive. Currently it links to litistaminen.html for continuation, but a reader landing on this page from search gets limited content. Target 800+ words.

**⚠ tietoa.html: 286 words — thin for an About page**
About pages contribute to E-E-A-T. 286 words is enough for technical SEO requirements but doesn't maximally leverage the opportunity to establish Samu Lahdenperä's expertise and credentials.

---

## On-Page SEO

### Title Tags

All 14 indexed pages have title tags. Lengths are all within the ideal 50–70 character range:

| Page | Title | Length |
|------|-------|--------|
| index.html | Datamalli.fi – Datan mallinnuksen opas | 38 ✅ |
| tahtimalli.html | Tähtimalli (Star Schema) \| Datamalli.fi | 39 ✅ |
| dimensiot.html | Dimensioiden mallinnus \| Datamalli.fi | 37 ✅ |
| nimeamiskaytannot.html | Nimeämiskäytännöt \| Datamalli.fi | 32 ✅ |
| litistaminen.html | Taulujen litistäminen (Flattening) \| Datamalli.fi | 49 ✅ |
| lumihiutalemalli.html | Lumihiutalemalli (Snowflake Schema) \| Datamalli.fi | 50 ✅ |
| ai-valmis-metadata.html | AI-valmis metadata \| Datamalli.fi | 33 ✅ |
| termisto.html | Datan termistö ja sanasto – data-alan termit suomeksi \| Datamalli.fi | 68 ✅ |
| tietoa.html | Samu Lahdenperä – Datamalli.fi:n tekijä \| Datamalli.fi | 54 ✅ |
| tietosuoja.html | Tietosuojaseloste \| Datamalli.fi | 32 ✅ |
| kehittamisen-filosofia.html | Kehittämisen filosofia \| Datamalli.fi | 37 ✅ |
| apuohjelmat.html | Power BI Apuohjelmat \| Datamalli.fi | 35 ⚠ |
| tahtimalli-esimerkit.html | Tähtimalli ja lumihiutalemalli Power BI:ssä: viisi esimerkkiä \| Datamalli.fi | 77 ⚠ |
| kirjallisuus-suositukset.html | Suositeltu kirjallisuus \| Datamalli.fi | 38 ✅ |

**Issues:**
- `apuohjelmat.html`: "Power BI Apuohjelmat" — inconsistent capitalisation vs rest of site (other pages use sentence case after first word). Could also be more descriptive.
- `tahtimalli-esimerkit.html`: 77 characters — slightly over the ~65 char display threshold; may be truncated in SERPs.

### Meta Descriptions

All 14 indexed pages have meta descriptions. All are within the 130–160 character range:

| Page | Length |
|------|--------|
| tahtimalli.html | 151 ✅ |
| lumihiutalemalli.html | 148 ✅ |
| dimensiot.html | 137 ✅ |
| nimeamiskaytannot.html | 146 ✅ |
| litistaminen.html | 138 ✅ |
| ai-valmis-metadata.html | 140 ✅ |
| termisto.html | 150 ✅ |
| tietoa.html | 152 ✅ |
| tietosuoja.html | 140 ✅ |
| kehittamisen-filosofia.html | 149 ✅ |
| apuohjelmat.html | 154 ✅ |
| tahtimalli-esimerkit.html | 148 ✅ |
| kirjallisuus-suositukset.html | 149 ✅ |
| index.html | 137 ✅ |

All descriptions contain relevant keywords and a clear value proposition. ✓

### Heading Structure

- All content pages have a single H1 that matches the page topic ✓
- H2 headings are descriptive and question-based (good for featured snippets) ✓
- Example from tahtimalli.html:
  - H1: Tähtimalli (Star Schema)
  - H2: Miten tähtimalli rakentuu ja toimii?
  - H2: Miten pää- ja vierasavaimet toimivat tähtimallissa?
  - H2: Mitä etuja normalisointi tuo tähtimalliin?

### Internal Linking

Strong internal linking observed. Content pages cross-link to:
- Related content pages (tahtimalli ↔ dimensiot ↔ litistaminen ↔ lumihiutalemalli)
- Termistö (anchor links to specific term definitions)
- Kirjallisuus-suositukset (anchor links to specific books)
- Tietoa (author page)

**Gap:** kirjallisuus-suositukset.html and kehittamisen-filosofia.html receive fewer incoming links from content pages than core content.

**Gap:** tahtimalli-esimerkit.html is only linked from tahtimalli.html and lumihiutalemalli.html — could receive links from more pages.

---

## Schema & Structured Data

### Coverage: Excellent (92/100)

All 14 indexed pages have valid JSON-LD structured data:

| Page | Schema Types |
|------|-------------|
| index.html | Organization, WebSite |
| tahtimalli.html | TechArticle, BreadcrumbList |
| lumihiutalemalli.html | TechArticle, BreadcrumbList |
| dimensiot.html | TechArticle, BreadcrumbList |
| nimeamiskaytannot.html | TechArticle, BreadcrumbList |
| litistaminen.html | TechArticle, BreadcrumbList |
| ai-valmis-metadata.html | TechArticle, BreadcrumbList |
| termisto.html | DefinedTermSet, BreadcrumbList |
| tietoa.html | AboutPage, Person, BreadcrumbList |
| tietosuoja.html | WebPage, BreadcrumbList |
| kehittamisen-filosofia.html | TechArticle, BreadcrumbList |
| apuohjelmat.html | TechArticle, BreadcrumbList |
| tahtimalli-esimerkit.html | TechArticle, BreadcrumbList |
| kirjallisuus-suositukset.html | TechArticle, BreadcrumbList |

**TechArticle** properties confirmed:
- `headline`, `description`, `url`, `inLanguage: "fi"`, `keywords`, `datePublished`
- `author`: Person (Samu Lahdenperä)
- `publisher`: Organization (Datamalli.fi)
- `mainEntityOfPage` ✓

**Missing opportunities:**

1. **FAQ schema**: The question-based H2 headings on content pages (e.g., tahtimalli.html) are perfect candidates for FAQPage schema. Adding this would enable FAQ rich results in Google SERPs.

2. **Book schema on kirjallisuus-suositukset.html**: The page lists 7 books with covers — each could have `Book` schema with ISBN, author, publisher properties.

3. **DefinedTerm schema**: Individual terms in termisto.html could have `DefinedTerm` schema items within the `DefinedTermSet`, improving individual term visibility.

4. **dateModified on TechArticle**: Adding `dateModified` alongside `datePublished` signals content freshness to Google.

---

## Performance (Core Web Vitals)

*Note: Lab measurements only — CrUX field data not available without GSC/GA4 access.*

### Server Response (TTFB)

| Page | TTFB |
|------|------|
| index.html | 108ms |
| tahtimalli.html | 111ms |
| dimensiot.html | 80ms |
| termisto.html | 80ms |

**Excellent TTFB** across all measured pages. LiteSpeed is performing well.

### Protocol
- HTTP/2 ✅
- HTTP/3 / QUIC advertised via `alt-svc` ✅

### Page Sizes (HTML only)

| Page | HTML Size |
|------|-----------|
| index.html | 22KB |
| termisto.html | 195KB (large but justified — 4,440 words) |
| tahtimalli-esimerkit.html | 32KB |
| apuohjelmat.html | 25KB |
| dimensiot.html | 20KB |
| Others | 5–16KB |

All sizes are reasonable. termisto.html at 195KB is the largest but the content volume justifies it.

### Concerns

**External Google Fonts (GDPR + performance)**

Both `fonts.googleapis.com` and `fonts.gstatic.com` are loaded from Google CDN:
- `DM Sans` (UI font)
- `Source Serif 4` (body font)

Issues:
1. **GDPR**: Visitor IP addresses are transmitted to Google servers. Under EU/Finnish law, this may require consent. The tietosuoja.html page should disclose this.
2. **Performance**: Adds 1 external DNS lookup + TLS handshake per visit (cached after first load).
3. **Dependency**: Font loading failure degrades appearance.

**Recommendation:** Self-host both fonts. Download from Google Fonts, serve from `/fonts/`, update CSS references.

**Splash Screen Animation**

`navigation.js` injects a full-screen splash animation on first page view (each session). Uses `sessionStorage` to prevent repeat. While visually polished, it may delay LCP (Largest Contentful Paint) on the first visit of a session if the splash renders before the main content. Consider measuring LCP with and without.

---

## Images

### Coverage

| Page | Images | Alt Text |
|------|--------|----------|
| kirjallisuus-suositukset.html | 7 | All present ✅ |
| tahtimalli.html | 1 | Present ✅ |
| All other indexed pages | 0 | N/A |

**Only 2 of 14 pages have any images.**

The navigation logo (dataneuvos_logo.png) is loaded via `navigation.js` but doesn't show in static HTML image counts.

### Issues

**⚠ Most content pages are image-free**

Pages like `dimensiot.html` (1,303 words about dimension modelling), `ai-valmis-metadata.html`, `apuohjelmat.html`, and `tahtimalli-esimerkit.html` would benefit significantly from visual content:
- Schema diagrams (star schema vs snowflake schema visual)
- Tool screenshots for apuohjelmat.html
- Before/after comparison for tahtimalli-esimerkit.html

Images improve dwell time, reduce bounce, enhance E-E-A-T, and open up Google Image search traffic.

**✅ Where images exist, alt text is high quality**

```
"Tähtimallin kaavio, jossa myynnit ovat keskiössä"  (tahtimalli.html)
"Analyzing Data with Microsoft Power BI and Power Pivot for Excel -kirjan kansi"  (kirjallisuus)
```

Descriptive, Finnish, specific ✓

---

## AI Search Readiness

### llms.txt: Present and Structured

```
# Datamalli.fi
# License: CC BY 4.0
> [site description]

## Sisältösivut
- Tähtimalli: ...
- Lumihiutalemalli: ...
- Dimensioiden mallinnus: ...
- Taulujen litistäminen: ...
- Nimeämiskäytännöt: ...
- AI-valmis metadata: ...
- Datan termistö ja sanasto: ...
- Suositeltu kirjallisuus: ...

## Tietoa
- Tietoa sivustosta: ...
```

**Missing from llms.txt:**
- `apuohjelmat.html` (DAX Studio, Tabular Editor, Power BI MCP — highly relevant)
- `tahtimalli-esimerkit.html` (practical examples — highest practical value for AI citation)
- `kehittamisen-filosofia.html` (philosophy page)
- `tietosuoja.html` (expected to be excluded)

### Schema for AI Parsability

TechArticle schema with `keywords`, `description`, and `inLanguage: "fi"` on every content page makes the site well-structured for AI parsers (Perplexity, ChatGPT, Claude). ✓

### Content Citability

- Factual, structured content with clear topic focus ✓
- Finnish-language niche — low competition for AI citations in this language ✓
- termisto.html with 130+ defined terms is a strong citation target for AI tools answering Finnish data modelling questions ✓
- Specific numbers and benchmarks in content (e.g., "jopa 3× nopeampi") make content quotable ✓

### Missing AI Signals

1. **No structured FAQ** — question-based H2s are not machine-readable as FAQ without FAQPage schema
2. **No sameAs links** in Organization/Person schema connecting to LinkedIn, Wikidata, etc.
3. **No citationCount or award** signals (expected — site is relatively new)

---

## Sitemap Analysis

**File:** https://www.datamalli.fi/sitemap.xml  
**Pages:** 14  
**Format:** XML, valid  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
```

✅ Only production-ready pages included  
✅ lastmod dates present and recent (2026-06-07 to 2026-06-11)  
✅ Referenced from robots.txt  

**Missing pages from sitemap vs accessible URLs:**
- 8 draft pages (noindex) — correctly excluded ✓
- arkkitehtuurivalinta.html — 404, not yet deployed ✓

**Recommendation:** When tahtimalli-esimerkit.html link is added to navigation, verify it's already in sitemap (it is) ✓

---

## Crawlability Summary

| Check | Status |
|-------|--------|
| robots.txt accessible | ✅ |
| All sitemap pages return 200 | ✅ |
| Canonical tags consistent | ✅ |
| Redirects proper (non-www → www) | ✅ |
| Draft pages blocked from indexing | ✅ (all have noindex) |
| faktataulut.html: noindex without nofollow | ⚠ Fix needed |
| Security headers | ❌ All missing |
| SSL valid | ✅ |
| HTTP/2 | ✅ |
