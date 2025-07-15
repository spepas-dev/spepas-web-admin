import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Permission } from '../../types';

const permissionSchema = z.object({
  name: z.string().min(1, 'Permission name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  module: z.string().min(1, 'Module is required'),
  actions: z.array(z.string()).min(1, 'Select at least one action')
});

const formSchema = z.object({
  permissions: z.array(permissionSchema).min(1, 'Add at least one permission')
});

type FormValues = z.infer<typeof formSchema>;

interface NewPermissionProps {
  onSubmit: (permissions: Permission[]) => void;
  loading?: boolean;
}

const availableActions = ['create', 'read', 'update', 'delete', 'approve', 'reject'];

const availableModules = ['inventory', 'sales', 'purchases', 'reports', 'users', 'settings'];

export function NewPermission({ onSubmit, loading = false }: NewPermissionProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: [{ name: '', description: '', module: '', actions: [] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'permissions'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.permissions as unknown as Permission[]);
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
                  name={`permissions.${index}.name`}
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
                <FormField
                  control={form.control}
                  name={`permissions.${index}.module`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Module</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                            <SelectValue placeholder="Select module" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableModules.map((module) => (
                            <SelectItem key={module} value={module}>
                              {module.charAt(0).toUpperCase() + module.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`permissions.${index}.actions`}
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Actions</FormLabel>
                      <div className="grid grid-cols-3 gap-4">
                        {availableActions.map((action) => (
                          <FormField
                            key={action}
                            control={form.control}
                            name={`permissions.${index}.actions`}
                            render={({ field }) => {
                              return (
                                <FormItem key={action} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(action)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, action])
                                          : field.onChange(field.value?.filter((value) => value !== action));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{action.charAt(0).toUpperCase() + action.slice(1)}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
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
            onClick={() => append({ name: '', description: '', module: '', actions: [] })}
          >
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
