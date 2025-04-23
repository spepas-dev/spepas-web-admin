// import { AxiosRequestConfig } from 'axios';

// import { axiosInstance } from '@/lib/axios';

// export class ApiService {
//   static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
//     const response = await axiosInstance.get<T>(url, config);
//     return response.data;
//   }

//   static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
//     const response = await axiosInstance.post<T>(url, data, config);
//     return response.data;
//   }

//   static async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
//     const response = await axiosInstance.put<T>(url, data, config);
//     return response.data;
//   }

//   static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
//     const response = await axiosInstance.delete<T>(url, config);
//     return response.data;
//   }

//   static async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
//     const response = await axiosInstance.patch<T>(url, data, config);
//     return response.data;
//   }

//   static async request<T>(config: AxiosRequestConfig): Promise<T> {
//     const response = await axiosInstance<T>(config);
//     return response.data;
//   }
// }

import { AxiosRequestConfig } from 'axios';

import { axiosInstance, axiosInstanceAuth } from '@/lib/axios';

export class ApiService {
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  }

  // static async getAuth<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  //   const response = await axiosInstanceAuth.get<T>(url, config);
  //   return response.data;
  // }

  static async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  static async postAuth<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstanceAuth.post<T>(url, data, config);
    return response.data;
  }

  // static async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  //   const response = await axiosInstanceAuth.post<T>(url, data, config);
  //   return response.data;
  // }

  static async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  }

  static async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  static async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance<T>(config);
    return response.data;
  }
}
