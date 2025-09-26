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
import MyPageStackPage from "@/app/_components/mock/MyPageStackPage";

const JEJU_LOCATIONS = {
  DEFAULT: "내 주변",

  제주시: {
    제주시_전체: "제주시 전체",
    구제주: "구제주",
    신제주: "신제주",
    애월: "애월",
    한림: "한림",
    한경: "한경",
    조천: "조천",
    구좌: "구좌",
  },

  서귀포시: {
    서귀포_전체: "서귀포 전체",
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

  const [isMyPageStackPageOpen, setIsMyPageStackPageOpen] = useState(false);

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
            <Text typography="heading6">{location}</Text>
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
              onClick={() => setIsMyPageStackPageOpen(true)}
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
      <MyPageStackPage
        isOpen={isMyPageStackPageOpen}
        onClose={() => setIsMyPageStackPageOpen(false)}
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
      <Dialog.Content className={`w-[432px]! h-[932px]! m-0 rounded-none`}>
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
            Change Address
          </Text>
        </Dialog.Header>

        {/* 바디 - 지역 선택 내용 */}
        <Dialog.Body className="flex-1 p-6 overflow-y-auto bg-gray-50 max-h-screen! grow!">
          <VStack>
            {/* 현재 위치 기반 섹션 */}
            <LocationSection title="Current Location">
              <LocationButton
                location={JEJU_LOCATIONS.DEFAULT}
                isSelected={currentLocation === JEJU_LOCATIONS.DEFAULT}
                onSelect={onLocationSelect}
              />
            </LocationSection>

            {/* 제주시 섹션 */}
            <LocationSection title="제주시">
              {Object.values(JEJU_LOCATIONS.제주시).map((city) => (
                <LocationButton
                  key={city}
                  location={city}
                  isSelected={currentLocation === city}
                  onSelect={onLocationSelect}
                />
              ))}
            </LocationSection>

            {/* 서귀포시 섹션 */}
            <LocationSection title="서귀포시">
              {Object.values(JEJU_LOCATIONS.서귀포시).map((city) => (
                <LocationButton
                  key={city}
                  location={city}
                  isSelected={currentLocation === city}
                  onSelect={onLocationSelect}
                />
              ))}
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
      variant={"outline"}
      onClick={() => onSelect(location)}
      className={!isSelected ? "bg-white border-[#E1E1E1]" : ""}
    >
      <Text typography="subtitle1">{location}</Text>
    </Button>
  );
}

// 상수 export
export { JEJU_LOCATIONS, VALID_LOCATIONS };
