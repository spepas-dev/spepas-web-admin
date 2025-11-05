// Base types for common structures
export interface Location {
  type: 'Point';
  coordinates: number[];
}

export interface ImageObject {
  [key: string]: string;
}

export interface Image {
  id: number;
  image_ID: string;
  SparePart_ID: string;
  createdAt: string;
  status: number;
  image_url: string;
  image_ob: ImageObject;
}

// Manufacturer types
export interface Manufacturer {
  id: number;
  Manufacturer_ID: string;
  name: string;
  country: string;
  status: number;
  createdAt: string;
}

// Car Brand types
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

// Car Model types
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

// Spare Part types
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

// User types
export interface User {
  User_ID: string;
  name: string;
}

// Order Request types
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

// Seller types
export interface Seller {
  id: number;
  Seller_ID: string;
  storeName: string;
  business_reg_url: string;
  business_reg_obj: Record<string, unknown>;
  Location: Location;
  Gopa_ID: string;
  date_added: string;
  status: number;
}

// Gopa types
export interface Gopa {
  User_ID: string;
  name: string;
}

// Main Bid interface
export interface Bid {
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

// Enum types for better type safety
export enum BidStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  COMPLETED = 3
}

export enum GeneralStatus {
  INACTIVE = 0,
  ACTIVE = 1
}

// API Response types
export interface BidResponse {
  success: boolean;
  data: Bid;
  message?: string;
}

export interface BidStats {
  totalBids: number;
  activeBids: number;
  completedBids: number;
  totalRevenue: number;
}

export interface BidsListResponse {
  status: number;
  message?: string;
  data: Bid[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request types for API calls
export interface CreateBidRequest {
  request_ID: string;
  Seller_ID: string;
  gopa_user_ID: string;
  price: number;
  unitPrice: number;
  description: string;
}

export interface UpdateBidRequest {
  bidding_ID: string;
  status?: BidStatus;
  price?: number;
  unitPrice?: number;
  description?: string;
}

export interface BidFilters {
  status?: BidStatus;
  seller_ID?: string;
  gopa_user_ID?: string;
  date_from?: string;
  date_to?: string;
  price_min?: number;
  price_max?: number;
}

// Legacy types for backward compatibility (keeping existing structure)
export interface LegacySparePart {
  id: string;
  name: string;
  category: string;
  totalOrders: number;
  pendingOrders: number;
}

export interface LegacyBid {
  id: string;
  partId: string;
  partName: string;
  partCategory: string;
  mechanicId: string;
  dealerId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  price: number;
  quantity: number;
  description?: string;
}
