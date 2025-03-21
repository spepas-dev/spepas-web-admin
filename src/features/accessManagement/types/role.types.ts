import { Response } from "@/types"

export interface UserRole {
    id: number;
    role_id: string;
    role_name: string;
    status: number;
    date_added: string; // ISO date string
    added_by: string;
}

export interface UserRoleStats {
    totalRoles: number;
    activeRoles: number;
    inactiveRoles: number;
}

export type CreateUserRoleDto = Omit<UserRole, 'id' | 'date_added' | 'added_by' | 'status' | 'role_id'> & { rolePermissions: {permissionID: string}[] }

export type UpdateUserRoleDto = Partial<CreateUserRoleDto>

export type UserRoleListResponse = Response<UserRole[]>

export type UserRoleResponse = Response<UserRole>