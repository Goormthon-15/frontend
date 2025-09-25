import { VStack } from "@vapor-ui/core";
import { DashboardHeader } from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStack>
      <DashboardHeader />
      {children}
    </VStack>
  );
}
