import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UsersService } from '../../services/users.services';
import type { CreateUserDTO, User } from '../../types/users.types';
import { userQueryKeys } from '../queries/users.queries';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDTO) => UsersService.registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    }
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => UsersService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    }
  });
};
