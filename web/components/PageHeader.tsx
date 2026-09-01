import Image from "next/image";
import Breadcrumb, { type Crumb } from "./Breadcrumb";
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
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={cover.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
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

        <p className="eyebrow mt-10 text-white/60 md:mt-14">{en}</p>
        <h1 className="display-jp mt-4 text-[1.85rem] leading-[1.35] text-white sm:text-[2.6rem] md:text-[3.4rem]">
          {title}
        </h1>
        <span className="accent-rule mt-7 block" />
        {lead ? (
          <p className="display-jp mt-7 max-w-3xl text-[0.98rem] leading-[1.85] text-white/85 md:text-[1.25rem]">
            {lead}
          </p>
        ) : null}
      </div>
    </section>
  );
}
