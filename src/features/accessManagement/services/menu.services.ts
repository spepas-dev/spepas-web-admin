import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import { CreateMenuItemDto, MenuItem, MenuListResponse, MenuStats, UpdateMenuItemDto } from '../types/menu.types';

const API_URL = API_ROUTES.ACCESS_MANAGEMENT.MENU;

export interface MenuQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class MenuService {
  static async getMenu(id: string) {
    return ApiService.get<MenuItem>(`${API_URL.DETAIL(id)}`);
  }

  static async createMenu(data: CreateMenuItemDto) {
    return ApiService.post<MenuItem>(API_URL.CREATE, data);
  }

  static async updateMenu(id: string, data: UpdateMenuItemDto) {
    return ApiService.put<MenuItem>(`${API_URL}/${id}`, data);
  }

  static async deleteMenu(id: string) {
    return ApiService.delete<void>(`${API_URL}/${id}`);
  }

  static async getMenuList(params?: MenuQueryParams) {
    return ApiService.get<MenuListResponse>(API_URL.BASE, { params });
  }

  static async getMenuStats(id: string) {
    return ApiService.get<MenuStats>(`${API_URL}/${id}/stats`);
  }
}
