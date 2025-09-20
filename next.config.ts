 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    locales: ["en", "bn"], // English and Bangla
    defaultLocale: "en",
  },
};

export default nextConfig;
