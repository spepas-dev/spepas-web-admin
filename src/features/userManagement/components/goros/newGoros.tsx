import { zodResolver } from '@hookform/resolvers/zod';
import { Wrench } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import { RegisterGoroDTO } from '../../types/goro.types';

const goroSchema = z.object({
  User_ID: z.string().min(1, 'Please select a user'),
  specialties: z.array(z.string()).min(1, 'Add at least one specialty')
});

type FormValues = z.infer<typeof goroSchema>;

interface NewGorosProps {
  onSubmit: (goro: RegisterGoroDTO) => void;
  loading?: boolean;
}

// Mock data - replace with actual data from your API
const availableUsers = [
  {
    value: 'user1',
    label: 'John Doe',
    icon: Wrench
  },
  {
    value: 'user2',
    label: 'Jane Smith',
    icon: Wrench
  }
];

const availableSpecialties = [
  { value: 'TYRES', label: 'Tyres', icon: Wrench },
  { value: 'FAN_BELT', label: 'Fan Belt', icon: Wrench },
  { value: 'ENGINE', label: 'Engine', icon: Wrench },
  { value: 'BRAKES', label: 'Brakes', icon: Wrench },
  { value: 'TRANSMISSION', label: 'Transmission', icon: Wrench },
  { value: 'ELECTRICAL', label: 'Electrical', icon: Wrench },
  { value: 'AC_SYSTEM', label: 'AC System', icon: Wrench },
  { value: 'SUSPENSION', label: 'Suspension', icon: Wrench }
];

export function NewGoros({ onSubmit, loading = false }: NewGorosProps) {
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