import { useQuery } from "@tanstack/react-query";
import { SellersService } from "../../services/sellers.services";

export const sellerQueryKeys = {
    all: ['sellers'] as const,
    list: () => [...sellerQueryKeys.all, 'list'] as const,
    details: (id: string) => [...sellerQueryKeys.all, 'details', id] as const,
    stats: (id: string) => [...sellerQueryKeys.all, 'stats', id] as const,
} as const;

export const useGetSellerList = () => {
    return useQuery({
        queryKey: sellerQueryKeys.list(),
        queryFn: () => SellersService.getSellerList(),
    });
};

export const useGetSeller = (id: string) => {
    return useQuery({
        queryKey: sellerQueryKeys.details(id),
        queryFn: () => SellersService.getSeller(id),
    });
};

export const useGetSellerStats = (id: string) => {
    return useQuery({
        queryKey: sellerQueryKeys.stats(id),
        queryFn: () => SellersService.getSeller(id),
    });
};

