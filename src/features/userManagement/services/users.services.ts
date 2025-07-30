import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import type { CreateUserDTO, RegisterUserResponse, User, UserListResponse, UserStats } from '../types';

const USER_ENDPOINT = API_ROUTES.ACCESS_MANAGEMENT;
const ADMIN_ENDPOINT = API_ROUTES.USER_MANAGEMENT.ADMIN;

export interface UserQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class UsersService {
  static async registerUser(data: CreateUserDTO): Promise<RegisterUserResponse> {
    return ApiService.post<RegisterUserResponse>(`${USER_ENDPOINT.USER.CREATE}`, data);
  }

  static async getUser(id: string): Promise<User> {
    return ApiService.get<User>(`${USER_ENDPOINT}/${id}`);
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    return ApiService.put<User>(`${USER_ENDPOINT}/${id}`, data);
  }

  static async deleteUser(id: string): Promise<void> {
    return ApiService.delete(`${USER_ENDPOINT}/${id}`);
  }

  static async getUserStats(id: string): Promise<UserStats> {
    return ApiService.get<UserStats>(`${USER_ENDPOINT}/${id}/stats`);
  }

  static async getUserList(params?: UserQueryParams): Promise<UserListResponse> {
    return ApiService.get<UserListResponse>(`${ADMIN_ENDPOINT.BASE}`, { params });
  }
}
