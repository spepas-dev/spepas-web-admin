import { useQuery } from '@tanstack/react-query';

import { GroupService } from '../../services/group.service';

export const groupQueryKeys = {
  all: ['group'] as const,
  list: () => [...groupQueryKeys.all, 'list'] as const,
  details: (id: string) => [...groupQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...groupQueryKeys.all, 'stats', id] as const,
  applications: (groupId: string) => [...groupQueryKeys.all, 'applications', groupId] as const,
  applicationMenu: (groupId: string) => [...groupQueryKeys.all, 'applicationMenu', groupId] as const,
  users: (groupId: string) => [...groupQueryKeys.all, 'groupUsers', groupId] as const
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

export const useGetGroupApplications = (groupId: string) => {
  return useQuery({
    queryKey: groupQueryKeys.applications(groupId),
    queryFn: () => GroupService.getGroupApplications(groupId)
  });
};

export const useGetGroupApplicationMenu = (groupId: string) => {
  return useQuery({
    queryKey: groupQueryKeys.applicationMenu(groupId),
    queryFn: () => GroupService.getGroupApplicationMenu(groupId)
  });
};

export const useGetGroupUsers = (groupId: string) => {
  return useQuery({
    queryKey: groupQueryKeys.users(groupId),
    queryFn: () => GroupService.getGroupUsers(groupId),
    enabled: !!groupId
  });
};
