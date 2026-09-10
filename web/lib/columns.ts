import columnData from "./columns.json";
import type { PhotoKey } from "./content";

/**
 * 解説記事（コラム）。
 *
 * プレスリリース（lib/news.json）とは分けて扱う。
 * ・news  … 自社の発表。事実の記録が目的
 * ・column… 検索から来た人に向けた解説。オーガニック流入が目的
 *
 * 記事URLはカテゴリを含めないフラット構造にしている。
 * 1本が複数カテゴリにまたがることが多く、分類を変えても
 * URLが変わらないようにするため（URL変更は評価を失う）。
 */

/** 本文ブロック。NewsBlock を土台に、解説記事で必要なものを足している */
export type ColumnBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "dl"; items: [string, string][] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "quote"; text: string; source?: string }
  | { type: "note"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  /** 記事の途中に置く要点まとめ */
  | { type: "callout"; title: string; items: string[] }
  /** サービスへの導線 */
  | { type: "cta"; title: string; body: string; label: string; href: string };

export type ColumnCategoryKey =
  | "safety"
  | "care"
  | "wellness"
  | "sports"
  | "kids"
  | "research";

export type ColumnCategory = {
  key: ColumnCategoryKey;
  name: string;
  en: string;
  /** カテゴリ固有のキービジュアル。未指定なら photo の写真を使う */
  cover?: { src: string; alt: string };
  /** カテゴリ一覧ページのリード文 */
  lead: string;
  description: string;
  photo: PhotoKey;
};

/**
 * カテゴリは「検索需要」と「対象者別の入口」の両方に合わせている。
 * research は用語解説などの上流コンテンツを置き、
 * 他カテゴリから内部リンクを集めて専門性の裏付けにする。
 */
export const columnCategories: ColumnCategory[] = [
  {
    key: "safety",
    name: "労働安全衛生",
    en: "Occupational Safety",
    lead: "高年齢労働者の労災をどう防ぐか。法改正への対応から現場の測定まで。",
    description:
      "2026年4月施行の改正労働安全衛生法をはじめ、高年齢労働者の安全確保に必要な制度・測定・職場改善の実務をまとめています。",
    photo: "office",
    cover: {
      src: "/images/covers/column-safety.jpg",
      alt: "六角形の階層をモチーフにした労働安全衛生カテゴリのキービジュアル",
    },
  },
  {
    key: "care",
    name: "高齢者・介護",
    en: "Care",
    lead: "転倒リスクを、感覚ではなく数値で捉える。介護現場の評価と加算の実務。",
    description:
      "転倒リスクの評価方法、個別機能訓練加算やLIFEへの対応など、介護事業所で使える測定と記録の考え方を解説します。",
    photo: "senior",
    cover: {
      src: "/images/covers/column-care.jpg",
      alt: "同心円とゲージをモチーフにした高齢者・介護カテゴリのキービジュアル",
    },
  },
  {
    key: "wellness",
    name: "健康経営",
    en: "Health Management",
    lead: "従業員の状態を測り、健康経営を施策として動かす。",
    description:
      "健康経営優良法人の要件、産業保健との連携、従業員の認知・身体機能の把握など、人事・総務が扱う実務を解説します。",
    photo: "office",
    cover: {
      src: "/images/covers/column-wellness.jpg",
      alt: "棒グラフと推移線をモチーフにした健康経営カテゴリのキービジュアル",
    },
  },
  {
    key: "sports",
    name: "アスリート・スポーツ",
    en: "Sports",
    lead: "反応・判断・認知を測り、競技力の向上につなげる。",
    description:
      "反応速度や動体視力の測定、トレーニングへの接続など、チームや指導者が使える科学的アプローチを解説します。",
    photo: "athlete",
    cover: {
      src: "/images/covers/column-sports.jpg",
      alt: "放射する線をモチーフにしたアスリート・スポーツカテゴリのキービジュアル",
    },
  },
  {
    key: "kids",
    name: "こども・発達",
    en: "Kids",
    lead: "成長段階の認知と運動の関係を、指導の根拠にする。",
    description:
      "子どもの発達段階に応じた運動と認知の関わり、支援や指導の場での測定の活かし方を解説します。",
    photo: "kids",
    cover: {
      src: "/images/covers/column-kids.jpg",
      alt: "広がる同心の弧をモチーフにしたこども・発達カテゴリのキービジュアル",
    },
  },
  {
    key: "research",
    name: "測定とデータ",
    en: "Measurement",
    lead: "そもそも何を、どう測るのか。用語と手法の基礎。",
    description:
      "認知機能・反応時間・注意機能といった用語の意味と測定手法、データの読み方を横断的に解説します。",
    photo: "development",
    cover: {
      src: "/images/covers/column-research.jpg",
      alt: "散布図と回帰線をモチーフにした研究・技術カテゴリのキービジュアル",
    },
  },
];

export const findColumnCategory = (key: string) =>
  columnCategories.find((category) => category.key === key);

/** 記事の監修者。専門性の裏付けとして記事に明示する */
export type Reviewer = {
  name: string;
  role: string;
  /** 監修者の経歴や資格。空にしない */
  profile: string;
};

export type ColumnItem = {
  slug: string;
  /**
   * 監修前の初稿。true の間はサイトに出さない。
   * 自動生成した記事が監修を経ずに公開されるのを防ぐための仕組み。
   * 監修が済んだら false にするか、この行を削除する。
   */
  draft?: boolean;
  category: ColumnCategoryKey;
  title: string;
  /** SERPで切れないよう短くした検索結果用タイトル（任意） */
  seoTitle: string;
  description: string;
  /** 記事冒頭のリード文 */
  lead: string;
  publishedAt: string;
  updatedAt?: string;
  /** 検索意図の中心にある語。内部リンクの手がかりにも使う */
  keywords: string[];
  reviewer?: Reviewer;
  cover?: { src: string; alt: string };
  photo: PhotoKey;
  body: ColumnBlock[];
  faq?: { q: string; a: string }[];
  /** 関連サービスのパス（例: "measurement/reaxion-well"） */
  relatedServices?: string[];
  /** 出典。制度や統計を扱う記事では必ず示す */
  sources?: { label: string; href: string }[];
};

const raw = columnData as ColumnItem[];

/** 公開済みの記事のみ。draft は一覧・記事ページ・サイトマップのいずれにも出さない */
export const columns = raw
  .filter((item) => !item.draft)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

/** 監修待ちの初稿。公開はされないが、進捗の確認に使う */
export const columnDrafts = raw.filter((item) => item.draft);

export const columnPath = (item: Pick<ColumnItem, "slug">) =>
  `/column/${item.slug}/`;

/** カテゴリ一覧。記事URL（/column/{slug}/）と衝突しないよう category/ を挟む */
export const categoryPath = (key: ColumnCategoryKey) => `/column/category/${key}/`;

export const findColumn = (slug: string) =>
  columns.find((item) => item.slug === slug);

export const columnsByCategory = (key: ColumnCategoryKey) =>
  columns.filter((item) => item.category === key);

/** 件数つきのカテゴリ一覧。記事が0件のカテゴリも導線としては残す */
export const columnCategoriesWithCount = columnCategories.map((category) => ({
  ...category,
  count: columnsByCategory(category.key).length,
}));

/** 同じカテゴリの記事を優先し、足りなければ新しい順で補う */
export const relatedColumns = (item: ColumnItem, limit = 3) => {
  const sameCategory = columns.filter(
    (entry) => entry.slug !== item.slug && entry.category === item.category
  );
  const others = columns.filter(
    (entry) => entry.slug !== item.slug && entry.category !== item.category
  );
  return [...sameCategory, ...others].slice(0, limit);
};

/** 見出しから目次を組み立てる。h2 のみを拾う */
export const tableOfContents = (body: ColumnBlock[]) =>
  body
    .filter((block): block is { type: "h2"; text: string } => block.type === "h2")
    .map((block, index) => ({ id: `section-${index + 1}`, text: block.text }));
