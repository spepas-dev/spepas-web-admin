import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const CallsOrdersPage = lazy(() => import('@/features/callManagement/components/call-orders'));

export const callManagementRoutes: RouteObject[] = [
  {
    path: `${ROUTE_PATHS.CALL_MANAGEMENT.BASE}/${ROUTE_PATHS.CALL_MANAGEMENT.CALLS_ORDERS.BASE}`,
    children: [{ index: true, element: <CallsOrdersPage /> }]
  }
];
