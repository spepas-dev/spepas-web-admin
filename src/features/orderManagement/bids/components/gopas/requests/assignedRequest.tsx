import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Package2, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useGopaAssignedActiveRequests } from '../../../api/queries/orderDetailsQueries';

// Mock data for assigned requests - replace with actual API call
const mockAssignedRequests = [
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
    status: 1,
    priority: 'HIGH',
    date_assigned: '2025-04-23T18:32:44.035Z',
    createdAt: '2025-04-22T15:30:28.510Z'
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
    status: 2,
    priority: 'MEDIUM',
    date_assigned: '2025-04-23T16:20:30.120Z',
    createdAt: '2025-04-23T14:15:20.300Z'
  }
];

interface AssignedRequestData {
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
  createdAt: string;
}

const AssignedRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: assignedRequests,
    isLoading: isLoadingAssignedRequests,
    isError: isErrorAssignedRequests
  } = useGopaAssignedActiveRequests(id as string);

  const assignedRequestsData = useMemo(() => assignedRequests?.data || [], [assignedRequests]);
  useEffect(() => {
    console.log('Assigned requests:', assignedRequestsData);
  }, [assignedRequestsData]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = useCallback(
    (requestId: string) => {
      navigate(`/order-management/orders/requests/${requestId}`);
    },
    [navigate]
  );

  const filteredRequests = mockAssignedRequests.filter(
    (request) =>
      request.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.sparePart.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    (): ColumnDef<AssignedRequestData>[] => [
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
            1: { label: 'In Progress', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            2: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' },
            0: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
          };
          const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap[0];

          return (
            <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', statusInfo.color)}>
              {statusInfo.label}
            </span>
          );
        }
      },
      {
        header: 'Date Assigned',
        accessorKey: 'date_assigned',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">{format(new Date(row.original.date_assigned), 'dd/MM/yyyy HH:mm')}</span>;
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

  if (isLoadingAssignedRequests) {
    return <div>Loading...</div>;
  }

  if (isErrorAssignedRequests) {
    return <div>Error loading assigned requests</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assigned requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredRequests.length} of {mockAssignedRequests.length} requests
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredRequests}
        columns={columns}
        loading={false}
        tableStyle="border rounded-lg bg-white"
        tableHeadClassName="text-[#4A36EC] font-semibold"
      />

      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <Package2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No assigned requests found</p>
          {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>}
        </div>
      )}
    </div>
  );
};

export default AssignedRequest;
