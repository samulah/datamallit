// Esirakennettu hakuindeksi — päivitä kun sivujen sisältö muuttuu
window.HAKU_INDEKSI = {

'tahtimalli.html': `tähtimalli star schema tietomalli faktatauluun ympärille dimensiotaulut
rakenne toiminta normalisoitu relaatiotietokanta faktataulussa transaktiotason tapahtumat
myyntitapahtumat dimensiotauluissa asiakas tuote aikataulu
pää- ja vierasavaimet pk fk primary key foreign key
pääavain yksilöi jokaisen rivin ei duplikaatteja ei tyhjiä arvoja asiakastunnus dimensiossa
vierasavain viittaa dimensiotaulun pääavaimeen luo yhteyden taulujen välille
yhteys kulkee aina samaan suuntaan faktataulu fk dimensiotaulu pk
moni-moneen-suhde rikkoo tähtimallin virheellisiä laskutuloksia
vahvuudet normalisointi data sijaitsee vain yhdessä paikassa yksiselitteinen
estää datan toistumisen vähentää teknistä velkaa helpottaa laskurien measures tekemistä
helppo ymmärtää ja hallita nopea suorituskyky pienempi muistin kulutus
taloudelliset hyödyt suorituskyky muistikoko 16,80 gb 44,51 gb 2,65 kertaa suurempi
azure analysis services 1 323 € 2 647 € 15 888 € vuosisäästöt
tähtimalli normalisoitu denormalisoitu yksittäinen taulu
dax patterns pyri aina rakentamaan tähtimalli
tekoälyvalmis ai-pohjainen analytiikka
avaintyypit muistikokovertailu koko nopeus arvio tähtinä`,

'tahtimalli-esimerkit.html': `tähtimalli lumihiutalemalli viisi esimerkkiä yksiselitteinen moniselitteinen
star schema snowflake schema power bi dax tietomallinnus huonoimmasta parhaaseen
sama myyntiaineisto neljä eri tapaa duplikaattiavaimet relaatioketju join filtteri
pääavain pk uniikki yksi-moneen-suhde dax yksikäsitteinen
moni-moneen-relaatio kaksoislaskenta vääriä summia matriisiraportti
countrows distinctcount pk-uniikkius tarkistus duplikaatit etl-vaiheessa
tuote-hierarkia kolme taulua tuoteperhe tuotekategoria relaatioaskel filterin suunta aktiivisuus
litistetty leveä dimensio toistuvat arvot vertipaq pakkaus filterin polku calculate
sekasikiömalli jeesmies malli orgaanisesti kasvanut kaksi faktaa kaksi asiakastaulua kaksi päivämäärätaulua
fakta-fakta-yhteys vanha taulu kopio vertailu tiivistettynä
samat kysymykset samat tulokset samat arvot loppukäyttäjä nopein paras analytiikka self-service ai-valmius
litistetty lumihiutalemalli on rakenteeltaan tähtimalli helppo rakentaa faktataulu keskellä dimensiot ympärillä`,

'dimensiot.html': `dimensioiden mallinnus dimensio tähtimallin kuvaileva taulu
kuka mitä missä milloin miten faktataulussa luvut dimensiossa konteksti
vierasavain fk yksi-moneen-suhde perusrakenne
dimension rakenne leveä litteä kuvailevia sarakkeita ei alatauluja
suodattaa maan segmentin toimialan mukaan
surrogaattiavain sk pääavain pk aina kokonaisluku järjestelmän generoima ei lähdejärjestelmän avain
mahdollistaa historian säilyttämisen asiakasavain int
luonnollinen avain nk business key lähdejärjestelmän tunniste hakua debug-työtä varten ei relaatioihin
asiakastunnus varchar
attribuutit kuvailevat sarakkeet suodatetaan ryhmitellään leikataan
matala kardinaliteetti nopea suorituskyky maa kaupunki segmentti toimiala
voimassaoloaika scd type 2 alkupvm loppupvm onkonykyinen bit
parhaat käytännöt kultaiset säännöt
ei tyhjiä rivejä faktataulun fk vastaavaa dimensioriviä blank-rivi etl-virhe tuntematon-rivi
blankeille tuntemattomille omat rivit tuntematon asiakas ei kohdistettavissa uusi asiakas ei rekisteröity
surrogaattiavain aina kokonaisluku vertipaq pakkaa int-sarakkeet guid merkkijono-avaimet turvottavat
yksi rivi per yksilö nykyinen tila duplikaattiavaimet rikkovat relaation vääristävät laskurit
leveä ei syvä denormalisoi alataulut päivämääradimensio poikkeus
attribuuttien kardinaliteetti matalaksi timestamp sekunti-tarkkuus tuhoaa vertipaq-pakkauksen
int-tyyppiset relaatiot nopeampia string varchar relaatiot 1/3 hitaampia yli miljoonan rivin
slowly changing dimensions scd muutostyypit
type 0 kiinteä arvo ei muutu koskaan syntymäpäivä rekisteröintipäivä
type 1 ylikirjoita vanha arvo korvataan uudella historia katoaa kirjoitusvirhe osoite
type 2 lisää uusi rivi uusi surrogaattiavain vanha rivi suljetaan loppupvm historialliset rivit täydellinen historia
asiakkaan siirtyminen segmenttiin myyjän tiimivaihdos liiketoiminnallinen merkitys
type 3 lisää sarake edellinen arvo yksi historiavaihe nykyinen vs edellinen
type 4 historiataulu nykyarvot päädimenisossa muutoshistoria erilliseen tauluun suuri dimensio
type 6 hybridi 1+2+3 uusi rivi nykyarvo päivitetään edellinen arvo sarakkeessa
matti meikäläinen cu-001 pienasiakas avainasiakas 2024-03-15 alkupvm loppupvm onkonykyinen
koko kardinaliteetti suorituskyky power bi
vertipaq-moottori pakkaa sarakkeet uniikkeja arvoja pakkaussuhde nopeampi kysely
pieni alle 1000 maa alue tuotekategoria myyntikanava minimaali erinomainen pakkaus
pieni–keski 1000 100000 tuotedimensio laaja katalogi kustannuspaikat matala
keski 100000 1000000 asiakasdimensio keskisuuri yritys kohtalainen
suuri 1000000 10000000 asiakasdimensio suuri yritys kuluttajapalvelu merkittävä
erittäin suuri yli 10000000 verkkosivuston käyttäjät iot-laitteet korkea arkkitehtuurivalinta
power bi:n rajat datasettikoko jaettu kapasiteetti pro-lisenssi 1 gb per pbix tiukka raja
premium per user ppu 100 gb
premium p1 p2 p3 25 50 100 gb suuren organisaation raja
uniikkeja arvoja per sarake 1999 miljardia
relaation kardinaliteettirajoitus pk-sarakkeen tulee olla uniikki duplikaatit moni-moneen
korkean kardinaliteetin sarakkeiden vaikutus guid tekstisarake 5-10-kertaisesti
kardinaliteetin vaikutus pakkaussuhteeseen asiakasdimensio 2000000 riviä
asiakasavain sk 2000000 int 8 mb pakkautuu erinomaisesti
segmentti 5 varchar alle 1 mb lähes ilmainen
maa 40 varchar alle 1 mb lähes ilmainen
sähköposti korkea kardinaliteetti 2000000 varchar 200-400 mb ei pakkaudu jokainen arvo erikseen
rekisteröintiaika timestamp 1800000 datetime 150-300 mb pakkaus epäonnistuu
ratkaisu poista korkean kardinaliteetin sarakkeet sähköposti puhelin timestamp date-tyypiksi`,

'nimeamiskaytannot.html': `nimeämiskäytännöt tietomallin taulujen sarakkeiden nimeäminen
tietomalliin haettaessa dataa tietolähteestä tietokannan taulut nimeämiskäytännöt
d_dimensio f_fakta v_nakyma ddimensio ffakta vnakyma dim_dimensio fact_fakta view_nakyma
ferrari russo 7 seitsemän sääntöä power bi tietomalli
taulujen nimien sisältää vain liiketoiminnan sisällön mukaista dataa
asiakas taulu sisältää vain asiakkaita tuote vain tuotteita
isoilla kirjaimilla erottamaan erilliset sanat tuotekategoria
faktojen nimien liiketoiminnan nimen faktalle aina monikko
myynti ostot monikko relaatioiden ymmärtäminen useampi myyntitapahtuma
vältä nimiä jotka liian pitkiä tavaroidenlähetysmaakunjalleenmyyjämiytavaran epäselviä
vältä nimiä liian lyhyitä lyhenteitä epäselvyyttä koko organisaatiotasolla
avainkentän nimessä maininta avaimesta asiakasavain customerkey
mieti ymmärtävätkö kaikki valitsemasi nimen nykyiset tulevat käyttäjät
hyvät nimeämiskäytännöt jakaa kaikenlaisille käyttäjille ymmärtäminen helpottuu
virheellisiä rivejä pienemmällä vaivalla
tietokantatasolla taulut monistaminen tuotteistaminen
nimeä yhdellä kielellä yhteen paikkaan koko ketjussa sama kieli esityskerros
suomenkielinen yritys äidinkielen käyttö helpottaa ymmärtämistä luovia mahdollisuuksia
int-tyyppiset relaatiot nopeampia string varchar 1/3 hitaampia yli miljoonan rivin`,

'lumihiutalemalli.html': `lumihiutalemalli snowflake schema tähtimallia muistuttava tietomalli
normalisointi samanlaiset rakenne erilainen
dimensioiden kuvaava tieto useammassa eri taulussa syvemmälle dataan
suuressa organisaatiossa yritys liiketoimintaryhmä kustannuspaikka myymälä
vaikeuttaa datan lukemista
ferrari russo 2017 s.223 business intelligence yleisimmin käytetyistä tietomallityypeistä
ei huonoja ratkaisuja suorituskyky heikkenee lievästi välttämätön
ei suositella ellei välttämätöntä yksinkertaisempi tietomalli dax koodaaminen helpompaa
ohjaavan tiedon yhteen dimensiotauluun power bi ssas-mallinnus
kehittäminen nopeampaa helpommin luettavaa
hyödyt rajoitteet tietovarasto dwh hyvä power bi huono
flättäys flattening hierarkkiset dimensiotaulut yhdeksi leveäksi tauluksi
vertipaq ei hyödy normalisoinnista relaatioketjut hidastavat`,

'litistaminen.html': `flättäys flattening taulujen yhdistäminen hierarkia leveä litteä taulu
kolme taulua hierarkiassa vedetään yhdeksi dimensioksi
lumihiutalemalli tähtimalli muunnos power bi
esimerkki organisaatiohierarkia yritys liiketoimintaryhmä kustannuspaikka myymälä
sql view näkymä etl-vaihe power query
vertipaq pakkaa toistuvat arvot tehokkaasti litteä taulu
flättäys tehdään lähellä lähdejärjestelmää sql etl ei power bi sisällä
leveä taulu toistuvilla arvoilla on tarkoitus ei ongelma`,

'faktataulu.html': `faktataulu tähtimallin laskennallinen ydin rivi mitattava tapahtuma
luvut faktataulussa dimensiossa konteksti vierasavain fk kokonaisluku yksi-moneen-relaatio
pitkä kapea miljoonia rivejä vähän sarakkeita vertipaq pakkaus
additiivinen semi-additiivinen ei-additiivinen mittari myyntisumma kappalemäärä varastosaldo kateprosentti
degeneraatioavain dd degenerate dimension tilausnumero laskunumero kuittinumero
granulariteetti päätettävä ensin pelkkiä lukuja ei tekstiä varchar guid blank-rivi tuntematon-rivi
ei laskettuja sarakkeita dax-mittari suodatinkonteksti
kolme arkkityyppiä transaktio transaction grain kausi periodic snapshot kumulatiivinen accumulating snapshot
tilannekuva kuukausivarastosaldo tilauksen elinkaari prosessi sama rivi päivitetään
kardinaliteetti rle sanakirjapakkaus sarakepohjainen distinctcount ram suorituskyky kimball russo ferrari`,

'header-detail.html': `header detail taulu otsikko rivitaulu
ostotilaukset ostorivit tilaajan tiedot tilauksen numero kokonaisalennusprosentti
tuotetason tieto tilausmäärät yksikköhinnat
kahden taulun yhteys ei toimi muistipohjaisissa relaatiotietokannoissa
ostotilaus dimensiotaulu ostorivi faktataulu ohjaavaa tietoa
lumihiutalemallin mukainen negatiivisesti käyttömahdollisuuksiin
data yhdistää yhdeksi tauluksi näkymäksi etl-vaiheessa
kauppa asiakas valuutta tilauspäivämäärä alennusprosentti kokonaisalennus ostorivitauluun
tilannekohtainen denormalisointi helpomman luettavuuden ymmärtämisen
vertipaq sanakirjastoenkoodauksen rle-pakkauksen todistettua yhdistää yhdeksi tauluksi
litistäminen taulujen yhdistäminen tilausnumeron kautta`,

'useampi-fakta.html': `useamman faktataulun käyttö useampi fakta
tähtimalliin pyrkiminen liiketoimintakysymyksiin
raportti analysoida osto- ja myyntidataa eri tauluissa
yhteydet molempiin faktatauluihin dimensioiden avulla
myynti- ja ostotaulu tuotekategoriaan dimensioon suodattaminen
tuotteen nimi valmistusmaa osto- ja myyntitietoja visualisoinneissa
erilliset laskurit eri tauluissa
vahvasti denormalisoituja avainkenttejä dimensiotauluja normalisoida näkymät
samankaltaiset dimensiotietojen yhdistämiset avainkenttiin
kalenterin tuotetietojen suodattaminen yhden suunnan relaatiot
laskuri ostot niille tuotteille joita on myyty dax-kieli suodattaminen visualisointeja
dimensioiden suodattimien käyttö denormalisointi avainkenttien kuvaavan tiedon vienti
kompleksista relaatioiden hallintaa moniselitteisiä tietomalleja eri lukuja
dax-moottori vaikea käsitellä taulujen monistamisella denormalisoinnilla`,

'kirjallisuus-suositukset.html': `suositeltu kirjallisuus kirjat alan parhaat käytännöt
analyzing data with microsoft power bi and power pivot for excel
alberto ferrari marco russo 2017
tähtimallin käyttö dax-kielen perusteet suositellut nimeämiskäytännöt power bi tehokas hyödyntäminen
vertipaq-moottorin peruslogiikka arkkitehtuuri tähtimalli lomitusmalli
the definitive guide to dax marco russo alberto ferrari 2019
dax-kieli data analysis expressions vertipaq-moottorin toiminta
pakkaa enkoodaa dataa sarakkeiden kardinaliteetin vähentäminen suorituskyky
evaluointijärjestys konteksti filter context row context
dax patterns second edition marco russo alberto ferrari 2021
valmiita kaavoja tähtimallin sapluuna time intelligence vuosittaiset vertailut abc-analyysit
hakuteos kaavat testattu valmis kopioitavaksi
star schema the complete reference christopher adamson 2010
dimensionaalinen tietovarastosuunnittelu perusteet edistyneet tekniikat
yritystason tietovarastoarkkitehtuurit bi etl-järjestelmien optimointistrategiat
tähtimallista oppii kaiken suunnittelupäätökset selkeitä ferrari russo power bi lyömätön
the data model resource book revised edition len silverston 2001
library of universal data models enterprises henkilöt organisaatiot tuotteet tilaukset taloushallinto
testattuja uudelleenkäytettäviä tietomalliratkaisuja tietokantasuunnittelijat viitekirja
business bullshit andré spicer 2018
organisaatioissa puhuminen ilman sanomista johdon sanahelinä synergiat agiliteetti disruption
hypepuhe tekoälypohjainen reaaliaikainen oikean ajattelun haitta päätöksenteko
rebel ideas the power of diverse thinking matthew syed 2019
kognitiivisesti monimuotoiset ryhmät monimutkaisia ongelmia homogeeniset asiantuntijaryhmät
erilaiset näkökulmat taustat parempia päätöksiä sokeat pisteet rekrytointi`,

'apuohjelmat.html': `power bi apuohjelmat ilmainen maksullinen laajentavat ominaisuuksia
dax studio darren gosbelli avoimen lähdekoodin power bi desktop ssas tabular azure analysis services power pivot
dax-kyselyt objektiselain daxformatter suorituskykyanalyysi erottimien vaihto us eu automaattinen tunnistus
pakollinen työkalu perusteltua syytä jättää käyttämättä vaikea löytää
vertipaq analyzer dax studio versio 2.11.0 advanced view metrics
tietomallin koko puolittui 2,56 mb 1,15 mb optimointi käyttämättömät taulut
a6 a5 kapasiteetti power bi embedded 114000 euroa vuosisäästö
cardinality kardinaliteetti table size col size data dictionary rel size prosentti db
tabular editor 2 tom tabular object model erämäinen muokkaus offline-muokkaus
best practice analyzer bpa parhaiden käytäntöjen analysointi automaattiset korjausehdotukset
dag-riippuvuudet c#-skriptaus versiohallintatuki git perspektiivit laskentaryhmät ols
109 ongelmaa 53 korjattu 30 minuuttia
te2 te3 vertailu ilmainen mit-lisenssi maksullinen tilauspohjainen
alm toolkit christian wade application lifecycle management
pbix-julkaisu korvaa koko tietojoukon katkaisee raportit tietomallitasolla
malliversioiden vertailu valikoiva käyttöönotto jaettu tietomalli premium git bism normalizer
aliarvostettu työkalu pakollinen premium-ympäristöissä
power bi mcp model context protocol tekoäly ai anthropic claude fabric
tekoälyassistentti lukee tietomallin rakenteen strukturoitu protokolla
dax-kyselyt mittareiden luominen dokumentointi laadun tarkistaminen
copilot vs mcp avoin protokolla suljettu ympäristö claude gpt laajennettavuus
asennus windows vs code github copilot claude desktop npx node.js konfiguraatio mcp-palvelin
tietoturvahuomio mitä dataa välittyy tekoälylle tietomallin rakenne dax-kaavat kyselyiden tulokset
paikallinen pilvipalvelu anthropic eu data boundary ollama luottamuksellinen data`,

'data-contract.html': `data contract sopimus datan tuottajan kuluttajan välillä
määrittelee mitä dataa toimitetaan missä muodossa millä laadulla kenen vastuulla
omistajuus data owner data steward data custodian dpo tietosuojavastaava vastuut roolit
uutissivu lukijadata verkkoseuranta selaajat käyttäjät
skeema sarakkeet tietotyypit pakollinen suostumus_tila lukija_id istunto_id kayttaja_id artikkeli_id
lukuaika vierityssyvyys laitetyyppi maa_koodi tilaaja_tyyppi viittaaja botti
skeemanmuutos rikkova muutos ei-rikkova muutos ilmoitusaika versiointi
henkilötieto gdpr tietosuoja suostumus anonymisointi pseudonymisointi rekisteröidyn oikeudet poistopyyntö
laatusäännöt null-arvot botisuodatus sisäinen liikenne täydellisyys
sla vasteaika ratkaisuaika kriittinen p1 p2 p3 ongelmailmoitus postmortem tietosuojarikkomus 72h
käyttökäytännöt pääsykäytännöt rls row-level security toimittaja toimituspäällikkö analyytikko markkinointi tuotekehitys
sallitut kiellettyt käyttötarkoitukset tarkastusloki pääsynhallinta`,

'data-governance.html': `data governance organisaation datan hallinta päätökset vastuut prosessit standardit
luotettavaa saatavilla laillisesti tarkoituksenmukaisesti organisatorinen kulttuurinen muutos
kuka omistaa datan kuka saa käyttää laatu varmistetaan elinkaari
datan omistajuus laadun valvonta metadatan ylläpito pääsynhallinta tietosuoja lakisäädökset
hallintamallia kukaan ei tiedä mistä data tulee kuka vastaa onko luotettavaa
data owner datan omistaja liiketoimintavastuu sisällöstä laadusta myyntijohtaja myyntidatasta
data steward datan hoitaja päivittäinen laadun valvonta dokumentointi controller asiakasrekisteri
data custodian datan säilyttäjä tekninen vastuu tallennus varmuuskopiointi tietoturva it-arkkitehti
data consumer datan käyttäjä raporteissa päätöksenteossa analyytikko liiketoimintapäällikkö
datan laatu täydellinen tarkka ajantasainen johdonmukainen käyttökelpoinen
aloita pienestä dokumentoi asiakkaat tuotteet myynti omistajat laatukriteerit`,

'arkkitehtuurivalinta.html': `arkkitehtuurivalinta milloin käyttää mitäkin mallia vertailu
tähtimalli lumihiutalemalli data vault data mesh etl elt
soveltuvuus käyttötilanteet tekniset ominaisuudet monimutkaisuus
kyselysuorituskyky auditointikyky skaalautuvuus oppimiskynnys
power bi bi-raportointi tietovarasto dwh historianseuranta
monta lähdejärjestelmää raakadatan säilytys pieni tiimi suuri enterprise
scd slowly changing dimensions hub link satellite
extract transform load extract load transform pipeline siirtotapa
dbt data build tool pilvi bigquery snowflake databricks fabric microsoft
raportointikerros analytiikkakerros staging välikerros
information mart federoitu governance dataprodukt domain
vertailutaulukko arkkitehtuurin valinta hyödyt rajoitteet`,

'etl-elt.html': `etl elt perinteinen tietovarasto pilvipohjaiset ratkaisut
extract transform load extract load transform`,

'medallion.html': `medallion-arkkitehtuuri bronze silver gold data lake
raakadata puhdistettu yhdistetty analyysiin valmis jalostusprosessi`,

'data-vault.html': `data vault skaalautuva auditoitava tietomallinnusmenetelmä suurten muuttuvien tietovarastojen hallinta
dan linstedt tiimi 1990-luvulla lockheed martin yritystason tietovarastot lähdejärjestelmien muutokset historia jäljitettävyys
datavaultalliance faq about data vault 2.0 lähde
perinteiset tietovarastomallit ylläpito lähteitä paljon liiketoiminnan rakenteet muuttuvat nopeasti
alkuperäinen data vault data vault 1.0 data vault 2.0 mallinnusmenetelmä arkkitehtuuri kehitysmenetelmä automaatio nykyaikaiset data-alustat
datavaultalliance data vault 2.0 introduction lähde
data vault 2.0 rakenne hub linkki satelliitti hubit linkit satelliitit liiketoiminta-avain tekninen avain latausaika lähdejärjestelmä
scalefree data vault glossary effectivity satellite lähde
hub kuvaa liiketoiminnan ydinkohdetta asiakas tilaus tuote työntekijä
satelliitti kuvailevat tiedot attribuutit historia asiakkaan nimi kaupunki asiakasryhmä muutokset uusi rivi ei ylikirjoiteta
linkki hubien välinen suhde asiakas tilaus monesta moneen
tavallinen linkki tapahtumalinkki status-linkki tilauksen status avoin toimitettu peruttu voimassaolo muutoshistoria linkin satelliitti
luokkakaavio data vault entiteetit asiakas tilaus status hub link satellite
raw vault business vault pit-taulut bridge-taulut latausautomaatio`,

'ai-valmis-metadata.html': `ai-valmis metadata tekoäly copilot power bi tietovarasto metadata
kuvailu nimeäminen taulut sarakkeet mittarit liiketoimintakuvaus
tietomalli semanttinen kerros synonyymit kategoriat kuvaustekstit
copilot q&a tulkitsevat kyselyjä puutteellinen metadata ai ei ymmärrä
tekninen metadata liiketoimintametadata datakatalog
hyvä kuvaus huono kuvaus luonnollinen kieli konteksti
mitä sarake tarkoittaa yksikkö laskentalogiikka arvojoukko
päivämäärä aikavyöhyke utc lippu tilakoodi koodiarvot selitys
surrogaattiavain viittaa tauluun omistaja päivitysaikataulu
q&a synonyymit myynti liikevaihto revenue ohjaa samaan mittaan
tietoluokka data category maa kaupunki postinumero url kuva-url tärkeys tähdet
yhteenveto-asetus oletusyhteenveto hakemistotaulu featured table excel tietotyypit
sertifiointi virallinen luotettava power bi palvelu
muistilista tarkistuslista jokaisella taululla kuvaus mittarisarake yksikkö
koodiarvot aikavyöhyke synonyymit sertifioitu datan omistaja päivitysaikataulu
investointi maksaa takaisin tunti kuvauksia säästää selvittelyä raportteja`,

'termisto.html': `termistö sanasto data-alan termit suomeksi tekoälytermit datan mallinnus tietovarastointi bi-kehittäminen käsitteet
aggregaatti aggregate yhteenlaskettu koostettu arvo summa kuukausi tuoteryhmä
attribuutti attribute dimensiotaulun kuvaileva sarake maa kategoria tiimi suodattaminen ryhmittely
bpa best practice analyzer tabular editor tarkistaa parhaat käytännöt korjausehdotukset
bronze medallion-arkkitehtuuri alin taso raakadata lähdejärjestelmä muokkauksia laadunvarmistusta
copilot power bi tekoälyavustaja luonnollinen kieli semanttinen malli metadata
dax data analysis expressions lausekekieli mittarit laskennalliset sarakkeet power bi ssas tabular
datakatalog data catalog organisaation tietoaineistot omistajuus käyttötarkoitukset datakirjasto
data contract datasopimus sopimus tuottaja kuluttaja muoto laatu vastuu nimeämiskäytännöt
data lake tietoallas suuri datavarasto raakadata skeema käyttötarkoitus
data lineage mistä data peräisin muunnettu järjestelmät virheenjäljitys vaikutusarvio
data owner omistaja liiketoiminta vastuu oikeellisuus myyntijohtaja
data steward hoitaja päivittäinen laatu dokumentointi välissä
data vault hub link satellite auditointi historia suuri muuttuva ympäristö
denormalisointi denormalization toistaa tietoa luettavuus suorituskyky dimensiot
dimensiotaulu dimension table kuvaileva kuka mitä missä milloin attribuutit
ehdokasavain candidate key pääavain vaihtoehto
elt extract load transform pilvi kohdejärjestelmä
etl extract transform load perinteinen tietovarasto muunnos ennen latausta
faktataulu fact table mitattavat tapahtumat myynnit tilaukset laskutukset
flattening litistäminen katso litistäminen
filter context suodatinkonteksti dax raportin valinnat suodattimet rivit laskenta
gdpr tietosuoja-asetus henkilötiedot organisaatiot
gold medallion-arkkitehtuuri ylin taso liiketoimintavalmis tähtimalli aggregoitu
granulariteetti granularity rivin yksityiskohtaisuus myyntitapahtuma päivä tuote kysymykset
header-detail-malli tilaus otsikkotiedot rivitiedot yhdistää
hierarkia hierarchy tasorakenne vuosi kvartaali kuukausi yritys liiketoimintaryhmä kustannuspaikka
hub data vault liiketoimintatunniste asiakasnumero tuotekoodi tunniste satellite
sekasikiömalli jeesmies malli tietomalli pyyntö sellaisenaan duplikaattitaulut vanhat versiot ei omistajaa
kardinaliteetti cardinality uniikkeja arvoja matala korkea vertipaq pakkaus suorituskyky
kpi key performance indicator avainmittari liikevaihto asiakaspysyvyys konversio tavoite
laskennallinen sarake calculated column dax rivitaso muisti tallennetaan
laskuri katso mittari
litistäminen flattening hierarkkiset dimensiotaulut leveä litteä taulu etl sql-näkymä
lakehouse databricks delta lake microsoft fabric data lake tietovarasto rakenne
link data vault kahden hubin välinen suhde asiakas tilaus
lumihiutalemalli snowflake schema normalisoitu useampaan tauluun vertipaq hidastuu
luonnollinen avain natural key business key lähdejärjestelmä tunniste hakua varten
m-kieli power query funktionaalinen kieli muunnos yhdistäminen
master data asiakkaat tuotteet toimittajat keskeinen ohjaava laatu yhtenäisyys
medallion-arkkitehtuuri bronze silver gold jalostaminen kerroksittain
metadata tieto datasta tekninen liiketoiminta sarakkeiden tietotyypit merkitys
mittari measure dax laskenta konteksti summat keskiarvot
monen-moneen-suhde many-to-many suosittelemme välttämään arvaamaton dax suorituskyky välitaulu bridge table
normalisointi normalization kukin tieto vain yhdessä paikassa toisteisuus tietoeheys
null tyhjä arvo ei tietoa ei nolla ei tyhjä merkkijono tuntematon dax yllättävä
olap online analytical processing analyyttinen yhteenvedot laskelmat power bi ssas tabular
oltp online transaction processing tapahtumankäsittely kassajärjestelmä
pääavain primary key pk yksilöi rivin uniikki ei tyhjiä
power query m-kieli haku muunnos yhdistäminen
q&a power bi luonnollinen kieli kyselytoiminto visualisointi synonyymit metadata
relaatio relationship yhteys avainkenttä yksi-moneen dimensio faktataulu
rls row-level security rivitason tietoturva dax suodatin
row context rivikonteksti dax laskennallinen sarake iteraatio sumx rivitaso
sarake column pystysuora kenttä vertipaq pakkaa saraketasolla
satellite data vault kuvaileva tieto attribuutit historia hub link muutokset
scd slowly changing dimension muutostenkäsittely type 1 2 3
scd type 1 ylikirjoittaa vanhan arvon historia katoaa kirjoitusvirhe korjaus
scd type 2 uusi rivi surrogaattiavain voimassaoloaika historia säilyy yleisin
scd type 3 edellinen arvo erilliseen sarakkeeseen yksi historiavaihe harvinainen
semanttinen malli semantic model power bi ssas tabular tietomalli mittarit hierarkiat metadata
sentinel-rivi sentinel row dimensio puuttuva tuntematon poistettu ei tiedossa anonyymi surrogaattiavain tyhjä rivi blank null orporivi gdpr
sertifiointi certification power bi palvelu virallinen luotettava semanttinen malli
silver medallion-arkkitehtuuri keskitaso puhdistettu validoitu duplikaatit viitteet tietotyypit
skeema schema rakenne taulut sarakkeet suhteet tähtimalli lumihiutalemalli
ssas sql server analysis services tabular multidimensional power bi taustateknologia
surrogaattiavain surrogate key sk kokonaisluku järjestelmä generoima ei lähdejärjestelmä scd type 2
sql-näkymä view tietokantaan tallennettu kyselylause litistäminen join etl
tabular editor best practice analyzer tom offline-muokkaus
tabular-malli ssas in-memory vertipaq power bi aina tabular
tähtimalli star schema faktataulu dimensiotaulut suorituskykyinen yksinkertainen
tietoallas katso data lake
datan laatu data quality täsmällisyys täydellisyys yhtenäisyys ajantasaisuus tietoeheys entiteettieheys viite-eheys toimialueen eheys tyhjä rivi orporivi
entiteettieheys entity integrity pääavain yksilöivä ei-tyhjä uniikki rivit tunnistaminen raportti
viite-eheys referential integrity vierasavain pääavain dimensiotaulu tyhjä rivi rikkoutuu poistettu
toimialueen eheys domain integrity sarakkeen arvot sallittu joukko vaihteluväli statussarake etl virhe
orporivi orphan row faktarivi vierasavain dimensiotaulu vastinetta viite-eheys power bi tyhjä rivi
tietoeheys data integrity täsmällinen yhtenäinen viite-eheys vierasavain pääavain normalisointi entiteettieheys toimialueen eheys
tietoluokka data category power bi sarake maa kaupunki postinumero url kuva-url copilot q&a
tietovarasto data warehouse dwh keskitetty jäsennelty raportointi analytiikka
vertipaq sarake in-memory pakkausmoottori kardinaliteetti optimoi saraketasolla
vierasavain foreign key fk faktataulussa dimensio pääavain relaatio
yhdistelmäkenttä composite field numeerinen avain luettava nimi 100 helsinki-myymälä lajittelu
yksi-moneen one-to-many tähtimallin perusrelaatio dimensio fakta pääavain vierasavain
alm toolkit power bi mallien vertailu käyttöönotto valikoiva julkaisu tabular editor
anonymisointi anonymization henkilötiedot pysyvästi tunnistamaton gdpr peruuttamaton
data consumer datan käyttäjä rooli raportit päätöksenteko analyytikko
data custodian datan säilyttäjä tekninen rooli tallennus varmuuskopiointi tietoturva
datan elinkaari data lifecycle kerääminen käsittely tallennus käyttö arkistointi hävittäminen gdpr
dax studio dax kysely suorituskyky analyysi ajoitusdata mittari optimointi
dbt data build tool sql muunnos versiointi testaus elt transformaatio
dpo data protection officer tietosuojavastaava gdpr henkilötiedot lainmukaisuus
käyttötarkoituksen rajaus purpose limitation gdpr data tarkoitus kerätty data contract
laskentaryhmä calculation group tabular dax mittari ytd edellinen vuosi toisto tabular editor
mcp model context protocol anthropic tekoälyavustaja avoin standardi työkalut integraatio
microsoft fabric data-analytiikka alusta lakehouse tietovarasto power bi onelake delta
ols object-level security objektitaso tietoturva taulu sarake piilotetaan rls tabular editor
power pivot excel tietomalli vertipaq dax relaatiot mittarit tähtimalli
pseudonymisointi pseudonymization henkilötiedot pseudonyymi hash käänteistettävä gdpr
q&a synonyymi q&a synonym vaihtoehtoinen sana mitta myynti liikevaihto revenue semanttinen malli copilot
rikkova muutos breaking change skeema sarake poisto tietotyyppi data contract
rle run-length encoding vertipaq peräkkäiset identtiset arvot lajittelu sanakirjapakkaus
sanakirjapakkaus dictionary encoding vertipaq toistuvat arvot kokonaisluku koodi kardinaliteetti rle
scd type 4 slowly changing dimension historiataulu nykytila nopea historia
sla service level agreement palvelutaso vasteaika ratkaisuaika data contract
tekoälyavustaja ai assistant copilot luonnollinen kieli metadata semanttinen malli
time intelligence aikaälyfunktiot dax ytd edellinen vuosi liukuva keskiarvo päivämäärä dimensiotaulu
tyhjä rivi blank row power bi dimensio vierasavain tietoeheys vääristää
välitaulu bridge table monen-moneen yksi-moneen uniikit avaimet silta dax
agentti ai agent tekoälyagentti itsenäinen monivaiheinen työkalut mcp profilointi
agenttinen tekoäly agentic ai itsenäinen päätökset automaatio
hallusinaatio hallucination virheellinen keksitty tieto kielimalli tarkistus
kielimalli llm large language model claude gpt gemini luonnollinen kieli dokumentointi
päättelymalli reasoning model ääneen ajattelu tarkkuus monimutkainen dax
promptaus prompt engineering ohje konteksti tehtävä muotoilu tekoäly
rag retrieval augmented generation haku oma data tietokanta hallusinaatio
skilli skill osaamispaketti ohje agentti erikoisosaaminen uudelleenkäytettävä
spec-driven development määrittely spec tekoäly koodi dokumentaatio datasopimus
token tokeni virtuaalivaluutta kustannukset laskutus kielimalli hinta
vibe coding ohjelmointi luonnollinen kieli tekoäly koodi prototyyppaaminen
additiivinen mittari additive measure summa kaikki dimensiot myyntisumma kappalemäärä
semi-additiivinen mittari semi-additive measure varastosaldo tilin saldo tilannekuva aika
ei-additiivinen mittari non-additive measure kateprosentti yksikköhinta osoittaja nimittäjä
degeneraatioavain degenerate dimension dd tilausnumero kuittinumero faktataulu tunniste
transaktiofakta transaction fact table tapahtuma rivi myyntirivit maksutapahtumat yleisin
kausifakta periodic snapshot tilannekuva ajanjakso varastosaldo säännöllinen
kumulatiivinen fakta accumulating snapshot prosessi elinkaari tilaus päivitetään
päivämäärädimensio date dimension kalenteripäivä vuosi kuukausi time intelligence role-playing`,

'kehittamisen-filosofia.html': `kehittämisen filosofia periaatteet käytännöt bi-kehitys
ylläpidettävyys ymmärrettävyys selkeys dokumentointi
kehitä vain sellaista jonka joku muu voi ylläpitää
jos et tiedä mitä teet myönnä se osaamattomuus vaikeneminen ongelmista
tekninen velka laina korko oikaisu nopea ratkaisu kestävä
optimoi ensin oikeellisuus sitten suorituskyky luvut oikein ennen optimointia
rakenna käyttäjälle ei itsellesi loppukäyttäjä päätös kysymys raportti
yhdenmukainen nerokkaan sijaan johdonmukaisuus nimeämiskäytännöt
kulttuuri kysyminen hyväksytty vastaus en tiedä
tietomalli rakenne selkeä yksiselitteinen testaa laskurit vertaa lähdejärjestelmään`,

'tietoa.html': `tietoa sivustosta datamalli.fi about kuka takana
samu lahdenperä dataneuvos datamalli tiimi oy toimitusjohtaja perustaja
analytiikka konsultti bi-kehittäminen kokemus opas datan mallinnus ai-valmis metadata
koulutus diplomi-insinööri tuotantotalous lut-yliopisto data-analytiikka
sertifikaatit microsoft certified fabric analytics engineer azure enterprise data analyst power bi data analyst mastering dax
työhistoria yrittäjyys freelancer yleisradio keusote loihde analytics destia posti
ssas snowflake dbt qlik sql
yhteys linkedin sähköposti puhelin dataneuvos.fi`

};
