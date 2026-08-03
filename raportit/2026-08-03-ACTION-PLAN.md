# Action Plan — datamalli.fi

Prioritised from the 2026-08-03 audit. Health score **83/100**.

**Status as of 2026-08-03:** done — C0 (mitigation written), C1, H1, H3, H4, M1, M2, M8, and an M6 assessment. Skipped by decision: H2, H5. Open: M3, M4, M5, M6 (execution), M7, all of Low. Changes are in the working tree but **not pushed**.

> **Correction to the audit (H1).** The original finding said the nav links 10 pages and starves the deep content. That was wrong: it measured the `<noscript>` fallback. `navigation.js:44-60` renders **all 17 pages**, so link equity was never the problem — link *discovery timing* was, because the deep pages appeared only after JS execution. H1 was re-scoped accordingly and the fix was much smaller than the plan implied. The FULL-AUDIT-REPORT's internal-linking table reflects the old, incorrect reading.

---

## ✅ What was done (2026-08-03)

| Item | Status | What changed |
|---|---|---|
| C1 | **Mitigated** | `robots.txt` — added `Disallow: /sivupohja.html` with an explanatory comment |
| H3 | **Done** | `llms.txt` — added `medallion.html` and `surrogaattiavaimet.html`; llms.txt and sitemap.xml now at full parity (20/20) |
| H4 | **Done** | Title trimmed 72→58; four descriptions trimmed/expanded into the 136–152 range |
| M8 | **Done** | `kirjallisuus-suositukset.html` — 7 × `h3` → `h2`; scoped CSS rule preserves the rendered size |
| — | Housekeeping | `style.css?v=7` → `?v=8` across all 29 pages; `paivitykset.html` entry added per CLAUDE.md; `rakenna.py` re-run (recalculated `lukemisaika` for `paivitykset.html`, 3 → 5) |

### Second round (same day)

| Item | Status | What changed |
|---|---|---|
| C0 | **Written, not applied** | `.htaccess-lisays` — append-only snippet (gitignored). **Requires manual upload.** |
| H1 | **Done** | noscript nav normalised to all 17 pages on all 30 files; 5 contextual in-body links added |
| M1 | **Done** | All 8 fonts subset + axis-clipped. Preloaded pair 180.8 → 138.8 KB (−23 %) |
| M2 | **Done** | `404.html` created; `ErrorDocument` in the `.htaccess` snippet; `404.html` added to `rakenna.py`'s `OHITA` set |
| M6 | **Assessed** | `raportit/2026-08-03-faqpage-arvio.md` — recommends expanding to 3 pages, *not* rewriting existing answers |
| H2, H5 | **Skipped** | Dropped by decision, not by oversight |

**Verified after the changes:** `rakenna.py --tarkista` clean (31 files); zero heading-level skips sitewide; every published title ≤ 60 and description ≤ 160 except `tietomalli.html` at 61 characters, which is within pixel-width tolerance and was left alone.

### Detail

**H4 — final values:**

| Page | Field | Before | After |
|---|---|---:|---:|
| `sekasikiomalli-vs-tahtimalli.html` | title | 72 | **58** — *"Sekasikiömalli vs. tähtimalli: 5 esimerkkiä \| Datamalli.fi"* |
| `surrogaattiavaimet.html` | description | 185 | **151** |
| `tietomalli.html` | description | 178 | **152** |
| `tietosuoja.html` | description | 174 | **136** |
| `paivitykset.html` | description | 83 | **147** |

`og:description` and the JSON-LD `description` were kept in sync with `<meta name="description">` on every page touched, matching the site's existing convention. `og:title` and the JSON-LD `headline` on `sekasikiomalli-vs-tahtimalli.html` were left at the longer wording — the 60-character limit is a SERP constraint, not an Open Graph one.

**M8 — how the heading fix avoids a visual change.** The book titles became `<h2>`, which browsers render at `1.5em` rather than `h3`'s `1.17em`. A scoped rule in `style.css` restores the previous appearance exactly:

```css
.book-content h2 {
  font-size: 1.17em;
  font-weight: 500;
  letter-spacing: normal;
  margin: 1em 0;
}
```

This was reasoned from the CSS (neither `h2` nor `h3` sets a font-size, so browser defaults applied; `h2` additionally carries `letter-spacing: -0.01em`) rather than verified in a browser — Playwright cannot launch in this WSL environment. **Worth a visual check on `kirjallisuus-suositukset.html` before pushing.**

**C1 — why this is a mitigation, not a fix.** `Disallow` stops crawling but leaves `sivupohja.html` publicly reachable with its canonical still pointing at the non-existent `SIVU.html`. It also sits slightly against the site's own documented robots.txt reasoning (allow everything so Google can read page-level `noindex`). The risk is low here — the template has no inbound links and is not in the sitemap, so it is very unlikely to be indexed — but **resolving C0 via a deployment boundary is the actual fix**, and it makes both C1 and this caveat disappear.

---

## Critical — fix immediately

### C0. The entire repo is deployed and publicly readable
**Problem:** the web server serves the whole working tree, not just the site. All of these return HTTP 200:

- `/CLAUDE.md`, `/README.md` — internal authoring instructions
- `/julkaisusuunnitelma.md`, `/julkaisusuositukset.md` — publication schedule and editorial analysis for unshipped content
- `/ACTION-PLAN.md`, `/FULL-AUDIT-REPORT.md`, `/seo-korjaussuunnitelma.md` — **previous SEO audits listing the site's own weaknesses** (now moved to `/raportit/`, which will be equally exposed)
- `/generate_og.py`, `/_apply_tags.py`, `/tyokalut/rakenna.py` — build script source
- `/words/` — **directory autoindex enabled**, full browsable listing of the Word sources for every page

No secrets are exposed — `.gitignore` correctly covers `secrets.env`, `.env*`, `.htaccess`, `gsc tutkimus/` and `kirjoitukset/`. The problem is internal working material, and the fact that `robots.txt` says `Allow: /` over all of it.

**Fix — pick one:**
1. **Deployment boundary (preferred).** Publish from a `public/` directory containing only site files: `*.html` (minus `sivupohja.html`), `*.css`, `*.js`, `kuvat/`, `fontit/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `favicon.ico`. Everything else stays in the repo and never ships. This makes C1 disappear too, and prevents the next instance of the same problem.
2. **Server-side denies.** In `.htaccess` (already gitignored, so already managed separately): deny `*.md`, `*.py`, `/words/`, `/tyokalut/`, `/raportit/`, `sivupohja.html`, and disable autoindex (`Options -Indexes`).

Option 1 is the real fix; option 2 is the five-minute mitigation. Doing 2 now and 1 later is reasonable.

**Note:** `/raportit/` — where these reports now live — will be publicly readable until this is fixed.

> **✅ Option 2 written 2026-08-03 — but NOT yet applied.**
>
> `.htaccess-lisays` at the repo root contains the rules. It is **gitignored** (added to `.gitignore`) so it is never committed and never served.
>
> **It must be uploaded by hand, and it must be APPENDED — not used to replace the server's `.htaccess`.** The live file already carries HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy and the `.git` block (verified: `/.git/config` returns 403). Overwriting it would strip all of that.
>
> What the snippet does: `ErrorDocument 404 /404.html` · `Options -Indexes` · 404s `/words/`, `/tyokalut/`, `/raportit/`, `/.claude/`, `/.vscode/`, `/.githooks/` · denies `*.md`, `*.py`, `*.docx`, `*.pdf` · denies `suunnitelma.txt`, `pdf_teksti.txt`, `sivupohja.html`.
>
> `.txt` is deliberately **not** blanket-denied — `robots.txt` and `llms.txt` must stay served. New internal `.txt` files at the root need a line added by hand.
>
> Additional exposure found while writing it, beyond what the audit listed: **`/.claude/settings.json` returns 200** (agent and command definitions). Now covered.

### C1. `sivupohja.html` is live with a canonical pointing to a 404 — ✅ mitigated 2026-08-03
> Crawling blocked via `robots.txt`. The page is still served and its canonical is still broken; C0 is the real fix.

**Where:** `sivupohja.html:` `<link rel="canonical" href="https://www.datamalli.fi/SIVU.html">` — `SIVU.html` returns 404.
**Why it matters:** a crawlable page whose canonical target does not exist is an unambiguous quality defect. The page also serves placeholder content (`OTSIKKO`, 31 words, 6-character description).
**Fix — pick one:**
- Add to `robots.txt`: `Disallow: /sivupohja.html` (keeps the `noindex` readable is *not* needed here, since the goal is to stop crawling entirely for a non-content file), **or**
- Exclude the template from deployment so it never reaches the server, **or**
- Rename it to `sivupohja.html.tmpl` so it isn't served as HTML.

Deployment exclusion is cleanest — the template is a build input, not a page. **Resolving C0 via a `public/` directory fixes this automatically.**

---

## High — fix within a week

### H1. Rebalance internal linking toward deep content — ✅ done 2026-08-03 (re-scoped)
> **The diagnosis below is wrong** — see the correction at the top. The real issue was that the served HTML's `<noscript>` nav listed 10 pages while `navigation.js` renders 17, so deep pages were discoverable only after JS execution.
>
> **Done:**
> 1. **noscript nav normalised on all 30 files.** It had drifted into four different variants (11, 12, 12 and 13 links), one of which linked the `noindex` draft `arkkitehtuurivalinta.html`, and `paivitykset.html` had no noscript nav at all. All now carry an identical 18-link block generated from `navigation.js`, verified identical to it.
> 2. **5 contextual in-body links added**, embedded in existing sentences: `tahtimalli` → `faktataulu` + `sekasikiomalli-vs-tahtimalli`; `dimensiot` → `surrogaattiavaimet`; `tietomalli` → `medallion`; `faktataulu` → `avaimet-ja-relaatiot`. (`litistaminen` → `lumihiutalemalli` already existed.)
>
> **Result:** all 17 nav pages now sit at 28 inbound links in served HTML; previously 7 of them had 2–7. Zero broken internal links.
>
> **Nav grouping was considered and rejected:** `index.html` already carries this taxonomy as card categories, so grouping the top nav would either duplicate it or compete with it, and dropdowns would put links behind a click. The flat 17-item list stays.
>
> **Recurrence risk:** the noscript nav is still hand-maintained duplication of `navigation.js`. It drifted into four variants once and will again. Generating it in `rakenna.py` is the durable fix — same argument as H3's llms.txt.

<details><summary>Original (incorrect) diagnosis</summary>

**Problem:** the sitewide nav links 10 pages 27–28 times each; the site's deepest pages get 2–7 links. The correlation between link equity and content depth is negative.

| Under-linked | Words | Inbound |
|---|---:|---:|
| `surrogaattiavaimet.html` | 2,225 | 3 |
| `sekasikiomalli-vs-tahtimalli.html` | 1,958 | 4 |
| `medallion.html` | 1,593 | 2 |
| `faktataulu.html` | 1,387 | 6 |
| `apuohjelmat.html` | 1,315 | 2 |
| `avaimet-ja-relaatiot.html` | 1,301 | 4 |

**Fix:**
1. In `navigation.js`, swap `kehittamisen-filosofia.html` (98 words) out of the primary nav and add `faktataulu.html` and `medallion.html`. The nav is already at 10 items — consider grouping into a two-level structure rather than growing it further.
2. Add contextual in-body links from the high-traffic nav pages to the deep pages: `tahtimalli` → `faktataulu` + `sekasikiomalli-vs-tahtimalli`; `dimensiot` → `surrogaattiavaimet`; `tietomalli` → `medallion` + `arkkitehtuurivalinta` (once published). These belong in the served HTML, not in the JS-rendered "Katso myös" cards.
</details>

### H2. Fix or expand `kehittamisen-filosofia.html` — ⏭️ skipped by decision
98 words, zero subheadings, in the sitemap, and linked from every page on the site. It is the site's weakest published page in its most privileged position.
**Fix — pick one:**
- Expand each of the six principles into a short section with an `h2`, an explanation and a concrete example. Target ~800 words. This is the better option: the principles are good and the topic is genuinely differentiating.
- Or `noindex` it and treat it as a printable poster rather than an article.

### H3. Add the two missing pages to `llms.txt` — ✅ done 2026-08-03 (generator part still open)
`medallion.html` and `surrogaattiavaimet.html` are in `sitemap.xml` but absent from `llms.txt`.
**Done:** both added under `## Sisältösivut`, using each page's own `kortti-kuvaus` as the description and placing them in topical order (`surrogaattiavaimet` after `avaimet-ja-relaatiot`, `medallion` after `litistaminen`). llms.txt and sitemap.xml verified at full parity — 20 URLs each, no difference in either direction.
**Still open:** the generator work below. Until it exists, this gap will recur on every publication.
**Fix:** Then — because `llms.txt` is hand-maintained while `sitemap.xml` is generated — **add llms.txt generation to `tyokalut/rakenna.py`** so the two can't drift again. The generator already has every field it needs (`kortti-otsikko`, `kortti-kuvaus`, publication state).

### H4. Trim over-length titles and meta descriptions — ✅ done 2026-08-03
> All published pages now in range. `arkkitehtuurivalinta.html` (188) was **not** changed — it is still a `noindex` draft; fix it at publication time.

| Page | Field | Current | Target |
|---|---|---:|---|
| `sekasikiomalli-vs-tahtimalli.html` | title | 72 | ≤60 — e.g. *"Sekasikiömalli vs. tähtimalli: 5 esimerkkiä \| Datamalli.fi"* |
| `surrogaattiavaimet.html` | description | 185 | ≤155 |
| `tietomalli.html` | description | 178 | ≤155 |
| `tietosuoja.html` | description | 174 | ≤155 |
| `paivitykset.html` | description | 83 | expand to ~140 |
| `arkkitehtuurivalinta.html` | description | 188 | ≤155 — before publishing |

### H5. Expand `lumihiutalemalli.html` — ⏭️ skipped by decision
339 words on a primary keyword, versus 827 for `tahtimalli.html` and 1,958 for the comparison page. It has one subheading.
**Fix:** add sections on when snowflaking is justified, the Power BI performance cost, and the relationship to `litistaminen.html`. Target ~900 words with 4–5 `h2`s.

---

## Medium — fix within a month

### M1. Subset the web fonts — ✅ done 2026-08-03
> **The audit's "expect 30–50 KB total" estimate was wrong.** These files are already Google Fonts subsets (222–231 characters); glyph bloat was never the cost. The size is variable-axis delta data.
>
> Measured levers on `source-serif-4-normal-latin.woff2` (119.5 KB):
>
> | Change | Result | Visual effect |
> |---|---:|---|
> | Glyph subset to 133 used chars | 105 KB | none |
> | Clip `wght` to 300–600 (what the CSS declares) | 110 KB | none |
> | Clip `opsz` to 10–32 (rendered range) | 98 KB | none |
> | **Pin `opsz` at 16** | **44 KB** | optical sizing lost |
> | Pin `wght` at 400 | 18 KB | **breaks all bold headings — not viable** |
>
> **Applied:** glyph subset + `wght` 300–600 + `opsz` 10–32 on all 8 files. Preloaded pair **180.8 → 138.8 KB (−42 KB, −23 %)**; all 8 files 444.6 → 366.9 KB (−78 KB). Every character in use is preserved, `wght` default stays 400, Source Serif's `opsz` default stays 20 (DM Sans' shifts 9 → 10, the axis floor).
>
> **Left on the table: a further ~70 KB** by pinning `opsz` (serif 98 → 44 KB, DM Sans 41 → 25 KB). That disables optical sizing — body text at 16px and `h1` at 32px would share one optical design. I did not do this because it is a rendering change I cannot verify visually in this environment. Your call; originals are kept at `scratchpad/fontit-alkuperaiset/`.
>
> Filenames are unchanged, so cached copies stay valid for up to 7 days — harmless, since rendering is identical.

<details><summary>Original plan text</summary>
`source-serif-4-normal-latin.woff2` is 122 KB and `dm-sans-normal-latin.woff2` is 63 KB — 185 KB preloaded on the critical path, more than all JS and CSS combined. A 122 KB "latin" subset implies a full variable weight axis is shipping.
**Fix:** subset to the glyphs and weights actually used (`pyftsubset` / `glyphhanger`). Expect 30–50 KB total. This is the single largest performance win available.
</details>

### M2. Ship a branded 404 page — ✅ done 2026-08-03
> `404.html` created with the standard nav and four routes back in (etusivu + haku, termistö, tietomalli, päivitykset). **All asset and link paths are absolute** — the server serves this page at any URL depth, so relative paths would break on e.g. `/words/foo`. It is `noindex, follow`, and added to `rakenna.py`'s `OHITA` set so the generator ignores it (otherwise it would show up as an unfinished draft in `--raportti`).
>
> **Not live until the `.htaccess` snippet is uploaded** — `ErrorDocument 404 /404.html` lives there.

Currently the LiteSpeed default — no branding, no nav, no way back into the site.
**Fix:** create `404.html` using `sivupohja.html`'s layout with the standard nav, a short message and a link to the homepage and `termisto.html`. Point LiteSpeed's `ErrorDocument 404` at it.

### M3. Reserve space for "Katso myös" cards
`kortit.js` injects cards into empty `<section class="katso-myos">` placeholders after load. Without a reserved height this causes layout shift.
**Fix:** set a `min-height` on `.katso-myos` in `style.css` matching the rendered card row height.

### M4. Tighten the CSP
`script-src` still allows `https://cdn.jsdelivr.net` and `'unsafe-eval'`, both of which existed for Mermaid — removed from the browser in commit `907a661`. Nothing on the site loads from jsdelivr any more.
**Fix:** drop `https://cdn.jsdelivr.net` and `'unsafe-eval'` from `script-src`. Verify no console errors on `termisto.html` and `index.html` (the two heaviest JS pages) before shipping.

### M5. Decide what to do with the 8 draft pages
All 8 are publicly reachable at HTTP 200. They are correctly `noindex,nofollow` so they won't be indexed, but AI crawlers don't universally honour `noindex`, and several are visibly unfinished: `etl-elt.html` (63 words), `header-detail.html` (277), `data-vault.html` (280).
**Fix — pick one:** finish them, hold them out of deployment until publication, or accept the exposure as deliberate. This is a judgement call, not a defect — but the 63-word `etl-elt.html` is the kind of page that shouldn't be publicly readable under the site's name.

### M6. Add `FAQPage` schema to the long pages — 📋 assessed 2026-08-03, execution open
> Full assessment: **`raportit/2026-08-03-faqpage-arvio.md`**
>
> Headline findings: all 19 existing FAQ questions map exactly to a real `h2` (19/19 — no invented questions), but the schema answers are paraphrases, averaging ~37 % verbatim overlap with the visible text. Content is faithful; wording is not. Separately, Google restricted FAQ rich results to authoritative government/health sites in August 2023, so **this site gets no rich result from FAQPage regardless of quality** — the remaining value is AI extraction, and for that the paraphrased form is better than a verbatim copy.
>
> **Recommendation: expand to 3 pages, do not rewrite the existing answers.** `medallion.html` has 5 of 5 `h2`s already in question form, `avaimet-ja-relaatiot.html` 3 of 4, `surrogaattiavaimet.html` 2 of 4 — ~45 min for 4 → 7 pages and 19 → 29 questions. `sekasikiomalli-vs-tahtimalli.html` is a poor FAQ fit (numbered comparison) and suits `ItemList` instead.

Currently on 4 of 20 published pages. FAQ blocks remain one of the most reliably extracted formats for AI Overviews and ChatGPT even though Google has narrowed FAQ rich results.
**Candidates:** `medallion.html`, `surrogaattiavaimet.html`, `avaimet-ja-relaatiot.html`, `sekasikiomalli-vs-tahtimalli.html` — all long enough to support 3–5 genuine questions.

### M7. Fix the metadata gaps flagged by `rakenna.py --raportti`
- `tietoa.html`: missing `dateModified` on a published page; missing `tagit`
- `intentiovelka.html`: missing `tagit` — fix before its scheduled publication

### M8. Fix the heading skip — ✅ done 2026-08-03
`kirjallisuus-suositukset.html` goes `h1 → h3` at "Analyzing Data with Microsoft Power BI and Power P…". Every other page on the site is clean.
**Done:** all 7 book titles are now `h2`, with a scoped `.book-content h2` rule preserving the previous rendering. Sitewide heading-skip count is now zero. Needs a visual spot-check (see "What was done").

---

## Low — backlog

### L1. Add diagrams to the core modelling pages
The site has 11 `<img>` elements total across 29 pages, 7 of which are book covers. All have alt text — execution is correct, but a data-modelling site with almost no diagrams is invisible in Google Images and has nothing visual for AI systems to cite. `tahtimalli`, `medallion`, `surrogaattiavaimet` and `avaimet-ja-relaatiot` all describe structures that warrant one. Use descriptive filenames and alt text.

### L2. Add explicit summary blocks for AI extraction
A short "Lyhyesti" / key-takeaways block at the top of each long article gives LLMs a clean, self-contained passage to lift.

### L3. Publish `llms-full.txt`
At 20 pages / ~25,000 words the whole site fits comfortably in a single concatenated text file. Generate it from `rakenna.py` alongside H3.

### L4. Add `HowTo` schema
`litistaminen.html` (an ETL procedure) and the six-step process in `tietomalli.html` are natural fits.

### L5. Add canonicals to the draft pages
Six drafts have no canonical tag at all. Low impact while `noindex`, but it means each needs remembering at publication time — and the site's one publication-checklist failure so far (the llms.txt gap) came from exactly this kind of manual step.

### L6. Optimise two oversized files
`favicon.ico` (37 KB) and `kuvat/og-datamalli.png` (74 KB → WebP). Neither is on the critical render path.

### L7. Set `Cache-Control` on HTML responses
CSS and JS have `public, max-age=604800`; HTML has no cache header at all and falls back to browser heuristics.

---

## Measurement gap worth closing

No Google API credentials are configured, so this audit has **no field data**: no Search Console indexation or query data, no CrUX Core Web Vitals, no GA4 traffic. Core Web Vitals above are lab estimates.

Connecting Search Console would let the next audit confirm — rather than infer — whether the thin pages are actually failing to rank, and whether the 20 sitemap URLs are all indexed. That single connection would sharpen the content-priority calls in H2 and H5 more than any other available input.
