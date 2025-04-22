import { ApiService } from '@/services/api.service';

import type { CreateManufacturerDTO, Manufacturer, UpdateManufacturerDTO } from '../types/manufactures.types';

const ALL_MANUFACTURES_ENDPOINT = '/inventry/car-manufacturers-all';
const MANUFACTURER_CREATE_ENDPOINT = '/inventry/add-car-manufacturer-admin';

export interface ManufactureQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  manufacturer_ID?: string;
  type?: 'CAR' | 'TRUCK' | 'MOTORCYCLE';
}

export class ManufacturesService {
  /**
   * Get all manufactures with optional filtering
   */
  static async getManufactures(params?: { search?: string; sort?: string; page?: number; limit?: number; manufacturerId?: string }) {
    return ApiService.get<{
      data: Manufacturer[];
      total: number;
      page: number;
      limit: number;
    }>(`${ALL_MANUFACTURES_ENDPOINT}`, { params });
  }

  /**
   * Get a single brand by ID
   */
  static async getManufacturer(id: string) {
    return ApiService.get<Manufacturer>(`${ALL_MANUFACTURES_ENDPOINT}/${id}`);
  }

  /**
   * Create a new brand
   */
  static async createManufacturer(data: CreateManufacturerDTO[]) {
    return ApiService.post<Manufacturer>(`${MANUFACTURER_CREATE_ENDPOINT}`, data);
  }

  /**
   * Update an existing brand
   */
  static async updateManufacturer(id: string, data: UpdateManufacturerDTO) {
    return ApiService.put<Manufacturer>(`${ALL_MANUFACTURES_ENDPOINT}/${id}`, data);
  }

  /**
   * Delete a brand
   */
  static async deleteManufacturer(id: string) {
    return ApiService.delete<void>(`${ALL_MANUFACTURES_ENDPOINT}/${id}`);
  }

  /**
   * Get brands by manufacturer
   */
  static async getBrandsByManufacturer(manufacturerId: string) {
    return ApiService.get<Manufacturer[]>(`${ALL_MANUFACTURES_ENDPOINT}/manufacturer/${manufacturerId}`);
  }

  /**
   * Bulk delete brands
   */
  static async bulkDeleteManufacturers(ids: string[]) {
    return ApiService.post<void>(`${ALL_MANUFACTURES_ENDPOINT}/bulk-delete`, { ids });
  }

  /**
   * Check if brand name exists
   */
  static async checkManufacturerNameExists(name: string) {
    return ApiService.get<{ exists: boolean }>(`${ALL_MANUFACTURES_ENDPOINT}/check-name`, {
      params: { name }
    });
  }

  /**
   * Get brand statistics
   */
  static async getManufacturerStats(id: string) {
    return ApiService.get<{
      totalProducts: number;
      activeProducts: number;
      discontinuedProducts: number;
    }>(`${ALL_MANUFACTURES_ENDPOINT}/${id}/stats`);
  }
}
