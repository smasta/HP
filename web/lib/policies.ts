import policiesData from "./policies.json";

/**
 * ポリシー類。
 * 本文は現行サイト（smasta.co.jp）の掲載内容を移行したもの。
 * 公開前に法務確認のうえ、必要に応じて改定日を追記すること。
 */
export type PolicyBlock = { type: "h" | "p" | "li"; text: string };

export type Policy = {
  slug: string;
  title: string;
  legacyPath: string;
  blocks: PolicyBlock[];
};

const raw = policiesData as Record<
  string,
  { title: string; legacyPath: string; blocks: PolicyBlock[] }
>;

/** 表示順（個人情報保護方針が親、以降が関連文書） */
const ORDER = [
  "privacy-policy",
  "purpose",
  "retained-data",
  "human-rights",
  "anti-social",
  "social-media",
  "cookie",
] as const;

export const policies: Policy[] = ORDER.filter((slug) => raw[slug]).map(
  (slug) => ({ slug, ...raw[slug] })
);

/** 親ページ（/privacy-policy/）に載せる本体 */
export const mainPolicy = policies[0];

/** 子ページ（/privacy-policy/{slug}/）になる関連文書 */
export const subPolicies = policies.slice(1);

export const findPolicy = (slug: string) =>
  subPolicies.find((policy) => policy.slug === slug);
