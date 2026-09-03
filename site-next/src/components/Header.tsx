"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

const MENU_ITEMS: [string, string, string][] = [
  ["/measurement/", "測定事業", "Measurement"],
  ["/reaxion/", "REAXION事業", "Cognitive Motor"],
  ["/human-data/", "Human Data", "Data & Research"],
  ["/system/", "システム開発・保守", "Build"],
  ["/event/", "イベント支援・コンサル", "Experience"],
  ["/case-studies/", "導入実績・事例", "Case Studies"],
  ["/about/", "私たちについて", "About"],
  ["/news/", "新着情報", "News"],
  ["/recruit/", "採用情報", "Recruit"],
];

const menuOverlay = {
  closed: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] as const } },
  open: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const listVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
};

const itemVariants = {
  closed: { opacity: 0, y: 16 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <>
      <header className="site-header">
        <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />
        <div className="site-header-inner">
          <Link href="/" className="logo">
            <span className="mark">✕</span>SMARTSTART
          </Link>
          <nav className="header-nav" aria-label="主要メニュー">
            <Link href="/measurement/" aria-current={pathname === "/measurement/" ? "page" : undefined}>測定</Link>
            <Link href="/reaxion/" aria-current={pathname === "/reaxion/" ? "page" : undefined}>REAXION</Link>
            <Link href="/case-studies/" aria-current={pathname === "/case-studies/" ? "page" : undefined}>導入事例</Link>
            <Link href="/about/" aria-current={pathname === "/about/" ? "page" : undefined}>私たちについて</Link>
            <Link href="/contact/" className="header-contact">相談する</Link>
          </nav>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="siteMenu"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="siteMenu"
            className="site-menu is-open"
            style={{ transform: "none" }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuOverlay}
            aria-hidden={!open}
          >
            <div className="site-menu-inner">
              <button className="menu-close" onClick={() => setOpen(false)} aria-label="メニューを閉じる">
                ✕ CLOSE
              </button>
              <motion.ol className="menu-list" variants={listVariants} initial="closed" animate="open">
                {MENU_ITEMS.map(([href, label, en]) => (
                  <motion.li key={href} variants={itemVariants}>
                    <Link href={href} onClick={() => setOpen(false)}>
                      {label}
                      <span>{en}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ol>
              <div className="menu-footer">
                <Link href="/contact/" className="pill-btn on-dark" onClick={() => setOpen(false)}>
                  お問合せ
                </Link>
                <span className="menu-meta">SMARTSTART INC. — Human Data &amp; HealthTech Company</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
