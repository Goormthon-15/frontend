import { Button, VStack } from "@vapor-ui/core";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <VStack>
      <Button render={<Link href="/dashboard/hospitals" />}>병원 찾기</Button>
    </VStack>
  );
}
