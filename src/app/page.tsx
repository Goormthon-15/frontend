"use client";

import Splash from "@/app/_components/Splash";
import { Box, Flex, Text, VStack } from "@vapor-ui/core";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <VStack gap={"$400"} backgroundColor={"$gray-050"} height={"100%"}>
        <Box height={"72px"} className="border-b! border-[#E1E1E1]!" />

        <VStack>
          <Text typography="display2" className="text-center">
            Hello
          </Text>

          <Flex gap={"$700"} alignItems={"center"}>
            <Text typography="display3" className="pl-[10%]">
              你好
            </Text>
            <Text typography="display4">您好</Text>
          </Flex>

          <Box>안녕하세요</Box>
        </VStack>
      </VStack>

      {/*  스플래쉬  */}
      <Splash />

      {process.env.NODE_ENV === "development" && (
        <div className="fixed left-[10px] top-[40px] bg-black text-white p-4! rounded-md cursor-pointer">
          <div onClick={() => router.push("/dashboard")}>
            바로 대시보드(dev에서만 보임)
          </div>
        </div>
      )}
    </>
  );
}
