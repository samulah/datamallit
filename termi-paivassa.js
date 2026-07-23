// Termi päivässä -kortti. Lukee termit termi-lotto-data.js:n staattisesta taulukosta
// (window.TERMI_LOTTO), jotta kortti toimii myös file://-esikatselussa eikä vain
// http(s)-palvelimella (fetch() on estetty file://-sivuilta selainturvallisuuden takia).

(function () {
  const kohde = document.getElementById('termi-paivassa');
  if (!kohde) return;

  const termit = window.TERMI_LOTTO || [];
  if (termit.length === 0) return;

  const paivaIndeksi = Math.floor(Date.now() / 86400000); // päivä 1970-01-01 -epookista
  const termi = termit[paivaIndeksi % termit.length];

  let teaser = termi.selite;
  if (teaser.length > 170) {
    teaser = teaser.slice(0, 167).replace(/\s+\S*$/, '') + '…';
  }

  kohde.innerHTML = `
    <div class="tp-otsikko">Termi päivässä</div>
    <a class="tp-termi" href="termisto.html#${termi.id}">
      <strong>${termi.nimi}${termi.en ? ` <span class="tp-en">${termi.en}</span>` : ''}</strong>
      <span class="tp-selite">${teaser}</span>
      <span class="tp-linkki">Koko termistö →</span>
    </a>
  `;
  kohde.style.display = 'block';
})();
