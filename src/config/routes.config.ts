export const ROUTE_PATHS = {
  AUTH: {
    BASE: 'auth',
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    CHANGE_PASSWORD: 'change-password'
  },
  SETTINGS: {
    BASE: 'settings'
  },
  ACCESS_MANAGEMENT: {
    BASE: 'access-management',
    MENU_GROUP: {
      // Menu Groups here maps to application in the api / database
      BASE: 'menu-groups',
      DETAIL: (id: string) => `/menu-groups/${id}`
    },
    MENU: {
      BASE: 'menus',
      CREATE: 'add-menu',
      UPDATE: 'update-menu'
    },
    GROUP: {
      BASE: 'groups',
      DETAIL: (groupId: string) => `${groupId}`
    },
    PERMISSION: {
      BASE: 'permissions',
      CREATE: 'create-permission',
      UPDATE: 'update-permission'
    },
    ROLE: {
      BASE: 'roles',
      CREATE: 'add-role',
      UPDATE: 'update-role'
    },
    USER: {
      CREATE: 'create-user',
      UPDATE: 'update-user'
    },
    APPLICATION: {
      BASE: 'applications',
      DETAIL: (applicationId: string) => `${applicationId}`
    }
  },
  USER_MANAGEMENT: {
    BASE: 'user-management',
    SELLER: {
      BASE: 'sellers',
      CREATE: '/sellers/create',
      DETAIL: (id: string) => `/sellers/${id}`
    },
    BUYERS: {
      BASE: 'buyers',
      CREATE: '/buyers/create',
      DETAIL: (id: string) => `/buyers/${id}`
    },
    RIDER: {
      BASE: 'riders',
      VEHICLES: {
        BASE: 'vehicles',
        DETAIL: (id: string) => `/riders/vehicles/${id}`
      },
      DETAIL: (id: string) => `/riders/${id}`
    },
    MECHANIC: {
      BASE: 'mepa',
      CREATE: '/mepa/create',
      DETAIL: (id: string) => `/mechanics/${id}`
    },
    GOPA: {
      BASE: 'gopa',
      CREATE: '/gopa/create',
      DETAIL: (id: string) => `/gopas/${id}`
    },
    PAYMENT_ACCOUNT: {
      BASE: 'payment-accounts'
    }
  },
  REQUESTS_MANAGEMENT: {
    BASE: '/requests',
    CREATE: '/requests/create',
    DETAIL: (id: string) => `/requests/${id}`
  },
  INVENTORY_MANAGEMENT: {
    BASE: 'inventory-management',
    CAR: {
      BASE: 'cars',
      CATEGORY: {
        BASE: 'categories',
        CREATE: '/cars/categories/create',
        DETAIL: (id: string) => `/cars/categories/${id}`
      },
      MANUFACTURER: {
        BASE: 'manufacturers',
        CREATE: '/cars/manufacturers/create',
        DETAIL: (id: string) => `/cars/manufacturers/${id}`
      },
      BRAND: {
        BASE: 'brands',
        CREATE: '/cars/brand/create',
        DETAIL: (id: string) => `/cars/brand/${id}`
      },
      MODEL: {
        BASE: 'models',
        CREATE: '/cars/model/create',
        DETAIL: (id: string) => `/cars/model/${id}`
      },
      SPARE_PART: {
        BASE: 'spare-parts',
        CREATE: '/cars/spare-part/create',
        DETAIL: (id: string) => `/cars/spare-part/${id}`
      }
    }
  },
  CALL_MANAGEMENT: {
    BASE: 'call-in-management',
    CALLS_ORDERS: {
      BASE: 'calls-orders',
      DETAIL: (id: string) => `/calls-orders/${id}`
    }
  },
  ORDER_MANAGEMENT: {
    BASE: 'order-management',
    ORDERS: {
      BASE: 'orders',
      DETAIL: (id: string) => `/orders/${id}`,
      SELLERS: {
        BASE: 'sellers',
        DETAIL: (id: string) => `/orders/sellers/${id}`,
        HISTORY: (id: string) => `/orders/sellers/${id}/history`
      }
    },
    GOPAS: {
      BASE: 'gopas',
      DETAIL: (id: string) => `/gopas/${id}`,
      HISTORY: (id: string) => `/gopas/${id}/history`,
      REQUESTS: (id: string) => `/gopas/${id}/requests`
    }
  },
  WALLET_MANAGEMENT: {
    BASE: 'wallet-management',
    WALLETS: {
      BASE: 'wallets'
    }
  }
};
