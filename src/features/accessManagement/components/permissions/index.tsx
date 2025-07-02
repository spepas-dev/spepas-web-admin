import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, FileCheck, Lock, Plus, Shield, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreatePermission } from '../../api/mutations/permission.mutations';
import { useGetPermissionList } from '../../api/queries/permission.queries';
import { Permission } from '../../types';
import { PermissionDialog } from './permissionDialog';

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

  const columns = useMemo((): ColumnDef<Permission>[] => {
    return [
      {
        header: 'Permission Name',
        accessorKey: 'title'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }: { row: { original: Permission } }) => {
          return (
            <span
              className={cn(
                row.original.status === 1 ? 'text-green-900 bg-green-100' : 'text-red-900 bg-red-100',
                'text-sm px-2 py-1 rounded-md'
              )}
            >
              {row.original.status === 1 ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Created On',
        accessorKey: 'date_added',
        cell: ({ row }: { row: { original: Permission } }) => {
          return <span>{format(new Date(row.original.date_added), 'dd/MM/yyyy')}</span>;
        }
      }
    ];
  }, []);

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
      Icon: Shield,
      description: 'Active permissions in system',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'User Groups',
      value: 8,
      Icon: Users,
      description: 'Groups with permissions',
      trend: '+1.2%',
      trendUp: true
    },
    {
      title: 'Access Levels',
      value: new Set(permissions.map((p) => p.permissionID)).size,
      Icon: Lock,
      description: 'Different access levels',
      trend: '+3.4%',
      trendUp: true
    },
    {
      title: 'Modules',
      value: 12,
      Icon: FileCheck,
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
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={permissions}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>

      <PermissionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddPermissions} />
    </div>
  );
}
