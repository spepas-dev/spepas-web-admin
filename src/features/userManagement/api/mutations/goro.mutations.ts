import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GopaService } from '../../services/gopa.service';
import type { Gopa, RegisterGopaDTO } from '../../types/gopa.types';
import { gopaQueryKeys } from '../queries/gopa.queries';

export const useCreateGoro = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterGopaDTO) => GopaService.registerGopa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gopaQueryKeys.all });
    }
  });
};

export const useUpdateGoro = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Gopa>) => GopaService.updateGopa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gopaQueryKeys.all });
    }
  });
};
