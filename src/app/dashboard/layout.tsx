import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@vapor-ui/core";
import {
  ChevronDoubleLeftOutlineIcon,
  ChevronDownOutlineIcon,
  FoldOutlineIcon,
  HomeOutlineIcon,
} from "@vapor-ui/icons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStack>
      <LayoutHeader />
      {children}
    </VStack>
  );
}

function LayoutHeader() {
  return (
    <HStack justifyContent="space-between" className="p-6 ">
      <Button variant="ghost">
        <FoldOutlineIcon size={"24"} />
        <Text typography="heading6">{"내 주변"}</Text>
        <ChevronDownOutlineIcon size={"16"} />
      </Button>

      <IconButton aria-label="home">
        <HomeOutlineIcon />
      </IconButton>
    </HStack>
  );
}
