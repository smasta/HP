export default function Recruit() {
  return (
    <section
      id="recruit"
      className="on-ink relative overflow-hidden bg-ink py-24 md:py-36"
    >
      <div className="aurora-field" aria-hidden="true">
        <div
          className="aurora-blob aurora-b left-[16vw] top-[-14vh] h-[44vw] w-[44vw] opacity-30"
          style={{ background: "radial-gradient(circle, #34d399, transparent 72%)" }}
        />
        <div
          className="aurora-blob aurora-a right-[-8vw] bottom-[-12vh] h-[36vw] w-[36vw] opacity-25"
          style={{ background: "radial-gradient(circle, #818cf8, transparent 72%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow text-mist-500">
              Recruit / 採用情報
            </p>

            <h2 data-reveal className="display-en mt-6 text-white">
              <span className="line-mask text-[2.2rem] sm:text-[3.2rem] md:text-[4.2rem]">
                <span style={{ "--line-delay": "100ms" } as React.CSSProperties}>
                  Build What
                </span>
              </span>
              <span className="line-mask text-[2.2rem] sm:text-[3.2rem] md:text-[4.2rem]">
                <span style={{ "--line-delay": "240ms" } as React.CSSProperties}>
                  Measures People
                </span>
              </span>
            </h2>

            <p
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="display-jp mt-9 text-[1.15rem] text-white md:text-[1.5rem]"
            >
              私たちと一緒に働きませんか？
            </p>
            <p
              data-reveal
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              className="mt-5 max-w-xl text-[0.9rem] leading-[2.1] text-mist-300"
            >
              デジタルの力で社会の課題に挑戦したい方の参画を募集しています。測定技術、データ分析、システム開発、イベント運営——SMARTSTARTには、人の可能性に向き合う仕事があります。
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
              className="mt-10 flex flex-col gap-3.5 sm:flex-row"
            >
              <a
                href="/recruit/"
                className="btn-base pill-paper group px-8 py-3.5 text-[0.84rem] font-semibold hover:scale-105 active:scale-95"
              >
                採用情報を見る
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="/contact/"
                className="btn-base pill-outline-paper px-8 py-3.5 text-[0.84rem] hover:scale-105 active:scale-95"
              >
                お問い合わせ
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-24">
            <ul data-reveal className="border-t border-white/12">
              {[
                { k: "MEASURE", v: "測定の現場をつくる" },
                { k: "BUILD", v: "プロダクトを開発する" },
                { k: "CONNECT", v: "社会実装につなぐ" },
              ].map((row) => (
                <li
                  key={row.k}
                  className="group flex items-center justify-between border-b border-white/12 py-6 transition-colors duration-300 hover:border-emerald-glow/60"
                >
                  <span className="display-en text-[0.78rem] font-semibold tracking-[0.2em] text-mist-500 transition-colors duration-300 group-hover:text-emerald-glow">
                    {row.k}
                  </span>
                  <span className="display-jp text-[0.95rem] text-white">
                    {row.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
