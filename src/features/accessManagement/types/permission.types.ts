import { Response } from '@/types';

export interface Permission {
  id: number;
  permissionID: string;
  title: string;
  added_by: string;
  approved_by: string | null;
  status: number;
  date_added: string;
  description: string | null;
}

export interface PermissionStats {
  totalPermissions: number;
  activePermissions: number;
  inactivePermissions: number;
}

export type CreatePermissionDto = Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'metadata' | 'permissionID'>[];

export type UpdatePermissionDto = Partial<CreatePermissionDto>;

export type PermissionListResponse = Response<Permission[]>;

export type PermissionResponse = Response<Permission>;
