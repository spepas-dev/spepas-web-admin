import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { User } from '.';
const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),
  user_type: z.enum(['BUYER', 'SELLER', 'ADMIN'], {
    required_error: 'Please select a user type'
  })
});

const formSchema = z.object({
  users: z.array(userSchema).min(1, 'Add at least one user')
});

type FormValues = z.infer<typeof formSchema>;

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (users: User[]) => void;
}

export function UserDialog({ open, onOpenChange, onSubmit }: UserDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [{ email: '', password: '', name: '', phoneNumber: '', user_type: 'BUYER' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.users);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Users</DialogTitle>
          <DialogDescription className="text-gray-600">Create new users in the system</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`users.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter name"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`users.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter email"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`users.${index}.phoneNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInput
                              placeholder="Enter phone number"
                              defaultCountry="GH"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`users.${index}.user_type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">User Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                                <SelectValue placeholder="Select user type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="BUYER">Buyer</SelectItem>
                              <SelectItem value="SELLER">Seller</SelectItem>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`users.${index}.password`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button type="button" variant="outline" size="icon" className="mt-8 hover:bg-gray-100" onClick={() => remove(index)}>
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="hover:bg-gray-100"
                onClick={() => append({ email: '', password: '', name: '', phoneNumber: '', user_type: 'BUYER' })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Save Users
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
