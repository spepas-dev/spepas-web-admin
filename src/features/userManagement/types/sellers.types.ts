import { Location, Response } from '@/types';

export interface BusinessRegError {
  name: string;
  message: string;
  http_code: number;
}

export interface Gopa {
  id: number;
  Gopa_ID: string;
  Specialties: string[];
  User_ID: string;
  status: number;
  date_added: string;
}

export interface SellerDetails {
  id: number;
  Seller_ID: string;
  storeName: string;
  business_reg_url: string | null;
  business_reg_obj: BusinessRegError | null;
  Location: Location;
  Gopa_ID: string | null;
  date_added: string;
  status: number;
}

export interface Seller {
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
  Seller_ID: string;
  referral_Code: string | null;
  createdAt: string;
  updatedAt: string;
  gopa: Gopa;
  sellerDetails: SellerDetails;
}

export type SellerStats = {
  totalSellers: number;
  activeSellers: number;
  inactiveSellers: number;
};

export type CreateSellerDTO = Pick<SellerDetails, 'storeName' | 'Gopa_ID'> & { User_ID: string; longitude: number; latitude: number };

export type RegisterSellerResponse = Response<Seller>;

export type SellerListResponse = Response<Seller[]>;
