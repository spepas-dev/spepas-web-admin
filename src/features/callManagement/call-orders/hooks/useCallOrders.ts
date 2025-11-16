import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toastConfig } from '@/lib/toast';

import { CallOrderService } from '../services/callOrder.service';
import { CallOrder, OrderPlacementForm } from '../types/call-orders.types';

// Query Keys
export const CALL_ORDER_QUERY_KEYS = {
  all: ['call-orders'] as const,
  lists: () => [...CALL_ORDER_QUERY_KEYS.all, 'list'] as const,
  list: (params?: any) => [...CALL_ORDER_QUERY_KEYS.lists(), params] as const,
  details: () => [...CALL_ORDER_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CALL_ORDER_QUERY_KEYS.details(), id] as const,
  stats: () => [...CALL_ORDER_QUERY_KEYS.all, 'stats'] as const,
  buyers: () => ['buyers'] as const,
  buyerSearch: (phone: string) => [...CALL_ORDER_QUERY_KEYS.buyers(), 'search', phone] as const,
  buyerDetail: (id: string) => [...CALL_ORDER_QUERY_KEYS.buyers(), 'detail', id] as const
};

/**
 * Hook to fetch call orders with optional filtering
 */
export const useCallOrders = (params?: { page?: number; limit?: number; status?: string; call_type?: string; search?: string }) => {
  return useQuery({
    queryKey: CALL_ORDER_QUERY_KEYS.list(params),
    queryFn: () => CallOrderService.getCallOrders(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  });
};

/**
 * Hook to fetch a specific call order
 */
export const useCallOrder = (orderId: string, enabled = true) => {
  return useQuery({
    queryKey: CALL_ORDER_QUERY_KEYS.detail(orderId),
    queryFn: () => CallOrderService.getCallOrder(orderId),
    enabled: enabled && !!orderId,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });
};

/**
 * Hook to fetch call order statistics
 */
export const useCallOrderStats = () => {
  return useQuery({
    queryKey: CALL_ORDER_QUERY_KEYS.stats(),
    queryFn: () => CallOrderService.getCallOrderStats(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000 // Refetch every 30 seconds
  });
};

/**
 * Hook to search buyers by phone number
 */
export const useBuyerSearch = (phoneNumber: string, enabled = false) => {
  return useQuery({
    queryKey: CALL_ORDER_QUERY_KEYS.buyerSearch(phoneNumber),
    queryFn: () => CallOrderService.searchBuyers(phoneNumber),
    enabled: enabled && phoneNumber.length >= 10,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

/**
 * Hook to get buyer details
 */
export const useBuyerDetails = (buyerId: string, enabled = true) => {
  return useQuery({
    queryKey: CALL_ORDER_QUERY_KEYS.buyerDetail(buyerId),
    queryFn: () => CallOrderService.getBuyerDetails(buyerId),
    enabled: enabled && !!buyerId,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

/**
 * Hook to create a new call order
 */
export const useCreateCallOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: OrderPlacementForm) => CallOrderService.createCallOrder(orderData),
    onSuccess: (data) => {
      // Invalidate and refetch call orders list
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.stats() });

      toastConfig.success('Call order created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Failed to create call order';
      toastConfig.error(message);
    }
  });
};

/**
 * Hook to update a call order
 */
export const useUpdateCallOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, orderData }: { orderId: string; orderData: Partial<OrderPlacementForm> }) =>
      CallOrderService.updateCallOrder(orderId, orderData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.detail(variables.orderId) });
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.stats() });

      toastConfig.success('Call order updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Failed to update call order';
      toastConfig.error(message);
    }
  });
};

/**
 * Hook to update call order status
 */
export const useUpdateCallOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: CallOrder['status'] }) =>
      CallOrderService.updateCallOrderStatus(orderId, status),
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.detail(variables.orderId) });
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.stats() });

      toastConfig.success('Order status updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Failed to update order status';
      toastConfig.error(message);
    }
  });
};

/**
 * Hook to delete a call order
 */
export const useDeleteCallOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => CallOrderService.deleteCallOrder(orderId),
    onSuccess: () => {
      // Invalidate and refetch call orders list
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALL_ORDER_QUERY_KEYS.stats() });

      toastConfig.success('Call order deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Failed to delete call order';
      toastConfig.error(message);
    }
  });
};

/**
 * Hook to export call orders
 */
export const useExportCallOrders = () => {
  return useMutation({
    mutationFn: (params?: { status?: string; call_type?: string; date_from?: string; date_to?: string }) =>
      CallOrderService.exportCallOrders(params),
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `call-orders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toastConfig.success('Call orders exported successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Failed to export call orders';
      toastConfig.error(message);
    }
  });
};
