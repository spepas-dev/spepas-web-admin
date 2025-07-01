import { useStore } from '@/stores';

/**
 * Custom hook for authentication
 * Provides a clean interface to auth state and actions using Zustand
 */
export const useAuth = () => {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isLoading = useStore((state) => state.isLoading);
  const actions = useStore((state) => state.actions);

  return {
    // State
    token,
    user,
    isAuthenticated,
    isLoading,

    // Actions
    login: actions.login,
    logout: actions.logout,
    setToken: actions.setToken,
    setUser: actions.setUser,
    checkAuth: actions.checkAuth
  };
};
