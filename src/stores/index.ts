import React from 'react';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ModalConfig } from '@/types';

import { type AuthSlice, createAuthSlice } from './slices/auth.slice';
import { createFiltersSlice, type FiltersSlice } from './slices/filters.slice';
import { createGlobalSlice, type GlobalSlice } from './slices/global.slice';
import { createModalSlice, type ModalSlice } from './slices/modal.slice';
import { createUISlice, type UISlice } from './slices/ui.slice';

export type StoreState = Omit<AuthSlice, 'actions'> &
  Omit<FiltersSlice, 'actions'> &
  Omit<UISlice, 'actions'> &
  Omit<ModalSlice, 'actions'> &
  Omit<GlobalSlice, 'actions'> & {
    actions: AuthSlice['actions'] & FiltersSlice['actions'] & UISlice['actions'] & ModalSlice['actions'] & GlobalSlice['actions'];
  };

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => {
        const authSlice = createAuthSlice(...a);
        const filtersSlice = createFiltersSlice(...a);
        const uiSlice = createUISlice(...a);
        const modalSlice = createModalSlice(...a);
        const globalSlice = createGlobalSlice(...a);
        return {
          ...authSlice,
          ...filtersSlice,
          ...uiSlice,
          ...modalSlice,
          ...globalSlice,
          // Merge actions from all slices
          actions: {
            ...authSlice.actions,
            ...filtersSlice.actions,
            ...uiSlice.actions,
            ...modalSlice.actions,
            ...globalSlice.actions
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

// UI Hook
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

// Modal Hook
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

// Global Hook
export const useGlobal = () => {
  const isLoading = useStore((state) => state.isLoading);
  const isError = useStore((state) => state.isError);
  const data = useStore((state) => state.data);
  const actions = useStore((state) => state.actions);

  return {
    isLoading,
    isError,
    data,
    setLoading: actions.setLoading,
    setError: actions.setError,
    setData: actions.setData,
    loadInventoryData: actions.loadInventoryData
  };
};
