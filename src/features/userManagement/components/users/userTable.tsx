import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { User } from '.';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'SELLER':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Email</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Phone Number</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">User Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-700 font-medium">{user.name}</TableCell>
              <TableCell className="text-gray-700">{user.email}</TableCell>
              <TableCell className="text-gray-700">{user.phoneNumber}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getUserTypeColor(user.user_type)} border-0`}>
                  {user.user_type}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                No users added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
