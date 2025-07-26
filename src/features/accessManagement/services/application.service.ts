import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import {
  Application,
  ApplicationListResponse,
  ApplicationResponse,
  ApplicationStatsResponse,
  CreateApplicationDto,
  UpdateApplicationDto
} from '../types/application.types';

const API_URL = API_ROUTES.ACCESS_MANAGEMENT.APPLICATION;

export class ApplicationService {
  static async getApplications() {
    return ApiService.get<ApplicationListResponse>(API_URL.BASE);
  }

  static async getApplication(id: string) {
    return ApiService.get<ApplicationResponse>(API_URL.DETAIL(id));
  }

  static async getApplicationStats() {
    return ApiService.get<ApplicationStatsResponse>(API_URL.BASE);
  }

  static async createApplication(data: CreateApplicationDto) {
    return ApiService.post<ApplicationResponse>(API_URL.CREATE, data);
  }

  static async updateApplication(id: string, data: UpdateApplicationDto) {
    return ApiService.put<Application>(API_URL.UPDATE(id), data);
  }
}
