import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { photos } from "@/lib/content";
import { SITE_URL, absolute, buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/site";

export const metadata = buildMetadata({
  title: "導入実績・事例",
  description:
    "SMARTSTARTの導入実績と事例。自治体の介護予防、企業の健康経営、大会の計測・運営など、測定とデータ活用が現場でどう使われているかを、課題・実施内容・成果とあわせてご紹介します。",
  path: "/case-studies/",
});

export default function Page() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "導入実績・事例",
    url: absolute("/case-studies/"),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(`/case-studies/${item.slug}/`),
        name: `${item.client}｜導入事例`,
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
        en="CASE STUDIES"
        title="導入実績・事例"
        lead="測定とデータ活用が、現場でどう使われているか。"
        photo="senior"
        crumbs={[{ label: "導入実績・事例" }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <p
            data-reveal
            className="mb-12 max-w-3xl text-[0.84rem] leading-[2] text-graphite-600"
          >
            掲載している内容は、当社が公表したお知らせ・プレスリリースに基づいています。各事例の詳細ページから、根拠となるお知らせをご確認いただけます。
          </p>

          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((item, index) => (
              <li
                key={item.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <a
                  href={`/case-studies/${item.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/25"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={item.cover?.src ?? photos[item.photo].src}
                      alt={item.cover?.alt ?? photos[item.photo].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-black/12 px-3 py-1 text-[0.66rem] text-graphite-600">
                        {item.field}
                      </span>
                      <span className="num text-[0.74rem] text-graphite-400">
                        {item.startDate}
                      </span>
                    </div>
                    <h2 className="display-jp mt-4 text-[1.05rem] leading-[1.7] text-ink">
                      {item.client}
                    </h2>
                    <p className="mt-3 flex-1 text-[0.85rem] leading-[1.95] text-graphite-600">
                      {item.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.78rem] text-graphite-400 transition-colors duration-300 group-hover:text-ink">
                      詳細を見る
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="同じような課題について、ご相談ください。"
        body="貴社・貴団体の状況に近い事例について、詳しくご説明します。資料請求もこちらから承ります。"
      />
    </PageShell>
  );
}
