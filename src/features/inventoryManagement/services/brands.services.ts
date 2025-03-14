import { ApiService } from '@/services/api.service'
import type { Brand, BrandStats, BrandSummary, BrandListResponse } from '../types/brands.type'

const BRANDS_ENDPOINT = '/inventry/car-brands-all'
// const ALL_BRANDS_ENDPOINT = '/car-brands-all'
// const CAR_MODELS_ENDPOINT = '/car-models'
// const SPARE_PARTS_ENDPOINT = '/spare-parts'
// const MANUFACTURERS_ENDPOINT = '/manufacturers'

export interface BrandQueryParams {
  search?: string
  sort?: string
  page?: number
  limit?: number
  manufacturer_ID?: string
  type?: Brand['type']
}

export class BrandsService {
  /**
   * Get all brands with optional filtering
   */
  static async getBrands(params?: BrandQueryParams): Promise<BrandListResponse> {
    return ApiService.get<BrandListResponse>(`${BRANDS_ENDPOINT}`, { params })
  }

  /**
   * Get a single brand by ID
   */
  static async getBrand(id: string): Promise<Brand> {
    return ApiService.get<Brand>(`${BRANDS_ENDPOINT}/${id}`)
  }

  /**
   * Create a new brand
   */
  static async createBrand(data: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): Promise<Brand> {
    return ApiService.post<Brand>(`${BRANDS_ENDPOINT}`, data)
  }

  /**
   * Update an existing brand
   */
  static async updateBrand(id: string, data: Partial<Brand>): Promise<Brand> {
    return ApiService.put<Brand>(`${BRANDS_ENDPOINT}/${id}`, data)
  }

  /**
   * Delete a brand
   */
  static async deleteBrand(id: string): Promise<void> {
    return ApiService.delete<void>(`${BRANDS_ENDPOINT}/${id}`)
  }

  /**
   * Get brands by manufacturer
   */
  static async getBrandsByManufacturer(manufacturer_ID: string): Promise<Brand[]> {
    return ApiService.get<Brand[]>(`${BRANDS_ENDPOINT}/manufacturer/${manufacturer_ID}`)
  }

  /**
   * Get brands by vehicle type
   */
  static async getBrandsByType(type: Brand['type']): Promise<Brand[]> {
    return ApiService.get<Brand[]>(`${BRANDS_ENDPOINT}/type/${type}`)
  }

  /**
   * Bulk delete brands
   */
  static async bulkDeleteBrands(ids: string[]): Promise<void> {
    return ApiService.post<void>(`${BRANDS_ENDPOINT}/bulk-delete`, { ids })
  }

  /**
   * Check if brand name exists
   */
  static async checkBrandNameExists(name: string, manufacturer_ID: string): Promise<{ exists: boolean }> {
    return ApiService.get<{ exists: boolean }>(`${BRANDS_ENDPOINT}/check-name`, {
      params: { name, manufacturer_ID }
    })
  }

  /**
   * Get brand statistics by type
   */
  static async getBrandStats(id: string): Promise<BrandStats> {
    return ApiService.get<BrandStats>(`${BRANDS_ENDPOINT}/${id}/stats`)
  }

  /**
   * Get brands summary by type
   */
  static async getBrandsSummaryByType(): Promise<BrandSummary> {
    return ApiService.get<BrandSummary>(`${BRANDS_ENDPOINT}/summary-by-type`)
  }
}