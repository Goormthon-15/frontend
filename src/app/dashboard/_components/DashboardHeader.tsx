"use client";

import TranslatorSelectBox from "@/app/_components/TranslatorSelectBox";
import {
  Button,
  HStack,
  Text,
  IconButton,
  Dialog,
  VStack,
} from "@vapor-ui/core";
import {
  ChevronDownOutlineIcon,
  FoldOutlineIcon,
  HomeOutlineIcon,
  ChevronLeftOutlineIcon,
} from "@vapor-ui/icons";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { jejuHospitals, seogwipoHospitals } from "../hospitals/_mock/kor_mock";
import { KeyOfTranslation } from "@/libs/i18n/utils/loadTranslation";
import { useTranslation } from "../../_components/provider/LocaleProvider";

const JEJU_LOCATIONS = {
  DEFAULT: "Around Me" as KeyOfTranslation,

  제주시: {
    제주시_전체: "Jeju City All" as KeyOfTranslation, // 고유한 번역 키
    구제주: "Gu-Jeju" as KeyOfTranslation,
    신제주: "Shin-Jeju" as KeyOfTranslation,
    애월: "Aewol" as KeyOfTranslation,
    한림: "Hallim" as KeyOfTranslation,
    한경: "Hangyeong" as KeyOfTranslation,
    조천: "Jocheon" as KeyOfTranslation,
    구좌: "Gujwa" as KeyOfTranslation,
  },

  서귀포시: {
    서귀포_전체: "Seogwipo City All" as KeyOfTranslation, // 고유한 번역 키
    서귀포_시내: "Seogwipo Downtown" as KeyOfTranslation,
    대정: "Daejeong" as KeyOfTranslation,
    안덕: "Andeok" as KeyOfTranslation,
    중문: "Jungmun" as KeyOfTranslation,
    남원: "Namwon" as KeyOfTranslation,
    표선: "Pyoseon" as KeyOfTranslation,
    성산: "Seongsan" as KeyOfTranslation,
  },
};

// 모든 location 값들을 평탄화하여 유효성 검사에 사용
const getAllLocationKeys = () => {
  const keys = [JEJU_LOCATIONS.DEFAULT];

  // 실제 키값들을 수집 (Object.keys 사용)
  Object.keys(JEJU_LOCATIONS.제주시).forEach((key) =>
    keys.push(key as KeyOfTranslation)
  );
  Object.keys(JEJU_LOCATIONS.서귀포시).forEach((key) =>
    keys.push(key as KeyOfTranslation)
  );

  return keys;
};

const VALID_LOCATIONS = getAllLocationKeys();

// 키값에서 번역 키를 찾는 헬퍼 함수 추가
const getTranslationKeyFromLocationKey = (
  locationKey: string
): KeyOfTranslation => {
  if (locationKey === JEJU_LOCATIONS.DEFAULT) {
    return JEJU_LOCATIONS.DEFAULT;
  }

  // 제주시 키들 확인
  const jejuKey = Object.entries(JEJU_LOCATIONS.제주시).find(
    ([key]) => key === locationKey
  );
  if (jejuKey) {
    return jejuKey[1];
  }

  // 서귀포시 키들 확인
  const seogwipoKey = Object.entries(JEJU_LOCATIONS.서귀포시).find(
    ([key]) => key === locationKey
  );
  if (seogwipoKey) {
    return seogwipoKey[1];
  }

  // 기본값
  return JEJU_LOCATIONS.DEFAULT;
};

export function DashboardHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const [location, setLocation] = useState(JEJU_LOCATIONS.DEFAULT);
  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);

  // 지역명을 언어별로 표시하는 함수 (수정됨)
  const getLocationDisplay = (locationKey: string) => {
    const translationKey = getTranslationKeyFromLocationKey(locationKey);
    return t(translationKey);
  };

  // 병원 상세 페이지인지 확인하는 함수
  const isHospitalDetailPage = (path: string) => {
    const hospitalDetailPattern = /^\/dashboard\/hospitals\/\d+$/;
    return hospitalDetailPattern.test(path);
  };

  // 현재 페이지의 병원 정보 가져오기
  const currentHospital = useMemo(() => {
    if (!isHospitalDetailPage(pathname)) return null;

    // URL에서 병원 ID 추출
    const hospitalId = pathname.split("/")[3];
    const id = parseInt(hospitalId);

    // 모든 병원 데이터에서 해당 ID의 병원 찾기
    const allHospitals = [...jejuHospitals, ...seogwipoHospitals];
    return allHospitals.find((hospital) => hospital.id === id) || null;
  }, [pathname]);

  // URL에서 location 파라미터 읽기 및 유효성 검사 (수정됨)
  useEffect(() => {
    const urlLocation = searchParams.get("location");

    console.log("🔍 URL에서 받은 location:", urlLocation);
    console.log("✅ 유효한 location 키들:", VALID_LOCATIONS);

    if (
      urlLocation &&
      VALID_LOCATIONS.includes(urlLocation as KeyOfTranslation)
    ) {
      setLocation(urlLocation as KeyOfTranslation);
      console.log("✅ 유효한 location 설정:", urlLocation);
    } else {
      setLocation(JEJU_LOCATIONS.DEFAULT);
      console.log("❌ 무효한 location, 기본값 설정:", JEJU_LOCATIONS.DEFAULT);

      // URL에 잘못된 location이 있거나 없는 경우 기본값으로 업데이트
      if (
        urlLocation &&
        !VALID_LOCATIONS.includes(urlLocation as KeyOfTranslation)
      ) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("location", JEJU_LOCATIONS.DEFAULT);
        router.replace(`?${params.toString()}`);
      }
    }
  }, [searchParams, router]);

  // location 변경 시 URL 업데이트 (수정됨)
  const handleLocationChange = (newLocationKey: string) => {
    console.log("🔄 지역 변경 요청:", newLocationKey);
    setLocation(newLocationKey as KeyOfTranslation);

    const params = new URLSearchParams(searchParams.toString());
    params.set("location", newLocationKey);
    router.push(`?${params.toString()}`);

    console.log("✅ URL 업데이트 완료:", `?${params.toString()}`);

    // overlay 닫기
    setIsLocationOverlayOpen(false);
  };

  return (
    <>
      <HStack
        justifyContent={pathname !== "/dashboard" ? "space-between" : "end"}
        alignItems="center"
        backgroundColor={"$gray-050"}
        paddingX={"16px"}
        paddingY={"12px"}
        className="border-b border-[#E1E1E1]"
      >
        {pathname !== "/dashboard" ? (
          <IconButton
            aria-label="back"
            onClick={() => router.push("/dashboard")}
            variant="ghost"
          >
            <ChevronLeftOutlineIcon size={"24"} color="black" />
          </IconButton>
        ) : null}

        {/* 병원 상세 페이지가 아닐 때만 지역 선택 버튼 표시 */}
        {/* 일반 페이지에서는 지역 선택 버튼 표시 */}
        {!isHospitalDetailPage(pathname) && (
          <Button
            variant="ghost"
            onClick={() => setIsLocationOverlayOpen(true)}
            className={"absolute left-1/2 -translate-x-1/2 text-black"}
          >
            <FoldOutlineIcon size={"24"} />
            <Text typography="heading6">{getLocationDisplay(location)}</Text>
            <ChevronDownOutlineIcon size={"16"} />
          </Button>
        )}

        {/* 병원 상세 페이지에서는 병원 이름 표시 */}
        {isHospitalDetailPage(pathname) && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Text typography="heading6" className="text-black">
              {currentHospital
                ? currentHospital.name
                : "병원 정보를 찾을 수 없습니다"}
            </Text>
          </div>
        )}

        {pathname === "/dashboard" ? (
          <HStack alignItems="center" gap={"8px"}>
            <TranslatorSelectBox />

            <IconButton
              size="lg"
              variant="fill"
              aria-label="home"
              onClick={() => router.push("/dashboard")}
              className="text-white rounded-full flex items-center justify-center"
            >
              <Text
                typography="heading6"
                className="text-white flex items-center justify-center"
              >
                MY
              </Text>
            </IconButton>
          </HStack>
        ) : (
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="home"
            onClick={() => router.push("/dashboard")}
          >
            <HomeOutlineIcon size={"24"} color="black" />
          </IconButton>
        )}
      </HStack>

      {/* 지역 선택 오버레이 */}
      <LocationOverlay
        isOpen={isLocationOverlayOpen}
        onClose={() => setIsLocationOverlayOpen(false)}
        onLocationSelect={handleLocationChange}
        currentLocation={location}
      />
    </>
  );
}

// 지역 선택 오버레이 컴포넌트
interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

function LocationOverlay({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
}: LocationOverlayProps) {
  const { t } = useTranslation();

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content className={`w-[430px]! h-[932px]! m-0 rounded-none`}>
        <Dialog.Header className="flex items-center justify-between min-h-[64px] px-4 py-3 relative bg-gray-50 border-b border-[#E1E1E1]">
          <IconButton
            variant="ghost"
            size="lg"
            onClick={onClose}
            aria-label="뒤로가기"
            className="text-black p-2"
          >
            <ChevronLeftOutlineIcon size="24" color="black" />
          </IconButton>
          <Text
            typography="heading6"
            className="absolute left-1/2 -translate-x-1/2"
          >
            {t("Change Address")}
          </Text>
        </Dialog.Header>

        {/* 바디 - 지역 선택 내용 */}
        <Dialog.Body className="flex-1 p-6 overflow-y-auto bg-gray-50 max-h-screen! grow!">
          <VStack>
            {/* 현재 위치 기반 섹션 */}
            <LocationSection title={t("Current Location")}>
              <LocationButton
                locationKey={JEJU_LOCATIONS.DEFAULT}
                translationKey={JEJU_LOCATIONS.DEFAULT}
                isSelected={currentLocation === JEJU_LOCATIONS.DEFAULT}
                onSelect={onLocationSelect}
              />
            </LocationSection>

            {/* 제주시 섹션 */}
            <LocationSection title={t("Jeju City")}>
              {Object.entries(JEJU_LOCATIONS.제주시).map(
                ([key, translationKey]) => (
                  <LocationButton
                    key={key}
                    locationKey={key as KeyOfTranslation}
                    translationKey={translationKey}
                    isSelected={currentLocation === key}
                    onSelect={onLocationSelect}
                  />
                )
              )}
            </LocationSection>

            {/* 서귀포시 섹션 */}
            <LocationSection title={t("Seogwipo City")}>
              {Object.entries(JEJU_LOCATIONS.서귀포시).map(
                ([key, translationKey]) => (
                  <LocationButton
                    key={key}
                    locationKey={key as KeyOfTranslation}
                    translationKey={translationKey}
                    isSelected={currentLocation === key}
                    onSelect={onLocationSelect}
                  />
                )
              )}
            </LocationSection>
          </VStack>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function LocationSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <VStack paddingX={"16px"} paddingY={"12px"} gap={"24px"}>
      <Text typography="heading5">{title}</Text>
      {children}
    </VStack>
  );
}

// 지역 버튼 컴포넌트
// LocationButton 수정
interface LocationButtonProps {
  locationKey: string;
  translationKey: KeyOfTranslation;
  isSelected: boolean;
  onSelect: (location: string) => void;
}

function LocationButton({
  locationKey,
  translationKey,
  isSelected,
  onSelect,
}: LocationButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="lg"
      variant={"outline"}
      onClick={() => onSelect(locationKey)} // 실제 키값 전달
      className={!isSelected ? "bg-white border-[#E1E1E1]" : ""}
    >
      <Text typography="subtitle1">{t(translationKey)}</Text>{" "}
      {/* 번역키로 렌더링 */}
    </Button>
  );
}

// 상수 export
export { JEJU_LOCATIONS, VALID_LOCATIONS };
