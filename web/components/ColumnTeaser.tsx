import ColumnCard from "./ColumnCard";
import SectionHead from "./SectionHead";
import { columnCategoriesWithCount, categoryPath, columns } from "@/lib/columns";
import type { CSSProperties } from "react";

/**
 * トップページの最新コラム。
 * 記事の存在に気づいてもらう導線がハンバーガーメニューしかなかったため設けた。
 * 記事が1本もない間は何も出さない。
 */
export default function ColumnTeaser() {
  const latest = columns.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="column" className="block-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead en="Column" ja="コラム" />
          <a
            data-reveal
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
            href="/column/"
            className="group inline-flex items-center gap-2.5 self-start text-[0.82rem] text-ink transition-colors duration-300 hover:text-graphite-600"
          >
            すべての記事を見る
            <span
              aria-hidden="true"
              className="text-emerald-glow transition-transform duration-300 group-hover:translate-x-1"
            >
              ❯
            </span>
          </a>
        </div>

        <p
          data-reveal
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
          className="mt-10 max-w-2xl text-[0.92rem] leading-[2.05] text-graphite-600"
        >
          制度の読み方から測定の実務まで。労働安全衛生、介護、健康経営、スポーツ、こどもの発達の現場で使える情報をまとめています。
        </p>

        <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {latest.map((item, index) => (
            <ColumnCard key={item.slug} item={item} index={index} />
          ))}
        </ul>

        {/* カテゴリへの導線も置き、記事が増えたときの回遊につなげる */}
        <nav data-reveal aria-label="コラムのカテゴリ" className="mt-12 flex flex-wrap gap-2.5">
          {columnCategoriesWithCount.map((category) => (
            <a
              key={category.key}
              href={categoryPath(category.key)}
              className="rounded-full border border-black/12 px-4 py-2 text-[0.78rem] text-graphite-600 transition-colors duration-300 hover:border-black/35 hover:text-ink"
            >
              {category.name}
              <span className="num ml-2 text-[0.68rem] text-graphite-400">
                {category.count}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
