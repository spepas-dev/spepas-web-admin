import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Application } from '../../../types/application.types';

const formSchema = z.object({
  applicationIds: z.array(z.string()).min(1, 'Please select at least one application')
});

type FormValues = z.infer<typeof formSchema>;

interface AddApplicationToGroupProps {
  onSubmit: (data: { applicationIds: string[] }) => void;
  loading?: boolean;
  groupId: string;
}

// Mock applications data - replace with actual API call
const availableApplications: Application[] = [
  {
    id: 3,
    application_id: 'app-3',
    name: 'Order Management System',
    description: 'Manage orders and customer requests',
    dateAdded: '2024-01-05T12:00:00Z',
    added_by: 'System',
    status: 1
  },
  {
    id: 4,
    application_id: 'app-4',
    name: 'Payment Gateway',
    description: 'Process payments and transactions',
    dateAdded: '2024-01-08T16:30:00Z',
    added_by: 'System',
    status: 1
  },
  {
    id: 5,
    application_id: 'app-5',
    name: 'Analytics Dashboard',
    description: 'View analytics and reports',
    dateAdded: '2024-01-12T09:15:00Z',
    added_by: 'System',
    status: 1
  },
  {
    id: 6,
    application_id: 'app-6',
    name: 'Customer Support',
    description: 'Handle customer support tickets',
    dateAdded: '2024-01-14T11:45:00Z',
    added_by: 'System',
    status: 0
  }
];

export function AddApplicationToGroup({ onSubmit, loading = false, groupId }: AddApplicationToGroupProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationIds: []
    }
  });

  const selectedApplicationIds = form.watch('applicationIds');

  const handleSubmit = (values: FormValues) => {
    onSubmit({ applicationIds: values.applicationIds });
    form.reset();
  };

  const toggleApplication = (applicationId: string) => {
    const currentApplications = form.getValues('applicationIds');
    const isSelected = currentApplications.includes(applicationId);

    if (isSelected) {
      form.setValue(
        'applicationIds',
        currentApplications.filter((id) => id !== applicationId)
      );
    } else {
      form.setValue('applicationIds', [...currentApplications, applicationId]);
    }
  };

  const selectedApplications = availableApplications.filter((app) => selectedApplicationIds.includes(app.application_id));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="applicationIds"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-700">Select Applications</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                        disabled={loading}
                      >
                        {selectedApplications.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {selectedApplications.slice(0, 2).map((app) => (
                              <span key={app.application_id} className="bg-[#4A36EC] text-white px-2 py-1 rounded text-xs">
                                {app.name}
                              </span>
                            ))}
                            {selectedApplications.length > 2 && (
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                +{selectedApplications.length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          'Select applications...'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search applications..." />
                      <CommandList>
                        <CommandEmpty>No applications found.</CommandEmpty>
                        <CommandGroup>
                          {availableApplications.map((app) => {
                            const isSelected = selectedApplicationIds.includes(app.application_id);
                            const isActive = app.status === 1;
                            return (
                              <CommandItem
                                key={app.application_id}
                                value={app.name}
                                onSelect={() => toggleApplication(app.application_id)}
                                className="flex items-center gap-3 p-3"
                              >
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                                  <Building2 className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{app.name}</p>
                                  <p className="text-xs text-gray-500">{app.description}</p>
                                  <p className="text-xs text-gray-400">{app.application_id}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
                                      isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    )}
                                  >
                                    {isActive ? 'Active' : 'Inactive'}
                                  </span>
                                  <Check className={cn('h-4 w-4', isSelected ? 'opacity-100 text-[#4A36EC]' : 'opacity-0')} />
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Selected Applications Preview */}
          {selectedApplications.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Applications ({selectedApplications.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedApplications.map((app) => (
                  <div key={app.application_id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-gray-500">{app.application_id}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      onClick={() => toggleApplication(app.application_id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
            disabled={loading || selectedApplications.length === 0}
          >
            {loading ? 'Adding...' : `Add ${selectedApplications.length} Application${selectedApplications.length !== 1 ? 's' : ''}`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddApplicationToGroup;
