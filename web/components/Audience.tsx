import Image from "next/image";
import SectionHead from "./SectionHead";
import { audiences, photos } from "@/lib/content";

export default function Audience() {
  return (
    <section id="audience" className="block-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead en="For You" ja="対象者別の入口" />
          <p
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="max-w-md text-[0.9rem] leading-[2.05] text-graphite-600"
          >
            企業、自治体・介護、スポーツ、教育・発達支援、大会運営。立場によって、測るべきものは異なります。
          </p>
        </div>

        <ul className="mt-14 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-5 md:mt-20">
          {audiences.map((audience, index) => (
            <li
              key={audience.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <a
                href={audience.href}
                className="group flex h-full flex-col bg-white transition-colors duration-300 hover:bg-paper"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photos[audience.photo].src}
                    alt={photos[audience.photo].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-7 md:p-8">
                <div>
                  <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                    {audience.en}
                  </p>
                  <h3 className="display-jp mt-4 text-[1.2rem] text-ink md:text-[1.35rem]">
                    {audience.label}
                  </h3>
                  <p className="mt-2 text-[0.72rem] leading-[1.7] text-graphite-400">
                    {audience.role}
                  </p>
                  <p className="mt-5 text-[0.85rem] leading-[1.95] text-graphite-600">
                    {audience.detail}
                  </p>
                </div>

                <div className="mt-8">
                  <span
                    aria-hidden="true"
                    className="block h-[2px] w-0 bg-gradient-to-r from-indigo-glow to-emerald-glow transition-all duration-300 group-hover:w-full"
                  />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <span className="text-[0.8rem] leading-[1.7] text-ink">
                      {audience.lead}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-graphite-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                    >
                      →
                    </span>
                  </div>
                </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
