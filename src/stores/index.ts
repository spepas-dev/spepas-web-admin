import React from 'react';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ModalConfig } from '@/types';

import { type AuthSlice, createAuthSlice } from './slices/auth.slice';
import { createFiltersSlice, type FiltersSlice } from './slices/filters.slice';
import { createModalSlice, type ModalSlice } from './slices/modal.slice';
// Remove unused imports
import { createUISlice, type UISlice } from './slices/ui.slice';

// export type StoreState = AuthSlice & UISlice & FiltersSlice;
export type StoreState = Omit<AuthSlice, 'actions'> &
  Omit<FiltersSlice, 'actions'> &
  Omit<UISlice, 'actions'> &
  Omit<ModalSlice, 'actions'> & {
    actions: AuthSlice['actions'] & FiltersSlice['actions'] & UISlice['actions'] & ModalSlice['actions'];
  };

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => {
        const authSlice = createAuthSlice(...a);
        const filtersSlice = createFiltersSlice(...a);
        const uiSlice = createUISlice(...a);
        const modalSlice = createModalSlice(...a);
        return {
          ...authSlice,
          ...filtersSlice,
          ...uiSlice,
          ...modalSlice,
          // Merge actions from both slices
          actions: {
            ...authSlice.actions,
            ...filtersSlice.actions,
            ...uiSlice.actions,
            ...modalSlice.actions
          }
        };
      },
      {
        name: 'app-storage',
        partialize: (state) => ({
          token: state.token,
          refresh_token: state.refresh_token,
          user: state.user,
          theme: state.theme,
          sidebar: state.sidebar
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

export const useUI = () => {
  const sidebar = useStore((state) => state.sidebar);
  const theme = useStore((state) => state.theme);
  const actions = useStore((state) => state.actions);

  return {
    sidebar,
    theme,
    toggleSidebar: actions.toggleSidebar,
    setSidebarWidth: actions.setSidebarWidth,
    setTheme: actions.setTheme
  };
};

export const useModal = (id: string) => {
  const openModal = useStore((state) => state.actions.openModal);
  const closeModal = useStore((state) => state.actions.closeModal);
  const updateModalProps = useStore((state) => state.actions.updateModalProps);

  const open = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: Record<string, any>,
    options?: ModalConfig['options']
  ) => {
    openModal({
      id,
      component,
      props,
      options
    });
  };

  const close = () => closeModal(id);
  const update = (props: Record<string, unknown>) => updateModalProps(id, props);

  return {
    open,
    close,
    update
  };
};
