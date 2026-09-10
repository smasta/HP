import Logo from "./Logo";
import Image from "next/image";
import {
  badges,
  REAXION_CLOUD_URL,
  REAXION_INSTAGRAM_URL,
  REAXION_STORE_URL,
  brand,
  businesses,
} from "@/lib/content";

const companyLinks = [
  { label: "私たちについて", href: "/about/" },
  { label: "会社概要", href: "/about/company/" },
  { label: "導入実績・事例", href: "/case-studies/" },
  { label: "コラム", href: "/column/" },
  { label: "新着情報", href: "/news/" },
  { label: "採用情報", href: "/recruit/" },
  { label: "お問い合わせ", href: "/contact/" },
];

export default function Footer() {
  return (
    <footer className="on-ink relative overflow-hidden bg-ink-deep pt-20 md:pt-28">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <h2 data-reveal className="display-en text-white">
          {["Measure.", "Understand.", "Improve."].map((line, index) => (
            <span
              key={line}
              className="line-mask text-[2.4rem] sm:text-[3.6rem] md:text-[5rem] lg:text-[6rem]"
            >
              <span
                style={{ "--line-delay": `${index * 130}ms` } as React.CSSProperties}
                className={index === 2 ? "text-gradient" : undefined}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-12 border-t border-white/12 pt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <a href="/" className="inline-block transition-opacity duration-300 hover:opacity-80">
              <Logo variant="white" className="h-[30px] w-auto md:h-[34px]" />
            </a>
            <p className="eyebrow mt-3 text-mist-500">{brand.category}</p>

            <address className="mt-8 space-y-2.5 not-italic text-[0.85rem] leading-[1.9] text-mist-400">
              <p>{brand.name}</p>
              <p>
                {brand.zip} {brand.address}
              </p>
              <p className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <a
                  href={`tel:${brand.tel.replace(/-/g, "")}`}
                  className="num text-[1.05rem] text-white transition-colors duration-300 hover:text-emerald-glow"
                >
                  TEL {brand.tel}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="transition-colors duration-300 hover:text-emerald-glow"
                >
                  {brand.email}
                </a>
              </p>
            </address>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={REAXION_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base pill-outline-paper px-6 py-3 text-[0.8rem] hover:scale-105 active:scale-95"
              >
                REAXION オンラインストア
                <span aria-hidden="true" className="text-[0.72rem]">
                  ↗
                </span>
                <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
              </a>
              <a
                href={REAXION_CLOUD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base px-6 py-3 text-[0.8rem] text-coral hover:scale-105 active:scale-95"
                style={{
                  border:
                    "1px solid color-mix(in srgb, var(--color-coral) 45%, transparent)",
                }}
              >
                REAXION CLOUD
                <span aria-hidden="true" className="text-[0.72rem]">
                  ↗
                </span>
                <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
              </a>
            </div>

            <div className="mt-8">
              <p className="eyebrow text-mist-500">Follow</p>
              <a
                href={REAXION_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REAXION公式Instagram（外部サイトが新しいタブで開きます）"
                className="group mt-4 inline-flex items-center gap-3 text-[0.84rem] text-mist-300 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:scale-105 group-hover:border-white/45">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span>
                  <span className="block">REAXION 公式Instagram</span>
                  <span className="num mt-0.5 block text-[0.68rem] text-mist-500">
                    @reaxion.agility
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-[0.72rem] text-mist-500 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          <nav className="lg:col-span-5" aria-label="事業メニュー">
            <p className="eyebrow text-mist-500">Business</p>
            <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {businesses.map((business) => (
                <li key={business.id}>
                  <a
                    href={business.path}
                    className="group flex items-baseline gap-3 text-[0.88rem] text-mist-300 transition-colors duration-300 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-emerald-glow transition-all duration-300 group-hover:w-4"
                    />
                    {business.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="会社メニュー">
            <p className="eyebrow text-mist-500">Company</p>
            <ul className="mt-6 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-baseline gap-3 text-[0.88rem] text-mist-300 transition-colors duration-300 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-indigo-glow transition-all duration-300 group-hover:w-4"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 認定・加盟団体 */}
        <div className="mt-16 grid gap-10 border-t border-white/12 pt-12 sm:grid-cols-2 sm:gap-14">
          {(Object.keys(badges) as (keyof typeof badges)[]).map((group) => (
            <div key={group} data-reveal>
              <p className="eyebrow text-mist-500">{group}</p>
              <ul className="mt-5 flex flex-wrap items-center gap-3">
                {badges[group].map((badge) => (
                  <li
                    key={badge.src}
                    className="flex h-[56px] items-center justify-center rounded-lg bg-white px-3 py-2 transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={badge.width}
                      height={badge.height}
                      unoptimized={badge.src.endsWith(".gif")}
                      className="h-full w-auto object-contain"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 py-8 text-[0.72rem] text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="num tracking-[0.06em]">
            © {new Date().getFullYear()} SMARTSTART, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="/privacy-policy/"
              className="transition-colors duration-300 hover:text-white"
            >
              プライバシーポリシー
            </a>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
            >
              PAGE TOP
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
