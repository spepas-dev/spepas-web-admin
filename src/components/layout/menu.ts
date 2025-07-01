import {
  Bike,
  Bolt,
  Car,
  Factory,
  Handshake,
  Key,
  LayoutDashboard,
  Menu,
  Shield,
  ShoppingCart,
  Store,
  Tag,
  Users,
  Wallet,
  Wrench
} from 'lucide-react';

import { MenuGroup } from '../../types/MenuItem';

export const menuGroups: MenuGroup[] = [
  {
    id: 'access-management',
    title: 'Access Management',
    items: [
      {
        id: 'permissions',
        name: 'Permissions',
        icon: Key,
        path: '/access-management/permissions'
      },
      {
        id: 'roles',
        name: 'Roles',
        icon: Shield,
        path: '/access-management/roles'
      },
      {
        id: 'applications',
        name: 'Applications',
        icon: LayoutDashboard,
        path: '/access-management/applications'
      },
      {
        id: 'groups',
        name: 'Groups',
        icon: Users,
        path: '/access-management/groups'
      },
      {
        id: 'menus',
        name: 'Menus',
        icon: Menu,
        path: '/access-management/menus'
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
        path: '/user-management'
      },
      {
        id: 'sellers',
        name: 'Sellers',
        icon: Store,
        path: '/user-management/sellers'
      },
      {
        id: 'riders',
        name: 'Riders',
        icon: Bike,
        path: '/user-management/riders'
      },
      {
        id: 'mepa',
        name: 'Mepa',
        icon: Wrench,
        path: '/user-management/mepa'
      },
      {
        id: 'gopa',
        name: 'Gopa',
        icon: Handshake,
        path: '/user-management/gopa'
      }
    ]
  },
  {
    id: 'order-management',
    title: 'Order Management',
    items: [
      {
        id: 'orders',
        name: 'Orders',
        icon: ShoppingCart,
        path: '/order-management/orders'
      },
      {
        id: 'gopa-orders',
        name: 'Gopa Orders',
        icon: Handshake,
        path: '/order-management/gopa-orders'
      },
      {
        id: 'seller-orders',
        name: 'Seller Orders',
        icon: Store,
        path: '/order-management/orders/sellers'
      }
      // {
      //   id: 'requests',
      //   name: 'Requests',
      //   icon: ShoppingCart,
      //   path: '/order-management/requests'
      // }
    ]
  },
  {
    id: 'wallet-management',
    title: 'Wallet Management',
    items: [
      {
        id: 'wallets',
        name: 'Wallets',
        icon: Wallet,
        path: '/wallet-management/wallets'
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
        path: '/inventory-management/cars/manufacturers'
      },
      {
        id: 'brands ',
        name: 'Brands',
        icon: Tag,
        path: '/inventory-management/cars/brands'
      },
      {
        id: 'models',
        name: 'Models',
        icon: Car,
        path: '/inventory-management/cars/models'
      },
      {
        id: 'spare-parts',
        name: 'Spare Parts',
        icon: Bolt,
        path: '/inventory-management/cars/spare-parts'
      }
    ]
  }
];
