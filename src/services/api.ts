import axios, { HttpStatusCode, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { VITE_APP_API_URL } from '@/definitions';
import { ROUTES } from '@/constants/routers';
import type { TParams } from '@/types/common.types';

const apiConfig = axios.create({
  baseURL: `${VITE_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
  },
  withCredentials: true,
});

apiConfig.interceptors.response.use(
  // @ts-ignore
  (res: AxiosResponse) => {
    if (res.data.code === HttpStatusCode.Unauthorized) {
      window.location.href = ROUTES.AUTH_LOGIN;
      return Promise.reject(res);
    }

    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

const apiServices = {
  post(url: string, params?: TParams, config?: AxiosRequestConfig) {
    return apiConfig.post(url, params, config);
  },
  put(url: string, params?: TParams) {
    return apiConfig.put(url, params);
  },
  patch(url: string, params?: TParams) {
    return apiConfig.patch(url, params);
  },
  get(url: string, params?: TParams) {
    return apiConfig.get(url, { params });
  },
  getBlob(url: string, params?: TParams) {
    return apiConfig.get(url, { params, responseType: 'blob' });
  },
  delete(url: string, params?: TParams) {
    return apiConfig.delete(url, { data: params });
  },
};

export { apiServices };
