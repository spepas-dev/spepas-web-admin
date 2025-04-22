import { useQuery } from '@tanstack/react-query';

import { GoroService } from '../../services/goro.services';

export const goroQueryKeys = {
  all: ['goro'] as const,
  list: () => [...goroQueryKeys.all, 'list'] as const,
  details: (id: string) => [...goroQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...goroQueryKeys.all, 'stats', id] as const
} as const;

export const useGetGoroList = () => {
  return useQuery({
    queryKey: goroQueryKeys.list(),
    queryFn: () => GoroService.getGoroList()
  });
};

export const useGetGoro = (id: string) => {
  return useQuery({
    queryKey: goroQueryKeys.details(id),
    queryFn: () => GoroService.getGoro(id)
  });
};

export const useGetGoroStats = (id: string) => {
  return useQuery({
    queryKey: goroQueryKeys.stats(id),
    queryFn: () => GoroService.getGoroStats(id)
  });
};
