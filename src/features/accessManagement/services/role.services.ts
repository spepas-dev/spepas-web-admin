import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import { CreateUserRoleDto, UpdateUserRoleDto, UserRole, UserRoleListResponse, UserRoleResponse, UserRoleStats } from '../types/role.types';

const API_URL = API_ROUTES.ACCESS_MANAGEMENT.ROLE;

export interface RoleQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class RoleService {
  static async getRole(id: string) {
    return ApiService.get<UserRoleResponse>(API_URL.DETAIL(id));
  }

  static async createRole(data: CreateUserRoleDto) {
    return ApiService.post<UserRole>(API_URL.CREATE, data);
  }

  static async updateRole(id: string, data: UpdateUserRoleDto) {
    return ApiService.put<UserRole>(`${API_URL}/${id}`, data);
  }

  static async deleteRole(id: string) {
    return ApiService.delete<void>(`${API_URL}/${id}`);
  }

  static async getRoleList(params?: RoleQueryParams) {
    return ApiService.get<UserRoleListResponse>(API_URL.BASE, { params });
  }

  static async getRoleStats(id: string) {
    return ApiService.get<UserRoleStats>(`${API_URL}/${id}/stats`);
  }
}
