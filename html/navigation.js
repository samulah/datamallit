class MainNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="simple-nav">
                <a href="index.html">Etusivu</a> |
                <a href="tahtimalli.html">Tähtimalli</a> |
                <a href="nimeamiskaytannot.html">Nimeämiskäytännöt</a>
            </nav>
        `;
    }
}
customElements.define('main-navigation', MainNavigation);