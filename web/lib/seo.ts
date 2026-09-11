import type { Metadata } from "next";

/** 公開ドメイン。移設時はここだけを変更する。 */
export const SITE_URL = "https://smasta.co.jp";
export const SITE_NAME = "SMARTSTART";

/** Google アナリティクス（GA4）の測定ID。公開値なので環境変数にはしない */
export const GA_MEASUREMENT_ID = "G-DTFCE8QMDR";

/** SNS共有画像（1200×630）。差し替える場合は public/ のファイルとここを合わせる。 */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
} as const;

export const SITE_TITLE = "人を測る。データでわかる。未来を変える。 | SMARTSTART";
export const SITE_DESCRIPTION =
  "SMARTSTARTは、人の認知・身体・行動を測定・分析し、健康・安全・成長・パフォーマンスの向上につなげるHuman Data & HealthTech企業です。";

/**
 * og:image をカード向けの 1200×630 JPEG に差し替える。
 *
 * ・SNS は WebP を確実に扱えない（X はカードで描画せず、LinkedIn は非対応）
 * ・写真をそのまま渡すと縦横比が合わずカードが大きく切れる
 *   （athlete.jpg は 1800×2700 の縦長）
 * ページ内の表示は元のファイルのままで、共有画像だけを og/ に用意している。
 * 生成は scripts/generate-og-images.py。
 */
function toShareImage(src: string): string {
  // 生成済みのキービジュアルは、はじめから 1200×630 JPEG
  if (src.startsWith("/images/covers/") || src.startsWith("/images/news/covers/")) {
    return src;
  }
  // 写真は og/ の切り抜き版に差し替える
  const match = src.match(/^\/images\/(?:news\/)?([^/]+)\.(?:jpg|jpeg|png|webp)$/);
  return match ? `/og/${match[1]}.jpg` : src;
}

/** 相対パスを絶対URLにする */
export const absolute = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** ページ固有の Title / Description / Canonical / OGP / X カードをまとめて組み立てる */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** ページ固有のOGP画像（未指定なら共通の og.jpg） */
  image?: { src: string; alt: string };
}): Metadata {
  const desc = description ?? SITE_DESCRIPTION;
  // 共有画像はすべて 1200×630 の JPEG に揃え、寸法と形式まで明示する
  const ogImage = image
    ? {
        url: toShareImage(image.src),
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        type: "image/jpeg",
        alt: image.alt,
      }
    : {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        type: "image/jpeg",
        alt: SITE_NAME,
      };
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ja_JP",
      url: absolute(path),
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage.url],
    },
  };
}
