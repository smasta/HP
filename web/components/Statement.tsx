import Image from "next/image";
import type { CSSProperties } from "react";
import SplitText from "./SplitText";
import { photos, values } from "@/lib/content";

export default function Statement() {
  return (
    <section
      id="statement"
      className="on-ink relative overflow-hidden bg-ink py-28 md:py-44"
    >
      {/* 背景：実写＋測定データの層 */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* 写真だけをゆっくり逆走させ、文字との間に奥行きを出す */}
        <div
          data-parallax="0.085"
          className="absolute inset-x-0 -bottom-[14%] -top-[14%]"
        >
          <Image
            src={photos.athlete.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_28%]"
          />
        </div>
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-transparent to-ink" />
      </div>

      <div className="aurora-field" aria-hidden="true">
        <div
          className="aurora-blob aurora-a -left-[8vw] top-[6vh] h-[46vw] w-[46vw] opacity-30"
          style={{ background: "radial-gradient(circle, #818cf8, transparent 68%)" }}
        />
        <div
          className="aurora-blob aurora-c bottom-[-10vh] right-[-6vw] h-[42vw] w-[42vw] opacity-25"
          style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }}
        />
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.3]"
      >
        <defs>
          <linearGradient id="stLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="45%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((index) => (
          <path
            key={index}
            d={`M0 ${520 - index * 26} C 260 ${470 - index * 40}, 420 ${
              380 - index * 20
            }, 700 ${330 - index * 34} C 980 ${280 - index * 44}, 1160 ${
              200 - index * 18
            }, 1440 ${150 - index * 30}`}
            fill="none"
            stroke="url(#stLine)"
            strokeWidth={index === 0 ? 1.6 : 0.8}
            strokeOpacity={index === 0 ? 1 : 0.45}
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <div className="max-w-4xl">
          <SplitText
            as="p"
            text="見えなかった「人」を、データにする。"
            stagger={30}
            className="display-jp text-[0.9rem] tracking-[0.16em] text-emerald-glow md:text-[1rem]"
          />

          <SplitText
            as="h2"
            text={"Measure People\nChange Future"}
            delay={120}
            stagger={40}
            className="display-en mt-6 text-[2.6rem] text-white sm:text-[4rem] md:text-[5.4rem] lg:text-[6.4rem]"
          />

          <div
            data-reveal
            style={{ "--reveal-delay": "220ms" } as CSSProperties}
            className="mt-12 max-w-2xl space-y-7 text-[0.92rem] leading-[2.1] text-white/75 md:mt-16 md:text-[0.98rem]"
          >
            <p>
              見る。気づく。考える。判断する。動く。
              <br />
              人には、まだ測れていない能力や変化があります。
            </p>
            <p>
              SMARTSTARTは、人の認知・身体・行動を測定し、
              <br className="hidden sm:block" />
              そのデータを理解できる情報へ変換することで、
              <br className="hidden sm:block" />
              一人ひとりと組織がより良い行動を選択できる環境をつくります。
            </p>
            <p className="editorial text-[1.15rem] leading-[1.9] text-white md:text-[1.4rem]">
              Human Data changes health and behavior.
            </p>
          </div>

          <dl
            data-reveal
            style={{ "--reveal-delay": "320ms" } as CSSProperties}
            className="mt-14 grid gap-8 border-t border-white/12 pt-10 sm:grid-cols-2"
          >
            <div>
              <dt className="eyebrow text-mist-500">Mission</dt>
              <dd className="display-jp mt-3 text-[1.05rem] leading-[1.7] text-white md:text-[1.25rem]">
                人の可能性を、データとテクノロジーでひらく。
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-mist-500">Vision</dt>
              <dd className="display-jp mt-3 text-[1.05rem] leading-[1.7] text-white md:text-[1.25rem]">
                Human Dataが、健康と行動を変える社会へ。
              </dd>
            </div>
          </dl>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-5 md:mt-24">
          {values.map((value, index) => (
            <li
              key={value.en}
              data-reveal="left"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="group bg-ink px-6 py-8 transition-colors duration-300 hover:bg-white/[0.05]"
            >
              <span className="num text-[0.68rem] text-mist-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="display-en mt-3 text-[1.05rem] font-bold text-white transition-colors duration-300 group-hover:text-emerald-glow">
                {value.en}
              </p>
              <p className="display-jp mt-1.5 text-[0.85rem] text-mist-400">
                {value.ja}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
