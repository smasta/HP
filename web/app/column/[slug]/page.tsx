import { notFound } from "next/navigation";
import ColumnBody from "@/components/ColumnBody";
import ColumnCard from "@/components/ColumnCard";
import {
  ColumnFaq,
  ColumnReviewer,
  ColumnSources,
  ColumnToc,
} from "@/components/ColumnAside";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { photos } from "@/lib/content";
import {
  columns,
  findColumn,
  findColumnCategory,
  relatedColumns,
} from "@/lib/columns";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";
import { services, servicePath } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return columns.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const item = findColumn(slug);
  if (!item) return {};
  const cover = item.cover ?? photos[item.photo];
  return buildMetadata({
    title: item.seoTitle || item.title,
    description: item.description,
    path: `/column/${slug}/`,
    type: "article",
    publishedTime: item.publishedAt,
    image: { src: cover.src, alt: cover.alt },
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const item = findColumn(slug);
  if (!item) notFound();

  const category = findColumnCategory(item.category);
  const cover = item.cover ?? photos[item.photo];
  const related = relatedColumns(item);

  const relatedService = (item.relatedServices ?? [])
    .map((path) => {
      const [hub, serviceSlug] = path.split("/");
      return services.find(
        (service) =>
          service.hub === hub && (serviceSlug ? service.slug === serviceSlug : true)
      );
    })
    .filter((value): value is (typeof services)[number] => Boolean(value));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    articleSection: category?.name,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    inLanguage: "ja",
    image: [absolute(cover.src)],
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(`/column/${slug}/`) },
    ...(item.reviewer
      ? { reviewedBy: { "@type": "Person", name: item.reviewer.name, jobTitle: item.reviewer.role } }
      : {}),
  };

  // FAQ は表示している内容と同じものだけを構造化データにする
  const faqJsonLd = item.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: item.faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      }
    : null;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <PageHeader
        en={category?.en ?? "COLUMN"}
        title={item.title}
        lead={item.lead}
        photo={item.photo}
        image={item.cover}
        crumbs={[
          { label: "コラム", href: "/column/" },
          { label: category?.name ?? "", href: `/column/category/${item.category}/` },
          { label: item.title },
        ]}
      />

      <article className="block-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1560px] gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-8">
            <div
              data-reveal
              className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-black/10 pb-5"
            >
              <span className="rounded-[3px] bg-ink px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.1em] text-white">
                {category?.name}
              </span>
              <time dateTime={item.publishedAt} className="num text-[0.78rem] text-graphite-400">
                公開 {item.publishedAt.replace(/-/g, ".")}
              </time>
              {item.updatedAt ? (
                <time dateTime={item.updatedAt} className="num text-[0.78rem] text-graphite-400">
                  更新 {item.updatedAt.replace(/-/g, ".")}
                </time>
              ) : null}
            </div>

            <div className="mt-10 lg:hidden">
              <ColumnToc item={item} />
            </div>

            <ColumnBody blocks={item.body} />
            <ColumnFaq item={item} />
            <ColumnSources item={item} />
            <ColumnReviewer item={item} />

            {relatedService.length > 0 ? (
              <section data-reveal className="mt-14 border-t border-black/10 pt-8">
                <p className="eyebrow text-graphite-400">関連するサービス</p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {relatedService.map((service) => (
                    <li key={service.slug}>
                      <a
                        href={servicePath(service)}
                        className="inline-flex items-center gap-2 rounded-full border border-black/12 px-4 py-2 text-[0.8rem] text-ink transition-colors duration-300 hover:border-black/35 hover:bg-paper"
                      >
                        {service.name}
                        <span aria-hidden="true" className="text-[0.7rem] text-graphite-400">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {/* 目次は大画面では貼り付けて追従させる */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="lg:sticky lg:top-28">
              <ColumnToc item={item} />
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="block-paper py-20 md:py-28">
          <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
            <h2 data-reveal className="display-en text-[1.6rem] font-bold text-ink md:text-[2rem]">
              Related
            </h2>
            <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry, index) => (
                <ColumnCard key={entry.slug} item={entry} index={index} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </PageShell>
  );
}
