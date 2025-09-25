"use client";

import {
  MOBILE_FRAME_HEIGHT,
  MOBILE_FRAME_WIDTH,
} from "@/app/_constants/index.constants";
import { HStack } from "@vapor-ui/core";
import { useEffect, useRef } from "react";

export default function Splash() {
  const innerDivRef = useRef<any>(null);

  useEffect(() => {
    if (innerDivRef.current) {
      setTimeout(() => {
        innerDivRef.current.style.opacity = "0";
        setTimeout(() => {
          innerDivRef.current.style.display = "none";
        }, 300);
      }, 1200);
    }
  }, []);

  return (
    <HStack
      height={MOBILE_FRAME_HEIGHT}
      width={MOBILE_FRAME_WIDTH}
      alignItems="center"
      justifyContent="center"
      position="fixed"
      className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 opacity-100 z-50 bg-white"
      ref={innerDivRef}
    >
      <img
        src={"/images/splash-logo.webp"}
        alt="splash logo"
        width={189}
        height={189}
      />
    </HStack>
  );
}
