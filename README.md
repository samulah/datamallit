# datamalli.fi

Staattinen HTML-sivusto. Kaikki sisältösivut ovat projektin juuressa.

---

## Termin lisääminen

### 1. Luo uusi HTML-tiedosto

Kopioi `sivupohja.html` uudeksi tiedostoksi ja täytä kohdat `OTSIKKO`, `SIVU`, `KUVAUS`, `VVVV-KK-PP`.

**Claude-agentti:**
```
Luo uusi sivu lumihiutalemalli.html kopioimalla sivupohja.html.
Sisältö tulee tiedostosta words/lumihiutalemalli.docx.
Noudata CLAUDE.md:n Word→HTML-sääntöjä tarkasti.
```

### 2. Lisää kortti etusivulle

Avaa `index.html` ja lisää uusi kortti oikeaan kategoriaan `data-tags`-attribuutteineen.

### 3. Päivitä hakuindeksi

Avaa `search-index.js` ja lisää uusi rivi sivun tekstisisällöllä:

```js
window.HAKU_INDEKSI = {
  'lumihiutalemalli.html': `sivun koko tekstisisältö pienillä kirjaimilla`,
  // ...
};
```

**Claude-agentti:**
```
Päivitä search-index.js — lisää rivi tiedostolle lumihiutalemalli.html.
Tekstisisältö löytyy tiedostosta lumihiutalemalli.html. Älä koske muihin riveihin.
```

### 4. Ilmoita

Avaa pull request — Samu saa ilmoituksen automaattisesti GitHubista.
Jos kiireinen: **samu.lahdenpera@gmail.com**

**Claude-agentti:**
```
Tee git commit tiedostoista lumihiutalemalli.html ja search-index.js.
Commit-viesti: "lumihiutalemalli: [kuvaus]"
Älä puske mainiin.
```

---

## Termin korjaaminen

### 1. Muokkaa HTML-tiedostoa

Avaa suoraan `.html`-tiedosto ja tee muutos.

**Claude-agentti:**
```
Tiedostossa lumihiutalemalli.html on virhe: [kuvaile mitä].
Korjaa CLAUDE.md:n ohjeiden mukaisesti — älä muuta muuta tekstiä.
```

### 2. Päivitä hakuindeksi tarvittaessa

Jos tekstisisältö muuttui merkittävästi, päivitä `search-index.js`:n kyseinen rivi.

### 3. Ilmoita

Avaa pull request tai lähetä sähköpostia: **samu.lahdenpera@gmail.com**

---

## Julkaisu

Ennen kuin sivu julkaistaan:

- [ ] Poista `<meta name="robots" content="noindex">` sivun `<head>`-osiosta
- [ ] Lisää sivu `sitemap.xml`:ään
- [ ] Tarkista TechArticle-skeema (`headline`, `description`, `url`, `datePublished` täytetty)

**Claude-agentti:**
```
Valmistele lumihiutalemalli.html julkaisua varten:
1. Poista noindex-meta-tagi
2. Lisää sivu sitemap.xml:ään (käytä muita sivuja mallina)
3. Tarkista TechArticle-skeema — kaikki kentät täytetty oikein
Älä tee committia.
```
