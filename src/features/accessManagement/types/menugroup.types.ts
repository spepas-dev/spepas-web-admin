import { Response } from '@/types';

export interface MenuGroup {
  id: string;
  title: string;
  description?: string;
  order?: number;
  isActive: boolean;
}

// Helper type for group list view
export interface GroupListItem {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  menuCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateMenuGroupDto = Omit<MenuGroup, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>;

export type UpdateMenuGroupDto = Partial<CreateMenuGroupDto>;

export type MenuGroupListResponse = Response<MenuGroup[]>;
