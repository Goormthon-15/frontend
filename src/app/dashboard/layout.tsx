import { HStack, VStack } from "@vapor-ui/core";
import { DashboardHeader } from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HStack
      width={"100%"}
      height={"100vh"}
      justifyContent="center"
      alignItems="center"
      backgroundColor={"$gray-050"}
    >
      <VStack width={"400px"} height={"720px"} backgroundColor={"#ffffff"}>
        <DashboardHeader />

        {/*  Content  */}
        <div className={"grow w-full h-full"}>{children}</div>
      </VStack>
    </HStack>
  );
}
