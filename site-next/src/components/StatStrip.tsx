"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, type Variants } from "framer-motion";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, target, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const row: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function StatStrip({
  items,
}: {
  items: { label: string; en: string; num: number; suffix?: string }[];
}) {
  return (
    <div className="stat-strip">
      {items.map((it, i) => (
        <motion.div
          className="stat-row"
          key={it.label}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={row}
          transition={{ delay: i * 0.08 }}
        >
          <span className="stat-label">
            {it.label}
            <small>{it.en}</small>
          </span>
          <span className="stat-num">
            <Counter target={it.num} />
            {it.suffix ? <sub>{it.suffix}</sub> : null}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
