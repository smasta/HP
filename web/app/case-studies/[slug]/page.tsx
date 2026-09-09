import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import SectionHead from "@/components/SectionHead";
import { buildMetadata } from "@/lib/seo";
import {
  caseStudies,
  findCaseStudy,
  services,
  servicePath,
} from "@/lib/site";
import { photos } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const item = findCaseStudy(slug);
  if (!item) return {};
  return buildMetadata({
    title: `${item.client}｜導入事例`,
    description: `${item.summary}分野は${item.field}、導入時期は${item.startDate}。導入前の課題、実施した内容、得られた変化までをご紹介します。`,
    path: `/case-studies/${slug}/`,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const item = findCaseStudy(slug);
  if (!item) notFound();

  const related = item.related
    .map((relatedSlug) => services.find((service) => service.slug === relatedSlug))
    .filter((value): value is (typeof services)[number] => Boolean(value));

  const blocks = [
    { en: "Challenge", ja: "導入前の課題", items: item.challenge },
    { en: "Solution", ja: "導入したサービス・実施内容", items: item.solution },
    { en: "Result", ja: "得られた変化・成果", items: item.result },
  ];

  return (
    <PageShell>
      <PageHeader
        en="CASE STUDY"
        title={item.client}
        lead={item.summary}
        photo={item.photo}
        image={item.cover}
        crumbs={[
          { label: "導入実績・事例", href: "/case-studies/" },
          { label: item.client },
        ]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <dl data-reveal className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-3">
            <div className="bg-white px-6 py-6">
              <dt className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                FIELD
              </dt>
              <dd className="display-jp mt-2.5 text-[0.98rem] text-ink">{item.field}</dd>
            </div>
            <div className="bg-white px-6 py-6">
              <dt className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                START
              </dt>
              <dd className="num mt-2.5 text-[1.05rem] text-ink">{item.startDate}</dd>
            </div>
            <div className="bg-white px-6 py-6">
              <dt className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                SERVICE
              </dt>
              <dd className="mt-2.5 text-[0.92rem] text-ink">
                {related.map((service) => service.name).join(" / ") || "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-16 space-y-14 md:mt-20">
            {blocks.map((block) => (
              <div key={block.en} className="grid gap-6 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <SectionHead en={block.en} ja={block.ja} />
                </div>
                <ul className="lg:col-span-8">
                  {block.items.map((line) => (
                    <li
                      key={line}
                      data-reveal
                      className="flex items-start gap-3.5 border-b border-black/10 py-4 first:border-t"
                    >
                      <span aria-hidden="true" className="mt-[0.6em] text-[0.7rem] text-emerald-glow">
                        ❯
                      </span>
                      <span className="text-[0.92rem] leading-[2] text-ink">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {item.source || item.externalLink ? (
            <div
              data-reveal
              className="mt-14 flex flex-wrap gap-3 border-t border-black/10 pt-8"
            >
              {item.source ? (
                <a
                  href={item.source.path}
                  className="btn-base pill-outline-ink group px-6 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
                >
                  関連するお知らせを読む
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ) : null}
              {item.externalLink ? (
                <a
                  href={item.externalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base pill-outline-ink px-6 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
                >
                  {item.externalLink.label}
                  <span aria-hidden="true" className="text-[0.72rem]">
                    ↗
                  </span>
                  <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
                </a>
              ) : null}
            </div>
          ) : null}

          {item.quote ? (
            <blockquote
              data-reveal
              className="mt-16 rounded-2xl border border-black/10 bg-paper px-8 py-10 md:mt-20 md:px-12 md:py-14"
            >
              <p className="display-jp text-[1.05rem] leading-[1.9] text-ink md:text-[1.35rem]">
                「{item.quote.body}」
              </p>
              <footer className="mt-6 text-[0.8rem] text-graphite-600">
                — {item.quote.author}
              </footer>
            </blockquote>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="block-paper py-20 md:py-24">
          <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
            <SectionHead en="Related" ja="関連サービス" />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((service) => (
                <li key={`${service.hub}-${service.slug}`} data-reveal>
                  <a
                    href={servicePath(service)}
                    className="group flex items-center gap-5 rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/25"
                  >
                    <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-ink">
                      <Image
                        src={photos[service.photo].src}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span>
                      <span className="display-jp block text-[0.98rem] text-ink">
                        {service.name}
                      </span>
                      <span className="display-en mt-1 block text-[0.58rem] font-semibold tracking-[0.22em] text-graphite-400">
                        {service.en}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="導入について、ご相談ください。"
        body="似た課題をお持ちの場合、より近い事例をご紹介できます。まずはお気軽にお問い合わせください。"
      />
    </PageShell>
  );
}
