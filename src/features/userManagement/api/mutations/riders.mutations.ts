import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RidersService } from '../../services/riders.services';
import type { CreateRiderDTO, Rider } from '../../types/riders.types';
import { riderQueryKeys } from '../queries/riders.queries';

export const useCreateRider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRiderDTO) => RidersService.registerRider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: riderQueryKeys.all });
    }
  });
};

export const useUpdateRider = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Rider>) => RidersService.updateRider(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: riderQueryKeys.all });
    }
  });
};
