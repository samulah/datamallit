const TAGI_NIMET = {
  'power-bi':        'Power BI',
  'dax':             'DAX',
  'tietomalli':      'tietomalli',
  'arkkitehtuuri':   'arkkitehtuuri',
  'hallinta':        'hallinta',
  'tyokalut':        'työkalut',
  'kirjallisuus':    'kirjallisuus',
  'perusteoria':     'perusteoria',
  'poikkeustapaus':  'poikkeustapaus',
  'ai':              'AI'
};

let aktivoidutTagit = new Set();
let hakuTeksti = '';
let tila = 'OR'; // 'OR' tai 'AND'

// Sivujen tekstisisältö esirakennetusta indeksistä (search-index.js)
const sivuSisallot = window.HAKU_INDEKSI || {};

function suodataKortit() {
  const kortit = document.querySelectorAll('.kortti');
  let nakyviaYhteensa = 0;

  kortit.forEach(kortti => {
    const korttiTagit = (kortti.dataset.tags || '').split(' ').filter(Boolean);
    const otsikko    = (kortti.querySelector('strong')?.textContent || '').toLowerCase();
    const kuvaus     = (kortti.querySelector('span')?.textContent   || '').toLowerCase();
    const url        = kortti.getAttribute('href');
    const sivuTeksti = sivuSisallot[url] || '';

    const korttiOsuma = hakuTeksti === '' ||
      otsikko.includes(hakuTeksti) ||
      kuvaus.includes(hakuTeksti);

    const sivuOsuma = hakuTeksti !== '' && sivuTeksti.includes(hakuTeksti);
    const hakuOsuma = korttiOsuma || sivuOsuma;

    // Näytä "löytyy sivulta" -merkki kun osuma on vain sivun sisällössä
    let merkki = kortti.querySelector('.sisalto-osuma');
    if (sivuOsuma && !korttiOsuma && hakuTeksti !== '') {
      if (!merkki) {
        merkki = document.createElement('span');
        merkki.className = 'sisalto-osuma';
        merkki.textContent = 'löytyy sivulta';
        kortti.appendChild(merkki);
      }
      merkki.style.display = '';
    } else if (merkki) {
      merkki.style.display = 'none';
    }

    let tagiOsuma = true;
    if (aktivoidutTagit.size > 0) {
      tagiOsuma = tila === 'AND'
        ? [...aktivoidutTagit].every(t => korttiTagit.includes(t))
        : [...aktivoidutTagit].some(t => korttiTagit.includes(t));
    }

    const nakyvissa = hakuOsuma && tagiOsuma;
    kortti.style.display = nakyvissa ? '' : 'none';
    if (nakyvissa) nakyviaYhteensa++;
  });

  document.querySelectorAll('.kategoria').forEach(kat => {
    const onNakyvia = [...kat.querySelectorAll('.kortti')].some(k => k.style.display !== 'none');
    kat.style.display = onNakyvia ? '' : 'none';
  });

  document.getElementById('ei-tuloksia').style.display = nakyviaYhteensa === 0 ? '' : 'none';
}

function paivitaNollausNappi() {
  document.getElementById('nollaa-nappi').style.display =
    (aktivoidutTagit.size > 0 || hakuTeksti !== '') ? '' : 'none';
}

function paivitaAndOrNappi() {
  const nappi = document.getElementById('and-or-toggle');
  nappi.textContent = tila;
  nappi.classList.toggle('and-aktiivinen', tila === 'AND');
  nappi.title = tila === 'OR'
    ? 'OR: näyttää kortit joilla on jokin valituista tägeistä — klikkaa vaihtaaksesi AND-tilaan'
    : 'AND: näyttää vain kortit joilla on kaikki valitut tägit — klikkaa vaihtaaksesi OR-tilaan';
}

function rakennaTagiNapit() {
  const kaikkiTagit = new Set();
  document.querySelectorAll('.kortti[data-tags]').forEach(k => {
    k.dataset.tags.split(' ').filter(Boolean).forEach(t => kaikkiTagit.add(t));
  });

  const jarjestetty = [...kaikkiTagit].sort((a, b) =>
    (TAGI_NIMET[a] || a).localeCompare(TAGI_NIMET[b] || b, 'fi')
  );

  const suodatin = document.getElementById('tagi-suodatin');
  suodatin.innerHTML = '';

  jarjestetty.forEach(tagi => {
    const nappi = document.createElement('button');
    nappi.className = 'tagi-nappi' + (aktivoidutTagit.has(tagi) ? ' aktiivinen' : '');
    nappi.textContent = TAGI_NIMET[tagi] || tagi;
    nappi.dataset.tagi = tagi;
    nappi.addEventListener('click', () => {
      if (aktivoidutTagit.has(tagi)) {
        aktivoidutTagit.delete(tagi);
        nappi.classList.remove('aktiivinen');
      } else {
        aktivoidutTagit.add(tagi);
        nappi.classList.add('aktiivinen');
      }
      paivitaNollausNappi();
      suodataKortit();
    });
    suodatin.appendChild(nappi);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  rakennaTagiNapit();
  paivitaAndOrNappi();

  document.getElementById('haku').addEventListener('input', e => {
    hakuTeksti = e.target.value.trim().toLowerCase();
    paivitaNollausNappi();
    suodataKortit();
  });

  document.getElementById('and-or-toggle').addEventListener('click', () => {
    tila = tila === 'OR' ? 'AND' : 'OR';
    paivitaAndOrNappi();
    suodataKortit();
  });

  document.getElementById('nollaa-nappi').addEventListener('click', () => {
    aktivoidutTagit.clear();
    hakuTeksti = '';
    tila = 'OR';
    document.getElementById('haku').value = '';
    // Piilotetaan kaikki sisalto-osuma-merkit
    document.querySelectorAll('.sisalto-osuma').forEach(el => el.style.display = 'none');
    rakennaTagiNapit();
    paivitaAndOrNappi();
    paivitaNollausNappi();
    suodataKortit();
  });
});
