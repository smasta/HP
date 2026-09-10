"""
解説記事（コラム）のキービジュアルを生成する。

    python3 scripts/generate-column-covers.py .            # 未生成のものだけ
    python3 scripts/generate-column-covers.py . --force    # 全部作り直す

出力先は public/images/columns/{slug}.jpg（1200x630）。
記事を追加したら実行し、lib/columns.json の cover を設定すること。

描画そのものは generate-news-covers.py を読み込んで使っている。
ニュースとコラムで絵柄を揃えるためで、モチーフの定義を二重に持たない。
モチーフは MOTIF に slug を書いて指定する。書かなければ
ニュース側のキーワード判定にそのまま任せる。

記事の中身に合わせた専用のキービジュアルがある slug は
generate-column-keyvisuals.py が受け持つ。こちらは手を出さない。
"""
import importlib.util
import json
import sys
from pathlib import Path

# 記事ごとのモチーフ。名前と意味は generate-news-covers.py の MOTIF_JA を参照
MOTIF = {
    "elderly-worker-fitness-check": "pulse",                   # 反応の波形
    "elderly-worker-safety-guideline-five-measures": "hex",     # 5つの措置という階層
}

# アクセント色はニュース側のカテゴリ設定を借りる。
# コラムのカテゴリ（safety 等）はニュース側に存在しないため、対応表を持つ
ACCENT_SOURCE = {
    "safety": "測定事業",
    "care": "測定事業",
    "wellness": "REAXION",
    "sports": "イベント",
    "kids": "イベント",
    "research": "会社情報",
}


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main():
    web = Path(sys.argv[1]).resolve()
    force = "--force" in sys.argv

    cov = load_module(web / "scripts/generate-news-covers.py", "news_covers")
    cov.OVERRIDES.update(MOTIF)

    bespoke = load_module(
        web / "scripts/generate-column-keyvisuals.py", "column_keyvisuals").KEYVISUALS

    data = json.loads((web / "lib/columns.json").read_text(encoding="utf-8"))
    outdir = web / "public/images/columns"
    outdir.mkdir(parents=True, exist_ok=True)

    for item in data:
        path = outdir / f"{item['slug']}.jpg"
        if item["slug"] in bespoke:
            print(f"{item['slug']:<48}専用のキービジュアルがあるため生成しない")
            continue
        if path.exists() and not force:
            print(f"{item['slug']:<48}既存のため生成しない")
            continue
        # build() はニュース記事の形を期待するので、必要な項目だけ渡す
        name = cov.build(
            {
                "slug": item["slug"],
                "category": ACCENT_SOURCE.get(item["category"], "測定事業"),
                "title": item["title"],
            },
            path,
        )
        print(f"{item['slug']:<48}{name:<10}{path.stat().st_size // 1024}KB")


if __name__ == "__main__":
    main()
