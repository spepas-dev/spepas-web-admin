import { ApiService } from '@/services/api.service';

import { CreateUserRoleDto, UpdateUserRoleDto, UserRole, UserRoleListResponse, UserRoleResponse, UserRoleStats } from '../types/role.types';

const API_URL = '/access-management/role';
const ROLE_LIST_URL = '/auth/permissions';
const ROLE_CREATE_URL = '/auth/add-permission';

export interface RoleQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class RoleService {
  static async getRole(id: string) {
    return ApiService.get<UserRoleResponse>(`${API_URL}/${id}`);
  }

  static async createRole(data: CreateUserRoleDto) {
    return ApiService.post<UserRole>(ROLE_CREATE_URL, data);
  }

  static async updateRole(id: string, data: UpdateUserRoleDto) {
    return ApiService.put<UserRole>(`${API_URL}/${id}`, data);
  }

  static async deleteRole(id: string) {
    return ApiService.delete<void>(`${API_URL}/${id}`);
  }

  static async getRoleList(params?: RoleQueryParams) {
    return ApiService.get<UserRoleListResponse>(ROLE_LIST_URL, { params });
  }

  static async getRoleStats(id: string) {
    return ApiService.get<UserRoleStats>(`${API_URL}/${id}/stats`);
  }
}
