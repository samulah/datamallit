// Splash screen — näytetään kerran per sessio
(function() {
    if (sessionStorage.getItem('splash-nahty')) return;
    sessionStorage.setItem('splash-nahty', '1');

    const splash = document.createElement('div');
    splash.id = 'sivusto-splash';
    splash.innerHTML = `
        <div class="splash-logo-kehys">
            <div class="splash-rengas splash-rengas-1"></div>
            <div class="splash-rengas splash-rengas-2"></div>
            <div class="splash-rengas splash-rengas-3"></div>
            <img src="/kuvat/logo-176.png" alt="Dataneuvos" class="splash-logo" width="88" height="88">
        </div>
        <span class="splash-nimi">datamalli.fi</span>
        <span class="splash-alaotsikko">Datan mallinnuksen opas</span>
    `;
    document.body.appendChild(splash);

    setTimeout(() => {
        splash.classList.add('poistu');
        splash.addEventListener('animationend', () => splash.remove(), { once: true });
    }, 1900);
})();

// Sivuston viimeisin päivityspäivä — päivitä tämä JA lisää merkintä paivitykset.html:ään
// aina ennen git pushia, kun sisältöä on muutettu.
const SIVUSTO_PAIVITETTY = '31.8.2026';

class MainNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="simple-nav">
                <div class="nav-brand">
                    <a href="/" class="nav-logo-link" title="Etusivu">
                        <img src="/kuvat/logo-176.png" alt="Dataneuvos" class="nav-logo" width="30" height="30">
                    </a>
                    <div class="nav-brand-teksti">
                        <a href="/" class="nav-site-name">datamalli.fi</a>
                        <span class="nav-tagline">Datan mallinnuksen opas</span>
                    </div>
                </div>
                <div class="nav-links">
                    <a href="/tietomalli.html">Tietomalli</a>
                    <a href="/tahtimalli.html">Tähtimalli</a>
                    <a href="/faktataulu.html">Faktataulu</a>
                    <a href="/dimensiot.html">Dimensiot</a>
                    <a href="/litistaminen.html">Litistäminen</a>
                    <a href="/lumihiutalemalli.html">Lumihiutalemalli</a>
                    <a href="/sekasikiomalli-vs-tahtimalli.html">Sekasikiömalli vs. tähtimalli</a>
                    <a href="/avaimet-ja-relaatiot.html">Avaimet ja relaatiot</a>
                    <a href="/surrogaattiavaimet.html">Surrogaattiavaimet</a>
                    <a href="/medallion.html">Medallion</a>
                    <a href="/nimeamiskaytannot.html">Nimeämiskäytännöt</a>
                    <a href="/ai-valmis-metadata.html">AI-valmis metadata</a>
                    <a href="/kehittamisen-filosofia.html">Filosofia</a>
                    <a href="/datayrittajan-kustannusrakenne.html">Kustannusrakenne</a>
                    <a href="/freelancerin-tuntihintalaskuri.html">Tuntihintalaskuri</a>
                    <a href="/datayrittajan-verotus-ja-riskit.html">Verotus ja riskit</a>
                    <a href="/termisto.html">Termistö</a>
                    <a href="/kirjallisuus-suositukset.html">Kirjallisuus</a>
                    <a href="/apuohjelmat.html">Apuohjelmat</a>
                    <a href="/tietoa.html">Tietoa</a>
                    <a href="/palvelut.html">Palvelut</a>
                </div>
                <a href="/paivitykset.html" class="nav-paivitys" title="Katso päivityslista">Päivitetty ${SIVUSTO_PAIVITETTY}</a>
            </nav>
        `;

        if (!document.getElementById('sivusto-footer')) {
            const footer = document.createElement('footer');
            footer.id = 'sivusto-footer';
            footer.className = 'sivusto-footer';
            footer.innerHTML = `
                <div class="footer-logo-rivi">
                    <a href="/" class="footer-logo-link" title="Etusivu">
                        <img src="/kuvat/logo-176.png" alt="Dataneuvos" class="footer-logo" width="44" height="44">
                    </a>
                </div>
                <p>
                    Sivuston rakentaja ja ylläpitäjä on yli 10 vuoden analytiikka- ja konsulttikokemuksen omaava
                    <strong>Dataneuvoksen (Datamalli Tiimi Oy)</strong> toimitusjohtaja ja perustaja
                    <strong>Samu Lahdenperä</strong>.
                </p>
                <p class="footer-linkit">
                    <a href="https://dataneuvos.fi" target="_blank" rel="noopener">dataneuvos.fi</a>
                    &nbsp;&middot;&nbsp;
                    <a href="https://www.linkedin.com/in/samulahdenpera/" target="_blank" rel="noopener">LinkedIn</a>
                    &nbsp;&middot;&nbsp;
                    <a href="mailto:samu@dataneuvos.fi">samu@dataneuvos.fi</a>
                    &nbsp;&middot;&nbsp;
                    <a href="tel:+358404115851">+358 40 411 5851</a>
                    &nbsp;&middot;&nbsp;
                    <a href="/tietosuoja.html">Tietosuoja</a>
                </p>
            `;
            document.body.appendChild(footer);
        }
    }
}
customElements.define('main-navigation', MainNavigation);

// Jaa-napit: kopioi ankkurilinkki leikepöydälle
document.addEventListener('DOMContentLoaded', () => {
  const LINK_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

  const jaaCss = document.createElement('style');
  jaaCss.textContent = `
    .jaa-nappi { display:inline-flex; align-items:center; justify-content:center;
      margin-left:7px; padding:2px 5px; border:none; background:none; cursor:pointer;
      border-radius:3px; vertical-align:middle; opacity:0;
      transition:opacity .15s,color .15s,background .15s;
      color:#bbb; font-size:0.75em; line-height:1; }
    h1:hover .jaa-nappi, h2:hover .jaa-nappi,
    .termi:hover .jaa-nappi, .jaa-nappi:hover { opacity:1; }
    .jaa-nappi:hover { color:var(--c-primary,#1e3a5f); background:#eef3fa; }
    .jaa-nappi.kopioitu { opacity:1; color:#2a7a2a; }
  `;
  document.head.appendChild(jaaCss);

  function slugify(t) {
    return t.toLowerCase()
      .replace(/[äå]/g,'a').replace(/ö/g,'o')
      .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  }

  function makeJaaNappi(anchor) {
    const btn = document.createElement('button');
    btn.className = 'jaa-nappi';
    btn.title = 'Kopioi linkki';
    btn.innerHTML = LINK_SVG;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const url = location.origin + location.pathname + (anchor ? '#' + anchor : '');
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
        .catch(() => { const ta = document.createElement('textarea'); ta.value = url;
          document.body.appendChild(ta); ta.select(); document.execCommand('copy');
          document.body.removeChild(ta); return Promise.resolve(); })
        .then(() => {
          btn.innerHTML = '✓'; btn.classList.add('kopioitu');
          setTimeout(() => { btn.innerHTML = LINK_SVG; btn.classList.remove('kopioitu'); }, 2000);
        });
    });
    return btn;
  }

  // h1 → sivun URL ilman ankkuria
  document.querySelectorAll('h1').forEach(h => {
    if (h.closest('nav,footer')) return;
    h.appendChild(makeJaaNappi(null));
  });

  // h2 → ankkuri id:stä tai generoidusta slugista (ei aakkos-otsikot, ei index-kategoriat)
  document.querySelectorAll('h2:not(.termi-aakkos-otsikko)').forEach(h => {
    if (h.closest('nav,footer')) return;
    if (h.closest('.kategoria')) return;
    if (!h.id) h.id = slugify(h.textContent.trim());
    h.appendChild(makeJaaNappi(h.id));
  });

  // termistön termit → .termi-nimi:n perään
  document.querySelectorAll('.termi[id] .termi-nimi').forEach(el => {
    el.appendChild(makeJaaNappi(el.closest('.termi').id));
  });
});

// Lukemisaika luetaan ensisijaisesti <meta name="lukemisaika">-tagista, jonka
// tyokalut/rakenna.py laskee sivun sisällöstä. Näin artikkelin ja etusivun kortin luku
// on sama lähtökohtaisesti — niitä ei tarvitse pitää käsin synkassa.
// Alla oleva laskenta on fallback sivuille joille generaattoria ei ole vielä ajettu.
function laskeLukemisaika() {
  // #sivusto-splash ohitetaan: splash-logo on <img>, joka laskettaisiin visuaaliksi (+40 s).
  // Splash on DOM:ssa vain istunnon ensimmäisellä sivulla, joten ilman tätä sama sivu
  // näyttäisi eri lukemisajan riippuen siitä monesko sivu se on istunnossa.
  const excl = el => el.closest('nav, footer, .tool-meta, #sivusto-splash');

  const countWords = selector => [...document.querySelectorAll(selector)]
    .filter(el => !excl(el))
    .map(el => el.textContent).join(' ')
    .trim().split(/\s+/).filter(Boolean).length;

  const textWords  = countWords('p, li, h2, h3, .termi-nimi, .termi-en, .termi-selite');
  const tableWords = countWords('td, th');
  const visuals    = [...document.querySelectorAll('img, .mermaid, figure')]
    .filter(el => !excl(el)).length;

  const seconds = (textWords  / 200) * 60
                + (tableWords /  50) * 60
                + visuals * 40;

  return Math.ceil(seconds / 60);
}

document.addEventListener('DOMContentLoaded', () => {
  const meta = document.querySelector('meta[name="lukemisaika"]');
  const luettu = meta ? parseInt(meta.content, 10) : NaN;
  const minutes = Number.isFinite(luettu) ? luettu : laskeLukemisaika();

  const h1 = document.querySelector('h1');
  if (h1 && minutes > 0) {
    const tag = document.createElement('p');
    tag.className = 'lukemisaika';
    tag.textContent = `Lukemisaika: noin ${minutes} min`;
    h1.insertAdjacentElement('afterend', tag);
  }
});

// Termi-tooltip: näyttää lyhyen termistöselitteen kun hiiri on a.termi-tip-linkin päällä
(function () {
  const TERMIT = {
    'vierasavain':               { fi: 'Vierasavain (FK)',            en: 'Foreign Key',           selite: 'Faktataulussa sijaitseva sarake, joka viittaa dimensiotaulun pääavaimeen. Mahdollistaa relaation taulujen välillä.' },
    'paaavain':                  { fi: 'Pääavain (PK)',               en: 'Primary Key',            selite: 'Sarake tai sarakeyhdistelmä, joka yksilöi jokaisen taulun rivin ainutlaatuisesti. Ei saa sisältää tyhjiä arvoja.' },
    'degeneraatioavain':         { fi: 'Degeneraatioavain (DD)',       en: 'Degenerate Dimension',   selite: 'Lähdejärjestelmän tunniste faktataulussa ilman omaa dimensiotaulua. Hyödyllinen hakua ja virheiden jäljitystä varten.' },
    'surrogaattiavain':          { fi: 'Surrogaattiavain (SK)',        en: 'Surrogate Key',          selite: 'Järjestelmän itse generoima kokonaislukuavain, joka korvaa lähdejärjestelmän luonnollisen avaimen relaatioissa. Pakkautuu VertiPaqissa erinomaisesti.' },
    'additiivinen-mittari':      { fi: 'Additiivinen mittari',         en: 'Additive Measure',       selite: 'Mittari jonka voi summata kaikkien dimensioiden yli — tulos on oikea maittain, kuukausittain ja tuotteittain.' },
    'semi-additiivinen-mittari': { fi: 'Semi-additiivinen mittari',    en: 'Semi-Additive Measure',  selite: 'Voidaan summata joidenkin dimensioiden yli, muttei kaikkien. Aika on usein se dimensio jonka yli ei voi summata.' },
    'ei-additiivinen-mittari':   { fi: 'Ei-additiivinen mittari',      en: 'Non-Additive Measure',   selite: 'Ei voi summata minkään dimension yli. Laske aina DAX-kaavalla kontekstin mukaan.' },
    'granulariteetti':           { fi: 'Granulariteetti',              en: 'Granularity',            selite: 'Faktataulun rivin yksityiskohtaisuuden taso — mitä yksi rivi edustaa. Määrää mihin kysymyksiin malli pystyy vastaamaan.' },
    'scd':                       { fi: 'SCD',                          en: 'Slowly Changing Dimension', selite: 'Dimension muutostenkäsittelytapa. Tyyppi 2 säilyttää historian luomalla uuden rivin vanhalle arvolle.' },
    'scd-type-1':                { fi: 'SCD Type 1',                   en: 'Slowly Changing Dimension, Type 1', selite: 'Dimension muutostenkäsittely, jossa vanha arvo ylikirjoitetaan uudella. Historia häviää. Sopii silloin kun muutos on korjaus eikä liiketoiminnallinen tapahtuma — esimerkiksi kirjoitusvirhe asiakkaan nimessä.' },
    'scd-type-2':                { fi: 'SCD Type 2',                   en: 'Slowly Changing Dimension, Type 2', selite: 'Dimension muutostenkäsittely, jossa muutos tuottaa uuden rivin. Vanha rivi säilyy, joten historiallinen raportointi toimii oikein. Vaatii surrogaattiavaimen ja voimassaoloaikasarakkeet. Yleisin SCD-tyyppi.' },
    'vertipaq':                  { fi: 'VertiPaq',                     en: 'VertiPaq',               selite: 'Power BI:n muistimoottori. Pakkaa datan sarake kerrallaan — matala kardinaliteetti pakkautuu parhaiten.' },
    'etl':                       { fi: 'ETL',                          en: 'Extract, Transform, Load', selite: 'Prosessi jossa data poimitaan lähdejärjestelmästä, muunnetaan ja ladataan kohdetietokantaan.' },
    'medallion-arkkitehtuuri':   { fi: 'Medallion-arkkitehtuuri',      en: 'Medallion Architecture', selite: 'Kolmikerroksinen arkkitehtuuri: Bronze (raakadata), Silver (puhdistettu) ja Gold (raportoinnille valmis).' },
    'kardinaliteetti':           { fi: 'Kardinaliteetti',               en: 'Cardinality',            selite: 'Sarakkeen uniikkien arvojen määrä. Matala kardinaliteetti (esim. alue) pakkautuu VertiPaqissa tehokkaasti; korkea kardinaliteetti (esim. tilausnumero) ei pakkaudu.' },
    'luonnollinen-avain':        { fi: 'Luonnollinen avain (NK)',        en: 'Natural Key / Business Key', selite: 'Lähdejärjestelmän alkuperäinen avain, joka yksilöi kohteen liiketoimintakontekstissa. Säilytetään dimensiossa hakua varten, mutta relaatioihin käytetään surrogaattiavainta.' },
    'normalisointi':             { fi: 'Normalisointi',                  en: 'Normalization',              selite: 'Tietokannan rakenteen jäsentäminen niin, että kukin tieto sijaitsee vain yhdessä paikassa. Vähentää toisteisuutta ja parantaa tietoeheyttä, mutta tekee kyselyistä monimutkaisempia.' },
    'denormalisointi':           { fi: 'Denormalisointi',                en: 'Denormalization',            selite: 'Toistaa tietoa useassa paikassa tarkoituksella, jotta luettavuus ja suorituskyky paranevat. Tähtimallin dimensiot ovat tyypillisesti denormalisoituja.' },
    'bronze':                    { fi: 'Bronze',                         en: 'Bronze layer',               selite: 'Medallion-arkkitehtuurin alin taso. Säilyttää datan täsmälleen sellaisenaan kuin se tulee lähdejärjestelmästä, ilman muokkauksia tai laadunvarmistusta.' },
    'silver':                    { fi: 'Silver',                         en: 'Silver layer',               selite: 'Medallion-arkkitehtuurin keskitaso. Raakadata on puhdistettu ja validoitu: duplikaatit poistettu, viitteet tarkistettu, tietotyypit korjattu. Välitaso Bronzen ja Goldin välillä.' },
    'gold':                      { fi: 'Gold',                           en: 'Gold layer',                 selite: 'Medallion-arkkitehtuurin ylin taso. Data on jalostettu liiketoiminnan käyttöön valmiiksi tähtimalliksi tai aggregoiduksi datasetiksi, suoraan raporttien käyttöön.' },
    'nk':                        { fi: 'NK (Natural Key)',               en: 'Natural Key / Business Key', selite: 'Lähdejärjestelmästä tuleva tunniste kuten asiakasnumero tai tuotekoodi. Säilytetään dimensiossa hakua varten, mutta relaatioihin käytetään surrogaattiavainta (SK).' },
    'sk':                        { fi: 'SK (Surrogate Key)',             en: 'Surrogate Key',              selite: 'Järjestelmän generoima kokonaislukutunniste joka korvaa luonnollisen avaimen relaatioissa. Dimensiotaulun pääavain. Pakkautuu VertiPaqissa optimaalisesti.' },
    'identity':                  { fi: 'IDENTITY',                       en: 'Auto-increment / Serial',    selite: 'SQL Serverin ominaisuus joka generoi automaattisesti nousevan kokonaisluvun uudelle riville. IDENTITY(1,1) = lähtöarvo 1, askel 1. Ensimmäinen rivi saa arvon 1, toinen 2, kolmas 3 — automaattisesti.' },
    'dbt':                       { fi: 'dbt (data build tool)',          en: 'data build tool',            selite: 'Avoimen lähdekoodin työkalu tietovaraston muunnoslogiikan hallintaan SQL-malleina. Hoitaa inkrementaaliset lataukset, SCD-historia (snapshots) ja mallien väliset riippuvuudet automaattisesti.' },
    'mittari':                   { fi: 'Mittari',                        en: 'Measure',                    selite: 'DAX-lausekkeella määritelty laskenta, joka suoritetaan vasta raporttia katsottaessa suodatinkontekstin mukaan. Faktataulun numeerinen ydin — summat, keskiarvot ja tunnusluvut.' },
    'sentinel-rivi':             { fi: 'Sentinel-rivi',                  en: 'Sentinel Row',               selite: 'Dimensiotauluun ennalta lisätty rivi, joka kerää alleen puuttuvat, tuntemattomat ja poistetut viittaukset (Ei tiedossa, Anonyymi, [Poistettu]). Saa oman surrogaattiavaimen, joten faktataulun vierasavain löytää aina vastineen eikä Power BI luo automaattista tyhjää riviä.' },
    'valitaulu':                 { fi: 'Välitaulu',                      en: 'Bridge Table',               selite: 'Aputaulu, joka purkaa hankalan monen-moneen-suhteen kahdeksi hallituksi yksi-moneen-suhteeksi. Sisältää uniikit yhdistelmät kahden taulun avaimista ja toimii niiden välissä siltana.' },
    'yhdenmukaistettu-dimensio': { fi: 'Yhdenmukaistettu dimensio',      en: 'Conformed Dimension',        selite: 'Dimensio, jota käytetään samanlaisena useammassa faktataulussa — sama taulu, samat sarakkeet ja arvot. Mahdollistaa faktataulujen yhdistelyn raporteissa ilman ristiriitoja.' },
    'faktataulu':                { fi: 'Faktataulu',                     en: 'Fact Table',                 selite: 'Tähtimallin keskeinen taulu, joka sisältää mitattavia tapahtumia kuten myyntejä, tilauksia tai laskutuksia. Rivit koostuvat enimmäkseen luvuista ja avaimista, ja tauluun viitataan dimensioiden kautta.' },
    'dimensiotaulu':             { fi: 'Dimensiotaulu',                  en: 'Dimension Table',            selite: 'Kuvaileva taulu, joka vastaa kysymyksiin kuka, mitä, missä ja milloin. Sisältää attribuutteja kuten asiakkaan nimi, tuotteen kategoria tai päivämäärä.' },
    'tietovarasto':              { fi: 'Tietovarasto (DWH)',             en: 'Data Warehouse',             selite: 'Keskitetty, jäsennelty data-alusta, johon eri lähdejärjestelmien data yhdistetään raportointia ja analytiikkaa varten.' },
    'data-owner':                { fi: 'Datan omistaja',                 en: 'Data Owner',                 selite: 'Liiketoiminnasta vastaava henkilö, joka päättää tietoaineiston käyttötarkoituksista ja vastaa sen oikeellisuudesta. Tyypillisesti johtotason rooli, kuten myyntijohtaja myyntidatasta.' },
    'data-steward':              { fi: 'Datan hoitaja',                  en: 'Data Steward',               selite: 'Vastaa päivittäisestä datan laadusta, dokumentoinnista ja sääntöjen noudattamisesta. Toimii datan omistajan ja teknisten toteuttajien välissä.' },
    'data-custodian':            { fi: 'Datan säilyttäjä',               en: 'Data Custodian',             selite: 'Tekninen rooli, joka vastaa datan tallennuksesta, varmuuskopioinnista ja tietoturvasta — esimerkiksi IT-arkkitehti, joka hallinnoi tietovaraston infrastruktuuria.' },
    'data-consumer':             { fi: 'Datan käyttäjä',                 en: 'Data Consumer',              selite: 'Hyödyntää dataa raporteissa, analyyseissä ja päätöksenteossa. Ei vastaa datan tuottamisesta, vaan luottaa siihen että datan hoitaja ja omistaja pitävät sen luotettavana.' },
    'datan-laatu':               { fi: 'Datan laatu',                    en: 'Data Quality',               selite: 'Datan sopivuus käyttötarkoitukseensa: täsmällisyys, täydellisyys, yhtenäisyys ja ajantasaisuus. Laadun ongelmat johtavat vääriin raportteihin.' },
    'metadata':                  { fi: 'Metadata',                       en: 'Metadata',                   selite: 'Tieto datasta. Tekninen metadata kuvaa esimerkiksi sarakkeiden tietotyyppejä, liiketoimintametadata kertoo mitä sarake tarkoittaa liiketoiminnan kannalta.' },
    'datakatalogi':              { fi: 'Datakatalogi',                   en: 'Data Catalog',               selite: 'Työkalu, joka kokoaa organisaation tietoaineistot, niiden omistajuuden ja käyttötarkoitukset yhteen paikkaan. Toimii organisaation datakirjastona.' },
    'gdpr':                      { fi: 'GDPR',                           en: 'General Data Protection Regulation', selite: 'EU:n yleinen tietosuoja-asetus, joka säätelee henkilötietojen käsittelyä. Velvoittaa organisaatiot tietämään, mitä henkilötietoja kerätään, missä ne sijaitsevat ja mihin niitä käytetään.' },
    'kayttotarkoituksen-rajaus': { fi: 'Käyttötarkoituksen rajaus',      en: 'Purpose Limitation',         selite: 'GDPR:n periaate, jonka mukaan dataa saa käyttää vain siihen tarkoitukseen, johon se on alun perin kerätty. Laskutusta varten kerättyä asiakasdataa ei saa ilman erillistä perustetta käyttää markkinointiin.' },
    'anonymisointi':             { fi: 'Anonymisointi',                  en: 'Anonymization',              selite: 'Henkilötietojen muuttaminen pysyvästi tunnistamattomiksi. Toisin kuin pseudonymisointia, anonymisointia ei voi peruuttaa — anonymisoitu data ei ole enää henkilötietoa GDPR:n mielessä.' },
    'rls':                       { fi: 'RLS (rivitason tietoturva)',     en: 'Row-Level Security',         selite: 'Käyttäjä näkee vain itselleen sallitut rivit. Power BI toteuttaa sen DAX-suodattimilla. Vrt. objektitason OLS, joka piilottaa kokonaisia tauluja tai sarakkeita.' },
    'datan-elinkaari':           { fi: 'Datan elinkaari',                en: 'Data Lifecycle',             selite: 'Datan kaikki vaiheet syntymästä poistamiseen: kerääminen, käsittely, tallennus, käyttö, arkistointi ja hävittäminen. GDPR edellyttää poistoa, kun dataa ei enää tarvita.' },
  };

  const css = document.createElement('style');
  css.textContent = `
    a.termi-tip {
      color: inherit;
      text-decoration: underline dotted;
      text-decoration-color: var(--c-primary, #1e3a5f);
      text-underline-offset: 3px;
      cursor: help;
    }
    #termi-tooltip {
      position: fixed;
      z-index: 9999;
      width: 270px;
      background: #fff;
      border: 1px solid #c8d8ec;
      border-radius: 7px;
      box-shadow: 0 4px 18px rgba(0,0,0,.13);
      padding: 11px 14px 9px;
      font-size: 0.82em;
      line-height: 1.45;
      pointer-events: none;
      opacity: 0;
      transition: opacity .1s;
      font-family: inherit;
    }
    #termi-tooltip.nakyvilla { opacity: 1; }
    #termi-tooltip .tt-nimi   { font-weight: 600; color: #1e3a5f; display: block; margin-bottom: 2px; }
    #termi-tooltip .tt-en     { color: #888; font-style: italic; font-size: 0.9em; display: block; margin-bottom: 6px; }
    #termi-tooltip .tt-selite { color: #333; display: block; }
    #termi-tooltip .tt-lue    { display: block; margin-top: 7px; color: #1e3a5f; font-size: 0.88em; border-top: 1px solid #e8eef6; padding-top: 6px; }
  `;
  document.head.appendChild(css);

  const tip = document.createElement('div');
  tip.id = 'termi-tooltip';
  tip.setAttribute('role', 'tooltip');
  document.body.appendChild(tip);

  let hideTimer = null;

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.termi-tip[href*="termisto.html#"]').forEach(el => {
      const ankkuri = el.getAttribute('href').split('#')[1];
      const termi = TERMIT[ankkuri];
      if (!termi) return;

      el.addEventListener('mouseenter', e => {
        clearTimeout(hideTimer);
        tip.innerHTML =
          `<span class="tt-nimi">${termi.fi}</span>` +
          `<span class="tt-en">${termi.en}</span>` +
          `<span class="tt-selite">${termi.selite}</span>` +
          `<span class="tt-lue">→ Termistöön</span>`;
        sijoitaTip(e);
        tip.classList.add('nakyvilla');
      });
      el.addEventListener('mousemove', sijoitaTip);
      el.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(() => tip.classList.remove('nakyvilla'), 80);
      });
    });
  });

  function sijoitaTip(e) {
    const pad = 14, tw = 270, th = tip.offsetHeight || 110;
    let x = e.clientX + pad;
    let y = e.clientY - th - pad;
    if (x + tw > window.innerWidth - pad) x = e.clientX - tw - pad;
    if (y < pad) y = e.clientY + pad;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }
})();
