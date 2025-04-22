import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import PageLoader from '@/components/loaders/pageLoader';
import { useStore } from '@/stores';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, isLoading, token } = useStore((state) => state);
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};
