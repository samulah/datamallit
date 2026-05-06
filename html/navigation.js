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
                <a href="header-detail.html" class="nav-kesken">Header-Detail</a> |
                <a href="useampi-fakta.html" class="nav-kesken">Useampi fakta</a> |
                <a href="data-vault.html" class="nav-kesken">Data Vault</a> |
                <a href="medallion.html" class="nav-kesken">Medallion</a> |
                <a href="etl-elt.html" class="nav-kesken">ETL/ELT</a> |
                <a href="kirjallisuus-suositukset.html" class="nav-kesken">Kirjallisuus</a> |
                <a href="apuohjelmat.html" class="nav-kesken">Apuohjelmat</a> |
                <a href="data-governance.html" class="nav-kesken">Data Governance</a> |
                <a href="kehittamisen-filosofia.html" class="nav-kesken">Kehittämisen filosofia</a> |
                <a href="termisto.html" class="nav-kesken">Termistö</a>
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
