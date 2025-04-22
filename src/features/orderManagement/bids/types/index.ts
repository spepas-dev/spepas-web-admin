export interface SparePart {
  id: string;
  name: string;
  category: string;
  totalOrders: number;
  pendingOrders: number;
}

export interface Bid {
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
