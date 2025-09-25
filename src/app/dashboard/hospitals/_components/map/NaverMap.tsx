"use client";

import { useNaverMap } from "./_hooks/use-naver-maps";
import { useEffect, useState } from "react";
import { useGeolocation } from "react-simplikit";

interface NaverMapProps {
  zoom?: number;
  width?: string;
  height?: string;
}

// 제주시청 좌표
const JEJU_CITY_CENTER = { lat: 33.49962, lng: 126.53119 };
const ZOOM = 16;

export default function NaverMap({
  zoom = ZOOM,
  width = "100%",
  height = "100vh",
}: NaverMapProps) {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    JEJU_CITY_CENTER
  );

  const { mapRef, isLoaded, error } = useNaverMap({ center, zoom });
  const {
    getCurrentPosition,
    loading,
    error: locationError,
    data,
  } = useGeolocation({
    mountBehavior: "get",
  });

  useEffect(() => {
    setCenter((prev) => ({
      lat: data?.latitude ?? prev.lat,
      lng: data?.longitude ?? prev.lng,
    }));
  }, [data]);

  if (error) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <p style={{ color: "#d32f2f", textAlign: "center" }}>오류: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width, height }}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: isLoaded ? "transparent" : "#f5f5f5",
        }}
      />
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(245, 245, 245, 0.8)",
            zIndex: 1,
          }}
        >
          <p>지도를 로딩 중입니다...</p>
        </div>
      )}
    </div>
  );
}
