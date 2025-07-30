import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SellersService } from '../../services/sellers.service';
import type { CreateSellerDTO, Seller } from '../../types/sellers.types';
import { sellerQueryKeys } from '../queries/sellers.queries';

export const useCreateSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSellerDTO) => SellersService.registerSeller(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellerQueryKeys.all });
    }
  });
};

export const useUpdateSeller = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Seller>) => SellersService.updateSeller(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellerQueryKeys.all });
    }
  });
};
