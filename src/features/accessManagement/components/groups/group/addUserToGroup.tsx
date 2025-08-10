import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGetUserList } from '@/features/userManagement/api/queries/users.queries';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  userIds: z.array(z.string()).min(1, 'Please select at least one user')
});

type FormValues = z.infer<typeof formSchema>;

interface AddUserToGroupProps {
  onSubmit: (data: { userIds: string[] }) => void;
  loading?: boolean;
  groupId: string;
}

export function AddUserToGroup({ onSubmit, loading = false, groupId }: AddUserToGroupProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userIds: []
    }
  });

  const { data: users, isLoading } = useGetUserList();

  const availableUsers = useMemo(() => {
    return (
      users?.data?.map((user) => ({
        id: user.User_ID,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.user_type
      })) || []
    );
  }, [users?.data]);

  const selectedUserIds = form.watch('userIds');

  const handleSubmit = (values: FormValues) => {
    onSubmit({ userIds: values.userIds });
    form.reset();
  };

  const toggleUser = (userId: string) => {
    const currentUsers = form.getValues('userIds');
    const isSelected = currentUsers.includes(userId);

    if (isSelected) {
      form.setValue(
        'userIds',
        currentUsers.filter((id) => id !== userId)
      );
    } else {
      form.setValue('userIds', [...currentUsers, userId]);
    }
  };

  const selectedUsers = availableUsers.filter((user) => selectedUserIds.includes(user.id));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="userIds"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-700">Select Users</FormLabel>
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
                        {selectedUsers.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {selectedUsers.slice(0, 2).map((user) => (
                              <span key={user.id} className="bg-[#4A36EC] text-white px-2 py-1 rounded text-xs">
                                {user.name}
                              </span>
                            ))}
                            {selectedUsers.length > 2 && (
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">+{selectedUsers.length - 2} more</span>
                            )}
                          </div>
                        ) : (
                          'Select users...'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search users..." />
                      <CommandList>
                        <CommandEmpty>No users found.</CommandEmpty>
                        <CommandGroup>
                          {availableUsers.map((user) => {
                            const isSelected = selectedUserIds.includes(user.id);
                            return (
                              <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => toggleUser(user.id)}
                                className="flex items-center gap-3 p-3"
                              >
                                <div className="w-8 h-8 bg-gradient-to-br from-[#4A36EC] to-[#5B4AEE] rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                  {/* <p className="text-xs text-gray-400">{user.role}</p> */}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
                                      user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    )}
                                  >
                                    {user.status}
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

          {/* Selected Users Preview */}
          {selectedUsers.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Users ({selectedUsers.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4A36EC] to-[#5B4AEE] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      onClick={() => toggleUser(user.id)}
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
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading || selectedUsers.length === 0}>
            {loading ? 'Adding...' : `Add ${selectedUsers.length} User${selectedUsers.length !== 1 ? 's' : ''}`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddUserToGroup;
