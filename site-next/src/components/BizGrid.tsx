"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const MotionLink = motion.create(Link);

const ITEMS: { n: string; title: string; en: string; copy: string; href: string }[] = [
  { n: "01", title: "測定事業", en: "Measurement", copy: "反応年齢・転倒リスク・大会記録——独自の計測技術で「わかる」を届ける。", href: "/measurement/" },
  { n: "02", title: "REAXION事業", en: "Cognitive Motor", copy: "見る・認知する・判断する・動く。反応する力を鍛えるトレーニングシステム。", href: "/reaxion/" },
  { n: "03", title: "Human Data", en: "Data & Research", copy: "測定から生まれるデータを蓄積・分析し、次の価値へつなげる。", href: "/human-data/" },
  { n: "04", title: "システム開発・保守", en: "Build", copy: "測定事業・REAXION事業を支える開発力を、対外的にも提供する。", href: "/system/" },
  { n: "05", title: "イベント支援・コンサル", en: "Experience", copy: "企画から運営、事務局代行まで。計測技術を現場で実証する。", href: "/event/" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function BizGrid() {
  return (
    <motion.div
      className="grid-cards"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {ITEMS.map((it) => (
        <MotionLink key={it.href} className="biz-card" href={it.href} variants={card} whileHover={{ y: -6 }}>
          <span className="bc-fn">
            {it.n} — {it.en}
          </span>
          <h3>{it.title}</h3>
          <p>{it.copy}</p>
          <span className="bc-link">
            詳しく見る<span className="arrow">→</span>
          </span>
        </MotionLink>
      ))}
    </motion.div>
  );
}
