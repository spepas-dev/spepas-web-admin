import { Gopa, SellerDetails } from '@/features/userManagement/types/sellers.types';

export interface User {
  id: number;
  User_ID: string;
  name: string;
  registeredBy: string | null;
  email: string;
  password: string;
  phoneNumber: string;
  verificationStatus: number;
  status: number;
  user_type: string;
  Seller_ID: string | null;
  referral_Code: string | null;
  createdAt: string;
  updatedAt: string;
  gopa: Gopa | null;
  sellerDetails: SellerDetails | null;
}

export type CreateUserDto = Omit<User, 'id' | 'User_ID' | 'createdAt' | 'updatedAt' | 'password' | 'gopa' | 'sellerDetails'>;

export type UpdateUserDto = Partial<CreateUserDto>;
