import { NavigateFunction } from 'react-router-dom';
import { StateCreator } from 'zustand';

import { toastConfig } from '@/lib/toast';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types';

export interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    setUser: (user: AuthSlice['user']) => void;
    setLoading: (isLoading: boolean) => void;
    logout: (navigate?: NavigateFunction) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    checkAuth: () => void;
    clearAuth: () => void;
  };
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  actions: {
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (isLoading) => set({ isLoading }),

    login: async (email: string, password: string) => {
      try {
        set({ isLoading: true });

        // The login will throw an error if status is not 200
        const response = await AuthService.login(email, password);

        // Extract user data from response (handle both possible structures)
        const user = response.filtered?.user || response.user;

        if (!user) {
          throw new Error('Invalid response structure: user data not found');
        }

        // Store user data in localStorage for persistence
        localStorage.setItem('user_data', JSON.stringify(user));
        localStorage.setItem('is_authenticated', 'true');

        set({ user, isAuthenticated: true, isLoading: false });

        toastConfig.success('Login successful');
      } catch (error: unknown) {
        set({ isLoading: false, isAuthenticated: false, user: null });

        // Clear any stored data on failed login
        localStorage.removeItem('user_data');
        localStorage.removeItem('is_authenticated');

        // Enhanced error handling
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        toastConfig.error(errorMessage);

        throw error;
      }
    },

    logout: async (navigate?: NavigateFunction) => {
      try {
        set({ isLoading: true });

        // Attempt to call logout endpoint (optional, since we're not using tokens)
        try {
          await AuthService.logout();
        } catch (error) {
          // Ignore logout API errors since we're clearing local state anyway
          console.warn('Logout API call failed, but continuing with local cleanup:', error);
        }

        // Clear all auth data
        get().actions.clearAuth();

        set({ isLoading: false });

        if (navigate) {
          navigate('/auth/login');
        } else {
          // Avoid redirect loops
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/auth/login')) {
            window.location.replace('/auth/login');
          }
        }
      } catch (error) {
        set({ isLoading: false });
        console.error('Logout error:', error);
      }
    },

    clearAuth: () => {
      // Clear all auth-related data from localStorage
      localStorage.removeItem('user_data');
      localStorage.removeItem('is_authenticated');
      localStorage.removeItem('auth_token'); // Legacy cleanup
      localStorage.removeItem('refresh_token'); // Legacy cleanup

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    },

    checkAuth: () => {
      set({ isLoading: true });

      try {
        const userData = localStorage.getItem('user_data');
        const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

        if (userData && isAuthenticated) {
          const user = JSON.parse(userData);

          // Validate user data structure
          if (user && typeof user === 'object' && user.email) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            // Invalid user data, clear everything
            console.warn('Invalid user data found in localStorage, clearing auth state');
            get().actions.clearAuth();
            set({ isLoading: false });
          }
        } else {
          // No valid auth data, clear everything
          get().actions.clearAuth();
          set({ isLoading: false });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Clear corrupted data
        get().actions.clearAuth();
        set({ isLoading: false });
      }
    }
  }
});
