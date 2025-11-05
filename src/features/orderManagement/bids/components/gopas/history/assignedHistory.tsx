import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CheckCircle, Clock, Eye, Package2, Search, XCircle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useGopaAssignedActiveRequestsHistory } from '../../../api/queries/orderDetailsQueries';

// Mock data for assigned history - replace with actual API call
const mockAssignedHistory = [
  {
    id: 1,
    request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
    sparePart: {
      name: 'Brake Pad Set',
      category: 'Braking System'
    },
    requester: {
      User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      name: 'David Customer'
    },
    quantity: 2,
    status: 2, // Completed
    priority: 'HIGH',
    date_assigned: '2025-04-20T18:32:44.035Z',
    date_completed: '2025-04-22T14:20:30.120Z',
    completion_time: '1.8 days',
    createdAt: '2025-04-20T15:30:28.510Z'
  },
  {
    id: 2,
    request_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    SparePart_ID: '7a2a9842-8f5c-44df-b951-f870907ba940',
    sparePart: {
      name: 'Engine Oil Filter',
      category: 'Engine Parts'
    },
    requester: {
      User_ID: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
      name: 'Sarah Johnson'
    },
    quantity: 1,
    status: 2, // Completed
    priority: 'MEDIUM',
    date_assigned: '2025-04-18T16:20:30.120Z',
    date_completed: '2025-04-21T10:15:45.300Z',
    completion_time: '2.7 days',
    createdAt: '2025-04-18T14:15:20.300Z'
  },
  {
    id: 3,
    request_ID: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
    SparePart_ID: '8a2a9842-8f5c-44df-b951-f870907ba941',
    sparePart: {
      name: 'Air Filter',
      category: 'Engine Parts'
    },
    requester: {
      User_ID: '6fa85f64-5717-4562-b3fc-2c963f66afa9',
      name: 'Michael Brown'
    },
    quantity: 3,
    status: 4, // Cancelled
    priority: 'LOW',
    date_assigned: '2025-04-15T09:15:30.200Z',
    date_cancelled: '2025-04-16T11:30:20.150Z',
    cancellation_reason: 'Customer cancelled order',
    createdAt: '2025-04-15T08:10:15.100Z'
  }
];

interface AssignedHistoryData {
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
  date_assigned: string;
  date_completed?: string;
  date_cancelled?: string;
  completion_time?: string;
  cancellation_reason?: string;
  createdAt: string;
}

const AssignedHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: assignedHistory,
    isLoading: isLoadingAssignedHistory,
    isError: isErrorAssignedHistory
  } = useGopaAssignedActiveRequestsHistory(id as string);
  const assignedHistoryData = useMemo(() => assignedHistory?.data || [], [assignedHistory]);
  useEffect(() => {
    console.log('Assigned history:', assignedHistoryData);
  }, [assignedHistoryData]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = useCallback(
    (requestId: string) => {
      navigate(`/order-management/orders/requests/${requestId}`);
    },
    [navigate]
  );

  const filteredHistory = mockAssignedHistory.filter(
    (request) =>
      request.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.sparePart.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    (): ColumnDef<AssignedHistoryData>[] => [
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
            2: {
              label: 'Completed',
              color: 'bg-green-100 text-green-800 border-green-200',
              icon: CheckCircle
            },
            4: {
              label: 'Cancelled',
              color: 'bg-red-100 text-red-800 border-red-200',
              icon: XCircle
            }
          };
          const statusInfo = statusMap[status as keyof typeof statusMap];
          const Icon = statusInfo?.icon || Clock;

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
        header: 'Completion Time',
        accessorKey: 'completion_time',
        cell: ({ row }) => {
          const completionTime = row.original.completion_time;
          const status = row.original.status;

          if (status === 4) {
            return <span className="text-xs text-red-600">Cancelled</span>;
          }

          return completionTime ? (
            <span className="text-xs font-medium text-green-600">{completionTime}</span>
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          );
        }
      },
      {
        header: 'Date Completed',
        accessorKey: 'date_completed',
        cell: ({ row }) => {
          const dateCompleted = row.original.date_completed;
          const dateCancelled = row.original.date_cancelled;
          const status = row.original.status;

          if (status === 4 && dateCancelled) {
            return <span className="text-xs font-medium text-red-600">{format(new Date(dateCancelled), 'dd/MM/yyyy HH:mm')}</span>;
          }

          return dateCompleted ? (
            <span className="text-xs font-medium">{format(new Date(dateCompleted), 'dd/MM/yyyy HH:mm')}</span>
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          );
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

  if (isLoadingAssignedHistory) {
    return <div>Loading...</div>;
  }

  if (isErrorAssignedHistory) {
    return <div>Error loading assigned history</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assigned history..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredHistory.length} of {mockAssignedHistory.length} records
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
          <p className="text-muted-foreground">No assigned history found</p>
          {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>}
        </div>
      )}
    </div>
  );
};

export default AssignedHistory;
