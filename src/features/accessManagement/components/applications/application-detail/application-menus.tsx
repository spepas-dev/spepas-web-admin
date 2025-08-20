import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Menu, Plus, Trash2, Edit } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { cn } from '@/lib/utils';

import { Menu as MenuType } from '../../../types/group.types';
import { CreateMenuDialog } from './create-menu-dialog';
import { EditMenuDialog } from './edit-menu-dialog';

interface ApplicationMenusProps {
  applicationId: string;
}

// Mock data - replace with actual API calls
const mockMenus: MenuType[] = [
  {
    id: 1,
    menuID: 'menu-1',
    title: 'Dashboard',
    added_by: 'user-1',
    application_id: 'app-1',
    status: 1,
    date_added: '2024-01-01T00:00:00Z',
    application: {
      id: 1,
      application_id: 'app-1',
      name: 'Test App',
      status: 1,
      dateAdded: '2024-01-01T00:00:00Z',
      added_by: 'user-1'
    }
  },
  {
    id: 2,
    menuID: 'menu-2',
    title: 'User Management',
    added_by: 'user-1',
    application_id: 'app-1',
    status: 1,
    date_added: '2024-01-01T00:00:00Z',
    application: {
      id: 1,
      application_id: 'app-1',
      name: 'Test App',
      status: 1,
      dateAdded: '2024-01-01T00:00:00Z',
      added_by: 'user-1'
    }
  }
];

export const ApplicationMenus = ({ applicationId }: ApplicationMenusProps) => {
  const [menus, setMenus] = useState<MenuType[]>(mockMenus);
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);

  const createMenuModal = useFormModal();
  const editMenuModal = useFormModal();

  const handleCreateMenu = (menuData: Partial<MenuType>) => {
    const newMenu: MenuType = {
      id: Date.now(),
      menuID: `menu-${Date.now()}`,
      title: menuData.title || '',
      added_by: 'current-user',
      application_id: applicationId,
      status: 1,
      date_added: new Date().toISOString(),
      application: {
        id: 1,
        application_id: applicationId,
        name: 'Test App',
        status: 1,
        dateAdded: '2024-01-01T00:00:00Z',
        added_by: 'user-1'
      }
    };

    setMenus([...menus, newMenu]);
    createMenuModal.close();
    toast.success('Menu created successfully');
  };

  const handleUpdateMenu = (menuData: Partial<MenuType>) => {
    if (!selectedMenu) return;

    setMenus(menus.map((menu) => (menu.id === selectedMenu.id ? { ...menu, ...menuData } : menu)));
    editMenuModal.close();
    setSelectedMenu(null);
    toast.success('Menu updated successfully');
  };

  const handleDeleteMenu = (menuId: number) => {
    setMenus(menus.filter((menu) => menu.id !== menuId));
    toast.success('Menu deleted successfully');
  };

  const columns = useMemo(
    () => [
      {
        header: 'Serial',
        accessorKey: 'serial',
        cell: ({ row }: { row: Row<MenuType> }) => {
          return <span className="text-gray-600">{row.index + 1}</span>;
        }
      },
      {
        header: 'Menu Title',
        accessorKey: 'title'
      },
      {
        header: 'Menu ID',
        accessorKey: 'menuID',
        cell: ({ row }: { row: Row<MenuType> }) => (
          <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">{row.original.menuID}</span>
        )
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }: { row: Row<MenuType> }) => {
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
        header: 'Created Date',
        accessorKey: 'date_added',
        cell: ({ row }: { row: Row<MenuType> }) => (
          <span className="text-sm text-gray-600">{new Date(row.original.date_added).toLocaleDateString()}</span>
        )
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }: { row: Row<MenuType> }) => {
          const menu = row.original;
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-[#4A36EC] hover:text-white"
                onClick={() => {
                  setSelectedMenu(menu);
                  editMenuModal.open();
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="hover:bg-red-600 hover:text-white" onClick={() => handleDeleteMenu(menu.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        }
      }
    ],
    []
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Application Menus</h2>
          <p className="text-sm text-gray-600 mt-1">Manage menus and navigation items for this application</p>
        </div>
        <Button onClick={createMenuModal.open} className="bg-[#4A36EC] hover:bg-[#3A2BDC]">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-[#4A36EC]" />
            Menu List
          </CardTitle>
          <CardDescription>All menus associated with this application</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={menus} columns={columns} searchKey="title" placeholder="Search menus..." />
        </CardContent>
      </Card>

      {/* Create Menu Dialog */}
      <CreateMenuDialog
        isOpen={createMenuModal.isOpen}
        onClose={createMenuModal.close}
        onSubmit={handleCreateMenu}
        applicationId={applicationId}
      />

      {/* Edit Menu Dialog */}
      {selectedMenu && (
        <EditMenuDialog isOpen={editMenuModal.isOpen} onClose={editMenuModal.close} onSubmit={handleUpdateMenu} menu={selectedMenu} />
      )}
    </motion.div>
  );
};
