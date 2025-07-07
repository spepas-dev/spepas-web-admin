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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useGlobal } from '@/stores';

import { CreateSparePartDTO } from '../../types';

const sparePartSchema = z.object({
  name: z.string().min(1, 'Spare part name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be 0 or greater'),
  carModel_ID: z.string().min(1, 'Car model ID is required')
});

const formSchema = z.object({
  spareParts: z.array(sparePartSchema).min(1, 'Add at least one spare part')
});

type FormValues = z.infer<typeof formSchema>;

interface NewSparePartsProps {
  onSubmit: (spareParts: CreateSparePartDTO[]) => void;
  loading?: boolean;
}

export function NewSpareParts({ onSubmit, loading = false }: NewSparePartsProps) {
  const { data: inventoryData } = useGlobal();

  const models = useMemo(() => {
    return inventoryData?.models || [];
  }, [inventoryData]);

  const availableModels = useMemo(() => {
    return models.map((m) => ({
      id: m.CarModel_ID,
      name: m.name
    }));
  }, [models]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spareParts: [{ name: '', description: '', price: 0, carModel_ID: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'spareParts'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.spareParts);
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
                  name={`spareParts.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Part Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter part name"
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
                  name={`spareParts.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter part description"
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
                  name={`spareParts.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter price"
                          className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                          disabled={loading}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`spareParts.${index}.carModel_ID`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Car Model</FormLabel>
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
                              {field.value ? availableModels.find((model) => model.id === field.value)?.name : 'Select car model...'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search car model..." />
                            <CommandList>
                              <CommandEmpty>No car model found.</CommandEmpty>
                              <CommandGroup>
                                {availableModels.map((model) => (
                                  <CommandItem
                                    value={model.name}
                                    key={model.id}
                                    onSelect={() => {
                                      field.onChange(model.id);
                                    }}
                                  >
                                    <Check className={cn('mr-2 h-4 w-4', model.id === field.value ? 'opacity-100' : 'opacity-0')} />
                                    {model.name}
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
            onClick={() => append({ name: '', description: '', price: 0, carModel_ID: '' })}
            disabled={loading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another
          </Button>
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Spare Parts'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
