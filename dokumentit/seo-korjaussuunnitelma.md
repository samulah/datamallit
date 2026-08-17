# SEO-korjaussuunnitelma — datamalli.fi

> Pohjautuu SEO-auditointiin 2026-06-07. SEO Health Score lähtötilanteessa: **64/100**.
> Toimiala: suomenkielinen tietojulkaisija (Power BI / tietomallinnus). 7 aliagentin rinnakkaisauditointi.

## Tilanneyhteenveto

| Osa-alue | Pisteet | Pääongelma |
|---|---|---|
| Tekninen SEO | 68/100 | Google Fonts @import, CLS nav-elementistä, HSTS puuttuu |
| Sisältö & E-E-A-T | 70/100 | Ei tietosuojasivua, ei ulkoisia lähteitä, tietoa.html ohut |
| On-page SEO | 58/100 | Ei meta-kuvauksia, coming-soon-kortit dilutoivat etusivua |
| Schema | 75/100 | publisher ei @id-viittaus, logo ei ImageObject, WebSite ei @id |
| Suorituskyky (CWV) | 55/100 | Fonts @import (LCP), nav-elementti (CLS), splash-ruutu |
| AI-hakuvalmius (GEO) | 56/100 | Kappaleet liian lyhyitä (16–78 sanaa), H2:t ei kysymysmuodossa |
| Kuvat | 65/100 | Kaikilla sivuilla sama OG-kuva, ei img width/height attribuutteja |

---

## Vaihe 1 — KRIITTISET (korjaa välittömästi)

### [x] K1. Google Fonts ladataan CSS @import -metodilla — VALMIS (2026-06-07)

`style.css` ensimmäinen rivi on `@import url('https://fonts.googleapis.com/...')`. Tämä luo 3-vaiheisen waterfall-ketjun joka latauskerralla:
HTML → style.css → fonts.googleapis.com CSS → fonts.gstatic.com fontit

**Korjaus:**
1. Poista `@import`-rivi `style.css`:n alusta kokonaan.
2. Lisää jokaisen sivun `<head>`:iin (ennen `<link rel="stylesheet">` style.css:lle):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">
```
- **Tarkistus:** PageSpeed Insights ennen/jälkeen — LCP-arvo paranee. Ei enää "Eliminate render-blocking resources" -varoitusta fonteille.
- **Seuranta:** PageSpeed Insights LCP-kenttädata (CrUX)

---

### [x] K2. `<main-navigation>` web-komponentti aiheuttaa CLS joka latauksella — VALMIS (2026-06-07)

HTML-body alkaa `<main-navigation></main-navigation>` → tyhjä elementti kunnes `navigation.js` (defer) suoritetaan → injektoi ~96px navigaatiopalkin → kaikki sisältö siirtyy alas. Suora, toistettava CLS-tapahtuma.

**Korjaus (2 riviä `style.css`:ään):**
```css
main-navigation {
  display: block;
  min-height: 56px;
}
```
- **Tarkistus:** PageSpeed Insights CLS-arvo lähestyy 0. Chrome DevTools → Performance → Layout Shifts.
- **Seuranta:** CrUX CLS-kentän p75-arvo

---

### [x] K3. Tietosuojasivu puuttuu (GDPR-riski + E-E-A-T) — VALMIS (2026-06-07)

Datamalli Tiimi Oy on rekisteröity suomalainen yritys. Sivustolla ei ole tietosuojaselostetta, evästeilmoitusta eikä tietojenkäsittelykuvausta. Google QRG 2025 arvioi tämän negatiivisesti luotettavuuden alla.

**Korjaus:**
1. Luo `/tietosuoja.html` minimisisällöllä: rekisterinpitäjä (Datamalli Tiimi Oy), yhteystiedot, mitä tietoja kerätään/ei kerätä.
2. Lisää footer-linkki `navigation.js`:ään.
3. Lisää `tietosuoja.html` `sitemap.xml`:ään.
- **Tarkistus:** Sivu indeksoituu; footer-linkki näkyy kaikilla sivuilla.

---

### [x] K4. Meta-kuvaukset — JO TEHTY, ei toimenpiteitä

Google generoi automaattisesti SERP-snippetin teknisestä tekstistä — ei houkutteleva. CTR menetetään kilpailijoille (Microsoft Learn, Sulava jne.).

**Korjaus:** Lisää jokaisen julkaistun sivun `<head>`:iin 140–155 merkin kuvaus:

| Sivu | Ehdotus |
|---|---|
| index.html | "Suomenkielinen, käytännönläheinen tietomallinnuksen opas Power BI -ammattilaisille. Tähtimalli, dimensiot, SCD-tyypit ja AI-valmis data — ilman jargonia." |
| dimensiot.html | "Opi dimensioiden mallinnus tähtimallissa: SCD-tyypit 0–6, surrogate key, kardinaliteetti ja suorituskyky. Käytännönläheinen opas Power BI -kehittäjille." |
| tahtimalli.html | Kirjoita vastaava 140–155 merkin kuvaus pääsisällöstä |
| (muut sivut) | Yksilöllinen kuvaus kullekin sivulle |

- **Tarkistus:** `grep -l 'name="description"' html/*.html` → kaikki julkaistut sivut
- **Seuranta:** GSC CTR nousee indeksoituneilla sivuilla

---

## Vaihe 2 — KORKEA PRIORITEETTI (n. 1 viikko)

### [x] H1. Schema: TechArticle publisher ei @id-viittaus — VALMIS (2026-06-07)

`dimensiot.html` ja muut artikkelisivut määrittelevät `publisher`-kentän uutena inline Organization-objektina. Google ei pysty yhdistämään tätä kotisivun Organization-entiteettiin (@id-ankkuri puuttuu).

**Korjaus** kaikilla TechArticle-sivuilla:
```json
"publisher": { "@id": "https://www.datamalli.fi/#organization" }
```

---

### [x] H2. Schema: Organization.logo ei ole ImageObject — VALMIS (2026-06-07)

Kotisivulla `"logo": "https://www.datamalli.fi/kuvat/dataneuvos_logo.png"` on pelkkä URL-merkkijono. Googlen validaattori vaatii ImageObjectin.

**Korjaus:**
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://www.datamalli.fi/kuvat/dataneuvos_logo.png"
}
```

---

### [x] H3. Schema: WebSite puuttuu @id — VALMIS (2026-06-07)

Ilman `@id`:tä artikkelisivut eivät voi ristiviitata WebSite-entiteettiin entiteettigrafissa.

**Korjaus:** Lisää kotisivun WebSite-objektiin:
```json
"@id": "https://www.datamalli.fi/#website"
```

---

### [x] H4. Schema: TechArticle author URL osoittaa kotisivulle, ei Person-entiteettiin — VALMIS (2026-06-07)

`author.url` = `https://www.datamalli.fi/` (Organization), pitäisi olla `https://www.datamalli.fi/tietoa.html` (Person). Lisää myös `@id`.

**Korjaus:**
```json
"author": {
  "@type": "Person",
  "name": "Samu Lahdenperä",
  "url": "https://www.datamalli.fi/tietoa.html",
  "@id": "https://www.datamalli.fi/#samu-lahdenpera"
}
```

---

### [x] H5. Schema: TechArticle puuttuu mainEntityOfPage — VALMIS (2026-06-07)

**Korjaus** (esim. dimensiot.html):
```json
"mainEntityOfPage": { "@id": "https://www.datamalli.fi/dimensiot.html" }
```

---

### [x] H6. kehittaminen-filosofia.html: noindex päällä vaikka julkaistujen listassa — VALMIS (2026-06-07)

Sivu on julkaisusuunnitelman mukaan "Valmis" mutta noindex on päällä kahdessa kohdassa (rivit 7 ja 8) eikä sivu ole sitemapissa. Kun viimeistelypassi tehty:
1. Poista molemmat noindex-tagit
2. Lisää `sitemap.xml`:ään

---

### [x] H7. Coming-soon-kortit dilutoivat etusivun auktoriteettisignaalia

8 julkaisematonta artikkelia näkyy etusivulla täysikokoisina kortteina. Googlebot tulkitsee sivuston 53-prosenttisesti valmiiksi.

**Korjaus:** Siirrä Tulossa-kortit selvästi etusivun alaosaan omaksi osakseen, tai poista ne kunnes sisältö on valmis julkaisuun.

---

### [x] H8. Sitemap lastmod — VALMIS (2026-06-07)-päivämäärät kaikki identtisiä (2026-06-01)

Google lopettaa lastmod-tiedon hyödyntämisen kun kaikki sivut jakavat saman päivämäärän.

**Korjaus:** Päivitä `sitemap.xml` per-sivu oikeilla muokkausajankohdilla. Päivitä myös jatkossa aina kun sivun sisältöä muutetaan.

---

### [x] H9. Ei ulkoisia lähteitä — VALMIS (2026-06-07) sisältösivuilla (E-E-A-T)

Kummassakaan tarkistetussa artikkelissa ei ole linkkejä Microsoft Docsiin, Kimball Groupiin tai muihin auktoriteettilähteisiin. Russo & Ferrari 2021 mainitaan tahtimalli-sivulla mutta ilman linkkiä.

**Korjaus:** Lisää 2–3 kontekstuaalista ulkoista linkkiä per artikkeli:
- VertiPaq-suorituskykyselitykset → Microsoft Docs
- SCD-tyypit → Kimball Group tai Russo & Ferrari 2021
- Surrogate key → Microsoft Docs Power Query

---

### [x] H10. Tekstikappaleet — VALMIS (2026-06-07) liian lyhyitä AI-siteerattavuudelle (GEO)

Mitatut kappalepituudet tahtimalli-sivulla: 35, 24, 16, 21, 44, 42, 50, 78 sanaa. AI-järjestelmien optimaalisin siteerattavuusikkuna on 134–167 sanaa per itsensä sisältävä kappale.

**Korjaus:** Yhdistä lyhyet peräkkäiset kappaleet yhtenäisiksi vastausblokeiksi jokaisen H2:n alla. Tavoite: ainakin 1 kappaleen/H2-osion per sivu ylittää 134 sanaa itsessään.

---

### [x] H11. H2-otsikot — VALMIS (2026-06-07) eivät ole kysymysmuodossa (GEO)

Otsikot kuten "Rakenne ja toiminta" eivät täsmää kun AI hakee vastausta kyselyyn "miten tähtimalli toimii". `ai-valmis-metadata.html` tekee tämän jo oikein.

**Korjaus** tahtimalli.html ja dimensiot.html:
- "Rakenne ja toiminta" → "Miten tähtimalli rakentuu ja miten se toimii?"
- "Vahvuudet ja normalisointi" → "Mitkä ovat tähtimallin normalisoinnin edut?"
- jne. samalla logiikalla

---

### [x] H12. HSTS-header puuttuu — VALMIS (2026-06-07)

`Strict-Transport-Security` ei ole palvelimen vastauksissa. Lisätty `.htaccess`-tiedostoon (luotu samalla kertaa kuin M8/M9).

---

## Vaihe 3 — KESKITASO (n. 1 kuukausi)

| # | Löydös | Korjaus |
|---|---|---|
| ~~M1~~ | ~~`tietoa.html` ohut (~270 sanaa) E-E-A-T-ankurisivuksi~~ | VALMIS 2026-06-07 — laajennettu ~520 sanaan, lisätty toimitusfilosofia-osio |
| M2 | Kirjoittajainfoblokki puuttuu artikkelisivuilta | Lisää kompakti author-blokki H1:n alle (nimi, titteli, credential, päivämäärä) |
| ~~M3~~ | ~~Ei "Seuraavaksi lue" -CTA blokkia artikkelien lopussa~~ | VALMIS 2026-06-07 — lisätty kaikille 7 artikkelisivulle |
| ~~M4~~ | ~~Tietotaulukoissa ei `overflow-x: auto` mobiililla~~ | VALMIS 2026-06-07 — lisätty CSS @media-sääntö style.css:ään |
| ~~M5~~ | ~~Päivämääräelementit ovat pelkkää tekstiä~~ | VALMIS 2026-06-07 — `<time>` lisätty kaikkiin artikkelisivuihin |
| M6 | `termisto.html`: 238 DefinedTerm-schemaa, mutta ei `<dl><dt><dd>` HTML:ssä | Lisää semanttinen DOM-rakenne joka vastaa JSON-LD:tä |
| ~~M7~~ | ~~Navigaatio on täysin JS-riippuvainen, ei noscript-varatyökalua~~ | VALMIS 2026-06-07 — `<noscript>` lisätty kaikkiin 21 tiedostoon |
| ~~M8~~ | ~~`index.html` saavutettavissa ilman 301-ohjausta → pehmeä duplikaatti~~ | VALMIS 2026-06-07 — .htaccess luotu |
| ~~M9~~ | ~~X-Content-Type-Options ja Referrer-Policy puuttuvat~~ | VALMIS 2026-06-07 — lisätty .htaccess:iin |
| M10 | Kirjoittajan URL TechArticle-schemassa virheellinen (→ kotisivu, ei tietoa.html) | Korjattu H4:ssä — varmista kaikilla artikkelisivuilla |
| M11 | Etusivun H1 ei sisällä "Power BI" | Harkitse: "Datan mallinnuksen opas Power BI -kehittäjille" tai lisää se kuvaustekstiin |
| M12 | Kaikilla sivuilla sama OG-kuva | Luo sivukohtaiset OG-kuvat ainakin 3–4 pääartikkelille |
| ~~M13~~ | ~~`tietoa.html` title-tagi ei sisällä kirjoittajan nimeä~~ | VALMIS 2026-06-07 — muutettu "Samu Lahdenperä – Datamalli.fi:n tekijä \| Datamalli.fi" |
| ~~M14~~ | ~~TechArticle puuttuu `wordCount`-kenttä~~ | VALMIS 2026-06-07 — lisätty kaikkiin 7 TechArticle-schemoihin |

---

## Vaihe 4 — MATALA (backlog)

- [ ] **L1** — Etusivun arvolupaus epäselvä: lisää 1 lause joka erottaa sivuston Microsoft Learnista
- [ ] **L2** — Ei DAX- tai Power Query -koodiesimerkkejä dimensiot.html:ssä — lisää surrogate key -esimerkki Power Query M:llä
- [ ] **L3** — Ei "Mitä opit" / "Kenelle tämä sopii" -yhteenvetoblokkia artikkelien alussa
- [ ] **L4** — Staattisten resurssien Cache-Control on 7 pv — voisi olla 1 v (versioitu `?v=3`, joten turvallista)
- [ ] **L5** — HTML-vastauksissa ei Cache-Control -headeria — lisää `max-age=3600, must-revalidate`
- [ ] **L6** — Ei IndexNow-toteutusta — generoi avain Bingissä, lisää txt-tiedosto palvelimelle
- [ ] **L7** — Ei WebSite SearchAction -schemaa (Sitelinks Searchbox) — lisää jos haku toimii URL-parametrilla
- [ ] **L8** — Ei lisenssimäärittelyä `llms.txt`:ssä — lisää `# License: CC BY 4.0`
- [ ] **L9** — Ei suomenkielistä Wikipedia-artikkelia tähtimallista — korkein korrelaatio AI-siteerattavuuteen pitkällä tähtäimellä
- [ ] **L10** — TechArticle puuttuu `@id` — lisää `"@id": "https://www.datamalli.fi/dimensiot.html#article"`
- [ ] **L11** — Person-entiteetti voisi olla @id-ankkuroitu kotisivulla ja ristiviitattuna artikkelisivuilla
- [ ] **L12** — Splash-ruudun kesto 1 900 ms — harkitse lyhentämistä alle 500 ms tai poistamista (LCP-vaikutus uusille käyttäjille)

---

## Toteutusjärjestys (riippuvuudet huomioiden)

```
Viikko 1 — Kriittiset tekniset korjaukset:
  ├── [ ] K1: Poista @import style.css:stä → lisää <link> HTML:ään (kaikki sivut)
  ├── [ ] K2: main-navigation { min-height: 56px } style.css:ään
  ├── [ ] K3: Luo /tietosuoja.html + footer-linkki navigation.js:ään
  └── [ ] K4: Kirjoita meta-kuvaukset kaikille julkaistuille sivuille

Viikko 2 — Schema & E-E-A-T:
  ├── [ ] H1–H5: Schema-korjaukset (publisher @id, logo ImageObject, WebSite @id, author URL, mainEntityOfPage)
  ├── [ ] H8: Päivitä sitemap lastmod per-sivu oikeilla päivämäärillä
  ├── [ ] H9: Lisää ulkoiset lähdelinkit per artikkeli (2–3 kpl/sivu)
  └── [ ] H6: Viimeistele kehittaminen-filosofia.html → poista noindex, lisää sitemapiin

Viikko 3 — Sisältö & GEO:
  ├── [ ] H10: Yhdistä lyhyet kappaleet → 134–167 sanan vastausblokeja
  ├── [ ] H11: Muuta H2-otsikot kysymysmuotoon (tahtimalli + dimensiot)
  ├── [ ] H12: Tarkista HSTS-tilanne, lisää tarvittaessa
  └── [ ] H7: Siirrä Tulossa-kortit etusivun alaosaan

Viikko 4 — UX & mobiili:
  ├── [ ] M3: Lisää "Seuraavaksi lue" -blokki artikkeleiden loppuun
  ├── [ ] M4: Lisää overflow-x: auto taulukkowrappereihin
  └── [ ] M2: Lisää kirjoittajainfoblokki artikkelisivuille
```

---

## Ylläpito: julkaisun QA-lista (per uusi sivu)

Kun uusi sivu valmistuu ja noindex poistetaan:
1. Lisää sivu `sitemap.xml`:ään oikealla `lastmod`-päivämäärällä
2. Lisää TechArticle-schema (publisher `@id`-viittauksella, author `@id`-viittauksella, mainEntityOfPage)
3. Lisää BreadcrumbList-schema
4. Kirjoita meta-kuvaus (140–155 merkkiä)
5. Varmista H1 sisältää pääavainsanan
6. Lisää 2–3 ulkoista lähdelinkkiä
7. Lisää kirjoittajainfoblokki
8. Lisää "Seuraavaksi lue" -CTA lopuun
9. Päivitä `lastmod` myös muiden päivitettyjen sivujen osalta sitemapissa
