import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Plus, ShieldAlert, UserCheck, UserPlus, Users } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { cn } from '@/lib/utils';

import { useCreateUser } from '../../api/mutations/users.mutations';
import { useGetUserList } from '../../api/queries/users.queries';
import { CreateUserDTO, User } from '../../types/users.types';
import { NewUsers } from './newUsers';

export default function UsersPage() {
  const { data, isLoading } = useGetUserList();
  const users = useMemo(() => data?.data || [], [data?.data]);

  const formModal = useFormModal();
  const { mutateAsync: createUserAsync } = useCreateUser();

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }: { row: Row<User> }) => <div>{row.original.name}</div>
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }: { row: Row<User> }) => <div>{row.original.email}</div>
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        cell: ({ row }: { row: Row<User> }) => <div>{row.original.phoneNumber}</div>
      },
      {
        header: 'User Type',
        accessorKey: 'user_type',
        cell: ({ row }: { row: Row<User> }) => <div>{row.original.user_type}</div>
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
      }
    ],
    []
  );

  const handleAddUser = () => {
    formModal.openForm({
      title: 'Add New User',
      children: <NewUsers onSubmit={handleSubmitUser} loading={false} />,
      onSubmit: () => {
        // This will be handled by the NewUsers component
      }
    });
  };

  const handleSubmitUser = async (userData: CreateUserDTO) => {
    try {
      await createUserAsync(userData);
      toast.success('User created successfully');
      formModal.close();
    } catch {
      toast.error('Failed to create user');
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      Icon: Users,
      description: 'Active users in system',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'New Users',
      value: 24,
      Icon: UserPlus,
      description: 'Users added this month',
      trend: '+2.4%',
      trendUp: true
    },
    {
      title: 'Verified Users',
      value: users.filter((u) => u.user_type !== 'BUYER').length,
      Icon: UserCheck,
      description: 'Verified account status',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Admin Users',
      value: users.filter((u) => u.user_type === 'ADMIN').length,
      Icon: ShieldAlert,
      description: 'Users with admin access',
      trend: '+0.5%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Users')} />

      {/* Header */}
      <PageHeader
        title="Users"
        description="Manage system users and their access levels"
        actions={
          <Button onClick={handleAddUser} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={users}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
