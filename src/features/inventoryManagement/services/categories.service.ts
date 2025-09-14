import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { Category } from '../types/categories.types';

const CATEGORIES_ENDPOINT = API_ROUTES.INVENTORY_MANAGEMENT.CAR.CATEGORY;

export interface CategoryQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  parentId?: string;
}

export class CategoriesService {
  static async getCategories() {
    return ApiService.get<Category[]>(`${CATEGORIES_ENDPOINT.BASE}`);
  }

  static async getCategory(id: string) {
    return ApiService.get<Category>(`${CATEGORIES_ENDPOINT.DETAIL(id)}`);
  }

  static async createCategory(data: Category) {
    return ApiService.post<Category>(`${CATEGORIES_ENDPOINT.CREATE}`, data);
  }
}
