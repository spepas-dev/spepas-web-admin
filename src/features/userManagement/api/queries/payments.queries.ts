import { useQuery } from "@tanstack/react-query";
import { PaymentsService } from "../../services/payments.services";

export const paymentQueryKeys = {
    all: ['payments'] as const,
    list: () => [...paymentQueryKeys.all, 'list'] as const,
    details: (id: string) => [...paymentQueryKeys.all, 'details', id] as const,
    stats: (id: string) => [...paymentQueryKeys.all, 'stats', id] as const,
} as const;

export const useGetPaymentList = () => {
    return useQuery({
        queryKey: paymentQueryKeys.list(),
        queryFn: () => PaymentsService.getPaymentList(),
    });
};

export const useGetPayment = (id: string) => {
    return useQuery({
        queryKey: paymentQueryKeys.details(id),
        queryFn: () => PaymentsService.getPayment(id),
    });
};

export const useGetPaymentStats = (id: string) => {
    return useQuery({
        queryKey: paymentQueryKeys.stats(id),
        queryFn: () => PaymentsService.getPayment(id),
    });
};

