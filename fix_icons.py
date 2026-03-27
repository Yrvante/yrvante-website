#!/usr/bin/env python3
"""Check all icons for transparency and remove white backgrounds."""
from PIL import Image
import os
import glob

PUBLIC_DIR = "/app/frontend/public"

def check_transparency(filepath):
    """Check if image has actual transparency."""
    img = Image.open(filepath)
    if img.mode != 'RGBA':
        return False, img
    # Check if any pixel is actually transparent
    alpha = img.getchannel('A')
    pixels = list(alpha.getdata())
    transparent_count = sum(1 for p in pixels if p < 250)
    total = len(pixels)
    pct = (transparent_count / total) * 100
    return pct > 5, img  # More than 5% transparent = truly transparent

def remove_white_background(img, threshold=230):
    """Remove white/near-white background from image."""
    img = img.convert('RGBA')
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        # If pixel is white or near-white, make it transparent
        if r > threshold and g > threshold and b > threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    return img

def process_icon(filepath):
    """Process a single icon file."""
    name = os.path.basename(filepath)
    is_transparent, img = check_transparency(filepath)
    
    if is_transparent:
        print(f"  OK  {name} - Already transparent")
        return False
    else:
        print(f"  FIX {name} - Removing white background...")
        fixed = remove_white_background(img)
        fixed.save(filepath, 'PNG')
        print(f"       -> Saved with transparent background")
        return True

def process_logo(filepath):
    """Process logo - JPEG so definitely no transparency."""
    name = os.path.basename(filepath)
    print(f"  FIX {name} - Converting JPEG to transparent PNG...")
    img = Image.open(filepath).convert('RGBA')
    fixed = remove_white_background(img, threshold=220)
    
    # Save as PNG (original was JPEG)
    png_path = filepath.rsplit('.', 1)[0] + '.png'
    fixed.save(png_path, 'PNG')
    print(f"       -> Saved as {os.path.basename(png_path)}")
    return png_path

# Process all icon files
print("=" * 60)
print("CHECKING ALL ICONS FOR TRANSPARENCY")
print("=" * 60)

icon_files = sorted(glob.glob(os.path.join(PUBLIC_DIR, "icon-*.png")))
fixed_count = 0

for filepath in icon_files:
    was_fixed = process_icon(filepath)
    if was_fixed:
        fixed_count += 1

print(f"\n{'=' * 60}")
print(f"RESULT: {fixed_count}/{len(icon_files)} icons were fixed")
print(f"{'=' * 60}")

# Process the logo
print(f"\nPROCESSING LOGO:")
logo_path = os.path.join(PUBLIC_DIR, "yrvante-logo-code.png")
if os.path.exists(logo_path):
    process_logo(logo_path)
else:
    # Try jpeg extension
    jpeg_path = os.path.join(PUBLIC_DIR, "yrvante-logo-code.jpeg")
    if os.path.exists(jpeg_path):
        process_logo(jpeg_path)

print("\nDONE!")
