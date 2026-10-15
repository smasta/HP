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


# ------------------------------------------------------------------
def kv_two_scales(out):
    """一本の軸に、区切り位置の違う2つの目盛りを重ねる、を絵にする。
    上段は4区画（臨床判断値）、下段は5区画（職場の5段階評価）。
    同じ位置を指す白い縦線が、上下で別の区画に入ることを見せる"""
    ax0, ax1 = 120 * SS, 1080 * SS
    # 0.80〜1.80 を 0〜1 に正規化した位置
    def xa(v):
        return ax0 + (ax1 - ax0) * (v - 0.80) / (1.80 - 0.80)

    upper = [(0.80, 0.9), (0.9, 1.1), (1.1, 1.3), (1.3, 1.80)]
    lower = [(0.80, 1.245), (1.245, 1.385), (1.385, 1.465), (1.465, 1.655), (1.655, 1.80)]

    y_up, y_lo, bh = 168 * SS, 372 * SS, 118 * SS
    radius = 12 * SS
    mark = 1.27

    img = base()

    def shapes(d):
        for (a, b) in upper:
            d.rounded_rectangle([xa(a) + 3 * SS, y_up, xa(b) - 3 * SS, y_up + bh], radius=radius,
                                fill=tuple(round(c * 0.4) for c in INDIGO))
        for (a, b) in lower:
            d.rounded_rectangle([xa(a) + 3 * SS, y_lo, xa(b) - 3 * SS, y_lo + bh], radius=radius,
                                fill=tuple(round(c * 0.4) for c in EMERALD))
    img = glow(img, shapes, blur=26, strength=0.75)

    d = ImageDraw.Draw(img)
    # 上段：進行している側（左）ほど濃く
    for i, (a, b) in enumerate(upper):
        t = 1 - i / (len(upper) - 1)
        accent = INDIGO
        layer, mask, pos = gradient_bar([xa(a) + 3 * SS, y_up, xa(b) - 3 * SS, y_up + bh],
                                        lerp(INK_SOFT, accent, 0.35 + 0.65 * t),
                                        lerp(INK_SOFT, accent, 0.15 + 0.5 * t), radius)
        img.paste(layer, pos, mask)
    for i, (a, b) in enumerate(lower):
        t = 1 - i / (len(lower) - 1)
        accent = EMERALD
        layer, mask, pos = gradient_bar([xa(a) + 3 * SS, y_lo, xa(b) - 3 * SS, y_lo + bh],
                                        lerp(INK_SOFT, accent, 0.35 + 0.65 * t),
                                        lerp(INK_SOFT, accent, 0.15 + 0.5 * t), radius)
        img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 中央の軸。2つの目盛りが同じ1本の値の上にあることを示す
    axis_y = (y_up + bh + y_lo) / 2
    d.line([(ax0, axis_y), (ax1, axis_y)], fill=tuple(round(c * 0.55) for c in MIST), width=3 * SS)

    # 区切りの位置を軸の上に点で落とす。上下で位置がずれていることが要点
    for v in [0.9, 1.1, 1.3]:
        x = xa(v)
        d.line([(x, y_up + bh), (x, axis_y)], fill=tuple(round(c * 0.7) for c in INDIGO), width=2 * SS)
        d.ellipse([x - 6 * SS, axis_y - 6 * SS, x + 6 * SS, axis_y + 6 * SS], fill=INDIGO)
    for v in [1.245, 1.385, 1.465, 1.655]:
        x = xa(v)
        d.line([(x, axis_y), (x, y_lo)], fill=tuple(round(c * 0.7) for c in EMERALD), width=2 * SS)
        d.ellipse([x - 6 * SS, axis_y - 6 * SS, x + 6 * SS, axis_y + 6 * SS], fill=EMERALD)

    # 同じ値を指す一本の線。上下で別の区画に入る
    mx = xa(mark)
    for y in range(round(y_up - 30 * SS), round(y_lo + bh + 34 * SS), 18 * SS):
        d.line([(mx, y), (mx, y + 9 * SS)], fill=(255, 255, 255), width=4 * SS)
    d.ellipse([mx - 9 * SS, y_up + bh / 2 - 9 * SS, mx + 9 * SS, y_up + bh / 2 + 9 * SS],
              fill=(255, 255, 255))
    d.ellipse([mx - 9 * SS, y_lo + bh / 2 - 9 * SS, mx + 9 * SS, y_lo + bh / 2 + 9 * SS],
              fill=(255, 255, 255))

    save(img, out)


def kv_single_leg(out):
    """同じ人の片脚立ちでも、目を閉じると区分が下がる、を絵にする。
    上段（開眼）は右上がりの5本、下段（閉眼）は同じ並びで一段低い。細い軸が一本だけで立つ脚を暗示する"""
    n, bw, gap = 5, 120 * SS, 28 * SS
    total = n * bw + (n - 1) * gap
    x0 = (W * SS - total) / 2
    base_up, base_lo = 292 * SS, 548 * SS
    h_up = [60, 92, 128, 164, 200]
    h_lo = [30, 52, 78, 104, 130]
    img = base()

    def shapes(d):
        for i in range(n):
            xa = x0 + i * (bw + gap)
            d.rounded_rectangle([xa, base_up - h_up[i] * SS, xa + bw, base_up], radius=10 * SS,
                                fill=tuple(round(c * 0.4) for c in EMERALD))
            d.rounded_rectangle([xa, base_lo - h_lo[i] * SS, xa + bw, base_lo], radius=10 * SS,
                                fill=tuple(round(c * 0.4) for c in INDIGO))
    img = glow(img, shapes, blur=24, strength=0.7)

    for i in range(n):
        xa = x0 + i * (bw + gap)
        t = i / (n - 1)
        for base_y, hs, accent in [(base_up, h_up, EMERALD), (base_lo, h_lo, INDIGO)]:
            layer, mask, pos = gradient_bar([xa, base_y - hs[i] * SS, xa + bw, base_y],
                                            lerp(INK_SOFT, accent, 0.35 + 0.65 * t),
                                            lerp(INK_SOFT, accent, 0.15 + 0.5 * t), 10 * SS)
            img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)
    for base_y in (base_up, base_lo):
        d.line([(x0 - 14 * SS, base_y + 8 * SS), (x0 + total + 14 * SS, base_y + 8 * SS)],
               fill=tuple(round(c * 0.55) for c in MIST), width=3 * SS)
    save(img, out)


def kv_cognitive_domains(out):
    """一つの中心に、領域が環状に連なる、を絵にする。
    中心から伸びる細い線の先に7つの節があり、上の一つだけが大きく発光する（注意は他を支える土台）"""
    import math
    cx, cy = W * SS / 2, H * SS / 2 + 6 * SS
    R = 214 * SS
    n = 7
    pts = []
    for i in range(n):
        a = -math.pi / 2 + 2 * math.pi * i / n
        pts.append((cx + R * math.cos(a), cy + R * math.sin(a)))
    img = base()

    def shapes(d):
        r0 = 52 * SS
        d.ellipse([cx - r0, cy - r0, cx + r0, cy + r0], fill=tuple(round(c * 0.5) for c in INDIGO))
        for i, (x, y) in enumerate(pts):
            r = (40 if i == 0 else 26) * SS
            d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(round(c * 0.5) for c in EMERALD))
    img = glow(img, shapes, blur=26, strength=0.8)

    d = ImageDraw.Draw(img)
    for i, (x, y) in enumerate(pts):
        d.line([(cx, cy), (x, y)], fill=tuple(round(c * 0.5) for c in MIST), width=2 * SS)
    # 隣り合う節を細い弧で結ぶ
    for i in range(n):
        x0, y0 = pts[i]
        x1, y1 = pts[(i + 1) % n]
        d.line([(x0, y0), (x1, y1)], fill=tuple(round(c * 0.28) for c in MIST), width=2 * SS)
    r0 = 52 * SS
    d.ellipse([cx - r0, cy - r0, cx + r0, cy + r0], fill=lerp(INK_SOFT, INDIGO, 0.75),
              outline=INDIGO, width=3 * SS)
    for i, (x, y) in enumerate(pts):
        r = (40 if i == 0 else 26) * SS
        d.ellipse([x - r, y - r, x + r, y + r],
                  fill=lerp(INK_SOFT, EMERALD, 0.9 if i == 0 else 0.6),
                  outline=EMERALD, width=3 * SS)
    save(img, out)


# ------------------------------------------------------------------
def kv_cognitive_exercise(out):
    """「考える」と「動く」を同時に扱う、を絵にする。
    身体の負荷（EMERALD）と認知の負荷（INDIGO）の2本の帯を角度を変えて交差させ、
    重なった部分だけを明るくする。片方ずつではなく重なりが主題であることを示す"""
    bar_w, bar_h = 860 * SS, 104 * SS
    radius = 52 * SS
    cx, cy = CW / 2, CH / 2

    def band(accent, angle, shift):
        """回転した帯を、画像全体と同じ大きさの RGBA レイヤーとして返す"""
        layer = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
        bar = Image.new("RGB", (bar_w, bar_h))
        bd = ImageDraw.Draw(bar)
        for x in range(bar_w):
            bd.line([(x, 0), (x, bar_h)],
                    fill=lerp(accent, lerp(accent, INK_SOFT, 0.55), x / (bar_w - 1)))
        mask = Image.new("L", (bar_w, bar_h), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, bar_w - 1, bar_h - 1],
                                               radius=radius, fill=255)
        layer.paste(bar, (round(cx - bar_w / 2), round(cy - bar_h / 2 + shift)), mask)
        return layer.rotate(angle, resample=Image.BICUBIC, center=(cx, cy))

    physical = band(EMERALD, -13, -34 * SS)
    cognitive = band(INDIGO, 13, 34 * SS)

    img = base()

    # 2本の帯をぼかして下に敷き、地から浮かせる
    halo = Image.new("RGB", (CW, CH), (0, 0, 0))
    for layer in (physical, cognitive):
        halo.paste(layer.convert("RGB"), (0, 0), layer.split()[3])
    halo = halo.filter(ImageFilter.GaussianBlur(30 * SS))
    img = Image.blend(img, ImageChops.screen(img, halo), 0.75)

    img.paste(physical.convert("RGB"), (0, 0), physical.split()[3])
    img.paste(cognitive.convert("RGB"), (0, 0), cognitive.split()[3])

    # 重なり。2枚のマスクの積を取り、明るい色で塗り直す
    overlap = ImageChops.multiply(physical.split()[3], cognitive.split()[3])
    bright = Image.new("RGB", (CW, CH), lerp(lerp(EMERALD, INDIGO, 0.5), (255, 255, 255), 0.45))
    glow_layer = Image.new("RGB", (CW, CH), (0, 0, 0))
    glow_layer.paste(bright, (0, 0), overlap)
    img = Image.blend(img, ImageChops.screen(img, glow_layer.filter(
        ImageFilter.GaussianBlur(26 * SS))), 0.9)
    img.paste(bright, (0, 0), overlap)

    save(img, out)


# ------------------------------------------------------------------
def kv_reaction_time(out):
    """課題の型で反応時間が変わる、を絵にする。
    左端の縦線が刺激の瞬間。そこから右へ3本の棒が伸び、
    単純反応・Go/No-Go・選択反応の順に長くなる（ドンデルスが報告した a<c<b の順）"""
    lengths = [0.42, 0.62, 0.86]          # 刺激からの長さの比
    bar_h, gap = 86 * SS, 54 * SS
    x0 = 150 * SS
    span = CW - x0 - 150 * SS
    total_h = len(lengths) * bar_h + (len(lengths) - 1) * gap
    y0 = (CH - total_h) / 2
    radius = 43 * SS

    def bars():
        for i, ratio in enumerate(lengths):
            y = y0 + i * (bar_h + gap)
            yield i, y, x0 + span * ratio

    img = base()

    def shapes(d):
        for i, y, x1 in bars():
            accent = lerp(EMERALD, INDIGO, i / (len(lengths) - 1))
            d.rounded_rectangle([x0, y, x1, y + bar_h], radius=radius,
                                fill=tuple(round(c * 0.5) for c in accent))
    img = glow(img, shapes, blur=28, strength=0.85)

    d = ImageDraw.Draw(img)
    for i, y, x1 in bars():
        accent = lerp(EMERALD, INDIGO, i / (len(lengths) - 1))
        layer, mask, pos = gradient_bar([x0, y, x1, y + bar_h],
                                        accent, lerp(accent, INK_SOFT, 0.5), radius)
        img.paste(layer, pos, mask)
        d = ImageDraw.Draw(img)
        # 棒の右端。反応が起きた瞬間を点で示す
        d.ellipse([x1 - 13 * SS, y + bar_h / 2 - 13 * SS, x1 + 13 * SS, y + bar_h / 2 + 13 * SS],
                  fill=(255, 255, 255))

    # 刺激の瞬間を示す縦線。3本の起点がそろっていることを見せる
    d.rounded_rectangle([x0 - 10 * SS, y0 - 44 * SS, x0 - 4 * SS, y0 + total_h + 44 * SS],
                        radius=3 * SS, fill=(255, 255, 255))
    save(img, out)


# ------------------------------------------------------------------
def kv_measurement_methods(out):
    """目的が違えば物差しが違う、を絵にする。
    3本の物差しを縦に並べ、目盛りの刻み幅をそれぞれ変える。
    刻みが互いに揃わないことで、値を読み替えられない＝互いの代わりにならないことを示す"""
    divisions = [4, 7, 12]            # 物差しごとの目盛りの数。わざと公倍数にしない
    bar_h, gap = 92 * SS, 68 * SS
    x0, x1 = 150 * SS, CW - 150 * SS
    total_h = len(divisions) * bar_h + (len(divisions) - 1) * gap
    y0 = (CH - total_h) / 2
    radius = 18 * SS

    def rules():
        for i, n in enumerate(divisions):
            yield i, n, y0 + i * (bar_h + gap)

    img = base()

    def shapes(d):
        for i, _, y in rules():
            accent = lerp(EMERALD, INDIGO, i / (len(divisions) - 1))
            d.rounded_rectangle([x0, y, x1, y + bar_h], radius=radius,
                                fill=tuple(round(c * 0.42) for c in accent))
    img = glow(img, shapes, blur=26, strength=0.75)

    d = ImageDraw.Draw(img)
    for i, n, y in rules():
        accent = lerp(EMERALD, INDIGO, i / (len(divisions) - 1))
        layer, mask, pos = gradient_bar([x0, y, x1, y + bar_h],
                                        accent, lerp(accent, INK_SOFT, 0.62), radius)
        img.paste(layer, pos, mask)
        d = ImageDraw.Draw(img)

        # 目盛り。物差しごとに刻み幅が違うので、縦には揃わない
        step = (x1 - x0) / n
        for k in range(1, n):
            x = x0 + step * k
            long = k % 2 == 0 if n > 5 else True
            h = bar_h * (0.52 if long else 0.3)
            d.rounded_rectangle([x - 3 * SS, y + bar_h - h, x + 3 * SS, y + bar_h - 14 * SS],
                                radius=3 * SS,
                                fill=lerp((255, 255, 255), accent, 0.15 if long else 0.45))
    save(img, out)


# ------------------------------------------------------------------
def kv_training_transfer(out):
    """訓練した課題から離れるほど根拠が薄くなる、を絵にする。
    同心の3つの輪を描き、中心（訓練した課題）は明るく塗り、
    外側（近い課題・日常生活）へ向かうほど薄くし、いちばん外は輪郭だけにする"""
    cx, cy = CW / 2, CH / 2
    radii = [112 * SS, 196 * SS, 280 * SS]

    img = base()

    def shapes(d):
        d.ellipse([cx - radii[0], cy - radii[0], cx + radii[0], cy + radii[0]],
                  fill=tuple(round(c * 0.85) for c in EMERALD))
    img = glow(img, shapes, blur=34, strength=0.9)

    d = ImageDraw.Draw(img)

    # 外側から描く。外ほど薄く、いちばん外は塗らずに輪郭だけ
    for i in (2, 1, 0):
        r = radii[i]
        accent = lerp(EMERALD, INDIGO, i / 2)
        box = [cx - r, cy - r, cx + r, cy + r]
        if i == 2:
            d.ellipse(box, fill=tuple(round(c * 0.07) for c in accent),
                      outline=tuple(round(c * 0.5) for c in accent), width=3 * SS)
        elif i == 1:
            d.ellipse(box, fill=tuple(round(c * 0.2) for c in accent),
                      outline=tuple(round(c * 0.75) for c in accent), width=3 * SS)
        else:
            layer = Image.new("RGB", (round(r * 2), round(r * 2)))
            ld = ImageDraw.Draw(layer)
            for y in range(round(r * 2)):
                ld.line([(0, y), (r * 2, y)],
                        fill=lerp(accent, lerp(accent, INK_SOFT, 0.45), y / (r * 2 - 1)))
            mask = Image.new("L", (round(r * 2), round(r * 2)), 0)
            ImageDraw.Draw(mask).ellipse([0, 0, r * 2 - 1, r * 2 - 1], fill=255)
            img.paste(layer, (round(cx - r), round(cy - r)), mask)
            d = ImageDraw.Draw(img)

    # 中心から外へ向かう目盛り。距離があることを示す
    rule = tuple(round(c * 0.75) for c in MIST)
    for i in range(3):
        x = cx + radii[i]
        d.rounded_rectangle([x - 3 * SS, cy - 17 * SS, x + 3 * SS, cy + 17 * SS],
                            radius=3 * SS, fill=rule)
    save(img, out)


# ------------------------------------------------------------------
def kv_dual_task(out):
    """課題が重なると歩行が乱れる、を絵にする。
    左右交互の足跡を一定の間隔で並べ、途中（2つ目の課題が入る位置）から
    間隔を詰めて左右のぶれを大きくする。縦線が課題の加わった瞬間"""
    n_even, n_dis = 6, 7
    foot_w, foot_h = 58 * SS, 86 * SS
    cy = CH / 2
    spread = 52 * SS
    radius = 26 * SS

    # まず相対位置で並べ、あとで画面幅に合わせて正規化する
    feet = []                       # (x, y, 乱れているか)
    x, step = 0.0, 1.0
    for i in range(n_even):
        feet.append((x, cy + (-spread if i % 2 == 0 else spread), False))
        x += step
    switch_rel = x - step / 2
    jitter = [0.0, 0.42, -0.3, 0.72, -0.18, 0.95, 0.35]
    for i in range(n_dis):
        # 間隔を詰め、左右のぶれを大きくする
        x += step * (0.72 - i * 0.03)
        wobble = spread * (1.3 + jitter[i] * 0.45)
        feet.append((x, cy + (-wobble if (i + n_even) % 2 == 0 else wobble), True))

    # 左右の余白をそろえて収める
    margin = 128 * SS
    scale = (CW - margin * 2 - foot_w) / x
    feet = [(margin + fx * scale, fy, dis) for fx, fy, dis in feet]
    switch_x = margin + switch_rel * scale + foot_w / 2

    img = base()

    def shapes(d):
        for fx, fy, dis in feet:
            accent = INDIGO if dis else EMERALD
            d.rounded_rectangle([fx, fy - foot_h / 2, fx + foot_w, fy + foot_h / 2],
                                radius=radius, fill=tuple(round(c * 0.5) for c in accent))
    img = glow(img, shapes, blur=24, strength=0.8)

    d = ImageDraw.Draw(img)
    for fx, fy, dis in feet:
        accent = INDIGO if dis else EMERALD
        layer, mask, pos = gradient_bar([fx, fy - foot_h / 2, fx + foot_w, fy + foot_h / 2],
                                        accent, lerp(accent, INK_SOFT, 0.55), radius)
        img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 2つ目の課題が加わる位置
    rule = tuple(round(c * 0.85) for c in MIST)
    for y in range(round(cy - 250 * SS), round(cy + 250 * SS), 18 * SS):
        d.line([(switch_x, y), (switch_x, y + 9 * SS)], fill=rule, width=3 * SS)
    save(img, out)


# ------------------------------------------------------------------
def kv_vision_vs_reaction(out):
    """動体視力と反応時間は別のもの、を絵にする。
    上段は横に走る対象の軌跡と、見分けられた位置を示す点（動体視力）。
    下段は同じ軌跡の上に、見てから動き出すまでの長さを示す帯（反応時間）。
    起点をそろえ、測っている区間が重ならないことを見せる"""
    x0, x1 = 170 * SS, CW - 170 * SS
    y_top, y_bot = CH / 2 - 108 * SS, CH / 2 + 108 * SS
    see_at = x0 + (x1 - x0) * 0.46        # 見分けられた位置
    move_to = x0 + (x1 - x0) * 0.78       # 動き出した位置
    track_h = 10 * SS

    img = base()

    def shapes(d):
        d.ellipse([see_at - 34 * SS, y_top - 34 * SS, see_at + 34 * SS, y_top + 34 * SS],
                  fill=tuple(round(c * 0.75) for c in EMERALD))
        d.rounded_rectangle([see_at, y_bot - 34 * SS, move_to, y_bot + 34 * SS],
                            radius=34 * SS, fill=tuple(round(c * 0.6) for c in INDIGO))
    img = glow(img, shapes, blur=28, strength=0.85)

    d = ImageDraw.Draw(img)

    # 対象の軌跡。上下とも同じ長さで引く
    for y in (y_top, y_bot):
        d.rounded_rectangle([x0, y - track_h / 2, x1, y + track_h / 2],
                            radius=track_h / 2, fill=tuple(round(c * 0.4) for c in MIST))

    # 上段：見分けられた一点
    layer, mask, pos = gradient_bar([see_at - 30 * SS, y_top - 30 * SS,
                                     see_at + 30 * SS, y_top + 30 * SS],
                                    EMERALD, lerp(EMERALD, INK_SOFT, 0.45), 30 * SS)
    img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 下段：見てから動き出すまでの区間
    layer, mask, pos = gradient_bar([see_at, y_bot - 30 * SS, move_to, y_bot + 30 * SS],
                                    INDIGO, lerp(INDIGO, INK_SOFT, 0.5), 30 * SS)
    img.paste(layer, pos, mask)
    d = ImageDraw.Draw(img)

    # 起点をそろえる縦の破線。同じ瞬間から別のものを測っていることを示す
    rule = tuple(round(c * 0.8) for c in MIST)
    for y in range(round(y_top - 86 * SS), round(y_bot + 86 * SS), 18 * SS):
        d.line([(see_at, y), (see_at, y + 9 * SS)], fill=rule, width=3 * SS)
    # 下段の終点
    d.rounded_rectangle([move_to - 3 * SS, y_bot - 56 * SS, move_to + 3 * SS, y_bot + 56 * SS],
                        radius=3 * SS, fill=(255, 255, 255))
    save(img, out)


KEYVISUALS = {
    "elderly-worker-fitness-check": kv_fitness_check,
    "elderly-worker-safety-guideline-five-measures": kv_five_measures,
    "revised-safety-act-2026-vs-old-guideline": kv_old_vs_new,
    "safety-act-62-2-target-age": kv_target_age,
    "elderly-worker-accidents-why-increasing": kv_accidents_increasing,
    "fall-accident-patterns": kv_fall_patterns,
    "fall-prevention-workplace-measures": kv_prevention_layers,
    "two-step-test-method-and-reading": kv_two_scales,
    "single-leg-stance-test-what-it-shows": kv_single_leg,
    "cognitive-function-what-it-is": kv_cognitive_domains,
    "cognitive-exercise-what-it-is": kv_cognitive_exercise,
    "reaction-time-types": kv_reaction_time,
    "cognitive-measurement-methods": kv_measurement_methods,
    "cognitive-training-what-it-aims-for": kv_training_transfer,
    "dual-task-what-it-is": kv_dual_task,
    "reaction-speed-vs-dynamic-visual-acuity": kv_vision_vs_reaction,
}


def main():
    outdir = Path(sys.argv[1]) / "public/images/columns"
    outdir.mkdir(parents=True, exist_ok=True)
    print("生成:")
    for slug, fn in KEYVISUALS.items():
        fn(outdir / f"{slug}.jpg")


if __name__ == "__main__":
    main()
