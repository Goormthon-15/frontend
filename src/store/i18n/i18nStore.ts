import { create, StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import { i18nConfig, Locale } from "@/libs/i18n";
import { getCookie } from "@/utils/cookies";

export interface II18n {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

/** locale값을 client에서도 활용할 수 있는 전역 상태 store */
export const useTranslationStore: UseBoundStore<StoreApi<II18n>> = create(
  devtools((setState) => ({
    locale: (getCookie("lng") || "en") as Locale,
    setLocale: (locale) => {
      setState(() => {
        // 번역가능한 json 파일이 없다면 영문으로 설정
        const currentLocale =
          i18nConfig.locales.find((val) => val === locale) || "en";
        return { locale: currentLocale };
      });
    },
  }))
);
