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

Vaiheet 2–5 tehdään yhdellä istumalla: vaiheen 4 jälkeen sivusto on alhaalla siihen asti
kunnes vaihe 5 tuo tiedostot uuteen juureen (muutama minuutti). Tee se hiljaiseen aikaan.

### 0. Esitarkistus

cPanelin **Update from Remote** vetää vain sen branchin, joka on palvelimella
checkoutattuna — yleensä `main`. Rakennemuutos on siis oltava mergattuna siihen branchiin
ennen kuin palvelimella tehdään mitään:

```bash
# paikallisesti
git checkout main && git merge <työbranch> && git push origin main
```

Tarkista samalla SSH:lla, ettei palvelimen työpuussa ole käsin muokattuja tiedostoja —
muuten vaiheen 5 pull kaatuu:

```bash
cd /home/inflaati/public_html/datamalli
git status                  # clean; .htaccess ei näy, se on .gitignoressa
git branch --show-current
```

### 1. Pushaa uusi rakenne GitHubiin

Palvelimella ei vielä tapahdu mitään ennen kuin pull ajetaan.

### 2. Luo `sivusto/`-kansio ja kopioi `.htaccess` sinne

Kansio on luotava **ennen** vaihetta 4: cPanel ei hyväksy dokumenttijuureksi polkua jota
ei ole olemassa.

```bash
cd /home/inflaati/public_html/datamalli
mkdir -p sivusto
cp -p .htaccess sivusto/.htaccess      # kopio, EI siirto
ls -la sivusto/
```

File Managerilla sama: `public_html/datamalli` → **Settings → Show Hidden Files** →
valitse `.htaccess` → **Copy** → kohteeksi `/public_html/datamalli/sivusto`.

Kolme asiaa tähän kohtaan:

1. **Kopioi, älä siirrä.** Alkuperäinen jää vanhaan juureen, jolloin dokumenttijuuren
   palauttaminen toimii yhä hätätilanteessa. Se muuttuu vaikutuksettomaksi heti kun juuri
   vaihtuu.
2. `.htaccess` on `.gitignoressa` eikä ole koskaan ollut repossa, joten `git pull` **ei
   koskaan** luo `sivusto/.htaccess`-tiedostoa. Tämä on koko operaation ainoa kohta jota
   automatiikka ei tee puolestasi: jos se unohtuu, turvaotsakkeet (HSTS, CSP),
   verkkotunnusten ohjaukset ja `ErrorDocument 404` katoavat samalla sekunnilla kun juuri
   vaihtuu.
3. Katso `ls -a`:lla, onko vanhassa juuressa **muita käsin lisättyjä tiedostoja jotka
   eivät ole gitissä** — tyypillisesti Search Consolen tai Bingin verifiointitiedosto
   (`google*.html`, `BingSiteAuth.xml`), `.well-known/` tai `ads.txt`. Repossa ei ole
   yhtäkään tällaista eikä sivuilla ole `google-site-verification`-metatagia, joten jos
   verifiointi on tehty tiedostolla, se on viety käsin ja jäisi juuren yläpuolelle →
   verifiointi katkeaa seuraavassa tarkistuksessa. Kopioi löytyneet `sivusto/`-kansioon.

### 3. Lisää `.htaccess`-sääntö luonnoksille

Keskeneräiset sivut ovat `sivusto/luonnos/`-kansiossa eli ainoana keskeneräisenä
aineistona dokumenttijuuren **sisällä** — kaikki muu suojautuu rakenteella. Lisää uuteen
`sivusto/.htaccess`-tiedostoon (mihin tahansa kohtaan, mod_alias ei ole
järjestysriippuvainen):

```apache
# Keskeneräiset sivut eivät ole luettavaa sisältöä. 404 eikä 403, jottei
# olemassaoloa tarvitse vahvistaa.
RedirectMatch 404 ^/luonnos(/|$)
```

Polku on juurisuhteellinen uuteen juureen, eli `^/luonnos` osuu osoitteeseen
`www.datamalli.fi/luonnos/…`.

Palvelimen `.htaccessissa` on lisäksi vanhoja tiedostotyyppikohtaisia estoja
(`/words/`, `/tyokalut/`, `/raportit/`, `*.md`, `*.py`, `*.docx`, `*.pdf`,
`sivupohja.html`). Ne käyvät tarpeettomiksi, koska ne osoittavat dokumenttijuuren
ulkopuolelle, mutta ovat harmittomia — jätä paikoilleen kaksinkertaisena varmistuksena.
Turvaotsakkeet, ohjaukset, `ErrorDocument` ja `Options -Indexes` pidetään ehdottomasti.

Nämä estot eivät ole `dokumentit/htaccess-lisays.txt`-tiedostossa: siinä on enää kohdat
1–3 (etusivun duplikaatti-URL, välimuistiotsakkeet, CSP:n korvaava rivi), jotka ovat
rakennemuutoksesta riippumattomia lisäyksiä palvelimen `.htaccessiin`. Vanhat
tiedostotyyppiestot ovat vain palvelimella.

### 4. Vaihda dokumenttijuuri

cPanel → **Domains** → `datamalli.fi` → *Manage* → **Document Root**:

```
/home/inflaati/public_html/datamalli/sivusto
```

→ **Update**. cPanel kirjoittaa vhostin uudelleen ja käynnistää Apachen; muutos on
voimassa noin minuutissa. DNS:ään ei kosketa, sertifikaatti ei muutu. Tarkista että sama
juuri tuli myös `www.datamalli.fi`-riville, jos se on listassa erikseen.

Jos kenttä on lukittu (osalla cPanel-versioista pääverkkotunnuksen juurta ei voi muokata
käyttöliittymästä), älä yritä kiertää sitä — ks. "Varasuunnitelma" alempana.

**Tästä hetkestä sivusto on alhaalla** kunnes vaihe 5 tuo tiedostot: juuri osoittaa
kansioon jossa on vain `.htaccess`. Kävijä saa Apachen oman 404:n eikä omaa virhesivua,
koska `404.html` ei ole vielä paikallaan.

### 5. Update from Remote

cPanel → **Git™ Version Control** → repon rivi → *Manage* → **Update from Remote**.

Vanhat tiedostot poistuvat vanhasta dokumenttijuuresta itsestään: git tietää että ne
siirtyivät `sivusto/`-kansioon. Erillistä siivousta ei tarvita.

Jos pull valittaa paikallisista muutoksista, palvelimen työpuussa on käsin muokattuja
tiedostoja. Älä pakota — katso `git status` SSH:lla ennen kuin ylikirjoitat mitään.

### 6. Tarkista

```bash
for u in / /tahtimalli.html /tyylit/style.css /skriptit/navigation.js \
         /kuvat/logo-176.png /sitemap.xml /robots.txt /favicon.ico \
         /CLAUDE.md /words/ /dokumentit/deploy.md /etl-elt.html /luonnos/etl-elt.html; do
  printf '%-32s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' https://www.datamalli.fi$u)"
done
```

Kahdeksan ensimmäistä → **200**, neljä viimeistä → **404**.

Sitten otsakkeet. Jos ensimmäinen komento ei tulosta mitään, `.htaccess` ei ole uudessa
dokumenttijuuressa:

```bash
curl -sI https://www.datamalli.fi/ | grep -i "strict-transport\|content-security"
curl -sI https://www.datamalli.fi/index.html | head -3          # 301 → /
curl -sI https://www.datamalli.fi/fontit/dm-sans-normal-latin.woff2 | grep -i cache
```

Lopuksi selaimella: etusivun kolme nostoa latautuvat, termistön haku toimii ja
nav-palkissa lukee oikea "Päivitetty"-päivämäärä. Viimeinen kertoo että `navigation.js`:n
`?v=`-nosto puri eikä välimuisti tarjoile vanhaa versiota.

### 7. Jälkisiivous

- `robots.txt`:n `Disallow: /sivupohja.html` voi poistaa — tiedosto on nyt
  `luonnos/`-kansiossa eikä sitä enää palvella.
- Vanhaan kansioon `public_html/datamalli/` jää `.htaccess`-kopio ja mahdollisia
  git-jäänteitä. Ne eivät ole webissä, joten kiirettä ei ole.
- `DATAN MALLINTAMISEN MERKITYS BI-ohjelmistoilla.pdf` oli aiemmin webissä ja on nyt
  `arkisto/`-kansiossa eli 404. Yksikään sivu ei linkitä siihen, mutta jos se on
  indeksoitu tai jaettu ulkopuolelle, palauta se `sivusto/`-kansioon tai 301-ohjaa
  sisältösivulle.

## Peruutus

**Pullin jälkeen dokumenttijuuren palauttaminen vanhaan polkuun ei riitä**, koska git on
jo poistanut sivut sieltä. Peruutus on kaksi liikettä:

```bash
cd /home/inflaati/public_html/datamalli
git reset --hard 9eb09b6        # viimeinen litteä main
```

…ja dokumenttijuuri takaisin `/home/inflaati/public_html/datamalli`. Vanhassa juuressa
oleva alkuperäinen `.htaccess` on silloin yhä paikallaan — juuri siksi se kopioitiin
vaiheessa 2 eikä siirretty.

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
