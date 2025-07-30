export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/admin-signin',
    LOGOUT: '/auth/signout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    USER: '/auth/user'
  },
  ACCESS_MANAGEMENT: {
    APPLICATION: {
      BASE: '/auth/applications',
      DETAIL: (id: string) => `/auth/applications/${id}`,
      CREATE: '/auth/create-application',
      UPDATE: (id: string) => `/auth/update-application/${id}`
    },
    MENU_GROUP: {
      BASE: '/auth/menu-groups',
      DETAIL: (id: string) => `/auth/menu-groups/${id}`,
      CREATE: '/auth/add-groupmenus'
    },
    MENU: {
      BASE: '/auth/menus',
      DETAIL: (id: string) => `/auth/menus/${id}`,
      CREATE: '/auth/add-menus'
    },
    GROUP: {
      BASE: '/auth/groups',
      DETAIL: (id: string) => `/auth/groups/${id}`,
      CREATE: '/auth/create-group'
    },
    PERMISSION: {
      BASE: '/auth/permissions',
      DETAIL: (id: string) => `/auth/permissions/${id}`,
      CREATE: '/auth/add-permissions',
      UPDATE: '/auth/update-permissions'
    },
    ROLE: {
      BASE: '/auth/roles',
      DETAIL: (id: string) => `/roles/${id}`,
      CREATE: '/auth/add-roles'
    },
    USER: {
      BASE: '/auth/admin-users-all',
      CREATE: '/auth/admin-signup',
      DETAIL: (id: string) => `/users/${id}`
    }
  },
  INVENTORY_MANAGEMENT: {
    CAR: {
      MANUFACTURER: {
        BASE: '/inventry/car-manufacturers-all',
        DETAIL: (id: string) => `/inventry/manufacturers/${id}`,
        CREATE: '/inventry/add-car-manufacturer-admin'
      },
      BRAND: {
        BASE: '/inventry/car-brands-all',
        DETAIL: (id: string) => `/inventry/brands/${id}`,
        CREATE: '/inventry/add-car-brand-admin'
      },
      MODEL: {
        BASE: '/inventry/car-models-all',
        DETAIL: (id: string) => `/models/${id}`,
        CREATE: '/inventry/add-car-model-admin'
      },
      SPARE_PART: {
        BASE: '/inventry/sparepart-all',
        DETAIL: (id: string) => `/inventry/spare-parts/${id}`,
        CREATE: '/inventry/add-spare-part-admin'
      }
    }
  },
  USER_MANAGEMENT: {
    ADMIN: {
      BASE: '/user/admin-users-all',
      DETAIL: (id: string) => `/user/admins/${id}`,
      STATS: (id: string) => `/user/admins/${id}/stats`
    },
    SELLER: {
      BASE: '/user/sellers-all',
      DETAIL: (id: string) => `/user/sellers/${id}`,
      STATS: (id: string) => `/user/sellers/${id}/stats`
    },
    BUYER: {
      BASE: '/user/buyers-all',
      DETAIL: (id: string) => `/user/buyers/${id}`,
      STATS: (id: string) => `/user/buyers/${id}/stats`
    },
    RIDER: {
      BASE: '/user/riders-all',
      DETAIL: (id: string) => `/user/riders/${id}`,
      VEHICLES: {
        BASE: '/user/riders/vehicles',
        DETAIL: (id: string) => `/gateway/v1/riders/vehicles/${id}`
      }
    },
    MEPA: {
      BASE: '/user/mepas-all',
      DETAIL: (id: string) => `/user/mepa/${id}`,
      SERVICES: (id: string) => `/user/mepa/${id}/services`
    },
    GORO: {
      BASE: '/user/gopas-all',
      DETAIL: (id: string) => `/user/gopa/${id}`
    },
    PAYMENT_ACCOUNT: {
      BASE: '/payment-accounts',
      DETAIL: (id: string) => `/payment-accounts/${id}`,
      VERIFY: (id: string) => `/payment-accounts/${id}/verify`
    }
  },
  REQUESTS: {
    BASE: '/gateway/v1/requests',
    DETAIL: (id: string) => `/gateway/v1/requests/${id}`,
    ASSIGN: (id: string) => `/gateway/v1/requests/${id}/assign`,
    CANCEL: (id: string) => `/gateway/v1/requests/${id}/cancel`,
    COMPLETE: (id: string) => `/gateway/v1/requests/${id}/complete`
  },
  WALLET_MANAGEMENT: {
    BASE: '/wallet/get-system-wallets',
    DETAIL_BY_ID: (id: string) => `/wallet/get-wallet-details-by-id/${id}`,
    DETAIL_BY_WALLET_NUMBER: (walletNumber: string) => `/wallet/get-wallet-details-bynumber/${walletNumber}`,
    DETAIL_BY_USER: (userID: string) => `/wallet/get-user-wallet-details/${userID}`,
    CREATE: '/wallet/add-wallet'
  }
} as const;

// Type helper for getting API route paths
export type APIRoutes = typeof API_ROUTES;
export type APIRoutePath = keyof APIRoutes;
