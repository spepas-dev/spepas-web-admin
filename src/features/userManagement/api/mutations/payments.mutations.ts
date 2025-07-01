import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PaymentsService } from '../../services/payments.services';
import type { CreatePaymentDTO, PaymentAccount } from '../../types/payments.types';
import { paymentQueryKeys } from '../queries/payments.queries';

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDTO) => PaymentsService.registerPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all });
    }
  });
};

export const useUpdatePayment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<PaymentAccount>) => PaymentsService.updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all });
    }
  });
};
