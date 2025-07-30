import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { Buyer, BuyerListResponse, BuyerStats, CreateBuyerDTO, RegisterBuyerResponse } from '../types';

const BUYER_ENDPOINT = API_ROUTES.USER_MANAGEMENT.BUYER;

export interface BuyerQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class BuyersService {
  static async registerBuyer(data: CreateBuyerDTO): Promise<RegisterBuyerResponse> {
    return ApiService.post<RegisterBuyerResponse>(`${BUYER_ENDPOINT}`, data);
  }

  static async getBuyer(id: string): Promise<Buyer> {
    return ApiService.get<Buyer>(`${BUYER_ENDPOINT}/${id}`);
  }

  static async updateBuyer(id: string, data: Partial<Buyer>): Promise<Buyer> {
    return ApiService.put<Buyer>(`${BUYER_ENDPOINT}/${id}`, data);
  }

  static async deleteBuyer(id: string): Promise<void> {
    return ApiService.delete(`${BUYER_ENDPOINT}/${id}`);
  }

  static async getBuyerStats(id: string): Promise<BuyerStats> {
    return ApiService.get<BuyerStats>(`${BUYER_ENDPOINT}/${id}/stats`);
  }

  static async getBuyerList(params?: BuyerQueryParams): Promise<BuyerListResponse> {
    return ApiService.get<BuyerListResponse>(`${BUYER_ENDPOINT.BASE}`, { params });
  }
}
