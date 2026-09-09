import Image from "next/image";
import type { CSSProperties } from "react";
import Breadcrumb, { type Crumb } from "./Breadcrumb";
import SplitText from "./SplitText";
import { photos, type PhotoKey } from "@/lib/content";

/** 下層ページ共通のヘッダー。実写＋パンくず＋見出し。 */
export default function PageHeader({
  en,
  title,
  lead,
  photo,
  image,
  crumbs,
}: {
  en: string;
  title: string;
  lead?: string;
  photo: PhotoKey;
  /** 記事固有のカバー画像（指定時は photo より優先） */
  image?: { src: string; alt: string };
  crumbs: Crumb[];
}) {
  const cover = image ?? { src: photos[photo].src, alt: "" };

  return (
    <section className="on-ink relative overflow-hidden bg-ink-deep pb-16 pt-[68px] md:pb-24 md:pt-[76px]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          data-parallax="0.07"
          className="absolute inset-x-0 -bottom-[12%] -top-[12%]"
        >
          <Image
            src={cover.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/80 via-transparent to-ink" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 pt-12 md:px-8 md:pt-16 lg:px-10">
        <Breadcrumb items={crumbs} />

        <div data-reveal="chars">
          <p className="eyebrow mt-10 text-white/60 md:mt-14">{en}</p>
          <SplitText
            as="h1"
            reveal={false}
            delay={120}
            stagger={38}
            text={title}
            className="display-jp mt-4 text-[1.85rem] leading-[1.35] text-white sm:text-[2.6rem] md:text-[3.4rem]"
          />
          <span className="accent-rule rule-draw mt-7 block" />
        </div>
        {lead ? (
          <p
            data-reveal
            style={{ "--reveal-delay": "260ms" } as CSSProperties}
            className="display-jp mt-7 max-w-3xl text-[0.98rem] leading-[1.85] text-white/85 md:text-[1.25rem]"
          >
            {lead}
          </p>
        ) : null}
      </div>
    </section>
  );
}
