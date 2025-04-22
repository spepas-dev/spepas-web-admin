import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Bid, SparePart } from '../types';

interface BidsTableProps {
  bids: Bid[];
  onPartClick: (part: SparePart) => void;
}

export function BidsTable({ bids, onPartClick }: BidsTableProps) {
  // Group bids by part category
  const partsByCategory = bids.reduce(
    (acc, bid) => {
      if (!acc[bid.partCategory]) {
        acc[bid.partCategory] = {
          id: bid.partId,
          name: bid.partName,
          category: bid.partCategory,
          totalOrders: 0,
          pendingOrders: 0
        };
      }
      acc[bid.partCategory].totalOrders++;
      if (bid.status === 'PENDING') {
        acc[bid.partCategory].pendingOrders++;
      }
      return acc;
    },
    {} as Record<string, SparePart>
  );

  const parts = Object.values(partsByCategory);

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Part Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Category</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Total Orders</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Pending Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.map((part) => (
            <TableRow key={part.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onPartClick(part)}>
              <TableCell className="text-gray-700">{part.name}</TableCell>
              <TableCell className="text-gray-700">{part.category}</TableCell>
              <TableCell className="text-gray-700">{part.totalOrders}</TableCell>
              <TableCell className="text-gray-700">{part.pendingOrders}</TableCell>
            </TableRow>
          ))}
          {parts.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                No spare parts orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
