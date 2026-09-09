import type { CSSProperties } from "react";
import SplitText from "./SplitText";
import { marqueeWords } from "@/lib/content";

function Track({
  reverse = false,
  muted = false,
}: {
  reverse?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={["marquee__track", reverse ? "marquee__track--reverse" : ""].join(" ")}
      aria-hidden="true"
    >
      {marqueeWords.map((word) => (
        <span key={word} className="flex items-center gap-10">
          <span
            className={
              muted
                ? "display-en text-[1.1rem] font-semibold tracking-[0.06em] text-graphite-400 sm:text-[1.5rem] md:text-[1.9rem]"
                : "display-en text-[1.5rem] font-extrabold italic tracking-[-0.02em] text-ink sm:text-[2.2rem] md:text-[2.9rem]"
            }
          >
            {word}
          </span>
          <span className="text-[1rem] font-light text-graphite-400 sm:text-[1.3rem]">
            ✕
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="block-white relative z-10 border-b border-black/[0.07] py-16 md:py-20">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div data-reveal="chars" className="max-w-3xl">
          <div
            data-reveal
            className="flex items-center gap-3"
          >
            <span className="pulse-dot h-[9px] w-[9px] rounded-full bg-gradient-to-br from-indigo-glow to-emerald-glow" />
            <span className="display-en text-[0.95rem] font-bold tracking-[-0.01em] text-ink">
              SMARTSTART
            </span>
          </div>
          <SplitText
            as="p"
            reveal={false}
            stagger={22}
            delay={180}
            text={"認知・身体・行動をデータに変え、\n人の可能性をひらくプラットフォーム。"}
            className="display-jp mt-5 text-[1.05rem] leading-[1.85] text-ink sm:text-[1.35rem] md:text-[1.6rem]"
          />
        </div>
      </div>

      {/* 上下で逆向きに流れる2本の帯 */}
      <div
        className="marquee mt-12 md:mt-16"
        style={{ "--marquee-duration": "38s" } as CSSProperties}
      >
        <Track />
        <Track />
      </div>
      <div
        className="marquee mt-4 md:mt-6"
        style={{ "--marquee-duration": "52s" } as CSSProperties}
      >
        <Track reverse muted />
        <Track reverse muted />
      </div>

      <p className="sr-only">
        SMARTSTARTが扱う領域：{marqueeWords.join("、")}
      </p>
    </section>
  );
}
