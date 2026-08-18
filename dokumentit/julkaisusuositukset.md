# Julkaisusuositukset

Päivitetty: 2026-06-16

---

## Julkaisujärjestys

### 1. faktataulu.html — julkaise ensin
**1 856 sanaa · noindex,nofollow jo paikallaan**

Tähtimalli ja dimensiot ovat julkaistu, mutta faktataululle ei ole omaa sivua vaikka etusivulla lukee "tulossa". Selvin aukko nykyisessä sisällössä. Rakenne, meta ja schema kunnossa — ei vaadi muutoksia.

### 2. arkkitehtuurivalinta.html — julkaise toisena
**1 867 sanaa · HTML korjattu 2026-06-16**

Kattavat vertailutaulukot (OBT, tähtimalli, lumihiutalemalli, 3NF, Data Vault, Medallion, Data Mesh), käyttötilanne- ja teknisyystaulut, Dataneuvoksen mielipide-osio. Korkea SEO-potentiaali — kukaan muu ei kirjoita suomeksi "milloin Data Vault vs tähtimalli". Rivi 49:n rikki HTML-rimpsu korjattu.

### 3. surrogaattiavaimet.html — julkaise kolmantena
**2 044 sanaa · schema ja byline kunnossa**

SQL-koodiesimerkit, mapping-taulut, SCD Type 1 ja 2. Viittaa medallion-arkkitehtuuriin, mutta toimii itsenäisesti — voidaan julkaista ennen medallion-sivua. Linkitetään dimensiot.html-sivulta surrogaattiavaimet-osiosta.

### 4. data-contract.html + data-governance.html — julkaise pareina
**1 218 + 1 107 sanaa**

Molemmat vahvistavat "Hallinta ja laatu" -kategoriaa etusivulla, jossa ne ovat jo "tulossa"-korteissa. Julkaise yhdessä, jotta kategoria täydentyy kerralla.

### 5. useampi-fakta.html — viimeistele ensin, sitten julkaise
**394 sanaa · puuttuu TechArticle-schema, OG-tagit vajaat**

Sisältö on hyvä (Word-tuonti), mutta head-blokki on kevyt. Lisää schema (TechArticle + BreadcrumbList), täydennä OG-tagit ja canonical ennen julkaisua.

---

## Ei vielä julkaisuvalmis

| Sivu | Sanat | Tilanne |
|------|-------|---------|
| header-detail.html | 296 | Ohut — vain yksi H2, laajenna ensin |
| data-vault.html | 299 | Ohut — vain yksi H2, laajenna ensin |
| etl-elt.html | 82 | Tynkä |
| medallion.html | 73 | Tynkä |

---

## Kehitysprioritetti: medallion.html

**Kehitä seuraavaksi** — on riippuvuus kahdelle lähes valmiille sivulle:
- `arkkitehtuurivalinta.html` linkittää siihen Medallion-rivin kohdalta
- `surrogaattiavaimet.html` on kirjoitettu medallion-arkkitehtuurin kontekstiin

Pohja-aines on jo olemassa arkkitehtuurivalinta.html:n Medallion-osiossa (Bronze/Silver/Gold-kuvaukset, hyödyt ja rajoitteet). Laajenna se omaksi ~800–1 000 sanan sivuksi.
