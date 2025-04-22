import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type AuthSlice, createAuthSlice } from './slices/auth.slice';
import { createFiltersSlice, type FiltersSlice } from './slices/filters.slice';
import { createUISlice, type UISlice } from './slices/ui.slice';

// export type StoreState = AuthSlice & UISlice & FiltersSlice;
export type StoreState = AuthSlice;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a)
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          token: state.token,
          refresh_token: state.refresh_token,
          user: state.user
          // theme: state.theme,
          // sidebar: state.sidebar
        })
      }
    )
  )
);

// Create typed hooks for each slice
export const useAuth = () => {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const actions = useStore((state) => state.actions);

  return {
    token,
    user,
    isAuthenticated,
    setToken: actions.setToken,
    setUser: actions.setUser,
    logout: actions.logout
  };
};

// export const useUI = () => {
//   const sidebar = useStore((state) => state.sidebar);
//   const theme = useStore((state) => state.theme);
//   const actions = useStore((state) => state.actions);

//   return {
//     sidebar,
//     theme,
//     toggleSidebar: actions.toggleSidebar,
//     setSidebarWidth: actions.setSidebarWidth,
//     setTheme: actions.setTheme
//   };
// };

// export const useFilters = () => {
//   const inventory = useStore((state) => state.inventory);
//   const actions = useStore((state) => state.actions);

//   return {
//     filters: inventory,
//     setSelectedTypes: actions.setSelectedTypes,
//     setSearchTerm: actions.setSearchTerm,
//     setManufacturerId: actions.setManufacturerId,
//     setDateRange: actions.setDateRange,
//     resetFilters: actions.resetFilters
//   };
// };
