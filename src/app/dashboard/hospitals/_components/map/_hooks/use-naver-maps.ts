"use client";

import { useEffect, useRef, useState } from "react";

interface NaverMapOptions {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

interface UseNaverMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  mapInstance: naver.maps.Map | null; // 맵 인스턴스 추가
  isLoaded: boolean;
  error: string | null;
}

export function useNaverMap(options: NaverMapOptions): UseNaverMapReturn {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 네이버 맵 스크립트가 로드될 때까지 대기
    const checkNaverMaps = () => {
      if (typeof window !== "undefined" && window.naver && window.naver.maps) {
        return true;
      }
      return false;
    };

    const initializeMap = () => {
      try {
        if (!mapRef.current) {
          setError("맵 컨테이너 요소를 찾을 수 없습니다.");
          return;
        }

        if (!checkNaverMaps()) {
          setError("네이버 맵 라이브러리가 로드되지 않았습니다.");
          return;
        }

        // 맵 옵션 설정
        const mapOptions = {
          center: new naver.maps.LatLng(options.center.lat, options.center.lng),
          zoom: options.zoom,
        };

        // 맵 생성
        const map = new naver.maps.Map(mapRef.current, mapOptions);

        // 맵 인스턴스 저장
        setMapInstance(map);
        setIsLoaded(true);
        setError(null);

        console.log("네이버 맵이 성공적으로 초기화되었습니다.");
      } catch (err) {
        setError(`맵 초기화 중 오류 발생: ${err}`);
        console.error("맵 초기화 오류:", err);
      }
    };

    // 스크립트가 이미 로드된 경우 즉시 초기화
    if (checkNaverMaps()) {
      initializeMap();
    } else {
      // 스크립트 로드 대기
      const interval = setInterval(() => {
        if (checkNaverMaps()) {
          clearInterval(interval);
          initializeMap();
        }
      }, 100);

      // 120초 후 타임아웃
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setError("네이버 맵 스크립트 로드 시간 초과");
      }, 1000 * 120);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [options.center.lat, options.center.lng, options.zoom]);

  // 맵이 로드된 후 중심점 업데이트
  useEffect(() => {
    if (mapInstance && isLoaded) {
      const newCenter = new naver.maps.LatLng(
        options.center.lat,
        options.center.lng
      );
      mapInstance.setCenter(newCenter);
      mapInstance.setZoom(options.zoom);
    }
  }, [
    mapInstance,
    isLoaded,
    options.center.lat,
    options.center.lng,
    options.zoom,
  ]);

  return { mapRef, mapInstance, isLoaded, error };
}
