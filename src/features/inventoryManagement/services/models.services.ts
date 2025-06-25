import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { CarModel, CreateCarModel, UpdateCarModel } from '../types/models.types';

const CAR_MODELS_ENDPOINT = API_ROUTES.INVENTORY_MANAGEMENT.CAR.MODEL;

export interface CarModelQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  manufacturer_ID?: string;
  type?: 'CAR' | 'TRUCK' | 'MOTORCYCLE';
}

export class ModelsService {
  /**
   * Get all brands with optional filtering
   */
  static async getCarModels(params?: { search?: string; sort?: string; page?: number; limit?: number; manufacturerId?: string }) {
    return ApiService.get<{
      data: CarModel[];
      total: number;
      page: number;
      limit: number;
    }>(`${CAR_MODELS_ENDPOINT.BASE}`, { params });
  }

  /**
   * Get a single brand by ID
   */
  static async getCarModel(id: string) {
    return ApiService.get<CarModel>(`${CAR_MODELS_ENDPOINT.DETAIL(id)}`);
  }

  /**
   * Create a new brand
   */
  static async createCarModel(data: CreateCarModel[]) {
    return ApiService.post<CarModel>(`${CAR_MODELS_ENDPOINT.CREATE}`, data);
  }

  /**
   * Update an existing brand
   */
  static async updateCarModel(id: string, data: UpdateCarModel) {
    return ApiService.put<CarModel>(`${CAR_MODELS_ENDPOINT.DETAIL(id)}`, data);
  }
}
