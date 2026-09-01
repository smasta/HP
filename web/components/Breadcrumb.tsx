import { absolute } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

/** 現在地を示すパンくず。BreadcrumbList の構造化データも同時に出力する。 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "ホーム", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absolute(item.href) } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="パンくずリスト">
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7rem] text-white/55">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-2.5">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-white/80">
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <span aria-hidden="true" className="text-white/25">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
