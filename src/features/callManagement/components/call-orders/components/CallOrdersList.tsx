import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Package2, Phone, Search, Smartphone, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { CallOrder } from '../../../types/call-orders.types';

// Mock data for call orders - replace with actual API call
const mockCallOrders: CallOrder[] = [
  {
    id: 1,
    order_ID: 'CO-2025-001',
    buyer_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    admin_ID: 'admin-123',
    call_type: 'PHONE',
    call_duration: 5,
    order_details: {
      sparePart: {
        name: 'Brake Pad Set',
        category_ID: 'cat2',
        carModel_ID: 'model1',
        manufacturer_ID: 'man1',
        yearOfMake: 2020,
        description: 'Front brake pads for Toyota Camry'
      },
      quantity: 2,
      priority: 'HIGH',
      require_image: 1,
      notes: 'Customer needs urgent replacement'
    },
    status: 'COMPLETED',
    createdAt: '2025-04-24T10:30:00.000Z',
    updatedAt: '2025-04-24T14:20:00.000Z',
    buyer: {
      id: 1,
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+233241234567',
      verificationStatus: 1,
      status: 1,
      user_type: 'BUYER',
      createdAt: '2025-01-15T10:30:00.000Z',
      updatedAt: '2025-04-20T14:20:00.000Z'
    },
    admin: {
      id: 1,
      name: 'Admin User',
      User_ID: 'admin-123'
    }
  },
  {
    id: 2,
    order_ID: 'CO-2025-002',
    buyer_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    admin_ID: 'admin-124',
    call_type: 'USSD',
    order_details: {
      sparePart: {
        name: 'Engine Oil Filter',
        category_ID: 'cat1',
        carModel_ID: 'model2',
        manufacturer_ID: 'man1',
        yearOfMake: 2021,
        description: 'Oil filter for Toyota Camry XLE'
      },
      quantity: 1,
      priority: 'MEDIUM',
      require_image: 0,
      notes: 'Regular maintenance'
    },
    status: 'PROCESSING',
    createdAt: '2025-04-24T14:15:00.000Z',
    updatedAt: '2025-04-24T14:15:00.000Z',
    buyer: {
      id: 2,
      User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+233241234568',
      verificationStatus: 1,
      status: 1,
      user_type: 'BUYER',
      createdAt: '2025-02-10T08:45:00.000Z',
      updatedAt: '2025-04-19T16:30:00.000Z'
    },
    admin: {
      id: 2,
      name: 'Admin User 2',
      User_ID: 'admin-124'
    }
  }
];

export default function CallOrdersList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = (orderId: string) => {
    navigate(`/order-management/call-orders/${orderId}`);
  };

  const filteredOrders = mockCallOrders.filter(
    (order) =>
      order.order_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.phoneNumber.includes(searchQuery.toLowerCase()) ||
      order.order_details.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    (): ColumnDef<CallOrder>[] => [
      {
        header: 'Order ID',
        accessorKey: 'order_ID',
        cell: ({ row }) => {
          return <span className="text-xs font-mono text-[#4A36EC] font-medium">{row.original.order_ID}</span>;
        }
      },
      {
        header: 'Buyer',
        accessorKey: 'buyer.name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{row.original.buyer.name}</span>
              <span className="text-xs text-muted-foreground">{row.original.buyer.phoneNumber}</span>
            </div>
          );
        }
      },
      {
        header: 'Spare Part',
        accessorKey: 'order_details.sparePart.name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{row.original.order_details.sparePart.name}</span>
              <span className="text-xs text-muted-foreground">Year: {row.original.order_details.sparePart.yearOfMake}</span>
            </div>
          );
        }
      },
      {
        header: 'Call Type',
        accessorKey: 'call_type',
        cell: ({ row }) => {
          const callType = row.original.call_type;
          const Icon = callType === 'PHONE' ? Phone : Smartphone;
          return (
            <div className="flex items-center">
              <Icon className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">{callType}</span>
            </div>
          );
        }
      },
      {
        header: 'Quantity',
        accessorKey: 'order_details.quantity',
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <Package2 className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">{row.original.order_details.quantity}</span>
            </div>
          );
        }
      },
      {
        header: 'Priority',
        accessorKey: 'order_details.priority',
        cell: ({ row }) => {
          const priority = row.original.order_details.priority;
          return (
            <Badge
              variant={
                priority === 'URGENT'
                  ? 'destructive'
                  : priority === 'HIGH'
                    ? 'destructive'
                    : priority === 'MEDIUM'
                      ? 'default'
                      : 'secondary'
              }
              className="text-xs"
            >
              {priority}
            </Badge>
          );
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          const statusMap = {
            DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-800 border-gray-200' },
            SUBMITTED: { label: 'Submitted', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            PROCESSING: { label: 'Processing', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' },
            CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200' }
          };
          const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.DRAFT;

          return (
            <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', statusInfo.color)}>
              {statusInfo.label}
            </span>
          );
        }
      },
      {
        header: 'Call Duration',
        accessorKey: 'call_duration',
        cell: ({ row }) => {
          const duration = row.original.call_duration;
          return duration ? (
            <span className="text-xs font-medium">{duration} min</span>
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          );
        }
      },
      {
        header: 'Admin',
        accessorKey: 'admin.name',
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs font-medium">{row.original.admin.name}</span>
            </div>
          );
        }
      },
      {
        header: 'Date Created',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">{format(new Date(row.original.createdAt), 'dd/MM/yyyy HH:mm')}</span>;
        }
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <Button
              variant="outline"
              size="sm"
              className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white text-xs px-2 py-1"
              onClick={() => handleViewDetails(row.original.order_ID)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
          );
        }
      }
    ],
    [navigate]
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search call orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredOrders.length} of {mockCallOrders.length} orders
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        loading={false}
        tableStyle="border rounded-lg bg-white"
        tableHeadClassName="text-[#4A36EC] font-semibold"
      />

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <Package2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No call orders found</p>
          {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>}
        </div>
      )}
    </div>
  );
}
