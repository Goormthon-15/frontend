"use client";

import Splash from "@/app/_components/Splash";
import TranslatorSelectBox from "@/app/_components/TranslatorSelectBox";
import { apiRequester } from "@/libs/axios/axios.lib";
import { toast } from "@/utils/index.utils";
import { getServerSideCookie } from "@/utils/server/cookies";
import {
  Box,
  Button,
  Field,
  Flex,
  Form,
  HStack,
  Select,
  Text,
  TextInput,
  VStack,
} from "@vapor-ui/core";
import { CheckCircleOutlineIcon } from "@vapor-ui/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function Home() {
  const LANGUAGE_OPTIONS: any = {
    en: "ENGLISH",
    "zh-CHS": "CHINESE",
    "zh-CHT": "CHINESE",
    ko: "KOREA",
  };

  const router = useRouter();

  // 날짜 선택 상태 관리
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const [selectedGender, setSelectedGender] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  // 연도 옵션 생성 (현재 연도 기준으로 100년)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  // 월 옵션 생성 (1-12월)
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}월`,
  }));

  // 일 옵션 생성 (선택된 연도와 월에 따라 동적으로 계산)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const dayOptions = (() => {
    if (!selectedYear || !selectedMonth) {
      // 기본적으로 31일까지 표시
      return Array.from({ length: 31 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}일`,
      }));
    }

    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const daysInMonth = getDaysInMonth(year, month);

    return Array.from({ length: daysInMonth }, (_, i) => ({
      value: String(i + 1),
      label: `${i + 1}일`,
    }));
  })();

  const isValidMemo = useMemo(() => {
    console.log(
      firstName,
      lastName,
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedGender
    );
    return (
      firstName &&
      lastName &&
      selectedYear &&
      selectedMonth &&
      selectedDay &&
      selectedGender
    );
  }, [
    firstName,
    lastName,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedGender,
  ]);

  const createAccount = async () => {
    try {
      const locale = (await getServerSideCookie("lng")) || "en";
      const req = {
        firstName,
        lastName,
        birthDate: `${selectedYear}.${selectedMonth.padStart(
          2,
          "0"
        )}.${selectedDay.padStart(2, "0")}`,
        gender: selectedGender,
        language: LANGUAGE_OPTIONS[locale],
      };
      console.log("req!!!,", req);
      const res = await apiRequester.post("/users", req);

      if (res.status === 201) {
        toast("Account created successfully");
        router.push("/dashboard");
      }

      console.log("res!!!,", res);
    } catch (error) {
      console.log(error);
    }
  };

  // 연도나 월이 변경될 때 일 선택값 검증 및 조정
  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth);
      const day = parseInt(selectedDay);
      const daysInMonth = getDaysInMonth(year, month);

      // 선택된 일이 해당 월의 일수를 초과하는 경우 초기화
      if (day > daysInMonth) {
        setSelectedDay("");
      }
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <>
      <VStack gap={"$400"} backgroundColor={"$gray-050"} height={"100%"}>
        {/* Space Box */}
        <Box height={"72px"} className="border-b! border-[#E1E1E1]!" />

        {/* Content Box */}
        <VStack className="relative">
          <Text typography="display2" className="text-center">
            Hello
          </Text>

          <Flex gap={"$700"} alignItems={"center"}>
            <Text typography="display3" className="pl-[74px]">
              你好
            </Text>
            <Text typography="display4">您好</Text>
          </Flex>

          <Text typography="display4" className="text-end mr-[74px]">
            안녕하세요
          </Text>
        </VStack>

        {/*  Form Box  */}
        <Form
          action={(event) => {
            console.log(event);
            console.log("form submitted!!!!");
          }}
          className={"flex flex-col gap-4 grow"}
        >
          <VStack height={"100%"}>
            {/* Fields */}
            <VStack paddingX={"$300"} className="grow" gap={"$200"}>
              {/* input fields */}
              <Flex gap={"$300"}>
                <Field.Root name="first-name" validationMode="onChange">
                  <Field.Label
                    className={"font-medium text-[14px] text-[#4C4C4C]"}
                  >
                    First Name <span className="text-[#AB3406]">*</span>
                  </Field.Label>
                  <TextInput
                    type="text"
                    className="w-full h-[40px]"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field.Root>

                <Field.Root name="last-name" validationMode="onChange">
                  <Field.Label
                    className={"font-medium text-[14px] text-[#4C4C4C]"}
                  >
                    Last Name <span className="text-[#AB3406]">*</span>
                  </Field.Label>
                  <TextInput
                    type="text"
                    className="w-full h-[40px]"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field.Root>
              </Flex>

              {/* dateSelects */}
              <VStack gap={"$100"} width={"100%"}>
                <p className="text-[14px] font-medium text-[#4C4C4C]">
                  Date of Birth <span className="text-[#AB3406]">*</span>
                </p>

                {/* Date Selects */}
                <Flex gap={"$300"} width={"100%"}>
                  {/* 연도 선택 */}
                  <Select.Root
                    value={selectedYear}
                    onValueChange={(value) => setSelectedYear(String(value))}
                    placeholder="Year"
                  >
                    <Select.Trigger className="h-[40px] w-full">
                      {!selectedYear && (
                        <Select.Placeholder>Year</Select.Placeholder>
                      )}
                      <Select.Value />

                      <Select.TriggerIcon />
                    </Select.Trigger>

                    <Select.Content className="max-h-[200px] vertical-custom-scrollbar">
                      <Select.Group>
                        {yearOptions.map((year) => (
                          <Select.Item key={year.value} value={year.value}>
                            {year.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>

                  {/* 월 선택 */}
                  <Select.Root
                    value={selectedMonth}
                    onValueChange={(value) => setSelectedMonth(String(value))}
                    placeholder="Month"
                  >
                    <Select.Trigger className="h-[40px] w-full">
                      {!selectedMonth && (
                        <Select.Placeholder>Month</Select.Placeholder>
                      )}
                      <Select.Value />

                      <Select.TriggerIcon />
                    </Select.Trigger>

                    <Select.Content
                      className="max-h-[200px] vertical-custom-scrollbar"
                      style={{ maxWidth: "50px" }}
                    >
                      <Select.Group>
                        {monthOptions.map((month) => (
                          <Select.Item key={month.value} value={month.value}>
                            {month.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>

                  {/* 일 선택 */}
                  <Select.Root
                    value={selectedDay}
                    onValueChange={(value) => setSelectedDay(String(value))}
                    placeholder="Day"
                  >
                    <Select.Trigger className="h-[40px] w-full">
                      {!selectedDay && (
                        <Select.Placeholder>Date</Select.Placeholder>
                      )}
                      <Select.Value />

                      <Select.TriggerIcon />
                    </Select.Trigger>

                    <Select.Content className="max-h-[200px] vertical-custom-scrollbar -translate-x-23">
                      <Select.Group>
                        {dayOptions.map((day) => (
                          <Select.Item key={day.value} value={day.value}>
                            {day.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </VStack>

              <VStack gap={"$100"} width={"100%"}>
                <p className="text-[14px] font-medium text-[#4C4C4C]">
                  Gender <span className="text-[#AB3406]">*</span>
                </p>

                <HStack gap={"$100"} width={"100%"} height={"$500"}>
                  <Button
                    className={`w-full h-full flex justify-between border border-[#E1E1E1] ${
                      selectedGender === "FEMALE"
                        ? "border-[#106c6c]!"
                        : "bg-white"
                    }`}
                    variant={selectedGender === "FEMALE" ? "outline" : "ghost"}
                    color="primary"
                    onClick={() => setSelectedGender("FEMALE")}
                  >
                    <Box color={"$secondary-100"}>Female</Box>
                    {selectedGender === "FEMALE" && (
                      <CheckCircleOutlineIcon color="#106c6c" />
                    )}
                  </Button>

                  <Button
                    className={`w-full h-full flex justify-between border border-[#E1E1E1] ${
                      selectedGender === "MALE"
                        ? "border-[#106c6c]!"
                        : "bg-white"
                    }`}
                    variant={selectedGender === "MALE" ? "outline" : "ghost"}
                    color="primary"
                    onClick={() => setSelectedGender("MALE")}
                  >
                    <Box color={"$secondary-100"}>Male</Box>
                    {selectedGender === "MALE" && (
                      <CheckCircleOutlineIcon color="#106c6c" />
                    )}
                  </Button>
                </HStack>
              </VStack>

              <VStack gap={"$100"} width={"100%"}>
                <p className="text-[14px] font-medium text-[#4C4C4C]">
                  Language <span className="text-[#AB3406]">*</span>
                </p>
                <TranslatorSelectBox theme="select" />
              </VStack>
            </VStack>

            {/*  Submit Button  */}
            <Box paddingX={"$300"} paddingY={"$200"}>
              <Button
                type="submit"
                className="w-full h-[48px]"
                disabled={!isValidMemo}
                onClick={createAccount}
              >
                Create Account
              </Button>
            </Box>
          </VStack>
        </Form>
      </VStack>

      {/*  스플래쉬  */}
      <Splash />

      {process.env.NODE_ENV === "development" && (
        <div className="fixed left-[10px] top-[40px] bg-black text-white p-4! rounded-md cursor-pointer">
          <div
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            바로 대시보드(dev에서만 보임)
          </div>
        </div>
      )}

      {process.env.NODE_ENV === "development" && (
        <div className="fixed right-[10px] top-[40px] bg-black text-white p-4! rounded-md cursor-pointer">
          <div
            onClick={() => {
              toast("토스트 메시지");
            }}
          >
            토스트 확인해보기
          </div>
        </div>
      )}
    </>
  );
}
