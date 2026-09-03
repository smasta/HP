"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function CtaBand({
  title,
  sub,
  ctas,
}: {
  title: string;
  sub: string;
  ctas: { label: string; href: string; outline?: boolean }[];
}) {
  return (
    <section className="band band-dark">
      <motion.div
        className="container cta-band"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.h2 variants={fadeUp}>{title}</motion.h2>
        <motion.p className="lede" variants={fadeUp}>
          {sub}
        </motion.p>
        <motion.div className="cta-row" style={{ marginTop: 26 }} variants={fadeUp}>
          {ctas.map((c) => (
            <Link key={c.href} href={c.href} className={`pill-btn on-dark${c.outline ? " outline" : ""}`}>
              {c.label}
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
