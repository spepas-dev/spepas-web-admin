import { ApiService } from '@/services/api.service';

import {
  CallOrder,
  CallOrderBuyer,
  CallOrderResponse,
  CallOrdersListResponse,
  CallOrderStats,
  OrderPlacementForm,
  BuyerSearchResponse
} from '../call-orders/types/call-orders.types';

export class CallOrderService {
  private static readonly BASE_URL = '/call-orders';

  /**
   * Get all call orders with optional filtering
   */
  static async getCallOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    call_type?: string;
    search?: string;
  }): Promise<CallOrdersListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.call_type) queryParams.append('call_type', params.call_type);
    if (params?.search) queryParams.append('search', params.search);

    const url = `${this.BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return ApiService.get<CallOrdersListResponse>(url);
  }

  /**
   * Get a specific call order by ID
   */
  static async getCallOrder(orderId: string): Promise<CallOrderResponse> {
    return ApiService.get<CallOrderResponse>(`${this.BASE_URL}/${orderId}`);
  }

  /**
   * Create a new call order
   */
  static async createCallOrder(orderData: OrderPlacementForm): Promise<CallOrderResponse> {
    return ApiService.post<CallOrderResponse>(this.BASE_URL, orderData);
  }

  /**
   * Update an existing call order
   */
  static async updateCallOrder(orderId: string, orderData: Partial<OrderPlacementForm>): Promise<CallOrderResponse> {
    return ApiService.put<CallOrderResponse>(`${this.BASE_URL}/${orderId}`, orderData);
  }

  /**
   * Delete a call order
   */
  static async deleteCallOrder(orderId: string): Promise<{ status: number; message: string }> {
    return ApiService.delete(`${this.BASE_URL}/${orderId}`);
  }

  /**
   * Search for buyers by phone number
   */
  static async searchBuyers(phoneNumber: string): Promise<BuyerSearchResponse> {
    return ApiService.get<BuyerSearchResponse>(`/buyers/search?phone=${encodeURIComponent(phoneNumber)}`);
  }

  /**
   * Get call order statistics
   */
  static async getCallOrderStats(): Promise<{ status: number; data: CallOrderStats }> {
    return ApiService.get<{ status: number; data: CallOrderStats }>(`${this.BASE_URL}/stats`);
  }

  /**
   * Get buyer details by ID
   */
  static async getBuyerDetails(buyerId: string): Promise<{ status: number; data: CallOrderBuyer }> {
    return ApiService.get<{ status: number; data: CallOrderBuyer }>(`/buyers/${buyerId}`);
  }

  /**
   * Update call order status
   */
  static async updateCallOrderStatus(orderId: string, status: CallOrder['status']): Promise<CallOrderResponse> {
    return ApiService.patch<CallOrderResponse>(`${this.BASE_URL}/${orderId}/status`, { status });
  }

  /**
   * Get call orders by buyer ID
   */
  static async getCallOrdersByBuyer(buyerId: string): Promise<CallOrdersListResponse> {
    return ApiService.get<CallOrdersListResponse>(`${this.BASE_URL}/buyer/${buyerId}`);
  }

  /**
   * Export call orders to CSV
   */
  static async exportCallOrders(params?: { status?: string; call_type?: string; date_from?: string; date_to?: string }): Promise<Blob> {
    const queryParams = new URLSearchParams();

    if (params?.status) queryParams.append('status', params.status);
    if (params?.call_type) queryParams.append('call_type', params.call_type);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);

    const url = `${this.BASE_URL}/export${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return ApiService.downloadFile(url);
  }
}
