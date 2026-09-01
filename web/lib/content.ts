/**
 * SMARTSTART — サイトコンテンツ定義
 * 出典: SMARTSTART_CONTENT_SPEC.md
 * ※ REAXIONオンラインストアのURLは公開前に確定値へ差し替えること。
 */

/** REAXIONオンラインストア（別サイト） */
export const REAXION_STORE_URL = "https://reaxion.jp/";

/** REAXIONデータを活用するクラウドサービス（別サイト） */
export const REAXION_CLOUD_URL = "https://reaxioncloud.jp";

/**
 * REAXION 公式Instagram。
 * ※ スマートスタート名義の公式アカウントはないため、
 *    Organization の sameAs にはこのアカウントを登録している。
 */
export const REAXION_INSTAGRAM_URL = "https://www.instagram.com/reaxion.agility/";

/**
 * 認定・加盟団体のマーク（public/brand/badges/）。
 * 現行サイトのフッター掲載分をそのまま移行している。
 */
export const badges = {
  認定: [
    {
      src: "/brand/badges/privacy-mark.png",
      alt: "プライバシーマーク（登録番号 10825179）",
      width: 200,
      height: 200,
    },
    {
      src: "/brand/badges/sports-in-life.jpg",
      alt: "スポーツ庁 Sport in Life",
      width: 1024,
      height: 217,
    },
    {
      src: "/brand/badges/tokyo-sports.png",
      alt: "東京都スポーツ推進企業 2023認定",
      width: 612,
      height: 612,
    },
  ],
  加盟団体: [
    {
      src: "/brand/badges/sva.jpg",
      alt: "一般社団法人 日本スポーツビジョン協会",
      width: 280,
      height: 100,
    },
    {
      src: "/brand/badges/jati.gif",
      alt: "日本トレーニング指導者協会（JATI）",
      width: 135,
      height: 45,
    },
    {
      src: "/brand/badges/sports-industry.png",
      alt: "スポーツ産業推進協議会",
      width: 332,
      height: 100,
    },
  ],
} as const;

/** REAXION CLOUD の主な機能（reaxioncloud.jp の掲載内容に準拠） */
export const reaxionCloudFeatures = [
  "マイページ",
  "ランキング",
  "イベント機能",
  "トレーニング",
  "スキルチェック",
  "企業・教室管理",
  "LIFE連携による加算取得",
];

export const brand = {
  name: "株式会社スマートスタート",
  nameEn: "SMARTSTART, Inc.",
  category: "HUMAN DATA & HEALTHTECH",
  message: "人を測る。未来を変える。",
  concept: "見えなかった「人」を、データにする。",
  sub: "認知・身体・行動をデータに変え、人の可能性をひらく。",
  tel: "03-3556-9988",
  fax: "03-5357-1475",
  email: "info@smasta.co.jp",
  // 出典: https://smasta.co.jp/about/（公式サイトの会社概要表）
  zip: "〒102-0072",
  address: "東京都千代田区飯田橋1-5-6 協和西ビル2階",
};

import newsData from "./news.json";

/**
 * 写真素材（public/images/）
 * ※ すべて差し替え可能なプレースホルダー。実写素材が用意でき次第、
 *    同じキーのままファイルを差し替えれば全画面に反映される。
 */
export const photos = {
  athlete: {
    src: "/images/athlete.jpg",
    alt: "スターティングブロックから走り出す陸上競技の選手",
  },
  marathon: {
    src: "/images/marathon.jpg",
    alt: "ロードレースで集団になって走るランナーたちの脚",
  },
  senior: {
    src: "/images/senior.jpg",
    alt: "公園で体操をする高齢者のグループ",
  },
  kids: { src: "/images/kids.jpg", alt: "芝生の広場を走る子ども" },
  development: {
    src: "/images/development.jpg",
    alt: "ブランコに乗ってこちらを見る子ども",
  },
  office: {
    src: "/images/office.jpg",
    alt: "オフィスのデスクで両手を挙げて喜ぶ会社員",
  },
} as const;

export type PhotoKey = keyof typeof photos;

/** マーキー用ワード（✕区切りで無限スクロール） */
export const marqueeWords = [
  "Cognition",
  "Body",
  "Behavior",
  "Sports",
  "Care",
  "Education",
  "Technology",
];

export type NavItem = {
  label: string;
  en: string;
  href: string;
  path: string;
};

export const navItems: NavItem[] = [
  { label: "測定事業", en: "MEASUREMENT", href: "#business", path: "/measurement/" },
  { label: "REAXION事業", en: "REAXION", href: "#business", path: "/reaxion/" },
  { label: "Human Data", en: "HUMAN DATA", href: "#human-data", path: "/human-data/" },
  { label: "システム開発・保守", en: "SYSTEM", href: "#business", path: "/system/" },
  { label: "イベント支援・コンサル", en: "EVENT", href: "#business", path: "/event/" },
  { label: "導入実績・事例", en: "CASE STUDIES", href: "#proof", path: "/case-studies/" },
  { label: "私たちについて", en: "ABOUT", href: "#mission", path: "/about/" },
  { label: "新着情報", en: "NEWS", href: "#news", path: "/news/" },
  { label: "採用情報", en: "RECRUIT", href: "#recruit", path: "/recruit/" },
  { label: "お問い合わせ", en: "CONTACT", href: "#contact", path: "/contact/" },
];

/** 6.2 対象者別の入口 */
export const audiences = [
  {
    id: "enterprise",
    href: "/measurement/reaxion-well/",
    photo: "office" as PhotoKey,
    label: "大手企業",
    en: "FOR ENTERPRISE",
    role: "人事 / 健康経営 / 安全衛生",
    lead: "REAXION Well、健康経営、安全衛生",
    detail: "従業員の認知と身体の状態を測り、健康経営と労働安全のリスクを可視化する。",
  },
  {
    id: "public",
    href: "/measurement/fall-risk/",
    photo: "senior" as PhotoKey,
    label: "自治体・介護",
    en: "FOR PUBLIC & CARE",
    role: "自治体 / 地域包括 / 介護事業者",
    lead: "転倒リスク測定、REAXION Care",
    detail: "転倒リスクを数値で把握し、介護予防と地域の健康施策につなげる。",
  },
  {
    id: "sports",
    href: "/reaxion/pro/",
    photo: "athlete" as PhotoKey,
    label: "スポーツチーム",
    en: "FOR SPORTS",
    role: "チーム / 指導者 / アスリート",
    lead: "REAXION Pro、測定・トレーニング",
    detail: "反応・判断・動作を測定し、競技パフォーマンスの向上に接続する。",
  },
  {
    id: "kids",
    href: "/reaxion/kids/",
    photo: "kids" as PhotoKey,
    label: "子ども・教育",
    en: "FOR EDUCATION",
    role: "学校 / スクール / 発達支援",
    lead: "REAXION Kids、発達支援",
    detail: "成長段階の認知と運動の関係を測り、指導と支援の根拠をつくる。",
  },
  {
    id: "event",
    href: "/measurement/smart-timing/",
    photo: "marathon" as PhotoKey,
    label: "大会主催者",
    en: "FOR ORGANIZERS",
    role: "大会 / 自治体 / 競技団体",
    lead: "Smart TIMING、イベント支援",
    detail: "計測から運営、事務局代行まで。大会の体験そのものを設計する。",
  },
];

/** 6.5 コアモデル */
export const coreModel = [
  {
    step: "01",
    en: "MEASURE",
    ja: "測る",
    items: ["認知機能、身体機能", "反応速度、判断、記憶", "動作、転倒リスク"],
  },
  {
    step: "02",
    en: "ANALYZE",
    ja: "分析する",
    items: ["クラウド、統計、AI", "個人分析、集団分析", "経時変化"],
  },
  {
    step: "03",
    en: "IMPROVE",
    ja: "高める",
    items: ["トレーニング、運動", "行動変容", "継続測定"],
  },
];

/** 6.6 事業紹介 + 7.3 各サービスの対象者 */
export type Business = {
  id: string;
  label: string;
  en: string;
  mark: string;
  photo: PhotoKey;
  path: string;
  message: string;
  overview: string;
  services: { name: string; target: string; path: string }[];
};

export const businesses: Business[] = [
  {
    id: "measurement",
    label: "測定事業",
    en: "MEASUREMENT",
    mark: "MEASURE",
    photo: "senior",
    path: "/measurement/",
    message:
      "反応年齢・転倒リスク・大会記録——独自の計測技術で「わかる」を届ける。",
    overview:
      "認知と身体の状態、そして競技の記録。目的に合わせた測定手法で、これまで感覚に頼っていた領域を数値として扱えるようにします。",
    services: [
      {
        name: "REAXION Well",
        target: "企業の人事、健康経営、安全衛生、産業保健担当者",
        path: "/measurement/reaxion-well/",
      },
      {
        name: "転倒リスク測定",
        target: "自治体、地域包括支援センター、介護事業者",
        path: "/measurement/fall-risk/",
      },
      {
        name: "Smart TIMING",
        target: "大会主催者、自治体、スポーツ協会",
        path: "/measurement/smart-timing/",
      },
    ],
  },
  {
    id: "reaxion",
    label: "REAXION事業",
    en: "REAXION",
    mark: "REAXION",
    photo: "athlete",
    path: "/reaxion/",
    message:
      "見る・認知する・判断する・動く。反応する力を測り、鍛えるトレーニングシステム。",
    overview:
      "測定して終わりにしません。対象や目的ごとに設計されたプログラムで、測った力をそのまま伸ばすところまでを一つのシステムにしています。",
    services: [
      {
        name: "REAXION Pro",
        target: "スポーツチーム、アスリート、指導者",
        path: "/reaxion/pro/",
      },
      {
        name: "REAXION Kids",
        target: "学校、スクール、子どもの運動指導者",
        path: "/reaxion/kids/",
      },
      {
        name: "REAXION Care",
        target: "介護施設、高齢者施設、自治体",
        path: "/reaxion/care/",
      },
      {
        name: "発達支援",
        target: "発達支援施設、教育機関、保護者",
        path: "/reaxion/development/",
      },
    ],
  },
  {
    id: "human-data",
    label: "Human Data",
    en: "HUMAN DATA",
    mark: "H. DATA",
    photo: "development",
    path: "/human-data/",
    message: "測定から生まれるデータを蓄積・分析し、次の価値へつなげる。",
    overview:
      "個人の記録を集団の知見へ。研究機関や大学との連携を通じて、測定データを社会で使える形に翻訳していきます。",
    services: [
      {
        name: "データ活用・研究連携",
        target: "研究機関、大学、共同研究先",
        path: "/human-data/",
      },
    ],
  },
  {
    id: "system",
    label: "システム開発・保守",
    en: "SYSTEM",
    mark: "SYSTEM",
    photo: "office",
    path: "/system/",
    message: "測定事業・REAXION事業を支える開発力を、対外的にも提供する。",
    overview:
      "自社プロダクトを動かし続けてきた開発・運用の体制を、そのまま受託開発・保守・エンジニアリング支援としてご利用いただけます。",
    services: [
      { name: "システム開発", target: "システム開発の発注担当者", path: "/system/development/" },
      { name: "システム保守", target: "既存システムの運用担当者", path: "/system/maintenance/" },
      { name: "Smart SES", target: "エンジニアリソースを必要とする企業", path: "/system/ses/" },
    ],
  },
  {
    id: "event",
    label: "イベント支援・コンサル",
    en: "EVENT",
    mark: "EVENT",
    photo: "marathon",
    path: "/event/",
    message: "企画から運営、事務局代行まで。計測技術を現場で実証する。",
    overview:
      "10年以上にわたる大会計測・運営の現場経験をもとに、企画から当日運営、事務局業務までを一貫して支援します。",
    services: [
      { name: "イベント企画・運営", target: "大会、施設、イベントの主催者", path: "/event/produce/" },
      { name: "大会運営コンサル", target: "大会主催者、自治体、スポーツ協会", path: "/event/consulting/" },
    ],
  },
];

/** 6.7 実績情報 */
export const metrics = [
  { value: "2013", unit: "年", label: "設立", en: "FOUNDED" },
  { value: "10", unit: "年以上", label: "大会計測・運営実績", en: "EXPERIENCE" },
  { value: "5", unit: "領域", label: "事業ドメイン", en: "DOMAINS" },
];

/** 9. Values */
export const values = [
  { en: "MEASURE", ja: "測る" },
  { en: "UNDERSTAND", ja: "わかる" },
  { en: "IMPROVE", ja: "高める" },
  { en: "BUILD", ja: "つくる" },
  { en: "CONNECT", ja: "社会につなぐ" },
];

/**
 * 新着情報
 * 旧サイト（https://smasta.co.jp/newsandrelease/）の全18件を移行したもの。
 * データは lib/news.json。CMS接続時はこのファイルを差し替える。
 * legacySlug には旧サイトのスラッグを残してあり、301リダイレクトの設計に使える。
 */
/** 記事本文のブロック */
export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "dl"; items: [string, string][] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "link"; label: string; href: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "note"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export type NewsItem = {
  slug: string;
  legacySlug: string;
  date: string;
  dateTime: string;
  category: string;
  photo: PhotoKey;
  /** 記事固有のカバー画像（指定時は photo より優先） */
  cover?: { src: string; alt: string };
  title: string;
  /** SERPで切れないよう短くした検索結果用タイトル（任意） */
  seoTitle?: string;
  /** 本文の内容から関連づけた事業・サービスのパス（例: "reaxion/care"） */
  relatedServices?: string[];
  /** プレスリリースのサブタイトル（任意） */
  subtitles?: string[];
  summary: string;
  body: NewsBlock[];
  sourceUrl: string;
  /** 配信媒体と配信日時（任意） */
  release?: { outlet: string; publishedAt: string };
  path: string;
};

export const news = (newsData as NewsItem[])
  .slice()
  .sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1));

/** トップページに載せる最新3件 */
export const latestNews = news.slice(0, 3);

/**
 * 新着情報のカテゴリ。
 * 記事が存在するカテゴリのみアーカイブページを生成する。
 */
const CATEGORY_SLUG: Record<string, string> = {
  "測定事業": "measurement",
  "REAXION": "reaxion",
  "Human Data": "human-data",
  "システム開発": "system",
  "イベント": "event",
  "会社情報": "company",
  "お知らせ": "info",
};

export const newsCategories = Object.entries(CATEGORY_SLUG)
  .map(([label, slug]) => ({
    label,
    slug,
    count: news.filter((item) => item.category === label).length,
  }))
  .filter((category) => category.count > 0);

export const newsByCategory = (slug: string) => {
  const category = newsCategories.find((item) => item.slug === slug);
  if (!category) return null;
  return {
    ...category,
    items: news.filter((item) => item.category === category.label),
  };
};

/** 13. お問い合わせ種別 */
export const contactTypes = [
  "サービスについて",
  "REAXION導入相談",
  "Human Data・研究連携",
  "システム開発・SES",
  "イベント・大会運営",
  "取材の申し込み",
  "講演依頼",
  "採用について",
  "その他",
];
