// "Katso myös" -korttien data ja renderöinti.
// HUOM: pidä otsikko/kuvaus/tagit/min synkassa index.html:n vastaavien korttien kanssa.
// min = navigation.js:n laskema "Lukemisaika: noin N min" (laske uudelleen jos sivun sisältö muuttuu).
// Sivu lisää placeholderin: <section class="katso-myos" data-kortit="tahtimalli.html faktataulu.html …"></section>
window.KORTIT = {
  'tahtimalli.html': {
    otsikko: 'Tähtimalli (Star Schema)',
    kuvaus: 'Yksinkertainen ja suorituskykyinen malli, jossa faktataulun ympärille liitetään dimensiotaulut suoraan. Yleisin valinta BI-ratkaisuissa.',
    tagit: ['tietomalli', 'Power BI', 'perusteoria', 'AI'],
    min: 6
  },
  'faktataulu.html': {
    otsikko: 'Faktataulun mallinnus',
    kuvaus: 'Faktataulun rakenne, kolme arkkityyppiä ja granulariteetin valinta. Vierasavaimet, additiivisuus ja kultaiset säännöt Power BI -tietomallia varten.',
    tagit: ['tietomalli', 'Power BI', 'perusteoria'],
    min: 13
  },
  'dimensiot.html': {
    otsikko: 'Dimensioiden mallinnus',
    kuvaus: 'Surrogaattiavaimet, SCD-tyypit 0–6, parhaat käytännöt ja Power BI:n suorituskykyrajat eri kokoisilla dimensioilla.',
    tagit: ['tietomalli', 'Power BI', 'perusteoria'],
    min: 13
  },
  'avaimet-ja-relaatiot.html': {
    otsikko: 'Avaimien ja relaatioiden mallinnus',
    kuvaus: 'Avaintyypit (PK, FK, surrogaatti, degeneraatioavain), relaatioiden kardinaliteetti ja suodatussuunta sekä orpojen vierasavainten käsittely sentinel-rivein.',
    tagit: ['tietomalli', 'Power BI', 'perusteoria'],
    min: 13
  },
  'litistaminen.html': {
    otsikko: 'Taulujen litistäminen (Flattening)',
    kuvaus: 'Hierarkkisten dimensiotaulujen yhdistäminen yhdeksi leveäksi tauluksi ennen Power BI -latausta. Muuttaa lumihiutaleen tähtimalliksi.',
    tagit: ['tietomalli', 'Power BI', 'perusteoria'],
    min: 5
  },
  'lumihiutalemalli.html': {
    otsikko: 'Lumihiutalemalli (Snowflake Schema)',
    kuvaus: 'Tähtimallin laajennus, jossa dimensiot on normalisoitu useampaan tauluun. Vähentää toisteisuutta mutta lisää monimutkaisuutta.',
    tagit: ['tietomalli', 'Power BI', 'perusteoria'],
    min: 3
  },
  'nimeamiskaytannot.html': {
    otsikko: 'Nimeämiskäytännöt',
    kuvaus: 'Ferrarin ja Russon seitsemän sääntöä taulujen ja sarakkeiden nimeämiseen Power BI -tietomalleissa. Selkeys alkaa nimistä.',
    tagit: ['hallinta', 'Power BI', 'tietomalli'],
    min: 7
  },
  'ai-valmis-metadata.html': {
    otsikko: 'AI-valmis metadata',
    kuvaus: 'Mitä tauluista, sarakkeista ja mittareista kannattaa kuvata tietovarastossa ja Power BI:ssä, jotta Copilot ja muut AI-työkalut toimivat luotettavasti.',
    tagit: ['hallinta', 'Power BI', 'AI', 'tietomalli'],
    min: 10
  },
  'kehittamisen-filosofia.html': {
    otsikko: 'Kehittämisen filosofia',
    kuvaus: 'Periaatteita, jotka ohjaavat hyvää BI-kehitystä: ylläpidettävyys, avoimuus ongelmista, tekninen velka ja käyttäjälähtöisyys.',
    tagit: ['hallinta', 'perusteoria'],
    min: 1
  },
  'termisto.html': {
    otsikko: 'Termistö',
    kuvaus: 'Datan mallinnuksen, tietovarastoinnin ja BI-kehittämisen termit aakkosjärjestyksessä. Lyhyet selitykset suomeksi, englanninkieliset vastineet mukana.',
    tagit: ['perusteoria', 'tietomalli'],
    min: 22
  },
  'kirjallisuus-suositukset.html': {
    otsikko: 'Suositeltu kirjallisuus',
    kuvaus: 'Parhaat kirjat datan mallinnuksesta, tietovarastoinnista ja Power BI:stä. Hyvä lukupaketti niin aloittelijoille kuin kokeneille.',
    tagit: ['kirjallisuus', 'DAX', 'tietomalli'],
    min: 8
  },
  'apuohjelmat.html': {
    otsikko: 'Apuohjelmat',
    kuvaus: 'DAX Studio, Tabular Editor, ALM Toolkit ja Power BI MCP — Power BI -kehittäjän tärkeimmät lisätyökalut selitettynä.',
    tagit: ['työkalut', 'Power BI', 'DAX', 'AI'],
    min: 9
  },
  'tietoa.html': {
    otsikko: 'Tietoa sivustosta',
    kuvaus: 'Kuka datamalli.fi:n takana on ja mihin sivusto tähtää — tekijänä Samu Lahdenperä (Dataneuvos), 10+ v. analytiikka- ja BI-kokemus.',
    tagit: [],
    min: 3
  }
};

(function () {
  function rakennaKortti(slug) {
    const data = window.KORTIT[slug];
    if (!data) return null;

    const kortti = document.createElement('a');
    kortti.className = 'kortti';
    kortti.href = slug;

    const otsikko = document.createElement('strong');
    otsikko.textContent = data.otsikko;
    kortti.appendChild(otsikko);

    const kuvaus = document.createElement('span');
    kuvaus.textContent = data.kuvaus;
    kortti.appendChild(kuvaus);

    if (data.tagit && data.tagit.length) {
      const tagit = document.createElement('div');
      tagit.className = 'kortti-tagit';
      data.tagit.forEach(t => {
        const tagi = document.createElement('span');
        tagi.className = 'tagi';
        tagi.textContent = t;
        tagit.appendChild(tagi);
      });
      kortti.appendChild(tagit);
    }

    if (data.min) {
      const aika = document.createElement('span');
      aika.className = 'kortti-lukemisaika';
      aika.textContent = `⏱ Lukemisaika: ${data.min} min`;
      kortti.appendChild(aika);
    }

    return kortti;
  }

  function renderoi() {
    document.querySelectorAll('section.katso-myos[data-kortit]').forEach(osio => {
      const slugit = osio.dataset.kortit.trim().split(/\s+/).filter(Boolean);
      if (!slugit.length) return;

      const otsikko = document.createElement('h2');
      otsikko.textContent = 'Katso myös';

      const rivi = document.createElement('div');
      rivi.className = 'kortti-rivi';
      slugit.forEach(slug => {
        const kortti = rakennaKortti(slug);
        if (kortti) rivi.appendChild(kortti);
      });

      if (!rivi.children.length) return;
      osio.appendChild(otsikko);
      osio.appendChild(rivi);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderoi);
  } else {
    renderoi();
  }
})();
