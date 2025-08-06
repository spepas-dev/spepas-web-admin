import { Response } from '@/types';

import { Application } from './application.types';

export interface Group {
  id: string;
  title: string;
  group_applications: Pick<Application, 'application_id'>[];
  date_added: string;
  added_by: string;
  status: number;
}

// Helper type for creating a new group
export type CreateGroupDto = Omit<Group, 'id' | 'date_added' | 'added_by' | 'status'>;

// Helper type for updating an existing group
export type UpdateGroupDto = Partial<CreateGroupDto>;

export interface GroupStats {
  userCount: number;
  permissionCount: number;
  menuCount: number;
}

export type GroupListResponse = Response<Group[]>;

export type GroupResponse = Response<Group>;
