import { zodResolver } from '@hookform/resolvers/zod';
import { Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import { useGetUserList } from '../../api/queries/users.queries';
import { RegisterGoroDTO } from '../../types/gopa.types';

const goroSchema = z.object({
  User_ID: z.string().min(1, 'Please select a user'),
  specialties: z.array(z.string()).min(1, 'Add at least one specialty')
});

type FormValues = z.infer<typeof goroSchema>;

interface NewGorosProps {
  onSubmit: (goro: RegisterGoroDTO) => void;
  loading?: boolean;
}

const availableSpecialties = [
  { value: 'TYRES', label: 'Tyres' },
  { value: 'FAN_BELT', label: 'Fan Belt' },
  { value: 'ENGINE', label: 'Engine' },
  { value: 'BRAKES', label: 'Brakes' },
  { value: 'TRANSMISSION', label: 'Transmission' },
  { value: 'ELECTRICAL', label: 'Electrical' },
  { value: 'AC_SYSTEM', label: 'AC System' },
  { value: 'SUSPENSION', label: 'Suspension' }
];

export function NewGoros({ onSubmit, loading = false }: NewGorosProps) {
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUserList();
  const availableUsers = useMemo(() => {
    return (
      users?.data?.map((user) => ({
        value: user.User_ID,
        label: user.name
      })) || []
    );
  }, [users?.data]);

  const form = useForm<FormValues>({
    resolver: zodResolver(goroSchema),
    defaultValues: {
      User_ID: '',
      specialties: []
    }
  });

  const handleSubmit = (values: FormValues) => {
    const goroData: RegisterGoroDTO = {
      User_ID: values.User_ID,
      specialties: values.specialties
    };
    onSubmit(goroData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="User_ID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Select Mechanic</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={availableUsers}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        placeholder="Select a mechanic"
                        maxCount={1}
                        variant="default"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Specialties</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={availableSpecialties}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select specialties"
                        variant="secondary"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Goro'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewGoros;
