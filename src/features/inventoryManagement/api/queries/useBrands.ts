// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { BrandsService } from '../../services/brands.services'
// import { inventoryKeys } from './queryKeys'
// import type { Brand } from '../../types/brands.type'

// export const useBrands = (params?: {
//   search?: string
//   sort?: string
//   page?: number
//   limit?: number
//   manufacturer_ID?: string
//   type?: Brand['type']
// }) => {
//   return useQuery({
//     queryKey: inventoryKeys.brands.list(params),
//     queryFn: () => BrandsService.getBrands(params),
//     placeholderData: (previousData) => previousData,
//   })
// }

// export const useBrand = (id: string) => {
//   return useQuery({
//     queryKey: inventoryKeys.brands.detail(id),
//     queryFn: () => BrandsService.getBrand(id),
//     enabled: !!id,
//   })
// }

// export const useBrandsByType = (type: Brand['type']) => {
//   return useQuery({
//     queryKey: inventoryKeys.brands.byType(type),
//     queryFn: () => BrandsService.getBrandsByType(type),
//     enabled: !!type,
//   })
// }

// export const useBrandsByManufacturer = (manufacturerId: string) => {
//   return useQuery({
//     queryKey: inventoryKeys.brands.byManufacturer(manufacturerId),
//     queryFn: () => BrandsService.getBrandsByManufacturer(manufacturerId),
//     enabled: !!manufacturerId,
//   })
// }

// export const useBrandsSummary = () => {
//   return useQuery({
//     queryKey: inventoryKeys.brands.summary(),
//     queryFn: () => BrandsService.getBrandsSummaryByType(),
//   })
// }

// export const useBrandStats = (id: string) => {
//   return useQuery({
//     queryKey: inventoryKeys.brands.stats(),
//     queryFn: () => BrandsService.getBrandStats(id),
//     enabled: !!id,
//   })
// }

// // Mutations
// export const useCreateBrand = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: {
//       name: string
//       manufacturer_ID: string
//       type: Brand['type']
//       description?: string
//       logo?: string
//       website?: string
//       isActive?: boolean
//     }) => BrandsService.createBrand(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: inventoryKeys.brands.lists() })
//     },
//   })
// }

// export const useUpdateBrand = (id: string) => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: Partial<Brand>) => BrandsService.updateBrand(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: inventoryKeys.brands.detail(id) })
//       queryClient.invalidateQueries({ queryKey: inventoryKeys.brands.lists() })
//     },
//   })
// }

// export const useDeleteBrand = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (id: string) => BrandsService.deleteBrand(id),
//     onSuccess: (_, id) => {
//       queryClient.invalidateQueries({ queryKey: inventoryKeys.brands.lists() })
//       queryClient.removeQueries({ queryKey: inventoryKeys.brands.detail(id) })
//     },
//   })
// }

// export const useBulkDeleteBrands = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (ids: string[]) => BrandsService.bulkDeleteBrands(ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: inventoryKeys.brands.lists() })
//     },
//   })
// }
