import { zodResolver } from '@hookform/resolvers/zod';
import { Menu, Plus, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useGetApplications } from '@/features/accessManagement/api/queries/applications.queries';

const menuSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  menus: z
    .array(
      z.object({
        name: z.string().min(1, 'Menu name is required'),
        description: z.string().optional(),
        isActive: z.boolean().default(true)
      })
    )
    .min(1, 'At least one menu is required')
});

type FormValues = z.infer<typeof menuSchema>;

interface NewMenuProps {
  onSubmit: (menus: Array<{ application_id: string; name: string; description?: string; is_active: boolean }>) => void;
  loading?: boolean;
}

export function NewMenu({ onSubmit, loading = false }: NewMenuProps) {
  const { data: applications } = useGetApplications();

  const applicationsOptions = useMemo(() => {
    return applications?.data?.map((application) => ({
      label: application.name,
      value: application.application_id
    }));
  }, [applications]);

  const form = useForm<FormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      applicationId: '',
      menus: [{ name: '', description: '', isActive: true }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'menus'
  });

  const handleSubmit = (values: FormValues) => {
    const menuData = values.menus.map((menu) => ({
      application_id: values.applicationId,
      name: menu.name,
      description: menu.description,
      is_active: menu.isActive
    }));

    onSubmit(menuData);
    form.reset();
  };

  const addMenu = () => {
    append({ name: '', description: '', isActive: true });
  };

  const removeMenu = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Menu className="h-5 w-5 text-[#4A36EC]" />
        <h3 className="text-lg font-semibold text-gray-900">Create Multiple Menus</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="applicationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Application *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading} value={field.value}>
                      <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                        <SelectValue placeholder="Select application" />
                      </SelectTrigger>
                      <SelectContent>
                        {applicationsOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Menus</h4>
                <Button type="button" variant="outline" size="sm" onClick={addMenu} disabled={loading} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Menu
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-700">Menu {index + 1}</h5>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenu(index)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`menus.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Menu Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter menu name"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`menus.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Description</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter menu description"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`menus.${index}.isActive`}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="text-gray-700">Active</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="submit" disabled={loading || !form.formState.isValid} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
              {loading ? 'Creating...' : `Create ${fields.length} Menu${fields.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NewMenu;
