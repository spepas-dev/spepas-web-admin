import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Package2, Search, UserPlus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useGopaUnassignedActiveRequests } from '../../../api/queries/orderDetailsQueries';

// Mock data for unassigned requests - replace with actual API call
const mockUnassignedRequests = [
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
    status: 0,
    priority: 'LOW',
    createdAt: '2025-04-24T09:15:30.200Z'
  },
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
    status: 0,
    priority: 'HIGH',
    createdAt: '2025-04-24T11:30:45.150Z'
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
    status: 0,
    priority: 'MEDIUM',
    createdAt: '2025-04-24T14:45:20.800Z'
  }
];

interface UnassignedRequestData {
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
  createdAt: string;
}

const UnassignedRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: unassignedRequests,
    isLoading: isLoadingUnassignedRequests,
    isError: isErrorUnassignedRequests
  } = useGopaUnassignedActiveRequests(id as string);
  const unassignedRequestsData = useMemo(() => unassignedRequests?.data || [], [unassignedRequests]);
  useEffect(() => {
    console.log('Unassigned requests:', unassignedRequestsData);
  }, [unassignedRequestsData]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = useCallback(
    (requestId: string) => {
      navigate(`/order-management/orders/requests/${requestId}`);
    },
    [navigate]
  );

  const handleAssignRequest = useCallback(
    (requestId: string) => {
      // TODO: Implement assign request functionality
      console.log('Assigning request:', requestId, 'to gopa:', id);
    },
    [id]
  );

  const filteredRequests = mockUnassignedRequests.filter(
    (request) =>
      request.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.sparePart.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    (): ColumnDef<UnassignedRequestData>[] => [
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
        cell: () => {
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                'bg-orange-100 text-orange-800 border-orange-200'
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-orange-400" />
              Unassigned
            </span>
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
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                className="border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white text-xs px-2 py-1"
                onClick={() => handleAssignRequest(row.original.request_ID)}
              >
                <UserPlus className="h-3 w-3 mr-1" />
                Assign
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white text-xs px-2 py-1"
                onClick={() => handleViewDetails(row.original.request_ID)}
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          );
        }
      }
    ],
    [handleViewDetails, handleAssignRequest]
  );

  if (isLoadingUnassignedRequests) {
    return <div>Loading...</div>;
  }

  if (isErrorUnassignedRequests) {
    return <div>Error loading unassigned requests</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search unassigned requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredRequests.length} of {mockUnassignedRequests.length} requests
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
          <p className="text-muted-foreground">No unassigned requests found</p>
          {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>}
        </div>
      )}
    </div>
  );
};

export default UnassignedRequest;
