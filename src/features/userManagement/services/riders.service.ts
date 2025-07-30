import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { CreateRiderDTO, RegisterRiderResponse, Rider, RiderListResponse, RiderStats } from '../types';

const RIDER_ENDPOINT = API_ROUTES.USER_MANAGEMENT.RIDER;

export interface RiderQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  Deliver_ID?: string;
  User_ID?: string;
}

export class RidersService {
  static async registerRider(data: CreateRiderDTO): Promise<RegisterRiderResponse> {
    return ApiService.post<RegisterRiderResponse>(`${RIDER_ENDPOINT}`, data);
  }

  static async getRider(id: string): Promise<Rider> {
    return ApiService.get<Rider>(`${RIDER_ENDPOINT.DETAIL}/${id}`);
  }

  static async updateRider(id: string, data: Partial<Rider>): Promise<Rider> {
    return ApiService.put<Rider>(`${RIDER_ENDPOINT}/${id}`, data);
  }

  static async deleteRider(id: string): Promise<void> {
    return ApiService.delete(`${RIDER_ENDPOINT}/${id}`);
  }

  static async getRiderStats(id: string): Promise<RiderStats> {
    return ApiService.get<RiderStats>(`${RIDER_ENDPOINT}/${id}/stats`);
  }

  static async getRiderList(params?: RiderQueryParams): Promise<RiderListResponse> {
    return ApiService.get<RiderListResponse>(`${RIDER_ENDPOINT.BASE}`, { params });
  }
}
