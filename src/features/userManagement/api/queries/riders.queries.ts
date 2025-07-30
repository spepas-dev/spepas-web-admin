import { useQuery } from '@tanstack/react-query';

import { RidersService } from '../../services/riders.service';

export const riderQueryKeys = {
  all: ['riders'] as const,
  list: () => [...riderQueryKeys.all, 'list'] as const,
  details: (id: string) => [...riderQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...riderQueryKeys.all, 'stats', id] as const
} as const;

export const useGetRiderList = () => {
  return useQuery({
    queryKey: ['rider-list'],
    queryFn: () => RidersService.getRiderList()
  });
};

export const useGetRider = (id: string) => {
  return useQuery({
    queryKey: ['rider', id],
    queryFn: () => RidersService.getRider(id)
  });
};

export const useGetRiderStats = (id: string) => {
  return useQuery({
    queryKey: ['rider-stats', id],
    queryFn: () => RidersService.getRiderStats(id)
  });
};
