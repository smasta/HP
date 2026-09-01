import HeroSlider from "./HeroSlider";
import { brand } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="on-ink relative flex min-h-[100svh] items-center overflow-hidden bg-ink-deep"
    >
      <HeroSlider />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-5 pb-40 pt-28 text-center md:px-8 md:pb-44 lg:px-10">
        <div data-reveal>
          <p className="eyebrow text-white/65">{brand.category}</p>

          <h1 className="display-jp mx-auto mt-7 text-white md:mt-9">
            <span className="line-mask text-[2.9rem] leading-[1.22] sm:text-[4.4rem] md:text-[6rem] lg:text-[7.2rem] xl:text-[8.2rem]">
              <span style={{ "--line-delay": "120ms" } as React.CSSProperties}>
                人を測る。
              </span>
            </span>
            <span className="line-mask text-[2.9rem] leading-[1.22] sm:text-[4.4rem] md:text-[6rem] lg:text-[7.2rem] xl:text-[8.2rem]">
              <span style={{ "--line-delay": "280ms" } as React.CSSProperties}>
                未来を変える。
              </span>
            </span>
          </h1>

          <div
            data-reveal
            style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
            className="mx-auto mt-8 h-[3px] w-14 bg-gradient-to-r from-indigo-glow to-emerald-glow md:mt-10"
          />

          <p
            data-reveal
            style={{ "--reveal-delay": "480ms" } as React.CSSProperties}
            className="mx-auto mt-8 max-w-2xl text-[0.92rem] leading-[2.1] text-white/80 md:text-[1.02rem]"
          >
            {brand.sub}
            <br className="hidden sm:block" />
            測定・分析・改善までを一つの流れとして設計し、人と組織がより良い行動を選べる環境をつくります。
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "600ms" } as React.CSSProperties}
            className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row md:mt-14"
          >
            <a
              href="#business"
              className="btn-base pill-paper group w-full px-9 py-4 text-[0.86rem] font-semibold hover:scale-105 active:scale-95 sm:w-auto"
            >
              事業を見る
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="/contact/"
              className="btn-base pill-outline-paper group w-full px-9 py-4 text-[0.86rem] hover:scale-105 active:scale-95 sm:w-auto"
            >
              導入について相談する
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
