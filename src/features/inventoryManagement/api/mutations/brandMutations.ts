import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BrandsService } from '../../services/brands.services';
import type { CreateBrandDTO, UpdateBrandDTO } from '../../types/brands.types';
import { brandKeys } from '../queries/brandsQueries';

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBrandDTO[]) => BrandsService.createBrand({ ...data, isActive: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
    }
  });
};

export const useUpdateBrand = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBrandDTO) => BrandsService.updateBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
    }
  });
};
