import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { CreateWalletDTO } from '../../types';

const walletSchema = z.object({
  wallet_type: z.enum(['REVENUE', 'EXPENSE'], {
    required_error: 'Please select a wallet type'
  })
});

type FormValues = z.infer<typeof walletSchema>;

interface NewWalletProps {
  onSubmit: (wallet: CreateWalletDTO) => void;
  loading?: boolean;
}

export function NewWallet({ onSubmit, loading = false }: NewWalletProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      wallet_type: 'REVENUE'
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="wallet_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Wallet Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                    <SelectValue placeholder="Select wallet type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="REVENUE">Revenue</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Creating...' : 'Create Wallet'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
