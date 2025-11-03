// Import shared types from bids.type.ts
import type { Gopa, Image, OrderRequest, Seller, User } from './bids.type';

// Order-specific enums
export enum OrderStatus {
  PENDING = 0,
  CONFIRMED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  CANCELLED = 4,
  REJECTED = 5
}

export enum OrderRequestStatus {
  DRAFT = 0,
  SUBMITTED = 1,
  UNDER_REVIEW = 2,
  APPROVED = 3,
  REJECTED = 4,
  CANCELLED = 5
}

export enum RequireImageStatus {
  NOT_REQUIRED = 0,
  REQUIRED = 1,
  OPTIONAL = 2
}

// Core Order Request interface
// export interface OrderRequest {
//   id: number;
//   request_ID: string;
//   SparePart_ID: string;
//   User_ID: string;
//   added_by: string;
//   status: OrderRequestStatus;
//   require_image: RequireImageStatus;
//   quantity: number;
//   createdAt: string;
//   updatedAt?: string;
//   requester: User;
//   creater: User;
//   sparePart: SparePart;
// }

// Extended Order interface that includes the full order details
export interface Order {
  id: number;
  bidding_ID: string;
  request_ID: string;
  assigned_by: string;
  Seller_ID: string;
  gopa_user_ID: string;
  date_assigned: string;
  status: OrderStatus;
  price: number;
  unitPrice: number;
  description: string;
  createdAt: string;
  updatedAt?: string;
  date_accepted: string;
  date_completed?: string;
  date_cancelled?: string;
  cancellation_reason?: string;
  seller: Seller;
  images: Image[];
  gopa: Gopa;
  assigner: string;
  orderRequest: OrderRequest;
}

// Order summary for list views
export interface OrderSummary {
  id: number;
  bidding_ID: string;
  request_ID: string;
  status: OrderStatus;
  price: number;
  quantity: number;
  createdAt: string;
  seller: {
    id: number;
    Seller_ID: string;
    storeName: string;
  };
  sparePart: {
    id: number;
    SparePart_ID: string;
    name: string;
    category_ID: string;
  };
  requester: {
    User_ID: string;
    name: string;
  };
}

// Order statistics
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  monthlyGrowth: number;
}

// Order timeline entry
export interface OrderTimelineEntry {
  id: number;
  order_ID: string;
  status: OrderStatus;
  timestamp: string;
  actor: User;
  notes?: string;
  metadata?: Record<string, unknown>;
}

// Order tracking information
export interface OrderTracking {
  order_ID: string;
  currentStatus: OrderStatus;
  estimatedDelivery?: string;
  trackingNumber?: string;
  timeline: OrderTimelineEntry[];
  lastUpdated: string;
}

// API Request types
export interface CreateOrderRequest {
  request_ID: string;
  Seller_ID: string;
  gopa_user_ID: string;
  price: number;
  unitPrice: number;
  description: string;
  quantity?: number;
}

export interface UpdateOrderRequest {
  bidding_ID: string;
  status?: OrderStatus;
  price?: number;
  unitPrice?: number;
  description?: string;
  date_accepted?: string;
  date_completed?: string;
  cancellation_reason?: string;
}

export interface CreateOrderRequestPayload {
  SparePart_ID: string;
  User_ID: string;
  quantity: number;
  require_image: RequireImageStatus;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface UpdateOrderRequestPayload {
  request_ID: string;
  status?: OrderRequestStatus;
  quantity?: number;
  require_image?: RequireImageStatus;
  description?: string;
}

// API Response types
export interface OrderResponse {
  status: number;
  message?: string;
  data: Order;
}

export interface OrdersListResponse {
  status: number;
  message?: string;
  data: Order[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OrderSummaryResponse {
  status: number;
  message?: string;
  data: OrderSummary[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OrderStatsResponse {
  status: number;
  message?: string;
  data: OrderStats;
}

export interface OrderTrackingResponse {
  status: number;
  message?: string;
  data: OrderTracking;
}

// Filter and search types
export interface OrderFilters {
  status?: OrderStatus | OrderStatus[];
  seller_ID?: string;
  gopa_user_ID?: string;
  requester_ID?: string;
  date_from?: string;
  date_to?: string;
  price_min?: number;
  price_max?: number;
  category_ID?: string;
  carModel_ID?: string;
  search?: string;
}

export interface OrderRequestFilters {
  status?: OrderRequestStatus | OrderRequestStatus[];
  User_ID?: string;
  added_by?: string;
  SparePart_ID?: string;
  category_ID?: string;
  require_image?: RequireImageStatus;
  date_from?: string;
  date_to?: string;
  search?: string;
}

export interface OrderSortOptions {
  field: 'createdAt' | 'price' | 'status' | 'date_assigned' | 'date_accepted' | 'quantity';
  direction: 'asc' | 'desc';
}

// Bulk operations
export interface BulkOrderOperation {
  orderIds: string[];
  operation: 'approve' | 'reject' | 'cancel' | 'complete' | 'assign_gopa';
  reason?: string;
  gopa_user_ID?: string;
}

export interface BulkOrderResponse {
  status: number;
  message?: string;
  data: {
    successful: string[];
    failed: Array<{
      orderId: string;
      error: string;
    }>;
  };
}

// Order export types
export interface OrderExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  filters?: OrderFilters;
  fields?: Array<keyof Order>;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface OrderExportResponse {
  status: number;
  message?: string;
  data: {
    downloadUrl: string;
    filename: string;
    expiresAt: string;
  };
}

// Order notification types
export interface OrderNotification {
  id: number;
  order_ID: string;
  recipient_ID: string;
  type: 'status_change' | 'assignment' | 'completion' | 'cancellation' | 'payment';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface OrderNotificationResponse {
  status: number;
  message?: string;
  data: OrderNotification[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Order payment types
export interface OrderPayment {
  id: number;
  order_ID: string;
  amount: number;
  currency: string;
  payment_method: 'card' | 'bank_transfer' | 'wallet' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_ID?: string;
  createdAt: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface OrderPaymentResponse {
  status: number;
  message?: string;
  data: OrderPayment;
}

// Legacy types for backward compatibility
export interface LegacyOrder {
  id: string;
  partId: string;
  partName: string;
  customerId: string;
  customerName: string;
  sellerId: string;
  sellerName: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  quantity: number;
  price: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyOrderRequest {
  id: string;
  partId: string;
  customerId: string;
  quantity: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  description?: string;
}
