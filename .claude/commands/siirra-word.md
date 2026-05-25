Siirrä Word-tiedoston sisältö HTML-sivulle. Käyttö: /siirrä-word @html/sivu.html @words/Tiedosto.docx

## Työnkulku

1. Lue Word-tiedosto ja pura teksti (python3 + zipfile/xml)
2. Lue nykyinen HTML-tiedosto
3. Vertaa kohta kohdalta: mitä Word muuttaa, mitä lisää, mitä poistaa
4. Tee muutokset HTML:ään

## Säännöt — PAKOLLINEN noudattaa

**Muuta vain se mitä Word eksplisiittisesti muuttaa.** Ei omia kielikorjauksia, ei tyylipäivityksiä, ei sanamuotoparannuksia.

- Taulukon solujen teksti: käytä täsmälleen Wordin merkkejä. Jos Word käyttää pilkkua, se on pilkku — älä muuta em-viivaksi tai toisinpäin.
- Taulukkootsikot (`<caption>`): käytä Wordin erotinta täsmälleen (pilkku / puolipiste / kaksoispiste). Älä korjaa Wordin kirjoitusvirheitä.
- Jos Word antaa saman numeron kahdelle taululle, numeroi se uudelleen.
- HTML-sisältö jota ei ole Wordissa: jätä koskematta.
- Placeholder-kommentit kuten `(<- claude linkki termistöön)`: korvaa oikealla `<a href="...">...</a>` -linkillä, mutta ympäröivä teksti pidetään täsmälleen Wordin muodossa.

**Tarkistus ennen valmis-ilmoitusta:** käy jokainen taulukon solu läpi Word vs HTML.

## Linkit termistöön

Termistö sijaitsee `html/termisto.html`. Kaikilla termeillä on `id`-attribuutti. Yleisimpiä:
- `#vierasavain` — FK
- `#etl` — ETL-prosessi
- `#kardinaliteetti` — kardinaliteetti
- `#denormalisointi` — denormalisointi
- `#litistaminen` — litistäminen / flattening
- `#surrogaattiavain` — surrogaattiavain
- `#paaavain` — pääavain / PK

## Suunnitelmien päivitys

Kun siirto on valmis, päivitä molemmat:
- `suunnitelma.txt` — lisää rivi mitä päivitettiin ja milloin
- `julkaisusuunnitelma.md` — päivitä sivun tila-kenttä
- `search-index.js`,`search.js`, `termisto-search.js` - päivitä hakuindeksit 

## Raportti käyttäjälle

Kerro lopuksi lyhyesti:
- Mitä muutoksia tehtiin (listana)
- Mitä linkkejä lisättiin
- Onko jotain Wordissa mitä ei voitu siirtää (esim. katkennut lause, puuttuva linkki-ankkuri)

