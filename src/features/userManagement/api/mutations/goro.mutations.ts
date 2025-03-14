import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoroService } from '../../services/goro.services';
import type { Goro, RegisterGoroDTO, RegisterGoroResponse } from '../../types/goro.types';
import { goroQueryKeys } from '../queries/goro.queries';

export const useCreateGoro = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: RegisterGoroDTO) => GoroService.registerGoro(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: goroQueryKeys.all });
        },
    });
}

export const useUpdateGoro = (id: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: Partial<Goro>) => GoroService.updateGoro(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: goroQueryKeys.all });
        },
    });
}

