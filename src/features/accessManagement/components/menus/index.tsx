import { motion } from 'framer-motion';
import { FolderTree, Lock, Menu, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';

import { MenuItem } from '../../types/menu.types';
import { MenuGroup } from '../../types/menugroup.types';
import { MenuDialog } from './menuDialog';
import { MenuTable } from './menuTable';

export default function MenuManagementPage() {
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addMenuModal = useFormModal();

  const stats = [
    {
      title: 'Menu Groups',
      value: menuGroups.length,
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

  const handleSubmitMenu = async (newItems: { groups: MenuGroup[]; items: MenuItem[] }) => {
    try {
      // Handle API call here
      setMenuGroups([...menuGroups, ...newItems.groups]);
      setMenuItems([...menuItems, ...newItems.items]);

      toast.success('Menu items created successfully');
      addMenuModal.close();
      setError(null);
    } catch (err) {
      setError('Failed to add menu items');
      console.error(err);
      toast.error('Failed to create menu items. Please try again.');
    }
  };

  const handleAddMenu = () => {
    addMenuModal.openForm({
      title: 'Create Menu Items',
      size: 'lg',
      showFooter: false,
      children: <MenuDialog open={false} onOpenChange={() => {}} onSubmit={handleSubmitMenu} existingGroups={menuGroups} />
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Control', '/access-control', 'Menus')} />

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

      {/* Error Display */}
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Menu Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <MenuTable
          groups={menuGroups}
          items={menuItems}
          onUpdate={(groups, items) => {
            setMenuGroups(groups);
            setMenuItems(items);
          }}
        />
      </motion.div>
    </div>
  );
}
