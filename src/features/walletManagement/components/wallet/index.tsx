import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { CreditCard, MoreHorizontal, Plus, Search, Wallet as WalletIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, PageHeader } from '@/components/ui/custom';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { useCreateWallet } from '../../api/mutations/walletMutations';
import { useWallets } from '../../api/queries/walletQueries';
import { CreateWalletDTO, Wallet } from '../../types';
import { NewWallet } from './newWallet';
import { WalletSearch } from './walletSearch';

export default function WalletsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createWalletMutation = useCreateWallet();
  const addWalletModal = useFormModal();
  const searchWalletModal = useFormModal();

  const { data, isLoading, isError } = useWallets();

  const wallets = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const handleSubmitWallet = async (wallet: CreateWalletDTO) => {
    setIsSubmitting(true);

    try {
      await createWalletMutation.mutateAsync(wallet);

      toast.success('Wallet created successfully');

      addWalletModal.close();
    } catch (error) {
      console.error('Error creating wallet:', error);
      toast.error('Failed to create wallet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddWallet = () => {
    addWalletModal.openForm({
      title: 'Create New Wallet',
      size: 'sm',
      showFooter: false,
      children: <NewWallet onSubmit={handleSubmitWallet} loading={isSubmitting} />
    });
  };

  const handleSearchWallet = () => {
    searchWalletModal.openForm({
      title: 'Search Wallets',
      size: 'md',
      showFooter: false,
      children: <WalletSearch wallets={wallets} loading={false} />
    });
  };

  const columns = useMemo((): ColumnDef<Wallet>[] => {
    return [
      {
        header: 'Wallet Number',
        accessorKey: 'WalletNumber'
      },
      {
        header: 'Wallet Type',
        accessorKey: 'wallet_type',
        cell: ({ row }) => <span className="capitalize text-gray-600">{row.original.wallet_type.toLowerCase()}</span>
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
        accessorKey: 'User_ID',
        cell: ({ row }) => <span className="text-gray-600">{row.original.User_ID || 'Not assigned'}</span>
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const isActive = row.original.status === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isActive ? 'bg-green-400' : 'bg-red-400')} />
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Created On',
        accessorKey: 'date_created',
        cell: ({ row }) => {
          return <span className="text-gray-600">{format(new Date(row.original.date_created), 'yyyy/MM/dd HH:mm:a')}</span>;
        }
      },
      {
        header: 'Actions',
        id: 'actions',
        accessorKey: 'actions',
        cell: () => {
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
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS' }).format(
        wallets.reduce((sum: number, wallet: Wallet) => sum + wallet.balance, 0)
      ),
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

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <PageLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading wallets</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Finance', '/finance', 'Wallets')} />

      {/* Header */}
      <PageHeader
        title="Wallets"
        description="Manage user wallets and balances"
        actions={
          <div className="flex space-x-2">
            <Button
              onClick={handleSearchWallet}
              variant="outline"
              className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button onClick={handleAddWallet} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </Button>
          </div>
        }
      />

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
    </div>
  );
}
