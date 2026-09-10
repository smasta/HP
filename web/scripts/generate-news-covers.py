"""
ニュース記事のキービジュアルを生成する。

    python3 scripts/generate-news-covers.py .      # web/ で実行する

出力先は public/images/news/covers/{slug}.webp。
記事を追加したら再実行し、lib/news.json の cover を設定すること
（OVERRIDES に slug を足すとモチーフを指定できる）。

同じ写真の使い回しをやめ、記事ごとに固有の図版を持たせるためのもの。
報道記事に実写風の生成画像を当てると、実在しない現場や人物を
撮影写真のように見せてしまうため、SMARTSTARTのデザイントークンに沿った
抽象的な計測モチーフで描いている。

・記事の本文キーワードからモチーフを選ぶ
・slug をシードにして、同じモチーフでも記事ごとに形が変わる
・3倍で描いて縮小し、輪郭を滑らかにする
"""
import json, math, random, re, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, SS = 1200, 630, 3          # 出力サイズと描画倍率
CW, CH = W * SS, H * SS

INK_DEEP = (7, 12, 24)
INK      = (15, 23, 42)
INK_SOFT = (22, 32, 60)
INDIGO   = (129, 140, 248)
EMERALD  = (52, 211, 153)
CORAL    = (255, 111, 97)
MIST     = (147, 162, 191)
MIST_LT  = (199, 210, 228)   # mist-300。会社情報系のアクセントに使う


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def background(rng, accent_a, accent_b):
    """奥行きのある地色 ＋ オーロラの滲み ＋ 計測グリッド"""
    img = Image.new("RGB", (CW, CH), INK)
    d = ImageDraw.Draw(img)
    for y in range(CH):
        t = y / CH
        # 上を締めて下をわずかに持ち上げる
        c = lerp(INK_DEEP, INK_SOFT, t ** 1.25)
        d.line([(0, y), (CW, y)], fill=c)

    # オーロラ（小さく描いて拡大するとぼけ足が自然になる）
    glow = Image.new("RGB", (CW, CH), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for accent, spread in ((accent_a, 0.62), (accent_b, 0.5)):
        cx = rng.uniform(0.1, 0.9) * CW
        cy = rng.uniform(0.05, 0.85) * CH
        r = rng.uniform(0.35, 0.6) * CW
        steps = 46
        for i in range(steps, 0, -1):
            t = i / steps
            rr = r * t
            k = (1 - t) ** 2.1 * spread
            gd.ellipse([cx - rr, cy - rr, cx + rr, cy + rr],
                       fill=tuple(round(ch * k) for ch in accent))
    glow = glow.filter(ImageFilter.GaussianBlur(CW // 26))
    img = Image.blend(img, Image.blend(img, glow, 0.55), 0.62)

    # 計測グリッド
    grid = Image.new("RGB", (CW, CH), (0, 0, 0))
    gd = ImageDraw.Draw(grid)
    cell = 84 * SS
    line = tuple(round(ch * 0.30) for ch in MIST)
    for x in range(0, CW, cell):
        gd.line([(x, 0), (x, CH)], fill=line, width=SS)
    for y in range(0, CH, cell):
        gd.line([(0, y), (CW, y)], fill=line, width=SS)
    return Image.blend(img, ImageChopsScreen(img, grid), 0.5)


def ImageChopsScreen(a, b):
    from PIL import ImageChops
    return ImageChops.screen(a, b)


def glow_line(img, pts, accent_a, accent_b, width, halo=True):
    """グラデーションのかかった発光する折れ線"""
    if halo:
        layer = Image.new("RGB", img.size, (0, 0, 0))
        ld = ImageDraw.Draw(layer)
        for i in range(len(pts) - 1):
            t = i / max(len(pts) - 2, 1)
            ld.line([pts[i], pts[i + 1]], fill=lerp(accent_a, accent_b, t),
                    width=width * 5, joint="curve")
        layer = layer.filter(ImageFilter.GaussianBlur(width * 2.2))
        from PIL import ImageChops
        img.paste(ImageChops.screen(img, layer))

    d = ImageDraw.Draw(img)
    for i in range(len(pts) - 1):
        t = i / max(len(pts) - 2, 1)
        d.line([pts[i], pts[i + 1]], fill=lerp(accent_a, accent_b, t),
               width=width, joint="curve")


def smooth(points, samples=14):
    """折れ線をカトマル・ロム補間でなめらかにする"""
    if len(points) < 3:
        return points
    pts = [points[0]] + list(points) + [points[-1]]
    out = []
    for i in range(len(pts) - 3):
        p0, p1, p2, p3 = pts[i:i + 4]
        for s in range(samples):
            t = s / samples
            t2, t3 = t * t, t * t * t
            x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t +
                       (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                       (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)
            y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t +
                       (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                       (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
            out.append((x, y))
    out.append(points[-1])
    return out


# ------------------------------------------------------------------ モチーフ

def motif_pulse(img, rng, a, b):
    """反応の波形。測定・反応能力の記事に使う"""
    d = ImageDraw.Draw(img)
    base = CH * rng.uniform(0.56, 0.64)
    n = rng.randint(7, 9)
    raw, peaks = [], []
    for i in range(n + 1):
        x = CW * (0.08 + 0.84 * i / n)
        amp = rng.uniform(0.10, 0.30) * CH
        y = base - amp if i % 2 else base + amp * rng.uniform(0.2, 0.5)
        raw.append((x, y))
        if i % 2:
            peaks.append((x, y))
    glow_line(img, smooth(raw), a, b, 4 * SS)
    for i, (x, y) in enumerate(peaks):
        r = (9 + rng.randint(0, 5)) * SS
        c = lerp(a, b, i / max(len(peaks) - 1, 1))
        d.ellipse([x - r, y - r, x + r, y + r], fill=c)
        r2 = r * 2.6
        d.ellipse([x - r2, y - r2, x + r2, y + r2], outline=c, width=SS)


def motif_orbit(img, rng, a, b):
    """同心円とゲージ。転倒リスクや評価の記事に使う"""
    d = ImageDraw.Draw(img)
    cx = CW * rng.uniform(0.56, 0.72)
    cy = CH * rng.uniform(0.44, 0.56)
    base = CH * rng.uniform(0.30, 0.36)
    for i in range(5):
        r = base * (0.34 + i * 0.17)
        c = lerp(a, b, i / 4)
        d.ellipse([cx - r, cy - r, cx + r, cy + r],
                  outline=tuple(round(ch * (0.30 + 0.14 * i)) for ch in c),
                  width=(1 if i < 3 else 2) * SS)
    # ゲージ弧
    start = rng.uniform(-210, -150)
    sweep = rng.uniform(150, 250)
    r = base * 0.87
    arc = [(cx + r * math.cos(math.radians(start + sweep * t / 40)),
            cy + r * math.sin(math.radians(start + sweep * t / 40))) for t in range(41)]
    glow_line(img, arc, a, b, 5 * SS)
    ex, ey = arc[-1]
    d.ellipse([ex - 11 * SS, ey - 11 * SS, ex + 11 * SS, ey + 11 * SS], fill=b)
    d.ellipse([cx - 5 * SS, cy - 5 * SS, cx + 5 * SS, cy + 5 * SS], fill=MIST)


def motif_lattice(img, rng, a, b):
    """節点と線。取材・情報発信の記事に使う"""
    d = ImageDraw.Draw(img)
    nodes = [(CW * rng.uniform(0.10, 0.92), CH * rng.uniform(0.16, 0.84))
             for _ in range(rng.randint(9, 12))]
    for i, p in enumerate(nodes):
        for q in nodes[i + 1:]:
            dist = math.dist(p, q)
            if dist < CW * 0.27:
                k = 1 - dist / (CW * 0.27)
                # 遠い組み合わせほど淡くするが、黒に沈まないよう下限を持たせる
                d.line([p, q], fill=tuple(round(ch * (0.26 + 0.74 * k) * 0.8)
                                          for ch in lerp(a, b, p[0] / CW)), width=SS)
    for i, (x, y) in enumerate(nodes):
        r = rng.choice([5, 7, 10, 14]) * SS
        c = lerp(a, b, x / CW)
        d.ellipse([x - r, y - r, x + r, y + r], fill=c)


def motif_series(img, rng, a, b):
    """棒グラフと推移線。健康経営・実績の記事に使う"""
    d = ImageDraw.Draw(img)
    n = rng.randint(9, 12)
    base = CH * 0.76
    x0, span = CW * 0.10, CW * 0.80
    bw = span / n * 0.44
    tops = []
    for i in range(n):
        x = x0 + span * (i + 0.5) / n
        h = CH * (0.10 + 0.34 * ((i / n) ** 0.85) * rng.uniform(0.7, 1.25))
        c = lerp(a, b, i / (n - 1))
        d.rounded_rectangle([x - bw / 2, base - h, x + bw / 2, base],
                            radius=bw / 2.4,
                            fill=tuple(round(ch * 0.42) for ch in c))
        d.rounded_rectangle([x - bw / 2, base - h, x + bw / 2, base - h + bw * 1.1],
                            radius=bw / 2.4, fill=c)
        tops.append((x, base - h))
    glow_line(img, smooth(tops), a, b, 3 * SS, halo=False)
    d.line([(x0 * 0.8, base), (x0 + span * 1.04, base)],
           fill=tuple(round(ch * 0.5) for ch in MIST), width=SS)


def motif_hex(img, rng, a, b):
    """六角形。認定・加盟の記事に使う"""
    d = ImageDraw.Draw(img)
    cx = CW * rng.uniform(0.58, 0.70)
    cy = CH * 0.5
    rot = rng.uniform(0, 60)

    def hexagon(r):
        return [(cx + r * math.cos(math.radians(rot + k * 60)),
                 cy + r * math.sin(math.radians(rot + k * 60))) for k in range(6)]

    big = CH * rng.uniform(0.32, 0.38)
    for i, k in enumerate((1.0, 0.72, 0.46, 0.24)):
        pts = hexagon(big * k)
        c = lerp(a, b, i / 3)
        d.polygon(pts, outline=c, width=(3 if i == 0 else 1) * SS)
    seg = hexagon(big)
    idx = rng.randint(0, 5)
    glow_line(img, [seg[idx], seg[(idx + 1) % 6], seg[(idx + 2) % 6]], a, b, 5 * SS)
    d.ellipse([cx - 7 * SS, cy - 7 * SS, cx + 7 * SS, cy + 7 * SS], fill=b)


def motif_burst(img, rng, a, b):
    """放射。イベント・大会の記事に使う"""
    d = ImageDraw.Draw(img)
    cx = CW * rng.uniform(0.30, 0.46)
    cy = CH * rng.uniform(0.46, 0.60)
    n = rng.randint(22, 30)
    for i in range(n):
        ang = math.radians(360 * i / n + rng.uniform(-4, 4))
        r0 = CH * rng.uniform(0.09, 0.14)
        r1 = r0 + CH * rng.uniform(0.10, 0.34)
        p0 = (cx + r0 * math.cos(ang), cy + r0 * math.sin(ang))
        p1 = (cx + r1 * math.cos(ang), cy + r1 * math.sin(ang))
        # 画面外に突き抜けると切り落とされて見えるので内側に丸める
        m = 26 * SS
        while (not (m < p1[0] < CW - m and m < p1[1] < CH - m)) and r1 > r0:
            r1 -= 6 * SS
            p1 = (cx + r1 * math.cos(ang), cy + r1 * math.sin(ang))
        if r1 <= r0:
            continue
        c = lerp(a, b, (math.cos(ang) + 1) / 2)
        d.line([p0, p1], fill=c, width=rng.choice([1, 2, 3]) * SS)
    r = CH * 0.075
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=b, width=3 * SS)


def motif_steps(img, rng, a, b):
    """階段状の積み上げ。節目・製品発表の記事に使う"""
    d = ImageDraw.Draw(img)
    n = rng.randint(5, 7)
    x0, span = CW * 0.12, CW * 0.76
    base = CH * 0.74
    bw = span / n * 0.7
    for i in range(n):
        x = x0 + span * i / n
        h = CH * (0.09 + 0.082 * i) * rng.uniform(0.97, 1.05)
        c = lerp(a, b, i / (n - 1))
        d.rounded_rectangle([x, base - h, x + bw, base], radius=10 * SS,
                            fill=tuple(round(ch * 0.52) for ch in c))
        d.rounded_rectangle([x, base - h, x + bw, base - h + 7 * SS],
                            radius=4 * SS, fill=c)
        d.ellipse([x + bw / 2 - 7 * SS, base - h - 26 * SS,
                   x + bw / 2 + 7 * SS, base - h - 12 * SS], fill=c)


def motif_ripple(img, rng, a, b):
    """左下から広がる同心の弧。発売・提供開始の記事に使う"""
    d = ImageDraw.Draw(img)
    cx, cy = CW * rng.uniform(0.06, 0.16), CH * rng.uniform(0.86, 0.98)
    n = rng.randint(7, 9)
    for i in range(n):
        r = CH * (0.16 + 0.115 * i) * rng.uniform(0.95, 1.05)
        c = lerp(a, b, i / (n - 1))
        k = 0.32 + 0.68 * (i / (n - 1))
        d.arc([cx - r, cy - r, cx + r, cy + r], -92, 2,
              fill=tuple(round(ch * k) for ch in c),
              width=(3 if i == n - 1 else 2) * SS)
    r = CH * (0.16 + 0.115 * (n - 1))
    arc = [(cx + r * math.cos(math.radians(-92 + 94 * t / 40)),
            cy + r * math.sin(math.radians(-92 + 94 * t / 40))) for t in range(41)]
    glow_line(img, arc, a, b, 4 * SS)
    d.ellipse([cx - 8 * SS, cy - 8 * SS, cx + 8 * SS, cy + 8 * SS], fill=b)


def motif_axis(img, rng, a, b):
    """散布図と回帰線。データ活用・分析の記事に使う"""
    d = ImageDraw.Draw(img)
    x0, y0 = CW * 0.16, CH * 0.70
    x1, y1 = CW * 0.90, CH * 0.17
    axis = tuple(round(ch * 0.45) for ch in MIST)
    d.line([(x0, y0), (x1, y0)], fill=axis, width=SS)
    d.line([(x0, y0), (x0, y1)], fill=axis, width=SS)
    for i in range(5):
        gy = y0 + (y1 - y0) * (i + 1) / 5
        d.line([(x0, gy), (x1, gy)], fill=tuple(round(ch * 0.22) for ch in MIST), width=SS)
    pts = []
    n = rng.randint(13, 17)
    for i in range(n):
        t = i / (n - 1)
        x = x0 + (x1 - x0) * t
        y = y0 + (y1 - y0) * (t ** 0.9) + rng.uniform(-0.07, 0.07) * CH
        pts.append((x, y))
        r = rng.choice([6, 8, 11]) * SS
        c = lerp(a, b, t)
        d.ellipse([x - r, y - r, x + r, y + r], fill=c)
    trend = [(x0, y0 + (y1 - y0) * 0.06), (x1, y0 + (y1 - y0) * 0.94)]
    glow_line(img, trend, a, b, 3 * SS)


MOTIFS = {
    "pulse": motif_pulse, "orbit": motif_orbit, "lattice": motif_lattice,
    "series": motif_series, "hex": motif_hex, "burst": motif_burst,
    "steps": motif_steps, "ripple": motif_ripple, "axis": motif_axis,
}

MOTIF_JA = {
    "pulse": "反応の波形", "orbit": "同心円とゲージ", "lattice": "節点と接続線",
    "series": "棒グラフと推移線", "hex": "六角形の階層", "burst": "放射する線",
    "steps": "階段状の積み上げ", "ripple": "広がる同心の弧", "axis": "散布図と回帰線",
}

# 記事の内容からモチーフを決める（上から順に判定）
RULES = [
    (r"転倒|CARE|介護|高齢|フレイル|認知症",              "orbit"),
    (r"反応能力|安全能力|測定|認知機能|VOICE|運動認知",      "pulse"),
    (r"Pマーク|加盟|協会|Sports in Life|TAIS|認定",        "hex"),
    (r"Well|健康経営|企業|収益|DX",                      "series"),
    (r"フェスタ|出展|イベント|CHALLENGE|eスポーツ|南葛",     "burst"),
    (r"取材|マガジン|Journal|ホームページ",                "lattice"),
    (r"発売|シリーズ|提携|事業開始|期が始まり|開始",         "steps"),
]
CATEGORY_FALLBACK = {
    "REAXION": "pulse", "測定事業": "pulse", "会社情報": "lattice",
    "イベント": "burst", "お知らせ": "steps",
}

ACCENTS = {
    "REAXION": (INDIGO, EMERALD), "測定事業": (INDIGO, EMERALD),
    "会社情報": (INDIGO, MIST_LT), "イベント": (EMERALD, INDIGO),
    "お知らせ": (INDIGO, MIST_LT),
}


# 既存記事は内容を読んで手で割り当てている。
# 正規表現だけに任せると「Pマーク取得」が本文の“企業”に反応するなど取り違えるため。
OVERRIDES = {
    "reaxion-voice-poc":                "orbit",   # 介護施設での測定・トレーニング
    "reaxion-care-tais":                "hex",     # TAIS登録という認定の話
    "reaction-ability-measurement":     "pulse",   # 反応能力の測定
    "reaxion-care-release":             "orbit",   # 転倒リスクの評価
    "reaxionwellpr":                    "series",  # 企業の健康経営
    "20250425":                         "axis",    # DX×AIによるデータ活用
    "nankatsu-sc-partnership":          "pulse",   # サッカークラブとの提携
    "tokyo-esports-festa-2024":         "burst",   # イベント出展
    "toretopi":                         "lattice", # 媒体取材
    "k-journal":                        "lattice", # 媒体取材
    "japan-sports-vision-association":  "orbit",   # スポーツビジョン協会（同日の加盟記事と並ぶため別モチーフ）
    "sports-in-life":                   "hex",     # 協会加盟
    "reaxion-challenge":                "burst",   # 観客参加イベント
    "privacy-mark":                     "hex",     # 認定取得
    "20221221":                         "series",  # シリーズ第3弾
    "20221215":                         "pulse",   # ビジョントレーニング機器
    "20221201":                         "lattice", # メソッド提携
    "20221121":                         "ripple",  # シリーズ発売開始
    "website-update-2022":              "lattice", # サイト更新
    "10th-fiscal-year":                 "steps",   # 期の節目
    "poolno-release":                   "ripple",  # 製品発売
    "business-started":                 "steps",   # 事業開始
}


def pick_motif(item):
    if item["slug"] in OVERRIDES:
        return OVERRIDES[item["slug"]]
    # 今後追加される記事はキーワードから推定する
    hay = item["title"] + " " + item.get("summary", "")
    for pattern, name in RULES:
        if re.search(pattern, hay):
            return name
    return CATEGORY_FALLBACK.get(item.get("category"), "pulse")


def label_text(draw, xy, text, font, color, tracking):
    """字間を空けて描く（サイトの .eyebrow に合わせている）"""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=color)
        x += draw.textlength(ch, font=font) + tracking
    return x


def load_font(size):
    for path in ("/System/Library/Fonts/Supplemental/Futura.ttc",
                 "/System/Library/Fonts/Avenir Next Condensed.ttc",
                 "/System/Library/Fonts/Helvetica.ttc"):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()


CATEGORY_EN = {
    "REAXION": "REAXION", "測定事業": "MEASUREMENT", "会社情報": "COMPANY",
    "イベント": "EVENT", "お知らせ": "NEWS",
}


def build(item, out_path):
    rng = random.Random(item["slug"])
    a, b = ACCENTS.get(item.get("category"), (INDIGO, EMERALD))
    if rng.random() < 0.5:
        a, b = b, a

    img = background(rng, a, b)
    name = pick_motif(item)
    MOTIFS[name](img, rng, a, b)

    # キャプションの下地。モチーフが重なっても文字が読めるように暗く落とす
    scrim = Image.new("L", (CW, CH), 0)
    sd = ImageDraw.Draw(scrim)
    sw, sh = int(CW * 0.40), int(CH * 0.42)
    for i in range(40):
        t = i / 39
        sd.rectangle([0, CH - sh * (1 - t) - 1, sw * (1 - t), CH],
                     fill=int(245 * (t ** 0.62)))
    scrim = scrim.filter(ImageFilter.GaussianBlur(CW // 40))
    img.paste(Image.new("RGB", (CW, CH), INK_DEEP), (0, 0), scrim)

    # 左下のアクセント罫線だけを置く。
    # カテゴリ名と日付はページ側が文字として出しているので焼き込まない
    # （記事ヘッダーでは見出しが重なるため、画像内の文字とぶつかる）
    d = ImageDraw.Draw(img)
    # 一覧カードは 16:10 で左右が約96px切り取られるため、その内側に置く
    x0, y0 = 124 * SS, CH - 66 * SS
    for i in range(46 * SS):
        d.rectangle([x0 + i, y0, x0 + i + 1, y0 + 3 * SS],
                    fill=lerp(a, b, i / (46 * SS)))

    img = img.resize((W, H), Image.LANCZOS)
    img.save(out_path, "JPEG", quality=88, optimize=True,
             progressive=True, subsampling=0)
    return name


def main():
    root = Path(__file__).resolve()
    web = Path(sys.argv[1])
    data = json.loads((web / "lib/news.json").read_text(encoding="utf-8"))
    outdir = web / "public/images/news/covers"
    outdir.mkdir(parents=True, exist_ok=True)

    report = []
    for item in data:
        # 取材元から持ってきた実写はそのまま残す。
        # 自動生成した cover は上書きして作り直す
        cover = item.get("cover") or {}
        if cover.get("src") and "/news/covers/" not in cover["src"]:
            report.append((item["slug"], "既存の実写を維持", "-"))
            continue
        path = outdir / f"{item['slug']}.jpg"
        name = build(item, path)
        report.append((item["slug"], name, f"{path.stat().st_size // 1024}KB"))

    for slug, motif, size in report:
        print(f"{slug:<42}{motif:<10}{size}")
    print(f"\n生成: {sum(1 for r in report if r[1] != '既存の実写を維持')} 枚")


if __name__ == "__main__":
    main()
