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


def wrap(d, text, f, width):
    """指定幅に収まるよう改行する。日本語なので文字単位で折る"""
    lines, cur = [], ""
    for ch in text:
        t = cur + ch
        if d.textlength(t, font=f) > width and cur:
            lines.append(cur)
            cur = ch
        else:
            cur = t
    if cur:
        lines.append(cur)
    return lines


def center_lines(d, box, lines, f, fill, leading):
    x0, y0, x1, y1 = box
    total = len(lines) * leading
    y = (y0 + y1 - total) / 2
    for ln in lines:
        w = d.textlength(ln, font=f)
        d.text(((x0 + x1 - w) / 2, y), ln, font=f, fill=fill)
        y += leading


def arrow(d, x, y, fill, size):
    d.line([(x - size, y), (x + size * 0.45, y)], fill=fill, width=2 * SS)
    d.polygon([(x + size, y), (x + size * 0.35, y - size * 0.42),
               (x + size * 0.35, y + size * 0.42)], fill=fill)


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



# ------------------------------------------------------------------ 図3
def figure_five_measures(out):
    """指針が定める5つの措置。並列ではなく一続きの流れであることを示す"""
    img = base()
    d = ImageDraw.Draw(img)

    d.text((92 * SS, 78 * SS), "指針が定める5つの措置", font=font(30, True), fill=WHITE)
    d.text((92 * SS, 126 * SS), "体制づくりから教育まで、一続きの流れとして書かれている",
           font=font(19), fill=MIST)

    # 文字単位の折り返しでは「立等」だけが残るなど収まりが悪いので、改行位置を持たせる
    names = [
        "安全衛生管理体制\nの確立等",
        "職場環境の改善",
        "高年齢者の健康や\n体力の状況の把握",
        "高年齢者の健康や\n体力の状況に\n応じた対応",
        "安全衛生教育",
    ]
    f_num, f_name = font(30, True), font(20, True)
    bw, gap = 262 * SS, 42 * SS
    x0, y0, bh = 92 * SS, 288 * SS, 310 * SS

    for i, name in enumerate(names):
        x = x0 + i * (bw + gap)
        accent = lerp(EMERALD, INDIGO, i / (len(names) - 1))
        d.rounded_rectangle([x, y0, x + bw, y0 + bh], radius=18 * SS,
                            fill=tuple(round(c * 0.14) for c in accent),
                            outline=accent, width=2 * SS)
        d.text((x + 24 * SS, y0 + 22 * SS), str(i + 1), font=f_num, fill=accent)
        center_lines(d, (x, y0 + 84 * SS, x + bw, y0 + bh - 22 * SS),
                     name.split("\n"), f_name, WHITE, 36 * SS)
        if i < len(names) - 1:
            arrow(d, x + bw + gap / 2, y0 + bh / 2, MIST, 15 * SS)

    # どこまでが個人差を見る前の段階で、どこからが対になっているかを示す
    by = y0 + bh + 46 * SS
    for (i0, i1, accent, label) in [
        (0, 1, EMERALD, "個人の状態を把握する前に着手できる段階"),
        (2, 3, INDIGO, "把握した結果を働き方に反映する段階。3は4のためにある"),
    ]:
        b0 = x0 + i0 * (bw + gap)
        b1 = x0 + i1 * (bw + gap) + bw
        d.line([(b0, by + 22 * SS), (b0, by), (b1, by), (b1, by + 22 * SS)],
               fill=accent, width=2 * SS)
        d.text((b0, by + 42 * SS), label, font=font(21, True), fill=accent)

    d.text((92 * SS, CH - 74 * SS),
           "出典：高年齢者の労働災害防止のための指針 第2 事業者が講ずべき措置 をもとに作成",
           font=font(16), fill=tuple(round(c * 0.85) for c in MIST))
    save(img, out)


# ------------------------------------------------------------------ 図4
def figure_grasp_to_action(out):
    """措置3で把握した情報が、措置4のどの対応につながるか"""
    img = base()
    d = ImageDraw.Draw(img)

    d.text((92 * SS, 78 * SS), "措置3で把握した情報を、措置4のどこに使うか",
           font=font(30, True), fill=WHITE)
    d.text((92 * SS, 126 * SS), "把握して終わらせないために、測定の設計段階で対応を決めておく",
           font=font(19), fill=MIST)

    f_head = font(22, True)
    f_item = font(19, True)
    f_note = font(17)

    left = [
        ("健康診断の結果", "雇入時および定期の健康診断"),
        ("体力チェック", "筋力、バランス能力、全身持久力"),
        ("感覚機能・認知機能", "事業場ごとに設計が必要な部分"),
    ]
    right = [
        ("就業上の措置", "労働時間の短縮、深夜業の回数の減少、作業の転換"),
        ("状況に応じた業務の提供", "適合する業務とのマッチング、ワークシェアリング"),
        ("健康保持増進措置", "身体機能等の維持向上のための取組"),
    ]

    cw, ch_ = 560 * SS, 118 * SS
    cgap = 22 * SS
    lx, rx = 92 * SS, 948 * SS
    y0 = 268 * SS

    for (cx, rows, accent, head) in [(lx, left, EMERALD, "措置3  把握する"),
                                     (rx, right, INDIGO, "措置4  対応する")]:
        d.text((cx, y0 - 46 * SS), head, font=f_head, fill=accent)
        for i, (name, note) in enumerate(rows):
            y = y0 + i * (ch_ + cgap)
            d.rounded_rectangle([cx, y, cx + cw, y + ch_], radius=14 * SS,
                                fill=tuple(round(c * 0.13) for c in accent),
                                outline=tuple(round(c * 0.8) for c in accent), width=2 * SS)
            d.rounded_rectangle([cx, y, cx + 5 * SS, y + ch_], radius=3 * SS, fill=accent)
            d.text((cx + 26 * SS, y + 26 * SS), name, font=f_item, fill=WHITE)
            for j, ln in enumerate(wrap(d, note, f_note, cw - 52 * SS)):
                d.text((cx + 26 * SS, y + 62 * SS + j * 26 * SS), ln, font=f_note, fill=MIST_LT)

    # 中央の矢印と、途切れやすい箇所
    mx = (lx + cw + rx) / 2
    for i in range(3):
        arrow(d, mx, y0 + i * (ch_ + cgap) + ch_ / 2, MIST, 22 * SS)

    band_y = y0 + 3 * (ch_ + cgap) + 18 * SS
    d.rounded_rectangle([lx, band_y, rx + cw, band_y + 84 * SS], radius=14 * SS,
                        fill=tuple(round(c * 0.12) for c in INDIGO),
                        outline=tuple(round(c * 0.55) for c in INDIGO), width=2 * SS)
    d.text((lx + 28 * SS, band_y + 18 * SS),
           "実務では、測定して結果を返すところで止まりやすい",
           font=font(21, True), fill=INDIGO)
    d.text((lx + 28 * SS, band_y + 50 * SS),
           "どの結果が出たら何を検討するのかを、測定の前に決めておく必要がある",
           font=f_note, fill=MIST)

    d.text((92 * SS, CH - 74 * SS),
           "出典：高年齢者の労働災害防止のための指針 第2の3・4 をもとに作成",
           font=font(16), fill=tuple(round(c * 0.85) for c in MIST))
    save(img, out)


def main():
    web = Path(sys.argv[1])
    outdir = web / "public/images/columns"
    outdir.mkdir(parents=True, exist_ok=True)
    print("生成:")
    figure_stages(outdir / "fig-accident-stages.jpg")
    figure_traits(outdir / "fig-six-traits.jpg")
    figure_five_measures(outdir / "fig-five-measures.jpg")
    figure_grasp_to_action(outdir / "fig-grasp-to-action.jpg")


if __name__ == "__main__":
    main()
