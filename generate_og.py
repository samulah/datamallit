from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1200, 630

# Brand colors
BG_DARK   = (1, 61, 37)      # #013d25  footer dark green
BG_MID    = (1, 94, 56)      # #015E38  primary
ACCENT    = (26, 138, 80)    # #1a8a50  lighter accent
WHITE     = (255, 255, 255)
WHITE_DIM = (255, 255, 255, 170)

img = Image.new("RGB", (W, H), BG_DARK)
draw = ImageDraw.Draw(img, "RGBA")

# --- Background gradient (left dark → right slightly lighter) ---
for x in range(W):
    t = x / W
    r = int(BG_DARK[0] + (BG_MID[0] - BG_DARK[0]) * t)
    g = int(BG_DARK[1] + (BG_MID[1] - BG_DARK[1]) * t)
    b = int(BG_DARK[2] + (BG_MID[2] - BG_DARK[2]) * t)
    draw.line([(x, 0), (x, H)], fill=(r, g, b))

# --- Big decorative circle (right side, partially clipped) ---
cx, cy = 870, 315
R = 310
# Outer glow ring
draw.ellipse([cx-R-18, cy-R-18, cx+R+18, cy+R+18], fill=(26, 100, 60, 60))
draw.ellipse([cx-R-6, cy-R-6, cx+R+6, cy+R+6], fill=(26, 120, 70, 90))
# Main circle
draw.ellipse([cx-R, cy-R, cx+R, cy+R], fill=(1, 50, 30))

# Load & paste the Dataneuvos logo inside the circle
logo = Image.open("/home/samu/data mallit/kuvat/dataneuvos_logo.png").convert("RGBA")
logo_size = 480
logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
logo_x = cx - logo_size // 2
logo_y = cy - logo_size // 2
img.paste(logo, (logo_x, logo_y), logo)

# --- Accent line left ---
draw.rectangle([60, 64, 140, 70], fill=ACCENT)

# --- Fonts ---
font_path_bold   = "/usr/share/fonts/truetype/ubuntu/Ubuntu[wdth,wght].ttf"
font_path_regular = "/usr/share/fonts/truetype/ubuntu/Ubuntu[wdth,wght].ttf"

try:
    f_label   = ImageFont.truetype(font_path_regular, 28)
    f_title   = ImageFont.truetype(font_path_bold, 72)
    f_sub     = ImageFont.truetype(font_path_regular, 32)
    f_tag     = ImageFont.truetype(font_path_regular, 26)
    f_url     = ImageFont.truetype(font_path_regular, 30)
    f_stat    = ImageFont.truetype(font_path_bold, 100)
    f_stat_label = ImageFont.truetype(font_path_regular, 28)
except:
    f_label = f_title = f_sub = f_tag = f_url = f_stat = f_stat_label = ImageFont.load_default()

# --- Label (top) ---
draw.text((60, 88), "Datamalli.fi", font=f_label, fill=ACCENT)

# --- Main headline (two lines) ---
draw.text((60, 128), "Tähtimalli", font=f_title, fill=WHITE)
draw.text((60, 208), "vie AI:n perille", font=f_title, fill=WHITE)

# --- Stat block ---
stat_y = 330
draw.text((60, stat_y), "95%", font=f_stat, fill=WHITE)
desc_x = 60 + 200
draw.text((desc_x, stat_y + 12), "oikeellisuus", font=f_sub, fill=(200, 230, 210))
draw.text((desc_x, stat_y + 50), "kielimallikyselyissä", font=f_sub, fill=(200, 230, 210))

# --- Tags / keywords ---
tags = ["Tähtimalli", "Semanttinen kerros", "Self-service analytiikka"]
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

out = "/home/samu/data mallit/kuvat/og-self-service.png"
img.save(out, "PNG", optimize=True)
print("Saved:", out)
