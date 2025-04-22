import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GroupService } from '../../services/group.services';
import { CreateGroupDto, Group, UpdateGroupDto } from '../../types/group.types';
import { groupQueryKeys } from '../queries/group.queries';

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupDto) => GroupService.createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
    }
  });
};

export const useUpdateGroup = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateGroupDto) => GroupService.updateGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
    }
  });
};
