// Termi päivässä- ja Satunnainen termi -kortit. Lukevat termit termi-lotto-data.js:n
// staattisesta taulukosta (window.TERMI_LOTTO), jotta kortit toimivat myös
// file://-esikatselussa eikä vain http(s)-palvelimella (fetch() on estetty
// file://-sivuilta selainturvallisuuden takia).
//
// Kortit täytetään sivulla valmiina oleviin .tp-lotto-slotteihin — ei luoda uusia
// elementtejä. Näin CSS voi varata korteille tilan etukäteen (CLS) ja etusivun
// generoitu "Uusin juttu" -nosto pysyy paikallaan samassa ruudukossa.

(function () {
  const kohde = document.getElementById('termi-paivassa');
  if (!kohde) return;

  const paikat = kohde.querySelectorAll('.tp-lotto');
  if (paikat.length < 2) return;

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
      <div class="tp-otsikko">${otsikko}</div>
      <a class="tp-termi" href="termisto.html#${termi.id}">
        <strong>${termi.nimi}${termi.en ? ` <span class="tp-en">${termi.en}</span>` : ''}</strong>
        <span class="tp-selite">${teaser(termi.selite)}</span>
        <span class="tp-linkki">Koko termistö →</span>
      </a>`;
  }

  paikat[0].innerHTML = kortti('Termi päivässä', paivanTermi);
  paikat[1].innerHTML = kortti('Satunnainen termi', satunnainenTermi);
  // Näkyvyys luokan kautta, ei inline-tyylillä — inline display:block ohittaisi
  // CSS:n grid-asettelun, jolla kortit rajataan yhden kortin levyisiksi.
  // (Etusivulla ruudukko on näkyvissä koko ajan generoidun noston takia,
  // termistössä luokka paljastaa sen vasta kun kortit ovat valmiit.)
  kohde.classList.add('tp-nakyvissa');
})();
