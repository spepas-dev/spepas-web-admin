import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { Goro, GoroListResponse, GoroStats, RegisterGoroDTO, RegisterGoroResponse } from '../types';

const GORO_ENDPOINT = API_ROUTES.USER_MANAGEMENT.GORO;

export interface GoroQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  Gopa_ID?: string;
}

export class GoroService {
  static async registerGoro(data: RegisterGoroDTO): Promise<RegisterGoroResponse> {
    return ApiService.post<RegisterGoroResponse>(`${GORO_ENDPOINT}`, data);
  }

  static async getGoro(id: string): Promise<Goro> {
    return ApiService.get<Goro>(`${GORO_ENDPOINT}/${id}`);
  }

  static async updateGoro(id: string, data: Partial<Goro>): Promise<Goro> {
    return ApiService.put<Goro>(`${GORO_ENDPOINT}/${id}`, data);
  }

  static async deleteGoro(id: string): Promise<void> {
    return ApiService.delete(`${GORO_ENDPOINT}/${id}`);
  }

  static async getGoroStats(id: string): Promise<GoroStats> {
    return ApiService.get<GoroStats>(`${GORO_ENDPOINT}/${id}/stats`);
  }

  static async getGoroList(params?: GoroQueryParams): Promise<GoroListResponse> {
    return ApiService.get<GoroListResponse>(`${GORO_ENDPOINT.BASE}`, { params });
  }
}
