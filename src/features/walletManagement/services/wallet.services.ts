import { ApiService } from '@/services/api.service';

import { Wallet } from '../types';

const WALLETS_ENDPOINT = '/wallets/get-system-wallets';

export interface WalletQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class WalletService {
  static async getWallets(params?: WalletQueryParams): Promise<Wallet[]> {
    return ApiService.get<Wallet[]>(WALLETS_ENDPOINT, { params });
  }

  static async getWalletByWalletID(walletID: string): Promise<Wallet> {
    return ApiService.get<Wallet>(`${WALLETS_ENDPOINT}/${walletID}`);
  }

  static async getWalletByWalletNumber(walletNumber: string): Promise<Wallet> {
    return ApiService.get<Wallet>(`${WALLETS_ENDPOINT}/wallet-number/${walletNumber}`);
  }

  static async getWalletByUser(userID: string): Promise<Wallet> {
    return ApiService.get<Wallet>(`${WALLETS_ENDPOINT}/user/${userID}`);
  }

  static async createWallet(data: Pick<Wallet, 'wallet_type'>): Promise<Wallet> {
    return ApiService.post<Wallet>(WALLETS_ENDPOINT, data);
  }

  static async updateWallet(id: string, data: Partial<Wallet>): Promise<Wallet> {
    return ApiService.put<Wallet>(`${WALLETS_ENDPOINT}/${id}`, data);
  }

  static async deleteWallet(id: string): Promise<void> {
    return ApiService.delete<void>(`${WALLETS_ENDPOINT}/${id}`);
  }
}
