import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, Plus, Search, Wallet as WalletIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toastConfig } from '@/lib/toast';

import { WalletDialog } from './walletDialog';
import { WalletSearchDialog } from './walletSearchDialog';
import { WalletTable } from './walletTable';

export interface Wallet {
  id: number;
  walletID: string;
  date_created: string;
  status: number;
  wallet_type: string;
  User_ID: string | null;
  WalletNumber: string;
  balance: number;
}

export default function WalletsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: 5,
      walletID: 'b6ad0f05-70e8-4945-a9e1-9fc3584063d6',
      date_created: '2025-03-11T11:27:22.625Z',
      status: 1,
      wallet_type: 'REVENUE',
      User_ID: null,
      WalletNumber: 'S000005',
      balance: 0
    },
    {
      id: 6,
      walletID: 'c7be1f16-81f9-5a56-b0f2-0gd4695174e7',
      date_created: '2025-03-12T12:38:33.736Z',
      status: 1,
      wallet_type: 'EXPENSE',
      User_ID: 'user123',
      WalletNumber: 'S000006',
      balance: 1250.75
    },
    {
      id: 7,
      walletID: 'd8cf2g27-92g0-6b67-c1g3-1he5706285f8',
      date_created: '2025-03-13T13:49:44.847Z',
      status: 0,
      wallet_type: 'REVENUE',
      User_ID: 'user456',
      WalletNumber: 'S000007',
      balance: 500.25
    }
  ]);

  const handleAddWallet = async (walletData: { wallet_type: string }) => {
    // In a real implementation, this would call an API
    const newWallet: Wallet = {
      id: wallets.length + 1,
      walletID: crypto.randomUUID(),
      date_created: new Date().toISOString(),
      status: 1,
      wallet_type: walletData.wallet_type,
      User_ID: null,
      WalletNumber: `S${String(wallets.length + 1).padStart(6, '0')}`,
      balance: 0
    };

    setWallets([...wallets, newWallet]);
    setIsDialogOpen(false);
    toastConfig.success('Wallet created successfully');
  };

  const stats = [
    {
      title: 'Total Wallets',
      value: wallets.length,
      icon: WalletIcon,
      description: 'Active wallets in system',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Total Balance',
      value: `$${wallets.reduce((sum, wallet) => sum + wallet.balance, 0).toFixed(2)}`,
      icon: CreditCard,
      description: 'Combined wallet balance',
      trend: '+5.4%',
      trendUp: true
    },
    {
      title: 'Revenue Wallets',
      value: wallets.filter((w) => w.wallet_type === 'REVENUE').length,
      icon: WalletIcon,
      description: 'Wallets for revenue',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Expense Wallets',
      value: wallets.filter((w) => w.wallet_type === 'EXPENSE').length,
      icon: CreditCard,
      description: 'Wallets for expenses',
      trend: '+1.8%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/finance" className="hover:text-[#4A36EC]">
          Finance
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Wallets</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Wallets</h1>
          <p className="text-sm text-gray-600">Manage user wallets and balances</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsSearchDialogOpen(true)} className="bg-white hover:bg-gray-100 text-[#4A36EC] border border-[#4A36EC]">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Wallet
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <WalletTable wallets={wallets} />
      </motion.div>

      <WalletDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddWallet} />
      <WalletSearchDialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen} wallets={wallets} />
    </div>
  );
}
