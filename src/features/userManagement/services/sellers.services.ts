import { ApiService } from '@/services/api.service';

import type { CreateSellerDTO, RegisterSellerResponse, Seller, SellerListResponse, SellerStats } from '../types';

const SELLER_ENDPOINT = '/sellers';

export interface SellerQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class SellersService {
  static async registerSeller(data: CreateSellerDTO): Promise<RegisterSellerResponse> {
    return ApiService.post<RegisterSellerResponse>(`${SELLER_ENDPOINT}`, data);
  }

  static async getSeller(id: string): Promise<Seller> {
    return ApiService.get<Seller>(`${SELLER_ENDPOINT}/${id}`);
  }

  static async updateSeller(id: string, data: Partial<Seller>): Promise<Seller> {
    return ApiService.put<Seller>(`${SELLER_ENDPOINT}/${id}`, data);
  }

  static async deleteSeller(id: string): Promise<void> {
    return ApiService.delete(`${SELLER_ENDPOINT}/${id}`);
  }

  static async getSellerStats(id: string): Promise<SellerStats> {
    return ApiService.get<SellerStats>(`${SELLER_ENDPOINT}/${id}/stats`);
  }

  static async getSellerList(params?: SellerQueryParams): Promise<SellerListResponse> {
    return ApiService.get<SellerListResponse>(`${SELLER_ENDPOINT}`, { params });
  }
}
