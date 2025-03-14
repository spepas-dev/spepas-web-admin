import { ApiService } from '@/services/api.service'
import type { SparePart, CreateSparePartDTO, UpdateSparePartDTO } from '../types/spareparts.types'

const ALL_SPARE_PARTS_ENDPOINT = '/inventry/sparepart-all'
// const BRANDS_ENDPOINT = '/car-brands'
// const CAR_MODELS_ENDPOINT = '/car-models'
// const SPARE_PARTS_ENDPOINT = '/spare-parts'
// const MANUFACTURERS_ENDPOINT = '/manufacturers'

export interface SparePartQueryParams {
  search?: string
  sort?: string
  page?: number
  limit?: number
  manufacturer_ID?: string
  type?: 'CAR' | 'TRUCK' | 'MOTORCYCLE'
}

export class SparePartsService {
  /**
   * Get all brands with optional filtering
   */
  static async getSpareParts(params?: {
    search?: string
    sort?: string
    page?: number
    limit?: number
    manufacturerId?: string
  }) {
    return ApiService.get<{
      data: SparePart[]
      total: number
      page: number
      limit: number
    }>(`${ALL_SPARE_PARTS_ENDPOINT}`, { params })
  }

  /**
   * Get a single brand by ID
   */
  static async getSparePart(id: string) {
    return ApiService.get<SparePart>(`${ALL_SPARE_PARTS_ENDPOINT}/${id}`)
  }

  /**
   * Create a new brand
   */
  static async createSparePart(data: CreateSparePartDTO) {
    return ApiService.post<SparePart>(`${ALL_SPARE_PARTS_ENDPOINT}`, data)
  }

  /**
   * Update an existing brand
   */
  static async updateSparePart(id: string, data: UpdateSparePartDTO) {
    return ApiService.put<SparePart>(`${ALL_SPARE_PARTS_ENDPOINT}/${id}`, data)
  }

  /**
   * Delete a brand
   */
  static async deleteSparePart(id: string) {
    return ApiService.delete<void>(`${ALL_SPARE_PARTS_ENDPOINT}/${id}`)
  }

  /**
   * Get brands by manufacturer
   */
  static async getSparePartsByManufacturer(manufacturerId: string) {
    return ApiService.get<SparePart[]>(`${ALL_SPARE_PARTS_ENDPOINT}/manufacturer/${manufacturerId}`)
  }

  /**
   * Bulk delete brands
   */
  static async bulkDeleteSpareParts(ids: string[]) {
    return ApiService.post<void>(`${ALL_SPARE_PARTS_ENDPOINT}/bulk-delete`, { ids })
  }

  /**
   * Check if brand name exists
   */
  static async checkSparePartNameExists(name: string) {
    return ApiService.get<{ exists: boolean }>(`${ALL_SPARE_PARTS_ENDPOINT}/check-name`, {
      params: { name }
    })
  }

  /**
   * Get brand statistics
   */
  static async getSparePartStats(id: string) {
    return ApiService.get<{
      totalProducts: number
      activeProducts: number
      discontinuedProducts: number
    }>(`${ALL_SPARE_PARTS_ENDPOINT}/${id}/stats`)
  }
}