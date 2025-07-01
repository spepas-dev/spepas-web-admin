import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, MoreHorizontal, Plus, Search, Wallet as WalletIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toastConfig } from '@/lib/toast';
import { cn } from '@/lib/utils';

import { useWallets } from '../../api/queries/walletQueries';
import { WalletDialog } from './walletDialog';
import { WalletSearchDialog } from './walletSearchDialog';

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
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const { data, isLoading, isError } = useWallets();
  useEffect(() => {
    if (data?.data) {
      setWallets(data?.data as Wallet[]);
    }
    console.log(data);
  }, [data]);

  const columns = useMemo((): ColumnDef<Wallet>[] => {
    return [
      {
        header: 'Wallet Number',
        accessorKey: 'WalletNumber'
      },
      {
        header: 'Wallet Type',
        accessorKey: 'wallet_type'
      },
      {
        header: 'Balance',
        accessorKey: 'balance',
        cell: ({ row }) => {
          return <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS' }).format(row.original.balance)}</span>;
        }
      },
      {
        header: 'User ID',
        accessorKey: 'User_ID'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          return (
            <span
              className={cn(
                'px-2 py-1 rounded-md text-sm',
                row.original.status === 1 ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'
              )}
            >
              {row.original.status === 1 ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Created On',
        accessorKey: 'date_created',
        cell: ({ row }) => {
          return <span>{format(new Date(row.original.date_created), 'yyyy/MM/dd HH:mm:a')}</span>;
        }
      },
      {
        header: 'Actions',
        id: 'actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Wallet</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        }
      }
    ];
  }, []);

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
      Icon: WalletIcon,
      description: 'Active wallets in system',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Total Balance',
      value: `$${wallets.reduce((sum, wallet) => sum + wallet.balance, 0).toFixed(2)}`,
      Icon: CreditCard,
      description: 'Combined wallet balance',
      trend: '+5.4%',
      trendUp: true
    },
    {
      title: 'Revenue Wallets',
      value: wallets.filter((w) => w.wallet_type === 'REVENUE').length,
      Icon: WalletIcon,
      description: 'Wallets for revenue',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Expense Wallets',
      value: wallets.filter((w) => w.wallet_type === 'EXPENSE').length,
      Icon: CreditCard,
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

      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          columns={columns}
          data={wallets}
          loading={isLoading}
          placeholder="Search wallets..."
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>

      <WalletDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddWallet} />
      <WalletSearchDialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen} wallets={wallets} />
    </div>
  );
}
