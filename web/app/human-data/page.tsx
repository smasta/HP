import CtaBand from "@/components/CtaBand";
import DataSection from "@/components/DataSection";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import SectionHead from "@/components/SectionHead";
import { pageCovers } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Human Data",
  description:
    "測定から生まれるデータを蓄積・分析し、次の価値へつなげるSMARTSTARTのHuman Data。研究機関・大学との連携についてもご案内します。",
  path: "/human-data/",
  image: pageCovers.humanData,
});

const uses = [
  {
    title: "個人へのフィードバック",
    body: "測定した本人が理解できる形に結果を翻訳し、次に何をすればよいかまで示します。",
  },
  {
    title: "集団・組織の分析",
    body: "部署、施設、チーム、地域といった単位で傾向を整理し、施策の対象と優先順位を決められるようにします。",
  },
  {
    title: "経時変化の追跡",
    body: "同じ条件で測り続けることで、取り組みの前後に何が起きたのかを捉えます。",
  },
  {
    title: "研究機関・大学との連携",
    body: "測定データを研究の文脈で扱えるよう、設計段階からご相談に応じます。",
  },
];

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        en="HUMAN DATA"
        title="人の状態を、ひとつの数字で終わらせない。"
        lead="測定から生まれるデータを蓄積・分析し、次の価値へつなげる。"
        photo="development"
        image={pageCovers.humanData}
        crumbs={[{ label: "Human Data" }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHead en="Approach" ja="考え方" />
            </div>
            <div className="lg:col-span-8">
              <p
                data-reveal
                className="text-[0.96rem] leading-[2.15] text-graphite-600 md:text-[1rem]"
              >
                SMARTSTARTは一度だけの測定結果を提供するのではなく、認知と身体が連動する状態を継続的に測定・分析し、トレーニングや行動変容へつなげます。個人の記録は集団の知見となり、研究機関や大学との連携を通じて、社会で使える形へ翻訳されていきます。
              </p>
              <p
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                className="mt-6 text-[0.96rem] leading-[2.15] text-graphite-600 md:text-[1rem]"
              >
                測定を目的にしないこと。数値をそのまま渡さないこと。この二つを前提に、データの設計から扱い方までをご相談しながら決めていきます。
              </p>
            </div>
          </div>

          <ul className="mt-16 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 md:mt-20">
            {uses.map((use, index) => (
              <li
                key={use.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
                className="group bg-white p-8 transition-colors duration-300 hover:bg-paper md:p-10"
              >
                <span className="num text-[0.68rem] text-graphite-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display-jp mt-3.5 text-[1.05rem] text-ink md:text-[1.2rem]">
                  {use.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-[2px] w-8 bg-gradient-to-r from-indigo-glow to-emerald-glow transition-all duration-300 group-hover:w-16"
                />
                <p className="mt-4 text-[0.88rem] leading-[2.05] text-graphite-600">
                  {use.body}
                </p>
              </li>
            ))}
          </ul>

          <p data-reveal className="mt-8 text-[0.72rem] leading-[1.9] text-graphite-400">
            ※ 測定データの取り扱いは、個人情報保護方針および各案件で定める取り決めに従います。
          </p>
        </div>
      </section>

      <DataSection />

      <CtaBand
        title="研究連携・データ活用について、ご相談ください。"
        body="共同研究、データの利活用、測定設計からのご相談まで承ります。検討段階でのお問い合わせも歓迎します。"
      />
    </PageShell>
  );
}
