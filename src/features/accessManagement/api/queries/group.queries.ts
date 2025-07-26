import { useQuery } from '@tanstack/react-query';

import { GroupService } from '../../services/group.service';

export const groupQueryKeys = {
  all: ['group'] as const,
  list: () => [...groupQueryKeys.all, 'list'] as const,
  details: (id: string) => [...groupQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...groupQueryKeys.all, 'stats', id] as const
} as const;

export const useGetGroupList = () => {
  return useQuery({
    queryKey: groupQueryKeys.list(),
    queryFn: () => GroupService.getGroupList()
  });
};

export const useGetGroup = (id: string) => {
  return useQuery({
    queryKey: groupQueryKeys.details(id),
    queryFn: () => GroupService.getGroup(id)
  });
};

export const useGetGroupStats = (id: string) => {
  return useQuery({
    queryKey: groupQueryKeys.stats(id),
    queryFn: () => GroupService.getGroupStats(id)
  });
};
