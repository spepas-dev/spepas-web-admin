import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  otp: z.string().min(6, 'OTP must be at least 6 characters'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
});

export type ResetPasswordFormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormValues) => void;
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      newPassword: ''
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">OTP Code</FormLabel>
                <FormDescription className="text-muted-foreground">Enter the verification code sent to your email</FormDescription>
                <FormControl>
                  <Input placeholder="Enter OTP code" className="bg-input text-foreground placeholder:text-muted-foreground" {...field} />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">New Password</FormLabel>
                <FormDescription className="text-muted-foreground">Create a strong password with at least 8 characters</FormDescription>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="bg-input text-foreground placeholder:text-muted-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground">
              Reset Password
            </Button>
            <Button type="button" variant="outline" className="w-full hover:bg-muted" onClick={() => window.history.back()}>
              Back to Login
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
