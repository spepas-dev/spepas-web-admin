import { Location, Response } from '@/types';

export interface LicenseError {
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
  business_reg_obj: LicenseError | null;
  Location: Location;
  Gopa_ID: string | null;
  date_added: string;
  status: number;
}

export interface Rider {
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

export type RiderStats = {
  totalRiders: number;
  activeRiders: number;
  inactiveRiders: number;
};

export type CreateRiderDTO = Pick<Rider, 'User_ID'> & {
  licenseNumber: string;
  longitude: number;
  latitude: number;
};

export type RegisterRiderResponse = Response<Rider>;

export type RiderListResponse = Response<Rider[]>;
