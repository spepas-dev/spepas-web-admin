import { zodResolver } from '@hookform/resolvers/zod';
import { Menu, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Menu as MenuType } from '../../../types/group.types';

const formSchema = z.object({
  menus: z
    .array(
      z.object({
        title: z.string().min(1, 'Menu title is required'),
        status: z.number().min(0).max(1).default(1)
      })
    )
    .min(1, 'At least one menu is required')
});

type FormValues = z.infer<typeof formSchema>;

interface NewMenuProps {
  onSubmit: (data: Partial<MenuType>[]) => void;
  loading?: boolean;
  mode?: 'create' | 'update';
  initialData?: MenuType[];
  applicationId?: string;
}

export function NewMenu({ onSubmit, loading = false, mode = 'create', initialData, applicationId }: NewMenuProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menus: initialData?.length ? initialData.map((menu) => ({ title: menu.title, status: menu.status })) : [{ title: '', status: 1 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'menus'
  });

  const handleSubmit = (values: FormValues) => {
    const menuData: Partial<MenuType>[] = values.menus.map((menu) => ({
      title: menu.title,
      status: menu.status,
      ...(mode === 'create' && applicationId && { application_id: applicationId })
    }));

    onSubmit(menuData);
  };

  const addMenu = () => {
    append({ title: '', status: 1 });
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
        <h3 className="text-lg font-semibold text-gray-900">{mode === 'create' ? 'Create Multiple Menus' : 'Update Menus'}</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

                <div className="grid grid-cols-1  gap-4">
                  <FormField
                    control={form.control}
                    name={`menus.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Menu Title *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter menu title"
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
                    name={`menus.${index}.status`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Status</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          defaultValue={field.value?.toString()}
                          disabled={loading}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Active</SelectItem>
                            <SelectItem value="0">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="submit" disabled={loading || !form.formState.isValid} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
              {loading
                ? 'Saving...'
                : mode === 'create'
                  ? `Create ${fields.length} Menu${fields.length !== 1 ? 's' : ''}`
                  : `Update ${fields.length} Menu${fields.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
