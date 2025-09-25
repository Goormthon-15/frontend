"use client";

import { Box, Text, Grid, Button } from "@vapor-ui/core";
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

export function DashboardGrid() {
  return (
    <Grid.Root
      templateColumns={"repeat(3, minmax(120px, 1fr))"}
      gap={"6px"}
      className="w-full"
    >
      {GRID_ITEMS.map((item) => {
        const IconComponent = item.icon;
        return (
          <Grid.Item key={item.label} className="w-full">
            <Box
              flexDirection={"column"}
              height={"unset"}
              width={"unset"}
              className="bg-white border border-[#E1E1E1] w-full p-6"
              render={<Button />}
            >
              <IconComponent className="size-12" />
              <Text>{item.label}</Text>
            </Box>
          </Grid.Item>
        );
      })}
    </Grid.Root>
  );
}
