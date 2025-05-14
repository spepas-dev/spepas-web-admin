import { motion } from 'framer-motion';
import { ChevronRight, Package, Search, ShoppingCart, Tag, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { toastConfig } from '@/lib/toast';

// Mock data for spare parts orders - replace with actual API call
const sparePartOrders = [
  {
    id: 2,
    bidding_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    assigned_by: 'John Admin',
    Seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    gopa_user_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    date_assigned: '2025-04-23T18:32:44.035Z',
    status: 0,
    price: 125.99,
    unitPrice: 125.99,
    description: 'High-quality brake pad set for optimal stopping power and durability.',
    createdAt: '2025-04-23T18:32:44.035Z',
    date_accepted: '2025-04-23T18:32:44.035Z',
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
        image_url:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        image_ob: {
          data1: 'dddd',
          data2: 'cdvfdbgdfbf'
        }
      }
    ],
    gopa: {
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Sarah Gopa'
    },
    assigner: 'Michael Manager',
    orderRequest: {
      id: 1,
      request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      SparePart_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      added_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: 1,
      require_image: 1,
      quantity: 2,
      createdAt: '2025-04-22T15:30:28.510Z',
      requester: {
        User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'David Customer'
      },
      creater: {
        User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'David Customer'
      },
      sparePart: {
        id: 1,
        SparePart_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Brake Pad Set',
        description: 'High-quality brake pad set for optimal stopping power and durability.',
        price: 125.99,
        status: 1,
        discount_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        category_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        carModel_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        createdAt: '2025-01-08T10:17:33.989Z',
        updatedAt: '2025-01-08T10:17:33.989Z',
        images: [
          {
            id: 1,
            image_ID: 'e16a631f-905d-4a6b-871d-7b4877c306d6',
            SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
            createdAt: '2025-01-08T11:59:01.609Z',
            status: 1,
            image_url:
              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
          createdAt: '2025-01-08T10:17:33.989Z',
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
  },
  {
    id: 3,
    bidding_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    request_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    assigned_by: 'Jane Admin',
    Seller_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    gopa_user_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    date_assigned: '2025-04-23T19:32:44.035Z',
    status: 1,
    price: 89.99,
    unitPrice: 89.99,
    description: 'Premium oil filter for optimal engine performance.',
    createdAt: '2025-04-23T19:32:44.035Z',
    date_accepted: '2025-04-23T19:32:44.035Z',
    seller: {
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
      status: 1
    },
    images: [
      {
        id: 2,
        image_ID: 'f27b742g-016e-5b7c-982e-8c5988d417e7',
        SparePart_ID: '7b3b0953-9g6c-55ef-c062-g981908cb94a',
        createdAt: '2025-01-08T12:00:01.609Z',
        status: 1,
        image_url:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        image_ob: {
          data1: 'eeee',
          data2: 'efghijklmnop'
        }
      }
    ],
    gopa: {
      User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      name: 'Mike Gopa'
    },
    assigner: 'Lisa Manager',
    orderRequest: {
      id: 2,
      request_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      SparePart_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      added_by: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      status: 1,
      require_image: 1,
      quantity: 1,
      createdAt: '2025-04-22T16:30:28.510Z',
      requester: {
        User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        name: 'Emma Customer'
      },
      creater: {
        User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        name: 'Emma Customer'
      },
      sparePart: {
        id: 2,
        SparePart_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        name: 'Oil Filter',
        description: 'Premium oil filter for optimal engine performance.',
        price: 89.99,
        status: 1,
        discount_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        category_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        carModel_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        seller_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        createdAt: '2025-01-08T11:17:33.989Z',
        updatedAt: '2025-01-08T11:17:33.989Z',
        images: [
          {
            id: 2,
            image_ID: 'f27b742g-016e-5b7c-982e-8c5988d417e7',
            SparePart_ID: '7b3b0953-9g6c-55ef-c062-g981908cb94a',
            createdAt: '2025-01-08T12:00:01.609Z',
            status: 1,
            image_url:
              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            image_ob: {
              data1: 'eeee',
              data2: 'efghijklmnop'
            }
          }
        ],
        carModel: {
          id: 2,
          CarModel_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'Corolla',
          yearOfMake: 2021,
          carBrand_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
          status: 1,
          createdAt: '2025-01-08T11:17:33.989Z',
          carBrand: {
            id: 2,
            CarBrand_ID: '8154g19b-6a01-49cg-cf2e-cb22e221a4a9',
            name: 'Toyota',
            status: 1,
            manufacturer_ID: 'gd4e8gfc-1936-54cb-bg3e-ca06e832a5b5',
            createdAt: '2025-01-08T11:17:33.989Z',
            type: 'CAR',
            manufacturer: {
              id: 2,
              Manufacturer_ID: 'gd4e8gfc-1936-54cb-bg3e-ca06e832a5b5',
              name: 'Toyota',
              country: 'Japan',
              status: 1,
              createdAt: '2025-01-08T11:09:21.400Z'
            }
          }
        }
      }
    }
  }
];

// Status mapping with proper TypeScript types
type OrderStatus = 0 | 1 | 2 | 3;
type StatusMap = {
  [key in OrderStatus]: {
    label: string;
    color: string;
  };
};

const statusMap: StatusMap = {
  0: { label: 'Pending', color: 'bg-yellow-500' },
  1: { label: 'Accepted', color: 'bg-green-500' },
  2: { label: 'Rejected', color: 'bg-red-500' },
  3: { label: 'Completed', color: 'bg-blue-500' }
};

export default function SparePartOrdersPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  // In a real application, you would fetch the spare part orders based on the ID
  // For now, we'll use the mock data
  const orders = sparePartOrders;

  const handleOrderClick = (orderId: number) => {
    navigate(`/order-management/orders/${orderId}/${orderId}`);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.seller.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.gopa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderRequest.sparePart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderRequest.sparePart.carModel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderRequest.sparePart.carModel.carBrand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      description: 'Orders for this spare part',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Active Orders',
      value: orders.filter((o) => o.status === 0 || o.status === 1).length,
      icon: Tag,
      description: 'Pending or accepted orders',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Completed Orders',
      value: orders.filter((o) => o.status === 3).length,
      icon: ShoppingCart,
      description: 'Successfully completed orders',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Total Quantity',
      value: orders.reduce((sum, order) => sum + order.orderRequest.quantity, 0),
      icon: Truck,
      description: 'Total parts ordered',
      trend: '+3.7%',
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
        <a href="/order-management/orders" className="hover:text-[#4A36EC]">
          Orders
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Spare Part Orders</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Spare Part Orders</h1>
          <p className="text-sm text-gray-600">View and manage orders for specific spare parts</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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

      {/* Orders Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
          <CardHeader>
            <CardTitle className="text-[#4A36EC]">Orders</CardTitle>
            <CardDescription>List of all orders for this spare part</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>GOPA</TableHead>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.seller.storeName}</TableCell>
                    <TableCell>{order.gopa.name}</TableCell>
                    <TableCell>{order.orderRequest.sparePart.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{order.orderRequest.sparePart.description}</TableCell>
                    <TableCell>GHS {order.price.toFixed(2)}</TableCell>
                    <TableCell>{order.orderRequest.quantity}</TableCell>
                    <TableCell>
                      {order.orderRequest.sparePart.carModel.name} ({order.orderRequest.sparePart.carModel.yearOfMake})
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusMap[order.status as OrderStatus].color} text-white`}>
                        {statusMap[order.status as OrderStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#4A36EC] text-[#4A36EC] hover:bg-[#4A36EC] hover:text-white"
                        onClick={() => handleOrderClick(order.id)}
                      >
                        View Details
                      </Button>
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
