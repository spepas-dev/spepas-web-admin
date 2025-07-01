import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { CreateSparePartDTO } from '../../types';

const sparePartSchema = z.object({
  name: z.string().min(1, 'Part name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  carModel_ID: z.string()
});

const formSchema = z.object({
  spareParts: z.array(sparePartSchema).min(1, 'Add at least one spare part')
});

type FormValues = z.infer<typeof formSchema>;

interface SparePartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (spareParts: CreateSparePartDTO[]) => void;
}

export function SparePartDialog({ open, onOpenChange, onSubmit }: SparePartDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spareParts: [{ name: '', description: '', carModel_ID: '' }]
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Spare Parts</DialogTitle>
          <DialogDescription className="text-gray-600">Add one or more spare parts to the system</DialogDescription>
        </DialogHeader>

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
                              {...field}
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
                          <FormLabel className="text-gray-700">Car Brand ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter car brand ID"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
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
                onClick={() => append({ name: '', description: '', carModel_ID: '' })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Save Parts
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
