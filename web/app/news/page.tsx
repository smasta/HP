import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { news, newsCategories, pageCovers, photos } from "@/lib/content";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "新着情報",
  description:
    "SMARTSTARTからのお知らせ。測定事業、REAXION、Human Data、システム開発、イベント、会社情報に関する最新情報を掲載しています。",
  path: "/news/",
  image: pageCovers.news,
});

export default function Page() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "新着情報",
    url: absolute("/news/"),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: news.length,
      itemListElement: news.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(item.path),
        name: item.title,
      })),
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHeader
        en="NEWS"
        title="新着情報"
        lead="事業とサービスに関するお知らせを掲載しています。"
        photo="office"
        image={pageCovers.news}
        crumbs={[{ label: "新着情報" }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <ul data-reveal className="flex flex-wrap gap-2.5">
            <li>
              <span
                aria-current="page"
                className="inline-flex rounded-full border border-ink bg-ink px-4 py-1.5 text-[0.74rem] text-white"
              >
                すべて
                <span className="num ml-2 text-[0.68rem] opacity-60">{news.length}</span>
              </span>
            </li>
            {newsCategories.map((category) => (
              <li key={category.slug}>
                <a
                  href={`/news/category/${category.slug}/`}
                  className="inline-flex rounded-full border border-black/12 px-4 py-1.5 text-[0.74rem] text-graphite-600 transition-colors duration-300 hover:border-black/35 hover:text-ink"
                >
                  {category.label}
                  <span className="num ml-2 text-[0.68rem] opacity-60">
                    {category.count}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-14 border-t border-black/10">
            {news.map((item, index) => (
              <li
                key={item.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className="border-b border-black/10"
              >
                <a
                  href={item.path}
                  className="group grid gap-5 py-8 transition-colors duration-300 hover:bg-paper md:grid-cols-12 md:items-center md:gap-8 md:px-4 md:py-9"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink md:col-span-3">
                    <Image
                      src={item.cover?.src ?? photos[item.photo].src}
                      alt={item.cover?.alt ?? photos[item.photo].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                  </div>

                  <div className="md:col-span-8">
                    <div className="flex items-center gap-3">
                      <span className="rounded-[3px] bg-ink px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-white">
                        NEWS
                      </span>
                      <time dateTime={item.dateTime} className="num text-[0.78rem] text-graphite-400">
                        {item.date} UP
                      </time>
                      <span className="text-[0.72rem] text-graphite-400">
                        {item.category}
                      </span>
                    </div>
                    <h2 className="display-jp mt-3 text-[1.05rem] leading-[1.7] text-ink transition-colors duration-300 group-hover:text-graphite-600 md:text-[1.2rem]">
                      {item.title}
                    </h2>
                    <p className="mt-2.5 text-[0.85rem] leading-[1.95] text-graphite-600">
                      {item.summary}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="hidden justify-end text-graphite-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink md:col-span-1 md:flex"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
