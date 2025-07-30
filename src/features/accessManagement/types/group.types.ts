import { Response } from '@/types';

export interface Group {
  id: string;
  title: string;
  group_applications: string[];
  createdAt: string;
  updatedAt: string;
  // isActive: boolean;
  metadata?: {
    userCount: number;
    permissionCount: number;
    menuCount: number;
  };
}

// Helper type for creating a new group
export type CreateGroupDto = Omit<Group, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>;

// Helper type for updating an existing group
export type UpdateGroupDto = Partial<CreateGroupDto>;

export interface GroupStats {
  userCount: number;
  permissionCount: number;
  menuCount: number;
}

export type GroupListResponse = Response<Group[]>;

export type GroupResponse = Response<Group>;
