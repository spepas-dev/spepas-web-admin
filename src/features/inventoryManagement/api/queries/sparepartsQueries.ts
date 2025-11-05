// src/features/inventoryManagement/api/queries/useBrands.ts
import { useQuery } from '@tanstack/react-query';

import { SparePartQueryParams, SparePartsService } from '../../services/spareparts.service.ts';

export const sparepartKeys = {
  all: ['spareparts'] as const,
  detail: (id: string) => [...sparepartKeys.all, 'detail', id] as const,
  lists: () => [...sparepartKeys.all, 'list'] as const,
  list: (params: SparePartQueryParams) => [...sparepartKeys.lists(), params] as const,
  //   byType: (type: Manufacturer['type']) => [...manufactureKeys.all, 'type', type] as const,
  stats: () => [...sparepartKeys.all, 'stats'] as const
};

export const useSpareParts = (params?: SparePartQueryParams) => {
  return useQuery({
    queryKey: sparepartKeys.list(params ?? {}),
    queryFn: () => SparePartsService.getSpareParts(params)
  });
};

// export const useManufacturesByType = (type: Manufacture['type']) => {
//   return useQuery({
//     queryKey: manufactureKeys.byType(type),
//     queryFn: () => ManufacturesService.getManufacturesByType(type),
//     enabled: !!type
//   })
// }

// export const useManufacturesSummary = () => {
//   return useQuery({
//     queryKey: manufactureKeys.stats(),
//     queryFn: () => ManufacturesService.getManufacturesSummaryByType()
//   })
// }
