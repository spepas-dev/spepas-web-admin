import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Permission } from '../../types';

interface PermissionTableProps {
  permissions: Permission[];
}

export function PermissionTable({ permissions }: PermissionTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Permission Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Description</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Module</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions &&
            permissions.map((permission, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                <TableCell className="text-gray-700">{permission.title}</TableCell>
                <TableCell className="text-gray-700">{permission.description}</TableCell>
                <TableCell className="text-gray-700">
                  <Badge variant="outline" className="bg-[#4A36EC]/10 text-[#4A36EC] border-0">
                    {permission.module}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700">
                  {/* <div className="flex gap-2 flex-wrap">
                  {permission.actions && permission.actions.map(action => (
                    <Badge 
                      key={action}
                      variant="outline" 
                      className="bg-gray-100 text-gray-700 border-0"
                    >
                      {action}
                    </Badge>
                  ))}
                </div> */}
                </TableCell>
              </TableRow>
            ))}
          {permissions.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                No permissions added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
