import { Box, Flex, HStack, Text, VStack, Button } from "@vapor-ui/core";
import IconHospital from "@/assets/svgs/icon-hospital.svg";
import IconAmbulatoryClinic from "@/assets/svgs/icon-ambulatory-clinic.svg";
import IconEntry from "@/assets/svgs/icon-entry.svg";
import IconCommunication from "@/assets/svgs/icon-communication.svg";
import IconAwardRibbon from "@/assets/svgs/icon-award_ribbon.svg";
import IconGastroenterology from "@/assets/svgs/icon-gastroenterology.svg";
import IconPediatrics from "@/assets/svgs/icon-pediatrics.svg";
import IconCriticalCare from "@/assets/svgs/icon-critical_care.svg";
import IconOrthopaedics from "@/assets/svgs/icon-orthopaedics.svg";
import IconObstetricsmonia from "@/assets/svgs/icon-obstetricsmonia.svg";
import IconEarNoseThroat from "@/assets/svgs/icon-ears_nose_and_throat.svg";
import IconOphthalmology from "@/assets/svgs/icon-opthalmology.svg";
import IconChaplaincy from "@/assets/svgs/icon-chaplaincy.svg";
import IconHematology from "@/assets/svgs/icon-hematology.svg";
import { DotIcon } from "@vapor-ui/icons";
import { DashboardGrid } from "./_components/DashboardGrid";

const GRID_ITEMS = [
  {
    label: "Now Open",
    icon: IconEntry,
  },
  {
    label: "Live Chat",
    icon: IconCommunication,
  },
  {
    label: "Popular",
    icon: IconAwardRibbon,
  },
  {
    label: "Internal",
    icon: IconGastroenterology,
  },
  {
    label: "Pediatrics",
    icon: IconPediatrics,
  },
  {
    label: "General",
    icon: IconCriticalCare,
  },
  {
    label: "Orthopaedics",
    icon: IconOrthopaedics,
  },
  {
    label: "OB/GYN",
    icon: IconObstetricsmonia,
  },
  {
    label: "ENT",
    icon: IconEarNoseThroat,
  },
  {
    label: "Ophthalmology",
    icon: IconOphthalmology,
  },
  {
    label: "Dermatology",
    icon: IconChaplaincy,
  },
  {
    label: "Other",
    icon: IconHematology,
  },
];

export default function DashboardPage() {
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
    </VStack>
  );
}
