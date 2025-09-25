import { Dialog, HStack, IconButton, Text, VStack } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";

interface ExampleStackPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExampleStackPage({
  isOpen,
  onClose,
}: ExampleStackPageProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content
        className={`w-[430px] h-[932px] m-0 rounded-none bg-white shadow-none`}
      >
        <Dialog.Header className="flex items-center justify-between px-6! py-2! relative">
          <IconButton
            variant="ghost"
            size="lg"
            onClick={onClose}
            aria-label="뒤로가기"
            className="text-black p-2"
          >
            <ChevronLeftOutlineIcon size="24" color="black" />
          </IconButton>
          <Text
            typography="heading6"
            className="absolute left-1/2 -translate-x-1/2"
          >
            타이틀입니다.
          </Text>
        </Dialog.Header>

        {/* 바디 - 지역 선택 내용 */}
        <Dialog.Body className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <VStack alignItems="stretch" className="h-full">
            내용입니다
          </VStack>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
}
