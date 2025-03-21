import { ApiService } from "@/services/api.service";
import { UserRole, CreateUserRoleDto, UpdateUserRoleDto, UserRoleListResponse, UserRoleResponse, UserRoleStats } from "../types/role.types";

const API_URL = '/access-management/role'

export interface RoleQueryParams {
    search?: string
    sort?: string
    page?: number
    limit?: number
}

export class RoleService {
    static async getRole(id: string) {
        return  ApiService.get<UserRoleResponse>(`${API_URL}/${id}`)
    }

    static async createRole(data: CreateUserRoleDto) {
        return  ApiService.post<UserRole>(API_URL, data)
    }

    static async updateRole(id: string, data: UpdateUserRoleDto) {
        return  ApiService.put<UserRole>(`${API_URL}/${id}`, data)
    }

    static async deleteRole(id: string) {
        return  ApiService.delete<void>(`${API_URL}/${id}`)
    }

    static async getRoleList(params?: RoleQueryParams) {
        return  ApiService.get<UserRoleListResponse>(API_URL, { params })
    }

    static async getRoleStats(id: string) {
        return  ApiService.get<UserRoleStats>(`${API_URL}/${id}/stats`)
    }
    
    
}