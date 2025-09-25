import { HStack, VStack } from "@vapor-ui/core";
import { DashboardHeader } from "./_components/DashboardHeader";
import { Toasts } from "@/app/_components/Toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStack width={"100%"} height={"100%"}>
      <DashboardHeader />

      {/*  Content  */}
      <div className={"grow w-full h-full vertical-custom-scrollbar relative"}>
        {children}
        <Toasts />
      </div>
    </VStack>
  );
}
