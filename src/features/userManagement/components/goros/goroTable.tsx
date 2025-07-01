import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Goro } from '.';

interface GoroTableProps {
  goros: Goro[];
}

// Mock user data - replace with actual data from your API
const userMap = {
  user1: { name: 'John Doe', email: 'john@example.com' },
  user2: { name: 'Jane Smith', email: 'jane@example.com' }
};

export function GoroTable({ goros }: GoroTableProps) {
  const getSpecialtyColor = (specialty: string) => {
    const colors = {
      TYRES: 'bg-blue-100 text-blue-800',
      FAN_BELT: 'bg-green-100 text-green-800',
      ENGINE: 'bg-red-100 text-red-800',
      BRAKES: 'bg-purple-100 text-purple-800',
      TRANSMISSION: 'bg-yellow-100 text-yellow-800',
      ELECTRICAL: 'bg-indigo-100 text-indigo-800',
      AC_SYSTEM: 'bg-pink-100 text-pink-800',
      SUSPENSION: 'bg-orange-100 text-orange-800'
    };
    return colors[specialty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Mechanic</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Email</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Specialties</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Total Skills</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goros.map((goro, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-700 font-medium">
                {userMap[goro.User_ID as keyof typeof userMap]?.name || 'Unknown User'}
              </TableCell>
              <TableCell className="text-gray-700">{userMap[goro.User_ID as keyof typeof userMap]?.email || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {goro.Specialties.flat().map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className={`${getSpecialtyColor(specialty)} border-0`}>
                      {specialty.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{goro.Specialties.flat().length}</TableCell>
            </TableRow>
          ))}
          {goros.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                No mechanics added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
