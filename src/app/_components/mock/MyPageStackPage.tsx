import { Dialog } from "@vapor-ui/core";
import { useRouter } from "next/navigation";

export default function MyPageStackPage({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content
        className={`w-[432px] h-[932px] m-0 rounded-none bg-white shadow-none flex flex-col`}
      >
        <div className="w-full h-full relative">
          <img
            src="/images/mocks/my-page.webp"
            alt="book-request-stack-page"
            className="w-full h-auto z-0 relative"
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
              onClose();
              router.push("/dashboard");
            }}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
