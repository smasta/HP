"use client";

import { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import { brand, navItems } from "@/lib/content";

const headerNav = [
  { en: "Measurement", href: "/measurement/" },
  { en: "REAXION", href: "/reaxion/" },
  { en: "Human Data", href: "/human-data/" },
  { en: "System", href: "/system/" },
  { en: "Event", href: "/event/" },
  { en: "Contact", href: "/contact/" },
];

export default function Header({ solidFromTop = false }: { solidFromTop?: boolean }) {
  const [solid, setSolid] = useState(solidFromTop);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solidFromTop) {
      setSolid(true);
      return;
    }
    // ヒーローをピン留めしている間は透明のまま。舞台を抜けてから白に切り替える
    const stage = document.querySelector<HTMLElement>("[data-pin-stage]");
    const onScroll = () => {
      const threshold = stage
        ? stage.offsetTop + stage.offsetHeight - window.innerHeight * 0.3
        : window.innerHeight * 0.72;
      setSolid(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solidFromTop]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const light = solid && !open;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-[120] transition-[background-color,box-shadow,border-color] duration-500",
          light
            ? "border-b border-black/[0.08] bg-white/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[68px] max-w-[1560px] items-center justify-between px-5 md:h-[76px] md:px-8 lg:px-10">
          <a
            href="/"
            aria-label="SmartStart トップへ"
            className="group relative flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            {/* 明暗どちらの面でも読めるよう2版を重ねて切り替える */}
            <span className="relative block h-[26px] w-[93px] md:h-[30px] md:w-[107px]">
              <span
                className={[
                  "absolute inset-0 transition-opacity duration-500",
                  light ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                <Logo priority className="h-full w-full object-contain" />
              </span>
              <span
                className={[
                  "absolute inset-0 transition-opacity duration-500",
                  light ? "opacity-0" : "opacity-100",
                ].join(" ")}
              >
                <Logo variant="white" priority className="h-full w-full object-contain" />
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="セクションメニュー">
            {headerNav.map((item) => (
              <a
                key={item.en}
                href={item.href}
                className={[
                  "display-en group relative text-[0.82rem] font-semibold tracking-[0.01em] transition-colors duration-300",
                  light ? "text-ink/70 hover:text-ink" : "text-white/75 hover:text-white",
                ].join(" ")}
              >
                {item.en}
                <span
                  className={[
                    "absolute -bottom-1.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full",
                    light ? "bg-ink" : "bg-white",
                  ].join(" ")}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-3">
            <a
              href="/#store"
              className={[
                "display-en hidden items-center gap-1.5 text-[0.78rem] font-semibold transition-colors duration-300 sm:inline-flex",
                light ? "text-ink/70 hover:text-ink" : "text-white/75 hover:text-white",
              ].join(" ")}
            >
              Store
            </a>
            <a
              href="/contact/"
              className={[
                "btn-base hidden px-6 py-2.5 text-[0.78rem] hover:scale-105 active:scale-95 sm:inline-flex",
                light ? "pill-ink" : "pill-outline-paper",
              ].join(" ")}
            >
              お問い合わせ
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={[
                "btn-base group relative h-10 w-10 border transition-transform duration-300 hover:scale-105 active:scale-95 md:h-11 md:w-11",
                light
                  ? "border-black/15 text-ink hover:border-ink"
                  : "border-white/25 text-white hover:border-white/70",
              ].join(" ")}
            >
              <span className="sr-only">{open ? "メニューを閉じる" : "メニューを開く"}</span>
              <span aria-hidden="true" className="relative block h-3 w-[18px]">
                <span
                  className={[
                    "absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 h-[1.5px] bg-current transition-all duration-300",
                    open ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3 group-hover:w-full",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>

        {/* 読み進み具合を示す一本線 */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-x-0 bottom-0 h-[2px] origin-left transition-opacity duration-500",
            light ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <span className="scroll-progress block h-full w-full bg-gradient-to-r from-indigo-glow to-emerald-glow" />
        </div>
      </header>

      {/* ---------------------------------------- Full screen menu */}
      <div
        id="site-menu"
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[110] bg-ink transition-[opacity,visibility] duration-500",
          open ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      >
        <div className="aurora-field" aria-hidden="true">
          <div
            className="aurora-blob aurora-a -left-[10vw] top-[4vh] h-[46vw] w-[46vw] opacity-40"
            style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
          />
          <div
            className="aurora-blob aurora-b bottom-[2vh] right-[0vw] h-[38vw] w-[38vw] opacity-30"
            style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }}
          />
        </div>

        <div className="on-ink relative flex h-full items-start overflow-y-auto px-5 pb-16 pt-24 md:px-8 md:items-center lg:px-10">
          <nav className="mx-auto w-full max-w-[1560px]" aria-label="サイトメニュー">
            <p className="eyebrow mb-7 text-mist-500">Site Menu</p>
            <ul className="grid gap-x-14 md:grid-cols-2">
              {navItems.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    className="group flex items-center gap-5 border-b border-white/10 py-4 transition-colors duration-300 hover:border-white/40 md:py-5"
                  >
                    <span className="num text-[0.7rem] text-mist-500 transition-colors duration-300 group-hover:text-emerald-glow">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="display-jp block text-lg text-white transition-transform duration-300 group-hover:translate-x-1.5 md:text-2xl">
                        {item.label}
                      </span>
                      <span className="display-en mt-1 block text-[0.62rem] font-semibold tracking-[0.22em] text-mist-500">
                        {item.en}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="translate-x-[-6px] text-mist-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 text-sm text-mist-400 sm:flex-row sm:items-center sm:gap-10">
              <a
                href={`tel:${brand.tel.replace(/-/g, "")}`}
                tabIndex={open ? 0 : -1}
                className="num text-base text-white transition-colors duration-300 hover:text-emerald-glow"
              >
                {brand.tel}
              </a>
              <a
                href={`mailto:${brand.email}`}
                tabIndex={open ? 0 : -1}
                className="transition-colors duration-300 hover:text-white"
              >
                {brand.email}
              </a>
              <span className="text-mist-500">{brand.address}</span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
