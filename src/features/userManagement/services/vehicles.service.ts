import { ApiService } from '@/services/api.service';

import type { CreateVehicleDTO, RegisterRiderVehicleResponse, Vehicle, VehicleListResponse, VehicleStats } from '../types';

const VEHICLE_ENDPOINT = '/vehicles';

export interface VehicleQueryParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export class VehiclesService {
  static async registerRiderVehicle(data: CreateVehicleDTO): Promise<RegisterRiderVehicleResponse> {
    return ApiService.post<RegisterRiderVehicleResponse>(`${VEHICLE_ENDPOINT}`, data);
  }

  static async getVehicle(id: string): Promise<Vehicle> {
    return ApiService.get<Vehicle>(`${VEHICLE_ENDPOINT}/${id}`);
  }

  static async getVehicleStats(id: string): Promise<VehicleStats> {
    return ApiService.get<VehicleStats>(`${VEHICLE_ENDPOINT}/${id}/stats`);
  }

  static async getVehicleList(params?: VehicleQueryParams): Promise<VehicleListResponse> {
    return ApiService.get<VehicleListResponse>(`${VEHICLE_ENDPOINT}`, { params });
  }

  static async updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    return ApiService.put<Vehicle>(`${VEHICLE_ENDPOINT}/${id}`, data);
  }

  static async deleteVehicle(id: string): Promise<void> {
    return ApiService.delete(`${VEHICLE_ENDPOINT}/${id}`);
  }
}
