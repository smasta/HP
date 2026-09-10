import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import PolicyBody from "@/components/PolicyBody";
import { pageCovers } from "@/lib/content";
import { findPolicy, mainPolicy, subPolicies } from "@/lib/policies";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return subPolicies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const policy = findPolicy(slug);
  if (!policy) return {};
  return buildMetadata({
    title: policy.title,
    description: `株式会社スマートスタートの${policy.title}を掲載しています。個人情報保護方針をはじめとする当社のポリシーとあわせてご確認ください。`,
    path: `/privacy-policy/${slug}/`,
    image: pageCovers.policy,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const policy = findPolicy(slug);
  if (!policy) notFound();

  const others = subPolicies.filter((item) => item.slug !== slug);

  return (
    <PageShell>
      <PageHeader
        en="POLICY"
        title={policy.title}
        photo="office"
        image={pageCovers.policy}
        crumbs={[
          { label: mainPolicy.title, href: "/privacy-policy/" },
          { label: policy.title },
        ]}
      />

      <section className="block-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <PolicyBody blocks={policy.blocks} />

          <div data-reveal className="mt-16 border-t border-black/10 pt-10">
            <p className="display-en text-[0.58rem] font-semibold tracking-[0.24em] text-graphite-400">
              RELATED POLICIES
            </p>
            <ul className="mt-5 border-t border-black/10">
              <li className="border-b border-black/10">
                <a
                  href="/privacy-policy/"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:bg-paper md:px-3"
                >
                  <span className="display-jp text-[0.95rem] text-ink transition-colors duration-300 group-hover:text-graphite-600">
                    {mainPolicy.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-graphite-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                  >
                    →
                  </span>
                </a>
              </li>
              {others.map((item) => (
                <li key={item.slug} className="border-b border-black/10">
                  <a
                    href={`/privacy-policy/${item.slug}/`}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:bg-paper md:px-3"
                  >
                    <span className="display-jp text-[0.95rem] text-ink transition-colors duration-300 group-hover:text-graphite-600">
                      {item.title}
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
        </div>
      </section>
    </PageShell>
  );
}
