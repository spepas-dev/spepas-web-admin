import { ApiService } from '@/services/api.service'
import type { Mepa, MepaStats, CreateMepaDTO, RegisterMepaResponse, MepaListResponse } from '../types'

const MEPA_ENDPOINT = '/mechanics'

export interface MechanicQueryParams {
  search?: string
  sort?: string
  page?: number
  limit?: number
}

export class MechanicsService {
  static async registerMechanic(data: CreateMepaDTO): Promise<RegisterMepaResponse> {
    return ApiService.post<RegisterMepaResponse>(`${MEPA_ENDPOINT}`, data)
  }

  static async getMechanic(id: string): Promise<Mepa> {
    return ApiService.get<Mepa>(`${MEPA_ENDPOINT}/${id}`)
  }

  static async updateMechanic(id: string, data: Partial<Mepa>): Promise<Mepa> {
    return ApiService.put<Mepa>(`${MEPA_ENDPOINT}/${id}`, data)
  }

  static async deleteMechanic(id: string): Promise<void> {
    return ApiService.delete(`${MEPA_ENDPOINT}/${id}`)
  }

  static async getMechanicStats(id: string): Promise<MepaStats> {
    return ApiService.get<MepaStats>(`${MEPA_ENDPOINT}/${id}/stats`)
  }

  static async getMechanicList(params?: MechanicQueryParams): Promise<MepaListResponse> {
    return ApiService.get<MepaListResponse>(`${MEPA_ENDPOINT}`, { params })
  }
}
