"use client";

import { useNaverMap } from "./_hooks/use-naver-maps";
import { useMapMarker } from "./_hooks/use-map-marker";
import { IHospital } from "../../_mock/kor_mock";
import { useEffect } from "react";

// SVG 마커 문자열 정의
const MARKER_SVGS = {
  marker1: `<svg width="32" height="48" viewBox="0 0 89 134" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_31210_5098)">
      <path d="M44.1821 0C74.7895 0 90.2895 28.5 88.2895 46.867C85.9506 68.3468 77.2895 73 44.2895 133.5C11.7896 73 3.28956 70.5 0.289517 46.867C-2.72666 23.107 18.2306 0 44.1821 0Z" fill="#106C6C"/>
      <path d="M43.7896 74C60.6342 74 74.2895 60.3447 74.2895 43.5C74.2895 26.6553 60.6342 13 43.7896 13C26.9449 13 13.2896 26.6553 13.2896 43.5C13.2896 60.3447 26.9449 74 43.7896 74Z" fill="#FDFDFD"/>
      <path d="M43.9999 61L26.6794 31H61.3204L43.9999 61Z" fill="#106C6C"/>
    </g>
    <defs>
      <clipPath id="clip0_31210_5098">
        <rect width="89" height="134" fill="white"/>
      </clipPath>
    </defs>
  </svg>`,

  marker2: `<svg width="32" height="48" viewBox="0 0 89 134" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_31210_5106)">
      <path d="M44.1821 0C74.7895 0 90.2895 28.5 88.2895 46.867C85.9506 68.3468 77.2895 73 44.2895 133.5C11.7896 73 3.28956 70.5 0.289517 46.867C-2.72666 23.107 18.2306 0 44.1821 0Z" fill="#B12932"/>
      <path d="M43.7896 74C60.6342 74 74.2895 60.3447 74.2895 43.5C74.2895 26.6553 60.6342 13 43.7896 13C26.9449 13 13.2896 26.6553 13.2896 43.5C13.2896 60.3447 26.9449 74 43.7896 74Z" fill="#FDFDFD"/>
      <path d="M43.7896 19L49.1011 35.0426H66.2895L52.3838 44.9574L57.6953 61L43.7896 51.0851L29.8838 61L35.1953 44.9574L21.2896 35.0426H38.478L43.7896 19Z" fill="#B12932"/>
    </g>
    <defs>
      <clipPath id="clip0_31210_5106">
        <rect width="89" height="134" fill="white"/>
      </clipPath>
    </defs>
  </svg>`,

  marker3: `<svg width="32" height="48" viewBox="0 0 89 134" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_31210_6612)">
      <path d="M44.1821 0C74.7895 0 90.2895 28.5 88.2895 46.867C85.9506 68.3468 77.2895 73 44.2895 133.5C11.7896 73 3.28956 70.5 0.289517 46.867C-2.72666 23.107 18.2306 0 44.1821 0Z" fill="#FBBD06"/>
      <path d="M43.7896 74C60.6342 74 74.2895 60.3447 74.2895 43.5C74.2895 26.6553 60.6342 13 43.7896 13C26.9449 13 13.2896 26.6553 13.2896 43.5C13.2896 60.3447 26.9449 74 43.7896 74Z" fill="#FDFDFD"/>
      <path d="M43.9999 61L26.6794 31H61.3204L43.9999 61Z" fill="#FBBD06"/>
    </g>
    <defs>
      <clipPath id="clip0_31210_6612">
        <rect width="89" height="134" fill="white"/>
      </clipPath>
    </defs>
  </svg>`,
};

interface NaverMapProps {
  zoom?: number;
  center: { lat: number; lng: number }; // required로 변경
  width?: string;
  height?: string;
  showMarker?: boolean; // 마커 표시 여부 옵션 추가
  hospitalData?: IHospital[];
  onMarkerClick?: (hospital: IHospital) => void;
}

export default function NaverMap({
  zoom = 16,
  center,
  width = "100%",
  height = "100vh",
  showMarker = true,
  hospitalData = [],
  onMarkerClick,
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

  // 병원 마커들 생성
  useEffect(() => {
    if (!mapInstance || !isLoaded || !hospitalData.length) return;

    const markers: naver.maps.Marker[] = [];

    hospitalData.forEach((hospital) => {
      let markerSvg;

      // 마커 타입 결정 (우선순위: isFavorite > isPopular > default)
      if (hospital.isFavorite) {
        markerSvg = MARKER_SVGS.marker3;
      } else if (hospital.isPopular) {
        markerSvg = MARKER_SVGS.marker2;
      } else {
        markerSvg = MARKER_SVGS.marker1;
      }

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(hospital.latitude, hospital.longitude),
        map: mapInstance,
        title: hospital.name,
        icon: {
          content: markerSvg,
          size: new naver.maps.Size(32, 48),
          anchor: new naver.maps.Point(16, 48), // 마커 하단 중앙을 기준점으로
        },
      });

      naver.maps.Event.addListener(marker, "click", () => {
        console.log(hospital);
        onMarkerClick?.(hospital);
      });

      markers.push(marker);
    });

    // 클린업 함수
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [mapInstance, isLoaded, hospitalData, onMarkerClick]);

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
