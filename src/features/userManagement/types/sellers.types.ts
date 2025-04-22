import { Location, Response } from '@/types';

export interface Seller {
  id: number;
  Seller_ID: string;
  storeName: string;
  business_reg_url: string | null;
  business_reg_obj: any | null; // Adjust `any` if there's a specific structure
  Location: Location;
  Gopa_ID: string;
  date_added: string; // ISO date string
}

export type SellerStats = {
  totalSellers: number;
  activeSellers: number;
  inactiveSellers: number;
};

export type CreateSellerDTO = Pick<Seller, 'storeName' | 'Gopa_ID' | 'Location'> & { User_ID: string };

export type RegisterSellerResponse = Response<Seller>;

export type SellerListResponse = Response<Seller[]>;
