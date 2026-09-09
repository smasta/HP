import SplitText from "./SplitText";
import type { CSSProperties } from "react";

export default function SectionHead({
  en,
  ja,
  tone = "ink",
  align = "left",
}: {
  en: string;
  ja: string;
  tone?: "ink" | "paper";
  align?: "left" | "center";
}) {
  return (
    /* data-reveal="chars" は親自身を動かさず、内側の文字と罫線だけを起こす */
    <div
      data-reveal="chars"
      className={align === "center" ? "text-center" : undefined}
    >
      <SplitText
        as="h2"
        reveal={false}
        stagger={38}
        text={en}
        className={[
          "display-en text-[2rem] font-bold sm:text-[2.5rem] md:text-[3rem]",
          tone === "ink" ? "text-ink" : "text-white",
        ].join(" ")}
      />
      <p
        data-reveal
        style={{ "--reveal-delay": "220ms" } as CSSProperties}
        className={[
          "display-jp mt-2 text-[0.82rem] tracking-[0.08em]",
          tone === "ink" ? "text-graphite-600" : "text-mist-400",
        ].join(" ")}
      >
        {ja}
      </p>
      <span
        style={{ transformOrigin: align === "center" ? "center" : "left center" }}
        className={[
          "accent-rule rule-draw mt-6 block",
          align === "center" ? "mx-auto" : "",
        ].join(" ")}
      />
    </div>
  );
}
