class MainNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="simple-nav">
                <a href="index.html">Etusivu</a> |
                <a href="tahtimalli.html">Tähtimalli</a> |
                <a href="dimensiot.html">Dimensioiden mallinnus</a> |
                <a href="nimeamiskaytannot.html">Nimeämiskäytännöt</a> |
                <a href="lumihiutalemalli.html">Lumihiutalemalli</a> |
                <a href="flattaus.html">Taulujen flättäys</a> |
                <a href="kirjallisuus-suositukset.html">Kirjallisuus</a> |
                <a href="apuohjelmat.html">Apuohjelmat</a> |
                <a href="ai-valmis-metadata.html">AI-valmis metadata</a> |
                <a href="kehittamisen-filosofia.html">Kehittämisen filosofia</a> |
                <a href="termisto.html">Termistö</a>
            </nav>
        `;

        if (!document.getElementById('sivusto-footer')) {
            const footer = document.createElement('footer');
            footer.id = 'sivusto-footer';
            footer.className = 'sivusto-footer';
            footer.innerHTML = `
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
