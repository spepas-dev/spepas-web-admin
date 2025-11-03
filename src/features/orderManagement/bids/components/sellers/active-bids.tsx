import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, Package, Search, ShoppingCart, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSellerBidsForActiveRequestAll } from '@/features/orderManagement/bids/api/queries/bidsQueries';
import { cn } from '@/lib/utils';

import { Order } from '../../types/orders.type';

// Mock data for active bids - replace with actual API call
const activeBids = [
  {
    id: 2,
    bidding_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    assigned_by: 'Admin User',
    Seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    gopa_user_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    date_assigned: '2025-05-07T16:11:32.620Z',
    status: 0,
    price: 150.0,
    unitPrice: 150.0,
    description: 'Original Toyota brake pads',
    createdAt: '2025-05-07T16:11:32.620Z',
    date_accepted: '2025-05-07T16:11:32.620Z',
    seller: {
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
      status: 1
    },
    images: [
      {
        id: 1,
        image_ID: 'e16a631f-905d-4a6b-871d-7b4877c306d6',
        SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
        createdAt: '2025-01-08T11:59:01.609Z',
        status: 1,
        image_url: 'https://example.com/image1.jpg',
        image_ob: {
          data1: 'dddd',
          data2: 'cdvfdbgdfbf'
        }
      }
    ],
    gopa: {
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'John Doe'
    },
    assigner: 'Admin User',
    orderRequest: {
      id: 1,
      request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      SparePart_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      added_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: 0,
      require_image: 1,
      quantity: 2,
      createdAt: '2025-05-07T16:11:32.620Z',
      requester: {
        User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Jane Smith'
      },
      creater: {
        User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Admin User'
      },
      sparePart: {
        id: 1,
        SparePart_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Brake Pads',
        description: 'High-quality brake pads for Toyota vehicles',
        price: 150.0,
        status: 1,
        discount_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        category_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        carModel_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        createdAt: '2025-05-07T16:11:32.620Z',
        updatedAt: '2025-05-07T16:11:32.620Z',
        images: [
          {
            id: 1,
            image_ID: 'e16a631f-905d-4a6b-871d-7b4877c306d6',
            SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
            createdAt: '2025-01-08T11:59:01.609Z',
            status: 1,
            image_url: 'https://example.com/image1.jpg',
            image_ob: {
              data1: 'dddd',
              data2: 'cdvfdbgdfbf'
            }
          }
        ],
        carModel: {
          id: 1,
          CarModel_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Camry',
          yearOfMake: 2020,
          carBrand_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          status: 1,
          createdAt: '2025-05-07T16:11:32.620Z',
          carBrand: {
            id: 1,
            CarBrand_ID: '7043f08a-59f0-48bf-bf1d-ba11d1103908',
            name: 'Toyota',
            status: 1,
            manufacturer_ID: 'fc3d7feb-0825-43ba-9f2d-b95ee62f464b',
            createdAt: '2025-01-08T10:17:33.989Z',
            type: 'CAR',
            manufacturer: {
              id: 1,
              Manufacturer_ID: 'fc3d7feb-0825-43ba-9f2d-b95ee62f464b',
              name: 'Toyota',
              country: 'Japan',
              status: 1,
              createdAt: '2025-01-08T10:09:21.400Z'
            }
          }
        }
      }
    }
  }
];

export default function SellerActiveBidsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: bidsData, isLoading: isBidsLoading, isError: isBidsError } = useSellerBidsForActiveRequestAll(id as string);
  const bidsList = useMemo(() => bidsData?.data || [], [bidsData?.data]);

  const columns = useMemo(
    (): ColumnDef<Order>[] => [
      {
        header: 'Row Number',
        accessorKey: 'id',
        cell: ({ row }) => {
          return <span className="text-xs font-medium">#{row.index + 1}</span>;
        }
      },
      {
        header: 'Bid ID',
        accessorKey: 'id'
      },
      {
        header: 'Spare Part',
        accessorKey: 'orderRequest.sparePart.name',
        cell: ({ row }) => {
          return (
            <div>
              <p className="font-medium">{row.original.orderRequest.sparePart.name}</p>
              <p className="text-sm text-gray-500">
                {row.original.orderRequest.sparePart.carModel.carBrand.name} {row.original.orderRequest.sparePart.carModel.name}
              </p>
            </div>
          );
        }
      },
      {
        header: 'Requester',
        accessorKey: 'orderRequest.requester.name'
      },
      {
        header: 'Quantity',
        accessorKey: 'orderRequest.quantity'
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: ({ row }) => {
          return <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS' }).format(row.original.price)}</div>;
        }
      },
      {
        header: 'Date Assigned',
        accessorKey: 'date_assigned',
        cell: ({ row }) => {
          return <div>{format(new Date(row.original.date_assigned), 'dd/MM/yyyy HH:mm:ss a')}</div>;
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                row.original.status === 0
                  ? 'bg-yellow-500 text-yellow-800 border border-yellow-200'
                  : 'bg-green-500 text-green-800 border border-green-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', row.original.status === 0 ? 'bg-yellow-400' : 'bg-green-400')} />
              {row.original.status === 0 ? 'Pending' : 'Accepted'}
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
                onClick={() => navigate(`/order-management/bids/${row.original.id}`)}
              >
                View Details
              </Button>
            </div>
          );
        }
      }
    ],
    [navigate]
  );

  console.log('bids', bidsList);

  const filteredBids = activeBids.filter(
    (bid) =>
      bid.orderRequest.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.orderRequest.requester.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Active Bids',
      value: activeBids.length,
      Icon: Tag,
      description: 'Current active bids',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Total Value',
      value: `GHS ${activeBids.reduce((sum, bid) => sum + bid.price, 0).toFixed(2)}`,
      Icon: ShoppingCart,
      description: 'Total value of active bids',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Average Price',
      value: `GHS ${(activeBids.reduce((sum, bid) => sum + bid.price, 0) / activeBids.length).toFixed(2)}`,
      Icon: Package,
      description: 'Average bid price',
      trend: '+5.2%',
      trendUp: true
    }
  ];

  if (isBidsLoading) {
    return <div>Loading...</div>;
  }
  if (isBidsError) {
    return <div>Error loading bids</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={BreadcrumbPatterns.fourTier('Order Management', '/order-management', 'Sellers', '/order-management/sellers', 'Active Bids')}
      />

      {/* Header */}

      <PageHeader
        title="Active Bids"
        description="View and manage active bids for seller #{id}"
        actions={
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bids..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Active Bids Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={filteredBids}
          columns={columns}
          loading={isBidsLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
