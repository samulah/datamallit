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
                    <a href="dimensiot.html">Dimensiot</a>
                    <a href="nimeamiskaytannot.html">Nimeämiskäytännöt</a>
                    <a href="lumihiutalemalli.html">Lumihiutalemalli</a>
                    <a href="litistaminen.html">Litistäminen</a>
                    <a href="kirjallisuus-suositukset.html">Kirjallisuus</a>
                    <a href="apuohjelmat.html">Apuohjelmat</a>
                    <a href="ai-valmis-metadata.html">AI-valmis metadata</a>
                    <a href="kehittamisen-filosofia.html">Filosofia</a>
                    <a href="termisto.html">Termistö</a>
                </div>
            </nav>
        `;

        if (!document.getElementById('sivusto-footer')) {
            const footer = document.createElement('footer');
            footer.id = 'sivusto-footer';
            footer.className = 'sivusto-footer';
            footer.innerHTML = `
                <div class="footer-logo-rivi">
                    <a href="https://dataneuvos.fi" target="_blank" rel="noopener" class="footer-logo-link" title="dataneuvos.fi">
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
