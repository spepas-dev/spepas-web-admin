import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const BidsPage = lazy(() => import('@/features/orderManagement/bids/components'));

export const orderManagementRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ORDER_MANAGEMENT.BASE,
    children: [
      {
        path: ROUTE_PATHS.ORDER_MANAGEMENT.BIDS.BASE,
        children: [{ index: true, element: <BidsPage /> }]
      }
    ]
  }
];
