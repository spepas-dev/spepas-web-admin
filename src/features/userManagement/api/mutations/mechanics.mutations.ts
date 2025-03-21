import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MechanicsService } from '../../services/mechanics.services';
import type { Mepa, CreateMepaDTO} from '../../types/mechanics.types';
import { mechanicQueryKeys } from '../queries/mechanics.queries';


export const useCreateMechanic = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: CreateMepaDTO) => MechanicsService.registerMechanic(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: mechanicQueryKeys.all });
        },
    });
}

export const useUpdateMechanic = (id: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: Partial<Mepa>) => MechanicsService.updateMechanic(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: mechanicQueryKeys.all });
        },
    });
}