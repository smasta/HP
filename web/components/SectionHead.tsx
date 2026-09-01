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
    <div
      data-reveal
      className={align === "center" ? "text-center" : undefined}
    >
      <h2
        className={[
          "display-en text-[2rem] font-bold sm:text-[2.5rem] md:text-[3rem]",
          tone === "ink" ? "text-ink" : "text-white",
        ].join(" ")}
      >
        {en}
      </h2>
      <p
        className={[
          "display-jp mt-2 text-[0.82rem] tracking-[0.08em]",
          tone === "ink" ? "text-graphite-600" : "text-mist-400",
        ].join(" ")}
      >
        {ja}
      </p>
      <span
        className={[
          "accent-rule mt-6 block",
          align === "center" ? "mx-auto" : "",
        ].join(" ")}
      />
    </div>
  );
}
