import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { Gopa, GopaListResponse, GopaStats, RegisterGopaDTO, RegisterGopaResponse } from '../types';

const GOPA_ENDPOINT = API_ROUTES.USER_MANAGEMENT.GOPA;

export interface GopaQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  Gopa_ID?: string;
}

export class GopaService {
  static async registerGopa(data: RegisterGopaDTO): Promise<RegisterGopaResponse> {
    return ApiService.post<RegisterGopaResponse>(`${GOPA_ENDPOINT.CREATE}`, data);
  }

  static async getGopa(id: string): Promise<Gopa> {
    return ApiService.get<Gopa>(`${GOPA_ENDPOINT}/${id}`);
  }

  static async updateGopa(id: string, data: Partial<Gopa>): Promise<Gopa> {
    return ApiService.put<Gopa>(`${GOPA_ENDPOINT}/${id}`, data);
  }

  static async deleteGopa(id: string): Promise<void> {
    return ApiService.delete(`${GOPA_ENDPOINT}/${id}`);
  }

  static async getGopaStats(id: string): Promise<GopaStats> {
    return ApiService.get<GopaStats>(`${GOPA_ENDPOINT}/${id}/stats`);
  }

  static async getGopaList(params?: GopaQueryParams): Promise<GopaListResponse> {
    return ApiService.get<GopaListResponse>(`${GOPA_ENDPOINT.BASE}`, { params });
  }
}
