// src/features/inventoryManagement/api/queries/useBrands.ts
import { useQuery } from '@tanstack/react-query';

import { BrandQueryParams, BrandsService } from '../../services/brands.service';
import { Brand } from '../../types/brands.types';

export const brandKeys = {
  all: ['brands'],
  detail: (id: string) => [...brandKeys.all, 'detail', id],
  lists: () => [...brandKeys.all, 'list'],
  list: (params: BrandQueryParams) => [...brandKeys.lists(), params],
  byType: (type: Brand['type']) => [...brandKeys.all, 'type', type],
  stats: () => [...brandKeys.all, 'stats']
} as const;

export const useBrands = (params?: BrandQueryParams) => {
  return useQuery({
    queryKey: brandKeys.list(params ?? {}),
    queryFn: () => BrandsService.getBrands(params)
  });
};

// export const useBrandsByType = (type: Brand['type']) => {
//   return useQuery({
//     queryKey: brandKeys.byType(type),
//     queryFn: () => BrandsService.getBrandsByType(type),
//     enabled: !!type
//   })
// }

// export const useBrandsSummary = () => {
//   return useQuery({
//     queryKey: brandKeys.stats(),
//     queryFn: () => BrandsService.getBrandsSummaryByType()
//   })
// }
