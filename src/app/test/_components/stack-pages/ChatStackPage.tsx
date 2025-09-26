import { Dialog, IconButton, Text, VStack } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";

interface ChatStackPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatStackPage({ isOpen, onClose }: ChatStackPageProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content
        className={`w-[432px] h-[932px] m-0 rounded-none bg-white shadow-none flex flex-col`}
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

        <VStack className="flex-1"></VStack>
      </Dialog.Content>
    </Dialog.Root>
  );
}
