import { useGeolocation } from "react-simplikit";
import NaverMap from "./NaverMap";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function HospitalMap() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const zoom = searchParams.get("zoom");

  const { data } = useGeolocation({
    mountBehavior: "get",
  });

  const center = useMemo(() => {
    return data
      ? { lat: data.latitude, lng: data.longitude }
      : { lat: Number(lat), lng: Number(lng) };
  }, [data, lat, lng]);

  return <NaverMap center={center} zoom={Number(zoom)} />;
}
