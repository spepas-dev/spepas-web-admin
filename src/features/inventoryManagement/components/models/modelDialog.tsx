import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { CreateCarModel } from '../../types';
const modelSchema = z.object({
  name: z.string().min(1, 'Model name is required'),
  carBrand_ID: z.string().min(1, 'Invalid manufacturer ID'),
  yearOfMake: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1)
});

const formSchema = z.object({
  models: z.array(modelSchema).min(1, 'Add at least one model')
});

type FormValues = z.infer<typeof formSchema>;

interface ModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (models: CreateCarModel[]) => void;
}

export function ModelDialog({ open, onOpenChange, onSubmit }: ModelDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Vehicle Models</DialogTitle>
          <DialogDescription className="text-gray-600">Add one or more vehicle models to the system</DialogDescription>
        </DialogHeader>

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
                          <FormLabel className="text-gray-700">Manufacturer ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter manufacturer ID"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`models.${index}.yearOfMake`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter year"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button type="button" variant="outline" size="icon" className="mt-8 hover:bg-gray-100" onClick={() => remove(index)}>
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
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Save Models
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
