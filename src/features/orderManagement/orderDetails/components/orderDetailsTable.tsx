import { format } from 'date-fns';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { OrderDetails } from '../types';

interface OrderDetailsTableProps {
  orders: OrderDetails[];
}

export function OrderDetailsTable({ orders }: OrderDetailsTableProps) {
  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return <Badge variant="outline">Pending</Badge>;
      case 1:
        return (
          <Badge variant="default" className="bg-green-500">
            Approved
          </Badge>
        );
      case 2:
        return <Badge variant="destructive">Rejected</Badge>;
      case 3:
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="border rounded-lg bg-white overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Order ID</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Brand</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Seller</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Gopa</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Price</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Quantity</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Status</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Date</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-700">{order.bidding_ID}</TableCell>
              <TableCell className="text-gray-700">{order.orderRequest.sparePart.carModel.carBrand.name}</TableCell>
              <TableCell className="text-gray-700">{order.seller.storeName}</TableCell>
              <TableCell className="text-gray-700">{order.gopa.name}</TableCell>
              <TableCell className="text-gray-700">${order.price.toFixed(2)}</TableCell>
              <TableCell className="text-gray-700">{order.orderRequest.quantity}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-gray-700">{format(new Date(order.createdAt), 'MMM d, yyyy')}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {order.images.length > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Images</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
