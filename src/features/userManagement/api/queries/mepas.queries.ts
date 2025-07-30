import { useQuery } from '@tanstack/react-query';

import { MepasService } from '../../services/mepas.service';

export const mepasQueryKeys = {
  all: ['mepas'] as const,
  list: () => [...mepasQueryKeys.all, 'list'] as const,
  details: (id: string) => [...mepasQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...mepasQueryKeys.all, 'stats', id] as const
} as const;

export const useGetMepaList = () => {
  return useQuery({
    queryKey: mepasQueryKeys.list(),
    queryFn: () => MepasService.getMepaList()
  });
};

export const useGetMepa = (id: string) => {
  return useQuery({
    queryKey: mepasQueryKeys.details(id),
    queryFn: () => MepasService.getMepa(id)
  });
};

export const useGetMepaStats = (id: string) => {
  return useQuery({
    queryKey: mepasQueryKeys.stats(id),
    queryFn: () => MepasService.getMepaStats(id)
  });
};
