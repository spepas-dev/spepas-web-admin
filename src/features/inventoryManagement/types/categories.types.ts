import { Response } from '@/types';

export interface Category {
  id: number;
  Category_ID: string;
  name: string;
  parent_ID?: string;
}

export interface CreateCategoryDTO {
  name: string;
  parent_ID?: string | null;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
  // Additional fields specific to updates can go here
}

export interface CategoryFilters {
  search?: string;
  sort?: 'name' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  parentId?: string;
}

export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
}

export type CategoryListResponse = Response<Category[]>;

export type CategoryResponse = Response<Category[]>;

export type CategoryStatsResponse = Response<CategoryStats>;
