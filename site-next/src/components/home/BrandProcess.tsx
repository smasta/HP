"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const ITEMS: { n: string; title: string; body: string; href: string }[] = [
  {
    n: "01",
    title: "Measure / 測る",
    body: "認知機能、身体機能、反応、行動。これまで感覚で捉えてきた状態を、独自の測定技術で可視化します。",
    href: "/measurement/",
  },
  {
    n: "02",
    title: "Analyze / わかる",
    body: "クラウド、統計、AIを組み合わせ、個人・集団・経時変化から意味のあるHuman Dataへ変換します。",
    href: "/human-data/",
  },
  {
    n: "03",
    title: "Improve / 高める",
    body: "結果をトレーニングや行動変容へつなげ、測定と改善を一度きりで終わらせない循環をつくります。",
    href: "/reaxion/",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function BrandProcess() {
  return (
    <section className="band band-surface brand-process">
      <div className="container">
        <motion.div
          className="brand-process-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          <p className="eyebrow">Brand / 私たちの方法</p>
          <h2 className="h-lg">
            測ることから、
            <br />
            変化は始まる。
          </h2>
        </motion.div>
        <div className="brand-process-list">
          {ITEMS.map((it, i) => (
            <motion.article
              key={it.n}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
            >
              <span>{it.n}</span>
              <div>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
              <Link href={it.href}>→</Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
