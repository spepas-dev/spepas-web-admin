import { Response } from '@/types';

import { Application } from './application.types';

export interface Group {
  id: number;
  group_id: string;
  title: string;
  // group_applications: Pick<Application, 'application_id'>[];
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

export interface GroupApplication {
  id: number;
  groupApplicationID: string;
  date_added: string;
  status: number;
  application_id: string;
  group_id: string;
  added_by: string;
  approved_by: string | null;
  approvalComment: string | null;
  date_approved: string | null;
  application: Application;
}

export interface Menu {
  id: number;
  menuID: string;
  title: string;
  added_by: string;
  application_id: string;
  status: number;
  date_added: string;
  application: Application;
}

export interface GroupApplicationMenu {
  id: number;
  group_application_menu_id: string;
  date_added: string;
  status: number;
  menuID: string;
  group_id: string;
  added_by: string;
  approved_by: string | null;
  approval_comment: string | null;
  date_approved: string | null;
  menu: Menu;
}

export interface CreateGroupUsersDTO {
  user_id: string;
  group_id: string;
}

export type GroupApplicationsResponse = Response<GroupApplication[]>;

export type GroupApplicationMenuResponse = Response<GroupApplicationMenu[]>;

export type GroupListResponse = Response<Group[]>;

export type GroupResponse = Response<Group>;
