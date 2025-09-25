import { ReactNode } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";

interface Toast {
  message: string | ReactNode;
  type: "success" | "warn" | "error";
}

interface IToastsStore {
  toasts: Toast[];
  addToast: ((message: string | ReactNode) => void) & {
    warn: (message: string | ReactNode) => void;
    error: (message: string | ReactNode) => void;
  };
  setToast: (message: any) => void;
  removeToast: () => void;
  removeDuplicates: () => void;
}

/** 토스트알림에 대한 상태관리 store */
/** @desc 토스트를 활용할 때 문자열 뿐만 아닌 html태그를 직접 넣어서 별도의 스타일도 추가 가능
 *  @example
 *  const { addToast } = useToastStore;
 *  addToast('토스트!');
 *  addToast(<div className="text-red-500">빨간 글자 토스트!</div>);
 * */
export const useToastStore: UseBoundStore<StoreApi<IToastsStore>> = create(
  devtools((setState) => ({
    toasts: [],
    addToast: Object.assign(
      (message: string | ReactNode) => {
        setState((state) => {
          return { toasts: [...state.toasts, { message: message, type: "success" }] };
        });
      },
      {
        warn: (message: string | ReactNode) => {
          setState((state) => {
            return { toasts: [...state.toasts, { message: message, type: "warn" }] };
          });
        },
        error: (message: string | ReactNode) => {
          setState((state) => {
            return { toasts: [...state.toasts, { message: message, type: "error" }] };
          });
        },
      },
    ),
    setToast: (messages: any) => {
      setState(() => {
        return { toasts: messages };
      });
    },
    removeToast: () =>
      setState((state) => {
        state.toasts.shift();
        return { toasts: [...state.toasts] };
      }),
    removeDuplicates: () => {
      setState((state) => {
        const convert = new Set(state.toasts);
        return { toasts: [...convert] };
      });
    },
  })),
);
