import { motion } from 'framer-motion';
import { ChevronRight, FileCheck, Lock, Plus, Shield, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useCreatePermission } from '../../api/mutations/permission.mutations';
import { useGetPermissionList } from '../../api/queries/permission.queries';
import { Permission } from '../../types';
import { PermissionDialog } from './permissionDialog';
import { PermissionTable } from './permissionTable';

export default function PermissionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const { data, isError, isLoading } = useGetPermissionList();

  useEffect(() => {
    if (data) {
      setPermissions(data.data);
    }

    return () => {
      setPermissions([]);
    };
  }, [data?.data]);

  const { mutate: createPermission } = useCreatePermission();
  const handleAddPermissions = async (newPermissions: Permission[]) => {
    // Handle API call here
    console.log(newPermissions);
    setPermissions([...permissions, ...newPermissions]);
    setIsDialogOpen(false);
  };

  const stats = [
    {
      title: 'Total Permissions',
      value: permissions.length,
      icon: Shield,
      description: 'Active permissions in system',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'User Groups',
      value: '8',
      icon: Users,
      description: 'Groups with permissions',
      trend: '+1.2%',
      trendUp: true
    },
    {
      title: 'Access Levels',
      value: new Set(permissions.map((p) => p.module)).size,
      icon: Lock,
      description: 'Different access levels',
      trend: '+3.4%',
      trendUp: true
    },
    {
      title: 'Modules',
      value: '12',
      icon: FileCheck,
      description: 'Protected modules',
      trend: '+1.8%',
      trendUp: true
    }
  ];

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <PageLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading permissions</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/access-control" className="hover:text-[#4A36EC]">
          Access Control
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Permissions</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Permissions</h1>
          <p className="text-sm text-gray-600">Manage system permissions and access controls</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Permission
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <PermissionTable permissions={permissions} />
      </motion.div>

      <PermissionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddPermissions} />
    </div>
  );
}
