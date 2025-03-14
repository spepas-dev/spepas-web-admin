import { useQuery } from "@tanstack/react-query";
import { MechanicsService } from "../../services/mechanics.services";

export const mechanicQueryKeys = {
    all: ['mechanics'] as const,
    list: () => [...mechanicQueryKeys.all, 'list'] as const,
    details: (id: string) => [...mechanicQueryKeys.all, 'details', id] as const,
    stats: (id: string) => [...mechanicQueryKeys.all, 'stats', id] as const,
} as const;

export const useGetMechanicList = () => {
    return useQuery({
        queryKey: mechanicQueryKeys.list(),
        queryFn: () => MechanicsService.getMechanicList(),
    });
};

export const useGetMechanic = (id: string) => {
    return useQuery({
        queryKey: mechanicQueryKeys.details(id),
        queryFn: () => MechanicsService.getMechanic(id),
    });
};

export const useGetMechanicStats = (id: string) => {
    return useQuery({
        queryKey: mechanicQueryKeys.stats(id),
        queryFn: () => MechanicsService.getMechanicStats(id),
    });
};
