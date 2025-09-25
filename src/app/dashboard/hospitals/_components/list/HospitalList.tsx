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
import { useState } from "react";
import { getDistance, convertDistance } from "geolib";
import { IHospital } from "../../_mock/kor_mock";
import { useRouter } from "next/navigation";

export function HospitalList({ data }: { data: IHospital[] }) {
  return (
    <VStack gap={"16px"}>
      {data.map((item) => (
        <HospitalItem key={item.id} item={item} />
      ))}
    </VStack>
  );
}

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

interface HospitalItemProps {
  item: IHospital;
}

const JEJU_CENTER = { lat: 33.49962, lng: 126.53119 };

function HospitalItem({ item }: HospitalItemProps) {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(item.isFavorite ?? false);

  // 사용 예시
  const distance = getDistance(
    { latitude: JEJU_CENTER.lat, longitude: JEJU_CENTER.lng }, // 제주 시청
    { latitude: item.latitude, longitude: item.longitude } // 병원 위치
  );

  const distanceKm = convertDistance(distance, "km") ?? 0;

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/dashboard/hospitals/${item.id}`);
  };

  return (
    <Card.Root onClick={handleCardClick}>
      <Card.Header className="px-4 py-2 border-none">
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={"16px"} alignItems={"center"}>
            <Text typography="heading5">{item.name}</Text>
            <Text className="text-gray-100">|</Text>
            <Text typography="heading6">
              {DEFAULTENT_LABELS[item.type as keyof typeof DEFAULTENT_LABELS] ??
                "일반"}
            </Text>
          </Flex>

          <IconButton
            aria-label="favorite"
            variant="ghost"
            size="lg"
            onClick={handleFavoriteClick}
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
                className="w-[120px]"
              >
                <Text typography="subtitle1">
                  {item.isCurrentlyOpen ? "진료 중" : "진료 종료"}
                </Text>
              </Badge>
              <Text className="text-gray-100">|</Text>
              <Text typography="heading6">{item.officeHours}</Text>
            </Flex>
          </HStack>
          <HStack alignItems={"center"} gap={"15px"}>
            <Badge
              size="lg"
              shape="square"
              className="border-none bg-inherit w-[120px]"
            >
              <CarOutlineIcon size={"16px"} />
              <Text typography="subtitle1">{distanceKm.toFixed(1)}km</Text>
            </Badge>
            <Text className="text-gray-100">|</Text>
            <Text typography="heading6" className="truncate max-w-[150px]">
              {item.address1} {item.address2} {item.address3}
            </Text>
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
