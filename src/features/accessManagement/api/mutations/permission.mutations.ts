import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionService } from "../../services/permission.services";
import { Permission, CreatePermissionDto, UpdatePermissionDto } from "../../types/permission.types";
import { permissionQueryKeys } from "../queries/permission.queries";
import { toastConfig } from "@/lib/toast";


export const useCreatePermission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePermissionDto) => PermissionService.createPermission(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: permissionQueryKeys.all });
            toastConfig.success('Permission created successfully');
        },
    });
}

export const useUpdatePermission = (id: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: UpdatePermissionDto) => PermissionService.updatePermission(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: permissionQueryKeys.all });
            toastConfig.success('Permission updated successfully');
        },
    });
}