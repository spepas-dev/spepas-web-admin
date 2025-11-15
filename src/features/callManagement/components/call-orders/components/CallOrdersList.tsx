import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Phone, Smartphone } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/custom/dataTable';
import { cn } from '@/lib/utils';

import { CallOrder } from '../../../types/call-orders.types';

// Mock data for call orders - replace with actual API call
const mockCallOrders: CallOrder[] = [
  {
    id: 1,
    Call_Order_ID: 'CO001',
    buyer_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    buyer_name: 'John Doe',
    buyer_phone: '+233241234567',
    spare_part_name: 'Brake Pads',
    call_type: 'PHONE',
    call_duration: 5,
    quantity: 2,
    priority: 'HIGH',
    status: 'COMPLETED',
    require_image: 1,
    notes: 'Customer needs urgent delivery',
    createdAt: '2025-11-15T10:30:00.000Z',
    updatedAt: '2025-11-15T11:00:00.000Z'
  },
  {
    id: 2,
    Call_Order_ID: 'CO002',
    buyer_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    buyer_name: 'Jane Smith',
    buyer_phone: '+233241234568',
    spare_part_name: 'Oil Filter',
    call_type: 'USSD',
    call_duration: 0,
    quantity: 1,
    priority: 'MEDIUM',
    status: 'PENDING',
    require_image: 0,
    notes: '',
    createdAt: '2025-11-15T09:15:00.000Z',
    updatedAt: '2025-11-15T09:15:00.000Z'
  },
  {
    id: 3,
    Call_Order_ID: 'CO003',
    buyer_ID: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
    buyer_name: 'Michael Johnson',
    buyer_phone: '+233241234569',
    spare_part_name: 'Headlight Bulb',
    call_type: 'PHONE',
    call_duration: 3,
    quantity: 4,
    priority: 'LOW',
    status: 'IN_PROGRESS',
    require_image: 1,
    notes: 'Customer prefers LED bulbs',
    createdAt: '2025-11-15T08:45:00.000Z',
    updatedAt: '2025-11-15T10:20:00.000Z'
  }
];

export default function CallOrdersList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return mockCallOrders;

    return mockCallOrders.filter(
      (order) =>
        order.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyer_phone.includes(searchTerm) ||
        order.spare_part_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Call_Order_ID.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const columns: ColumnDef<CallOrder>[] = useMemo(
    () => [
      {
        accessorKey: 'Call_Order_ID',
        header: 'Order ID',
        cell: ({ row }) => <div className="font-medium text-sm">{row.getValue('Call_Order_ID')}</div>
      },
      {
        accessorKey: 'buyer_name',
        header: 'Customer',
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-sm">{row.getValue('buyer_name')}</div>
            <div className="text-xs text-muted-foreground">{row.original.buyer_phone}</div>
          </div>
        )
      },
      {
        accessorKey: 'spare_part_name',
        header: 'Spare Part',
        cell: ({ row }) => <div className="font-medium text-sm">{row.getValue('spare_part_name')}</div>
      },
      {
        accessorKey: 'call_type',
        header: 'Call Type',
        cell: ({ row }) => {
          const callType = row.getValue('call_type') as string;
          return (
            <div className="flex items-center space-x-1">
              {callType === 'PHONE' ? <Phone className="h-3 w-3 text-blue-600" /> : <Smartphone className="h-3 w-3 text-green-600" />}
              <span className="text-sm">{callType}</span>
            </div>
          );
        }
      },
      {
        accessorKey: 'quantity',
        header: 'Qty',
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue('quantity')}</div>
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
          const priority = row.getValue('priority') as string;
          return <Badge className={cn('text-xs', getPriorityColor(priority))}>{priority}</Badge>;
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return <Badge className={cn('text-xs', getStatusColor(status))}>{status.replace('_', ' ')}</Badge>;
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">{format(new Date(row.getValue('createdAt')), 'dd MMM yyyy, HH:mm')}</div>
        )
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white text-xs px-2 py-1"
            onClick={() => {
              // Handle view details
              console.log('View details for order:', row.original.Call_Order_ID);
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        )
      }
    ],
    []
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by customer name, phone, part name, or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredOrders} searchKey="buyer_name" searchPlaceholder="Search call orders..." />
    </div>
  );
}
