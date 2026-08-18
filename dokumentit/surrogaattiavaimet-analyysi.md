# INT-surrogaattiavaimet (PK/FK): hyödyt ja suorituskykyanalyysi

Laajennus sivulle [avaimet-ja-relaatiot.html](https://www.datamalli.fi/avaimet-ja-relaatiot.html).
Kokoaa surrogaattiavainten hyödyt listauksiksi ja käy läpi mitatut suorituskykyvaikutukset
moottoreittain — myös ne tilanteet, joissa ero on pieni.

---

## 1. Yhteenveto

INT-surrogaattiavainten hyöty jakautuu kahteen luokkaan: **arkkitehtuurisiin** (historia, riippumattomuus
lähteestä, integraatio) ja **suorituskykyyn** (muisti, liitokset, indeksit). Arkkitehtuuriset hyödyt ovat
ehdottomia ja pätevät aina. Suorituskykyhyöty on ehdollinen: se kasvaa kardinaliteetin, rivimäärän ja
avaimen tavukoon mukana. Pienessä mallissa ero on prosentteja, suuressa kymmeniä prosentteja tai
moninkertainen.

---

## 2. Arkkitehtuuriset hyödyt (pätevät riippumatta nopeudesta)

1. **Riippumattomuus lähdejärjestelmästä.** Kun lähde vaihtaa, kierrättää tai muotoilee tunnisteensa
   uudelleen, surrogaattiavain ei muutu — relaatiot ja historialliset raportit säilyvät ehjinä
   ([Kimball: Surrogate Keys](https://www.kimballgroup.com/1998/05/surrogate-keys/)).
2. **SCD Type 2 -historiointi on mahdollinen vain surrogaattiavaimella.** Kun asiakkaasta on useita
   versioita, luonnollinen avain toistuu — pääavaimeksi tarvitaan versiokohtainen surrogaatti
   ([Kimball: Dimension Surrogate Keys](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/dimension-surrogate-key/)).
3. **Useiden lähdejärjestelmien integrointi.** Kaksi järjestelmää voi käyttää samaa tunnistetta eri
   asiakkaista; surrogaattiavain antaa konfliktittoman avainavaruuden.
4. **Sentinel-rivit ovat mahdollisia.** Avaimet 0–2 (Ei tiedossa, Anonyymi, [Poistettu]) voidaan varata
   vain, jos avainavaruus on omassa hallinnassa.
5. **Ei "älykkäitä" avaimia.** Lähteen koodeihin upotettu merkitys (esim. maakoodi tunnisteessa) muuttuu
   ajan myötä; merkityksetön kokonaisluku ei koskaan valehtele.
6. **Yhtenäinen avainkäytäntö.** Jokainen dimensio toimii samalla tavalla → ETL, dokumentaatio ja
   uuden kehittäjän perehdytys yksinkertaistuvat.

---

## 3. Miksi INT on nopeampi — mekanismit

1. **Tavukoko.** INT on 4 tavua (riittää 2+ miljardiin riviin), BIGINT 8 tavua. GUID on 16 tavua
   binäärinä ja 36 merkkiä tekstinä; luonnollinen avain (esim. `CUS-1042`) 8+ tavua. FK-sarake toistuu
   faktan *jokaisella rivillä*, joten ero kertautuu miljardilla rivillä gigatavuiksi.
2. **Vertailuoperaation hinta.** CPU vertaa kaksi kokonaislukua yhdellä käskyllä; merkkijonovertailu on
   silmukka merkki kerrallaan (+ collation-säännöt). Liitos tekee vertailuja miljoonia kertoja.
3. **Välimuistitehokkuus.** Pienempi avain → enemmän avaimia per muistisivu ja CPU-cache-linja →
   vähemmän muistihakuja hash- ja merge-liitoksissa.
4. **Sanakirjan koko (VertiPaq).** Relaatiosarakkeet hash-enkoodataan aina, joten ratkaiseva tekijä on
   sanakirjan tavukoko, ei tietotyyppi sinänsä. Pienet peräkkäiset kokonaisluvut tuottavat pienimmän
   sanakirjan; GUID-tekstit ja isot luvut (esim. 10000000001…) paisuttavat sitä
   ([Wikström](https://www.maxwikstrom.se/performance/power-bi-data-types-in-relationships-does-it-matter/)).
5. **Indeksin fragmentaatio (rivipohjaiset kannat).** Juokseva INT lisätään aina B-puun loppuun →
   ei sivujakoja. Satunnainen GUID osuu keskelle → page splitit, fragmentaatio ja huonompi sivutiheys
   ([MSSQLTips](https://www.mssqltips.com/sqlservertip/5105/sql-server-performance-comparison-int-versus-guid/)).
6. **Faktataulun kokonaiskoko.** Kimball listaa FK-sarakkeiden tilansäästön yhdeksi surrogaattiavainten
   päähyödyistä: kapeampi faktataulu → vähemmän I/O:ta → nopeammat skannaukset.

---

## 4. Mitatut vaikutukset moottoreittain

### Power BI / VertiPaq

| Mittaus | Asetelma | Tulos |
| --- | --- | --- |
| [Wikström 2022](https://www.maxwikstrom.se/performance/power-bi-data-types-in-relationships-does-it-matter/) | 10 M riviä, INT vs. teksti vs. GUID | Kyselyajoissa **ei merkittävää eroa** (~1950 ms kaikilla); sanakirjakoko ratkaisee, isot INT-arvot tuplasivat sanakirjan |
| Sama artikkeli, kommentti (1,2 mrd rivin fakta, 4,3 M rivin dimensio) | INT vs. merkkijono relaatiossa | **~1/3 nopeammat kyselyt** INT-avaimilla suodatettaessa dimension kautta |
| [Excelerator BI](https://exceleratorbi.com.au/replace-guids-with-a-surrogate-key-for-better-performance/) | GUID → INT-surrogaatti | Pienempi mallikoko ja muistijalanjälki |
| [SQLBI: Date vs. Integer](https://www.sqlbi.com/articles/choosing-between-date-or-integer-to-represent-dates-in-power-bi-and-tabular/) | Date- vs. INT-avain | Ei todellista eroa — molemmat pieniä ja matalakardinaliteettisia |

**Johtopäätös VertiPaqista:** hyöty ei tule tietotyypistä vaan sanakirjan ja kardinaliteetin koosta.
Pienissä malleissa (< ~1 M rivin dimensiot) ero on prosentteja. Isoissa dimensioissa (miljoonia rivejä)
INT-avain on mitatusti n. kolmanneksen nopeampi. Microsoftin Best Practice Analyzer suosittaa silti
INT-relaatioavaimia kaikissa malleissa — pieni sanakirja on aina halvin.

### SQL Server (rivipohjainen)

[MSSQLTipsin benchmark](https://www.mssqltips.com/sqlservertip/5105/sql-server-performance-comparison-int-versus-guid/)
ja [fragmentaatioanalyysi](https://www.mssqltips.com/sqlservertip/6595/sql-server-guid-column-and-index-fragmentation/):

- Tallennustila: INT-avaimella ~3 144 KB vs. satunnaisella GUIDilla (NEWID) ~6 408 KB — **yli 2×**.
- Fragmentaatio: INT ~0,3 %, satunnainen GUID vakavasti fragmentoitunut; NEWSEQUENTIALID ~0,6 %.
- Indeksien uudelleenrakennuksen jälkeen erot kaventuvat lähes olemattomiin — mutta se edellyttää
  jatkuvaa ylläpitotyötä, jota INT ei tarvitse.
- Jos GUID on pakko säilyttää, ~10 %:n overhead on saavutettavissa pitämällä klusteroitu indeksi
  INT-sarakkeessa.

### Snowflake (pilvivarasto, MPP)

[Snowflaken suorituskykyarkkitehdin mittaus](https://medium.com/snowflake/data-type-considerations-for-join-keys-in-snowflake-304d515d2b91):
VARCHAR-liitosavain oli kaikissa testikyselyissä **lähes 2–3× hitaampi** kuin kokonaisluku. Sama
kolumnaarinen logiikka kuin VertiPaqissa: kapeampi avain → vähemmän tavuja liikuteltavana ja
vertailtavana.

### PostgreSQL

[Aikasarjatutkimus 2025 (arXiv)](https://arxiv.org/abs/2511.14502): kokonaislukupohjainen avain nopeutti
lisäyksiä **35–50 %** ja kyselyitä **25–40 %** TIMESTAMP-tyyppiin verrattuna.

---

## 5. Rehellinen nuanssi — milloin ero EI näy

Kattava analyysi vaatii myös vastapuolen:

1. **Pienet mallit:** Wikströmin 10 M rivin testissä tietotyyppien välillä ei ollut mitattavaa
   kyselyaikaeroa. VertiPaq hash-enkoodaa relaatiosarakkeet joka tapauksessa.
2. **Iso INT voi olla huonompi kuin lyhyt teksti:** arvot 10000000001… tuottivat ~2× sanakirjan
   verrattuna arvoihin 1, 2, 3… Juokseva numerointi ykkösestä on osa suositusta, ei pelkkä INT-tyyppi.
3. **SQL Serverissä ylläpidetty NEWSEQUENTIALID** pärjää lähes INT:n veroisesti fragmentaation osalta —
   GUIDin päähaitta on koko (16 t vs. 4 t), ei aina nopeus.
4. **Surrogaattien generointi maksaa ETL:ssä:** avainten lookup/korvaus lisää latausvaiheen työtä.
   Kimballin vastaus: kustannus maksetaan kerran latauksessa, hyöty saadaan jokaisessa kyselyssä.
5. **Kyselyaika ≠ ainoa mittari:** muistijalanjälki (kapasiteettirajat, Premium/Fabric-hinnoittelu) ja
   päivitysajat paranevat INT-avaimilla silloinkin, kun kyselyaika ei muutu.

---

## 6. Suosituslistaus tähtimalliin

1. Dimension PK = juokseva INT-surrogaatti alkaen 1:stä (sentinelit 0–2 varattuina).
2. 4 tavun INT riittää lähes aina (2,1 mrd arvoa); BIGINT vain jos oikeasti tarpeen.
3. Faktan FK:t aina INT — ei koskaan GUID tai teksti relaatiossa.
4. Luonnollinen avain (NK) säilyy dimensiossa omana sarakkeenaan jäljitettävyyttä varten, ei relaatioissa.
5. Ei faktatauluun omaa PK-saraketta Power BI -malliin ilman perusteltua syytä — korkean kardinaliteetin
   sarake on mallin kallein ([Data-Marc](https://data-marc.com/2023/05/17/the-hidden-impact-of-keys-in-your-power-bi-data-model/)).
6. Päivämääräavain INT-muodossa YYYYMMDD tai Date-tyyppinä — suorituskykyero on olematon (SQLBI),
   valitse käytäntö ja pysy siinä.
7. Mittaa itse DAX Studiolla + VertiPaq Analyzerilla ennen ja jälkeen — hyöty riippuu dimensioiden
   kardinaliteetista.

---

## Lähteet

- [Kimball Group: Surrogate Keys](https://www.kimballgroup.com/1998/05/surrogate-keys/)
- [Kimball Group: Dimension Surrogate Keys](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/dimension-surrogate-key/)
- [Kimball Group: Fact Table Surrogate Key](https://www.kimballgroup.com/2006/07/design-tip-81-fact-table-surrogate-key/)
- [Max Wikström: Power BI data types in relationships](https://www.maxwikstrom.se/performance/power-bi-data-types-in-relationships-does-it-matter/)
- [SQLBI: Choosing between Date or Integer](https://www.sqlbi.com/articles/choosing-between-date-or-integer-to-represent-dates-in-power-bi-and-tabular/)
- [SQLBI: Costs of Relationships in DAX](https://www.sqlbi.com/articles/costs-of-relationships-in-dax/)
- [Data-Marc: The Hidden Impact of Keys in Your Power BI Data Model](https://data-marc.com/2023/05/17/the-hidden-impact-of-keys-in-your-power-bi-data-model/)
- [Excelerator BI: Replace GUIDs with a Surrogate Key](https://exceleratorbi.com.au/replace-guids-with-a-surrogate-key-for-better-performance/)
- [MSSQLTips: SQL Server Performance Comparison INT versus GUID](https://www.mssqltips.com/sqlservertip/5105/sql-server-performance-comparison-int-versus-guid/)
- [MSSQLTips: GUID Column and Index Fragmentation](https://www.mssqltips.com/sqlservertip/6595/sql-server-guid-column-and-index-fragmentation/)
- [Snowflake: Data Type Considerations for Join Keys](https://medium.com/snowflake/data-type-considerations-for-join-keys-in-snowflake-304d515d2b91)
- [arXiv: aikasarjatutkimus PostgreSQL-avaintyypeistä (2025)](https://arxiv.org/abs/2511.14502)
