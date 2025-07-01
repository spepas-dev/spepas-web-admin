import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApplicationService } from '../../services/application.service';
import { CreateApplicationDto, UpdateApplicationDto } from '../../types/application.types';
import { applicationsQueryKeys } from '../queries/applications.queries';

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationDto) => ApplicationService.createApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.all });
    }
  });
};

export const useUpdateApplication = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateApplicationDto) => ApplicationService.updateApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.all });
    }
  });
};
