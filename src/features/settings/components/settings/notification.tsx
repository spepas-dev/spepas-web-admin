import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface NotificationProps {
  itemVariants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: string } };
  };
}

const Notification = ({ itemVariants }: NotificationProps) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    security: true,
    updates: true
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${notifications[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#4A36EC]" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-medium">{key.charAt(0).toUpperCase() + key.slice(1)} Notifications</Label>
                    {key === 'security' && (
                      <Badge variant="destructive" className="text-xs">
                        Important
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {key === 'email' && 'Receive email notifications for important updates'}
                    {key === 'push' && 'Get push notifications on your device'}
                    {key === 'sms' && 'Receive SMS notifications for critical alerts'}
                    {key === 'marketing' && 'Receive promotional and marketing communications'}
                    {key === 'security' && 'Get notified about security events and login attempts'}
                    {key === 'updates' && 'Receive notifications about app updates and new features'}
                  </p>
                </div>
                <Switch checked={value} onCheckedChange={() => handleNotificationToggle(key as keyof typeof notifications)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Notification;
