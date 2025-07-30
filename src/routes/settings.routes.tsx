import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const SettingsPage = lazy(() => import('@/features/settings/components/settings'));

export const settingsRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.SETTINGS.BASE,
    element: <SettingsPage />
  }
];
