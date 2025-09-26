import { Dialog, VStack } from "@vapor-ui/core";
import { useRouter } from "next/navigation";

interface ChatContentsStackPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatContentsStackPage({
  isOpen,
  onClose,
}: ChatContentsStackPageProps) {
  const router = useRouter();
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content
        className={`w-[432px] h-[932px] m-0 rounded-none bg-[#f7f7f7] shadow-none flex flex-col`}
      >
        <Dialog.Header
          className="flex items-center justify-between relative"
          style={{ padding: 0, position: "relative" }}
        >
          <img
            src="/images/mocks/chat-mock-head.webp"
            alt="chat"
            className="w-full h-auto bg-[#f7f7f7] relative z-50"
          />
          <div
            className="absolute top-[4px] left-[16px] w-[50px] h-[50px] "
            onClick={() => {
              onClose();
            }}
          />

          <div
            className="absolute top-[4px] right-[16px] w-[50px] h-[50px]"
            onClick={() => {
              router.push("/dashboard");
            }}
          />
        </Dialog.Header>

        {/* 바디 - 지역 선택 내용 */}
        <Dialog.Body
          className="grow p-4 overflow-y-auto "
          style={{ padding: "34px 0 0 0", position: "relative" }}
        >
          <img
            src="/images/mocks/chat-contents.png"
            alt="chat"
            className="w-full h-auto"
          />
        </Dialog.Body>

        <Dialog.Footer style={{ padding: 0 }}>
          <img
            src="/images/mocks/chat-bottom-input.webp"
            alt="chat"
            className="w-full h-auto"
          />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
