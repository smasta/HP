"use client";

import { useEffect, useRef } from "react";

type Layer = {
  freq: number;
  speed: number;
  amp: number;
  base: number;
  color: string;
  width: number;
  alpha: number;
  bump: number;
};

const LAYERS: Layer[] = [
  { freq: 1.1, speed: 0.55, amp: 0.15, base: 0.42, color: "47,92,255", width: 1.6, alpha: 0.9, bump: 0.15 },
  { freq: 1.7, speed: -0.35, amp: 0.09, base: 0.6, color: "150,150,142", width: 1.1, alpha: 0.45, bump: 0.05 },
  { freq: 0.65, speed: 0.22, amp: 0.07, base: 0.5, color: "47,92,255", width: 1, alpha: 0.22, bump: 0.05 },
];

/** Reaction-data waveform, mouse-reactive. Ports the vanilla WaveCanvas class 1:1. */
export default function WaveCanvas({ variant = "hero", className = "" }: { variant?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let t = Math.random() * 10;
    let hotspot = 0.5;
    let hotspotTarget = 0.5;
    let raf = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pointFor(l: Layer, xp: number, hs: number) {
      const bump = Math.exp(-Math.pow((xp - hs) * 4.2, 2)) * l.bump;
      return h * l.base + Math.sin(xp * Math.PI * 2 * l.freq + t * l.speed) * h * (l.amp + bump);
    }

    function drawFrame() {
      if (!w || !h) resize();
      ctx!.clearRect(0, 0, w, h);
      LAYERS.forEach((l) => {
        ctx!.beginPath();
        const steps = 90;
        for (let i = 0; i <= steps; i++) {
          const xp = i / steps;
          const x = xp * w;
          const y = pointFor(l, xp, hotspot);
          if (i === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(${l.color},${l.alpha})`;
        ctx!.lineWidth = l.width;
        ctx!.stroke();
      });
      [0.3, 0.7].forEach((xp, i) => {
        const l = LAYERS[0];
        const y = pointFor(l, xp, hotspot);
        const r = 2.6 + Math.sin(t * 2 + i * 2.4) * 1.5;
        ctx!.beginPath();
        ctx!.arc(xp * w, y, Math.max(0.6, r), 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(47,92,255,0.9)";
        ctx!.fill();
      });
    }

    function loop() {
      t += 0.016;
      hotspot += (hotspotTarget - hotspot) * 0.05;
      drawFrame();
      if (!reduced) raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      hotspotTarget = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }
    function onLeave() {
      hotspotTarget = 0.5;
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    resize();
    if (reduced) drawFrame();
    else raf = requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className={`wave-canvas ${className}`} data-variant={variant} aria-hidden="true" />;
}
