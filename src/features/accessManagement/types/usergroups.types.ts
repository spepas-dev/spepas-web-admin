export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  status: 'active' | 'inactive';
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>;

export type UpdateUserDto = Partial<CreateUserDto>;
