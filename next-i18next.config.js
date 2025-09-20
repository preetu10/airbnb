/* eslint-disable @typescript-eslint/no-require-imports */
// module.exports = {
//   i18n: {
//     defaultLocale: "en",
//     locales: ["en", "bn"],
//   },
//   reloadOnPrerender: true,
// };

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bn"],
  },
  localeDetection: true,
  // 👇 Add this to force Bangla to be LTR
  localePath: typeof window === "undefined"
    ? require("path").resolve("./public/locales")
    : "/locales",
  reloadOnPrerender: true,
  localeStructure: "{{lng}}/{{ns}}",
};

