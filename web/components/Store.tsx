import Image from "next/image";
import CloudBanner from "./CloudBanner";
import SectionHead from "./SectionHead";
import { REAXION_STORE_URL, businesses, photos } from "@/lib/content";

/**
 * REAXIONオンラインストア（https://reaxion.jp/）への導線セクション。
 * ※ 取扱商品・価格・送料などの具体的な記載は行っていない。
 *    ラインナップが確定したら、リード文とシリーズ一覧を確認のうえ更新すること。
 */
const reaxion = businesses.find((business) => business.id === "reaxion");
/** ストアに並ぶのは製品ラインのみ。支援サービス（発達支援）は対象外とする。 */
const series = (reaxion?.services ?? []).filter((service) =>
  service.name.startsWith("REAXION")
);

export default function Store() {
  return (
    <section id="store" className="on-ink relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="aurora-field" aria-hidden="true">
        <div
          className="aurora-blob aurora-c -left-[10vw] bottom-[-14vh] h-[42vw] w-[42vw] opacity-25"
          style={{ background: "radial-gradient(circle, #34d399, transparent 72%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <SectionHead en="Store" ja="REAXIONオンラインストア" tone="paper" />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16 md:mt-20">
          {/* ----------------------------------------------- ビジュアル */}
          <div className="lg:col-span-6">
            <div
              data-reveal
              className="group relative aspect-[4/3] overflow-hidden rounded-[26px] bg-ink-deep md:aspect-[16/11]"
            >
              <Image
                src={photos.athlete.src}
                alt={photos.athlete.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[50%_30%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/35 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-indigo-glow to-emerald-glow"
              />

              <div className="absolute left-6 top-6 flex items-center gap-2.5 rounded-full border border-white/25 bg-ink-deep/50 px-4 py-2 backdrop-blur-md">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-glow" />
                <span className="display-en text-[0.58rem] font-semibold tracking-[0.26em] text-white/80">
                  ONLINE STORE
                </span>
              </div>

              <div className="absolute bottom-7 left-7">
                <p className="display-en text-[1.8rem] font-extrabold tracking-[-0.02em] text-white md:text-[2.4rem]">
                  REAXION
                </p>
                <p className="display-jp mt-1 text-[0.8rem] text-white/65">
                  反応する力を、測る・鍛える。
                </p>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------- 内容 */}
          <div className="lg:col-span-6 lg:pt-4">
            <h3
              data-reveal
              className="display-jp text-[1.35rem] leading-[1.6] text-white md:text-[1.9rem]"
            >
              REAXIONを、
              <br className="hidden sm:block" />
              オンラインでも。
            </h3>

            <p
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="mt-6 text-[0.92rem] leading-[2.1] text-mist-300"
            >
              REAXIONに関する製品・サービスは、オンラインストアからもお求めいただけます。ラインナップと価格、配送や支払いの条件はストア側の表示をご確認ください。導入規模が大きい場合や、測定・分析とあわせたご相談は、お問い合わせから承ります。
            </p>

            <p
              data-reveal
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              className="eyebrow mt-10 text-mist-500"
            >
              REAXION Series
            </p>

            <ul
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="mt-5 border-t border-white/12"
            >
              {series.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={REAXION_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 border-b border-white/12 py-5 transition-colors duration-300 hover:border-emerald-glow/60"
                  >
                    <span className="num text-[0.68rem] text-mist-500 transition-colors duration-300 group-hover:text-emerald-glow">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="display-jp block text-[0.98rem] text-white transition-transform duration-300 group-hover:translate-x-1.5">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[0.72rem] text-mist-500">
                        {item.target}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-mist-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-glow"
                    >
                      ↗
                    </span>
                    <span className="sr-only">
                      （REAXIONオンラインストア・外部サイトが新しいタブで開きます）
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div
              data-reveal
              style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
              className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href={REAXION_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base pill-accent group px-8 py-3.5 text-[0.85rem] hover:scale-105 active:scale-95"
              >
                オンラインストアへ
                <span aria-hidden="true" className="text-[0.78rem]">
                  ↗
                </span>
                <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
              </a>
              <a
                href="/contact/"
                className="btn-base pill-outline-paper px-8 py-3.5 text-[0.85rem] hover:scale-105 active:scale-95"
              >
                まとめての導入を相談する
              </a>
            </div>

            <p
              data-reveal
              className="mt-6 text-[0.72rem] leading-[1.9] text-mist-500"
            >
              ※ オンラインストアは外部サイトです。掲載商品・価格・在庫はストア側の情報が最新となります。
            </p>
          </div>
        </div>

        <CloudBanner />
      </div>
    </section>
  );
}
