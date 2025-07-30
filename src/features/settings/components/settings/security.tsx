import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { useChangePassword } from '../../api/mutations/change-password.mutation';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface SecurityProps {
  itemVariants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: string } };
  };
}

const Security = ({ itemVariants }: SecurityProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true,
    deviceManagement: true
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const { mutateAsync: changePasswordAsync } = useChangePassword();
  const handlePasswordChange = async () => {
    try {
      const result = await changePasswordAsync({
        oldPassword: passwordForm.getValues().currentPassword,
        newPassword: passwordForm.getValues().newPassword
      });
      console.log(result);
      toast.success('Password changed successfully');
      passwordForm.reset();
    } catch {
      toast.error('Failed to change password. Please try again.');
    }
  };

  const handleSecurityToggle = (key: keyof typeof security) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${security[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#4A36EC]" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security and authentication preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {Object.entries(security).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {key === 'twoFactorAuth' && 'Enable two-factor authentication for enhanced security'}
                    {key === 'loginNotifications' && 'Receive notifications for new login attempts'}
                    {key === 'deviceManagement' && 'Manage and monitor your active devices'}
                    {key === 'sessionTimeout' && 'Set session timeout duration in minutes'}
                  </p>
                </div>
                {key === 'sessionTimeout' ? (
                  <Select
                    value={value.toString()}
                    onValueChange={(val) => setSecurity((prev) => ({ ...prev, sessionTimeout: parseInt(val) }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Switch checked={value as boolean} onCheckedChange={() => handleSecurityToggle(key as keyof typeof security)} />
                )}
              </div>
            ))}
          </div>

          <Separator />

          <div>
            <Label className="text-base font-medium">Change Password</Label>
            <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure</p>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showNewPassword ? 'text' : 'password'}
                              placeholder="Enter new password"
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm new password"
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                  Update Password
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Security;
