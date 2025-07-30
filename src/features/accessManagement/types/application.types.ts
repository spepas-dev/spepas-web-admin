import { Response } from '@/types';

export interface Application {
  id: number;
  application_id: string;
  name: string;
  description?: string;
  status: number;
  dateAdded: string;
  added_by: string;
}

export interface ApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

export type CreateApplicationDto = Omit<Application, 'id' | 'application_id' | 'dateAdded' | 'added_by' | 'status'>;

export type UpdateApplicationDto = Partial<CreateApplicationDto>;

export type ApplicationListResponse = Response<Application[]>;

export type ApplicationResponse = Response<Application>;

export type ApplicationStatsResponse = Response<ApplicationStats>;
