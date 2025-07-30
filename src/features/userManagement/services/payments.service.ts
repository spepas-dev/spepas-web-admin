import { ApiService } from '@/services/api.service';

import type {
  CreatePaymentDTO,
  PaymentAccount,
  PaymentListResponse,
  PaymentStats,
  RegisterPaymentResponse,
  UpdatePaymentDTO
} from '../types';

const PAYMENT_ENDPOINT = '/payments';

export interface PaymentQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class PaymentsService {
  static async registerPayment(data: CreatePaymentDTO): Promise<RegisterPaymentResponse> {
    return ApiService.post<RegisterPaymentResponse>(`${PAYMENT_ENDPOINT}`, data);
  }

  static async getPayment(id: string): Promise<PaymentAccount> {
    return ApiService.get<PaymentAccount>(`${PAYMENT_ENDPOINT}/${id}`);
  }

  static async updatePayment(id: string, data: UpdatePaymentDTO): Promise<PaymentAccount> {
    return ApiService.put<PaymentAccount>(`${PAYMENT_ENDPOINT}/${id}`, data);
  }

  static async deletePayment(id: string): Promise<void> {
    return ApiService.delete(`${PAYMENT_ENDPOINT}/${id}`);
  }

  static async getPaymentList(params?: PaymentQueryParams): Promise<PaymentListResponse> {
    return ApiService.get<PaymentListResponse>(`${PAYMENT_ENDPOINT}`, { params });
  }
}
