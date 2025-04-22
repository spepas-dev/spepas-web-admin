import { ChevronRight, Edit, Lock, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { MenuGroup, MenuItem } from '.';

interface MenuTableProps {
  groups: MenuGroup[];
  items: MenuItem[];
  onUpdate: (groups: MenuGroup[], items: MenuItem[]) => void;
}

export function MenuTable({ groups, items, onUpdate }: MenuTableProps) {
  const handleDelete = (type: 'group' | 'item', id: string) => {
    if (type === 'group') {
      onUpdate(
        groups.filter((g) => g.id !== id),
        items
      );
    } else {
      onUpdate(
        groups,
        items.filter((i) => i.id !== id)
      );
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Path/Description</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Permissions</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Status</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <>
              <TableRow key={group.id} className="bg-gray-50/50">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4" />
                    {group.title}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{group.description}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Badge variant={group.isActive ? 'default' : 'secondary'} className={group.isActive ? 'bg-green-100 text-green-800' : ''}>
                    {group.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        /* Handle edit */
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete('group', group.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {items
                .filter((item) => item.parentId === group.id)
                .map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="pl-8">
                      <div className="flex items-center space-x-2">
                        {item.icon && getIcon(item.icon)}
                        <span>{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.path}</TableCell>
                    <TableCell>
                      {item.permissions && (
                        <Badge variant="outline" className="flex items-center w-fit">
                          <Lock className="w-3 h-3 mr-1" />
                          {item.permissions}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.isActive ? 'default' : 'secondary'}
                        className={item.isActive ? 'bg-green-100 text-green-800' : ''}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            /* Handle edit */
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete('item', item.id)} className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
