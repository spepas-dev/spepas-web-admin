import { motion } from 'framer-motion';
import { Bell, Download, Monitor, Palette, Save, Shield, User } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Appearance from './appearance';
import Display from './display';
import Notification from './notification';
import Profile from './profile';
import Security from './security';

const Settings = () => {
  const handleExportSettings = () => {
    const settings = {
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
      notifications: {
        email: true,
        push: true,
        sms: false,
        marketing: false,
        security: true,
        updates: true
      },
      display: {
        compactMode: false,
        showAnimations: true,
        autoSave: true,
        soundEnabled: true,
        highContrast: false,
        reduceMotion: false
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginNotifications: true,
        deviceManagement: true
      }
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Settings exported successfully');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Settings', '/settings', 'Preferences')} />

      {/* Header */}
      <PageHeader
        title="Settings"
        description="Manage your account preferences, security, and application settings"
        // actions={
        //   <div className="flex gap-2">
        //     <Button variant="outline" className="gap-2" onClick={handleExportSettings}>
        //       <Download className="w-4 h-4" />
        //       Export Settings
        //     </Button>
        //     <Button className="gap-2 bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
        //       <Save className="w-4 h-4" />
        //       Save All Changes
        //     </Button>
        //   </div>
        // }
      />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            {/* <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Display
            </TabsTrigger> */}
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Profile itemVariants={itemVariants} />
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Security itemVariants={itemVariants} />
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Appearance itemVariants={itemVariants} />
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Notification itemVariants={itemVariants} />
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Display itemVariants={itemVariants} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;
