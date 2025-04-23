import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const OrdersPage = lazy(() => import('@/features/orderManagement/bids/components'));
const SparePartOrdersPage = lazy(() => import('@/features/orderManagement/bids/components/sparepartOrders'));
const OrderDetailsPage = lazy(() => import('@/features/orderManagement/bids/components/order-details'));

export const orderManagementRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ORDER_MANAGEMENT.BASE,
    children: [
      {
        path: ROUTE_PATHS.ORDER_MANAGEMENT.ORDERS.BASE,
        children: [
          { index: true, element: <OrdersPage /> },
          {
            path: ':id',
            children: [
              { index: true, element: <SparePartOrdersPage /> },
              { path: ':id', element: <OrderDetailsPage /> }
            ]
          }
        ]
      }
    ]
  }
];
