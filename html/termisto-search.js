// Termistö-sivun oma haku ja tägäys

const TERMI_TAGI_NIMET = {
  'avaimet':       'avaimet',
  'tietomalli':    'tietomalli',
  'arkkitehtuuri': 'arkkitehtuuri',
  'prosessit':     'prosessit',
  'power-bi':      'Power BI',
  'mittaaminen':   'mittaaminen',
  'konseptit':     'konseptit',
  'hallinta':      'hallinta',
  'olap':          'OLAP / OLTP'
};

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
  });

  document.getElementById('termi-ei-tuloksia').style.display = nakyviaYhteensa === 0 ? '' : 'none';
}

function paivitaTermiNollausNappi() {
  document.getElementById('termi-nollaa-nappi').style.display =
    (termiAktivoidutTagit.size > 0 || termiHakuTeksti !== '') ? '' : 'none';
}

function paivitaTermiAndOrNappi() {
  const nappi = document.getElementById('termi-and-or-toggle');
  nappi.textContent = termiTila;
  nappi.classList.toggle('and-aktiivinen', termiTila === 'AND');
  nappi.title = termiTila === 'OR'
    ? 'OR: näyttää termit, joilla on jokin valituista tägeistä — klikkaa vaihtaaksesi AND-tilaan'
    : 'AND: näyttää vain termit, joilla on kaikki valitut tägit — klikkaa vaihtaaksesi OR-tilaan';
}

function rakennaTermiTagiNapit() {
  const kaikkiTagit = new Set();
  document.querySelectorAll('.termi[data-tags]').forEach(t => {
    t.dataset.tags.split(' ').filter(Boolean).forEach(tag => kaikkiTagit.add(tag));
  });

  const jarjestetty = [...kaikkiTagit].sort((a, b) =>
    (TERMI_TAGI_NIMET[a] || a).localeCompare(TERMI_TAGI_NIMET[b] || b, 'fi')
  );

  const suodatin = document.getElementById('termi-tagi-suodatin');
  suodatin.innerHTML = '';

  jarjestetty.forEach(tagi => {
    const nappi = document.createElement('button');
    nappi.className = 'tagi-nappi' + (termiAktivoidutTagit.has(tagi) ? ' aktiivinen' : '');
    nappi.textContent = TERMI_TAGI_NIMET[tagi] || tagi;
    nappi.dataset.tagi = tagi;
    nappi.addEventListener('click', () => {
      if (termiAktivoidutTagit.has(tagi)) {
        termiAktivoidutTagit.delete(tagi);
        nappi.classList.remove('aktiivinen');
      } else {
        termiAktivoidutTagit.add(tagi);
        nappi.classList.add('aktiivinen');
      }
      paivitaTermiNollausNappi();
      suodataTermit();
    });
    suodatin.appendChild(nappi);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  rakennaTermiTagiNapit();
  paivitaTermiAndOrNappi();

  document.getElementById('termi-haku').addEventListener('input', e => {
    termiHakuTeksti = e.target.value.trim().toLowerCase();
    paivitaTermiNollausNappi();
    suodataTermit();
  });

  document.getElementById('termi-and-or-toggle').addEventListener('click', () => {
    termiTila = termiTila === 'OR' ? 'AND' : 'OR';
    paivitaTermiAndOrNappi();
    suodataTermit();
  });

  document.getElementById('termi-nollaa-nappi').addEventListener('click', () => {
    termiAktivoidutTagit.clear();
    termiHakuTeksti = '';
    termiTila = 'OR';
    document.getElementById('termi-haku').value = '';
    rakennaTermiTagiNapit();
    paivitaTermiAndOrNappi();
    paivitaTermiNollausNappi();
    suodataTermit();
  });
});
