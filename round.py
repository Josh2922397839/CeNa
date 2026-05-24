from PIL import Image, ImageDraw

def rounded_rectangle(size, radius, fill):
    width, height = size
    rectangle = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(rectangle)
    draw.rounded_rectangle((0, 0, width, height), radius=radius, fill=fill)
    return rectangle

try:
    im = Image.open('images/CeNa pastry new.png').convert("RGBA")
    mask = rounded_rectangle(im.size, 70, (255, 255, 255, 255))
    r, g, b, a = mask.split()
    
    # We want to keep the original alpha if it had any, but the image is a solid block
    # so we just apply the rounded mask alpha
    im.putalpha(a)
    im.save('images/CeNa pastry rounded.png')
    print("Successfully created CeNa pastry rounded.png")
except Exception as e:
    print(f"Error: {e}")
