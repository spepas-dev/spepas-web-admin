import { Location, Response } from '@/types';

export interface Buyer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  status: number;
  createdAt: string;
}

export type BuyerStats = {
  totalBuyers: number;
  activeBuyers: number;
  inactiveBuyers: number;
};

export type CreateBuyerDTO = Pick<Buyer, 'createdAt'> & { User_ID: string };

export type RegisterBuyerResponse = Response<Buyer>;

export type BuyerListResponse = Response<Buyer[]>;
