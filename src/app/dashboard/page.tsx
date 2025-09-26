"use client";

import { Box, Flex, HStack, Text, VStack, Button } from "@vapor-ui/core";
import IconHospital from "@/assets/svgs/icon-hospital.svg";
import IconAmbulatoryClinic from "@/assets/svgs/icon-ambulatory-clinic.svg";
import { DotIcon, ForwardPageOutlineIcon } from "@vapor-ui/icons";
import { DashboardGrid } from "./_components/DashboardGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/utils/index.utils";
import {
  useLocaleContext,
  useTranslation,
} from "../_components/provider/LocaleProvider";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { t } = useTranslation();

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
            {(() => {
              const text = t("Locate Hospitals around you");
              const { serverLocale } = useLocaleContext();

              // 언어별로 텍스트 분할 규칙 정의
              switch (serverLocale) {
                case "en":
                  // 영어: "Locate", "Hospitals", "around you"
                  return ["Locate", "Hospitals", "around you"];

                case "ko":
                  // 한국어: "내 주변", "병원", "찾기"
                  return ["내 주변", "병원", "찾기"];

                case "zh-CHS":
                  // 중국어 간체: "查找", "你附近的", "医院"
                  return ["查找", "你附근的", "医院"];

                case "zh-CHT":
                  // 중국어 번체: "搜尋", "你附近的", "醫院"
                  return ["搜尋", "你附근的", "醫院"];

                default:
                  // 기본값: 공백으로 분할
                  return text.split(" ");
              }
            })().map((text, index) => (
              <Text key={index} typography="heading3">
                {text}
              </Text>
            ))}
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
            {(() => {
              const text = t("Book your Regular Hospital");
              const { serverLocale } = useLocaleContext();

              // 언어별로 텍스트 분할 규칙 정의
              switch (serverLocale) {
                case "en":
                  // 영어: "Book your", "Regular", "Hospital"
                  return ["Book your", "Regular", "Hospital"];

                case "ko":
                  // 한국어: "단골 병원 예약" → "단골", "병원", "예약"
                  return ["단골", "병원", "예약"];

                case "zh-CHS":
                  // 중국어 간체: "预约常用医院" → "预约", "常用", "医院"
                  return ["预约", "常用", "医院"];

                case "zh-CHT":
                  // 중국어 번체: "預約常用醫院" → "預約", "常用", "醫院"
                  return ["預約", "常用", "醫院"];

                default:
                  // 기본값: 공백으로 분할
                  return text.split(" ");
              }
            })().map((text, index) => (
              <Text key={index} typography="heading3">
                {text}
              </Text>
            ))}
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

      {/* <Button
        size="xl"
        className="fixed bottom-[36px] right-1/2 translate-x-5/6"
      >
        {t("Book Appointment")}
        <ForwardPageOutlineIcon />
      </Button> */}

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
