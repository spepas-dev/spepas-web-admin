import { useQuery } from '@tanstack/react-query';

import { UsersService } from '../../services/users.service';

export const userQueryKeys = {
  all: ['users'] as const,
  list: () => [...userQueryKeys.all, 'list'] as const,
  details: (id: string) => [...userQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...userQueryKeys.all, 'stats', id] as const
} as const;

export const useGetUserList = () => {
  return useQuery({
    queryKey: userQueryKeys.list(),
    queryFn: () => UsersService.getUserList()
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: userQueryKeys.details(id),
    queryFn: () => UsersService.getUser(id)
  });
};

export const useGetUserStats = (id: string) => {
  return useQuery({
    queryKey: userQueryKeys.stats(id),
    queryFn: () => UsersService.getUserStats(id)
  });
};
