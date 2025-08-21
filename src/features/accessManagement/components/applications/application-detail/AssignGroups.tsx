import { zodResolver } from '@hookform/resolvers/zod';
import { Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { Group } from '../../../types/group.types';

const formSchema = z.object({
  groupIds: z.array(z.string()).min(1, 'Please select at least one group')
});

type FormValues = z.infer<typeof formSchema>;

interface AssignGroupsProps {
  onSubmit: (data: { groupIds: string[] }) => void;
  loading?: boolean;
  availableGroups: Group[];
  selectedGroups?: string[];
}

export function AssignGroups({ onSubmit, loading = false, availableGroups, selectedGroups = [] }: AssignGroupsProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupIds: selectedGroups
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({ groupIds: values.groupIds });
  };

  const handleGroupToggle = (groupId: string, checked: boolean) => {
    const currentGroups = form.getValues('groupIds');
    const updatedGroups = checked ? [...currentGroups, groupId] : currentGroups.filter((id) => id !== groupId);

    form.setValue('groupIds', updatedGroups);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-[#4A36EC]" />
        <h3 className="text-lg font-semibold text-gray-900">Assign Groups</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="groupIds"
            render={() => (
              <FormItem>
                <FormLabel className="text-gray-700">Select Groups</FormLabel>
                <FormControl>
                  <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-4">
                    {availableGroups.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No available groups to assign</div>
                    ) : (
                      availableGroups.map((group) => (
                        <div
                          key={group.group_id}
                          className={cn(
                            'flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors',
                            form.watch('groupIds').includes(group.group_id) && 'border-[#4A36EC] bg-[#4A36EC]/5'
                          )}
                        >
                          <Checkbox
                            id={group.group_id}
                            checked={form.watch('groupIds').includes(group.group_id)}
                            onCheckedChange={(checked) => handleGroupToggle(group.group_id, checked as boolean)}
                            disabled={loading}
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={group.group_id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {group.title}
                            </label>
                            <p className="text-xs text-gray-500 font-mono mt-1">{group.group_id}</p>
                            <span
                              className={cn(
                                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2',
                                group.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              )}
                            >
                              {group.status === 1 ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="submit"
              disabled={loading || form.watch('groupIds').length === 0}
              className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
            >
              {loading ? 'Assigning...' : `Assign ${form.watch('groupIds').length} Group${form.watch('groupIds').length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
