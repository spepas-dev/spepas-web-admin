import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../types/categories.types';
import { categoryKeys } from '../queries/categoryQueries';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Category) => CategoriesService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    }
  });
};
