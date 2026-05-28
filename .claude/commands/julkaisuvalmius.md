Tarkista sivuston julkaisukunto ja päivitä automaattiset rakenteet. Käyttö: /julkaisuvalmius tai /julkaisuvalmius @html/sivu.html

Jos tiedosto annetaan, tarkistetaan vain se sivu + yleiset rakenteet. Ilman argumenttia tarkistetaan kaikki.

## Mitä tehdään järjestyksessä

### 1. Lukemisaikojen päivitys (index.html data-min)

Laske kaikille sivuille lukemisaika samalla Python-logiikalla kuin navigation.js:ssä:
- Teksti (p, li, h2, h3): 200 sanaa/min
- Taulukkosarakkeet (td, th): 50 sanaa/min
- Visuaalit (img, figure, .mermaid): 40 s per kappale

Päivitä `data-min="X"` jokaisen `.kortti[href]`-elementin href-kohdetta vastaavalle riville `index.html`:ssä.
Käytä BeautifulSouppia tai python3 + html.parser. Älä koske kortteihin joilla ei ole data-min -attribuuttia (kesken-kortit jätetään).

### 2. Hakuindeksin tarkistus (search-index.js)

Lue `html/search-index.js`. Listaa kaikki sivut jotka löytyvät `index.html`:n korteista mutta PUUTTUVAT hakuindeksistä.
Lue myös sivujen nykyinen sisältö ja vertaa: onko hakuindeksissä vanhentunutta tekstiä joka ei enää vastaa sivun sisältöä (esim. poistetut kappaleet).
Raportoi puuttuvat ja mahdollisesti vanhentuneet — älä muuta hakuindeksiä automaattisesti, se vaatii harkintaa.

### 3. Termistö-haun päivitys (search-index.js + termisto.html)

Termistöllä on oma dynaaminen haku (termisto-search.js), mutta sen sisältö pitää olla myös päähaun (search-index.js) piirissä niin että etusivun hakukenttä löytää termejä.

Tee nämä:

1. Lue `html/termisto.html`. Kerää kaikki `.termi`-elementit: `.termi-nimi`, `.termi-selite`, `.termi-en` -kentät tekstinä.
2. Rakenna niistä kompakti hakuindeksiteksti (terminimi + selite + englanninkielinen vastine, yksi per rivi tai välilyönnillä erotettuna).
3. Tarkista onko `html/search-index.js`:ssä jo merkintä `'termisto.html'`. Jos on, korvaa se uudella. Jos ei ole, lisää se muiden merkintöjen loppuun ennen sulkevaa `}`.
4. Raportoi montako termiä löytyi ja päivitettiinkö indeksi.

### 4. Lorem ipsum -skannaus

Etsi kaikista `html/*.html`-tiedostoista "Lorem ipsum" -teksti.
Raportoi: missä tiedostoissa ja miten monta osumaa.

### 4. Navigaatiotarkistus (navigation.js)

Lue `html/navigation.js`. Listaa sivut jotka:
- Ovat navigaatiossa mutta EIVÄT index.html:n korteissa
- Ovat index.html:n korteissa (ilman .kesken-luokkaa) mutta EIVÄT navigaatiossa

### 5. Rikkoutuneet sisäiset linkit

Käy kaikki `href`-attribuutit läpi kaikista HTML-tiedostoista. Tarkista että `html/`-kansio sisältää kohdetiedoston. Raportoi puuttuvat.

### 6. Kehityspäiväkirjamerkintä

Lisää `kehityspaivakirja.md`:hen tänään tehtyjen muutosten tiivistelmä (1–3 riviä) nykyisen päivän kohtaan.

---

## Raporttipohja lopuksi

```
## Julkaisuvalmius — [päivämäärä]

### Lukemisajat päivitetty
- sivu.html: X min → Y min (muuttui)
- sivu.html: X min (ei muutosta)

### Termistö-haku
- Päivitetty: N termiä indeksoitu search-index.js:ään

### Hakuindeksi
- PUUTTUU: sivu.html — ei löydy search-index.js:stä
- OK: N sivua indeksoitu

### Lorem ipsum
- apuohjelmat.html: 2 osumaa
- kirjallisuus-suositukset.html: 4 osumaa

### Navigaatio
- OK / [poikkeamat]

### Rikkoutuneet linkit
- OK / [puuttuvat tiedostot]
```
