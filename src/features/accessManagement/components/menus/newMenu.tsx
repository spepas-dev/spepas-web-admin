import { zodResolver } from '@hookform/resolvers/zod';
import { Menu } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { CreateMenuItemDto } from '../../types/menu.types';
import { IconPicker } from './iconPicker';

const menuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  path: z.string().min(1, 'Path is required'),
  permissions: z.string().optional(),
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().default(true)
});

type FormValues = z.infer<typeof menuSchema>;

interface NewMenuProps {
  onSubmit: (menu: CreateMenuItemDto) => void;
  loading?: boolean;
  existingGroups?: Array<{ id: string; title: string }>;
}

export function NewMenu({ onSubmit, loading = false, existingGroups = [] }: NewMenuProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      path: '',
      permissions: '',
      parentId: null,
      isActive: true
    }
  });

  const handleSubmit = (values: FormValues) => {
    const menuData: CreateMenuItemDto = {
      name: values.name,
      description: values.description,
      icon: values.icon,
      path: values.path,
      permissions: values.permissions,
      parentId: values.parentId,
      isActive: values.isActive
    };
    onSubmit(menuData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Menu Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter menu name"
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
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Path</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter menu path (e.g., /dashboard)"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter menu description"
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
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Icon</FormLabel>
                    <FormControl>
                      <IconPicker value={field.value} onChange={field.onChange} disabled={loading} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Parent Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Select parent group (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {existingGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.title}
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
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Permissions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., admin:read, user:write"
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
                name="isActive"
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
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Menu Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewMenu;
