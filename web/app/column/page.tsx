import ColumnCard from "@/components/ColumnCard";
import ColumnCategoryNav from "@/components/ColumnCategoryNav";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { columns } from "@/lib/columns";
import { pageCovers } from "@/lib/content";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "コラム",
  description:
    "測定・分析の現場から、労働安全衛生、介護、健康経営、スポーツ、こどもの発達まで。認知・身体・行動を測るための実務と制度を解説します。",
  path: "/column/",
  image: pageCovers.column,
});

export default function Page() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "コラム",
    url: absolute("/column/"),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: columns.length,
      itemListElement: columns.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(`/column/${item.slug}/`),
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
        en="COLUMN"
        title="コラム"
        lead="測るとは何か。現場で使える形にするために、制度・手法・データの読み方を解説します。"
        photo="office"
        image={pageCovers.column}
        crumbs={[{ label: "コラム" }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <ColumnCategoryNav />

          {columns.length === 0 ? (
            <p data-reveal className="mt-16 text-[0.9rem] leading-[2] text-graphite-600">
              記事を準備しています。公開までしばらくお待ちください。
            </p>
          ) : (
            <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((item, index) => (
                <ColumnCard key={item.slug} item={item} index={index} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
