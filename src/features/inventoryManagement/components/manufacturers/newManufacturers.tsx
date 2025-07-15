import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { CountryDropdown } from '@/components/ui/country-dropdown';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { CreateManufacturerDTO } from '../../types';

const manufacturerSchema = z.object({
  name: z.string().min(1, 'Manufacturer name is required'),
  country: z.string().min(1, 'Country is required')
});

const formSchema = z.object({
  manufacturers: z.array(manufacturerSchema).min(1, 'Add at least one manufacturer')
});

type FormValues = z.infer<typeof formSchema>;

interface NewManufacturersProps {
  onSubmit: (manufacturers: CreateManufacturerDTO[]) => void;
  loading?: boolean;
}

export function NewManufacturers({ onSubmit, loading = false }: NewManufacturersProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manufacturers: [{ name: '', country: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'manufacturers'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.manufacturers);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name={`manufacturers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter manufacturer name"
                          className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`manufacturers.${index}.country`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Country</FormLabel>
                      <CountryDropdown
                        placeholder="Enter country"
                        defaultValue={field.value}
                        onChange={(country) => field.onChange(country.name)}
                        disabled={loading}
                      />
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="mt-8 hover:bg-gray-100"
                  onClick={() => remove(index)}
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="hover:bg-gray-100"
            onClick={() => append({ name: '', country: '' })}
            disabled={loading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another
          </Button>
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Manufacturers'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
