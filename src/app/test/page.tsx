"use client";

import Translator from "@/app/test/_components/translator/Translator.test";
import HospitalDetailStackPage from "@/app/test/_components/stack-pages/HospitalDetailStackPage";
import { useState } from "react";
import { Button } from "@vapor-ui/core";
import ExampleStackPage from "@/app/test/_components/stack-pages/_ExampleStackPage";
import Splash from "@/app/_components/Splash";
import ChatStackPage from "@/app/test/_components/stack-pages/ChatStackPage";
import BookRequestStackPage from "@/app/_components/mock/BookRequestStackPage";
import ChatContentsStackPage from "@/app/_components/mock/ChatContentsStackPage";
import MyPageStackPage from "@/app/_components/mock/MyPageStackPage";

export default function Test() {
  const [isHospitalDetailStackPageOpen, setIsHospitalDetailStackPageOpen] =
    useState(false);
  const [isExampleStackPageOpen, setIsExampleStackPageOpen] = useState(false);
  const [isChatStackPageOpen, setIsChatStackPageOpen] = useState(false);
  const [isBookRequestStackPageOpen, setIsBookRequestStackPageOpen] =
    useState(false);
  const [isChatContentsStackPage, setIsChatContentsStackPage] = useState(false);
  const [isMyPageStackPageOpen, setIsMyPageStackPageOpen] = useState(false);
  return (
    <div>
      {/*  번역 테스트  */}
      <Translator />

      {/* 스택페이지 오픈 버튼 리스트 */}
      <div className="flex! gap-[8px]!">
        <Button onClick={() => setIsHospitalDetailStackPageOpen(true)}>
          병원 스택페이지 열기
        </Button>
        <Button onClick={() => setIsExampleStackPageOpen(true)}>
          예시 스택페이지 열기
        </Button>
        <Button onClick={() => setIsChatStackPageOpen(true)}>
          채팅 스택페이지 열기
        </Button>
        <Button onClick={() => setIsBookRequestStackPageOpen(true)}>
          예약 스택페이지 열기
        </Button>
        <Button onClick={() => setIsMyPageStackPageOpen(true)}>
          마이페이지 스택페이지 열기
        </Button>
      </div>

      {/* 스택 페이지 리스트 */}
      <>
        <ExampleStackPage
          isOpen={isExampleStackPageOpen}
          onClose={() => setIsExampleStackPageOpen(false)}
        />
        <HospitalDetailStackPage
          isOpen={isHospitalDetailStackPageOpen}
          onClose={() => setIsHospitalDetailStackPageOpen(false)}
        />
        <ChatStackPage
          isOpen={isChatStackPageOpen}
          onClose={() => setIsChatStackPageOpen(false)}
        />
        <MyPageStackPage
          isOpen={isMyPageStackPageOpen}
          onClose={() => setIsMyPageStackPageOpen(false)}
        />
      </>
      <Splash />
    </div>
  );
}
