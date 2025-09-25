import { Button, VStack } from "@vapor-ui/core";
import Link from "next/link";

const JEJU_CITY_CENTER = { lat: 33.49962, lng: 126.53119 };
const ZOOM = 16;

export default function DashboardPage() {
  return (
    <VStack>
      <Button
        render={
          <Link
            href={`/dashboard/hospitals?view=map&lat=${JEJU_CITY_CENTER.lat}&lng=${JEJU_CITY_CENTER.lng}&zoom=${ZOOM}`}
          />
        }
      >
        병원 맵
      </Button>

      <Button render={<Link href={`/dashboard/hospitals?view=list`} />}>
        병원 리스트
      </Button>
    </VStack>
  );
}
