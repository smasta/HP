# SMARTSTART Landing Page

`SMARTSTART_CONTENT_SPEC.md` のコンテンツ要件をもとにした、Next.js (App Router) + Tailwind CSS v4 のランディングページ。

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

## デザインの方向性

高コントラストの**ブロック交互構成**によるエディトリアルな設計。ページ全体が Ink（濃紺）と Paper（オフホワイト）のブロックを交互に積み重ねる構造になっている。

| 項目 | 値 |
|---|---|
| Base (60%) | Ink `#0F172A` — Hero / Statement / Data / Recruit / Footer |
| Support (30%) | Paper `#F3F3F0`・White `#FFFFFF`・罫線とグレー |
| Accent (10%) | `#818CF8` Indigo → `#34D399` Emerald（罫線、マーク、CTA、ホバー） |
| 英字ディスプレイ | Poppins（Bold / ExtraBold Italic） |
| 和文見出し | Zen Kaku Gothic New |
| 本文 | Inter + Noto Sans JP |
| 数字 | Oswald（`.num` / `.stat-num`） |
| 引用 | Playfair Display Italic（`.editorial`） |

### セクション構成

| # | セクション | 面 | 内容 |
|---|---|---|---|
| 1 | Hero | Ink | 2×2 フルブリードの測定モチーフグリッド＋中央の白抜き見出し |
| 2 | Marquee | White | ブランドステートメント＋`✕` 区切りの無限スクロール |
| 3 | For You | Paper | 対象者別の入口（5枠） |
| 4 | Statement | Ink | Mission本文＋巨大英字2行＋Mission/Vision＋Values |
| 5 | Business | White | 5事業の行リスト（マーク／`❯`見出し／サービスタグ／黒ピルCTA） |
| 6 | Data | Ink | コアモデルの番号リスト＋Human Data の24か月推移パネル |
| 7 | Project | Paper | 極大数字の実績（スクロール到達で発色） |
| 8 | Topics | White | NEWSタグ＋`2026.8.20 UP` のカードグリッド |
| 9 | Recruit | Ink | 採用ステートメント |
| 10 | Contact | Paper | 問い合わせ導線＋フォーム |
| 11 | Store | Ink | REAXIONオンラインストアへの導線＋REAXION CLOUD バナー |
| 12 | Footer | Ink Deep | 巨大ステートメント＋サイトマップ |

### 写真素材

`public/images/` に配置。`lib/content.ts` の `photos` で一元管理し、各セクションはキー参照で使う。ファイルを差し替えれば全画面に反映される。

| キー | 使用箇所 |
|---|---|
| `athlete` | Hero（スポーツ）／Statement 背景／Store |
| `marathon` | Hero（大会主催者）／Business: イベント支援 |
| `senior` | Hero（自治体・介護）／Business: 測定事業／Topics |
| `kids` | Hero（子ども・教育）／Topics |
| `development` | Business: Human Data |
| `office` | Hero（大手企業）／Business: システム開発／Topics |

### 実装している表現

- **ヒーロースライドショー** — `components/HeroSlider.tsx`。対象者別の5セグメントを実写で6秒ごとに切り替え。クロスフェード1.4秒＋Ken Burnsのゆっくりしたズーム、インジケーターは残り時間が伸びるプログレスバー（クリックで任意のスライドへ）。`prefers-reduced-motion` では自動送りとズームを停止
- **写真のホバー演出** — For You / Business / Topics / Store のカードは 0.9〜1.2秒かけて緩やかに拡大
- **無限マーキー** — `.marquee` / `.marquee__track`（ホバーで一時停止）
- **行マスクの見出し** — `.line-mask`。行ごとに下から立ち上がる
- **極大数字** — `.stat-num`。到達前はゴースト、到達で本来の色へ
- **Glassmorphism** — Human Data パネルなど、Ink面の上でのみ使用
- **Aurora / Grain** — Ink面の背景に有機的な光とフィルムグレインを薄く重ねる
- **スクロール演出** — `data-reveal` + IntersectionObserver（`components/ScrollReveal.tsx`）、`--reveal-delay` でスタッガー
- **ボタン** — `hover:scale-105` / `active:scale-95`、トランジション 0.3s
- `prefers-reduced-motion: reduce` で全アニメーションを停止

## ページ構成（仕様書4章のサイトマップに準拠）

| パス | 内容 | 実装 |
|---|---|---|
| `/` | トップ | `app/page.tsx` |
| `/measurement/` | 測定事業（ハブ） | `app/measurement/page.tsx` |
| `/measurement/reaxion-well/` | REAXION Well | `app/measurement/[service]/` |
| `/measurement/fall-risk/` | 転倒リスク測定 | 〃 |
| `/measurement/smart-timing/` | Smart TIMING | 〃 |
| `/reaxion/` | REAXION事業（ハブ） | `app/reaxion/page.tsx` |
| `/reaxion/pro/` `/kids/` `/care/` `/development/` | 各サービス | `app/reaxion/[service]/` |
| `/human-data/` | Human Data | `app/human-data/page.tsx` |
| `/system/` | システム開発・保守（ハブ） | `app/system/page.tsx` |
| `/system/development/` `/maintenance/` `/ses/` | 各サービス | `app/system/[service]/` |
| `/event/` | イベント支援（ハブ） | `app/event/page.tsx` |
| `/event/produce/` `/consulting/` | 各サービス | `app/event/[service]/` |
| `/case-studies/` `+ /[slug]/` | 導入実績 一覧・詳細 | `app/case-studies/` |
| `/about/` | 私たちについて | `app/about/page.tsx` |
| `/about/company/` | 会社概要 | `app/about/company/page.tsx` |
| `/news/` `+ /[slug]/` | 新着情報 一覧・詳細 | `app/news/` |
| `/recruit/` | 採用情報 | `app/recruit/page.tsx` |
| `/contact/` | お問い合わせ | `app/contact/page.tsx` |
| `/privacy-policy/` | 個人情報保護方針 | `app/privacy-policy/page.tsx` |

`next.config.mjs` で `trailingSlash: true` を設定し、仕様書のパス表記に合わせている。

### 下層ページの共通部品

| ファイル | 役割 |
|---|---|
| `components/PageShell.tsx` | Header（常時ソリッド）+ main + Footer |
| `components/PageHeader.tsx` | 実写背景＋パンくず＋見出し |
| `components/Breadcrumb.tsx` | パンくず表示＋BreadcrumbList 構造化データ |
| `components/HubDetail.tsx` | 事業ハブページ（仕様書7.1の8項目） |
| `components/ServiceDetail.tsx` | サービス詳細ページ（仕様書7.2の10項目） |
| `components/CtaBand.tsx` | 各ページ末尾の相談導線（電話・メール・フォーム） |
| `lib/site.ts` | ハブ4件・サービス12件・導入事例のデータ |
| `lib/seo.ts` | ページ固有 Title / Description / Canonical / OGP |

## 構成

```
app/
  layout.tsx      サイト共通メタデータ / OGP / Organization 構造化データ / フォント読込
  page.tsx        トップページ
  globals.css     デザイントークンと共通エフェクト
  not-found.tsx   404
components/       セクション単位のコンポーネント
lib/content.ts    ブランド・写真・ナビ・新着情報の定義
lib/site.ts       下層ページのコンテンツ定義
lib/seo.ts        メタデータ生成
```

### 外部サービスへのリンク

| 名称 | 定数 | URL |
|---|---|---|
| REAXIONオンラインストア | `REAXION_STORE_URL` | https://reaxion.jp/ |
| REAXION CLOUD | `REAXION_CLOUD_URL` | https://reaxioncloud.jp |

REAXION CLOUD のバナー（`components/CloudBanner.tsx`）は、別サービスであることが伝わるよう同サイトのブランドカラー `#FF6F61`（`--color-coral`）を差し色に使用。掲載している機能名とリード文は reaxioncloud.jp の掲載内容に準拠し、料金・プランは記載していない。フッターにも同じ外部リンクを設置。

## お問い合わせフォームの送信

`app/actions/contact.ts`（Server Action）で受け取り、SMTPでメール送信する。

| 環境変数 | 内容 | 未設定時 |
|---|---|---|
| `CONTACT_TO_EMAIL` | 受信先 | `oxy@smasta.co.jp` |
| `CONTACT_FROM_EMAIL` | 差出人 | `no-reply@smasta.co.jp` |
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASSWORD` | 送信サーバー | **送信されない** |

`.env.example` をコピーして `.env.local` を作り、値を入れる。

**SMTPの3項目（HOST / USER / PASSWORD）が未設定のうちは、フォームは送信されない。**
その場合は利用者に電話・メールでの連絡を案内するエラーを表示し、入力内容はサーバーログに残す（問い合わせを取りこぼさないため）。

実装している内容：

- サーバー側でも入力検証（クライアントの検証は迂回できるため）
- 受信メールの `Reply-To` に送信者を設定（そのまま返信できる）
- 送信者への自動返信（失敗しても受付自体は成功として扱う）
- 隠しフィールド（honeypot）によるボット送信の破棄
- 送信中はボタンを無効化し「送信しています…」を表示

## SEO

| 項目 | 実装 |
|---|---|
| Title / Description | 全31ページに固有の値。重複なし（`lib/seo.ts` の `buildMetadata`） |
| Canonical | 全ページに絶対URLで出力（末尾スラッシュ付き） |
| OGP / X カード | og:type・og:url・og:image（`/og.jpg` 1200×630・173KB）・twitter:card を全ページに出力。ニュース詳細は `article` + `publishedTime`。画像パスは `lib/seo.ts` の `OG_IMAGE` で一元管理 |
| robots | 全ページ index/follow、`max-image-preview:large`。404のみ noindex |
| `sitemap.xml` | `app/sitemap.ts` で62URLを自動生成。優先度・更新頻度つき |
| `robots.txt` | `app/robots.ts`。sitemap と host を明示 |
| 構造化データ | Organization / WebSite（全ページ）、BreadcrumbList（全下層）、Service（サービス詳細12件）、NewsArticle（記事23件・カバー画像つき）、CollectionPage + ItemList（新着一覧・カテゴリ6ページ）、LocalBusiness（会社概要・緯度経度つき） |
| 記事のOGP | 記事ごとのカバー画像を og:image に出力（共通画像ではない） |
| 記事のタイトル | 長いプレスリリース見出しは `seoTitle` で32字以内に短縮（15件） |
| 内部リンク | 記事本文末尾に「関連サービス」を設置し、15記事からサービス詳細へ導線 |
| カテゴリ | `/news/category/{reaxion,measurement,company,event,info}/` の5アーカイブページ |
| 見出し | 各ページ h1 は1つ。セクションは h2、カードは h3 |
| 画像 | すべて `next/image`。装飾画像は `alt=""`、内容のある画像は説明的な alt |
| 内部リンク | ハブ⇄サービス⇄関連サービス、フッター・全画面メニューから全主要ページへ到達可能 |

### ポリシー類

現行サイトの掲載本文を `lib/policies.json` へ移行し、7文書を個別ページとして公開している。

| パス | 文書 |
|---|---|
| `/privacy-policy/` | 個人情報保護方針（＋関連文書への index） |
| `/privacy-policy/purpose/` | 個人情報の利用目的 |
| `/privacy-policy/retained-data/` | 当社の保有個人データについて |
| `/privacy-policy/human-rights/` | 人権方針 |
| `/privacy-policy/anti-social/` | 暴力団等反社会的勢力排除宣言 |
| `/privacy-policy/social-media/` | ソーシャルメディアガイドライン |
| `/privacy-policy/cookie/` | Cookieポリシー |

### 導入実績

`lib/site.ts` の `caseStudies`。当社が公表したプレスリリースに記載された事実のみで構成し、各事例に根拠となる新着情報ページへの `source` リンクを持たせている。

### 認定・加盟団体のマーク

`public/brand/badges/` に配置し、`lib/content.ts` の `badges` で管理。フッターに「認定」「加盟団体」の2グループで表示。

### 旧サイトからのリダイレクト

`redirects.mjs` に定義し、`next.config.mjs` から読み込んでいる（計76ルール）。

| 対象 | 件数 | 例 |
|---|---|---|
| 旧固定ページ | 28本 | `/システム開発事業/` → `/system/development/` |
| 旧記事（日付入りURL） | 18本 | `/2025/08/27/reaxionwellpr/` → `/news/reaxionwellpr/` |
| 日付アーカイブ | 3パターン | `/2025/08/` → `/news/` |

- 記事の対応表は `lib/news.json` の `legacySlug` / `sourceUrl` から自動生成するため、記事を追加・変更しても定義がずれない
- 日本語パスは素の形と percent-encoded の両方を登録済み
- `/about/` `/contact/` `/recruit/` `/privacy-policy/` は新旧で同じパスのためリダイレクト不要
- Next.js の `permanent: true` は **308** を返す（Google は301と同等に扱う）。301にしたい場合は `permanent` を `statusCode: 301` に置き換える
- **※ 印のルールは要見直し**：新サイトに該当事業がないページ（LP制作・Web制作・SEO/MEO対策・インスタ運用代行・インターネットマーケティング・施設スクール運営支援）と `/services/` は、404を避けるため近いページへ暫定的に寄せている

公開ドメインは `lib/seo.ts` の `SITE_URL` 一箇所で管理している。移設時はここだけ変更すればサイトマップ・canonical・構造化データすべてに反映される。

## 公開前に差し替える項目

**ページ上に「確認中」「掲載準備中」と表示している箇所**

- `/about/company/` — 決算月、資本金、代表者・役員、支店所在地、認定・加盟団体、事業提携、沿革
- `/recruit/` — 募集職種、業務内容、応募条件、雇用条件（**未着手**：実在しない求人は作れないため、確定した内容の提供が必要）

**その他**

- `lib/content.ts` の `news`（サンプルデータ。CMS の News コレクションに接続する）
- `components/Contact.tsx` の送信処理（現在はクライアント側バリデーションと完了表示のみ。送信先エンドポイント・担当部署は要確定）
- 実績数値・会社情報・法務文書（仕様書 18章）
