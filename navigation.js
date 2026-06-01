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
            <img src="kuvat/dataneuvos_logo.png" alt="Dataneuvos" class="splash-logo">
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

class MainNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="simple-nav">
                <div class="nav-brand">
                    <a href="index.html" class="nav-logo-link" title="Etusivu">
                        <img src="kuvat/dataneuvos_logo.png" alt="Dataneuvos" class="nav-logo">
                    </a>
                    <div class="nav-brand-teksti">
                        <a href="index.html" class="nav-site-name">datamalli.fi</a>
                        <span class="nav-tagline">Datan mallinnuksen opas</span>
                    </div>
                </div>
                <div class="nav-links">
                    <a href="tahtimalli.html">Tähtimalli</a>
                    <a href="lumihiutalemalli.html">Lumihiutalemalli</a>
                    <a href="dimensiot.html">Dimensiot</a>
                    <a href="nimeamiskaytannot.html">Nimeämiskäytännöt</a>
                    <a href="litistaminen.html">Litistäminen</a>
                    <a href="ai-valmis-metadata.html">AI-valmis metadata</a>
                    <a href="kehittamisen-filosofia.html">Filosofia</a>
                    <a href="termisto.html">Termistö</a>
                    <a href="kirjallisuus-suositukset.html">Kirjallisuus</a>
                    <a href="tietoa.html">Tietoa</a>
                </div>
            </nav>
        `;

        if (!document.getElementById('sivusto-footer')) {
            const footer = document.createElement('footer');
            footer.id = 'sivusto-footer';
            footer.className = 'sivusto-footer';
            footer.innerHTML = `
                <div class="footer-logo-rivi">
                    <a href="index.html" class="footer-logo-link" title="Etusivu">
                        <img src="kuvat/dataneuvos_logo.png" alt="Dataneuvos" class="footer-logo">
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

document.addEventListener('DOMContentLoaded', () => {
  const excl = el => el.closest('nav, footer, .tool-meta');

  const countWords = selector => [...document.querySelectorAll(selector)]
    .filter(el => !excl(el))
    .map(el => el.textContent).join(' ')
    .trim().split(/\s+/).filter(Boolean).length;

  const textWords  = countWords('p, li, h2, h3');
  const tableWords = countWords('td, th');
  const visuals    = [...document.querySelectorAll('img, .mermaid, figure')]
    .filter(el => !excl(el)).length;

  const seconds = (textWords  / 200) * 60
                + (tableWords /  50) * 60
                + visuals * 40;

  const minutes = Math.ceil(seconds / 60);
  const h1 = document.querySelector('h1');
  if (h1 && minutes > 0) {
    const tag = document.createElement('p');
    tag.className = 'lukemisaika';
    tag.textContent = `Lukemisaika: noin ${minutes} min`;
    h1.insertAdjacentElement('afterend', tag);
  }
});
