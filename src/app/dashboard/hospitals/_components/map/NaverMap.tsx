"use client";

import { useNaverMap } from "./_hooks/use-naver-maps";
import { useMapMarker } from "./_hooks/use-map-marker";

interface NaverMapProps {
  zoom?: number;
  center: { lat: number; lng: number }; // required로 변경
  width?: string;
  height?: string;
  showMarker?: boolean; // 마커 표시 여부 옵션 추가
}

export default function NaverMap({
  zoom = 16,
  center,
  width = "100%",
  height = "100vh",
  showMarker = true,
}: NaverMapProps) {
  // 유효한 좌표인지 확인
  const hasValidCoords =
    center &&
    !isNaN(center.lat) &&
    !isNaN(center.lng) &&
    center.lat !== 0 &&
    center.lng !== 0;

  // 기본 제주시청 좌표
  const mapCenter = hasValidCoords ? center : { lat: 33.49962, lng: 126.53119 };

  const { mapRef, mapInstance, isLoaded, error } = useNaverMap({
    center: mapCenter,
    zoom,
  });

  // 맵이 완전히 로드되고 마커 표시 옵션이 활성화되어 있을 때만 마커 생성
  const userMarker = useMapMarker({
    map: isLoaded && showMarker ? mapInstance : null,
    position: mapCenter,
    title: "내 위치",
    icon: hasValidCoords
      ? {
          content: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: #4285f4;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
          size: { width: 20, height: 20 },
          anchor: { x: 10, y: 10 },
        }
      : undefined,
  });

  if (error) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "20px",
        }}
      >
        <p
          style={{
            color: "#d32f2f",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          오류: {error}
        </p>
        {error.includes("시간 초과") && (
          <p style={{ color: "#666", fontSize: "14px", textAlign: "center" }}>
            네트워크 상태를 확인하거나 페이지를 새로고침해주세요.
          </p>
        )}
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
          <div
            style={{
              marginLeft: "10px",
              width: "20px",
              height: "20px",
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
