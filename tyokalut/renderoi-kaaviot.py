#!/usr/bin/env python3
"""Renderöi Mermaid-kaaviot staattisiksi SVG:iksi ja upottaa ne sivuille.

Sivut eivät lataa mermaid.min.js:ää (3,5 MB) selaimeen lainkaan — kaaviot ovat
valmiiksi renderöityä SVG:tä HTML:n sisällä. Kirjastoa käytetään vain täällä,
build-vaiheessa.

Lähteet ovat tyokalut/kaaviot/*.mmd. KAAVIOT-taulu kertoo mihin sivulle kukin
menee. SVG upotetaan sivun <figure>-elementtiin merkkien väliin:

    <!-- KAAVIO:alku nimi --> ... <!-- KAAVIO:loppu -->

Renderöinti vaatii Chromen. WSL:ssä Playwright/puppeteer-chromium ei käynnisty
(libnspr4 puuttuu), joten käytetään Windows-puolen Chromea. --headless=old on
tarkoituksellinen: uusi headless ei odota --virtual-time-budgetia --dump-domin
kanssa, jolloin asynkroninen mermaid.render() ei ehdi valmistua.

Käyttö:
    python3 tyokalut/renderoi-kaaviot.py            # renderöi ja päivittää sivut
    python3 tyokalut/renderoi-kaaviot.py --tarkista # exit 1 jos sivut ovat vanhentuneet
"""

import argparse
import hashlib
import html
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

JUURI = pathlib.Path(__file__).resolve().parent.parent
SIVUSTO = JUURI / 'sivusto'
KAAVIOHAKEMISTO = JUURI / 'tyokalut' / 'kaaviot'
MERMAID = JUURI / 'tyokalut' / 'mermaid.min.js'

# kaavion nimi (= .mmd-tiedosto) -> sivu johon se upotetaan (polku sivusto/-kansiosta)
KAAVIOT = {
    'avaimet': 'avaimet-ja-relaatiot.html',
    'litistaminen': 'litistaminen.html',
}

# Sama teema kuin sivuston muussa ulkoasussa. htmlLabels: false on olennainen —
# muuten mermaid tekee labeleista <foreignObject>-HTML:ää, jolloin kaavion teksti
# ei ole koneluettavaa eikä SVG toimi itsenäisenä tiedostona.
ASETUKSET = {
    'startOnLoad': False,
    'htmlLabels': False,
    'flowchart': {'htmlLabels': False},
    'theme': 'base',
    'themeVariables': {
        'primaryColor': '#eaf2ec',
        'primaryTextColor': '#1a2218',
        'primaryBorderColor': '#015E38',
        'lineColor': '#4a5e48',
        'secondaryColor': '#f6f8f6',
        'tertiaryColor': '#f6f8f6',
        'fontFamily': '"DM Sans", system-ui, sans-serif',
        'fontSize': '13px',
    },
}

CHROME_POLUT = [
    '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
    '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe',
]


def etsi_chrome():
    for polku in CHROME_POLUT:
        if os.path.exists(polku):
            return polku
    oma = shutil.which('google-chrome') or shutil.which('chromium')
    if oma:
        return oma
    sys.exit('Chromea ei löytynyt. Tarkista CHROME_POLUT.')


def windows_temp():
    """Chrome.exe ei näe /home-polkuja, joten työhakemisto on Windowsin puolella."""
    juuri = pathlib.Path('/mnt/c/temp')
    juuri.mkdir(parents=True, exist_ok=True)
    return pathlib.Path(tempfile.mkdtemp(prefix='kaaviot-', dir=juuri))


def renderoi(lahteet):
    """Palauttaa {nimi: svg} ajamalla mermaidin headless-Chromessa."""
    chrome = etsi_chrome()
    tyohakemisto = windows_temp()
    try:
        shutil.copy(MERMAID, tyohakemisto / 'mermaid.min.js')
        sivu = tyohakemisto / 'render.html'
        sivu.write_text(f'''<!DOCTYPE html><html><head><meta charset="UTF-8">
<script src="mermaid.min.js"></script></head><body><div id="ulos"></div><script>
const KAAVIOT = {json.dumps(lahteet, ensure_ascii=False)};
mermaid.initialize({json.dumps(ASETUKSET, ensure_ascii=False)});
(async () => {{
  const ulos = document.getElementById('ulos');
  for (const [nimi, koodi] of Object.entries(KAAVIOT)) {{
    const laatikko = document.createElement('div');
    laatikko.className = 'tulos';
    laatikko.setAttribute('data-nimi', nimi);
    try {{
      const {{ svg }} = await mermaid.render('kaavio-' + nimi, koodi);
      laatikko.textContent = svg;
    }} catch (e) {{
      laatikko.textContent = 'VIRHE: ' + e.message;
    }}
    ulos.appendChild(laatikko);
  }}
}})();
</script></body></html>''', encoding='utf-8')

        # /mnt/c/temp/kaaviot-x/render.html -> file:///C:/temp/kaaviot-x/render.html
        win_polku = 'file:///C:/' + '/'.join(sivu.parts[3:])
        tulos = subprocess.run(
            [chrome, '--headless=old', '--disable-gpu', '--no-sandbox',
             '--virtual-time-budget=20000', '--dump-dom', win_polku],
            capture_output=True, text=True, timeout=120)
        dom = tulos.stdout

        svgt = {}
        for osuma in re.finditer(r'<div class="tulos" data-nimi="([^"]+)">(.*?)</div>', dom, re.S):
            nimi, sisalto = osuma.group(1), html.unescape(osuma.group(2)).strip()
            if sisalto.startswith('VIRHE'):
                sys.exit(f'Mermaid-virhe kaaviossa {nimi}: {sisalto}')
            svgt[nimi] = sisalto

        puuttuvat = set(lahteet) - set(svgt)
        if puuttuvat:
            sys.exit(f'Renderöinti ei tuottanut SVG:tä: {", ".join(sorted(puuttuvat))}\n'
                     f'(Chromen paluuarvo {tulos.returncode}, DOM {len(dom)} merkkiä.)')
        return svgt
    finally:
        shutil.rmtree(tyohakemisto, ignore_errors=True)


def tiiviste(lahde):
    """Kaavion lähdekoodin ja teema-asetusten tiiviste.

    Renderöinnin tulosta ei voi verrata tavu tavulta: mermaidin erDiagram
    arpoo laatikoiden reunapolkujen bezier-kontrollipisteet, joten kaksi ajoa
    samasta lähteestä tuottaa eri SVG:n vaikka kuva on identtinen. Siksi
    ajantasaisuus ratkaistaan lähteen tiivisteestä, joka kirjoitetaan
    alkumerkkiin.
    """
    aineisto = lahde + json.dumps(ASETUKSET, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(aineisto.encode('utf-8')).hexdigest()[:12]


def merkkikuvio(nimi):
    return re.compile(
        rf'(<!-- KAAVIO:alku {re.escape(nimi)}(?: sha=(?P<sha>[0-9a-f]+))?[^>]*-->\n)'
        rf'(?P<sisalto>.*?)'
        rf'(\n[ \t]*<!-- KAAVIO:loppu -->)', re.S)


def nykyinen_sha(sivu_polku, nimi):
    """Sivuun upotetun kaavion tiiviste, tai None jos merkkejä ei ole."""
    s = (SIVUSTO / sivu_polku).read_text(encoding='utf-8')
    m = merkkikuvio(nimi).search(s)
    if not m:
        sys.exit(f'{sivu_polku}: KAAVIO:alku {nimi} / KAAVIO:loppu -merkkejä ei löydy.')
    return m.group('sha')


def upota(sivu_polku, nimi, svg, sha):
    p = SIVUSTO / sivu_polku
    s = p.read_text(encoding='utf-8')
    alku = (f'<!-- KAAVIO:alku {nimi} sha={sha} — generoitu, '
            f'aja tyokalut/renderoi-kaaviot.py -->\n')
    uusi = merkkikuvio(nimi).sub(lambda m: alku + '      ' + svg + m.group(4), s)
    p.write_text(uusi, encoding='utf-8')


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('--tarkista', action='store_true',
                   help='älä kirjoita, palauta exit 1 jos sivut ovat vanhentuneet')
    args = p.parse_args()

    lahteet, shat = {}, {}
    for nimi in KAAVIOT:
        polku = KAAVIOHAKEMISTO / f'{nimi}.mmd'
        if not polku.exists():
            sys.exit(f'Puuttuu: {polku}')
        lahteet[nimi] = polku.read_text(encoding='utf-8').strip()
        shat[nimi] = tiiviste(lahteet[nimi])

    vanhentuneet = [nimi for nimi, sivu in KAAVIOT.items()
                    if nykyinen_sha(sivu, nimi) != shat[nimi]]

    if args.tarkista:
        if vanhentuneet:
            print('Vanhentuneet kaaviot: '
                  + ', '.join(KAAVIOT[n] for n in vanhentuneet))
            print('Aja: python3 tyokalut/renderoi-kaaviot.py')
            sys.exit(1)
        print('Kaaviot ajan tasalla.')
        return

    if not vanhentuneet:
        print('Päivitetty: ei muutoksia')
        return

    # Chrome käynnistetään vain jos jokin kaavio on oikeasti muuttunut.
    svgt = renderoi({n: lahteet[n] for n in vanhentuneet})
    for nimi in vanhentuneet:
        upota(KAAVIOT[nimi], nimi, svgt[nimi], shat[nimi])
    print('Päivitetty: ' + ', '.join(KAAVIOT[n] for n in vanhentuneet))


if __name__ == '__main__':
    main()
