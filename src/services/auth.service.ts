import { API_ROUTES } from '@/config/api.config';

import { ApiService } from './api.service';

interface AuthResponse {
  status: number;
  message: string;
  data: {
    token: string;
    user: unknown;
    refreshToken: string;
  };
}

export class AuthService {
  static async login(email: string, password: string) {
    return ApiService.postAuth<AuthResponse>(API_ROUTES.AUTH.LOGIN, { email, password }, { withCredentials: true });
  }

  static async getManufactures() {
    const data = ApiService.get<unknown>('/api/gateway/v1/inventry/car-manufacturers-all');
    console.log(data, 'Data=============================================;');
    return data;
  }

  static async logout() {
    return ApiService.post('/auth/logout');
  }

  static async getCurrentUser() {
    return ApiService.get<AuthResponse['data']['user']>('/auth/user');
  }
}
