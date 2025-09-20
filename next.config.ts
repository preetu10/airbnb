//  import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   i18n: {
//     locales: ["en", "bn"], // English and Bangla
//     defaultLocale: "en",
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
    localeDetection: true,
  },
}

module.exports = nextConfig