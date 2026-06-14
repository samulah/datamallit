from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

BG_DARK    = (1,  45, 26)
BG_MID     = (1,  94, 56)
ACCENT     = (45, 160, 100)
WHITE      = (255, 255, 255)
AMBER      = (230, 168, 23)
AMBER_BG   = (255, 248, 225)
GREEN_BG   = (234, 242, 236)
TEXT_DARK  = (20, 34, 22)
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
    for gx in range(12, 540, 22):
        draw.ellipse([gx-1, gy-1, gx+1, gy+1], fill=(255, 255, 255, 10))

cx, cy = 870, 315
R = 305
draw.ellipse([cx-R-22, cy-R-22, cx+R+22, cy+R+22], fill=(20, 80, 45, 40))
draw.ellipse([cx-R-8,  cy-R-8,  cx+R+8,  cy+R+8],  fill=(20, 100, 55, 60))
draw.ellipse([cx-R,    cy-R,    cx+R,    cy+R],    fill=(1, 38, 20))

try:
    f_brand = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",  26)
    f_title = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",  72)
    f_sub   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",  29)
    f_tag   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",  26)
    f_url   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",  29)
    f_box   = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/UbuntuMono-R.ttf", 19)
    f_warn  = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",  17)
except OSError:
    f_brand = f_title = f_sub = f_tag = f_url = f_box = f_warn = ImageFont.load_default()


def warn_badge(x, y, r=11):
    draw.ellipse([x-r, y-r, x+r, y+r], fill=AMBER, outline=(1, 50, 30), width=2)
    bbox = draw.textbbox((0, 0), "!", font=f_warn)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((x - tw/2 - bbox[0], y - th/2 - bbox[1]), "!", font=f_warn, fill=(1, 50, 30))


boxes = {
    "MU": ("f_myynnit_uusi",    (850, 300), False),
    "MV": ("f_myynnit_vanha",   (690, 150), True),
    "A":  ("d_asiakas",         (650, 240), False),
    "A2": ("d_asiakkaat2",      (1045, 135), True),
    "T":  ("d_tuote",           (645, 395), False),
    "TK": ("d_tuote_kategoria", (775, 505), False),
    "P":  ("d_paiva",           (1005, 525), False),
    "K":  ("d_kalenteri",       (885,  85), True),
    "MR": ("f_myynti_raportti", (1070, 415), True),
}

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
    x0 = bx - tw//2 - pad_x
    y0 = by - th//2 - pad_y
    x1 = bx + tw//2 + pad_x
    y1 = by + th//2 + pad_y
    draw.rounded_rectangle([x0+2, y0+2, x1+2, y1+2], radius=7, fill=SHADOW_C)
    fill    = AMBER_BG if bad else GREEN_BG
    outline = AMBER    if bad else (1, 94, 56)
    draw.rounded_rectangle([x0, y0, x1, y1], radius=7, fill=fill,
                           outline=outline, width=3 if bad else 2)
    draw.text((bx - tw//2 - bbox[0], by - th//2 - bbox[1]), name,
              font=f_box, fill=TEXT_DARK)
    if bad:
        warn_badge(x1-2, y0+2)

try:
    logo_src = Image.open("/home/samu/data mallit/kuvat/dataneuvos_logo.png").convert("RGBA")
    logo = logo_src.resize((42, 42), Image.LANCZOS)
    img.paste(logo, (60, 78), logo)
    brand_x = 114
except Exception:
    brand_x = 60

draw.rectangle([60, 64, 124, 69], fill=ACCENT)
draw.text((brand_x, 86), "Datamalli.fi", font=f_brand, fill=ACCENT)

draw.text((60, 140), "Sekasikiömalli", font=f_title, fill=WHITE)

sub_color = (185, 220, 198)
draw.text((60, 252), "Kun jokainen pyyntö toteutetaan", font=f_sub, fill=sub_color)
draw.text((60, 290), "eikä kukaan katso kokonaisuutta.", font=f_sub, fill=sub_color)

tags = ["2 faktataulua", "2 asiakastaulua", "2 kalenteria"]

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

out = "/home/samu/data mallit/kuvat/og-sekasikio.png"
img.save(out, "PNG", optimize=True)
print("Saved:", out)
