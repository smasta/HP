"use client";

import { motion, type Variants } from "framer-motion";

const IMAGES = [
  { src: "/assets/img/kids.jpg", alt: "" },
  { src: "/assets/img/office.jpg", alt: "" },
  { src: "/assets/img/senior.jpg", alt: "" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function VisualStrips() {
  return (
    <motion.div
      className="visual-strips"
      aria-hidden="true"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {IMAGES.map((img) => (
        <motion.div key={img.src} variants={item}>
          <img src={img.src} alt={img.alt} />
        </motion.div>
      ))}
    </motion.div>
  );
}
