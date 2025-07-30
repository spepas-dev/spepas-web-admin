import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

const AUTH_ENDPOINT = API_ROUTES.AUTH;

export class AuthService {
  static async forgotPassword(email: string) {
    return ApiService.post(`${AUTH_ENDPOINT.FORGOT_PASSWORD}`, { email });
  }

  static async resetPassword(token: string, password: string) {
    return ApiService.post(`${AUTH_ENDPOINT.RESET_PASSWORD}`, { token, password });
  }

  static async changePassword(oldPassword: string, newPassword: string) {
    return ApiService.post(`${AUTH_ENDPOINT.CHANGE_PASSWORD}`, { oldPassword, newPassword });
  }
}
