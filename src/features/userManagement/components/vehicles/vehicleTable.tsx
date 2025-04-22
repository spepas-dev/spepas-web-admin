import { Car } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Vehicle } from '.';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

// Mock user data - replace with actual data from your API
const userMap = {
  '8c66228b-9527-490b-a174-b15cb557100b': { name: 'John Rider', email: 'john@example.com' }
};

const riderMap = {
  '8731e725-2b11-4c40-a828-b8408e35fe19': { name: 'John Delivery', phone: '+233123456789' }
};

export function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Registration</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Vehicle Info</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Rider</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-700 font-medium">{vehicle.registrationNumber}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-gray-900">{vehicle.model}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[#4A36EC]">
                      {vehicle.type}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      {vehicle.color}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-gray-900">{userMap[vehicle.User_ID as keyof typeof userMap]?.name || 'Unknown User'}</span>
                  <span className="text-gray-500 text-sm">
                    {riderMap[vehicle.Deliver_ID as keyof typeof riderMap]?.name || 'Unknown Rider'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </TableCell>
            </TableRow>
          ))}
          {vehicles.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                No vehicles registered yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
