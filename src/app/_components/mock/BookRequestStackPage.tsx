import { Dialog, IconButton, Text, VStack } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookRequestStackPageProps {
  isOpen: boolean;
  onClose: () => void;
  openNext: () => void;
}

export default function BookRequestStackPage({
  isOpen,
  onClose,
  openNext,
}: BookRequestStackPageProps) {
  const [imageSrc, setImageSrc] = useState("/images/mocks/book.webp");
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      setImageSrc("/images/mocks/book.webp");
    }
  }, [isOpen]);

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
            src={imageSrc}
            alt="book-request-stack-page"
            className="w-full h-auto z-0 relative"
            onClick={() => {
              if (imageSrc.includes("book_toast")) {
                onClose();
                openNext();
              }
            }}
          />

          <div
            className="absolute left-[12px] top-[12px] w-[50px] h-[50px] bg-red z-50"
            onClick={() => {
              onClose();
            }}
          />
          <div
            className="absolute right-[12px] top-[12px] w-[50px] h-[50px] bg-red z-50"
            onClick={() => {
              router.push("/dashboard");
            }}
          />

          <div
            className={`absolute left-[12px] bottom-[12px] w-full h-[50px] z-50 }`}
            onClick={() => {
              setImageSrc("/images/mocks/book_toast.webp");
            }}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
