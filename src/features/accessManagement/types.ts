export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
  status: 'active' | 'inactive'
}

export interface MenuGroup {
  id: string
  title: string
  description?: string
  order?: number
  isActive: boolean
}

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

export interface Permission {
  id: string
  name: string
  description: string
  code: string
  module: string
  isActive: boolean
}

export interface Group {
  id: string
  name: string
  description: string
  users: User[]
  menuGroups: MenuGroup[]
  menuItems: MenuItem[]
  permissions: Permission[]
  createdAt: string
  updatedAt: string
  isActive: boolean
  metadata?: {
    userCount: number
    permissionCount: number
    menuCount: number
  }
}

// Helper type for creating a new group
export type CreateGroupDto = Omit<Group, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>

// Helper type for updating an existing group
export type UpdateGroupDto = Partial<CreateGroupDto>

// Helper type for group list view
export interface GroupListItem {
  id: string
  name: string
  description: string
  userCount: number
  permissionCount: number
  menuCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
} 