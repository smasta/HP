"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function EditorialStatement() {
  return (
    <motion.div
      className="editorial-statement"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.p className="statement-brand" variants={fadeUp}>
        SMARTSTART
        <span>Human Data Company</span>
      </motion.p>
      <div>
        <motion.p className="eyebrow" variants={fadeUp}>
          Our Mission
        </motion.p>
        <motion.h2 variants={fadeUp}>
          見えなかった「人」を、
          <br />
          データにする。
        </motion.h2>
        <motion.p variants={fadeUp}>
          測る。わかる。高める。健康、安全、成長、パフォーマンスを、感覚だけではなく確かなデータから前へ進めます。
        </motion.p>
        <motion.div className="cta-row" variants={fadeUp}>
          <a href="#business" className="pill-btn">
            事業を見る
          </a>
          <Link href="/contact/" className="pill-btn outline">
            導入を相談する
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
