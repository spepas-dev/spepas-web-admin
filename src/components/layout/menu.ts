import { Wrench, Shield, Users, Bike, Store, Handshake, Factory, Tag, Car, Bolt, Key, } from "lucide-react";
import { MenuGroup } from "../../types/MenuItem";


export const menuGroups: MenuGroup[] = [
    {
      id: 'access-management',
      title: 'Access Management',
      items: [
        {
          id: 'permissions',
          name: 'Permissions',
          icon: Key,
          path: '/access-management/permissions',
        },
        {
          id: 'roles',
          name: 'Roles',
          icon: Shield,
          path: '/access-management/roles',
        },
        {
          id: 'groups',
          name: 'Groups',
          icon: Users,
          path: '/access-management/groups',
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      items: [
        {
          id: 'users',
          name: 'Users',
          icon: Users,
          path: '/user-management',
        },
        {
          id: 'sellers',
          name: 'Sellers',
          icon: Store,
          path: '/user-management/sellers',
        },
        {
          id: 'riders',
          name: 'Riders',
          icon: Bike,
          path: '/user-management/riders',
        },
        {
          id: 'mepa',
          name: 'Mepa',
          icon: Wrench,
          path: '/user-management/mepa',
        },
        {
          id: 'gopa',
          name: 'Gopa',
          icon: Handshake,
          path: '/user-management/gopa',
        }
      ]
    },
    {
      id: 'inventory-management',
      title: 'Inventory Management',
      items: [
        {
          id: 'manufacturers',
          name: 'Manufacturers',
          icon: Factory,
          path: '/inventory-management/cars/manufacturers',
        },
        {
          id: 'brands ',
          name: 'Brands',
          icon: Tag,
          path: '/inventory-management/cars/brands',
        },
        {
          id: 'models',
          name: 'Models',
          icon: Car,
          path: '/inventory-management/cars/models',
        },
        {
          id: 'spare-parts',
          name: 'Spare Parts',
          icon: Bolt,
          path: '/inventory-management/cars/spare-parts',
        }
      ]
    }
  ];