import { Response } from '@/types';

export interface Goro {
  id: number;
  Gopa_ID: string;
  specialties: string[];
  User_ID: string;
  status: number;
  createdAt: string;
}

export type GoroStats = {
  totalGoros: number;
  activeGoros: number;
  inactiveGoros: number;
};

export type RegisterGoroDTO = Pick<Goro, 'User_ID' | 'specialties'>;

export type RegisterGoroResponse = Response<Goro>;

export type GoroListResponse = Response<Goro[]>;
