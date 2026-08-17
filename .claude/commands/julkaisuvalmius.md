Tarkista sivuston julkaisukunto ja päivitä automaattiset rakenteet. Käyttö: /julkaisuvalmius tai /julkaisuvalmius @sivu.html

Jos tiedosto annetaan, tarkistetaan vain se sivu + yleiset rakenteet. Ilman argumenttia tarkistetaan kaikki.

Julkaistut sivut ovat **`sivusto/`**-kansiossa ja keskeneräiset **`sivusto/luonnos/`**-kansiossa.
Sivuston skriptit ovat `sivusto/skriptit/` ja tyylit `sivusto/tyylit/`.

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

Jos `--raportti` valittaa tuntemattomasta tagista, lisää slug ensin `sivusto/skriptit/search.js`:n
`TAGI_NIMET`-tauluun.

Generaattori pysähtyy myös jos sivun sijainti ja `robots`-meta ovat ristiriidassa (noindex-sivu
sivuston juuressa tai julkaistu sivu luonnoksissa). Korjaa siirtämällä sivu oikeaan kansioon —
viesti kertoo komennon.

### 2. Hakuindeksin tarkistus (sivusto/skriptit/search-index.js)

`--raportti` listaa jo sivut jotka puuttuvat hakuindeksistä. Lue lisäksi sivujen nykyinen sisältö ja
vertaa: onko hakuindeksissä vanhentunutta tekstiä joka ei enää vastaa sivun sisältöä (esim. poistetut
kappaleet). Raportoi puuttuvat ja mahdollisesti vanhentuneet — älä muuta hakuindeksiä automaattisesti,
se vaatii harkintaa.

### 3. Termistö-haun päivitys (skriptit/search-index.js + termisto.html)

Termistöllä on oma dynaaminen haku (termisto-search.js), mutta sen sisältö pitää olla myös päähaun
(search-index.js) piirissä niin että etusivun hakukenttä löytää termejä.

1. Lue `sivusto/termisto.html`. Kerää kaikki `.termi`-elementit: `.termi-nimi`, `.termi-selite`, `.termi-en`.
2. Rakenna niistä kompakti hakuindeksiteksti (terminimi + selite + englanninkielinen vastine).
3. Tarkista onko `search-index.js`:ssä jo merkintä `'termisto.html'`. Jos on, korvaa se uudella.
   Jos ei ole, lisää se muiden merkintöjen loppuun ennen sulkevaa `}`.
4. Raportoi montako termiä löytyi ja päivitettiinkö indeksi.

### 4. Lorem ipsum -skannaus

Etsi kaikista `sivusto/`- ja `sivusto/luonnos/`-kansion `*.html`-tiedostoista "Lorem ipsum" -teksti.
Raportoi tiedostot ja osumamäärät.

### 5. Navigaatiotarkistus (skriptit/navigation.js)

Listaa sivut jotka:
- Ovat navigaatiossa mutta EIVÄT `index.html`:n `data-kortit`-listoissa
- Ovat `data-kortit`-listoissa julkaistuina (ei `noindex`) mutta EIVÄT navigaatiossa

### 6. Rikkoutuneet sisäiset linkit

Käy kaikki `href`-attribuutit läpi kaikista HTML-tiedostoista. Tarkista että kohdetiedosto on
olemassa: sivuston juuren sivut viittaavat suhteellisesti (`tahtimalli.html` = `sivusto/tahtimalli.html`),
luonnossivut juurisuhteellisesti (`/tahtimalli.html` = `sivusto/tahtimalli.html`). Raportoi puuttuvat.

Tarkista erikseen: **osoittaako jokin julkaistu sivu `luonnos/`-kansion sivuun?** Luonnoksia ei
deployata, joten sellainen linkki on 404 tuotannossa.

### 7. "Katso myös" -verkoston tarkistus

`katso-myos`-osiot ovat sivujen omissa tiedostoissa (`<section class="katso-myos" data-kortit="...">`),
eikä generaattori luo niitä — vain skriptitagit. Uusi sivu jää siis helposti irralleen verkostosta.
Tarkista viisi asiaa:

1. **Onko jokaisella julkaistulla artikkelisivulla `katso-myos`-osio?** Meta- ja hakemistosivut
   (`index`, `sivupohja`, `paivitykset`, `tietosuoja`, `tietoa`, `termisto`) eivät tarvitse.
2. **Osoittaako jokin `katso-myos` keskeneräiselle (`noindex`) tai olemattomalle sivulle?** Nämä
   renderöityvät rikkinäisinä kortteina.
3. **Saako jokainen julkaistu artikkeli vähintään yhden saapuvan `katso-myos`-linkin?** Ilman sitä
   sivu on orpo: siihen pääsee vain navigaatiosta ja etusivulta.
4. **Onko juuri julkaistu sivu lisätty aiheeltaan läheisten sivujen listoihin?** Esim. uuden
   `surrogaattiavaimet.html`:n pitää löytyä ainakin `avaimet-ja-relaatiot.html`:n listasta. Pelkkä
   uuden sivun oma lista ei riitä — linkkien pitää osoittaa myös sisäänpäin.
5. **Onko juuri julkaistu sivu listan ensimmäisenä?** `data-kortit` renderöityy siinä järjestyksessä
   kuin se on kirjoitettu, joten uutuus jää muuten viimeiseksi kortiksi — pahimmillaan toiselle riville
   omaksi orvokseen. Uutuusmerkin saanut sivu kuuluu jokaisen listan kärkeen.

Korttirivi on `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`, joten viides ja kuudes
kortti rivittyvät siististi. Listaan saa siis lisätä poistamatta olemassa olevia.

### 8. ✨ Uutuus -merkkien tarkistus

Merkki tulee sivun omasta `<meta name="kortti-badge" content="uutuus">`-tagista, ei etusivulta.
Sen poistaminen etusivun näkymästä ei siis onnistu `index.html`:ää muokkaamalla.

1. **Listaa kaikki sivut joilla on `kortti-badge: uutuus`.** Merkin pitäisi olla vain viimeksi
   julkaistuilla sivuilla — tarkista että edellisen julkaisukierroksen sivuilta se on **poistettu
   niiden omasta `<head>`-lohkosta**, ei vain etusivulta.
2. **Tarkista ettei merkki ole keskeneräisellä (`noindex`) sivulla** — se ei näy etusivulla mutta
   ilmestyy heti kun sivu julkaistaan.
3. **Tarkista että merkin tyyli on `tyylit/style.css`:ssä eikä `index.html`:n omassa `<style>`-lohkossa.**
   `kortit.js` renderöi samat `.uutuus-badge`- ja `.kesken-badge`-elementit myös artikkelisivujen
   "Katso myös" -osioihin, jotka lataavat vain `style.css`:n. Jos säännöt ovat vain etusivulla, merkki
   näyttää etusivulla oikealta mutta artikkelisivulla tyylittömältä tekstilohkolta otsikon yläpuolella.
   Sama ansa koskee jokaista `kortit.js`:n käyttämää luokkaa: `kortti`, `kortti-rivi`, `kortti-tagit`,
   `tagi`, `kortti-lukemisaika`.
4. **Jos `style.css` muuttui, nosta välimuistiversio** kaikilla sivuilla samaan lukuun
   (`tyylit/style.css?v=N`, luonnoksissa `/tyylit/style.css?v=N`). Versiot pääsevät helposti eri
   tahtiin eri sivuilla.
5. **Tarkista että merkki näkyy etusivulla sekä ylhäällä että alhaalla.** Kortit renderöityvät
   kategorioittain siihen kohtaan `index.html`:ää missä kategoria on. Jos kaikki uutuudet osuvat
   samaan kategoriaan, ne kasautuvat yhteen kohtaan sivua. Etsi `index.html`:stä
   `<div class="uutuus-badge">` ja katso mihin kategorioihin ne osuvat — hyvässä tapauksessa
   uutuuksia on sekä ensimmäisissä että viimeisissä kategorioissa.

### 9. Päivityslista

Jos muutokset ollaan viemässä gittiin, lisää merkintä `sivusto/paivitykset.html`:ään ja päivitä
`sivusto/skriptit/navigation.js`:n `SIVUSTO_PAIVITETTY` samaan päivämäärään.

Jos sivun `datePublished` on tulevaisuudessa (ajastettu julkaisu), käytä päivityslistan merkinnässä
ja `SIVUSTO_PAIVITETTY`-vakiossa **samaa päivää kuin sivun julkaisupäivä**, ei tätä päivää — muuten
päivityslista väittää sivun ilmestyneen ennen kuin se sen oman bylinen mukaan ilmestyi.

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

### Katso myös -verkosto
- Ilman osiota: [sivut] / ei yhtään
- Linkkejä keskeneräisiin: [sivu -> kohde] / ei yhtään
- Orpoja (ei saapuvia linkkejä): [sivut] / ei yhtään
- Uusien sivujen saapuvat linkit: sivu.html — N kpl [mistä]
- Uutuus listan kärjessä: OK / [sivut joissa ei]

### Uutuus-merkit
- Merkki päällä: [sivut]
- Poistettu edellisiltä: [sivut] / ei tarvetta
- Merkkien tyyli style.css:ssä: OK / vain index.html:ssä
- style.css?v=N yhtenäinen: OK / [poikkeamat]
- Etusivun sijainti: ylhäällä [kategoria], alhaalla [kategoria]
```
