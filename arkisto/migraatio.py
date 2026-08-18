#!/usr/bin/env python3
"""
KERTALUONTOINEN migraatio: siirtää korttien metatiedot index.html:stä ja kortit.js:stä
sivujen omiin <head>-osioihin.

Arvot kopioidaan sellaisinaan, jotta etusivun ja "Katso myös" -korttien ulkoasu ei muutu.
Ajon jälkeen tämän skriptin voi poistaa — lähde on sivuissa.

    python3 tyokalut/migraatio.py --kuivaharjoitus   näyttää mitä tehtäisiin
    python3 tyokalut/migraatio.py                    kirjoittaa muutokset
"""

import argparse
import os
import re
import sys

from bs4 import BeautifulSoup

JUURI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Etusivun keskeneräiset kortit ovat <div>-elementtejä ilman href:iä, joten niitä ei voi
# yhdistää sivuun automaattisesti. Tämä kartta on kertaluontoinen ja käsin tarkistettu.
KESKEN_KARTTA = {
    "Header-Detail-malli": "header-detail.html",
    "Useamman faktataulun malli": "useampi-fakta.html",
    "Data Governance": "data-governance.html",
    "Data Contract": "data-contract.html",
    "Milloin käyttää mitäkin mallia": "arkkitehtuurivalinta.html",
    "Data Vault": "data-vault.html",
    "Medallion-arkkitehtuuri": "medallion.html",
    "ETL ja ELT": "etl-elt.html",
}

VIEWPORT = '  <meta name="viewport" content="width=device-width, initial-scale=1">'


def lue(polku):
    with open(polku, encoding="utf-8") as f:
        return f.read()


def kirjoita(polku, sisalto):
    with open(polku, "w", encoding="utf-8") as f:
        f.write(sisalto)


def suojaa(arvo):
    """Attribuuttiarvon suojaus — vain & ja ", jotta teksti pysyy muuten koskemattomana."""
    return arvo.replace("&", "&amp;").replace('"', "&quot;")


def kortit_index():
    """Etusivun korttien metatiedot slugeittain + kategoriarakenne järjestyksessä."""
    soup = BeautifulSoup(lue(os.path.join(JUURI, "index.html")), "html.parser")
    kortit, kategoriat = {}, []

    for kategoria in soup.select("div.kategoria"):
        otsikko = kategoria.find("h2").get_text().strip()
        slugit = []
        for kortti in kategoria.select(".kortti"):
            nimi = kortti.find("strong").get_text().strip()
            slug = kortti.get("href") or KESKEN_KARTTA.get(nimi)
            if not slug:
                raise SystemExit(f"VIRHE: kortille '{nimi}' ei löydy sivua (lisää KESKEN_KARTTA:an)")
            tagit = [t for t in (kortti.get("data-tags") or "").split() if t != "kesken"]
            badge = None
            if kortti.select_one(".uutuus-badge"):
                badge = "uutuus"
            kortit[slug] = {
                "otsikko": nimi,
                "kuvaus": kortti.find("span").get_text().strip(),
                "tagit": tagit,
                "badge": badge,
            }
            slugit.append(slug)
        kategoriat.append((otsikko, slugit))
    return kortit, kategoriat


def kortit_js():
    """kortit.js:n window.KORTIT-taulukko — sivuille joita ei ole etusivulla."""
    teksti = lue(os.path.join(JUURI, "kortit.js"))
    tulos = {}
    for lohko in re.finditer(
        r"'([\w\-.]+\.html)':\s*\{(.*?)\n  \}", teksti, re.S
    ):
        slug, sisalto = lohko.group(1), lohko.group(2)
        otsikko = re.search(r"otsikko:\s*'((?:[^'\\]|\\.)*)'", sisalto)
        kuvaus = re.search(r"kuvaus:\s*'((?:[^'\\]|\\.)*)'", sisalto)
        tagit = re.search(r"tagit:\s*\[(.*?)\]", sisalto, re.S)
        tulos[slug] = {
            "otsikko": otsikko.group(1).replace("\\'", "'") if otsikko else "",
            "kuvaus": kuvaus.group(1).replace("\\'", "'") if kuvaus else "",
            "tagit_nimet": re.findall(r"'([^']+)'", tagit.group(1)) if tagit else [],
            "badge": None,
        }
    return tulos


def tagi_slugit():
    """Näkyvä nimi → slug, käänteinen search.js:n TAGI_NIMET-taulusta."""
    teksti = lue(os.path.join(JUURI, "search.js"))
    lohko = re.search(r"const\s+TAGI_NIMET\s*=\s*\{(.*?)\}", teksti, re.S)
    return {nimi: slug for slug, nimi in re.findall(r"'([^']+)'\s*:\s*'([^']+)'", lohko.group(1))}


def rakenna_lohko(data):
    rivit = [
        '  <!-- Korttitiedot: etusivun ja "Katso myös" -korttien lähde -->',
        f'  <meta name="kortti-otsikko" content="{suojaa(data["otsikko"])}">',
        f'  <meta name="kortti-kuvaus" content="{suojaa(data["kuvaus"])}">',
    ]
    if data["tagit"]:
        rivit.append(f'  <meta name="tagit" content="{" ".join(data["tagit"])}">')
    if data.get("badge"):
        rivit.append(f'  <meta name="kortti-badge" content="{data["badge"]}">')
    return "\n".join(rivit)


def lisaa_metat(slug, data, kuivaharjoitus):
    polku = os.path.join(JUURI, slug)
    teksti = lue(polku)

    if 'name="kortti-otsikko"' in teksti:
        return "jo tehty"
    if VIEWPORT not in teksti:
        return "VIRHE: viewport-ankkuria ei löydy"

    uusi = teksti.replace(VIEWPORT, VIEWPORT + "\n" + rakenna_lohko(data), 1)
    if not kuivaharjoitus:
        kirjoita(polku, uusi)
    return "lisätty"


RIVI_AUKI = '    <div class="kortti-rivi">'
RIVI_KIINNI = "    </div>"


def paivita_index(kategoriat, kuivaharjoitus):
    """Korvaa index.html:n käsin kirjoitetut kortit slug-listalla ja generointimarkkereilla.

    Rivipohjainen korvaus, koska bs4:llä kirjoittaminen muotoilisi koko tiedoston uusiksi.
    Rakenne on säännöllinen: .kortti-rivi avautuu 4 välilyönnin sisennyksellä ja sulkeutuu
    samalla sisennyksellä.
    """
    polku = os.path.join(JUURI, "index.html")
    rivit = lue(polku).split("\n")

    if any("KORTIT:alku" in r for r in rivit):
        return "jo tehty"

    tulos, i, kategoria_nro = [], 0, 0
    while i < len(rivit):
        if rivit[i] == RIVI_AUKI:
            loppu = i + 1
            while rivit[loppu] != RIVI_KIINNI:
                loppu += 1
            slugit = kategoriat[kategoria_nro][1]
            tulos.append(f'    <div class="kortti-rivi" data-kortit="{" ".join(slugit)}">')
            tulos.append("      <!-- KORTIT:alku — generoitu, älä muokkaa käsin -->")
            tulos.append("      <!-- KORTIT:loppu -->")
            tulos.append(RIVI_KIINNI)
            kategoria_nro += 1
            i = loppu + 1
            continue
        tulos.append(rivit[i])
        i += 1

    if kategoria_nro != len(kategoriat):
        raise SystemExit(
            f"VIRHE: löytyi {kategoria_nro} kortti-riviä mutta {len(kategoriat)} kategoriaa"
        )

    if not kuivaharjoitus:
        kirjoita(polku, "\n".join(tulos))
    return f"{kategoria_nro} kategoriaa"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--kuivaharjoitus", action="store_true")
    argumentit = parser.parse_args()

    index_kortit, kategoriat = kortit_index()
    js_kortit = kortit_js()
    nimi_slug = tagi_slugit()

    # Etusivu on ensisijainen lähde; kortit.js täydentää sivut joita etusivulla ei ole.
    kaikki = dict(index_kortit)
    for slug, data in js_kortit.items():
        if slug in kaikki:
            continue
        tuntemattomat = [n for n in data["tagit_nimet"] if n not in nimi_slug]
        if tuntemattomat:
            raise SystemExit(f"VIRHE: {slug} — tuntemattomat tagit {tuntemattomat}")
        kaikki[slug] = {
            "otsikko": data["otsikko"],
            "kuvaus": data["kuvaus"],
            "tagit": [nimi_slug[n] for n in data["tagit_nimet"]],
            "badge": None,
        }

    print(f"Kortteja yhteensä: {len(kaikki)} "
          f"(etusivulta {len(index_kortit)}, kortit.js:stä {len(kaikki) - len(index_kortit)})\n")

    for slug in sorted(kaikki):
        tila = lisaa_metat(slug, kaikki[slug], argumentit.kuivaharjoitus)
        print(f"  {tila:<10} {slug}")

    print(f"\n== index.html: {paivita_index(kategoriat, argumentit.kuivaharjoitus)} ==")
    for otsikko, slugit in kategoriat:
        print(f"\n  {otsikko}")
        for s in slugit:
            print(f"    {s}")

    puuttuvat = [
        n for n in os.listdir(JUURI)
        if n.endswith(".html") and n not in kaikki
        and n not in {"index.html", "sivupohja.html", "paivitykset.html", "tietosuoja.html"}
    ]
    if puuttuvat:
        print("\n== Ilman korttitietoja (fallback <title>/description hoitaa) ==")
        for n in sorted(puuttuvat):
            print(f"  {n}")

    if argumentit.kuivaharjoitus:
        print("\n(kuivaharjoitus — mitään ei kirjoitettu)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
