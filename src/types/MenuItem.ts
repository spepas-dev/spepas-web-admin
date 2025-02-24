import { LucideIcon } from "lucide-react";

export interface MenuItem {
    id: string;
    name: string;
    icon?: LucideIcon;
    path?: string;
    children?: MenuItem[];
    count?: number;
    permissions?: string;
}

export interface MenuGroup {
    id: string;
    title: string;
    items: MenuItem[];
}