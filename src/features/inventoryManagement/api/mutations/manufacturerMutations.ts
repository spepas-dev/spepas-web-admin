import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManufacturesService } from '../../services/manufactures.service';
import type { CreateManufacturerDTO, UpdateManufacturerDTO } from '../../types/manufactures.types';
import { manufactureKeys } from '../queries/manufacturesQueries';

export const useCreateManufacturer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateManufacturerDTO[]) => ManufacturesService.createManufacturer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: manufactureKeys.all });
    }
  });
};

export const useUpdateManufacturer = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateManufacturerDTO) => ManufacturesService.updateManufacturer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: manufactureKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: manufactureKeys.lists() });
    }
  });
};
