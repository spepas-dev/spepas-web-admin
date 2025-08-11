import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { FolderTree, Lock, Menu, Plus } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { cn } from '@/lib/utils';

import { useGetMenuList } from '../../api/queries/menu.queries';
import { CreateMenuItemDto, MenuItem } from '../../types/menu.types';
import { NewMenu } from './newMenu';

export default function MenuManagementPage() {
  const { data: menuItemsData } = useGetMenuList();
  const menuItems = useMemo(() => {
    return menuItemsData?.data || [];
  }, [menuItemsData?.data]);
  console.log(menuItems);
  // Mock data - replace with actual API calls
  // const menuItems: MenuItem[] = useMemo(
  //   () => [
  //     {
  //       id: '1',
  //       name: 'Dashboard',
  //       description: 'Main dashboard view',
  //       icon: 'Home',
  //       path: '/dashboard',
  //       permissions: 'admin:read',
  //       parentId: null,
  //       order: 1,
  //       isActive: true
  //     },
  //     {
  //       id: '2',
  //       name: 'User Management',
  //       description: 'Manage users and roles',
  //       icon: 'Users',
  //       path: '/user-management',
  //       permissions: 'admin:write',
  //       parentId: null,
  //       order: 2,
  //       isActive: true
  //     }
  //   ],
  //   []
  // );

  const existingGroups = useMemo(
    () => [
      { id: '1', title: 'Main Navigation' },
      { id: '2', title: 'Settings' },
      { id: '3', title: 'Reports' }
    ],
    []
  );

  const formModal = useFormModal();

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }: { row: Row<MenuItem> }) => <div>{row.original.name}</div>
      },

      {
        header: 'Permissions',
        accessorKey: 'permissions',
        cell: ({ row }: { row: Row<MenuItem> }) => (
          <div>
            {row.original.permissions ? (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{row.original.permissions}</span>
            ) : (
              <span className="text-gray-400 text-xs">No permissions</span>
            )}
          </div>
        )
      },
      {
        header: 'Status',
        accessorKey: 'isActive',
        cell: ({ row }: { row: Row<MenuItem> }) => {
          const isActive = row.original.isActive;
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

  const handleAddMenu = () => {
    formModal.openForm({
      title: 'Add New Menu Item',
      children: <NewMenu onSubmit={handleSubmitMenu} loading={false} existingGroups={existingGroups} />,
      showFooter: false
    });
  };

  const handleSubmitMenu = async (menuData: CreateMenuItemDto) => {
    try {
      // Handle API call here
      console.log(menuData);
      toast.success('Menu item created successfully');
      formModal.close();
    } catch {
      toast.error('Failed to create menu item');
    }
  };

  const stats = [
    {
      title: 'Menu Groups',
      value: existingGroups.length,
      icon: FolderTree,
      description: 'Active groups',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Menu Items',
      value: menuItems.length,
      icon: Menu,
      description: 'Total items',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Protected Routes',
      value: menuItems.filter((item) => item.permissions).length,
      icon: Lock,
      description: 'Permission required',
      trend: '+1.8%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Management', '/access-management', 'Menus')} />

      {/* Header */}
      <PageHeader
        title="Menu Configuration"
        description="Manage menu groups, items, and permissions"
        actions={
          <Button onClick={handleAddMenu} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Menu Item
          </Button>
        }
      />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                  <p className="text-2xl font-bold text-[#4A36EC]">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                </div>
                <div className="p-3 bg-[#4A36EC]/10 rounded-full">
                  <stat.icon className="w-6 h-6 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
                <span className="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Menu Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <DataTable
          data={menuItems}
          columns={columns}
          loading={false}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
