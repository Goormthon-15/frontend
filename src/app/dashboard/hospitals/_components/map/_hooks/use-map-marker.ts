"use client";

import { useEffect, useState } from "react";

interface MarkerOptions {
  map: naver.maps.Map | null;
  position: {
    lat: number;
    lng: number;
  };
  icon?: {
    content: string;
    size?: { width: number; height: number };
    anchor?: { x: number; y: number };
  };
  title?: string;
}

export function useMapMarker(options: MarkerOptions) {
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    // 네이버맵이 로드되지 않았거나 맵 인스턴스가 없으면 리턴
    if (
      typeof window === "undefined" ||
      !window.naver?.maps ||
      !options.map ||
      !options.position.lat ||
      !options.position.lng
    ) {
      return;
    }

    // 이전 마커 제거
    if (marker) {
      marker.setMap(null);
    }

    try {
      // 마커 옵션 구성
      const markerOptions: any = {
        position: new naver.maps.LatLng(
          options.position.lat,
          options.position.lng
        ),
        map: options.map,
        title: options.title,
      };

      // 아이콘이 있으면 추가
      if (options.icon) {
        markerOptions.icon = {
          content: options.icon.content,
          size: options.icon.size
            ? new naver.maps.Size(
                options.icon.size.width,
                options.icon.size.height
              )
            : new naver.maps.Size(24, 24),
          anchor: options.icon.anchor
            ? new naver.maps.Point(options.icon.anchor.x, options.icon.anchor.y)
            : new naver.maps.Point(12, 12),
        };
      }

      // 새 마커 생성
      const newMarker = new naver.maps.Marker(markerOptions);

      setMarker(newMarker);

      console.log(
        `마커 생성됨: ${options.position.lat}, ${options.position.lng}`
      );
    } catch (error) {
      console.error("마커 생성 중 오류:", error);
    }

    // 클린업 함수
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [
    options.map,
    options.position.lat,
    options.position.lng,
    options.title,
    options.icon?.content,
  ]);

  return marker;
}
