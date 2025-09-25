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
import { useEffect, useState } from "react";

const JEJU_LOCATIONS = {
  DEFAULT: "내 주변",

  제주시: {
    구제주: "구제주",
    신제주: "신제주",
    애월: "애월",
    한림: "한림",
    한경: "한경",
    조천: "조천",
    구좌: "구좌",
  },

  서귀포시: {
    서귀포_시내: "서귀포 시내",
    대정: "대정",
    안덕: "안덕",
    중문: "중문",
    남원: "남원",
    표선: "표선",
    성산: "성산",
  },
};

// 모든 location 값들을 평탄화하여 유효성 검사에 사용
const getAllLocationValues = () => {
  const values = [JEJU_LOCATIONS.DEFAULT];

  Object.values(JEJU_LOCATIONS.제주시).forEach((city) => values.push(city));
  Object.values(JEJU_LOCATIONS.서귀포시).forEach((city) => values.push(city));

  return values;
};

const VALID_LOCATIONS = getAllLocationValues();

export function DashboardHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [location, setLocation] = useState(JEJU_LOCATIONS.DEFAULT);
  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);

  // URL에서 location 파라미터 읽기 및 유효성 검사
  useEffect(() => {
    const urlLocation = searchParams.get("location");

    if (urlLocation && VALID_LOCATIONS.includes(urlLocation)) {
      setLocation(urlLocation);
    } else {
      setLocation(JEJU_LOCATIONS.DEFAULT);

      // URL에 잘못된 location이 있거나 없는 경우 기본값으로 업데이트
      if (urlLocation && !VALID_LOCATIONS.includes(urlLocation)) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("location", JEJU_LOCATIONS.DEFAULT);
        router.replace(`?${params.toString()}`);
      }
    }
  }, [searchParams, router]);

  // location 변경 시 URL 업데이트
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);

    const params = new URLSearchParams(searchParams.toString());
    params.set("location", newLocation);
    router.push(`?${params.toString()}`);

    // overlay 닫기
    setIsLocationOverlayOpen(false);
  };

  return (
    <>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={"$gray-050"}
        paddingX={"16px"}
        paddingY={"12px"}
        className="border-b border-[#E1E1E1]"
      >
        <Button
          variant="ghost"
          className="text-black"
          onClick={() => setIsLocationOverlayOpen(true)}
        >
          <FoldOutlineIcon size={"24"} />
          <Text typography="heading6">{location}</Text>
          <ChevronDownOutlineIcon size={"16"} />
        </Button>

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
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content
        className={`w-[430px]! h-[932px]! m-0 rounded-none bg-white shadow-none flex flex-col`}
      >
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
            주소 변경하기
          </Text>
        </Dialog.Header>

        {/* 바디 - 지역 선택 내용 */}
        <Dialog.Body className="flex-1 p-4 overflow-y-auto bg-gray-50 max-h-screen! grow!">
          <VStack alignItems="stretch" className="h-full">
            {/* 여기에 지역 선택 섹션들이 들어갑니다 */}

            {/* 현재 위치 기반 섹션 */}
            <LocationSection title="현재 위치 기반">
              <LocationButton
                location={JEJU_LOCATIONS.DEFAULT}
                isSelected={currentLocation === JEJU_LOCATIONS.DEFAULT}
                onSelect={onLocationSelect}
              />
            </LocationSection>

            {/* 제주시 섹션 */}
            <LocationSection title="제주시">
              <HStack alignItems="stretch" className="gap-2">
                {Object.values(JEJU_LOCATIONS.제주시).map((city) => (
                  <LocationButton
                    key={city}
                    location={city}
                    isSelected={currentLocation === city}
                    onSelect={onLocationSelect}
                  />
                ))}
              </HStack>
            </LocationSection>

            {/* 서귀포시 섹션 */}
            <LocationSection title="서귀포시">
              <HStack alignItems="stretch" className="gap-2">
                {Object.values(JEJU_LOCATIONS.서귀포시).map((city) => (
                  <LocationButton
                    key={city}
                    location={city}
                    isSelected={currentLocation === city}
                    onSelect={onLocationSelect}
                  />
                ))}
              </HStack>
            </LocationSection>

            {/* 하단 여백 추가 */}
            <div className="h-20" />
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
    <VStack
      alignItems="stretch"
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
    >
      <Text typography="heading6" className="font-semibold text-gray-800">
        {title}
      </Text>
      {children}
    </VStack>
  );
}

// 지역 버튼 컴포넌트
interface LocationButtonProps {
  location: string;
  isSelected: boolean;
  onSelect: (location: string) => void;
}

function LocationButton({
  location,
  isSelected,
  onSelect,
}: LocationButtonProps) {
  return (
    <Button
      size="lg"
      variant={isSelected ? "fill" : "outline"}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all
        ${
          isSelected
            ? "bg-primary-500 text-white border-primary-500 shadow-md"
            : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:text-blue-600"
        }
      `}
      onClick={() => onSelect(location)}
    >
      {location}
    </Button>
  );
}

// 상수 export
export { JEJU_LOCATIONS, VALID_LOCATIONS };
