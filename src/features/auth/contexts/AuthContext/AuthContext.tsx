import React, { createContext, useContext, useEffect } from 'react';

import { toastConfig } from '@/lib/toast';
import { AuthService } from '@/services/auth.service';
import { useStore } from '@/stores';
import { User } from '@/types';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Define error type for better type safety
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { actions } = useStore((state) => state);

  useEffect(() => {
    actions.checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { token, refreshToken, user }
      } = await AuthService.login(email, password);

      actions.setToken(token);
      actions.setRefreshToken(refreshToken);
      actions.setUser(user as User);

      toastConfig.success('Login successful');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError.message || 'Login failed';
      toastConfig.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      actions.logout();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('Logout error:', apiError);
      toastConfig.error('Logout failed');
    }
  };

  return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
