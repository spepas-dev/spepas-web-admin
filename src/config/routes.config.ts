export const ROUTE_PATHS = {
    AUTH: {
      BASE: 'auth',
      LOGIN: 'login',
      FORGOT_PASSWORD: 'forgot-password',
      RESET_PASSWORD: 'reset-password',
      CHANGE_PASSWORD: 'change-password',
    },
    ACCESS_MANAGEMENT: {
      BASE: 'access-management',
      MENU_GROUP: { // Menu Groups here maps to application in the api / database
        BASE: 'menu-groups',
        DETAIL: (id: string) => `/menu-groups/${id}`,
      },
      MENU: {
        CREATE: 'add-menu',
        UPDATE: 'update-menu',
      },
      GROUP: {
        BASE: 'groups',
        DETAIL: (id: string) => `/groups/${id}`,
      },
      PERMISSION: {
        BASE: 'permissions',
        CREATE: 'create-permission',
        UPDATE: 'update-permission',
      },
      ROLE: {
        BASE: 'roles',
        CREATE: 'add-role',
        UPDATE: 'update-role',
      },
      USER: {
        CREATE: 'create-user',
        UPDATE: 'update-user',
      },
    },
    USER_MANAGEMENT: {
      BASE: 'user-management',
      SELLER: {
        BASE: 'sellers',
        CREATE: '/sellers/create',
        DETAIL: (id: string) => `/sellers/${id}`
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
        BASE: 'mechanics',
        CREATE: '/mechanics/create',
        DETAIL: (id: string) => `/mechanics/${id}`
      },
      GORO: {
        BASE: 'goros',
        CREATE: '/goros/create',
        DETAIL: (id: string) => `/goros/${id}`
      },
      PAYMENT_ACCOUNT: {
        BASE: 'payment-accounts',
      }
    },
    REQUESTS_MANAGEMENT: {
      BASE: '/requests',
      CREATE: '/requests/create',
      DETAIL: (id: string) => `/requests/${id}`
    },
    INVENTORY_MANAGEMENT: {
      BASE: 'inventory',
      CAR: {
        BASE: 'cars',
        MANUFACTURER: {
          BASE: 'manufacturer',
          ALL: 'manufacturers',
          CREATE: '/cars/manufacturer/create',
          DETAIL: (id: string) => `/cars/manufacturer/${id}`
        },
        DETAIL: (id: string) => `/cars/${id}`
      },
      BRAND: {
        BASE: 'brand',
        ALL: 'brands',
        CREATE: '/cars/brand/create',
        DETAIL: (id: string) => `/cars/brand/${id}`
      },
      MODEL: {
        BASE: 'model',
        ALL: 'models',
        CREATE: '/cars/model/create',
        DETAIL: (id: string) => `/cars/model/${id}`
      },
      SPARE_PART: {
        BASE: 'spare-part',
        ALL: 'spare-parts',
        CREATE: '/cars/spare-part/create',
        DETAIL: (id: string) => `/cars/spare-part/${id}`
      }
    }
  };