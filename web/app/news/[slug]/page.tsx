import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import NewsBody from "@/components/NewsBody";
import PageShell from "@/components/PageShell";
import { news, photos } from "@/lib/content";
import { services, servicePath } from "@/lib/site";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const item = news.find((entry) => entry.slug === slug);
  if (!item) return {};
  const cover = item.cover ?? photos[item.photo];
  // 要約が短い記事は、検索結果で情報量が足りないため事実情報で補う
  const description =
    item.summary.length >= 60
      ? item.summary
      : `${item.summary}｜SMARTSTART（株式会社スマートスタート）の新着情報です。カテゴリ：${item.category}／公開日：${item.date}。`;

  return buildMetadata({
    title: item.seoTitle ?? item.title,
    description,
    path: item.path,
    type: "article",
    publishedTime: item.dateTime,
    image: { src: cover.src, alt: cover.alt },
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const item = news.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const others = news.filter((entry) => entry.slug !== slug).slice(0, 2);

  const cover = item.cover ?? photos[item.photo];
  const related = (item.relatedServices ?? [])
    .map((path) => {
      const [hub, slug] = path.split("/");
      return services.find(
        (service) => service.hub === hub && (slug ? service.slug === slug : true)
      );
    })
    .filter((value): value is (typeof services)[number] => Boolean(value));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.dateTime,
    dateModified: item.dateTime,
    description: item.summary,
    articleSection: item.category,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    image: [absolute(cover.src)],
    inLanguage: "ja",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(item.path) },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHeader
        en="NEWS"
        title={item.title}
        photo={item.photo}
        image={item.cover}
        crumbs={[{ label: "新着情報", href: "/news/" }, { label: item.title }]}
      />

      <section className="block-white py-20 md:py-28">
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          <div data-reveal className="flex flex-wrap items-center gap-3 border-b border-black/10 pb-6">
            <span className="rounded-[3px] bg-ink px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-white">
              NEWS
            </span>
            <time dateTime={item.dateTime} className="num text-[0.82rem] text-graphite-400">
              {item.date}
            </time>
            <span className="text-[0.74rem] text-graphite-400">{item.category}</span>
          </div>

          <div data-reveal className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-ink">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {item.subtitles?.length ? (
            <div data-reveal className="mt-10 border-l-[3px] border-emerald-glow pl-5">
              {item.subtitles.map((line) => (
                <p
                  key={line}
                  className="display-jp text-[0.98rem] leading-[1.75] text-ink md:text-[1.1rem]"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}

          <NewsBody blocks={item.body} />

          {item.release ? (
            <p data-reveal className="mt-12 text-[0.74rem] text-graphite-400">
              配信：{item.release.outlet}／{item.release.publishedAt}
            </p>
          ) : null}

          {related.length > 0 ? (
            <section data-reveal className="mt-16 border-t border-black/10 pt-10">
              <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                RELATED SERVICE
              </p>
              <p className="display-jp mt-2 text-[0.95rem] text-ink">
                この記事に関連するサービス
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((service) => (
                  <li key={`${service.hub}-${service.slug}`}>
                    <a
                      href={servicePath(service)}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-paper px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:bg-white"
                    >
                      <span>
                        <span className="display-jp block text-[0.98rem] text-ink">
                          {service.name}
                        </span>
                        <span className="mt-1 block text-[0.72rem] leading-[1.7] text-graphite-600">
                          {service.lead}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-graphite-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div data-reveal className="mt-14 border-t border-black/10 pt-8">
            <a
              href="/news/"
              className="btn-base pill-outline-ink group px-7 py-3 text-[0.82rem] hover:scale-105 active:scale-95"
            >
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              新着情報一覧へ
            </a>
          </div>
        </article>
      </section>

      {others.length > 0 ? (
        <section className="block-paper py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <p className="eyebrow text-graphite-400">Other Topics</p>
            <ul className="mt-7 border-t border-black/10">
              {others.map((other) => (
                <li key={other.slug} className="border-b border-black/10">
                  <a
                    href={other.path}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span>
                      <time dateTime={other.dateTime} className="num text-[0.76rem] text-graphite-400">
                        {other.date}
                      </time>
                      <span className="display-jp mt-1.5 block text-[0.95rem] leading-[1.7] text-ink transition-colors duration-300 group-hover:text-graphite-600">
                        {other.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-graphite-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </PageShell>
  );
}
