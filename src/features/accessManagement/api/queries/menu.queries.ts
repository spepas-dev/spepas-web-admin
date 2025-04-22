import { useQuery } from '@tanstack/react-query';

import { MenuService } from '../../services/menu.services';

export const menuQueryKeys = {
  all: ['menu'] as const,
  list: () => [...menuQueryKeys.all, 'list'] as const,
  details: (id: string) => [...menuQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...menuQueryKeys.all, 'stats', id] as const
} as const;

export const useGetMenuList = () => {
  return useQuery({
    queryKey: menuQueryKeys.list(),
    queryFn: () => MenuService.getMenuList()
  });
};

export const useGetMenu = (id: string) => {
  return useQuery({
    queryKey: menuQueryKeys.details(id),
    queryFn: () => MenuService.getMenu(id)
  });
};

export const useGetMenuStats = (id: string) => {
  return useQuery({
    queryKey: menuQueryKeys.stats(id),
    queryFn: () => MenuService.getMenuStats(id)
  });
};
