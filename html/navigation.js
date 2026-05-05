class MainNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="simple-nav">
                <a href="index.html">Etusivu</a> |
                <a href="tahtimalli.html">Tähtimalli</a> |
                <a href="dimensiot.html">Dimensioiden mallinnus</a> |
                <a href="nimeamiskaytannot.html">Nimeämiskäytännöt</a> |
                <a href="lumihiutalemalli.html" class="nav-kesken">Lumihiutalemalli</a> |
                <a href="header-detail.html" class="nav-kesken">Header-Detail</a> |
                <a href="useampi-fakta.html" class="nav-kesken">Useampi fakta</a> |
                <a href="data-vault.html" class="nav-kesken">Data Vault</a> |
                <a href="medallion.html" class="nav-kesken">Medallion</a> |
                <a href="etl-elt.html" class="nav-kesken">ETL/ELT</a> |
                <a href="kirjallisuus-suositukset.html" class="nav-kesken">Kirjallisuus</a> |
                <a href="apuohjelmat.html" class="nav-kesken">Apuohjelmat</a> |
                <a href="data-governance.html" class="nav-kesken">Data Governance</a>
            </nav>
        `;
    }
}
customElements.define('main-navigation', MainNavigation);