# SEO Action Plan — datamalli.fi

**Generated:** 2026-06-21
**Overall score:** 93/100 (↑ from 85 on 2026-06-17, ↑ from 75 on 2026-06-16)

Priority order: Critical > High > Medium > Low. No Critical or High items this round — the site is in excellent shape. Everything below is optimisation.

---

## 🔴 Critical — none
## 🟠 High — none

---

## 🟡 Medium (within ~1 month)

### M1. Resolve the `arkkitehtuurivalinta.html` indexation/llms inconsistency
- **Problem:** It's listed as a content page in `llms.txt`, but the live page is `noindex,nofollow` and is **not** in `sitemap.xml`. AI crawlers are pointed to a page the site treats as unpublished.
- **Fix — pick one:**
  - *If ready to publish:* remove the `noindex,nofollow` meta → add `<url>` to `sitemap.xml` with today's `lastmod` → confirm TechArticle schema (your standard publish checklist).
  - *If not ready:* remove the `arkkitehtuurivalinta.html` line from `llms.txt` until you publish.
- **Effort:** 5–10 min.

### M2. Refresh `<lastmod>` dates in `sitemap.xml`
- **Problem:** lastmod values are stale (e.g. homepage `2026-06-07` vs. actual `Last-Modified: 2026-06-20`; most pages edited after their listed date). Undersells freshness to crawlers.
- **Fix:** Update each `<lastmod>` to the file's real last-edit date on every deploy. Consider auto-generating the sitemap from file mtimes so this can't drift again.
- **Effort:** 10 min (manual) / one-time script.

---

## 🟢 Low (backlog)

### L1. Trim two over-length titles
- `tahtimalli-esimerkit.html` (76 chars) and `termisto.html` (68 chars) exceed ~60 and may truncate in SERPs.
- Suggestions: `Tähtimalli Power BI:ssä – 5 esimerkkiä | Datamalli.fi`; `Datan termistö – data-alan termit suomeksi | Datamalli.fi`.

### L2. Expand the two thinnest topic pages
- `kehittamisen-filosofia.html` (393 w) and `lumihiutalemalli.html` (459 w). Add a worked example, a comparison table, or a short FAQ block to deepen coverage and citability.

### L3. Add `SearchAction` to the WebSite schema
- You have on-site search (`search.js`) but no `potentialAction`/`SearchAction` in the `WebSite` node. Add it for sitelinks-searchbox eligibility.

### L4. Preload the primary body font
- `<link rel="preload" as="font" type="font/woff2" href="/fontit/source-serif-4-normal-latin.woff2" crossorigin>` in `<head>` to speed body-text first paint. Keep `font-display: swap`.

### L5. Consider per-page OG images
- All articles share `og-datamalli.png`. Per-topic OG images improve social/SERP click-through differentiation. (You already have `generate_og_*.py` scaffolding.)

### L6. Optional: `FAQPage` schema where you already Q&A
- Pages like `tahtimalli.html` / `dimensiot.html` that pose and answer questions can earn extra SERP real estate with `FAQPage` markup.

---

## Recommended free data hookups (upgrades future audits)
- **Google Search Console** — real indexation status, impressions/clicks/CTR/position.
- **PageSpeed Insights / CrUX** — field Core Web Vitals (replaces this run's lab estimates).
- These were unavailable this run; connecting them would let the Performance + Indexation sections move from inference to measured field data.

---

## Verified clean this run (no action needed)
- Apex→www 301, consistent `www` canonicals, single H1/page, all titles+descriptions present and well-sized, full OG coverage.
- 11/11 in-progress pages correctly `noindex,nofollow` and excluded from sitemap.
- HSTS preload + CSP + full security-header set; Brotli; HTTP/2+h3; 7-day cache; true 404s.
- All JSON-LD valid; rich entity graph; 100% image alt coverage; `llms.txt` present.
