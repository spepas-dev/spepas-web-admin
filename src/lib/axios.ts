// import axios from 'axios';

// import { ENV_CONFIG } from '@/config';

// export const axiosInstance = axios.create({
//   baseURL: '/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export const axiosInstanceAuth = axios.create({
//   baseURL: '/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   withCredentials: true
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

import axios from 'axios';

import { ENV_CONFIG } from '@/config';

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIG.PROXY_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
});

// export const axiosInstance = axios.create({
//   baseURL: '/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },
//   withCredentials: true
// });

export const axiosInstanceAuth = axios.create({
  baseURL: ENV_CONFIG.PROXY_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
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

axiosInstanceAuth.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
