// Termi päivässä- ja Satunnainen termi -kortit. Lukevat termit termi-lotto-data.js:n
// staattisesta taulukosta (window.TERMI_LOTTO), jotta kortit toimivat myös
// file://-esikatselussa eikä vain http(s)-palvelimella (fetch() on estetty
// file://-sivuilta selainturvallisuuden takia).

(function () {
  const kohde = document.getElementById('termi-paivassa');
  if (!kohde) return;

  const termit = window.TERMI_LOTTO || [];
  if (termit.length === 0) return;

  const paivaIndeksi = Math.floor(Date.now() / 86400000); // päivä 1970-01-01 -epookista
  const paivanTermi = termit[paivaIndeksi % termit.length];

  // Satunnaistermi arvotaan uudelleen joka sivulatauksella. Ei sama kuin päivän
  // termi, jotta kortit eivät koskaan näytä samaa termiä vierekkäin.
  let satunnainenTermi = paivanTermi;
  while (termit.length > 1 && satunnainenTermi === paivanTermi) {
    satunnainenTermi = termit[Math.floor(Math.random() * termit.length)];
  }

  function teaser(selite) {
    if (selite.length <= 170) return selite;
    return selite.slice(0, 167).replace(/\s+\S*$/, '') + '…';
  }

  function kortti(otsikko, termi) {
    return `
    <div class="tp-solu">
      <div class="tp-otsikko">${otsikko}</div>
      <a class="tp-termi" href="termisto.html#${termi.id}">
        <strong>${termi.nimi}${termi.en ? ` <span class="tp-en">${termi.en}</span>` : ''}</strong>
        <span class="tp-selite">${teaser(termi.selite)}</span>
        <span class="tp-linkki">Koko termistö →</span>
      </a>
    </div>`;
  }

  kohde.innerHTML = kortti('Termi päivässä', paivanTermi) +
                    kortti('Satunnainen termi', satunnainenTermi);
  // Näkyvyys luokan kautta, ei inline-tyylillä — inline display:block ohittaisi
  // CSS:n grid-asettelun, jolla kortit rajataan yhden kortin levyisiksi.
  kohde.classList.add('tp-nakyvissa');
})();
