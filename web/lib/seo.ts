import type { Metadata } from "next";

/** 公開ドメイン。移設時はここだけを変更する。 */
export const SITE_URL = "https://smasta.co.jp";
export const SITE_NAME = "SMARTSTART";

/** SNS共有画像（1200×630）。差し替える場合は public/ のファイルとここを合わせる。 */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
} as const;

export const SITE_TITLE = "人を測る。データでわかる。未来を変える。 | SMARTSTART";
export const SITE_DESCRIPTION =
  "SMARTSTARTは、人の認知・身体・行動を測定・分析し、健康・安全・成長・パフォーマンスの向上につなげるHuman Data & HealthTech企業です。";

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
  const ogImage = image
    ? { url: image.src, alt: image.alt }
    : { url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: SITE_NAME };
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
