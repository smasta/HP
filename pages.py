# -*- coding: utf-8 -*-
"""Page content for the SMARTSTART renewal site. Called from build.py."""

def sec(cls, inner, id_attr=""):
    idh = f' id="{id_attr}"' if id_attr else ""
    return f'<section class="band {cls}"{idh}><div class="container">{inner}</div></section>'

def build_all(write, page, hero_dark, breadcrumb, biz_grid, core_model_flow, stat_strip, cta_band, sub_grid, pin_story, marquee, photo_grid):

    # ============================================================ TOP =====
    top_hero = hero_dark(
        eyebrow="HUMAN DATA &amp; HEALTHTECH",
        title_html="人を測る。<br>データでわかる。<br>未来を変える。",
        sub="認知・身体・行動を測り、データから次の一歩をつくる。SMARTSTARTは、人の可能性をひらくHuman Data & HealthTech企業です。",
        ctas=[("サービスを探す", "#business", ""), ("導入について相談する", "/contact/", "outline on-dark")],
        lg=True, scroll_cue="SCROLL",
        photos=["/assets/img/kids.jpg", "/assets/img/athlete.jpg", "/assets/img/senior.jpg", "/assets/img/office.jpg"],
    )

    top_audience = """
    <nav class="audience-nav" aria-label="目的から探す">
      <a href="/measurement/reaxion-well/"><small>FOR BUSINESS</small><b>働く人の健康と安全 <span>→</span></b></a>
      <a href="/measurement/fall-risk/"><small>FOR CARE</small><b>高齢者の自立支援 <span>→</span></b></a>
      <a href="/reaxion/pro/"><small>FOR SPORTS</small><b>競技力の向上 <span>→</span></b></a>
      <a href="/reaxion/kids/"><small>FOR KIDS</small><b>子どもの成長 <span>→</span></b></a>
    </nav>
    """

    top_concept = sec("band-surface band-border-t", f"""
      <div class="section-head">
        <p class="eyebrow">Brand Concept</p>
        <h2 class="h-lg">見えなかった「人」を、データにする。</h2>
        <p class="lede">認知。身体。反応。行動。人には、まだ測れていないものがあります。SMARTSTARTは、Human Dataとテクノロジーによって、人の健康、安全、成長、パフォーマンスを支えます。</p>
      </div>
      <div class="tag-row">
        <span class="tag-pill">子どもの成長</span><span class="tag-pill">アスリートのパフォーマンス</span>
        <span class="tag-pill">働く人の安全と健康</span><span class="tag-pill">高齢者の自立した生活</span>
      </div>
    """)

    top_people = sec("band-surface", f"""
      {photo_grid([
          ("/assets/img/kids.jpg", "公園で走る子ども", "子どもの成長", "Growth"),
          ("/assets/img/athlete.jpg", "スタートダッシュするアスリート", "アスリートのパフォーマンス", "Performance"),
          ("/assets/img/office.jpg", "オフィスで働く人", "働く人の安全と健康", "Safety"),
          ("/assets/img/senior.jpg", "公園で体を動かす高齢者たち", "高齢者の自立した生活", "Health"),
      ])}
    """)

    top_marquee = marquee(["HEALTH", "SAFETY", "PERFORMANCE", "GROWTH"])

    top_core = sec("band-alt band-border-t", f"""
      <div class="section-head">
        <p class="eyebrow">Core Model</p>
        <h2 class="h-lg">MEASURE &rarr; ANALYZE &rarr; IMPROVE</h2>
        <p class="lede">一度だけの測定ではなく、人の変化を継続的に捉えていく循環です。</p>
      </div>
      {core_model_flow()}
    """)

    top_business = sec("band-surface band-border-t", f"""
      <div class="section-head">
        <p class="eyebrow">Business Architecture</p>
        <h2 class="h-lg">事業を、5つの機能として。</h2>
        <p class="lede">MEASUREMENT・REAXION・HUMAN DATAがHuman Dataの循環を担い、SYSTEM DEVELOPMENTとEVENT&nbsp;&amp;&nbsp;CONSULTINGがそれを支えます。</p>
      </div>
      {biz_grid()}
    """, id_attr="business")

    top_story = pin_story([
        "見る。気づく。考える。判断する。動く。私たちの日常には、認知と身体が連動する瞬間が無数にあります。",
        "SMARTSTARTは、これまで感覚として捉えられてきた人の状態をテクノロジーによって測定し、Human&nbsp;Dataとして蓄積・分析します。そして、その結果を健康、安全、成長、スポーツパフォーマンスなど、人のより良い未来につなげていきます。",
        "MEASURE.<br>UNDERSTAND.<br>IMPROVE.",
    ])

    top_stats = sec("band-surface band-border-t", f"""
      <div class="section-head">
        <p class="eyebrow">SMARTSTART in Numbers</p>
        <h2 class="h-lg">確かな実績を、数字で。</h2>
      </div>
      {stat_strip([
          ("設立", "ESTABLISHED", "2013", ""),
          ("大会計測・運営実績", "EVENT TIMING TRACK RECORD", "10", "年+"),
          ("事業ドメイン", "BUSINESS FUNCTIONS", "5", ""),
      ])}
    """)

    top_news = sec("band-alt band-border-t", f"""
      <div class="section-head" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
        <div><p class="eyebrow">News</p><h2 class="h-lg" style="margin-bottom:0;">新着情報</h2></div>
        <a href="/news/" class="pill-btn outline">一覧を見る</a>
      </div>
      <ul class="news-list">
        <li><span class="news-date">2025.08.27</span><span class="news-tag">測定事業</span><span class="news-title">30秒で"健康経営"を動かす——企業向け『REAXION Well』提供開始</span></li>
        <li><span class="news-date">2025.04.25</span><span class="news-tag">Human Data</span><span class="news-title">DX×AIで認知症予防と介護施設の収益アップを同時に実現——「REAXION」が川崎市KIS認証を取得</span></li>
        <li><span class="news-date">2024.07.02</span><span class="news-tag">REAXION</span><span class="news-title">REAXION®がサッカークラブ「南葛SC」とパートナー契約を締結</span></li>
      </ul>
    """)

    top_cta = cta_band(
        "私たちと一緒に働きませんか？",
        "デジタルの力で社会の課題に挑戦したい、そんなあなたの参画をお待ちしております。",
        [("採用情報を見る", "/recruit/", ""), ("お問合せ", "/contact/", "outline on-dark")],
    )

    write("/", page(
        "人を測る。データでわかる。未来を変える。",
        "SMARTSTARTは、人の認知・身体・行動を測定・分析し、健康・安全・成長・パフォーマンスの向上につなげるHuman Data & HealthTech企業です。",
        top_hero + top_audience + top_concept + top_people + top_marquee + top_core + top_business + top_story + top_stats + top_news + top_cta,
    ))

    # ============================================================ ABOUT ===
    about_hero = hero_dark(
        eyebrow="About",
        title_html="人には、まだ測れていないものがある。",
        sub="速く走れる。重いものを持てる。健康診断の数値が正常である。それだけでは、人の状態をすべて理解することはできません。",
        breadcrumb_html=breadcrumb([("Home", "/"), ("私たちについて", None)]),
    )
    about_story = sec("band-surface band-border-t", """
      <div class="story">
        <p>見る。気づく。考える。判断する。動く。私たちの日常には、認知と身体が連動する瞬間が無数にあります。</p>
        <p>SMARTSTARTは、これまで感覚として捉えられてきた人の状態をテクノロジーによって測定し、Human&nbsp;Dataとして蓄積・分析します。そして、その結果を健康、安全、成長、スポーツパフォーマンスなど、人のより良い未来につなげていきます。</p>
        <p class="cycle">MEASURE. UNDERSTAND. IMPROVE.</p>
      </div>
    """)
    about_mvv = sec("band-alt band-border-t", """
      <div class="section-head"><p class="eyebrow">Mission</p><h2 class="h-lg">人の可能性を、データとテクノロジーでひらく。</h2>
      <p class="lede">人には、まだ見えていない能力や変化があります。SMARTSTARTは、人の認知・身体・行動を測定し、そのデータを理解できる情報へ変換することで、一人ひとりが自分自身をより深く知り、より良い行動を選択できる環境をつくります。</p></div>
      <div class="section-head"><p class="eyebrow">Vision</p><h2 class="h-lg">Human Dataが、健康と行動を変える社会へ。</h2>
      <p class="lede">健康診断で身体の状態を知るように、人の認知機能や身体機能、反応、行動の特徴を日常的に測る。測定・データ・AI・クラウドを組み合わせ、人の状態を継続的に理解できるHealthTechプラットフォームを目指します。</p></div>
      <div class="value-grid">
        <div class="value-cell"><span class="vn">01</span><b>MEASURE — 測る</b><span>見えなかったものを、見えるようにする。</span></div>
        <div class="value-cell"><span class="vn">02</span><b>UNDERSTAND — わかる</b><span>データを、意味のある情報へ。</span></div>
        <div class="value-cell"><span class="vn">03</span><b>IMPROVE — 高める</b><span>測定結果をトレーニングや行動へ。</span></div>
        <div class="value-cell"><span class="vn">04</span><b>BUILD — つくる</b><span>必要なテクノロジーを、自らつくる。</span></div>
        <div class="value-cell"><span class="vn">05</span><b>CONNECT — 社会につなぐ</b><span>研究や技術を、実際に使われるものへ。</span></div>
      </div>
    """)
    about_core = sec("band-surface band-border-t", f"""
      <div class="section-head"><p class="eyebrow">Core Model</p><h2 class="h-lg">MEASURE &rarr; ANALYZE &rarr; IMPROVE</h2></div>
      {core_model_flow()}
    """)
    about_cta = cta_band("会社概要はこちら", "沿革・会社情報・アクセスなど、企業としての基本情報を掲載しています。",
                          [("会社概要を見る", "/about/company/", "")])
    write("/about/", page(
        "私たちについて",
        "SMARTSTARTのミッション・ビジョン・ブランドストーリー。人を測る、データでわかる、未来を変える。",
        about_hero + about_story + about_mvv + about_core + about_cta,
    ))

    # ---- about/company ----
    company_hero = hero_dark(
        eyebrow="Company",
        title_html="会社概要",
        sub="株式会社スマートスタート（SMARTSTART Inc.）の会社情報です。",
        breadcrumb_html=breadcrumb([("Home", "/"), ("私たちについて", "/about/"), ("会社概要", None)]),
    )
    company_table = sec("band-surface band-border-t", """
      <div class="section-head"><p class="eyebrow">Overview</p><h2 class="h-lg">会社概要</h2></div>
      <table>
        <tr><th>商号</th><td>株式会社スマートスタート（SMARTSTART, Inc.）</td></tr>
        <tr><th>設立</th><td>2013年2月14日</td></tr>
        <tr><th>決算月</th><td>1月</td></tr>
        <tr><th>資本金</th><td>2,150万円</td></tr>
        <tr><th>代表者</th><td>代表取締役 奥島 康志（Yasushi Okushima）／取締役 加藤 龍一（Ryuichi Kato）</td></tr>
        <tr><th>所在地（本店）</th><td>〒102-0085 東京都千代田区六番町1-1 恩田ビル3階</td></tr>
        <tr><th>支店</th><td>〒420-0852 静岡県静岡市葵区紺屋町17-1 葵タワー2F</td></tr>
        <tr><th>連絡先</th><td>info@smasta.co.jp ／ 03-3556-9988</td></tr>
      </table>
    """)
    company_history = sec("band-alt band-border-t", """
      <div class="section-head"><p class="eyebrow">History</p><h2 class="h-lg">沿革</h2></div>
      <ul class="feature-list">
        <li>2013年2月 — 株式会社スマートスタート 設立</li>
        <li>反応・反射・敏捷性トレーニング機器「REAXION®」開発・販売開始</li>
        <li>2024年7月 — サッカークラブ「南葛SC」とパートナー契約を締結</li>
        <li>2025年3月 — 「REAXION」が川崎市の介護・福祉機器認証制度「KIS認証」を取得</li>
        <li>2025年8月 — 企業向け運動認知測定サービス「REAXION Well」提供開始</li>
        <li>2026年 — コーポレートサイトをHuman Data &amp; HealthTechブランドとしてリニューアル</li>
      </ul>
    """)
    company_certs = sec("band-surface band-border-t", """
      <div class="section-head"><p class="eyebrow">Certification / Membership</p><h2 class="h-lg">認定・加盟団体</h2></div>
      <div class="tag-row">
        <span class="tag-pill">Sports in Life</span>
        <span class="tag-pill">東京都スポーツ推進企業</span>
        <span class="tag-pill">日本スポーツビジョン協会</span>
        <span class="tag-pill">日本トレーニング指導者協会</span>
        <span class="tag-pill">スポーツ産業推進協議会</span>
      </div>
      <div class="section-head" style="margin-top:44px;"><p class="eyebrow">Partnership</p><h2 class="h-lg">事業提携</h2></div>
      <p class="lede">ベトナム・ハノイ NEWWAVE SOLUTIONS社との業務提携。</p>
    """)
    company_access = sec("band-alt band-border-t", """
      <div class="section-head"><p class="eyebrow">Access</p><h2 class="h-lg">アクセス</h2></div>
      <ul class="feature-list">
        <li>東京メトロ有楽町線「麹町」駅6番出口 徒歩2分</li>
        <li>JR東日本「市ヶ谷」駅 徒歩8分</li>
        <li>都営地下鉄新宿線「市ヶ谷」駅 徒歩10分</li>
        <li>お車の場合：靖国通りから日テレ通り 約2分（駐車場なし・近隣駐車場をご利用ください）</li>
      </ul>
    """)
    write("/about/company/", page(
        "会社概要",
        "株式会社スマートスタートの会社概要・沿革・認定団体・アクセス情報。",
        company_hero + company_table + company_history + company_certs + company_access,
    ))

    # ==================================================== BUSINESS HUBS ===
    def hub_page(slug, title, eyebrow, headline, sub, lede, subs, ctas_extra=None, photo=None, photos=None, extra_section=""):
        h = hero_dark(eyebrow=eyebrow, title_html=headline, sub=sub, photo=photo, photos=photos,
                       breadcrumb_html=breadcrumb([("Home", "/"), (title, None)]))
        body = sec("band-surface band-border-t", f"""
          <div class="section-head"><p class="eyebrow">Overview</p><p class="lede" style="font-size:15.5px;max-width:66ch;">{lede}</p></div>
          {sub_grid(subs)}
        """)
        ctas = ctas_extra or [("お問合せ", "/contact/", ""), ("私たちについて", "/about/", "outline")]
        c = cta_band(f"{title}について相談する", "導入のご検討・お見積り・資料請求など、お気軽にお問合せください。", ctas)
        write(slug, page(title, lede, h + body + extra_section + c))

    # -- measurement --
    hub_page(
        "/measurement/", "測定事業", "Measurement",
        "数字にすれば、<br>対策が動き出す。",
        "運動認知・転倒リスク・大会記録——独自の計測技術で「わかる」を届けます。",
        "人の状態を測る。測定技術とデータを活用し、健康・安全・スポーツなどさまざまな場面で人の状態を可視化します。対象は企業の健康経営担当者、自治体・介護事業者、大会主催者の3系統です。",
        [
            ("Corporate", "企業内運動認知測定サービス", "REAXION Well", "30秒で、健康経営を動かす。注意・反応・判断などの運動認知機能をその場で可視化し、活性化トレーニングまで一気通貫で提供。", "/measurement/reaxion-well/"),
            ("Municipality / Care", "転倒リスク測定サービス", "転ぶ前に、わかる。", "反応・バランス・認知機能を数値化し、個別機能訓練計画へつなげる。地域包括支援センターや介護予防事業でのスクリーニングに活用。", "/measurement/fall-risk/"),
            ("Event", "スポーツ大会計測サービス", "Smart TIMING", "マラソン・駅伝・トライアスロンの計測。10年超の自社大会運営実績を土台に、他大会の計測サポートにも対応。", "/measurement/smart-timing/"),
        ],
        photos=["/assets/img/office.jpg", "/assets/img/senior.jpg", "/assets/img/marathon.jpg"],
    )

    def detail_page(slug, hub, hub_url, title, eyebrow, headline, sub, target, body_paras, features, cta_label="資料請求・導入相談", photo=None):
        h = hero_dark(eyebrow=eyebrow, title_html=headline, sub=sub, photo=photo,
                       breadcrumb_html=breadcrumb([("Home", "/"), (hub, hub_url), (title, None)]))
        paras = "".join(f'<p class="lede" style="font-size:15px;max-width:64ch;margin-bottom:16px;">{p}</p>' for p in body_paras)
        feats = "".join(f"<li>{x}</li>" for x in features)
        body = sec("band-surface band-border-t", f"""
          <div class="section-head"><p class="eyebrow">About this service</p>{paras}</div>
          <div class="tag-row" style="margin-bottom:30px;"><span class="tag-pill">対象: {target}</span></div>
          <ul class="feature-list">{feats}</ul>
        """)
        c = cta_band(f"{title}について相談する", "詳しい資料のご請求、導入に関するご相談を承ります。", [(cta_label, "/contact/", ""), (f"{hub}トップへ", hub_url, "outline")])
        write(slug, page(title, sub, h + body + c))

    detail_page(
        "/measurement/reaxion-well/", "測定事業", "/measurement/",
        "企業内運動認知測定サービス（REAXION Well）", "Measurement / Corporate",
        "30秒で、<br>健康経営を動かす。",
        "体力測定会に運動認知測定を統合。注意・反応・判断を可視化し、その場で活性化まで行う企業向けサービスです。",
        "企業の人事・健康経営担当者、安全衛生委員会、産業保健スタッフ",
        [
            "REAXION Wellは、注意・反応・判断などの運動認知機能を30秒で可視化し、その場で活性化（アクティベーション）まで行う企業向けサービスです。体力測定会に運動認知測定を統合し、日常運用へシームレスに接続します。",
            "集中力低下やヒューマンエラーは生産性・安全・品質のボトルネックになりがちで、健康投資の成果は「体感」にとどまり経営KPIに結びつきにくいという課題があります。REAXION Wellは、計測→活性化→可視化のサイクルを「イベント型」から「運用型」へ——年1回の測定で終わらせず、毎日の「30秒チェック＋3分活性化」へ変えていきます。",
            "ダッシュボードの数値は、経営会議でそのまま使える「結論」として「REAXION Well経営レポート」に整理。健康経営・安全衛生委員会・全社会議の資料として活用いただけます。",
        ],
        [
            "30秒クイック計測——注意・反応・判断を即時スクリーニング",
            "90〜180秒アクティベーション——抑制制御・選択的注意・セットシフティングを鍛える活性化トレーニング",
            "個人・部署・拠点単位のダッシュボード化とKPI連動レポート「REAXION Well経営レポート」",
            "反応時間・選択反応・Go/No-Go・タスクスイッチなど、注意・抑制・認知的柔軟性の代表的行動指標にもとづく設計",
            "ハード＋クラウド一体型で提供（購入／レンタル、ID課金）。運用設計ワークショップ・管理者研修・効果検証テンプレートも同梱",
        ],
        photo="/assets/img/office.jpg",
    )
    detail_page(
        "/measurement/fall-risk/", "測定事業", "/measurement/",
        "転倒リスク測定サービス", "Measurement / Municipality &amp; Care",
        "転ぶ前に、<br>わかる。",
        "反応・バランス・認知機能を数値化し、転倒リスクの早期発見と個別機能訓練計画づくりにつなげます。",
        "自治体、地域包括支援センター、介護・福祉施設",
        [
            "画面や音声で提示される信号に瞬時に反応する測定を通じて、高齢者の認知機能（前頭前野の活性度）とバランス・反射神経を短時間で数値化し、転倒リスクや機能低下の兆候を把握します。",
            "測定データはクラウド「REAXIONCLOUD」でAIが分析し、利用者一人ひとりに最適化された個別機能訓練計画を自動生成。専門スタッフが不足していても短時間で計画が完成します。",
            "訓練結果はCSV形式で出力でき、厚生労働省が推進する科学的介護情報システム「LIFE」への報告にもスムーズに連携。個別機能訓練加算（Ⅰ）（Ⅱ）の取得率アップを後押しします。",
        ],
        ["ゲーム感覚で楽しみながら取り組める短時間測定", "AIによる個別機能訓練計画の自動作成（REAXIONCLOUD）", "LIFE連携用CSV出力で加算取得を支援", "川崎市の介護・福祉機器認証制度「KIS認証」取得済み（2025年3月）"],
        cta_label="自治体・施設向け問合せ",
        photo="/assets/img/senior.jpg",
    )
    detail_page(
        "/measurement/smart-timing/", "測定事業", "/measurement/",
        "スポーツ大会計測サービス（Smart TIMING）", "Measurement / Event",
        "記録も、運営も、<br>まかせられる。",
        "マラソン・駅伝・トライアスロン・オープンウォータースイミングの計測を、10年超の実績で支えます。",
        "マラソン・駅伝・トライアスロン等の大会主催者",
        [
            "Smart TIMINGは、マラソン・駅伝に加え、トライアスロンやオープンウォータースイミング大会の計測まで幅広く対応するサービスです。",
            "10年間の自社大会企画運営に加え、他社大会のコンサルティングや事務局運営代行の経験から、計測サポートも提供しています。海での大会運営まで対応可能です。",
        ],
        ["マラソン・駅伝・リレーの計測", "トライアスロン・オープンウォータースイミング対応（海浜大会含む）", "他社主催大会への計測サポート・コンサルティング", "事務局運営代行の実績"],
        cta_label="大会主催者向け問合せ",
        photo="/assets/img/marathon.jpg",
    )

    # -- reaxion --
    hub_page(
        "/reaxion/", "REAXION事業", "REAXION / Cognitive Motor Technology",
        "反応する力は、<br>鍛えられる。",
        "見る・認知する・判断する・動く。REAXION®は、こどもから高齢者まで、あらゆる世代の「反応する力」を引き出すトレーニング機器です。",
        "REAXIONは、光などの刺激に対して認知・判断し、身体を動かす一連の反応を測定・トレーニングするシステムです。単純な「反射神経」だけでなく、見る→認知する→判断する→動く、という一連の認知運動機能に着目します。",
        [
            ("Kids", "KIDS — キッズスポーツ", "遊びながら、反応神経を鍛える。", "スポーツスクール、育成年代のトレーニングプログラムへの導入。", "/reaxion/kids/"),
            ("Athlete", "PRO — トップアスリート", "0.1秒の判断が、勝敗を分ける。", "プロ・実業団・強化指定選手の反応速度／判断スピードトレーニング。", "/reaxion/pro/"),
            ("Senior Care", "CARE — 高齢福祉", "動ける身体を、これからも。", "デイサービス・介護施設でのCognitive Motor Training。", "/reaxion/care/"),
            ("Development", "DEVELOPMENT SUPPORT — 発達支援", "「できた」の一歩を、一緒に。", "児童発達支援施設・放課後等デイサービスでの活用。", "/reaxion/development/"),
        ],
        ctas_extra=[("REAXIONオンラインストア", "https://reaxion.jp", ""), ("お問合せ", "/contact/", "outline")],
        photos=["/assets/img/kids.jpg", "/assets/img/athlete.jpg", "/assets/img/senior.jpg", "/assets/img/development.jpg"],
        extra_section=sec("band-alt band-border-t", f"""
          <div class="section-head"><p class="eyebrow">Every Generation</p><h2 class="h-lg">こどもから高齢者まで。</h2></div>
          {photo_grid([
              ("/assets/img/kids.jpg", "公園で走る子ども", "KIDS", "Kids Sports"),
              ("/assets/img/athlete.jpg", "スタートダッシュするアスリート", "PRO", "Top Athlete"),
              ("/assets/img/senior.jpg", "公園で体を動かす高齢者たち", "CARE", "Senior Care"),
              ("/assets/img/development.jpg", "笑顔でブランコに乗る子ども", "DEVELOPMENT SUPPORT", "Development Support"),
          ])}
        """),
    )
    detail_page("/reaxion/kids/", "REAXION事業", "/reaxion/", "REAXION KIDS — キッズスポーツ・運動能力向上", "REAXION / Kids",
                "遊びながら、<br>反応神経を鍛える。", "見る・考える・動くを遊びの中で刺激する、キッズスポーツ向けトレーニング。",
                "スポーツスクール、育成年代の指導者",
                ["遊びの要素を取り入れながら、見る・考える・動くを同時に刺激するトレーニングを提供します。脳のゴールデンエイジと言われる3〜12歳での視覚機能トレーニングは、運動や学習のベース力を育む効果が期待できます。",
                 "関東サッカーリーグ1部所属「南葛SC」が運営するサッカースクール・ユースの子どもたちにも導入され、視覚機能が脳の前頭前野を活性化し判断力や情報処理能力の向上につながることを伝えています。"],
                ["ゲーム感覚で取り組める光刺激トレーニング", "脳のゴールデンエイジ（3〜12歳）に着目したプログラム設計", "スポーツスクールでのグループレッスンに対応", "「南葛SC」運営スクール・ユースへの導入実績"],
                photo="/assets/img/kids.jpg")
    detail_page("/reaxion/pro/", "REAXION事業", "/reaxion/", "REAXION PRO — トップアスリート・競技スポーツ", "REAXION / Pro",
                "0.1秒の判断が、<br>勝敗を分ける。", "認知・判断・身体反応を組み合わせたトレーニングで競技パフォーマンスを支援。",
                "プロ・実業団・強化指定選手、競技チーム",
                ["視覚機能と身体を連動させてトレーニングすることで、トップアスリートが練習と同じパフォーマンスを本番でも発揮できるよう支援します。認知・判断・実行に必要な脳の働きを、実戦に近い形で鍛えます。",
                 "2024年には関東サッカーリーグ1部所属のサッカークラブ「南葛SC」とパートナー契約を締結。スタジアム幟へのロゴ掲出とあわせ、年間を通じて選手のトレーニングをサポートしています。"],
                ["競技特性に合わせた反応・判断トレーニングメニュー", "個人・チーム単位でのデータ分析", "「南葛SC」とのパートナー契約実績（2024年〜）"],
                photo="/assets/img/athlete.jpg")
    detail_page("/reaxion/care/", "REAXION事業", "/reaxion/", "REAXION CARE — 高齢福祉", "REAXION / Senior Care",
                "動ける身体を、<br>これからも。", "認知機能と身体機能を同時に刺激するトレーニングを、デイサービス・介護施設向けに提供。",
                "デイサービス・介護施設、地域の運動教室",
                ["画面や音声で提示される信号に瞬時に反応するゲーム感覚のトレーニングで、脳（前頭前野）の活性化とバランス・反射神経の向上を同時に狙います。楽しみながら継続できるため、継続率アップやリハビリ効果向上が期待できます。",
                 "測定データはクラウド「REAXIONCLOUD」で一元管理。AIが個別機能訓練計画を自動作成し、LIFE報告用のCSV出力にも対応。2025年3月には川崎市の介護・福祉機器認証制度「KIS認証」を取得しました。"],
                ["認知機能×身体機能を同時に刺激するプログラム", "座位でも実施可能なメニュー設計", "REAXIONCLOUDによるAI個別機能訓練計画の自動作成", "川崎市「KIS認証」取得済み（2025年3月）"],
                photo="/assets/img/senior.jpg")
    detail_page("/reaxion/development/", "REAXION事業", "/reaxion/", "REAXION DEVELOPMENT SUPPORT — 発達支援・教育", "REAXION / Development Support",
                "「できた」の一歩を、<br>一緒に。", "光・動き・ゲーム性を活用し、楽しみながら認知と身体を使う環境を提供。",
                "児童発達支援施設、放課後等デイサービス",
                ["光・動き・ゲーム性を活用し、楽しみながら認知と身体を使う環境を提供します。", "児童発達支援施設・放課後等デイサービスでの、感覚統合・反応トレーニングとしての活用を想定しています。"],
                ["ゲーム性のある光刺激で楽しく取り組める", "感覚統合を意識したプログラム設計", "児童発達支援施設・放課後等デイサービスへの導入を想定"],
                photo="/assets/img/development.jpg")

    # -- human data (single rich page, no separate detail pages yet) --
    hd_hero = hero_dark(
        eyebrow="Human Data",
        title_html="測定から生まれるデータを、<br>次の価値へ。",
        sub="年齢による変化、個人差、認知機能と身体機能の関係、トレーニングによる変化、リスクの兆候——研究機関・大学・医療機関・企業との連携を通じ、データの価値を社会へ還元します。",
        breadcrumb_html=breadcrumb([("Home", "/"), ("Human Data", None)]),
    )
    hd_body = sec("band-surface band-border-t", """
      <div class="section-head"><p class="eyebrow">Why Human Data</p><h2 class="h-lg">製品を届けるだけでは終わらない。</h2>
      <p class="lede">SMARTSTARTが目指しているのは、製品を提供することだけではありません。測定によって得られるHuman Dataを蓄積・分析することで、人の状態をより深く理解することを目指します。</p></div>
      <div class="value-grid">
        <div class="value-cell"><span class="vn">01</span><b>年齢による変化</b><span>年代ごとの反応・認知機能の傾向を分析。</span></div>
        <div class="value-cell"><span class="vn">02</span><b>個人差</b><span>個人ごとの特徴・強みを可視化。</span></div>
        <div class="value-cell"><span class="vn">03</span><b>認知機能と身体機能の関係</b><span>両者の連動を定量的に捉える。</span></div>
        <div class="value-cell"><span class="vn">04</span><b>トレーニングによる変化</b><span>継続測定による効果の可視化。</span></div>
        <div class="value-cell"><span class="vn">05</span><b>リスクの兆候</b><span>早期発見につながるサインの検出。</span></div>
      </div>
    """)
    hd_product = sec("band-alt band-border-t", """
      <div class="section-head"><p class="eyebrow">Platform</p><h2 class="h-lg">REAXIONCLOUD</h2>
      <p class="lede">REAXIONで取得した認知機能・歩行データをクラウドで一元管理するプラットフォームです。2025年3月には川崎市の介護・福祉機器認証制度「KIS認証」を取得しました。</p></div>
      <ul class="feature-list">
        <li>AIが個別訓練計画を自動作成——利用者一人ひとりに最適化された訓練メニューを自動生成し、専門スタッフ不足を補う</li>
        <li>厚生労働省「LIFE（科学的介護情報システム）」への報告用CSV出力に対応</li>
        <li>ITリテラシーに左右されないUIで、個別機能訓練加算（Ⅰ）（Ⅱ）の取得を支援</li>
        <li>訓練の進捗・成果をリアルタイムで管理し、レポートを自動生成</li>
      </ul>
    """)
    hd_connect = sec("band-surface band-border-t", """
      <div class="section-head"><p class="eyebrow">Connect</p><h2 class="h-lg">研究や技術を、実際に使われるものへ。</h2>
      <p class="lede">研究機関・大学・医療機関・企業などとの連携を通じ、データの価値を社会へ還元していきます。Human Dataは単体で販売する「サービス」ではなく、測定事業・REAXION事業を支える差別化要因です。</p></div>
      <div class="tag-row"><span class="tag-pill">研究機関・大学との連携</span><span class="tag-pill">医療機関との連携</span><span class="tag-pill">企業との共同研究</span></div>
    """)
    hd_cta = cta_band("研究・データ連携のご相談", "共同研究、データ活用に関するご相談はお問合せフォームよりご連絡ください。",
                       [("お問合せ", "/contact/", ""), ("測定事業を見る", "/measurement/", "outline")])
    write("/human-data/", page(
        "Human Data",
        "測定から生まれるHuman Dataを蓄積・分析し、研究機関・企業との連携を通じて社会へ還元します。",
        hd_hero + hd_body + hd_product + hd_connect + hd_cta,
    ))

    # -- system --
    hub_page(
        "/system/", "システム開発・保守サービス", "System Development / Build",
        "ヘルスケアテックを、<br>動かし続ける開発力。",
        "自社の測定システム・REAXION基盤を作り、育ててきた技術力を、SaaS開発からエンジニア派遣まで幅広くご提供します。",
        "HealthTechをつくる会社だから、システムもつくれる。単なる受託開発ではなく「事業を理解し、必要なテクノロジーを形にする」ことを重視します。",
        [
            ("Development", "SmartDEVELOPMENT — 受託開発", "作りたいを、形にする技術力。", "SaaS型プロジェクト開発、AI、ブロックチェーン等のWeb3.0領域まで対応。", "/system/development/"),
            ("SES", "SmartSES — エンジニア派遣", "必要な時に、必要な技術者を。", "準委任契約によるエンジニア派遣。最短1ヶ月のスポット案件にも対応。", "/system/ses/"),
            ("Maintenance", "システム運用・保守", "止めない、任せられる運用を。", "サーバー／ネットワーク運用保守、クライアントサポート。", "/system/maintenance/"),
        ],
    )
    detail_page("/system/development/", "システム開発・保守サービス", "/system/", "SmartDEVELOPMENT — 受託開発", "System / Development",
                "作りたいを、<br>形にする技術力。", "SaaS型プロジェクト開発、AI、ブロックチェーン等のWeb3.0領域まで対応する受託開発サービス。",
                "SaaS・業務システムを必要とする企業",
                ["高い技術力により、SaaS型プロジェクト開発、AI、ブロックチェーンなどWeb3.0による開発を受託します。", "WEB生成システム・生産管理・SFA・EC・電子決済・CRMなど、幅広い開発実績があります。"],
                ["WEBシステム・業務システム・クラウドサービス開発", "アプリケーション・AIシステム開発", "データ分析基盤の構築"])
    detail_page("/system/ses/", "システム開発・保守サービス", "/system/", "SmartSES — エンジニア派遣", "System / SES",
                "必要な時に、<br>必要な技術者を。", "準委任契約によるエンジニア派遣。最短1ヶ月のスポット案件にも対応。",
                "急なエンジニア不足に対応したい企業",
                ["準委任の請負型エンジニア派遣サービスです。貴社の急な人手不足、イレギュラー対応が必要な短期的な作業にも、迅速にエンジニア・プログラマ等をご紹介します。", "最短1ヶ月のスポット案件にも対応可能です。パートナー企業様も積極的に募集しています。"],
                ["準委任契約によるエンジニア・プログラマ紹介", "最短1ヶ月のスポット案件に対応", "パートナー企業の募集も実施中"])
    detail_page("/system/maintenance/", "システム開発・保守サービス", "/system/", "システム運用・保守", "System / Maintenance",
                "止めない、<br>任せられる運用を。", "サーバー・ネットワーク運用保守から、グループウェア・DB運用保守まで。",
                "システムの安定運用を求める企業",
                ["サーバーおよびネットワークの運用保守、グループウェアおよびデータベースの運用保守、システム開発保守、クライアントサポートまでを一貫して支援します。"],
                ["サーバー・ネットワーク運用保守", "グループウェア・データベース運用保守", "クライアントサポート"])

    # -- event --
    hub_page(
        "/event/", "イベント支援・コンサルティングサービス", "Event &amp; Consulting / Experience",
        "計測技術を、<br>現場で実証する。",
        "企画から運営、事務局代行まで。10年以上の自社大会運営実績が、確かなイベント支援を支えます。",
        "テクノロジーを、体験に変える。スポーツイベント、企業イベント、健康イベント、展示会等において、企画・コンテンツ設計・システム・計測・機材・運営まで一貫して支援します。",
        [
            ("Produce", "Smart EVENT — 企画・運営", "体験を、設計する。", "スポーツ大会・体験スクールの企画運営。商業施設等での販促イベント支援も含む。", "/event/produce/"),
            ("Consulting", "大会運営コンサルティング", "運営のプロが、伴走する。", "他社主催大会への計測サポート、事務局運営代行、コンサルティング。", "/event/consulting/"),
        ],
    )
    detail_page("/event/produce/", "イベント支援・コンサルティングサービス", "/event/", "Smart EVENT — 企画・運営", "Event / Produce",
                "体験を、<br>設計する。", "各種イベント、体験スクールの制作・運営を行います。",
                "スポーツ大会・イベントの主催者、商業施設",
                ["各種イベント、体験スクールの制作や運営を行います。スポーツイベントでは、スポーツ大会の運営、タイム計測、事務局運営も対応します。", "商業施設等での販促イベントの企画運営も承ります。"],
                ["スポーツ大会・体験スクールの企画運営", "商業施設等での販促イベント支援", "ランニングスクールの運営実績"])
    detail_page("/event/consulting/", "イベント支援・コンサルティングサービス", "/event/", "大会運営コンサルティング", "Event / Consulting",
                "運営のプロが、<br>伴走する。", "他社主催大会への計測サポート、事務局運営代行、コンサルティングを提供します。",
                "大会主催者、自治体、スポーツ協会",
                ["10年間の自社大会企画運営に加え、他社大会のコンサルティングや事務局運営代行などの経験から、計測サポートも行っています。", "測定事業（Smart TIMING）と連携し、計測から運営まで一気通貫でご支援します。"],
                ["他社主催大会への計測サポート", "事務局運営代行", "大会運営に関するコンサルティング"])

    # ============================================================ CASES ===
    cases_hero = hero_dark(
        eyebrow="Case Studies",
        title_html="導入実績・事例",
        sub="健康経営、介護・福祉、スポーツ、こども発達支援、システム開発——分野を横断して導入いただいています。",
        breadcrumb_html=breadcrumb([("Home", "/"), ("導入実績・事例", None)]),
    )
    cases_body = sec("band-surface band-border-t", """
      <div class="tag-row" style="margin-bottom:36px;">
        <span class="tag-pill">健康経営</span><span class="tag-pill">介護・福祉</span><span class="tag-pill">スポーツ</span><span class="tag-pill">こども発達支援</span><span class="tag-pill">システム開発</span>
      </div>
      <div class="case-grid" style="margin-bottom:24px;">
        <div class="case-card">
          <span class="cc-field">Sports — 2024年7月〜</span>
          <h3>南葛SC（関東サッカーリーグ1部）</h3>
          <p>スタジアム幟へのREAXION®ロゴ掲出とあわせ、年間を通じて選手のトレーニングをサポート。運営するサッカースクール・ユース世代にも導入し、脳のゴールデンエイジ（3〜12歳）での視覚機能トレーニングを提供しています。</p>
        </div>
      </div>
      <div class="case-placeholder">
        健康経営・介護福祉・スポーツ・システム開発など、用途に合わせた導入方法をご案内します。詳しい実績や活用イメージは、お問合せください。
        <div class="cta-row" style="margin-top:20px;"><a class="pill-btn" href="/contact/">導入事例について相談する</a></div>
      </div>
    """)
    write("/case-studies/", page("導入実績・事例", "健康経営、介護・福祉、スポーツなど、SMARTSTARTの導入実績・活用事例。", cases_hero + cases_body))

    # ============================================================ NEWS ====
    news_hero = hero_dark(eyebrow="News", title_html="新着情報", sub="SMARTSTARTからのお知らせです。",
                           breadcrumb_html=breadcrumb([("Home", "/"), ("新着情報", None)]))
    news_body = sec("band-surface band-border-t", """
      <ul class="news-list">
        <li><span class="news-date">2025.08.27</span><span class="news-tag">測定事業</span><span class="news-title">30秒で"健康経営"を動かす——企業向け『REAXION Well』提供開始。体力測定会に運動認知測定を統合し、KPI連動の「REAXION Well経営レポート」も提供。</span></li>
        <li><span class="news-date">2025.04.25</span><span class="news-tag">Human Data</span><span class="news-title">DX×AIで認知症予防と介護施設の収益アップを同時に実現——「REAXION」が2025年3月に川崎市KIS認証を取得し全国展開へ。</span></li>
        <li><span class="news-date">2024.07.02</span><span class="news-tag">REAXION</span><span class="news-title">REAXION®がサッカークラブ「南葛SC」とパートナー契約を締結。選手・ユース世代の認知機能向上トレーニングをサポート。</span></li>
      </ul>
    """)
    write("/news/", page("新着情報", "SMARTSTARTからのお知らせ一覧。", news_hero + news_body))

    # ============================================================ RECRUIT =
    recruit_hero = hero_dark(
        eyebrow="Recruit", title_html="テクノロジーが、<br>世の中を変える。",
        sub="私たちは社会課題に対してテクノロジーで解決をし、人々の暮らしを豊かにすることを使命にしています。私たちと一緒に、あなたの技術を世の中に還元しませんか？",
        breadcrumb_html=breadcrumb([("Home", "/"), ("採用情報", None)]),
        ctas=[("お問合せ", "/contact/", "outline on-dark")],
    )
    recruit_body = sec("band-surface band-border-t", """
      <div class="section-head"><p class="eyebrow">Message</p><h2 class="h-lg">すべての人の豊かなくらしのために。</h2>
      <p class="lede">全ての人々がテクノロジーにより豊かな暮らしを享受できるために、あなたの力を私たちに貸してください。あなたもそれによって、豊かな人生を送ることができると私たちは信じています。測定・データ・テクノロジーを通じて、子どもから高齢者まで、あらゆる世代の「生きる力」を支える——SMARTSTARTは、そんな仕事に挑戦できる環境です。</p></div>
    """)
    recruit_jobs = sec("band-alt band-border-t", """
      <div class="section-head"><p class="eyebrow">Open Positions</p><h2 class="h-lg">募集職種</h2></div>
      <ul class="feature-list">
        <li><b>フィールドセールス</b>——SaaS型BtoBマーケツール。顧客のマーケティング課題を解決するフィールドセールス</li>
        <li><b>Railsエンジニア</b>——高い技術力と最新のエンジニアリング体制の中、SaaSサービスの"プロダクト創り"を一緒に開発</li>
        <li><b>フロントエンドエンジニア</b>——SaaSプロダクトや自社プロダクトの開発エンジニア（主にReact）</li>
        <li><b>インフラエンジニア</b>——SaaSプロダクトや自社プロダクトのインフラエンジニア</li>
      </ul>
      <p class="note-box">募集状況や応募方法の詳細は、お問合せ窓口からご確認ください。</p>
    """)
    write("/recruit/", page("採用情報", "SMARTSTARTの採用情報。テクノロジーが世の中を変える。", recruit_hero + recruit_body + recruit_jobs))

    # ============================================================ CONTACT =
    contact_hero = hero_dark(
        eyebrow="Contact", title_html="お問合せ",
        sub="会社・サービスに関するご相談、その他お問い合わせは、フォームに必要事項をご入力の上ご送信ください。人事・採用宛てのお問合せは採用ページよりご連絡ください。",
        breadcrumb_html=breadcrumb([("Home", "/"), ("お問合せ", None)]),
    )
    contact_body = sec("band-surface band-border-t", """
      <div class="section-head"><p class="eyebrow">Contact Info</p></div>
      <table>
        <tr><th>電話番号</th><td><a href="tel:0335569988">03-3556-9988</a></td></tr>
        <tr><th>FAX</th><td>03-5357-1475</td></tr>
        <tr><th>メール</th><td><a href="mailto:info@smasta.co.jp">info@smasta.co.jp</a></td></tr>
        <tr><th>所在地</th><td>〒102-0085 東京都千代田区六番町1-1 恩田ビル3階</td></tr>
      </table>
      <div class="section-head" style="margin-top:44px;"><p class="eyebrow">お問い合わせ種別（複数選択可）</p></div>
      <div class="tag-row">
        <span class="tag-pill">サービスについて</span><span class="tag-pill">取材の申し込み</span><span class="tag-pill">講演依頼</span><span class="tag-pill">その他</span>
      </div>
      <div class="cta-row" style="margin-top:32px;">
        <a class="pill-btn" href="mailto:info@smasta.co.jp?subject=SMARTSTART%20Web%E3%82%B5%E3%82%A4%E3%83%88%E3%81%8B%E3%82%89%E3%81%AE%E3%81%8A%E5%95%8F%E5%90%88%E3%81%9B">メールで相談する</a>
        <a class="pill-btn outline" href="tel:0335569988">電話で相談する</a>
      </div>
      <p class="note-box">ご相談内容、会社・団体名、お名前、ご連絡先を添えてお送りいただくと、担当者からのご案内がスムーズです。</p>
    """)
    write("/contact/", page("お問合せ", "SMARTSTARTへのお問合せ。", contact_hero + contact_body))

    # ============================================================ POLICY ==
    pp_hero = hero_dark(eyebrow="Policy", title_html="プライバシーポリシー等",
                         sub="個人情報保護方針をはじめとする各種ポリシーは準備中です。",
                         breadcrumb_html=breadcrumb([("Home", "/"), ("ポリシー", None)]))
    pp_body = sec("band-surface band-border-t", """
      <ul class="feature-list">
        <li>個人情報保護方針</li><li>個人情報の利用目的</li><li>当社の保有個人データについて</li>
        <li>人権方針</li><li>暴力団等反社会的勢力排除宣言</li><li>ソーシャルメディアポリシー</li><li>Cookieポリシー</li>
      </ul>
    """)
    write("/privacy-policy/", page("プライバシーポリシー等", "SMARTSTARTの各種ポリシー。", pp_hero + pp_body))
