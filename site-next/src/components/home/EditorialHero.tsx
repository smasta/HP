"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.35 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const lineGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const line: Variants = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

const HEADLINE_LINES = ["人を測る。", "未来を変える。"];

export default function EditorialHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="editorial-hero">
      <div className="editorial-hero-image" ref={imageRef}>
        <motion.img
          src="/assets/img/athlete.jpg"
          alt="スタートダッシュするアスリート"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: EASE }}
          style={{ y: imgY, scale: imgScale }}
        />

        <motion.div
          className="editorial-hero-copy"
          variants={copyContainer}
          initial="hidden"
          animate="show"
          style={{ opacity: copyOpacity }}
        >
          <motion.p variants={fadeUp}>HUMAN DATA &amp; HEALTHTECH</motion.p>

          <motion.h1 variants={lineGroup} aria-label={HEADLINE_LINES.join("")}>
            {HEADLINE_LINES.map((text) => (
              <span key={text} style={{ display: "block", overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} variants={line}>
                  {text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.span variants={fadeUp}>認知・身体・行動をデータに変え、人の可能性をひらく。</motion.span>
        </motion.div>

        <motion.span
          className="editorial-index"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          SS / 001
        </motion.span>
      </div>
    </section>
  );
}
