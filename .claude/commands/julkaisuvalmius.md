Tarkista sivuston julkaisukunto ja päivitä automaattiset rakenteet. Käyttö: /julkaisuvalmius tai /julkaisuvalmius @sivu.html

Jos tiedosto annetaan, tarkistetaan vain se sivu + yleiset rakenteet. Ilman argumenttia tarkistetaan kaikki.

Kaikki sivut ovat repon **juuressa** (ei `html/`-alikansiossa).

## Mitä tehdään järjestyksessä

### 1. Metatietojen generointi

Aja generaattori — se hoitaa lukemisajat, etusivun kortit, `sivut.js`:n ja `sitemap.xml`:n:

```bash
python3 tyokalut/rakenna.py
python3 tyokalut/rakenna.py --raportti
```

Älä laske lukemisaikoja käsin äläkä muokkaa `data-min`-attribuutteja — generaattori omistaa ne.
Raportoi mitkä tiedostot muuttuivat ja mitä `--raportti` nosti esiin (puuttuvat `description`- tai
`dateModified`-kentät, tagittomat sivut, julkaisutila, hakuindeksistä puuttuvat sivut).

Jos `--raportti` valittaa tuntemattomasta tagista, lisää slug ensin `search.js`:n `TAGI_NIMET`-tauluun.

### 2. Hakuindeksin tarkistus (search-index.js)

`--raportti` listaa jo sivut jotka puuttuvat hakuindeksistä. Lue lisäksi sivujen nykyinen sisältö ja
vertaa: onko hakuindeksissä vanhentunutta tekstiä joka ei enää vastaa sivun sisältöä (esim. poistetut
kappaleet). Raportoi puuttuvat ja mahdollisesti vanhentuneet — älä muuta hakuindeksiä automaattisesti,
se vaatii harkintaa.

### 3. Termistö-haun päivitys (search-index.js + termisto.html)

Termistöllä on oma dynaaminen haku (termisto-search.js), mutta sen sisältö pitää olla myös päähaun
(search-index.js) piirissä niin että etusivun hakukenttä löytää termejä.

1. Lue `termisto.html`. Kerää kaikki `.termi`-elementit: `.termi-nimi`, `.termi-selite`, `.termi-en`.
2. Rakenna niistä kompakti hakuindeksiteksti (terminimi + selite + englanninkielinen vastine).
3. Tarkista onko `search-index.js`:ssä jo merkintä `'termisto.html'`. Jos on, korvaa se uudella.
   Jos ei ole, lisää se muiden merkintöjen loppuun ennen sulkevaa `}`.
4. Raportoi montako termiä löytyi ja päivitettiinkö indeksi.

### 4. Lorem ipsum -skannaus

Etsi kaikista juuren `*.html`-tiedostoista "Lorem ipsum" -teksti. Raportoi tiedostot ja osumamäärät.

### 5. Navigaatiotarkistus (navigation.js)

Listaa sivut jotka:
- Ovat navigaatiossa mutta EIVÄT `index.html`:n `data-kortit`-listoissa
- Ovat `data-kortit`-listoissa julkaistuina (ei `noindex`) mutta EIVÄT navigaatiossa

### 6. Rikkoutuneet sisäiset linkit

Käy kaikki `href`-attribuutit läpi kaikista HTML-tiedostoista. Tarkista että repon juuressa on
kohdetiedosto. Raportoi puuttuvat.

### 7. Päivityslista

Jos muutokset ollaan viemässä gittiin, lisää merkintä `paivitykset.html`:ään ja päivitä
`navigation.js`:n `SIVUSTO_PAIVITETTY` samaan päivämäärään.

---

## Raporttipohja lopuksi

```
## Julkaisuvalmius — [päivämäärä]

### Generointi
- Kirjoitettu N tiedostoa: [lista] / Ei muutoksia
- Lukemisaika muuttui: sivu.html X → Y min

### Metatietojen puutteet
- sivu.html: dateModified puuttuu

### Termistö-haku
- Päivitetty: N termiä indeksoitu search-index.js:ään

### Hakuindeksi
- PUUTTUU: sivu.html — ei löydy search-index.js:stä
- OK: N sivua indeksoitu

### Lorem ipsum
- apuohjelmat.html: 2 osumaa

### Navigaatio
- OK / [poikkeamat]

### Rikkoutuneet linkit
- OK / [puuttuvat tiedostot]
```
