"use client";

import { useTranslation } from "@/app/_components/provider/LocaleProvider";
import TranslatorSelectBox from "@/app/_components/TranslatorSelectBox";

export default function Translator() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Translator</h1>
      <h1>{t("Hello")}</h1>
      <h1>{t("World")}</h1>
      <TranslatorSelectBox />
    </div>
  );
}
