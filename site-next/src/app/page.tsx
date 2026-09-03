import EditorialHero from "@/components/home/EditorialHero";
import VisualStrips from "@/components/home/VisualStrips";
import EditorialStatement from "@/components/home/EditorialStatement";
import AudienceNav from "@/components/home/AudienceNav";
import FeatureFocus from "@/components/home/FeatureFocus";
import BrandProcess from "@/components/home/BrandProcess";
import BizGrid from "@/components/BizGrid";
import StatStrip from "@/components/StatStrip";
import NewsSection from "@/components/home/NewsSection";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <EditorialHero />
      <VisualStrips />
      <EditorialStatement />
      <AudienceNav />

      <FeatureFocus />

      <BrandProcess />

      <section className="band band-dark business-editorial" id="business">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow on-dark">Business / 事業領域</p>
            <h2 className="h-lg">
              Human Dataを、
              <br />
              社会で使える力へ。
            </h2>
            <p className="lede">測定、トレーニング、データ、開発、現場支援。5つの機能を組み合わせ、課題に合わせた仕組みをつくります。</p>
          </div>
          <BizGrid />
        </div>
      </section>

      <section className="band band-alt stats-editorial">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Project / 数字で見るSMARTSTART</p>
            <h2 className="h-lg">
              積み重ねてきた、
              <br />
              測定と現場。
            </h2>
          </div>
          <StatStrip
            items={[
              { label: "設立", en: "ESTABLISHED", num: 2013 },
              { label: "大会計測・運営実績", en: "EVENT TIMING TRACK RECORD", num: 10, suffix: "年+" },
              { label: "事業ドメイン", en: "BUSINESS FUNCTIONS", num: 5 },
            ]}
          />
        </div>
      </section>

      <NewsSection />

      <CtaBand
        title="私たちと一緒に働きませんか？"
        sub="デジタルの力で社会の課題に挑戦したい、そんなあなたの参画をお待ちしております。"
        ctas={[
          { label: "採用情報を見る", href: "/recruit/" },
          { label: "お問合せ", href: "/contact/", outline: true },
        ]}
      />
    </>
  );
}
