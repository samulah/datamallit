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
tekoälyvalmis ai-pohjainen analytiikka`,

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
the definitive guide to dax marco russo alberto ferrari 2019
dax-kieli data analysis expressions vertipaq-moottorin toiminta
pakkaa enkoodaa dataa sarakkeiden kardinaliteetin vähentäminen suorituskyky
dax patterns second edition marco russo alberto ferrari 2021
valmiita kaavoja tähtimallin sapluuna time intelligence vuosittaiset vertailut abc-analyysit
star schema the complete reference christopher adamson 2010
dimensionaalinen tietovarastosuunnittelu perusteet edistyneet tekniikat
yritystason tietovarastoarkkitehtuurit bi etl-järjestelmien optimointistrategiat
tähtimallista oppii kaiken suunnittelupäätökset selkeitä ferrari russo power bi lyömätön
the data model resource book revised edition len silverston 2001
library of universal data models enterprises henkilöt organisaatiot tuotteet tilaukset taloushallinto
testattuja uudelleenkäytettäviä tietomalliratkaisuja tietokantasuunnittelijat`,

'apuohjelmat.html': `power bi apuohjelmat ilmainen maksullinen laajentavat ominaisuuksia
dax studio darren gosbelli avoimen lähdekoodin power bi desktop ssas tabular azure analysis services power pivot
dax-kyselyiden kirjoittaminen analysoiminen suorittaminen
objektiselain taulut sarakkeet laskurit haettavissa
daxformatter.com dax-koodin muotoilu
palvelimien ajoituksen jäljitys suorituskykyanalyysi
erottimien vaihto us eu manuaalinen muokkaus
automaattinen power bi desktop instanssien tunnistus
vertipaq analyzer dax studio versio 2.11.0 advanced view metrics
analysoi vertipaq-pohjaisten relaatiotietokantojen kokoa rakennetta
jokaisen taulun sarakkeen koko bitteissä muistia
cardinality kardinaliteetti uniikkeja arvoja
table size taulun sarakkeiden koko relaatiot bitteissä
col size sarakkeen sisällön koko data dictionary hier size
data datasisältö dictionary arvokirjasto rel size relaatioiden muisti
prosentti db taulun sarakkeen osuus koko tietokannasta
tabular editor 2 tabular-malleihin power bi tietomalleihin
laskureita laskennallisia sarakkeita näyttökansiota perspektiivejä käännöksiä
tom tabular object model metadatan muokkaaminen
tietojen editointi nimeäminen erissä kopioi liitä pudota vedä
kumoa tee uudelleen mallinnus offline-tilassa ei prosessoi jatkuvasti
best practice analyzer parhaiden käytäntöjen analysointi korjaus bpa säännöt deklaratiivinen automaatio
mcp model context protocol muistuttaa bpa-kehitystä säännöt työkalut automaatio
c#-skriptaus automaatio ssas azure as power bi premium
te2 te3 vertailu ilmainen mit-lisenssi maksullinen tilauspohjainen
vertipaq analyzer integraatio dax-debuggeri pivot-taulukko diagram view intellisense
alm toolkit christian wade application lifecycle management
tietojoukkojen analysis services mallien vertailu yhdistäminen käyttöönotto
kahden tietomalliversioiden vertailu kehitys tuotantomalli
valikoiva käyttöönotto jaettu tietomalli shared dataset premium päivittäminen
git-pohjainen versiohallinnan tukeminen bism normalizer
pbix-tiedoston julkaisu korvaa koko tietojoukon katkaisee raportit tietomallitasolla
power bi mcp model context protocol tekoäly ai anthropic claude fabric
tekoälyassistentti lukee tietomallin rakenteen taulut sarakkeet mittarit
dax-kyselyiden kirjoittaminen testaaminen tekoälyn avulla
mittareiden luominen dokumentointi ai-avusteisesti
tietomallin laadun tarkistaminen puuttuvat relaatiot korkean kardinaliteetin sarakkeet
luonnollisella kielellä kysyminen datasta
copilot vs mcp avoin protokolla suljettu ympäristö
tekoälymalli valittavissa claude gpt laajennettavuus`,

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
kuvailu nimeäminen taulut sarakkeet mitat liiketoimintakuvaus
copilot q&a synonyymit tietoluokka data category sertifiointi
tekninen metadata liiketoimintametadata datakatalog
hyvä kuvaus huono kuvaus luonnollinen kieli konteksti
mitä sarake tarkoittaa yksikkö laskentalogiikka arvojoukko
päivämäärä aikavyöhyke utc lippu tilakoodi koodiarvot selitys
surrogaattiavain viittaa tauluun omistaja päivitysaikataulu
ai-valmis tekoälyvalmis ai-pohjainen analytiikka copilot toimii oikein
q&a synonyymit myynti liikevaihto revenue ohjaa samaan mittaan
tietoluokka maa kaupunki postinumero url kuva-url
yhteenveto-asetus oletusyhteenveto hakemistotaulu featured table excel tietotyypit
sertifiointi virallinen luotettava power bi palvelu
muistilista tarkistuslista jokaisella taululla kuvaus mittarisarake yksikkö
koodiarvot aikavyöhyke synonyymit geografiset sarakkeet sertifioitu datan omistaja
aloita tärkeimmistä sarakkeista 10-15 saraketta kehitystyön tapa pull request julkaisu`,

'kehittamisen-filosofia.html': `kehittämisen filosofia periaatteet käytännöt bi-kehitys
ylläpidettävyys ymmärrettävyys selkeys dokumentointi
kehitä vain sellaista jonka joku muu voi ylläpitää
jos et tiedä mitä teet myönnä se osaamattomuus vaikeneminen ongelmista
tekninen velka laina korko oikaisu nopea ratkaisu kestävä
optimoi ensin oikeellisuus sitten suorituskyky luvut oikein ennen optimointia
rakenna käyttäjälle ei itsellesi loppukäyttäjä päätös kysymys raportti
yhdenmukainen nerokkaan sijaan johdonmukaisuus nimeämiskäytännöt
kulttuuri kysyminen hyväksytty vastaus en tiedä
tietomalli rakenne selkeä yksiselitteinen testaa laskurit vertaa lähdejärjestelmään`

};
