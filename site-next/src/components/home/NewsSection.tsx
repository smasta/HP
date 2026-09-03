"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const NEWS = [
  { date: "2025.08.27", tag: "測定事業", title: "30秒で「健康経営」を動かす——企業向け『REAXION Well』提供開始" },
  { date: "2025.04.25", tag: "Human Data", title: "DX×AIで認知症予防と介護施設の収益アップを同時に実現——「REAXION」が川崎市KIS認証を取得" },
  { date: "2024.07.02", tag: "REAXION", title: "REAXION®がサッカークラブ「南葛SC」とパートナー契約を締結" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function NewsSection() {
  return (
    <section className="band band-surface news-editorial">
      <div className="container">
        <div
          className="section-head"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}
        >
          <div>
            <p className="eyebrow">News</p>
            <h2 className="h-lg" style={{ marginBottom: 0 }}>
              新着情報
            </h2>
          </div>
          <Link href="/news/" className="pill-btn outline">
            一覧を見る
          </Link>
        </div>
        <motion.ul
          className="news-list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {NEWS.map((n) => (
            <motion.li key={n.date} variants={item}>
              <span className="news-date">{n.date}</span>
              <span className="news-tag">{n.tag}</span>
              <span className="news-title">{n.title}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
