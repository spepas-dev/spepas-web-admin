import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { ChevronRight, FolderTree, Menu, Plus, Shield, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';

import { useGetGroupList } from '../../api/queries/group.queries';
import { GroupDialog } from './groupDialog';
// import { MenuItem, MenuGroup } from "../menus"
// import { Permission } from "../permissions"
// import { GroupListItem } from "../../types"

export interface Group {
  id: string;
  name: string;
  description: string;
  users: string[];
  menuGroups: string[]; // MenuGroup IDs
  menuItems: string[]; // MenuItem IDs
  permissions: string[]; // Permission IDs
  createdAt: string;
  updatedAt: string;
}

export default function GroupsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const { data, isError, isLoading } = useGetGroupList();

  useEffect(() => {
    if (data) {
      console.log(data.data);
      // setGroups(data?.data);
    }
  }, [data]);

  const columns = useMemo((): ColumnDef<Group>[] => {
    return [
      {
        header: 'Group Name',
        accessorKey: 'name'
      }
    ];
  }, []);

  const handleAddGroup = async (newGroup: Group) => {
    try {
      // Handle API call here
      setGroups([...groups, newGroup]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to add group:', error);
    }
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
      value: new Set(groups.flatMap((g) => [...g.menuGroups, ...g.menuItems])).size,
      Icon: Menu,
      description: 'Assigned menus',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Permissions',
      value: new Set(groups.flatMap((g) => g.permissions)).size,
      Icon: Shield,
      description: 'Total permissions',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Menu Groups',
      value: new Set(groups.flatMap((g) => g.menuGroups)).size,
      Icon: FolderTree,
      description: 'Assigned groups',
      trend: '+1.5%',
      trendUp: true
    }
  ];

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
        <span className="text-[#4A36EC] font-medium">Groups</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Groups</h1>
          <p className="text-sm text-gray-600">Manage user groups and their access rights</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Group
        </Button>
      </motion.div>

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

      {/* Add/Edit Dialog */}
      <GroupDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddGroup} />
    </div>
  );
}
