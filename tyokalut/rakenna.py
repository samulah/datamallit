#!/usr/bin/env python3
"""
datamalli.fi — sivujen metatietojen generaattori.

Sivu itse on ainoa lähde omalle metatiedolleen. Tämä skripti lukee jokaisen sivun <head>:n,
laskee lukemisajan sivun sisällöstä ja generoi niistä kaiken muun:

    sivu.html <head>  ──▶  skriptit/sivut.js  ──▶  index.html (kortit)
                                              ──▶  skriptit/kortit.js ("Katso myös")
                      ──▶  sivu.html <meta name="lukemisaika">
                      ──▶  index.html ("Uusin juttu" -nosto)
                      ──▶  sitemap.xml
                      ──▶  skriptit/navigation.js (SIVUSTO_PAIVITETTY)

Skannattavat sivut ovat kahdessa paikassa, ja paikka määräytyy julkaisutilasta:

    sivusto/*.html          julkaistut sivut (ei robots-noindexiä)
    sivusto/luonnos/*.html  keskeneräiset (robots-noindex) — eivät päädy palvelimelle

Tämä ei ole tyylisääntö vaan tarkistettu invariantti: väärässä kansiossa oleva sivu
pysäyttää ajon. Julkaiseminen on siten pelkkä siirto — luonnossivujen polut ovat
juurisuhteellisia, joten ne toimivat sellaisenaan myös sivuston juuressa.

Ajot:
    python3 tyokalut/rakenna.py              kirjoittaa muuttuneet tiedostot
    python3 tyokalut/rakenna.py --tarkista   ei kirjoita; exit 1 jos jokin on vanhentunut
    python3 tyokalut/rakenna.py --raportti   metatietojen laatuvaroitukset

HUOM: BeautifulSoupia käytetään vain LUKEMISEEN. Kirjoitus tehdään kohdennetulla
merkkijonokorvauksella, jotta sivujen oma muotoilu säilyy koskemattomana.
"""

import argparse
import html
import json
import math
import os
import re
import sys
from datetime import date

from bs4 import BeautifulSoup

JUURI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Deployattava sivusto. Kaikki polut tässä skriptissä ovat suhteessa tähän, eivät repon
# juureen — repon juuressa on myös aineistoa joka ei kuulu sivustolle (tyokalut/,
# dokumentit/, words/, arkisto/).
SIVUSTO = os.path.join(JUURI, "sivusto")
LUONNOS = "luonnos"
SKRIPTIT = "skriptit"

# Tiedostot joita ei skannata sivuina lainkaan. Alaviivalla alkavat ovat
# työtiedostoja (esim. _lk-testi.html) — ne eivät saa korttia, lukemisaikaa
# eivätkä sitemap-riviä, eivätkä pysäytä ajoa puuttuvien metatietojen takia.
OHITA = {"sivupohja.html", "404.html"}


def ohitetaanko(nimi):
    return nimi in OHITA or nimi.startswith("_")

# Sivut jotka eivät ole sisältösivuja (ei korttia, ei lukemisaikaa), mutta kuuluvat sitemapiin
EI_KORTTIA = {"index.html", "paivitykset.html", "tietosuoja.html"}

DOMAIN = "https://www.datamalli.fi"

# Lukemisajan kaava — peilaa navigation.js:n laskentaa
VALITSIN_TEKSTI = "p, li, h2, h3, .termi-nimi, .termi-en, .termi-selite"
VALITSIN_TAULU = "td, th"
VALITSIN_VISUAALI = "img, .mermaid, figure"
SANAT_MIN_TEKSTI = 200
SANAT_MIN_TAULU = 50
SEK_PER_VISUAALI = 40


# ---------------------------------------------------------------- apurit


def lue(polku):
    with open(polku, encoding="utf-8") as f:
        return f.read()


def kirjoita(polku, sisalto):
    with open(polku, "w", encoding="utf-8") as f:
        f.write(sisalto)


def sivustopolku(suhteellinen):
    """sivusto/-kansion sisäinen polku absoluuttiseksi."""
    return os.path.join(SIVUSTO, suhteellinen)


def sivutiedostot():
    """Skannattavat sivut {slug: polku sivusto/-kansion sisällä}, aakkosjärjestyksessä.

    Slug on aina pelkkä tiedostonimi — se on sivun tunniste sitemapissa, sivut.js:ssä,
    hakuindeksissä ja data-kortit-listoissa riippumatta siitä onko sivu luonnos vai ei.
    Näin julkaiseminen ei muuta yhtäkään viittausta.
    """
    loydot = {}
    for kansio in ("", LUONNOS):
        hakemisto = sivustopolku(kansio) if kansio else SIVUSTO
        for nimi in sorted(os.listdir(hakemisto)):
            if not nimi.endswith(".html") or ohitetaanko(nimi):
                continue
            if not os.path.isfile(os.path.join(hakemisto, nimi)):
                continue
            if nimi in loydot:
                raise SystemExit(
                    f"VIRHE: {nimi} on sekä sivusto/- että sivusto/{LUONNOS}/-kansiossa"
                )
            loydot[nimi] = os.path.join(kansio, nimi) if kansio else nimi
    return loydot


def lue_tagi_nimet():
    """TAGI_NIMET search.js:stä — slug → näkyvä nimi. Yksi lähde tagien nimille."""
    teksti = lue(sivustopolku(f"{SKRIPTIT}/search.js"))
    lohko = re.search(r"const\s+TAGI_NIMET\s*=\s*\{(.*?)\}", teksti, re.S)
    if not lohko:
        raise SystemExit("VIRHE: TAGI_NIMET-taulua ei löytynyt search.js:stä")
    parit = re.findall(r"'([^']+)'\s*:\s*'([^']+)'", lohko.group(1))
    if not parit:
        raise SystemExit("VIRHE: TAGI_NIMET löytyi mutta on tyhjä")
    return dict(parit)


# ---------------------------------------------------------------- sivun luku


def on_noindex(soup):
    """robots-direktiivi tokeneina: sekä 'noindex' että 'noindex,nofollow' tunnistetaan."""
    meta = soup.find("meta", attrs={"name": re.compile(r"^robots$", re.I)})
    if not meta:
        return False
    sisalto = meta.get("content", "")
    return "noindex" in [t.strip().lower() for t in sisalto.split(",")]


def meta_sisalto(soup, nimi):
    meta = soup.find("meta", attrs={"name": nimi})
    if meta and meta.get("content"):
        return meta["content"].strip()
    return None


def poissuljettu(el):
    """navigation.js: el.closest('nav, footer, .tool-meta')"""
    for vanhempi in el.parents:
        if vanhempi.name in ("nav", "footer"):
            return True
        if "tool-meta" in (vanhempi.get("class") or []):
            return True
    return False


def laske_sanat(soup, valitsin):
    osumat = [el for el in soup.select(valitsin) if not poissuljettu(el)]
    teksti = " ".join(el.get_text() for el in osumat)
    return len([s for s in teksti.split() if s])


def laske_lukemisaika(soup):
    """Peilaa navigation.js:n laskentaa yksi yhteen."""
    tekstisanat = laske_sanat(soup, VALITSIN_TEKSTI)
    taulusanat = laske_sanat(soup, VALITSIN_TAULU)
    visuaalit = len([el for el in soup.select(VALITSIN_VISUAALI) if not poissuljettu(el)])

    sekunnit = (
        (tekstisanat / SANAT_MIN_TEKSTI) * 60
        + (taulusanat / SANAT_MIN_TAULU) * 60
        + visuaalit * SEK_PER_VISUAALI
    )
    return math.ceil(sekunnit / 60), tekstisanat, taulusanat, visuaalit


def lue_jsonld_paivat(soup):
    """(datePublished, dateModified) JSON-LD:stä.

    Skeematyyppi vaihtelee sivuittain — TechArticle sisältösivuilla, DefinedTermSet
    termistössä, AboutPage tietoa-sivulla. Siksi päivät poimitaan mistä tahansa
    solmusta joka ne tarjoaa, TechArticle etusijalla.
    """
    varalla = (None, None)
    for skripti in soup.find_all("script", type="application/ld+json"):
        if not skripti.string:
            continue
        try:
            data = json.loads(skripti.string)
        except json.JSONDecodeError:
            continue
        solmut = data.get("@graph", [data]) if isinstance(data, dict) else data
        for solmu in solmut:
            if not isinstance(solmu, dict):
                continue
            paivat = (solmu.get("datePublished"), solmu.get("dateModified"))
            if not any(paivat):
                continue
            if solmu.get("@type") == "TechArticle":
                return paivat
            if not any(varalla):
                varalla = paivat
    return varalla


def lue_sivu(slug, sivupolku, tagi_nimet):
    soup = BeautifulSoup(lue(sivustopolku(sivupolku)), "html.parser")

    otsikko_tag = soup.title.get_text().strip() if soup.title else ""
    otsikko_tag = re.sub(r"\s*\|\s*Datamalli\.fi\s*$", "", otsikko_tag)

    julkaistu = not on_noindex(soup)
    minuutit, tekstisanat, taulusanat, visuaalit = laske_lukemisaika(soup)
    julkaistu_pvm, muokattu_pvm = lue_jsonld_paivat(soup)

    tagit_raaka = meta_sisalto(soup, "tagit") or ""
    tagit = [t for t in tagit_raaka.replace(",", " ").split() if t]
    tuntemattomat = [t for t in tagit if t not in tagi_nimet]
    if tuntemattomat:
        raise SystemExit(
            f"VIRHE: {slug} käyttää tuntemattomia tageja: {', '.join(tuntemattomat)}\n"
            f"       Sallitut slugit (search.js TAGI_NIMET): {', '.join(sorted(tagi_nimet))}"
        )

    return {
        "slug": slug,
        "polku": sivupolku,
        "otsikko": meta_sisalto(soup, "kortti-otsikko") or otsikko_tag,
        "kuvaus": meta_sisalto(soup, "kortti-kuvaus") or meta_sisalto(soup, "description") or "",
        "tagit": tagit,
        "badge": meta_sisalto(soup, "kortti-badge"),
        "min": minuutit,
        "julkaistu": julkaistu,
        "paivitetty": muokattu_pvm,
        "julkaistu_pvm": julkaistu_pvm,
        # diagnostiikkaa --raportille
        "_kuvaus_meta": meta_sisalto(soup, "description"),
        "_lukemisaika_meta": meta_sisalto(soup, "lukemisaika"),
        "_sanat": (tekstisanat, taulusanat, visuaalit),
        "_kortti": slug not in EI_KORTTIA,
    }


def tarkista_sijainnit(sivut):
    """Julkaisutila ja kansio kertovat saman asian — jos ne eroavat, ajo pysähtyy.

    Ilman tätä keskeneräinen sivu voisi lipsahtaa deployattavaan sivusto/-juureen tai
    valmis sivu jäädä luonnoksiin näkymättömiin.
    """
    virheet = []
    for slug, sivu in sorted(sivut.items()):
        luonnoksissa = sivu["polku"].startswith(LUONNOS + os.sep)
        if sivu["julkaistu"] and luonnoksissa:
            virheet.append(
                f"  {sivu['polku']}: ei robots-noindexiä, joten sivu on julkaistu.\n"
                f"      Julkaise siirtämällä: git mv sivusto/{sivu['polku']} sivusto/{slug}"
            )
        elif not sivu["julkaistu"] and not luonnoksissa:
            virheet.append(
                f"  {sivu['polku']}: robots-noindex, joten sivu on keskeneräinen.\n"
                f"      Siirrä luonnoksiin: git mv sivusto/{slug} sivusto/{LUONNOS}/{slug}"
            )
    if virheet:
        raise SystemExit(
            "VIRHE: sivun julkaisutila ja sijainti ovat ristiriidassa.\n\n"
            + "\n".join(virheet)
        )


def kerää_sivut():
    tagi_nimet = lue_tagi_nimet()
    sivut = {
        slug: lue_sivu(slug, polku, tagi_nimet)
        for slug, polku in sivutiedostot().items()
    }
    tarkista_sijainnit(sivut)
    return sivut, tagi_nimet


# ---------------------------------------------------------------- generointi


def teksti_html(arvo):
    """Elementin sisältöteksti — & < > suojataan, muu jätetään koskematta."""
    return html.escape(arvo, quote=False)


def attr_html(arvo):
    return arvo.replace("&", "&amp;").replace('"', "&quot;")


def kortti_html(sivu, tagi_nimet, sisennys="      "):
    """Yksi kortti index.html:ään. Toistaa käsin kirjoitetun merkkauksen sellaisenaan."""
    s = sisennys
    tagit = list(sivu["tagit"])
    rivit = []

    if sivu["julkaistu"]:
        attrit = f' href="{sivu["slug"]}"'
        if tagit:
            attrit += f' data-tags="{" ".join(tagit)}"'
        rivit.append(f'{s}<a class="kortti"{attrit} data-min="{sivu["min"]}">')
        sulku = f"{s}</a>"
    else:
        # Keskeneräinen sivu: ei linkkiä, ei lukemisaikaa, kesken-tagi suodatusta varten
        rivit.append(f'{s}<div class="kortti kesken" data-tags="{" ".join(tagit + ["kesken"])}">')
        sulku = f"{s}</div>"

    if not sivu["julkaistu"]:
        rivit.append(f'{s}  <div class="kesken-badge">🚧 Tulossa</div>')
    elif sivu["badge"] == "uutuus":
        rivit.append(f'{s}  <div class="uutuus-badge">✨ Uutuus</div>')

    rivit.append(f'{s}  <strong>{teksti_html(sivu["otsikko"])}</strong>')
    rivit.append(f'{s}  <span>{teksti_html(sivu["kuvaus"])}</span>')

    if tagit:
        merkit = "".join(
            f'<span class="tagi">{teksti_html(tagi_nimet[t])}</span>' for t in tagit
        )
        rivit.append(f'{s}  <div class="kortti-tagit">{merkit}</div>')

    rivit.append(sulku)
    return "\n".join(rivit)


ALKU = "<!-- KORTIT:alku"
LOPPU = "<!-- KORTIT:loppu -->"

UUSIN_ALKU = "<!-- UUSIN:alku"
UUSIN_LOPPU = "<!-- UUSIN:loppu -->"

# Nostokortin selitteen enimmäispituus. Sama raja kuin termi-paivassa.js:n
# teaser()-funktiossa, jotta kolme vierekkäistä nostoa pysyy samankokoisena.
NOSTO_MERKIT = 170


def generoi_index(lahde, sivut, tagi_nimet):
    """Täyttää index.html:n KORTIT-markkerien välit .kortti-rivi:n data-kortit-listan mukaan."""
    rivit = lahde.split("\n")
    tulos, i = [], 0

    while i < len(rivit):
        rivi = rivit[i]
        tulos.append(rivi)

        osuma = re.search(r'<div class="kortti-rivi" data-kortit="([^"]*)"', rivi)
        if not osuma:
            i += 1
            continue

        # Ohita vanha generoitu sisältö markkerien välistä
        j = i + 1
        if ALKU not in rivit[j]:
            raise SystemExit(f"VIRHE: index.html rivi {i + 2}: KORTIT:alku-markkeri puuttuu")
        tulos.append(rivit[j])
        while LOPPU not in rivit[j]:
            j += 1

        for slug in osuma.group(1).split():
            if slug not in sivut:
                raise SystemExit(f"VIRHE: index.html viittaa sivuun {slug} jota ei ole")
            tulos.append(kortti_html(sivut[slug], tagi_nimet))

        tulos.append(rivit[j])
        i = j + 1

    return "\n".join(tulos)


def uusin_sivu(sivut):
    """Tuorein julkaistu sisältösivu — etusivun "Uusin juttu" -noston lähde.

    Järjestys tulee sivun omasta JSON-LD:stä: ensin datePublished, sitten
    dateModified. Samana päivänä julkaistut sivut eivät ole keskenään
    vertailtavissa, joten tasapelin ratkaisee aakkosjärjestys — sääntö saa olla
    mikä tahansa, kunhan tulos ei heilu ajojen välillä.
    """
    ehdokkaat = [
        s for s in sivut.values()
        if s["julkaistu"] and s["_kortti"] and s["julkaistu_pvm"]
    ]
    if not ehdokkaat:
        raise SystemExit(
            "VIRHE: yhdelläkään julkaistulla sivulla ei ole JSON-LD:n datePublished-päivää,\n"
            "       joten etusivun Uusin juttu -nostoa ei voi valita."
        )
    ehdokkaat.sort(key=lambda s: s["slug"])
    ehdokkaat.sort(key=lambda s: (s["julkaistu_pvm"], s["paivitetty"] or ""), reverse=True)
    return ehdokkaat[0]


def pvm_fi(iso):
    """2026-08-03 → 3.8.2026"""
    v, k, p = iso.split("-")
    return f"{int(p)}.{int(k)}.{v}"


def tiivista(teksti, raja=NOSTO_MERKIT):
    if len(teksti) <= raja:
        return teksti
    return re.sub(r"\s+\S*$", "", teksti[: raja - 3]) + "…"


def uusin_html(sivu, sisennys="    "):
    """Etusivun "Uusin juttu" -nosto. Sama rakenne kuin termi-paivassa.js:n korteilla."""
    s = sisennys
    meta = f'{pvm_fi(sivu["julkaistu_pvm"])} · {sivu["min"]} min'
    return "\n".join([
        f'{s}<div class="tp-solu">',
        f'{s}  <div class="tp-otsikko">Uusin juttu</div>',
        f'{s}  <a class="tp-termi tp-uusin" href="{sivu["slug"]}">',
        f'{s}    <strong>{teksti_html(sivu["otsikko"])}</strong>',
        f'{s}    <span class="tp-selite">{teksti_html(tiivista(sivu["kuvaus"]))}</span>',
        f'{s}    <span class="tp-linkki">Lue juttu → <span class="tp-nosto-meta">{meta}</span></span>',
        f"{s}  </a>",
        f"{s}</div>",
    ])


def generoi_uusin(lahde, sivu):
    """Täyttää index.html:n UUSIN-markkerien välin tuoreimmalla sivulla."""
    rivit = lahde.split("\n")
    for i, rivi in enumerate(rivit):
        if UUSIN_ALKU not in rivi:
            continue
        j = i + 1
        while j < len(rivit) and UUSIN_LOPPU not in rivit[j]:
            j += 1
        if j == len(rivit):
            raise SystemExit("VIRHE: index.html:n UUSIN:loppu-markkeri puuttuu")
        return "\n".join(rivit[: i + 1] + [uusin_html(sivu)] + rivit[j:])
    raise SystemExit("VIRHE: index.html:stä ei löytynyt UUSIN:alku-markkeria")


def generoi_sivut_js(sivut, tagi_nimet):
    rivit = [
        "// GENEROITU TIEDOSTO — älä muokkaa käsin.",
        "// Lähde: sivujen <head>-metatiedot (kortti-otsikko, kortti-kuvaus, tagit, robots).",
        "// Päivitä ajamalla: python3 tyokalut/rakenna.py",
        "",
        "window.SIVUSTO_TAGIT = " + json.dumps(tagi_nimet, ensure_ascii=False, sort_keys=True) + ";",
        "",
        "window.SIVUT = {",
    ]
    korttisivut = [s for s in sivut.values() if s["_kortti"]]
    for sivu in sorted(korttisivut, key=lambda s: s["slug"]):
        arvo = {
            "otsikko": sivu["otsikko"],
            "kuvaus": sivu["kuvaus"],
            "tagit": sivu["tagit"],
            "min": sivu["min"],
            "julkaistu": sivu["julkaistu"],
            "badge": sivu["badge"],
        }
        rivit.append(
            f'  {json.dumps(sivu["slug"])}: '
            + json.dumps(arvo, ensure_ascii=False)
            + ","
        )
    rivit.append("};")
    rivit.append("")
    return "\n".join(rivit)


def generoi_sitemap(sivut, vanhat_lastmod):
    rivit = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        "<!-- GENEROITU: python3 tyokalut/rakenna.py — älä muokkaa käsin.",
        "     Mukana vain sivut joilla EI ole robots-noindexiä. -->",
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    def lisaa(url, lastmod):
        rivit.append("  <url>")
        rivit.append(f"    <loc>{url}</loc>")
        rivit.append(f"    <lastmod>{lastmod}</lastmod>")
        rivit.append("  </url>")

    tanaan = date.today().isoformat()
    for slug in sorted(sivut):
        sivu = sivut[slug]
        if not sivu["julkaistu"]:
            continue
        url = f"{DOMAIN}/" if slug == "index.html" else f"{DOMAIN}/{slug}"
        lisaa(url, sivu["paivitetty"] or vanhat_lastmod.get(url) or tanaan)

    rivit.append("</urlset>")
    rivit.append("")
    return "\n".join(rivit)


def lue_vanhat_lastmod():
    polku = sivustopolku("sitemap.xml")
    if not os.path.exists(polku):
        return {}
    teksti = lue(polku)
    return dict(
        re.findall(r"<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>", teksti)
    )


def uusin_paivitys():
    """paivitykset.html:n tuorein merkintä muodossa P.K.VVVV."""
    soup = BeautifulSoup(lue(sivustopolku("paivitykset.html")), "html.parser")
    paivat = []
    for merkinta in soup.select("div.paivitys-merkinta > h2"):
        osuma = re.match(r"\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$", merkinta.get_text())
        if osuma:
            p, k, v = (int(x) for x in osuma.groups())
            paivat.append((date(v, k, p), merkinta.get_text().strip()))
    if not paivat:
        raise SystemExit("VIRHE: paivitykset.html:stä ei löytynyt yhtään päivämäärämerkintää")
    return max(paivat)[1]


def aseta_lukemisaika(lahde, minuutit):
    """Lisää tai päivittää <meta name="lukemisaika"> — säilyttää muun muotoilun."""
    uusi = f'  <meta name="lukemisaika" content="{minuutit}">'
    if re.search(r'^  <meta name="lukemisaika" content="\d+">$', lahde, re.M):
        return re.sub(r'^  <meta name="lukemisaika" content="\d+">$', uusi, lahde, count=1, flags=re.M)

    # Korttitietolohkon perään jos sellainen on, muuten viewport-rivin perään
    rivit = lahde.split("\n")
    ankkuri = None
    for i, rivi in enumerate(rivit):
        if "Korttitiedot:" in rivi:
            ankkuri = i
            while ankkuri + 1 < len(rivit) and re.match(
                r'^  <meta name="(kortti-|tagit)', rivit[ankkuri + 1]
            ):
                ankkuri += 1
            break
    if ankkuri is None:
        for i, rivi in enumerate(rivit):
            if rivi.startswith('  <meta name="viewport"'):
                ankkuri = i
                break
    if ankkuri is None:
        raise SystemExit("VIRHE: lukemisaika-metalle ei löydy ankkuria")

    rivit.insert(ankkuri + 1, uusi)
    return "\n".join(rivit)


def varmista_korttiskriptit(sivu, lahde):
    """Katso myös -osio ei renderöidy ilman sivut.js:ää ja kortit.js:ää.

    Kumpikin puuttuva skriptitagi lisätään automaattisesti, jotta osion voi lisätä
    sivulle pelkällä placeholderilla. Järjestyksellä on väliä: defer-skriptit ajetaan
    dokumenttijärjestyksessä, ja kortit.js tarvitsee sivut.js:n window.SIVUT:n.

    Polkuprefiksi tulee sivun sijainnista: sivuston juuressa suhteellinen
    (skriptit/…), luonnoksissa juurisuhteellinen (/skriptit/…).

    index.html on poikkeus — sen kortit generoidaan staattiseksi HTML:ksi.
    """
    if sivu["slug"] == "index.html" or "data-kortit" not in lahde:
        return lahde

    etuliite = f"/{SKRIPTIT}/" if sivu["polku"].startswith(LUONNOS + os.sep) else f"{SKRIPTIT}/"
    sivut_tagi = f'  <script src="{etuliite}sivut.js?v=1" defer></script>'
    kortit_tagi = f'  <script src="{etuliite}kortit.js?v=2" defer></script>'

    if "kortit.js" not in lahde:
        lahde = re.sub(
            r'^(  <script src="/?skriptit/navigation\.js[^"]*" defer></script>)$',
            r"\1\n" + sivut_tagi + "\n" + kortit_tagi,
            lahde,
            count=1,
            flags=re.M,
        )
    elif "sivut.js" not in lahde:
        lahde = re.sub(
            r'^(  <script src="/?skriptit/kortit\.js[^"]*" defer></script>)$',
            sivut_tagi + r"\n\1",
            lahde,
            count=1,
            flags=re.M,
        )
    return lahde


def aseta_paivitetty(lahde, pvm):
    return re.sub(
        r"(const SIVUSTO_PAIVITETTY = ')[^']*(';)",
        lambda m: m.group(1) + pvm + m.group(2),
        lahde,
        count=1,
    )


def generoi_kaikki(sivut, tagi_nimet):
    """Palauttaa {polku: uusi sisältö} — sama tulos ajettiin sitten kirjoitus- tai tarkistustilassa.

    Avaimet ovat sivusto/-kansion sisäisiä polkuja.
    """
    tiedostot = {}

    index_uusi = generoi_uusin(
        generoi_index(lue(sivustopolku("index.html")), sivut, tagi_nimet),
        uusin_sivu(sivut),
    )

    for slug, sivu in sivut.items():
        lahde = index_uusi if slug == "index.html" else lue(sivustopolku(sivu["polku"]))
        # index.html:n sanamäärä lasketaan vasta generoiduista korteista
        minuutit = (
            laske_lukemisaika(BeautifulSoup(lahde, "html.parser"))[0]
            if slug == "index.html"
            else sivu["min"]
        )
        tiedostot[sivu["polku"]] = varmista_korttiskriptit(
            sivu, aseta_lukemisaika(lahde, minuutit)
        )

    tiedostot[f"{SKRIPTIT}/sivut.js"] = generoi_sivut_js(sivut, tagi_nimet)
    tiedostot["sitemap.xml"] = generoi_sitemap(sivut, lue_vanhat_lastmod())
    tiedostot[f"{SKRIPTIT}/navigation.js"] = aseta_paivitetty(
        lue(sivustopolku(f"{SKRIPTIT}/navigation.js")), uusin_paivitys()
    )
    return tiedostot


# ---------------------------------------------------------------- raportit


def vertaa_nykyisiin(sivut):
    """Vertaa laskettua lukemisaikaa nykyisiin käsin ylläpidettyihin arvoihin.

    Käytössä ennen migraatiota: paljastaa mitkä kortit ovat päässeet epäsynkkaan.
    """
    idx = BeautifulSoup(lue(sivustopolku("index.html")), "html.parser")
    index_min = {
        a["href"]: int(a["data-min"]) for a in idx.select("a.kortti[data-min][href]")
    }
    kortit_teksti = lue(sivustopolku(f"{SKRIPTIT}/kortit.js"))
    kortit_min = {
        m.group(1): int(m.group(2))
        for m in re.finditer(r"'([\w\-.]+\.html)':\s*\{.*?min:\s*(\d+)", kortit_teksti, re.S)
    }

    rivit = []
    for slug in sorted(set(index_min) | set(kortit_min)):
        if slug not in sivut:
            rivit.append((slug, None, index_min.get(slug), kortit_min.get(slug), "EI TIEDOSTOA"))
            continue
        laskettu = sivut[slug]["min"]
        i, k = index_min.get(slug), kortit_min.get(slug)
        arvot = {v for v in (laskettu, i, k) if v is not None}
        rivit.append((slug, laskettu, i, k, "ok" if len(arvot) == 1 else "ERI"))
    return rivit


def aja_raportti(sivut):
    print("== Lukemisajat: laskettu vs. nykyiset käsin ylläpidetyt arvot ==\n")
    print(f"{'sivu':<38}{'laskettu':>9}{'index':>7}{'kortit':>8}   tila")
    print("-" * 76)
    eroja = 0
    for slug, laskettu, i, k, tila in vertaa_nykyisiin(sivut):
        if tila == "ERI":
            eroja += 1
        print(f"{slug:<38}{str(laskettu):>9}{str(i):>7}{str(k):>8}   {tila}")
    print(f"\nEroja: {eroja}\n")

    print("== Metatietojen laatu ==\n")
    varoituksia = 0
    for slug, s in sorted(sivut.items()):
        puutteet = []
        if not s["_kuvaus_meta"]:
            puutteet.append("description puuttuu")
        if s["julkaistu"] and not s["paivitetty"] and slug not in EI_KORTTIA:
            puutteet.append("dateModified puuttuu (julkaistu sivu)")
        if s["_kortti"] and not s["tagit"]:
            puutteet.append("tagit puuttuvat")
        if puutteet:
            varoituksia += 1
            print(f"  {slug}: {'; '.join(puutteet)}")
    if not varoituksia:
        print("  (ei puutteita)")

    print("\n== Julkaisutila ==\n")
    julkaistut = sorted(s for s, d in sivut.items() if d["julkaistu"])
    keskenerä = sorted(s for s, d in sivut.items() if not d["julkaistu"])
    print(f"  Julkaistuja: {len(julkaistut)}")
    print(f"  Keskeneräisiä (noindex): {len(keskenerä)}")
    for slug in keskenerä:
        print(f"    - {slug}")

    print("\n== Hakuindeksi (search-index.js) ==\n")
    hakuindeksi = lue(sivustopolku(f"{SKRIPTIT}/search-index.js"))
    puuttuvat = [
        slug
        for slug, s in sorted(sivut.items())
        if s["julkaistu"] and s["_kortti"] and f"'{slug}'" not in hakuindeksi
    ]
    if puuttuvat:
        for slug in puuttuvat:
            print(f"  PUUTTUU: {slug}")
    else:
        print("  (kaikki julkaistut sivut indeksoitu)")
    return eroja


# ---------------------------------------------------------------- main


def main():
    parser = argparse.ArgumentParser(description="datamalli.fi metatietogeneraattori")
    parser.add_argument("--tarkista", action="store_true", help="ei kirjoita; exit 1 jos vanhentunut")
    parser.add_argument("--raportti", action="store_true", help="metatietojen laatuvaroitukset")
    argumentit = parser.parse_args()

    sivut, tagi_nimet = kerää_sivut()

    if argumentit.raportti:
        aja_raportti(sivut)
        return 0

    tiedostot = generoi_kaikki(sivut, tagi_nimet)
    muuttuneet = []
    for nimi, uusi in sorted(tiedostot.items()):
        polku = sivustopolku(nimi)
        vanha = lue(polku) if os.path.exists(polku) else None
        if vanha != uusi:
            muuttuneet.append(nimi)
            if not argumentit.tarkista:
                kirjoita(polku, uusi)

    if argumentit.tarkista:
        if muuttuneet:
            print("Generoidut tiedostot ovat vanhentuneet:\n")
            for nimi in muuttuneet:
                print(f"  - {nimi}")
            print("\nAja: python3 tyokalut/rakenna.py")
            return 1
        print(f"Kaikki ajan tasalla ({len(tiedostot)} tiedostoa tarkistettu).")
        return 0

    if muuttuneet:
        print(f"Kirjoitettu {len(muuttuneet)} tiedostoa:\n")
        for nimi in muuttuneet:
            print(f"  - {nimi}")
    else:
        print("Ei muutoksia — kaikki oli jo ajan tasalla.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
