import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form';
import { FormLabel } from '@/components/ui/form';
import { FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';

import { useGetApplications } from '../../api/queries/applications.queries';
import { CreateGroupDto } from '../../types/group.types';

const formSchema = z.object({
  title: z.string().min(1, 'Group name is required'),
  group_applications: z.array(z.string()).min(1, 'Select at least one application')
});

interface NewGroupProps {
  onSubmit: (group: CreateGroupDto) => void;
  loading?: boolean;
}

export function NewGroup({ onSubmit, loading = false }: NewGroupProps) {
  const { data: applications } = useGetApplications();

  const applicationsData = useMemo(
    () =>
      applications?.data.map((application) => ({
        label: application.name,
        value: application.application_id
      })) || [],
    [applications?.data]
  );

  console.log('applicationsData', applicationsData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      group_applications: []
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      title: values.title,
      group_applications: values.group_applications.map((application) => ({
        application_id: application
      }))
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
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
          name="group_applications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applications</FormLabel>
              <FormControl>
                <MultiSelect
                  options={applicationsData}
                  onValueChange={field.onChange}
                  value={field.value}
                  placeholder="Select applications"
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
