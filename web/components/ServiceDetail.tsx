import Image from "next/image";
import CtaBand from "./CtaBand";
import PageHeader from "./PageHeader";
import SectionHead from "./SectionHead";
import { photos } from "@/lib/content";
import { SITE_URL, absolute } from "@/lib/seo";
import {
  hubs,
  resolveRelated,
  servicePath,
  type Service,
} from "@/lib/site";

export default function ServiceDetail({ service }: { service: Service }) {
  const hub = hubs.find((item) => item.slug === service.hub);
  const related = resolveRelated(service);
  const path = servicePath(service);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute(path)}#service`,
    name: service.name,
    alternateName: service.en,
    serviceType: hub?.name,
    description: service.overview,
    url: absolute(path),
    image: absolute(photos[service.photo].src),
    inLanguage: "ja",
    areaServed: { "@type": "Country", name: "日本" },
    provider: { "@id": `${SITE_URL}/#organization` },
    audience: service.targets.map((target) => ({
      "@type": "Audience",
      audienceType: target,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name}の提供内容`,
      itemListElement: service.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature.title,
          description: feature.body,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageHeader
        en={service.en}
        title={service.name}
        lead={service.lead}
        photo={service.photo}
        image={service.cover}
        crumbs={[
          { label: hub?.name ?? "", href: `/${service.hub}/` },
          { label: service.name },
        ]}
      />

      {/* ----------------------------------------- 対象者 / 課題 */}
      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead en="For" ja="対象者" />
              <ul className="mt-9 border-t border-black/10">
                {service.targets.map((target) => (
                  <li
                    key={target}
                    data-reveal
                    className="flex items-start gap-3.5 border-b border-black/10 py-4"
                  >
                    <span aria-hidden="true" className="mt-[0.55em] text-[0.72rem] text-emerald-glow">
                      ❯
                    </span>
                    <span className="text-[0.92rem] leading-[1.85] text-ink">
                      {target}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <SectionHead en="Challenges" ja="よくある課題" />
              <ul className="mt-9 grid gap-3">
                {service.challenges.map((challenge, index) => (
                  <li
                    key={challenge}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                    className="rounded-2xl border border-black/10 bg-paper px-6 py-5"
                  >
                    <p className="display-jp text-[0.95rem] leading-[1.85] text-ink">
                      「{challenge}」
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ 概要 */}
      <section className="on-ink relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={photos[service.photo].src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        </div>

        <div className="relative mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Overview" ja="サービス概要" tone="paper" />
          <p
            data-reveal
            className="mt-9 max-w-3xl text-[0.96rem] leading-[2.15] text-mist-300 md:text-[1.02rem]"
          >
            {service.overview}
          </p>
        </div>
      </section>

      {/* --------------------------------------- 主な機能・提供内容 */}
      <section className="block-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Features" ja="主な機能・提供内容" />
          <ul className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <li
                key={feature.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
                className="group bg-paper p-7 transition-colors duration-300 hover:bg-white md:p-9"
              >
                <span className="num text-[0.68rem] text-graphite-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display-jp mt-3.5 text-[1.05rem] leading-[1.7] text-ink">
                  {feature.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-[2px] w-8 bg-gradient-to-r from-indigo-glow to-emerald-glow transition-all duration-300 group-hover:w-16"
                />
                <p className="mt-4 text-[0.86rem] leading-[2] text-graphite-600">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------- 期待できる変化 */}
      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Outcomes" ja="導入によって期待できる変化" />
          <ul className="mt-12">
            {service.outcomes.map((outcome, index) => (
              <li
                key={outcome.title}
                data-reveal
                className="grid gap-4 border-t border-black/10 py-8 last:border-b md:grid-cols-12 md:gap-10 md:py-10"
              >
                <div className="flex items-baseline gap-4 md:col-span-5">
                  <span className="num text-[1.5rem] text-graphite-400/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-jp text-[1.05rem] leading-[1.7] text-ink md:text-[1.25rem]">
                    {outcome.title}
                  </h3>
                </div>
                <p className="text-[0.88rem] leading-[2.05] text-graphite-600 md:col-span-7">
                  {outcome.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------ 導入方法・支援範囲 */}
      <section className="on-ink bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Process" ja="導入方法・支援範囲" tone="paper" />
          <ol className="mt-12 grid gap-px border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-5">
            {service.scope.map((step, index) => (
              <li
                key={step.step}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className="group bg-ink p-7 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <span className="num text-[1.4rem] text-white/25 transition-colors duration-300 group-hover:text-white/45">
                  {step.step}
                </span>
                <h3 className="display-jp mt-3 text-[0.98rem] leading-[1.7] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-[1.95] text-mist-400">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------ 関連サービス */}
      {related.length > 0 ? (
        <section className="block-paper py-20 md:py-28">
          <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
            <SectionHead en="Related" ja="関連サービス" />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <li
                  key={`${item.hub}-${item.slug}`}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <a
                    href={servicePath(item)}
                    className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/25"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                      <Image
                        src={photos[item.photo].src}
                        alt={photos[item.photo].alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent"
                      />
                    </div>
                    <div className="p-6">
                      <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                        {item.en}
                      </p>
                      <h3 className="display-jp mt-2.5 text-[1.05rem] text-ink">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-[0.84rem] leading-[1.95] text-graphite-600">
                        {item.lead}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.78rem] text-graphite-400 transition-colors duration-300 group-hover:text-ink">
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
      ) : null}

      <CtaBand
        title={`${service.name}の導入について、ご相談ください。`}
        body="資料請求、対象や実施時期のご相談、他サービスとの組み合わせなど、まずはお気軽にお問い合わせください。"
      />
    </>
  );
}
