import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, Plus, Shield, UserCircle, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';

import { useCreateRole } from '../../api/mutations/role.mutations';
import { useGetRoleList } from '../../api/queries/role.queries';
import { CreateUserRoleDto, UserRole } from '../../types';
import { RoleDialog } from './roleDialog';

export default function RolesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const { data, isError, isLoading } = useGetRoleList();

  useEffect(() => {
    if (data) {
      setRoles(data.data);
    }

    return () => {
      setRoles([]);
    };
  }, [data?.data]);

  const columns = useMemo((): ColumnDef<UserRole>[] => {
    return [
      {
        header: 'Role Name',
        accessorKey: 'name'
      }
    ];
  }, []);

  //
  const { mutate: createRole } = useCreateRole();
  const handleAddRoles = async (newRoles: CreateUserRoleDto[]) => {
    // Handle API call here
    console.log(newRoles);
    // setRoles([...roles, ...newRoles])
    setIsDialogOpen(false);
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
    // {
    //   title: 'Total Permissions',
    //   value: new Set(roles.flatMap((r) => r.permissions)).size,
    //   Icon: Shield,
    //   description: 'Assigned permissions',
    //   trend: '+3.4%',
    //   trendUp: true
    // },
    // {
    //   title: 'Assigned Users',
    //   value: new Set(roles.flatMap((r) => r.users)).size,
    //   Icon: Users,
    //   description: 'Users with roles',
    //   trend: '+1.8%',
    //   trendUp: true
    // },
    {
      title: 'Access Levels',
      value: 5,
      Icon: Lock,
      description: 'Security levels',
      trend: '+0.9%',
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
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/access-control" className="hover:text-[#4A36EC]">
          Access Control
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Roles</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Roles</h1>
          <p className="text-sm text-gray-600">Manage user roles and their permissions</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </motion.div>

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

      <RoleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddRoles} />
    </div>
  );
}
