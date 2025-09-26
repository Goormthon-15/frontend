"use client";

import { Box, Button, Text, VStack } from "@vapor-ui/core";
import { HospitalMap } from "./map/HospitalMap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HospitalList } from "./list/HospitalList";
import { HospitalFilter } from "./HospitalFilter";
import { FoldOutlineIcon, ListIcon } from "@vapor-ui/icons";
import { useCallback, useMemo } from "react";
import { jejuHospitals, seogwipoHospitals } from "../_mock/kor_mock";

export function HospitalContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const isMapView = view === "map";

  const updateSearchParam = useCallback(
    (
      key: string,
      value: string | null,
      additionalParams?: Record<string, string>
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // 추가 파라미터가 있다면 함께 설정
      if (additionalParams) {
        Object.entries(additionalParams).forEach(([k, v]) => {
          params.set(k, v);
        });
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleViewChange = () => {
    if (isMapView) {
      // 지도 -> 목록: view를 list로 변경하고 zoom 파라미터 제거
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", "list");
      params.delete("zoom"); // 목록 보기에서는 zoom 불필요
      router.push(`${pathname}?${params.toString()}`);
    } else {
      // 목록 -> 지도: view를 map으로 변경하고 기본 zoom 추가
      updateSearchParam("view", "map", { zoom: "16" });
    }
  };

  // 필터링된 데이터를 계산하는 로직 수정
  const filteredData = useMemo(() => {
    console.log(
      "🔍 필터링 시작 - searchParams:",
      Object.fromEntries(searchParams.entries())
    );

    let filtered = [...jejuHospitals, ...seogwipoHospitals];
    console.log("📊 초기 데이터 개수:", filtered.length);

    // location 파라미터 필터링
    const location = searchParams.get("location");
    if (location) {
      const decodedLocation = decodeURIComponent(location);
      console.log("📍 위치 필터링:", decodedLocation);

      if (decodedLocation.includes("제주시")) {
        filtered = filtered.filter(
          (hospital) => hospital.address2 === "제주시"
        );
        console.log("📍 제주시 필터링 후:", filtered.length);
      } else if (decodedLocation.includes("서귀포")) {
        filtered = filtered.filter(
          (hospital) => hospital.address2 === "서귀포시"
        );
        console.log("📍 서귀포시 필터링 후:", filtered.length);
      }
    }

    // options 파라미터 필터링
    const options = searchParams.get("options");
    if (options) {
      const optionList = options.split(",").filter(Boolean);
      console.log("⚙️ 옵션 필터링:", optionList);

      // newopen: 현재 진료 중인 병원만
      if (optionList.includes("newopen")) {
        const beforeCount = filtered.length;
        filtered = filtered.filter(
          (hospital) => hospital.isCurrentlyOpen === true
        );
        console.log(
          `🟢 현재 진료 중 필터링: ${beforeCount} → ${filtered.length}`
        );
      }

      // popular: 인기 병원만
      if (optionList.includes("popular")) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((hospital) => hospital.isPopular === true);
        console.log(`⭐ 인기 병원 필터링: ${beforeCount} → ${filtered.length}`);
      }

      // favorite: 즐겨찾기 병원만
      if (optionList.includes("favorite")) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((hospital) => hospital.isFavorite === true);
        console.log(`💖 즐겨찾기 필터링: ${beforeCount} → ${filtered.length}`);
      }

      // livechat: 현재는 임시로 인기 병원으로 처리 (향후 데이터 필드 추가 시 수정)
      if (optionList.includes("livechat")) {
        const beforeCount = filtered.length;
        // 임시: 인기 병원을 라이브 채팅 가능 병원으로 간주
        filtered = filtered.filter((hospital) => hospital.isPopular === true);
        console.log(
          `💬 라이브채팅 필터링 (임시): ${beforeCount} → ${filtered.length}`
        );
      }
    }

    console.log("✅ 최종 필터링 결과:", filtered.length);
    return filtered;
  }, [searchParams]);

  return (
    <>
      <VStack gap={"32px"} backgroundColor={"$gray-050"}>
        <HospitalFilter />

        {isMapView ? (
          <HospitalMap data={filteredData} />
        ) : (
          <Box paddingX={"24px"} paddingBottom={"24px"}>
            <HospitalList data={filteredData} />
          </Box>
        )}

        <Button
          size="xl"
          className="fixed bottom-[48px] left-1/2 -translate-x-1/2 rounded-full"
          onClick={handleViewChange}
        >
          {isMapView ? (
            <FoldOutlineIcon size={"24px"} />
          ) : (
            <ListIcon size={"24px"} />
          )}
          <Text className="text-[#FDFDFD]">
            {isMapView ? "목록 보기" : "지도 보기"}
          </Text>
        </Button>
      </VStack>
    </>
  );
}
