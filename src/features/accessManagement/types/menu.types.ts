export interface MenuItem {
    id: string
    name: string
    description?: string
    icon?: string
    path: string
    permissions?: string
    parentId?: string | null
    order?: number
    isActive: boolean
  }

export type CreateMenuItemDto = Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>

export type UpdateMenuItemDto = Partial<CreateMenuItemDto>