import Image from "next/image";
import SectionHead from "./SectionHead";
import { businesses, photos } from "@/lib/content";

export default function Business() {
  return (
    <section id="business" className="block-white py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <SectionHead en="Business" ja="事業紹介" />

        <p
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="mt-10 max-w-2xl text-[0.92rem] leading-[2.05] text-graphite-600"
        >
          測定・REAXION・Human Data・システム開発・イベント支援。5つの事業はそれぞれ独立しながら、ひとつのデータの流れでつながっています。
        </p>

        <ul className="mt-14 md:mt-20">
          {businesses.map((business, index) => (
            <li
              key={business.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
              className="border-t border-black/10 py-10 last:border-b md:py-14"
            >
              <div className="grid gap-8 md:grid-cols-[248px_1fr] md:gap-12 lg:gap-20">
                {/* 事業マーク */}
                <div className="flex items-start">
                  <div className="group relative aspect-[16/10] w-full max-w-[280px] overflow-hidden rounded-2xl bg-ink">
                    <Image
                      src={photos[business.photo].src}
                      alt={photos[business.photo].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-indigo-glow to-emerald-glow"
                    />
                    <div className="absolute bottom-4 left-5">
                      <span className="display-en block text-[1.1rem] font-extrabold tracking-[-0.02em] text-white">
                        {business.mark}
                      </span>
                      <span className="num mt-0.5 block text-[0.58rem] tracking-[0.22em] text-white/55">
                        {String(index + 1).padStart(2, "0")} / SMARTSTART
                      </span>
                    </div>
                  </div>
                </div>

                {/* 内容 */}
                <div>
                  <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      aria-hidden="true"
                      className="text-emerald-glow"
                      style={{ fontSize: "0.9rem" }}
                    >
                      ❯
                    </span>
                    <span className="display-jp text-[1.25rem] text-ink md:text-[1.55rem]">
                      {business.label}
                    </span>
                    <span className="display-en text-[0.7rem] font-semibold tracking-[0.2em] text-graphite-400">
                      {business.en}
                    </span>
                  </h3>

                  <p className="display-jp mt-4 text-[0.98rem] leading-[1.85] text-ink md:text-[1.12rem]">
                    {business.message}
                  </p>
                  <p className="mt-4 max-w-2xl text-[0.88rem] leading-[2] text-graphite-600">
                    {business.overview}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {business.services.map((service) => (
                      <li key={service.name}>
                        <a
                          href={service.path}
                          className="group relative inline-flex items-center gap-2 rounded-full border border-black/12 px-4 py-2 text-[0.78rem] text-ink transition-colors duration-300 hover:border-black/35 hover:bg-paper"
                        >
                          {service.name}
                          <span className="hidden text-[0.68rem] text-graphite-400 sm:inline">
                            {service.target}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={business.path}
                      className="btn-base pill-ink group px-7 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
                    >
                      事業の詳細を見る
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
  );
}
