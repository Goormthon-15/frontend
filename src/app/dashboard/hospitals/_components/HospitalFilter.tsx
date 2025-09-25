import { Button, HStack, Text } from "@vapor-ui/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const DEPARTMENTS_OPTIONS = {
  all: "all",
  internal: "internal",
  surgery: "surgery",
  pediatrics: "pediatrics",
  orthopedics: "orthopedics",
  obstetrics: "obstetrics",
  ent: "ent",
  ophthalmology: "ophthalmology",
  dermatology: "dermatology",
  other: "other",
} as const;
type DepartmentOptions =
  (typeof DEPARTMENTS_OPTIONS)[keyof typeof DEPARTMENTS_OPTIONS];
const DEPARTMENTS_OPTIONS_LABELS: Record<DepartmentOptions, string> = {
  all: "전체",
  internal: "내과",
  surgery: "외과",
  pediatrics: "소아청소년과",
  orthopedics: "정형외과",
  obstetrics: "산부인과",
  ent: "이비인후과",
  ophthalmology: "안과",
  dermatology: "피부과",
  other: "기타",
} as const;

const DEFAULT_OPTIONS = {
  newopen: "newopen",
  livechat: "livechat",
  popular: "popular",
  favorite: "favorite",
} as const;
type DefaultOptions = (typeof DEFAULT_OPTIONS)[keyof typeof DEFAULT_OPTIONS];
const DEFAULT_OPTIONS_LABELS: Record<DefaultOptions, string> = {
  newopen: "진료 중",
  livechat: "채팅 가능",
  popular: "인기 병원",
  favorite: "즐겨찾기",
} as const;

export function HospitalFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
        {Object.values(DEFAULT_OPTIONS).map((option) => {
          const isSelected = isOptionSelected(option);
          return (
            <Button
              key={option}
              variant={isSelected ? "fill" : "outline"}
              color={isSelected ? "primary" : "secondary"}
              size="lg"
              className="rounded-[4px]"
              onClick={() => handleDefaultClick(option)}
            >
              <Text
                typography="subtitle1"
                className={
                  isSelected
                    ? "text-[#FDFDFD]"
                    : "text-foreground-secondary-100"
                }
              >
                {DEFAULT_OPTIONS_LABELS[option]}
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
          필터
        </Text>
      </Button>
    </HStack>
  );
}
