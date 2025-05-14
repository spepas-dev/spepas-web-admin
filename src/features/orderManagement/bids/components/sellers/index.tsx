import { motion } from 'framer-motion';
import { ChevronRight, Package, Search, ShoppingCart, Tag, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

  const handleViewActiveBids = (sellerId: number) => {
    navigate(`/order-management/orders/sellers/${sellerId}/active-bids`);
  };

  const handleViewRequestHistory = (sellerId: number) => {
    navigate(`/order-management/orders/sellers/${sellerId}/request-history`);
  };

  const filteredSellers = sellers.filter((seller) => seller.storeName.toLowerCase().includes(searchQuery.toLowerCase()));

  const stats = [
    {
      title: 'Total Sellers',
      value: sellers.length,
      icon: User,
      description: 'Registered sellers',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Active Bids',
      value: sellers.reduce((sum, seller) => sum + seller.stats.activeBids, 0),
      icon: Tag,
      description: 'Total active bids',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Completed Orders',
      value: sellers.reduce((sum, seller) => sum + seller.stats.completedOrders, 0),
      icon: ShoppingCart,
      description: 'Successfully completed orders',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Total Revenue',
      value: `GHS ${sellers.reduce((sum, seller) => sum + seller.stats.totalRevenue, 0).toFixed(2)}`,
      icon: Package,
      description: 'Total revenue from orders',
      trend: '+12.5%',
      trendUp: true
    }
  ];

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
        <span className="text-[#4A36EC] font-medium">Sellers</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Sellers</h1>
          <p className="text-sm text-gray-600">View and manage seller orders and bids</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search sellers..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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

      {/* Sellers Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
          <CardHeader>
            <CardTitle className="text-[#4A36EC]">Sellers</CardTitle>
            <CardDescription>List of all sellers and their order statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seller ID</TableHead>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Active Bids</TableHead>
                  <TableHead>Completed Orders</TableHead>
                  <TableHead>Total Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSellers.map((seller) => (
                  <TableRow key={seller.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">#{seller.id}</TableCell>
                    <TableCell>{seller.storeName}</TableCell>
                    <TableCell>{new Date(seller.date_added).toLocaleDateString()}</TableCell>
                    <TableCell>{seller.stats.totalOrders}</TableCell>
                    <TableCell>{seller.stats.activeBids}</TableCell>
                    <TableCell>{seller.stats.completedOrders}</TableCell>
                    <TableCell>GHS {seller.stats.totalRevenue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`${seller.status === 1 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {seller.status === 1 ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
                          onClick={() => handleViewActiveBids(seller.id)}
                        >
                          Active Bids
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
                          onClick={() => handleViewRequestHistory(seller.id)}
                        >
                          Request History
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
