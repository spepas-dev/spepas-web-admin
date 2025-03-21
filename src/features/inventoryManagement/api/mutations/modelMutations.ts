import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ModelsService } from '../../services/models.services'
import type { CreateCarModel, UpdateCarModel } from '../../types/models.types'
import { modelKeys } from '../queries/modelsQueries'

export const useCreateModel = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateCarModel) => ModelsService.createCarModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: modelKeys.all })
    },
  })
}

export const useUpdateModel = (id: string) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: UpdateCarModel) => ModelsService.updateCarModel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: modelKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: modelKeys.lists() })
    },
  })
}