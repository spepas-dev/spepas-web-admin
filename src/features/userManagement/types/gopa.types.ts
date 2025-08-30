import { Response } from '@/types';

export interface GopaDetails {
  id: number;
  Gopa_ID: string;
  Specialties: string[];
  User_ID: string;
  status: number;
  date_added: string;
}

export interface Gopa {
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
  gopa: GopaDetails;
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
    Location: {
      type: string;
      coordinates: number[];
    };
    Gopa_ID: string | null;
    date_added: string;
    status: number;
  } | null;
}

export type GopaStats = {
  totalGopas: number;
  activeGopas: number;
  inactiveGopas: number;
};

export type CreateGopaDTO = Pick<GopaDetails, 'User_ID' | 'Specialties'>;

export type UpdateGopaDTO = Partial<Pick<GopaDetails, 'Specialties' | 'status'>>;

export type RegisterGopaResponse = Response<Gopa>;

export type GopaListResponse = Response<Gopa[]>;
