import { i18nConfig, Locale } from "@/libs/i18n";

// 지정된 locale에 대한 번역 json 파일을 비동기적으로 실행시키는 기능 포함
const translations = {
  en: () => import("@public/locales/en.json").then((module) => module.default),
  ko: () => import("@public/locales/ko.json").then((module) => module.default),

  // 중국어 간체
  "zh-CHS": () =>
    import("@public/locales/zh-CHS.json").then((module) => module.default),

  // 중국어 번체
  "zh-CHT": () =>
    import("@public/locales/zh-CHT.json").then((module) => module.default),
};

// 번역 객체 타입 정의
export type Translation = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;

export type KeyOfTranslation = keyof Translation;
export type ValueOfTranslation = Translation[KeyOfTranslation];

/**
 * 지정된 로케일을 기반으로 번역 json 파일을 비동기적으로 로드
 * @param locale locale 문자열
 * @returns 번역 객체의 key, value 쌍(pair)
 */
export default async function loadTranslation(
  locale: Locale
): Promise<Translation> {
  // locale이 translations 객체에 존재하는지 타입 가드로 확인 후 안전하게 반환
  if (locale in translations) {
    // 타입 단언을 통해 안전하게 함수 호출
    return (translations as Record<string, () => Promise<Translation>>)[
      locale
    ]();
  }
  // 지원하지 않는 locale일 경우 에러 처리
  throw new Error(`지원하지 않는 locale입니다: ${locale}`);
}
