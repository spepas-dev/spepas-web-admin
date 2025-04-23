export type Wallet = {
  id: number;
  walletID: string;
  date_created: string;
  status: number;
  wallet_type: string;
  User_ID: number | null;
  WalletNumber: string;
  balance: number;
};

export type CreateWalletDTO = Pick<Wallet, 'wallet_type'>;
