"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/** 出そろった見た目のまま数字だけ 0 から回す。桁区切りは元の表記に合わせる */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/s);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    suffix,
    grouped: digits.includes(","),
    target: Number(digits.replace(/,/g, "")),
  };
}

/** easeOutExpo：最後にすっと止まる */
const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({
  value,
  from = 0,
  duration = 1900,
  className,
  style,
}: {
  value: string;
  /** 開始値。設立年のように 0 からだと不自然な数字に使う */
  from?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /** SSR と初期描画は確定値。JS が動くときだけ巻き戻して回す */
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const parsed = parse(value);
    if (!node || !parsed) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    const format = (n: number) =>
      parsed.prefix +
      (parsed.grouped ? Math.round(n).toLocaleString("en-US") : String(Math.round(n))) +
      parsed.suffix;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setDisplay(format(from + (parsed.target - from) * ease(t)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // 画面内に入ってから巻き戻すと確定値が一瞬ちらつくので、
    // まだ見えていないときだけ 0 に戻してから待ち構える
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      run();
    } else {
      setDisplay(format(from));
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          run();
        },
        { rootMargin: "0px 0px -14% 0px", threshold: 0.3 }
      );
      observer.observe(node);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, [value, from, duration]);

  return (
    <span ref={ref} className={className} style={style} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
