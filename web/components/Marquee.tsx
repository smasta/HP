import { brand, marqueeWords } from "@/lib/content";

function Track() {
  return (
    <div className="marquee__track" aria-hidden="true">
      {marqueeWords.map((word) => (
        <span key={word} className="flex items-center gap-10">
          <span className="display-en text-[1.5rem] font-extrabold italic tracking-[-0.02em] text-ink sm:text-[2.2rem] md:text-[2.9rem]">
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
    <section className="block-white relative border-b border-black/[0.07] py-16 md:py-20">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div data-reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-[9px] w-[9px] rounded-full bg-gradient-to-br from-indigo-glow to-emerald-glow" />
            <span className="display-en text-[0.95rem] font-bold tracking-[-0.01em] text-ink">
              SMARTSTART
            </span>
          </div>
          <p className="display-jp mt-5 text-[1.05rem] leading-[1.85] text-ink sm:text-[1.35rem] md:text-[1.6rem]">
            認知・身体・行動をデータに変え、
            <br className="hidden sm:block" />
            人の可能性をひらくプラットフォーム。
          </p>
        </div>
      </div>

      <div className="marquee mt-12 md:mt-16" style={{ "--marquee-duration": "38s" } as React.CSSProperties}>
        <Track />
        <Track />
      </div>
      <p className="sr-only">
        SMARTSTARTが扱う領域：{marqueeWords.join("、")}
      </p>
    </section>
  );
}
