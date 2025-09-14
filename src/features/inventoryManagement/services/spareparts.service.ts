import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { CreateSparePartDTO, SparePart } from '../types/spareparts.types';

const SPARE_PARTS_ENDPOINT = API_ROUTES.INVENTORY_MANAGEMENT.CAR.SPARE_PART;

export interface SparePartQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  manufacturer_ID?: string;
  type?: 'CAR' | 'TRUCK' | 'MOTORCYCLE';
}

export class SparePartsService {
  /**
   * Get all brands with optional filtering
   */
  static async getSpareParts(params?: { search?: string; sort?: string; page?: number; limit?: number; manufacturerId?: string }) {
    return ApiService.get<{
      data: SparePart[];
      total: number;
      page: number;
      limit: number;
    }>(`${SPARE_PARTS_ENDPOINT.BASE}`, { params });
  }

  /**
   * Get a single brand by ID
   */
  static async getSparePart(id: string) {
    return ApiService.get<SparePart>(`${SPARE_PARTS_ENDPOINT.DETAIL(id)}`);
  }

  /**
   * Create a new brand
   */
  static async createSparePart(data: CreateSparePartDTO[]) {
    return ApiService.post<SparePart>(`${SPARE_PARTS_ENDPOINT.CREATE}`, data);
  }
}
