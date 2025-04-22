import { ENV_CONFIG } from './env.config';

const API_VERSION = ENV_CONFIG.API_VERSION || 'v1';
const PROXY_BASE = ENV_CONFIG.PROXY_BASE_URL;
const BASE_PATH = `${ENV_CONFIG.PROXY_BASE_URL}/gateway/${API_VERSION}`;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_PATH}/auth/login`,
    LOGOUT: `${BASE_PATH}/auth/logout`,
    REFRESH_TOKEN: `${BASE_PATH}/auth/refresh`,
    FORGOT_PASSWORD: `${BASE_PATH}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_PATH}/auth/reset-password`,
    CHANGE_PASSWORD: `${BASE_PATH}/auth/change-password`,
    USER: `${BASE_PATH}/auth/user`
  },
  ACCESS_MANAGEMENT: {
    MENU_GROUP: {
      BASE: `${BASE_PATH}/menu-groups`,
      DETAIL: (id: string) => `${BASE_PATH}/menu-groups/${id}`
    },
    MENU: {
      BASE: `${BASE_PATH}/menus`,
      DETAIL: (id: string) => `${BASE_PATH}/menus/${id}`
    },
    GROUP: {
      BASE: `${BASE_PATH}/groups`,
      DETAIL: (id: string) => `${BASE_PATH}/groups/${id}`
    },
    PERMISSION: {
      BASE: `${BASE_PATH}/permissions`,
      DETAIL: (id: string) => `${BASE_PATH}/permissions/${id}`
    },
    ROLE: {
      BASE: `${BASE_PATH}/roles`,
      DETAIL: (id: string) => `${BASE_PATH}/roles/${id}`
    },
    USER: {
      BASE: `${BASE_PATH}/users`,
      DETAIL: (id: string) => `${BASE_PATH}/users/${id}`
    }
  },
  INVENTORY_MANAGEMENT: {
    CAR: {
      MANUFACTURER: {
        BASE: `${BASE_PATH}/manufacturers`,
        DETAIL: (id: string) => `${BASE_PATH}/manufacturers/${id}`,
        BRANDS: (id: string) => `${BASE_PATH}/manufacturers/${id}/brands`
      },
      BRAND: {
        BASE: `${BASE_PATH}/brands`,
        DETAIL: (id: string) => `${BASE_PATH}/brands/${id}`,
        MODELS: (id: string) => `${BASE_PATH}/brands/${id}/models`,
        STATS: (id: string) => `${BASE_PATH}/brands/${id}/stats`,
        SUMMARY: `${BASE_PATH}/brands/summary`,
        CHECK_NAME: `${BASE_PATH}/brands/check-name`,
        BULK_DELETE: `${BASE_PATH}/brands/bulk-delete`
      },
      MODEL: {
        BASE: `${BASE_PATH}/models`,
        DETAIL: (id: string) => `${BASE_PATH}/models/${id}`,
        SPARE_PARTS: (id: string) => `${BASE_PATH}/models/${id}/spare-parts`
      },
      SPARE_PART: {
        BASE: `${BASE_PATH}/spare-parts`,
        DETAIL: (id: string) => `${BASE_PATH}/spare-parts/${id}`,
        BULK_UPDATE: `${BASE_PATH}/spare-parts/bulk-update`,
        CATEGORIES: `${BASE_PATH}/spare-parts/categories`
      }
    }
  },
  USER_MANAGEMENT: {
    SELLER: {
      BASE: `${BASE_PATH}/sellers`,
      DETAIL: (id: string) => `${BASE_PATH}/sellers/${id}`,
      STATS: (id: string) => `${BASE_PATH}/sellers/${id}/stats`
    },
    RIDER: {
      BASE: `${BASE_PATH}/riders`,
      DETAIL: (id: string) => `${BASE_PATH}/riders/${id}`,
      VEHICLES: {
        BASE: `${BASE_PATH}/riders/vehicles`,
        DETAIL: (id: string) => `${BASE_PATH}/riders/vehicles/${id}`
      }
    },
    MECHANIC: {
      BASE: `${BASE_PATH}/mechanics`,
      DETAIL: (id: string) => `${BASE_PATH}/mechanics/${id}`,
      SERVICES: (id: string) => `${BASE_PATH}/mechanics/${id}/services`
    },
    GORO: {
      BASE: `${BASE_PATH}/goros`,
      DETAIL: (id: string) => `${BASE_PATH}/goros/${id}`
    },
    PAYMENT_ACCOUNT: {
      BASE: `${BASE_PATH}/payment-accounts`,
      DETAIL: (id: string) => `${BASE_PATH}/payment-accounts/${id}`,
      VERIFY: (id: string) => `${BASE_PATH}/payment-accounts/${id}/verify`
    }
  },
  REQUESTS: {
    BASE: `${BASE_PATH}/requests`,
    DETAIL: (id: string) => `${BASE_PATH}/requests/${id}`,
    ASSIGN: (id: string) => `${BASE_PATH}/requests/${id}/assign`,
    CANCEL: (id: string) => `${BASE_PATH}/requests/${id}/cancel`,
    COMPLETE: (id: string) => `${BASE_PATH}/requests/${id}/complete`
  }
} as const;

// Type helper for getting API route paths
export type APIRoutes = typeof API_ROUTES;
export type APIRoutePath = keyof APIRoutes;
