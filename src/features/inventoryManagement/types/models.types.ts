import { Brand } from './brands.types';
import { SparePart } from './spareparts.types';

export interface CarModel {
  id: number;
  CarModel_ID: string;
  name: string;
  yearOfMake: number;
  carBrand_ID: string;
  status: number;
  createdAt: string;
  spareParts: SparePart[];
  carBrand: Brand;
}

export interface CreateCarModel {
  name: string;
  carBrand_ID: string;
  yearOfMake: number;
}

export type UpdateCarModel = Pick<CreateCarModel, 'name' | 'yearOfMake'>;
