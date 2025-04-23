import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Check, ChevronsUpDown, CreditCard, Search, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { Wallet as WalletType } from './index';

// Mock user data for the combobox
const users = [
  { id: 'user123', name: 'John Doe' },
  { id: 'user456', name: 'Jane Smith' },
  { id: 'user789', name: 'Robert Johnson' },
  { id: 'user101', name: 'Emily Davis' },
  { id: 'user102', name: 'Michael Wilson' }
];

const searchFormSchema = z.object({
  searchType: z.enum(['walletNumber', 'walletId', 'userId']),
  searchValue: z.string().min(1, 'Search value is required')
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface WalletSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wallets: WalletType[];
}

export function WalletSearchDialog({ open, onOpenChange, wallets }: WalletSearchDialogProps) {
  const [searchResults, setSearchResults] = useState<WalletType[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchType: 'walletNumber',
      searchValue: ''
    }
  });

  const searchType = form.watch('searchType');

  const handleSearch = (data: SearchFormValues) => {
    // In a real implementation, this would call an API
    // For now, we'll filter the existing wallets
    let results: WalletType[] = [...wallets];

    if (data.searchType === 'walletNumber') {
      results = results.filter((wallet) => wallet.WalletNumber.toLowerCase().includes(data.searchValue.toLowerCase()));
    } else if (data.searchType === 'walletId') {
      results = results.filter((wallet) => wallet.walletID.toLowerCase().includes(data.searchValue.toLowerCase()));
    } else if (data.searchType === 'userId' && selectedUser) {
      results = results.filter((wallet) => wallet.User_ID === selectedUser.id);
    }

    setSearchResults(results);

    if (results.length === 1) {
      setSelectedWallet(results[0]);
    } else {
      setSelectedWallet(null);
    }
  };

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

  const renderSearchInput = () => {
    if (searchType === 'userId') {
      return (
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" role="combobox" aria-expanded={openCombobox} className="w-full justify-between">
                {selectedUser ? selectedUser.name : 'Select user...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.name}
                    onSelect={() => {
                      setSelectedUser(user);
                      setOpenCombobox(false);
                      form.setValue('searchValue', user.id);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', selectedUser?.id === user.id ? 'opacity-100' : 'opacity-0')} />
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <FormControl>
        <Input
          placeholder={searchType === 'walletNumber' ? 'Enter wallet number (e.g., S000005)' : 'Enter wallet ID'}
          {...form.register('searchValue')}
        />
      </FormControl>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Wallets</DialogTitle>
          <DialogDescription>Search for wallets by wallet number, wallet ID, or user.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="searchType"
                render={() => (
                  <FormItem className="w-[180px]">
                    <Select
                      onValueChange={(value: SearchFormValues['searchType']) => form.setValue('searchType', value)}
                      defaultValue={form.getValues('searchType')}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Search by..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="walletNumber">Wallet Number</SelectItem>
                        <SelectItem value="walletId">Wallet ID</SelectItem>
                        <SelectItem value="userId">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="searchValue"
                render={() => (
                  <FormItem className="flex-1">
                    {renderSearchInput()}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </Form>

        {searchResults.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="text-sm text-gray-500">
              Found {searchResults.length} wallet{searchResults.length !== 1 ? 's' : ''}
            </div>

            {searchResults.map((wallet) => (
              <div
                key={wallet.id}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedWallet?.id === wallet.id ? 'border-[#4A36EC] bg-[#4A36EC]/5' : 'border-gray-200 hover:border-[#4A36EC]'
                }`}
                onClick={() => setSelectedWallet(wallet)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {getWalletTypeIcon(wallet.wallet_type)}
                      <h3 className="font-medium">{wallet.WalletNumber}</h3>
                      <Badge variant="outline" className="ml-2">
                        {wallet.wallet_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">ID: {wallet.walletID}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${wallet.balance.toFixed(2)}</p>
                    {getStatusBadge(wallet.status)}
                  </div>
                </div>

                {selectedWallet?.id === wallet.id && (
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p className="text-base">{wallet.User_ID || 'Not assigned'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">Created</p>
                      <p className="text-base">{formatDate(wallet.date_created)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {searchResults.length === 0 && form.getValues('searchValue') && (
          <div className="text-center py-6">
            <p className="text-gray-500">No wallets found matching your search criteria.</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
