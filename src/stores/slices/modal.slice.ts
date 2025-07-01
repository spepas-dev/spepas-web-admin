import { StateCreator } from 'zustand';

import { ModalConfig } from '@/types';

export interface ModalSlice {
  modals: ModalConfig[];
  actions: {
    openModal: (config: ModalConfig) => void;
    closeModal: (id: string) => void;
    closeAllModals: () => void;
    updateModalProps: (id: string, props: Record<string, unknown>) => void;
  };
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modals: [],
  actions: {
    openModal: (config: ModalConfig) => {
      set((state) => ({
        modals: [...state.modals, config]
      }));
    },

    closeModal: (id: string) => {
      set((state) => ({
        modals: state.modals.filter((modal) => modal.id !== id)
      }));
    },

    closeAllModals: () => {
      set({ modals: [] });
    },

    updateModalProps: (id: string, props: Record<string, unknown>) => {
      set((state) => ({
        modals: state.modals.map((modal) => (modal.id === id ? { ...modal, props: { ...modal.props, ...props } } : modal))
      }));
    }
  }
});
