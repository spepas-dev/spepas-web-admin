import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { Bid, BidResponse, BidsListResponse, BidStats, CreateBidRequest, OrderRequest, OrdersListResponse } from '../types';

const BIDS_ENDPOINT = API_ROUTES.BID;

export interface BuyerQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class BidsService {
  static async registerBuyer(data: CreateBidRequest): Promise<BidResponse> {
    return ApiService.post<BidResponse>(`${BIDS_ENDPOINT}`, data);
  }

  static async requestBidsAll(requestId: string): Promise<OrderRequest[]> {
    return ApiService.get<OrderRequest[]>(`${BIDS_ENDPOINT.REQUEST_BIDS_ALL(requestId)}`);
  }

  static async sellerBidsForActiveRequestAll(sellerId: string): Promise<OrdersListResponse> {
    return ApiService.get<OrdersListResponse>(`${BIDS_ENDPOINT.SELLER_BIDS_FOR_ACTIVE_REQUEST_ALL(sellerId)}`);
  }

  static async sellerBidsForRequestsHistoryAll(sellerId: string): Promise<OrdersListResponse> {
    return ApiService.get<OrdersListResponse>(`${BIDS_ENDPOINT.SELLER_BIDS_FOR_REQUESTS_HISTORY_ALL(sellerId)}`);
  }
}
