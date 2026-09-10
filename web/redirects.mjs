import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * 旧サイト（WordPress）から新サイトへの 301 リダイレクト定義。
 *
 * ・旧記事は日付入りの URL（/2025/08/27/slug/）だったため、新しい /news/slug/ へ寄せる。
 *   対応表は lib/news.json の legacySlug / sourceUrl から自動生成する。
 * ・旧固定ページのうち、新サイトに同じパスがあるもの（/about/ /contact/ /recruit/
 *   /privacy-policy/）はリダイレクト不要。
 * ・新サイトに対応する事業がないページ（制作・マーケティング系）は、
 *   404 を避けるため最も近いページへ寄せている。※印の行は差し替え候補。
 */

const here = dirname(fileURLToPath(import.meta.url));

/** 旧固定ページ → 新ページ */
const PAGE_MAP = {
  // 問い合わせ・採用・会社
  "/お問い合わせ/": "/contact/",
  "/recruit_form/": "/contact/",
  "/採用情報/": "/recruit/",
  "/企業ビジョン/": "/about/",
  "/沿革/": "/about/company/",

  // 事業
  "/システム開発事業/": "/system/development/",
  "/スポーツ大会運営事業/": "/event/produce/",
  "/大会運営代行/": "/event/consulting/",
  "/コンサルティング事業/": "/event/consulting/",
  "/スポーツ・コンサルティング/": "/event/consulting/",
  "/smart-timing/": "/measurement/smart-timing/",
  "/施設・スクール運営支援/": "/event/produce/",
  // 旧・事業一覧 → 5事業を並べているトップの Business セクションへ
  "/services/": "/#business",

  // Web制作・LP制作は受託開発に統合されたため、システム開発の詳細へ
  "/lp制作事業/": "/system/development/",
  "/web制作事業-2/": "/system/development/",
  "/ホームページ制作/": "/system/development/",

  // マーケティング系（SEO/MEO/SNS運用）は新サイトに該当事業がない。
  // 話題が離れたページへ飛ばすとソフト404扱いになりうるため、
  // 相談窓口へ寄せて離脱を防ぐ。事業を再掲する場合はここを差し替える。
  "/seo対策/": "/contact/",
  "/meo対策/": "/contact/",
  "/インスタアカウント運営代行/": "/contact/",
  "/インターネットマーケティング事業/": "/contact/",

  // 新着情報
  "/newsandrelease/": "/news/",

  // ポリシー類（それぞれ対応する文書ページへ）
  "/privacy-statement/": "/privacy-policy/purpose/",
  "/privacy-data/": "/privacy-policy/retained-data/",
  "/elementor-1605/": "/privacy-policy/human-rights/", // 旧・人権方針
  "/bohai/": "/privacy-policy/anti-social/",
  "/snsguideline/": "/privacy-policy/social-media/",
  "/cookie/": "/privacy-policy/cookie/",

  // 会社情報（Search Console で流入を確認。/アクセス/ は旧サイトの5番目に多い着地ページ）
  "/アクセス/": "/about/company/",
  "/outline/沿革/": "/about/company/",
  "/outline/": "/about/",

  // WordPress 以前の静的プレスリリース（.html）
  "/pr161002.html": "/news/",
  "/pr161007.html": "/news/",
  "/pr161014.html": "/news/",
  "/pr161025.html": "/news/",
  "/pr161101.html": "/news/",
  "/pr180530.html": "/news/",
  "/pr200420.html": "/news/",

  // 不要ページ
  "/sample-page/": "/",
};

/** 旧記事URL（/YYYY/MM/DD/slug/）→ 新記事URL */
function newsRedirects() {
  const news = JSON.parse(readFileSync(join(here, "lib", "news.json"), "utf8"));
  const list = [];

  for (const item of news) {
    if (!item.legacySlug || !item.sourceUrl) continue;
    const oldPath = decodeURIComponent(new URL(item.sourceUrl).pathname);
    if (oldPath === item.path) continue;
    list.push([oldPath, item.path]);
  }
  return list;
}

/** 日本語パスは素の形と percent-encoded の両方を登録する */
function expand(source) {
  const encoded = encodeURI(source);
  return encoded === source ? [source] : [source, encoded];
}

export default function buildRedirects() {
  const pairs = [...Object.entries(PAGE_MAP), ...newsRedirects()];
  const seen = new Set();
  const redirects = [];

  for (const [from, to] of pairs) {
    for (const source of expand(from)) {
      if (seen.has(source) || source === to) continue;
      seen.add(source);
      redirects.push({ source, destination: to, permanent: true });
    }
  }

  // WordPress のタグ・カテゴリ・投稿者アーカイブは新着情報一覧へ。
  // Search Console 上ではタグページに 20 前後の表示回数があり、放置すると404になる
  redirects.push(
    { source: "/tag/:slug*", destination: "/news/", permanent: true },
    { source: "/category/:slug*", destination: "/news/", permanent: true },
    { source: "/author/:slug*", destination: "/news/", permanent: true },
    // 上で列挙しきれない静的プレスリリースも拾う
    { source: "/pr:id(\\d+).html", destination: "/news/", permanent: true },
    // 旧・会社情報配下
    { source: "/outline/:path*", destination: "/about/", permanent: true }
  );

  // 旧記事の日付アーカイブ（/2025/ /2025/08/ など）は新着情報一覧へ
  redirects.push(
    { source: "/:year(\\d{4})/", destination: "/news/", permanent: true },
    { source: "/:year(\\d{4})/:month(\\d{2})/", destination: "/news/", permanent: true },
    {
      source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/",
      destination: "/news/",
      permanent: true,
    }
  );

  return redirects;
}
