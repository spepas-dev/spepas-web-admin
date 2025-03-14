export interface Permission {
    id: string
    name: string
    description: string
    code: string
    module: string
    isActive: boolean
  }

export type CreatePermissionDto = Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>

export type UpdatePermissionDto = Partial<CreatePermissionDto>