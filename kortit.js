// "Katso myös" -korttien renderöinti.
//
// Korttien data EI ole enää täällä — se tulee sivut.js:stä (window.SIVUT), jonka
// tyokalut/rakenna.py generoi sivujen omista <head>-metatiedoista. Kortin otsikko,
// kuvaus, tagit ja lukemisaika muuttuvat siis automaattisesti kun sivu muuttuu.
//
// Sivu lisää placeholderin:
//   <section class="katso-myos" data-kortit="tahtimalli.html faktataulu.html …"></section>
// ja lataa sivut.js:n ennen tätä tiedostoa.
(function () {
  function lisaaBadge(kortti, teksti, luokka) {
    const badge = document.createElement('div');
    badge.className = luokka;
    badge.textContent = teksti;
    kortti.appendChild(badge);
  }

  function rakennaKortti(slug) {
    const data = (window.SIVUT || {})[slug];
    if (!data) return null;

    const tagiNimet = window.SIVUSTO_TAGIT || {};

    // Keskeneräinen sivu (robots-noindex) ei ole linkki eikä siinä näytetä lukemisaikaa.
    const kortti = document.createElement(data.julkaistu ? 'a' : 'div');
    kortti.className = data.julkaistu ? 'kortti' : 'kortti kesken';
    if (data.julkaistu) kortti.href = slug;

    if (!data.julkaistu) {
      lisaaBadge(kortti, '🚧 Tulossa', 'kesken-badge');
    } else if (data.badge === 'uutuus') {
      lisaaBadge(kortti, '✨ Uutuus', 'uutuus-badge');
    }

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
        tagi.textContent = tagiNimet[t] || t;
        tagit.appendChild(tagi);
      });
      kortti.appendChild(tagit);
    }

    if (data.julkaistu && data.min) {
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
