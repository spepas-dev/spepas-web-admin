import { format } from 'date-fns';
import { CreditCard, MoreHorizontal, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Wallet as WalletType } from './index';

interface WalletTableProps {
  wallets: WalletType[];
}

export function WalletTable({ wallets }: WalletTableProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge className="bg-green-500">Active</Badge>;
      case 0:
        return <Badge className="bg-red-500">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const getWalletTypeIcon = (type: string) => {
    switch (type) {
      case 'REVENUE':
        return <Wallet className="h-4 w-4 text-[#4A36EC]" />;
      case 'EXPENSE':
        return <CreditCard className="h-4 w-4 text-[#4A36EC]" />;
      default:
        return <Wallet className="h-4 w-4 text-[#4A36EC]" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Wallet Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wallets.map((wallet) => (
            <TableRow key={wallet.id}>
              <TableCell className="font-medium">{wallet.WalletNumber}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getWalletTypeIcon(wallet.wallet_type)}
                  <span>{wallet.wallet_type}</span>
                </div>
              </TableCell>
              <TableCell>${wallet.balance.toFixed(2)}</TableCell>
              <TableCell>{wallet.User_ID || 'Not assigned'}</TableCell>
              <TableCell>{formatDate(wallet.date_created)}</TableCell>
              <TableCell>{getStatusBadge(wallet.status)}</TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
