"use client";

import { useLocaleContext } from "@/app/_components/provider/LocaleProvider";
import { TRANSLATOR_SELECT_LIST } from "@/app/_constants/locale.constants";
import { Locale } from "@/libs/i18n";
import { useTranslationStore } from "@/store/i18n/i18nStore";
import { setCookie } from "@/utils/cookies";
import { getServerSideCookie } from "@/utils/server/cookies";
import { IconButton, Select } from "@vapor-ui/core";
import { ImageToContainerIcon, TranslateOutlineIcon } from "@vapor-ui/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TranslatorSelectBox() {
  const { setLocale, locale } = useTranslationStore();
  const { serverLocale } = useLocaleContext();

  const router = useRouter();
  const pathname = usePathname();

  const [currentLocale, setCurrentLocale] = useState<string>(
    serverLocale || TRANSLATOR_SELECT_LIST[0].value
  );

  // 언어 선택 list의 item을 찾는 함수
  function findLocaleSelectItem(locale: Locale) {
    const findLocale = TRANSLATOR_SELECT_LIST.find(
      (val) => val.value === locale
    );
    console.log("findLocale", findLocale);
    return findLocale;
  }

  // 변경된 locale을 쿠키와 전역상태에 저장 후 브라우저 자체 title도 변경시키기 위해 refresh
  async function changeTranslate(selectLocale: string) {
    const serverCookie = await getServerSideCookie("lng");
    // 변경되지 않았다면 라우팅시키지 않음
    if (selectLocale === serverCookie) return;
    // 변경되었다면 쿠키세팅 및 라우팅
    setCookie("lng", selectLocale);
    setLocale(selectLocale as Locale);
    setCurrentLocale(selectLocale); // 즉시 상태 업데이트
    router.replace(pathname, { scroll: false });
  }

  // client locale 변경 시 실행되어 화면단 state를 변경시킴
  async function handleCurrentLocale(locale: string) {
    const findLocale = findLocaleSelectItem(locale as Locale);
    setCurrentLocale(findLocale?.label ?? TRANSLATOR_SELECT_LIST[0].label);
  }

  // locale state가 변경될 때 현재 선택된 locale을 보여주기 위함
  useEffect(() => {
    setCurrentLocale(locale);
    console.log("locale", locale);
  }, [locale]);

  return (
    <Select.Root placeholder="" value={currentLocale}>
      <Select.Trigger
        className={
          "outline-none border-none hover:bg-transparent p-0 rounded-full"
        }
      >
        {/* <Select.Value>
          {findLocaleSelectItem(currentLocale as Locale)?.label ||
            TRANSLATOR_SELECT_LIST[0].label}
        </Select.Value>
        <Select.TriggerIcon /> */}
        <IconButton
          variant="ghost"
          size="lg"
          aria-label="language"
          onClick={() => changeTranslate(currentLocale)}
          className="text-white rounded-full bg-black outline-none border-none"
        >
          <TranslateOutlineIcon size={"24px"} />
        </IconButton>
      </Select.Trigger>

      <Select.Content className={"-translate-x-40 translate-y-2"}>
        <Select.Group>
          {TRANSLATOR_SELECT_LIST.map((locale) => (
            <Select.Item
              key={locale.value}
              value={locale.value}
              onClick={() => changeTranslate(locale.value)}
            >
              {locale.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
