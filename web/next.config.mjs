import buildRedirects from "./redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // リポジトリ直下には site / site-next もあるため、
  // Turbopack の探索範囲をこのアプリだけに絞る
  turbopack: { root: import.meta.dirname },
  // サイトマップのパス表記（/measurement/ など）に合わせる
  trailingSlash: true,
  // 旧サイトからの 301 リダイレクト（定義は redirects.mjs）
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
