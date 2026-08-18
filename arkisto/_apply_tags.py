#!/usr/bin/env python3
import re, sys

PAGE_NAMES = {
    'data-contract':   'Data Contract',
    'data-governance': 'Data Governance',
    'data-vault':      'Data Vault',
    'tahtimalli':      'Tähtimalli',
    'lumihiutale':     'Lumihiutalemalli',
    'medallion':       'Medallion',
    'dimensiot':       'Dimensiot',
    'litistaminen':    'Litistäminen',
    'header-detail':   'Header-Detail',
    'useampi-fakta':   'Useampi fakta',
    'ai-metadata':     'AI-valmis metadata',
    'apuohjelmat':     'Apuohjelmat',
    'etl-elt':         'ETL/ELT',
}

# term id -> page tags to add (concept tags stay; total kept <= 5)
MAP = {
    'alm-toolkit': ['apuohjelmat'],
    'anonymisointi': ['data-contract','data-governance'],
    'attribuutti': ['dimensiot','tahtimalli'],
    'bpa': ['apuohjelmat'],
    'bronze': ['medallion'],
    'copilot': ['ai-metadata'],
    'dax-studio': ['apuohjelmat'],
    'dbt': ['etl-elt'],
    'datakatalogi': ['data-governance'],
    'data-consumer': ['data-governance'],
    'data-contract': ['data-contract'],
    'data-custodian': ['data-governance'],
    'data-lineage': ['data-governance'],
    'data-owner': ['data-governance','data-contract'],
    'data-steward': ['data-governance','data-contract'],
    'data-vault': ['data-vault'],
    'datan-elinkaari': ['data-governance'],
    'denormalisointi': ['tahtimalli','dimensiot','lumihiutale'],
    'dimensiotaulu': ['dimensiot','tahtimalli'],
    'dpo': ['data-contract','data-governance'],
    'elt': ['etl-elt'],
    'etl': ['etl-elt','litistaminen'],
    'faktataulu': ['tahtimalli','useampi-fakta'],
    'flattening': ['litistaminen'],
    'gdpr': ['data-governance','data-contract'],
    'gold': ['medallion'],
    'granulariteetti': ['tahtimalli','useampi-fakta','dimensiot'],
    'header-detail-malli': ['header-detail'],
    'hierarkia': ['lumihiutale','litistaminen','dimensiot'],
    'hub': ['data-vault'],
    'kardinaliteetti': ['dimensiot','header-detail'],
    'kayttotarkoituksen-rajaus': ['data-governance','data-contract'],
    'laskentaryhma': ['apuohjelmat'],
    'litistaminen': ['litistaminen','lumihiutale'],
    'link': ['data-vault'],
    'lumihiutalemalli': ['lumihiutale','litistaminen'],
    'luonnollinen-avain': ['dimensiot'],
    'master-data': ['data-governance'],
    'monen-moneen': ['useampi-fakta'],
    'mcp': ['apuohjelmat'],
    'medallion-arkkitehtuuri': ['medallion'],
    'metadata': ['data-governance','ai-metadata'],
    'normalisointi': ['tahtimalli','lumihiutale'],
    'ols': ['data-governance','apuohjelmat'],
    'paaavain': ['tahtimalli','dimensiot'],
    'pseudonymisointi': ['data-contract','data-governance'],
    'qa': ['ai-metadata'],
    'qa-synonyymi': ['ai-metadata'],
    'relaatio': ['tahtimalli','useampi-fakta'],
    'rikkova-muutos': ['data-contract'],
    'rle': ['header-detail','apuohjelmat'],
    'rls': ['data-governance'],
    'sanakirjapakkaus': ['header-detail','apuohjelmat'],
    'satellite': ['data-vault'],
    'scd': ['dimensiot'],
    'scd-type-1': ['dimensiot'],
    'scd-type-2': ['dimensiot'],
    'scd-type-3': ['dimensiot'],
    'scd-type-4': ['dimensiot'],
    'semanttinen-malli': ['ai-metadata'],
    'sertifiointi': ['data-governance'],
    'silver': ['medallion'],
    'skeema': ['tahtimalli','data-contract'],
    'sla': ['data-contract'],
    'sql-nakyma': ['litistaminen','etl-elt'],
    'surrogaattiavain': ['dimensiot'],
    'tabular-editor': ['apuohjelmat'],
    'tekoalyavustaja': ['ai-metadata','apuohjelmat'],
    'tahtimalli': ['tahtimalli'],
    'tietoeheys': ['data-governance','tahtimalli'],
    'tietoluokka': ['ai-metadata'],
    'tyhja-rivi': ['dimensiot'],
    'vertipaq': ['apuohjelmat','header-detail','dimensiot'],
    'vierasavain': ['tahtimalli','dimensiot'],
    'valitaulu': ['useampi-fakta'],
    'yhdistelmakentta': ['litistaminen','dimensiot'],
    'yksi-moneen': ['tahtimalli'],
}

html = open('termisto.html', encoding='utf-8').read()
parts = re.split(r'(<div class="termi" id="[^"]+")', html)
out = [parts[0]]
changed = 0
over = []
for i in range(1, len(parts), 2):
    delim, body = parts[i], parts[i+1]
    tid = re.search(r'id="([^"]+)"', delim).group(1)
    if tid in MAP:
        slugs = MAP[tid]
        def add_dt(m):
            existing = m.group(1).split()
            merged = existing + [s for s in slugs if s not in existing]
            if len(merged) > 5:
                over.append((tid, merged))
            return 'data-tags="' + ' '.join(merged) + '"'
        body = re.sub(r'data-tags="([^"]*)"', add_dt, body, count=1)
        chips = ''.join(f'<span class="termi-tagi">{PAGE_NAMES[s]}</span>' for s in slugs)
        body = re.sub(r'(<div class="termi-tagit">.*?)(\s*</div>)',
                      lambda m: m.group(1) + chips + m.group(2), body, count=1, flags=re.S)
        changed += 1
    out.append(delim); out.append(body)

if over:
    print("OVER 5 TAGS:", over); sys.exit(1)

open('termisto.html', 'w', encoding='utf-8').write(''.join(out))
print(f"updated {changed} terms")
