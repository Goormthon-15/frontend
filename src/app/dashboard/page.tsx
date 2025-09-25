import Splash from "@/app/_components/Splash";
import { Button, VStack } from "@vapor-ui/core";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <VStack paddingX={"$100"}>
        <Button render={<Link href="/dashboard/hospitals?view=map" />}>
          병원 찾기
        </Button>
      </VStack>
    </>
  );
}
