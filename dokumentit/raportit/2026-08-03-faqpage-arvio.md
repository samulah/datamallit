# FAQPage-skeeman arvio — datamalli.fi

**Päivämäärä:** 2026-08-03
**Tausta:** SEO-auditoinnin kohta M6 (`raportit/2026-08-03-ACTION-PLAN.md`)
**Kysymys:** kannattaako FAQPage-skeemaa laajentaa, korjata vai poistaa?

---

## Tiivistelmä

FAQPage on sivustolla neljällä sivulla, yhteensä 19 kysymystä. **Rakenteellinen toteutus on
poikkeuksellisen hyvä:** jokainen 19 kysymyksestä vastaa täsmälleen jotakin sivun `h2`-otsikkoa.
Se on 19/19 — en löytänyt yhtään kysymystä, joka olisi keksitty skeemaan ilman vastinetta sivulla.

Kaksi asiaa kaipaa päätöstä:

1. **Skeeman vastaukset eivät ole sanatarkasti samoja kuin sivun teksti.** Ne ovat tiivistettyjä
   uudelleenkirjoituksia. Sisällöllisesti ne pitävät paikkansa, mutta Googlen FAQPage-ohje
   edellyttää, että sama teksti näkyy sivulla.
2. **Google ei enää näytä FAQ-rikastetuloksia tälle sivustolle.** Elokuusta 2023 lähtien
   FAQ-rikastetulokset on rajattu tunnettuihin viranomais- ja terveyssivustoihin. Datamalli.fi
   ei kuulu tähän joukkoon eikä tule kuulumaan.

Näistä seuraa suositus: **säilytä FAQPage, mutta lakkaa ajattelemasta sitä rikastetulosten takia.**
Sen arvo on nykyään tekoälyhauissa — AI Overviews, ChatGPT, Perplexity — ja siihen käyttöön
nykyinen tiivistetty muotoilu on itse asiassa parempi kuin sanatarkka kopio. Laajenna se kolmelle
sivulle, joilla työ on käytännössä jo tehty.

---

## 1. Nykytila

| Sivu | Kysymyksiä | Kaikki kysymykset = h2 sivulla | Vastausten sanatarkkuus (ka.) |
|---|---:|:---:|---:|
| `tietomalli.html` | 7 | kyllä | 21 % |
| `dimensiot.html` | 5 | kyllä | 55 % |
| `tahtimalli.html` | 4 | kyllä | 27 % |
| `faktataulu.html` | 3 | kyllä | 52 % |
| **Yhteensä** | **19** | **19/19** | **~37 %** |

"Sanatarkkuus" mittaa, kuinka suuri osa skeeman vastaustekstistä löytyy sanasta sanaan sivun
näkyvästä tekstistä (6 sanan liukuva ikkuna). Se ei mittaa sisällön oikeellisuutta.

### Mitä matala sanatarkkuus tarkoittaa käytännössä

Otetaan `tietomalli.html`, kysymys *"Mistä tietomalli koostuu?"* — sanatarkkuus 0 %.

Skeemassa lukee:
> "Analyyttinen tietomalli koostuu neljästä osasta: faktatauluista, jotka sisältävät mitattavat
> luvut; dimensiotauluista, jotka sisältävät kuvailevan kontekstin; avaimista, jotka yksilöivät
> rivit ja yhdistävät taulut; ja relaatioista, jotka määrittelevät miten suodatus kulkee."

Sivulla lukee sama asia listana: *Faktataulu — mitattavat luvut ja tapahtumat… Dimensiotaulut —
kuvaileva konteksti… Avaimet ja relaatiot — pääavain yksilöi dimension rivin… Nimet ja metadata…*

**Sisältö on sama, muotoilu ei.** Skeemassa on proosaa, sivulla listaa. Nollaprosentti ei siis
tarkoita, että skeema väittäisi jotain mitä sivulla ei ole — se tarkoittaa, ettei sama lause
esiinny kahdesti. Tarkistin kaikki matalan lukeman kohdat: yksikään ei ollut sisällöllisesti
väärin tai keksitty.

Huomionarvoista: skeeman versiossa mainitaan neljä osaa "avaimet" ja "relaatiot" erikseen, kun
sivun listassa ne ovat yksi kohta ja neljäs on "Nimet ja metadata". Tämä on pieni epäjohdonmukaisuus,
joka kannattaa yhtenäistää jos kohtaan muuten koskee.

---

## 2. Mitä FAQPage on nykyään arvoinen?

### Rikastetulokset: ei mitään

Google rajasi FAQ-rikastetulokset elokuussa 2023 koskemaan vain "tunnettuja, arvovaltaisia
viranomais- ja terveyssivustoja". Datamalli.fi ei ole kumpaakaan. Tämän sivuston FAQ-merkinnöistä
ei siis synny hakutulokseen laajennettua Q&A-näkymää, eikä tule syntymään riippumatta siitä,
kuinka hyvin skeema on tehty.

Jos FAQPage on sivustolla siksi, että se toisi rikastetuloksia, se peruste ei enää päde.

### Tekoälyhaut: merkittävä

Tässä on nykyinen arvo. Kysymys–vastaus-pari on rakenteista dataa, jossa vastaus on
**itsenäinen** — se on ymmärrettävissä ilman ympäröivää kappaletta. Juuri sellaista sisältöä
kielimallit poimivat sitaateiksi helpoimmin.

Ja tässä kohtaa nykyinen tiivistetty muotoilu on **etu, ei virhe.** Sivun oma teksti on paikoin
listamuotoista ja viittaa ympäröivään asiayhteyteen; skeeman proosavastaus seisoo omillaan.
Sanatarkka kopiointi sivulta heikentäisi tätä.

### Sisäinen kurinalaisuus: aliarvioitu

Se, että 19/19 kysymystä vastaa oikeaa `h2`-otsikkoa, ei ole sattumaa — se pakottaa
kirjoittamaan sivut kysymys–vastaus-rakenteeseen. Se on hyvä rakenne tälle sisällölle
riippumatta siitä, mitä Google tekee.

---

## 3. Vaihtoehdot

| Vaihtoehto | Työmäärä | Hyöty | Riski |
|---|---|---|---|
| **A. Jätä ennalleen** | 0 | — | Pieni: skeema poikkeaa Googlen ohjeesta sanatarkkuuden osalta |
| **B. Yhtenäistä vastaukset sanatarkoiksi** | Suuri | Ohjeenmukaisuus | Heikentää tekoälypoimintaa; ei tuo rikastetuloksia |
| **C. Laajenna 3 sivulle + siivoa epäjohdonmukaisuudet** | Pieni | Kattavuus 4 → 7 sivua | Ei käytännön riskiä |
| **D. Poista FAQPage kokonaan** | Keskisuuri | Yksi ylläpidettävä asia vähemmän | Menettää tekoälynäkyvyyden |

**Suositus: C.**

Perustelu B:n hylkäämiselle: sanatarkkuuden korjaaminen on iso urakka, jonka ainoa hyöty on
ohjeenmukaisuus muodossa, jota kukaan ei valvo ja jonka palkinto (rikastetulos) on tälle
sivustolle poissa käytöstä. Samalla se heikentäisi ainoaa jäljellä olevaa käyttötarkoitusta.
Se on työtä väärään suuntaan.

Perustelu D:n hylkäämiselle: FAQ-lohkot ovat yksi harvoista rakenteista, joita kielimallit
poimivat luotettavasti. Sivuston koko tarkoitus on olla suomenkielinen lähde datan mallinnukselle
— juuri se sisältö, jota kielimalleilta kysytään suomeksi.

---

## 4. Laajennus: mille sivuille?

Kartoitin julkaistut sivut sen mukaan, kuinka moni `h2`-otsikko on jo kysymysmuodossa. Se
kertoo suoraan, kuinka paljon työtä FAQPage vaatisi.

| Sivu | h2 yht. | Jo kysymyksiä | Arvio |
|---|---:|---:|---|
| **`medallion.html`** | 5 | **5** | **Paras kohde.** Kaikki otsikot ovat jo kysymyksiä. Työ on skeeman kirjoittaminen, ei sisällön muokkaamista. |
| **`avaimet-ja-relaatiot.html`** | 4 | **3** | **Hyvä kohde.** Kolme valmista; neljäs ("Seitsemän vinkkiä…") jätetään pois. |
| **`surrogaattiavaimet.html`** | 4 | **2** | **Hyvä kohde.** Kaksi valmista, sivu on sivuston pisin (2 225 sanaa). |
| `ai-valmis-metadata.html` | 5 | 3 | Mahdollinen, kolme valmista kysymystä. |
| `litistaminen.html` | 3 | 1 | Heikko: vain yksi kysymys, sivu on ohut (490 sanaa). |
| `sekasikiomalli-vs-tahtimalli.html` | 6 | 0 | **Ei sovi.** Sivu on numeroitu vertailu (1–5 mallia). `ItemList` sopisi paremmin kuin FAQ. |
| `nimeamiskaytannot.html`, `lumihiutalemalli.html` | 1 | 0 | Ei sovi: yksi otsikko koko sivulla. |
| `apuohjelmat.html`, `kirjallisuus-suositukset.html` | 4 / 7 | 0 | Ei sovi: otsikot ovat tuotenimiä. `ItemList` on jo `kirjallisuus-suositukset.html`:ssä. |

### Konkreettinen ehdotus

**Lisää FAQPage kolmelle sivulle** — `medallion.html` (5 kysymystä), `avaimet-ja-relaatiot.html`
(3) ja `surrogaattiavaimet.html` (2). Se nostaa kattavuuden 4 → 7 sivuun ja 19 → 29 kysymykseen
ilman, että yhtäkään sivua tarvitsee kirjoittaa uusiksi.

Noudata nykyistä käytäntöä, joka on hyvä:
- kysymys = sivun `h2` sanatarkasti
- vastaus = 2–5 virkkeen itsenäinen tiivistys, joka on ymmärrettävissä ilman sivua
- ei kysymyksiä, joilla ei ole vastinetta sivulla

`sekasikiomalli-vs-tahtimalli.html` kannattaa jättää pois FAQ:sta ja harkita sille `ItemList`-
skeemaa: sivun rakenne on viisi vaihtoehtoa huonoimmasta parhaaseen, mikä on listaa, ei Q&A:ta.

---

## 5. Pienet korjaukset nykyisiin

Nämä eivät ole kiireellisiä, mutta jos FAQ-lohkoihin muuten koskee:

1. **`tietomalli.html`, "Mistä tietomalli koostuu?"** — skeema listaa osiksi faktataulut,
   dimensiot, avaimet ja relaatiot; sivu listaa faktataulun, dimensiot, avaimet+relaatiot ja
   nimet+metadatan. Yhtenäistä neljä osaa samoiksi molemmissa.
2. **`dimensiot.html` ja `faktataulu.html`, "Mitkä ovat … parhaat käytännöt?"** — molemmilla
   sanatarkkuus 5 %. Vastaus tiivistää sivun "kultaiset säännöt" -listan. Sisältö on oikein,
   mutta jos listaa muokataan, muista päivittää myös skeema — ne elävät nyt erillään.

Yleisemmin: **FAQ-vastaukset ovat käsin ylläpidettävää duplikaattia sivun sisällöstä.** Sama
ongelma kuin `llms.txt`:llä ennen kuin se generoidaan. Jos FAQ-lohkoja tulee 7 sivulle ja
29 kysymykseen, kannattaa harkita, kirjoitetaanko vastaukset sivulle merkittyihin elementteihin
ja generoidaanko skeema niistä `rakenna.py`:llä — samalla periaatteella kuin `sivut.js`.
Tämä on suositus vasta jos laajennus tehdään.

---

## 6. Yhteenveto tehtävistä

| # | Tehtävä | Työmäärä |
|---|---|---|
| 1 | Lisää FAQPage: `medallion.html` (5 kysymystä) | ~20 min |
| 2 | Lisää FAQPage: `avaimet-ja-relaatiot.html` (3) | ~15 min |
| 3 | Lisää FAQPage: `surrogaattiavaimet.html` (2) | ~10 min |
| 4 | Yhtenäistä `tietomalli.html`:n "neljä osaa" skeeman ja sivun välillä | ~5 min |
| 5 | *(valinnainen)* `ItemList` sivulle `sekasikiomalli-vs-tahtimalli.html` | ~20 min |
| 6 | *(vasta jos 1–3 tehdään)* FAQ-skeeman generointi `rakenna.py`:hyn | ~2 h |

**Älä tee:** vastausten muuttamista sanatarkoiksi kopioiksi sivun tekstistä. Se on iso työ,
joka heikentää lopputulosta.
