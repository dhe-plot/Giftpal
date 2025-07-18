from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt

# --- Logo Creation ---
logo_text = "GIFTPAL"
logo_font_size = 80
logo_size = (500, 200)

# Colors (to be used in both logo and palette)
main_color = (255, 99, 71)      # Tomato Red
accent_color = (255, 215, 0)    # Gold
secondary_color = (70, 130, 180) # Steel Blue
bg_color = (255, 255, 255)      # White
text_color = (70, 130, 180)     # Steel Blue

# Create logo image
logo_img = Image.new('RGBA', logo_size, bg_color)
draw = ImageDraw.Draw(logo_img)

try:
    font = ImageFont.truetype("arial.ttf", logo_font_size)
except:
    font = ImageFont.load_default()

# Draw a simple gift box icon
box_x, box_y = 30, 60
box_w, box_h = 80, 80
draw.rectangle([box_x, box_y, box_x+box_w, box_y+box_h], fill=main_color, outline=accent_color, width=4)
draw.rectangle([box_x+30, box_y-30, box_x+50, box_y], fill=accent_color, outline=main_color, width=3)  # Bow

draw.text((140, 70), logo_text, font=font, fill=text_color)

logo_img.save("branding/giftpal_logo.png")

# --- Color Palette ---
palette = [main_color, accent_color, secondary_color, bg_color, text_color]
palette_names = ["Main (Tomato Red)", "Accent (Gold)", "Secondary (Steel Blue)", "Background (White)", "Text (Steel Blue)"]

fig, ax = plt.subplots(figsize=(6, 1))
for i, color in enumerate(palette):
    ax.add_patch(plt.Rectangle((i, 0), 1, 1, color=[c/255 for c in color]))
ax.set_xlim(0, len(palette))
ax.set_ylim(0, 1)
ax.axis('off')
plt.savefig("branding/giftpal_palette.png", bbox_inches='tight')
plt.close()

# Save palette as text
with open("branding/giftpal_palette.txt", "w") as f:
    for name, color in zip(palette_names, palette):
        f.write(f"{name}: RGB{color}\n") 