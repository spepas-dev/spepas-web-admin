import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MenuService } from '../../services/menu.services';
import { CreateMenuItemDto, UpdateMenuItemDto } from '../../types/menu.types';
import { menuQueryKeys } from '../queries/menu.queries';

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuItemDto) => MenuService.createMenu(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.all });
    }
  });
};

export const useUpdateMenu = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMenuItemDto) => MenuService.updateMenu(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.all });
    }
  });
};
