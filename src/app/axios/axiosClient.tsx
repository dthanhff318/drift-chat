import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from "app/helpers/localStorage";
// import { TRefreshTokenRequest } from "app/pages/AuthPage/slice/authTypes";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export const CONFIG_DISABLE_PAGINATION = {
  headers: {
    "x-disable-pagination": true,
  },
};

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getTokenFromLocalStorage();
  if (token != null && config) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  const language = "dfg";
  if (language && config) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Accept-Language"] = language;
  }

  return {};
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers,
    });

    // http.interceptors.request.use(
    //   injectToken
    //   , (error) =>
    //   Promise.reject(error)
    // );

    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private async handleError(error) {
    const { response, config } = error;
    if (config.url !== "/auth" && config.url !== "/auth/refresh" && response) {
      if (response.status === StatusCode.Unauthorized && !config._retry) {
        config._retry = true;
        try {
          const rs = await axiosClient.post<
            any,
            { data: { auth_token: string; refresh: string } }
          >("/auth/refresh", {
            refresh: getRefreshTokenFromLocalStorage(),
          });
          const { auth_token, refresh } = rs.data;
          // saveToken(auth_token);
          // saveRefreshToken(refresh);
          return this.http(config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
}

export const axiosClient = new Http();
