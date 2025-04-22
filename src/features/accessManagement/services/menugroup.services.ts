import { ApiService } from '@/services/api.service';

import { CreateMenuGroupDto, MenuGroup, MenuGroupListResponse, MenuGroupResponse, UpdateMenuGroupDto } from '../types/menugroup.types';

const API_URL = '/access-management/menu-group';

export interface MenuGroupQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class MenuGroupService {
  static async getMenuGroup(id: string) {
    return ApiService.get<MenuGroup>(`${API_URL}/${id}`);
  }

  static async createMenuGroup(data: CreateMenuGroupDto) {
    return ApiService.post<MenuGroup>(API_URL, data);
  }

  static async updateMenuGroup(id: string, data: UpdateMenuGroupDto) {
    return ApiService.put<MenuGroup>(`${API_URL}/${id}`, data);
  }

  static async deleteMenuGroup(id: string) {
    return ApiService.delete<void>(`${API_URL}/${id}`);
  }

  static async getMenuGroupList(params?: MenuGroupQueryParams) {
    return ApiService.get<MenuGroupListResponse>(API_URL, { params });
  }
}
