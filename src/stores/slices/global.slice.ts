import { StateCreator } from 'zustand';

import { BrandsService } from '@/features/inventoryManagement/services/brands.services';
import { ManufacturesService } from '@/features/inventoryManagement/services/manufactures.services';
import { ModelsService } from '@/features/inventoryManagement/services/models.services';
import type { Brand } from '@/features/inventoryManagement/types/brands.types';
import type { Manufacturer } from '@/features/inventoryManagement/types/manufactures.types';
import type { CarModel } from '@/features/inventoryManagement/types/models.types';

export interface InventoryData {
  manufacturers: Manufacturer[];
  brands: Brand[];
  models: CarModel[];
}

export interface GlobalSlice {
  isLoading: boolean;
  isError: boolean;
  data: InventoryData | null;
  actions: {
    setLoading: (isLoading: boolean) => void;
    setError: (isError: boolean) => void;
    setData: (data: InventoryData | null) => void;
    loadInventoryData: () => Promise<void>;
  };
}

export const createGlobalSlice: StateCreator<GlobalSlice> = (set, get) => ({
  isLoading: false,
  isError: false,
  data: null,
  actions: {
    setLoading: (isLoading) => set({ isLoading }),
    setError: (isError) => set({ isError }),
    setData: (data) => set({ data }),
    loadInventoryData: async () => {
      try {
        const currentState = get();

        // Prevent multiple simultaneous calls
        if (currentState.isLoading) {
          console.log('Already loading inventory data, skipping...');
          return;
        }

        // Prevent unnecessary calls if data already exists
        if (currentState.data) {
          console.log('Inventory data already exists, skipping...');
          return;
        }

        set({ isLoading: true, isError: false });

        const [manufacturersResponse, brandsResponse, modelsResponse] = await Promise.all([
          ManufacturesService.getManufactures(),
          BrandsService.getBrands(),
          ModelsService.getCarModels()
        ]);

        const combinedData: InventoryData = {
          manufacturers: manufacturersResponse.data,
          brands: brandsResponse.data,
          models: modelsResponse.data
        };

        set({
          data: combinedData,
          isLoading: false,
          isError: false
        });
      } catch (error) {
        set({
          isError: true,
          isLoading: false
        });
        throw error;
      }
    }
  }
});
