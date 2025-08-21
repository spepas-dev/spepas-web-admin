import { Response } from '@/types';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface MenuStats {
  totalMenus: number;
  activeMenus: number;
  inactiveMenus: number;
}

export type CreateMenuItemDto = {
  application_id: string;
  menus: {
    title: string;
  }[];
};

export type UpdateMenuItemDto = Partial<CreateMenuItemDto>;

export type MenuListResponse = Response<MenuItem[]>;

export type MenuResponse = Response<MenuItem>;
