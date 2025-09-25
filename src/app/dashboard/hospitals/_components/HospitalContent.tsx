"use client";

import { Box, Button, Text, VStack } from "@vapor-ui/core";
import { HospitalMap } from "./map/HospitalMap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HospitalList } from "./list/HospitalList";
import { HospitalFilter } from "./HospitalFilter";
import { FoldOutlineIcon, ListIcon } from "@vapor-ui/icons";
import { useCallback } from "react";

export function HospitalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const pathname = usePathname();

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

  return (
    <>
      <VStack gap={"32px"}>
        <HospitalFilter />

        <Box paddingX={"24px"} paddingBottom={"24px"}>
          {isMapView ? <HospitalMap /> : <HospitalList />}
        </Box>
      </VStack>

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
    </>
  );
}
