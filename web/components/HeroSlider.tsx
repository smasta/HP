"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { audiences, photos } from "@/lib/content";

const DURATION = 6000;

/** ヒーローで見せる順番（対象者別の入口と同じ5つを、画づくりの強い順で回す） */
const ORDER = ["sports", "event", "public", "kids", "enterprise"] as const;

const slides = ORDER.map(
  (id) => audiences.find((audience) => audience.id === id) ?? audiences[0]
);

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  /** LCP を優先するため、2枚目以降は初回描画が終わってから読み込む */
  const [preloadRest, setPreloadRest] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const handle = idle(() => setPreloadRest(true));
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    timer.current = window.setTimeout(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, DURATION);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, reduced]);

  const active = slides[index];

  return (
    <>
      {/* ---------------------------------------------------- 写真レイヤー */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {slides.map((slide, slideIndex) => {
          const photo = photos[slide.photo];
          const isActive = slideIndex === index;
          return (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  animation: reduced
                    ? undefined
                    : isActive
                      ? "ken-burns 9s cubic-bezier(0.16,1,0.3,1) forwards"
                      : undefined,
                }}
              >
                {slideIndex === 0 || preloadRest || isActive ? (
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    priority={slideIndex === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
          );
        })}

        {/* 減光と計測グリッド */}
        <div className="absolute inset-0 bg-ink-deep/55" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,rgba(7,12,24,0.2),rgba(7,12,24,0.88))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/85 via-transparent to-ink-deep/95" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
          }}
        />
      </div>

      {/* ------------------------------------------------------ HUD / 操作 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-6 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-8 md:pb-10 lg:px-10">
          {/* 現在のスライド情報 */}
          <div
            key={active.id}
            className="pointer-events-auto text-left"
            style={{ animation: "slide-caption 0.9s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-glow" />
              <span className="display-en text-[0.58rem] font-semibold tracking-[0.28em] text-white/60">
                {active.en}
              </span>
            </div>
            <p className="display-jp mt-2.5 text-[1.05rem] text-white md:text-[1.25rem]">
              {active.label}
            </p>
            <p className="mt-1 text-[0.76rem] text-white/60 md:text-[0.82rem]">
              {active.lead}
            </p>
          </div>

          {/* インジケーター */}
          <div
            className="pointer-events-auto flex items-center gap-2.5"
            role="tablist"
            aria-label="ヒーロースライド"
          >
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${slide.label}のスライドを表示`}
                  onClick={() => go(slideIndex)}
                  className="group flex h-8 items-center transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <span
                    className={[
                      "relative block h-[3px] overflow-hidden rounded-full transition-all duration-500",
                      isActive ? "w-14 bg-white/25" : "w-6 bg-white/25 group-hover:bg-white/50",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <span
                        key={index}
                        className="absolute inset-y-0 left-0 block rounded-full bg-gradient-to-r from-indigo-glow to-emerald-glow"
                        style={{
                          animation: reduced
                            ? undefined
                            : `indicator-fill ${DURATION}ms linear forwards`,
                          width: reduced ? "100%" : undefined,
                        }}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}

            <span className="num ml-3 text-[0.72rem] text-white/50">
              {String(index + 1).padStart(2, "0")}
              <span className="mx-1 text-white/25">/</span>
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1.06); }
          to { transform: scale(1.16); }
        }
        @keyframes indicator-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes slide-caption {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
