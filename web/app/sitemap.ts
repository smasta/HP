import type { MetadataRoute } from "next";
import { columnCategories, columns } from "@/lib/columns";
import { news, newsCategories } from "@/lib/content";
import { subPolicies } from "@/lib/policies";
import { SITE_URL } from "@/lib/seo";
import { caseStudies, hubs, services, servicePath } from "@/lib/site";

/**
 * サイトマップ。仕様書4章のサイトマップと1対1で対応する。
 * ページを追加したら、ここにも反映されているか確認すること。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const entries: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  // 事業ハブ
  hubs.forEach((hub) => {
    entries.push({
      url: url(`/${hub.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  // サービス詳細
  services.forEach((service) => {
    entries.push({
      url: url(servicePath(service)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // 独立ページ
  (
    [
      ["/human-data/", 0.8],
      ["/case-studies/", 0.7],
      ["/about/", 0.7],
      ["/about/company/", 0.6],
      ["/news/", 0.7],
      ["/recruit/", 0.6],
      ["/contact/", 0.8],
      ["/privacy-policy/", 0.3],
    ] as const
  ).forEach(([path, priority]) => {
    entries.push({
      url: url(path),
      lastModified: now,
      changeFrequency: "monthly",
      priority,
    });
  });

  // 導入事例
  caseStudies.forEach((item) => {
    entries.push({
      url: url(`/case-studies/${item.slug}/`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  // ポリシー類
  subPolicies.forEach((policy) => {
    entries.push({
      url: url(`/privacy-policy/${policy.slug}/`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  });

  // 新着情報のカテゴリ
  newsCategories.forEach((category) => {
    entries.push({
      url: url(`/news/category/${category.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // コラム（一覧・カテゴリ・記事）
  entries.push({
    url: url("/column/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  });
  columnCategories.forEach((category) => {
    entries.push({
      url: url(`/column/category/${category.key}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });
  columns.forEach((item) => {
    entries.push({
      url: url(`/column/${item.slug}/`),
      lastModified: new Date(item.updatedAt ?? item.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // 新着情報
  news.forEach((item) => {
    entries.push({
      url: url(item.path),
      lastModified: new Date(item.dateTime),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  return entries;
}
