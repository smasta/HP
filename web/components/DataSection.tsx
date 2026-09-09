import type { CSSProperties } from "react";
import CountUp from "./CountUp";
import SectionHead from "./SectionHead";
import SplitText from "./SplitText";
import { coreModel } from "@/lib/content";

const cohorts = [
  { label: "個人分析", value: "1,284", unit: "sessions" },
  { label: "集団分析", value: "37", unit: "groups" },
  { label: "経時変化", value: "24", unit: "months" },
];

export default function DataSection() {
  return (
    <section id="data" className="on-ink relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <SectionHead en="Data" ja="コアモデルと分析" tone="paper" />

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-12 lg:gap-16 md:mt-20">
          {/* 左：コアモデルの番号リスト */}
          <div className="lg:col-span-6">
            <p
              data-reveal
              className="display-en text-[0.72rem] font-semibold tracking-[0.24em] text-mist-500"
            >
              MEASURE → ANALYZE → IMPROVE
            </p>

            <ol className="mt-8">
              {coreModel.map((phase, index) => (
                <li
                  key={phase.en}
                  data-reveal="left"
                  style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
                  className="border-t border-white/12 py-7 last:border-b"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="num text-[1.6rem] text-white/30">
                      {phase.step}
                    </span>
                    <div>
                      <h3 className="display-en text-[1.15rem] font-bold text-white md:text-[1.35rem]">
                        {phase.en}
                        <span className="display-jp ml-3 text-[0.82rem] font-medium text-emerald-glow">
                          {phase.ja}
                        </span>
                      </h3>
                      <ul className="mt-3 space-y-1.5">
                        {phase.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[0.86rem] leading-[1.9] text-mist-300"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.85em] h-px w-2.5 shrink-0 bg-mist-500"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <p
              data-reveal
              className="mt-8 text-[0.72rem] leading-[1.9] text-mist-500"
            >
              ※ 測定項目と分析手法は、対象者・目的に応じて設計します。
            </p>
          </div>

          {/* 右：Human Data */}
          <div id="human-data" className="lg:sticky lg:top-28 lg:col-span-6">
            <div
              data-reveal="scale"
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
              className="glass rounded-[26px] p-6 md:p-9"
            >
              <p className="eyebrow text-mist-500">Human Data</p>
              <SplitText
                as="h3"
                delay={180}
                stagger={28}
                text={"人の状態を、\nひとつの数字で終わらせない。"}
                className="display-jp mt-4 text-[1.2rem] leading-[1.65] text-white md:text-[1.6rem]"
              />
              <p className="mt-5 text-[0.88rem] leading-[2] text-mist-300">
                SMARTSTARTは一度だけの測定結果を提供するのではなく、認知と身体が連動する状態を継続的に測定・分析し、トレーニングや行動変容へつなげます。
              </p>

              <div className="mt-8 flex items-center justify-between">
                <p className="display-en text-[0.6rem] font-semibold tracking-[0.26em] text-mist-500">
                  CONTINUOUS ANALYSIS / 24 MONTHS
                </p>
                <div className="flex items-center gap-4 text-[0.62rem]">
                  <span className="flex items-center gap-2 text-mist-400">
                    <span className="h-2 w-2 rounded-full bg-indigo-glow" />
                    認知
                  </span>
                  <span className="flex items-center gap-2 text-mist-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-glow" />
                    身体
                  </span>
                </div>
              </div>

              <svg
                viewBox="0 0 640 240"
                className="mt-4 w-full"
                role="img"
                aria-label="認知スコアと身体スコアの24か月にわたる推移。いずれも継続的に上昇している。"
              >
                <defs>
                  <linearGradient id="hdIndigo" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                  <linearGradient id="hdEmerald" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <linearGradient id="hdArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map((row) => (
                  <line
                    key={row}
                    x1="0"
                    x2="640"
                    y1={24 + row * 46}
                    y2={24 + row * 46}
                    stroke="rgba(148,163,184,0.14)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M0 186 C 70 178, 110 158, 160 152 C 215 145, 250 130, 300 122 C 355 113, 390 92, 440 84 C 500 74, 540 56, 640 40 L640 240 L0 240 Z"
                  fill="url(#hdArea)"
                />
                <path
                  className="draw-path"
                  d="M0 186 C 70 178, 110 158, 160 152 C 215 145, 250 130, 300 122 C 355 113, 390 92, 440 84 C 500 74, 540 56, 640 40"
                  fill="none"
                  stroke="url(#hdIndigo)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="draw-path"
                  style={{ animationDelay: "0.55s" }}
                  d="M0 206 C 80 204, 120 190, 170 186 C 230 180, 260 168, 320 158 C 380 146, 410 132, 470 118 C 530 106, 570 92, 640 78"
                  fill="none"
                  stroke="url(#hdEmerald)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="638" cy="40" r="4" fill="#818cf8" />
                <circle cx="638" cy="78" r="4" fill="#34d399" />
              </svg>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/12 pt-6">
                {cohorts.map((cohort) => (
                  <div key={cohort.label}>
                    <dt className="text-[0.68rem] text-mist-500">{cohort.label}</dt>
                    <dd className="num mt-1.5 text-[1.5rem] text-white md:text-[1.8rem]">
                      <CountUp value={cohort.value} duration={1500} />
                      <span className="ml-1.5 text-[0.52rem] tracking-[0.16em] text-mist-500">
                        {cohort.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="/human-data/"
                className="btn-base pill-outline-paper group mt-8 w-full px-7 py-3.5 text-[0.82rem] hover:scale-[1.02] active:scale-95"
              >
                Human Data の取り組みを見る
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
