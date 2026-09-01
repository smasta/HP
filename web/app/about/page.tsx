import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import SectionHead from "@/components/SectionHead";
import { values } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { nameOrigin } from "@/lib/site";

export const metadata = buildMetadata({
  title: "私たちについて",
  description:
    "SMARTSTARTのMission、Vision、Values。人の可能性を、データとテクノロジーでひらく——私たちの考え方をご紹介します。",
  path: "/about/",
});

const valueBodies: Record<string, string> = {
  MEASURE: "感覚で語られてきた領域に、測るという行為を持ち込みます。",
  UNDERSTAND: "数値を数値のまま渡さず、理解できる情報に翻訳します。",
  IMPROVE: "測って終わりにせず、行動が変わるところまでを設計します。",
  BUILD: "必要な仕組みは、自分たちの手でつくります。",
  CONNECT: "現場で得た知見を、社会で使える形にしてつなぎます。",
};

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        en="ABOUT"
        title="見えなかった「人」を、データにする。"
        lead="人の認知・身体・行動を測定し、そのデータを理解できる情報へ変換する。"
        photo="athlete"
        crumbs={[{ label: "私たちについて" }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div data-reveal className="border-t-2 border-ink pt-8">
              <p className="eyebrow text-graphite-400">Mission</p>
              <p className="display-jp mt-5 text-[1.35rem] leading-[1.6] text-ink md:text-[1.9rem]">
                人の可能性を、データとテクノロジーでひらく。
              </p>
              <p className="mt-6 text-[0.9rem] leading-[2.05] text-graphite-600">
                見る。気づく。考える。判断する。動く。人には、まだ測れていない能力や変化があります。それを測り、扱える形にすることで、一人ひとりと組織がより良い行動を選択できる環境をつくります。
              </p>
            </div>
            <div
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="border-t-2 border-ink pt-8"
            >
              <p className="eyebrow text-graphite-400">Vision</p>
              <p className="display-jp mt-5 text-[1.35rem] leading-[1.6] text-ink md:text-[1.9rem]">
                Human Dataが、健康と行動を変える社会へ。
              </p>
              <p className="mt-6 text-[0.9rem] leading-[2.05] text-graphite-600">
                測定が特別なことではなくなり、健康と行動の判断に当たり前に使われる状態を目指します。企業、自治体、学校、スポーツの現場——それぞれの場所で、データが選択を支える社会へ。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="on-ink bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Values" ja="行動指針" tone="paper" />
          <ul className="mt-12 border-t border-white/12">
            {values.map((value, index) => (
              <li
                key={value.en}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className="group grid gap-3 border-b border-white/12 py-7 transition-colors duration-300 hover:border-emerald-glow/50 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="num text-[0.7rem] text-mist-500 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display-en text-[1.15rem] font-bold text-white transition-colors duration-300 group-hover:text-emerald-glow md:col-span-3 md:text-[1.4rem]">
                  {value.en}
                </span>
                <span className="display-jp text-[1rem] text-white md:col-span-2">
                  {value.ja}
                </span>
                <span className="text-[0.88rem] leading-[1.95] text-mist-400 md:col-span-6">
                  {valueBodies[value.en]}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <a
              href="/about/company/"
              className="btn-base pill-paper group px-8 py-3.5 text-[0.85rem] font-semibold hover:scale-105 active:scale-95"
            >
              会社概要を見る
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="block-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHead en="Our Name" ja={nameOrigin.title} />
            </div>
            <div className="lg:col-span-8">
              <p
                data-reveal
                className="display-jp text-[1.1rem] leading-[1.85] text-ink md:text-[1.4rem]"
              >
                {nameOrigin.lead}
              </p>
              <div className="mt-8 space-y-6">
                {nameOrigin.body.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                    className="text-[0.94rem] leading-[2.15] text-graphite-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
