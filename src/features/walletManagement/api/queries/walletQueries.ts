import { useQuery } from '@tanstack/react-query';

import { WalletQueryParams, WalletService } from '../../services/wallet.services';
// import { Wallet } from '../../types';

export const walletKeys = {
  all: ['wallets'] as const,
  detail: (id: string) => [...walletKeys.all, 'detail', id] as const,
  lists: () => [...walletKeys.all, 'list'] as const,
  list: (params: WalletQueryParams) => [...walletKeys.lists(), params] as const
};

export const useWallets = (params?: WalletQueryParams) => {
  return useQuery({
    queryKey: walletKeys.list(params ?? {}),
    queryFn: () => WalletService.getWallets(params)
  });
};
