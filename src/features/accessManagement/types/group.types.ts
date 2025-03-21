import {Response} from '@/types'
import { MenuGroup } from "./menugroup.types"
import {MenuItem} from './menu.types'
import {Permission} from './permission.types'
import {User} from './usergroups.types'

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
export type UpdateGroupDto = Partial<CreateGroupDto>;

export interface GroupStats {
    userCount: number
    permissionCount: number
    menuCount: number
  }

export type GroupListResponse = Response<Group[]>

export type GroupResponse = Response<Group>