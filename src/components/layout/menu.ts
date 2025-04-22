import { Bike, Bolt, Car, CreditCard, Factory, Handshake, Key, Shield, ShoppingCart, Store, Tag, Users, Wrench } from 'lucide-react';

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
        id: 'groups',
        name: 'Groups',
        icon: Users,
        path: '/access-management/groups'
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
        path: '/order-management/seller-orders'
      },
      {
        id: 'requests',
        name: 'Requests',
        icon: ShoppingCart,
        path: '/order-management/requests'
      }
    ]
  },
  {
    id: 'payment-management',
    title: 'Payment Management',
    items: [
      {
        id: 'payments',
        name: 'Payments',
        icon: CreditCard,
        path: '/payment-management/payments'
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
