import Image from "next/image";
import CtaBand from "./CtaBand";
import PageHeader from "./PageHeader";
import SectionHead from "./SectionHead";
import { photos } from "@/lib/content";
import { servicePath, servicesOf, type Hub } from "@/lib/site";

export default function HubDetail({ hub }: { hub: Hub }) {
  const list = servicesOf(hub.slug);

  return (
    <>
      <PageHeader
        en={hub.en}
        title={hub.name}
        lead={hub.lead}
        photo={hub.photo}
        crumbs={[{ label: hub.name }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHead en="Overview" ja="事業概要" />
            </div>
            <p
              data-reveal
              className="text-[0.96rem] leading-[2.15] text-graphite-600 lg:col-span-8 md:text-[1rem]"
            >
              {hub.overview}
            </p>
          </div>
        </div>
      </section>

      <section className="block-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Services" ja="サービス一覧" />

          <ul className="mt-14 md:mt-20">
            {list.map((service, index) => (
              <li
                key={service.slug}
                data-reveal
                className="border-t border-black/10 py-10 last:border-b md:py-14"
              >
                <div className="grid gap-8 md:grid-cols-[300px_1fr] md:gap-12 lg:gap-16">
                  <a
                    href={servicePath(service)}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-ink"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={service.cover?.src ?? photos[service.photo].src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-indigo-glow to-emerald-glow" />
                    <span className="absolute bottom-4 left-5 display-en text-[0.95rem] font-extrabold tracking-[-0.02em] text-white">
                      {service.en}
                    </span>
                  </a>

                  <div>
                    <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span aria-hidden="true" className="text-[0.85rem] text-emerald-glow">
                        ❯
                      </span>
                      <a
                        href={servicePath(service)}
                        className="display-jp text-[1.25rem] text-ink transition-colors duration-300 hover:text-graphite-600 md:text-[1.55rem]"
                      >
                        {service.name}
                      </a>
                      <span className="num text-[0.7rem] tracking-[0.1em] text-graphite-400">
                        {servicePath(service)}
                      </span>
                    </h3>

                    <p className="display-jp mt-4 text-[0.98rem] leading-[1.85] text-ink md:text-[1.08rem]">
                      {service.lead}
                    </p>

                    <div className="mt-7 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                          対象者
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {service.targets.map((target) => (
                            <li
                              key={target}
                              className="flex items-start gap-2.5 text-[0.85rem] leading-[1.85] text-graphite-600"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.8em] h-px w-2.5 shrink-0 bg-graphite-400"
                              />
                              {target}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                          提供価値
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {service.outcomes.map((outcome) => (
                            <li
                              key={outcome.title}
                              className="flex items-start gap-2.5 text-[0.85rem] leading-[1.85] text-graphite-600"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.7em] text-[0.6rem] text-emerald-glow"
                              >
                                ❯
                              </span>
                              {outcome.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={servicePath(service)}
                        className="btn-base pill-ink group px-7 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
                      >
                        {service.name}の詳細
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                      <a
                        href="/contact/"
                        className="btn-base pill-outline-ink px-7 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
                      >
                        導入について相談する
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`${hub.name}について、ご相談ください。`}
        body="どのサービスが合うか分からない場合も、現場の状況をお聞かせいただければ適した進め方をご提案します。"
      />
    </>
  );
}
