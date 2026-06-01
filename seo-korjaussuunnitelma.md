# SEO-korjaussuunnitelma — datamalli.fi

> Pohjautuu SEO-auditointiin 2026-06-01. SEO Health Score lähtötilanteessa: **46/100**.
> Sisältö on hyvää ja uniikkia — puuttuu tekninen perusta, jolla Google löytää, renderöi ja luottaa siihen.
> Tehtävät on järjestetty riippuvuuksien mukaan: vaihe 1 ensin, se avaa loput.

## Tilanneyhteenveto (mistä pisteet putoavat)

| Osa-alue | Pisteet | Pääongelma |
|---|---|---|
| Tekninen SEO | 35/100 | Ei robots.txt / sitemap.xml, ei kanonisointia, ei HTTPS-ohjausta |
| Sisällön laatu | 62/100 | Hyvä uniikki sisältö; heikko E-E-A-T; placeholder-sivut indeksoitavissa |
| On-page SEO | 45/100 | Uniikit titlet, mutta **0 meta-descriptionia**, ei OG-tageja, 1 puuttuva H1 |
| Skeema | 5/100 | Ei lainkaan rakenteista dataa (korjattu: `generated-schema.json`) |
| Suorituskyky | 60/100 | Pienet tiedostot, nopea TTFB; render-blocking JS; **ei viewportia** |
| AI-näkyvyys | 40/100 | Ei skeemaa/päivämääriä/tekijää/sitemapia |
| Kuvat | 80/100 | Kaikilla 7 kuvalla alt-teksti ✓ |

---

## Vaihe 1 — KRIITTINEN (tehtävä ensin, estää indeksoinnin/mobiilin)

### [x] C1. Kanonisointi: sivusto vastasi 4 eri URL-muodossa — VALMIS (2026-06-01)
Aiemmin `http://www.`, `https://www.`, `http://` (apex) ja `https://` (apex) palauttivat kaikki `200` ilman ohjausta → Google saattoi jakaa signaalit duplikaateille.
- [x] Kanoninen osoite valittu: **`https://www.datamalli.fi`**
- [x] 301-ohjaukset palvelimelle lisätty (käyttäjä): kaikki 4 muotoa → `https://www.` yhdellä hypyllä, polku säilyy. Varmennettu curlilla.
- [x] `<link rel="canonical">` lisätty 8 valmiille (indeksoitavalle) sivulle; noindex-sivut ohitettu. Varmennettu: ei ristiriitaa canonical+noindex.
- **Tarkistus:** `curl -sI http://datamalli.fi/` → `301` → `https://www.datamalli.fi/` ✓ ; `grep -l 'rel="canonical"' *.html` → 8 sivua ✓
- **Julkaisu:** 8 muuttunutta HTML-tiedostoa ladattava palvelimelle; live-varmistus `curl -s https://www.datamalli.fi/tahtimalli.html | grep canonical`
- **Seuranta:** Search Console → Sivujen indeksointi → "duplikaatti ilman kanonista" laskee (viikkojen aikajänne)

### [x] C2. Viewport-meta puuttui kaikilta sivuilta — VALMIS (2026-06-01)
Ilman tätä mobiililaite renderöi työpöytäleveydellä = mobiilikelpoisuus pettää (mobile-first-indeksointi).
- [x] `<meta name="viewport" content="width=device-width, initial-scale=1">` lisätty **kaikkien 18 sivun** `<head>`:iin heti charset-rivin jälkeen
- [x] Päätös: **hardkoodattu staattiseen HTML:ään**, EI navigation.js-injektiota — viewport on luettava jäsennyshetkellä (navigation.js on `defer` → liian myöhään). Sama koskee tulevaa OG:tä (H2), koska some-robotit eivät aja JS:ää.
- **Tarkistus:** `grep -L 'name="viewport"' *.html` → tyhjä ✓ ; jokaisella tasan 1 (ei tuplia) ✓
- **Julkaisu:** 18 muuttunutta HTML-tiedostoa ladattava palvelimelle; live: `curl -s https://www.datamalli.fi/tahtimalli.html | grep viewport`
- **Seuranta:** GSC mobiilikäytettävyys; Mobile-Friendly-testi

### [x] C3. robots.txt ja sitemap.xml palauttivat 404 — VALMIS (2026-06-01)
- [x] `robots.txt` luotu: `Allow: /` kaikille + `Sitemap:`-rivi. **Ei Disallow noindex-sivuille** — muuten Google ei pääsisi lukemaan noindexia eikä deindeksoisi niitä.
- [x] `sitemap.xml` luotu: **8 indeksoitavaa sivua** (täsmälleen canonical-sivut; etusivu + 7 sisältösivua). Keskeneräiset noindex-sivut jätetty pois.
- **Tarkistus:** sitemapissa 8 `<loc>` ✓ ; ristivarmistettu ettei yksikään noindex-sivu ole mukana ✓
- **Julkaisu:** lataa `robots.txt` + `sitemap.xml` palvelimen juureen; sitten `curl https://www.datamalli.fi/sitemap.xml` (ei enää 404) ja lähetä sitemap Search Consoleen
- **Ylläpito:** kun keskeneräinen sivu valmistuu → poista sen `noindex` JA lisää se sitemapiin (QA-lista kohta 16)
- **Seuranta:** GSC Sitemaps → "Löydetyt URL-osoitteet" = 8

### [x] C4. Keskeneräiset placeholder-sivut ovat indeksoitavissa (kaikki 200, ei noindexiä)
Laadunheikennys koko sivustolle. Koskee:
- `medallion.html` (~46 san.), `etl-elt.html` (~55 san.) — sisältävät placeholder-tekstiä ("Laajennusvinkit")
- `data-vault.html`, `header-detail.html`, `kehittamisen-filosofia.html` — stubeja
- `samulol.html` — "Piirakanjakajat ry" -vitsisivu
- `apuohjelmat.html`, `kirjallisuus-suositukset.html` — sisältävät vielä Lorem ipsumia
- [x] Lisätty `<meta name="robots" content="noindex,nofollow">` 7 sivulle (2026-06-01): medallion, etl-elt, data-vault, header-detail, kehittamisen-filosofia, apuohjelmat, kirjallisuus-suositukset
- [x] `samulol.html` — poistettu paikallisesti (git: `D`); deploy → 404 poistaa indeksistä päättäväisemmin kuin noindex. **Varmista että deploy poistaa tiedoston palvelimelta** (nyt yhä live, palauttaa 200).
- [x] `noindex` lisätty myös: `useampi-fakta.html`, `data-governance.html`, `data-contract.html` (2026-06-01) → yhteensä **10 keskeneräistä sivua** noindexissä
- [ ] Poista `noindex` vasta kun sivu valmistuu (sopii viikoittaiseen julkaisuaaltoon)
- [ ] Pidä nämä poissa sitemapista kunnes valmiita
- **Tarkistus:** `grep -l 'name="robots"' *.html` listaa 10 sivua ✓ (todennettu 2026-06-01)
- **Seuranta:** GSC indeksoitujen sivujen määrä ei sisällä näitä

---

## Vaihe 2 — KORKEA (n. 1 viikko)

### [x] H1. Meta-descriptionit puuttuivat kaikilta — VALMIS (2026-06-01)
- [x] Uniikki kuvaus kirjoitettu 8 valmiille (indeksoitavalle) sivulle; merkkimäärät 137–155 (ei katkea SERP:issä). Noindex-sivut jätetty pois (kuvaus tehdään kun ne valmistuvat).
- **Tarkistus:** `grep -l 'name="description"' *.html` → 8 sivua ✓ ; ei noindex-sivuilla ✓

### [x] H2. Ei Open Graph / Twitter Card -tageja — VALMIS (2026-06-01)
- [x] Lisätty 8 valmiille sivulle: `og:type` (website/article), `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image` + `twitter:card=summary`. Noindex-sivut ohitettu.
- [x] `og:image` = logo (`kuvat/dataneuvos_logo.png`) väliaikaisena fallbackina
- [x] **VALMIS (2026-06-01):** oikea 1200×630 OG-jakokuva luotu (`kuvat/og-datamalli.png`, brändivärit + logo + tagline, renderöity @resvg/resvg-js:llä). `og:image` vaihdettu kaikilla 9 indeksoitavalla sivulla; lisätty `og:image:width/height/alt`; `twitter:card` → `summary_large_image`; TechArticle-skeeman `image` päivitetty (publisher-logo ennallaan).
- **Tarkistus:** `grep -l 'property="og:title"' *.html` → 8 ✓ ; live: jaa linkki / Facebook Sharing Debugger / LinkedIn Post Inspector

### [x] H3. `kirjallisuus-suositukset.html` — H1 puuttui — VALMIS (2026-06-01)
- [x] Korjattu rikkinäinen `<h1>...</h2>` → ehjä `<h1>`; johdantovirke palautettu `<h2>`:sta `<p>`:ksi. Sivulla nyt 1 H1 (h1 → h3, kirjat h3).

### [x] H4. `apuohjelmat.html` "julkaistu" mutta ei linkitetty — RATKAISTU (2026-06-01)
- [x] Valittu suositeltu vaihtoehto: pidetään noindexissä (tehty C4:ssä) kunnes Lorem ipsum poistettu. Kun sivu valmistuu → poista noindex, lisää sitemapiin ja linkitä navigaatioon.

---

## Vaihe 3 — KESKITASO (n. 1 kk)

- [x] **M1.** `search-index.js` — `defer` lisätty index.html:ään (latausjärjestys säilyy: data ennen searchia). VALMIS 2026-06-01
- [x] **M2.** Rakenteinen data lisätty staattisena JSON-LD:nä 8 valmiille sivulle, kaikki validoitu (node JSON.parse 8/8). VALMIS 2026-06-01
  - Organization + WebSite (etusivu) — ei SearchActionia (haku on client-side)
  - TechArticle + BreadcrumbList (6 sisältösivua: tahtimalli, lumihiutalemalli, dimensiot, nimeämiskäytännöt, litistäminen, ai-valmis-metadata)
  - DefinedTermSet + BreadcrumbList (termisto)
  - author=Samu Lahdenperä, publisher=Datamalli.fi, dateModified=2026-06-01
  - **Tarkistus:** Googlen Rich Results Test julkaisun jälkeen; **backlog:** termistöön voi lisätä per-termi `hasDefinedTerm`-listan (~60 termiä) lisähyödyksi
- [~] **M3.** E-E-A-T — osittain tehty (2026-06-01):
  - [x] **About-sivu** `tietoa.html` luotu: indeksoitava (canonical, viewport, description, OG), JSON-LD AboutPage + Person (Samu Lahdenperä, sameAs LinkedIn/dataneuvos.fi) + BreadcrumbList. Lisätty navigaatioon (navigation.js, `?v=2`→`?v=3` kaikilla 18 sivulla) ja sitemapiin (8→9 URL).
  - [x] **VALMIS (2026-06-01):** näkyvä tekijä-byline + päivityspäivä lisätty 7 sisältösivulle (`<p class="byline">Kirjoittanut <a href="tietoa.html">Samu Lahdenperä</a> · Päivitetty 1.6.2026</p>`, tyyli `.byline` style.css:ssä, cache-buster `?v=2`→`?v=3`). termistön skeemaan lisätty `author` + `dateModified`.
- [ ] **M4.** Tietoturvaotsikot (LiteSpeed/`.htaccess`): HSTS, X-Content-Type-Options, perus-CSP
- [x] **M5.** Brändin yhtenäisyys titleissä — VALMIS (2026-06-01): `… | Datamalli.fi` -loppuliite lisätty 7 sisältösivun titleen (kaikki ≤ 50 merkkiä, ei katkea SERP:issä). Etusivulla ja tietoa-sivulla brändi oli jo titlessä.

---

## Vaihe 4 — MATALA (backlog)

- [x] **L1.** `llms.txt` luotu (2026-06-01): 8 indeksoitavaa sivua + Tietoa, kuvauksineen, AI-crawlereille
- [x] **L2.** Pakkaus jo päällä — varmennettu `content-encoding: br` (Brotli) livenä. Ei toimenpiteitä.
- [x] **L4.** Etusivun korttien lukemisajat yhtenäistetty (2026-06-01): `data-min`-arvot laskettu uudelleen sanamäärästä yhtenäisellä ~130 wpm -nopeudella (tekninen/taulukkopitoinen sisältö). Korjattu 6 epäjohdonmukaista arvoa ja lisätty puuttuvat (termistö 15, tietoa 1, kehittämisen-filosofia 1). **Huom:** arvot ovat kovakoodattuja → laske uudelleen kun sivun sisältö muuttuu merkittävästi.
- [x] **L3.** Sisäinen linkitys täydennetty (2026-06-01): tähtimalli↔dimensiot, dimensiot↔lumihiutalemalli, lumihiutalemalli→tähtimalli, litistäminen→lumihiutalemalli+tähtimalli, ai-valmis-metadata→nimeämiskäytännöt. Ei rikkinäisiä linkkejä (kaikki kohteet olemassa).

---

## Suositeltu toteutusjärjestys (riippuvuudet huomioiden)

1. **C1 + C2** (ohjaukset, canonical, viewport) — perusta, jolle muu rakentuu
2. **C4** (noindex placeholdereille) — ennen sitemapin lähetystä, ettei Google indeksoi roskaa
3. **C3** (robots + sitemap 11 valmiista sivusta)
4. **H1 + H2 + H3** (descriptionit, OG, puuttuva H1) — klikkausprosentti + jaot
5. **M1–M5** julkaisuaallon edetessä

## Integraatio olemassa olevaan työnkulkuun
Suuri osa (viewport, canonical, OG, description, JSON-LD) on toistuvia per-sivu-muokkauksia → sopii `navigation.js`-jaetun injektion malliin ja viikoittaiseen julkaisuaaltoon. SEO-tarkistukset on lisätty `julkaisusuunnitelma.md`:n per-sivu QA-listaan.
