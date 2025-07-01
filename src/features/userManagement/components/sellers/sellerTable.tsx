import { MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Seller } from '.';

interface SellerTableProps {
  sellers: Seller[];
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

// Mock Gopo data - replace with actual data from your API
const gopoMap = {
  '528008c6-d9fd-4590-ad84-6b9a42b84197': { name: 'John Doe', email: 'john@example.com' },
  '628008c6-d9fd-4590-ad84-6b9a42b84198': { name: 'Jane Smith', email: 'jane@example.com' }
};

export function SellerTable({ sellers, onLocationSelect }: SellerTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Store Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Assigned Gopo</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Location</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((seller, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-700 font-medium">{seller.storeName}</TableCell>
              <TableCell className="text-gray-700">{gopoMap[seller.Gopa_ID as keyof typeof gopoMap]?.name || 'Unknown Gopo'}</TableCell>
              <TableCell className="text-gray-700">
                <Badge variant="secondary">{`${seller.latitude.toFixed(4)}, ${seller.longitude.toFixed(4)}`}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-[#4A36EC]/10"
                  onClick={() =>
                    onLocationSelect({
                      lat: seller.latitude,
                      lng: seller.longitude
                    })
                  }
                >
                  <MapPin className="w-4 h-4 mr-2 text-[#4A36EC]" />
                  View on Map
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {sellers.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                No seller stores added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
