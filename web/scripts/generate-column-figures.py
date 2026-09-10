"""
コラム記事に差し込む図版を生成する。

    python3 scripts/generate-column-figures.py .

写真ではなく図解。記事の主張を一目で伝えるためのもので、
サイトのデザイントークン（ink 地に indigo→emerald のアクセント）に合わせている。
3倍で描いて縮小し、輪郭を滑らかにする。
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, SS = 1600, 900, 3
CW, CH = W * SS, H * SS

INK_DEEP = (7, 12, 24)
INK      = (15, 23, 42)
INK_SOFT = (22, 32, 60)
INDIGO   = (129, 140, 248)
EMERALD  = (52, 211, 153)
MIST     = (147, 162, 191)
MIST_LT  = (199, 210, 228)
WHITE    = (255, 255, 255)

FONT_W3 = "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc"
FONT_W6 = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"


def font(size, bold=False):
    return ImageFont.truetype(FONT_W6 if bold else FONT_W3, size * SS)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def base():
    """地色とグリッド。カバー画像と同じ質感にそろえる"""
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
    from PIL import ImageChops
    return Image.blend(img, ImageChops.screen(img, grid), 0.5)


def center_text(d, box, text, f, fill):
    x0, y0, x1, y1 = box
    tb = d.textbbox((0, 0), text, font=f)
    d.text(((x0 + x1 - tb[2] + tb[0]) / 2, (y0 + y1 - tb[3] - tb[1]) / 2), text, font=f, fill=fill)


def save(img, path):
    img.resize((W, H), Image.LANCZOS).save(
        path, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)
    print(f"  {path.name}  {path.stat().st_size // 1024}KB")


# ------------------------------------------------------------------ 図1
def figure_stages(out):
    """災害が起きる4段階と、体力チェックが見ている範囲"""
    img = base()
    d = ImageDraw.Draw(img)

    f_title = font(30, True)
    f_step = font(34, True)
    f_sub = font(19)
    f_label = font(21, True)
    f_note = font(18)

    d.text((92 * SS, 78 * SS), "災害が起きるまでの4段階", font=f_title, fill=WHITE)
    d.text((92 * SS, 126 * SS), "体力チェックが対象にしているのは、最後の「動く」段階", font=f_sub, fill=MIST)

    steps = [("見る", "危険が視界に入る"), ("気づく", "危険だと認知する"),
             ("判断する", "避け方を決める"), ("動く", "身体を動かす")]
    bw, gap = 300 * SS, 40 * SS
    x0, y0, bh = 92 * SS, 268 * SS, 210 * SS

    for i, (title, sub) in enumerate(steps):
        x = x0 + i * (bw + gap)
        cognitive = i < 3
        accent = INDIGO if cognitive else EMERALD
        d.rounded_rectangle([x, y0, x + bw, y0 + bh], radius=18 * SS,
                            fill=tuple(round(c * 0.14) for c in accent),
                            outline=accent, width=2 * SS)
        center_text(d, (x, y0 + 52 * SS, x + bw, y0 + 108 * SS), title, f_step, WHITE)
        center_text(d, (x, y0 + 118 * SS, x + bw, y0 + 162 * SS), sub, f_sub, MIST_LT)
        if i < 3:  # 矢印
            ax = x + bw + gap / 2
            ay = y0 + bh / 2
            d.line([(ax - 13 * SS, ay), (ax + 9 * SS, ay)], fill=MIST, width=2 * SS)
            d.polygon([(ax + 14 * SS, ay), (ax + 4 * SS, ay - 7 * SS),
                       (ax + 4 * SS, ay + 7 * SS)], fill=MIST)

    # 下の帯：どこを測れているか
    band_y = y0 + bh + 96 * SS
    cog_x1 = x0 + 3 * bw + 2 * gap
    phy_x0 = x0 + 3 * (bw + gap)
    phy_x1 = phy_x0 + bw

    for (bx0, bx1, accent, label, note) in [
        (x0, cog_x1, INDIGO, "認知・反応の測定が必要な範囲",
         "反応時間、注意機能、判断の正確さ"),
        (phy_x0, phy_x1, EMERALD, "一般的な体力チェックの範囲",
         "筋力、バランス能力"),
    ]:
        d.rounded_rectangle([bx0, band_y, bx1, band_y + 6 * SS], radius=3 * SS, fill=accent)
        d.text((bx0, band_y + 26 * SS), label, font=f_label, fill=accent)
        d.text((bx0, band_y + 60 * SS), note, font=f_note, fill=MIST)

    d.text((92 * SS, CH - 74 * SS),
           "出典：高年齢者の労働災害防止のための指針（令和8年2月10日 公示第1号）をもとに作成",
           font=font(16), fill=tuple(round(c * 0.85) for c in MIST))
    save(img, out)


# ------------------------------------------------------------------ 図2
def figure_traits(out):
    """指針が挙げる6つの特性と、測定手段の対応"""
    img = base()
    d = ImageDraw.Draw(img)

    f_title = font(30, True)
    f_sub = font(19)
    f_row = font(24, True)
    f_cell = font(18)
    f_head = font(18, True)

    d.text((92 * SS, 78 * SS), "指針が挙げる6つの特性と、測定手段の対応", font=f_title, fill=WHITE)
    d.text((92 * SS, 126 * SS), "指針は考慮すべき特性として認知機能を明記している", font=f_sub, fill=MIST)

    rows = [
        ("筋力", True, "握力測定、立ち上がりテスト"),
        ("バランス能力", True, "片脚起立テスト"),
        ("敏捷性", False, "一般的な体力チェックでは対象になりにくい"),
        ("全身持久力", True, "専用の評価方法が示されている"),
        ("感覚機能", False, "視力・聴力の確認が中心"),
        ("認知機能", False, "反応時間や判断課題の測定が必要"),
    ]
    x0, y0 = 92 * SS, 206 * SS
    rw, rh, rgap = 1416 * SS, 76 * SS, 10 * SS
    col = x0 + 330 * SS

    d.text((x0 + 22 * SS, y0 - 34 * SS), "特性", font=f_head, fill=MIST)
    d.text((col, y0 - 34 * SS), "測定手段", font=f_head, fill=MIST)

    for i, (name, covered, how) in enumerate(rows):
        y = y0 + i * (rh + rgap)
        accent = EMERALD if covered else INDIGO
        d.rounded_rectangle([x0, y, x0 + rw, y + rh], radius=14 * SS,
                            fill=tuple(round(c * (0.10 if covered else 0.16)) for c in accent),
                            outline=tuple(round(c * (0.55 if covered else 1.0)) for c in accent),
                            width=2 * SS)
        d.rounded_rectangle([x0, y, x0 + 5 * SS, y + rh], radius=3 * SS, fill=accent)
        d.text((x0 + 26 * SS, y + 24 * SS), name, font=f_row, fill=WHITE)
        d.text((col, y + 28 * SS), how, font=f_cell, fill=MIST_LT)

    # 凡例
    ly = y0 + 6 * (rh + rgap) + 34 * SS
    for (cx, accent, label) in [(x0, EMERALD, "体力チェックで把握できる"),
                                (x0 + 480 * SS, INDIGO, "体力チェックでは捉えにくい")]:
        d.rounded_rectangle([cx, ly + 6 * SS, cx + 26 * SS, ly + 17 * SS], radius=5 * SS, fill=accent)
        d.text((cx + 40 * SS, ly), label, font=font(17), fill=MIST)

    d.text((92 * SS, ly + 62 * SS),
           "出典：高年齢者の労働災害防止のための指針 第2の2(2) をもとに作成",
           font=font(16), fill=tuple(round(c * 0.85) for c in MIST))
    save(img, out)


def main():
    web = Path(sys.argv[1])
    outdir = web / "public/images/columns"
    outdir.mkdir(parents=True, exist_ok=True)
    print("生成:")
    figure_stages(outdir / "fig-accident-stages.jpg")
    figure_traits(outdir / "fig-six-traits.jpg")


if __name__ == "__main__":
    main()
