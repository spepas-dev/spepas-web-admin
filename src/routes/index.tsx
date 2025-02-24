import {createBrowserRouter, RouteObject} from "react-router-dom";
import { RootLayout } from "../components/layout/root-layout";
import { lazy } from "react";
import { authRoutes } from "./authentication.routes";
const BaseTheme = lazy(() => import("../features/theme/basetheme"))


const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />, 
        children: [
            {index: true, element: <BaseTheme />},
        ]
    },
    ...authRoutes
    
]

export const router = createBrowserRouter(routes);

