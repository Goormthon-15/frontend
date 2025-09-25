export const i18nConfig = {
  defaultLocale: "en",
  // locales: ["en", "ko", "ja", "mn"],
  locales: ["en", "ko", "ja"],
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];
