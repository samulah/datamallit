# Termistön laajennus 20.8.2026 — 56 uutta termiä

Kooste siitä, mitä [termisto.html](https://www.datamalli.fi/termisto.html)-sivulle lisättiin
20.8.2026, millä perusteella ja mitä kustakin termistä sivulla lukee.

Työ tehtiin kahdessa aallossa, joilla on **eri peruste**:

| Aalto | Termejä | Peruste |
|---|---:|---|
| **Taso 1** | 18 | Kysyntävetoinen — jokaisella termillä mitattu hakukysyntä Search Consolessa |
| **Tasot 2–4** | 30 + 8 tynkää | Oletusvetoinen — sanastollisia aukkoja, joille ei vielä ole mitattua kysyntää |

Termejä oli ennen **157**, jälkeen **213**. Lähdeaineisto: `gsc tutkimus/20082026/`
(kolmen kuukauden ikkuna 1.6.–18.8.2026) verrattuna 2.8.2026 otettuun otokseen.

---

## 1. Miksi juuri termistöä laajennetaan

Sivuston hakuliikenteestä erottuu yksi selvästi kasvava joukko: kyselyt muotoa
*"jokin sana suomeksi"*. Ne eivät ole sivuston pääaihe, mutta ne ovat se osa, jossa
datamalli.fi oikeasti rankkaa — ja termistö on niiden laskeutumissivu.

| | 2.8.2026 | 20.8.2026 | Muutos |
|---|---|---|---|
| Listatut näytöt yhteensä | 1 143 | 1 915 | 1,7× |
| Käännöskyselyt (*suomeksi / englanniksi / synonyymi*) | 39 | **270** | **6,9×** |
| Osuus kaikista näytöistä | 3 % | **14 %** | |
| Eri käännöskyselyitä | 11 | **41** | |

Koko sivuston 3 kk kokonaisluvut: 2 864 näyttöä, 41 klikkiä, CTR 1,4 %, Suomen osuus
2 344 näyttöä. Termisto.html on toiseksi eniten näyttöjä kerännyt sivu (751 näyttöä,
keskisijainti 18,9) heti etusivun jälkeen.

**Ratkaiseva havainto:** sijoitus ei riipu siitä, käsitelläänkö sana sivulla, vaan siitä,
onko sanalla oma hakusana (`<dt>`).

| Kyselyn ydinsana | Kyselyitä | Painotettu keskisijainti |
|---|---|---|
| On oma hakusana termistössä | 16 | **11,9** (mediaani 11,5) |
| Ei esiinny sivulla lainkaan | 8 | **34,9** |

Ero on noin 23 sijaa eli kaksi tulossivua. Siksi lisäysstrategia on hakusanojen lisääminen,
ei olemassa olevien selitteiden pidentäminen.

---

## 2. Taso 1 — kysyntävetoinen aalto (18 termiä)

GSC-sarakkeet ovat 3 kk näytöt ja painotettu keskisijainti **ennen** lisäystä.

| Termi | Englanniksi | Näytöt | Sija | Vahvin kysely |
|---|---|---:|---:|---|
| **Dimensio** | Dimension | **83** | 11,5 | `dimension suomeksi` 34 · `dimensiot` 17 · `mitä tarkoittaa dimensio` 15 |
| **BI** | Business Intelligence | 17 | 5,1 | `mikä on suomen suosituin data-analytiikka- ja business intelligence -ratkaisu…` |
| **Datanhallinta** | Data Management | 17 | 55,2 | `datanhallinta` 5 · `datanhallinnan kehittäminen` 5 · `datanhallinnan palvelut` 4 |
| **Puolistrukturoitu data** | Semi-structured Data | 14 | 13,8 | `strukturoitu data` 11 · `strukturoitu synonyymi` 3 |
| **Tietokantasuunnittelu** | Database Design | 4 | 29,8 | `tietokantasuunnittelu` 4 |
| **Inferenssi** | Inference | 3 | 39,3 | `inference suomeksi` 3 |
| **Tarkkuus** | Accuracy | 3 | 36,7 | `accuracy suomeksi` 2 · `tarkkuus englanniksi` 1 |
| **Ennustava analytiikka** | Predictive Analytics | 3 | 79,3 | `ennustava analytiikka` 3 |
| **Strukturoimaton data** | Unstructured Data | 2 | 23,5 | `strukturoimaton data` 1 · `structured suomeksi` 1 |
| **Datasuvereniteetti** | Data Sovereignty | 2 | **3,5** | `datasuvereniteetti` 2 |
| **Data Governance** | (datan hallintamalli) | 1 | 38,0 | `data governance suomeksi` 1 |
| **Datan integrointi** | Data Integration | 1 | 79,0 | `datan integrointi` 1 |
| **Parametri** | Parameter | 1 | 9,0 | `parameters suomeksi` 1 |
| **Paikkamerkki** | Placeholder | 1 | 25,0 | `placeholder suomeksi` 1 |
| **Poikkeava havainto** | Outlier | 1 | 34,0 | `outlier suomeksi` 1 |
| **Skaalautuvuus** | Scalability | 1 | 36,0 | `scalable suomeksi` 1 |
| **Selitysaste** | R-squared | 1 | 19,0 | `selitysaste englanniksi` 1 |
| **Hahmontunnistus** | Pattern Recognition | 1 | 59,0 | `pattern recognition suomeksi` 1 |

Pienet näyttömäärät eivät ole heikko signaali. GSC näyttää kyselyn vain, jos sivusto on jo
osunut siihen — yhden näytön kysely sijalla 34 tarkoittaa, että kysyntää on ja sivusto on
sen laidalla ilman että aihetta on käsitelty lainkaan.

### Kaksi suurinta aukkoa

**Dimensio** oli koko sivun selvin puute. Termistössä olivat *Dimensiotaulu*,
*Päivämäärädimensio*, *Role-playing-dimensio* ja *Yhdenmukaistettu dimensio* — mutta ei sitä
paljasta sanaa, jota ihmiset hakevat. Klusterin 83 näyttöä olivat siis kokonaan lainaa
muilta termeiltä.

**BI** puuttui kirjaimellisesti: sanapari "business intelligence" ei esiintynyt sivulla
kertaakaan, vaikka ingressi lupaa kattaa BI-kehittämisen käsitteet.

---

## 3. Taso 1 — mitä termeistä lukee sivulla

Tekstit ovat sanatarkasti ne, jotka sivulla lukevat.

### Dimensio (Dimension) OK

Englanniksi Dimension, suomeksi dimensio. Näkökulma, jonka mukaan mittarit jaotellaan: aika, asiakas, tuote, maa. Kun raportti kertoo myynnin kuukausittain ja tuoteryhmittäin, kuukausi ja tuoteryhmä ovat dimensioita. [Tähtimallissa](https://www.datamalli.fi/tahtimalli.html) jokainen dimensio on oma taulunsa, joka kytkeytyy [faktatauluun](https://www.datamalli.fi/termisto.html#faktataulu) yhdellä avaimella. Kirjanpito-ohjelmissa sama sana tarkoittaa laskentakohdetta, jolla tosite luokitellaan esimerkiksi kustannuspaikkaan tai projektiin — idea on sama, nimi vain vakiintui eri alalla. Ks. [dimensiotaulu](https://www.datamalli.fi/termisto.html#dimensiotaulu) ja [attribuutti](https://www.datamalli.fi/termisto.html#attribuutti).

*Tägit: tietomalli, konseptit, dimensiot, tahtimalli · Ankkuri: `#dimensio`*

### BI (Business Intelligence, liiketoimintatiedon hallinta) OK

Englanniksi Business Intelligence, suomeksi liiketoimintatiedon hallinta. Datan kerääminen, mallintaminen ja esittäminen niin, että organisaatio tekee päätökset numeroiden eikä arvausten perusteella. BI on ketju, ei työkalu: lähdejärjestelmä, [tietovarasto](https://www.datamalli.fi/termisto.html#tietovarasto), [tietomalli](https://www.datamalli.fi/tietomalli.html) ja vasta viimeisenä raportti. Suomalaisyrityksissä yleisin BI-alusta on Power BI, ja sen nopeus ratkeaa tietomallissa — raporttityökalu ei korjaa huonoa mallia. Vrt. [ennustava analytiikka](https://www.datamalli.fi/termisto.html#ennustava-analytiikka), joka kertoo mitä tapahtuu seuraavaksi.

*Tägit: konseptit, arkkitehtuuri · Ankkuri: `#bi`*

### Datanhallinta (Data Management) OK

Englanniksi Data Management, suomeksi datanhallinta. Kattotermi kaikelle datan elinkaaren hoitamiselle: keräämiselle, tallentamiselle, mallintamiselle, laadunvalvonnalle ja poistamiselle. Datanhallinta on tekemistä, [Data Governance](https://www.datamalli.fi/termisto.html#data-governance) sen säännöt — sekoita nämä, ja saat joko komitean ilman käytäntöä tai käytännön ilman vastuita. Ks. myös [datan elinkaari](https://www.datamalli.fi/termisto.html#datan-elinkaari).

*Tägit: hallinta, prosessit · Ankkuri: `#datanhallinta`*

### Puolistrukturoitu data (Semi-structured Data) OK

Englanniksi Semi-structured Data, suomeksi puolistrukturoitu data. Data, jolla on rakenne, mutta rakenne kulkee datan mukana eikä ole ennalta kiinnitetty tauluun: JSON, XML, Parquet, lokirivit. Kentät voivat vaihdella riviltä toiselle, mikä tekee lataamisesta joustavaa ja raportoinnista hankalaa. Analytiikkaa varten puolistrukturoitu data [litistetään](https://www.datamalli.fi/litistaminen.html) sarakkeiksi viimeistään [hopeatasolla](https://www.datamalli.fi/termisto.html#silver). Vrt. [strukturoitu data](https://www.datamalli.fi/termisto.html#strukturoitu-data) ja [strukturoimaton data](https://www.datamalli.fi/termisto.html#strukturoimaton-data).

*Tägit: konseptit, arkkitehtuuri · Ankkuri: `#puolistrukturoitu-data`*

### Tietokantasuunnittelu (Database Design) OK

Englanniksi Database Design, suomeksi tietokantasuunnittelu. Taulujen, sarakkeiden, avainten ja suhteiden suunnittelu ennen kuin yhtään riviä on tallennettu. Operatiivisessa järjestelmässä suunnittelu tähtää [normalisointiin](https://www.datamalli.fi/termisto.html#normalisointi) ja kirjoituksen nopeuteen, analytiikassa [tähtimalliin](https://www.datamalli.fi/tahtimalli.html) ja luvun nopeuteen — sama data, vastakkaiset tavoitteet. Siksi operatiivisen kannan kopioiminen raportoinnin pohjaksi tuottaa aina hitaan mallin. Ks. [käsitemalli](https://www.datamalli.fi/termisto.html#kasitemalli) ja [OLTP](https://www.datamalli.fi/termisto.html#oltp).

*Tägit: tietomalli, konseptit · Ankkuri: `#tietokantasuunnittelu`*

### Inferenssi (Inference) OK

Englanniksi Inference, suomeksi inferenssi eli päättely. Vaihe, jossa valmis malli tuottaa vastauksen syötteestä — vastakohta koulutukselle, jossa malli opetetaan. [Kielimallin](https://www.datamalli.fi/termisto.html#kielimalli) käytössä inferenssi on se hetki, joka kuluttaa [tokeneita](https://www.datamalli.fi/termisto.html#token) ja kestää sekunteja. Tietokantapuolella sama sana tarkoittaa tietotyypin päättelyä datasta, esimerkiksi kun [Power Query](https://www.datamalli.fi/termisto.html#power-query) arvaa sarakkeen tyypiksi kokonaisluvun — ja arvaa toisinaan väärin.

*Tägit: ai, konseptit · Ankkuri: `#inferenssi`*

### Tarkkuus (Accuracy) OK

Englanniksi Accuracy, suomeksi tarkkuus. [Datan laadun](https://www.datamalli.fi/termisto.html#datan-laatu) ulottuvuus, joka kertoo vastaako tallennettu arvo todellisuutta: onko asiakkaan osoite se, jossa asiakas oikeasti asuu. Tarkkuutta ei voi mitata datasta itsestään, vaan se vaatii vertailun lähteeseen — siksi se on datan laadun ulottuvuuksista kallein todentaa. Koneoppimisessa sama sana tarkoittaa eri asiaa: osuutta oikein menneistä ennusteista. Ks. myös [tietoeheys](https://www.datamalli.fi/termisto.html#tietoeheys).

*Tägit: datan-laatu, mittaaminen · Ankkuri: `#tarkkuus`*

### Ennustava analytiikka (Predictive Analytics) OK

Englanniksi Predictive Analytics, suomeksi ennustava analytiikka. Historiadatasta rakennettu malli, joka arvioi mitä tapahtuu seuraavaksi: asiakaspoistuma, kysyntäpiikki, laitevika. Ennuste on täsmälleen niin hyvä kuin sen opetusdata, ja opetusdata tulee tietomallista — väärä [granulariteetti](https://www.datamalli.fi/termisto.html#granulariteetti) tai puuttuva historia pilaa mallin ennen kuin algoritmia on edes valittu. Vrt. [BI](https://www.datamalli.fi/termisto.html#bi), joka kuvaa mennyttä.

*Tägit: ai, mittaaminen, konseptit · Ankkuri: `#ennustava-analytiikka`*

### Strukturoimaton data (Unstructured Data) OK

Englanniksi Unstructured Data, suomeksi strukturoimaton data. Data, jolla ei ole ennalta määrättyä rakennetta: vapaa teksti, sähköpostit, kuvat, ääni, video. Sitä ei voi ladata suoraan taululle, vaan siitä pitää ensin louhia rakenteisia kenttiä — nykyään yhä useammin [kielimallilla](https://www.datamalli.fi/termisto.html#kielimalli). Suurin osa organisaation datasta on strukturoimatonta, ja lähes kaikki raportointi käyttää strukturoitua. Vrt. [strukturoitu data](https://www.datamalli.fi/termisto.html#strukturoitu-data) ja [puolistrukturoitu data](https://www.datamalli.fi/termisto.html#puolistrukturoitu-data).

*Tägit: konseptit, arkkitehtuuri · Ankkuri: `#strukturoimaton-data`*

### Datasuvereniteetti (Data Sovereignty)

Englanniksi Data Sovereignty, suomeksi datasuvereniteetti. Periaate, jonka mukaan dataan sovelletaan sen maan lakia, jonka alueella data fyysisesti sijaitsee. Pilvipalvelussa ratkaisee siis konesalin sijainti, ei palveluntarjoajan kotipaikka — ja siksi EU-alueen valinta on henkilötiedoille oletusvastaus, ei mielipidekysymys. Ks. myös [GDPR](https://www.datamalli.fi/termisto.html#gdpr) ja [anonymisointi](https://www.datamalli.fi/termisto.html#anonymisointi).

*Tägit: hallinta, data-governance · Ankkuri: `#datasuvereniteetti`*

### Data Governance (datan hallintamalli) OK

Suomeksi datan hallintamalli. Säännöstö ja vastuunjako, joka kertoo kuka omistaa datan, kuka saa käyttää sitä ja mihin tarkoitukseen, ja millä laatutasolla se toimitetaan. Ilman nimettyjä rooleja — [Data Owner](https://www.datamalli.fi/termisto.html#data-owner), [Data Steward](https://www.datamalli.fi/termisto.html#data-steward), [Data Custodian](https://www.datamalli.fi/termisto.html#data-custodian) — hallintamalli jää dokumentiksi, jota kukaan ei noudata. Ks. myös [datakatalogi](https://www.datamalli.fi/termisto.html#datakatalogi) ja [Data Contract](https://www.datamalli.fi/termisto.html#data-contract).

*Tägit: hallinta, data-governance, data-contract · Ankkuri: `#data-governance`*

### Datan integrointi (Data Integration) OK

Englanniksi Data Integration, suomeksi datan integrointi. Useasta lähdejärjestelmästä tulevan datan yhdistäminen yhdeksi käyttökelpoiseksi kokonaisuudeksi. Tekninen siirto on helppo osa; vaikea osa on saada eri järjestelmien "asiakas" tarkoittamaan samaa asiaa. Siihen tarvitaan [yhdenmukaistetut dimensiot](https://www.datamalli.fi/termisto.html#yhdenmukaistettu-dimensio) ja sovitut avaimet, ei lisää putkia. Ks. [ETL](https://www.datamalli.fi/termisto.html#etl) ja [ELT](https://www.datamalli.fi/termisto.html#elt).

*Tägit: prosessit, arkkitehtuuri, etl-elt · Ankkuri: `#datan-integrointi`*

### Parametri (Parameter)  OK

Englanniksi Parameter, suomeksi parametri. Nimetty arvo, joka annetaan prosessille tai laskennalle ulkopuolelta, niin ettei sitä kirjoiteta koodiin kiinni. [Power Queryssä](https://www.datamalli.fi/termisto.html#power-query) parametri pitää lähdepolun yhdessä paikassa, jolloin kehitys- ja tuotantoympäristön vaihto on yhden arvon muutos eikä kolmenkymmenen kyselyn haravointi. Raporttipuolella parametritaulu antaa käyttäjän valita esimerkiksi valuutan tai aikatason. Ks. [M-kieli](https://www.datamalli.fi/termisto.html#m-kieli).

*Tägit: power-bi, prosessit, dax-konseptit · Ankkuri: `#parametri`*

### Paikkamerkki (Placeholder) OK

Englanniksi Placeholder, suomeksi paikkamerkki. Väliaikainen arvo tai elementti, joka varaa paikan lopulliselle sisällölle. Tietomallissa paikkamerkkinä toimii [sentinel-rivi](https://www.datamalli.fi/termisto.html#sentinel-rivi), joka ottaa vastaan faktarivit, joiden dimensioarvo puuttuu — ilman sitä Power BI luo oman [tyhjän rivin](https://www.datamalli.fi/termisto.html#tyhja-rivi), jota et voi nimetä etkä suodattaa.

*Tägit: konseptit, prosessit · Ankkuri: `#paikkamerkki`*

### Poikkeava havainto (Outlier) OK

Englanniksi Outlier, suomeksi poikkeava havainto. Arvo, joka eroaa muusta aineistosta niin paljon, ettei se selity satunnaisvaihtelulla: miljoonan euron rivi tuhannen euron tilausten joukossa. Poikkeama on joko syöttövirhe tai koko taulun kiinnostavin rivi — älä poista sitä ennen kuin tiedät kumpi. Keskiarvo vääristyy yhdestäkin poikkeamasta, mediaani ei. Ks. [datan laatu](https://www.datamalli.fi/termisto.html#datan-laatu).

*Tägit: datan-laatu, mittaaminen, konseptit · Ankkuri: `#poikkeava-havainto`*

### Skaalautuvuus (Scalability) OK

Englanniksi Scalability, suomeksi skaalautuvuus. Järjestelmän kyky kasvaa datamäärän tai käyttäjämäärän mukana ilman, että suorituskyky romahtaa tai arkkitehtuuri pitää kirjoittaa uusiksi. Tietomallissa skaalautuvuus ratkeaa rakenteessa: [tähtimalli](https://www.datamalli.fi/tahtimalli.html) kestää rivien kasvun, koska suodatus etenee dimensiosta faktaan yhtä polkua pitkin, kun taas [sekasikiömalli](https://www.datamalli.fi/sekasikiomalli-vs-tahtimalli.html) hidastuu jokaisesta uudesta relaatiosta. Ks. [VertiPaq](https://www.datamalli.fi/termisto.html#vertipaq).

*Tägit: arkkitehtuuri, konseptit · Ankkuri: `#skaalautuvuus`*

### Selitysaste (R-squared, Coefficient of Determination) OK

Englanniksi R-squared tai Coefficient of Determination, suomeksi selitysaste. Luku välillä 0–1, joka kertoo kuinka suuren osan selitettävän muuttujan vaihtelusta malli selittää. Selitysaste 0,82 tarkoittaa, että malli selittää 82 prosenttia vaihtelusta ja loput 18 jää muiden tekijöiden ja satunnaisuuden varaan. Korkea selitysaste ei todista syy-seuraussuhdetta, se kertoo yhteisvaihtelusta. Power BI näyttää selitysasteen [sirontakuvion](https://www.datamalli.fi/termisto.html#sirontakuvio) trendiviivan yhteydessä.

*Tägit: mittaaminen, konseptit · Ankkuri: `#selitysaste`*

### Hahmontunnistus (Pattern Recognition) OK

Englanniksi Pattern Recognition, suomeksi hahmontunnistus. Koneen kyky löytää datasta toistuvia rakenteita: samankaltaiset asiakkaat, toistuvat tapahtumaketjut, tekstin aiheet. Data-alalla hahmontunnistus näkyy arkisimmillaan duplikaattien tunnistuksena ja [poikkeavien havaintojen](https://www.datamalli.fi/termisto.html#poikkeava-havainto) etsintänä — ei siis vain koneoppimisprojekteissa vaan jokaisessa latausajossa, joka tarkistaa datan laadun.

*Tägit: ai, konseptit · Ankkuri: `#hahmontunnistus`*

---

## 4. Tasot 2–4 — oletusvetoinen aalto (30 termiä)

**Näillä termeillä ei ole mitattua hakukysyntää.** Kaikki 30 ehdokasta ajettiin molempia
GSC-otoksia vasten, ja ainoat osumat olivat kohinaa: `tabella` (2 näyttöä, italiaa),
`samu taulu` (1, nimihaku) ja `taulujen sommittelu` (1, typografiaa). Peruste on siis toinen
kuin tasolla 1.

Peruste on tason 1 mittaustulos yleistettynä: sana, jolla on oma hakusana, rankkaa
sijalla ~12, ja sana, jota sivulla ei ole, sijalla ~35. Kun sanasto kattaa käsitteen, se
alkaa kerätä "X suomeksi" -hakuja, joita GSC ei voi näyttää etukäteen — kysely ei ilmesty
listalle ennen kuin sivusto osuu siihen edes kerran. Tasot 2–4 ovat siis veto siitä, että
sama kuvio toistuu laajemmalla sanastolla.

**Vaikutus on mitattava, ei oletettava.** Seuraavasta GSC-otoksesta katsotaan, ilmestyvätkö
näiden termien omat kyselyt listalle lainkaan. Jos eivät, oletusvetoinen laajennus ei
kannata jatkossa ja resurssi kuuluu kysyntävetoisiin termeihin.

Aukot löytyivät vertaamalla termistön 175 hakusanaa alan perussanastoon:

| Taso | Termejä | Aukko, joka täytettiin |
|---|---:|---|
| **Taso 2** — perussanasto | 10 | Sivulla oli *Sarake* mutta ei *Riviä*, *Faktataulu* ja *Dimensiotaulu* mutta ei *Taulua*, *Filter Context* mutta ei *Suodatinta*. Juuri näiden sanojen perään kirjoitetaan "suomeksi". |
| **Taso 3** — AI-sanasto | 8 | Sivulla oli *Token*, *RAG*, *Kielimalli*, *Hallusinaatio* ja *Agentti* — mutta ei niitä käsitteitä, joihin ne nojaavat (upotus, vektorikanta, kontekstin ikkuna). |
| **Taso 4** — putkisanasto | 12 | *Medallion*- ja *ETL/ELT*-sisältö on olemassa, mutta latausputken arkisanasto (partitio, eräajo, staging, CDC) puuttui kokonaan. |

---

## 5. Taso 2 — perussanasto (10 termiä)

### Taulu (Table) OK

Englanniksi Table, suomeksi taulu. Riveistä ja sarakkeista koostuva datan perusrakenne, jossa jokainen sarake on yhtä [tietotyyppiä](https://www.datamalli.fi/termisto.html#tietotyyppi) ja jokainen [rivi](https://www.datamalli.fi/termisto.html#rivi) yksi tietue. Analytiikassa taulut jakautuvat kahteen lajiin, ja ero on koko [tähtimallin](https://www.datamalli.fi/tahtimalli.html) perusta: [faktataulu](https://www.datamalli.fi/termisto.html#faktataulu) sisältää mitattavat tapahtumat, [dimensiotaulu](https://www.datamalli.fi/termisto.html#dimensiotaulu) niitä kuvaavat näkökulmat. Taulu, joka on kumpaakin, on merkki mallinnusvirheestä.

*Tägit: tietomalli, konseptit · Ankkuri: `#taulu`*

### Rivi (Row) OK

Englanniksi Row, suomeksi rivi. Taulun yksittäinen tietue: yksi asiakas, yksi tilausrivi, yksi päivä. Rivimäärä ratkaisee [faktataulun](https://www.datamalli.fi/termisto.html#faktataulu) koon mutta ei sen muistijalanjälkeä — [VertiPaq](https://www.datamalli.fi/termisto.html#vertipaq) pakkaa sarakkeittain, joten kymmenen miljoonaa riviä kapeaa faktataulua vie vähemmän tilaa kuin miljoona riviä leveää. Yksittäistä riviä käsittelee DAXissa [rivikonteksti](https://www.datamalli.fi/termisto.html#row-context), joka kertoo mitä riviä laskenta parhaillaan katsoo. Ks. [sarake](https://www.datamalli.fi/termisto.html#sarake).

*Tägit: tietomalli, konseptit · Ankkuri: `#rivi`*

### Relaatio (Join) OK

Englanniksi Join, suomeksi Relaatio. Kahden taulun yhdistäminen yhteisen sarakkeen perusteella: tilausrivi saa asiakkaan nimen, kun tilaustaulun asiakasavain vastaa asiakastaulun avainta. Relaatiotyyppi ratkaisee mitä puuttuville vastineille tapahtuu — inner join pudottaa ne pois, left join säilyttää ne tyhjinä, ja valinta muuttaa loppusumman. [Tähtimallissa](https://www.datamalli.fi/tahtimalli.html) liitokset korvataan [relaatioilla](https://www.datamalli.fi/termisto.html#relaatio): Relaatio tehdään kerran malliin, ei joka kyselyssä uudelleen. Ks. [vierasavain](https://www.datamalli.fi/termisto.html#vierasavain).

*Tägit: tietomalli, konseptit, avaimet · Ankkuri: `#Relaatio`*

### Kysely (Query) OK

Englanniksi Query, suomeksi kysely. Pyyntö, joka kertoo mitä dataa halutaan ja millä ehdoilla: SQL:n SELECT-lause, [Power Queryn](https://www.datamalli.fi/termisto.html#power-query) hakuvaihe tai [DAX](https://www.datamalli.fi/termisto.html#dax)-mittarin laskenta. Kysely kuvaa mitä halutaan, ei sitä miten se haetaan — reitin valitsee moottorin kyselyoptimoija. Siksi saman kyselyn nopeus voi vaihdella kertaluokan tietomallin rakenteen mukaan, vaikka kyselyteksti ei muutu riviäkään.

*Tägit: prosessit, power-bi, konseptit · Ankkuri: `#kysely`*

### Suodatin (Filter) OK

Englanniksi Filter, suomeksi suodatin. Ehto, joka rajaa mitkä rivit otetaan laskentaan mukaan. Power BI:ssä suodatin ei ole vain käyttöliittymän valinta vaan koko laskennan perusmekanismi: raportin valinnat muodostavat [suodatinkontekstin](https://www.datamalli.fi/termisto.html#filter-context), joka etenee dimensiotaulusta faktatauluun [relaation](https://www.datamalli.fi/termisto.html#relaatio) suuntaa pitkin. Siksi väärinpäin oleva relaatio ei näy virheilmoituksena vaan väärinä lukuina.

*Tägit: power-bi, dax-konseptit, konseptit · Ankkuri: `#suodatin`*

### Tietotyyppi (Data Type) OK

Englanniksi Data Type, suomeksi tietotyyppi. Määritys siitä, millaista dataa sarakkeeseen saa tallentaa: kokonaisluku, desimaaliluku, teksti, päivämäärä, totuusarvo. Tietotyyppi ei ole muotoiluasia vaan suorituskykyasia — kokonaisluku pakkautuu [VertiPaqissa](https://www.datamalli.fi/termisto.html#vertipaq) murto-osaan siitä mitä sama arvo tekstinä, ja siksi [surrogaattiavain](https://www.datamalli.fi/surrogaattiavaimet.html) on aina INT. Väärä tyyppi paljastuu yleensä vasta laskennassa: tekstinä tallennettu luku ei summaudu ja tekstinä tallennettu päivämäärä lajittuu aakkosjärjestykseen. Ks. [toimialueen eheys](https://www.datamalli.fi/termisto.html#toimialueen-eheys).

*Tägit: tietomalli, datan-laatu · Ankkuri: `#tietotyyppi`*

### Indeksi (Index) OK

Englanniksi Index, suomeksi indeksi. Tietokannan apurakenne, joka nopeuttaa rivien hakua samalla tavalla kuin kirjan hakemisto: moottori ei lue koko taulua läpi vaan hyppää oikeaan kohtaan. Indeksi maksaa kirjoitusnopeudessa ja levytilassa, joten [operatiivisessa kannassa](https://www.datamalli.fi/termisto.html#oltp) niitä pidetään harkitusti. Power BI:n [VertiPaq](https://www.datamalli.fi/termisto.html#vertipaq) ei käytä indeksejä lainkaan — se pakkaa sarakkeet ja skannaa ne, mikä on sarakepohjaisessa analytiikassa nopeampaa kuin hakemiston seuraaminen.

*Tägit: tietomalli, prosessit · Ankkuri: `#indeksi`*

### Ryhmittely (Group By) OK

Englanniksi Group By, suomeksi ryhmittely. Rivien niputtaminen yhteisen arvon perusteella ja [aggregaatin](https://www.datamalli.fi/termisto.html#aggregaatti) laskenta jokaiselle nipulle: myynti maittain, tilaukset kuukausittain. Ryhmittely on se, mitä jokainen raportti käytännössä tekee — [dimensio](https://www.datamalli.fi/termisto.html#dimensio) määrää nipun, [mittari](https://www.datamalli.fi/termisto.html#mittari) laskettavan arvon. Latausvaiheessa ryhmittely kannattaa tehdä lähteessä eikä mallissa: ladattu rivi maksaa muistia riippumatta siitä, katsooko sitä kukaan.

*Tägit: prosessit, mittaaminen · Ankkuri: `#ryhmittely`*

### Pivotointi (Pivot, Unpivot) OK

Englanniksi Pivot ja Unpivot, suomeksi pivotointi ja sen purkaminen. Pivotointi kääntää sarakkeen arvot omiksi sarakkeikseen — kuukausi-sarake muuttuu kahdeksitoista sarakkeeksi. Unpivot tekee päinvastoin, ja juuri sitä tietomallissa tarvitaan: leveä taulu, jossa jokainen kuukausi on oma sarakkeensa, ei suodatu dimensiolla eikä laajene uuteen vuoteen ilman mallimuutosta. Käännä leveä lähdedata pitkäksi [Power Queryssä](https://www.datamalli.fi/termisto.html#power-query) ennen kuin viet sen malliin. Ks. [sarake](https://www.datamalli.fi/termisto.html#sarake).

*Tägit: prosessit, power-bi · Ankkuri: `#pivotointi`*

### Aikaleima (Timestamp) OK

Englanniksi Timestamp, suomeksi aikaleima. Päivämäärän ja kellonajan sisältävä arvo, joka kertoo milloin tapahtuma sattui tai rivi muuttui. Aikaleima on tietomallissa eri asia kuin päivämäärä: sekunnin tarkkuus tuottaa lähes yhtä monta uniikkia arvoa kuin rivejä, mikä tuhoaa pakkauksen eikä kytkeydy [päivämäärädimensioon](https://www.datamalli.fi/termisto.html#paivamaaradimensio) sellaisenaan. Erota aikaleimasta päivämääräsarake liitosta varten ja jätä kellonaika omaksi sarakkeekseen. Ks. [VertiPaq](https://www.datamalli.fi/termisto.html#vertipaq).

*Tägit: konseptit, tietomalli · Ankkuri: `#aikaleima`*

---

## 6. Taso 3 — AI-sanasto (8 termiä)

### Upotus (Embedding) OK

Englanniksi Embedding, suomeksi upotus eli vektoriesitys. Tekstin, kuvan tai muun sisällön muuntaminen numerovektoriksi niin, että merkitykseltään lähellä olevat asiat päätyvät lähelle toisiaan. Upotus on se rakenne, jonka ansiosta haku löytää "liikevaihdon" ja "myyntitulot" samaksi asiaksi ilman synonyymitaulukkoa. Data-alalla upotuksia käytetään [metadatan](https://www.datamalli.fi/ai-valmis-metadata.html) haussa ja [RAG](https://www.datamalli.fi/termisto.html#rag)-toteutuksissa, joissa oikea taulukuvaus pitää löytää sadan taulun joukosta. Ks. [vektorikanta](https://www.datamalli.fi/termisto.html#vektorikanta).

*Tägit: ai, konseptit · Ankkuri: `#upotus`*

### Vektorikanta (Vector Database) OK

Englanniksi Vector Database, suomeksi vektorikanta. Tietokanta, joka tallentaa [upotuksia](https://www.datamalli.fi/termisto.html#upotus) ja hakee niistä lähimmät osumat merkityksen perusteella, ei tekstin täsmäävyyden. Tavallinen tietokanta vastaa kysymykseen "mikä rivi vastaa tätä arvoa", vektorikanta kysymykseen "mikä sisältö on lähinnä tätä ajatusta". Se ei korvaa [tietovarastoa](https://www.datamalli.fi/termisto.html#tietovarasto) vaan täydentää sitä: luvut tulevat yhä tähtimallista, kuvaukset ja dokumentaatio vektorikannasta.

*Tägit: ai, arkkitehtuuri · Ankkuri: `#vektorikanta`*

### Kontekstin ikkuna (Context Window) OK

Englanniksi Context Window, suomeksi kontekstin ikkuna. [Tokenimäärä](https://www.datamalli.fi/termisto.html#token), jonka [kielimalli](https://www.datamalli.fi/termisto.html#kielimalli) pystyy pitämään kerralla mielessään: kysymys, aineisto ja vastaus mahtuvat samaan ikkunaan tai eivät mahdu. Kun ikkuna täyttyy, malli ei varoita vaan pudottaa vanhimman osan — ja vastaus muuttuu itsevarmasti vääräksi. Siksi isoa tietomallia ei syötetä mallille kokonaisena vaan siitä haetaan olennainen osa kyselyhetkellä. Ks. [RAG](https://www.datamalli.fi/termisto.html#rag).

*Tägit: ai · Ankkuri: `#kontekstin-ikkuna`*

### Hienosäätö (Fine-tuning) OK

Englanniksi Fine-tuning, suomeksi hienosäätö. Valmiin [kielimallin](https://www.datamalli.fi/termisto.html#kielimalli) jatkokouluttaminen omalla aineistolla, jotta se oppii tietyn alan sanaston, muodon tai tyylin. Hienosäätö muuttaa mallin painoja pysyvästi, toisin kuin [RAG](https://www.datamalli.fi/termisto.html#rag), joka hakee tiedon kyselyhetkellä ulkopuolelta. Data-alan käyttötapauksissa RAG on lähes aina oikea vastaus: yrityksen luvut muuttuvat viikoittain, eikä mallia kouluteta uudelleen jokaisen muutoksen takia.

*Tägit: ai · Ankkuri: `#hienosaato`*

### Koneoppiminen (Machine Learning) OK

Englanniksi Machine Learning, suomeksi koneoppiminen. Menetelmä, jossa malli päättelee säännöt datasta sen sijaan että ohjelmoija kirjoittaisi ne. Koneoppimisprojektin onnistuminen ratkeaa harvoin algoritmissa ja lähes aina datassa: puuttuva historia, väärä [granulariteetti](https://www.datamalli.fi/termisto.html#granulariteetti) tai vinoutunut [opetusaineisto](https://www.datamalli.fi/termisto.html#opetusaineisto) kaataa mallin riippumatta menetelmästä. Tietomallinnus on siksi koneoppimisen esityö, ei sen kilpailija. Ks. [ennustava analytiikka](https://www.datamalli.fi/termisto.html#ennustava-analytiikka).

*Tägit: ai, konseptit · Ankkuri: `#koneoppiminen`*

### Opetusaineisto (Training Data) OK

Englanniksi Training Data, suomeksi opetusaineisto. Data, jolla malli opetetaan — se määrää mitä malli osaa ja mitä se ei osaa. Opetusaineiston virheet eivät jää aineistoon vaan siirtyvät malliin ja monistuvat jokaiseen ennusteeseen, eikä niitä näe valmiista mallista päälle päin. Sama laatuvaatimus koskee siis opetusaineistoa kuin raportoitavaa dataa: dokumentoitu alkuperä, tunnettu kattavuus, mitattu [tarkkuus](https://www.datamalli.fi/termisto.html#tarkkuus). Ks. [vinouma](https://www.datamalli.fi/termisto.html#vinouma).

*Tägit: ai, datan-laatu · Ankkuri: `#opetusaineisto`*

### Vinouma (Bias)

Englanniksi Bias, suomeksi vinouma eli harha. Systemaattinen vääristymä, joka toistuu samaan suuntaan eikä tasoitu otoskoon kasvaessa. Vinouma syntyy useimmiten datasta eikä mallista: jos [opetusaineisto](https://www.datamalli.fi/termisto.html#opetusaineisto) sisältää vain hyväksytyt hakemukset, malli oppii hyväksyttyjen piirteet eikä näe hylättyjä koskaan. Vinoumaa ei löydä [tarkkuutta](https://www.datamalli.fi/termisto.html#tarkkuus) katsomalla, koska vinoutunut malli voi olla erittäin tarkka väärässä asiassa.

*Tägit: ai, datan-laatu · Ankkuri: `#vinouma`*

### Ylisovittaminen (Overfitting)

Englanniksi Overfitting, suomeksi ylisovittaminen. Tilanne, jossa malli oppii opetusaineiston yksityiskohdat ja kohinan sen sijaan että oppisi yleisen säännön — se osaa menneen täydellisesti ja epäonnistuu uudella datalla. Tunnusmerkki on epäsuhta: [selitysaste](https://www.datamalli.fi/termisto.html#selitysaste) opetusaineistossa 0,98, testiaineistossa 0,41. Siksi mallia ei koskaan arvioida sillä datalla, jolla se opetettiin. Ks. [opetusaineisto](https://www.datamalli.fi/termisto.html#opetusaineisto).

*Tägit: ai, mittaaminen · Ankkuri: `#ylisovittaminen`*

---

## 7. Taso 4 — putkisanasto (12 termiä)

### Partitio (Partition, ositus)

Englanniksi Partition, suomeksi partitio eli ositus. Taulun jakaminen osiin, joita voi ladata, päivittää ja lukea erikseen — yleensä ajan mukaan, esimerkiksi kuukausi kerrallaan. Partitiointi on [inkrementaalisen päivityksen](https://www.datamalli.fi/termisto.html#inkrementaalinen-paivitys) edellytys: ilman sitä koko taulu on yksi möykky, joka ladataan aina kokonaan. Hyöty näkyy myös luvussa, kun moottori ohittaa partitiot, joita kysely ei koske. Ks. [VertiPaq](https://www.datamalli.fi/termisto.html#vertipaq).

*Tägit: arkkitehtuuri, prosessit, power-bi · Ankkuri: `#partitio`*

### Inkrementaalinen päivitys (Incremental Refresh)

Englanniksi Incremental Refresh, suomeksi inkrementaalinen päivitys. Latausmalli, jossa vain uusi ja muuttunut aikaväli päivitetään ja vanha historia jätetään koskematta. Power BI:ssä tämä toteutetaan [partitioimalla](https://www.datamalli.fi/termisto.html#partitio) taulu ajan mukaan: viisi vuotta historiaa säilyy, mutta jokainen päivitys koskee vain kuluvaa kuukautta. Ero täyslataukseen on kertaluokka, ja se kasvaa joka vuosi kun historiaa karttuu lisää. Ks. [CDC](https://www.datamalli.fi/termisto.html#cdc).

*Tägit: power-bi, prosessit · Ankkuri: `#inkrementaalinen-paivitys`*

### Eräajo (Batch)

Englanniksi Batch, suomeksi eräajo. Datan käsittely erissä sovituin väliajoin: yön aikana ajettu lataus, tunnin välein päivittyvä taulu. Eräajo on analytiikassa oletus, koska raportointi tarvitsee harvoin sekuntitason tuoreutta ja erä maksaa murto-osan jatkuvaan virtaan verrattuna. Kysy tuoreusvaatimus ennen arkkitehtuuria: "reaaliaikainen" tarkoittaa useimmiten "aamulla ajan tasalla". Ks. [suoratoisto](https://www.datamalli.fi/termisto.html#suoratoisto).

*Tägit: prosessit, etl-elt · Ankkuri: `#eraajo`*

### Suoratoisto (Streaming)

Englanniksi Streaming, suomeksi suoratoisto. Datan käsittely tapahtuma kerrallaan sitä mukaa kuin sitä syntyy, ilman että odotetaan seuraavaa ajoa. Suoratoisto on oikea valinta silloin kun päätös tehdään sekunneissa: laitevalvonta, petostunnistus, verkkokaupan varastosaldo. Raportointiin se on useimmiten ylimitoitus, joka maksaa monimutkaisuutena ja tuo tuoreutta, jota kukaan ei katso. Ks. [eräajo](https://www.datamalli.fi/termisto.html#eraajo) ja [data-alusta](https://www.datamalli.fi/termisto.html#data-alusta).

*Tägit: arkkitehtuuri, prosessit · Ankkuri: `#suoratoisto`*

### CDC (Change Data Capture, muutostiedon tunnistus)

Englanniksi Change Data Capture, suomeksi muutostiedon tunnistus. Menetelmä, jossa lähdejärjestelmästä poimitaan vain muuttuneet rivit sen sijaan että koko taulu luettaisiin joka ajossa. CDC lukee tyypillisesti tietokannan transaktiolokia, joten se havaitsee myös poistot — [aikaleimaan](https://www.datamalli.fi/termisto.html#aikaleima) perustuva vertailu ei havaitse. Ero näkyy heti kun lähde kasvaa: täyslataus, joka kestää tunnin, kutistuu minuuteiksi. Ks. [inkrementaalinen päivitys](https://www.datamalli.fi/termisto.html#inkrementaalinen-paivitys) ja [ETL](https://www.datamalli.fi/termisto.html#etl).

*Tägit: prosessit, etl-elt, arkkitehtuuri · Ankkuri: `#cdc`*

### Staging (välivarasto)

Suomeksi välivarasto. Latausprosessin välivaihe, johon lähdedata tuodaan sellaisenaan ennen muunnoksia. Staging erottaa noudon ja muunnoksen toisistaan: kun muunnos epäonnistuu, lähdettä ei tarvitse lukea uudelleen, ja kun logiikka muuttuu, vanha data voidaan ajaa uusilla säännöillä. [Medallion-arkkitehtuurissa](https://www.datamalli.fi/medallion.html) [pronssitaso](https://www.datamalli.fi/termisto.html#bronze) hoitaa saman tehtävän. Ks. [ETL](https://www.datamalli.fi/termisto.html#etl).

*Tägit: prosessit, etl-elt, arkkitehtuuri · Ankkuri: `#staging`*

### Backfill (takautuva lataus)

Suomeksi takautuva lataus. Historiadatan lataaminen jälkikäteen putken läpi, esimerkiksi kun uusi sarake lisätään tai vanha lataus korjataan. Backfill on riskialttein ajo koko putkessa, koska se kirjoittaa dataa, jota on jo raportoitu: jos ajo ei tuota samaa lopputulosta toistettuna, se joko kahdentaa rivit tai jättää osan päivittämättä. Aja backfill aina rajattuna aikavälinä ja tarkista rivimäärät ennen ja jälkeen. Ks. [eräajo](https://www.datamalli.fi/termisto.html#eraajo) ja [inkrementaalinen päivitys](https://www.datamalli.fi/termisto.html#inkrementaalinen-paivitys).

*Tägit: prosessit, etl-elt · Ankkuri: `#backfill`*

### Datan profilointi (Data Profiling)

Englanniksi Data Profiling, suomeksi datan profilointi. Datan systemaattinen tutkiminen ennen mallinnusta: montako uniikkia arvoa sarakkeessa on, kuinka moni rivi on tyhjä, mikä on pienin ja suurin arvo, toistuuko avain. Profilointi vastaa siihen kysymykseen, jota oletukset eivät korvaa — onko tämä sarake oikeasti uniikki. [Power Queryn](https://www.datamalli.fi/termisto.html#power-query) sarakeprofiili tekee tämän ilmaiseksi, mutta oletuksena vain tuhannesta ensimmäisestä rivistä; vaihda asetus koko aineistoon. Ks. [duplikaattiavain](https://www.datamalli.fi/termisto.html#duplikaattiavain).

*Tägit: datan-laatu, prosessit · Ankkuri: `#datan-profilointi`*

### Datan puhdistus (Data Cleansing)

Englanniksi Data Cleansing, suomeksi datan puhdistus. Virheellisten, puuttuvien ja epäyhtenäisten arvojen korjaaminen: kirjoitusasujen yhdenmukaistus, tyhjien käsittely, muotojen standardointi. Puhdistus kuuluu latausvaiheeseen eikä raportille — raportilla tehty korjaus katoaa seuraavan kehittäjän mukana ja lasketaan uudelleen joka kyselyssä. Korjaa mieluiten lähdejärjestelmässä, toiseksi mieluiten putkessa, viimeisenä mallissa. Ks. [datan laatu](https://www.datamalli.fi/termisto.html#datan-laatu) ja [ETL](https://www.datamalli.fi/termisto.html#etl).

*Tägit: datan-laatu, prosessit, etl-elt · Ankkuri: `#datan-puhdistus`*

### Deduplikointi (Deduplication)

Englanniksi Deduplication, suomeksi deduplikointi. Kaksoiskappaleiden tunnistaminen ja poistaminen. Helppo tapaus on identtinen rivi; vaikea tapaus on sama asiakas kahdella kirjoitusasulla, ja juuri se rikkoo dimensiotaulun uniikkiuden ja tuottaa [duplikaattiavaimen](https://www.datamalli.fi/termisto.html#duplikaattiavain). Deduplikointi vaatii siksi säännön siitä, mikä tekee kahdesta rivistä saman — ja sääntö on liiketoimintapäätös, ei tekninen. Ks. [luonnollinen avain](https://www.datamalli.fi/termisto.html#luonnollinen-avain).

*Tägit: datan-laatu, prosessit, avaimet · Ankkuri: `#deduplikointi`*

### Datamartti (Data Mart)

Englanniksi Data Mart, suomeksi datamartti. [Tietovaraston](https://www.datamalli.fi/termisto.html#tietovarasto) osajoukko, joka on rajattu yhden liiketoiminta-alueen tarpeisiin: myynnin martti, talouden martti. Idea on nopeus ja hallittavuus, koska käyttäjä näkee vain oman alueensa taulut. Riski on hajaannus: kun jokainen martti rakentaa oman asiakasdimensionsa, sama asiakas saa kolme eri määritelmää. [Yhdenmukaistetut dimensiot](https://www.datamalli.fi/termisto.html#yhdenmukaistettu-dimensio) erottavat marttikokoelman siilokokoelmasta.

*Tägit: arkkitehtuuri, tietomalli · Ankkuri: `#datamartti`*

### Kuutio (Cube)

Englanniksi Cube, suomeksi kuutio. [OLAP](https://www.datamalli.fi/termisto.html#olap)-mallin rakenne, jossa mittarit on esilaskettu dimensioiden leikkauspisteisiin, niin että raportti lukee valmiin arvon sen sijaan että laskisi sen kyselyhetkellä. Klassinen moniulotteinen kuutio on Power BI:n aikakaudella pitkälti korvautunut [tabular-mallilla](https://www.datamalli.fi/termisto.html#tabular-malli), joka laskee lennossa muistista — nopeus tulee nyt pakkauksesta eikä esilaskennasta. Termi elää silti puheessa ja vanhoissa [SSAS](https://www.datamalli.fi/termisto.html#ssas)-toteutuksissa.

*Tägit: olap, arkkitehtuuri · Ankkuri: `#kuutio`*

---

## 8. Molemmat hakusuunnat — "Ks. X" -tyngät (8)

Suomalaisissa tiimeissä sanotaan yhtä lailla "embedding" kuin upotus ja "join" kuin liitos.
Kummallekin muodolle on siksi oma hakusanansa: englanninkielinen on tynkä, joka ohjaa
suomenkieliseen määritelmään. Sivulla oli tämä malli ennestään (*Flattening* →
*Litistäminen*, *Tietoallas* → *Data Lake*, *Laskuri* → *Mittari*).

| Tynkä | Ohjaa termiin | Osio |
|---|---|---|
| Batch | Eräajo | B |
| Bias | Vinouma | B |
| Cube | Kuutio | C |
| Embedding | Upotus | E |
| Fine-tuning | Hienosäätö | F |
| **Join** | Liitos | **J — uusi kirjainosio** |
| Overfitting | Ylisovittaminen | O |
| Streaming | Suoratoisto | S |

Tyngän teksti on aina yksi rivi, esimerkiksi Join-termillä: *"Ks. Liitos."*

Aakkoslistaan tuli kaksi uutta kirjainta: **J** (Join) ja **U** (Upotus). Sivun
aakkosnavigaatio rakennetaan osio-otsikoista ajossa (`termisto.html`), joten uudet kirjaimet
ilmestyvät navigaatioon itsestään.

---

## 9. Määritelmäratkaisut

Neljä termiä sai tarkoituksella kaksi merkitystä, koska hakija tulee samalla sanalla eikä
tiedä kumpaa hakee:

| Termi | Ensisijainen merkitys | Toinen merkitys | Peruste |
|---|---|---|---|
| **Dimensio** | Tähtimallin näkökulmataulu | Kirjanpidon laskentakohde (kustannuspaikka, projekti) | `procountor dimensiointi` 3 näyttöä |
| **Inferenssi** | Kielimallin päättelyvaihe | Tietotyypin päättely datasta (Power Query) | Molemmat vakiintuneita data-alalla |
| **Tarkkuus** | Datan laadun ulottuvuus | Koneoppimisen accuracy | `accuracy suomeksi` + `tarkkuus englanniksi` eri aikomuksin |
| **Kuutio** | OLAP-kuution rakenne | Termin nykytila: korvautunut tabular-mallilla | Sana elää puheessa, vaikka tekniikka on väistynyt |

Muut tyyliratkaisut:

- Jokainen termi, jolla on englanninkielinen vastine, alkaa kaavalla
  **"Englanniksi X, suomeksi y."** Tämä on se rakenne, josta nykyiset sijoitukset tulevat —
  ei koristelua vaan toimiva kuvio.
- Perussanat (taulu, rivi, liitos, kysely, suodatin) kirjoitettiin **samalla syvyydellä kuin
  muutkin**, 3–5 virkettä ja jokaisessa konkreettinen pointti. Sanakirjarivi häviäisi
  kilpailun varsinaisille sanakirjasivustoille.
- Kaikki ristiviittaukset noudattavat sivun tyyliä: `Ks.`, `Vrt.`, `Ks. myös`.
- Uusia tägejä ei luotu. Kaikki 56 termiä käyttävät `termisto-search.js`:ään jo
  rekisteröityjä tägejä, joten suodatinriville ei tullut uusia nappeja.
- Yhtään linkkiä ei osoiteta `luonnos/`-kansion sivuille. Erityisesti **Data Governance**
  -termi ei linkitä keskeneräiseen `data-governance.html`:ään.

---

## 10. Tekniset muutokset

| Tiedosto | Muutos |
|---|---|
| `sivusto/termisto.html` | 56 `<dl class="termi">` -lohkoa + 56 JSON-LD `DefinedTerm` -entryä |
| | Kaksi uutta kirjainosiota: **J** ja **U** |
| | Termimäärä 157 → 213 seitsemässä paikassa: `<title>`, `description`, `og:title`, `og:description`, `og:image:alt`, JSON-LD `description`, ingressi |
| | `dateModified` ja byline 26.7.2026 → 20.8.2026 |
| | Lukemisaika 27 → 40 min (generoitu) |
| `sivusto/skriptit/search-index.js` | 48 riviä etusivun hakuindeksin termisto-entryyn (tyngät katettu päätermin rivillä) |
| `sivusto/skriptit/navigation.js` | `SIVUSTO_PAIVITETTY` 17.8. → 20.8.2026 |
| `sivusto/paivitykset.html` | Uusi 20.8.2026-merkintä |
| `sivusto/sitemap.xml` | `lastmod` 2026-08-20 (generoitu) |
| `sivusto/index.html`, `skriptit/sivut.js` | Generoitu `rakenna.py`:llä |
| `dokumentit/julkaisusuunnitelma.md` | Termimäärä + jäljellä oleva backlog |

JSON-LD:n `description` generoitiin ohjelmallisesti näkyvästä `<dd class="termi-selite">`
-tekstistä tägit riisuttuna, ei kirjoitettu käsin. Näin kuvaus ei voi ajautua eri linjoille
näkyvän tekstin kanssa. Toisessa aallossa koko `hasDefinedTerm`-lista koottiin uudelleen
HTML:n järjestyksessä; olemassa olevat 175 entryä kopioitiin merkkiä myöten ennallaan ja
tämä varmennettiin vertaamalla ennen–jälkeen.

### Matkalla korjattu

`sekasikiomalli`-entry oli JSON-LD-listassa väärässä kohdassa (`hub` → `sekasikiomalli` →
`IDENTITY`), mikä siirsi 63 sitä seuraavaa entryä eri järjestykseen kuin HTML. Virhe oli
ennestään, ei tästä muutoksesta. Lukijalle se ei näkynyt, koneelle näkyi.

### Tarkistukset

- `python3 tyokalut/rakenna.py --tarkista` — läpi, 32 tiedostoa
- JSON-LD parsii; HTML 213 termiä / JSON-LD 213 termiä; **järjestys identtinen**
- Jokaisen JSON-LD-kuvauksen ja näkyvän `<dd>`-tekstin vastaavuus varmennettu ohjelmallisesti
- Vanhat 175 entryä varmennettu muuttumattomiksi
- Sisäiset ankkurilinkit tarkistettu, ei rikkinäisiä; ei linkkejä puuttuviin sivuihin eikä luonnoksiin
- `<dl>`, `<dt>`, `<dd>`, `<div>`, `<section>`, `<h2>` tasapainossa
- Aakkosjärjestys tarkistettu osioittain; yksi virhe löytyi ja korjattiin (Staging ja
  Streaming olivat menneet SQL-näkymän ja SSAS:n väliin)

---

## 11. Avoimet asiat

**`sql`-tägi ei ole rekisteröity.** `IDENTITY`-termillä on tägi `sql`, jota ei löydy
`termisto-search.js`:n `TERMI_TAGI_NIMET`-taulusta, joten suodatinnappi näyttää raakaa
slugia. Ennestään ollut, ei tästä muutoksesta. Korjaus on joko rekisteröidä `sql` (uusi nappi
suodatinriville) tai vaihtaa termin tägi olemassa olevaan — UI-päätös, siksi jätetty auki.

**BIM-klusteri jätettiin tavoittelematta.** `bim tietomalli` (71 näyttöä),
`tietomallin tarkastusohjelma` (18), `rakennuksen tietomalli` (12) ja yhdeksän muuta
muodostavat 130 näyttöä keskisijalla 41,4. Suomen "tietomalli" on aidosti kaksimerkityksinen,
mutta hakuaikomus on väärä: nämä kävijät etsivät rakennusalan tietomallia. Aihepiirin
laimentaminen maksaisi enemmän kuin liikenne tuo. *Tietomalli*-termin selitteessä on jo
yhden lauseen täsmennys. Erillinen BIM-hakusana on harkinnassa täsmennyksenä, ei laajennuksena.

**Ei tavoitella lainkaan:** `saatavienhallinta` (55), `sisällönhallintajärjestelmä` (13),
`ansaintamallit` (11), `pintamallinnus` (9), `materiaalihallinto` (8),
`tietokantapohjainen taitto` (7), `uhkamallinnus` (5). Nämä osuvat etusivuun sattumalta.

---

## 12. Seuraavat aallot

Jäljellä `julkaisusuunnitelma.md`:n backlogissa:

- **Avaimet:** yhdistetty avain, alternate key
- **Tietomallit:** galaksimalli, big table -malli
- **Power BI:** näyttökansio, perspektiivi
- **ETL/ELT:** idempotenssi

Ennen seuraavaa aaltoa kannattaa mitata edellisen vaikutus. Seurattavia lukuja seuraavasta
GSC-otoksesta:

1. Käännöskyselyjen näyttömäärä (lähtötaso 270) ja niiden osuus kaikista (14 %)
2. `dimension suomeksi` -sijoitus (lähtötaso 11,5) ja koko dimensioklusterin näytöt (83)
3. Ilmestyvätkö **tason 1** termien omat kyselyt listalle — kysyntä oli mitattu etukäteen
4. Ilmestyvätkö **tasojen 2–4** termien kyselyt listalle lainkaan — tämä ratkaisee, kannattaako
   oletusvetoinen laajennus jatkossa

Ylläpitosäännöt ja termimäärän lähteet: `CLAUDE.md` ja `dokumentit/julkaisusuunnitelma.md`.
