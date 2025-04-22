import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const UsersPage = lazy(() => import('@/features/userManagement/components/users'));
const SellersPage = lazy(() => import('@/features/userManagement/components/sellers'));
const RidersPage = lazy(() => import('@/features/userManagement/components/riders'));
const MechanicsPage = lazy(() => import('@/features/userManagement/components/mechanics'));
const GorosPage = lazy(() => import('@/features/userManagement/components/goros'));
const PaymentAccountsPage = lazy(() => import('@/features/userManagement/components/payments'));
const VehiclesPage = lazy(() => import('@/features/userManagement/components/vehicles'));

export const userManagementRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.USER_MANAGEMENT.BASE,
    children: [
      { index: true, element: <UsersPage /> },
      { path: ROUTE_PATHS.USER_MANAGEMENT.SELLER.BASE, children: [{ index: true, element: <SellersPage /> }] },
      // {path: ROUTE_PATHS.USER_MANAGEMENT.SELLER.DETAIL(id), children: [
      //     {index: true, element: <SellerDetailPage />}
      // ]},
      {
        path: ROUTE_PATHS.USER_MANAGEMENT.RIDER.BASE,
        children: [
          { index: true, element: <RidersPage /> },
          { path: ROUTE_PATHS.USER_MANAGEMENT.RIDER.VEHICLES.BASE, children: [{ index: true, element: <VehiclesPage /> }] }
        ]
      },
      { path: ROUTE_PATHS.USER_MANAGEMENT.MECHANIC.BASE, children: [{ index: true, element: <MechanicsPage /> }] },
      { path: ROUTE_PATHS.USER_MANAGEMENT.GORO.BASE, children: [{ index: true, element: <GorosPage /> }] },
      { path: ROUTE_PATHS.USER_MANAGEMENT.PAYMENT_ACCOUNT.BASE, children: [{ index: true, element: <PaymentAccountsPage /> }] }
    ]
  }
];
