import { useQuery } from "@tanstack/react-query";
import { RoleService } from "../../services/role.services";

export const roleQueryKeys = {
    all: ['role'] as const,
    list: () => [...roleQueryKeys.all, 'list'] as const,
    details: (id: string) => [...roleQueryKeys.all, 'details', id] as const,
    stats: (id: string) => [...roleQueryKeys.all, 'stats', id] as const,
} as const;

export const useGetRoleList = () => {
    return useQuery({
        queryKey: roleQueryKeys.list(),
        queryFn: () => RoleService.getRoleList(),
    });
};

export const useGetRole = (id: string) => {
    return useQuery({
        queryKey: roleQueryKeys.details(id),
        queryFn: () => RoleService.getRole(id),
    });
};

export const useGetRoleStats = (id: string) => {
    return useQuery({
        queryKey: roleQueryKeys.stats(id),
        queryFn: () => RoleService.getRoleStats(id),
    });
};
