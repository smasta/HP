"use client";

import { motion, type Variants } from "framer-motion";
import WaveCanvas from "@/components/WaveCanvas";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export default function FeatureFocus() {
  return (
    <section className="feature-focus">
      <motion.img
        src="/assets/img/athlete.jpg"
        alt="競技に取り組むアスリート"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <WaveCanvas variant="story" />
      <motion.div
        className="feature-focus-copy"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.p className="eyebrow on-dark" variants={fadeUp}>
          Human Data
        </motion.p>
        <motion.h2 variants={fadeUp}>
          人の状態を、
          <br />
          ひとつの数字で
          <br />
          終わらせない。
        </motion.h2>
        <motion.p variants={fadeUp}>
          見る。気づく。考える。判断する。動く。SMARTSTARTは、認知と身体が連動する瞬間を測定し、変化を継続的に捉えます。
        </motion.p>
        <motion.span variants={fadeUp}>MEASURE / ANALYZE / IMPROVE</motion.span>
      </motion.div>
    </section>
  );
}
