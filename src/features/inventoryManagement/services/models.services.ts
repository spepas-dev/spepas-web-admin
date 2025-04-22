import { ApiService } from '@/services/api.service';

import type { CarModel, CreateCarModel, UpdateCarModel } from '../types/models.types';

const ALL_CAR_MODELS_ENDPOINT = '/inventry/car-models-all';
const CAR_MODELS_CREATE_ENDPOINT = '/inventry/add-car-model-admin';
// const BRANDS_ENDPOINT = '/car-brands'
// const CAR_MODELS_ENDPOINT = '/car-models'
// const SPARE_PARTS_ENDPOINT = '/spare-parts'
// const MANUFACTURERS_ENDPOINT = '/manufacturers'

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
    }>(`${ALL_CAR_MODELS_ENDPOINT}`, { params });
  }

  /**
   * Get a single brand by ID
   */
  static async getCarModel(id: string) {
    return ApiService.get<CarModel>(`${ALL_CAR_MODELS_ENDPOINT}/${id}`);
  }

  /**
   * Create a new brand
   */
  static async createCarModel(data: CreateCarModel[]) {
    return ApiService.post<CarModel>(`${CAR_MODELS_CREATE_ENDPOINT}`, data);
  }

  /**
   * Update an existing brand
   */
  static async updateCarModel(id: string, data: UpdateCarModel) {
    return ApiService.put<CarModel>(`${ALL_CAR_MODELS_ENDPOINT}/${id}`, data);
  }

  /**
   * Delete a brand
   */
  static async deleteCarModel(id: string) {
    return ApiService.delete<void>(`${ALL_CAR_MODELS_ENDPOINT}/${id}`);
  }

  /**
   * Get brands by manufacturer
   */
  static async getCarModelsByManufacturer(manufacturerId: string) {
    return ApiService.get<CarModel[]>(`${ALL_CAR_MODELS_ENDPOINT}/manufacturer/${manufacturerId}`);
  }

  /**
   * Bulk delete brands
   */
  static async bulkDeleteCarModels(ids: string[]) {
    return ApiService.post<void>(`${ALL_CAR_MODELS_ENDPOINT}/bulk-delete`, { ids });
  }

  /**
   * Check if brand name exists
   */
  static async checkCarModelNameExists(name: string) {
    return ApiService.get<{ exists: boolean }>(`${ALL_CAR_MODELS_ENDPOINT}/check-name`, {
      params: { name }
    });
  }

  /**
   * Get brand statistics
   */
  static async getCarModelStats(id: string) {
    return ApiService.get<{
      totalProducts: number;
      activeProducts: number;
      discontinuedProducts: number;
    }>(`${ALL_CAR_MODELS_ENDPOINT}/${id}/stats`);
  }
}
