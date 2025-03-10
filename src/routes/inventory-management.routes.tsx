import { RouteObject} from "react-router-dom";
import { lazy } from "react";
import { ROUTE_PATHS } from "@/config/routes.config";



const ManufacturersPage = lazy(() => import("@/features/inventoryManagement/manufacturers"));
const BrandsPage = lazy(() => import("@/features/inventoryManagement/brands"))
const ModelsPage = lazy(() => import("@/features/inventoryManagement/models"))
const SparePartsPage = lazy(() => import("@/features/inventoryManagement/spareparts"))


export const inventoryManagementRoutes: RouteObject[] = [
    {
        path: ROUTE_PATHS.INVENTORY_MANAGEMENT.BASE, children: [
            {
                path: ROUTE_PATHS.INVENTORY_MANAGEMENT.CAR.BASE, children: [
                    {path: ROUTE_PATHS.INVENTORY_MANAGEMENT.CAR.MANUFACTURER.BASE, children: [
                        {index: true, element: <ManufacturersPage />}
                    ]},
                    {path: ROUTE_PATHS.INVENTORY_MANAGEMENT.BRAND.BASE, children: [
                        {index: true, element: <BrandsPage />}
                    ]},
                    {path: ROUTE_PATHS.INVENTORY_MANAGEMENT.MODEL.BASE, children: [
                        {index: true, element: <ModelsPage />}
                    ]},
                    {path: ROUTE_PATHS.INVENTORY_MANAGEMENT.SPARE_PART.BASE, children: [
                        {index: true, element: <SparePartsPage />}
                    ]}
                ]
            }
        ]
    }
]


