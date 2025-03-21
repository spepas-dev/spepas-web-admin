import { Response } from "@/types"

export interface Permission {
    id: string
    name: string
    description: string
    code: string
    module: string
    isActive: boolean
}

export interface PermissionStats {
    totalPermissions: number;
    activePermissions: number;
    inactivePermissions: number;
}

export type CreatePermissionDto = Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>

export type UpdatePermissionDto = Partial<CreatePermissionDto>

export type PermissionListResponse = Response<Permission[]>

export type PermissionResponse = Response<Permission>