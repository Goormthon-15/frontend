import { useToastStore } from "@/store/toastStore";
import React from "react";

/**@desc 타임아웃 클리어 함수
 * 매개변수에 timeoutRef(useRef)를 할당하여 활용
 *
 * @example
 * const timeoutRef = useRef(null);
 *
 * timeoutRef.current = setTimeout(() => {
 *     awaitAnotherProcess();
 * }, 500);
 *
 * // cleanup
 * useEffect(() => {
 *   return () => {
 *       timeoutClearFunction(timeoutRef)
 *   }
 * }, [])
 * */
export function timeoutClearFunction(
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) {
  if (timeoutRef?.current !== null) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
}

export function objectDeepCopy(e: any) {
  return JSON.parse(JSON.stringify(e));
}

export const toast = useToastStore.getState().addToast;
