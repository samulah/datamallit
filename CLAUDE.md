# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sivusto

Staattinen suomenkielinen HTML-sivusto (datamalli.fi) datan mallinnuksesta ja Power BI -kehittämisestä. Ei build-työkalua, ei frameworkia — pelkkää HTML/CSS/vanilla JS. Sisältösivut ovat repon **juuressa** (esim. `tahtimalli.html`, `dimensiot.html`), ei `html/`-alikansiossa.

Kirjoittajapersoona on "Dataneuvos" — ks. `.claude/commands/kirjoittaja-tyyli.md` tyylisäännöille (suora, opinionoitu, konkreettisia lukuja, suomi ensin).

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
- `navigation.js` — navigaatio ja footer (muokkaa vain tässä; sisältää myös lukemisajan laskennan)
- `search-index.js` — etusivun hakuindeksi: `window.HAKU_INDEKSI['sivu.html'] = "koko tekstisisältö pienillä"` — päivitettävä käsin kun sivun sisältö muuttuu
- `termisto-search.js` — termistön oma dynaaminen haku (erillinen `search-index.js`:stä, mutta termien pitää löytyä myös sieltä — ks. `/julkaisuvalmius`)
- `kortit.js` — "Katso myös" -korttien jaettu data (`window.KORTIT`); pidettävä synkassa `index.html`:n vastaavien korttien otsikon/kuvauksen/tagien/`min`-arvon kanssa
- `style.css` — sivuston tyylit
- `sitemap.xml`, `robots.txt`, `llms.txt` — SEO/indeksointirakenteet

### Päivityslista (pakollinen ennen git pushia)

Sivun oikeassa yläkulmassa (nav-palkissa, logon rivillä) näkyy teksti "Päivitetty [pvm]", joka linkittää `paivitykset.html`-sivulle. Aina kun sisältöä on muutettu ja muutokset ollaan viemässä gittiin (commit/push/PR), tee **molemmat**:
1. Lisää `paivitykset.html`-sivulle uusi `<div class="paivitys-merkinta">` -merkintä (tai täydennä saman päivän merkintää) tiiviillä listalla mitä muuttui.
2. Päivitä `navigation.js`:n `SIVUSTO_PAIVITETTY`-vakio samaan päivämäärään.

Älä tee tätä keskeneräisistä/kokeiluluontoisista muutoksista — vain kun muutos oikeasti viedään gittiin.

### Sivun julkaisutila
Julkaisematon/kesken-sivu tunnistetaan kolmesta paikasta, jotka on aina pidettävä synkassa:
1. `<meta name="robots" content="noindex">` sivun `<head>`:ssä
2. Poissa `sitemap.xml`:stä
3. TechArticle JSON-LD -skeema (`headline`, `description`, `url`, `datePublished`) täytettynä

Ks. `/julkaisuvalmius`-komento kokonaistarkistukseen ja `julkaisusuunnitelma.md` nykytilaan.

## Claude-komennot (`.claude/commands/`)

- `/siirra-word @sivu.html @words/Tiedosto.docx` — vie Word-sisällön HTML:ään yllä olevin säännöin
- `/kirjoittaja-tyyli` — muokkaa tekstiä Dataneuvos-äänen mukaiseksi
- `/tarkista-kirjoitus @sivu.html` — kirjoitusvirheet ja typografia (ei koske sisältöön/faktoihin)
- `/julkaisuvalmius [@sivu.html]` — lukemisajat, hakuindeksit, rikkoutuneet linkit, navigaatio-poikkeamat

Huom: näissä komentotiedostoissa on paikoin vanhentuneita `html/`-polkuviittauksia — todellisuudessa tiedostot ovat repon juuressa.
