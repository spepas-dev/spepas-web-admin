import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { CreateManufacturerDTO, Manufacturer } from '../types/manufactures.types';

const MANUFACTURER_ENDPOINT = API_ROUTES.INVENTORY_MANAGEMENT.CAR.MANUFACTURER;
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
    }>(`${MANUFACTURER_ENDPOINT.BASE}`, { params });
  }

  /**
   * Get a single brand by ID
   */
  static async getManufacturer(id: string) {
    return ApiService.get<Manufacturer>(`${MANUFACTURER_ENDPOINT.DETAIL(id)}`);
  }

  /**
   * Create a new brand
   */
  static async createManufacturer(data: CreateManufacturerDTO[]) {
    return ApiService.post<Manufacturer>(`${MANUFACTURER_ENDPOINT.CREATE}`, data);
  }
}
