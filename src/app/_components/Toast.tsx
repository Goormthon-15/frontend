"use client";

import { useToastStore } from "@/store/toastStore";
import { InfoCircleIcon } from "@vapor-ui/icons";
import { useEffect, useRef } from "react";

/** @desc: 토스트를 활용할 때 문자열 뿐만 아닌 html태그를 직접 넣어서 별도의 스타일도 추가 가능
 *  @example:
 *  const { addToast } = useToastStore;
 *  addToast('토스트!');
 *  addToast(<div className="text-red-500">빨간 글자 토스트!</div>);
 * */
export const Toasts = () => {
  const toastDivRef = useRef<HTMLDivElement | null>(null);
  const prevMessage = useRef<any>(null);
  const isRunRef = useRef(false);
  const toastStore = useToastStore();

  // * ============ 토스트 메시지를 띄우는 실행함수 ===================
  const show = () => {
    // 메시지 중복제거
    useToastStore.getState().removeDuplicates();

    // 이전 메시지와 동일한 내용이 있다면 삭제
    if (
      useToastStore
        .getState()
        .toasts.some((msg) => msg.message === prevMessage.current)
    ) {
      const filteredMessage = useToastStore
        .getState()
        .toasts.filter((msg) => msg.message !== prevMessage.current);
      useToastStore.getState().setToast(filteredMessage);
    }

    if (useToastStore.getState().toasts?.length > 0) {
      // start flag & setState
      isRunRef.current = true;

      // 초기 설정
      if (toastDivRef.current?.style) {
        toastDivRef.current.style.display = "flex";
        toastDivRef.current.style.top = "-16px";
        toastDivRef.current.style.opacity = "0";
      }

      // toast log
      console.log("Toasts! :", useToastStore.getState().toasts);

      // 이전 메시지를 기록
      prevMessage.current = useToastStore.getState().toasts[0]?.message;

      //  등장 트랜지션
      setTimeout(() => {
        if (toastDivRef.current?.style) {
          toastDivRef.current.style.top = "20px";
          toastDivRef.current.style.opacity = "1";
        }
        // 토스트 알람이기 때문에 일정 시간 후 알람을 다시 숨김
        setTimeout(() => {
          if (toastDivRef.current?.style) {
            toastDivRef.current.style.top = "-16px";
            toastDivRef.current.style.opacity = "0";
          }

          // 애니메이션이 종료되는 타이밍에 실행
          setTimeout(() => {
            // 토스트 박스 영역을 다시 숨김
            if (toastDivRef.current?.style) {
              toastDivRef.current.style.display = "none";
            }

            // 남은 toasts가 있다면 실행하기 위함
            if (useToastStore.getState().toasts.length !== 0) {
              useToastStore.getState().removeToast(); // 토스트 삭제
              show(); // 함수 재실행
            } else {
              isRunRef.current = false;
            }
          }, 300);
        }, 3000);
      });
    } else {
      prevMessage.current = null; // 이전 메시지 초기화
      isRunRef.current = false;
    }
  };

  // * ============= 토스트 메시지를 감지하고 toast를 띄움 =================
  useEffect(() => {
    if (!isRunRef.current && useToastStore.getState().toasts.length) {
      show();
    }
  }, [useToastStore.getState().toasts]);

  return (
    <div
      ref={toastDivRef}
      className={`text-text-primary left-1/2 -translate-x-1/2 absolute z-[99999] max-w-[390px] 
       items-center rounded-[32px] border border-gray-300 bg-white text-[14px] font-[400] 
       leading-[20px] duration-300 ease-in-out px-[12px] py-[8px] top-0 opacity-0 hidden
      `}
    >
      {toastStore.toasts.length >= 0 && (
        <div className="flex items-center">
          <InfoCircleIcon width={32} height={32} className="mr-[12px]" />
          <div
            className="w-full font-medium text-[17px] text-gray-700 flex items-center -translate-y-[1px]"
            dangerouslySetInnerHTML={{
              __html: toastStore.toasts[0]?.message as string | Node,
            }}
          />
        </div>
      )}
    </div>
  );
};
