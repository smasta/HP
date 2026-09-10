import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/lib/content";
import { columnPath, findColumnCategory, type ColumnItem } from "@/lib/columns";

/** 記事一覧のカード */
export default function ColumnCard({
  item,
  index = 0,
}: {
  item: ColumnItem;
  index?: number;
}) {
  const category = findColumnCategory(item.category);
  const cover = item.cover ?? photos[item.photo];

  return (
    <li
      data-reveal="scale"
      style={
        {
          "--reveal-delay": `${(index % 3) * 90}ms`,
          "--clip-delay": `${(index % 3) * 90 + 130}ms`,
        } as CSSProperties
      }
    >
      <a href={columnPath(item)} className="group flex h-full flex-col">
        <div className="clip-reveal relative aspect-[16/10] overflow-hidden rounded-xl bg-ink">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-[3px] bg-ink px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.1em] text-white">
            {category?.name ?? "コラム"}
          </span>
          <time dateTime={item.publishedAt} className="num text-[0.76rem] text-graphite-400">
            {item.publishedAt.replace(/-/g, ".")}
          </time>
        </div>

        <h3 className="display-jp mt-3 text-[1rem] leading-[1.7] text-ink transition-colors duration-300 group-hover:text-graphite-600 md:text-[1.05rem]">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.82rem] leading-[1.95] text-graphite-600">
          {item.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-[0.76rem] text-graphite-400 transition-colors duration-300 group-hover:text-ink">
          続きを読む
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </a>
    </li>
  );
}
