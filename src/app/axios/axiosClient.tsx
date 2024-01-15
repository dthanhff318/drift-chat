import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  removeUserLs,
  saveToken,
} from 'app/helpers/localStorage';
import { pathLoginPage } from 'app/routes/routesConfig';
// import { TRefreshTokenRequest } from "app/pages/AuthPage/slice/authTypes";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export const CONFIG_DISABLE_PAGINATION = {
  headers: {
    'x-disable-pagination': true,
  },
};

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
};

const injectToken = (config: AxiosRequestConfig): any => {
  const token = getTokenFromLocalStorage();
  if (token != null && config) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error),
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private async handleError(error) {
    const { response, config } = error;

    if (config.url !== '/auth' && config.url !== '/auth/refresh' && response) {
      if (response.status === StatusCode.Unauthorized && !config._retry) {
        config._retry = true;
        try {
          const rs = await axiosClient.post<
            any,
            { data: { accessToken: string; refreshToken: string } }
          >('/auth/refresh', {
            refresh: getRefreshTokenFromLocalStorage(),
          });
          const { accessToken, refreshToken } = rs.data;
          saveToken(accessToken, 'accessToken');
          saveToken(refreshToken, 'refreshToken');
          return this.http(config);
        } catch (_error: any) {
          if (_error.response.status === StatusCode.Forbidden) {
            // window.location.href = pathLoginPage;
            removeUserLs();
          }
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
}

export const axiosClient = new Http();
