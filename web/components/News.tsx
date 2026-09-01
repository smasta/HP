import Image from "next/image";
import SectionHead from "./SectionHead";
import { latestNews, photos } from "@/lib/content";

export default function News() {
  return (
    <section id="news" className="block-white py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead en="Topics" ja="新着情報" />
          <a
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            href="/news/"
            className="group inline-flex items-center gap-2.5 text-[0.82rem] text-ink transition-colors duration-300 hover:text-graphite-600"
          >
            一覧を見る
            <span
              aria-hidden="true"
              className="text-emerald-glow transition-transform duration-300 group-hover:translate-x-1"
            >
              ❯
            </span>
          </a>
        </div>

        <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {latestNews.map((item, index) => {
            return (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 110}ms` } as React.CSSProperties}
              >
                <a href={item.path} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink">
                    <Image
                      src={item.cover?.src ?? photos[item.photo].src}
                      alt={item.cover?.alt ?? photos[item.photo].alt}
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
                    <span className="rounded-[3px] bg-ink px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-white">
                      NEWS
                    </span>
                    <time dateTime={item.dateTime} className="num text-[0.76rem] text-graphite-400">
                      {item.date} UP
                    </time>
                  </div>

                  <h3 className="display-jp mt-3 text-[1rem] leading-[1.7] text-ink transition-colors duration-300 group-hover:text-graphite-600 md:text-[1.05rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.82rem] leading-[1.95] text-graphite-600">
                    {item.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.76rem] text-graphite-400 transition-colors duration-300 group-hover:text-ink">
                    詳細を見る
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2.5" data-reveal>
          {["測定事業", "REAXION", "Human Data", "システム開発", "イベント", "会社情報", "お知らせ"].map(
            (category) => (
              <span
                key={category}
                className="rounded-full border border-black/12 px-4 py-1.5 text-[0.72rem] text-graphite-600 transition-colors duration-300 hover:border-black/35 hover:text-ink"
              >
                {category}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
