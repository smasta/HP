import Contact from "@/components/Contact";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import SectionHead from "@/components/SectionHead";
import { contactTypes, photos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "お問い合わせ",
  description:
    "SMARTSTARTへのお問い合わせ。サービスのご相談、REAXION導入相談、研究連携、システム開発、イベント・大会運営、取材、採用に関するお問い合わせを承ります。",
  path: "/contact/",
  image: photos.office,
});

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        en="CONTACT"
        title="お問い合わせ"
        lead="導入相談、資料請求、研究連携、採用に関するお問い合わせを承っています。"
        photo="office"
        crumbs={[{ label: "お問い合わせ" }]}
      />

      <section className="block-white py-16 md:py-20">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Type" ja="お問い合わせ種別" />
          <ul data-reveal className="mt-10 flex flex-wrap gap-2.5">
            {contactTypes.map((type) => (
              <li
                key={type}
                className="rounded-full border border-black/12 px-4 py-2 text-[0.78rem] text-graphite-600"
              >
                {type}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.78rem] leading-[1.9] text-graphite-400">
            該当する種別を、下のフォームでお選びください。お電話・メールでも承ります。
          </p>
        </div>
      </section>

      <Contact />
    </PageShell>
  );
}
