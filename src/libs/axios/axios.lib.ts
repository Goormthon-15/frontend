import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const defaultConfig: AxiosRequestConfig = {
  timeout: 5000, // 5초
};

export const apiRequester: AxiosInstance = axios.create({
  ...defaultConfig,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const setDefaultRequestHeaders = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers.set("Content-Type", "application/json");

  return config;
};

// requester 인터셉터 설정
apiRequester.interceptors.request.use(setDefaultRequestHeaders);
