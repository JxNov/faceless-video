import axios, { HttpStatusCode, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { VITE_APP_API_URL } from '@/definitions';
import { ROUTES } from '@/constants/routers';
import type { TParams } from '@/types/common.types';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const apiConfig = axios.create({
  baseURL: `${VITE_APP_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiConfig.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiConfig.interceptors.response.use(
  (res: AxiosResponse) => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return apiConfig(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          window.location.href = ROUTES.AUTH_LOGIN;
          return Promise.reject(error);
        }

        const response = await axios.post(`${VITE_APP_API_URL}/auth/refresh`, { refreshToken });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        apiConfig.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        processQueue(null, newAccessToken);

        return apiConfig(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = ROUTES.AUTH_LOGIN;
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

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
