import { useQuery } from '@tanstack/react-query';

import { BuyersService } from '../../services/buyer.service';

export const buyerQueryKeys = {
  all: ['buyers'] as const,
  list: () => [...buyerQueryKeys.all, 'list'] as const,
  details: (id: string) => [...buyerQueryKeys.all, 'details', id] as const,
  stats: (id: string) => [...buyerQueryKeys.all, 'stats', id] as const
} as const;

export const useGetBuyerList = () => {
  return useQuery({
    queryKey: buyerQueryKeys.list(),
    queryFn: () => BuyersService.getBuyerList()
  });
};

export const useGetBuyer = (id: string) => {
  return useQuery({
    queryKey: buyerQueryKeys.details(id),
    queryFn: () => BuyersService.getBuyer(id)
  });
};

export const useGetBuyerStats = (id: string) => {
  return useQuery({
    queryKey: buyerQueryKeys.stats(id),
    queryFn: () => BuyersService.getBuyer(id)
  });
};
