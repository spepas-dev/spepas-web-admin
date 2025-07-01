import type { Brand } from '../../types/brands.type';

export const inventoryKeys = {
  all: ['inventory'] as const,
  brands: {
    all: () => [...inventoryKeys.all, 'brands'] as const,
    lists: () => [...inventoryKeys.brands.all(), 'list'] as const,
    list: (params?: { search?: string; sort?: string; page?: number; limit?: number; manufacturer_ID?: string; type?: Brand['type'] }) =>
      [...inventoryKeys.brands.lists(), params] as const,
    detail: (id: string) => [...inventoryKeys.brands.all(), 'detail', id] as const,
    byType: (type: Brand['type']) => [...inventoryKeys.brands.all(), 'type', type] as const,
    byManufacturer: (manufacturerId: string) => [...inventoryKeys.brands.all(), 'manufacturer', manufacturerId] as const,
    stats: () => [...inventoryKeys.brands.all(), 'stats'] as const,
    summary: () => [...inventoryKeys.brands.all(), 'summary'] as const
  }
  // Add other inventory-related keys here
  // spareparts: { ... },
  // models: { ... },
  // manufacturers: { ... },
} as const;
