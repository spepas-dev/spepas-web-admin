import { ApiService } from '@/services/api.service';

import type { CreateUserDTO, RegisterUserResponse, User, UserListResponse, UserStats } from '../types';

const USER_ENDPOINT = '/users';
const USER_REGISTRATION_ENDPOINT = '/auth/signup';

export interface UserQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class UsersService {
  static async registerUser(data: CreateUserDTO): Promise<RegisterUserResponse> {
    return ApiService.post<RegisterUserResponse>(`${USER_REGISTRATION_ENDPOINT}`, data);
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
    return ApiService.get<UserListResponse>(`${USER_ENDPOINT}`, { params });
  }
}
