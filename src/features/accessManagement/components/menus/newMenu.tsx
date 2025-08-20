import { zodResolver } from '@hookform/resolvers/zod';
import { Menu } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useGetApplications } from '@/features/accessManagement/api/queries/applications.queries';

import { CreateMenuItemDto } from '../../types/menu.types';

const menuSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  menus: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      isActive: z.boolean().default(true)
    })
  ),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});

type FormValues = z.infer<typeof menuSchema>;

interface NewMenuProps {
  onSubmit: (menu: CreateMenuItemDto) => void;
  loading?: boolean;
  existingGroups?: Array<{ id: string; title: string }>;
}

export function NewMenu({ onSubmit, loading = false, existingGroups = [] }: NewMenuProps) {
  const { data: applications } = useGetApplications();

  useEffect(() => {
    console.log(applications);
  }, [applications]);

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

  const handleSubmit = (values: FormValues) => {
    const menuData: CreateMenuItemDto = {
      application_id: values.applicationId,
      description: values.description,
      is_active: values.isActive
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
                name="applicationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Menu Name</FormLabel>
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
