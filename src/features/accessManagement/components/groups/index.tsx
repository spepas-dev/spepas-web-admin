import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { FolderTree, Menu, Plus, Shield, Users } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';

import { useCreateGroup } from '../../api/mutations/group.mutations';
import { useGetGroupList } from '../../api/queries/group.queries';
import { CreateGroupDto, Group } from '../../types/group.types';
import { NewGroup } from './newGroup';

export default function GroupsPage() {
  const addGroupModal = useFormModal();
  const { data, isLoading } = useGetGroupList();

  const groups = useMemo(() => data?.data || [], [data?.data]);

  const columns = useMemo((): ColumnDef<Group>[] => {
    return [
      {
        header: 'Group Name',
        accessorKey: 'name'
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({ row }) => <span className="text-gray-600">{row.original.description || 'No description'}</span>
      },
      {
        header: 'Users',
        accessorKey: 'users',
        cell: ({ row }) => <span className="text-gray-600">{row.original.users.length} users</span>
      },
      {
        header: 'Permissions',
        accessorKey: 'permissions',
        cell: ({ row }) => <span className="text-gray-600">{row.original.permissions.length} permissions</span>
      },
      {
        header: 'Status',
        accessorKey: 'isActive',
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-xs ${row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {row.original.isActive ? 'Active' : 'Inactive'}
          </span>
        )
      }
    ];
  }, []);

  const createGroupMutation = useCreateGroup();

  const handleSubmitGroup = async (groupData: CreateGroupDto) => {
    try {
      await createGroupMutation.mutateAsync(groupData);
      toast.success('Group created successfully');
      addGroupModal.close();
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Failed to create group. Please try again.');
    }
  };

  const handleAddGroup = () => {
    addGroupModal.openForm({
      title: 'Create New Group',
      size: 'md',
      showFooter: false,
      children: <NewGroup onSubmit={handleSubmitGroup} />
    });
  };

  const stats = [
    {
      title: 'Total Groups',
      value: groups.length,
      Icon: Users,
      description: 'Active groups',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Menu Access',
      // value: new Set(groups.flatMap((g) => [...g.menuGroups.map((mg) => mg.id), ...g.menuItems.map((mi) => mi.id)])).size,
      value: 0,
      Icon: Menu,
      description: 'Assigned menus',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Permissions',
      // value: new Set(groups.flatMap((g) => g.permissions.map((p) => p.id))).size,
      value: 0,
      Icon: Shield,
      description: 'Total permissions',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Menu Groups',
      // value: new Set(groups.flatMap((g) => g.menuGroups.map((mg) => mg.id))).size,
      value: 0,
      Icon: FolderTree,
      description: 'Assigned groups',
      trend: '+1.5%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Control', '/access-control', 'Groups')} />

      {/* Header */}
      <PageHeader
        title="Groups"
        description="Manage user groups and their access rights"
        actions={
          <Button onClick={handleAddGroup} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Group
          </Button>
        }
      />

      {/* Stats */}
      <CardGrid cards={stats} />

      {/* Group Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <DataTable
          data={groups}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
