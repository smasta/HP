import { notFound } from "next/navigation";
import ColumnCard from "@/components/ColumnCard";
import ColumnCategoryNav from "@/components/ColumnCategoryNav";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import {
  columnCategories,
  columnsByCategory,
  findColumnCategory,
} from "@/lib/columns";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return columnCategories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: Params) {
  const { category: key } = await params;
  const category = findColumnCategory(key);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name}のコラム`,
    description: category.description,
    path: `/column/category/${key}/`,
    image: category.cover,
  });
}

export default async function Page({ params }: Params) {
  const { category: key } = await params;
  const category = findColumnCategory(key);
  if (!category) notFound();

  const items = columnsByCategory(category.key);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name}のコラム`,
    description: category.description,
    url: absolute(`/column/category/${category.key}/`),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        en={category.en}
        title={category.name}
        lead={category.lead}
        photo={category.photo}
        image={category.cover}
        crumbs={[{ label: "コラム", href: "/column/" }, { label: category.name }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <ColumnCategoryNav current={category.key} />

          {items.length === 0 ? (
            <p data-reveal className="mt-16 text-[0.9rem] leading-[2] text-graphite-600">
              このカテゴリの記事は準備中です。
            </p>
          ) : (
            <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
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
