// src/features/inventoryManagement/api/queries/useBrands.ts
import { useQuery } from '@tanstack/react-query';

import { ManufactureQueryParams, ManufacturesService } from '../../services/manufactures.services';
import { Manufacturer } from '../../types/manufactures.types';

export const manufactureKeys = {
  all: ['manufactures'] as const,
  detail: (id: string) => [...manufactureKeys.all, 'detail', id] as const,
  lists: () => [...manufactureKeys.all, 'list'] as const,
  list: (params: ManufactureQueryParams) => [...manufactureKeys.lists(), params] as const,
  //   byType: (type: Manufacturer['type']) => [...manufactureKeys.all, 'type', type] as const,
  stats: () => [...manufactureKeys.all, 'stats'] as const
};

export const useManufactures = (params?: ManufactureQueryParams) => {
  return useQuery({
    queryKey: manufactureKeys.list(params ?? {}),
    queryFn: () => ManufacturesService.getManufactures(params)
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
