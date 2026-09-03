import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SMARTSTART",
  description:
    "SMARTSTARTは、人の認知・身体・行動を測定・分析し、健康・安全・成長・パフォーマンスの向上につなげるHuman Data & HealthTech企業です。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <a href="#content" className="skip-link">
          コンテンツにスキップ
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
