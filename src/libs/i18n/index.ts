export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "ko", "zh-CHS", "zh-CHT"],
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];
