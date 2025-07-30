import { Response } from '@/types';

export type UserType = 'SELLER' | 'RIDER' | 'MECHANIC' | 'ADMIN' | 'BUYER';

export interface User {
  User_ID: string;
  name: string;
  email: string;
  phoneNumber: string;
  verificationStatus: number;
  status: number;
  user_type: UserType;
}

export type UserStats = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
};

export interface Identification {
  id: number;
  identification_id: string;
  User_ID: string;
  added_by: string;
  idType: string;
  idN_number: string;
  issue_date: string;
  expiry_date: string;
  date_added: string;
  status: number;
  user: User;
}

export type CreateUserDTO = Pick<User, 'email' | 'name' | 'phoneNumber' | 'user_type'> & { password?: string };

export type RegisterUserResponse = Response<User>;

export type UserListResponse = Response<User[]>;
