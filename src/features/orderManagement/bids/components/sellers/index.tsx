import { ColumnDef } from '@tanstack/react-table';
import { format, formatDate } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, Package, Search, ShoppingCart, Tag, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetSellerList } from '@/features/userManagement/api/queries/sellers.queries';
import { Seller } from '@/features/userManagement/types/sellers.types';
import { cn } from '@/lib/utils';

// Mock data for sellers - replace with actual API call
const sellers = [
  {
    id: 1,
    Seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    storeName: 'AutoParts Pro',
    business_reg_url: 'https://example.com/business-reg',
    business_reg_obj: {},
    Location: {
      type: 'Point',
      coordinates: [37.7749, -122.4194]
    },
    Gopa_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    date_added: '2025-01-15T10:30:00.510Z',
    status: 1,
    stats: {
      totalOrders: 45,
      activeBids: 12,
      completedOrders: 33,
      totalRevenue: 5678.9
    }
  },
  {
    id: 2,
    Seller_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    storeName: 'Engine Essentials',
    business_reg_url: 'https://example.com/business-reg-2',
    business_reg_obj: {},
    Location: {
      type: 'Point',
      coordinates: [37.7833, -122.4167]
    },
    Gopa_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    date_added: '2025-01-16T11:30:00.510Z',
    status: 1,
    stats: {
      totalOrders: 32,
      activeBids: 8,
      completedOrders: 24,
      totalRevenue: 4321.5
    }
  }
];

export default function SellersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: sellersData, isLoading, isError } = useGetSellerList();
  const sellersList = useMemo(() => sellersData?.data || [], [sellersData?.data]);

  console.log('sellers', sellersList);
  const handleViewActiveBids = (sellerId: string) => {
    navigate(`/order-management/orders/sellers/${sellerId}/active-bids`);
  };

  const handleViewRequestHistory = (sellerId: string) => {
    navigate(`/order-management/orders/sellers/${sellerId}/request-history`);
  };

  const filteredSellers = sellersList.filter((seller) => seller.sellerDetails.storeName.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = useMemo(
    (): ColumnDef<Seller>[] => [
      {
        header: 'Serial Number',
        accessorKey: 'id',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">#{row.index + 1}</span>;
        }
      },
      {
        header: 'Store Name',
        accessorKey: 'sellerDetails.storeName'
      },
      {
        header: 'Date Added',
        accessorKey: 'sellerDetails.date_added',
        cell: ({ row }) => {
          return (
            <span className="text-xs font-medium">{format(new Date(row.original.sellerDetails.date_added), 'dd/MM/yyyy HH:mm:ss a')}</span>
          );
        }
      },
      {
        header: 'Total Orders',
        accessorKey: 'stats.totalOrders'
      },
      {
        header: 'Active Bids',
        accessorKey: 'stats.activeBids'
      },
      {
        header: 'Completed Orders',
        accessorKey: 'stats.completedOrders'
      },
      {
        header: 'Total Revenue',
        accessorKey: 'stats.totalRevenue'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                row.original.status === 1
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', row.original.status === 1 ? 'bg-green-400' : 'bg-red-400')} />
              <span className="text-xs font-medium">{row.original.status === 1 ? 'Active' : 'Inactive'}</span>
            </span>
          );
        }
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
                onClick={() => handleViewActiveBids(row.original.Seller_ID)}
              >
                Active Bids
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
                onClick={() => handleViewRequestHistory(row.original.Seller_ID)}
              >
                Request History
              </Button>
            </div>
          );
        }
      }
    ],
    []
  );

  const stats = [
    {
      title: 'Total Sellers',
      value: sellers.length,
      Icon: User,
      description: 'Registered sellers',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Active Bids',
      value: sellers.reduce((sum, seller) => sum + seller.stats.activeBids, 0),
      Icon: Tag,
      description: 'Total active bids',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Completed Orders',
      value: sellers.reduce((sum, seller) => sum + seller.stats.completedOrders, 0),
      Icon: ShoppingCart,
      description: 'Successfully completed orders',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Total Revenue',
      value: `GHS ${sellers.reduce((sum, seller) => sum + seller.stats.totalRevenue, 0).toFixed(2)}`,
      Icon: Package,
      description: 'Total revenue from orders',
      trend: '+12.5%',
      trendUp: true
    }
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading sellers</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}

      <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', 'Sellers')} />

      {/* Header */}
      <PageHeader
        title="Sellers"
        description="View and manage seller orders and bids"
        actions={
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search sellers..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        }
      />

      {/* Stats Cards */}

      <CardGrid cards={stats} />

      {/* Sellers Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={filteredSellers}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
