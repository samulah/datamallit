# Julkaisusuunnitelma — datamalli.fi

## Sivuston nykytila (päivitetty 2026-06-17)

**Julkaistut sivut — näkyvät navigaatiossa tai sitemapissa (16 kpl):**

| Sivu | Vaikeusaste | Huomio |
|---|---|---|
| index.html | ⭐ 1 | Valmis — päivitetty 2026-06-07 |
| tahtimalli.html | ⭐ 1 | Valmis — päivitetty 2026-06-07 (H2-otsikot, schema) |
| faktataulu.html | ⭐⭐ 2 | Julkaistu 2026-06-17 (noindex pois, sitemap, llms.txt; TechArticle jo paikallaan) |
| dimensiot.html | ⭐ 1 | Valmis — päivitetty 2026-06-07 (H2-otsikot, ulkoiset linkit) |
| litistaminen.html | ⭐ 1 | Valmis — päivitetty 2026-06-07 |
| lumihiutalemalli.html | ⭐ 1 | Valmis — päivitetty 2026-06-07 |
| nimeamiskaytannot.html | ⭐⭐ 2 | Valmis — päivitetty 2026-06-07 |
| kehittamisen-filosofia.html | ⭐ 1 | Valmis — julkaistu 2026-06-07 (noindex poistettu, sitemap lisätty) |
| ai-valmis-metadata.html | ⭐ 1 | Valmis — päivitetty 2026-06-07 |
| termisto.html | ⭐⭐ 2 | Valmis, kasvaa jatkuvasti — päivitetty 2026-06-10 |
| kirjallisuus-suositukset.html | ⭐⭐⭐ 3 | Julkaistu 2026-06-11 (noindex pois, sitemap, TechArticle, llms.txt) — 4/5 kirjaa katettu |
| tietoa.html | ⭐⭐ 2 | Valmis — laajennettu 500+ sanaan 2026-06-07 |
| tietosuoja.html | ⭐ 1 | Valmis — luotu 2026-06-07 (GDPR) |
| apuohjelmat.html | ⭐⭐ 2 | Julkaistu 2026-06-11 (noindex pois, sitemap, TechArticle, navigaatio + etusivun kortti) — 2 dataneuvos-mielipidettä vielä kirjoittamatta |
| tahtimalli-esimerkit.html | ⭐⭐ 2 | Julkaistu 2026-06-11 (noindex pois, sitemap, SEO-optimointi, sisäiset linkit tahtimalli + lumihiutalemalli) — järjestys huonoimmasta parhaaseen |
| arkkitehtuurivalinta.html | ⭐⭐⭐ 3 | Julkaistu 2026-06-14 (vertailutaulukot, TechArticle, sitemap; llms.txt lisätty 2026-06-17) |

**Piilotettu navigaatiosta, kesken — sisältö olemassa mutta ei valmis (3 kpl):**
- header-detail.html
- useampi-fakta.html
- data-governance.html

**Piilotettu navigaatiosta, stub tai kesken — kirjoitettu alusta (1 kpl):**
- surrogaattiavaimet.html — luotu 2026-06-15, sisältö kirjoitettu alusta (medallion + suuret dimensiot + inkrementaalinen lataus)

**Piilotettu navigaatiosta, stub — käytännössä tyhjä (4 kpl):**
- etl-elt.html
- medallion.html
- data-vault.html
- data-contract.html



## Julkaisuaalto-suunnitelma

Yksi julkaisu per viikko. Järjestys: helpoimmat ensin (vain viimeistely), vaikeimmat lopuksi (kirjoitettava alusta).

| Vko | Aalto | Sivu | Toimenpide | Työmäärä | Tila |
|---|---|---|---|---|---|
| 1 | Termistö | termisto.html | Viimeistely + termien lisäys | 3 h | ✅ Valmis |
| 2 | Filosofia | kehittamisen-filosofia.html | Lukutarkistus + noindex poisto | 1,5 h | ✅ Valmis |
| 3 | Header-Detail | header-detail.html | Sisällön viimeistely + kuvan tarkistus | 2 h | — |
| 4 | Useampi fakta | useampi-fakta.html | Sisällön viimeistely + kuvien lisäys — julkaistessa palauta linkki faktataulu.html:ään (granulariteetti-esimerkin loppuvirke, poistettu 2026-06-11) | 2,5 h | — |
| 5 | Apuohjelmat | apuohjelmat.html | Julkaistu 2026-06-11 — dataneuvos-mielipiteet (DAX Studio, VertiPaq Analyzer) kirjoittamatta | 4 h | ✅ Julkaistu |
| 6 | Data Governance | data-governance.html | Tarkistus + pituuden hallinta — julkaistessa palauta linkki termistöön (Datan elinkaari -termi, poistettu 2026-06-11) | 4 h | — |
| 7 | ETL/ELT | etl-elt.html | Kirjoitettava alusta | 5 h | — |
| 8 | Medallion | medallion.html | Kirjoitettava alusta | 5 h | — |
| 9 | Data Vault | data-vault.html | Kirjoitettava alusta | 6 h | — |
| 10 | Data Contract | data-contract.html | Kirjoitettava alusta — julkaistessa palauta linkit termistöön (Käyttötarkoituksen rajaus, Rikkova muutos ja SLA -termit, poistettu 2026-06-11) | 5 h | — |
| 11 | Sekasikiö vs tähti | sekasikiomalli-vs-tahtimalli.html | Kirjoitettava alusta — etusivun tulossa-kortti lisätty 2026-06-11 | 4 h | — |

Kokonaiskesto: 10 viikkoa, työmäärä yhteensä noin 36 tuntia.


## QA-suunnitelma — tarkistuslista per sivu

### Sisältö ja rakenne
1. Otsikkohierarkia oikein (h1 → h2 → h3)
2. Linkit toimivat (sisäiset ja ulkoiset)
3. Kuvien alt-tekstit kunnossa
4. Lähdeviitteet (kirjallisuus-suositukset.html-ankkureihin)
5. Termien yhdenmukaisuus muiden sivujen kanssa
6. Hakuindeksi (search-index.js) ajan tasalla
7. Navigaatiossa linkki olemassa
8. Mobiiliasu ok kapealla ikkunalla
9. Painovirheiden ja kielen tarkistus

### SEO-tarkistukset per uusi sivu (julkaisun QA-lista)
10. `<link rel="canonical" href="https://www.datamalli.fi/SIVU.html">` lisätty
11. Uniikki `<meta name="description">` 140–155 merkkiä
12. Open Graph -tagit (`og:title/description/type/url/image`) lisätty
13. TechArticle + BreadcrumbList JSON-LD lisätty — publisher `{ "@id": "https://www.datamalli.fi/#organization" }`, author `@id`-viittauksella, `mainEntityOfPage`, `wordCount`, `datePublished`, `dateModified`
14. `noindex` poistettu JA sivu lisätty `sitemap.xml`:ään `lastmod`-päivämäärällä
15. Tasan yksi `<h1>` ja oikea otsikkohierarkia
16. Staattiset tiedostot versioitu (`navigation.js?v=X`, `style.css?v=X`) — päivitä versioparametri kun tiedostoa muutetaan
17. Bylinessä päivämäärä `<time datetime="YYYY-MM-DD">`-elementissä
18. Lisää 2–3 ulkoista lähdelinkkiä artikkelia kohti (E-E-A-T)

### Tekninen infrastruktuuri (jo tehty 2026-06-07)
- `.htaccess`: Redirect 301 /index.html → /, X-Content-Type-Options, Referrer-Policy, HSTS
- `style.css`: Google Fonts preconnect (ei @import), CLS-fix (`main-navigation { min-height: 56px }`), taulukon `overflow-x: auto` mobiililla
- `navigation.js?v=4`: tietosuoja-linkki footerissa
- `llms.txt`: License CC BY 4.0


## Termistö-sivun jatkosuunnitelma

Termejä on nyt 131 kpl. Lisättäväksi tulevissa aalloissa:

- **Avaimet**: yhdistetty avain, alternate key
- **Tietomallit**: galaksimalli, big table -malli
- **Power BI**: näyttökansio, perspektiivi
- **ETL/ELT**: CDC (Change Data Capture), staging, idempotenssi

Aiemmista aalloista toteutettu: candidate key (ehdokasavain), BPA, RLE, sanakirjapakkaus, filter/row context, time intelligence, data lineage/steward/owner, GDPR, Bronze/Silver/Gold, hub, link, satellite — sekä 2026-06-10 lisätyt faktataulutermit (additiivisuustyypit, degeneraatioavain, arkkityypit, päivämäärädimensio).

Sivu on tarkoituksellisesti yksinkertainen ja akateemisen tyylinen kuten PDF: lyhyt selite, englanninkielinen vastine sulkeissa, ei mielipidelaatikoita. Sivulla on oma haku ja tägäys (termisto-search.js).
