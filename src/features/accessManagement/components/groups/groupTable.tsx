import { Edit, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Group } from '../../types';

interface GroupTableProps {
  groups: Group[];
}

export function GroupTable({ groups }: GroupTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Group Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Description</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Users</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Access Rights</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Created</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell className="text-gray-600">{group.description}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {group.users.map((user) => (
                    <Badge key={user.id} variant="outline" className="bg-blue-50 text-blue-700">
                      {user.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {group.permissions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {group.permissions.map((permission) => (
                        <Badge key={permission.id} variant="outline" className="bg-[#4A36EC]/10 text-[#4A36EC]">
                          {permission.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {group.menuGroups.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {group.menuGroups.map((menuGroup) => (
                        <Badge key={menuGroup.id} variant="outline" className="bg-green-50 text-green-700">
                          {menuGroup.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {group.menuItems.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {group.menuItems.map((menuItem) => (
                        <Badge key={menuItem.id} variant="outline" className="bg-orange-50 text-orange-700">
                          {menuItem.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatDate(group.createdAt)}</TableCell>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      /* Handle delete */
                    }}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {groups.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                No groups added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
