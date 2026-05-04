import PyPDF2

# PDF-tiedoston polku
pdf_path = 'DATAN MALLINTAMISEN MERKITYS BI-ohjelmistoilla.pdf'

# Luetaan PDF-tiedoston tekstit
with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ''
    for page in reader.pages:
        text += page.extract_text() + '\n'

# Tallennetaan teksti tiedostoon jatkokäsittelyä varten
with open('pdf_teksti.txt', 'w', encoding='utf-8') as f:
    f.write(text)

print('PDF-tiedoston teksti tallennettu pdf_teksti.txt-tiedostoon.')
