// Termistö-sivun oma haku ja tägäys

const TERMI_TAGI_NIMET = {
  'avaimet':        'avaimet',
  'tietomalli':     'tietomalli',
  'arkkitehtuuri':  'arkkitehtuuri',
  'prosessit':      'prosessit',
  'power-bi':       'Power BI',
  'dax-konseptit':  'DAX-konseptit',
  'mittaaminen':    'mittaaminen',
  'konseptit':      'konseptit',
  'hallinta':       'hallinta',
  'olap':           'OLAP / OLTP',
  'ai':             'AI / tekoäly',
  'tyokalut':       'työkalut',
  // Aihetägit — kertovat millä sisältösivulla termi käsitellään
  'tahtimalli':      'Tähtimalli',
  'lumihiutale':     'Lumihiutalemalli',
  'medallion':       'Medallion',
  'dimensiot':       'Dimensiot',
  'litistaminen':    'Litistäminen',
  'header-detail':   'Header-Detail',
  'useampi-fakta':   'Useampi fakta',
  'data-vault':      'Data Vault',
  'data-contract':   'Data Contract',
  'data-governance': 'Data Governance',
  'ai-metadata':     'AI-valmis metadata',
  'apuohjelmat':     'Apuohjelmat',
  'etl-elt':         'ETL / ELT'
};

// Aihetägien slugit (erottuvat konseptitägeistä suodatinrivillä)
const TERMI_AIHE_TAGIT = new Set([
  'tahtimalli', 'lumihiutale', 'medallion', 'dimensiot', 'litistaminen',
  'header-detail', 'useampi-fakta', 'data-vault', 'data-contract',
  'data-governance', 'ai-metadata', 'apuohjelmat', 'etl-elt'
]);

let termiAktivoidutTagit = new Set();
let termiHakuTeksti = '';
let termiTila = 'OR'; // 'OR' tai 'AND'

function suodataTermit() {
  const termit = document.querySelectorAll('.termi');
  let nakyviaYhteensa = 0;

  termit.forEach(termi => {
    const tagit = (termi.dataset.tags || '').split(' ').filter(Boolean);
    const nimi   = (termi.querySelector('.termi-nimi')?.textContent   || '').toLowerCase();
    const selite = (termi.querySelector('.termi-selite')?.textContent || '').toLowerCase();
    const en     = (termi.querySelector('.termi-en')?.textContent     || '').toLowerCase();

    const hakuOsuma = termiHakuTeksti === '' ||
      nimi.includes(termiHakuTeksti) ||
      selite.includes(termiHakuTeksti) ||
      en.includes(termiHakuTeksti);

    let tagiOsuma = true;
    if (termiAktivoidutTagit.size > 0) {
      tagiOsuma = termiTila === 'AND'
        ? [...termiAktivoidutTagit].every(t => tagit.includes(t))
        : [...termiAktivoidutTagit].some(t => tagit.includes(t));
    }

    const nakyvissa = hakuOsuma && tagiOsuma;
    termi.style.display = nakyvissa ? '' : 'none';
    if (nakyvissa) nakyviaYhteensa++;
  });

  // Piilota kirjainosiot, joissa ei ole näkyviä termejä
  document.querySelectorAll('.termi-aakkos-otsikko').forEach(otsikko => {
    const luettelo = otsikko.nextElementSibling;
    if (!luettelo || !luettelo.classList.contains('termi-luettelo')) return;
    const nakyvia = [...luettelo.querySelectorAll('.termi')].some(t => t.style.display !== 'none');
    otsikko.style.display = nakyvia ? '' : 'none';
    luettelo.style.display = nakyvia ? '' : 'none';

    // Himmennä leijuvan navin kirjain, jos osiossa ei ole näkyviä termejä
    document.querySelectorAll('.aakkos-leiju a[href="#' + otsikko.id + '"]')
      .forEach(link => link.classList.toggle('disabled', !nakyvia));
  });

  document.getElementById('termi-ei-tuloksia').style.display = nakyviaYhteensa === 0 ? '' : 'none';

  const laskuri = document.getElementById('termi-laskuri');
  if (laskuri) {
    const suodatettu = termiHakuTeksti !== '' || termiAktivoidutTagit.size > 0;
    laskuri.textContent = suodatettu
      ? nakyviaYhteensa + ' / ' + termit.length
      : termit.length + ' termiä';
  }
}

function paivitaTermiNollausNappi() {
  document.getElementById('termi-nollaa-nappi').style.display =
    (termiAktivoidutTagit.size > 0 || termiHakuTeksti !== '') ? '' : 'none';
}

function paivitaTermiAndOrNappi() {
  const toggle = document.getElementById('termi-and-or-toggle');
  toggle.dataset.tila = termiTila;
  toggle.setAttribute('aria-label', termiTila === 'OR'
    ? 'Suodatuslogiikka: termillä on jokin valituista tägeistä — vaihda niin että kaikkien on täsmättävä'
    : 'Suodatuslogiikka: termillä on kaikki valitut tägit — vaihda niin että yksikin riittää');
}

// Logiikkakytkin näytetään vasta kun vertailtavia tägejä on vähintään kaksi
function paivitaLogiikkaNakyvyys() {
  document.getElementById('termi-logiikka').style.display =
    termiAktivoidutTagit.size >= 2 ? '' : 'none';
}

function rakennaTermiTagiNapit() {
  const kaikkiTagit = new Set();
  document.querySelectorAll('.termi[data-tags]').forEach(t => {
    t.dataset.tags.split(' ').filter(Boolean).forEach(tag => kaikkiTagit.add(tag));
  });

  const aakkosjarjestys = (a, b) =>
    (TERMI_TAGI_NIMET[a] || a).localeCompare(TERMI_TAGI_NIMET[b] || b, 'fi');

  const konseptit = [...kaikkiTagit].filter(t => !TERMI_AIHE_TAGIT.has(t)).sort(aakkosjarjestys);
  const aiheet    = [...kaikkiTagit].filter(t =>  TERMI_AIHE_TAGIT.has(t)).sort(aakkosjarjestys);

  const teeNappi = (tagi, aihe) => {
    const nappi = document.createElement('button');
    nappi.className = 'tagi-nappi' + (aihe ? ' tagi-nappi--aihe' : '') +
      (termiAktivoidutTagit.has(tagi) ? ' aktiivinen' : '');
    nappi.textContent = TERMI_TAGI_NIMET[tagi] || tagi;
    nappi.dataset.tagi = tagi;
    nappi.setAttribute('aria-pressed', termiAktivoidutTagit.has(tagi) ? 'true' : 'false');
    nappi.addEventListener('click', () => {
      const paalla = termiAktivoidutTagit.has(tagi);
      if (paalla) termiAktivoidutTagit.delete(tagi);
      else termiAktivoidutTagit.add(tagi);
      nappi.classList.toggle('aktiivinen', !paalla);
      nappi.setAttribute('aria-pressed', !paalla ? 'true' : 'false');
      paivitaTermiNollausNappi();
      paivitaLogiikkaNakyvyys();
      suodataTermit();
    });
    return nappi;
  };

  const tayta = (sailioId, tagit, aihe) => {
    const sailio = document.getElementById(sailioId);
    sailio.innerHTML = '';
    tagit.forEach(t => sailio.appendChild(teeNappi(t, aihe)));
    const ryhma = sailio.closest('.suodatin-ryhma');
    if (ryhma) ryhma.style.display = tagit.length ? '' : 'none';
  };

  tayta('termi-tagi-konseptit', konseptit, false);
  tayta('termi-tagi-aiheet', aiheet, true);
}

document.addEventListener('DOMContentLoaded', () => {
  rakennaTermiTagiNapit();
  paivitaTermiAndOrNappi();
  paivitaLogiikkaNakyvyys();

  document.getElementById('termi-haku').addEventListener('input', e => {
    termiHakuTeksti = e.target.value.trim().toLowerCase();
    paivitaTermiNollausNappi();
    suodataTermit();
  });

  const toggle = document.getElementById('termi-and-or-toggle');
  const vaihdaTila = () => {
    termiTila = termiTila === 'OR' ? 'AND' : 'OR';
    paivitaTermiAndOrNappi();
    suodataTermit();
  };
  toggle.addEventListener('click', vaihdaTila);
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); vaihdaTila(); }
  });

  document.getElementById('termi-nollaa-nappi').addEventListener('click', () => {
    termiAktivoidutTagit.clear();
    termiHakuTeksti = '';
    termiTila = 'OR';
    document.getElementById('termi-haku').value = '';
    rakennaTermiTagiNapit();
    paivitaTermiAndOrNappi();
    paivitaLogiikkaNakyvyys();
    paivitaTermiNollausNappi();
    suodataTermit();
  });

  // Alusta laskuri ja näkyvyys
  suodataTermit();
});
