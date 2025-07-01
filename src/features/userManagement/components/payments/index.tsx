import { motion } from 'framer-motion';
import { Building, ChevronRight, CreditCard, Plus, User, Wallet } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { PaymentDialog } from './paymentDialog';
import { PaymentTable } from './paymentTable';

export interface PaymentAccount {
  mode: 'WALLET' | 'BANK' | 'CARD';
  accountNumber: string;
  provider: string;
  User_ID: string;
  name: string;
}

export default function PaymentAccountsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddAccounts = async (newAccounts: PaymentAccount[]) => {
    try {
      // Handle API call here
      console.log(newAccounts);
      setAccounts([...accounts, ...newAccounts]);
      setIsDialogOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to add payment accounts');
      console.error(err);
    }
  };

  const stats = [
    {
      title: 'Total Accounts',
      value: accounts.length,
      icon: Wallet,
      description: 'Registered accounts',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Payment Methods',
      value: new Set(accounts.map((a) => a.mode)).size,
      icon: CreditCard,
      description: 'Available methods',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Providers',
      value: new Set(accounts.map((a) => a.provider)).size,
      icon: Building,
      description: 'Active providers',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Active Users',
      value: new Set(accounts.map((a) => a.User_ID)).size,
      icon: User,
      description: 'With payment methods',
      trend: '+2.1%',
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
        <a href="/user-management" className="hover:text-[#4A36EC]">
          User Management
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Payment Accounts</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Payment Accounts</h1>
          <p className="text-sm text-gray-600">Manage user payment accounts and methods</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Account
        </Button>
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

      {/* Table Container */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <PaymentTable accounts={accounts} />
      </motion.div>

      {/* Show error if exists */}
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <PaymentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddAccounts} />
    </div>
  );
}
