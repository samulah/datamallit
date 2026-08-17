# Arkisto

Aineistoa jota mikään ei enää käytä. Ei poistettu, koska osa on lähdemateriaalia jota
voi vielä tarvita. Mitään täällä olevaa ei deployata eikä ajeta osana normaalia työtä.

| Tiedosto | Mikä | Miksi täällä |
|---|---|---|
| `esimerkkityyli.css` | vanha tyylikokeilu | ei viittauksia yhdeltäkään sivulta |
| `generated-schema.json` | JSON-LD-luonnos | skeemat ovat nykyään sivujen omissa `<script>`-lohkoissa |
| `_apply_tags.py` | kertaluontoinen tagien lisäys termistöön | ajettu, tagit ovat sivuissa |
| `migraatio.py` | kertaluontoinen korttimetatietojen siirto sivujen `<head>`:iin | ajettu; skripti sanoo itsekin että sen voi poistaa ajon jälkeen |
| `extract_pdf_text.py` | PDF → teksti | kertakäyttöinen, tuotti `pdf_teksti.txt`:n |
| `pdf_teksti.txt` | yllä olevan tuotos | lähdemateriaalia |
| `DATAN MALLINTAMISEN MERKITYS BI-ohjelmistoilla.pdf` | opinnäyte / lähdemateriaali | tausta-aineisto, ei sivuston sisältöä |

Polut näissä skripteissä viittaavat vanhaan kansiorakenteeseen (kaikki repon juuressa).
Jos jokin niistä pitää joskus ajaa uudelleen, polut on korjattava `sivusto/`-alkuisiksi.
