import { ApiService } from "@/services/api.service";
import { MenuItem, CreateMenuItemDto, UpdateMenuItemDto, MenuListResponse } from "../types/menu.types";

const API_URL = '/access-management/menu'

export interface MenuQueryParams {
    search?: string
    sort?: string
    page?: number
    limit?: number
}


export class MenuService {
    
    static async getMenu(id: string) {
        return  ApiService.get<MenuItem>(`${API_URL}/${id}`)
    }
    
    static async createMenu(data: CreateMenuItemDto) {
        return  ApiService.post<MenuItem>(API_URL, data)
    }

    static async updateMenu(id: string, data: UpdateMenuItemDto) {
        return  ApiService.put<MenuItem>(`${API_URL}/${id}`, data)
    }

    static async deleteMenu(id: string) {
        return  ApiService.delete<void>(`${API_URL}/${id}`)
    }

    static async getMenuList(params?: MenuQueryParams) {
        return  ApiService.get<MenuListResponse>(API_URL, { params })
    }
}