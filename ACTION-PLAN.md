# SEO Action Plan: datamalli.fi
**Generated:** 2026-06-16  
**Updated:** 2026-06-17  
**Overall Score:** 75/100 (ennen alla lueteltuja korjauksia)

---

## ✅ Valmis (toteutettu 2026-06-17)

Nämä kohdat on tehty ja poistettu alla olevasta backlogista.

- **#2 — faktataulu.html robots:** `noindex,nofollow` paikallaan (sivu myös uudelleennimetty `faktataulut.html` → `faktataulu.html`).
- **#4 — llms.txt:** `apuohjelmat.html`, `tahtimalli-esimerkit.html` ja `kehittamisen-filosofia.html` lisätty `## Sisältösivut` -listaan.
- **#5 — Self-host Google Fonts:** DM Sans ja Source Serif 4 palvellaan `/fontit/`-kansiosta (`@font-face` + `font-display: swap` + `unicode-range`), Google Fonts `<link>`-tagit poistettu, `tietosuoja.html` päivitetty (oma palvelin, ei yhteyttä Googleen). Korjattu samalla fonttilinkin poiston jättämä orpo `rel="stylesheet">` -fragmentti 10 tiedostosta.
- **#9 — sameAs:** Organization-skeema (`index.html`) sai `sameAs` (dataneuvos.fi + henkilö- ja yritys-LinkedIn) ja perustaja linkitetty `@id`:llä Person-entiteettiin; Person-skeemassa (`tietoa.html`) `sameAs` oli jo.
- **#10 — dateModified:** kaikilla 14 TechArticle-sivulla on sekä `datePublished` että `dateModified`.
- **#13 — Book-skeema:** `kirjallisuus-suositukset.html` sai `ItemList`-rakenteen, jossa 7 `Book`-entiteettiä (nimi, tekijä(t), julkaisuvuosi, kansikuva, Amazon-linkki `sameAs`:nä). Kustantajia ei lisätty, koska niitä ei mainita sivulla.
- **#14 — apuohjelmat-otsikko:** `Power BI Apuohjelmat` → `Power BI:n apuohjelmat` (title, og:title, TechArticle headline, breadcrumb-nimi ja näkyvä `<h1>`).
- **Päivämääräkorjaus:** `kirjallisuus-suositukset.html` näkyvä byline yhtenäistetty schemaan (`Päivitetty 11.6.2026`, `datetime="2026-06-11"`).

---

## CRITICAL (Fix Immediately)

### 1. Add HTTP Security Headers

**Impact:** Security + SEO trust signals  
**Effort:** 30 min  
**Why:** All 6 standard security headers are missing. Any security scanner gives a failing grade; Google's Chrome team uses HTTPS/security posture as a ranking signal.

Add to `.htaccess` or LiteSpeed server config:
```apache
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
```

For Content-Security-Policy, build incrementally — start with report-only mode since the site uses inline styles. (Fontit ovat nyt self-hostattu, joten Google Fonts -CDN:ää ei enää tarvitse sallia CSP:ssä.)

---

## HIGH (Fix Within 1 Week)

### 3. Expand kehittamisen-filosofia.html (121 → 600+ words)

**Impact:** Content quality, rankings for "BI kehittäminen periaatteet" etc.  
**Effort:** 2–3 hours writing  

Currently only 121 words covering 6 principles. Each principle deserves:
- Why it matters (concrete consequence of ignoring it)
- A practical example from real BI projects
- 2–3 sentences of actionable guidance

Target: 600–1000 words.

---

## MEDIUM (Fix Within 1 Month)

### 6. Add FAQ Schema to Question-Based Pages

**Impact:** Rich results in SERPs (FAQ dropdowns)  
**Effort:** 1–2 hours  
**Target pages:** tahtimalli.html, dimensiot.html, lumihiutalemalli.html (all use question H2s)

Example for tahtimalli.html — add alongside existing TechArticle schema:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Miten tähtimalli rakentuu ja toimii?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tähtimallissa faktataulun ympärille liitetään dimensiotaulut suoraan..."
      }
    }
  ]
}
```

---

### 7. Add Images to Core Content Pages

**Impact:** Dwell time, E-E-A-T, image search traffic  
**Effort:** 2–4 hours (design + implementation)  
**Priority pages:**
- `dimensiot.html` — SCD type diagram
- `tahtimalli-esimerkit.html` — schema comparison visuals
- `ai-valmis-metadata.html` — metadata diagram

The tahtimalli.html diagram is a good model to follow. Simple, labelled SVG or PNG diagrams would be sufficient.

---

### 8. Expand lumihiutalemalli.html (375 → 800+ words)

**Impact:** Rankings for "lumihiutalemalli" / "snowflake schema"  
**Effort:** 1–2 hours writing  

Currently 375 words — borderline thin for a topic page. Add:
- More concrete examples of when snowflake makes sense vs. star
- Comparison table vs tähtimalli
- Link back to litistaminen.html more prominently

---

### 11. Shorten tahtimalli-esimerkit.html Title Tag

**Impact:** SERP display, CTR  
**Effort:** 5 min  

Current: `Tähtimalli ja lumihiutalemalli Power BI:ssä: viisi esimerkkiä | Datamalli.fi` (77 chars — truncated in SERPs)

Suggested: `Power BI -tietomallit: 5 esimerkkiä parhaasta huonoimpaan | Datamalli.fi` (71 chars)  
Or: `5 Power BI -tietomalliesimerkkiä: tähtimallista sekasikiömalliin | Datamalli.fi` (79 — still long)  
Or: `Tähtimalli Power BI:ssä – 5 esimerkkiä | Datamalli.fi` (52 chars ✓)

---

### 12. Expand tietoa.html (286 → 600+ words)

**Impact:** Author E-E-A-T, trust  
**Effort:** 1 hour writing  

The About page should be the strongest signal of Samu's expertise. Currently 286 words. Add:
- Career highlights / specific projects
- Why the site was built
- What makes Dataneuvos's approach different
- Qualifications/certifications if applicable

---

## LOW (Backlog)

### 15. Add DefinedTerm schema to individual terms in termisto.html

Individual terms in the termistö (e.g., "tähtimalli", "dimensio", "surrogaattiavain") could each carry `DefinedTerm` schema within the existing `DefinedTermSet`. Would improve Google's understanding of the terms page structure.

### 16. Monitor SSL Certificate Expiry

Current cert expires 2026-08-27. Let's Encrypt auto-renews, but confirm renewal automation is working. Alert if cert is within 30 days of expiry.

### 17. Consider a Sitemap Index When Draft Pages Graduate

When the 8 draft pages launch, consider splitting into a topic-based sitemap structure if total page count exceeds 50.

### 18. Add `<link rel="preload">` for fonts (self-host valmis)

#5 on nyt tehty, joten tämä on toteutettavissa: lisää preload-vihjeet above-the-fold-käytössä oleville woff2-tiedostoille render-blockingin poistamiseksi.

---

## Implementation Roadmap

| Week | Tasks |
|------|-------|
| Week 1 | #1 Security headers |
| Week 2 | #3 kehittamisen-filosofia.html expansion |
| Week 3 | #6 FAQ schema |
| Week 4 | #7 Images for dimensiot.html + tahtimalli-esimerkit.html, #8 lumihiutalemalli expansion |
| Month 2 | #11 Title tag fix, #12 tietoa.html expansion |
| Backlog | #15, #16, #17, #18 |
