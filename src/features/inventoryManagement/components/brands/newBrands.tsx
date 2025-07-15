import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useGlobal } from '@/stores';

import { CreateBrandDTO } from '../../types';

const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  manufacturer_ID: z.string().min(1, 'Manufacturer ID is required'),
  type: z.enum(['CAR', 'TRUCK', 'MOTORCYCLE'], {
    required_error: 'Brand type is required'
  })
});

const formSchema = z.object({
  brands: z.array(brandSchema).min(1, 'Add at least one brand')
});

type FormValues = z.infer<typeof formSchema>;

interface NewBrandsProps {
  onSubmit: (brands: CreateBrandDTO[]) => void;
  loading?: boolean;
}

export function NewBrands({ onSubmit, loading = false }: NewBrandsProps) {
  const { data: inventoryData } = useGlobal();

  const manufacturers = useMemo(() => {
    return inventoryData?.manufacturers || [];
  }, [inventoryData]);

  const availableManufacturers = useMemo(() => {
    return manufacturers.map((m) => ({
      id: m.Manufacturer_ID,
      name: m.name
    }));
  }, [manufacturers]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brands: [{ name: '', manufacturer_ID: '', type: 'CAR' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'brands'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.brands);
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
                  name={`brands.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Brand Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter brand name"
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
                  name={`brands.${index}.manufacturer_ID`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Manufacturer</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]',
                                !field.value && 'text-muted-foreground'
                              )}
                              disabled={loading}
                            >
                              {field.value
                                ? availableManufacturers.find((manufacturer) => manufacturer.id === field.value)?.name
                                : 'Select manufacturer...'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search manufacturer..." />
                            <CommandList>
                              <CommandEmpty>No manufacturer found.</CommandEmpty>
                              <CommandGroup>
                                {availableManufacturers.map((manufacturer) => (
                                  <CommandItem
                                    value={manufacturer.name}
                                    key={manufacturer.id}
                                    onSelect={() => {
                                      field.onChange(manufacturer.id);
                                    }}
                                  >
                                    <Check className={cn('mr-2 h-4 w-4', manufacturer.id === field.value ? 'opacity-100' : 'opacity-0')} />
                                    {manufacturer.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`brands.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Brand Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                            <SelectValue placeholder="Select brand type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CAR">Car</SelectItem>
                          <SelectItem value="TRUCK">Truck</SelectItem>
                          <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
                        </SelectContent>
                      </Select>
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
            onClick={() => append({ name: '', manufacturer_ID: '', type: 'CAR' })}
            disabled={loading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another
          </Button>
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Brands'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
