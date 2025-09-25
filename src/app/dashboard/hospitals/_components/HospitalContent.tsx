"use client";

import { VStack } from "@vapor-ui/core";
import { HospitalMap } from "./map/HospitalMap";
import { useSearchParams } from "next/navigation";
import { HospitalList } from "./list/HospitalList";

export function HospitalContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const isMapView = view === "map";

  return (
    <VStack className="p-4!">
      {isMapView ? <HospitalMap /> : <HospitalList />}
    </VStack>
  );
}
