import { categoryPath, columnCategoriesWithCount } from "@/lib/columns";

/** カテゴリの切り替え。現在地は色を反転させる */
export default function ColumnCategoryNav({ current }: { current?: string }) {
  return (
    <nav data-reveal aria-label="記事カテゴリ" className="mt-10 flex flex-wrap gap-2.5">
      <a
        href="/column/"
        className={[
          "rounded-full border px-4 py-2 text-[0.78rem] transition-colors duration-300",
          current
            ? "border-black/12 text-graphite-600 hover:border-black/35 hover:text-ink"
            : "border-ink bg-ink text-white",
        ].join(" ")}
      >
        すべて
      </a>
      {columnCategoriesWithCount.map((category) => {
        const active = current === category.key;
        return (
          <a
            key={category.key}
            href={categoryPath(category.key)}
            className={[
              "rounded-full border px-4 py-2 text-[0.78rem] transition-colors duration-300",
              active
                ? "border-ink bg-ink text-white"
                : "border-black/12 text-graphite-600 hover:border-black/35 hover:text-ink",
            ].join(" ")}
          >
            {category.name}
            <span
              className={[
                "num ml-2 text-[0.68rem]",
                active ? "text-white/60" : "text-graphite-400",
              ].join(" ")}
            >
              {category.count}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
