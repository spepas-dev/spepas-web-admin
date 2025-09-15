import { useQuery } from '@tanstack/react-query';

import { CategoriesService, CategoryQueryParams } from '../../services/categories.service';

export const categoryKeys = {
  all: ['categories'],
  detail: (id: string) => [...categoryKeys.all, 'detail', id],
  lists: () => [...categoryKeys.all, 'list'],
  list: (params: CategoryQueryParams) => [...categoryKeys.lists(), params]
} as const;

export const useCategories = (params?: CategoryQueryParams) => {
  return useQuery({
    queryKey: categoryKeys.list(params ?? {}),
    queryFn: () => CategoriesService.getCategories()
  });
};
