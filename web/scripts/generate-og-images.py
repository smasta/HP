"""
SNSカード用の共有画像を 1200×630 で用意する。

    python3 scripts/generate-og-images.py .      # web/ で実行する

写真をそのまま og:image に使うと、
・athlete.jpg は 1800×2700 の縦長でカードが大きく切れる
・safety-onsite.webp は 600×400 で推奨サイズに満たない
という問題があるため、専用の切り抜きを public/og/ に書き出す。
ページ内の表示には元の写真をそのまま使う。
"""
import sys
from pathlib import Path
from PIL import Image

OG_W, OG_H = 1200, 630

# ページヘッダーの object-position (50% 35%) に合わせて切り抜く
SOURCES = [
    ("images/athlete.jpg",            "athlete.jpg",       0.50, 0.08),
    ("images/marathon.jpg",           "marathon.jpg",      0.50, 0.40),
    ("images/senior.jpg",             "senior.jpg",        0.50, 0.35),
    ("images/kids.jpg",               "kids.jpg",          0.50, 0.35),
    ("images/development.jpg",        "development.jpg",   0.50, 0.35),
    ("images/office.jpg",             "office.jpg",        0.50, 0.35),
    ("images/news/safety-onsite.webp", "safety-onsite.jpg", 0.50, 0.45),
]


def crop_cover(im, fx, fy):
    """1200×630 を満たすように拡大し、指定した焦点で切り抜く"""
    target = OG_W / OG_H
    w, h = im.size
    if w / h > target:                      # 横長すぎる → 左右を削る
        nw = int(h * target)
        x = int((w - nw) * fx)
        im = im.crop((x, 0, x + nw, h))
    else:                                   # 縦長すぎる → 上下を削る
        nh = int(w / target)
        y = int((h - nh) * fy)
        im = im.crop((0, y, w, y + nh))
    return im.resize((OG_W, OG_H), Image.LANCZOS)


def main():
    web = Path(sys.argv[1])
    outdir = web / "public/og"
    outdir.mkdir(parents=True, exist_ok=True)

    for rel, name, fx, fy in SOURCES:
        src = web / "public" / rel
        im = Image.open(src).convert("RGB")
        before = f"{im.width}x{im.height}"
        out = outdir / name
        crop_cover(im, fx, fy).save(out, "JPEG", quality=86, optimize=True,
                                    progressive=True, subsampling=0)
        print(f"{rel:<34}{before:<12}→ og/{name:<20}{out.stat().st_size // 1024}KB")

    print(f"\n生成: {len(SOURCES)} 枚")


if __name__ == "__main__":
    main()
