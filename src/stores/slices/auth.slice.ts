import { NavigateFunction } from 'react-router-dom';
import { StateCreator } from 'zustand';

import { toastConfig } from '@/lib/toast';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types';

export interface AuthSlice {
  token: string | null;
  user: User | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    setToken: (token: string | null) => void;
    setRefreshToken: (refresh_token: string | null) => void;
    setUser: (user: AuthSlice['user']) => void;
    setLoading: (isLoading: boolean) => void;
    logout: (navigate?: NavigateFunction) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    checkAuth: () => void;
  };
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  token: null,
  refresh_token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  actions: {
    setToken: (token) => set({ token, isAuthenticated: !!token }),
    setRefreshToken: (refresh_token) => set({ refresh_token, isAuthenticated: !!refresh_token }),
    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),

    login: async (email: string, password: string) => {
      try {
        set({ isLoading: true });
        const {
          data: { token, refreshToken, user }
        } = await AuthService.login(email, password);

        localStorage.setItem('auth_token', token);

        set({
          token,
          refresh_token: refreshToken,
          user,
          isAuthenticated: true,
          isLoading: false
        });

        toastConfig.success('Login successful');
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    logout: async (navigate?: NavigateFunction) => {
      try {
        set({ isLoading: true });
        await AuthService.logout();
        localStorage.removeItem('auth_token');
        set({
          token: null,
          refresh_token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        });

        if (navigate) {
          navigate('/auth/login');
        } else {
          window.location.replace('/auth/login');
        }
      } catch (error) {
        set({ isLoading: false });
        console.error('Logout error:', error);
      }
    },

    checkAuth: () => {
      set({ isLoading: true });
      const token = localStorage.getItem('auth_token');
      const state = get();

      if (token && state.user) {
        // User is authenticated if we have both token and user data
        set({
          token,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        // No token or user data, clear auth state
        localStorage.removeItem('auth_token');
        set({
          token: null,
          refresh_token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    }
  }
});
