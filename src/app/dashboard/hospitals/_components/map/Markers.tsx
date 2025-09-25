import { useSearchParams } from "next/navigation";

export function Markers() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return <div>Markers</div>;
}
