import { ApiService } from "@/services/api.service";
import { Group, CreateGroupDto, UpdateGroupDto, GroupStats, GroupListResponse } from "../types/group.types";

const API_URL = '/access-management/group'

export interface GroupQueryParams {
    search?: string
    sort?: string
    page?: number
    limit?: number
}

export class GroupService {
    
    static async getGroup(id: string) {
        return  ApiService.get<Group>(`${API_URL}/${id}`)
    }
    
    static async createGroup(data: CreateGroupDto) {
        return  ApiService.post<Group>(API_URL, data)
    }

    static async updateGroup(id: string, data: UpdateGroupDto) {
        return  ApiService.put<Group>(`${API_URL}/${id}`, data)
    }

    static async deleteGroup(id: string) {
        return  ApiService.delete<void>(`${API_URL}/${id}`)
    }

    static async getGroupStats(id: string) {
        return  ApiService.get<GroupStats>(`${API_URL}/${id}/stats`)
    }

    static async getGroupList(params?: GroupQueryParams) {
        return  ApiService.get<GroupListResponse>(API_URL, { params })
    }
}
