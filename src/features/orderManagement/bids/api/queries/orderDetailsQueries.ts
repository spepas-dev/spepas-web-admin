import { useQuery } from '@tanstack/react-query';

import { OrderDetails } from '../../orderDetails/types';

const fetchOrderDetails = async (partId: string): Promise<{ data: OrderDetails[] }> => {
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
