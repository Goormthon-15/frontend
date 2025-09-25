import { ITranslation } from "@/app/_components/provider/LocaleProvider";
import { Locale } from "@/libs/i18n";
import loadTranslation, {
  Translation,
} from "@/libs/i18n/utils/loadTranslation";
import { cookies } from "next/headers";

/**
 * 선택된 locale을 기반으로 서버사이드에서 번역 객체를 가져오는 함수
 */
export default async function getTranslation(): Promise<ITranslation> {
  const locale = ((await cookies()).get("lng")?.value || "en") as Locale;
  // locale 기반으로 번역 json을 로드
  const translation = await loadTranslation(locale);
  const t: ITranslation["t"] = (key: keyof Translation) =>
    translation[key] || "";
  // 번역 데이터 반환
  return { t };
}
