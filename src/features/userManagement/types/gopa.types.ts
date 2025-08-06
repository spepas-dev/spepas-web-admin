import { Response } from '@/types';

export interface Gopa {
  id: number;
  Gopa_ID: string;
  specialties: string[];
  User_ID: string;
  status: number;
  createdAt: string;
}

export type GopaStats = {
  totalGopas: number;
  activeGopas: number;
  inactiveGopas: number;
};

export type RegisterGopaDTO = Pick<Gopa, 'User_ID' | 'specialties'>;

export type RegisterGopaResponse = Response<Gopa>;

export type GopaListResponse = Response<Gopa[]>;
