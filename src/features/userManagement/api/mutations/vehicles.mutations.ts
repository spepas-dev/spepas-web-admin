import { useMutation, useQueryClient } from '@tanstack/react-query';

import { VehiclesService } from '../../services/vehicles.services';
import type { CreateVehicleDTO, Vehicle } from '../../types/vehicles.types';
import { vehicleQueryKeys } from '../queries/vehicles.queries';

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVehicleDTO) => VehiclesService.registerRiderVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleQueryKeys.all });
    }
  });
};

export const useUpdateVehicle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Vehicle>) => VehiclesService.updateVehicle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleQueryKeys.all });
    }
  });
};
