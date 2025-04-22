import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/config/routes.config';

const LoginPage = lazy(() => import('../features/auth/pages/login'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/forgotPassword'));
const ResetPasswordPage = lazy(() => import('../features/auth/pages/resetPassword'));
const ChangePasswordPage = lazy(() => import('../features/auth/pages/changePassword'));

export const authRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.AUTH.BASE,
    children: [
      { path: ROUTE_PATHS.AUTH.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
      { path: ROUTE_PATHS.AUTH.RESET_PASSWORD, element: <ResetPasswordPage /> },
      { path: ROUTE_PATHS.AUTH.CHANGE_PASSWORD, element: <ChangePasswordPage /> }
    ]
  }
];
