import {
  Badge,
  Box,
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
  CarOutlineIcon,
  ChevronRightOutlineIcon,
} from "@vapor-ui/icons";
import { useMemo, useState } from "react";

export function HospitalList() {
  return (
    <VStack gap={"16px"}>
      {Array.from({ length: 10 }).map((_, index) => (
        <HospitalItem key={index} item={mockData} />
      ))}
    </VStack>
  );
}

interface HospitalType {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  department: string;
  departmentKorean: string;
  isPopular: boolean;
  isCurrentlyOpen: boolean | null;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
}

const mockData: HospitalType = {
  id: 2,
  name: "삼성서울병원",
  address: "서울특별시 강남구 일원로 81",
  phoneNumber: "02-3410-2114",
  department: "SURGERY",
  departmentKorean: "외과",
  isPopular: true,
  isCurrentlyOpen: null,
  latitude: 37.4881,
  longitude: 127.0856,
  isFavorite: false,
};

interface HospitalItemProps {
  item: HospitalType;
}

const JEJU_CENTER = { lat: 33.49962, lng: 126.53119 };

function HospitalItem({ item }: HospitalItemProps) {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite ?? false);

  return (
    <Card.Root>
      <Card.Header className="px-4 py-2 border-none">
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={"16px"} alignItems={"center"}>
            <Text typography="heading5">{item.name}</Text>
            <Text className="text-gray-100">|</Text>
            <Text typography="heading6">{item.department}</Text>
          </Flex>

          <IconButton
            aria-label="favorite"
            variant="ghost"
            size="lg"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? (
              <BookmarkIcon size={"24px"} color="inherit" />
            ) : (
              <BookmarkOutlineIcon size={"24px"} color="inherit" />
            )}
          </IconButton>
        </HStack>
      </Card.Header>
      <Card.Body className="px-4 pb-4 pt-0 relative">
        <VStack gap={"10px"}>
          <HStack justifyContent={"space-between"}>
            <Flex gap={"16px"} alignItems={"center"}>
              <Badge
                size="lg"
                shape="square"
                color={item.isCurrentlyOpen ? "primary" : "hint"}
              >
                <Text typography="subtitle1">
                  {item.isCurrentlyOpen ? "진료 중" : "진료 종료"}
                </Text>
              </Badge>
              <Text className="text-gray-100">|</Text>
              <Text typography="heading6">{"6시까지만 해용"}</Text>
            </Flex>
          </HStack>
          <HStack alignItems={"center"} gap={"15px"}>
            <Badge size="lg" shape="square" className="border-none bg-inherit">
              <CarOutlineIcon size={"16px"} />
              <Text typography="subtitle1">{"0km"}</Text>
            </Badge>
            <Text className="text-gray-100">|</Text>
            <Text typography="heading6">{item.address}</Text>
          </HStack>
        </VStack>

        <IconButton
          aria-label="chevron"
          variant="ghost"
          size="lg"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <ChevronRightOutlineIcon size={"24px"} color="inherit" />
        </IconButton>
      </Card.Body>
    </Card.Root>
  );
}

interface IHospital {
  id: number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  phone: string;
  type: string;
  officeHours: string;
  departmentKorean: string;
  isPopular: boolean;
  isCurrentlyOpen: boolean | null;
  latitude: number;
  longitude: number;
}
