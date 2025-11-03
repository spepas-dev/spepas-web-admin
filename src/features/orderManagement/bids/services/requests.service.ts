import { API_ROUTES } from '@/config/api.config';
import { ApiService } from '@/services/api.service';

import { OrderRequest, OrdersListResponse } from '../types';

const REQUESTS_ENDPOINT = API_ROUTES.REQUEST;

export const RequestsService = {
  getRequests: async (requestId: string) => {
    return ApiService.get<OrderRequest[]>(`${REQUESTS_ENDPOINT}/${requestId}`);
  },

  getGopaAssignedActiveRequests: async (gopaId: string) => {
    return ApiService.get<OrdersListResponse>(`${REQUESTS_ENDPOINT.GOPA_ASSIGNED_ACTIVE_REQUEST(gopaId)}`);
  },

  getGopaUnassignedActiveRequests: async (gopaId: string) => {
    return ApiService.get<OrdersListResponse>(`${REQUESTS_ENDPOINT.GOPA_UNASSIGNED_ACTIVE_REQUEST(gopaId)}`);
  },

  getGopaAssignedActiveRequestsHistory: async (gopaId: string) => {
    return ApiService.get<OrdersListResponse>(`${REQUESTS_ENDPOINT.GOPA_ASSIGNED_ACTIVE_REQUEST_HISTORY(gopaId)}`);
  },

  getGopaUnassignedActiveRequestsHistory: async (gopaId: string) => {
    return ApiService.get<OrdersListResponse>(`${REQUESTS_ENDPOINT.GOPA_UNASSIGNED_REQUEST_HISTORY(gopaId)}`);
  }
};
