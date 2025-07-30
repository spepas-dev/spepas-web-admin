import { zodResolver } from '@hookform/resolvers/zod';
import { Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';

import { useGetPermissionList } from '../../api/queries/permission.queries';
import { CreateUserRoleDto } from '../../types';

const roleSchema = z.object({
  role_name: z.string().min(1, 'Role name is required'),
  description: z.string().min(1, 'Description is required'),
  permissions: z.array(z.string()).min(1, 'At least one permission is required')
});

type FormValues = z.infer<typeof roleSchema>;

interface NewRoleProps {
  onSubmit: (role: CreateUserRoleDto) => void;
  loading?: boolean;
}

export function NewRole({ onSubmit, loading = false }: NewRoleProps) {
  const { data: permissions } = useGetPermissionList();

  const availablePermissions = permissions?.data.map((permission) => ({
    value: permission.permissionID,
    label: permission.title
  }));

  const form = useForm<FormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role_name: '',
      description: '',
      permissions: []
    }
  });

  const handleSubmit = (values: FormValues) => {
    const roleData = {
      role_name: values.role_name,
      rolePermissions: values.permissions.map((permissionId) => ({ permissionID: permissionId }))
    };

    onSubmit(roleData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-[#4A36EC]" />
        <h3 className="text-lg font-semibold text-gray-900">Role Information</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1  gap-4">
            <FormField
              control={form.control}
              name="role_name"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description *</FormLabel>
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

          <FormField
            control={form.control}
            name="permissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Permissions *</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={availablePermissions || []}
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

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
              <Shield className="h-4 w-4 mr-2" />
              {loading ? 'Creating...' : 'Create Role'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NewRole;
