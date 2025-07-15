import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Shield, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';

import { CreateUserRoleDto } from '../../types';

const roleSchema = z.object({
  role_name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  users: z.array(z.string()).optional()
});

const formSchema = z.object({
  roles: z.array(roleSchema).min(1, 'At least one role is required')
});

type FormValues = z.infer<typeof formSchema>;

interface NewRoleProps {
  onSubmit: (roles: CreateUserRoleDto[]) => void;
  loading?: boolean;
}

// Mock data for permissions and users
const availablePermissions = [
  { value: 'view_dashboard', label: 'View Dashboard' },
  { value: 'manage_users', label: 'Manage Users' },
  { value: 'manage_inventory', label: 'Manage Inventory' },
  { value: 'generate_reports', label: 'Generate Reports' },
  { value: 'access_settings', label: 'Access Settings' },
  { value: 'approve_orders', label: 'Approve Orders' },
  { value: 'manage_payments', label: 'Manage Payments' },
  { value: 'view_analytics', label: 'View Analytics' }
];

const availableUsers = [
  { value: 'user1', label: 'John Doe' },
  { value: 'user2', label: 'Jane Smith' },
  { value: 'user3', label: 'Bob Johnson' },
  { value: 'user4', label: 'Alice Wilson' },
  { value: 'user5', label: 'Charlie Brown' }
];

export function NewRole({ onSubmit, loading = false }: NewRoleProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: [{ role_name: '', description: '', permissions: [], users: [] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'roles'
  });

  const handleSubmit = (values: FormValues) => {
    const rolesData = values.roles.map((role) => ({
      role_name: role.role_name,
      rolePermissions: role.permissions?.map((permissionId) => ({ permissionID: permissionId })) || []
    }));

    onSubmit(rolesData);
  };

  const addRole = () => {
    append({ role_name: '', description: '', permissions: [], users: [] });
  };

  const removeRole = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#4A36EC]" />
          <h3 className="text-lg font-semibold text-gray-900">Role Information</h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRole}
          disabled={loading}
          className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#4A36EC]" />
                  <h4 className="font-medium text-gray-900">Role {index + 1}</h4>
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRole(index)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`roles.${index}.role_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Role Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter role name"
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
                  name={`roles.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter role description"
                          className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                          disabled={loading}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`roles.${index}.permissions`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Permissions</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={availablePermissions}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select permissions"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`roles.${index}.users`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Assign Users</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={availableUsers}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select users"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
              <Shield className="h-4 w-4 mr-2" />
              {loading ? 'Creating...' : 'Create Role(s)'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
