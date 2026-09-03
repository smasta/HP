"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const MotionLink = motion.create(Link);

const ITEMS: [string, string, string][] = [
  ["/measurement/reaxion-well/", "Health", "×"],
  ["/measurement/fall-risk/", "Safety", "×"],
  ["/reaxion/pro/", "Performance", "×"],
  ["/reaxion/kids/", "Growth", "↗"],
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AudienceNav() {
  return (
    <motion.nav
      className="audience-nav editorial-keywords"
      aria-label="目的から探す"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {ITEMS.map(([href, label, symbol]) => (
        <MotionLink key={href} href={href} variants={item}>
          {label} <span>{symbol}</span>
        </MotionLink>
      ))}
    </motion.nav>
  );
}
