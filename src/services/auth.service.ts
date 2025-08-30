import { API_ROUTES } from '@/config/api.config';
import { User } from '@/types';

import { ApiService } from './api.service';

interface AuthResponse {
  status: number;
  message: string;
  data: {
    token: string;
    user: User;
    refreshToken: string;
  };
}

export class AuthService {
  static async login(email: string, password: string) {
    return ApiService.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, { email, password });
  }

  static async logout() {
    return ApiService.post('/auth/signout');
  }

  static async getCurrentUser() {
    return ApiService.get<AuthResponse['data']['user']>('/auth/user');
  }
}
