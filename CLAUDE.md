# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sivusto

Staattinen suomenkielinen HTML-sivusto (datamalli.fi) datan mallinnuksesta ja Power BI -kehittämisestä. Ei build-työkalua, ei frameworkia — pelkkää HTML/CSS/vanilla JS. Sisältösivut ovat repon **juuressa** (esim. `tahtimalli.html`, `dimensiot.html`), ei `html/`-alikansiossa.

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

- `*.html` (repon juuressa) — sivuston sisältösivut
- `sivupohja.html` — pohja uudelle sivulle (TechArticle-skeema, BreadcrumbList, og-tagit valmiina; täytä `OTSIKKO`, `SIVU`, `KUVAUS`, `VVVV-KK-PP`)
- `paivitykset.html` — julkinen päivityslista (linkitetty nav-palkin "Päivitetty [pvm]" -tekstistä); päivitettävä ennen jokaista git pushia, ks. alla
- `words/` — Word-lähteet per sivu
- `julkaisusuunnitelma.md` — sivujen julkaisutila ja aikataulu
- `suunnitelma.txt` — yksityiskohtainen tehtävälistaus per sivu
- `navigation.js` — navigaatio ja footer (muokkaa vain tässä; sisältää lukemisajan fallback-laskennan)
- `search-index.js` — etusivun hakuindeksi: `window.HAKU_INDEKSI['sivu.html'] = "koko tekstisisältö pienillä"` — päivitettävä käsin kun sivun sisältö muuttuu
- `termisto-search.js` — termistön oma dynaaminen haku (erillinen `search-index.js`:stä, mutta termien pitää löytyä myös sieltä — ks. `/julkaisuvalmius`)
- `kortit.js` — "Katso myös" -korttien renderöinti; **ei sisällä dataa**, lukee `sivut.js`:n `window.SIVUT`
- `sivut.js` — **generoitu**, älä muokkaa käsin (ks. alla)
- `tyokalut/rakenna.py` — metatietogeneraattori
- `style.css` — sivuston tyylit
- `sitemap.xml` — **generoitu**; `robots.txt`, `llms.txt` — SEO/indeksointirakenteet

### Päivityslista (pakollinen ennen git pushia)

Sivun oikeassa yläkulmassa (nav-palkissa, logon rivillä) näkyy teksti "Päivitetty [pvm]", joka linkittää `paivitykset.html`-sivulle. Aina kun sisältöä on muutettu ja muutokset ollaan viemässä gittiin (commit/push/PR), tee **molemmat**:
1. Lisää `paivitykset.html`-sivulle uusi `<div class="paivitys-merkinta">` -merkintä (tai täydennä saman päivän merkintää) tiiviillä listalla mitä muuttui.
2. Päivitä `navigation.js`:n `SIVUSTO_PAIVITETTY`-vakio samaan päivämäärään.

Älä tee tätä keskeneräisistä/kokeiluluontoisista muutoksista — vain kun muutos oikeasti viedään gittiin.

## Metatietojen generointi (tyokalut/rakenna.py)

**Sivu on ainoa lähde omalle metatiedolleen.** Kaikki muu generoidaan siitä:

```
sivu.html <head>  ──▶  sivut.js  ──▶  index.html (kortit) + kortit.js ("Katso myös")
                  ──▶  sivu.html <meta name="lukemisaika">
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

Sallitut tagislugit tulevat `search.js`:n `TAGI_NIMET`-taulusta — tuntematon slug pysäyttää ajon.
`kesken`-tagia ei kirjoiteta käsin, se johdetaan `noindex`istä.

```bash
python3 tyokalut/rakenna.py              # kirjoittaa muuttuneet tiedostot
python3 tyokalut/rakenna.py --tarkista   # exit 1 jos jokin on vanhentunut (pre-push-hook)
python3 tyokalut/rakenna.py --raportti   # metatietojen puutteet, julkaisutila, hakuindeksi
```

`.githooks/pre-push` estää epäsynkan pushaamisen (`git config core.hooksPath .githooks`).

**Älä koskaan muokkaa käsin:** `sivut.js`, `sitemap.xml`, `index.html`:n `KORTIT:alku`/`KORTIT:loppu`
-markkerien väliä, tai sivujen `<meta name="lukemisaika">`-tageja. Ne kirjoitetaan yli.

Etusivun **rakenne** (kategoriat ja korttien järjestys) on edelleen käsin `index.html`:ssä:
kategorian `.kortti-rivi`-elementin `data-kortit`-attribuutti listaa sivut järjestyksessä.

"Katso myös" -osion lisääminen sivulle vaatii vain placeholderin — generaattori lisää
tarvittavat skriptitagit (`sivut.js` ennen `kortit.js`:ää) automaattisesti:

```html
<section class="katso-myos" data-kortit="tahtimalli.html faktataulu.html"></section>
```

### Sivun julkaisutila

Julkaisutilaa ohjaa **yksi kytkin**: sivun `robots`-meta. Kun `noindex` poistetaan ja
generaattori ajetaan, sivu ilmestyy sitemapiin ja sen etusivukortti muuttuu
"🚧 Tulossa" -laatikosta linkiksi lukemisaikoineen. Sitä ennen kannattaa tarkistaa että
TechArticle JSON-LD -skeema (`headline`, `description`, `url`, `datePublished`,
`dateModified`) on täytetty — `dateModified` päätyy sitemapin `lastmod`-arvoksi.

Ks. `/julkaisuvalmius`-komento kokonaistarkistukseen ja `julkaisusuunnitelma.md` nykytilaan.

## Claude-komennot (`.claude/commands/`)

- `/siirra-word @sivu.html @words/Tiedosto.docx` — vie Word-sisällön HTML:ään yllä olevin säännöin
- `/kirjoittaja-tyyli` — muokkaa tekstiä Dataneuvos-äänen mukaiseksi
- `/tarkista-kirjoitus @sivu.html` — kirjoitusvirheet ja typografia (ei koske sisältöön/faktoihin)
- `/julkaisuvalmius [@sivu.html]` — lukemisajat, hakuindeksit, rikkoutuneet linkit, navigaatio-poikkeamat

Huom: näissä komentotiedostoissa on paikoin vanhentuneita `html/`-polkuviittauksia — todellisuudessa tiedostot ovat repon juuressa.
