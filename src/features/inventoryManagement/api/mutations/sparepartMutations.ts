import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SparePartsService } from '../../services/spareparts.service';
import type { CreateSparePartDTO, UpdateSparePartDTO } from '../../types/spareparts.types';
import { sparepartKeys } from '../queries/sparepartsQueries';

export const useCreateSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSparePartDTO[]) => SparePartsService.createSparePart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sparepartKeys.all });
    }
  });
};

export const useUpdateSparePart = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSparePartDTO) => SparePartsService.updateSparePart(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sparepartKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: sparepartKeys.lists() });
    }
  });
};
