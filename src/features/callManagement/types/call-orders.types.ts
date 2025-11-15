// Call Management Types

export interface CallOrderBuyer {
  id: number;
  User_ID: string;
  name: string;
  email: string;
  phoneNumber: string;
  verificationStatus: number;
  status: number;
  user_type: string;
  createdAt: string;
  updatedAt: string;
  totalOrders?: number;
  lastOrderDate?: string;
}

export interface CallOrderRequest {
  sparePart: {
    name: string;
    category_ID: string;
    carModel_ID: string;
    manufacturer_ID: string;
    yearOfMake: number;
    description?: string;
  };
  quantity: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  require_image: 0 | 1;
  notes?: string;
}

export interface CallOrder {
  id: number;
  order_ID: string;
  buyer_ID: string;
  admin_ID: string;
  call_type: 'PHONE' | 'USSD';
  call_duration?: number;
  order_details: CallOrderRequest;
  status: 'DRAFT' | 'SUBMITTED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  buyer: CallOrderBuyer;
  admin: {
    id: number;
    name: string;
    User_ID: string;
  };
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

export interface Category {
  id: number;
  Category_ID: string;
  name: string;
  description?: string;
  status: number;
  createdAt: string;
}

// API Response types
export interface BuyerSearchResponse {
  status: number;
  message?: string;
  data: CallOrderBuyer[];
}

export interface CallOrderResponse {
  status: number;
  message?: string;
  data: CallOrder;
}

export interface CallOrdersListResponse {
  status: number;
  message?: string;
  data: CallOrder[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ManufacturersResponse {
  status: number;
  message?: string;
  data: Manufacturer[];
}

export interface CarBrandsResponse {
  status: number;
  message?: string;
  data: CarBrand[];
}

export interface CarModelsResponse {
  status: number;
  message?: string;
  data: CarModel[];
}

export interface CategoriesResponse {
  status: number;
  message?: string;
  data: Category[];
}

// Form types
export interface BuyerSearchForm {
  phoneNumber: string;
}

export interface OrderPlacementForm {
  buyer_ID: string;
  call_type: 'PHONE' | 'USSD';
  call_duration?: number;
  sparePart: {
    name: string;
    category_ID: string;
    manufacturer_ID: string;
    carBrand_ID: string;
    carModel_ID: string;
    yearOfMake: number;
    description?: string;
  };
  quantity: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  require_image: 0 | 1;
  notes?: string;
}

// Stats types
export interface CallOrderStats {
  totalCalls: number;
  phoneOrders: number;
  ussdOrders: number;
  completedOrders: number;
  averageCallDuration: string;
  todaysCalls: number;
}
