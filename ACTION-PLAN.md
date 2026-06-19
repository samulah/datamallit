# SEO Action Plan: datamalli.fi
**Generated:** 2026-06-17
**Overall Score:** 85/100 (↑ from 75 on 2026-06-16)

Priority order: Critical > High > Medium > Low. Items the 2026-06-16 plan listed are reconciled against the **live** site below.

---

## ✅ Already done (verified 2026-06-17)

- **HTTP security headers deployed** — HSTS (`includeSubDomains; preload`), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all live. (Was the previous CRITICAL.)
- **Self-hosted fonts** — DM Sans + Source Serif 4 from `/fontit/`; no production Google Fonts CDN. GDPR exposure gone.
- **apex → www 301** confirmed live.
- **`arkkitehtuurivalinta.html`** deployed (200) and in sitemap.
- **`faktataulu.html`** robots set to `noindex,nofollow` (but see HIGH #1 — the real question is whether it should be indexed at all).
- **Book schema**, **dateModified on all TechArticles**, **Organization `sameAs`**, **apuohjelmat title fix** — all in place.

---

## CRITICAL
*None.* No issue is currently blocking indexing or causing penalties.

---

## HIGH (within 1 week)

### 1. Resolve `faktataulu.html` indexing inconsistency
**Effort:** 15–30 min · **Impact:** unlocks a finished 1,300-word page for organic + AI visibility

It's in the main nav (`navigation.js`) and on the homepage as a live card, with full TechArticle schema — but `noindex,nofollow`, not in the sitemap, not in llms.txt. Pick one:
- **Recommended — publish it** (it looks complete): remove the `<meta name="robots" content="noindex,nofollow">`, add `<loc>https://www.datamalli.fi/faktataulu.html</loc>` (+ `lastmod`) to `sitemap.xml`, and add a line under `## Sisältösivut` in `llms.txt`. (This is exactly the project's three-step publish checklist; schema is already done.)
- **Or — keep it draft:** remove it from `navigation.js` and the homepage card grid (or mark it "🚧 Tulossa") until it's ready, so users aren't routed to a noindexed page.

---

## MEDIUM (within 1 month)

### 2. Expand `kehittamisen-filosofia.html` (~90–120 → 600+ words)
**Effort:** 2–3 h · **Impact:** removes the only real thin-content risk among indexed pages
Per principle, add: why it matters (concrete consequence), a real BI example, and 2–3 sentences of actionable guidance.

### 3. Add a Content-Security-Policy header
**Effort:** 30–60 min · **Impact:** completes the security-header set (last of 6)
Start in report-only mode given inline `<style>`/`<script>`:
```apache
Header always set Content-Security-Policy-Report-Only "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'"
```
Review reports, then switch to enforcing `Content-Security-Policy`. No external font/CDN allow-listing needed (fonts are self-hosted).

### 4. Add `arkkitehtuurivalinta.html` to `llms.txt`
**Effort:** 5 min · **Impact:** AI crawler completeness
Add under `## Sisältösivut`, e.g.:
`- [Milloin käyttää mitäkin mallia](https://www.datamalli.fi/arkkitehtuurivalinta.html): Vertailutaulukot ja käytännön ohjeet tähtimalli/lumihiutale/Data Vault/Data Mesh/ETL/ELT -valintaan.`

### 5. Add FAQPage schema to question-H2 pages
**Effort:** 1–2 h · **Impact:** FAQ rich results + better AI extraction
Target: `tahtimalli.html`, `dimensiot.html`, `faktataulu.html`, `lumihiutalemalli.html`. Reuse the existing question H2s as `Question`/`Answer` pairs alongside the current TechArticle node in the `@graph`.

### 6. Expand `lumihiutalemalli.html` (~320 → 700+ words)
**Effort:** 1–2 h · **Impact:** rankings for "lumihiutalemalli / snowflake schema"
Add a star-vs-snowflake comparison table, a concrete "when snowflake is justified" example, and a stronger pointer to `litistaminen.html`. (`litistaminen.html` ~360 w is the next candidate.)

---

## LOW (backlog)

### 7. Image formats & coverage
- Convert diagrams and book covers to **WebP/AVIF** (with raster fallback) — ~25–50% smaller. Largest current asset is 193 KB.
- Add topic diagrams to text-heavy pages (SCD diagram on `dimensiot.html`, star-vs-snowflake on `lumihiutalemalli.html`, metadata diagram on `ai-valmis-metadata.html`).
- Remove or wire up the orphan `kuvat/og-self-service.png`.

### 8. Expand `tietoa.html` for author authority
The E-E-A-T anchor. Add career highlights, why the site exists, and surface credentials in prose (schema already lists 4 Microsoft certs).

### 9. Shorten `tahtimalli-esimerkit.html` title (~77 chars)
e.g. `Tähtimalli Power BI:ssä – 5 esimerkkiä | Datamalli.fi` (~52 chars) to avoid SERP truncation.

### 10. `DefinedTerm` items in `termisto.html`
Wrap individual terms as `DefinedTerm` within the existing `DefinedTermSet` for finer entity understanding.

### 11. Font `rel="preload"` + LCP check
Self-host is done; add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the above-the-fold woff2 files, and verify the first-visit splash animation in `navigation.js` isn't delaying LCP.

### 12. Operational
- Confirm Let's Encrypt auto-renewal (cert renews automatically; alert if <30 days).
- Connect **GSC + GA4** and re-run with the seo-google integration to replace lab estimates with CrUX field CWV and real indexation/traffic data.

---

## Roadmap

| When | Tasks |
|------|-------|
| This week | #1 faktataulu decision |
| Weeks 2–4 | #2 filosofia expansion, #3 CSP, #4 llms.txt, #5 FAQPage |
| Month 2 | #6 lumihiutale/litistäminen expansion, #8 tietoa, #9 title |
| Backlog | #7 images, #10 DefinedTerm, #11 preload/LCP, #12 GSC/GA4 |
