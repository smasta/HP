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


# ------------------------------------------------------------------
def kv_old_vs_new(out):
    """旧ガイドラインの3項目から、新しい指針の6項目へ広がったことを絵にする。
    左に旧の3本（薄く）、矢印、右に新の6本。引き継がれた3本は EMERALD、
    新たに明記された3本（バランス能力・感覚機能・認知機能＝2,5,6番目）は INDIGO"""
    added = [False, True, False, False, True, True]

    slot_w, gap = 64 * SS, 22 * SS
    old_n, new_n = 3, 6
    old_total = old_n * slot_w + (old_n - 1) * gap
    new_total = new_n * slot_w + (new_n - 1) * gap
    mid_gap = 120 * SS
    total = old_total + mid_gap + new_total
    x_old = (CW - total) / 2
    x_new = x_old + old_total + mid_gap
    top, bottom = 206 * SS, 424 * SS
    radius = 12 * SS

    img = base()

    def shapes(d):
        for i in range(new_n):
            x = x_new + i * (slot_w + gap)
            accent = INDIGO if added[i] else EMERALD
            d.rounded_rectangle([x, top, x + slot_w, bottom], radius=radius,
                                fill=tuple(round(c * (0.6 if added[i] else 0.4)) for c in accent))
    img = glow(img, shapes, blur=26, strength=0.85)

    d = ImageDraw.Draw(img)

    # 旧：引き継がれた側なので EMERALD を薄く。廃止済みであることを輪郭の弱さで示す
    for i in range(old_n):
        x = x_old + i * (slot_w + gap)
        d.rounded_rectangle([x, top, x + slot_w, bottom], radius=radius,
                            fill=tuple(round(c * 0.16) for c in EMERALD),
                            outline=tuple(round(c * 0.45) for c in EMERALD),
                            width=2 * SS)

    # 矢印
    ax = x_old + old_total + mid_gap / 2
    ay = (top + bottom) / 2
    rule = tuple(round(c * 0.8) for c in MIST)
    d.line([(ax - 26 * SS, ay), (ax + 14 * SS, ay)], fill=rule, width=3 * SS)
    d.polygon([(ax + 28 * SS, ay), (ax + 8 * SS, ay - 14 * SS), (ax + 8 * SS, ay + 14 * SS)],
              fill=rule)

    # 新：6本。加わった3本を強く
    for i in range(new_n):
        x = x_new + i * (slot_w + gap)
        accent = INDIGO if added[i] else EMERALD
        layer, mask, pos = gradient_bar([x, top, x + slot_w, bottom],
                                        accent, lerp(accent, INK_SOFT, 0.5 if added[i] else 0.65),
                                        radius)
        img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 土台。左右で別の文書であることを、切れた土台で示す
    for (x0, w) in [(x_old, old_total), (x_new, new_total)]:
        d.rounded_rectangle([x0 - 22 * SS, bottom + 22 * SS, x0 + w + 22 * SS, bottom + 28 * SS],
                            radius=3 * SS, fill=tuple(round(c * 0.6) for c in MIST))
    save(img, out)


# ------------------------------------------------------------------
def kv_target_age(out):
    """「何歳から」に線はない、を絵にする。
    年齢階層ごとに段階的に高くなる柱を並べ（統計の千人率の形）、
    その途中に一本の破線を引いても柱の高さに段差がないことを示す。
    破線より右（高年齢側）は INDIGO、左は EMERALD で、線の前後で連続していることを色の連なりで見せる"""
    n = 11
    slot_w, gap = 62 * SS, 26 * SS
    total = n * slot_w + (n - 1) * gap
    x0 = (CW - total) / 2
    bottom = 452 * SS
    # 20代後半を底に、緩やかに上がる。急な段差は作らない
    heights = [118, 104, 112, 128, 148, 168, 190, 214, 236, 256, 272]
    radius = 12 * SS
    line_at = 7  # この柱の左に破線を置く（「60歳」に相当する位置）

    def bars():
        for i, h in enumerate(heights):
            x = x0 + i * (slot_w + gap)
            yield i, x, bottom - h * SS

    img = base()

    def shapes(d):
        for i, x, y in bars():
            accent = lerp(EMERALD, INDIGO, i / (n - 1))
            d.rounded_rectangle([x, y, x + slot_w, bottom], radius=radius,
                                fill=tuple(round(c * 0.42) for c in accent))
    img = glow(img, shapes, blur=26, strength=0.8)

    d = ImageDraw.Draw(img)

    for i, x, y in bars():
        accent = lerp(EMERALD, INDIGO, i / (n - 1))
        layer, mask, pos = gradient_bar([x, y, x + slot_w, bottom],
                                        accent, lerp(accent, INK_SOFT, 0.6), radius)
        img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 一本の破線。柱の並びを横切るが、その左右で高さは連続している
    lx = x0 + line_at * (slot_w + gap) - gap / 2
    rule = tuple(round(c * 0.9) for c in MIST)
    for y in range(round(bottom - 300 * SS), round(bottom + 12 * SS), 16 * SS):
        d.line([(lx, y), (lx, y + 8 * SS)], fill=rule, width=3 * SS)

    # 柱の頂点をなぞる線。段差がないことを一筆で示す
    pts = [(x + slot_w / 2, y) for _, x, y in bars()]
    d.line(pts, fill=(255, 255, 255), width=3 * SS, joint="curve")

    d.rounded_rectangle([x0 - 34 * SS, bottom + 22 * SS, x0 + total + 34 * SS, bottom + 28 * SS],
                        radius=3 * SS, fill=tuple(round(c * 0.6) for c in MIST))
    save(img, out)


# ------------------------------------------------------------------
def kv_accidents_increasing(out):
    """死傷者数が増え、そのなかで60歳以上の占める部分が広がっていくことを絵にする。
    年を追って高くなる柱を並べ、上部の INDIGO（60歳以上）の割合が徐々に大きくなる。
    下部の EMERALD（60歳未満）はほぼ変わらず、増えた分は上部で埋まっている"""
    n = 10
    slot_w, gap = 72 * SS, 26 * SS
    total = n * slot_w + (n - 1) * gap
    x0 = (CW - total) / 2
    bottom = 452 * SS
    # 全体はゆるやかに増え、60歳以上の割合は 0.22 → 0.31 へ
    heights = [196, 204, 208, 214, 218, 226, 236, 246, 254, 258]
    shares = [0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31]
    radius = 12 * SS

    def bars():
        for i, (h, s) in enumerate(zip(heights, shares)):
            x = x0 + i * (slot_w + gap)
            top = bottom - h * SS
            split = bottom - h * (1 - s) * SS
            yield i, x, top, split

    img = base()

    def shapes(d):
        for _, x, top, split in bars():
            d.rounded_rectangle([x, top, x + slot_w, split + radius], radius=radius,
                                fill=tuple(round(c * 0.55) for c in INDIGO))
    img = glow(img, shapes, blur=26, strength=0.85)

    d = ImageDraw.Draw(img)
    for _, x, top, split in bars():
        # 下部：60歳未満。ほぼ一定なので落ち着いた色
        layer, mask, pos = gradient_bar([x, split, x + slot_w, bottom],
                                        lerp(EMERALD, INK_SOFT, 0.45), lerp(EMERALD, INK_SOFT, 0.7),
                                        radius)
        img.paste(layer, pos, mask)
        # 上部：60歳以上。増えていく部分なので強く
        layer, mask, pos = gradient_bar([x, top, x + slot_w, split - 4 * SS],
                                        INDIGO, lerp(INDIGO, INK_SOFT, 0.4), radius)
        img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    d.rounded_rectangle([x0 - 34 * SS, bottom + 22 * SS, x0 + total + 34 * SS, bottom + 28 * SS],
                        radius=3 * SS, fill=tuple(round(c * 0.6) for c in MIST))
    save(img, out)


# ------------------------------------------------------------------
def kv_fall_patterns(out):
    """転倒は「危険に感じられない場所」で起きる、を絵にする。
    床の上に等間隔で立つ柱の列。床にはわずかな段差が一か所だけあり、
    その位置の柱だけが傾いている。立っている柱は EMERALD、傾いた柱は INDIGO"""
    n = 9
    slot_w, gap = 58 * SS, 60 * SS
    total = n * slot_w + (n - 1) * gap
    x0 = (CW - total) / 2
    floor_y = 440 * SS
    height = 210 * SS
    radius = 12 * SS
    fallen = 5           # この柱が傾く
    step = 10 * SS       # 段差の高さ。「わずか」であることが要点なので小さく

    def floor_at(i):
        """段差より右は床がわずかに高い"""
        return floor_y - (step if i >= fallen else 0)

    img = base()

    def shapes(d):
        for i in range(n):
            x = x0 + i * (slot_w + gap)
            if i == fallen:
                continue
            d.rounded_rectangle([x, floor_at(i) - height, x + slot_w, floor_at(i)], radius=radius,
                                fill=tuple(round(c * 0.4) for c in EMERALD))
    img = glow(img, shapes, blur=26, strength=0.8)

    # 傾いた柱は別レイヤーに描いて回転し、貼り付ける
    tilt = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    td = ImageDraw.Draw(tilt)
    fx = x0 + fallen * (slot_w + gap)
    fy = floor_at(fallen)
    layer, mask, pos = gradient_bar([fx, fy - height, fx + slot_w, fy],
                                    INDIGO, lerp(INDIGO, INK_SOFT, 0.45), radius)
    tilt.paste(layer.convert("RGBA"), pos, mask)
    # 柱の足元の角を軸に、進行方向（右）へ傾ける。隣の柱に重ならない角度にとどめる
    pivot = (fx + slot_w, fy)
    rotated = tilt.rotate(-14, resample=Image.BICUBIC, center=pivot)

    # 傾いた柱の発光
    glow_layer = Image.new("RGB", (CW, CH), (0, 0, 0))
    glow_layer.paste(rotated.convert("RGB"), (0, 0), rotated.split()[3])
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(28 * SS))
    img = Image.blend(img, ImageChops.screen(img, glow_layer), 0.9)

    d = ImageDraw.Draw(img)
    for i in range(n):
        if i == fallen:
            continue
        x = x0 + i * (slot_w + gap)
        fy_i = floor_at(i)
        layer, mask, pos = gradient_bar([x, fy_i - height, x + slot_w, fy_i],
                                        EMERALD, lerp(EMERALD, INK_SOFT, 0.6), radius)
        img.paste(layer, pos, mask)
    img.paste(rotated.convert("RGB"), (0, 0), rotated.split()[3])
    d = ImageDraw.Draw(img)

    # 床。段差の位置で一段上がる
    rule = tuple(round(c * 0.6) for c in MIST)
    sx = x0 + fallen * (slot_w + gap) - gap / 2
    d.rounded_rectangle([x0 - 34 * SS, floor_y + 22 * SS, sx, floor_y + 28 * SS],
                        radius=3 * SS, fill=rule)
    d.rounded_rectangle([sx, floor_y + 22 * SS - step, sx + 6 * SS, floor_y + 28 * SS],
                        radius=3 * SS, fill=rule)
    d.rounded_rectangle([sx, floor_y + 22 * SS - step, x0 + total + 34 * SS, floor_y + 28 * SS - step],
                        radius=3 * SS, fill=rule)
    save(img, out)


# ------------------------------------------------------------------
def kv_prevention_layers(out):
    """転倒対策は優先順位の順に積み上がるが、その土台が空いている、を絵にする。
    上から 設備（工学的対策）・管理的対策・個人用装備 の3層が EMERALD で積まれ、
    priority が下がるほど暗くなる。一番下の土台＝身体の側の把握は INDIGO の輪郭だけ。
    輪郭だけの表現は kv_fitness_check と同じ「空き」の記法"""
    bar_w, bar_h, gap = 760 * SS, 74 * SS, 24 * SS
    base_w, base_h = 860 * SS, 84 * SS
    top_y = 118 * SS
    base_y = 428 * SS
    radius = 14 * SS
    n = 3

    bx = (CW - bar_w) / 2
    cx0 = (CW - base_w) / 2

    def rows():
        for i in range(n):
            y = top_y + i * (bar_h + gap)
            yield i, (bx, y, bx + bar_w, y + bar_h)

    def accent(i):
        # 上の層ほど効果が広く及ぶ。下に行くほど落とす
        return lerp(EMERALD, INK_SOFT, i * 0.34)

    img = base()

    def shapes(d):
        for i, box in rows():
            d.rounded_rectangle(box, radius=radius,
                                fill=tuple(round(c * 0.46) for c in accent(i)))
    img = glow(img, shapes, blur=26, strength=0.82)

    for i, box in rows():
        a = accent(i)
        layer, mask, pos = gradient_bar(box, a, lerp(a, INK_SOFT, 0.6), radius)
        img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 土台は輪郭だけ。ここが手つかずであることが要点
    d.rounded_rectangle([cx0, base_y, cx0 + base_w, base_y + base_h], radius=radius,
                        fill=tuple(round(c * 0.10) for c in INDIGO),
                        outline=tuple(round(c * 0.66) for c in INDIGO),
                        width=2 * SS)
    save(img, out)


KEYVISUALS = {
    "elderly-worker-fitness-check": kv_fitness_check,
    "elderly-worker-safety-guideline-five-measures": kv_five_measures,
    "revised-safety-act-2026-vs-old-guideline": kv_old_vs_new,
    "safety-act-62-2-target-age": kv_target_age,
    "elderly-worker-accidents-why-increasing": kv_accidents_increasing,
    "fall-accident-patterns": kv_fall_patterns,
    "fall-prevention-workplace-measures": kv_prevention_layers,
}


def main():
    outdir = Path(sys.argv[1]) / "public/images/columns"
    outdir.mkdir(parents=True, exist_ok=True)
    print("生成:")
    for slug, fn in KEYVISUALS.items():
        fn(outdir / f"{slug}.jpg")


if __name__ == "__main__":
    main()
