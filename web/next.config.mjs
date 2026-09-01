import buildRedirects from "./redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // サイトマップのパス表記（/measurement/ など）に合わせる
  trailingSlash: true,
  // 旧サイトからの 301 リダイレクト（定義は redirects.mjs）
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
