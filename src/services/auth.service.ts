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
    return ApiService.postAuth<AuthResponse>('auth/signin', { email, password });
  }

  static async logout() {
    return ApiService.post('/auth/logout');
  }

  static async getCurrentUser() {
    return ApiService.get<AuthResponse['data']['user']>('/auth/user');
  }
}
