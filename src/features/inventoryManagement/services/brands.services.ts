import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import { Brand, BrandListResponse } from '../types';

const BRANDS_ENDPOINT = API_ROUTES.INVENTORY_MANAGEMENT.CAR.BRAND;

export interface BrandQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  manufacturer_ID?: string;
  type?: Brand['type'];
}

export class BrandsService {
  /**
   * Get all brands with optional filtering
   */
  static async getBrands(params?: BrandQueryParams): Promise<BrandListResponse> {
    return ApiService.get<BrandListResponse>(`${BRANDS_ENDPOINT.BASE}`, { params });
  }

  /**
   * Get a single brand by ID
   */
  static async getBrand(id: string): Promise<Brand> {
    return ApiService.get<Brand>(`${BRANDS_ENDPOINT.DETAIL(id)}`);
  }

  /**
   * Create a new brand
   */
  static async createBrand(data: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): Promise<Brand> {
    return ApiService.post<Brand>(`${BRANDS_ENDPOINT.CREATE}`, data);
  }
}
