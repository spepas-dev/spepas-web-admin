import { useQuery } from '@tanstack/react-query';

import { VehiclesService } from '../../services/vehicles.service';

export const vehicleQueryKeys = {
  all: ['vehicles'] as const,
  list: () => [...vehicleQueryKeys.all, 'list'] as const,
  details: (id: string) => [...vehicleQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...vehicleQueryKeys.all, 'stats', id] as const
} as const;

export const useGetVehicleList = () => {
  return useQuery({
    queryKey: vehicleQueryKeys.list(),
    queryFn: () => VehiclesService.getVehicleList()
  });
};

export const useGetVehicle = (id: string) => {
  return useQuery({
    queryKey: vehicleQueryKeys.details(id),
    queryFn: () => VehiclesService.getVehicle(id)
  });
};

export const useGetVehicleStats = (id: string) => {
  return useQuery({
    queryKey: vehicleQueryKeys.stats(id),
    queryFn: () => VehiclesService.getVehicleStats(id)
  });
};
