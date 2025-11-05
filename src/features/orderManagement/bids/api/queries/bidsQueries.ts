import { useQuery } from '@tanstack/react-query';

import { BidsService } from '../../services/bids.service';

export const useRequestBidsAll = (requestId: string) => {
  return useQuery({
    queryKey: ['requestBidsAll', requestId],
    queryFn: () => BidsService.requestBidsAll(requestId)
  });
};

export const useSellerBidsForActiveRequestAll = (sellerId: string) => {
  return useQuery({
    queryKey: ['sellerBidsForActiveRequestAll', sellerId],
    queryFn: () => BidsService.sellerBidsForActiveRequestAll(sellerId)
  });
};

export const useSellerBidsForRequestsHistoryAll = (sellerId: string) => {
  return useQuery({
    queryKey: ['sellerBidsForRequestsHistoryAll', sellerId],
    queryFn: () => BidsService.sellerBidsForRequestsHistoryAll(sellerId)
  });
};
