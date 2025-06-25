import axios from 'axios';

import { ENV_CONFIG } from '@/config';

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIG.PROXY_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Set withCredentials to true only for the signin endpoint
    if (config.url?.includes('/signin')) {
      config.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
