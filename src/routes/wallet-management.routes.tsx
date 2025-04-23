import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const WalletsPage = lazy(() => import('@/features/walletManagement/components/wallet'));

export const walletManagementRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.WALLET_MANAGEMENT.BASE,
    children: [
      {
        path: ROUTE_PATHS.WALLET_MANAGEMENT.WALLETS.BASE,
        children: [{ index: true, element: <WalletsPage /> }]
      }
    ]
  }
];
