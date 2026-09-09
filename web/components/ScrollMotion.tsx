"use client";

import { useEffect } from "react";

/**
 * スクロール量に連動する動きを1本の rAF ループでまとめて処理する。
 *  - :root の --scroll-progress（ヘッダーの進捗バー）
 *  - [data-parallax="0.12"] の視差移動
 *  - [data-pin-stage] 内の --pin-progress（ピン留め中の送り出し）
 */
export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const parallax = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    const stages = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pin-stage]")
    );

    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      const scrollable = Math.max(root.scrollHeight - vh, 1);
      root.style.setProperty(
        "--scroll-progress",
        Math.min(Math.max(window.scrollY / scrollable, 0), 1).toFixed(4)
      );

      if (reduce) return;

      for (const stage of stages) {
        const travel = stage.offsetHeight - vh;
        const progress =
          travel > 0
            ? Math.min(Math.max(-stage.getBoundingClientRect().top / travel, 0), 1)
            : 0;
        stage.style.setProperty("--pin-progress", progress.toFixed(4));
      }

      for (const node of parallax) {
        const speed = Number(node.dataset.parallax);
        if (!speed) continue;
        const rect = node.getBoundingClientRect();
        // 画面から大きく外れているものは触らない
        if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) continue;
        const offset = rect.top + rect.height / 2 - vh / 2;
        node.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`;
      }
    };

    const request = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return null;
}
