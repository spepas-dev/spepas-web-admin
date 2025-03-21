// src/features/inventoryManagement/api/queries/useBrands.ts
import { useQuery } from '@tanstack/react-query'
import { ModelsService, CarModelQueryParams } from '../../services/models.services'
import { CarModel } from '../../types/models.types'

export const modelKeys = {
  all: ['models'] as const,
  detail: (id: string) => [...modelKeys.all, 'detail', id] as const,
  lists: () => [...modelKeys.all, 'list'] as const,
  list: (params: CarModelQueryParams) => [...modelKeys.lists(), params] as const,
//   byType: (type: Manufacturer['type']) => [...manufactureKeys.all, 'type', type] as const,
  stats: () => [...modelKeys.all, 'stats'] as const
}

export const useCarModels = (params?: CarModelQueryParams) => {
  return useQuery({
    queryKey: modelKeys.list(params ?? {}),
    queryFn: () => ModelsService.getCarModels(params)
  })
}

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