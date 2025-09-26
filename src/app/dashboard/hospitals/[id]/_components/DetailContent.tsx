"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@vapor-ui/core";
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  CopyOutlineIcon,
} from "@vapor-ui/icons";
import { useMemo } from "react";
import { jejuHospitals, seogwipoHospitals } from "../../_mock/kor_mock";

const DEFAULTENT_LABELS = {
  GENERAL: "일반",
  EMERGENCY: "응급",
  CHILDREN: "소아",
  OBSTETRICS: "산부인과",
  ORTHOPEDICS: "정형외과",
  PEDIATRICS: "소아청소년과",
  ENT: "이비인후과",
  OPHTHALMOLOGY: "안과",
  DERMATOLOGY: "피부과",
  OTHER: "기타",
};

interface DetailContentProps {
  hospitalId: string;
}

export function DetailContent({ hospitalId }: DetailContentProps) {
  const hospital = useMemo(() => {
    const id = parseInt(hospitalId);

    if (isNaN(id)) {
      return null;
    }

    return [...jejuHospitals, ...seogwipoHospitals].find(
      (hospital) => hospital.id === id
    );
  }, [hospitalId]);

  if (!hospital) {
    return null;
  }

  return (
    <VStack backgroundColor={"$gray-050"} height={"100%"} overflow={"auto"}>
      <img src="/images/hospital-ex.png" alt="병원 이미지" />

      <VStack padding={"24px"} paddingY={"32px"} gap={"16px"}>
        <Card.Root>
          <Card.Header>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <Flex gap={"16px"} alignItems={"center"}>
                <Text typography="heading5">{hospital.name}</Text>
                <Text className="text-gray-100">|</Text>
                <Text typography="heading6">
                  {DEFAULTENT_LABELS[
                    hospital.type as keyof typeof DEFAULTENT_LABELS
                  ] ?? "일반"}
                </Text>
              </Flex>

              <IconButton
                aria-label="favorite"
                variant="ghost"
                size="lg"
                onClick={() => {
                  hospital.isFavorite = !hospital.isFavorite;
                }}
              >
                {hospital.isFavorite ? (
                  <BookmarkIcon size={"24px"} color="inherit" />
                ) : (
                  <BookmarkOutlineIcon size={"24px"} color="inherit" />
                )}
              </IconButton>
            </HStack>
          </Card.Header>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Box marginBottom={"16px"}>
              <Text typography="heading5">{"Office Hours"}</Text>
            </Box>

            <VStack gap={"8px"}>
              <HStack justifyContent={"space-between"}>
                <Flex gap={"16px"} alignItems={"center"}>
                  <Badge
                    size="lg"
                    shape="square"
                    color={hospital.isCurrentlyOpen ? "primary" : "hint"}
                    className="w-[88px]"
                  >
                    <Text typography="subtitle1">
                      {hospital.isCurrentlyOpen ? "진료 중" : "진료 종료"}
                    </Text>
                  </Badge>
                  <Text className="text-gray-100">|</Text>
                  <Text typography="heading6">{"Closes in 18:00"}</Text>
                </Flex>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Flex gap={"16px"} alignItems={"center"}>
                  <Text typography="heading6" className="w-[88px]">
                    {"Open on"}
                  </Text>
                  <Text className="text-gray-100">|</Text>
                  <Text typography="heading6">{"Weekdays, 09:00 ~ 18:00"}</Text>
                </Flex>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Flex gap={"16px"} alignItems={"center"}>
                  <Text typography="heading6" className="w-[88px]">
                    {"Closed on"}
                  </Text>
                  <Text className="text-gray-100">|</Text>
                  <Text typography="heading6">
                    {"Weekends, Public Holidays"}
                  </Text>
                </Flex>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Box marginBottom={"16px"}>
              <Text typography="heading5">{"Address"}</Text>
            </Box>

            <VStack gap={"8px"}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text typography="heading6" className="truncate w-full flex-1">
                  {hospital.address1} {hospital.address2} {hospital.address3}
                </Text>

                <IconButton
                  aria-label="copy"
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      hospital.address1 + hospital.address2 + hospital.address3
                    );
                    alert("주소가 복사되었습니다.");
                  }}
                >
                  <CopyOutlineIcon size={"24px"} color="inherit" />
                </IconButton>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Box marginBottom={"16px"}>
              <Text typography="heading5">{"Contact number"}</Text>
            </Box>

            <VStack gap={"8px"}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text typography="heading6" className="truncate w-full flex-1">
                  {hospital.phone}
                </Text>

                <IconButton
                  aria-label="copy"
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(hospital.phone);
                    alert("주소가 복사되었습니다.");
                  }}
                >
                  <CopyOutlineIcon size={"24px"} color="inherit" />
                </IconButton>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Button size="xl" stretch className="sticky bottom-[36px]">
          Book Appointment
        </Button>
      </VStack>
    </VStack>
  );
}
