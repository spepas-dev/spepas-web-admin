export interface Location {
  type: string;
  coordinates: number[];
}

export interface Image {
  id: number;
  image_ID: string;
  SparePart_ID: string;
  createdAt: string;
  status: number;
  image_url: string;
  image_ob: Record<string, any>;
}

export interface Manufacturer {
  id: number;
  Manufacturer_ID: string;
  name: string;
  country: string;
  status: number;
  createdAt: string;
}

export interface CarBrand {
  id: number;
  CarBrand_ID: string;
  name: string;
  status: number;
  manufacturer_ID: string;
  createdAt: string;
  type: string;
  manufacturer: Manufacturer;
}

export interface CarModel {
  id: number;
  CarModel_ID: string;
  name: string;
  yearOfMake: number;
  carBrand_ID: string;
  status: number;
  createdAt: string;
  carBrand: CarBrand;
}

export interface SparePart {
  id: number;
  SparePart_ID: string;
  name: string;
  description: string;
  price: number;
  status: number;
  discount_ID: string;
  category_ID: string;
  carModel_ID: string;
  seller_ID: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  carModel: CarModel;
}

export interface User {
  User_ID: string;
  name: string;
}

export interface OrderRequest {
  id: number;
  request_ID: string;
  SparePart_ID: string;
  User_ID: string;
  added_by: string;
  status: number;
  require_image: number;
  quantity: number;
  createdAt: string;
  requester: User;
  creater: User;
  sparePart: SparePart;
}

export interface Seller {
  id: number;
  Seller_ID: string;
  storeName: string;
  business_reg_url: string;
  business_reg_obj: Record<string, any>;
  Location: Location;
  Gopa_ID: string;
  date_added: string;
  status: number;
}

export interface Gopa {
  User_ID: string;
  name: string;
}

export interface OrderDetails {
  id: number;
  bidding_ID: string;
  request_ID: string;
  assigned_by: string;
  Seller_ID: string;
  gopa_user_ID: string;
  date_assigned: string;
  status: number;
  price: number;
  unitPrice: number;
  description: string;
  createdAt: string;
  date_accepted: string;
  seller: Seller;
  images: Image[];
  gopa: Gopa;
  assigner: string;
  orderRequest: OrderRequest;
}
