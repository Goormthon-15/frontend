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
  // Next.js rewrites를 통한 프록시 사용 (CORS 문제 해결)
  baseURL: "/api",
});

const setDefaultRequestHeaders = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers.set("Content-Type", "application/json");

  return config;
};

// requester 인터셉터 설정
apiRequester.interceptors.request.use(setDefaultRequestHeaders);
