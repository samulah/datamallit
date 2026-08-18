# datamalli.fi

Staattinen HTML-sivusto. Ei build-työkalua, ei frameworkia.

```
sivusto/              palvelimen dokumenttijuuri — vain tämä on webissä
├── *.html            julkaistut sivut
├── luonnos/          keskeneräiset sivut (robots-noindex) + sivupohja.html; estetty .htaccessilla
├── skriptit/         JavaScript
├── tyylit/           style.css
├── kuvat/  fontit/   media
tyokalut/             rakennusskriptit — rakenna.py generoi metatiedot
dokumentit/           suunnitelmat, deploy-ohje, auditointiraportit
words/                Word-lähteet
arkisto/              käytöstä poistunut aineisto
```

Sivun sijainti kertoo julkaisutilan: **`sivusto/luonnos/` = keskeneräinen**,
**`sivusto/` = julkaistu**. `tyokalut/rakenna.py` tarkistaa että sijainti ja sivun
`robots`-meta ovat samaa mieltä, eikä anna pushata jos eivät ole.

Esikatselu paikallisesti:

```bash
python3 tyokalut/esikatsele.py               # etusivu
python3 tyokalut/esikatsele.py data-vault    # yksittäinen sivu tai luonnos
python3 tyokalut/esikatsele.py luonnos       # lista kaikista luonnoksista
```

Skripti käynnistää palvelimen `sivusto/`-kansion juuresta ja avaa selaimen.
Juuri on pakko olla oikea: sivujen polut ovat juurisuhteellisia (`/tyylit/style.css`),
joten HTML-tiedoston avaaminen suoraan selaimeen tai palvelimen ajaminen repon
juuresta näyttää sivun tyylittömänä. VS Codessa sama löytyy tehtävänä
(*Terminal → Run Task → Esikatsele…*), ja Live Preview on asetettu samaan juureen
`.vscode/settings.json`:ssa.

---

## Uuden sivun lisääminen

### 1. Luo tiedosto luonnoksiin

Kopioi `sivusto/luonnos/sivupohja.html` uudeksi tiedostoksi samaan kansioon ja täytä
kohdat `OTSIKKO`, `SIVU`, `KUVAUS`, `VVVV-KK-PP`.

**Claude-agentti:**
```
Luo uusi sivu sivusto/luonnos/lumihiutalemalli.html kopioimalla
sivusto/luonnos/sivupohja.html. Sisältö tulee tiedostosta words/lumihiutalemalli.docx.
Noudata CLAUDE.md:n Word→HTML-sääntöjä tarkasti.
```

### 2. Lisää kortti etusivulle

Avaa `sivusto/index.html` ja lisää sivun tiedostonimi oikean kategorian
`data-kortit`-listaan. Itse kortin sisältö generoituu sivun omista `<head>`-metatiedoista
— älä kirjoita sitä käsin.

### 3. Aja generaattori

```bash
python3 tyokalut/rakenna.py
```

### 4. Päivitä hakuindeksi

Avaa `sivusto/skriptit/search-index.js` ja lisää uusi rivi sivun tekstisisällöllä:

```js
window.HAKU_INDEKSI = {
  'lumihiutalemalli.html': `sivun koko tekstisisältö pienillä kirjaimilla`,
  // ...
};
```

Avain on pelkkä tiedostonimi ilman kansiota, myös luonnoksilla.

**Claude-agentti:**
```
Päivitä sivusto/skriptit/search-index.js — lisää rivi tiedostolle lumihiutalemalli.html.
Tekstisisältö löytyy tiedostosta. Älä koske muihin riveihin.
```

### 5. Ilmoita

Avaa pull request — Samu saa ilmoituksen automaattisesti GitHubista.
Jos kiireinen: **samu.lahdenpera@gmail.com**

---

## Sivun korjaaminen

1. Muokkaa `.html`-tiedostoa suoraan.
2. Jos tekstisisältö muuttui merkittävästi, päivitä `sivusto/skriptit/search-index.js`:n
   kyseinen rivi.
3. Aja `python3 tyokalut/rakenna.py` (lukemisaika ja kortit päivittyvät).
4. Avaa pull request tai lähetä sähköpostia: **samu.lahdenpera@gmail.com**

**Claude-agentti:**
```
Tiedostossa sivusto/lumihiutalemalli.html on virhe: [kuvaile mitä].
Korjaa CLAUDE.md:n ohjeiden mukaisesti — älä muuta muuta tekstiä.
```

---

## Julkaisu

```bash
git mv sivusto/luonnos/lumihiutalemalli.html sivusto/lumihiutalemalli.html
# poista <meta name="robots" content="noindex"> sivun <head>-osiosta
python3 tyokalut/rakenna.py
```

Generaattori hoitaa loput: sitemapin, etusivun kortin ja lukemisajan. Polkuja ei tarvitse
korjata siirron jälkeen.

Tarkista ennen julkaisua:

- [ ] TechArticle-skeema täytetty (`headline`, `description`, `url`, `datePublished`, `dateModified`)
- [ ] Sivu on `sivusto/index.html`:n `data-kortit`-listassa
- [ ] Sivu löytyy `sivusto/skriptit/search-index.js`:stä
- [ ] `python3 tyokalut/rakenna.py --raportti` ei valita puutteista

---

## Deploy

Deploy on `git pull` palvelimella (cPanel → Git Version Control → *Update from Remote*).
Verkkotunnuksen dokumenttijuuri osoittaa `sivusto/`-kansioon, joten repon muut kansiot
jäävät sen yläpuolelle eivätkä ole haettavissa verkosta. `luonnos/` on dokumenttijuuren
sisällä ja estetään `.htaccess`-säännöllä. Ks. **`dokumentit/deploy.md`**.
