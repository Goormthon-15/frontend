import Cookies from "js-cookie";

// Client set cookie 함수
export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  return Cookies.set(name, value, { ...options });
};

// Client get cookie 함수
export const getCookie = (name: string) => {
  return Cookies.get(name);
};

// Client remove cookie 함수
export const removeCookie = (
  name: string,
  options?: Cookies.CookieAttributes
) => {
  return Cookies.remove(name, { ...options });
};
