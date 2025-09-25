import { useGeolocation } from "react-simplikit";
import NaverMap from "./NaverMap";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { IHospital } from "../../_mock/kor_mock";

export function HospitalMap({ data }: { data: IHospital[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const zoom = searchParams.get("zoom");

  const { data: userLocation } = useGeolocation({
    mountBehavior: "get",
  });

  const center = useMemo(() => {
    return userLocation
      ? { lat: userLocation.latitude, lng: userLocation.longitude }
      : { lat: Number(lat), lng: Number(lng) };
  }, [userLocation, lat, lng]);

  const handleMarkerClick = (hospital: IHospital) => {
    router.push(`/dashboard/hospitals/${hospital.id}`);
  };

  return (
    <NaverMap
      center={center}
      zoom={Number(zoom)}
      hospitalData={data}
      onMarkerClick={handleMarkerClick}
    />
  );
}
