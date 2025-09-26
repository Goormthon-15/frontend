import { useTranslation } from "@/app/_components/provider/LocaleProvider";
import { KeyOfTranslation } from "@/libs/i18n/utils/loadTranslation";
import { Button, HStack, Text } from "@vapor-ui/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// 진료과 옵션들 - 모든 키가 번역 파일에 존재함
const DEPARTMENTS_OPTIONS = {
  all: "All" as KeyOfTranslation,
  internal: "Internal" as KeyOfTranslation,
  surgery: "Surgery" as KeyOfTranslation,
  pediatrics: "Pediatrics" as KeyOfTranslation,
  orthopedics: "Orthopedics" as KeyOfTranslation,
  obstetrics: "OB/GYN" as KeyOfTranslation, // 기존 번역 키 재사용
  ent: "ENT" as KeyOfTranslation,
  ophthalmology: "Ophthalmology" as KeyOfTranslation,
  dermatology: "Dermatology" as KeyOfTranslation,
  other: "Other" as KeyOfTranslation,
} as const;

type DepartmentOptions = keyof typeof DEPARTMENTS_OPTIONS;

// 기본 필터 옵션들
const DEFAULT_OPTIONS = {
  newopen: "Now Open" as KeyOfTranslation, // 번역 키
  livechat: "Live Chat Available" as KeyOfTranslation,
  popular: "Popular Hospital" as KeyOfTranslation,
  favorite: "Favorites" as KeyOfTranslation, // 번역 키
};

type DefaultOptions = keyof typeof DEFAULT_OPTIONS;

export function HospitalFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const handleDefaultClick = (option: DefaultOptions) => {
    const params = new URLSearchParams(searchParams.toString());

    // 현재 선택된 옵션들을 가져오기
    const currentOptions =
      params.get("options")?.split(",").filter(Boolean) || [];

    // 옵션이 이미 선택되어 있다면 제거, 없다면 추가
    const optionIndex = currentOptions.indexOf(option);
    if (optionIndex > -1) {
      currentOptions.splice(optionIndex, 1);
    } else {
      currentOptions.push(option);
    }

    // 옵션이 있으면 설정, 없으면 파라미터 제거
    if (currentOptions.length > 0) {
      params.set("options", currentOptions.join(","));
    } else {
      params.delete("options");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // 선택된 옵션인지 확인하는 헬퍼 함수
  const isOptionSelected = (option: DefaultOptions) => {
    const currentOptions =
      searchParams.get("options")?.split(",").filter(Boolean) || [];
    return currentOptions.includes(option);
  };

  return (
    <HStack
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingX={"16px"}
      paddingY={"12px"}
      position={"relative"}
      overflow={"scroll"}
    >
      <HStack gap={"$200"} overflow={"scroll"} width={"80%"}>
        {Object.entries(DEFAULT_OPTIONS).map(([key, translationKey]) => {
          const isSelected = isOptionSelected(key as DefaultOptions);
          return (
            <Button
              key={key}
              variant={isSelected ? "fill" : "outline"}
              color={isSelected ? "primary" : "secondary"}
              size="lg"
              className="rounded-[4px]"
              onClick={() => handleDefaultClick(key as DefaultOptions)}
            >
              <Text
                typography="subtitle1"
                className={
                  isSelected
                    ? "text-[#FDFDFD]"
                    : "text-foreground-secondary-100"
                }
              >
                {t(translationKey)}
              </Text>
            </Button>
          );
        })}
      </HStack>

      <Button
        color={"primary"}
        size="lg"
        className="rounded-[4px] absolute right-0"
      >
        <Text
          typography="subtitle1"
          className="text-foreground-secondary-100 text-[#fdfdfd]"
        >
          {t("Filter")}
        </Text>
      </Button>
    </HStack>
  );
}
