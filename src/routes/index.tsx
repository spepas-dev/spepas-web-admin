import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ProtectedRoute } from '@/components/layout/protected-route';

import { RootLayout } from '../components/layout/root-layout';
import { accessManagementRoutes } from './access-mamangement.routes';
import { authRoutes } from './authentication.routes';
import { callManagementRoutes } from './call-management.routes';
import { inventoryManagementRoutes } from './inventory-management.routes';
import { orderManagementRoutes } from './order-management.routes';
import { settingsRoutes } from './settings.routes';
import { userManagementRoutes } from './user-management.routes';
import { walletManagementRoutes } from './wallet-management.routes';

const WelcomePage = lazy(() => import('../components/shared/welcome'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <WelcomePage /> },
      ...accessManagementRoutes,
      ...inventoryManagementRoutes,
      ...userManagementRoutes,
      ...orderManagementRoutes,
      ...callManagementRoutes,
      ...walletManagementRoutes,
      ...settingsRoutes
    ]
  },
  ...authRoutes
];

export const router = createBrowserRouter(routes);
