import { Location, Response } from '@/types';

export interface Buyer {
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
  gopa: {
    id: number;
    Gopa_ID: string;
    Specialties: string[];
    User_ID: string;
    status: number;
    date_added: string;
  } | null;
  sellerDetails: {
    id: number;
    Seller_ID: string;
    storeName: string;
    business_reg_url: string | null;
    business_reg_obj: {
      name: string;
      message: string;
      http_code: number;
    } | null;
    Location: Location;
    Gopa_ID: string | null;
    date_added: string;
    status: number;
  } | null;
}

export type BuyerStats = {
  totalBuyers: number;
  activeBuyers: number;
  inactiveBuyers: number;
};

export type CreateBuyerDTO = Pick<Buyer, 'createdAt'> & { User_ID: string };

export type RegisterBuyerResponse = Response<Buyer>;

export type BuyerListResponse = Response<Buyer[]>;
