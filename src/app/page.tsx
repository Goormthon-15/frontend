import Splash from "@/app/_components/Splash";
import { Button, VStack } from "@vapor-ui/core";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <VStack>
        <Button render={<Link href="/dashboard" />}>
          누르면 바로 대시보드
        </Button>
      </VStack>

      {/*  스플래쉬  */}
      <Splash />
    </>
  );
}
