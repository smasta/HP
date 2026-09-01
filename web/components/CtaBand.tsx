/** 各下層ページ末尾の相談導線 */
export default function CtaBand({
  title = "導入について、まずはご相談ください。",
  body = "対象人数や実施時期が決まっていない段階でも構いません。現場の状況をお聞かせいただければ、適した進め方をご提案します。",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-ink relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="aurora-field" aria-hidden="true">
        <div
          className="aurora-blob aurora-a left-[18vw] top-[-16vh] h-[40vw] w-[40vw] opacity-25"
          style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
        />
        <div
          className="aurora-blob aurora-b bottom-[-14vh] right-[-6vw] h-[34vw] w-[34vw] opacity-20"
          style={{ background: "radial-gradient(circle, #34d399, transparent 72%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div
          data-reveal
          className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12"
        >
          <div className="lg:col-span-7">
            <p className="eyebrow text-mist-500">Contact</p>
            <h2 className="display-jp mt-5 text-[1.35rem] leading-[1.6] text-white md:text-[2rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[0.9rem] leading-[2.05] text-mist-300">
              {body}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3.5">
              <a
                href="/contact/"
                className="btn-base pill-accent group px-8 py-4 text-[0.86rem] hover:scale-[1.02] active:scale-95"
              >
                お問い合わせ・資料請求
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <div className="flex flex-col gap-3.5 sm:flex-row">
                <a
                  href="tel:0335569988"
                  className="btn-base pill-outline-paper flex-1 px-6 py-3.5 text-[0.84rem] hover:scale-105 active:scale-95"
                >
                  <span className="num text-[1rem]">03-3556-9988</span>
                </a>
                <a
                  href="mailto:info@smasta.co.jp"
                  className="btn-base pill-outline-paper flex-1 px-6 py-3.5 text-[0.82rem] hover:scale-105 active:scale-95"
                >
                  info@smasta.co.jp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
