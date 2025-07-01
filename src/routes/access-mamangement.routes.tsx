import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const PermissionsPage = lazy(() => import('@/features/accessManagement/components/permissions'));
const RolesPage = lazy(() => import('@/features/accessManagement/components/roles'));
const MenusPage = lazy(() => import('@/features/accessManagement/components/menus'));
const GroupsPage = lazy(() => import('@/features/accessManagement/components/groups'));
const ApplicationsPage = lazy(() => import('@/features/accessManagement/components/applications'));

export const accessManagementRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ACCESS_MANAGEMENT.BASE,
    children: [
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.PERMISSION.BASE, element: <PermissionsPage /> },
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.ROLE.BASE, element: <RolesPage /> },
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.MENU_GROUP.BASE, element: <MenusPage /> },
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.GROUP.BASE, element: <GroupsPage /> },
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.APPLICATION.BASE, element: <ApplicationsPage /> }
    ]
  }
];
