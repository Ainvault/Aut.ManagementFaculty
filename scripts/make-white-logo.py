from PIL import Image
from pathlib import Path

def to_white_transparent(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGBA")
    pixels = list(img.getdata())
    out = []
    for r, g, b, a in pixels:
        lum = (r + g + b) // 3
        out.append((255, 255, 255, lum if a > 0 else 0))
    img.putdata(out)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG")
    print(f"wrote {dest} {img.size}")

root = Path(r"e:\TeamProjects\AUT\ManagementWebsite")
src = root / "public" / "brand" / "amirkabir.png"
backup = root / "public" / "brand" / "amirkabir-black-bg.png"

if not backup.exists():
    Image.open(src).save(backup)
    print(f"backup {backup}")

to_white_transparent(backup, src)
to_white_transparent(backup, root / "src" / "app" / "icon.png")
to_white_transparent(backup, root / "src" / "app" / "apple-icon.png")
to_white_transparent(backup, root / "public" / "favicon.png")

img = Image.open(src).convert("RGBA")
img.save(root / "public" / "favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
print("done")
