import { StateCreator } from 'zustand';

import type { VehicleType } from '@/features/inventoryManagement/types/brands.type';

export interface FiltersSlice {
  inventory: {
    selectedTypes: VehicleType[];
    searchTerm: string;
    manufacturerId: string | null;
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
  actions: {
    setSelectedTypes: (types: VehicleType[]) => void;
    setSearchTerm: (term: string) => void;
    setManufacturerId: (id: string | null) => void;
    setDateRange: (start: Date | null, end: Date | null) => void;
    resetFilters: () => void;
  };
}

export const createFiltersSlice: StateCreator<FiltersSlice> = (set) => ({
  inventory: {
    selectedTypes: [],
    searchTerm: '',
    manufacturerId: null,
    dateRange: {
      start: null,
      end: null
    }
  },
  actions: {
    setSelectedTypes: (types) =>
      set((state) => ({
        inventory: { ...state.inventory, selectedTypes: types }
      })),
    setSearchTerm: (term) =>
      set((state) => ({
        inventory: { ...state.inventory, searchTerm: term }
      })),
    setManufacturerId: (id) =>
      set((state) => ({
        inventory: { ...state.inventory, manufacturerId: id }
      })),
    setDateRange: (start, end) =>
      set((state) => ({
        inventory: { ...state.inventory, dateRange: { start, end } }
      })),
    resetFilters: () =>
      set((state) => ({
        inventory: {
          selectedTypes: [],
          searchTerm: '',
          manufacturerId: null,
          dateRange: { start: null, end: null }
        }
      }))
  }
});
