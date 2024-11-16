module.exports = {
  locales: [
    "en",
    "da",
    "de",
    "es",
    "fr",
    "no",
    "pt",
    "se",
    "tl",
    "it",
    "he",
    "tr",
    "hu",
    "th",
    "zh-CN",
    "ru",
  ],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/auth/login": ["auth_login"],
    "/auth/forgot-password": ["forgot_password"],
  },
  localeDetection: true,
};
