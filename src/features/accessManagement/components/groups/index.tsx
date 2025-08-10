import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { FolderTree, Menu, Plus, Shield, Users } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

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
        accessorKey: 'title'
      },
      {
        header: 'Description',
        accessorKey: 'description'
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
        cell: ({ row }) => <span>{format(row.original.date_added, 'yyyy/MM/dd HH:mm:ss a')}</span>
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => <Link to={`/access-management/groups/${row.original.group_id}`}>View</Link>
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
      // value: groups.length,
      value: 0,
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
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Management', '/access-management', 'Groups')} />

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
