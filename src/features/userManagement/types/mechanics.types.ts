import { Location, Response } from '@/types';

export interface BusinessRegError {
  name: string;
  message: string;
  http_code: number;
}

export interface GopaDetails {
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

export interface Mepa {
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
  gopa: GopaDetails | null;
  sellerDetails: SellerDetails | null;
}

export type MepaStats = {
  totalMechanics: number;
  activeMechanics: number;
  inactiveMechanics: number;
};

export type CreateMepaDTO = {
  shop_name: string;
  address: string;
  longitude: number;
  latitude: number;
  User_ID: string;
};

export type RegisterMepaResponse = Response<Mepa>;

export type MepaListResponse = Response<Mepa[]>;
