import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import SectionHead from "@/components/SectionHead";
import { brand } from "@/lib/content";
import { OG_IMAGE, SITE_URL, absolute, buildMetadata } from "@/lib/seo";
import { access, companyProfile } from "@/lib/site";

export const metadata = buildMetadata({
  title: "会社概要",
  description:
    "株式会社スマートスタート（SMARTSTART, Inc.）の会社概要。設立、資本金、役員、所在地、認定・加盟団体、アクセスをご案内します。",
  path: "/about/company/",
});

/** LocalBusiness（Organization と住所・連絡先を一致させている） */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/about/company/#localbusiness`,
  name: brand.name,
  alternateName: brand.nameEn,
  url: absolute("/about/company/"),
  image: absolute(OG_IMAGE.url),
  email: brand.email,
  telephone: "+81-3-3556-9988",
  faxNumber: "+81-3-5357-1475",
  address: {
    "@type": "PostalAddress",
    postalCode: "102-0072",
    addressRegion: "東京都",
    addressLocality: "千代田区",
    streetAddress: "飯田橋1-5-6 協和西ビル2階",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.6985949,
    longitude: 139.749094,
  },
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

export default function Page() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <PageHeader
        en="COMPANY"
        title="会社概要"
        lead="株式会社スマートスタート／SMARTSTART, Inc."
        photo="office"
        crumbs={[
          { label: "私たちについて", href: "/about/" },
          { label: "会社概要" },
        ]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Profile" ja="会社情報" />

          <dl className="mt-12 border-t border-black/10">
            {companyProfile.map((row) => (
              <div
                key={row.label}
                data-reveal
                className="grid gap-1.5 border-b border-black/10 py-5 md:grid-cols-12 md:gap-8 md:py-6"
              >
                <dt className="display-jp text-[0.82rem] text-graphite-600 md:col-span-3">
                  {row.label}
                </dt>
                <dd className="text-[0.92rem] leading-[1.9] text-ink md:col-span-9">
                  {row.kind === "tel" ? (
                    <a
                      href={`tel:${row.values[0].replace(/-/g, "")}`}
                      className="num text-[1.05rem] underline decoration-black/20 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
                    >
                      {row.values[0]}
                    </a>
                  ) : row.kind === "mail" ? (
                    <a
                      href={`mailto:${row.values[0]}`}
                      className="underline decoration-black/20 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
                    >
                      {row.values[0]}
                    </a>
                  ) : row.values.length > 1 ? (
                    <ul className="space-y-1">
                      {row.values.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  ) : (
                    row.values[0]
                  )}

                  {row.pending ? (
                    <span className="ml-3 inline-flex rounded-[3px] border border-black/15 px-1.5 py-0.5 align-middle text-[0.6rem] text-graphite-400">
                      公開前に確認
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <p data-reveal className="mt-8 text-[0.72rem] leading-[1.9] text-graphite-400">
            ※ 沿革は現在整理中です。従業員数は最新の人数を確認のうえ更新します。
          </p>
        </div>
      </section>

      <section className="block-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
          <SectionHead en="Access" ja="アクセス" />

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p
                data-reveal
                className="display-jp text-[1.05rem] leading-[1.85] text-ink md:text-[1.2rem]"
              >
                {brand.zip}
                <br />
                {brand.address}
              </p>

              <div data-reveal className="mt-9">
                <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
                  電車でお越しの方
                </p>
                <ul className="mt-4 border-t border-black/10">
                  {access.train.map((station) => (
                    <li
                      key={station.station}
                      className="grid gap-1.5 border-b border-black/10 py-4 sm:grid-cols-12 sm:gap-4"
                    >
                      <span className="display-jp text-[0.92rem] text-ink sm:col-span-4">
                        {station.station}
                        {station.walk ? (
                          <span className="ml-2 text-[0.8rem] font-normal text-graphite-600">
                            {station.walk}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-[0.82rem] leading-[1.85] text-graphite-600 sm:col-span-8">
                        {station.lines.join("／")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                <a
                  href={`tel:${brand.tel.replace(/-/g, "")}`}
                  className="btn-base pill-ink px-7 py-3.5 text-[0.84rem] hover:scale-105 active:scale-95"
                >
                  <span className="num text-[0.98rem]">{brand.tel}</span>
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="btn-base pill-outline-ink px-7 py-3.5 text-[0.82rem] hover:scale-105 active:scale-95"
                >
                  {brand.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                data-reveal
                className="overflow-hidden rounded-2xl border border-black/10 bg-white"
              >
                <iframe
                  src={access.map.embedSrc}
                  title={access.map.title}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block aspect-[16/10] w-full border-0 md:aspect-[16/9]"
                />
              </div>
              <a
                href={access.map.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base pill-outline-ink group mt-4 px-6 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
              >
                Google マップで開く
                <span aria-hidden="true" className="text-[0.72rem]">
                  ↗
                </span>
                <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="お問い合わせはこちらから。"
        body="サービスに関するご相談、取材のお申し込み、採用に関するお問い合わせを承っています。"
      />
    </PageShell>
  );
}
