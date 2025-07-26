import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import {
  CreatePermissionDto,
  Permission,
  PermissionListResponse,
  PermissionResponse,
  PermissionStats,
  UpdatePermissionDto
} from '../types/permission.types';

const API_URL = API_ROUTES.ACCESS_MANAGEMENT.PERMISSION;

export interface PermissionQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class PermissionService {
  static async getPermission(id: string) {
    return ApiService.get<PermissionResponse>(`${API_URL}/${id}`);
  }

  static async createPermission(data: CreatePermissionDto) {
    return ApiService.post<Permission>(API_URL.CREATE, data);
  }

  static async updatePermission(id: string, data: UpdatePermissionDto) {
    return ApiService.put<Permission>(API_URL.UPDATE, data);
  }

  static async deletePermission(id: string) {
    return ApiService.delete<void>(`${API_URL}/${id}`);
  }

  static async getPermissionList(params?: PermissionQueryParams) {
    return ApiService.get<PermissionListResponse>(API_URL.BASE, { params });
  }

  static async getPermissionStats(id: string) {
    return ApiService.get<PermissionStats>(`${API_URL}/${id}/stats`);
  }
}
