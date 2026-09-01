# SMARTSTART Framer制作仕様書

## 1. 制作目的

SMARTSTARTを「人の認知・身体・行動を測定し、Human Dataとして分析・活用するHealthTech企業」として明確に伝える。閲覧者が自分に関係するサービスへ迷わず進み、導入相談・資料請求・採用問い合わせへ到達できる構造にする。

### 主な閲覧者

1. 企業の人事・健康経営・安全衛生担当者
2. 自治体、地域包括支援センター、介護事業者
3. スポーツチーム、指導者、教育・発達支援関係者
4. 大会主催者、イベント運営会社
5. システム開発の発注担当者、採用候補者

## 2. サイトマップ

| ページ | パス | 用途 |
|---|---|---|
| トップ | `/` | ブランドと全事業の入口 |
| 測定事業 | `/measurement/` | 測定サービスのハブ |
| REAXION Well | `/measurement/reaxion-well/` | 企業向け運動認知測定 |
| 転倒リスク測定 | `/measurement/fall-risk/` | 介護・自治体向け |
| Smart TIMING | `/measurement/smart-timing/` | 大会計測 |
| REAXION事業 | `/reaxion/` | REAXIONサービスのハブ |
| REAXION Pro | `/reaxion/pro/` | アスリート向け |
| REAXION Kids | `/reaxion/kids/` | 子ども向け |
| REAXION Care | `/reaxion/care/` | 高齢者・介護向け |
| 発達支援 | `/reaxion/development/` | 発達支援向け |
| Human Data | `/human-data/` | データ・研究連携 |
| システム開発・保守 | `/system/` | 開発サービスのハブ |
| システム開発 | `/system/development/` | 受託開発 |
| システム保守 | `/system/maintenance/` | 運用・保守 |
| Smart SES | `/system/ses/` | SESサービス |
| イベント支援 | `/event/` | イベントサービスのハブ |
| 企画・運営 | `/event/produce/` | イベント制作 |
| 大会運営コンサル | `/event/consulting/` | 大会支援 |
| 導入実績 | `/case-studies/` | 事例一覧・詳細 |
| 私たちについて | `/about/` | Mission / Vision / Value |
| 会社概要 | `/about/company/` | 会社情報・沿革・アクセス |
| 新着情報 | `/news/` | News一覧・詳細 |
| 採用情報 | `/recruit/` | 採用メッセージ・募集職種 |
| お問い合わせ | `/contact/` | 連絡先・相談導線 |
| ポリシー | `/privacy-policy/` | 各種方針 |

## 3. デザインシステム

### Color Tokens

| Token | Value | 用途 |
|---|---|---|
| `Background` | `#F5F5F2` | ページ背景 |
| `Surface` | `#FFFFFF` | 白セクション・カード |
| `Surface Alt` | `#ECECE7` | 数字・補助セクション |
| `Ink` | `#0A0A0A` | 見出し・黒背景 |
| `Muted` | `#6B6B66` | 補足文 |
| `Border` | `#DEDEDA` | 罫線 |
| `Accent` | `#2F5CFF` | ラベル・フォーカス・波形 |
| `Accent Soft` | `rgba(47,92,255,.08)` | タグ背景 |

### Typography

- Japanese Sans：Noto Sans JP 400 / 700 / 900
- Latin Sans：Inter 400 / 600 / 700 / 900
- Mono Label：SF MonoまたはRoboto Mono
- Display H1：Desktop 112px / Tablet 72px / Mobile 52px、Line Height 1.02、Letter Spacing -5%
- Section H2：Desktop 72〜96px / Mobile 40〜52px、Line Height 1.05〜1.15
- Standard H2：Desktop 44px / Mobile 28px
- Body：15px、Line Height 1.8
- Small Body：13px、Line Height 1.8
- Eyebrow：10〜12px、Letter Spacing 14%、大文字または英日併記

### Spacing / Size

- Max Width：1200px
- Desktop Page Padding：48px
- Tablet Page Padding：32px
- Mobile Page Padding：20px
- Section Vertical Padding：Desktop 120px / Tablet 88px / Mobile 64px
- Base Gap：8 / 16 / 24 / 40 / 64 / 96px
- Button Height：46px以上
- Border Radius：8px（小）、16px（カード）、999px（ボタン・タグ）

### Motion

- Fast：180ms
- Base：320ms
- Reveal：700ms
- Easing：`cubic-bezier(.16,1,.3,1)`
- Reveal：Opacity 0→1、Y 22→0
- Hover Lift：Button -3px、Card -6px
- Pressed：Scale 0.98
- Reduced Motion：すべての自動アニメーションを停止

## 4. Framer Components

### `Global/Header`

- Properties：Theme（Light / Dark）、Current Page、Menu Open
- Desktop：Logo / Main Nav / Contact Button / Menu
- Mobile：Logo / Menuのみ
- Sticky、Backdrop Blur 18px
- 下辺にScroll Progress 2px

### `Global/Fullscreen Menu`

- Black background、100vw × 100dvh
- 9個の主要リンクを罫線で区切る
- Open / Closed Variant
- EscでClose、メニュー内にフォーカスを保持

### `UI/Button`

- Variant：Primary / Outline / On Dark
- State：Default / Hover / Pressed / Disabled
- Height 46px、Horizontal Padding 26px

### `UI/Section Heading`

- Eyebrow、Heading、Description、Optional CTA
- Alignment：Left / Split

### `Card/Service Row`

- Number、English Label、Title、Description、Arrow
- Light / Dark Variant
- Desktopは横一列、Mobileは説明文を省略可能

### `Card/News`

- Image、Category、Date、Title、Link
- Image Aspect Ratio 3:2、Radius 12px
- CMS接続

### `Data/Stat Row`

- Label、English Label、Number、Suffix
- NumberはTabular Numbers
- Viewport表示時にCount Up。Reduced Motion時は即時表示

### `Global/Footer`

- Brand、Message、4列リンク、Copyright
- Mobileは1〜2列

## 5. トップページ構成

### 5.1 Hero

- Height：Desktop 78vh（最大860px、最小560px） / Mobile 72svh（最小520px）
- Background：`athlete.jpg`、Cover、Position 50% 42%
- Overlay：左 `rgba(0,0,0,.76)` → 右 `rgba(0,0,0,.06)`
- Copy位置：Desktop 左8vw・下9vw、Mobile 左24px・下44px
- Copy：
  - HUMAN DATA & HEALTHTECH
  - 人を測る。未来を変える。
  - 認知・身体・行動をデータに変え、人の可能性をひらく。
- 右下に `SS / 001`

### 5.2 Visual Strips

- Height：Desktop 150px / Mobile 105px
- 3 rows、Gap 8px、Black background
- `kids.jpg` / `office.jpg` / `senior.jpg`

### 5.3 Mission

- White background、2 columns（0.65fr / 1.35fr）
- 左：SMARTSTART / Human Data Company
- 右：Our Mission、見出し、説明、2 CTA
- Tablet以下は1 column

### 5.4 Keyword Navigation

- 4 columns、各リンクに右罫線
- Health × / Safety × / Performance × / Growth ↗
- Mobile 2 columns × 2 rows

### 5.5 Human Data Feature

- Height：Desktop 112vh（最大1080px） / Mobile 92svh
- `athlete.jpg`を低彩度・高コントラスト・暗めで使用
- 左から黒いOverlay
- 青い細線のデータ波形をFramerのCanvas/Code Componentまたは軽量な線素材で重ねる
- Copy：人の状態を、ひとつの数字で終わらせない。

### 5.6 Process

- White background、左0.7fr / 右1.3fr
- 左見出しはDesktopのみSticky（Top 120px）
- 右：Measure / Analyze / Improveの3行

### 5.7 Business

- `#050505` background
- 左：見出しと説明、Desktop Sticky
- 右：5つのService Row
- 罫線 `#393939`

### 5.8 Numbers

- Alternate Surface background
- 左見出し、右に3つのStat Row
- 数字：Desktop最大176px、Mobile 88px前後
- 2行目を18%右へずらし、編集的なリズムをつくる

### 5.9 News

- Desktop 3 columns、Tablet 2、Mobile 1
- CMSの最新3件を表示
- 「一覧を見る」でNews一覧へ

### 5.10 Recruit CTA / Footer

- Black background
- CTAは採用情報とお問い合わせ
- FooterはBusiness / Company / Contact / Online Store

## 6. 下層ページテンプレート

### Hub Page

対象：Measurement、REAXION、System、Event

1. Dark Hero（Eyebrow / H1 / Description / Breadcrumb）
2. Overview
3. Service Card Grid
4. Consultation CTA

### Detail Page

1. Dark Hero＋Breadcrumb
2. About this Service
3. Target Tag
4. Feature List
5. Contact CTA

### Corporate Page

- About：Mission / Vision / Values / Core Model
- Company：Overview Table / History / Certifications / Access
- Recruit：Message / Open Positions / Contact
- Contact：Tel / Email / Address / Inquiry Category / CTA

## 7. CMS Collections

### `News`

| Field | Type |
|---|---|
| Title | Plain Text |
| Slug | Slug |
| Published Date | Date |
| Category | Option |
| Summary | Plain Text |
| Cover Image | Image |
| Body | Rich Text |
| SEO Title | Plain Text |
| SEO Description | Plain Text |

### `Case Studies`

| Field | Type |
|---|---|
| Client / Project | Plain Text |
| Slug | Slug |
| Field | Option |
| Start Date | Date |
| Summary | Plain Text |
| Challenge | Rich Text |
| Solution | Rich Text |
| Result | Rich Text |
| Quote | Plain Text |
| Cover Image | Image |

## 8. SEO / Accessibility

- Site title：`人を測る。データでわかる。未来を変える。 | SMARTSTART`
- Description：`SMARTSTARTは、人の認知・身体・行動を測定・分析し、健康・安全・成長・パフォーマンスの向上につなげるHuman Data & HealthTech企業です。`
- Social Image：`og.png`（1200×630）
- ページごとにTitle / Description / OGを設定
- 見出しレベルはH1→H2→H3の順序を守る
- 本文へのSkip Linkを設置
- 画像altは用途を説明する日本語
- Focus Indicator：3px Accent、Offset 4px
- 色だけに依存して状態を表現しない

## 9. Framerでの制作順序

1. Color / Text Styleを登録
2. Button、Section Heading、Service Rowを作成
3. Header / Fullscreen Menu / Footerを作成
4. Desktop版トップページを構築
5. Tablet / MobileのBreakpointを調整
6. Hub / Detailテンプレートを作成
7. News / Case Studies CMSを作成
8. SEO、Focus、Reduced Motion、リンクを確認
9. PreviewでDesktop / Tablet / Mobileを確認
10. Publish前に下記チェックリストを実施

## 10. 公開前チェックリスト

- [ ] 全ページに一意のH1がある
- [ ] Header / Footer / CTAのリンク先が正しい
- [ ] 375px幅で横スクロールが発生しない
- [ ] タップ領域が44px以上ある
- [ ] キーボードだけでメニュー操作とページ移動ができる
- [ ] Escでメニューを閉じられる
- [ ] Focusが見える
- [ ] Reduced Motionで大きな動きが止まる
- [ ] 画像にaltがある
- [ ] News / Case StudiesのCMS詳細ページが生成される
- [ ] Title / Description / OG Imageが設定されている
- [ ] お問い合わせの電話・メールリンクが動作する

