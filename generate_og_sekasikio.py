from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Brand colors
BG_DARK   = (1, 61, 37)      # #013d25  footer dark green
BG_MID    = (1, 94, 56)      # #015E38  primary
ACCENT    = (26, 138, 80)    # #1a8a50  lighter accent
WHITE     = (255, 255, 255)
AMBER     = (230, 168, 23)   # #e6a817  varoitus
AMBER_BG  = (255, 248, 225)  # #fff8e1
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

# --- Big decorative circle (right side) — sotkuisen mallin "petri-malja" ---
cx, cy = 870, 315
R = 310
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
    f_box   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/UbuntuMono-R.ttf", 19)
    f_warn  = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf", 17)
except OSError:
    f_label = f_title = f_sub = f_tag = f_url = f_box = f_warn = ImageFont.load_default()


def warn_badge(x, y, r=11):
    """Keltainen huutomerkkipallo varoitukseksi (⚠ ei löydy Ubuntu-fontista)."""
    draw.ellipse([x - r, y - r, x + r, y + r], fill=AMBER, outline=(1, 50, 30), width=2)
    bbox = draw.textbbox((0, 0), "!", font=f_warn)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((x - tw / 2 - bbox[0], y - th / 2 - bbox[1]), "!", font=f_warn, fill=(1, 50, 30))

# --- Sekasikiömallin taulut (nimi, keskipiste, ongelmallinen?) ---
boxes = {
    "MU": ("f_myynnit_uusi",    (850, 300), False),
    "MV": ("f_myynnit_vanha",   (690, 150), True),
    "A":  ("d_asiakas",         (650, 240), False),
    "A2": ("d_asiakkaat2",      (1045, 135), True),
    "T":  ("d_tuote",           (645, 395), False),
    "TK": ("d_tuote_kategoria", (775, 505), False),
    "P":  ("d_paiva",           (1005, 525), False),
    "K":  ("d_kalenteri",       (885, 85), True),
    "MR": ("f_myynti_raportti", (1070, 415), True),
}

# Relaatiot: (mistä, mihin, ongelmallinen?)
edges = [
    ("A",  "MU", False),
    ("A",  "MV", True),
    ("A2", "MU", True),
    ("T",  "MU", False),
    ("TK", "T",  False),
    ("P",  "MU", False),
    ("K",  "MU", True),
    ("MR", "MU", True),
]

# Viivat ensin, laatikot päälle
for src, dst, bad in edges:
    p1 = boxes[src][1]
    p2 = boxes[dst][1]
    color = AMBER + (235,) if bad else (200, 230, 210, 130)
    draw.line([p1, p2], fill=color, width=3)
    if bad:
        mx = (p1[0] + p2[0]) // 2
        my = (p1[1] + p2[1]) // 2
        warn_badge(mx, my, r=10)

for name, (bx, by), bad in boxes.values():
    bbox = draw.textbbox((0, 0), name, font=f_box)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pad_x, pad_y = 12, 9
    x0 = bx - tw // 2 - pad_x
    y0 = by - th // 2 - pad_y
    x1 = bx + tw // 2 + pad_x
    y1 = by + th // 2 + pad_y
    fill = AMBER_BG if bad else GREEN_BG
    outline = AMBER if bad else BG_MID
    draw.rounded_rectangle([x0, y0, x1, y1], radius=7, fill=fill,
                           outline=outline, width=3 if bad else 2)
    draw.text((bx - tw // 2 - bbox[0], by - th // 2 - bbox[1]), name,
              font=f_box, fill=TEXT_DARK)
    if bad:
        warn_badge(x1 - 2, y0 + 2)

# --- Accent line left ---
draw.rectangle([60, 64, 140, 70], fill=ACCENT)

# --- Label (top) ---
draw.text((60, 88), "Datamalli.fi", font=f_label, fill=ACCENT)

# --- Main headline ---
draw.text((60, 128), "Sekasikiömalli", font=f_title, fill=WHITE)

# --- Subtitle ---
draw.text((60, 240), "Kun jokainen pyyntö toteutetaan", font=f_sub, fill=(200, 230, 210))
draw.text((60, 282), "eikä kukaan katso kokonaisuutta.", font=f_sub, fill=(200, 230, 210))

# --- Tags / keywords ---
tags = ["2 faktataulua", "2 asiakastaulua", "2 kalenteria"]
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

out = "/home/samu/data mallit/kuvat/og-sekasikio.png"
img.save(out, "PNG", optimize=True)
print("Saved:", out)
