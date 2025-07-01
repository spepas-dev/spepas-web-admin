import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import PageLoader from '@/components/loaders/pageLoader';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // TODO: Implement role-based authorization when needed
  // if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};
