import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { AlertCircle, Download, Eye, Phone, Smartphone } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { useCallOrders, useExportCallOrders } from '../../../call-orders/hooks/useCallOrders';
import { CallOrder } from '../../../call-orders/types/call-orders.types';

export default function CallOrdersList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [callTypeFilter, setCallTypeFilter] = useState('');

  // Fetch call orders with filters
  const {
    data: callOrdersData,
    isLoading,
    error,
    refetch
  } = useCallOrders({
    search: searchTerm || undefined,
    status: statusFilter || undefined,
    call_type: callTypeFilter || undefined,
    limit: 50
  });

  const { mutate: exportOrders, isPending: isExporting } = useExportCallOrders();

  const orders = callOrdersData?.data || [];

  const handleExport = () => {
    exportOrders({
      status: statusFilter || undefined,
      call_type: callTypeFilter || undefined
    });
  };

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
              navigate(`/call-management/calls-orders/${row.original.Call_Order_ID}`);
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        )
      }
    ],
    [navigate]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load call orders. Please try again.
            <Button variant="outline" size="sm" className="ml-2" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by customer name, phone, part name, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={callTypeFilter}
            onChange={(e) => setCallTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Types</option>
            <option value="PHONE">Phone</option>
            <option value="USSD">USSD</option>
          </select>
        </div>

        <Button variant="outline" onClick={handleExport} disabled={isExporting} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={orders} placeholder="Search call orders..." />

      {/* Empty state */}
      {orders.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No call orders found.</p>
        </div>
      )}
    </div>
  );
}
