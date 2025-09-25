"use server";

import { log } from "console";
import { cookies } from "next/headers";

const defaultOptions = {
  path: "/",
  maxAge: 60 * 60 * 24 * 3,
  httpOnly: false,
};

/** next 15ver 서버사이드 쿠키 */

export async function getServerSideCookie(name: string) {
  const awaitCookies = await cookies();
  return awaitCookies.get(name)?.value;
}

export async function setServerSideCookie(name: string, value: string) {
  const awaitCookies = await cookies();
  return awaitCookies.set(name, value, defaultOptions);
}

export async function removeServerSideCookie(name: string) {
  try {
    const awaitCookies = await cookies();
    return awaitCookies.delete(name);
  } catch (error) {
    console.log("removeServerSideCookie : ", error);
  }
}
