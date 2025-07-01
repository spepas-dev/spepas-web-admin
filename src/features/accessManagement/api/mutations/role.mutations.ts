import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RoleService } from '../../services/role.services';
import { CreateUserRoleDto, UpdateUserRoleDto } from '../../types/role.types';
import { roleQueryKeys } from '../queries/role.queries';

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRoleDto) => RoleService.createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });
    }
  });
};

export const useUpdateRole = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRoleDto) => RoleService.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });
    }
  });
};
