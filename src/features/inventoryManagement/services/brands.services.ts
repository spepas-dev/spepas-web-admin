import { ApiService } from '@/services/api.service'
import type { Brand, CreateBrandDTO, UpdateBrandDTO } from '../types/brands.types'

const ALL_BRANDS_ENDPOINT = '/car-brands-all'
// const BRANDS_ENDPOINT = '/car-brands'
// const CAR_MODELS_ENDPOINT = '/car-models'
// const SPARE_PARTS_ENDPOINT = '/spare-parts'
// const MANUFACTURERS_ENDPOINT = '/manufacturers'

export interface BrandQueryParams {
  search?: string
  sort?: string
  page?: number
  limit?: number
  manufacturer_ID?: string
  type?: 'CAR' | 'TRUCK' | 'MOTORCYCLE'
}

export class BrandsService {
  /**
   * Get all brands with optional filtering
   */
  static async getBrands(params?: {
    search?: string
    sort?: string
    page?: number
    limit?: number
    manufacturerId?: string
  }) {
    return ApiService.get<{
      data: Brand[]
      total: number
      page: number
      limit: number
    }>(`${ALL_BRANDS_ENDPOINT}`, { params })
  }

  /**
   * Get a single brand by ID
   */
  static async getBrand(id: string) {
    return ApiService.get<Brand>(`${ALL_BRANDS_ENDPOINT}/${id}`)
  }

  /**
   * Create a new brand
   */
  static async createBrand(data: CreateBrandDTO) {
    return ApiService.post<Brand>(`${ALL_BRANDS_ENDPOINT}`, data)
  }

  /**
   * Update an existing brand
   */
  static async updateBrand(id: string, data: UpdateBrandDTO) {
    return ApiService.put<Brand>(`${ALL_BRANDS_ENDPOINT}/${id}`, data)
  }

  /**
   * Delete a brand
   */
  static async deleteBrand(id: string) {
    return ApiService.delete<void>(`${ALL_BRANDS_ENDPOINT}/${id}`)
  }

  /**
   * Get brands by manufacturer
   */
  static async getBrandsByManufacturer(manufacturerId: string) {
    return ApiService.get<Brand[]>(`${ALL_BRANDS_ENDPOINT}/manufacturer/${manufacturerId}`)
  }

  /**
   * Bulk delete brands
   */
  static async bulkDeleteBrands(ids: string[]) {
    return ApiService.post<void>(`${ALL_BRANDS_ENDPOINT}/bulk-delete`, { ids })
  }

  /**
   * Check if brand name exists
   */
  static async checkBrandNameExists(name: string) {
    return ApiService.get<{ exists: boolean }>(`${ALL_BRANDS_ENDPOINT}/check-name`, {
      params: { name }
    })
  }

  /**
   * Get brand statistics
   */
  static async getBrandStats(id: string) {
    return ApiService.get<{
      totalProducts: number
      activeProducts: number
      discontinuedProducts: number
    }>(`${ALL_BRANDS_ENDPOINT}/${id}/stats`)
  }
}