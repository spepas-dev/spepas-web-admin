import { useMutation, useQueryClient } from '@tanstack/react-query';

import { WalletService } from '../../services/wallet.services';
import { CreateWalletDTO } from '../../types';
import { walletKeys } from '../queries/walletQueries';

export const useCreateWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWalletDTO) => WalletService.createWallet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.all });
    }
  });
};
