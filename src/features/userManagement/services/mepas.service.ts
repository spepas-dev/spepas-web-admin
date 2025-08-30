import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { CreateMepaDTO, Mepa, MepaListResponse, MepaStats, RegisterMepaResponse } from '../types';

const MEPA_ENDPOINT = API_ROUTES.USER_MANAGEMENT.MEPA;

export interface MepaQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class MepasService {
  static async registerMepa(data: CreateMepaDTO): Promise<RegisterMepaResponse> {
    return ApiService.post<RegisterMepaResponse>(`${MEPA_ENDPOINT.CREATE}`, data);
  }

  static async getMepa(id: string): Promise<Mepa> {
    return ApiService.get<Mepa>(`${MEPA_ENDPOINT}/${id}`);
  }

  static async updateMepa(id: string, data: Partial<Mepa>): Promise<Mepa> {
    return ApiService.put<Mepa>(`${MEPA_ENDPOINT}/${id}`, data);
  }

  static async deleteMepa(id: string): Promise<void> {
    return ApiService.delete(`${MEPA_ENDPOINT}/${id}`);
  }

  static async getMepaStats(id: string): Promise<MepaStats> {
    return ApiService.get<MepaStats>(`${MEPA_ENDPOINT}/${id}/stats`);
  }

  static async getMepaList(params?: MepaQueryParams): Promise<MepaListResponse> {
    return ApiService.get<MepaListResponse>(`${MEPA_ENDPOINT.BASE}`, { params });
  }
}
