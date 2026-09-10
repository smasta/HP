import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { newsByCategory, newsCategories, photos } from "@/lib/content";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return newsCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const category = newsByCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.label}の新着情報`,
    description: `SMARTSTARTの${category.label}に関するお知らせ・プレスリリース${category.count}件を掲載しています。測定・分析・トレーニングの最新の取り組みをご覧いただけます。`,
    path: `/news/category/${slug}/`,
    image: category.cover,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const category = newsByCategory(slug);
  if (!category) notFound();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.label}の新着情報`,
    url: absolute(`/news/category/${slug}/`),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.items.length,
      itemListElement: category.items.map((item, index) => ({
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
        title={`${category.label}の新着情報`}
        lead={`${category.label}に関するお知らせを${category.count}件掲載しています。`}
        photo={category.items[0]?.photo ?? "office"}
        image={category.cover}
        crumbs={[
          { label: "新着情報", href: "/news/" },
          { label: category.label },
        ]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <ul data-reveal className="flex flex-wrap gap-2.5">
            <li>
              <a
                href="/news/"
                className="inline-flex rounded-full border border-black/12 px-4 py-1.5 text-[0.74rem] text-graphite-600 transition-colors duration-300 hover:border-black/35 hover:text-ink"
              >
                すべて
              </a>
            </li>
            {newsCategories.map((item) => {
              const isActive = item.slug === slug;
              return (
                <li key={item.slug}>
                  <a
                    href={`/news/category/${item.slug}/`}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "inline-flex rounded-full border px-4 py-1.5 text-[0.74rem] transition-colors duration-300",
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-black/12 text-graphite-600 hover:border-black/35 hover:text-ink",
                    ].join(" ")}
                  >
                    {item.label}
                    <span className="num ml-2 text-[0.68rem] opacity-60">
                      {item.count}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className="mt-14 border-t border-black/10">
            {category.items.map((item, index) => (
              <li
                key={item.slug}
                data-reveal
                style={{ "--reveal-delay": `${(index % 4) * 80}ms` } as React.CSSProperties}
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
                    </div>
                    <h2 className="display-jp mt-3 text-[1.05rem] leading-[1.7] text-ink transition-colors duration-300 group-hover:text-graphite-600 md:text-[1.2rem]">
                      {item.title}
                    </h2>
                    <p className="mt-2.5 line-clamp-2 text-[0.85rem] leading-[1.95] text-graphite-600">
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
