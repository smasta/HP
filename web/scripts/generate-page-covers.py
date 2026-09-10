"""
サービス・導入実績のキービジュアルを生成する。

    python3 scripts/generate-page-covers.py .      # web/ で実行する

同じ写真が並んでしまう箇所だけを対象にしている。
・/system/ の3サービス … 受託開発・保守・SES に合う写真が手持ちにない
・/case-studies/ の3件 … 介護の2件が同じ写真になる（実際の顧客を写した
  ものではないため、図版に統一したほうが誤解がない）

描画そのものは generate-news-covers.py のモチーフを再利用する。
"""
import importlib.util
import random
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("news_covers", HERE / "generate-news-covers.py")
gen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)

# slug, モチーフ, アクセント（gen.ACCENTS のキー）, 説明
TARGETS = [
    # /system/ — 受託開発・保守・SES
    ("system-development", "lattice", "会社情報", "システム開発"),
    ("system-maintenance", "pulse",   "会社情報", "システム保守"),
    ("system-ses",         "hex",     "会社情報", "Smart SES"),
    # /case-studies/
    ("case-balena-reaxion-voice", "orbit",  "REAXION", "BALENA との PoC"),
    ("case-reaxion-care-facilities", "ripple", "REAXION", "介護事業所への導入"),
    ("case-nankatsu-sc",          "pulse",  "REAXION", "南葛SC"),
]


def main():
    web = Path(sys.argv[1])
    outdir = web / "public/images/covers"
    outdir.mkdir(parents=True, exist_ok=True)

    for slug, motif, accent_key, label in TARGETS:
        rng = random.Random(slug)
        a, b = gen.ACCENTS[accent_key]
        if rng.random() < 0.5:
            a, b = b, a
        img = gen.background(rng, a, b)
        gen.MOTIFS[motif](img, rng, a, b)

        # キャプション位置の下地とアクセント罫線（news 側と揃える）
        from PIL import Image, ImageDraw, ImageFilter
        scrim = Image.new("L", (gen.CW, gen.CH), 0)
        sd = ImageDraw.Draw(scrim)
        sw, sh = int(gen.CW * 0.40), int(gen.CH * 0.42)
        for i in range(40):
            t = i / 39
            sd.rectangle([0, gen.CH - sh * (1 - t) - 1, sw * (1 - t), gen.CH],
                         fill=int(245 * (t ** 0.62)))
        scrim = scrim.filter(ImageFilter.GaussianBlur(gen.CW // 40))
        img.paste(Image.new("RGB", (gen.CW, gen.CH), gen.INK_DEEP), (0, 0), scrim)

        d = ImageDraw.Draw(img)
        x0, y0 = 124 * gen.SS, gen.CH - 66 * gen.SS
        for i in range(46 * gen.SS):
            d.rectangle([x0 + i, y0, x0 + i + 1, y0 + 3 * gen.SS],
                        fill=gen.lerp(a, b, i / (46 * gen.SS)))

        img = img.resize((gen.W, gen.H), Image.LANCZOS)
        path = outdir / f"{slug}.jpg"
        img.save(path, "JPEG", quality=88, optimize=True,
                 progressive=True, subsampling=0)
        print(f"{slug:<32}{motif:<10}{gen.MOTIF_JA[motif]:<12}{path.stat().st_size // 1024}KB  ({label})")

    print(f"\n生成: {len(TARGETS)} 枚")


if __name__ == "__main__":
    main()
