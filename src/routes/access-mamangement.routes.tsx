import { RouteObject} from "react-router-dom";
import { lazy } from "react";
import { ROUTE_PATHS } from "@/config/routes.config";

const PermissionsPage = lazy(() => import("@/features/accessManagement/permissions"));
const RolesPage  = lazy(() => import("@/features/accessManagement/roles"));
const MenusPage = lazy(() => import("@/features/accessManagement/menus"));
const GroupsPage = lazy(() => import("@/features/accessManagement/groups"));

export const accessManagementRoutes: RouteObject[] = [
            {
                path: ROUTE_PATHS.ACCESS_MANAGEMENT.BASE, children: [
                    {path: ROUTE_PATHS.ACCESS_MANAGEMENT.PERMISSION.BASE, element: <PermissionsPage />},
                    {path: ROUTE_PATHS.ACCESS_MANAGEMENT.ROLE.BASE, element: <RolesPage />},
                    {path: ROUTE_PATHS.ACCESS_MANAGEMENT.MENU_GROUP.BASE, element: <MenusPage />},
                    {path: ROUTE_PATHS.ACCESS_MANAGEMENT.GROUP.BASE, element: <GroupsPage />},
                ]
            }
]


