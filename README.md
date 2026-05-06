# datamalli.fi — julkaisuohjeet

## Sivuston rakenne

Staattinen HTML/CSS/JS-sivusto. Ei palvelinta, ei tietokantaa, ei build-vaihetta.
Kaikki sivut ovat `html/`-kansiossa.

```
html/
  index.html           ← etusivu, kortit ja haku
  tahtimalli.html
  dimensiot.html
  ... (muut sisältösivut)
  style.css            ← globaalit tyylit
  navigation.js        ← navigaatio + footer (injektoitu kaikille sivuille)
  search.js            ← haku- ja tägilogiikka
  search-index.js      ← esirakennettu hakuindeksi ← PÄIVITÄ KUN SISÄLTÖ MUUTTUU
```

---

## Julkaisu

### GitHub Pages (nykyinen käytäntö)

```bash
git add html/
git commit -m "kuvaava viesti"
git push origin main
```

GitHub Pages julkaisee automaattisesti `main`-haaran sisällön.
Sivusto on nähtävillä osoitteessa **datamalli.fi** muutaman minuutin kuluttua.

### Manuaalinen siirto palvelimelle (vaihtoehto)

Kopioi koko `html/`-kansion sisältö webhotellin julkiseen hakemistoon (esim. `public_html/`).
Ei erityisiä vaatimuksia — mikä tahansa staattisten tiedostojen hosting toimii.

---

## Sisällön päivittäminen — tärkeä muistilista

### 1. Muokkaa HTML-tiedostoa

Tee muutokset suoraan `html/`-kansion `.html`-tiedostoihin.

### 2. ⚠️ Päivitä hakuindeksi

**Haku etsii sivujen sisällöstä `search-index.js`-tiedoston kautta.**
Tiedostoa ei päivitetä automaattisesti — se on ylläpidettävä käsin.

Avaa `html/search-index.js` ja päivitä muuttuneen sivun merkkijono vastaamaan
sivun uutta tekstisisältöä. Sisällytä myös taulukoiden teksti.

```js
window.HAKU_INDEKSI = {
  'tahtimalli.html': `tähän sivun koko tekstisisältö pienillä kirjaimilla
  taulukot mukaan lukien lyhenteet termit avainsanat`,

  'dimensiot.html': `...`,
  // jne.
};
```

**Muista päivittää indeksi aina kun:**
- lisäät uuden sivun
- muutat olemassa olevan sivun tekstisisältöä merkittävästi
- lisäät taulukon josta haluat hakutuloksia

### 3. Uusi sivu — tarkistuslista

- [ ] Luo `html/uusisivu.html` (käytä olemassa olevaa sivua pohjana)
- [ ] Lisää kortti `index.html`:ään oikeaan kategoriaan `data-tags`-attribuutteineen
- [ ] Lisää navigaatiolinkki `navigation.js`:ään
- [ ] Lisää sivu `search-index.js`:ään
- [ ] Commitoi ja push

---

## Tagit

Tagit määritellään kahdessa paikassa:

| Tiedosto | Tarkoitus |
|---|---|
| `index.html` | Kortin `data-tags`-attribuutti ja näkyvät tagi-sirukkeet |
| `search.js` | `TAGI_NIMET`-objekti (tagi-id → näkyvä nimi) |

Uusi tagi otetaan käyttöön lisäämällä se molempiin.
