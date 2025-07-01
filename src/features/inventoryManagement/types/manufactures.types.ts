import { Brand } from './brands.types';

export interface Manufacturer {
  id: number;
  Manufacturer_ID: string;
  name: string;
  country: string;
  status: number;
  createdAt: string;
  brands: Brand[];
}

export interface CreateManufacturerDTO {
  name: string;
  country: string;
}

export interface UpdateManufacturerDTO extends Partial<CreateManufacturerDTO> {
  // Additional fields specific to updates can go here
}
