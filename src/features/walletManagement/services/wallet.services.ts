import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import { Wallet } from '../types';

const WALLETS_ENDPOINT = API_ROUTES.WALLET_MANAGEMENT;
export interface WalletQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface WalletResponse {
  status: number;
  message: string;
  data: Wallet[];
}

export class WalletService {
  static async getWallets(params?: WalletQueryParams): Promise<WalletResponse> {
    return ApiService.get<WalletResponse>(WALLETS_ENDPOINT.BASE, { params });
  }

  static async getWalletByWalletID(walletID: string): Promise<Wallet> {
    return ApiService.get<Wallet>(`${WALLETS_ENDPOINT.DETAIL_BY_ID(walletID)}`);
  }

  static async getWalletByWalletNumber(walletNumber: string): Promise<Wallet> {
    return ApiService.get<Wallet>(`${WALLETS_ENDPOINT.DETAIL_BY_WALLET_NUMBER(walletNumber)}`);
  }

  static async getWalletByUser(userID: string): Promise<Wallet> {
    return ApiService.get<Wallet>(`${WALLETS_ENDPOINT.DETAIL_BY_USER(userID)}`);
  }

  static async createWallet(data: Pick<Wallet, 'wallet_type'>): Promise<Wallet> {
    return ApiService.post<Wallet>(WALLETS_ENDPOINT.CREATE, data);
  }

  static async updateWallet(id: string, data: Partial<Wallet>): Promise<Wallet> {
    return ApiService.put<Wallet>(`${WALLETS_ENDPOINT}/${id}`, data);
  }

  static async deleteWallet(id: string): Promise<void> {
    return ApiService.delete<void>(`${WALLETS_ENDPOINT}/${id}`);
  }
}
