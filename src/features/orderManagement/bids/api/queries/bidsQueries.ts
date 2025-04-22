import { useQuery } from '@tanstack/react-query';

import { Bid } from '../../types';

const fetchBids = async (): Promise<{ data: Bid[] }> => {
  const response = await fetch('/api/bid/request-bids-all/a80d4265-9f32-4ee6-9ee5-cbff59e06a2e');
  if (!response.ok) {
    throw new Error('Failed to fetch bids');
  }
  return response.json();
};

export const useBids = () => {
  return useQuery({
    queryKey: ['bids'],
    queryFn: fetchBids
  });
};
