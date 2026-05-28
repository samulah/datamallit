Muokkaa annettu teksti datamalli.fi-sivuston kirjoitustyylin mukaiseksi. Käyttö: /kirjoittaja-tyyli [teksti tai @tiedosto]

## Sivuston kirjoitustyyli — kuvaus

datamalli.fi on Power BI- ja tietomallinnusopas suomalaisille dataammattilaisille. Kirjoittaja on "Dataneuvos" — kokenut asiantuntija joka haluaa jakaa osaamistaan selkeästi ja rehellisesti. Tyyli on **asiantunteva mutta lähestyttävä**, ei akateeminen eikä markkinointipuhe.

## Ääni ja sävy

**Suora ja auktoritatiivinen.** Ei epäröintiä eikä pehmentelyä:
- ❌ "Tämä saattaa joskus aiheuttaa ongelmia"
- ✅ "Tämä on virhe. Korjaa ETL-prosessi."

**Asiantuntija joka selittää miksi, ei vain mitä.**
- ❌ "Käytä surrogaattiavainta."
- ✅ "Surrogaattiavain on aina kokonaisluku — kolumnaaritallennusmoottori pakkaa INT-sarakkeet tehokkaasti, GUID- ja merkkijono-avaimet turvottavat mallia ja hidastavat laskentaa."

**Opinionoitu mutta perusteltu.** "Dataneuvoksen mielipide" -osioissa voi olla rohkeampi:
- ❌ "Lumihiutalemalli on toisinaan sopimaton semanttiseen kerrokseen."
- ✅ "Hyvä tietovarastoon, huono semanttiseen kerrokseen. Litistä ennen lataamista."

## Kielisäännöt

**Suomi ensin.** Tekniset termit suomeksi, englanti vain suluissa tarpeen mukaan:
- ✅ "pääavain (PK)", "tähtimalli (Star Schema)", "Slowly Changing Dimensions (SCD)"
- ❌ "primary key", "star schema", "SCD" ilman suomenkielistä selitystä

**Ei passiivia aktiiviksi käännettyä.** Kun teksti on passiivista tai epäselvää, muuta aktiiviseksi:
- ❌ "Datan toisteisuutta voidaan vähentää normalisoinnilla."
- ✅ "Normalisointi poistaa datan toisteisuuden."

**Konkreettiset luvut aina kun mahdollista:**
- ❌ "Tähtimalli on huomattavasti pienempi kuin denormalisoitu malli."
- ✅ "Tähtimalli vie 16,80 GB, denormalisoitu malli 44,51 GB — ero on 2,65-kertainen."

**pilkku (,) selityksiin ja täydennyksiin**, ei pelkkää pilkkua:
- ❌ "Surrogaattiavain on aina järjestelmän generoima — ei koskaan lähdejärjestelmän avain."
- ✅ "Surrogaattiavain on aina järjestelmän generoima, ei koskaan lähdejärjestelmän avain."

## Rakenne  

**Tekstikappaleet:** Lyhyet ja tiiviit. Yksi ajatus per kappale. Ei turhauttavia johdantovirkkeitä.

**Listapisteet:** Aina **Lihavoitu otsikko.** Selitys joka kertoo miksi tai miten.
- ✅ "**Leveä, ei syvä.** Denormalisoi alataulut päädimensioon — loppukäyttäjä suodattaa yhdestä paikasta, ei kolmesta liittyneestä taulusta."

**Hierarkialistat:** Kun sisältö esittelee taulujen hierarkian (esim. "Ennen litistämistä — 3 taulua hierarkiassa:"), listassa tulee näkyä aina taulun oikea nimi (esim. `d_yritys`, `d_liiketoimintaryhma`, `d_kustannuspaikka`). Ei pelkkiä kuvauksia.

**Rakennepohja uudelle sisällölle:**
1. Mikä tämä on (määritelmä, 1–2 virkettä)
2. Miksi se on tärkeää (konteksti ja motivaatio)
3. Miten toimii käytännössä (rakenne, säännöt, taulukko)
4. Dataneuvoksen mielipide (rohkea, suora suositus)

## Mitä välttää

- Liiat nominaalirakenteet: "datan toisteisuuden vähentäminen" → "vähentää toisteisuutta"
- Turhat adverbit: "erittäin helposti", "varsin hyvin" → poista tai konkretisoi
- Markkinointipuhe: "tehokas ratkaisu", "paras käytäntö" → kerro konkreettisesti miksi
- Epävarmuus ilman perustetta: "saattaa", "voi", "ehkä" → jos asia on tosi, sano se suoraan
- Toistot: älä sano samaa asiaa kahdesti eri sanoilla

## Toimintaohje

1. Lue annettu teksti
2. Tunnista: mitä tyylielementtejä puuttuu? Missä on pehmentely, abstrakti tai passiivi?
3. Käy läpi **turha toisto**: etsi kohdat joissa sama asia sanotaan kahdesti — eri sanoilla, eri kappaleessa tai otsikon alla uudelleen. Raportoi löydetyt toistot ja ehdota miten ne poistettaisiin (esim. "kappale X ja kappale Y sanovat saman asian — poista Y").
4. Muokkaa teksti kohta kohdalta yllä olevien sääntöjen mukaisesti
5. Säilytä kaikki asiasisältö ja faktat — muuta vain esitystapa ja rakenne
6. Jos teksti on HTML, säilytä rakenne — muokkaa vain tekstisisältö

Raportti lopuksi: mitä muutettiin ja miksi (lyhyesti, max 5 kohtaa). Toistot listataan erikseen ennen muita huomioita.
