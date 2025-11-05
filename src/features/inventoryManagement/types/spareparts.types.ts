import { CarModel } from './models.types';

export interface ImageObject {
  data1: string;
  data2: string;
}

export interface SparePartImage {
  id: number;
  image_ID: string;
  SparePart_ID: string;
  createdAt: string;
  status: number;
  image_url: string;
  image_ob: ImageObject;
}

export interface SparePart {
  id: number;
  SparePart_ID: string;
  name: string;
  description: string;
  price: number;
  status: number;
  discount_ID: string | null;
  category_ID: string | null;
  carModel_ID: string;
  seller_ID: string | null;
  createdAt: string;
  updatedAt: string;
  images: SparePartImage[];
  carModel: CarModel;
}

export interface CreateSparePartDTO {
  name: string;
  description: string;
  carModel_ID: string;
  category_ID: string | null;
}

// export interface UpdateSparePartDTO extends Partial<CreateSparePartDTO> {
//   // Additional fields specific to updates can go here
// }
