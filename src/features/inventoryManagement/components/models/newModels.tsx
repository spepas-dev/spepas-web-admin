import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useGlobal } from '@/stores';

import { CreateCarModel } from '../../types';

const modelSchema = z.object({
  name: z.string().min(1, 'Model name is required'),
  carBrand_ID: z.string().min(1, 'Car brand ID is required'),
  yearOfMake: z
    .number()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
});

const formSchema = z.object({
  models: z.array(modelSchema).min(1, 'Add at least one model')
});

type FormValues = z.infer<typeof formSchema>;

interface NewModelsProps {
  onSubmit: (models: CreateCarModel[]) => void;
  loading?: boolean;
}

export function NewModels({ onSubmit, loading = false }: NewModelsProps) {
  const { data: inventoryData } = useGlobal();

  const brands = useMemo(() => {
    return inventoryData?.brands || [];
  }, [inventoryData]);

  const availableBrands = useMemo(() => {
    return brands.map((b) => ({
      id: b.CarBrand_ID,
      name: b.name
    }));
  }, [brands]);

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear + 1; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      models: [{ name: '', carBrand_ID: '', yearOfMake: new Date().getFullYear() }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'models'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.models);
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
                  name={`models.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Model Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter model name"
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
                  name={`models.${index}.carBrand_ID`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Car Brand</FormLabel>
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
                              {field.value ? availableBrands.find((brand) => brand.id === field.value)?.name : 'Select car brand...'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search car brand..." />
                            <CommandList>
                              <CommandEmpty>No car brand found.</CommandEmpty>
                              <CommandGroup>
                                {availableBrands.map((brand) => (
                                  <CommandItem
                                    value={brand.name}
                                    key={brand.id}
                                    onSelect={() => {
                                      field.onChange(brand.id);
                                    }}
                                  >
                                    <Check className={cn('mr-2 h-4 w-4', brand.id === field.value ? 'opacity-100' : 'opacity-0')} />
                                    {brand.name}
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
                  name={`models.${index}.yearOfMake`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Year of Make</FormLabel>
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
                              {field.value ? field.value.toString() : 'Select year...'}
                              <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search year..." />
                            <CommandList>
                              <CommandEmpty>No year found.</CommandEmpty>
                              <CommandGroup>
                                {availableYears.map((year) => (
                                  <CommandItem
                                    value={year.toString()}
                                    key={year}
                                    onSelect={() => {
                                      field.onChange(year);
                                    }}
                                  >
                                    <Check className={cn('mr-2 h-4 w-4', year === field.value ? 'opacity-100' : 'opacity-0')} />
                                    {year}
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
            onClick={() => append({ name: '', carBrand_ID: '', yearOfMake: new Date().getFullYear() })}
            disabled={loading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another
          </Button>
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Models'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
