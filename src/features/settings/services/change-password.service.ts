import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import { ChangePasswordDTO } from '../types/settings.types';

const CHANGE_PASSWORD_ENDPOINT = API_ROUTES.AUTH.CHANGE_PASSWORD;

export class ChangePasswordService {
  static async changePassword(data: ChangePasswordDTO) {
    return ApiService.post(CHANGE_PASSWORD_ENDPOINT, data);
  }
}
