import { zodResolver } from '@hookform/resolvers/zod';
import { Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Application, CreateApplicationDto, UpdateApplicationDto } from '../../types/application.types';

const formSchema = z.object({
  name: z.string().min(1, 'Application name is required'),
  description: z.string().min(1, 'Description is required')
});

type FormValues = z.infer<typeof formSchema>;

interface NewApplicationProps {
  onSubmit: (application: CreateApplicationDto | UpdateApplicationDto) => void;
  loading?: boolean;
  mode?: 'create' | 'update';
  initialData?: Application;
}

export function NewApplication({ onSubmit, loading = false, mode = 'create', initialData }: NewApplicationProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || ''
    }
  });

  const handleSubmit = (values: FormValues) => {
    if (mode === 'create') {
      const applicationData: CreateApplicationDto = {
        name: values.name,
        description: values.description
      };
      onSubmit(applicationData);
    } else {
      const applicationData: UpdateApplicationDto = {
        name: values.name,
        description: values.description
      };
      onSubmit(applicationData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-[#4A36EC]" />
        <h3 className="text-lg font-semibold text-gray-900">{mode === 'create' ? 'Application Information' : 'Update Application'}</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Application Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter application name"
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
                      placeholder="Enter application description"
                      className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                      disabled={loading}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
              <Settings className="h-4 w-4 mr-2" />
              {loading
                ? mode === 'create'
                  ? 'Creating...'
                  : 'Updating...'
                : mode === 'create'
                  ? 'Create Application'
                  : 'Update Application'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NewApplication;
