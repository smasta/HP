import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import PolicyBody from "@/components/PolicyBody";
import { brand, pageCovers } from "@/lib/content";
import { mainPolicy, subPolicies } from "@/lib/policies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "個人情報保護方針",
  description:
    "株式会社スマートスタートの個人情報保護方針。個人情報の取得と利用目的、第三者提供、安全管理措置、開示等の請求、Cookieの取り扱い、お問い合わせ窓口について掲載しています。",
  path: "/privacy-policy/",
  image: pageCovers.policy,
});

export default function Page() {
  return (
    <PageShell>
      <PageHeader
        en="PRIVACY POLICY"
        title={mainPolicy.title}
        lead="個人情報の取り扱いに関する方針を掲載しています。"
        photo="office"
        image={pageCovers.policy}
        crumbs={[{ label: mainPolicy.title }]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <PolicyBody blocks={mainPolicy.blocks} />

          <div data-reveal className="mt-16 border-t border-black/10 pt-10">
            <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
              RELATED POLICIES
            </p>
            <p className="display-jp mt-2 text-[0.98rem] text-ink">
              当社が定めるその他のポリシー
            </p>
            <ul className="mt-6 border-t border-black/10">
              {subPolicies.map((policy) => (
                <li key={policy.slug} className="border-b border-black/10">
                  <a
                    href={`/privacy-policy/${policy.slug}/`}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:bg-paper md:px-3"
                  >
                    <span className="display-jp text-[0.95rem] text-ink transition-colors duration-300 group-hover:text-graphite-600">
                      {policy.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-graphite-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mt-12 border-t border-black/10 pt-8">
            <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
              お問い合わせ窓口
            </p>
            <address className="mt-4 space-y-2 not-italic text-[0.9rem] leading-[1.95] text-ink">
              <p>{brand.name}</p>
              <p>
                {brand.zip} {brand.address}
              </p>
              <p className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <a
                  href={`tel:${brand.tel.replace(/-/g, "")}`}
                  className="num underline decoration-black/20 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
                >
                  {brand.tel}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="underline decoration-black/20 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
                >
                  {brand.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
