import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Package, Search, ShoppingCart, Tag, Users } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { useGetGopaList } from '@/features/userManagement/api/queries/gopas.queries';
import { Gopa } from '@/features/userManagement/types/gopa.types';
import { cn } from '@/lib/utils';

// Mock data for gopa stats - replace with actual API call
const mockGopaStats = {
  totalAssignedRequests: 156,
  totalUnassignedRequests: 43,
  completedRequests: 89,
  totalRevenue: 12450.75
};

export default function GopasPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: gopasData, isLoading, isError } = useGetGopaList();
  const gopasList = useMemo(() => gopasData?.data || [], [gopasData?.data]);

  const handleViewRequests = useCallback(
    (gopaId: string) => {
      navigate(`/order-management/orders/gopas/${gopaId}/requests`);
    },
    [navigate]
  );

  const handleViewHistory = useCallback(
    (gopaId: string) => {
      navigate(`/order-management/orders/gopas/${gopaId}/history`);
    },
    [navigate]
  );

  const filteredGopas = gopasList.filter(
    (gopa) => gopa.name.toLowerCase().includes(searchQuery.toLowerCase()) || gopa.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    (): ColumnDef<Gopa>[] => [
      {
        header: 'Serial Number',
        accessorKey: 'id',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">#{row.index + 1}</span>;
        }
      },
      {
        header: 'Gopa Name',
        accessorKey: 'name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">{row.original.email}</span>
            </div>
          );
        }
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">{row.original.phoneNumber}</span>;
        }
      },
      {
        header: 'Specialties',
        accessorKey: 'gopa.Specialties',
        cell: ({ row }) => {
          const specialties = row.original.gopa?.Specialties || [];
          return (
            <div className="flex flex-wrap gap-1">
              {specialties.slice(0, 2).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {specialties.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{specialties.length - 2}
                </Badge>
              )}
            </div>
          );
        }
      },
      {
        header: 'Date Added',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">{format(new Date(row.original.createdAt), 'dd/MM/yyyy HH:mm:ss a')}</span>;
        }
      },
      {
        header: 'Verification Status',
        accessorKey: 'verificationStatus',
        cell: ({ row }) => {
          const isVerified = row.original.verificationStatus === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isVerified
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isVerified ? 'bg-green-400' : 'bg-yellow-400')} />
              <span className="text-xs font-medium">{isVerified ? 'Verified' : 'Pending'}</span>
            </span>
          );
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const isActive = row.original.status === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isActive ? 'bg-green-400' : 'bg-red-400')} />
              <span className="text-xs font-medium">{isActive ? 'Active' : 'Inactive'}</span>
            </span>
          );
        }
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white text-xs px-2 py-1"
                  onClick={() => handleViewRequests(row.original.gopa.Gopa_ID)}
                >
                  Requests
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white text-xs px-2 py-1"
                  onClick={() => handleViewHistory(row.original.gopa.Gopa_ID)}
                >
                  History
                </Button>
              </div>
            </div>
          );
        }
      }
    ],
    [handleViewRequests, handleViewHistory]
  );

  const stats = [
    {
      title: 'Total Gopas',
      value: gopasList.length,
      Icon: Users,
      description: 'Registered gopas',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Assigned Requests',
      value: mockGopaStats.totalAssignedRequests,
      Icon: Tag,
      description: 'Currently assigned requests',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Unassigned Requests',
      value: mockGopaStats.totalUnassignedRequests,
      Icon: Package,
      description: 'Pending assignment requests',
      trend: '-2.1%',
      trendUp: false
    },
    {
      title: 'Completed Requests',
      value: mockGopaStats.completedRequests,
      Icon: ShoppingCart,
      description: 'Successfully completed requests',
      trend: '+12.5%',
      trendUp: true
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A36EC] mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading gopas...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading gopas</p>
          <p className="text-sm text-muted-foreground mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', 'Gopas')} />

      {/* Header */}
      <PageHeader
        title="Gopas"
        description="View and manage gopa assignments and request history"
        actions={
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search gopas..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Gopas Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A36EC]">Gopas Management</CardTitle>
            <CardDescription>Manage gopa assignments and track their request handling performance</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredGopas}
              columns={columns}
              loading={isLoading}
              tableStyle="border rounded-lg bg-white"
              tableHeadClassName="text-[#4A36EC] font-semibold"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
