import { Dialog, HStack, IconButton, Text, VStack } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";

interface HospitalDetailStackPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HospitalDetailStackPage({
  isOpen,
  onClose,
}: HospitalDetailStackPageProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnClickOverlay={false}
    >
      <Dialog.Content
        className={`w-[400px] h-[720px] m-0 rounded-none bg-white shadow-none`}
      >
        <Dialog.Header className="flex items-center justify-between px-6! py-2! relative">
          {/* 뒤로가기 버튼 */}
          <IconButton
            variant="ghost"
            size="lg"
            onClick={onClose}
            aria-label="뒤로가기"
            className="text-black p-2"
          >
            <ChevronLeftOutlineIcon size="24" color="black" />
          </IconButton>

          {/*  타이틀  */}
          <Text
            typography="heading6"
            className="absolute left-1/2 -translate-x-1/2"
            style={{ textAlign: "center" }}
          >
            마커 혹은 병원 리스트에서 받은 병원이름
          </Text>
        </Dialog.Header>

        {/* 바디 - 지역 선택 내용 */}
        <Dialog.Body className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <VStack alignItems="stretch" className="h-full">
            {/* 여기에 지역 선택 섹션들이 들어갑니다 */}
            {/* 현재 위치 기반 섹션 */}
            ㄷㄷ ㅋㅋㅋ
            <img
              src="/images/hospital.png"
              alt="병원 이미지"
              height={306}
              className="w-full h-[306px]"
            />
            {/* 제주시 섹션 */}
            <div>ㅋㅋ</div>
            {/* 서귀포시 섹션 */}
            <div>
              <HStack alignItems="stretch" className="gap-2">
                <p>하하</p>
                <p>하하</p>
                <p>하하</p>
                <p>하하</p>
              </HStack>
            </div>
            {/* 하단 여백 추가 */}
            <div className="h-20" />
          </VStack>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
}
