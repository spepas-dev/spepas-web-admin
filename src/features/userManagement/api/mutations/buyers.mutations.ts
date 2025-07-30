import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BuyersService } from '../../services/buyer.service';
import type { Buyer, CreateBuyerDTO } from '../../types/buyer.types';
import { buyerQueryKeys } from '../queries/buyer.queries';

export const useCreateBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBuyerDTO) => BuyersService.registerBuyer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: buyerQueryKeys.all });
    }
  });
};

export const useUpdateBuyer = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Buyer>) => BuyersService.updateBuyer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: buyerQueryKeys.all });
    }
  });
};
