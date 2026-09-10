"""
コラム記事のキービジュアル（サムネイル）を生成する。

    python3 scripts/generate-column-keyvisuals.py .

出力先は public/images/columns/{slug}.jpg（1200x630）。

cover はカード・記事ヒーロー・OG画像の3か所で使われる。
カードでは 16:10 に切り取られ、ヒーローでは上に記事タイトルが重なるため、
文字は入れず、中央寄せの図形だけで内容が伝わるようにしている。
配色は generate-column-figures.py と同じトークンにそろえてある。
"""
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

W, H, SS = 1200, 630, 3
CW, CH = W * SS, H * SS

INK_DEEP = (7, 12, 24)
INK      = (15, 23, 42)
INK_SOFT = (22, 32, 60)
INDIGO   = (129, 140, 248)
EMERALD  = (52, 211, 153)
MIST     = (147, 162, 191)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def base():
    """地色とグリッド。図版・ニュースのカバーと同じ質感"""
    img = Image.new("RGB", (CW, CH), INK)
    d = ImageDraw.Draw(img)
    for y in range(CH):
        d.line([(0, y), (CW, y)], fill=lerp(INK_DEEP, INK_SOFT, (y / CH) ** 1.25))
    grid = Image.new("RGB", (CW, CH), (0, 0, 0))
    gd = ImageDraw.Draw(grid)
    cell = 84 * SS
    line = tuple(round(c * 0.26) for c in MIST)
    for x in range(0, CW, cell):
        gd.line([(x, 0), (x, CH)], fill=line, width=SS)
    for y in range(0, CH, cell):
        gd.line([(0, y), (CW, y)], fill=line, width=SS)
    return Image.blend(img, ImageChops.screen(img, grid), 0.5)


def gradient_bar(box, top, bottom, radius):
    """縦方向のグラデーションで塗った角丸を、単体のレイヤーとして返す"""
    x0, y0, x1, y1 = [round(v) for v in box]
    w, h = x1 - x0, y1 - y0
    layer = Image.new("RGB", (w, h))
    ld = ImageDraw.Draw(layer)
    for y in range(h):
        ld.line([(0, y), (w, y)], fill=lerp(top, bottom, y / max(h - 1, 1)))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)
    return layer, mask, (x0, y0)


def glow(img, draw_shapes, blur, strength):
    """図形をぼかして加算合成し、発光させる"""
    layer = Image.new("RGB", (CW, CH), (0, 0, 0))
    draw_shapes(ImageDraw.Draw(layer))
    layer = layer.filter(ImageFilter.GaussianBlur(blur * SS))
    return Image.blend(img, ImageChops.screen(img, layer), strength)


def save(img, path):
    img.resize((W, H), Image.LANCZOS).save(
        path, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)
    print(f"  {path.name}  {path.stat().st_size // 1024}KB")


# ------------------------------------------------------------------
def kv_fitness_check(out):
    """6つの特性のうち、体力チェックで埋まるのは3つだけ、という欠落を絵にする。
    左から 筋力・バランス能力・敏捷性・全身持久力・感覚機能・認知機能。
    埋まっているのは 1,2,4 番目"""
    filled = [True, True, False, True, False, False]

    slot_w, gap = 96 * SS, 44 * SS
    total = len(filled) * slot_w + (len(filled) - 1) * gap
    x0 = (CW - total) / 2
    top, bottom = 196 * SS, 430 * SS
    radius = 14 * SS

    def boxes():
        for i, on in enumerate(filled):
            x = x0 + i * (slot_w + gap)
            yield i, on, (x, top, x + slot_w, bottom)

    img = base()

    # 埋まっている柱を光らせる
    def shapes(d):
        for _, on, box in boxes():
            if on:
                d.rounded_rectangle(box, radius=radius,
                                    fill=tuple(round(c * 0.55) for c in EMERALD))
    img = glow(img, shapes, blur=26, strength=0.85)

    d = ImageDraw.Draw(img)

    # 指針が求める水準を示す上端の線。柱の有無にかかわらず全体に渡す
    rule = tuple(round(c * 0.5) for c in MIST)
    for x in range(round(x0 - 34 * SS), round(x0 + total + 34 * SS), 14 * SS):
        d.line([(x, top - 34 * SS), (x + 7 * SS, top - 34 * SS)], fill=rule, width=2 * SS)

    for i, on, box in boxes():
        if on:
            layer, mask, pos = gradient_bar(box, EMERALD, lerp(EMERALD, INDIGO, 0.45), radius)
            img.paste(layer, pos, mask)
            d = ImageDraw.Draw(img)
        else:
            # 空きは輪郭だけ。中を描き込むと読み込み中の枠に見える
            d.rounded_rectangle(box, radius=radius,
                                fill=tuple(round(c * 0.10) for c in INDIGO),
                                outline=tuple(round(c * 0.62) for c in INDIGO),
                                width=2 * SS)

    # 土台。6つが一続きの評価であることを示す
    d.rounded_rectangle([x0 - 34 * SS, bottom + 22 * SS, x0 + total + 34 * SS, bottom + 28 * SS],
                        radius=3 * SS, fill=tuple(round(c * 0.6) for c in MIST))
    save(img, out)


# ------------------------------------------------------------------
def kv_five_measures(out):
    """事業者が講ずべき5つの措置。積み上がって一つの体系になることを絵にする"""
    n = 5
    slot_w, gap = 110 * SS, 46 * SS
    total = n * slot_w + (n - 1) * gap
    x0 = (CW - total) / 2
    bottom = 452 * SS
    heights = [126, 168, 210, 252, 294]
    radius = 14 * SS

    def tops():
        for i, h in enumerate(heights):
            x = x0 + i * (slot_w + gap)
            yield i, x, bottom - h * SS

    img = base()

    def shapes(d):
        for i, x, y in tops():
            d.rounded_rectangle([x, y, x + slot_w, bottom], radius=radius,
                                fill=tuple(round(c * 0.42) for c in
                                           lerp(EMERALD, INDIGO, i / (n - 1))))
    img = glow(img, shapes, blur=28, strength=0.8)

    d = ImageDraw.Draw(img)

    # 頂点をつなぐ線。5つが連なって一つの流れをなす
    pts = [(x + slot_w / 2, y) for _, x, y in tops()]
    d.line(pts, fill=tuple(round(c * 0.7) for c in MIST), width=3 * SS, joint="curve")

    for i, x, y in tops():
        accent = lerp(EMERALD, INDIGO, i / (n - 1))
        layer, mask, pos = gradient_bar([x, y, x + slot_w, bottom],
                                        accent, lerp(accent, INK_SOFT, 0.55), radius)
        img.paste(layer, pos, mask)
        d = ImageDraw.Draw(img)
        cx, cy = x + slot_w / 2, y
        d.ellipse([cx - 11 * SS, cy - 11 * SS, cx + 11 * SS, cy + 11 * SS], fill=(255, 255, 255))
        d.ellipse([cx - 21 * SS, cy - 21 * SS, cx + 21 * SS, cy + 21 * SS],
                  outline=accent, width=2 * SS)

    d.rounded_rectangle([x0 - 34 * SS, bottom + 22 * SS, x0 + total + 34 * SS, bottom + 28 * SS],
                        radius=3 * SS, fill=tuple(round(c * 0.6) for c in MIST))
    save(img, out)


KEYVISUALS = {
    "elderly-worker-fitness-check": kv_fitness_check,
    "elderly-worker-safety-guideline-five-measures": kv_five_measures,
}


def main():
    outdir = Path(sys.argv[1]) / "public/images/columns"
    outdir.mkdir(parents=True, exist_ok=True)
    print("生成:")
    for slug, fn in KEYVISUALS.items():
        fn(outdir / f"{slug}.jpg")


if __name__ == "__main__":
    main()
