import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const PermissionsPage = lazy(() => import('@/features/accessManagement/components/permissions'));
const RolesPage = lazy(() => import('@/features/accessManagement/components/roles'));
const MenusPage = lazy(() => import('@/features/accessManagement/components/menus'));
const GroupsPage = lazy(() => import('@/features/accessManagement/components/groups'));
const GroupDetailsPage = lazy(() => import('@/features/accessManagement/components/groups/group/group'));
const ApplicationsPage = lazy(() => import('@/features/accessManagement/components/applications'));
const ApplicationDetailPage = lazy(() => import('@/features/accessManagement/components/applications/application-detail'));

export const accessManagementRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ACCESS_MANAGEMENT.BASE,
    children: [
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.PERMISSION.BASE, element: <PermissionsPage /> },
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.ROLE.BASE, element: <RolesPage /> },
      { path: ROUTE_PATHS.ACCESS_MANAGEMENT.MENU.BASE, element: <MenusPage /> },
      {
        path: ROUTE_PATHS.ACCESS_MANAGEMENT.GROUP.BASE,
        children: [
          { index: true, element: <GroupsPage /> },
          { path: ROUTE_PATHS.ACCESS_MANAGEMENT.GROUP.DETAIL(':groupId'), element: <GroupDetailsPage /> }
        ]
      },
      {
        path: ROUTE_PATHS.ACCESS_MANAGEMENT.APPLICATION.BASE,
        children: [
          { index: true, element: <ApplicationsPage /> },
          { path: ROUTE_PATHS.ACCESS_MANAGEMENT.APPLICATION.DETAIL(':applicationId'), element: <ApplicationDetailPage /> }
        ]
      }
    ]
  }
];
