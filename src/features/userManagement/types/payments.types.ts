import { Response } from '@/types';
export type PaymentMode = 'BANK' | 'WALLET' | 'CARD' | 'CASH';

export interface PaymentAccount {
  id: number;
  Account_ID: string;
  User_ID: string;
  added_by: string;
  mode: PaymentMode;
  accountNumber: string;
  provider: string;
  name: string;
  date_added: string;
  status: string;
}

export type PaymentStats = {
  totalPayments: number;
  activePayments: number;
  inactivePayments: number;
};

export type CreatePaymentDTO = Pick<PaymentAccount, 'mode' | 'accountNumber' | 'provider' | 'User_ID' | 'name'>;

export interface UpdatePaymentDTO extends Partial<CreatePaymentDTO> {
  // Additional fields specific to updates can go here
}

export type RegisterPaymentResponse = Response<PaymentAccount>;

export type PaymentListResponse = Response<PaymentAccount[]>;
