import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Permission } from '../../types';

const permissionSchema = z.object({
  title: z.string().min(1, 'Permission name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters')
});

const formSchema = z.object({
  permissions: z.array(permissionSchema).min(1, 'Add at least one permission')
});

type FormValues = z.infer<typeof formSchema>;

const initialPermission = {
  title: '',
  description: ''
};

interface NewPermissionProps {
  onSubmit: (permissions: Permission[]) => void;
  loading?: boolean;
}

export function NewPermission({ onSubmit, loading = false }: NewPermissionProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: [initialPermission]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'permissions'
  });

  const handleSubmit = (values: FormValues) => {
    const permissions = values.permissions.map((permission) => {
      return {
        title: permission.title
      };
    });
    onSubmit(permissions as unknown as Permission[]);
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
                  name={`permissions.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Permission Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter permission name"
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
                  name={`permissions.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter permission description"
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
          <Button type="button" variant="outline" className="hover:bg-gray-100" onClick={() => append(initialPermission)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Another
          </Button>
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Save Permissions'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
