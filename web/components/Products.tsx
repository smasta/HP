import Image from "next/image";
import type { CSSProperties } from "react";
import SectionHead from "./SectionHead";
import SplitText from "./SplitText";
import { photos, productHubs, productServices, type ProductSite } from "@/lib/content";

/** 外部サイトであることを読み上げにも伝える注記 */
function ExternalNote() {
  return <span className="sr-only">（外部サイトが新しいタブで開きます）</span>;
}

/** REAXION / REAXION CLOUD の大きめバナー */
function HubBanner({ site, index }: { site: ProductSite; index: number }) {
  const photo = photos[site.photo];
  const isCloud = site.id === "cloud";

  return (
    <li
      data-reveal="scale"
      style={
        {
          "--reveal-delay": `${index * 90}ms`,
          "--clip-delay": `${index * 90 + 140}ms`,
        } as CSSProperties
      }
    >
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full min-h-[290px] flex-col justify-end overflow-hidden rounded-[26px] bg-ink-deep p-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] active:scale-[0.99] md:min-h-[340px] md:p-10"
      >
        <div className="clip-reveal absolute inset-0" aria-hidden="true">
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-ink-deep/70" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/60 to-ink-deep/15" />
        </div>

        {/* ブランドの帯 */}
        <span
          aria-hidden="true"
          className={[
            "absolute inset-x-0 top-0 h-[3px]",
            isCloud
              ? "bg-coral"
              : "bg-gradient-to-r from-indigo-glow to-emerald-glow",
          ].join(" ")}
        />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span
              className={[
                "pulse-dot h-1.5 w-1.5 rounded-full",
                isCloud ? "bg-coral" : "bg-emerald-glow",
              ].join(" ")}
            />
            <span
              className={[
                "display-en text-[0.58rem] font-semibold tracking-[0.28em]",
                isCloud ? "text-coral" : "text-white/70",
              ].join(" ")}
            >
              {site.en}
            </span>
          </div>

          <p className="display-en mt-4 text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.3rem] md:text-[2.7rem]">
            {isCloud ? (
              <>
                REAXION <span className="text-coral">CLOUD</span>
              </>
            ) : (
              site.name
            )}
          </p>

          <p className="display-jp mt-3 text-[0.98rem] leading-[1.7] text-white md:text-[1.15rem]">
            {site.lead}
          </p>
          <p className="mt-3 max-w-xl text-[0.84rem] leading-[1.95] text-mist-300">
            {site.detail}
          </p>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
            <span className="num text-[0.74rem] tracking-[0.04em] text-mist-400">
              {site.domain}
            </span>
            <span
              aria-hidden="true"
              className={[
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[0.82rem] transition-all duration-300",
                isCloud
                  ? "border-coral/40 text-coral group-hover:bg-coral group-hover:text-ink"
                  : "border-white/25 text-white group-hover:bg-white group-hover:text-ink",
              ].join(" ")}
            >
              ↗
            </span>
          </div>
        </div>
        <ExternalNote />
      </a>
    </li>
  );
}

/** REAXION CLOUD 上の4サービス */
function ServiceCard({ site, index }: { site: ProductSite; index: number }) {
  const photo = photos[site.photo];

  return (
    <li
      data-reveal="scale"
      style={
        {
          "--reveal-delay": `${index * 80}ms`,
          "--clip-delay": `${index * 80 + 120}ms`,
        } as CSSProperties
      }
    >
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-black/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-black/25 hover:shadow-[0_28px_60px_-38px_rgba(15,23,42,0.55)]"
      >
        <div className="clip-reveal relative aspect-[16/10] overflow-hidden bg-ink">
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-indigo-glow to-emerald-glow"
          />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="display-en text-[0.56rem] font-semibold tracking-[0.26em] text-white/65">
              {site.en}
            </p>
            <p className="display-en mt-1 text-[1.12rem] font-extrabold tracking-[-0.02em] text-white">
              {site.name}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
          <div>
            <p className="display-jp text-[0.95rem] leading-[1.65] text-ink">
              {site.lead}
            </p>
            <p className="mt-3 text-[0.82rem] leading-[1.95] text-graphite-600">
              {site.detail}
            </p>
          </div>

          <div className="mt-7 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
            <span className="num text-[0.66rem] leading-[1.5] text-graphite-400">
              {site.domain}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-graphite-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
            >
              ↗
            </span>
          </div>
        </div>
        <ExternalNote />
      </a>
    </li>
  );
}

/**
 * プロダクトサイトへの導線。
 * REAXION（ストア）／REAXION CLOUD の2ブランドと、
 * CLOUD上で提供される4サービスへのバナーを並べている。
 */
export default function Products() {
  return (
    <section id="products" className="block-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead en="Products" ja="プロダクトサイト" />
          <SplitText
            as="p"
            stagger={16}
            text={"用途に合わせた6つのサイトをご用意しています。\n詳しい仕様・料金は各サイトでご確認ください。"}
            className="max-w-md text-[0.9rem] leading-[2.05] text-graphite-600"
          />
        </div>

        {/* ブランドサイト */}
        <ul className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-2">
          {productHubs.map((site, index) => (
            <HubBanner key={site.id} site={site} index={index} />
          ))}
        </ul>

        {/* CLOUD 上の4サービス */}
        <p
          data-reveal
          className="eyebrow mt-16 text-graphite-400 md:mt-20"
        >
          REAXION CLOUD Services
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productServices.map((site, index) => (
            <ServiceCard key={site.id} site={site} index={index} />
          ))}
        </ul>

        <p data-reveal className="mt-10 text-[0.72rem] leading-[1.9] text-graphite-400">
          ※ いずれも外部サイトです。掲載内容・価格・仕様は各サイトの情報が最新となります。
        </p>
      </div>
    </section>
  );
}
