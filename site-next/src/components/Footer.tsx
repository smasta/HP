import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            SMARTSTART
            <span>HUMAN DATA &amp; HEALTHTECH COMPANY</span>
          </div>
          <p className="footer-copy">人を測る。データでわかる。未来を変える。</p>
        </div>
        <div className="footer-grid">
          <div>
            <b>Business</b>
            <Link href="/measurement/">測定事業</Link>
            <Link href="/reaxion/">REAXION事業</Link>
            <Link href="/human-data/">Human Data</Link>
            <Link href="/system/">システム開発・保守</Link>
            <Link href="/event/">イベント支援・コンサル</Link>
          </div>
          <div>
            <b>Company</b>
            <Link href="/about/">私たちについて</Link>
            <Link href="/about/company/">会社概要</Link>
            <Link href="/case-studies/">導入実績・事例</Link>
            <Link href="/news/">新着情報</Link>
            <Link href="/recruit/">採用情報</Link>
          </div>
          <div>
            <b>Contact</b>
            <Link href="/contact/">お問合せフォーム</Link>
            <span>03-3556-9988</span>
            <span>info@smasta.co.jp</span>
            <span>東京都千代田区六番町1-1 恩田ビル3階</span>
          </div>
          <div>
            <b>Online Store</b>
            <a href="https://reaxion.jp" target="_blank" rel="noopener">
              REAXION オンラインストア ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© SMARTSTART INC. All Rights Reserved.</span>
          <Link href="/privacy-policy/">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
}
