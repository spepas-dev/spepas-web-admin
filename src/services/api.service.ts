import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { axiosInstance } from '@/lib/axios';

/**
 * API Service class that provides a clean interface for making HTTP requests.
 * All status code checking and authentication handling is done by axios interceptors.
 */
export class ApiService {
  /**
   * Perform a GET request
   * @param url - The endpoint URL
   * @param config - Optional axios configuration
   * @returns Promise with response data
   */
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error: any) {
      // Error handling is done by axios interceptors
      // Just re-throw with additional context if needed
      this.logError('GET', url, error);
      throw error;
    }
  }

  /**
   * Perform a POST request
   * @param url - The endpoint URL
   * @param data - Request payload
   * @param config - Optional axios configuration
   * @returns Promise with response data
   */
  static async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      this.logError('POST', url, error);
      throw error;
    }
  }

  /**
   * Perform a PUT request
   * @param url - The endpoint URL
   * @param data - Request payload
   * @param config - Optional axios configuration
   * @returns Promise with response data
   */
  static async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      this.logError('PUT', url, error);
      throw error;
    }
  }

  /**
   * Perform a DELETE request
   * @param url - The endpoint URL
   * @param config - Optional axios configuration
   * @returns Promise with response data
   */
  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error: any) {
      this.logError('DELETE', url, error);
      throw error;
    }
  }

  /**
   * Perform a PATCH request
   * @param url - The endpoint URL
   * @param data - Request payload
   * @param config - Optional axios configuration
   * @returns Promise with response data
   */
  static async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      this.logError('PATCH', url, error);
      throw error;
    }
  }

  /**
   * Perform a custom request
   * @param config - Axios request configuration
   * @returns Promise with response data
   */
  static async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance<T>(config);
      return response.data;
    } catch (error: any) {
      this.logError(config.method?.toUpperCase() || 'REQUEST', config.url || 'unknown', error);
      throw error;
    }
  }

  /**
   * Upload file with progress tracking
   * @param url - The endpoint URL
   * @param formData - FormData containing the file
   * @param onUploadProgress - Progress callback function
   * @returns Promise with response data
   */
  static async uploadFile<T>(url: string, formData: FormData, onUploadProgress?: (progressEvent: any) => void): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      });
      return response.data;
    } catch (error: any) {
      this.logError('UPLOAD', url, error);
      throw error;
    }
  }

  /**
   * Download file
   * @param url - The endpoint URL
   * @param config - Optional axios configuration
   * @returns Promise with blob response
   */
  static async downloadFile(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    try {
      const response: AxiosResponse<Blob> = await axiosInstance.get(url, {
        ...config,
        responseType: 'blob'
      });
      return response.data;
    } catch (error: any) {
      this.logError('DOWNLOAD', url, error);
      throw error;
    }
  }

  /**
   * Log API errors for debugging
   * @param method - HTTP method
   * @param url - Request URL
   * @param error - Error object
   */
  private static logError(method: string, url: string, error: any): void {
    console.error(`ApiService ${method} ${url} failed:`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
      timestamp: new Date().toISOString()
    });
  }
}
