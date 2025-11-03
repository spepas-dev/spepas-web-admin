import { CarModel } from './models.types';

export type VehicleType = 'CAR' | 'TRUCK' | 'MOTORCYCLE';

export interface Brand {
  id: number;
  CarBrand_ID: string;
  name: string;
  status: number;
  manufacturer_ID: string;
  createdAt: string;
  type: string;
  models: CarModel[];
}

export interface CreateBrandDTO {
  name: string;
  manufacturer_ID: string;
  type: VehicleType;
}

export type UpdateBrandDTO = Pick<CreateBrandDTO, 'name' | 'manufacturer_ID' | 'type'>;

export interface BrandFilters {
  search?: string;
  sort?: 'name' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  manufacturerId?: string;
  isActive?: boolean;
}

export interface BrandStats {
  totalProducts: number;
  activeProducts: number;
  discontinuedProducts: number;
}

// Response types
export interface BrandListResponse {
  data: Brand[];
  total: number;
  page: number;
  limit: number;
}
