"use client";

import { Box, Flex, HStack, Text, VStack, Button } from "@vapor-ui/core";
import IconHospital from "@/assets/svgs/icon-hospital.svg";
import IconAmbulatoryClinic from "@/assets/svgs/icon-ambulatory-clinic.svg";
import { DotIcon } from "@vapor-ui/icons";
import { DashboardGrid } from "./_components/DashboardGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/utils/index.utils";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleHospitalClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newUrl = `/dashboard/hospitals${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(newUrl);
  };

  return (
    <VStack
      padding={"24px"}
      backgroundColor={"$gray-050"}
      height={"100%"}
      gap={"16px"}
      overflow={"auto"}
    >
      <HStack gap={"24px"}>
        <Box
          flexDirection={"column"}
          border={"1px solid #E1E1E1"}
          padding={"16px"}
          gap={"40px"}
          borderRadius={"8px"}
          width={"100%"}
          height={"unset"}
          alignItems={"start"}
          className="bg-white border border-[#E1E1E1]"
          onClick={handleHospitalClick}
          render={<Button />}
        >
          <Flex flexDirection={"column"} alignItems={"start"}>
            <Text typography="heading3">Locate</Text>
            <Text typography="heading3">Hospitals</Text>
            <Text typography="heading3">around you</Text>
          </Flex>

          <IconHospital size={"98px"} />
        </Box>

        <Box
          flexDirection={"column-reverse"}
          border={"1px solid #E1E1E1"}
          padding={"16px"}
          gap={"40px"}
          borderRadius={"8px"}
          width={"100%"}
          alignItems={"end"}
          height={"unset"}
          className="bg-white border border-[#E1E1E1] "
          render={<Button />}
        >
          <Flex flexDirection={"column"} alignItems={"end"}>
            <Text typography="heading3">Book your</Text>
            <Text typography="heading3">Regular</Text>
            <Text typography="heading3">Hospital</Text>
          </Flex>

          <IconAmbulatoryClinic size={"98px"} />
        </Box>
      </HStack>

      <VStack>
        <img
          src={"/images/ad-1.png"}
          alt="ad-1"
          className="rounded-[8px] w-full"
        />

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          gap={"8px"}
          padding={"6px"}
        >
          <DotIcon className="text-[#e1e1e1]" />
          <DotIcon className="text-[#e1e1e1]" />
          <DotIcon className="text-[#c6c6c6]" />
        </Flex>
      </VStack>

      <DashboardGrid />

      {process.env.NODE_ENV === "development" && (
        <div className="fixed right-[10px] top-[40px] bg-black text-white p-4! rounded-md cursor-pointer">
          <div
            onClick={() => {
              toast("토스트 메시지");
            }}
          >
            토스트 확인해보기
          </div>
        </div>
      )}
    </VStack>
  );
}
