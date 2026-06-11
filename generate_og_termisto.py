from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Brand colors
BG_DARK   = (1, 61, 37)      # #013d25  footer dark green
BG_MID    = (1, 94, 56)      # #015E38  primary
ACCENT    = (26, 138, 80)    # #1a8a50  lighter accent
WHITE     = (255, 255, 255)
GREEN_BG  = (234, 242, 236)  # #eaf2ec
TEXT_DARK = (26, 34, 24)     # #1a2218

img = Image.new("RGB", (W, H), BG_DARK)
draw = ImageDraw.Draw(img, "RGBA")

# --- Background gradient (left dark → right slightly lighter) ---
for x in range(W):
    t = x / W
    r = int(BG_DARK[0] + (BG_MID[0] - BG_DARK[0]) * t)
    g = int(BG_DARK[1] + (BG_MID[1] - BG_DARK[1]) * t)
    b = int(BG_DARK[2] + (BG_MID[2] - BG_DARK[2]) * t)
    draw.line([(x, 0), (x, H)], fill=(r, g, b))

# --- Big decorative circle (right side) — sanaston "sivu" ---
cx, cy = 880, 300
R = 300
draw.ellipse([cx-R-18, cy-R-18, cx+R+18, cy+R+18], fill=(26, 100, 60, 60))
draw.ellipse([cx-R-6, cy-R-6, cx+R+6, cy+R+6], fill=(26, 120, 70, 90))
draw.ellipse([cx-R, cy-R, cx+R, cy+R], fill=(1, 50, 30))

# --- Fonts ---
try:
    f_label = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf", 28)
    f_title = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf", 68)
    f_sub   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf", 30)
    f_tag   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf", 26)
    f_url   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf", 30)
    f_term  = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf", 24)
    f_en    = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-RI.ttf", 20)
except OSError:
    f_label = f_title = f_sub = f_tag = f_url = f_term = f_en = ImageFont.load_default()

# --- Sanastokortit (termi, englanninkielinen vastine) ---
terms = [
    ("Faktataulu",      "Fact Table"),
    ("Dimensio",        "Dimension"),
    ("Mittari",         "Measure"),
    ("Kardinaliteetti", "Cardinality"),
    ("Agentti",         "AI Agent"),
]

card_w = 330
card_h = 74
card_x = cx - card_w // 2 + 20
card_y = 65
gap = 14
for i, (fi, en) in enumerate(terms):
    x0 = card_x + (18 if i % 2 else -18)
    y0 = card_y + i * (card_h + gap)
    x1 = x0 + card_w
    y1 = y0 + card_h
    draw.rounded_rectangle([x0, y0, x1, y1], radius=8, fill=GREEN_BG,
                           outline=BG_MID, width=2)
    draw.text((x0 + 20, y0 + 11), fi, font=f_term, fill=TEXT_DARK)
    draw.text((x0 + 20, y0 + 42), f"({en})", font=f_en, fill=(90, 110, 95))

# --- Accent line left ---
draw.rectangle([60, 64, 140, 70], fill=ACCENT)

# --- Label (top) ---
draw.text((60, 88), "Datamalli.fi", font=f_label, fill=ACCENT)

# --- Main headline ---
draw.text((60, 128), "Datan termistö", font=f_title, fill=WHITE)

# --- Subtitle ---
draw.text((60, 240), "Data-alan termit suomeksi —", font=f_sub, fill=(200, 230, 210))
draw.text((60, 282), "selitykset ja englanninkieliset vastineet.", font=f_sub, fill=(200, 230, 210))

# --- Tags / keywords ---
tags = ["Yli 130 termiä", "suomi + englanti", "A–Y"]
tag_x = 60
tag_y = H - 110
padding = 18
for tag in tags:
    bbox = draw.textbbox((0, 0), tag, font=f_tag)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.rounded_rectangle(
        [tag_x - padding, tag_y - 8, tag_x + tw + padding, tag_y + th + 8],
        radius=6, fill=(255, 255, 255, 30)
    )
    draw.text((tag_x, tag_y), tag, font=f_tag, fill=(200, 235, 210))
    tag_x += tw + padding * 2 + 16

# --- Bottom bar ---
draw.rectangle([0, H - 60, W, H], fill=(0, 30, 18))
draw.text((60, H - 44), "datamalli.fi", font=f_url, fill=(150, 210, 170))
right_text = "Samu Lahdenperä · Dataneuvos"
rb = draw.textbbox((0, 0), right_text, font=f_url)
rw = rb[2] - rb[0]
draw.text((W - rw - 60, H - 44), right_text, font=f_url, fill=(100, 160, 130))

out = "/home/samu/data mallit/kuvat/og-termisto.png"
img.save(out, "PNG", optimize=True)
print("Saved:", out)
