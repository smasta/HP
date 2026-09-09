import type { CSSProperties } from "react";
import HeroSlider from "./HeroSlider";
import SplitText from "./SplitText";
import { brand } from "@/lib/content";

export default function Hero() {
  return (
    /* ピン留めの舞台。スクロールしても画は留まり、見出しだけが送り出される */
    <div id="top" data-pin-stage className="pin-stage">
      <section className="pin-inner on-ink relative flex min-h-[100svh] items-center overflow-hidden bg-ink-deep">
        <HeroSlider />

        <div
          data-pin-fade
          className="relative z-10 mx-auto w-full max-w-[1560px] px-5 pb-36 pt-24 text-center md:px-8 md:pb-44 md:pt-28 lg:px-10"
        >
          <div data-reveal="chars">
            <p data-reveal className="eyebrow text-white/65">
              {brand.category}
            </p>

            {/* ピン留めで高さが 100svh に固定されるため、
                画面の幅と高さの小さい方に合わせて字面を収める */}
            <SplitText
              as="h1"
              text={"人を測る。\n未来を変える。"}
              delay={260}
              stagger={54}
              style={{ fontSize: "clamp(2.6rem, min(7.4vw, 12svh), 8.2rem)" }}
              className="display-jp mx-auto mt-6 leading-[1.22] text-white md:mt-8"
            />

            <div
              data-reveal
              style={{ "--reveal-delay": "820ms" } as CSSProperties}
              className="mx-auto mt-7 h-[3px] w-14 bg-gradient-to-r from-indigo-glow to-emerald-glow md:mt-10"
            />

            <p
              data-reveal
              style={{ "--reveal-delay": "900ms" } as CSSProperties}
              className="mx-auto mt-7 max-w-2xl text-[0.92rem] leading-[2.1] text-white/80 md:mt-8 md:text-[1.02rem]"
            >
              {brand.sub}
              <br className="hidden sm:block" />
              測定・分析・改善までを一つの流れとして設計し、人と組織がより良い行動を選べる環境をつくります。
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "1020ms" } as CSSProperties}
              className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row md:mt-14"
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

        {/* スクロールを促す一本線 */}
        <div
          data-pin-fade
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[132px] z-10 hidden justify-center lg:flex"
        >
          <span className="block h-14 w-px overflow-hidden bg-white/15">
            <span className="scroll-cue block h-5 w-full bg-gradient-to-b from-indigo-glow to-emerald-glow" />
          </span>
        </div>
      </section>
    </div>
  );
}
