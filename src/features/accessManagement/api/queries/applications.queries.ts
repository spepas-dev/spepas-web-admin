import { useQuery } from '@tanstack/react-query';

import { ApplicationService } from '../../services/application.service';

export const applicationsQueryKeys = {
  all: ['applications'] as const,
  list: () => [...applicationsQueryKeys.all, 'list'] as const,
  details: (id: string) => [...applicationsQueryKeys.all, 'details', id] as const,
  stats: () => [...applicationsQueryKeys.all, 'stats'] as const
} as const;

export const useGetApplications = () => {
  return useQuery({
    queryKey: applicationsQueryKeys.list(),
    queryFn: () => ApplicationService.getApplications()
  });
};

export const useGetApplication = (id: string) => {
  return useQuery({
    queryKey: applicationsQueryKeys.details(id),
    queryFn: () => ApplicationService.getApplication(id)
  });
};

export const useGetApplicationStats = () => {
  return useQuery({
    queryKey: applicationsQueryKeys.stats(),
    queryFn: () => ApplicationService.getApplicationStats()
  });
};
