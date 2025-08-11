import { useQuery } from '@tanstack/react-query';

import { GopaService } from '../../services/gopa.service';

export const gopaQueryKeys = {
  all: ['gopa'] as const,
  list: () => [...gopaQueryKeys.all, 'list'] as const,
  details: (id: string) => [...gopaQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...gopaQueryKeys.all, 'stats', id] as const
} as const;

export const useGetGopaList = () => {
  return useQuery({
    queryKey: gopaQueryKeys.list(),
    queryFn: () => GopaService.getGopaList()
  });
};

export const useGetGopa = (id: string) => {
  return useQuery({
    queryKey: gopaQueryKeys.details(id),
    queryFn: () => GopaService.getGopa(id)
  });
};

export const useGetGopaStats = (id: string) => {
  return useQuery({
    queryKey: gopaQueryKeys.stats(id),
    queryFn: () => GopaService.getGopaStats(id)
  });
};
