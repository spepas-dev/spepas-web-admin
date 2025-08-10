import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import {
  CreateGroupDto,
  Group,
  GroupApplicationMenuResponse,
  GroupApplicationsResponse,
  GroupListResponse,
  GroupStats,
  UpdateGroupDto
} from '../types/group.types';

export interface GroupQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

const API_URL = API_ROUTES.ACCESS_MANAGEMENT.GROUP;

export class GroupService {
  static async getGroup(id: string) {
    return ApiService.get<Group>(`${API_URL.DETAIL(id)}`);
  }

  static async createGroup(data: CreateGroupDto) {
    return ApiService.post<Group>(API_URL.CREATE, data);
  }

  static async updateGroup(id: string, data: UpdateGroupDto) {
    return ApiService.put<Group>(`${API_URL}/${id}`, data);
  }

  static async deleteGroup(id: string) {
    return ApiService.delete<void>(`${API_URL}/${id}`);
  }

  static async getGroupStats(id: string) {
    return ApiService.get<GroupStats>(`${API_URL}/${id}/stats`);
  }

  static async getGroupList(params?: GroupQueryParams) {
    return ApiService.get<GroupListResponse>(API_URL.BASE, { params });
  }

  static async getGroupApplications(groupId: string) {
    return ApiService.get<GroupApplicationsResponse>(API_URL.APPLICATIONS(groupId));
  }

  static async getGroupApplicationMenu(groupId: string) {
    return ApiService.get<GroupApplicationMenuResponse>(API_URL.APPLICATION_MENU(groupId));
  }
}
