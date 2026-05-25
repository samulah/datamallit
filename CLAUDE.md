# datamalli.fi — Claude-ohjeet

## Tekstinkorjaus: Word → HTML

Kun viedään sisältöä `.docx`-tiedostosta HTML:ään, noudatetaan näitä sääntöjä **tiukasti**:

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

---

## Projektin rakenne

- `html/` — sivuston HTML-tiedostot
- `words/` — Word-lähteet per sivu
- `julkaisusuunnitelma.md` — sivujen julkaisutila ja aikataulu
- `suunnitelma.txt` — yksityiskohtainen tehtävälistaus per sivu
- `html/navigation.js` — navigaatio ja footer (muokkaa vain tässä)
- `html/search-index.js` — hakuindeksi (päivitettävä käsin kun sisältö muuttuu)
