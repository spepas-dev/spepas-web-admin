export const ROUTE_PATHS = {
    AUTH: {
      BASE: 'auth',
      LOGIN: 'login',
      FORGOT_PASSWORD: 'forgot-password',
      RESET_PASSWORD: 'reset-password',
      CHANGE_PASSWORD: 'change-password',
    },
    ACESS_CONTROL: {
      BASE: 'auth',
      MENU_GROUP: {
        ALL: 'applications',
        CREATE: 'create-application',
        UPDATE: 'update-application',

      },
      MENU: {
        CREATE: 'add-menu',
        UPDATE: 'update-menu',
      },
      GROUP: {
        CREATE: 'create-group',
        UPDATE: 'update-group',
      },
      PERMISSION: {
        CREATE: 'create-permission',
        UPDATE: 'update-permission',
      },
      ROLE: {
        ALL: 'roles',
        CREATE: 'add-role',
        UPDATE: 'update-role',
      },
      USER: {
        CREATE: 'create-user',
        UPDATE: 'update-user',
      },
    },
    USER_MANAGEMENT: {
      BASE: '/users',
      CREATE: '/users/create',
      DETAIL: (id: string) => `/users/${id}`
    },
    REQUESTS_MANAGEMENT: {
      BASE: '/requests',
      CREATE: '/requests/create',
      DETAIL: (id: string) => `/requests/${id}`
    },
    INVENTORY_MANAGEMENT: {
      BASE: '/orders',
      CREATE: '/orders/create',
      DETAIL: (id: string) => `/orders/${id}`
    }
  };