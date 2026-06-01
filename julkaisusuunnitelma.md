# Julkaisusuunnitelma — datamalli.fi

## Sivuston nykytila (päivitetty 2026-05-20)

**Julkaistut sivut — näkyvät navigaatiossa (11 kpl):**

| Sivu | Vaikeusaste | Huomio |
|---|---|---|
| index.html | ⭐ 1 | Valmis — läpikäyty 2026-05-20 |
| tahtimalli.html | ⭐ 1 | Valmis — läpikäyty 2026-05-20 |
| dimensiot.html | ⭐ 1 | Valmis — päivitetty Word-sisällöllä, läpikäyty 2026-05-20 |
| flattaus.html | ⭐ 1 | Valmis — läpikäyty 2026-05-20 |
| lumihiutalemalli.html | ⭐ 1 | Valmis — läpikäyty 2026-05-20 |
| nimeamiskaytannot.html | ⭐⭐ 2 | Valmis — läpikäyty 2026-05-20 |
| kehittamisen-filosofia.html | ⭐ 1 | Valmis |
| ai-valmis-metadata.html | ⭐ 1 | Valmis |
| termisto.html | ⭐⭐ 2 | Valmis, kasvaa jatkuvasti |
| apuohjelmat.html | ⭐⭐⭐ 3 | 2x Lorem ipsum (DAX Studio + VertiPaq Analyzer) |
| kirjallisuus-suositukset.html | ⭐⭐⭐ 3 | 4/5 kirjan Dataneuvoksen mielipide = Lorem ipsum |

**Piilotettu navigaatiosta, kesken — sisältö olemassa mutta ei valmis (3 kpl):**
- header-detail.html
- useampi-fakta.html
- data-governance.html

**Piilotettu navigaatiosta, stub — käytännössä tyhjä (4 kpl):**
- etl-elt.html
- medallion.html
- data-vault.html
- data-contract.html


## Julkaisuaalto-suunnitelma

Yksi julkaisu per viikko. Valmiit sivut ovat jo verkossa, joten aalto käsittelee kesken-sivut. Järjestys: helpoimmat ensin (vain viimeistely), vaikeimmat lopuksi (kirjoitettava alusta).

| Vko | Aalto | Sivu | Toimenpide | Työmäärä |
|---|---|---|---|---|
| 1 | Termistö | termisto.html | Viimeistely + termien lisäys | 3 h |
| 2 | Filosofia | kehittamisen-filosofia.html | Lukutarkistus + kesken-merkin poisto | 1,5 h |
| 3 | Header-Detail | header-detail.html | Sisällön viimeistely + kuvan tarkistus | 2 h |
| 4 | Useampi fakta | useampi-fakta.html | Sisällön viimeistely + kuvien lisäys | 2,5 h |
| 5 | Kirjallisuus | kirjallisuus-suositukset.html | Lorem ipsum poistettava, viimeistely | 3 h |
| 6 | Apuohjelmat | apuohjelmat.html | Lorem ipsum poistettava, pitkä sivu | 4 h |
| 7 | Data Governance | data-governance.html | Tarkistus + pituuden hallinta | 4 h |
| 8 | ETL/ELT | etl-elt.html | Kirjoitettava alusta | 5 h |
| 9 | Medallion | medallion.html | Kirjoitettava alusta | 5 h |
| 10 | Data Vault | data-vault.html | Kirjoitettava alusta | 6 h |

Kokonaiskesto: 10 viikkoa, työmäärä yhteensä noin 36 tuntia.


## QA-suunnitelma valmiille sivuille

Tarkistuslista per sivu:
1. Otsikkohierarkia oikein (h1 → h2 → h3)
2. Linkit toimivat (sisäiset ja ulkoiset)
3. Kuvien alt-tekstit kunnossa
4. Lähdeviitteet (kirjallisuus-suositukset.html-ankkureihin)
5. Termien yhdenmukaisuus muiden sivujen kanssa
6. Hakuindeksi (search-index.js) ajan tasalla
7. Navigaatiossa linkki olemassa
8. Mobiiliasu ok kapealla ikkunalla
9. Painovirheiden ja kielen tarkistus
10. Staattiset tiedostot versioitu (`navigation.js?v=X`, `style.css?v=X`) — estää selaimen välimuistin ongelmat käyttäjillä. Päivitä versioparametri aina kun tiedostoa muutetaan.

### SEO-tarkistukset per sivu (ks. seo-korjaussuunnitelma.md)
11. `<meta name="viewport" content="width=device-width, initial-scale=1">` on `<head>`:ssä (C2)
12. Uniikki `<meta name="description">` 140–160 merkkiä (H1)
13. `<link rel="canonical">` osoittaa `https://www.datamalli.fi/SIVU.html` (C1)
14. Open Graph -tagit (`og:title/description/type/url/image`) lisätty (H2)
15. JSON-LD (TechArticle + BreadcrumbList) lisätty staattiseen HTML:ään — ks. `generated-schema.json` (M2)
16. Kun sivu julkaistaan: `noindex` poistettu JA sivu lisätty `sitemap.xml`:ään (C3/C4)
17. Keskeneräisellä/piilotetulla sivulla on `<meta name="robots" content="noindex,nofollow">` (C4)
18. Tasan yksi `<h1>` ja oikea otsikkohierarkia (H3)

QA-aikaarviot per sivu (lukea ja tarkistaa kunnolla):

| Sivu | Pituus | Aikaarvio |
|---|---|---|
| tahtimalli.html | 127 r | 60 min |
| dimensiot.html | 325 r | 120 min |
| flattaus.html | 76 r | 45 min |
| lumihiutalemalli.html | 59 r | 30 min |
| nimeamiskaytannot.html | 103 r | 45 min |
| termisto.html | uusi | 60 min |

QA-kierros yhteensä: noin 6 tuntia kerralla. Suositus: tarkistus per sivu kun julkaisuaalto tekee muutoksia, ja täysi kierros ennen ensimmäistä julkaista-aaltoa (vko 1) ja toistettuna 3 kk välein.


## Termistö-sivun jatkosuunnitelma

Ensimmäinen versio kattaa noin 35 termiä. Lisättäväksi tulevissa aalloissa:

- **Avaimet**: yhdistetty avain, alternate key, candidate key
- **Tietomallit**: galaksimalli, big table -malli
- **Power BI**: BPA, RLE, sanakirjastoenkoodaus, näyttökansio, perspektiivi
- **DAX-konseptit**: filter context, row context, time intelligence
- **Hallinta**: data lineage, data steward, data owner, GDPR
- **Arkkitehtuuri**: Bronze/Silver/Gold (omat termit), hub, link, satellite
- **ETL/ELT**: CDC (Change Data Capture), staging, idempotenssi

Sivu on tarkoituksellisesti yksinkertainen ja akateemisen tyylinen kuten PDF: lyhyt selite, englanninkielinen vastine sulkeissa, ei mielipidelaatikoita. Sivulla on oma haku ja tägäys (termisto-search.js).
