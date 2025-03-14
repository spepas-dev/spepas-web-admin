import { useQuery } from "@tanstack/react-query";
import { PermissionService } from "../../services/permission.services";

export const permissionQueryKeys = {
    all: ['permission'] as const,
    list: () => [...permissionQueryKeys.all, 'list'] as const,
    details: (id: string) => [...permissionQueryKeys.all, 'details', id] as const,
    stats: (id: string) => [...permissionQueryKeys.all, 'stats', id] as const,
} as const;

export const useGetPermissionList = () => {
    return useQuery({
        queryKey: permissionQueryKeys.list(),
        queryFn: () => PermissionService.getPermissionList(),
    });
};

export const useGetPermission = (id: string) => {
    return useQuery({
        queryKey: permissionQueryKeys.details(id),
        queryFn: () => PermissionService.getPermission(id),
    });
};

export const useGetPermissionStats = (id: string) => {
    return useQuery({
        queryKey: permissionQueryKeys.stats(id),
        queryFn: () => PermissionService.getPermissionStats(id),
    });
};
