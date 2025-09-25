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

  // 기존 search params를 유지하면서 새로운 파라미터 추가/업데이트하는 함수
  const updateSearchParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleDefaultClick = (option: DefaultOptions) => {
    // 기존 search params를 유지하면서 default 파라미터만 업데이트
    updateSearchParams("default", option);
  };

  return (
    <HStack
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingX={"16px"}
      paddingY={"12px"}
    >
      <HStack gap={"$200"}>
        {Object.values(DEFAULT_OPTIONS).map((option) => (
          <Button
            key={option}
            variant="outline"
            color={"primary"}
            size="lg"
            className="rounded-[4px]"
            onClick={() => handleDefaultClick(option)}
          >
            <Text
              typography="subtitle1"
              className="text-foreground-secondary-100"
            >
              {DEFAULT_OPTIONS_LABELS[option]}
            </Text>
          </Button>
        ))}
      </HStack>

      <Button color={"primary"} size="lg" className="rounded-[4px]">
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
