import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GopaService } from '../../services/gopa.service';
import type { Gopa, RegisterGopaDTO } from '../../types/gopa.types';
import { gopaQueryKeys } from '../queries/gopas.queries';

export const useCreateGopa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterGopaDTO) => GopaService.registerGopa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gopaQueryKeys.all });
    }
  });
};

export const useUpdateGopa = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Gopa>) => GopaService.updateGopa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gopaQueryKeys.all });
    }
  });
};
