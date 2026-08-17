#!/usr/bin/env python3
"""datamalli.fi — paikallinen esikatselu.

Luonnossivut käyttävät juurisuhteellisia polkuja (/tyylit/style.css,
/skriptit/navigation.js), koska silloin julkaiseminen on pelkkä siirto
luonnos/-kansiosta sivuston juureen eikä yhtäkään polkua tarvitse korjata.
Hinta on se, että sivu toimii vain kun se tarjoillaan sivusto/-kansion
juuresta: file://-osoitteesta tai repon juuresta tarjoiltuna selain hakee
tyylit levyn juuresta eikä löydä mitään, jolloin sivu näkyy tyylittömänä.

Tämä skripti käynnistää palvelimen oikeasta juuresta ja avaa selaimen
suoraan pyydettyyn sivuun.

Käyttö:
    python3 tyokalut/esikatsele.py                      # etusivu
    python3 tyokalut/esikatsele.py data-vault           # luonnos tai julkaistu, päättelee kummasta
    python3 tyokalut/esikatsele.py luonnos              # lista kaikista luonnoksista
    python3 tyokalut/esikatsele.py --portti 8001
    python3 tyokalut/esikatsele.py --ei-selainta        # tulosta vain osoite

Lopeta Ctrl+C.
"""

import argparse
import functools
import http.server
import os
import shutil
import socket
import subprocess
import sys
import threading
import webbrowser

JUURI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIVUSTO = os.path.join(JUURI, "sivusto")
LUONNOS = "luonnos"

OLETUSPORTTI = 8000

# WSL:ssä webbrowser-moduuli ei löydä selainta, joten avataan Windowsin puolen selain
# suoraan. Sama lista kuin renderoi-kaaviot.py:ssä.
WIN_SELAIMET = [
    "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe",
]


def on_wsl():
    return "microsoft" in os.uname().release.lower()


def avaa_selain(url):
    """Avaa URL selaimeen. Palauttaa False jos selainta ei löytynyt."""
    if on_wsl():
        for polku in WIN_SELAIMET:
            if os.path.exists(polku):
                subprocess.Popen([polku, url],
                                 stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return True
        # Ei Chromea/Edgeä — annetaan Windowsin oletusselaimen hoitaa.
        if shutil.which("wslview"):
            subprocess.Popen(["wslview", url],
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return True
        if os.path.exists("/mnt/c/Windows/explorer.exe"):
            # explorer.exe palauttaa aina nollasta poikkeavan koodin, se ei ole virhe.
            subprocess.Popen(["/mnt/c/Windows/explorer.exe", url],
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return True
        return False
    return webbrowser.open(url)


def luonnokset():
    kansio = os.path.join(SIVUSTO, LUONNOS)
    if not os.path.isdir(kansio):
        return []
    return sorted(t for t in os.listdir(kansio) if t.endswith(".html"))


def ratkaise_polku(arvo):
    """Muuntaa käyttäjän antaman sivun URL-poluksi sivuston juuresta.

    Hyväksyy monta muotoa, koska sivun nimi tulee yleensä kopioituna jostain:
    'data-vault', 'data-vault.html', 'luonnos/data-vault.html' ja
    'sivusto/luonnos/data-vault.html' tarkoittavat kaikki samaa.
    """
    if not arvo:
        return "/index.html"

    nimi = arvo.strip().lstrip("/")
    for etuliite in ("sivusto/", "./"):
        if nimi.startswith(etuliite):
            nimi = nimi[len(etuliite):]

    # Pelkkä kansio: annetaan palvelimen tiedostolistauksen hoitaa.
    if nimi in (LUONNOS, LUONNOS + "/"):
        return f"/{LUONNOS}/"

    if not nimi.endswith(".html"):
        nimi += ".html"

    # Julkaistu sivu ja luonnos voivat molemmat olla olemassa vain hetken (kesken
    # julkaisun), muuten nimi osuu tasan yhteen. Juuri voittaa, koska se on julkaistu.
    for suhteellinen in (nimi, f"{LUONNOS}/{os.path.basename(nimi)}"):
        if os.path.isfile(os.path.join(SIVUSTO, suhteellinen)):
            return "/" + suhteellinen

    ehdotukset = [t[:-5] for t in luonnokset()]
    sys.exit(f"Sivua '{arvo}' ei löydy kansiosta sivusto/ eikä sivusto/{LUONNOS}/.\n"
             f"Luonnokset: {', '.join(ehdotukset) or '(ei yhtään)'}")


def vapaa_portti(toivottu):
    """Palauttaa toivotun portin, tai seuraavan vapaan jos se on varattu."""
    for portti in range(toivottu, toivottu + 20):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(("127.0.0.1", portti))
                return portti
            except OSError:
                continue
    sys.exit(f"Vapaata porttia ei löytynyt väliltä {toivottu}–{toivottu + 19}.")


class Kasittelija(http.server.SimpleHTTPRequestHandler):
    """Tarjoilee sivusto/-kansiosta ilman välimuistia.

    Ilman no-store-otsikkoa selain näyttää muokatun CSS:n tai JS:n vanhana, koska
    style.css?v=8 -tyyppinen versiointi ei muutu kesken työskentelyn.
    """

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, muoto, *argumentit):
        # Oletusloki tulostaa jokaisen kuvan ja fontin; näytetään vain virheet.
        koodi = argumentit[1] if len(argumentit) > 1 else ""
        if str(koodi).startswith(("4", "5")):
            sys.stderr.write(f"  {koodi}  {argumentit[0]}\n")


def main():
    jasennin = argparse.ArgumentParser(
        description="Käynnistää paikallisen palvelimen sivusto/-kansion juuresta.")
    jasennin.add_argument("sivu", nargs="?", default="",
                          help="sivun nimi, esim. data-vault tai luonnos/data-vault.html")
    jasennin.add_argument("--portti", type=int, default=OLETUSPORTTI)
    jasennin.add_argument("--ei-selainta", action="store_true",
                          help="älä avaa selainta, tulosta vain osoite")
    args = jasennin.parse_args()

    # Ilman tätä osoiterivi jää puskuriin kun skripti ajetaan VS Coden tehtävänä
    # tai putken läpi — silloin ruudulla ei näy mitään ennen Ctrl+C:tä.
    sys.stdout.reconfigure(line_buffering=True)

    if not os.path.isdir(SIVUSTO):
        sys.exit(f"Kansiota ei löydy: {SIVUSTO}")

    polku = ratkaise_polku(args.sivu)
    portti = vapaa_portti(args.portti)
    url = f"http://localhost:{portti}{polku}"

    palvelin = http.server.ThreadingHTTPServer(
        ("127.0.0.1", portti),
        functools.partial(Kasittelija, directory=SIVUSTO))
    threading.Thread(target=palvelin.serve_forever, daemon=True).start()

    print(f"Juuri:  {SIVUSTO}")
    print(f"Avaa:   {url}")
    if polku != f"/{LUONNOS}/":
        print(f"Luonnokset: http://localhost:{portti}/{LUONNOS}/")
    if portti != args.portti:
        print(f"(portti {args.portti} oli varattu)")

    if not args.ei_selainta and not avaa_selain(url):
        print("Selainta ei löytynyt — avaa osoite käsin.")

    print("\nLopeta Ctrl+C.")
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        print("\nPalvelin suljettu.")
        palvelin.shutdown()


if __name__ == "__main__":
    main()
