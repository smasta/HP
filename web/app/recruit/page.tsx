import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import SectionHead from "@/components/SectionHead";
import { brand } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "採用情報",
  description:
    "SMARTSTARTの採用情報。デジタルの力で社会の課題に挑戦したい方の参画を募集しています。募集職種と応募方法をご案内します。",
  path: "/recruit/",
});

const work = [
  {
    en: "MEASURE",
    title: "測定の現場をつくる",
    body: "企業、自治体、学校、大会。測定を実施する現場に立ち、その場で結果を返すところまでを担います。",
  },
  {
    en: "BUILD",
    title: "プロダクトを開発する",
    body: "測定機器と連携するクラウド、分析の仕組み、社内外の業務システム。自分たちで作り、運用します。",
  },
  {
    en: "CONNECT",
    title: "社会実装につなぐ",
    body: "現場で得た知見を、研究機関や自治体と連携しながら、社会で使える形に翻訳していきます。",
  },
];

const flow = [
  { step: "01", title: "応募", body: "お問い合わせフォームより、採用についてを選択のうえご連絡ください。" },
  { step: "02", title: "書類選考", body: "ご経歴を拝見し、結果をご連絡します。" },
  { step: "03", title: "面接", body: "業務内容と、これまでのご経験についてお話しします。" },
  { step: "04", title: "内定・入社", body: "条件をご確認いただき、入社日を調整します。" },
];

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        en="RECRUIT"
        title="私たちと一緒に働きませんか？"
        lead="デジタルの力で社会の課題に挑戦したい方の参画を募集しています。"
        photo="kids"
        crumbs={[{ label: "採用情報" }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHead en="Message" ja="採用メッセージ" />
            </div>
            <div className="lg:col-span-8">
              <p data-reveal className="display-jp text-[1.15rem] leading-[1.85] text-ink md:text-[1.5rem]">
                測ることは、まだ誰も見ていないものを見ることです。
              </p>
              <p
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                className="mt-7 text-[0.94rem] leading-[2.15] text-graphite-600"
              >
                人の認知・身体・行動を測るという仕事は、機器を扱うことでも、数値を出すことでもありません。目の前の人が自分の状態に気づき、次の行動を選べるようになるまでを設計する仕事です。測定技術、データ分析、システム開発、イベント運営——役割は違っても、向き合っているのは同じ課題です。
              </p>
              <p
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
                className="mt-6 text-[0.94rem] leading-[2.15] text-graphite-600"
              >
                現場に出る機会が多く、自分の関わった仕事の結果が目の前で返ってきます。作って終わりにしない環境で働きたい方をお待ちしています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="on-ink bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Work" ja="仕事の領域" tone="paper" />
          <ul className="mt-12 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {work.map((item, index) => (
              <li
                key={item.en}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className="group bg-ink p-8 transition-colors duration-300 hover:bg-white/[0.04] md:p-10"
              >
                <p className="display-en text-[0.72rem] font-semibold tracking-[0.24em] text-mist-500 transition-colors duration-300 group-hover:text-emerald-glow">
                  {item.en}
                </p>
                <h3 className="display-jp mt-4 text-[1.1rem] text-white md:text-[1.25rem]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.86rem] leading-[2] text-mist-400">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Positions" ja="募集職種" />

          {/* ※ 募集職種と雇用条件は、公開前に採用担当者が確認・確定すること（仕様書 12章・18章） */}
          <div
            data-reveal
            className="mt-12 rounded-2xl border border-black/12 bg-white px-7 py-10 md:px-12 md:py-14"
          >
            <p className="display-jp text-[1.05rem] leading-[1.8] text-ink md:text-[1.25rem]">
              現在の募集職種は準備中です。
            </p>
            <p className="mt-5 max-w-2xl text-[0.9rem] leading-[2.05] text-graphite-600">
              募集職種、業務内容、応募条件、雇用条件は、確定し次第こちらに掲載します。掲載前でも、ご関心をお持ちの方からのお問い合わせは随時受け付けています。ご経歴とご希望をお送りください。
            </p>

            <dl className="mt-10 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
              {[
                ["業務内容", "職種ごとに掲載予定"],
                ["応募条件", "職種ごとに掲載予定"],
                ["雇用形態・勤務地", "掲載準備中"],
                ["給与・待遇・休日", "掲載準備中"],
              ].map(([label, value]) => (
                <div key={label} className="bg-white px-6 py-5">
                  <dt className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                    {label}
                  </dt>
                  <dd className="mt-2 text-[0.88rem] text-graphite-600">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Flow" ja="選考の流れ" />
          <ol className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, index) => (
              <li
                key={step.step}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className="group bg-white p-7 transition-colors duration-300 hover:bg-paper md:p-9"
              >
                <span className="num text-[1.4rem] text-graphite-400/60">{step.step}</span>
                <h3 className="display-jp mt-3 text-[1rem] text-ink">{step.title}</h3>
                <p className="mt-3 text-[0.84rem] leading-[1.95] text-graphite-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div
            data-reveal
            className="mt-14 rounded-2xl border border-black/12 bg-paper px-7 py-9 md:px-10"
          >
            <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
              採用に関するお問い合わせ
            </p>
            <p className="mt-4 text-[0.9rem] leading-[2] text-graphite-600">
              お問い合わせフォームの種別で「採用について」をお選びください。お電話・メールでも承ります。
            </p>
            <div className="mt-7 flex flex-col gap-3.5 sm:flex-row">
              <a
                href="/contact/"
                className="btn-base pill-ink group px-8 py-3.5 text-[0.84rem] hover:scale-105 active:scale-95"
              >
                採用について問い合わせる
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="btn-base pill-outline-ink px-8 py-3.5 text-[0.82rem] hover:scale-105 active:scale-95"
              >
                {brand.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="事業についてのご相談も承っています。"
        body="採用以外のお問い合わせも、同じフォームからご連絡いただけます。"
      />
    </PageShell>
  );
}
