#!/usr/bin/env python3
"""Access-lokin analyysi: mitä kävijätyyppejä sivustolle on tullut.

Erottelee erikseen kielimalliliikenteen, joka ei näy Search Consolessa lainkaan:
AI-crawlerit (jotka hakevat sisältöä) ja AI-referraalit (ihmiset jotka
klikkasivat linkkiä kielimallin vastauksesta).

Käyttö:
    python3 tyokalut/lokianalyysi.py access.log
    python3 tyokalut/lokianalyysi.py 'lokit/*.log.gz'      # useita, myös pakattuja
    python3 tyokalut/lokianalyysi.py access.log --sivut    # + mitä sivuja haettiin
    python3 tyokalut/lokianalyysi.py access.log --csv ai.csv

Odottaa Apache/LiteSpeed combined -muotoa:
    IP - - [pvm] "GET /polku HTTP/2" 200 1234 "referer" "user-agent"
"""

import argparse
import csv
import glob
import gzip
import re
import sys
from collections import Counter, defaultdict

# ---------------------------------------------------------------------------
# Luokittelusäännöt
#
# Kielimallibotit jaetaan kahtia, koska ne tarkoittavat eri asiaa:
#   - NOUTO  = ihminen kysyi juuri nyt kielimallilta jotain ja se haki sivun.
#              Tämä on lähin vastine "kävijälle" mitä lokista saa.
#   - KOULUTUS = sisältöä kerätään indeksiin tai opetusdataan. Ei kävijä,
#              mutta kertoo että sivusto on mukana siinä mistä mallit vastaavat.
# ---------------------------------------------------------------------------

AI_NOUTO = [
    ('ChatGPT-User', 'ChatGPT (käyttäjän pyynnöstä)'),
    ('OAI-SearchBot', 'ChatGPT-haku'),
    ('Claude-User', 'Claude (käyttäjän pyynnöstä)'),
    ('Claude-SearchBot', 'Claude-haku'),
    ('Perplexity-User', 'Perplexity (käyttäjän pyynnöstä)'),
    ('MistralAI-User', 'Mistral (käyttäjän pyynnöstä)'),
    ('DuckAssistBot', 'DuckDuckGo AI'),
]

AI_KOULUTUS = [
    ('GPTBot', 'OpenAI GPTBot'),
    ('ClaudeBot', 'Anthropic ClaudeBot'),
    ('anthropic-ai', 'Anthropic (vanha UA)'),
    ('PerplexityBot', 'PerplexityBot'),
    ('Google-Extended', 'Google Gemini'),
    ('Applebot-Extended', 'Apple Intelligence'),
    ('meta-externalagent', 'Meta AI'),
    ('FacebookBot', 'Meta AI'),
    ('Bytespider', 'ByteDance / Doubao'),
    ('Amazonbot', 'Amazon'),
    ('CCBot', 'Common Crawl (opetusdatan lähde)'),
    ('cohere-ai', 'Cohere'),
    ('AI2Bot', 'Allen Institute'),
    ('YouBot', 'You.com'),
    ('PanguBot', 'Huawei PanGu'),
    ('Diffbot', 'Diffbot'),
    ('ImagesiftBot', 'ImageSift'),
    ('Timpibot', 'Timpi'),
    ('omgili', 'Webz.io'),
    ('FirecrawlAgent', 'Firecrawl'),
]

HAKUKONE_BOTIT = [
    ('Googlebot', 'Googlebot'),
    ('Google-InspectionTool', 'Google (URL-tarkistus)'),
    ('bingbot', 'Bingbot'),
    ('DuckDuckBot', 'DuckDuckBot'),
    ('YandexBot', 'YandexBot'),
    ('Applebot', 'Applebot'),
    ('SeznamBot', 'SeznamBot'),
]

SEO_BOTIT = [
    ('AhrefsBot', 'Ahrefs'),
    ('SemrushBot', 'Semrush'),
    ('DataForSeoBot', 'DataForSEO'),
    ('MJ12bot', 'Majestic'),
    ('DotBot', 'Moz'),
    ('PetalBot', 'Petal'),
    ('BLEXBot', 'BLEXBot'),
    ('serpstatbot', 'Serpstat'),
]

# Referer-isäntä -> lähde. Ihminen klikkasi linkkiä kielimallin vastauksesta.
AI_REFERRAALIT = {
    'chatgpt.com': 'ChatGPT',
    'chat.openai.com': 'ChatGPT',
    'openai.com': 'ChatGPT',
    'perplexity.ai': 'Perplexity',
    'claude.ai': 'Claude',
    'gemini.google.com': 'Gemini',
    'copilot.microsoft.com': 'Microsoft Copilot',
    'bard.google.com': 'Gemini',
    'you.com': 'You.com',
    'poe.com': 'Poe',
    'phind.com': 'Phind',
    'mistral.ai': 'Le Chat',
    'chat.mistral.ai': 'Le Chat',
    'grok.com': 'Grok',
    't3.chat': 'T3 Chat',
}

HAKU_REFERRAALIT = {
    'google.com': 'Google',
    'google.fi': 'Google',
    'bing.com': 'Bing',
    'duckduckgo.com': 'DuckDuckGo',
    'ecosia.org': 'Ecosia',
    'yandex.ru': 'Yandex',
    'search.brave.com': 'Brave',
}

SOME_REFERRAALIT = {
    'linkedin.com': 'LinkedIn',
    'lnkd.in': 'LinkedIn',
    'x.com': 'X',
    'twitter.com': 'X',
    't.co': 'X',
    'facebook.com': 'Facebook',
    'reddit.com': 'Reddit',
    'news.ycombinator.com': 'Hacker News',
}

# IP - - [pvm] "metodi polku proto" status koko "referer" "user-agent"
RIVI = re.compile(
    r'^(?P<ip>\S+) \S+ \S+ \[(?P<aika>[^\]]+)\] '
    r'"(?P<metodi>[A-Z]+) (?P<polku>[^" ]*)[^"]*" '
    r'(?P<status>\d{3}) (?P<koko>\S+) '
    r'"(?P<referer>[^"]*)" "(?P<ua>[^"]*)"'
)

# Vain nämä lasketaan sivulatauksiksi — assetit eivät kerro kävijätyypistä.
ASSETIT = re.compile(r'\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|webp|avif|map)(\?|$)', re.I)


def tunnista_ua(ua, saannot):
    """Palauttaa ensimmäisen osuvan säännön selkokielisen nimen, tai None."""
    matala = ua.lower()
    for tunniste, nimi in saannot:
        if tunniste.lower() in matala:
            return nimi
    return None


def referer_isanta(referer):
    """Poimii isäntänimen refererista ilman www-etuliitettä."""
    if not referer or referer == '-':
        return None
    osuma = re.match(r'https?://([^/:]+)', referer)
    if not osuma:
        return None
    return osuma.group(1).lower().removeprefix('www.')


def tunnista_referer(isanta, taulu):
    """Osuuko isäntä tauluun — myös alidomainit (esim. fi.perplexity.ai)."""
    if not isanta:
        return None
    for avain, nimi in taulu.items():
        if isanta == avain or isanta.endswith('.' + avain):
            return nimi
    return None


def luokittele(ua, referer, oma_domain):
    """Palauttaa (kategoria, tarkenne). Botti tunnistetaan UA:sta, ihminen refererista."""
    nimi = tunnista_ua(ua, AI_NOUTO)
    if nimi:
        return 'AI-nouto', nimi

    nimi = tunnista_ua(ua, AI_KOULUTUS)
    if nimi:
        return 'AI-crawler', nimi

    nimi = tunnista_ua(ua, HAKUKONE_BOTIT)
    if nimi:
        return 'Hakukonebotti', nimi

    nimi = tunnista_ua(ua, SEO_BOTIT)
    if nimi:
        return 'SEO-botti', nimi

    # Loput UA:t joissa lukee bot/crawler/spider ovat tunnistamattomia botteja.
    if re.search(r'bot|crawl|spider|scrapy|curl|wget|python-requests|headless', ua, re.I):
        return 'Muu botti', ua[:60] or '(tyhjä UA)'

    isanta = referer_isanta(referer)

    nimi = tunnista_referer(isanta, AI_REFERRAALIT)
    if nimi:
        return 'AI-referraali', nimi

    nimi = tunnista_referer(isanta, HAKU_REFERRAALIT)
    if nimi:
        return 'Hakukone', nimi

    nimi = tunnista_referer(isanta, SOME_REFERRAALIT)
    if nimi:
        return 'Some', nimi

    if isanta and (isanta == oma_domain or isanta.endswith('.' + oma_domain)):
        return 'Sisäinen', 'sivustolta itseltään'

    if isanta:
        return 'Muu viittaus', isanta

    return 'Suora', 'ei referreria'


def avaa(polku):
    if polku.endswith('.gz'):
        return gzip.open(polku, 'rt', errors='replace')
    return open(polku, 'r', errors='replace')


def lue(polut, oma_domain, vain_sivut=True):
    tapahtumat = []
    ohitettu = 0
    for polku in polut:
        with avaa(polku) as f:
            for rivi in f:
                osuma = RIVI.match(rivi)
                if not osuma:
                    ohitettu += 1
                    continue
                d = osuma.groupdict()
                if vain_sivut and ASSETIT.search(d['polku']):
                    continue
                kategoria, tarkenne = luokittele(d['ua'], d['referer'], oma_domain)
                tapahtumat.append({
                    'paiva': d['aika'][:11],           # 02/Aug/2026
                    'polku': d['polku'].split('?')[0],
                    'status': d['status'],
                    'kategoria': kategoria,
                    'tarkenne': tarkenne,
                    'ip': d['ip'],
                    'ua': d['ua'],
                })
    return tapahtumat, ohitettu


JARJESTYS = ['AI-nouto', 'AI-referraali', 'AI-crawler', 'Hakukone', 'Some',
             'Suora', 'Muu viittaus', 'Sisäinen', 'Hakukonebotti', 'SEO-botti', 'Muu botti']


def tulosta(tapahtumat, nayta_sivut):
    if not tapahtumat:
        print('Ei jäsennettäviä rivejä.')
        return

    yhteensa = len(tapahtumat)
    per_kategoria = Counter(t['kategoria'] for t in tapahtumat)
    per_tarkenne = defaultdict(Counter)
    ipt = defaultdict(set)
    sivut = defaultdict(Counter)
    for t in tapahtumat:
        per_tarkenne[t['kategoria']][t['tarkenne']] += 1
        ipt[t['kategoria']].add(t['ip'])
        sivut[t['kategoria']][t['polku']] += 1

    paivat = sorted({t['paiva'] for t in tapahtumat})
    print(f'\n{yhteensa} sivupyyntöä, {len(paivat)} päivää '
          f'({paivat[0]}–{paivat[-1]})\n')

    print(f'{"Kategoria":<16} {"Pyyntöjä":>9} {"Osuus":>7} {"Eri IP":>7}')
    print('-' * 43)
    for kategoria in JARJESTYS:
        n = per_kategoria.get(kategoria)
        if not n:
            continue
        print(f'{kategoria:<16} {n:>9} {n / yhteensa * 100:>6.1f}% {len(ipt[kategoria]):>7}')

    # Kielimalliliikenne omana osionaan — tämä on se mitä GSC ei näytä.
    ai = ['AI-nouto', 'AI-referraali', 'AI-crawler']
    ai_yht = sum(per_kategoria.get(k, 0) for k in ai)
    print(f'\n{"=" * 60}\nKIELIMALLILIIKENNE — {ai_yht} pyyntöä '
          f'({ai_yht / yhteensa * 100:.1f} % kaikesta)\n{"=" * 60}')

    otsikot = {
        'AI-nouto': 'Kielimalli haki sivun käyttäjän kysymyksen takia',
        'AI-referraali': 'Ihminen klikkasi linkkiä kielimallin vastauksesta',
        'AI-crawler': 'Sisällön keruu indeksiin tai opetusdataan',
    }
    for kategoria in ai:
        if not per_kategoria.get(kategoria):
            continue
        print(f'\n{kategoria} — {otsikot[kategoria]}')
        for nimi, n in per_tarkenne[kategoria].most_common():
            print(f'    {nimi:<40} {n:>6}')
        if nayta_sivut:
            print('  Haetuimmat sivut:')
            for polku, n in sivut[kategoria].most_common(8):
                print(f'    {polku:<40} {n:>6}')

    if not ai_yht:
        print('\n  Ei yhtään osumaa. Joko lokijakso on lyhyt tai sivustoa ei ole '
              '\n  vielä löydetty kielimallien kautta.')

    if nayta_sivut:
        print(f'\n{"=" * 60}\nIhmisliikenteen sivut\n{"=" * 60}')
        ihmiset = Counter()
        for t in tapahtumat:
            if t['kategoria'] in ('AI-referraali', 'Hakukone', 'Some', 'Suora', 'Muu viittaus'):
                ihmiset[t['polku']] += 1
        for polku, n in ihmiset.most_common(15):
            print(f'    {polku:<40} {n:>6}')


def kirjoita_csv(tapahtumat, polku):
    with open(polku, 'w', newline='', encoding='utf-8') as f:
        kirjoittaja = csv.DictWriter(
            f, fieldnames=['paiva', 'kategoria', 'tarkenne', 'polku', 'status'],
            extrasaction='ignore')
        kirjoittaja.writeheader()
        kirjoittaja.writerows(tapahtumat)
    print(f'\nKirjoitettu {polku} ({len(tapahtumat)} riviä).')


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('lokit', nargs='+', help='lokitiedosto(t), myös .gz ja jokerimerkit')
    p.add_argument('--domain', default='datamalli.fi',
                   help='oma domain sisäisten viittausten tunnistamiseen')
    p.add_argument('--sivut', action='store_true', help='näytä myös mitä sivuja haettiin')
    p.add_argument('--kaikki', action='store_true', help='laske myös CSS/JS/kuvat mukaan')
    p.add_argument('--csv', help='kirjoita luokitellut rivit CSV:ksi')
    args = p.parse_args()

    polut = []
    for kuvio in args.lokit:
        osumat = glob.glob(kuvio)
        polut.extend(osumat if osumat else [kuvio])

    puuttuvat = [x for x in polut if not glob.glob(x)]
    if puuttuvat:
        sys.exit(f'Ei löydy: {", ".join(puuttuvat)}')

    tapahtumat, ohitettu = lue(polut, args.domain.removeprefix('www.'),
                               vain_sivut=not args.kaikki)
    if ohitettu:
        print(f'(Ohitettu {ohitettu} riviä joita ei voitu jäsentää — '
              f'tarkista että loki on combined-muotoa.)', file=sys.stderr)

    tulosta(tapahtumat, args.sivut)
    if args.csv:
        kirjoita_csv(tapahtumat, args.csv)


if __name__ == '__main__':
    main()
