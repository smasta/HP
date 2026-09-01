import SectionHead from "./SectionHead";
import { metrics } from "@/lib/content";

const captions: Record<string, string> = {
  FOUNDED: "Year of establishment",
  EXPERIENCE: "Years of race timing & operations",
  DOMAINS: "Business domains",
};

export default function Project() {
  return (
    <section id="project" className="block-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead en="Project" ja="実績" />
          <a
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            href="/case-studies/"
            className="btn-base pill-outline-ink group self-start px-7 py-3.5 text-[0.82rem] hover:scale-105 active:scale-95"
          >
            導入実績・事例を見る
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <ul className="mt-16 md:mt-24">
          {metrics.map((metric, index) => (
            <li
              key={metric.en}
              data-reveal
              className="border-t border-black/10 py-12 last:border-b md:py-20"
            >
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="num text-[0.7rem] tracking-[0.2em] text-graphite-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-[3px] w-8 bg-gradient-to-r from-indigo-glow to-emerald-glow" />
                  </div>
                  <h3 className="display-jp mt-4 text-[1.4rem] text-ink md:text-[2rem]">
                    {metric.label}
                  </h3>
                  <p className="display-en mt-2 text-[0.72rem] font-semibold tracking-[0.16em] text-graphite-400">
                    {captions[metric.en] ?? metric.en}
                  </p>
                </div>

                <p className="flex items-end justify-start gap-3 md:justify-end">
                  <span className="stat-num text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem]">
                    {metric.value}
                  </span>
                  <span className="display-jp mb-3 text-[1rem] text-ink md:mb-5 md:text-[1.25rem]">
                    {metric.unit}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p
          data-reveal
          className="mt-10 text-[0.72rem] leading-[1.9] text-graphite-400"
        >
          ※ 実績数値は最新の確定情報を確認のうえ公開しています。導入実績・事例の詳細はお問い合わせください。
        </p>
      </div>
    </section>
  );
}
