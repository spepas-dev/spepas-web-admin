import { useQuery } from '@tanstack/react-query';

import { RequestsService } from '../../services/requests.service';
import { OrderRequest } from '../../types';

const fetchOrderDetails = async (partId: string): Promise<{ data: OrderRequest[] }> => {
  const response = await fetch(`/api/bids/part/${partId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order details');
  }
  return response.json();
};

export const useOrderDetails = (partId: string) => {
  return useQuery({
    queryKey: ['orderDetails', partId],
    queryFn: () => fetchOrderDetails(partId),
    enabled: !!partId
  });
};

export const useGopaAssignedActiveRequests = (gopaId: string) => {
  return useQuery({
    queryKey: ['gopaAssignedActiveRequests', gopaId],
    queryFn: () => RequestsService.getGopaAssignedActiveRequests(gopaId),
    enabled: !!gopaId
  });
};

export const useGopaUnassignedActiveRequests = (gopaId: string) => {
  return useQuery({
    queryKey: ['gopaUnassignedActiveRequests', gopaId],
    queryFn: () => RequestsService.getGopaUnassignedActiveRequests(gopaId),
    enabled: !!gopaId
  });
};

export const useGopaAssignedActiveRequestsHistory = (gopaId: string) => {
  return useQuery({
    queryKey: ['gopaAssignedActiveRequestsHistory', gopaId],
    queryFn: () => RequestsService.getGopaAssignedActiveRequestsHistory(gopaId),
    enabled: !!gopaId
  });
};

export const useGopaUnassignedActiveRequestsHistory = (gopaId: string) => {
  return useQuery({
    queryKey: ['gopaUnassignedActiveRequestsHistory', gopaId],
    queryFn: () => RequestsService.getGopaUnassignedActiveRequestsHistory(gopaId),
    enabled: !!gopaId
  });
};
