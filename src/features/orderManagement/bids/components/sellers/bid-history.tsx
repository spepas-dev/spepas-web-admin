import { motion } from 'framer-motion';
import { ChevronRight, Package, Search, ShoppingCart, Tag } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for bid history - replace with actual API call
const bidHistory = [
  {
    id: 2,
    bidding_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    assigned_by: 'Admin User',
    Seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    gopa_user_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    date_assigned: '2025-05-07T16:18:53.290Z',
    status: 2, // Completed
    price: 150.0,
    unitPrice: 150.0,
    description: 'Original Toyota brake pads',
    createdAt: '2025-05-07T16:18:53.290Z',
    date_accepted: '2025-05-07T16:18:53.290Z',
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
      status: 2, // Completed
      require_image: 1,
      quantity: 2,
      createdAt: '2025-05-07T16:18:53.290Z',
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
        createdAt: '2025-05-07T16:18:53.290Z',
        updatedAt: '2025-05-07T16:18:53.290Z',
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
          createdAt: '2025-05-07T16:18:53.290Z',
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

export default function SellerBidHistoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    navigate('/order-management/sellers');
  };

  const filteredBids = bidHistory.filter(
    (bid) =>
      bid.orderRequest.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.orderRequest.requester.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Bids',
      value: bidHistory.length,
      icon: Tag,
      description: 'Total historical bids',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Total Revenue',
      value: `GHS ${bidHistory.reduce((sum, bid) => sum + bid.price, 0).toFixed(2)}`,
      icon: ShoppingCart,
      description: 'Total revenue from completed bids',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Average Price',
      value: `GHS ${(bidHistory.reduce((sum, bid) => sum + bid.price, 0) / bidHistory.length).toFixed(2)}`,
      icon: Package,
      description: 'Average bid price',
      trend: '+5.2%',
      trendUp: true
    }
  ];

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return { label: 'Pending', color: 'bg-yellow-500' };
      case 1:
        return { label: 'Accepted', color: 'bg-green-500' };
      case 2:
        return { label: 'Completed', color: 'bg-blue-500' };
      case 3:
        return { label: 'Rejected', color: 'bg-red-500' };
      default:
        return { label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/dashboard" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/order-management" className="hover:text-[#4A36EC]">
          Order Management
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/order-management/sellers" className="hover:text-[#4A36EC]">
          Sellers
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Bid History</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Bid History</h1>
          <p className="text-sm text-gray-600">View bid history for seller #{id}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bids..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Button variant="outline" onClick={handleBack}>
            Back to Sellers
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Bid History Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
          <CardHeader>
            <CardTitle className="text-[#4A36EC]">Bid History</CardTitle>
            <CardDescription>List of all historical bids for this seller</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bid ID</TableHead>
                  <TableHead>Spare Part</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date Assigned</TableHead>
                  <TableHead>Date Accepted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBids.map((bid) => {
                  const status = getStatusBadge(bid.status);
                  return (
                    <TableRow key={bid.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">#{bid.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{bid.orderRequest.sparePart.name}</p>
                          <p className="text-sm text-gray-500">
                            {bid.orderRequest.sparePart.carModel.carBrand.name} {bid.orderRequest.sparePart.carModel.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{bid.orderRequest.requester.name}</TableCell>
                      <TableCell>{bid.orderRequest.quantity}</TableCell>
                      <TableCell>GHS {bid.price.toFixed(2)}</TableCell>
                      <TableCell>{new Date(bid.date_assigned).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(bid.date_accepted).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={`${status.color} text-white`}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
                            onClick={() => navigate(`/order-management/bids/${bid.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
