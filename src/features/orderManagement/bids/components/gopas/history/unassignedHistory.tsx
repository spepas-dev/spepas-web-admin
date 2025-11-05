import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Clock, Eye, Package2, Search, UserX, XCircle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock data for unassigned history - replace with actual API call
const mockUnassignedHistory = [
  {
    id: 4,
    request_ID: '6fa85f64-5717-4562-b3fc-2c963f66afa9',
    SparePart_ID: '9a2a9842-8f5c-44df-b951-f870907ba942',
    sparePart: {
      name: 'Spark Plugs',
      category: 'Ignition System'
    },
    requester: {
      User_ID: '7fa85f64-5717-4562-b3fc-2c963f66afaa',
      name: 'Lisa Wilson'
    },
    quantity: 4,
    status: 5, // Expired/Timeout
    priority: 'HIGH',
    date_created: '2025-04-10T11:30:45.150Z',
    date_expired: '2025-04-15T11:30:45.150Z',
    expiry_reason: 'No assignment within timeout period',
    days_unassigned: 5
  },
  {
    id: 5,
    request_ID: '7fa85f64-5717-4562-b3fc-2c963f66afaa',
    SparePart_ID: 'aa2a9842-8f5c-44df-b951-f870907ba943',
    sparePart: {
      name: 'Transmission Fluid',
      category: 'Fluids & Lubricants'
    },
    requester: {
      User_ID: '8fa85f64-5717-4562-b3fc-2c963f66afab',
      name: 'Robert Davis'
    },
    quantity: 1,
    status: 4, // Cancelled
    priority: 'MEDIUM',
    date_created: '2025-04-12T14:45:20.800Z',
    date_cancelled: '2025-04-14T16:20:10.500Z',
    cancellation_reason: 'Customer found alternative supplier',
    days_unassigned: 2
  },
  {
    id: 6,
    request_ID: '8fa85f64-5717-4562-b3fc-2c963f66afab',
    SparePart_ID: 'ba2a9842-8f5c-44df-b951-f870907ba944',
    sparePart: {
      name: 'Windshield Wipers',
      category: 'Exterior Parts'
    },
    requester: {
      User_ID: '9fa85f64-5717-4562-b3fc-2c963f66afac',
      name: 'Jennifer Smith'
    },
    quantity: 2,
    status: 5, // Expired/Timeout
    priority: 'LOW',
    date_created: '2025-04-08T08:15:30.200Z',
    date_expired: '2025-04-11T08:15:30.200Z',
    expiry_reason: 'Request timeout - no available gopas',
    days_unassigned: 3
  }
];

interface UnassignedHistoryData {
  id: number;
  request_ID: string;
  SparePart_ID: string;
  sparePart: {
    name: string;
    category: string;
  };
  requester: {
    User_ID: string;
    name: string;
  };
  quantity: number;
  status: number;
  priority: string;
  date_created: string;
  date_expired?: string;
  date_cancelled?: string;
  expiry_reason?: string;
  cancellation_reason?: string;
  days_unassigned: number;
}

const UnassignedHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('Gopa ID:', id); // TODO: Use gopaId for API calls
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = useCallback(
    (requestId: string) => {
      navigate(`/order-management/orders/requests/${requestId}`);
    },
    [navigate]
  );

  const filteredHistory = mockUnassignedHistory.filter(
    (request) =>
      request.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.sparePart.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    (): ColumnDef<UnassignedHistoryData>[] => [
      {
        header: 'Request ID',
        accessorKey: 'request_ID',
        cell: ({ row }) => {
          return <span className="text-xs font-mono text-muted-foreground">#{row.original.request_ID.slice(-8)}</span>;
        }
      },
      {
        header: 'Spare Part',
        accessorKey: 'sparePart.name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{row.original.sparePart.name}</span>
              <span className="text-xs text-muted-foreground">{row.original.sparePart.category}</span>
            </div>
          );
        }
      },
      {
        header: 'Requester',
        accessorKey: 'requester.name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{row.original.requester.name}</span>
              <span className="text-xs text-muted-foreground font-mono">{row.original.requester.User_ID.slice(-8)}</span>
            </div>
          );
        }
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <Package2 className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">{row.original.quantity}</span>
            </div>
          );
        }
      },
      {
        header: 'Priority',
        accessorKey: 'priority',
        cell: ({ row }) => {
          const priority = row.original.priority;
          return (
            <Badge variant={priority === 'HIGH' ? 'destructive' : priority === 'MEDIUM' ? 'default' : 'secondary'} className="text-xs">
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
            4: {
              label: 'Cancelled',
              color: 'bg-red-100 text-red-800 border-red-200',
              icon: XCircle
            },
            5: {
              label: 'Expired',
              color: 'bg-orange-100 text-orange-800 border-orange-200',
              icon: Clock
            }
          };
          const statusInfo = statusMap[status as keyof typeof statusMap];
          const Icon = statusInfo?.icon || UserX;

          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                statusInfo?.color || 'bg-gray-100 text-gray-800 border-gray-200'
              )}
            >
              <Icon className="w-3 h-3 mr-1" />
              {statusInfo?.label || 'Unknown'}
            </span>
          );
        }
      },
      {
        header: 'Days Unassigned',
        accessorKey: 'days_unassigned',
        cell: ({ row }) => {
          const days = row.original.days_unassigned;
          return (
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className={cn('text-sm font-medium', days > 3 ? 'text-red-600' : days > 1 ? 'text-orange-600' : 'text-green-600')}>
                {days} {days === 1 ? 'day' : 'days'}
              </span>
            </div>
          );
        }
      },
      {
        header: 'Reason',
        accessorKey: 'reason',
        cell: ({ row }) => {
          const expiryReason = row.original.expiry_reason;
          const cancellationReason = row.original.cancellation_reason;
          const reason = expiryReason || cancellationReason || 'Unknown';

          return (
            <div className="max-w-xs">
              <span className="text-xs text-muted-foreground truncate block" title={reason}>
                {reason}
              </span>
            </div>
          );
        }
      },
      {
        header: 'Date Closed',
        accessorKey: 'date_closed',
        cell: ({ row }) => {
          const dateExpired = row.original.date_expired;
          const dateCancelled = row.original.date_cancelled;
          const status = row.original.status;

          if (status === 4 && dateCancelled) {
            return <span className="text-xs font-medium text-red-600">{format(new Date(dateCancelled), 'dd/MM/yyyy HH:mm')}</span>;
          }

          if (status === 5 && dateExpired) {
            return <span className="text-xs font-medium text-orange-600">{format(new Date(dateExpired), 'dd/MM/yyyy HH:mm')}</span>;
          }

          return <span className="text-xs text-muted-foreground">-</span>;
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
              onClick={() => handleViewDetails(row.original.request_ID)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
          );
        }
      }
    ],
    [handleViewDetails]
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search unassigned history..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredHistory.length} of {mockUnassignedHistory.length} records
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredHistory}
        columns={columns}
        loading={false}
        tableStyle="border rounded-lg bg-white"
        tableHeadClassName="text-[#4A36EC] font-semibold"
      />

      {filteredHistory.length === 0 && (
        <div className="text-center py-8">
          <Package2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No unassigned history found</p>
          {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>}
        </div>
      )}
    </div>
  );
};

export default UnassignedHistory;
