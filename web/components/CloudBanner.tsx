import { REAXION_CLOUD_URL, reaxionCloudFeatures } from "@/lib/content";

/**
 * REAXION CLOUD（別サイト）へのバナー。
 * 記載内容は reaxioncloud.jp の掲載情報に準拠。
 * 料金・プラン等は書かず、詳細は遷移先で確認してもらう設計にしている。
 */
export default function CloudBanner() {
  return (
    <div
      data-reveal
      className="group relative mt-16 overflow-hidden rounded-[26px] border border-coral/25 md:mt-24"
    >
      {/* 背景 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,111,97,0.16),rgba(255,111,97,0.04)_45%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,111,97,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,111,97,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(90% 120% at 85% 50%, #000, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(90% 120% at 85% 50%, #000, transparent 70%)",
        }}
      />

      <div className="relative grid gap-10 p-8 md:grid-cols-12 md:items-center md:gap-8 md:p-12">
        {/* ------------------------------------------------- テキスト */}
        <div className="md:col-span-8">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            <span className="display-en text-[0.58rem] font-semibold tracking-[0.28em] text-coral">
              RELATED SERVICE
            </span>
          </div>

          <p className="display-en mt-5 text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.4rem] md:text-[2.9rem]">
            REAXION <span className="text-coral">CLOUD</span>
          </p>

          <p className="display-jp mt-4 text-[1rem] leading-[1.7] text-white md:text-[1.25rem]">
            REAXIONデータを、クラウドで活用する。
          </p>

          <p className="mt-4 max-w-2xl text-[0.88rem] leading-[2.05] text-mist-300">
            REAXIONデバイスで計測したトレーニングデータを自動でクラウドに格納し、一元管理。個人はもちろん、チーム・施設・クラス単位でパフォーマンスを分析・可視化し、成長の推移を追えます。
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {reaxionCloudFeatures.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-[0.72rem] text-mist-300 transition-colors duration-300 group-hover:border-coral/40"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={REAXION_CLOUD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base group/btn px-8 py-3.5 text-[0.85rem] font-semibold text-ink hover:scale-105 active:scale-95"
              style={{ backgroundColor: "var(--color-coral)" }}
            >
              REAXION CLOUD を見る
              <span
                aria-hidden="true"
                className="text-[0.78rem] transition-transform duration-300 group-hover/btn:translate-x-0.5"
              >
                ↗
              </span>
              <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
            </a>
            <span className="num text-[0.74rem] tracking-[0.06em] text-mist-500">
              reaxioncloud.jp
            </span>
          </div>
        </div>

        {/* ------------------------------------------- デバイスモチーフ */}
        <div className="md:col-span-4" aria-hidden="true">
          <div className="relative mx-auto flex aspect-square w-full max-w-[230px] items-center justify-center">
            <span
              className="absolute inset-0 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,111,97,0.55), transparent 65%)",
              }}
            />
            {[1, 2].map((ring) => (
              <span
                key={ring}
                className="ping-ring absolute aspect-square w-[62%] rounded-full border border-coral/50"
                style={{ animationDelay: `${ring * 1.2}s` }}
              />
            ))}
            <svg
              viewBox="0 0 120 120"
              className="relative w-[62%] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            >
              <defs>
                <clipPath id="cloudHex">
                  <path d="M60 4 L108 32 L108 88 L60 116 L12 88 L12 32 Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#cloudHex)">
                <rect x="0" y="0" width="60" height="120" fill="#0b1120" />
                <rect x="60" y="0" width="60" height="120" fill="#f4f4f1" />
              </g>
              <path
                d="M60 4 L108 32 L108 88 L60 116 L12 88 L12 32 Z"
                fill="none"
                stroke="rgba(255,111,97,0.85)"
                strokeWidth="2"
              />
              <circle cx="82" cy="52" r="7" fill="#0b1120" />
              <circle cx="82" cy="52" r="2.4" fill="#ff6f61" />
              <text
                x="86"
                y="86"
                className="num"
                fontSize="20"
                fill="#0b1120"
                opacity="0.55"
              >
                1
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
