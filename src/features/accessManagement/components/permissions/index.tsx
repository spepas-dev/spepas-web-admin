import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { FileCheck, Lock, Plus, Shield, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreatePermission } from '../../api/mutations/permission.mutations';
import { useGetPermissionList } from '../../api/queries/permission.queries';
import { Permission } from '../../types';
import { NewPermission } from './newPermission';

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const createPermissionMutation = useCreatePermission();
  const addPermissionModal = useFormModal();
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
          const isActive = row.original.status === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isActive ? 'bg-green-400' : 'bg-red-400')} />
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Created On',
        accessorKey: 'date_added',
        cell: ({ row }: { row: { original: Permission } }) => {
          return <span className="text-gray-600">{format(new Date(row.original.date_added), 'dd/MM/yyyy')}</span>;
        }
      }
    ];
  }, []);

  const handleSubmitPermission = async (permissionData: Permission[]) => {
    try {
      // Handle multiple permissions creation

      await createPermissionMutation.mutateAsync(permissionData);

      toast.success('Permission(s) created successfully');
      // Refresh data instead of manual state update
      // The API response should provide the complete permission data
      addPermissionModal.close();
    } catch (error) {
      console.error('Error creating permission:', error);
      toast.error('Failed to create permission. Please try again.');
    }
  };

  const handleAddPermission = () => {
    addPermissionModal.openForm({
      title: 'Create New Permission',
      size: 'md',
      showFooter: false,
      children: <NewPermission onSubmit={handleSubmitPermission} />
    });
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
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Control', '/access-control', 'Permissions')} />

      {/* Header */}
      <PageHeader
        title="Permissions"
        description="Manage system permissions and access controls"
        actions={
          <Button onClick={handleAddPermission} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Permission
          </Button>
        }
      />

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
    </div>
  );
}
