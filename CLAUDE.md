# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sivusto

Staattinen suomenkielinen HTML-sivusto (datamalli.fi) datan mallinnuksesta ja Power BI -kehittämisestä. Ei build-työkalua, ei frameworkia — pelkkää HTML/CSS/vanilla JS. Julkaistut sisältösivut ovat **`sivusto/`-kansiossa** (esim. `sivusto/tahtimalli.html`) ja keskeneräiset **`sivusto/luonnos/`-kansiossa**.

Kirjoittajapersoona on "Dataneuvos" — ks. `.claude/commands/kirjoittaja-tyyli.md` tyylisäännöille (suora, opinionoitu, konkreettisia lukuja, suomi ensin).

## Git-työskentely

Älä koskaan tee omia branchejä tai worktreejä tähän repoon — muokkaa suoraan käyttäjän nykyisellä branchilla ja tee commit/push sinne. `.claude/settings.json`:ssa on `worktree.bgIsolation: "none"` juuri tätä varten.

## Tekstinkorjaus: Word → HTML

Kun viedään sisältöä `.docx`-tiedostosta HTML:ään, noudatetaan näitä sääntöjä **tiukasti** (myös `/siirra-word`-komennon takana):

### Mitä saa muuttaa
- Tekstin **sisältö** muutetaan vain jos Word-dokumentissa on **eksplisiittisesti** eri teksti kuin HTML:ssä
- Placeholder-kommentit kuten `(<- claude linkki termistöön)` tai `(<- claude linkki X)` **korvataan** oikealla HTML-linkillä — ympäröivä teksti pidetään täsmälleen Word-muodossa
- Taulukkootsikot (`<caption>`) lisätään Word-tekstin mukaisesti — **ei muotoilla uudelleen**

### Mitä EI saa muuttaa
- Ei omia kielikorjauksia, ei tyylipäivityksiä, ei sanamuotoparannuksia
- Ei lisätä "n"-genetiivejä, em-viivoja yms. jotka eivät ole Wordissa
- Ei muuteta numeroita (esim. "10 mb" → "~10 MB:n") — käytetään Wordin tarkkaa tekstiä
- Ei muuteta HTML-sisältöä joka **ei ole** Word-dokumentissa (jätetään ennalleen)
- Ei lisätä taulukon numeroita/otsikoita jos Word ei niitä eksplisiittisesti anna

### Taulukkootsikot
- Käytetään **täsmälleen** Wordin erotinmerkkiä: pilkku `Taulukko 2, Nimi – Kuvaus` tai puolipiste `Taulukko 1; Nimi – Kuvaus`
- Jos Word antaa saman numeron kahdelle taululle (esim. kaksi "Taulukko 4"), **pidetään se** — ei korjata itsenäisesti
- Ei muuteta "tallenustyypit" → "tallennustyypit" tms. — Wordin kirjoitusvirheet siirretään sellaisenaan

### Tarkistusprosessi
Ennen kuin raportoidaan "valmis", käydään Word-teksti lause lauseelta:
1. Onko jokainen taulukon solun teksti täsmälleen Word-muodossa (pilkut/em-viivat jne.)?
2. Onko taulukkootsikot täsmälleen Word-muodossa?
3. Onko placeholder-linkit korvattu — ja **vain** ne, ei muu ympäröivä teksti?
4. Onko jotain HTML-sisältöä **poistettu** jota ei oltu Wordissa poistettu? (esim. "(Päivämääradimensio on poikkeus.)")

## Projektin rakenne

Repo jakautuu kahteen osaan: **`sivusto/` on se mikä menee palvelimelle**, kaikki muu on
työaineistoa joka ei päädy verkkoon. Raja on palvelimen dokumenttijuuri: se osoittaa
`sivusto/`-kansioon, joten muu repo jää sen yläpuolelle eikä ole haettavissa —
ks. `dokumentit/deploy.md`.

```
sivusto/              ─── palvelimen dokumenttijuuri (www.datamalli.fi/)
├── *.html                julkaistut sisältösivut + 404.html
├── luonnos/              keskeneräiset (robots-noindex) + sivupohja.html; estetty .htaccessilla
├── skriptit/*.js         sivuston JavaScript
├── tyylit/style.css      sivuston tyylit
├── kuvat/  fontit/       media
└── robots.txt  sitemap.xml  llms.txt  favicon.ico
tyokalut/             ─── rakennusskriptit (rakenna.py, esikatsele.py, renderoi-kaaviot.py, og-kuvat/)
dokumentit/           ─── suunnitelmat, deploy-ohje, raportit/
words/                ─── Word-lähteet per sivu
arkisto/              ─── käytöstä poistunut aineisto
```

Yksittäiset tiedostot:

- `sivusto/luonnos/sivupohja.html` — pohja uudelle sivulle (TechArticle-skeema, BreadcrumbList, og-tagit valmiina; täytä `OTSIKKO`, `SIVU`, `KUVAUS`, `VVVV-KK-PP`)
- `sivusto/paivitykset.html` — julkinen päivityslista (linkitetty nav-palkin "Päivitetty [pvm]" -tekstistä); päivitettävä ennen jokaista git pushia, ks. alla
- `sivusto/skriptit/navigation.js` — navigaatio ja footer (muokkaa vain tässä; sisältää lukemisajan fallback-laskennan). Linkit ovat juurisuhteellisia (`/tahtimalli.html`), jotta navigaatio toimii myös `luonnos/`-kansiosta esikatseltaessa
- `sivusto/skriptit/search-index.js` — etusivun hakuindeksi: `window.HAKU_INDEKSI['sivu.html'] = "koko tekstisisältö pienillä"` — päivitettävä käsin kun sivun sisältö muuttuu
- `sivusto/skriptit/termisto-search.js` — termistön oma dynaaminen haku (erillinen `search-index.js`:stä, mutta termien pitää löytyä myös sieltä — ks. `/julkaisuvalmius`)
- `sivusto/skriptit/kortit.js` — "Katso myös" -korttien renderöinti; **ei sisällä dataa**, lukee `sivut.js`:n `window.SIVUT`
- `sivusto/skriptit/sivut.js` — **generoitu**, älä muokkaa käsin (ks. alla)
- `sivusto/sitemap.xml` — **generoitu**; `robots.txt`, `llms.txt` — SEO/indeksointirakenteet
- `tyokalut/rakenna.py` — metatietogeneraattori
- `tyokalut/esikatsele.py` — paikallinen esikatselupalvelin sivuston juuresta
- `dokumentit/deploy.md` — miten sivusto menee palvelimelle ja mitä ensimmäinen käyttöönotto vaatii
- `dokumentit/julkaisusuunnitelma.md` — sivujen julkaisutila ja aikataulu
- `dokumentit/suunnitelma.txt` — yksityiskohtainen tehtävälistaus per sivu

### Polkusäännöt

Sivuston juuressa olevat sivut käyttävät **suhteellisia** polkuja (`tyylit/style.css`,
`skriptit/navigation.js`, `tahtimalli.html`). `luonnos/`-sivut käyttävät
**juurisuhteellisia** polkuja (`/tyylit/style.css`, `/tahtimalli.html`) — silloin
julkaiseminen on pelkkä siirto eikä yhtäkään polkua tarvitse korjata.

Esikatselu: `python3 tyokalut/esikatsele.py [sivu]` — käynnistää palvelimen
`sivusto/`-kansion juuresta ja avaa selaimen. Sivun voi antaa missä muodossa tahansa
(`data-vault`, `luonnos/data-vault.html`, `sivusto/luonnos/data-vault.html`), ja
pelkkä `luonnos` avaa listauksen kaikista luonnoksista. VS Codessa sama on tehtävänä
`.vscode/tasks.json`:ssa, ja Live Previewin juuri on asetettu samaksi
(`.vscode/settings.json`, `livePreview.serverRoot`).

Juuren on pakko olla `sivusto/`: tiedoston avaaminen suoraan `file://`-osoitteesta tai
palvelimen ajaminen repon juuresta näyttää luonnossivun tyylittömänä, koska sen polut
ovat juurisuhteellisia.

### Päivityslista (pakollinen ennen git pushia)

Sivun oikeassa yläkulmassa (nav-palkissa, logon rivillä) näkyy teksti "Päivitetty [pvm]", joka linkittää `paivitykset.html`-sivulle. Aina kun sisältöä on muutettu ja muutokset ollaan viemässä gittiin (commit/push/PR), tee **molemmat**:
1. Lisää `sivusto/paivitykset.html`-sivulle uusi `<div class="paivitys-merkinta">` -merkintä (tai täydennä saman päivän merkintää) tiiviillä listalla mitä muuttui.
2. Päivitä `sivusto/skriptit/navigation.js`:n `SIVUSTO_PAIVITETTY`-vakio samaan päivämäärään.

Älä tee tätä keskeneräisistä/kokeiluluontoisista muutoksista — vain kun muutos oikeasti viedään gittiin.

## Metatietojen generointi (tyokalut/rakenna.py)

**Sivu on ainoa lähde omalle metatiedolleen.** Kaikki muu generoidaan siitä:

```
sivu.html <head>  ──▶  skriptit/sivut.js  ──▶  index.html (kortit) + kortit.js ("Katso myös")
                  ──▶  sivu.html <meta name="lukemisaika">
                  ──▶  index.html ("Uusin juttu" -nosto)
                  ──▶  sitemap.xml
```

Käsin kirjoitetaan sivun `<head>`:ssä:

| Kenttä | Merkitys | Jos puuttuu |
|---|---|---|
| `kortti-otsikko` | kortin otsikko (lyhyt, ei sama kuin SEO-otsikko) | `<title>` ilman `" \| Datamalli.fi"` |
| `kortti-kuvaus` | kortin kuvaus (navigointiteksti) | `description` |
| `tagit` | tagislugit välilyönnein, esim. `tietomalli power-bi ai` | ei tageja |
| `kortti-badge` | `uutuus` → ✨ Uutuus -merkki | ei merkkiä |
| `robots` | `noindex` = keskeneräinen | julkaistu |

Sallitut tagislugit tulevat `sivusto/skriptit/search.js`:n `TAGI_NIMET`-taulusta — tuntematon slug pysäyttää ajon.
`kesken`-tagia ei kirjoiteta käsin, se johdetaan `noindex`istä.

```bash
python3 tyokalut/rakenna.py              # kirjoittaa muuttuneet tiedostot
python3 tyokalut/rakenna.py --tarkista   # exit 1 jos jokin on vanhentunut (pre-push-hook)
python3 tyokalut/rakenna.py --raportti   # metatietojen puutteet, julkaisutila, hakuindeksi
```

`.githooks/pre-push` estää epäsynkan pushaamisen (`git config core.hooksPath .githooks`).

**Älä koskaan muokkaa käsin:** `skriptit/sivut.js`, `sitemap.xml`, `index.html`:n
`KORTIT:alku`/`KORTIT:loppu` - tai `UUSIN:alku`/`UUSIN:loppu` -markkerien väliä, tai sivujen
`<meta name="lukemisaika">`-tageja. Ne kirjoitetaan yli.

Etusivun **rakenne** (kategoriat ja korttien järjestys) on edelleen käsin `index.html`:ssä:
kategorian `.kortti-rivi`-elementin `data-kortit`-attribuutti listaa sivut järjestyksessä.

### Etusivun nostot

Otsikon alla on kolme nostoa samassa ruudukossa (`#termi-paivassa`):

| Nosto | Lähde |
|---|---|
| Uusin juttu | generoitu `UUSIN`-markkerien väliin — tuorein julkaistu sivu JSON-LD:n `datePublished`in mukaan (tasapelissä aakkosjärjestys) |
| Termi päivässä | `skriptit/termi-paivassa.js` täyttää `.tp-lotto`-slotin, termi vaihtuu vuorokausittain |
| Satunnainen termi | sama skripti, arvotaan joka sivulatauksella |

Uusin juttu on HTML:ssä, joten se näkyy myös ilman JavaScriptiä; termislotit piilotetaan
silloin (`html:not(.js) .tp-lotto`). Tyhjille slotteille varataan korkeus etukäteen
(`.tp-lotto:empty`) — ilman sitä kortit työntäisivät sivun sisältöä alaspäin latautuessaan.
Jos korttien sisältö tai leveys muuttuu, mittaa korkeudet uudelleen ja päivitä varaukset.

"Katso myös" -osion lisääminen sivulle vaatii vain placeholderin — generaattori lisää
tarvittavat skriptitagit (`sivut.js` ennen `kortit.js`:ää) automaattisesti:

```html
<section class="katso-myos" data-kortit="tahtimalli.html faktataulu.html"></section>
```

### Sivun julkaisutila

Julkaisutila näkyy kahdessa paikassa, ja generaattori vaatii että ne ovat samaa mieltä:

| | Kansio | `robots`-meta |
|---|---|---|
| Keskeneräinen | `sivusto/luonnos/` | `noindex` |
| Julkaistu | `sivusto/` | ei robots-metaa |

Ristiriita pysäyttää `rakenna.py`:n ja kertoo mitä pitää tehdä — keskeneräinen sivu ei
siis pääse vahingossa palvelimelle eikä valmis sivu jäädä näkymättömiin luonnoksiin.

Julkaiseminen on kaksi komentoa:

```bash
git mv sivusto/luonnos/sivu.html sivusto/sivu.html   # + poista robots-noindex sivun <head>:stä
python3 tyokalut/rakenna.py
```

Sivu ilmestyy sitemapiin ja sen etusivukortti muuttuu "🚧 Tulossa" -laatikosta linkiksi
lukemisaikoineen. Polkuja ei tarvitse korjata: luonnossivujen juurisuhteelliset polut
toimivat sellaisenaan myös sivuston juuressa. Ennen julkaisua kannattaa tarkistaa että
TechArticle JSON-LD -skeema (`headline`, `description`, `url`, `datePublished`,
`dateModified`) on täytetty — `dateModified` päätyy sitemapin `lastmod`-arvoksi.

Ks. `/julkaisuvalmius`-komento kokonaistarkistukseen ja `dokumentit/julkaisusuunnitelma.md`
nykytilaan.

## Claude-komennot (`.claude/commands/`)

- `/siirra-word @sivusto/sivu.html @words/Tiedosto.docx` — vie Word-sisällön HTML:ään yllä olevin säännöin
- `/kirjoittaja-tyyli` — muokkaa tekstiä Dataneuvos-äänen mukaiseksi
- `/tarkista-kirjoitus @sivusto/sivu.html` — kirjoitusvirheet ja typografia (ei koske sisältöön/faktoihin)
- `/julkaisuvalmius [@sivusto/sivu.html]` — lukemisajat, hakuindeksit, rikkoutuneet linkit, navigaatio-poikkeamat
