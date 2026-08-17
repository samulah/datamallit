# Deploy — cPanel Git Version Control

Palvelimen repo on `/home/inflaati/public_html/datamalli`, ja sen työpuu on samalla
verkkotunnuksen dokumenttijuuri. Deploy on siis `git pull` (cPanelin **Update from
Remote**) — mitään erillistä kopiointivaihetta ei ole.

Juuri siksi koko työkansio oli webissä: `CLAUDE.md`, `words/`, `tyokalut/` ja aiemmat
auditointiraportit palautuivat kaikki HTTP 200:lla.

**Ratkaisu: dokumenttijuureksi `…/datamalli/sivusto`.** Kaikki muu jää dokumenttijuuren
yläpuolelle, eikä sinne pääse käsiksi millään osoitteella. Työnkulku ei muutu.

```
/home/inflaati/public_html/datamalli/     ← git-työpuu, EI dokumenttijuuri
├── sivusto/                              ← dokumenttijuuri (www.datamalli.fi/)
│   ├── index.html  tahtimalli.html  …
│   ├── skriptit/  tyylit/  kuvat/  fontit/
│   ├── luonnos/                          ← estetään .htaccessilla
│   └── .htaccess                         ← siirrettävä tänne
├── tyokalut/  dokumentit/  words/  arkisto/   ← juuren yläpuolella = ei webissä
├── CLAUDE.md  README.md
└── .git/
```

## Käyttöönotto

Vaiheet 2–4 kannattaa tehdä yhdellä istumalla: niiden välissä sivusto on hetken alhaalla
(muutama minuutti).

### 1. Pushaa uusi rakenne GitHubiin

Palvelimella ei vielä tapahdu mitään ennen kuin pull ajetaan.

### 2. Luo `sivusto/`-kansio ja siirrä `.htaccess` sinne

cPanel → **File Manager** → `public_html/datamalli`:

1. Luo kansio `sivusto` (jos `git pull` on jo ajettu, se on jo olemassa).
2. **Kopioi** `.htaccess` kansioon `sivusto/`. Näytä piilotiedostot: Settings → *Show
   Hidden Files*.

`.htaccess` on pakko saada uuteen dokumenttijuureen: siinä ovat turvaotsakkeet (HSTS,
CSP), verkkotunnusten ohjaukset ja `ErrorDocument 404`. Ilman sitä ne katoavat.
Vanha kopio vanhaan paikkaan saa jäädä — se muuttuu vaikutuksettomaksi.

### 3. Lisää `.htaccess`-sääntö luonnoksille

Keskeneräiset sivut ovat `sivusto/luonnos/`-kansiossa eli dokumenttijuuren sisällä.
Lisää uuteen `sivusto/.htaccess`-tiedostoon:

```apache
# Keskeneräiset sivut eivät ole luettavaa sisältöä. 404 eikä 403, jottei
# olemassaoloa tarvitse vahvistaa.
RedirectMatch 404 ^/luonnos(/|$)
```

Loput `.htaccess-lisays`-tiedoston säännöistä (kohdat 5–6: `/words/`, `/tyokalut/`,
`/raportit/`, `*.md`, `*.py`, `*.docx`, `*.pdf`, `sivupohja.html`) käyvät tarpeettomiksi,
koska ne osoittavat dokumenttijuuren ulkopuolelle. Ne saa jättää paikoilleen
kaksinkertaisena varmistuksena. Kohdat 1–4 (turvaotsakkeet, ohjaukset, `ErrorDocument`,
`Options -Indexes`) pidetään ehdottomasti.

### 4. Vaihda dokumenttijuuri

cPanel → **Domains** → `datamalli.fi` → *Manage* → **Document Root**:

```
/home/inflaati/public_html/datamalli/sivusto
```

Jos cPanel ei anna muokata kenttää, ks. "Varasuunnitelma" alempana.

### 5. Update from Remote

cPanel → **Git™ Version Control** → repon rivi → *Manage* → **Update from Remote**.

Vanhat tiedostot poistuvat vanhasta dokumenttijuuresta itsestään: git tietää että ne
siirtyivät `sivusto/`-kansioon. Erillistä siivousta ei tarvita.

Jos pull valittaa paikallisista muutoksista, palvelimen työpuussa on käsin muokattuja
tiedostoja. Katso `git status` SSH:lla ennen kuin ylikirjoitat mitään.

### 6. Tarkista

| Osoite | Odotus |
|---|---|
| `https://www.datamalli.fi/` | 200 |
| `https://www.datamalli.fi/tahtimalli.html` | 200 |
| `https://www.datamalli.fi/tyylit/style.css` | 200 |
| `https://www.datamalli.fi/skriptit/navigation.js` | 200 |
| `https://www.datamalli.fi/kuvat/logo-176.png` | 200 |
| `https://www.datamalli.fi/sitemap.xml` | 200 |
| `https://www.datamalli.fi/CLAUDE.md` | 404 |
| `https://www.datamalli.fi/words/` | 404 |
| `https://www.datamalli.fi/etl-elt.html` | 404 |
| `https://www.datamalli.fi/luonnos/etl-elt.html` | 404 |

Tarkista lisäksi että turvaotsakkeet tulevat mukana — jos eivät, `.htaccess` ei ole
uudessa dokumenttijuuressa:

```sh
curl -sI https://www.datamalli.fi/ | grep -i "strict-transport\|content-security"
```

### 7. Jälkisiivous

- `robots.txt`:n `Disallow: /sivupohja.html` voi poistaa — tiedosto on nyt
  `luonnos/`-kansiossa eikä sitä enää palvella.
- Vanhaan kansioon `public_html/datamalli/` jää `.htaccess`-kopio ja mahdollisia
  git-jäänteitä. Ne eivät ole webissä, joten kiirettä ei ole.

## Varasuunnitelma: klooni pois dokumenttijuuresta

Jos dokumenttijuurta ei voi vaihtaa, siirretään repo pois sen alta ja deployataan
kopioimalla:

1. cPanel → Git Version Control → *Manage* → **Remove** (poistaa vain cPanelin
   kirjanpidon, ei tiedostoja).
2. **Create** → *Clone a Repository* → `https://github.com/samulah/datamallit.git`,
   polku `/home/inflaati/repositories/datamallit`.
3. Lisää repon juureen `.cpanel.yml`:

   ```yaml
   ---
   deployment:
     tasks:
       - export DEPLOYPATH=/home/inflaati/public_html/datamalli
       - /usr/bin/rsync -a --exclude 'luonnos/' sivusto/ $DEPLOYPATH/
   ```

4. Tyhjennä vanha dokumenttijuuri käsin (**säilytä `.htaccess`**) — kopioiva deploy ei
   poista mitään, joten muuten vanhat `.md`-, `.py`- ja luonnostiedostot jäävät eloon:

   ```sh
   mkdir -p ~/vanha-docroot
   cd /home/inflaati/public_html/datamalli
   for f in * .git .gitignore .githooks .claude .vscode; do
     [ "$f" = ".htaccess" ] && continue
     [ -e "$f" ] && mv "$f" ~/vanha-docroot/
   done
   ls -a          # jäljellä vain .htaccess
   ```

5. Deploy: *Manage* → **Update from Remote** → **Deploy HEAD Commit**.

Tässä mallissa `luonnos/` ei päädy palvelimelle lainkaan, joten kohdan 3
`.htaccess`-sääntöä ei tarvita. Vastapainoksi deploy ei poista palvelimelta mitään —
poistetut sivut jäävät eloon kunnes ne poistetaan käsin tai `rsync`iin lisätään
`--delete --exclude '.htaccess'`.
