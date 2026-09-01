import type { Metadata, Viewport } from "next";
import { REAXION_CLOUD_URL, REAXION_INSTAGRAM_URL, REAXION_STORE_URL, brand } from "@/lib/content";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absolute,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: absolute("/"),
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "light",
};

/** Organization（会社概要と整合させること） */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: brand.name,
  alternateName: brand.nameEn,
  url: SITE_URL,
  logo: absolute(OG_IMAGE.url),
  email: brand.email,
  telephone: "+81-3-3556-9988",
  faxNumber: "+81-3-5357-1475",
  foundingDate: "2013-02-14",
  address: {
    "@type": "PostalAddress",
    postalCode: "102-0072",
    addressRegion: "東京都",
    addressLocality: "千代田区",
    streetAddress: "飯田橋1-5-6 協和西ビル2階",
    addressCountry: "JP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+81-3-3556-9988",
    email: brand.email,
    areaServed: "JP",
    availableLanguage: ["ja"],
  },
  description: SITE_DESCRIPTION,
  sameAs: [REAXION_INSTAGRAM_URL, REAXION_STORE_URL, REAXION_CLOUD_URL],
};

/** WebSite */
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: brand.name,
  description: SITE_DESCRIPTION,
  inLanguage: "ja",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;0,600;0,700;0,800;1,700;1,800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Inter:wght@300..600&family=Oswald:wght@300..600&family=Noto+Sans+JP:wght@300..700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, webSiteJsonLd]),
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="btn-base pill-ink sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:px-5 focus:py-3 focus:text-sm"
        >
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
