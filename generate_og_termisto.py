from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

BG_DARK    = (1,  45, 26)
BG_MID     = (1,  94, 56)
ACCENT     = (45, 160, 100)
WHITE      = (255, 255, 255)
CARD_NORM  = (234, 242, 236)
CARD_HI    = (210, 235, 218)
BORDER_NORM = (90, 140, 110)
BORDER_HI   = (1,  94,  56)
TEXT_DARK  = (20, 34, 22)
TEXT_MUTED = (90, 120, 95)
SHADOW_C   = (0, 15, 8, 55)

img = Image.new("RGB", (W, H), BG_DARK)
draw = ImageDraw.Draw(img, "RGBA")

for x in range(W):
    t = x / W
    r = int(BG_DARK[0] + (BG_MID[0] - BG_DARK[0]) * t)
    g = int(BG_DARK[1] + (BG_MID[1] - BG_DARK[1]) * t)
    b = int(BG_DARK[2] + (BG_MID[2] - BG_DARK[2]) * t)
    draw.line([(x, 0), (x, H)], fill=(r, g, b))

for gy in range(12, H, 22):
    for gx in range(12, 580, 22):
        draw.ellipse([gx-1, gy-1, gx+1, gy+1], fill=(255, 255, 255, 12))

cx, cy = 870, 305
R = 295
draw.ellipse([cx-R-22, cy-R-22, cx+R+22, cy+R+22], fill=(20, 80, 45, 40))
draw.ellipse([cx-R-8,  cy-R-8,  cx+R+8,  cy+R+8],  fill=(20, 100, 55, 60))
draw.ellipse([cx-R,    cy-R,    cx+R,    cy+R],    fill=(1, 38, 20))

try:
    f_brand = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",  26)
    f_title = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",  72)
    f_sub   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",  29)
    f_tag   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",  26)
    f_url   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",  29)
    f_term  = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",  23)
    f_desc  = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-RI.ttf", 19)
except OSError:
    f_brand = f_title = f_sub = f_tag = f_url = f_term = f_desc = ImageFont.load_default()

terms = [
    ("Faktataulu",      "Fact Table",    True),
    ("Dimensio",        "Dimension",     True),
    ("Mittari",         "Measure",       False),
    ("Kardinaliteetti", "Cardinality",   False),
    ("Agentti",         "AI Agent",      False),
]

card_w = 318
card_h = 70
card_x0 = cx - card_w // 2 + 18
card_y0 = 72
gap = 12
indent = 16

for i, (fi, en, hi) in enumerate(terms):
    x0 = card_x0 + (indent if i % 2 else -indent)
    y0 = card_y0 + i * (card_h + gap)
    x1 = x0 + card_w
    y1 = y0 + card_h
    draw.rounded_rectangle([x0+3, y0+3, x1+3, y1+3], radius=9, fill=SHADOW_C)
    fill   = CARD_HI   if hi else CARD_NORM
    border = BORDER_HI if hi else BORDER_NORM
    bw     = 2         if hi else 1
    draw.rounded_rectangle([x0, y0, x1, y1], radius=9, fill=fill, outline=border, width=bw)
    if hi:
        draw.rounded_rectangle([x0, y0, x0+5, y1], radius=4, fill=BORDER_HI)
    draw.text((x0 + 18, y0 + 10), fi, font=f_term, fill=TEXT_DARK)
    draw.text((x0 + 18, y0 + 40), f"({en})", font=f_desc, fill=TEXT_MUTED)

try:
    logo_src = Image.open("/home/samu/data mallit/kuvat/dataneuvos_logo.png").convert("RGBA")
    logo = logo_src.resize((42, 42), Image.LANCZOS)
    img.paste(logo, (60, 78), logo)
    brand_x = 114
except Exception:
    brand_x = 60

draw.rectangle([60, 64, 124, 69], fill=ACCENT)
draw.text((brand_x, 86), "Datamalli.fi", font=f_brand, fill=ACCENT)

draw.text((60, 140), "Datan termistö", font=f_title, fill=WHITE)

sub_color = (185, 220, 198)
draw.text((60, 250), "Data-alan termit suomeksi —", font=f_sub, fill=sub_color)
draw.text((60, 288), "selitykset ja englanninkieliset vastineet.", font=f_sub, fill=sub_color)

tags = ["Yli 130 termiä", "suomi + englanti", "A–Y"]

max_tw = max(
    draw.textbbox((0, 0), t, font=f_tag)[2] - draw.textbbox((0, 0), t, font=f_tag)[0]
    for t in tags
)
tag_pad_x   = 32
tag_pad_y   = 11
tag_w_fixed = max_tw + tag_pad_x * 2
bb0 = draw.textbbox((0, 0), tags[0], font=f_tag)
tag_h_fixed = (bb0[3] - bb0[1]) + tag_pad_y * 2
ascent, descent = f_tag.getmetrics()
font_h = ascent + descent

tag_x = 60
tag_y = H - 108
tag_gap = 14
for tag in tags:
    x0t, y0t = tag_x, tag_y
    x1t, y1t = tag_x + tag_w_fixed, tag_y + tag_h_fixed
    draw.rounded_rectangle([x0t, y0t, x1t, y1t],
                           radius=tag_h_fixed // 2,
                           fill=(255, 255, 255, 22),
                           outline=(150, 210, 175, 160), width=1)
    bb = draw.textbbox((0, 0), tag, font=f_tag)
    tw = bb[2] - bb[0]
    tx = x0t + (tag_w_fixed - tw) // 2
    ty = y0t + (tag_h_fixed - font_h) // 2
    draw.text((tx, ty), tag, font=f_tag, fill=(210, 245, 225))
    tag_x += tag_w_fixed + tag_gap

draw.rectangle([0, H - 56, W, H], fill=(0, 22, 12))
draw.text((60, H - 40), "datamalli.fi", font=f_url, fill=(130, 195, 155))
right_text = "Samu Lahdenperä · Dataneuvos"
rb = draw.textbbox((0, 0), right_text, font=f_url)
rw = rb[2] - rb[0]
draw.text((W - rw - 60, H - 40), right_text, font=f_url, fill=(90, 150, 115))

out = "/home/samu/data mallit/kuvat/og-termisto.png"
img.save(out, "PNG", optimize=True)
print("Saved:", out)
