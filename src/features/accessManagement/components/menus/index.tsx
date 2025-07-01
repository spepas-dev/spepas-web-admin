import { motion } from 'framer-motion';
import { ChevronRight, FolderTree, Lock, Menu, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { MenuItem } from '../../types/menu.types';
import { MenuGroup } from '../../types/menugroup.types';
import { MenuDialog } from './menuDialog';
import { MenuTable } from './menuTable';

export default function MenuManagementPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddMenu = async (newItems: { groups: MenuGroup[]; items: MenuItem[] }) => {
    try {
      // Handle API call here
      setMenuGroups([...menuGroups, ...newItems.groups]);
      setMenuItems([...menuItems, ...newItems.items]);
      setIsDialogOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to add menu items');
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Menu Configuration</h1>
          <p className="text-sm text-gray-600">Manage menu groups, items, and permissions</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                  </div>
                  <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                    <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-500">{stat.description}</p>
                  <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

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

      {/* Error Message */}
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* Add/Edit Dialog */}
      <MenuDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddMenu} existingGroups={menuGroups} />
    </div>
  );
}
