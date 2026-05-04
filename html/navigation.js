class MainNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="simple-nav">
                <a href="index.html">Etusivu</a> |
                <a href="data-vault.html">Data Vault</a> |
                <a href="etl-elt.html">ETL/ELT</a> |
                <a href="header-detail.html">Header-Detail</a> |
                <a href="lumihiutalemalli.html">Lumihiutalemalli</a> |
                <a href="medallion.html">Medallion</a> |
                <a href="tahtimalli.html">Tähtimalli</a> |
                <a href="useampi-fakta.html">Useampi fakta</a> |
                <a href="nimeamiskaytannot.html">Nimeämiskäytännöt</a> |
                <a href="kirjallisuus-suositukset.html">Suositeltu kirjallisuus</a> |
                <a href="apuohjelmat.html">Apuohjelmat</a> |
                <a href="data-governance.html">Data Governance</a>
            </nav>
        `;
    }
}
customElements.define('main-navigation', MainNavigation);