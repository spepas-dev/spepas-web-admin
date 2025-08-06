import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Lock, Plus, Shield, UserCircle } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import PageLoader from '@/components/loaders/pageLoader';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreateRole } from '../../api/mutations/role.mutations';
import { useGetRoleList } from '../../api/queries/role.queries';
import { CreateUserRoleDto, UserRole } from '../../types';
import { NewRole } from './newRole';

export default function RolesPage() {
  const createRoleMutation = useCreateRole();
  const addRoleModal = useFormModal();
  const { data, isError, isLoading } = useGetRoleList();

  const roles = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);
  const columns = useMemo((): ColumnDef<UserRole>[] => {
    return [
      {
        header: 'Role Name',
        accessorKey: 'role_name'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },
      {
        header: 'Permissions',
        accessorKey: 'rolePermissions',
        cell: ({ row }) => {
          const permissions = row.original.permissions;
          return (
            <div className="flex flex-wrap gap-2">
              {permissions.map((permission) => (
                <Badge key={permission.permissionID}>{permission.title}</Badge>
              ))}
            </div>
          );
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
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
        cell: ({ row }) => {
          return <span>{format(row.original.date_added, 'dd/MM/yyyy HH:mm:ss a')}</span>;
        }
      }
    ];
  }, []);

  const handleSubmitRole = async (roleData: CreateUserRoleDto) => {
    try {
      const { description, ...rest } = roleData;
      await createRoleMutation.mutateAsync(rest);
      toast.success('Role created successfully');
      addRoleModal.close();
    } catch (error) {
      console.error('Error creating role:', error);
      toast.error('Failed to create role. Please try again.');
    }
  };

  const handleAddRole = () => {
    addRoleModal.openForm({
      title: 'Create New Role',
      size: 'lg',
      showFooter: false,
      children: <NewRole onSubmit={handleSubmitRole} />
    });
  };

  const stats = [
    {
      title: 'Total Roles',
      value: roles.length,
      Icon: UserCircle,
      description: 'Active roles in system',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Access Levels',
      value: 5,
      Icon: Lock,
      description: 'Security levels',
      trend: '+0.9%',
      trendUp: true
    },
    {
      title: 'Permissions',
      value: 12,
      Icon: Shield,
      description: 'Total permissions',
      trend: '+1.5%',
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
    return <div>Error loading roles</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Control', '/access-control', 'Roles')} />

      {/* Header */}
      <PageHeader
        title="Roles"
        description="Manage user roles and their permissions"
        actions={
          <Button onClick={handleAddRole} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={roles}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
