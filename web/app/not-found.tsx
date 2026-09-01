import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  description: "お探しのページは移動または削除された可能性があります。",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="on-ink relative flex min-h-[100svh] items-center overflow-hidden bg-ink px-5">
      <div className="aurora-field" aria-hidden="true">
        <div
          className="aurora-blob aurora-a left-[12vw] top-[10vh] h-[46vw] w-[46vw] opacity-30"
          style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
        />
      </div>
      <div className="relative mx-auto max-w-xl text-center">
        <p className="num text-[6rem] leading-none text-white/20">404</p>
        <h1 className="display-jp mt-6 text-[1.6rem] text-white md:text-[2.2rem]">
          ページが見つかりません
        </h1>
        <p className="mt-6 text-[0.92rem] leading-[2] text-mist-300">
          お探しのページは移動または削除された可能性があります。
        </p>
        <a
          href="/"
          className="btn-base pill-paper mt-10 px-8 py-3.5 text-[0.86rem] font-semibold hover:scale-105 active:scale-95"
        >
          トップへ戻る
        </a>
      </div>
    </main>
  );
}
