import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';

import { Group, MenuGroup, MenuItem, Permission, User } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  users: z.array(z.string()).min(1, 'Select at least one user'),
  menuGroups: z.array(z.string()),
  menuItems: z.array(z.string()),
  permissions: z.array(z.string())
});

interface NewGroupProps {
  onSubmit: (group: Group) => void;
  loading?: boolean;
}

// Mock data - replace with actual data from your API
const mockData = {
  users: [
    { value: 'user1', label: 'John Doe' },
    { value: 'user2', label: 'Jane Smith' },
    { value: 'user3', label: 'Bob Johnson' }
  ],
  menuGroups: [
    { value: 'group1', label: 'Dashboard' },
    { value: 'group2', label: 'Users' },
    { value: 'group3', label: 'Settings' }
  ],
  menuItems: [
    { value: 'item1', label: 'View Users' },
    { value: 'item2', label: 'Edit Profile' },
    { value: 'item3', label: 'System Settings' }
  ],
  permissions: [
    { value: 'perm1', label: 'Create Users' },
    { value: 'perm2', label: 'Delete Users' },
    { value: 'perm3', label: 'View Reports' }
  ]
};

export function NewGroup({ onSubmit, loading = false }: NewGroupProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      users: [],
      menuGroups: [],
      menuItems: [],
      permissions: []
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: false,
      users: values.users.map((userId) => ({ id: userId })) as User[],
      menuGroups: values.menuGroups.map((menuGroupId) => ({ id: menuGroupId })) as MenuGroup[],
      menuItems: values.menuItems.map((menuItemId) => ({ id: menuItemId })) as MenuItem[],
      permissions: values.permissions.map((permissionId) => ({ id: permissionId })) as unknown as Permission[]
    };
    onSubmit(newGroup);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter group name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter group description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Users</FormLabel>
              <FormControl>
                <MultiSelect options={mockData.users} value={field.value} onValueChange={field.onChange} placeholder="Select users" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="menuGroups"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Groups</FormLabel>
              <FormControl>
                <MultiSelect
                  options={mockData.menuGroups}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select menu groups"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="menuItems"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Items</FormLabel>
              <FormControl>
                <MultiSelect
                  options={mockData.menuItems}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select menu items"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <FormControl>
                <MultiSelect
                  options={mockData.permissions}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select permissions"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-[#4A36EC] text-white" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Create Group'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
