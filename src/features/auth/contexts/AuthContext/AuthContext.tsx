import React, { createContext, useContext, useEffect } from 'react';

import { toastConfig } from '@/lib/toast';
import { AuthService } from '@/services/auth.service';
import { useStore } from '@/stores';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { actions, user: loggedInUser, token} = useStore((state) => state);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (!token) {
        return;
      }

      const user = loggedInUser;
      actions.setToken(token);
      actions.setUser(user);
    } catch (error) {
      actions.logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { token, refreshToken, user }
      } = await AuthService.login(email, password);

      // localStorage.setItem('auth_token', token);

      actions.setToken(token);
      actions.setRefreshToken(refreshToken);
      actions.setUser(user);

      toastConfig.success('Login successful');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      // localStorage.removeItem('auth_token');
      actions.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
