import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MepasService } from '../../services/mepas.service';
import type { CreateMepaDTO, Mepa } from '../../types/mechanics.types';
import { mepasQueryKeys } from '../queries/mepas.queries';

export const useCreateMepa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMepaDTO) => MepasService.registerMepa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mepasQueryKeys.all });
    }
  });
};

export const useUpdateMepa = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Mepa>) => MepasService.updateMepa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mepasQueryKeys.all });
    }
  });
};
